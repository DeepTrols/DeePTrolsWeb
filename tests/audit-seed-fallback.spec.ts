import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { caseResources } from '../data/cases'
import { newsItems } from '../data/news'
import { reportResources } from '../data/reports'
import { getCasePayloadBySlug, listCaseResources } from '../server/utils/cases-repo'
import { getNewsPayloadById, listNewsItems } from '../server/utils/news-repo'
import { listReportResources } from '../server/utils/reports-repo'

/**
 * 审计高危#2 回归测试：公开读取路径的回退语义。
 *
 * 新契约（三个仓储统一）：
 * - db === null（未配置 DATABASE_URL）→ 静态回退保留；
 * - 查询抛错 → 静态回退保留（现有 catch 行为，错误日志重构属后续任务）；
 * - 查询成功 → DB 结果是唯一事实源：详情行级未命中返回 null（端点映射 404）、
 *   列表为空返回空数组，静态种子不得复活（否则后台下架/删除不生效）。
 */

/** 最小 drizzle 查询链替身：所有链式方法透传，await 时按调用序返回预置结果 */
interface FakeChain extends PromiseLike<unknown[]> {
  from: (...args: unknown[]) => FakeChain
  innerJoin: (...args: unknown[]) => FakeChain
  where: (...args: unknown[]) => FakeChain
  orderBy: (...args: unknown[]) => FakeChain
  limit: (...args: unknown[]) => FakeChain
}

interface FakeDb {
  select: (...args: unknown[]) => FakeChain
}

const dbState = vi.hoisted(() => ({ current: null as FakeDb | null }))

vi.mock('../server/db/client', () => ({
  useNewsDatabase: () => dbState.current,
}))

function createFakeDb(getResult: (callIndex: number) => unknown[]): FakeDb {
  let calls = 0
  return {
    select() {
      const promise = new Promise<unknown[]>((resolve, reject) => {
        try {
          resolve(getResult(calls++))
        }
        catch (error) {
          reject(error)
        }
      })
      const chain = {} as FakeChain
      const passthrough = () => chain
      chain.from = passthrough
      chain.innerJoin = passthrough
      chain.where = passthrough
      chain.orderBy = passthrough
      chain.limit = passthrough
      chain.then = (onFulfilled, onRejected) => promise.then(onFulfilled, onRejected)
      return chain
    },
  }
}

/** 静态种子中真实存在的 id / slug：行级未命中时它们绝不能以静态形态复活 */
function mustSeed<T>(value: T | undefined, label: string): T {
  if (value === undefined) {
    throw new Error(`${label} 静态种子数据缺失，无法执行回退语义回归测试`)
  }
  return value
}
const staticNewsItem = mustSeed(newsItems[0], 'newsItems')
const staticCase = mustSeed(caseResources[0], 'caseResources')
const staticCaseSlug = staticCase.href.replace('/cases/', '')

const dbNewsRow = {
  id: 999_001,
  title: 'DB 独占新闻标题',
  summary: 'DB 独占摘要',
  coverImage: '/images/db-only.svg',
  category: 'company',
  publishedAt: '2026-01-02',
  blocks: [{ type: 'paragraph', text: 'DB 独占正文' }],
}

const dbCaseListRow = {
  slug: 'db-only-case',
  title: 'DB 独占案例',
  summary: 'DB 独占案例摘要',
  image: '/images/db-case.svg',
  solutionKey: null,
}

const dbCaseDetailRow = {
  slug: 'db-only-case',
  title: 'DB 独占案例详情',
  categoryKey: 'smart-manufacturing',
  heroImage: '/images/db-hero.svg',
  blocks: [{ type: 'paragraph', text: 'DB 独占案例正文' }],
  relatedProducts: [{ name: 'DeepBot', desc: 'DB 相关产品', href: '/products/deepbot' }],
}

describe('audit: DB 已配置且查询成功时，静态种子不得复活', () => {
  beforeEach(() => {
    dbState.current = createFakeDb(() => [])
  })

  it('新闻详情行级未命中返回 null（即使静态种子存在同 id 条目）', async () => {
    expect(newsItems.some(item => item.id === staticNewsItem.id)).toBe(true)
    await expect(getNewsPayloadById(staticNewsItem.id)).resolves.toBeNull()
  })

  it('案例详情行级未命中返回 null（即使静态种子存在同 slug 条目）', async () => {
    expect(caseResources.some(item => item.href === staticCase.href)).toBe(true)
    await expect(getCasePayloadBySlug(staticCaseSlug)).resolves.toBeNull()
  })

  it('表为空时三个列表均返回空数组（不回退静态列表）', async () => {
    await expect(listNewsItems()).resolves.toEqual([])
    await expect(listNewsItems('company')).resolves.toEqual([])
    await expect(listCaseResources()).resolves.toEqual([])
    await expect(listReportResources()).resolves.toEqual([])
  })

  it('新闻行命中时返回 DB 数据（DB 是唯一事实源）', async () => {
    dbState.current = createFakeDb(() => [dbNewsRow])
    const payload = await getNewsPayloadById(dbNewsRow.id)
    expect(payload?.item.title).toBe(dbNewsRow.title)
    expect(payload?.detail).toEqual({ id: dbNewsRow.id, blocks: dbNewsRow.blocks })
  })

  it('案例行命中时 detail 来自 DB、resources 来自 DB 列表（首查列表、次查详情）', async () => {
    dbState.current = createFakeDb(call => (call === 0 ? [dbCaseListRow] : [dbCaseDetailRow]))
    const payload = await getCasePayloadBySlug('db-only-case')
    expect(payload?.detail.title).toBe(dbCaseDetailRow.title)
    expect(payload?.detail.relatedProducts).toEqual(dbCaseDetailRow.relatedProducts)
    expect(payload?.resources).toEqual([
      {
        solutionKey: undefined,
        title: dbCaseListRow.title,
        summary: dbCaseListRow.summary,
        image: dbCaseListRow.image,
        href: `/cases/${dbCaseListRow.slug}`,
      },
    ])
  })
})

describe('audit: db 未配置（useNewsDatabase → null）时静态回退保留', () => {
  beforeEach(() => {
    dbState.current = null
  })

  it('三个列表回退静态种子数据', async () => {
    await expect(listNewsItems()).resolves.toEqual(newsItems)
    await expect(listCaseResources()).resolves.toEqual(caseResources)
    await expect(listReportResources()).resolves.toEqual(reportResources)
  })

  it('新闻/案例详情回退静态种子数据', async () => {
    const newsPayload = await getNewsPayloadById(staticNewsItem.id)
    expect(newsPayload?.item).toEqual(staticNewsItem)
    expect(newsPayload?.detail.id).toBe(staticNewsItem.id)

    const casePayload = await getCasePayloadBySlug(staticCaseSlug)
    expect(casePayload?.detail.slug).toBe(staticCaseSlug)
    expect(casePayload?.resources).toEqual(caseResources)
  })
})

describe('audit: 查询抛错时静态回退保留（现有 catch 行为）', () => {
  beforeEach(() => {
    dbState.current = createFakeDb(() => {
      throw new Error('connection refused')
    })
  })

  it('三个列表回退静态种子数据', async () => {
    await expect(listNewsItems()).resolves.toEqual(newsItems)
    await expect(listCaseResources()).resolves.toEqual(caseResources)
    await expect(listReportResources()).resolves.toEqual(reportResources)
  })

  it('新闻/案例详情回退静态种子数据', async () => {
    const newsPayload = await getNewsPayloadById(staticNewsItem.id)
    expect(newsPayload?.item).toEqual(staticNewsItem)

    const casePayload = await getCasePayloadBySlug(staticCaseSlug)
    expect(casePayload?.detail.slug).toBe(staticCaseSlug)
  })
})

describe('audit: 公开详情端点将 repo null 映射为 404', () => {
  type HandlerEvent = { params: Record<string, string> }

  beforeAll(() => {
    // Nitro 自动导入的 h3 全局在裸 vitest 环境不存在，按端点实际用法最小替身
    vi.stubGlobal('defineEventHandler', (handler: unknown) => handler)
    vi.stubGlobal('getRouterParam', (event: HandlerEvent, key: string) => event.params[key])
    vi.stubGlobal('createError', (input: { statusCode: number, statusMessage: string }) => {
      const error = new Error(input.statusMessage) as Error & { statusCode: number }
      error.statusCode = input.statusCode
      return error
    })
  })

  afterAll(() => {
    vi.unstubAllGlobals()
  })

  it('GET /api/news/:id 在 DB 行未命中时抛 404', async () => {
    dbState.current = createFakeDb(() => [])
    const { default: handler } = await import('../server/api/news/[id].get')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: { id: String(staticNewsItem.id) } }))
      .rejects.toMatchObject({ statusCode: 404 })
  })

  it('GET /api/cases/:slug 在 DB 行未命中时抛 404', async () => {
    dbState.current = createFakeDb(() => [])
    const { default: handler } = await import('../server/api/cases/[slug].get')
    const invoke = handler as unknown as (event: HandlerEvent) => Promise<unknown>
    await expect(invoke({ params: { slug: staticCaseSlug } }))
      .rejects.toMatchObject({ statusCode: 404 })
  })
})
