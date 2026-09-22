import { and, desc, eq } from 'drizzle-orm'
import { getNewsByCategory, newsItems, type NewsCategory, type NewsItem } from '~/data/news'
import { getNewsDetailById as getStaticNewsDetailById, type NewsDetail } from '~/data/news-details'
import { useNewsDatabase } from '../db/client'
import { news, newsDetails } from '../db/schema'
import { parseArticleBlocks } from './article-blocks'

export interface NewsPayload {
  item: NewsItem
  detail: NewsDetail
}

/**
 * 新闻仓储（Phase 1 试点）：配置了 NUXT_DATABASE_URL 时读 PostgreSQL，
 * 未配置 / 查询失败 / 表为空时回退 data/*.ts 静态数据（种子数据源）。
 * 前端页面只依赖本仓储的返回结构，无需感知数据来源。
 */
export async function listNewsItems(category?: NewsCategory): Promise<NewsItem[]> {
  const fallback = category ? getNewsByCategory(category) : newsItems
  const db = useNewsDatabase()
  if (!db) {
    return fallback
  }

  try {
    const conditions = [eq(news.status, 'published')]
    if (category) {
      conditions.push(eq(news.category, category))
    }
    const rows = await db
      .select({
        id: news.id,
        title: news.title,
        summary: news.summary,
        coverImage: news.coverImage,
        category: news.category,
        publishedAt: news.publishedAt,
      })
      .from(news)
      .where(and(...conditions))
      .orderBy(desc(news.publishedAt), desc(news.id))

    if (!rows.length) {
      return fallback
    }
    return rows
  }
  catch {
    return fallback
  }
}

export async function getNewsPayloadById(id: number): Promise<NewsPayload | null> {
  const db = useNewsDatabase()
  if (!db) {
    return getStaticPayload(id)
  }

  try {
    const rows = await db
      .select({
        id: news.id,
        title: news.title,
        summary: news.summary,
        coverImage: news.coverImage,
        category: news.category,
        publishedAt: news.publishedAt,
        blocks: newsDetails.blocks,
      })
      .from(news)
      .innerJoin(newsDetails, eq(newsDetails.newsId, news.id))
      .where(and(eq(news.id, id), eq(news.status, 'published')))
      .limit(1)

    const row = rows[0]
    if (!row) {
      return getStaticPayload(id)
    }

    const { blocks, ...item } = row
    return {
      item,
      detail: { id: row.id, blocks: parseArticleBlocks(blocks) },
    }
  }
  catch {
    return getStaticPayload(id)
  }
}

function getStaticPayload(id: number): NewsPayload | null {
  const item = newsItems.find(entry => entry.id === id)
  const detail = getStaticNewsDetailById(id)
  return item && detail ? { item, detail } : null
}
