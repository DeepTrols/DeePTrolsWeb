import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import type { ArticleBlock } from '~/types/article'
import type { CaseRelatedProduct } from '~/data/case-details'
import { useNewsDatabase } from '../db/client'
import { caseDetails, cases } from '../db/schema'
import { articleBlocksSchema, parseArticleBlocks } from './article-blocks'
import { contentStatusSchema, solutionKeySchema } from './content-admin'
import { safeUrlSchema } from './safe-url'
import { internalServerError } from './server-log'

/** slug 协议：与公开路由 /cases/[slug] 段一致 */
export const caseSlugSchema = z.string().regex(/^[a-z0-9][a-z0-9-]*$/).max(200)

const relatedProductSchema = z.object({
  name: z.string().min(1),
  desc: z.string().min(1),
  href: safeUrlSchema(),
})

/** 案例写入协议（新建含 slug；slug 为主键不可改，更新走 caseUpdateSchema） */
export const caseInputSchema = z.object({
  slug: caseSlugSchema,
  title: z.string().trim().min(1).max(500),
  summary: z.string().trim().min(1),
  image: z.string().trim().min(1).max(1000),
  solutionKey: solutionKeySchema.nullable().default(null),
  sortOrder: z.number().int().min(0),
  status: contentStatusSchema.default('draft'),
  detailTitle: z.string().trim().min(1).max(500),
  categoryKey: solutionKeySchema,
  heroImage: z.string().trim().min(1).max(1000),
  blocks: articleBlocksSchema,
  relatedProducts: z.array(relatedProductSchema),
})
export const caseUpdateSchema = caseInputSchema.omit({ slug: true })
export type CaseInput = z.infer<typeof caseInputSchema>
export type CaseUpdate = z.infer<typeof caseUpdateSchema>

export interface AdminCaseRecord {
  slug: string
  title: string
  solutionKey: string | null
  sortOrder: number
  status: z.infer<typeof contentStatusSchema>
  hasDetail: boolean
  updatedAt: string
}

export type AdminCasePayload = CaseInput

/** 案例列表（admin）：含草稿，按 sortOrder；未配置 DB 返回空表；查询异常记录日志后抛出（端点 500） */
export async function listAdminCases(): Promise<AdminCaseRecord[]> {
  const db = useNewsDatabase()
  if (!db) {
    return []
  }

  try {
    const rows = await db
      .select({
        slug: cases.slug,
        title: cases.title,
        solutionKey: cases.solutionKey,
        sortOrder: cases.sortOrder,
        status: cases.status,
        detailSlug: caseDetails.caseSlug,
        updatedAt: cases.updatedAt,
      })
      .from(cases)
      .leftJoin(caseDetails, eq(caseDetails.caseSlug, cases.slug))
      .orderBy(asc(cases.sortOrder))
      .limit(500)

    return rows.map(row => ({
      slug: row.slug,
      title: row.title,
      solutionKey: row.solutionKey,
      sortOrder: row.sortOrder,
      status: row.status,
      hasDetail: row.detailSlug !== null,
      updatedAt: row.updatedAt.toISOString(),
    }))
  }
  catch (error) {
    throw internalServerError('cases-admin.listAdminCases', error)
  }
}

/** 编辑载荷；无详情行时返回 null（案例必须有详情才有意义，缺详情视为不可用）；未配置 DB/未命中返回 null，异常记录日志后抛出（端点 500） */
export async function getAdminCase(slug: string): Promise<AdminCasePayload | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .select({
        slug: cases.slug,
        title: cases.title,
        summary: cases.summary,
        image: cases.image,
        solutionKey: cases.solutionKey,
        sortOrder: cases.sortOrder,
        status: cases.status,
        detailTitle: caseDetails.title,
        categoryKey: caseDetails.categoryKey,
        heroImage: caseDetails.heroImage,
        blocks: caseDetails.blocks,
        relatedProducts: caseDetails.relatedProducts,
      })
      .from(cases)
      .innerJoin(caseDetails, eq(caseDetails.caseSlug, cases.slug))
      .where(eq(cases.slug, slug))
      .limit(1)

    const row = rows[0]
    if (!row) {
      return null
    }
    return {
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      image: row.image,
      solutionKey: row.solutionKey,
      sortOrder: row.sortOrder,
      status: row.status,
      detailTitle: row.detailTitle,
      categoryKey: row.categoryKey,
      heroImage: row.heroImage,
      blocks: parseArticleBlocks(row.blocks),
      relatedProducts: row.relatedProducts as CaseRelatedProduct[],
    }
  }
  catch (error) {
    throw internalServerError('cases-admin.getAdminCase', error, { slug })
  }
}

/** 新建：slug 冲突返回 'conflict'；成功返回 slug；未配置 DB 返回 null；异常记录日志后抛出（端点 500） */
export async function createCase(input: CaseInput): Promise<'conflict' | string | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    return await db.transaction(async (tx) => {
      const existing = await tx.select({ slug: cases.slug }).from(cases).where(eq(cases.slug, input.slug)).limit(1)
      if (existing.length) {
        return 'conflict'
      }
      const { slug, title, summary, image, solutionKey, sortOrder, status, detailTitle, categoryKey, heroImage, blocks, relatedProducts } = input
      await tx.insert(cases).values({ slug, title, summary, image, solutionKey, sortOrder, status })
      await tx.insert(caseDetails).values({
        caseSlug: slug,
        title: detailTitle,
        categoryKey,
        heroImage,
        blocks: blocks as ArticleBlock[],
        relatedProducts: relatedProducts as CaseRelatedProduct[],
      })
      return slug
    })
  }
  catch (error) {
    throw internalServerError('cases-admin.createCase', error, { slug: input.slug })
  }
}

/** 更新：slug 不变，其余全量替换；命中行返回 true，未配置 DB/未命中返回 false；异常记录日志后抛出（端点 500） */
export async function updateCase(slug: string, input: CaseUpdate): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    return await db.transaction(async (tx) => {
      const { title, summary, image, solutionKey, sortOrder, status, detailTitle, categoryKey, heroImage, blocks, relatedProducts } = input
      const rows = await tx
        .update(cases)
        .set({ title, summary, image, solutionKey, sortOrder, status, updatedAt: new Date() })
        .where(eq(cases.slug, slug))
        .returning({ slug: cases.slug })
      if (!rows.length) {
        return false
      }
      await tx
        .update(caseDetails)
        .set({
          title: detailTitle,
          categoryKey,
          heroImage,
          blocks: blocks as ArticleBlock[],
          relatedProducts: relatedProducts as CaseRelatedProduct[],
          updatedAt: new Date(),
        })
        .where(eq(caseDetails.caseSlug, slug))
      return true
    })
  }
  catch (error) {
    throw internalServerError('cases-admin.updateCase', error, { slug })
  }
}

/** 删除：详情行随 FK 级联；命中行返回 true，未配置 DB/未命中返回 false；异常记录日志后抛出（端点 500） */
export async function deleteCase(slug: string): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const rows = await db.delete(cases).where(eq(cases.slug, slug)).returning({ slug: cases.slug })
    return rows.length > 0
  }
  catch (error) {
    throw internalServerError('cases-admin.deleteCase', error, { slug })
  }
}
