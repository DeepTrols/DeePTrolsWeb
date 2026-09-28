import { requireAdmin } from '../../utils/admin'
import { consumeRateLimitWith, getRateLimitIP } from '../../utils/rate-limit'
import { createMediaRecord, extensionForMime, MAX_UPLOAD_BYTES, sniffImageMime } from '../../utils/media-admin'
import { createLocalStorageDriver } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  // 限流 key 默认取 socket 对端地址，不信任客户端 XFF（防伪造绕过），见 rate-limit.ts
  const ip = getRateLimitIP(event)
  if (!consumeRateLimitWith(`admin-upload:${ip}`, 30, 10 * 60 * 1000)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many uploads' })
  }

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
