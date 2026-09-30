import { describe, expect, it } from 'vitest'
import { caseInputSchema, caseSlugSchema, caseUpdateSchema } from '../server/utils/cases-admin'
import { newsInputSchema } from '../server/utils/news-admin'
import { reportInputSchema } from '../server/utils/reports-admin'

const validBlocks = [{ type: 'paragraph', text: '正文段落' }]

const validNews = {
  title: '测试新闻',
  summary: '摘要',
  coverImage: '/images/news/cover.png',
  category: 'company',
  publishedAt: '2026-09-22',
  blocks: validBlocks,
}

const validCase = {
  slug: 'acme-smart-factory',
  title: '某制造客户',
  summary: '案例摘要',
  image: '/images/cases/acme.png',
  sortOrder: 10,
  detailTitle: '某制造客户数字化案例',
  categoryKey: 'smart-manufacturing',
  heroImage: '/images/cases/acme-hero.png',
  blocks: validBlocks,
  relatedProducts: [{ name: 'DGP', desc: '数据治理平台', href: '/products/dgp' }],
  metrics: [
    { value: '40%', label: '非计划停机时间下降' },
    { value: '3×', label: '异常事件响应提速' },
  ],
}

const validReport = {
  type: '白皮书',
  category: '数据要素',
  title: '数据要素白皮书',
  summary: '报告摘要',
  image: '/images/reports/wp.png',
  href: 'https://example.com/wp.pdf',
  sortOrder: 5,
}

describe('news input protocol', () => {
  it('accepts a valid payload and defaults status to draft', () => {
    const parsed = newsInputSchema.parse(validNews)
    expect(parsed.status).toBe('draft')
  })

  it('featured 默认 false 且透传 true（首页推荐位）', () => {
    expect(newsInputSchema.parse(validNews).featured).toBe(false)
    expect(newsInputSchema.parse({ ...validNews, featured: true }).featured).toBe(true)
  })

  it('rejects bad category, bad date, and empty blocks', () => {
    // 015.16：分类动态化——category 只做格式校验（非空 ≤50），存在性校验移至写入路由（category-admin.assertCategoryExists）
    expect(newsInputSchema.safeParse({ ...validNews, category: '' }).success).toBe(false)
    expect(newsInputSchema.safeParse({ ...validNews, category: 'other' }).success).toBe(true)
    expect(newsInputSchema.safeParse({ ...validNews, publishedAt: '2026/09/22' }).success).toBe(false)
    expect(newsInputSchema.safeParse({ ...validNews, blocks: [] }).success).toBe(false)
    expect(newsInputSchema.safeParse({ ...validNews, blocks: [{ type: 'video' }] }).success).toBe(false)
  })
})

describe('case input protocol', () => {
  it('accepts a valid payload and defaults status/solutionKey', () => {
    const parsed = caseInputSchema.parse(validCase)
    expect(parsed.status).toBe('draft')
    expect(parsed.solutionKey).toBeNull()
  })

  it('rejects invalid slugs', () => {
    expect(caseSlugSchema.safeParse('Acme').success).toBe(false)
    expect(caseSlugSchema.safeParse('-lead').success).toBe(false)
    expect(caseSlugSchema.safeParse('has space').success).toBe(false)
    expect(caseSlugSchema.safeParse('ok-slug-1').success).toBe(true)
  })

  it('update schema drops slug but keeps the rest', () => {
    const rest: Record<string, unknown> = { ...validCase }
    delete rest.slug
    expect(caseUpdateSchema.safeParse(rest).success).toBe(true)
    expect('slug' in caseUpdateSchema.parse(rest)).toBe(false)
  })

  it('rejects unknown solutionKey and empty relatedProducts entry', () => {
    // 015.16：行业分类动态化——categoryKey 只做格式校验，存在性校验移至写入路由
    expect(caseInputSchema.safeParse({ ...validCase, categoryKey: '' }).success).toBe(false)
    expect(caseInputSchema.safeParse({ ...validCase, categoryKey: 'unknown' }).success).toBe(true)
    expect(caseInputSchema.safeParse({ ...validCase, relatedProducts: [{ name: '', desc: 'x', href: '/x' }] }).success).toBe(false)
    expect(caseInputSchema.safeParse({ ...validCase, metrics: [{ value: '', label: 'x' }] }).success).toBe(false)
    expect(caseInputSchema.safeParse({ ...validCase, metrics: [{ value: '1', label: '' }] }).success).toBe(false)
    expect(
      caseInputSchema.safeParse({ ...validCase, metrics: Array.from({ length: 4 }, () => ({ value: '1', label: 'x' })) }).success,
    ).toBe(false)
    expect(caseInputSchema.parse(validCase).metrics).toHaveLength(2)
  })
})

describe('report input protocol', () => {
  it('accepts a valid payload and defaults status to draft', () => {
    const parsed = reportInputSchema.parse(validReport)
    expect(parsed.status).toBe('draft')
  })

  it('featured 默认 false 且透传 true（首页推荐位）', () => {
    expect(reportInputSchema.parse(validReport).featured).toBe(false)
    expect(reportInputSchema.parse({ ...validReport, featured: true }).featured).toBe(true)
  })

  it('rejects unknown type and negative sortOrder', () => {
    // 015.16：报告类型动态化——type 只做格式校验（非空 ≤50），存在性校验移至写入路由
    expect(reportInputSchema.safeParse({ ...validReport, type: '' }).success).toBe(false)
    expect(reportInputSchema.safeParse({ ...validReport, type: '手册' }).success).toBe(true)
    expect(reportInputSchema.safeParse({ ...validReport, sortOrder: -1 }).success).toBe(false)
  })
})
