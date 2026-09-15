import { describe, expect, it } from 'vitest'
import { newsItems } from '../data/news'
import { getNewsDetailById, newsDetails } from '../data/news-details'
import type { ArticleBlock } from '../types/article'

const BLOCK_TYPES = ['heading', 'paragraph', 'list', 'quote', 'image', 'divider']

function assertValidBlocks(blocks: ArticleBlock[]) {
  expect(blocks.length).toBeGreaterThanOrEqual(8)

  for (const block of blocks) {
    expect(BLOCK_TYPES).toContain(block.type)

    if (block.type === 'heading') {
      expect([2, 3, 4]).toContain(block.level)
      expect(block.text.length).toBeGreaterThan(0)
    }
    if (block.type === 'paragraph' || block.type === 'quote') {
      expect(block.text.length).toBeGreaterThan(0)
    }
    if (block.type === 'list') {
      expect(block.items.length).toBeGreaterThan(0)
    }
    if (block.type === 'image') {
      expect(block.src).toBe('/images/common/content-placeholder.svg')
      expect(block.alt.length).toBeGreaterThan(0)
    }
  }
}

describe('news detail content contract', () => {
  it('maps one detail entry to every listed news item', () => {
    expect(newsDetails).toHaveLength(40)
    expect(new Set(newsDetails.map((detail) => detail.id)).size).toBe(40)

    for (const item of newsItems) {
      const detail = getNewsDetailById(item.id)
      expect(detail).toBeDefined()
      assertValidBlocks(detail!.blocks)
    }
  })

  it('keeps the reference article (id 29) real content', () => {
    const detail = getNewsDetailById(29)
    expect(detail).toBeDefined()

    const blocks = detail!.blocks
    expect(blocks[0]).toEqual({ type: 'heading', level: 2, text: '算电协同进入新基建阶段' })

    const paragraphs = blocks.filter((block) => block.type === 'paragraph')
    expect(paragraphs.length).toBeGreaterThanOrEqual(10)
    expect(paragraphs[0]?.type === 'paragraph' && paragraphs[0].text.startsWith('4月17日')).toBe(true)

    const images = blocks.filter((block) => block.type === 'image')
    expect(images).toHaveLength(2)

    const texts = paragraphs
      .map((block) => (block.type === 'paragraph' ? block.text : ''))
      .join('')
    expect(texts).toContain('源网荷储综合能源管控平台')
    expect(texts).toContain('双碳')
  })

  it('returns undefined for unknown ids so the page can 404', () => {
    expect(getNewsDetailById(999999)).toBeUndefined()
  })
})
