import { desc, eq } from 'drizzle-orm'
import { useNewsDatabase } from '../db/client'
import { mediaAssets } from '../db/schema'

/** 上传协议边界（TASK-015.7）：白名单位图类型 + 5MB 上限；SVG 同源直开有 XSS 面，首期禁传 */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

export type MediaMime = 'image/gif' | 'image/jpeg' | 'image/png' | 'image/webp'

const MIME_EXTENSIONS: Record<MediaMime, string> = {
  'image/gif': '.gif',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
}

export function extensionForMime(mime: MediaMime): string {
  return MIME_EXTENSIONS[mime]
}

/** 按 magic bytes 嗅探真实图片类型（不信客户端 content-type）；不在白名单返回 null */
export function sniffImageMime(buffer: Buffer): MediaMime | null {
  if (buffer.length >= 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    return 'image/png'
  }
  if (buffer.length >= 3 && buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
    return 'image/jpeg'
  }
  if (buffer.length >= 6 && buffer.subarray(0, 4).toString('ascii') === 'GIF8') {
    return 'image/gif'
  }
  if (
    buffer.length >= 12
    && buffer.subarray(0, 4).toString('ascii') === 'RIFF'
    && buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp'
  }
  return null
}

export interface MediaAssetRecord {
  id: number
  path: string
  filename: string
  mime: string
  size: number
  alt: string
  createdAt: string
}

interface MediaAssetInput {
  path: string
  filename: string
  mime: string
  size: number
}

function toRecord(row: typeof mediaAssets.$inferSelect): MediaAssetRecord {
  return { ...row, createdAt: row.createdAt.toISOString() }
}

/** 媒体列表（admin）：最新在前；未配置 DB 返回空表（读侧不报错，页面显示空状态） */
export async function listMedia(): Promise<MediaAssetRecord[]> {
  const db = useNewsDatabase()
  if (!db) {
    return []
  }

  try {
    const rows = await db
      .select()
      .from(mediaAssets)
      .orderBy(desc(mediaAssets.createdAt), desc(mediaAssets.id))
      .limit(500)
    return rows.map(toRecord)
  }
  catch {
    return []
  }
}

/** 登记上传记录：成功返回行；无 DB/失败返回 null（调用方需回滚已落盘文件） */
export async function createMediaRecord(input: MediaAssetInput): Promise<MediaAssetRecord | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db.insert(mediaAssets).values(input).returning()
    return rows[0] ? toRecord(rows[0]) : null
  }
  catch {
    return null
  }
}

/** 删除记录：命中返回 path（调用方负责删文件）；未命中/无 DB/失败返回 null */
export async function deleteMediaRecord(id: number): Promise<string | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .delete(mediaAssets)
      .where(eq(mediaAssets.id, id))
      .returning({ path: mediaAssets.path })
    return rows[0]?.path ?? null
  }
  catch {
    return null
  }
}
