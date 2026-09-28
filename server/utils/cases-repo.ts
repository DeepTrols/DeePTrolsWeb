import { and, asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { caseResources, type CaseResource } from '~/data/cases'
import { getCaseDetailBySlug, type CaseDetail, type CaseRelatedProduct } from '~/data/case-details'
import { useNewsDatabase } from '../db/client'
import { caseDetails, cases } from '../db/schema'
import { parseArticleBlocks } from './article-blocks'
import { isSafeUrl } from './safe-url'
import { logServerError } from './server-log'

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
 * 读侧 href 消毒（审计#22 纵深防御）：写侧已由 cases-admin 的 safeUrlSchema 封死，
 * 但历史入库的脏 href（如 javascript:）读取时仍会放行。这里消毒而非拒绝——
 * 不安全值替换为 '#' 并记日志（供 scripts/check-unsafe-urls.ts 存量排查对照），
 * 避免整行解析失败导致含脏数据的旧案例整体 404。
 */
function sanitizeCaseRelatedProducts(products: CaseRelatedProduct[], slug: string): CaseRelatedProduct[] {
  return products.map((product) => {
    if (isSafeUrl(product.href)) {
      return product
    }
    logServerError('cases-repo.sanitizeCaseRelatedProducts', 'unsafe relatedProducts href replaced with #', {
      slug,
      href: product.href,
    })
    return { ...product, href: '#' }
  })
}

/**
 * 案例仓储（Phase 1 复制）：配置了 NUXT_DATABASE_URL 时读 PostgreSQL，
 * 未配置 / 查询失败时回退 data/*.ts 静态数据（种子数据源）。
 * 查询成功时 DB 结果是唯一事实源：列表为空返回空数组、详情行级未命中返回 null
 * （消费端点映射 404），保证后台下架（转草稿）/删除即时生效，静态种子不复活。
 * 查询失败的静态回退是刻意设计（公开读优雅降级），但 catch 必须经 logServerError 落日志（审计#6）。
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

    return rows.map(row => ({
      solutionKey: row.solutionKey ?? undefined,
      title: row.title,
      summary: row.summary,
      image: row.image,
      href: `/cases/${row.slug}`,
    }))
  }
  catch (error) {
    logServerError('cases-repo.listCaseResources', error)
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
      // 查询成功但无匹配行（已下架/删除/不存在）：DB 是唯一事实源，返回 null 由端点映射 404
      return null
    }

    return {
      detail: {
        slug: row.slug,
        title: row.title,
        categoryKey: row.categoryKey,
        heroImage: row.heroImage,
        blocks: parseArticleBlocks(row.blocks),
        relatedProducts: sanitizeCaseRelatedProducts(parseCaseRelatedProducts(row.relatedProducts), row.slug),
      },
      resources,
    }
  }
  catch (error) {
    logServerError('cases-repo.getCasePayloadBySlug', error, { slug })
    return getStaticCasePayload(slug, resources)
  }
}

function getStaticCasePayload(slug: string, resources: CaseResource[]): CasePayload | null {
  const detail = getCaseDetailBySlug(slug)
  return detail ? { detail, resources } : null
}
