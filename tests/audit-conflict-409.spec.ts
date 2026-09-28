import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createNews, newsInputSchema } from '../server/utils/news-admin'
import { createPage, pageInputSchema } from '../server/utils/pages-admin'
import { createReport, reportInputSchema } from '../server/utils/reports-admin'

/**
 * 审计#15 回归测试：主键/唯一约束并发竞态（postgres 23505 unique_violation）。
 *
 * 契约（保守方案，不做 schema 迁移）：
 * - createNews：max(id)+1 并发撞主键 → 捕获 23505 重算 id 重试（最多 3 次）；
 *   重试用尽仍冲突 → 抛 409（冲突语义穿透端点），全程只落 warn、不落 error 级日志；
 *   非 23505 异常维持既有 500 + logServerError 语义。
 * - createPage / createReport（check-then-insert）与 updateReport（check-then-update）：
 *   预检查放行后插入/更新撞 23505 → 映射为与预检查一致的 'conflict' 哨兵（端点 409），
 *   不当 500、不落 error 级日志（warn 可见）。
 */

/** 最小 drizzle 替身：链式方法透传，await 时按脚本 resolve/reject（与 audit-error-states.spec.ts 同款） */
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

// 端点里的 requireAdmin 依赖 Nitro 运行时（session/runtimeConfig），按最小替身隔离
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

/** 每类操作一个脚本函数：按该类操作的调用序返回 { rows } 或 { error } */
type OpOutcome = { error: unknown } | { rows: unknown[] }
type OpScript = (callIndex: number) => OpOutcome

function createScriptedDb(script: Partial<Record<'delete' | 'insert' | 'select' | 'update', OpScript>>) {
  const counts = { delete: 0, insert: 0, select: 0, update: 0 }
  const run = (op: keyof typeof counts): FakeChain => {
    const outcome = script[op]?.(counts[op]++) ?? { rows: [] }
    const promise = 'error' in outcome ? Promise.reject(outcome.error) : Promise.resolve(outcome.rows)
    return chainOver(promise)
  }
  const db: FakeDb = {
    select: () => run('select'),
    insert: () => run('insert'),
    update: () => run('update'),
    delete: () => run('delete'),
    transaction: task => task(db),
  }
  return { counts, db }
}

/** postgres.js 真实形态的唯一冲突错误：code 23505 + 约束名消息 */
function uniqueViolation(constraint: string): Error & { code: string } {
  return Object.assign(
    new Error(`duplicate key value violates unique constraint "${constraint}"`),
    { code: '23505' },
  )
}

const dbError = new Error('connection terminated unexpectedly')

const validNewsInput = newsInputSchema.parse({
  title: '审计竞态新闻',
  summary: '摘要',
  coverImage: '/images/news/cover.png',
  category: 'company',
  publishedAt: '2026-09-28',
  blocks: [{ type: 'paragraph', text: '正文段落' }],
})
const validNewsBody = {
  title: '审计竞态新闻',
  summary: '摘要',
  coverImage: '/images/news/cover.png',
  category: 'company',
  publishedAt: '2026-09-28',
  blocks: [{ type: 'paragraph', text: '正文段落' }],
}
const validPageBody = { slug: '/audit-conflict-page', title: '审计竞态页面' }
const validPageInput = pageInputSchema.parse(validPageBody)
const validReportBody = {
  type: '白皮书',
  category: '数据要素',
  title: '数据要素白皮书',
  summary: '报告摘要',
  image: '/images/reports/wp.png',
  href: 'https://example.com/wp.pdf',
  sortOrder: 5,
}
const validReportInput = reportInputSchema.parse(validReportBody)

let errorSpy: ReturnType<typeof vi.spyOn>
let warnSpy: ReturnType<typeof vi.spyOn>
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
  warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  dbState.current = null
  bodyState.current = null
  errorSpy.mockRestore()
  warnSpy.mockRestore()
})

/** console.error 首参拼接（logServerError 的格式串），用于 scope 断言 */
function loggedText(): string {
  return errorSpy.mock.calls.map(call => String(call[0])).join('\n')
}

describe('audit#15: createNews 主键竞态 — 23505 重算 id 重试', () => {
  it('首次 insert 撞 23505 → 重算 max(id)+1 重试成功，只落 warn', async () => {
    const { counts, db } = createScriptedDb({
      // 每次尝试都重读 max(id)（此处恒为 6 → 候选 id 7）；首次被并发对手抢先，重试后落库
      select: () => ({ rows: [{ value: 6 }] }),
      insert: call => (call === 0 ? { error: uniqueViolation('news_pkey') } : { rows: [{ id: 7 }] }),
    })
    dbState.current = db

    await expect(createNews(validNewsInput)).resolves.toBe(7)
    // 尝试1：insert(news) 冲突；尝试2：insert(news) + insert(newsDetails) 成功
    expect(counts.insert).toBe(3)
    expect(counts.select).toBe(2)
    expect(warnSpy).toHaveBeenCalled()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('重试耗尽（3 次重试后仍 23505）→ 抛 409 冲突语义，不落 error 级日志', async () => {
    const { counts, db } = createScriptedDb({
      select: () => ({ rows: [{ value: 6 }] }),
      insert: () => ({ error: uniqueViolation('news_pkey') }),
    })
    dbState.current = db

    await expect(createNews(validNewsInput))
      .rejects.toMatchObject({ statusCode: 409, statusMessage: 'News id conflict' })
    // 1 次初始 + 3 次重试，每次只走到 insert(news) 即冲突
    expect(counts.insert).toBe(4)
    expect(warnSpy).toHaveBeenCalled()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('非 23505 异常维持既有语义：500 + logServerError（不受重试逻辑影响）', async () => {
    const { counts, db } = createScriptedDb({
      select: () => ({ rows: [{ value: 6 }] }),
      insert: () => ({ error: dbError }),
    })
    dbState.current = db

    await expect(createNews(validNewsInput)).rejects.toMatchObject({ statusCode: 500 })
    expect(counts.insert).toBe(1)
    expect(loggedText()).toContain('news-admin.createNews')
  })
})

describe('audit#15: check-then-insert 并发窗口 — 23505 映射既有 conflict 哨兵（端点 409）', () => {
  it('createPage：预检查放行后 insert 撞 slug 主键 → conflict，只落 warn', async () => {
    const { db } = createScriptedDb({
      select: () => ({ rows: [] }), // 预检查未命中（并发对手尚未提交）
      insert: () => ({ error: uniqueViolation('pages_pkey') }),
    })
    dbState.current = db

    await expect(createPage(validPageInput)).resolves.toBe('conflict')
    expect(warnSpy).toHaveBeenCalled()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('createReport：预检查放行后 insert 撞 href 唯一索引 → conflict，只落 warn', async () => {
    const { db } = createScriptedDb({
      select: () => ({ rows: [] }),
      insert: () => ({ error: uniqueViolation('reports_href_unique') }),
    })
    dbState.current = db

    await expect(createReport(validReportInput)).resolves.toBe('conflict')
    expect(warnSpy).toHaveBeenCalled()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('createPage/createReport：非 23505 异常维持 500 + logServerError', async () => {
    const { db } = createScriptedDb({
      select: () => ({ rows: [] }),
      insert: () => ({ error: dbError }),
    })
    dbState.current = db

    await expect(createPage(validPageInput)).rejects.toMatchObject({ statusCode: 500 })
    await expect(createReport(validReportInput)).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain('pages-admin.createPage')
    expect(loggedText()).toContain('reports-admin.createReport')
  })
})

describe('audit#15: 端点端到端 — 23505 竞态最终以 409 冲突语义透出', () => {
  type HandlerEvent = { params: Record<string, string> }

  /** 预检查未命中 + insert 恒 23505 的 db（并发窗口被对手抢先） */
  function useRacingDb() {
    const { db } = createScriptedDb({
      select: () => ({ rows: [] }),
      insert: () => ({ error: uniqueViolation('unique') }),
    })
    dbState.current = db
  }

  it('POST /api/admin/pages：并发 slug 冲突 → 409 Page slug already exists', async () => {
    useRacingDb()
    bodyState.current = validPageBody
    const { default: handler } = await import('../server/api/admin/pages/index.post')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: {} }))
      .rejects.toMatchObject({ statusCode: 409, statusMessage: 'Page slug already exists' })
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('POST /api/admin/reports：并发 href 冲突 → 409 Report href already exists', async () => {
    useRacingDb()
    bodyState.current = validReportBody
    const { default: handler } = await import('../server/api/admin/reports/index.post')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: {} }))
      .rejects.toMatchObject({ statusCode: 409, statusMessage: 'Report href already exists' })
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('POST /api/admin/news：主键竞态重试耗尽 → 409 News id conflict 穿透端点', async () => {
    const { db } = createScriptedDb({
      select: () => ({ rows: [{ value: 6 }] }),
      insert: () => ({ error: uniqueViolation('news_pkey') }),
    })
    dbState.current = db
    bodyState.current = validNewsBody
    const { default: handler } = await import('../server/api/admin/news/index.post')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: {} }))
      .rejects.toMatchObject({ statusCode: 409, statusMessage: 'News id conflict' })
    expect(errorSpy).not.toHaveBeenCalled()
  })
})
