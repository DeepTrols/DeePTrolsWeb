import { describe, expect, it } from 'vitest'
import { navIconComponents } from '../components/navigation/nav-icons'
import { aboutAddress, aboutContacts, aboutIntroParagraphs, aboutValues } from '../data/about'
import { whyEngineHeading, whyEngineLinksData, whyServiceItemsData, whyServiceResetHeading } from '../data/why-sections'
import { ABOUT_PAGE_SLUG, ABOUT_PAGE_TITLE, buildAboutPageSeed } from '../server/utils/about-page'
import { pageSectionsSchema } from '../server/utils/page-sections'

/**
 * 关于我们页接管 seed parity 测试（015.20b）：buildAboutPageSeed 必须与 data 纯字符串模块逐字段一致——
 * 接管发布后 CMS 渲染不得与代码回退产生内容漂移；代码 7 段是永久回退资产，两侧单源同一份 data。
 */
describe('buildAboutPageSeed', () => {
  const seed = buildAboutPageSeed()

  it('段顺序锁：Hero / 公司介绍 / 服务概览 / 重塑引擎 / 价值观 / 公司地址 / 联系方式', () => {
    expect(seed.length).toBe(7)
    const order = seed.map(section => (section.type === 'custom' ? `custom:${section.name}` : section.type))
    expect(order).toEqual([
      'custom:AboutHero',
      'custom:AboutIntroSection',
      'custom:WhyServiceReset',
      'custom:WhyEngine',
      'custom:AboutValuesSection',
      'custom:AboutAddressSection',
      'custom:AboutContactSection',
    ])
  })

  it('首段必须是可见定制 hero（AboutHero 自带 h1，CmsPageView 默认页头不再渲染）', () => {
    const first = seed[0]
    expect(first?.type).toBe('custom')
    if (first?.type !== 'custom') throw new Error('first section must be custom')
    expect(first.name).toBe('AboutHero')
    expect(first.visible).toBe(true)
  })

  it('整树过 pageSectionsSchema（per-name props 校验）', () => {
    expect(pageSectionsSchema.safeParse(seed).success).toBe(true)
  })

  it('custom 段 props 与 data 模块逐字段 deep-equal', () => {
    const propsOf = (index: number) => {
      const section = seed[index]
      if (section?.type !== 'custom') throw new Error(`section ${index} must be custom`)
      return section.props
    }
    expect(propsOf(1)).toEqual({ title: '公司介绍', paragraphs: aboutIntroParagraphs })
    expect(propsOf(2)).toEqual({ ...whyServiceResetHeading, items: whyServiceItemsData })
    expect(propsOf(3)).toEqual({ ...whyEngineHeading, links: whyEngineLinksData })
    expect(propsOf(4)).toEqual({
      title: '我们的核心价值观',
      subtitle: '这些原则指引着我们的一言一行，从产品创新到客户关系，贯穿始终。',
      items: aboutValues,
    })
    expect(propsOf(5)).toEqual({
      title: '公司地址',
      company: '武汉深度数智科技有限公司',
      address: aboutAddress,
    })
    expect(propsOf(6)).toEqual({ title: '联系我们', items: aboutContacts })
  })

  it('所有 icon 字符串名都在 nav-icons 注册表内（防图标静默消失）', () => {
    const iconNames = [
      ...whyServiceItemsData.map(item => item.icon),
      ...whyEngineLinksData.map(link => link.icon),
    ]
    expect(iconNames.length).toBeGreaterThan(0)
    for (const name of iconNames) {
      expect(Object.hasOwn(navIconComponents, name), `icon ${name} 未在 nav-icons 注册表内`).toBe(true)
    }
  })

  it('接管 slug/title 常量固定', () => {
    expect(ABOUT_PAGE_SLUG).toBe('/about_us')
    expect(ABOUT_PAGE_TITLE).toBe('关于我们')
  })
})
