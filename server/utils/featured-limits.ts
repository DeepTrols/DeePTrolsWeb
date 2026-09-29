import { and, count, eq, ne } from 'drizzle-orm'
import { useNewsDatabase } from '../db/client'
import { cases, news, reports } from '../db/schema'
import { HOME_INSIGHTS_MAX_ITEMS } from './home-insights'
import { internalServerError } from './server-log'

/**
 * 推荐位规则收敛（015.15）：推荐置位的集中预算校验。
 *
 * 背景：首页「创新、洞察与新闻」只展示 4 条（HOME_INSIGHTS_MAX_ITEMS），
 * 案例页 flow-root 精选区只展示 3 条——推荐无上限时管理员推 10 条也只生效前 N 条且不自知。
 * 决策：硬限制，超限时写入路径一律 409 拒绝（管理员先取消其他推荐）。
 *
 * 预算口径：
 * - home：news.featured + reports.featured 合并计数（合并语义与 home-insights.ts 一致），上限 4
 * - cases：cases.featured 计数，上限 3
 *
 * 并发：check-then-set 存在竞态窗口（两个请求同时通过校验）；管理后台低频操作，一期接受。
 */

/** 推荐位上限（home 复用 HOME_INSIGHTS_MAX_ITEMS，保持与展示端同一常量） */
export const FEATURED_LIMITS = { cases: 3, home: HOME_INSIGHTS_MAX_ITEMS } as const
export type FeaturedScope = keyof typeof FEATURED_LIMITS

/** 预算校验的排除项：更新已 featured 的行时排除自身，避免「保持推荐状态」被误判为新增占用 */
export interface FeaturedBudgetExclusion {
  /** home 场景排除的新闻 id（PUT 更新已推荐的新闻自身） */
  newsId?: number
  /** home 场景排除的报告 id */
  reportId?: number
  /** cases 场景排除的案例 slug */
  caseSlug?: string
}

/**
 * 统计某推荐位当前 featured 数量（排除项不计入）。
 * 未配置 DB 返回 null 哨兵（端点映射 503）；查询异常记录日志后抛出（端点 500）。
 */
export async function countFeatured(scope: FeaturedScope, exclude: FeaturedBudgetExclusion = {}): Promise<number | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    if (scope === 'home') {
      const newsRows = await db
        .select({ value: count() })
        .from(news)
        .where(exclude.newsId === undefined ? eq(news.featured, true) : and(eq(news.featured, true), ne(news.id, exclude.newsId)))
      const reportRows = await db
        .select({ value: count() })
        .from(reports)
        .where(exclude.reportId === undefined ? eq(reports.featured, true) : and(eq(reports.featured, true), ne(reports.id, exclude.reportId)))
      return (newsRows[0]?.value ?? 0) + (reportRows[0]?.value ?? 0)
    }
    const caseRows = await db
      .select({ value: count() })
      .from(cases)
      .where(exclude.caseSlug === undefined ? eq(cases.featured, true) : and(eq(cases.featured, true), ne(cases.slug, exclude.caseSlug)))
    return caseRows[0]?.value ?? 0
  }
  catch (error) {
    throw internalServerError('featured-limits.countFeatured', error, { scope })
  }
}

/**
 * 置位前预算校验：无 DB 返回 null 哨兵（端点先判 503）；已达上限抛 409；其余通过（返回 void）。
 * 仅在「置为 true」的路径调用——取消推荐永远放行。
 */
export async function assertFeaturedBudget(scope: FeaturedScope, exclude: FeaturedBudgetExclusion = {}): Promise<null | void> {
  const current = await countFeatured(scope, exclude)
  if (current === null) {
    return null
  }
  if (current >= FEATURED_LIMITS[scope]) {
    throw createError({
      statusCode: 409,
      statusMessage: scope === 'home'
        ? `Home featured limit reached (${FEATURED_LIMITS.home})`
        : `Case featured limit reached (${FEATURED_LIMITS.cases})`,
    })
  }
}
