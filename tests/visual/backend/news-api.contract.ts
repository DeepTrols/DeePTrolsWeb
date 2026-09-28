import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerBackendNewsVisualContracts() {
  it('serves the news pilot through Nitro with drizzle schema, repo fallback, and zod block validation', () => {
    const schema = readComponent('server/db/schema.ts')
    const client = readComponent('server/db/client.ts')
    const repo = readComponent('server/utils/news-repo.ts')
    const blocks = readComponent('server/utils/article-blocks.ts')
    const listApi = readComponent('server/api/news/index.get.ts')
    const detailApi = readComponent('server/api/news/[id].get.ts')
    const seed = readComponent('scripts/db-seed.ts')
    const drizzleConfig = readComponent('drizzle.config.ts')
    const nuxtConfig = readComponent('nuxt.config.ts')
    const listPage = readComponent('pages/news/index.vue')
    const detailPage = readComponent('pages/news/[id].vue')

    expect(schema).toContain("pgEnum('news_category', ['company', 'media', 'insight'])")
    expect(schema).toContain("pgEnum('news_status', ['draft', 'published'])")
    expect(schema).toContain("pgTable('news'")
    expect(schema).toContain("pgTable('news_details'")
    expect(schema).toContain("jsonb('blocks').$type<ArticleBlock[]>()")
    expect(schema).toContain("date('published_at', { mode: 'string' })")
    expect(schema).not.toContain('<style')

    expect(client).toContain("drizzle(postgres(databaseUrl, { max: 5 }), { schema })")
    expect(client).toContain('return null')

    expect(repo).toContain('useNewsDatabase')
    expect(repo).toContain('getNewsByCategory')
    expect(repo).toContain('export async function listNewsItems(category?: NewsCategory)')
    expect(repo).toContain('export async function getNewsPayloadById(id: number)')
    expect(repo).toContain("eq(news.status, 'published')")
    expect(repo).toContain('desc(news.publishedAt), desc(news.id)')
    expect(repo).toContain('parseArticleBlocks(blocks)')
    expect(repo).toContain('getStaticPayload')

    expect(blocks).toContain("z.discriminatedUnion('type'")
    expect(blocks).toContain('export function parseArticleBlocks(input: unknown): ArticleBlock[]')

    expect(listApi).toContain('listNewsItems')
    expect(listApi).toContain('newsCategoryTabs.some(tab => tab.key === query.category)')
    expect(detailApi).toContain('getNewsPayloadById')
    expect(detailApi).toContain("statusCode: 404")
    expect(detailApi).toContain("statusCode: 400")

    expect(seed).toContain('onConflictDoUpdate')
    expect(seed).toContain('parseArticleBlocks(detail.blocks)')
    expect(seed).toContain('newsItems.length')

    expect(drizzleConfig).toContain("dialect: 'postgresql'")
    expect(drizzleConfig).toContain("schema: './server/db/schema.ts'")
    expect(nuxtConfig).toContain('databaseUrl')

    expect(listPage).toContain("useFetch<NewsItem[]>('/api/news'")
    expect(listPage).toContain('default: () => newsItems')
    expect(detailPage).toContain('useFetch<NewsPayload>(() => `/api/news/${routeId.value}`')
    // 失败双语义（审计#22）：API 明确 404 → 页面 404（不回退静态种子）；其他失败 → 静态兜底保渲染
    expect(detailPage).toContain('error.value?.statusCode === 404')
    expect(detailPage).toContain('payload.value?.item ?? newsItems.find')
    expect(detailPage).toContain('payload.value?.detail ?? getNewsDetailById')
  })
}
