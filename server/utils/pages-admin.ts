import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { useNewsDatabase } from '../db/client'
import { pages } from '../db/schema'
import { articleBlocksSchema } from './article-blocks'
import { contentStatusSchema } from './content-admin'

/**
 * 代码静态路由完整路径：CMS 页不可占用。
 * Nuxt 文件路由优先于 catch-all 分发器，占用这些路径的 CMS 页永远渲染不到。
 * 完整性由 tests/pages-admin.spec.ts 扫描 pages/ 目录锁定。
 */
export const CMS_RESERVED_EXACT_PATHS = [
  '/',
  '/about_us',
  '/contact',
  '/why-deeptrols',
  '/products/ai-iot',
  '/products/data-development',
  '/products/data-element-regulation',
  '/products/data-governance',
  '/products/data-labeling',
  '/products/device-agent',
  '/products/knowledge-base',
  '/resources/reports',
  '/services/enterprise-ai-delivery',
  '/services/smart-education',
  '/solutions/compute',
  '/solutions/energy',
  '/solutions/fde',
  '/solutions/manufacturing',
  '/solutions/water',
] as const

/**
 * 保留前缀：代码动态路由（/news/[id]、/cases/[slug] 静态 miss 直接 404，无 CMS 回退）、
 * 纯 Demo 路由（/demo/*）与系统路径（/api Nitro、/admin vben 部署前缀、/uploads 媒体库）。
 * 注意 /solutions/[slug] 有 CMS 回退分支，故 /solutions/<new-slug> 允许入库。
 */
export const CMS_RESERVED_PREFIXES = ['/admin', '/api', '/cases', '/demo', '/news', '/uploads'] as const

export function isReservedPagePath(slug: string): boolean {
  if ((CMS_RESERVED_EXACT_PATHS as readonly string[]).includes(slug)) {
    return true
  }
  return CMS_RESERVED_PREFIXES.some(prefix => slug === prefix || slug.startsWith(`${prefix}/`))
}

/** 页面路径：完整路径（含前导斜杠），小写字母/数字/连字符/斜杠，不允许尾斜杠与保留路径 */
export const pageSlugSchema = z
  .string()
  .trim()
  .min(2)
  .max(300)
  .regex(/^\/[a-z0-9][a-z0-9-]*(?:\/[a-z0-9][a-z0-9-]*)*$/, 'Invalid page path')
  .refine(slug => !isReservedPagePath(slug), { message: 'Reserved page path' })

/** Phase C 唯一区块类型：富文本（ArticleBlock[]）；Phase D 布局管理扩展为 discriminatedUnion */
export const pageSectionSchema = z.object({
  type: z.literal('richText'),
  blocks: articleBlocksSchema,
})
export const pageSectionsSchema = z.array(pageSectionSchema).max(50)
export type PageSection = z.infer<typeof pageSectionSchema>

/** CMS 页写入协议（新建/更新同一形状；slug 主键冲突返回 'conflict'） */
export const pageInputSchema = z.object({
  slug: pageSlugSchema,
  title: z.string().trim().min(1).max(500),
  seoDescription: z.string().trim().max(500).default(''),
  sortOrder: z.number().int().min(0).default(0),
  status: contentStatusSchema.default('draft'),
  sections: pageSectionsSchema.default([]),
})
export type PageInput = z.infer<typeof pageInputSchema>

/** slug 为主键不可变，更新时 omit 掉（与案例 slug 同一先例） */
export const pageUpdateSchema = pageInputSchema.omit({ slug: true })
export type PageUpdate = z.infer<typeof pageUpdateSchema>

export interface AdminPageRecord {
  slug: string
  title: string
  status: z.infer<typeof contentStatusSchema>
  sortOrder: number
  updatedAt: string
}

export interface AdminPagePayload extends PageInput {
  updatedAt: string
}

/** 公开侧载荷：仅 published 页，供 catch-all 分发器渲染 */
export interface PublishedPagePayload {
  slug: string
  title: string
  seoDescription: string
  sections: PageSection[]
  updatedAt: string
}

/** 页面列表（admin）：含草稿，按 sortOrder；未配置 DB 返回空表 */
export async function listAdminPages(): Promise<AdminPageRecord[]> {
  const db = useNewsDatabase()
  if (!db) {
    return []
  }

  try {
    const rows = await db
      .select({
        slug: pages.slug,
        title: pages.title,
        status: pages.status,
        sortOrder: pages.sortOrder,
        updatedAt: pages.updatedAt,
      })
      .from(pages)
      .orderBy(asc(pages.sortOrder), asc(pages.slug))
      .limit(500)

    return rows.map(row => ({ ...row, updatedAt: row.updatedAt.toISOString() }))
  }
  catch {
    return []
  }
}

export async function getAdminPage(slug: string): Promise<AdminPagePayload | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1)
    const row = rows[0]
    if (!row) {
      return null
    }
    const sections = pageSectionsSchema.safeParse(row.sections)
    if (!sections.success) {
      return null
    }
    return {
      slug: row.slug,
      title: row.title,
      seoDescription: row.seoDescription,
      sortOrder: row.sortOrder,
      status: row.status,
      sections: sections.data,
      updatedAt: row.updatedAt.toISOString(),
    }
  }
  catch {
    return null
  }
}

/** 公开读取：仅 published；sections 出库再过一次 zod（防脏数据打爆渲染器） */
export async function getPublishedPage(slug: string): Promise<PublishedPagePayload | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1)
    const row = rows[0]
    if (!row || row.status !== 'published') {
      return null
    }
    const sections = pageSectionsSchema.safeParse(row.sections)
    if (!sections.success) {
      return null
    }
    return {
      slug: row.slug,
      title: row.title,
      seoDescription: row.seoDescription,
      sections: sections.data,
      updatedAt: row.updatedAt.toISOString(),
    }
  }
  catch {
    return null
  }
}

/** 新建：slug 冲突返回 'conflict'；成功返回 slug；无 DB/失败返回 null */
export async function createPage(input: PageInput): Promise<'conflict' | string | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const existing = await db.select({ slug: pages.slug }).from(pages).where(eq(pages.slug, input.slug)).limit(1)
    if (existing.length) {
      return 'conflict'
    }
    const rows = await db.insert(pages).values(input).returning({ slug: pages.slug })
    return rows[0]?.slug ?? null
  }
  catch {
    return null
  }
}

/** 更新：命中行返回 true；未命中/失败返回 false */
export async function updatePage(slug: string, input: PageUpdate): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const rows = await db
      .update(pages)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(pages.slug, slug))
      .returning({ slug: pages.slug })
    return rows.length > 0
  }
  catch {
    return false
  }
}

/** 删除：命中行返回 true */
export async function deletePage(slug: string): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const rows = await db.delete(pages).where(eq(pages.slug, slug)).returning({ slug: pages.slug })
    return rows.length > 0
  }
  catch {
    return false
  }
}
