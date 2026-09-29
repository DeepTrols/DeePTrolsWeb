import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { assertFeaturedBudget, countFeatured, FEATURED_LIMITS } from '../server/utils/featured-limits'

/**
 * 015.15 推荐位规则收敛：featured 预算硬限制的单测。
 *
 * 契约：
 * - countFeatured：home = news.featured + reports.featured 合并计数；cases = cases.featured；
 *   未配置 DB 返回 null 哨兵（端点 503）；查询异常 → logServerError 落日志后抛 500。
 * - assertFeaturedBudget：已达上限抛 409（home ≥4 / cases ≥3）；未达上限通过；无 DB 返回 null。
 * - PATCH /api/admin/cases/:slug/featured 端点：400 非法 slug/载荷 / 503 未配置 / 404 未命中 / 409 超限 / ok 成功。
 * - 并发 check-then-set 竞态一期接受（管理后台低频，见 featured-limits.ts 注释）。
 */

/** 最小 drizzle 替身（与 audit-featured-patch.spec.ts 同款）；select 按队列依次 resolve 预置行集 */
interface FakeChain extends PromiseLike<unknown> {
  from: (...args: unknown[]) => FakeChain
  where: (...args: unknown[]) => FakeChain
  set: (...args: unknown[]) => FakeChain
  returning: (...args: unknown[]) => FakeChain
}

interface FakeDb {
  select: (...args: unknown[]) => FakeChain
  update: (...args: unknown[]) => FakeChain
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

/** select 链按队列消费行集（home 两次 select、cases 一次）；update 链恒 resolve returningRows */
function createQueuedDb(selectRowSets: unknown[][], returningRows: unknown[] = [{ slug: 'x' }]) {
  const queue = [...selectRowSets]
  const chainOver = (promise: PromiseLike<unknown>): FakeChain => {
    const chain = {} as FakeChain
    const passthrough = () => chain
    chain.from = passthrough
    chain.where = passthrough
    chain.set = passthrough
    chain.returning = passthrough
    chain.then = (onFulfilled, onRejected) => promise.then(onFulfilled, onRejected)
    return chain
  }
  return {
    select: () => chainOver(Promise.resolve(queue.shift() ?? [])),
    update: () => chainOver(Promise.resolve(returningRows)),
  }
}

const dbError = new Error('connection terminated unexpectedly')
const bodyState = { current: null as unknown }

let errorSpy: ReturnType<typeof vi.spyOn>

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

describe('015.15: FEATURED_LIMITS 上限常量', () => {
  it('home 复用首页推荐位上限 4，cases 为 3', () => {
    expect(FEATURED_LIMITS.home).toBe(4)
    expect(FEATURED_LIMITS.cases).toBe(3)
  })
})

describe('015.15: countFeatured 合并计数与三态', () => {
  it('未配置 DB → null 哨兵（端点 503），不触库不落日志', async () => {
    dbState.current = null
    await expect(countFeatured('home')).resolves.toBeNull()
    await expect(countFeatured('cases')).resolves.toBeNull()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('home = news.featured + reports.featured 合并计数', async () => {
    dbState.current = createQueuedDb([[{ value: 3 }], [{ value: 1 }]])
    await expect(countFeatured('home')).resolves.toBe(4)
  })

  it('home 边界：4 条已满（3 新闻 + 1 报告 与 4 新闻 + 0 报告同口径）', async () => {
    dbState.current = createQueuedDb([[{ value: 4 }], [{ value: 0 }]])
    await expect(countFeatured('home')).resolves.toBe(4)
  })

  it('cases = cases.featured 单表计数（只查一次）', async () => {
    dbState.current = createQueuedDb([[{ value: 2 }]])
    await expect(countFeatured('cases')).resolves.toBe(2)
  })

  it('查询异常 → 500 + logServerError（含 scope 标识）', async () => {
    const db = createQueuedDb([])
    db.select = () => {
      const chain = {} as FakeChain
      chain.from = () => chain
      chain.where = () => chain
      chain.set = () => chain
      chain.returning = () => chain
      chain.then = (onFulfilled, onRejected) => Promise.reject(dbError).then(onFulfilled, onRejected)
      return chain
    }
    dbState.current = db
    await expect(countFeatured('home')).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain('featured-limits.countFeatured')
  })
})

describe('015.15: assertFeaturedBudget 硬限制', () => {
  it('未配置 DB → null 哨兵（端点先判 503）', async () => {
    dbState.current = null
    await expect(assertFeaturedBudget('home')).resolves.toBeNull()
    await expect(assertFeaturedBudget('cases')).resolves.toBeNull()
  })

  it('home 未满（3 条）→ 通过', async () => {
    dbState.current = createQueuedDb([[{ value: 2 }], [{ value: 1 }]])
    await expect(assertFeaturedBudget('home')).resolves.toBeUndefined()
  })

  it('home 边界：已有 4 条 → 第 5 条 409', async () => {
    dbState.current = createQueuedDb([[{ value: 3 }], [{ value: 1 }]])
    await expect(assertFeaturedBudget('home')).rejects.toMatchObject({
      statusCode: 409,
      statusMessage: 'Home featured limit reached (4)',
    })
  })

  it('cases 边界：已有 3 条 → 第 4 条 409', async () => {
    dbState.current = createQueuedDb([[{ value: 3 }]])
    await expect(assertFeaturedBudget('cases')).rejects.toMatchObject({
      statusCode: 409,
      statusMessage: 'Case featured limit reached (3)',
    })
  })

  it('cases 未满（2 条）→ 通过', async () => {
    dbState.current = createQueuedDb([[{ value: 2 }]])
    await expect(assertFeaturedBudget('cases')).resolves.toBeUndefined()
  })
})

describe('015.15: PATCH /api/admin/cases/:slug/featured 端点', () => {
  type HandlerEvent = { params: Record<string, string> }

  async function invokeCaseFeatured(event: HandlerEvent): Promise<unknown> {
    const { default: handler } = await import('../server/api/admin/cases/[slug]/featured.patch')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    return invoke(event)
  }

  it('非法 slug → 400 Invalid case slug', async () => {
    bodyState.current = { featured: true }
    await expect(invokeCaseFeatured({ params: { slug: 'Bad Slug!' } }))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'Invalid case slug' })
  })

  it('非法载荷（featured 非 boolean）→ 400 Invalid featured payload', async () => {
    bodyState.current = { featured: 'yes' }
    await expect(invokeCaseFeatured({ params: { slug: 'acme-case' } }))
      .rejects.toMatchObject({ statusCode: 400, statusMessage: 'Invalid featured payload' })
  })

  it('置 true 且 db 未配置 → 503 Database not configured', async () => {
    dbState.current = null
    bodyState.current = { featured: true }
    await expect(invokeCaseFeatured({ params: { slug: 'acme-case' } }))
      .rejects.toMatchObject({ statusCode: 503, statusMessage: 'Database not configured' })
  })

  it('取消推荐（featured false）跳过预算校验；db 未配置仍 503（置位失败）', async () => {
    dbState.current = null
    bodyState.current = { featured: false }
    await expect(invokeCaseFeatured({ params: { slug: 'acme-case' } }))
      .rejects.toMatchObject({ statusCode: 503, statusMessage: 'Database not configured' })
  })

  it('预算已满 → 409 Case featured limit reached (3)，不写库', async () => {
    dbState.current = createQueuedDb([[{ value: 3 }]])
    bodyState.current = { featured: true }
    await expect(invokeCaseFeatured({ params: { slug: 'acme-case' } }))
      .rejects.toMatchObject({ statusCode: 409 })
  })

  it('案例不存在 → 404 Case not found', async () => {
    dbState.current = createQueuedDb([[{ value: 0 }]], [])
    bodyState.current = { featured: true }
    await expect(invokeCaseFeatured({ params: { slug: 'acme-case' } }))
      .rejects.toMatchObject({ statusCode: 404, statusMessage: 'Case not found' })
  })

  it('命中 → { ok: true }', async () => {
    dbState.current = createQueuedDb([[{ value: 1 }]])
    bodyState.current = { featured: true }
    await expect(invokeCaseFeatured({ params: { slug: 'acme-case' } })).resolves.toEqual({ ok: true })
  })
})
