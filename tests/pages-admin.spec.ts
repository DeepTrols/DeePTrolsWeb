import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  CMS_RESERVED_PREFIXES,
  isReservedPagePath,
  pageInputSchema,
  pageSectionSchema,
  pageSlugSchema,
  pageUpdateSchema,
} from '../server/utils/pages-admin'

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
    expect(pageSlugSchema.safeParse('/').success).toBe(false)
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

describe('pageSectionSchema', () => {
  it('接受 richText 区块（ArticleBlock[]）', () => {
    const section = {
      type: 'richText',
      blocks: [
        { type: 'heading', level: 2, text: '标题' },
        { type: 'paragraph', text: '正文' },
      ],
    }
    expect(pageSectionSchema.safeParse(section).success).toBe(true)
  })

  it('拒绝未知区块类型与非法 block', () => {
    expect(pageSectionSchema.safeParse({ type: 'hero', blocks: [] }).success).toBe(false)
    expect(
      pageSectionSchema.safeParse({ type: 'richText', blocks: [{ type: 'paragraph', text: '' }] }).success,
    ).toBe(false)
    expect(pageSectionSchema.safeParse({ type: 'richText', blocks: [] }).success).toBe(false)
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
