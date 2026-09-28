export function checkBackendNewsContracts(ctx) {
  const {
    assert,
    backendNewsSchema,
    backendNewsClient,
    backendNewsRepo,
    backendArticleBlocks,
    backendNewsListApi,
    backendNewsDetailApi,
    backendNewsSeed,
    backendDrizzleConfig,
    backendNuxtConfig,
    newsPage,
    newsDetailPage,
  } = ctx

  assert(
    backendNewsSchema.includes("pgEnum('news_category', ['company', 'media', 'insight'])") &&
      backendNewsSchema.includes("pgEnum('news_status', ['draft', 'published'])") &&
      backendNewsSchema.includes("pgTable('news'") &&
      backendNewsSchema.includes("pgTable('news_details'") &&
      backendNewsSchema.includes("jsonb('blocks').$type<ArticleBlock[]>()") &&
      backendNewsSchema.includes("date('published_at', { mode: 'string' })") &&
      backendNewsSchema.includes("onDelete: 'cascade'"),
    'Backend news schema must mirror NewsItem/NewsDetail with enum constraints, jsonb ArticleBlock blocks, and a cascading 1:1 detail table.',
  )

  assert(
    backendNewsClient.includes('useNewsDatabase') &&
      backendNewsClient.includes("drizzle(postgres(databaseUrl, { max: 5 }), { schema })") &&
      backendNewsClient.includes('return null'),
    'Backend db client must stay a lazy singleton that returns null when NUXT_DATABASE_URL is absent so the static fallback keeps working.',
  )

  assert(
    backendArticleBlocks.includes("z.discriminatedUnion('type'") &&
      backendArticleBlocks.includes('z.literal(\'heading\')') &&
      backendArticleBlocks.includes('z.literal(\'divider\')') &&
      backendArticleBlocks.includes('export function parseArticleBlocks(input: unknown): ArticleBlock[]'),
    'Article blocks must be validated at the server boundary with a zod discriminated union over the six ArticleBlock kinds.',
  )

  assert(
    backendNewsRepo.includes('export async function listNewsItems(category?: NewsCategory)') &&
      backendNewsRepo.includes('export async function getNewsPayloadById(id: number)') &&
      backendNewsRepo.includes("eq(news.status, 'published')") &&
      backendNewsRepo.includes('desc(news.publishedAt), desc(news.id)') &&
      backendNewsRepo.includes('parseArticleBlocks(blocks)') &&
      backendNewsRepo.includes('getStaticPayload') &&
      backendNewsRepo.includes('useNewsDatabase'),
    'News repo must read published rows from PG when configured, treat DB as the single source of truth on success (empty list stays empty, row miss returns null for 404), and fall back to data/*.ts only when unconfigured or on query failure.',
  )

  assert(
    backendNewsListApi.includes('listNewsItems') &&
      backendNewsListApi.includes('newsCategoryTabs.some(tab => tab.key === query.category)') &&
      backendNewsDetailApi.includes('getNewsPayloadById') &&
      backendNewsDetailApi.includes('statusCode: 400') &&
      backendNewsDetailApi.includes('statusCode: 404'),
    'News API must expose GET /api/news with category validation and GET /api/news/:id with 400/404 semantics.',
  )

  assert(
    backendNewsSeed.includes('onConflictDoUpdate') &&
      backendNewsSeed.includes('parseArticleBlocks(detail.blocks)') &&
      backendNewsSeed.includes('process.exit(1)') &&
      backendDrizzleConfig.includes("dialect: 'postgresql'") &&
      backendDrizzleConfig.includes("schema: './server/db/schema.ts'") &&
      backendNuxtConfig.includes('databaseUrl'),
    'Seed script must upsert idempotently from data/*.ts with block validation, and drizzle/nuxt config must wire the database url.',
  )

  assert(
    newsPage.includes("useFetch<NewsItem[]>('/api/news'") &&
      newsPage.includes('default: () => newsItems') &&
      newsDetailPage.includes('useFetch<NewsPayload>(() => `/api/news/${routeId.value}`') &&
      newsDetailPage.includes('payload.value?.item ?? newsItems.find') &&
      newsDetailPage.includes('payload.value?.detail ?? getNewsDetailById'),
    'News pages must fetch from the API with static-data fallback so the site renders without a database.',
  )
}
