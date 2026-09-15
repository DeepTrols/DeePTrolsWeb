import { describe, expect, it } from 'vitest'
import { caseResources } from '../data/cases'
import { caseDetails, getCaseDetailBySlug } from '../data/case-details'
import { reportFilterTabs } from '../data/reports'

describe('case detail content contract', () => {
  it('provides one detail for every listed case resource', () => {
    expect(caseDetails).toHaveLength(7)

    const detailHrefs = caseDetails.map((detail) => `/cases/${detail.slug}`)
    const resourceHrefs = caseResources.map((item) => item.href)

    expect([...detailHrefs].sort()).toEqual([...resourceHrefs].sort())
  })

  it('assigns every detail to a valid solution filter category', () => {
    for (const detail of caseDetails) {
      expect(reportFilterTabs.some((tab) => tab.key === detail.categoryKey)).toBe(true)
    }
  })

  it('keeps detail content shaped for the shared article template', () => {
    for (const detail of caseDetails) {
      expect(detail.title.length).toBeGreaterThan(0)
      expect(detail.heroImage.startsWith('/images/')).toBe(true)
      expect(detail.blocks.length).toBeGreaterThanOrEqual(8)
      expect(detail.blocks[0]).toMatchObject({ type: 'heading', level: 2 })
      expect(detail.relatedProducts.length).toBeGreaterThanOrEqual(2)

      for (const product of detail.relatedProducts) {
        expect(product.name.length).toBeGreaterThan(0)
        expect(product.desc.length).toBeGreaterThan(0)
        expect(product.href.startsWith('/products/')).toBe(true)
      }
    }
  })

  it('resolves details by slug and returns undefined for unknown slugs', () => {
    expect(getCaseDetailBySlug('automotive-parts-device-agent')?.title).toBe(
      '汽车零部件龙头企业设备智能体实践',
    )
    expect(getCaseDetailBySlug('unknown-case')).toBeUndefined()
  })
})
