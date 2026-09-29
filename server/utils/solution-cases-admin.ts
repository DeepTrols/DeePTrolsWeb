import { and, eq, inArray } from 'drizzle-orm'
import { z } from 'zod'
import type { CaseResource } from '~/data/cases'
import { SOLUTION_CASE_PAGE_KEYS, staticSolutionCaseFallback } from '~/data/solution-case-picks'
import type { SolutionCasePageKey } from '~/data/solution-case-picks'
import { useNewsDatabase } from '../db/client'
import { cases, solutionCasePicks } from '../db/schema'
import { caseSlugSchema } from './cases-admin'
import { internalServerError, logServerError } from './server-log'

/** 方案页推荐位 key 白名单（页面 key 注册表在 data/solution-case-picks.ts，server/client 共享） */
export const solutionCasePageKeySchema = z.enum(SOLUTION_CASE_PAGE_KEYS)

/** 推荐位整列协议：有序案例 slug 数组，≤3 且不重复 */
export const solutionCasePicksSchema = z
  .array(caseSlugSchema)
  .max(3)
  .refine(items => new Set(items).size === items.length, { message: 'Duplicate case slug' })
export type SolutionCasePicks = z.infer<typeof solutionCasePicksSchema>

export interface SolutionCasesResult {
  items: CaseResource[]
  source: 'db' | 'static'
}

/** 读推荐位：命中返回 { items, updatedAt }；无 DB/未命中/zod 复验失败/查询异常返回 null（调用方回退静态快照）。
 *  公开 GET /api/solutions/[key]/cases 依赖此回退，异常不抛出，但必须记录日志让故障可见 */
export async function getSolutionCasePicks(
  key: SolutionCasePageKey,
): Promise<{ items: string[], updatedAt: string } | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .select({ items: solutionCasePicks.items, updatedAt: solutionCasePicks.updatedAt })
      .from(solutionCasePicks)
      .where(eq(solutionCasePicks.key, key))
      .limit(1)

    const row = rows[0]
    if (!row) {
      return null
    }
    const parsed = solutionCasePicksSchema.safeParse(row.items)
    if (!parsed.success) {
      // 库内推荐未过 zod 复验（脏数据）：记录后按未入库处理（回退静态快照）
      logServerError('solution-cases-admin.getSolutionCasePicks', 'picks failed zod revalidation', { key })
      return null
    }
    return { items: parsed.data, updatedAt: row.updatedAt.toISOString() }
  }
  catch (error) {
    logServerError('solution-cases-admin.getSolutionCasePicks', error, { key })
    return null
  }
}

/** 写推荐位（整列覆盖，upsert 幂等）：成功 true；未配置 DB 返回 false（端点 503）；
 *  未知案例 slug 抛 400（软外键存在性校验，zod 不碰 DB——同 015.16 assertCategoryExists 分层）；
 *  查询/写入异常记录日志后抛出（端点 500） */
export async function putSolutionCasePicks(key: SolutionCasePageKey, items: string[]): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  if (items.length > 0) {
    let knownSlugs: string[]
    try {
      const rows = await db.select({ slug: cases.slug }).from(cases).where(inArray(cases.slug, items))
      knownSlugs = rows.map(row => row.slug)
    }
    catch (error) {
      throw internalServerError('solution-cases-admin.putSolutionCasePicks', error, { key })
    }
    const known = new Set(knownSlugs)
    const missing = items.find(slug => !known.has(slug))
    if (missing !== undefined) {
      throw createError({ statusCode: 400, statusMessage: `Unknown case slug: ${missing}` })
    }
  }

  try {
    await db
      .insert(solutionCasePicks)
      .values({ key, items })
      .onConflictDoUpdate({ target: solutionCasePicks.key, set: { items, updatedAt: new Date() } })
    return true
  }
  catch (error) {
    throw internalServerError('solution-cases-admin.putSolutionCasePicks', error, { key })
  }
}

/** 公共读解析：picks 命中 → 按 items 顺序投影已发布案例（已删/转草稿的 slug 自动跳过，
 *  列表可能少于 3 条，不回退静态补齐——DB 有 picks 即 DB 为准）；
 *  picks 为空/无库/查询失败 → 静态回退（按页面映射分类过滤 caseResources，封顶 3 条） */
export async function resolveSolutionCases(key: SolutionCasePageKey): Promise<SolutionCasesResult> {
  const fallback = (): SolutionCasesResult => ({ items: staticSolutionCaseFallback(key), source: 'static' })

  const picks = await getSolutionCasePicks(key)
  if (!picks || picks.items.length === 0) {
    return fallback()
  }

  const db = useNewsDatabase()
  if (!db) {
    return fallback()
  }

  try {
    const rows = await db
      .select({
        slug: cases.slug,
        title: cases.title,
        summary: cases.summary,
        image: cases.image,
        solutionKey: cases.solutionKey,
      })
      .from(cases)
      .where(and(inArray(cases.slug, picks.items), eq(cases.status, 'published')))

    const bySlug = new Map(rows.map(row => [row.slug, row]))
    const items: CaseResource[] = []
    for (const slug of picks.items) {
      const row = bySlug.get(slug)
      if (!row) {
        continue
      }
      items.push({
        solutionKey: row.solutionKey ?? undefined,
        title: row.title,
        summary: row.summary,
        image: row.image,
        href: `/cases/${row.slug}`,
      })
    }
    return { items, source: 'db' }
  }
  catch (error) {
    logServerError('solution-cases-admin.resolveSolutionCases', error, { key })
    return fallback()
  }
}
