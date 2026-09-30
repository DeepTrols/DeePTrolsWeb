/**
 * 种子脚本：data/*.ts → PostgreSQL（幂等 upsert：news 按 id、cases 按 slug、reports 按 href、nav_menus 按 key）。
 * 用法：NUXT_DATABASE_URL=postgres://... pnpm db:seed
 * 静态数据是迁移期的唯一事实源，入库后冻结、以库为准。
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { caseResources } from '../data/cases'
import { caseDetails } from '../data/case-details'
import { footerColumns, footerSocials } from '../data/footer'
import { primaryNavigation } from '../data/navigation'
import { newsItems } from '../data/news'
import { newsDetails } from '../data/news-details'
import { reportResources } from '../data/reports'
import {
  caseDetails as caseDetailsTable,
  cases,
  navMenus,
  news,
  newsDetails as newsDetailsTable,
  pages,
  reports,
} from '../server/db/schema'
import { parseArticleBlocks } from '../server/utils/article-blocks'
import { parseCaseRelatedProducts } from '../server/utils/cases-repo'
import { ABOUT_PAGE_SLUG, ABOUT_PAGE_TITLE, buildAboutPageSeed } from '../server/utils/about-page'
import { buildHomePageSeed, HOME_PAGE_SLUG, HOME_PAGE_TITLE } from '../server/utils/home-page'
import { parseMenuItems } from '../server/utils/menu-admin'

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
      metrics: item.metrics ?? [],
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
        metrics: item.metrics ?? [],
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

const menuSeeds = [
  { key: 'header' as const, items: primaryNavigation },
  { key: 'footer' as const, items: { columns: footerColumns, socials: footerSocials } },
]
for (const menu of menuSeeds) {
  const parsed = parseMenuItems(menu.key, menu.items)
  if (!parsed) {
    console.error(`菜单静态数据未通过 zod 校验，终止种子：${menu.key}`)
    process.exit(1)
  }
  await db
    .insert(navMenus)
    .values({ key: menu.key, items: parsed })
    .onConflictDoUpdate({ target: navMenus.key, set: { items: parsed, updatedAt: new Date() } })
}

// 首页接管 seed（015.18c）：刻意 onConflictDoNothing（不同于上方 DoUpdate）——
// 页面接管后是运营资产，重复跑 seed 不得覆盖管理员编辑；初始状态 draft，发布前线上仍走代码渲染
await db
  .insert(pages)
  .values({
    slug: HOME_PAGE_SLUG,
    title: HOME_PAGE_TITLE,
    seoDescription: '',
    sortOrder: 0,
    status: 'draft',
    sections: buildHomePageSeed(),
  })
  .onConflictDoNothing({ target: pages.slug })

// 关于我们页接管 seed（015.20b）：同首页语义（DoNothing + draft）
await db
  .insert(pages)
  .values({
    slug: ABOUT_PAGE_SLUG,
    title: ABOUT_PAGE_TITLE,
    seoDescription: '',
    sortOrder: 0,
    status: 'draft',
    sections: buildAboutPageSeed(),
  })
  .onConflictDoNothing({ target: pages.slug })

await sql.end()
console.log(
  `种子完成：news ×${newsItems.length}，news_details ×${newsDetails.length}，`
  + `cases ×${caseResources.length}，case_details ×${caseDetails.length}，`
  + `reports ×${reportResources.length}，nav_menus ×${menuSeeds.length}（upsert 幂等），`
  + 'pages 首页/关于我们接管 seed（onConflictDoNothing）。',
)
