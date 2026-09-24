import { and, asc, desc, eq } from 'drizzle-orm'
import { insights as staticInsights } from '~/data/home-insights'
import type { InsightItem } from '~/data/home-insights'
import { newsCategoryTabs } from '~/data/news'
import { useNewsDatabase } from '../../db/client'
import { news, reports } from '../../db/schema'

const MAX_ITEMS = 4

const newsCategoryLabels = new Map(newsCategoryTabs.map(tab => [tab.key, tab.label]))

/**
 * GET /api/home/insights — 首页「创新、洞察与新闻」推荐位（015.12）。
 * 合并规则：featured 且 published 的新闻（publishedAt desc）优先 → 报告（sortOrder asc）补足 → 封顶 4 条。
 * DB 不可用 / 查询异常 / 零推荐 → 回退 data/home-insights.ts 静态 insights（双层回退先例：页面层 useFetch 还有 default 兜底）。
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
      .limit(MAX_ITEMS)

    const items: InsightItem[] = newsRows.map(row => ({
      category: newsCategoryLabels.get(row.category) ?? row.category,
      title: row.title,
      summary: row.summary,
      image: row.coverImage,
      href: `/news/${row.id}`,
    }))

    if (items.length < MAX_ITEMS) {
      const reportRows = await db
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
        .limit(MAX_ITEMS - items.length)

      items.push(...reportRows)
    }

    return items.length > 0 ? items : staticInsights
  }
  catch {
    return staticInsights
  }
})
