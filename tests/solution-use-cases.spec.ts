import { describe, expect, it } from 'vitest'
import { footerColumns } from '../data/footer'
import { primaryNavigation } from '../data/navigation'
import {
  getSolutionUseCaseBySlug,
  solutionUseCasePages,
  solutionUseCaseRouteHrefs,
  solutionUseCaseSlugs,
} from '../data/solutions/use-cases'

const expectedUseCases = [
  { label: '智能制造', href: '/solutions/manufacturing', slug: 'manufacturing' },
  { label: '智慧环保', href: '/solutions/environment', slug: 'environment' },
  { label: '智慧水利', href: '/solutions/water', slug: 'water' },
  { label: '智慧能源', href: '/solutions/energy', slug: 'energy' },
  { label: '数据治理', href: '/solutions/data-governance', slug: 'data-governance' },
  { label: '企业AI应用', href: '/solutions/enterprise-ai', slug: 'enterprise-ai' },
  { label: '智慧城市', href: '/solutions/city', slug: 'city' },
  { label: '智慧医疗', href: '/solutions/healthcare', slug: 'healthcare' },
] as const

describe('solution use case pages content contract', () => {
  it('creates every use case page from the solution navigation', () => {
    expect(solutionUseCaseSlugs).toEqual(expectedUseCases.map((item) => item.slug))
    expect(solutionUseCaseRouteHrefs).toEqual(expectedUseCases.map((item) => item.href))
    expect(solutionUseCasePages).toHaveLength(expectedUseCases.length)
    expect(solutionUseCasePages.map((page) => page.href)).toEqual(expectedUseCases.map((item) => item.href))
    expect(solutionUseCasePages.map((page) => page.label)).toEqual(expectedUseCases.map((item) => item.label))

    for (const item of expectedUseCases) {
      expect(getSolutionUseCaseBySlug(item.slug)?.href).toBe(item.href)
    }
  })

  it('keeps solution navigation links aligned with generated routes', () => {
    const solutionColumns = primaryNavigation.find((item) => item.label === '解决方案')?.columns ?? []
    const useCaseLinks = solutionColumns.find((column) => column.title === '应用场景')?.links ?? []

    expect(useCaseLinks.map((link) => ({ label: link.label, href: link.href }))).toEqual(
      expectedUseCases.map((item) => ({ label: item.label, href: item.href })),
    )
  })

  it('keeps footer use case links pointing to generated pages', () => {
    const useCaseFooterLinks = footerColumns.find((column) => column.title === '使用场景')?.groups.flat() ?? []
    const footerHrefs = useCaseFooterLinks.map((link) => link.href)

    for (const item of expectedUseCases) {
      expect(footerHrefs).toContain(item.href)
    }
  })

  it('uses the reusable solution template content structure for every page', () => {
    for (const page of solutionUseCasePages) {
      expect(page.content.seo.title).toBe(`${page.label}解决方案 - DeepTrols`)
      expect(page.content.hero.badge).toBe('应用场景')
      expect(page.content.hero.titleLine).toBe(`${page.label}解决方案`)
      expect(page.content.hero.actions?.map((action) => action.label)).toEqual(['咨询合作', '申请试用'])
      expect(page.content.heroStats).toHaveLength(3)
      expect(page.content.value?.items).toHaveLength(4)
      expect(page.content.approach?.items).toHaveLength(3)
      expect(page.content.architecture?.cards).toHaveLength(3)
      expect(page.content.capabilities?.items).toHaveLength(6)
      expect(page.content.showcase?.items).toHaveLength(3)
      expect(page.content.related?.links).toHaveLength(3)
      expect(page.content.cta?.actions.map((action) => action.label)).toEqual(['咨询合作', '申请试用'])
      expect(page.visual.layers).toHaveLength(3)
      expect(page.visual.signals).toHaveLength(3)
    }
  })
})
