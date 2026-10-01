import { and, asc, desc, eq } from 'drizzle-orm'
import { insights as staticInsights } from '~/data/home-insights'
import type { InsightItem } from '~/data/home-insights'
import { useNewsDatabase } from '../../db/client'
import { news, reports } from '../../db/schema'
import { HOME_INSIGHTS_MAX_ITEMS, type InsightReportRow, mergeHomeInsights } from '../../utils/home-insights'
import { logServerError } from '../../utils/server-log'

/**
 * GET /api/home/insights — 首页「创新、洞察与新闻」推荐位（015.12）。
 * 合并规则：featured 且 published 的新闻（publishedAt desc）优先 → 报告（sortOrder asc）补足 → 封顶 4 条；
 * 合并/截断/映射已抽为纯函数 server/utils/home-insights.ts（审计#19，行为级测试见 tests/audit-insights-merge.spec.ts），
 * 本端点保留 DB 查询（featured/published 过滤与排序）与静态回退决策。
 * DB 不可用 / 查询异常 / 零推荐 → 回退 data/home-insights.ts 静态 insights（双层回退先例：页面层 useFetch 还有 default 兜底）。
 * 查询异常的回退是刻意设计（公开读优雅降级），但必须经 logServerError 落日志让故障可见（审计#6）。
 */
export default defineEventHandler(async (): Promise<InsightItem[]> => {
  const db = useNewsDatabase()
  if (!db) {
    return staticInsights
  }

  try {
    const newsRows = await db
      .select({
        id: news.id,
        title: news.title,
        summary: news.summary,
        coverImage: news.coverImage,
        category: news.category,
      })
      .from(news)
      .where(and(eq(news.status, 'published'), eq(news.featured, true)))
      .orderBy(desc(news.publishedAt), desc(news.id))
      .limit(HOME_INSIGHTS_MAX_ITEMS)

    // 新闻已填满上限时不再查报告（与原内联实现一致的按需查询）
    let reportRows: InsightReportRow[] = []
    if (newsRows.length < HOME_INSIGHTS_MAX_ITEMS) {
      reportRows = await db
        .select({
          title: reports.title,
          summary: reports.summary,
          image: reports.image,
          href: reports.href,
          category: reports.category,
        })
        .from(reports)
        .where(and(eq(reports.status, 'published'), eq(reports.featured, true)))
        .orderBy(asc(reports.sortOrder), asc(reports.id))
        .limit(HOME_INSIGHTS_MAX_ITEMS - newsRows.length)
    }

    const items = mergeHomeInsights(newsRows, reportRows, HOME_INSIGHTS_MAX_ITEMS)
    return items.length > 0 ? items : staticInsights
  }
  catch (error) {
    logServerError('api.home.insights', error)
    return staticInsights
  }
})
