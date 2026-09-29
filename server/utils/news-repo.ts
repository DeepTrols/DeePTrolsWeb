import { and, desc, eq } from 'drizzle-orm'
import { getNewsByCategory, newsItems, type NewsCategory, type NewsItem } from '~/data/news'
import { getNewsDetailById as getStaticNewsDetailById, type NewsDetail } from '~/data/news-details'
import { useNewsDatabase } from '../db/client'
import { news, newsDetails } from '../db/schema'
import { parseArticleBlocks } from './article-blocks'
import { logServerError } from './server-log'

export interface NewsPayload {
  item: NewsItem
  detail: NewsDetail
}

/**
 * 新闻仓储（Phase 1 试点）：配置了 NUXT_DATABASE_URL 时读 PostgreSQL，
 * 未配置 / 查询失败时回退 data/*.ts 静态数据（种子数据源）。
 * 查询成功时 DB 结果是唯一事实源：列表为空返回空数组、详情行级未命中返回 null
 * （消费端点映射 404），保证后台下架（转草稿）/删除即时生效，静态种子不复活。
 * 查询失败的静态回退是刻意设计（公开读优雅降级），但 catch 必须经 logServerError 落日志，
 * 让生产故障可见、可排障（审计#6）。
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
        // 公开投影含 featured（015.15）：NewsHero 按分类取 featured 优先；公开字段无保密问题
        featured: news.featured,
      })
      .from(news)
      .where(and(...conditions))
      .orderBy(desc(news.publishedAt), desc(news.id))

    return rows
  }
  catch (error) {
    logServerError('news-repo.listNewsItems', error, category ? { category } : undefined)
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
      // 查询成功但无匹配行（已下架/删除/不存在）：DB 是唯一事实源，返回 null 由端点映射 404
      return null
    }

    const { blocks, ...item } = row
    return {
      item,
      detail: { id: row.id, blocks: parseArticleBlocks(blocks) },
    }
  }
  catch (error) {
    logServerError('news-repo.getNewsPayloadById', error, { id })
    return getStaticPayload(id)
  }
}

function getStaticPayload(id: number): NewsPayload | null {
  const item = newsItems.find(entry => entry.id === id)
  const detail = getStaticNewsDetailById(id)
  return item && detail ? { item, detail } : null
}
