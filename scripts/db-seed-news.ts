/**
 * 种子脚本：data/news.ts + data/news-details.ts → PostgreSQL（幂等 upsert，按 id）。
 * 用法：NUXT_DATABASE_URL=postgres://... pnpm db:seed
 * 静态数据是迁移期的唯一事实源，入库后冻结、以库为准。
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { newsItems } from '../data/news'
import { newsDetails } from '../data/news-details'
import { news, newsDetails as newsDetailsTable } from '../server/db/schema'
import { parseArticleBlocks } from '../server/utils/article-blocks'

const databaseUrl = process.env.NUXT_DATABASE_URL ?? process.env.DATABASE_URL
if (!databaseUrl) {
  console.error('缺少 NUXT_DATABASE_URL（或 DATABASE_URL），无法连接 PostgreSQL。')
  process.exit(1)
}

const detailIds = new Set(newsDetails.map(detail => detail.id))
const missingDetail = newsItems.filter(item => !detailIds.has(item.id))
if (missingDetail.length) {
  console.error(`以下新闻缺少详情正文，终止种子：${missingDetail.map(item => item.id).join(', ')}`)
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

await sql.end()
console.log(`种子完成：news ×${newsItems.length}，news_details ×${newsDetails.length}（upsert 幂等）。`)
