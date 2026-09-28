import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { resolveUploadFile } from '../../utils/storage'

// 上传文件名由 UUID 生成、内容不可变，可长期强缓存
const UPLOAD_CACHE_CONTROL = 'public, max-age=31536000, immutable'

/**
 * GET /uploads/** — 运行时直出上传的媒体文件（审计中危#8）。
 *
 * 生产 Nitro（node-server）的静态资产来自构建期快照 .output/public，运行时新写入
 * <cwd>/public/uploads（或 NUXT_UPLOADS_DIR 挂载卷）的文件默认无法访问，且容器重建即丢。
 * 本路由从磁盘目录流式返回文件，dev/prod 行为一致（Nitro server route 优先于 public 静态资产）。
 *
 * 安全：路径解析（防穿越 + 扩展名白名单）统一委托 storage.resolveUploadFile；
 * 未命中/不存在/非文件一律 404，不泄露目录结构。
 */
export default defineEventHandler(async (event) => {
  const requestPath = getRouterParam(event, 'path') ?? ''
  const resolved = resolveUploadFile(requestPath)
  if (!resolved) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  let stats
  try {
    stats = await stat(resolved.file)
  }
  catch {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  if (!stats.isFile()) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  setResponseHeader(event, 'Content-Type', resolved.contentType)
  setResponseHeader(event, 'Content-Length', stats.size)
  setResponseHeader(event, 'Cache-Control', UPLOAD_CACHE_CONTROL)
  return sendStream(event, createReadStream(resolved.file))
})
