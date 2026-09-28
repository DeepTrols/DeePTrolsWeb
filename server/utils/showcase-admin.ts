import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { useNewsDatabase } from '../db/client'
import { showcaseLists } from '../db/schema'
import { safeUrlSchema } from './safe-url'
import { internalServerError, logServerError } from './server-log'

/** 展示位素材 key（015.14）：about-gallery 关于页公司介绍图集 / home-logos 首页 Logo 墙 */
export const SHOWCASE_KEYS = ['about-gallery', 'home-logos'] as const
export const showcaseKeySchema = z.enum(SHOWCASE_KEYS)
export type ShowcaseKey = z.infer<typeof showcaseKeySchema>

export const SHOWCASE_LABELS: Record<ShowcaseKey, string> = {
  'about-gallery': '关于页公司介绍图集',
  'home-logos': '首页 Logo 墙',
}

/** 图集条目：{image, alt}，整列上限 24（卡片 aspect-[10/16]，上传经 VCropper 固定 10:16 裁剪） */
export const galleryItemSchema = z.object({
  image: safeUrlSchema(500),
  alt: z.string().trim().min(1).max(200),
})
export const galleryListSchema = z.array(galleryItemSchema).max(24)
export type ShowcaseGalleryItem = z.infer<typeof galleryItemSchema>

/** Logo 条目：仅图片形态（name + image），整列上限 40；
 *  静态回退里的纯文本条目不进 DB 协议（admin GET 丢弃并计数 skippedTextEntries） */
export const logoItemSchema = z.object({
  name: z.string().trim().min(1).max(100),
  image: safeUrlSchema(500),
})
export const logoListSchema = z.array(logoItemSchema).max(40)
export type ShowcaseLogoItem = z.infer<typeof logoItemSchema>

export type ShowcaseItems = ShowcaseGalleryItem[] | ShowcaseLogoItem[]

/** 按 key 取整列 schema（入库前校验与出库复验共用） */
export function showcaseItemsSchema(key: ShowcaseKey): typeof galleryListSchema | typeof logoListSchema {
  return key === 'about-gallery' ? galleryListSchema : logoListSchema
}

/** 校验整列素材；失败返回 null */
export function parseShowcaseItems(key: ShowcaseKey, items: unknown): ShowcaseItems | null {
  const result = showcaseItemsSchema(key).safeParse(items)
  return result.success ? result.data : null
}

/** 读展示位素材：命中返回 { items, updatedAt }；无 DB/未命中/zod 复验失败/查询异常返回 null（调用方回退静态数据）。
 *  公开 GET /api/showcase 依赖此回退，异常不抛出，但必须记录日志让故障可见 */
export async function getShowcase(
  key: ShowcaseKey,
): Promise<{ items: ShowcaseItems, updatedAt: string } | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .select({ items: showcaseLists.items, updatedAt: showcaseLists.updatedAt })
      .from(showcaseLists)
      .where(eq(showcaseLists.key, key))
      .limit(1)

    const row = rows[0]
    if (!row) {
      return null
    }
    const items = parseShowcaseItems(key, row.items)
    if (!items) {
      // 库内素材未过 zod 复验（脏数据）：记录后按未入库处理（回退静态快照）
      logServerError('showcase-admin.getShowcase', 'showcase items failed zod revalidation', { key })
      return null
    }
    return { items, updatedAt: row.updatedAt.toISOString() }
  }
  catch (error) {
    logServerError('showcase-admin.getShowcase', error, { key })
    return null
  }
}

/** 写展示位素材（整列覆盖，upsert 幂等）：成功 true；未配置 DB 返回 false（端点 503）；异常记录日志后抛出（端点 500） */
export async function putShowcase(key: ShowcaseKey, items: ShowcaseItems): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    await db
      .insert(showcaseLists)
      .values({ key, label: SHOWCASE_LABELS[key], items })
      .onConflictDoUpdate({ target: showcaseLists.key, set: { items, updatedAt: new Date() } })
    return true
  }
  catch (error) {
    throw internalServerError('showcase-admin.putShowcase', error, { key })
  }
}
