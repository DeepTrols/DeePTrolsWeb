import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { caseResources } from '../data/cases'
import { newsItems } from '../data/news'
import { reportResources } from '../data/reports'
import { caseInputSchema, createCase, deleteCase, getAdminCase, listAdminCases, updateCase } from '../server/utils/cases-admin'
import { getCasePayloadBySlug, listCaseResources } from '../server/utils/cases-repo'
import { getComponentUsage, getDisabledComponents, setDisabledComponents } from '../server/utils/component-admin'
import { listLeads, updateLeadStatus } from '../server/utils/leads-admin'
import { createMediaRecord, deleteMediaRecord, listMedia } from '../server/utils/media-admin'
import { getMenuItems, upsertMenuItems } from '../server/utils/menu-admin'
import { createNews, deleteNews, getAdminNews, listAdminNews, newsInputSchema, updateNews } from '../server/utils/news-admin'
import { getNewsPayloadById, listNewsItems } from '../server/utils/news-repo'
import { createPage, deletePage, getAdminPage, getPublishedPage, listAdminPages, pageInputSchema, updatePage } from '../server/utils/pages-admin'
import { createPreset, deletePreset, getPreset, listPresets, presetInputSchema, updatePreset } from '../server/utils/preset-admin'
import { createReport, deleteReport, getAdminReport, listAdminReports, reportInputSchema, updateReport } from '../server/utils/reports-admin'
import { listReportResources } from '../server/utils/reports-repo'

/**
 * 审计#6 回归测试：服务端仓储/管理层错误处理三态语义。
 *
 * 契约（本次重构落地）：
 * - 管理路径（*-admin.ts）：db === null → 维持哨兵返回（端点 503/404 语义不变）；
 *   操作未命中行 → 哨兵返回（端点 404）；捕获异常 → logServerError 落日志后抛 500，
 *   不得再伪装成 404「not found」或 503「Database not configured」。
 * - 公开读路径（news-repo/cases-repo/reports-repo、getMenuItems、getPublishedPage、home insights）：
 *   异常时静态回退/降级是刻意设计，必须保留，但 catch 必须 console.error 落日志。
 * - 例外：createMediaRecord 异常仍返回 null——upload.post.ts 依赖该哨兵回滚已落盘文件，
 *   抛出会跳过回滚产生孤儿资源；失败原因通过日志可见。
 */

/** 最小 drizzle 替身：链式方法透传，await 时按构造参数 resolve/reject */
interface FakeChain extends PromiseLike<unknown> {
  from: (...args: unknown[]) => FakeChain
  leftJoin: (...args: unknown[]) => FakeChain
  innerJoin: (...args: unknown[]) => FakeChain
  where: (...args: unknown[]) => FakeChain
  orderBy: (...args: unknown[]) => FakeChain
  limit: (...args: unknown[]) => FakeChain
  set: (...args: unknown[]) => FakeChain
  values: (...args: unknown[]) => FakeChain
  returning: (...args: unknown[]) => FakeChain
  onConflictDoUpdate: (...args: unknown[]) => FakeChain
}

interface FakeDb {
  select: (...args: unknown[]) => FakeChain
  insert: (...args: unknown[]) => FakeChain
  update: (...args: unknown[]) => FakeChain
  delete: (...args: unknown[]) => FakeChain
  transaction: (run: (tx: FakeDb) => Promise<unknown>) => Promise<unknown>
}

const dbState = vi.hoisted(() => ({ current: null as FakeDb | null }))

vi.mock('../server/db/client', () => ({
  useNewsDatabase: () => dbState.current,
}))

// 端点里的 requireAdmin/isAdminRequest 依赖 Nitro 运行时（session/runtimeConfig），按最小替身隔离
vi.mock('../server/utils/admin', () => ({
  requireAdmin: async () => ({}),
  isAdminRequest: async () => false,
}))

function chainOver(promise: PromiseLike<unknown>): FakeChain {
  const chain = {} as FakeChain
  const passthrough = () => chain
  chain.from = passthrough
  chain.leftJoin = passthrough
  chain.innerJoin = passthrough
  chain.where = passthrough
  chain.orderBy = passthrough
  chain.limit = passthrough
  chain.set = passthrough
  chain.values = passthrough
  chain.returning = passthrough
  chain.onConflictDoUpdate = passthrough
  chain.then = (onFulfilled, onRejected) => promise.then(onFulfilled, onRejected)
  return chain
}

/** 所有查询都抛错的 db（模拟 DB 已配置但连接/SQL 失败） */
function createThrowingDb(error: unknown): FakeDb {
  const db: FakeDb = {
    select: () => chainOver(Promise.reject(error)),
    insert: () => chainOver(Promise.reject(error)),
    update: () => chainOver(Promise.reject(error)),
    delete: () => chainOver(Promise.reject(error)),
    transaction: run => run(db),
  }
  return db
}

/** 所有查询都成功但按调用序返回预置行（[] = 未命中）的 db */
function createResolvingDb(getResult: (callIndex: number) => unknown[]): FakeDb {
  let calls = 0
  const next = () => chainOver(Promise.resolve().then(() => getResult(calls++)))
  const db: FakeDb = {
    select: next,
    insert: next,
    update: next,
    delete: next,
    transaction: run => run(db),
  }
  return db
}

const dbError = new Error('connection terminated unexpectedly')

/** 静态种子中真实存在的条目：公开读回退断言用 */
function mustSeed<T>(value: T | undefined, label: string): T {
  if (value === undefined) {
    throw new Error(`${label} 静态种子数据缺失，无法执行错误状态回归测试`)
  }
  return value
}
const staticNewsItem = mustSeed(newsItems[0], 'newsItems')
const staticCase = mustSeed(caseResources[0], 'caseResources')
const staticCaseSlug = staticCase.href.replace('/cases/', '')

const validNewsInput = newsInputSchema.parse({
  title: '审计测试新闻',
  summary: '摘要',
  coverImage: '/images/news/cover.png',
  category: 'company',
  publishedAt: '2026-09-22',
  blocks: [{ type: 'paragraph', text: '正文段落' }],
})
const validNewsBody = {
  title: '审计测试新闻',
  summary: '摘要',
  coverImage: '/images/news/cover.png',
  category: 'company',
  publishedAt: '2026-09-22',
  blocks: [{ type: 'paragraph', text: '正文段落' }],
}
const validCaseInput = caseInputSchema.parse({
  slug: 'acme-smart-factory',
  title: '某制造客户',
  summary: '案例摘要',
  image: '/images/cases/acme.png',
  sortOrder: 10,
  detailTitle: '某制造客户数字化案例',
  categoryKey: 'smart-manufacturing',
  heroImage: '/images/cases/acme-hero.png',
  blocks: [{ type: 'paragraph', text: '正文段落' }],
  relatedProducts: [{ name: 'DGP', desc: '数据治理平台', href: '/products/dgp' }],
})
const validReportInput = reportInputSchema.parse({
  type: '白皮书',
  category: '数据要素',
  title: '数据要素白皮书',
  summary: '报告摘要',
  image: '/images/reports/wp.png',
  href: 'https://example.com/wp.pdf',
  sortOrder: 5,
})
const validPageInput = pageInputSchema.parse({ slug: '/audit-error-page', title: '审计页面' })
const validPresetInput = presetInputSchema.parse({ name: '审计模板', section: { type: 'cta', title: '行动起来' } })

let errorSpy: ReturnType<typeof vi.spyOn>
const bodyState = { current: null as unknown }

beforeAll(() => {
  // Nitro 自动导入的 h3 全局在裸 vitest 环境不存在，按端点实际用法最小替身
  vi.stubGlobal('defineEventHandler', (handler: unknown) => handler)
  vi.stubGlobal('getRouterParam', (event: { params: Record<string, string> }, key: string) => event.params[key])
  vi.stubGlobal('createError', (input: { statusCode: number, statusMessage: string }) => {
    const error = new Error(input.statusMessage) as Error & { statusCode: number, statusMessage: string }
    error.statusCode = input.statusCode
    error.statusMessage = input.statusMessage
    return error
  })
  vi.stubGlobal('readBody', async () => bodyState.current)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

beforeEach(() => {
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  dbState.current = null
  bodyState.current = null
  errorSpy.mockRestore()
})

/** console.error 首参拼接（logServerError 的格式串），用于 scope 断言 */
function loggedText(): string {
  return errorSpy.mock.calls.map(call => String(call[0])).join('\n')
}

type ThrowCase = [name: string, invoke: () => Promise<unknown>, scope: string]

describe('audit#6: 管理路径捕获异常 → 500 + 统一日志（不再伪装 404/503）', () => {
  beforeEach(() => {
    dbState.current = createThrowingDb(dbError)
  })

  const writeCases: ThrowCase[] = [
    ['createNews', () => createNews(validNewsInput), 'news-admin.createNews'],
    ['updateNews', () => updateNews(7, validNewsInput), 'news-admin.updateNews'],
    ['deleteNews', () => deleteNews(7), 'news-admin.deleteNews'],
    ['createCase', () => createCase(validCaseInput), 'cases-admin.createCase'],
    ['updateCase', () => updateCase('acme-smart-factory', validCaseInput), 'cases-admin.updateCase'],
    ['deleteCase', () => deleteCase('acme-smart-factory'), 'cases-admin.deleteCase'],
    ['createReport', () => createReport(validReportInput), 'reports-admin.createReport'],
    ['updateReport', () => updateReport(7, validReportInput), 'reports-admin.updateReport'],
    ['deleteReport', () => deleteReport(7), 'reports-admin.deleteReport'],
    ['createPage', () => createPage(validPageInput), 'pages-admin.createPage'],
    ['updatePage', () => updatePage('/audit-error-page', validPageInput), 'pages-admin.updatePage'],
    ['deletePage', () => deletePage('/audit-error-page'), 'pages-admin.deletePage'],
    ['updateLeadStatus', () => updateLeadStatus(7, 'followed'), 'leads-admin.updateLeadStatus'],
    ['upsertMenuItems', () => upsertMenuItems('header', []), 'menu-admin.upsertMenuItems'],
    ['setDisabledComponents', () => setDisabledComponents(['hero']), 'component-admin.setDisabledComponents'],
    ['createPreset', () => createPreset(validPresetInput), 'preset-admin.createPreset'],
    ['updatePreset', () => updatePreset(7, validPresetInput), 'preset-admin.updatePreset'],
    ['deletePreset', () => deletePreset(7), 'preset-admin.deletePreset'],
    ['deleteMediaRecord', () => deleteMediaRecord(7), 'media-admin.deleteMediaRecord'],
  ]

  const readCases: ThrowCase[] = [
    ['listAdminNews', () => listAdminNews(), 'news-admin.listAdminNews'],
    ['getAdminNews', () => getAdminNews(7), 'news-admin.getAdminNews'],
    ['listAdminCases', () => listAdminCases(), 'cases-admin.listAdminCases'],
    ['getAdminCase', () => getAdminCase('acme-smart-factory'), 'cases-admin.getAdminCase'],
    ['listAdminReports', () => listAdminReports(), 'reports-admin.listAdminReports'],
    ['getAdminReport', () => getAdminReport(7), 'reports-admin.getAdminReport'],
    ['listAdminPages', () => listAdminPages(), 'pages-admin.listAdminPages'],
    ['getAdminPage', () => getAdminPage('/audit-error-page'), 'pages-admin.getAdminPage'],
    ['listLeads', () => listLeads(), 'leads-admin.listLeads'],
    ['listMedia', () => listMedia(), 'media-admin.listMedia'],
    ['listPresets', () => listPresets(), 'preset-admin.listPresets'],
    ['getPreset', () => getPreset(7), 'preset-admin.getPreset'],
    ['getDisabledComponents', () => getDisabledComponents(), 'component-admin.getDisabledComponents'],
    ['getComponentUsage', () => getComponentUsage(), 'component-admin.getComponentUsage'],
  ]

  it.each([...writeCases, ...readCases])('%s：DB 异常抛 500 且日志含操作名', async (_name, invoke, scope) => {
    await expect(invoke()).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain(scope)
  })

  it('日志含关键标识与原始错误，且不带整行数据', async () => {
    await expect(updateNews(7, validNewsInput)).rejects.toMatchObject({ statusCode: 500 })
    const call = errorSpy.mock.calls[0]
    expect(call?.[0]).toBe('[server] news-admin.updateNews failed')
    expect(call?.[1]).toEqual({ id: 7 })
    expect(call?.[2]).toBe(dbError)
  })

  it('updateCase 日志带 slug 标识', async () => {
    await expect(updateCase('acme-smart-factory', validCaseInput)).rejects.toMatchObject({ statusCode: 500 })
    expect(errorSpy.mock.calls[0]?.[1]).toEqual({ slug: 'acme-smart-factory' })
  })
})

describe('audit#6: 端点三态端到端（503 未配置 / 404 未命中 / 500 真实异常）', () => {
  type HandlerEvent = { params: Record<string, string> }

  it('POST /api/admin/news：db 未配置 → 503 Database not configured', async () => {
    dbState.current = null
    bodyState.current = validNewsBody
    const { default: handler } = await import('../server/api/admin/news/index.post')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: {} }))
      .rejects.toMatchObject({ statusCode: 503, statusMessage: 'Database not configured' })
  })

  it('POST /api/admin/news：DB 已配置但插入异常 → 500（不再伪装 503）且有日志', async () => {
    dbState.current = createThrowingDb(dbError)
    bodyState.current = validNewsBody
    const { default: handler } = await import('../server/api/admin/news/index.post')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: {} })).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain('news-admin.createNews')
  })

  it('PUT /api/admin/news/:id：更新未命中行 → 404 News not found', async () => {
    dbState.current = createResolvingDb(() => [])
    bodyState.current = validNewsBody
    const { default: handler } = await import('../server/api/admin/news/[id].put')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: { id: '7' } }))
      .rejects.toMatchObject({ statusCode: 404, statusMessage: 'News not found' })
  })

  it('PUT /api/admin/news/:id：DB 异常 → 500（不再伪装 404）且有日志', async () => {
    dbState.current = createThrowingDb(dbError)
    bodyState.current = validNewsBody
    const { default: handler } = await import('../server/api/admin/news/[id].put')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: { id: '7' } })).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain('news-admin.updateNews')
  })

  it('DELETE /api/admin/news/:id：DB 异常 → 500 且有日志', async () => {
    dbState.current = createThrowingDb(dbError)
    const { default: handler } = await import('../server/api/admin/news/[id].delete')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: { id: '7' } })).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain('news-admin.deleteNews')
  })

  it('GET /api/admin/news：DB 异常 → 500（不再静默空列表）', async () => {
    dbState.current = createThrowingDb(dbError)
    const { default: handler } = await import('../server/api/admin/news/index.get')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: {} })).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain('news-admin.listAdminNews')
  })
})

describe('audit#6: 公开读路径异常 → 静态回退/降级保留且日志可见', () => {
  beforeEach(() => {
    dbState.current = createThrowingDb(dbError)
  })

  it('listNewsItems 回退静态列表并记录日志', async () => {
    await expect(listNewsItems()).resolves.toEqual(newsItems)
    expect(loggedText()).toContain('news-repo.listNewsItems')
  })

  it('getNewsPayloadById 回退静态详情并记录日志（含 id 标识）', async () => {
    const payload = await getNewsPayloadById(staticNewsItem.id)
    expect(payload?.item).toEqual(staticNewsItem)
    expect(loggedText()).toContain('news-repo.getNewsPayloadById')
    expect(errorSpy.mock.calls[0]?.[1]).toEqual({ id: staticNewsItem.id })
  })

  it('listCaseResources / getCasePayloadBySlug 回退静态数据并记录日志', async () => {
    await expect(listCaseResources()).resolves.toEqual(caseResources)
    const payload = await getCasePayloadBySlug(staticCaseSlug)
    expect(payload?.detail.slug).toBe(staticCaseSlug)
    expect(loggedText()).toContain('cases-repo.listCaseResources')
    expect(loggedText()).toContain('cases-repo.getCasePayloadBySlug')
  })

  it('listReportResources 回退静态列表并记录日志', async () => {
    await expect(listReportResources()).resolves.toEqual(reportResources)
    expect(loggedText()).toContain('reports-repo.listReportResources')
  })

  it('getMenuItems 降级 null（公开导航回退静态快照）并记录日志', async () => {
    await expect(getMenuItems('header')).resolves.toBeNull()
    expect(loggedText()).toContain('menu-admin.getMenuItems')
  })

  it('getPublishedPage 降级 null（公开页 404 → 分发器占位）并记录日志', async () => {
    await expect(getPublishedPage('/audit-error-page')).resolves.toBeNull()
    expect(loggedText()).toContain('pages-admin.getPublishedPage')
  })

  it('GET /api/news/:id 端点：DB 异常时返回静态回退载荷而非 404/500', async () => {
    const { default: handler } = await import('../server/api/news/[id].get')
    const invoke = handler as unknown as (event: { params: Record<string, string> }) => Promise<unknown>
    const payload = await invoke({ params: { id: String(staticNewsItem.id) } }) as { item: { id: number } }
    expect(payload.item).toEqual(staticNewsItem)
    expect(loggedText()).toContain('news-repo.getNewsPayloadById')
  })

  it('GET /api/home/insights：DB 异常回退静态 insights 并记录日志', async () => {
    const { default: handler } = await import('../server/api/home/insights.get')
    const invoke = handler as unknown as () => Promise<unknown>
    const { insights: staticInsights } = await import('../data/home-insights')
    await expect(invoke()).resolves.toEqual(staticInsights)
    expect(loggedText()).toContain('api.home.insights')
  })
})

describe('audit#6: createMediaRecord 异常保持 null 契约（upload 回滚依赖）且有日志', () => {
  it('DB 异常 → null + 日志（upload.post.ts 据此回滚已落盘文件）', async () => {
    dbState.current = createThrowingDb(dbError)
    const record = await createMediaRecord({
      path: '/uploads/2026-09/audit.png',
      filename: 'audit.png',
      mime: 'image/png',
      size: 1024,
    })
    expect(record).toBeNull()
    expect(loggedText()).toContain('media-admin.createMediaRecord')
  })
})

describe('audit#6: db 未配置的哨兵语义维持现状（503/404 映射不受影响）', () => {
  beforeEach(() => {
    dbState.current = null
  })

  it('写路径哨兵：createNews null / updateNews false / listPresets null / upsertMenuItems false / setDisabledComponents false', async () => {
    await expect(createNews(validNewsInput)).resolves.toBeNull()
    await expect(updateNews(7, validNewsInput)).resolves.toBe(false)
    await expect(listPresets()).resolves.toBeNull()
    await expect(upsertMenuItems('header', [])).resolves.toBe(false)
    await expect(setDisabledComponents(['hero'])).resolves.toBe(false)
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('公开读回退静态数据（无需日志——未配置 DB 是受支持的部署形态）', async () => {
    await expect(listNewsItems()).resolves.toEqual(newsItems)
    await expect(listReportResources()).resolves.toEqual(reportResources)
    await expect(getMenuItems('footer')).resolves.toBeNull()
    expect(errorSpy).not.toHaveBeenCalled()
  })
})
