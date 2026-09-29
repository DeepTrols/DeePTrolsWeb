import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import {
  CMS_RESERVED_EXACT_PATHS,
  CMS_RESERVED_PREFIXES,
  CMS_TAKEOVER_PATHS,
  CODE_PAGE_CATALOG,
  isReservedPagePath,
  isTakeoverPath,
  listAdminPages,
  pageInputSchema,
  pageSlugSchema,
  pageUpdateSchema,
} from '../server/utils/pages-admin'
import { pageSectionsSchema } from '../server/utils/page-sections'

// listAdminPages 合并用例的最小 db 替身（audit-error-states.spec.ts 同配方）
const dbState = vi.hoisted(() => ({ current: null as { select: (...args: unknown[]) => unknown } | null }))
vi.mock('../server/db/client', () => ({
  useNewsDatabase: () => dbState.current,
}))

/** select().from().orderBy().limit() 链透传，await 时 resolve 指定行 */
function fakeDbReturning(rows: unknown[]) {
  const chain = {
    then: (resolve: (value: unknown) => unknown) => Promise.resolve(rows).then(resolve),
    from: () => chain,
    orderBy: () => chain,
    limit: () => chain,
  }
  return { select: () => chain }
}

describe('pageSlugSchema', () => {
  it('接受合法完整路径', () => {
    expect(pageSlugSchema.safeParse('/solutions/smart-retail').success).toBe(true)
    expect(pageSlugSchema.safeParse('/products/new-thing').success).toBe(true)
    expect(pageSlugSchema.safeParse('/a').success).toBe(true)
  })

  it('拒绝非法形状', () => {
    expect(pageSlugSchema.safeParse('no-leading-slash').success).toBe(false)
    expect(pageSlugSchema.safeParse('/Upper').success).toBe(false)
    expect(pageSlugSchema.safeParse('/a/').success).toBe(false)
    expect(pageSlugSchema.safeParse('/a//b').success).toBe(false)
    expect(pageSlugSchema.safeParse('/-a').success).toBe(false)
  })

  it('拒绝保留路径（代码路由与系统前缀）', () => {
    expect(pageSlugSchema.safeParse('/contact').success).toBe(false)
    expect(pageSlugSchema.safeParse('/solutions/energy').success).toBe(false)
    expect(pageSlugSchema.safeParse('/news').success).toBe(false)
    expect(pageSlugSchema.safeParse('/news/123').success).toBe(false)
    expect(pageSlugSchema.safeParse('/cases/foo').success).toBe(false)
    expect(pageSlugSchema.safeParse('/demo/x').success).toBe(false)
    expect(pageSlugSchema.safeParse('/api/foo').success).toBe(false)
  })

  it('允许 /solutions/<new-slug>（代码动态路由有 CMS 回退分支）', () => {
    expect(pageSlugSchema.safeParse('/solutions/smart-logistics').success).toBe(true)
  })
})

describe('接管白名单（015.18）', () => {
  it("slug '/' 经接管特判放行，但保留语义不变", () => {
    // pageSlugSchema 对接管白名单路径特判放行（只能经 takeover 端点写入）
    expect(pageSlugSchema.safeParse('/').success).toBe(true)
    // isReservedPagePath 对 '/' 仍返回 true：普通 CMS 页/目录扫描语义不受影响
    expect(isReservedPagePath('/')).toBe(true)
    expect(isTakeoverPath('/')).toBe(true)
    expect(CMS_TAKEOVER_PATHS).toContain('/')
  })

  it('白名单外的保留路径不放行', () => {
    expect(isTakeoverPath('/contact')).toBe(false)
    expect(pageSlugSchema.safeParse('/contact').success).toBe(false)
    expect(pageSlugSchema.safeParse('/about_us').success).toBe(false)
  })

  it('pageInputSchema 接受 slug=/ 的接管种子载荷', () => {
    const parsed = pageInputSchema.safeParse({
      slug: '/',
      title: '首页',
      status: 'draft',
      sections: [{ type: 'hero', variant: 'fullscreen-image', title: '标题', backgroundImage: '/h.webp' }],
    })
    expect(parsed.success).toBe(true)
  })
})

describe('listAdminPages 接管合并（015.18）', () => {
  it('无 DB：仅代码页目录，全部 source=code 且无 takenOver', async () => {
    dbState.current = null
    const rows = await listAdminPages()
    expect(rows.length).toBe(CODE_PAGE_CATALOG.length)
    expect(rows.every(row => row.source === 'code')).toBe(true)
    expect(rows.every(row => !row.takenOver)).toBe(true)
  })

  it("CMS 行命中接管白名单路径 '/'：折叠进 code 行（takenOver + status/updatedAt 取 CMS 值），不重复出行", async () => {
    const updatedAt = new Date('2026-09-29T00:00:00.000Z')
    dbState.current = fakeDbReturning([
      { slug: '/', title: '首页', status: 'draft', sortOrder: 0, updatedAt },
    ])
    const rows = await listAdminPages()
    // 不产生重复的 '/' 行
    expect(rows.filter(row => row.slug === '/').length).toBe(1)
    const homeRow = rows.find(row => row.slug === '/')
    expect(homeRow?.source).toBe('code')
    expect(homeRow?.takenOver).toBe(true)
    expect(homeRow?.status).toBe('draft')
    expect(homeRow?.updatedAt).toBe(updatedAt.toISOString())
    expect(rows.length).toBe(CODE_PAGE_CATALOG.length)
  })

  it('普通 CMS 行不受合并影响，追加在代码页目录之后', async () => {
    const updatedAt = new Date('2026-09-29T00:00:00.000Z')
    dbState.current = fakeDbReturning([
      { slug: '/x-page', title: 'X', status: 'published', sortOrder: 1, updatedAt },
    ])
    const rows = await listAdminPages()
    expect(rows.length).toBe(CODE_PAGE_CATALOG.length + 1)
    const cmsRow = rows.at(-1)
    expect(cmsRow?.slug).toBe('/x-page')
    expect(cmsRow?.source).toBe('cms')
    expect(cmsRow?.takenOver).toBeUndefined()
    // 代码行不受影响
    expect(rows.find(row => row.slug === '/')?.takenOver).toBeUndefined()
  })
})

describe('isReservedPagePath', () => {
  it('覆盖精确路径与前缀', () => {
    expect(isReservedPagePath('/')).toBe(true)
    expect(isReservedPagePath('/products/ai-iot')).toBe(true)
    expect(isReservedPagePath('/uploads/2026-09/x.png')).toBe(true)
    expect(isReservedPagePath('/admin')).toBe(true)
    expect(isReservedPagePath('/solutions/smart-logistics')).toBe(false)
    expect(isReservedPagePath('/about-us-extra')).toBe(false)
  })
})

describe('保留清单完整性', () => {
  const pagesDir = fileURLToPath(new URL('../pages', import.meta.url))

  function listRouteFiles(dir: string, base = dir): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = `${dir}/${entry.name}`
      if (entry.isDirectory()) {
        return listRouteFiles(full, base)
      }
      return entry.name.endsWith('.vue') ? [full.slice(base.length + 1)] : []
    })
  }

  it('pages/ 下每个代码路由都被保留清单覆盖（或有 CMS 回退）', () => {
    const files = listRouteFiles(pagesDir)
    expect(files.length).toBeGreaterThan(20)

    for (const file of files) {
      const segments = file.replace(/\.vue$/, '').split('/')
      // catch-all 分发器自身：跳过
      if (segments[0]?.startsWith('[...')) {
        continue
      }
      const dynamic = segments.some(segment => /^\[[^\]]+\]$/.test(segment))
      if (dynamic) {
        // 代码动态路由：父前缀必须保留（/news、/cases、/demo），
        // 唯一例外 /solutions/[slug] —— 它有 CMS 回退分支，允许 /solutions/<new> 入库
        const parent = `/${segments.slice(0, -1).join('/')}`
        const covered =
          (CMS_RESERVED_PREFIXES as readonly string[]).includes(parent) || parent === '/solutions'
        expect(covered, `动态路由 ${file} 的父前缀 ${parent} 未被保留且无 CMS 回退`).toBe(true)
        continue
      }
      // 静态路由：推导完整路径，必须被保留清单覆盖（精确路径或前缀，如 /cases、/news 列表页）
      const route = `/${segments.filter(segment => segment !== 'index').join('/')}`
      const normalized = route === '/index' ? '/' : route === '' ? '/' : route
      expect(
        isReservedPagePath(normalized),
        `静态路由 ${file} → ${normalized} 未被保留清单覆盖`,
      ).toBe(true)
    }
  })
})

describe('CODE_PAGE_CATALOG（代码页只读清单）', () => {
  const catalogPaths = CODE_PAGE_CATALOG.map(entry => entry.path)

  it('覆盖全部 CMS_RESERVED_EXACT_PATHS', () => {
    for (const path of CMS_RESERVED_EXACT_PATHS) {
      expect(catalogPaths, `代码页目录缺少保留路径 ${path}`).toContain(path)
    }
  })

  it('静态路径全部为保留路径（防止漏登记导致与 CMS 撞车）', () => {
    for (const path of catalogPaths) {
      if (path.includes(':')) {
        continue
      }
      expect(isReservedPagePath(path), `目录静态路径 ${path} 未被保留清单覆盖`).toBe(true)
    }
  })

  it('动态路由模式条目固定（news/cases/solutions 详情）', () => {
    const dynamic = catalogPaths.filter(path => path.includes(':'))
    expect(dynamic.sort()).toEqual(['/cases/:slug', '/news/:id', '/solutions/:slug'])
  })

  it('/demo 演示页逐个登记且全部保留', () => {
    const demos = catalogPaths.filter(path => path.startsWith('/demo/'))
    expect(demos.length).toBe(11)
    for (const path of demos) {
      expect(isReservedPagePath(path)).toBe(true)
    }
  })
})

describe('pageSectionsSchema（Phase C richText 兼容）', () => {
  it('Phase C richText 区块形状保持兼容', () => {
    const sections = [
      {
        type: 'richText',
        blocks: [
          { type: 'heading', level: 2, text: '标题' },
          { type: 'paragraph', text: '正文' },
        ],
      },
    ]
    const parsed = pageSectionsSchema.safeParse(sections)
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      // visible 默认补 true
      expect(parsed.data[0]?.visible).toBe(true)
    }
  })

  it('拒绝缺必填 title 的 hero 与空 blocks 的 richText', () => {
    // hero 协议是 title 必填（blocks 不是 hero 字段）：缺 title 即被拒
    expect(pageSectionsSchema.safeParse([{ type: 'hero', blocks: [] }]).success).toBe(false)
    // richText 协议要求 blocks min(1)：空数组被拒
    expect(pageSectionsSchema.safeParse([{ type: 'richText', blocks: [] }]).success).toBe(false)
  })
})

describe('pageInputSchema / pageUpdateSchema', () => {
  it('补默认值（draft / sortOrder 0 / sections [] / seoDescription 空串）', () => {
    const parsed = pageInputSchema.safeParse({ slug: '/x-page', title: 'X' })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.status).toBe('draft')
      expect(parsed.data.sortOrder).toBe(0)
      expect(parsed.data.sections).toEqual([])
      expect(parsed.data.seoDescription).toBe('')
    }
  })

  it('pageUpdateSchema 不接受 slug（主键不可变）', () => {
    expect('slug' in pageUpdateSchema.shape).toBe(false)
    const parsed = pageUpdateSchema.safeParse({ title: 'X', slug: '/sneaky' })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect('slug' in parsed.data).toBe(false)
    }
  })
})
