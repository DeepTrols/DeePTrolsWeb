import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { insights as staticInsights } from '../data/home-insights'
import type { InsightItem } from '../data/home-insights'
import { HOME_INSIGHTS_MAX_ITEMS, mergeHomeInsights, toNewsInsight } from '../server/utils/home-insights'
import type { InsightNewsRow, InsightReportRow } from '../server/utils/home-insights'

/**
 * 审计#19：首页 insights 合并规则行为级测试（此前仅有源码文本合同，见 backend-admin.mjs / admin-api.contract.ts）。
 * 合并逻辑已抽为纯函数 server/utils/home-insights.ts：
 * - featured+published 过滤与排序发生在端点 DB 查询（where/orderBy），纯函数只做顺序保持的合并与封顶；
 * - 空结果 → 端点回退静态 insights（回退决策留在端点，见下方端点级测试）。
 */

// ---------- 行工厂 ----------

function newsRow(id: number, overrides: Partial<InsightNewsRow> = {}): InsightNewsRow {
  return {
    id,
    title: `新闻 ${id}`,
    summary: `新闻摘要 ${id}`,
    coverImage: `/images/news/cover-${id}.png`,
    category: 'company',
    ...overrides,
  }
}

function reportRow(id: number, overrides: Partial<InsightReportRow> = {}): InsightReportRow {
  return {
    category: '白皮书',
    title: `报告 ${id}`,
    summary: `报告摘要 ${id}`,
    image: `/images/reports/report-${id}.png`,
    href: `/reports/whitepaper-${id}.pdf`,
    ...overrides,
  }
}

// ---------- 纯函数：映射与合并 ----------

describe('toNewsInsight（新闻行 → InsightItem 映射）', () => {
  it('字段映射：image←coverImage、href=/news/{id}、category key → 中文标签', () => {
    expect(toNewsInsight(newsRow(7))).toStrictEqual({
      category: '公司动态',
      title: '新闻 7',
      summary: '新闻摘要 7',
      image: '/images/news/cover-7.png',
      href: '/news/7',
    })
    expect(toNewsInsight(newsRow(1, { category: 'media' })).category).toBe('新闻报道')
    expect(toNewsInsight(newsRow(1, { category: 'insight' })).category).toBe('技术洞见')
  })

  it('未登记的 category key 原样回退（不吞数据）', () => {
    expect(toNewsInsight(newsRow(2, { category: 'zzz-unknown' })).category).toBe('zzz-unknown')
  })
})

describe('mergeHomeInsights（新闻优先 → 报告补足 → 封顶）', () => {
  it('featured 新闻排前：新闻（映射后）恒在报告（原样）之前', () => {
    const merged = mergeHomeInsights([newsRow(1), newsRow(2)], [reportRow(11), reportRow(12)])
    expect(merged).toHaveLength(4)
    expect(merged[0]).toStrictEqual(toNewsInsight(newsRow(1)))
    expect(merged[1]).toStrictEqual(toNewsInsight(newsRow(2)))
    // 报告行字段与 InsightItem 同构，原样进入结果
    expect(merged[2]).toStrictEqual(reportRow(11))
    expect(merged[3]).toStrictEqual(reportRow(12))
  })

  it('报告补足到上限：1 新闻 + 5 报告 → 1 新闻 + 前 3 报告，共 4 条', () => {
    const reports = [11, 12, 13, 14, 15].map(id => reportRow(id))
    const merged = mergeHomeInsights([newsRow(1)], reports)
    expect(merged).toHaveLength(HOME_INSIGHTS_MAX_ITEMS)
    expect(merged.map(item => item.title)).toEqual(['新闻 1', '报告 11', '报告 12', '报告 13'])
  })

  it('超出封顶截断：新闻已 ≥ 上限时报告全部不入选', () => {
    const merged = mergeHomeInsights([1, 2, 3, 4, 5, 6].map(id => newsRow(id)), [reportRow(11)])
    expect(merged).toHaveLength(HOME_INSIGHTS_MAX_ITEMS)
    expect(merged.map(item => item.href)).toEqual(['/news/1', '/news/2', '/news/3', '/news/4'])
  })

  it('maxItems 参数生效（0 → 空；大于总量 → 全收）', () => {
    expect(mergeHomeInsights([newsRow(1)], [reportRow(11)], 0)).toEqual([])
    expect(mergeHomeInsights([newsRow(1), newsRow(2)], [reportRow(11)], 2)).toHaveLength(2)
    expect(mergeHomeInsights([newsRow(1)], [reportRow(11), reportRow(12)], 2)).toHaveLength(2)
    expect(mergeHomeInsights([newsRow(1)], [reportRow(11)], 10)).toHaveLength(2)
  })

  it('空输入 → 空数组（端点据此触发静态回退，见端点级测试）', () => {
    expect(mergeHomeInsights([], [])).toEqual([])
    expect(mergeHomeInsights([], [], 4)).toEqual([])
  })

  it('排序稳定性：保序合并不重排（排序职责在端点 ORDER BY），且不修改入参、结果确定', () => {
    const news = [newsRow(9), newsRow(3), newsRow(7)]
    const reports = [reportRow(15), reportRow(11)]
    const newsSnapshot = structuredClone(news)
    const reportsSnapshot = structuredClone(reports)

    const merged = mergeHomeInsights(news, reports)
    // 保序：新闻按入参顺序（9,3,7）排前，报告按入参顺序补足至封顶 4 条（仅报告 15 入选）
    expect(merged.map(item => item.title)).toEqual(['新闻 9', '新闻 3', '新闻 7', '报告 15'])
    // 入参不被就地修改
    expect(news).toStrictEqual(newsSnapshot)
    expect(reports).toStrictEqual(reportsSnapshot)
    // 幂等：同输入两次调用结果一致
    expect(mergeHomeInsights(news, reports)).toStrictEqual(merged)
  })
})

// ---------- 端点级：fake db 验证响应结构与回退 ----------

interface FakeChain extends PromiseLike<unknown> {
  from: (...args: unknown[]) => FakeChain
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

function chainOver(promise: PromiseLike<unknown>): FakeChain {
  const chain = {} as FakeChain
  const passthrough = () => chain
  chain.from = passthrough
  chain.where = passthrough
  chain.orderBy = passthrough
  chain.limit = passthrough
  chain.then = (onFulfilled, onRejected) => promise.then(onFulfilled, onRejected)
  return chain
}

/** 按 select 调用序返回预置行的 db 替身，并记录查询次数 */
function createFakeDb(results: unknown[][]) {
  let calls = 0
  const db: FakeDb = {
    select: () => {
      const index = calls++
      return chainOver(Promise.resolve(results[index] ?? []))
    },
  }
  return { db, callCount: () => calls }
}

let invokeInsights: () => Promise<InsightItem[]>

beforeAll(async () => {
  // Nitro 自动导入的 h3 全局在裸 vitest 环境不存在，按端点实际用法最小替身（同 audit-error-states.spec.ts）
  vi.stubGlobal('defineEventHandler', (handler: unknown) => handler)
  const { default: handler } = await import('../server/api/home/insights.get')
  invokeInsights = handler as unknown as () => Promise<InsightItem[]>
})

afterAll(() => {
  vi.unstubAllGlobals()
})

beforeEach(() => {
  dbState.current = null
})

describe('GET /api/home/insights 端点（审计#19：重构为消费纯函数后响应结构不变）', () => {
  it('新闻未满 → 报告补足：返回映射后的合并列表（结构 = InsightItem[]）', async () => {
    const fake = createFakeDb([[newsRow(1), newsRow(2, { category: 'insight' })], [reportRow(11), reportRow(12)]])
    dbState.current = fake.db

    await expect(invokeInsights()).resolves.toStrictEqual([
      toNewsInsight(newsRow(1)),
      toNewsInsight(newsRow(2, { category: 'insight' })),
      reportRow(11),
      reportRow(12),
    ])
    expect(fake.callCount()).toBe(2)
  })

  it('featured 新闻已填满 4 条 → 不再查询报告（按需查询语义保留）', async () => {
    const rows = [1, 2, 3, 4].map(id => newsRow(id))
    const fake = createFakeDb([rows, [reportRow(11)]])
    dbState.current = fake.db

    const items = await invokeInsights()
    expect(items).toHaveLength(4)
    expect(items.map(item => item.href)).toEqual(['/news/1', '/news/2', '/news/3', '/news/4'])
    expect(fake.callCount()).toBe(1)
  })

  it('零推荐（两查询皆空）→ 回退静态 insights', async () => {
    const fake = createFakeDb([[], []])
    dbState.current = fake.db

    await expect(invokeInsights()).resolves.toEqual(staticInsights)
    expect(fake.callCount()).toBe(2)
  })

  it('DB 未配置 → 直接返回静态 insights（不发起查询）', async () => {
    dbState.current = null
    await expect(invokeInsights()).resolves.toEqual(staticInsights)
  })

  it('非 featured/未 published 不入选（按实际实现）：过滤在端点 DB 查询完成，纯函数不做 featured 过滤', async () => {
    const source = readFileSync(new URL('../server/api/home/insights.get.ts', import.meta.url), 'utf8')
    // 查询侧钉住过滤与排序（featured/published where + publishedAt desc / sortOrder asc）
    expect(source).toContain('eq(news.status, \'published\')')
    expect(source).toContain('eq(news.featured, true)')
    expect(source).toContain('eq(reports.status, \'published\')')
    expect(source).toContain('eq(reports.featured, true)')
    expect(source).toContain('desc(news.publishedAt)')
    expect(source).toContain('asc(reports.sortOrder)')
    // 合并委托纯函数，公开读端点不引入鉴权
    expect(source).toContain('mergeHomeInsights(')
    expect(source).not.toContain('requireAdmin')
  })
})
