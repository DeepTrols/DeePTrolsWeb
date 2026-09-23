import { desc, eq, max } from 'drizzle-orm'
import { z } from 'zod'
import type { ArticleBlock } from '~/types/article'
import { useNewsDatabase } from '../db/client'
import { news, newsDetails } from '../db/schema'
import { articleBlocksSchema, parseArticleBlocks } from './article-blocks'
import { isoDateSchema } from './content-admin'

export const newsCategorySchema = z.enum(['company', 'media', 'insight'])
export const newsStatusSchema = z.enum(['draft', 'published'])

/** 新闻写入协议（admin 新建/更新同一形状；blocks 过 ArticleBlock 判别联合校验） */
export const newsInputSchema = z.object({
  title: z.string().trim().min(1).max(500),
  summary: z.string().trim().min(1),
  coverImage: z.string().trim().min(1).max(1000),
  category: newsCategorySchema,
  publishedAt: isoDateSchema,
  status: newsStatusSchema.default('draft'),
  blocks: articleBlocksSchema,
})
export type NewsInput = z.infer<typeof newsInputSchema>

export interface AdminNewsRecord {
  id: number
  title: string
  category: z.infer<typeof newsCategorySchema>
  publishedAt: string
  status: z.infer<typeof newsStatusSchema>
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
  /** 无详情行时为 null（旧数据可经更新补写） */
  blocks: ArticleBlock[] | null
}

/** 新闻列表（admin）：含草稿，最新更新在前；未配置 DB 返回空表 */
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
      hasDetail: row.detailId !== null,
      updatedAt: row.updatedAt.toISOString(),
    }))
  }
  catch {
    return []
  }
}

/** 编辑载荷：含 blocks；无详情行时 blocks 为 null（表单显示空态） */
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
  catch {
    return null
  }
}

/** 新建：id 取 max(id)+1（静态种子占用 1..N，新增顺延）；返回新 id，无 DB/失败返回 null */
export async function createNews(input: NewsInput): Promise<number | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    return await db.transaction(async (tx) => {
      const rows = await tx.select({ value: max(news.id) }).from(news)
      const id = (rows[0]?.value ?? 0) + 1
      const { blocks, ...fields } = input
      await tx.insert(news).values({ id, ...fields })
      await tx.insert(newsDetails).values({ newsId: id, blocks: blocks as ArticleBlock[] })
      return id
    })
  }
  catch {
    return null
  }
}

/** 更新：列表字段全量替换 + 详情 upsert（缺详情行的旧数据可补写）；命中行返回 true */
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
  catch {
    return false
  }
}

/** 删除：详情行随 FK 级联；命中行返回 true */
export async function deleteNews(id: number): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const rows = await db.delete(news).where(eq(news.id, id)).returning({ id: news.id })
    return rows.length > 0
  }
  catch {
    return false
  }
}
