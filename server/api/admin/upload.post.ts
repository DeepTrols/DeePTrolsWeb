import { requireAdmin } from '../../utils/admin'
import { assertBodyWithinLimit } from '../../utils/body-limit'
import { consumeRateLimitWith, getRateLimitIP } from '../../utils/rate-limit'
import { createMediaRecord, extensionForMime, MAX_UPLOAD_BYTES, sniffImageMime } from '../../utils/media-admin'
import { createLocalStorageDriver } from '../../utils/storage'

// multipart 边界/字段头有额外开销，预检上限在文件上限之上再留 1MB 余量；精确的 5MB 仍由读后校验兜底
const MAX_UPLOAD_BODY_BYTES = MAX_UPLOAD_BYTES + 1024 * 1024

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  // 限流 key 默认取 socket 对端地址，不信任客户端 XFF（防伪造绕过），见 rate-limit.ts
  const ip = getRateLimitIP(event)
  if (!consumeRateLimitWith(`admin-upload:${ip}`, 30, 10 * 60 * 1000)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many uploads' })
  }

  // 读取前先按 Content-Length 挡下超大 multipart body（h3 readMultipartFormData 无默认上限，防内存打爆）；
  // chunked 无 Content-Length 时放行，由下方精确的 5MB 读后校验兜底
  assertBodyWithinLimit(event, MAX_UPLOAD_BODY_BYTES)
  const form = await readMultipartFormData(event)
  const file = form?.find(part => part.name === 'file')
  if (!file?.data?.length || !file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file' })
  }
  if (file.data.length > MAX_UPLOAD_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'File too large' })
  }

  const mime = sniffImageMime(file.data)
  if (!mime) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported image type' })
  }

  const storage = createLocalStorageDriver()
  const path = await storage.save(file.data, extensionForMime(mime))
  const record = await createMediaRecord({
    path,
    filename: file.filename.slice(0, 255),
    mime,
    size: file.data.length,
  })
  if (!record) {
    // 入库失败回滚已落盘文件，避免孤儿资源
    await storage.delete(path)
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }

  setResponseStatus(event, 201)
  return record
})
