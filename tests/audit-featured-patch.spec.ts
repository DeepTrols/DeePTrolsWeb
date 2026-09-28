import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { setNewsFeatured } from '../server/utils/news-admin'
import { setReportFeatured } from '../server/utils/reports-admin'

/**
 * 审计#16 回归测试：featured 单列切换（PATCH /api/admin/news|reports/:id/featured）。
 *
 * 契约：
 * - setNewsFeatured / setReportFeatured 三态：db === null → null（端点 503）；
 *   行不存在 → false（端点 404）；命中 → true；捕获异常 → logServerError 落日志后抛 500（穿透端点）。
 * - 只更新 featured 单列：.set() 载荷必须恰好是 { featured }，不触碰 blocks/updatedAt 等其他字段——
 *   列表页开关由此摆脱「GET 整条 → 全量 PUT」读改写，缺正文旧数据也可取消推荐。
 * - 端点：requireAdmin + zod { featured: boolean }（400 非法入参 / 503 未配置 / 404 未命中 / ok 成功）。
 */

/** 最小 drizzle 替身：链式方法透传（与 audit-error-states.spec.ts 同款），set() 额外捕获载荷 */
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

/** 所有写读都成功、await 时 resolve 预置行的 db；.set() 载荷被捕获用于「单列更新」断言 */
function createCapturingDb(rows: unknown[]) {
  const setCalls: unknown[] = []
  const chain = {} as FakeChain
  const passthrough = () => chain
  chain.from = passthrough
  chain.leftJoin = passthrough
  chain.innerJoin = passthrough
  chain.where = passthrough
  chain.orderBy = passthrough
  chain.limit = passthrough
  chain.set = (...args: unknown[]) => {
    setCalls.push(args[0])
    return chain
  }
  chain.values = passthrough
  chain.returning = passthrough
  chain.onConflictDoUpdate = passthrough
  chain.then = (onFulfilled, onRejected) => Promise.resolve(rows).then(onFulfilled, onRejected)
  const db: FakeDb = {
    select: () => chain,
    insert: () => chain,
    update: () => chain,
    delete: () => chain,
    transaction: task => task(db),
  }
  return { db, setCalls }
}

/** 所有查询都抛错的 db（模拟 DB 已配置但连接/SQL 失败） */
function createThrowingDb(error: unknown): FakeDb {
  const chainOver = (promise: PromiseLike<unknown>): FakeChain => {
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
  const db: FakeDb = {
    select: () => chainOver(Promise.reject(error)),
    insert: () => chainOver(Promise.reject(error)),
    update: () => chainOver(Promise.reject(error)),
    delete: () => chainOver(Promise.reject(error)),
    transaction: run => run(db),
  }
  return db
}

const dbError = new Error('connection terminated unexpectedly')

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

describe('audit#16: setNewsFeatured / setReportFeatured 三态', () => {
  it('db 未配置 → null 哨兵（端点映射 503），不触库不落日志', async () => {
    dbState.current = null
    await expect(setNewsFeatured(7, true)).resolves.toBeNull()
    await expect(setReportFeatured(7, true)).resolves.toBeNull()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('行不存在（returning 空）→ false 哨兵（端点映射 404）', async () => {
    const { db } = createCapturingDb([])
    dbState.current = db
    await expect(setNewsFeatured(7, true)).resolves.toBe(false)
    await expect(setReportFeatured(7, false)).resolves.toBe(false)
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('命中行 → true', async () => {
    const { db } = createCapturingDb([{ id: 7 }])
    dbState.current = db
    await expect(setNewsFeatured(7, true)).resolves.toBe(true)
    await expect(setReportFeatured(7, false)).resolves.toBe(true)
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('DB 异常 → 500 + logServerError（含 id 标识），不落哨兵分支', async () => {
    dbState.current = createThrowingDb(dbError)
    await expect(setNewsFeatured(7, true)).rejects.toMatchObject({ statusCode: 500 })
    await expect(setReportFeatured(7, true)).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain('news-admin.setNewsFeatured')
    expect(loggedText()).toContain('reports-admin.setReportFeatured')
    expect(errorSpy.mock.calls[0]?.[1]).toEqual({ id: 7 })
    expect(errorSpy.mock.calls[0]?.[2]).toBe(dbError)
  })
})

describe('audit#16: 只更新 featured 单列（不触碰 blocks/updatedAt 等其他字段）', () => {
  it('setNewsFeatured 的 .set() 载荷恰好是 { featured }', async () => {
    const { db, setCalls } = createCapturingDb([{ id: 7 }])
    dbState.current = db
    await setNewsFeatured(7, true)
    expect(setCalls).toHaveLength(1)
    expect(setCalls[0]).toEqual({ featured: true })
  })

  it('setReportFeatured 的 .set() 载荷恰好是 { featured }', async () => {
    const { db, setCalls } = createCapturingDb([{ id: 7 }])
    dbState.current = db
    await setReportFeatured(7, false)
    expect(setCalls).toHaveLength(1)
    expect(setCalls[0]).toEqual({ featured: false })
  })
})

describe('audit#16: PATCH /api/admin/news/:id/featured 端点', () => {
  type HandlerEvent = { params: Record<string, string> }

  async function invokeNewsFeatured(event: HandlerEvent): Promise<unknown> {
    const { default: handler } = await import('../server/api/admin/news/[id]/featured.patch')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    return invoke(event)
  }

  it('非法 id → 400 Invalid news id', async () => {
    bodyState.current = { featured: true }
    await expect(invokeNewsFeatured({ params: { id: 'abc' } }))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'Invalid news id' })
  })

  it('非法载荷（featured 非 boolean）→ 400 Invalid featured payload', async () => {
    bodyState.current = { featured: 'yes' }
    await expect(invokeNewsFeatured({ params: { id: '7' } }))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'Invalid featured payload' })
  })

  it('db 未配置 → 503 Database not configured', async () => {
    dbState.current = null
    bodyState.current = { featured: true }
    await expect(invokeNewsFeatured({ params: { id: '7' } }))
      .rejects.toMatchObject({ statusCode: 503, statusMessage: 'Database not configured' })
  })

  it('行不存在 → 404 News not found', async () => {
    const { db } = createCapturingDb([])
    dbState.current = db
    bodyState.current = { featured: true }
    await expect(invokeNewsFeatured({ params: { id: '7' } }))
      .rejects.toMatchObject({ statusCode: 404, statusMessage: 'News not found' })
  })

  it('命中 → { ok: true }，且只写 featured 单列', async () => {
    const { db, setCalls } = createCapturingDb([{ id: 7 }])
    dbState.current = db
    bodyState.current = { featured: false }
    await expect(invokeNewsFeatured({ params: { id: '7' } })).resolves.toEqual({ ok: true })
    expect(setCalls).toEqual([{ featured: false }])
  })

  it('DB 异常 → 500 穿透端点且有日志', async () => {
    dbState.current = createThrowingDb(dbError)
    bodyState.current = { featured: true }
    await expect(invokeNewsFeatured({ params: { id: '7' } })).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain('news-admin.setNewsFeatured')
  })
})

describe('audit#16: PATCH /api/admin/reports/:id/featured 端点', () => {
  type HandlerEvent = { params: Record<string, string> }

  async function invokeReportFeatured(event: HandlerEvent): Promise<unknown> {
    const { default: handler } = await import('../server/api/admin/reports/[id]/featured.patch')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    return invoke(event)
  }

  it('非法 id → 400 Invalid report id', async () => {
    bodyState.current = { featured: true }
    await expect(invokeReportFeatured({ params: { id: '0' } }))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'Invalid report id' })
  })

  it('db 未配置 → 503 Database not configured', async () => {
    dbState.current = null
    bodyState.current = { featured: true }
    await expect(invokeReportFeatured({ params: { id: '7' } }))
      .rejects.toMatchObject({ statusCode: 503, statusMessage: 'Database not configured' })
  })

  it('行不存在 → 404 Report not found', async () => {
    const { db } = createCapturingDb([])
    dbState.current = db
    bodyState.current = { featured: false }
    await expect(invokeReportFeatured({ params: { id: '7' } }))
      .rejects.toMatchObject({ statusCode: 404, statusMessage: 'Report not found' })
  })

  it('命中 → { ok: true }，且只写 featured 单列', async () => {
    const { db, setCalls } = createCapturingDb([{ id: 7 }])
    dbState.current = db
    bodyState.current = { featured: true }
    await expect(invokeReportFeatured({ params: { id: '7' } })).resolves.toEqual({ ok: true })
    expect(setCalls).toEqual([{ featured: true }])
  })
})
