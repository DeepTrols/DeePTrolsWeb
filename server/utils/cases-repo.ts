import { and, asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { caseResources, type CaseResource } from '~/data/cases'
import { getCaseDetailBySlug, type CaseDetail, type CaseRelatedProduct } from '~/data/case-details'
import { useNewsDatabase } from '../db/client'
import { caseDetails, cases } from '../db/schema'
import { parseArticleBlocks } from './article-blocks'

export interface CasePayload {
  detail: CaseDetail
  resources: CaseResource[]
}

/** relatedProducts jsonb 的运行时校验（写入/读取边界统一过这层） */
const caseRelatedProductSchema = z.object({
  name: z.string().min(1),
  desc: z.string().min(1),
  href: z.string().min(1),
})

export function parseCaseRelatedProducts(input: unknown): CaseRelatedProduct[] {
  return z.array(caseRelatedProductSchema).parse(input)
}

/**
 * 案例仓储（Phase 1 复制）：配置了 NUXT_DATABASE_URL 时读 PostgreSQL，
 * 未配置 / 查询失败 / 表为空时回退 data/*.ts 静态数据（种子数据源）。
 */
export async function listCaseResources(): Promise<CaseResource[]> {
  const db = useNewsDatabase()
  if (!db) {
    return caseResources
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
      .where(eq(cases.status, 'published'))
      .orderBy(asc(cases.sortOrder))

    if (!rows.length) {
      return caseResources
    }
    return rows.map(row => ({
      solutionKey: row.solutionKey ?? undefined,
      title: row.title,
      summary: row.summary,
      image: row.image,
      href: `/cases/${row.slug}`,
    }))
  }
  catch {
    return caseResources
  }
}

export async function getCasePayloadBySlug(slug: string): Promise<CasePayload | null> {
  const resources = await listCaseResources()
  const db = useNewsDatabase()
  if (!db) {
    return getStaticCasePayload(slug, resources)
  }

  try {
    const rows = await db
      .select({
        slug: cases.slug,
        title: caseDetails.title,
        categoryKey: caseDetails.categoryKey,
        heroImage: caseDetails.heroImage,
        blocks: caseDetails.blocks,
        relatedProducts: caseDetails.relatedProducts,
      })
      .from(cases)
      .innerJoin(caseDetails, eq(caseDetails.caseSlug, cases.slug))
      .where(and(eq(cases.slug, slug), eq(cases.status, 'published')))
      .limit(1)

    const row = rows[0]
    if (!row) {
      return getStaticCasePayload(slug, resources)
    }

    return {
      detail: {
        slug: row.slug,
        title: row.title,
        categoryKey: row.categoryKey,
        heroImage: row.heroImage,
        blocks: parseArticleBlocks(row.blocks),
        relatedProducts: parseCaseRelatedProducts(row.relatedProducts),
      },
      resources,
    }
  }
  catch {
    return getStaticCasePayload(slug, resources)
  }
}

function getStaticCasePayload(slug: string, resources: CaseResource[]): CasePayload | null {
  const detail = getCaseDetailBySlug(slug)
  return detail ? { detail, resources } : null
}
