import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { solutionCategories } from '../data/solution-categories'
import {
  assertCategoryExists,
  CATEGORY_SCOPES,
  categoryInputSchema,
  countCategoryRefs,
  createCategory,
  deleteCategory,
  listCategories,
  staticCategoriesFor,
  updateCategory,
} from '../server/utils/category-admin'
import { newsCategoryTabs } from '../data/news'
import { newsCategorySchema } from '../server/utils/news-admin'
import { reportTypeSchema } from '../server/utils/reports-admin'
import { solutionKeySchema } from '../server/utils/content-admin'

/**
 * 015.16 内容分类管理：content_categories 表 + 软外键的单测。
 *
 * 契约：
 * - scope 白名单三值；slug 类 scope（news-category/solution）key 必须小写 slug，report-type key=label 允许中文。
 * - listCategories：DB 命中返回按 sortOrder 排序数组（空表不回退静态——管理员清空是合法状态）；无 DB 返回 null。
 * - staticCategoriesFor：与迁移 0010 种子一致；新闻分类沿用 data/news.ts newsCategoryTabs 单一事实源。
 * - countCategoryRefs：news-category 扫 news.category；solution = cases+details+reports 三表合并；report-type 扫 reports.type。
 * - deleteCategory：被引用 → 'in-use'（端点 409）；未命中 → false；无 DB → null。
 * - assertCategoryExists：未知 key 抛 400；无 DB 跳过（静态回退模式不约束）。
 * - 写入协议 z.enum 已全部放宽为字符串格式校验（newsCategorySchema/solutionKeySchema/reportTypeSchema）。
 */

/** 最小 drizzle 替身（与 featured-limits.spec.ts 同款）；select 按队列依次 resolve 预置行集 */
interface FakeChain extends PromiseLike<unknown> {
  from: (...args: unknown[]) => FakeChain
  where: (...args: unknown[]) => FakeChain
  orderBy: (...args: unknown[]) => FakeChain
  limit: (...args: unknown[]) => FakeChain
  set: (...args: unknown[]) => FakeChain
  values: (...args: unknown[]) => FakeChain
  returning: (...args: unknown[]) => FakeChain
}

interface FakeDb {
  select: (...args: unknown[]) => FakeChain
  insert: (...args: unknown[]) => FakeChain
  update: (...args: unknown[]) => FakeChain
  delete: (...args: unknown[]) => FakeChain
}

const dbState = vi.hoisted(() => ({ current: null as FakeDb | null }))

vi.mock('../server/db/client', () => ({
  useNewsDatabase: () => dbState.current,
}))

/** select 链按队列消费行集；insert/update/delete 链恒 resolve returningRows */
function createQueuedDb(selectRowSets: unknown[][], returningRows: unknown[] = [{ key: 'x' }]) {
  const queue = [...selectRowSets]
  const chainOver = (promise: PromiseLike<unknown>): FakeChain => {
    const chain = {} as FakeChain
    const passthrough = () => chain
    chain.from = passthrough
    chain.where = passthrough
    chain.orderBy = passthrough
    chain.limit = passthrough
    chain.set = passthrough
    chain.values = passthrough
    chain.returning = passthrough
    chain.then = (onFulfilled, onRejected) => promise.then(onFulfilled, onRejected)
    return chain
  }
  return {
    select: () => chainOver(Promise.resolve(queue.shift() ?? [])),
    insert: () => chainOver(Promise.resolve(returningRows)),
    update: () => chainOver(Promise.resolve(returningRows)),
    delete: () => chainOver(Promise.resolve(returningRows)),
  }
}

let errorSpy: ReturnType<typeof vi.spyOn>

beforeAll(() => {
  // Nitro 自动导入的 h3 全局在裸 vitest 环境不存在（assertCategoryExists 的 createError）
  vi.stubGlobal('createError', (input: { statusCode: number, statusMessage: string }) => {
    const error = new Error(input.statusMessage) as Error & { statusCode: number, statusMessage: string }
    error.statusCode = input.statusCode
    error.statusMessage = input.statusMessage
    return error
  })
})

afterAll(() => {
  vi.unstubAllGlobals()
})

beforeEach(() => {
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  dbState.current = null
  errorSpy.mockRestore()
})

function loggedText(): string {
  return errorSpy.mock.calls.map(call => String(call[0])).join('\n')
}

describe('015.16: scope 白名单与 key 协议', () => {
  it('CATEGORY_SCOPES 三值', () => {
    expect(CATEGORY_SCOPES).toEqual(['news-category', 'solution', 'report-type'])
  })

  it('slug 类 scope：小写 slug 通过；大写/中文/前导连字符拒绝', () => {
    const base = { scope: 'solution' as const, label: '智慧零售', sortOrder: 0 }
    expect(categoryInputSchema.safeParse({ ...base, key: 'smart-retail' }).success).toBe(true)
    expect(categoryInputSchema.safeParse({ ...base, key: 'Smart-Retail' }).success).toBe(false)
    expect(categoryInputSchema.safeParse({ ...base, key: '智慧零售' }).success).toBe(false)
    expect(categoryInputSchema.safeParse({ ...base, key: '-smart' }).success).toBe(false)
  })

  it('report-type：key=label 允许中文', () => {
    expect(
      categoryInputSchema.safeParse({ scope: 'report-type', key: '行业报告', label: '行业报告', sortOrder: 0 }).success,
    ).toBe(true)
  })

  it('非法 scope 拒绝', () => {
    expect(
      categoryInputSchema.safeParse({ scope: 'unknown', key: 'x', label: 'x', sortOrder: 0 }).success,
    ).toBe(false)
  })
})

describe('015.16: 静态快照与协议对齐', () => {
  it('news-category 沿用 newsCategoryTabs（key/label 一致，sortOrder 按数组序）', () => {
    expect(staticCategoriesFor('news-category')).toEqual(
      newsCategoryTabs.map((tab, index) => ({ key: tab.key, label: tab.label, sortOrder: index })),
    )
  })

  it('solution/report-type 快照与迁移 0010/0012 种子一致', () => {
    expect(staticCategoriesFor('solution').map(item => item.key)).toEqual([
      'data-infrastructure',
      'knowledge-engineering',
      'smart-manufacturing',
      'smart-water',
      'smart-education',
      'fde',
      'compute-power',
      'smart-energy-storage',
    ])
    expect(staticCategoriesFor('solution').map(item => item.key)).toEqual(solutionCategories.map(item => item.key))
    expect(staticCategoriesFor('report-type')).toHaveLength(6)
    expect(staticCategoriesFor('report-type').every(item => item.key === item.label)).toBe(true)
  })

  it('写入协议 z.enum 已放宽为字符串（动态分类可通过格式校验）', () => {
    expect(newsCategorySchema.safeParse('breaking-news').success).toBe(true)
    expect(solutionKeySchema.safeParse('smart-retail').success).toBe(true)
    expect(reportTypeSchema.safeParse('行业报告').success).toBe(true)
    expect(newsCategorySchema.safeParse('').success).toBe(false)
  })
})

describe('015.16: listCategories 三态', () => {
  it('未配置 DB → null 哨兵（公开路由回退静态快照），不落日志', async () => {
    dbState.current = null
    await expect(listCategories('solution')).resolves.toBeNull()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('DB 命中返回行（含管理员清空后的空表——不回退静态）', async () => {
    dbState.current = createQueuedDb([[{ key: 'smart-retail', label: '智慧零售', sortOrder: 7 }]])
    await expect(listCategories('solution')).resolves.toEqual([
      { key: 'smart-retail', label: '智慧零售', sortOrder: 7 },
    ])

    dbState.current = createQueuedDb([[]])
    await expect(listCategories('solution')).resolves.toEqual([])
  })

  it('查询异常 → 500 + logServerError', async () => {
    const db = createQueuedDb([])
    db.select = () => {
      const chain = {} as FakeChain
      chain.from = () => chain
      chain.where = () => chain
      chain.orderBy = () => chain
      chain.limit = () => chain
      chain.then = (onFulfilled, onRejected) => Promise.reject(new Error('boom')).then(onFulfilled, onRejected)
      return chain
    }
    dbState.current = db
    await expect(listCategories('solution')).rejects.toMatchObject({ statusCode: 500 })
    expect(loggedText()).toContain('category-admin.listCategories')
  })
})

describe('015.16: countCategoryRefs 引用计数', () => {
  it('未配置 DB → null', async () => {
    dbState.current = null
    await expect(countCategoryRefs('solution', 'fde')).resolves.toBeNull()
  })

  it('news-category 单表计数', async () => {
    dbState.current = createQueuedDb([[{ value: 12 }]])
    await expect(countCategoryRefs('news-category', 'company')).resolves.toBe(12)
  })

  it('solution = cases + caseDetails + reports 三表合并', async () => {
    dbState.current = createQueuedDb([[{ value: 2 }], [{ value: 1 }], [{ value: 3 }]])
    await expect(countCategoryRefs('solution', 'fde')).resolves.toBe(6)
  })

  it('report-type 扫 reports.type', async () => {
    dbState.current = createQueuedDb([[{ value: 4 }]])
    await expect(countCategoryRefs('report-type', '白皮书')).resolves.toBe(4)
  })
})

describe('015.16: assertCategoryExists 软外键', () => {
  it('存在 → 通过', async () => {
    dbState.current = createQueuedDb([[{ key: 'fde' }]])
    await expect(assertCategoryExists('solution', 'fde')).resolves.toBeUndefined()
  })

  it('不存在 → 400 Unknown category', async () => {
    dbState.current = createQueuedDb([[]])
    await expect(assertCategoryExists('solution', 'nope')).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: 'Unknown category "nope" for scope "solution"',
    })
  })

  it('未配置 DB → 跳过（静态回退模式不做存在性约束）', async () => {
    dbState.current = null
    await expect(assertCategoryExists('solution', 'anything')).resolves.toBeUndefined()
  })
})

describe('015.16: createCategory / updateCategory / deleteCategory', () => {
  it('create：同 scope+key 已存在 → conflict；否则插入成功', async () => {
    dbState.current = createQueuedDb([[{ key: 'fde' }]])
    await expect(
      createCategory({ scope: 'solution', key: 'fde', label: 'FDE', sortOrder: 5 }),
    ).resolves.toBe('conflict')

    dbState.current = createQueuedDb([[]])
    await expect(
      createCategory({ scope: 'solution', key: 'smart-retail', label: '智慧零售', sortOrder: 7 }),
    ).resolves.toBe(true)
  })

  it('create：无 DB → null', async () => {
    dbState.current = null
    await expect(
      createCategory({ scope: 'solution', key: 'x', label: 'x', sortOrder: 0 }),
    ).resolves.toBeNull()
  })

  it('update：命中 true / 未命中 false / 无 DB null', async () => {
    dbState.current = createQueuedDb([], [{ key: 'fde' }])
    await expect(updateCategory('solution', 'fde', { label: 'FDE 2', sortOrder: 5 })).resolves.toBe(true)

    dbState.current = createQueuedDb([], [])
    await expect(updateCategory('solution', 'nope', { label: 'x', sortOrder: 0 })).resolves.toBe(false)

    dbState.current = null
    await expect(updateCategory('solution', 'fde', { label: 'x', sortOrder: 0 })).resolves.toBeNull()
  })

  it('delete：被引用 → in-use（三表合并计数 >0）', async () => {
    dbState.current = createQueuedDb([[{ value: 1 }], [{ value: 0 }], [{ value: 0 }]])
    await expect(deleteCategory('solution', 'fde')).resolves.toBe('in-use')
  })

  it('delete：无引用且命中 → true；未命中 → false；无 DB → null', async () => {
    dbState.current = createQueuedDb([[{ value: 0 }], [{ value: 0 }], [{ value: 0 }]], [{ key: 'old' }])
    await expect(deleteCategory('solution', 'old')).resolves.toBe(true)

    dbState.current = createQueuedDb([[{ value: 0 }], [{ value: 0 }], [{ value: 0 }]], [])
    await expect(deleteCategory('solution', 'nope')).resolves.toBe(false)

    dbState.current = null
    await expect(deleteCategory('solution', 'fde')).resolves.toBeNull()
  })
})
