import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerBackendContentVisualContracts() {
  it('replicates the news pilot to cases/reports with schema enums, repo fallback, and zod validation', () => {
    const schema = readComponent('server/db/schema.ts')
    const casesRepo = readComponent('server/utils/cases-repo.ts')
    const reportsRepo = readComponent('server/utils/reports-repo.ts')
    const casesListApi = readComponent('server/api/cases/index.get.ts')
    const caseDetailApi = readComponent('server/api/cases/[slug].get.ts')
    const reportsListApi = readComponent('server/api/reports/index.get.ts')
    const seed = readComponent('scripts/db-seed.ts')
    const casesPage = readComponent('pages/cases/index.vue')
    const caseDetailPage = readComponent('pages/cases/[slug].vue')
    const reportsPage = readComponent('pages/resources/reports.vue')

    // 015.16：分类动态化——solution_key/report_type 等五列由 pgEnum 改 varchar(50)，取值由 content_categories 表管理
    expect(schema).toContain("varchar('solution_key', { length: 50 })")
    expect(schema).toContain("varchar('type', { length: 50 })")
    expect(schema).toContain("pgEnum('content_status', ['draft', 'published'])")
    expect(schema).toContain("pgTable('cases'")
    expect(schema).toContain("pgTable('case_details'")
    expect(schema).toContain("pgTable('reports'")
    expect(schema).toContain("jsonb('related_products').$type<CaseRelatedProduct[]>()")
    expect(schema).toContain("serial('id').primaryKey()")
    expect(schema).toContain("varchar('href', { length: 500 }).notNull().unique()")

    expect(casesRepo).toContain('export async function listCaseResources(): Promise<CaseResource[]>')
    expect(casesRepo).toContain('export async function getCasePayloadBySlug(slug: string)')
    expect(casesRepo).toContain("eq(cases.status, 'published')")
    expect(casesRepo).toContain('asc(cases.sortOrder)')
    expect(casesRepo).toContain('parseArticleBlocks(row.blocks)')
    expect(casesRepo).toContain('parseCaseRelatedProducts(row.relatedProducts)')
    expect(casesRepo).toContain('getStaticCasePayload')

    expect(reportsRepo).toContain('export async function listReportResources(): Promise<ReportResource[]>')
    expect(reportsRepo).toContain("eq(reports.status, 'published')")
    expect(reportsRepo).toContain('asc(reports.sortOrder)')

    expect(casesListApi).toContain('listCaseResources')
    expect(caseDetailApi).toContain('getCasePayloadBySlug')
    expect(caseDetailApi).toContain('statusCode: 400')
    expect(caseDetailApi).toContain('statusCode: 404')
    expect(reportsListApi).toContain('listReportResources')

    expect(seed).toContain('caseResources.entries()')
    expect(seed).toContain('reportResources.entries()')
    expect(seed).toContain('target: cases.slug')
    expect(seed).toContain('target: reports.href')
    expect(seed).toContain('parseCaseRelatedProducts(detail.relatedProducts)')

    expect(casesPage).toContain("useFetch<CaseResource[]>('/api/cases'")
    expect(casesPage).toContain('default: () => caseResources')
    expect(caseDetailPage).toContain('useFetch<CasePayload>(() => `/api/cases/${routeSlug.value}`')
    // 失败双语义（审计#22）：API 明确 404 → 页面 404（不回退静态种子）；其他失败 → 静态兜底保渲染
    expect(caseDetailPage).toContain('error.value?.statusCode === 404')
    expect(caseDetailPage).toContain('payload.value?.detail ?? getCaseDetailBySlug')
    expect(caseDetailPage).toContain('payload.value?.resources ?? caseResources')
    expect(reportsPage).toContain("useFetch<ReportResource[]>('/api/reports'")
    expect(reportsPage).toContain('default: () => reportResources')
  })
}
