import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { useNewsDatabase } from '../db/client'
import { pages } from '../db/schema'
import { contentStatusSchema } from './content-admin'
import { pageSectionsSchema } from './page-sections'
import type { PageSection } from './page-sections'

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

/**
 * 代码页目录（只读）：静态代码路由 + 动态路由模式 + /demo 演示页。
 * 代码页是 Vue SFC，内容无法表单化——后台列表全量展示但仅可「查看」，不可编辑/删除。
 * 完整性由 tests/pages-admin.spec.ts 锁定（覆盖全部 CMS_RESERVED_EXACT_PATHS 且静态路径全部保留）。
 */
export const CODE_PAGE_CATALOG = [
  { path: '/', title: '首页' },
  { path: '/about_us', title: '关于我们' },
  { path: '/contact', title: '联系我们' },
  { path: '/why-deeptrols', title: '为什么选择深度数智' },
  { path: '/products/ai-iot', title: '探曜 · AIoT 产品页' },
  { path: '/products/data-development', title: '博曜 · 数据开发平台（DDP）' },
  { path: '/products/data-element-regulation', title: '数曜 · 数据要素监管（DMS）' },
  { path: '/products/data-governance', title: '数曜 · 数据治理平台（DGP）' },
  { path: '/products/data-labeling', title: '数曜 · 数据标注平台（DLP）' },
  { path: '/products/device-agent', title: '设备智能体产品页' },
  { path: '/products/knowledge-base', title: '企业知识库产品页' },
  { path: '/resources/reports', title: '资源与报告' },
  { path: '/services/enterprise-ai-delivery', title: '企业级 AI 交付服务（FDE）' },
  { path: '/services/smart-education', title: '智慧教育服务' },
  { path: '/solutions/compute', title: '算力中心方案' },
  { path: '/solutions/energy', title: '智慧能源方案' },
  { path: '/solutions/fde', title: 'FDE 方案' },
  { path: '/solutions/manufacturing', title: '智能制造方案' },
  { path: '/solutions/water', title: '智慧水利方案' },
  { path: '/news', title: '新闻列表（动态路由）' },
  { path: '/news/:id', title: '新闻详情（动态路由）' },
  { path: '/cases', title: '案例列表（动态路由）' },
  { path: '/cases/:slug', title: '案例详情（动态路由）' },
  { path: '/solutions/:slug', title: '方案详情（动态路由，CMS 可回退接管）' },
  { path: '/demo/agentos-flow', title: 'Demo · AgentOS 流程' },
  { path: '/demo/authine-ai-application', title: 'Demo · Authine AI 应用' },
  { path: '/demo/boyao-integration', title: 'Demo · 博曜集成' },
  { path: '/demo/data-regulation-architecture', title: 'Demo · 数据要素监管架构' },
  { path: '/demo/device-agent-architecture', title: 'Demo · 设备智能体架构' },
  { path: '/demo/emqx-platform-architecture', title: 'Demo · EMQX 平台架构' },
  { path: '/demo/flowmq-how-it-works', title: 'Demo · FlowMQ 工作原理' },
  { path: '/demo/knowledge-hub', title: 'Demo · 知识中枢' },
  { path: '/demo/smart-data-hub', title: 'Demo · 智能数据中枢' },
  { path: '/demo/tag-platform-architecture', title: 'Demo · 标签平台架构' },
  { path: '/demo/tanyao-iot-architecture', title: 'Demo · 探曜 IoT 架构' },
] as const

/** 页面路径：完整路径（含前导斜杠），小写字母/数字/连字符/斜杠，不允许尾斜杠与保留路径 */
export const pageSlugSchema = z
  .string()
  .trim()
  .min(2)
  .max(300)
  .regex(/^\/[a-z0-9][a-z0-9-]*(?:\/[a-z0-9][a-z0-9-]*)*$/, 'Invalid page path')
  .refine(slug => !isReservedPagePath(slug), { message: 'Reserved page path' })

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
  /** cms = DB 里可编辑的 CMS 页；code = 代码静态/动态路由（只读，仅可查看线上页） */
  source: 'cms' | 'code'
  /** 代码页无 CMS 语义字段，为 null */
  status: z.infer<typeof contentStatusSchema> | null
  sortOrder: number | null
  updatedAt: string | null
}

export interface AdminPagePayload extends PageInput {
  updatedAt: string
}

/** 公开侧载荷：仅 published 页，供 catch-all 分发器渲染；preview（015.13）= 管理员草稿预览标记 */
export interface PublishedPagePayload {
  slug: string
  title: string
  seoDescription: string
  sections: PageSection[]
  updatedAt: string
  preview?: boolean
}

/** 页面列表（admin）：代码页目录在前（只读），CMS 页在后（含草稿，按 sortOrder）；保留路径黑名单保证两者不撞 slug */
export async function listAdminPages(): Promise<AdminPageRecord[]> {
  const codeRows: AdminPageRecord[] = CODE_PAGE_CATALOG.map(entry => ({
    slug: entry.path,
    title: entry.title,
    source: 'code' as const,
    status: null,
    sortOrder: null,
    updatedAt: null,
  }))

  const db = useNewsDatabase()
  if (!db) {
    return codeRows
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

    const cmsRows: AdminPageRecord[] = rows.map(row => ({
      slug: row.slug,
      title: row.title,
      source: 'cms' as const,
      status: row.status,
      sortOrder: row.sortOrder,
      updatedAt: row.updatedAt.toISOString(),
    }))
    return [...codeRows, ...cmsRows]
  }
  catch {
    return codeRows
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
