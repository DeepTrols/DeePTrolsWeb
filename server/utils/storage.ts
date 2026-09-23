import { randomUUID } from 'node:crypto'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * 媒体文件存储抽象（TASK-015.7）：当前仅本地实现（public/uploads 直出），
 * 后续接 OSS/COS 时新增 driver 即可，调用方只认 path 字符串。
 */
export interface StorageDriver {
  /** 保存文件并返回站点可访问路径（/uploads/YYYY-MM/<uuid>.<ext>） */
  save: (buffer: Buffer, extension: string) => Promise<string>
  /** 按 save 返回的路径删除；文件不存在不报错 */
  delete: (path: string) => Promise<void>
}

const PUBLIC_URL_PREFIX = '/uploads/'

export function createLocalStorageDriver(root: string = 'public/uploads'): StorageDriver {
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
