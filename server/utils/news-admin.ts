import { desc, eq, max } from 'drizzle-orm'
import { z } from 'zod'
import type { ArticleBlock } from '~/types/article'
import { useNewsDatabase } from '../db/client'
import { news, newsDetails } from '../db/schema'
import { articleBlocksSchema, parseArticleBlocks } from './article-blocks'
import { isoDateSchema } from './content-admin'
import { internalServerError } from './server-log'

/** 新闻分类 key（015.16 起动态化：格式校验在此，存在性校验在写入路由经 category-admin.assertCategoryExists；静态快照见 data/news.ts newsCategoryTabs） */
export const newsCategorySchema = z.string().trim().min(1).max(50)
export const newsStatusSchema = z.enum(['draft', 'published'])

/** 新闻写入协议（admin 新建/更新同一形状；blocks 过 ArticleBlock 判别联合校验） */
export const newsInputSchema = z.object({
  title: z.string().trim().min(1).max(500),
  summary: z.string().trim().min(1),
  coverImage: z.string().trim().min(1).max(1000),
  category: newsCategorySchema,
  publishedAt: isoDateSchema,
  status: newsStatusSchema.default('draft'),
  featured: z.boolean().default(false),
  blocks: articleBlocksSchema,
})
export type NewsInput = z.infer<typeof newsInputSchema>

export interface AdminNewsRecord {
  id: number
  title: string
  category: z.infer<typeof newsCategorySchema>
  publishedAt: string
  status: z.infer<typeof newsStatusSchema>
  featured: boolean
  hasDetail: boolean
  updatedAt: string
}

export interface AdminNewsPayload {
  id: number
  title: string
  summary: string
  coverImage: string
  category: z.infer<typeof newsCategorySchema>
  publishedAt: string
  status: z.infer<typeof newsStatusSchema>
  featured: boolean
  /** 无详情行时为 null（旧数据可经更新补写） */
  blocks: ArticleBlock[] | null
}

/** 新闻列表（admin）：含草稿，最新更新在前；未配置 DB 返回空表；查询异常记录日志后抛出（端点 500） */
export async function listAdminNews(): Promise<AdminNewsRecord[]> {
  const db = useNewsDatabase()
  if (!db) {
    return []
  }

  try {
    const rows = await db
      .select({
        id: news.id,
        title: news.title,
        category: news.category,
        publishedAt: news.publishedAt,
        status: news.status,
        featured: news.featured,
        detailId: newsDetails.newsId,
        updatedAt: news.updatedAt,
      })
      .from(news)
      .leftJoin(newsDetails, eq(newsDetails.newsId, news.id))
      .orderBy(desc(news.updatedAt), desc(news.id))
      .limit(500)

    return rows.map(row => ({
      id: row.id,
      title: row.title,
      category: row.category,
      publishedAt: row.publishedAt,
      status: row.status,
      featured: row.featured,
      hasDetail: row.detailId !== null,
      updatedAt: row.updatedAt.toISOString(),
    }))
  }
  catch (error) {
    throw internalServerError('news-admin.listAdminNews', error)
  }
}

/** 编辑载荷：含 blocks；无详情行时 blocks 为 null（表单显示空态）；未配置 DB/未命中返回 null，异常记录日志后抛出（端点 500） */
export async function getAdminNews(id: number): Promise<AdminNewsPayload | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
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
        status: news.status,
        featured: news.featured,
        blocks: newsDetails.blocks,
      })
      .from(news)
      .leftJoin(newsDetails, eq(newsDetails.newsId, news.id))
      .where(eq(news.id, id))
      .limit(1)

    const row = rows[0]
    if (!row) {
      return null
    }
    return {
      ...row,
      blocks: row.blocks ? parseArticleBlocks(row.blocks) : null,
    }
  }
  catch (error) {
    throw internalServerError('news-admin.getAdminNews', error, { id })
  }
}

/**
 * postgres 23505（unique_violation）判定（审计#15）：news/pages/reports 写路径共用——
 * createNews 据此对 max(id)+1 主键竞态重试，check-then-insert 的并发窗口据此映射为既有 conflict（409）语义。
 */
export function isUniqueViolationError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && (error as { code?: unknown }).code === '23505'
}

/** createNews 主键竞态重试上限（保守方案，不做 schema 迁移）：重试用尽仍 23505 → 按冲突语义抛 409 */
const CREATE_NEWS_MAX_RETRIES = 3

/**
 * 新建：id 取 max(id)+1（静态种子占用 1..N，新增顺延）；返回新 id，未配置 DB 返回 null。
 * 并发下两个请求可能算出同一 id（23505 主键冲突）：捕获后重算 id 重试（最多 CREATE_NEWS_MAX_RETRIES 次），
 * 仍冲突按重复语义抛 409（只落 warn，不算服务端故障）；其余异常记录日志后抛出（端点 500）。
 */
export async function createNews(input: NewsInput): Promise<number | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  const { blocks, ...fields } = input
  let conflictRetries = 0
  for (;;) {
    try {
      return await db.transaction(async (tx) => {
        const rows = await tx.select({ value: max(news.id) }).from(news)
        const id = (rows[0]?.value ?? 0) + 1
        await tx.insert(news).values({ id, ...fields })
        await tx.insert(newsDetails).values({ newsId: id, blocks: blocks as ArticleBlock[] })
        return id
      })
    }
    catch (error) {
      if (!isUniqueViolationError(error)) {
        throw internalServerError('news-admin.createNews', error)
      }
      conflictRetries += 1
      if (conflictRetries > CREATE_NEWS_MAX_RETRIES) {
        console.warn('[server] news-admin.createNews unique conflict persists', { retries: CREATE_NEWS_MAX_RETRIES })
        throw createError({ statusCode: 409, statusMessage: 'News id conflict' })
      }
      console.warn('[server] news-admin.createNews unique conflict, retrying', { attempt: conflictRetries })
    }
  }
}

/** 更新：列表字段全量替换 + 详情 upsert（缺详情行的旧数据可补写）；命中行返回 true，未配置 DB/未命中返回 false；异常记录日志后抛出（端点 500） */
export async function updateNews(id: number, input: NewsInput): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    return await db.transaction(async (tx) => {
      const { blocks, ...fields } = input
      const rows = await tx
        .update(news)
        .set({ ...fields, updatedAt: new Date() })
        .where(eq(news.id, id))
        .returning({ id: news.id })
      if (!rows.length) {
        return false
      }
      await tx
        .insert(newsDetails)
        .values({ newsId: id, blocks: blocks as ArticleBlock[], updatedAt: new Date() })
        .onConflictDoUpdate({ target: newsDetails.newsId, set: { blocks: blocks as ArticleBlock[], updatedAt: new Date() } })
      return true
    })
  }
  catch (error) {
    throw internalServerError('news-admin.updateNews', error, { id })
  }
}

/** 删除：详情行随 FK 级联；命中行返回 true，未配置 DB/未命中返回 false；异常记录日志后抛出（端点 500） */
export async function deleteNews(id: number): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const rows = await db.delete(news).where(eq(news.id, id)).returning({ id: news.id })
    return rows.length > 0
  }
  catch (error) {
    throw internalServerError('news-admin.deleteNews', error, { id })
  }
}

/**
 * featured 单列切换（审计#16）：只更新 featured 一列，不触碰 blocks 等其他字段——
 * 列表页推荐开关不再走「GET 整条 → 全量 PUT」读改写，缺正文的旧数据也可取消推荐。
 * 命中行返回 true；行不存在返回 false（端点 404）；未配置 DB 返回 null（端点 503）；异常记录日志后抛出（端点 500）。
 */
export async function setNewsFeatured(id: number, featured: boolean): Promise<boolean | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .update(news)
      .set({ featured })
      .where(eq(news.id, id))
      .returning({ id: news.id })
    return rows.length > 0
  }
  catch (error) {
    throw internalServerError('news-admin.setNewsFeatured', error, { id })
  }
}
