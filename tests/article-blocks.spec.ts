import { describe, expect, it } from 'vitest'
import { caseDetails } from '../data/case-details'
import { newsDetails } from '../data/news-details'
import { articleBlockSchema, articleBlocksSchema, parseArticleBlocks } from '../server/utils/article-blocks'
import { parseCaseRelatedProducts } from '../server/utils/cases-repo'

describe('article-blocks zod protocol', () => {
  it('accepts every block kind from the ArticleBlock discriminated union', () => {
    expect(articleBlockSchema.parse({ type: 'heading', level: 2, text: '章节' })).toBeTruthy()
    expect(articleBlockSchema.parse({ type: 'paragraph', text: '正文' })).toBeTruthy()
    expect(articleBlockSchema.parse({ type: 'list', items: ['甲', '乙'] })).toBeTruthy()
    expect(articleBlockSchema.parse({ type: 'list', ordered: true, items: ['甲'] })).toBeTruthy()
    expect(articleBlockSchema.parse({ type: 'quote', text: '引用' })).toBeTruthy()
    expect(articleBlockSchema.parse({ type: 'image', src: '/a.svg', alt: '图' })).toBeTruthy()
    expect(articleBlockSchema.parse({ type: 'image', src: '/a.svg', alt: '图', caption: '注' })).toBeTruthy()
    expect(articleBlockSchema.parse({ type: 'divider' })).toBeTruthy()
  })

  it('rejects invalid blocks so the renderer never sees unknown kinds', () => {
    expect(() => articleBlockSchema.parse({ type: 'video', src: '/a.mp4' })).toThrow()
    expect(() => articleBlockSchema.parse({ type: 'heading', level: 5, text: 'x' })).toThrow()
    expect(() => articleBlockSchema.parse({ type: 'paragraph', text: '' })).toThrow()
    expect(() => articleBlockSchema.parse({ type: 'list', items: [] })).toThrow()
    expect(() => articleBlockSchema.parse({ type: 'image', src: '', alt: '图' })).toThrow()
    expect(() => articleBlocksSchema.parse([])).toThrow()
  })

  it('validates all 40 seeded news details end to end', () => {
    expect(newsDetails).toHaveLength(40)
    for (const detail of newsDetails) {
      const blocks = parseArticleBlocks(detail.blocks)
      expect(blocks.length).toBeGreaterThan(0)
    }
  })

  it('validates all 7 seeded case details (blocks + relatedProducts) end to end', () => {
    expect(caseDetails).toHaveLength(7)
    for (const detail of caseDetails) {
      const blocks = parseArticleBlocks(detail.blocks)
      expect(blocks.length).toBeGreaterThan(0)
      expect(parseCaseRelatedProducts(detail.relatedProducts).length).toBeGreaterThan(0)
    }
  })
})
