/**
 * 种子脚本：data/*.ts → PostgreSQL（幂等 upsert：news 按 id、cases 按 slug、reports 按 href）。
 * 用法：NUXT_DATABASE_URL=postgres://... pnpm db:seed
 * 静态数据是迁移期的唯一事实源，入库后冻结、以库为准。
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { caseResources } from '../data/cases'
import { caseDetails } from '../data/case-details'
import { newsItems } from '../data/news'
import { newsDetails } from '../data/news-details'
import { reportResources } from '../data/reports'
import {
  caseDetails as caseDetailsTable,
  cases,
  news,
  newsDetails as newsDetailsTable,
  reports,
} from '../server/db/schema'
import { parseArticleBlocks } from '../server/utils/article-blocks'
import { parseCaseRelatedProducts } from '../server/utils/cases-repo'

const databaseUrl = process.env.NUXT_DATABASE_URL ?? process.env.DATABASE_URL
if (!databaseUrl) {
  console.error('缺少 NUXT_DATABASE_URL（或 DATABASE_URL），无法连接 PostgreSQL。')
  process.exit(1)
}

const newsDetailIds = new Set(newsDetails.map(detail => detail.id))
const missingNewsDetail = newsItems.filter(item => !newsDetailIds.has(item.id))
if (missingNewsDetail.length) {
  console.error(`以下新闻缺少详情正文，终止种子：${missingNewsDetail.map(item => item.id).join(', ')}`)
  process.exit(1)
}

const caseDetailSlugs = new Set(caseDetails.map(detail => detail.slug))
const caseSlugOf = (href: string) => href.replace(/^\/cases\//, '')
const missingCaseDetail = caseResources.filter(item => !caseDetailSlugs.has(caseSlugOf(item.href)))
if (missingCaseDetail.length) {
  console.error(`以下案例缺少详情正文，终止种子：${missingCaseDetail.map(item => item.href).join(', ')}`)
  process.exit(1)
}

const sql = postgres(databaseUrl, { max: 1 })
const db = drizzle(sql)

for (const item of newsItems) {
  await db
    .insert(news)
    .values({
      id: item.id,
      title: item.title,
      summary: item.summary,
      coverImage: item.coverImage,
      category: item.category,
      publishedAt: item.publishedAt,
      status: 'published',
    })
    .onConflictDoUpdate({
      target: news.id,
      set: {
        title: item.title,
        summary: item.summary,
        coverImage: item.coverImage,
        category: item.category,
        publishedAt: item.publishedAt,
        status: 'published',
        updatedAt: new Date(),
      },
    })

  const detail = newsDetails.find(entry => entry.id === item.id)!
  await db
    .insert(newsDetailsTable)
    .values({ newsId: item.id, blocks: parseArticleBlocks(detail.blocks) })
    .onConflictDoUpdate({
      target: newsDetailsTable.newsId,
      set: { blocks: parseArticleBlocks(detail.blocks), updatedAt: new Date() },
    })
}

for (const [index, item] of caseResources.entries()) {
  const slug = caseSlugOf(item.href)
  await db
    .insert(cases)
    .values({
      slug,
      title: item.title,
      summary: item.summary,
      image: item.image,
      solutionKey: item.solutionKey ?? null,
      sortOrder: index,
      status: 'published',
    })
    .onConflictDoUpdate({
      target: cases.slug,
      set: {
        title: item.title,
        summary: item.summary,
        image: item.image,
        solutionKey: item.solutionKey ?? null,
        sortOrder: index,
        status: 'published',
        updatedAt: new Date(),
      },
    })

  const detail = caseDetails.find(entry => entry.slug === slug)!
  await db
    .insert(caseDetailsTable)
    .values({
      caseSlug: slug,
      title: detail.title,
      categoryKey: detail.categoryKey,
      heroImage: detail.heroImage,
      blocks: parseArticleBlocks(detail.blocks),
      relatedProducts: parseCaseRelatedProducts(detail.relatedProducts),
    })
    .onConflictDoUpdate({
      target: caseDetailsTable.caseSlug,
      set: {
        title: detail.title,
        categoryKey: detail.categoryKey,
        heroImage: detail.heroImage,
        blocks: parseArticleBlocks(detail.blocks),
        relatedProducts: parseCaseRelatedProducts(detail.relatedProducts),
        updatedAt: new Date(),
      },
    })
}

for (const [index, item] of reportResources.entries()) {
  await db
    .insert(reports)
    .values({
      type: item.type,
      category: item.category,
      solutionKey: item.solutionKey ?? null,
      title: item.title,
      summary: item.summary,
      image: item.image,
      href: item.href,
      sortOrder: index,
      status: 'published',
    })
    .onConflictDoUpdate({
      target: reports.href,
      set: {
        type: item.type,
        category: item.category,
        solutionKey: item.solutionKey ?? null,
        title: item.title,
        summary: item.summary,
        image: item.image,
        sortOrder: index,
        status: 'published',
        updatedAt: new Date(),
      },
    })
}

await sql.end()
console.log(
  `种子完成：news ×${newsItems.length}，news_details ×${newsDetails.length}，`
  + `cases ×${caseResources.length}，case_details ×${caseDetails.length}，`
  + `reports ×${reportResources.length}（upsert 幂等）。`,
)
