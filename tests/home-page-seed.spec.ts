import { describe, expect, it } from 'vitest'
import { navIconComponents } from '../components/navigation/nav-icons'
import {
  homeAboutContent,
  homeCtaContent,
  homeCtaMetrics,
  homeEcosystemCards,
  homeEcosystemHeading,
  homeHeroContent,
  homeInsightsHeading,
  homeProductCards,
  homeProductSystemHeading,
  homeSolutionItems,
  homeSolutionsHeading,
} from '../data/home-sections'
import { whyTrustTabsData, whyTrustTabsHeading } from '../data/why-trust'
import { buildHomePageSeed, HOME_PAGE_SLUG, HOME_PAGE_TITLE } from '../server/utils/home-page'
import { pageSectionsSchema } from '../server/utils/page-sections'

/**
 * 首页接管 seed parity 测试（015.18c）：buildHomePageSeed 必须与 data 纯字符串模块逐字段一致——
 * 接管发布后 CMS 渲染不得与代码回退产生内容漂移；代码 8 段是永久回退资产，两侧单源同一份 data。
 */
describe('buildHomePageSeed', () => {
  const seed = buildHomePageSeed()

  it('段顺序锁：Hero / 智能底座 / 解决方案 / ecosystem / trust / 关于我们 / Resources / CTA', () => {
    expect(seed.length).toBe(8)
    const order = seed.map(section => (section.type === 'custom' ? `custom:${section.name}` : section.type))
    expect(order).toEqual([
      'hero',
      'custom:HomeProductSystem',
      'custom:HomeSolutions',
      'custom:HomeEcosystem',
      'custom:WhyTrustTabs',
      'custom:HomeAbout',
      'custom:HomeInsights',
      'cta',
    ])
  })

  it('首段必须是可见 hero（CmsPageView 无可见 hero 会渲染默认页头 → 双 h1）', () => {
    const first = seed[0]
    expect(first?.type).toBe('hero')
    expect(first?.visible).toBe(true)
  })

  it('整树过 pageSectionsSchema（含 per-variant 必填组与 per-name props 校验）', () => {
    const parsed = pageSectionsSchema.safeParse(seed)
    expect(parsed.success).toBe(true)
  })

  it('hero 与 homeHeroContent 逐字段一致（fullscreen-image 版式）', () => {
    const hero = seed[0]
    if (hero?.type !== 'hero') throw new Error('first section must be hero')
    expect(hero.variant).toBe('fullscreen-image')
    expect(hero.title).toBe(homeHeroContent.title)
    expect(hero.titleLines).toEqual(homeHeroContent.titleLines)
    expect(hero.subtitle).toBe(homeHeroContent.subtitle)
    expect(hero.ctaLabel).toBe(homeHeroContent.ctaLabel)
    expect(hero.ctaHref).toBe(homeHeroContent.ctaHref)
    expect(hero.backgroundImage).toBe(homeHeroContent.backgroundImage)
  })

  it('custom 段 props 与 data 模块逐字段 deep-equal', () => {
    const propsOf = (index: number) => {
      const section = seed[index]
      if (section?.type !== 'custom') throw new Error(`section ${index} must be custom`)
      return section.props
    }
    expect(propsOf(1)).toEqual({ ...homeProductSystemHeading, cards: homeProductCards })
    expect(propsOf(2)).toEqual({ ...homeSolutionsHeading, items: homeSolutionItems })
    expect(propsOf(3)).toEqual({ ...homeEcosystemHeading, cards: homeEcosystemCards })
    expect(propsOf(4)).toEqual({ ...whyTrustTabsHeading, tabs: whyTrustTabsData })
    expect(propsOf(5)).toEqual(homeAboutContent)
    expect(propsOf(6)).toEqual(homeInsightsHeading)
  })

  it('cta 段与 homeCtaContent/homeCtaMetrics 逐字段一致', () => {
    const cta = seed[7]
    if (cta?.type !== 'cta') throw new Error('last section must be cta')
    expect(cta.title).toBe(homeCtaContent.title)
    expect(cta.ctaLabel).toBe(homeCtaContent.ctaLabel)
    expect(cta.ctaHref).toBe(homeCtaContent.ctaHref)
    expect(cta.metrics).toEqual(homeCtaMetrics)
  })

  it('所有 icon 字符串名都在 nav-icons 注册表内（防图标静默消失）', () => {
    const iconNames = [
      ...homeProductCards.map(card => card.icon),
      ...homeEcosystemCards.map(card => card.icon),
      ...whyTrustTabsData.flatMap(tab => tab.features.map(feature => feature.icon)),
    ]
    expect(iconNames.length).toBeGreaterThan(0)
    for (const name of iconNames) {
      // Object.hasOwn：`in` 会命中原型链键（toString 等）造成白名单绕过
      expect(Object.hasOwn(navIconComponents, name), `icon ${name} 未在 nav-icons 注册表内`).toBe(true)
    }
  })

  it('接管 slug/title 常量固定', () => {
    expect(HOME_PAGE_SLUG).toBe('/')
    expect(HOME_PAGE_TITLE).toBe('首页')
  })
})
