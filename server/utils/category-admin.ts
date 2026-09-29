import { and, asc, count, eq } from 'drizzle-orm'
import { z } from 'zod'
import { newsCategoryTabs } from '~/data/news'
import { reportTypeCategories, solutionCategories } from '~/data/solution-categories'
import { useNewsDatabase } from '../db/client'
import { caseDetails, cases, contentCategories, news, reports } from '../db/schema'
import { internalServerError } from './server-log'

/**
 * 内容分类管理（015.16）：news/cases/reports 的分类 key 由 content_categories 表动态维护。
 *
 * scope 三值：
 * - news-category：新闻分类（news.category）
 * - solution：行业分类，案例（cases.solutionKey / caseDetails.categoryKey）与报告（reports.solutionKey）共享
 * - report-type：报告类型（reports.type），key 即 label（中文取值）
 *
 * 软外键（不做硬 FK，静态回退模式下无库可写）：
 * - 内容写入（news/cases/reports POST/PUT）时经 assertCategoryExists 校验 key 在库存在，不存在 → 端点 400
 * - 删除分类前引用计数（countCategoryRefs 扫内容表），被引用 → 'in-use'（端点 409）
 *
 * 三态语义（照抄 menu-admin 配方）：
 * - null = 未配置 DB（哨兵，list 由调用方回退静态快照，写路径端点 503）
 * - false = 未命中（端点 404）
 * - 'conflict' = 同 scope+key 已存在（端点 409）
 * - 'in-use' = 删除时仍被内容引用（端点 409）
 * - 异常记录日志后抛出（端点 500）
 */

export const CATEGORY_SCOPES = ['news-category', 'solution', 'report-type'] as const
export const categoryScopeSchema = z.enum(CATEGORY_SCOPES)
export type CategoryScope = z.infer<typeof categoryScopeSchema>

/** slug 类 scope（news-category/solution）的 key 协议：与案例 slug 同一正则；report-type key=label 允许中文 */
const slugKeyRegex = /^[a-z0-9][a-z0-9-]*$/

const categoryBaseSchema = z.object({
  scope: categoryScopeSchema,
  key: z.string().trim().min(1).max(50),
  label: z.string().trim().min(1).max(100),
  sortOrder: z.number().int().min(0),
})
export const categoryInputSchema = categoryBaseSchema.superRefine((value, ctx) => {
  if (value.scope !== 'report-type' && !slugKeyRegex.test(value.key)) {
    ctx.addIssue({ code: 'custom', message: 'key must be a lowercase slug', path: ['key'] })
  }
})
export const categoryUpdateSchema = categoryBaseSchema.omit({ key: true, scope: true })
export type CategoryInput = z.infer<typeof categoryInputSchema>
export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>

export interface CategoryItem {
  key: string
  label: string
  sortOrder: number
}

/** admin 列表行：附引用计数（删除前置提示） */
export interface AdminCategoryRecord extends CategoryItem {
  scope: CategoryScope
  refs: number
  updatedAt: string
}

/** 静态快照：无 DB / 查询失败时的回退（与迁移 0010 种子一致；新闻分类沿用 newsCategoryTabs 单一事实源） */
export function staticCategoriesFor(scope: CategoryScope): CategoryItem[] {
  const source = scope === 'news-category' ? newsCategoryTabs : scope === 'solution' ? solutionCategories : reportTypeCategories
  return source.map((item, index) => ({ key: item.key, label: item.label, sortOrder: index }))
}

/** 读分类列表：命中返回按 sortOrder 排序的数组（可为空表——管理员清空后不回退静态）；未配置 DB 返回 null；异常记录日志后抛出 */
export async function listCategories(scope: CategoryScope): Promise<CategoryItem[] | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .select({ key: contentCategories.key, label: contentCategories.label, sortOrder: contentCategories.sortOrder })
      .from(contentCategories)
      .where(eq(contentCategories.scope, scope))
      .orderBy(asc(contentCategories.sortOrder), asc(contentCategories.key))
      .limit(100)
    return rows
  }
  catch (error) {
    throw internalServerError('category-admin.listCategories', error, { scope })
  }
}

/** admin 列表：含引用计数；未配置 DB 返回 null（端点 503）；异常记录日志后抛出（端点 500） */
export async function listAdminCategories(scope: CategoryScope): Promise<AdminCategoryRecord[] | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .select({
        key: contentCategories.key,
        label: contentCategories.label,
        sortOrder: contentCategories.sortOrder,
        updatedAt: contentCategories.updatedAt,
      })
      .from(contentCategories)
      .where(eq(contentCategories.scope, scope))
      .orderBy(asc(contentCategories.sortOrder), asc(contentCategories.key))
      .limit(100)

    const records: AdminCategoryRecord[] = []
    for (const row of rows) {
      records.push({
        scope,
        key: row.key,
        label: row.label,
        sortOrder: row.sortOrder,
        refs: (await countCategoryRefs(scope, row.key)) ?? 0,
        updatedAt: row.updatedAt.toISOString(),
      })
    }
    return records
  }
  catch (error) {
    throw internalServerError('category-admin.listAdminCategories', error, { scope })
  }
}

/** 单 key 存在性：无 DB 返回 null（调用方跳过软外键校验）；异常记录日志后抛出 */
export async function categoryExists(scope: CategoryScope, key: string): Promise<boolean | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .select({ key: contentCategories.key })
      .from(contentCategories)
      .where(and(eq(contentCategories.scope, scope), eq(contentCategories.key, key)))
      .limit(1)
    return rows.length > 0
  }
  catch (error) {
    throw internalServerError('category-admin.categoryExists', error, { scope, key })
  }
}

/** 内容写入的软外键校验：key 不存在抛 400；无 DB 跳过（静态回退模式不做存在性约束） */
export async function assertCategoryExists(scope: CategoryScope, key: string): Promise<void> {
  const exists = await categoryExists(scope, key)
  if (exists === false) {
    throw createError({ statusCode: 400, statusMessage: `Unknown category "${key}" for scope "${scope}"` })
  }
}

/** 引用计数：news-category 扫 news.category；solution 扫 cases.solutionKey + caseDetails.categoryKey + reports.solutionKey；report-type 扫 reports.type。无 DB 返回 null */
export async function countCategoryRefs(scope: CategoryScope, key: string): Promise<number | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    if (scope === 'news-category') {
      const rows = await db.select({ value: count() }).from(news).where(eq(news.category, key))
      return rows[0]?.value ?? 0
    }
    if (scope === 'report-type') {
      const rows = await db.select({ value: count() }).from(reports).where(eq(reports.type, key))
      return rows[0]?.value ?? 0
    }
    const caseRows = await db.select({ value: count() }).from(cases).where(eq(cases.solutionKey, key))
    const detailRows = await db.select({ value: count() }).from(caseDetails).where(eq(caseDetails.categoryKey, key))
    const reportRows = await db.select({ value: count() }).from(reports).where(eq(reports.solutionKey, key))
    return (caseRows[0]?.value ?? 0) + (detailRows[0]?.value ?? 0) + (reportRows[0]?.value ?? 0)
  }
  catch (error) {
    throw internalServerError('category-admin.countCategoryRefs', error, { scope, key })
  }
}

/** 新建：同 scope+key 已存在返回 'conflict'（端点 409）；成功返回 true；未配置 DB 返回 null（端点 503） */
export async function createCategory(input: CategoryInput): Promise<'conflict' | boolean | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const existing = await db
      .select({ key: contentCategories.key })
      .from(contentCategories)
      .where(and(eq(contentCategories.scope, input.scope), eq(contentCategories.key, input.key)))
      .limit(1)
    if (existing.length) {
      return 'conflict'
    }
    await db.insert(contentCategories).values(input)
    return true
  }
  catch (error) {
    throw internalServerError('category-admin.createCategory', error, { scope: input.scope, key: input.key })
  }
}

/** 更新（label/sortOrder；scope+key 主键不可改）：命中返回 true；未配置 DB 返回 null；未命中返回 false */
export async function updateCategory(scope: CategoryScope, key: string, input: CategoryUpdate): Promise<boolean | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .update(contentCategories)
      .set({ label: input.label, sortOrder: input.sortOrder, updatedAt: new Date() })
      .where(and(eq(contentCategories.scope, scope), eq(contentCategories.key, key)))
      .returning({ key: contentCategories.key })
    return rows.length > 0
  }
  catch (error) {
    throw internalServerError('category-admin.updateCategory', error, { scope, key })
  }
}

/** 删除：被内容引用返回 'in-use'（端点 409，附引用数于 statusMessage）；命中返回 true；未配置 DB 返回 null；未命中返回 false */
export async function deleteCategory(scope: CategoryScope, key: string): Promise<'in-use' | boolean | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const refs = await countCategoryRefs(scope, key)
    if (refs === null) {
      return null
    }
    if (refs > 0) {
      return 'in-use'
    }
    const rows = await db
      .delete(contentCategories)
      .where(and(eq(contentCategories.scope, scope), eq(contentCategories.key, key)))
      .returning({ key: contentCategories.key })
    return rows.length > 0
  }
  catch (error) {
    throw internalServerError('category-admin.deleteCategory', error, { scope, key })
  }
}
