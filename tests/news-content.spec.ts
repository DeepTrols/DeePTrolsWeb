import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  formatNewsDate,
  formatNewsDateShort,
  getNewsByCategory,
  newsCategoryTabs,
  newsItems,
} from '../data/news'

const root = process.cwd()
const CATEGORY_KEYS = ['company', 'media', 'insight']

describe('news list page content contract', () => {
  it('provides 40 real news entries with valid categories and placeholder covers', () => {
    expect(newsItems).toHaveLength(40)
    expect(new Set(newsItems.map((item) => item.id)).size).toBe(40)

    for (const item of newsItems) {
      expect(Number.isInteger(item.id)).toBe(true)
      expect(item.title.length).toBeGreaterThan(0)
      expect(item.summary.length).toBeGreaterThan(0)
      expect(CATEGORY_KEYS).toContain(item.category)
      expect(item.coverImage).toBe('/images/common/content-placeholder.svg')
      expect(item.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('keeps the three category tabs from the reference site', () => {
    expect(newsCategoryTabs).toEqual([
      { key: 'company', label: '公司动态' },
      { key: 'media', label: '新闻报道' },
      { key: 'insight', label: '技术洞见' },
    ])
  })

  it('returns category lists in descending date order covering all items', () => {
    let total = 0

    for (const tab of newsCategoryTabs) {
      const list = getNewsByCategory(tab.key)
      expect(list.length).toBeGreaterThan(0)
      total += list.length

      const dates = list.map((item) => item.publishedAt)
      expect([...dates].sort().reverse()).toEqual(dates)
    }

    expect(total).toBe(40)
  })

  it('formats display dates like the reference site', () => {
    expect(formatNewsDate('2026-04-21')).toBe('2026/04/21')
    expect(formatNewsDateShort('2026-04-21')).toBe('2026-4-21')
    expect(formatNewsDateShort('2025-12-08')).toBe('2025-12-8')
  })

  it('keeps the hero background in public runtime assets', () => {
    expect(existsSync(join(root, 'public/images/news/news-hero-bg.svg'))).toBe(true)
  })
})
