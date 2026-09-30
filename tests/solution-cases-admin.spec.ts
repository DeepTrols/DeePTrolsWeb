import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { caseResources } from '../data/cases'
import {
  SOLUTION_CASE_FALLBACK_CATEGORY,
  SOLUTION_CASE_PAGE_KEYS,
  caseSlugFromHref,
  staticSolutionCaseFallback,
} from '../data/solution-case-picks'
import {
  getSolutionCasePicks,
  putSolutionCasePicks,
  resolveSolutionCases,
  solutionCasePageKeySchema,
  solutionCasePicksSchema,
} from '../server/utils/solution-cases-admin'

/**
 * TASK-015.17 方案页案例推荐后台化：solution_case_picks 表（key PK + 有序 slug 数组 ≤3）。
 *
 * 契约：
 * - key 白名单 = 五个方案代码页；整列协议 ≤3 且不重复（复用 caseSlugSchema 段格式）；
 * - getSolutionCasePicks 三态：无 DB/未命中/脏数据 → null（端点回退静态快照）；
 * - putSolutionCasePicks：无 DB → false（端点 503）；未知案例 slug → 400（软外键，zod 不碰 DB）；
 * - resolveSolutionCases：picks 命中 → 按 items 顺序投影已发布案例（删/转草稿自动跳过，不回退补齐）；
 *   picks 为空/无库/失败 → 静态回退（按页面映射分类过滤 caseResources，封顶 3 条）。
 */

// ---------- fake db（select 结果按调用序出队；insert 捕获 values 载荷） ----------

interface FakeChain extends PromiseLike<unknown> {
  from: (...args: unknown[]) => FakeChain
  where: (...args: unknown[]) => FakeChain
  orderBy: (...args: unknown[]) => FakeChain
  limit: (...args: unknown[]) => FakeChain
  values: (...args: unknown[]) => FakeChain
  onConflictDoUpdate: (...args: unknown[]) => FakeChain
}

interface FakeDb {
  select: (...args: unknown[]) => FakeChain
  insert: (...args: unknown[]) => FakeChain
}

const dbState = vi.hoisted(() => ({ current: null as FakeDb | null }))

vi.mock('../server/db/client', () => ({
  useNewsDatabase: () => dbState.current,
}))

// admin 端点的 requireAdmin 依赖 Nitro 运行时（session/runtimeConfig），按最小替身隔离
vi.mock('../server/utils/admin', () => ({
  requireAdmin: async () => ({}),
}))

function chainOver(promise: PromiseLike<unknown>): FakeChain {
  const chain = {} as FakeChain
  const passthrough = () => chain
  chain.from = passthrough
  chain.where = passthrough
  chain.orderBy = passthrough
  chain.limit = passthrough
  chain.values = passthrough
  chain.onConflictDoUpdate = passthrough
  chain.then = (onFulfilled, onRejected) => promise.then(onFulfilled, onRejected)
  return chain
}

function createFakeDb(selectResults: unknown[][]) {
  let selectCalls = 0
  const inserts: unknown[] = []
  const db: FakeDb = {
    select: () => {
      const index = selectCalls++
      return chainOver(Promise.resolve(selectResults[index] ?? []))
    },
    insert: () => {
      const chain = chainOver(Promise.resolve(undefined))
      chain.values = (payload: unknown) => {
        inserts.push(payload)
        return chain
      }
      return chain
    },
  }
  return { db, inserts, selectCount: () => selectCalls }
}

function caseRow(slug: string, overrides: Record<string, unknown> = {}) {
  return {
    slug,
    title: `案例 ${slug}`,
    summary: `摘要 ${slug}`,
    image: `/images/cases/${slug}.webp`,
    solutionKey: 'smart-manufacturing',
    metrics: [],
    ...overrides,
  }
}

const PICKS_UPDATED_AT = new Date('2026-09-29T00:00:00.000Z')

// ---------- 端点级测试的 Nitro 全局替身 ----------

const bodyState = { current: null as unknown }

let invokePublicGet: (event: { params: Record<string, string> }) => Promise<unknown>
let invokeAdminGet: (event: { params: Record<string, string> }) => Promise<unknown>
let invokeAdminPut: (event: { params: Record<string, string> }) => Promise<unknown>

beforeAll(async () => {
  // Nitro 自动导入的 h3 全局在裸 vitest 环境不存在，按端点实际用法最小替身（同 audit-featured-patch.spec.ts）
  vi.stubGlobal('defineEventHandler', (handler: unknown) => handler)
  vi.stubGlobal('getRouterParam', (event: { params: Record<string, string> }, key: string) => event.params[key])
  vi.stubGlobal('createError', (input: { statusCode: number, statusMessage: string }) => {
    const error = new Error(input.statusMessage) as Error & { statusCode: number, statusMessage: string }
    error.statusCode = input.statusCode
    error.statusMessage = input.statusMessage
    return error
  })
  vi.stubGlobal('readBody', async () => bodyState.current)

  const { default: publicGet } = await import('../server/api/solutions/[key]/cases.get')
  const { default: adminGet } = await import('../server/api/admin/solutions/[key]/cases.get')
  const { default: adminPut } = await import('../server/api/admin/solutions/[key]/cases.put')
  invokePublicGet = publicGet as unknown as typeof invokePublicGet
  invokeAdminGet = adminGet as unknown as typeof invokeAdminGet
  invokeAdminPut = adminPut as unknown as typeof invokeAdminPut
})

afterAll(() => {
  vi.unstubAllGlobals()
})

beforeEach(() => {
  dbState.current = null
  bodyState.current = null
  // getSolutionCasePicks 脏数据/异常路径走 logServerError（console.error），测试期静音
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

// ---------- key 白名单与整列协议 ----------

describe('solutionCasePageKeySchema', () => {
  it('只接受五个方案代码页 key', () => {
    for (const key of SOLUTION_CASE_PAGE_KEYS) {
      expect(solutionCasePageKeySchema.safeParse(key).success).toBe(true)
    }
    expect(SOLUTION_CASE_PAGE_KEYS).toEqual(['manufacturing', 'water', 'energy', 'smart-education', 'fde'])
    expect(solutionCasePageKeySchema.safeParse('compute').success).toBe(false)
    expect(solutionCasePageKeySchema.safeParse(undefined).success).toBe(false)
  })
})

describe('solutionCasePicksSchema', () => {
  it('接受 ≤3 条有序 slug（含空数组）', () => {
    expect(solutionCasePicksSchema.safeParse([]).success).toBe(true)
    expect(solutionCasePicksSchema.safeParse(['a', 'b-1', 'c2']).success).toBe(true)
  })

  it('拒绝超过 3 条 / 重复 slug / 非法 slug 段', () => {
    expect(solutionCasePicksSchema.safeParse(['a', 'b', 'c', 'd']).success).toBe(false)
    expect(solutionCasePicksSchema.safeParse(['a', 'a']).success).toBe(false)
    expect(solutionCasePicksSchema.safeParse(['Bad Slug']).success).toBe(false)
    expect(solutionCasePicksSchema.safeParse(['-a']).success).toBe(false)
  })
})

// ---------- 静态回退映射（data/solution-case-picks.ts，server/client 共享） ----------

describe('静态回退映射', () => {
  it('每个页面 key 的回退条目都来自其映射分类且 ≤3 条', () => {
    for (const key of SOLUTION_CASE_PAGE_KEYS) {
      const fallback = staticSolutionCaseFallback(key)
      expect(fallback.length).toBeLessThanOrEqual(3)
      expect(fallback.length).toBeGreaterThan(0)
      expect(fallback.every(item => item.solutionKey === SOLUTION_CASE_FALLBACK_CATEGORY[key])).toBe(true)
    }
  })

  it('caseSlugFromHref 把 /cases/<slug> 还原为 slug', () => {
    expect(caseSlugFromHref('/cases/automotive-parts-device-agent')).toBe('automotive-parts-device-agent')
    expect(staticSolutionCaseFallback('manufacturing').map(item => caseSlugFromHref(item.href))).toEqual([
      'automotive-parts-device-agent',
    ])
  })
})

// ---------- getSolutionCasePicks 三态 ----------

describe('getSolutionCasePicks', () => {
  it('无 DB → null（调用方回退静态快照）', async () => {
    await expect(getSolutionCasePicks('manufacturing')).resolves.toBeNull()
  })

  it('行未命中 → null', async () => {
    dbState.current = createFakeDb([[]]).db
    await expect(getSolutionCasePicks('water')).resolves.toBeNull()
  })

  it('命中 → { items, updatedAt }', async () => {
    dbState.current = createFakeDb([[{ items: ['a', 'b'], updatedAt: PICKS_UPDATED_AT }]]).db
    await expect(getSolutionCasePicks('energy')).resolves.toEqual({
      items: ['a', 'b'],
      updatedAt: PICKS_UPDATED_AT.toISOString(),
    })
  })

  it('库内脏数据（zod 复验失败）→ null 并记日志', async () => {
    dbState.current = createFakeDb([[{ items: ['a', 'a', 'b', 'c'], updatedAt: PICKS_UPDATED_AT }]]).db
    await expect(getSolutionCasePicks('fde')).resolves.toBeNull()
    expect(console.error).toHaveBeenCalled()
  })

  it('查询异常 → null 并记日志（公开读不抛出）', async () => {
    dbState.current = { select: () => chainOver(Promise.reject(new Error('connection terminated'))) } as FakeDb
    await expect(getSolutionCasePicks('smart-education')).resolves.toBeNull()
    expect(console.error).toHaveBeenCalled()
  })
})

// ---------- putSolutionCasePicks ----------

describe('putSolutionCasePicks', () => {
  it('无 DB → false（端点映射 503）', async () => {
    await expect(putSolutionCasePicks('manufacturing', ['a'])).resolves.toBe(false)
  })

  it('未知案例 slug → 抛 400（软外键存在性校验）', async () => {
    const fake = createFakeDb([[{ slug: 'case-a' }]])
    dbState.current = fake.db
    const error = await putSolutionCasePicks('water', ['case-a', 'case-gone']).catch((error: unknown) => error)
    expect((error as { statusCode?: number }).statusCode).toBe(400)
    expect((error as { statusMessage?: string }).statusMessage).toBe('Unknown case slug: case-gone')
    expect(fake.inserts).toHaveLength(0)
  })

  it('全部 slug 存在 → upsert 入库并返回 true', async () => {
    const fake = createFakeDb([[{ slug: 'case-a' }, { slug: 'case-b' }]])
    dbState.current = fake.db
    await expect(putSolutionCasePicks('energy', ['case-a', 'case-b'])).resolves.toBe(true)
    expect(fake.inserts).toEqual([{ key: 'energy', items: ['case-a', 'case-b'] }])
  })

  it('空数组跳过存在性查询直接落库（清空推荐位是合法操作）', async () => {
    const fake = createFakeDb([])
    dbState.current = fake.db
    await expect(putSolutionCasePicks('fde', [])).resolves.toBe(true)
    expect(fake.selectCount()).toBe(0)
    expect(fake.inserts).toEqual([{ key: 'fde', items: [] }])
  })
})

// ---------- resolveSolutionCases ----------

describe('resolveSolutionCases', () => {
  it('无 DB / picks 未命中 → 静态回退（source: static，按映射分类过滤）', async () => {
    const result = await resolveSolutionCases('water')
    expect(result.source).toBe('static')
    expect(result.items.length).toBeGreaterThan(0)
    expect(result.items.every(item => item.solutionKey === 'smart-water')).toBe(true)

    dbState.current = createFakeDb([[]]).db
    const missed = await resolveSolutionCases('manufacturing')
    expect(missed.source).toBe('static')
    expect(missed.items.map(item => item.href)).toEqual(
      caseResources.filter(item => item.solutionKey === 'smart-manufacturing').slice(0, 3).map(item => item.href),
    )
  })

  it('picks 为空数组 → 静态回退', async () => {
    dbState.current = createFakeDb([[{ items: [], updatedAt: PICKS_UPDATED_AT }]]).db
    const result = await resolveSolutionCases('fde')
    expect(result.source).toBe('static')
  })

  it('picks 命中 → 按 items 顺序投影已发布案例（source: db，href 派生）', async () => {
    dbState.current = createFakeDb([
      [{ items: ['case-b', 'case-a'], updatedAt: PICKS_UPDATED_AT }],
      // join 结果序与 picks 无关（SQL 不保证 inArray 顺序），投影必须按 picks 重排
      [caseRow('case-a'), caseRow('case-b')],
    ]).db
    const result = await resolveSolutionCases('manufacturing')
    expect(result.source).toBe('db')
    expect(result.items.map(item => item.href)).toEqual(['/cases/case-b', '/cases/case-a'])
    expect(result.items[0]).toEqual({
      solutionKey: 'smart-manufacturing',
      title: '案例 case-b',
      summary: '摘要 case-b',
      image: '/images/cases/case-b.webp',
      metrics: [],
      href: '/cases/case-b',
    })
  })

  it('picks 指向的案例已删/转草稿 → 自动跳过不回退补齐（DB 有 picks 即 DB 为准）', async () => {
    dbState.current = createFakeDb([
      [{ items: ['case-a', 'case-draft', 'case-deleted'], updatedAt: PICKS_UPDATED_AT }],
      // published 过滤发生在 SQL where；此处模拟 join 后仅剩 1 条
      [caseRow('case-a')],
    ]).db
    const result = await resolveSolutionCases('energy')
    expect(result.source).toBe('db')
    expect(result.items.map(item => item.href)).toEqual(['/cases/case-a'])
  })

  it('join 查询异常 → 静态回退并记日志', async () => {
    dbState.current = {
      select: (() => {
        let calls = 0
        return () => {
          calls += 1
          return calls === 1
            ? chainOver(Promise.resolve([{ items: ['case-a'], updatedAt: PICKS_UPDATED_AT }]))
            : chainOver(Promise.reject(new Error('connection terminated')))
        }
      })(),
    } as FakeDb
    const result = await resolveSolutionCases('smart-education')
    expect(result.source).toBe('static')
    expect(console.error).toHaveBeenCalled()
  })

  it('published 过滤钉在 join 查询（源码级）', () => {
    const source = readFileSync(new URL('../server/utils/solution-cases-admin.ts', import.meta.url), 'utf8')
    expect(source).toContain("eq(cases.status, 'published')")
    expect(source).toContain('inArray(cases.slug, picks.items)')
  })
})

// ---------- 端点语义 ----------

describe('GET /api/solutions/[key]/cases（公开读）', () => {
  it('非法 key → 400', async () => {
    const error = await invokePublicGet({ params: { key: 'compute' } }).catch((error: unknown) => error)
    expect((error as { statusCode?: number }).statusCode).toBe(400)
  })

  it('未配置（无 DB）→ 静态回退，永不 503', async () => {
    const payload = await invokePublicGet({ params: { key: 'manufacturing' } }) as {
      items: { href: string }[]
      source: string
    }
    expect(payload.source).toBe('static')
    expect(payload.items.map(item => item.href)).toEqual(['/cases/automotive-parts-device-agent'])
  })

  it('picks 命中 → db 数据按序返回', async () => {
    dbState.current = createFakeDb([
      [{ items: ['case-b', 'case-a'], updatedAt: PICKS_UPDATED_AT }],
      [caseRow('case-a'), caseRow('case-b')],
    ]).db
    const payload = await invokePublicGet({ params: { key: 'fde' } }) as {
      items: { href: string }[]
      source: string
    }
    expect(payload.source).toBe('db')
    expect(payload.items.map(item => item.href)).toEqual(['/cases/case-b', '/cases/case-a'])
  })
})

describe('admin GET/PUT /api/admin/solutions/[key]/cases', () => {
  it('GET 未入库 → 静态回退 slug 列表（source: static，编辑器从当前生效内容起步）', async () => {
    const payload = await invokeAdminGet({ params: { key: 'water' } }) as {
      items: string[]
      source: string
      updatedAt: null | string
    }
    expect(payload.source).toBe('static')
    expect(payload.updatedAt).toBeNull()
    expect(payload.items).toEqual(['basin-smart-water'])
  })

  it('GET 命中 → db picks 原样返回', async () => {
    dbState.current = createFakeDb([[{ items: ['case-a'], updatedAt: PICKS_UPDATED_AT }]]).db
    const payload = await invokeAdminGet({ params: { key: 'energy' } }) as {
      items: string[]
      source: string
      updatedAt: string
    }
    expect(payload.source).toBe('db')
    expect(payload.items).toEqual(['case-a'])
    expect(payload.updatedAt).toBe(PICKS_UPDATED_AT.toISOString())
  })

  it('PUT 非法载荷（>3 条 / 重复）→ 400', async () => {
    bodyState.current = { items: ['a', 'b', 'c', 'd'] }
    const error = await invokeAdminPut({ params: { key: 'fde' } }).catch((error: unknown) => error)
    expect((error as { statusCode?: number }).statusCode).toBe(400)
  })

  it('PUT 无 DB → 503', async () => {
    bodyState.current = { items: ['case-a'] }
    const error = await invokeAdminPut({ params: { key: 'manufacturing' } }).catch((error: unknown) => error)
    expect((error as { statusCode?: number }).statusCode).toBe(503)
  })

  it('PUT 未知 slug → 400；合法整列 → ok', async () => {
    const fake = createFakeDb([[{ slug: 'case-a' }], [{ slug: 'case-a' }, { slug: 'case-b' }]])
    dbState.current = fake.db

    bodyState.current = { items: ['case-a', 'case-gone'] }
    const bad = await invokeAdminPut({ params: { key: 'smart-education' } }).catch((error: unknown) => error)
    expect((bad as { statusCode?: number }).statusCode).toBe(400)

    bodyState.current = { items: ['case-a', 'case-b'] }
    await expect(invokeAdminPut({ params: { key: 'smart-education' } })).resolves.toEqual({ ok: true })
  })

  it('两个 admin 路由都挂 requireAdmin（源码级）', () => {
    const getSource = readFileSync(new URL('../server/api/admin/solutions/[key]/cases.get.ts', import.meta.url), 'utf8')
    const putSource = readFileSync(new URL('../server/api/admin/solutions/[key]/cases.put.ts', import.meta.url), 'utf8')
    expect(getSource).toContain('requireAdmin')
    expect(putSource).toContain('requireAdmin')
    // 公开读端点不引入鉴权
    const publicSource = readFileSync(new URL('../server/api/solutions/[key]/cases.get.ts', import.meta.url), 'utf8')
    expect(publicSource).not.toContain('requireAdmin')
  })
})
