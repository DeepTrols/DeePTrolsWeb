export function checkBackendContentContracts(ctx) {
  const {
    assert,
    backendNewsSchema,
    backendCasesRepo,
    backendReportsRepo,
    backendCasesListApi,
    backendCaseDetailApi,
    backendReportsListApi,
    backendNewsSeed,
    casePage,
    caseDetailPage,
    reportPage,
  } = ctx

  assert(
    backendNewsSchema.includes("varchar('solution_key', { length: 50 })") &&
      backendNewsSchema.includes("varchar('type', { length: 50 })") &&
      backendNewsSchema.includes("pgEnum('content_status', ['draft', 'published'])") &&
      backendNewsSchema.includes("pgTable('cases'") &&
      backendNewsSchema.includes("pgTable('case_details'") &&
      backendNewsSchema.includes("pgTable('reports'") &&
      backendNewsSchema.includes("jsonb('related_products').$type<CaseRelatedProduct[]>()") &&
      backendNewsSchema.includes("serial('id').primaryKey()") &&
      backendNewsSchema.includes("varchar('href', { length: 500 }).notNull().unique()"),
    'Backend content schema must mirror CaseResource/CaseDetail/ReportResource with varchar category columns (015.16: dynamic categories via content_categories), content_status enum, jsonb blocks + relatedProducts, and href-unique reports.',
  )

  assert(
    backendCasesRepo.includes('export async function listCaseResources(): Promise<CaseResource[]>') &&
      backendCasesRepo.includes('export async function getCasePayloadBySlug(slug: string)') &&
      backendCasesRepo.includes("eq(cases.status, 'published')") &&
      backendCasesRepo.includes('asc(cases.sortOrder)') &&
      backendCasesRepo.includes('parseArticleBlocks(row.blocks)') &&
      backendCasesRepo.includes('parseCaseRelatedProducts(row.relatedProducts)') &&
      backendCasesRepo.includes('export function parseCaseRelatedProducts(input: unknown): CaseRelatedProduct[]') &&
      backendCasesRepo.includes('getStaticCasePayload') &&
      backendCasesRepo.includes('useNewsDatabase'),
    'Cases repo must read published rows from PG when configured, validate blocks + relatedProducts via zod, treat DB as the single source of truth on success (row miss returns null for 404), and fall back to data/*.ts only when unconfigured or on query failure.',
  )

  assert(
    backendReportsRepo.includes('export async function listReportResources(): Promise<ReportResource[]>') &&
      backendReportsRepo.includes("eq(reports.status, 'published')") &&
      backendReportsRepo.includes('asc(reports.sortOrder)') &&
      backendReportsRepo.includes('useNewsDatabase'),
    'Reports repo must read published rows from PG when configured (empty table returns an empty array) and fall back to data/reports.ts only when unconfigured or on query failure.',
  )

  assert(
    backendCasesListApi.includes('listCaseResources') &&
      backendCaseDetailApi.includes('getCasePayloadBySlug') &&
      backendCaseDetailApi.includes('statusCode: 400') &&
      backendCaseDetailApi.includes('statusCode: 404') &&
      backendReportsListApi.includes('listReportResources'),
    'Cases/reports APIs must expose GET /api/cases, GET /api/cases/:slug (400/404 semantics), and GET /api/reports.',
  )

  assert(
    backendNewsSeed.includes('caseResources.entries()') &&
      backendNewsSeed.includes('reportResources.entries()') &&
      backendNewsSeed.includes('target: cases.slug') &&
      backendNewsSeed.includes('target: reports.href') &&
      backendNewsSeed.includes('parseCaseRelatedProducts(detail.relatedProducts)'),
    'Seed script must upsert cases by slug and reports by href idempotently with relatedProducts validation.',
  )

  assert(
    casePage.includes("useFetch<CaseResource[]>('/api/cases'") &&
      casePage.includes('default: () => caseResources') &&
      caseDetailPage.includes('useFetch<CasePayload>(() => `/api/cases/${routeSlug.value}`') &&
      caseDetailPage.includes('error.value?.statusCode === 404') &&
      caseDetailPage.includes('payload.value?.detail ?? getCaseDetailBySlug') &&
      caseDetailPage.includes('payload.value?.resources ?? caseResources') &&
      reportPage.includes("useFetch<ReportResource[]>('/api/reports'") &&
      reportPage.includes('default: () => reportResources'),
    'Cases/reports pages must fetch from the API with dual failure semantics: an explicit API 404 (unpublished/deleted content) must surface the 404 page without reviving static seeds, while non-404 failures keep the static-data fallback so the site renders without a database.',
  )
}
