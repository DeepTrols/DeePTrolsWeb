import { randomUUID } from 'node:crypto'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { extname, isAbsolute, join, resolve, sep } from 'node:path'

/**
 * 媒体文件存储抽象（TASK-015.7）：当前仅本地实现，落盘到上传根目录（默认 <cwd>/public/uploads），
 * 由 server/routes/uploads/[...path].get.ts 运行时直出（生产 .output/public 为构建期快照，
 * 运行时新写入的文件必须走该路由才能访问）。后续接 OSS/COS 时新增 driver 即可，调用方只认 path 字符串。
 */
export interface StorageDriver {
  /** 保存文件并返回站点可访问路径（/uploads/YYYY-MM/<uuid>.<ext>） */
  save: (buffer: Buffer, extension: string) => Promise<string>
  /** 按 save 返回的路径删除；文件不存在不报错 */
  delete: (path: string) => Promise<void>
}

const PUBLIC_URL_PREFIX = '/uploads/'

/**
 * 上传根目录解析：写入（StorageDriver）与读取（/uploads 服务路由）共用同一函数，保证落盘与直出目录一致。
 * - 默认 <cwd>/public/uploads；
 * - 生产可用 NUXT_UPLOADS_DIR 覆盖为挂载卷（容器重建不丢文件，且不受 .output/public 构建期快照限制）。
 */
export function resolveUploadsDir(): string {
  const override = process.env.NUXT_UPLOADS_DIR
  const base = override && override.trim() ? override : join('public', 'uploads')
  return resolve(base)
}

/** 可直出的媒体扩展名 → Content-Type 白名单（与上传嗅探白名单一致；SVG 有 XSS 面，禁传亦禁直出） */
const UPLOAD_CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
}

export interface ResolvedUpload {
  /** 规范化后的磁盘绝对路径（保证仍在上传根目录内） */
  file: string
  /** 命中白名单的响应 Content-Type */
  contentType: string
}

/**
 * 将 /uploads/<requestPath> 解析为可安全直出的磁盘文件（供 server/routes/uploads/[...path].get.ts 使用）：
 * - 解码并规范化后必须仍严格落在上传根目录内，拒绝 `..`、绝对路径、URL 编码穿越（%2e%2e%2f 等）与 NUL；
 * - 扩展名必须命中媒体白名单，否则不可服务；
 * 命中返回 { file, contentType }，其余一律返回 null（路由层据此 404，不泄露目录结构）。
 */
export function resolveUploadFile(requestPath: string, root: string = resolveUploadsDir()): ResolvedUpload | null {
  if (!requestPath) {
    return null
  }

  // 先解码，捕获 %2e%2e%2f 这类编码穿越；非法百分号编码直接拒绝
  let decoded: string
  try {
    decoded = decodeURIComponent(requestPath)
  }
  catch {
    return null
  }

  // 去掉可能的前导分隔符后，仍为绝对路径或含 NUL 一律拒绝
  const relative = decoded.replace(/^[/\\]+/, '')
  if (!relative || isAbsolute(relative) || relative.includes('\0')) {
    return null
  }

  const normalizedRoot = resolve(root)
  const target = resolve(normalizedRoot, relative)
  // 规范化后必须严格在 root 之下（等于 root 本身也拒绝：那是目录不是文件）
  if (!target.startsWith(normalizedRoot + sep)) {
    return null
  }

  const contentType = UPLOAD_CONTENT_TYPES[extname(target).toLowerCase()]
  if (!contentType) {
    return null
  }

  return { file: target, contentType }
}

export function createLocalStorageDriver(root: string = resolveUploadsDir()): StorageDriver {
  return {
    async save(buffer, extension) {
      const monthDir = new Date().toISOString().slice(0, 7)
      const filename = `${randomUUID()}${extension}`
      const dir = join(root, monthDir)
      await mkdir(dir, { recursive: true })
      await writeFile(join(dir, filename), buffer)
      return `${PUBLIC_URL_PREFIX}${monthDir}/${filename}`
    },
    async delete(path) {
      // 防目录穿越：只处理 save 产出的 /uploads/ 前缀路径
      if (!path.startsWith(PUBLIC_URL_PREFIX) || path.includes('..')) {
        return
      }
      try {
        await unlink(join(root, path.slice(PUBLIC_URL_PREFIX.length)))
      }
      catch {
        // 文件已不存在等情况静默（删除幂等）
      }
    },
  }
}
