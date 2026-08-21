import { expect, it } from 'vitest'
import { loadHomeVisualSources } from './context'

export function registerHomeHeroProductVisualContracts() {
  it('keeps HOME hero, deliverables, and product-system contracts', () => {
    const {
      page,
      sectionHeader,
      baseCard,
      iconBox,
      cardGrid,
      productSystemSection,
      productSystemFlowFrame,
      productSystemCards,
      hero,
      logos,
      deliverables,
      productSystem,
      homeProductSystemFlow,
      homeProductSystemMobileFlow,
    } = loadHomeVisualSources()

    expect(page).toContain('class="home-hero-deliverables"')
    expect(page).toContain('class="home-hero-deliverables__video"')
    expect(page).toContain('class="home-hero-deliverables__mask"')
    expect(page).toContain('rgba(21, 21, 21, 0.4)')
    expect(page).toContain('rgba(21, 21, 21, 0.95) 0%')
    expect(page).toContain('var(--dt-color-bg) 100%')
    expect(page).toContain('      </div>\n      <HomeProductSystem />')
    expect(hero).toContain('padding-top: 128px')
    expect(hero).toContain('font-size: 60px')
    expect(hero).toContain('background: transparent')
    expect(hero).not.toContain('home-hero__wash')
    expect(hero).not.toContain('ClientOnly')
    expect(logos).toContain('padding-top: 5.5rem')
    expect(logos).toContain('gap: 4rem')
    expect(deliverables).toContain('padding: clamp(3.5rem, 7vw, 6rem) 0 8rem')
    expect(deliverables).toContain('flex: 0 0 40%')
    expect(deliverables).toContain('min-height: 280px')
    expect(deliverables).toContain('padding: 48px')
    expect(deliverables).toContain('padding-right: 112px')
    expect(deliverables).toContain('linear-gradient(to right, #181524, #271e35)')
    expect(deliverables).toContain('aria-roledescription="轮播"')
    expect(deliverables).toContain('showPreviousDeliverable')
    expect(deliverables).toContain('showNextDeliverable')
    expect(deliverables).toContain('data-active-slide')
    expect(deliverables).toContain('flex: 0 0 100%')
    expect(deliverables).toContain('transform: translate3d(-100%, 0, 0)')
    expect(deliverables).toContain('transform: translate3d(-200%, 0, 0)')
    expect(deliverables).not.toContain('animation:')
    expect(deliverables).not.toContain('deliverablesCarousel')
    expect(deliverables).not.toContain('deliverablesMarquee')
    expect(deliverables).toContain('font-size: 20px')
    expect(deliverables).toContain('font-size: 24px')
    expect(deliverables).toContain('font-size: 14px')
    expect(deliverables).toContain('display: none')
    expect(deliverables).not.toContain('What We Deliver')

    expect(productSystem).toContain('eyebrow="DeepTrols OPS"')
    expect(productSystem).toContain('title="连接真实业务与人工智能"')
    expect(productSystem).toContain('以数据与知识底座桥接企业业务与人工智能。赋能 AI Agent，实现对真实业务的支撑。')
    expect(productSystem).toContain('ProductSystemSection')
    expect(productSystem).toContain('HomeProductSystemFlow')
    expect(productSystem).toContain('HomeProductSystemMobileFlow')
    expect(productSystem).toContain('ProductSystemCards')
    expect(homeProductSystemFlow).toContain('ProductSystemFlowFrame')
    expect(homeProductSystemFlow).toContain('shouldRenderFlow')
    expect(homeProductSystemFlow).toContain('<EnterpriseFlow v-if="shouldRenderFlow" />')
    expect(productSystemSection).toContain('SectionShell')
    expect(productSystemSection).toContain('SectionHeader')
    expect(productSystemSection).toContain('nowrap-subtitle')
    expect(productSystemSection).toContain('subtitle-size="large"')
    expect(productSystemSection).toContain(":width=\"headingWide ? 'wide' : 'default'\"")
    expect(sectionHeader).toContain('section-heading--subtitle-large')
    expect(sectionHeader).toContain('font-size: 20px')
    expect(sectionHeader).toContain('white-space: nowrap')
    expect(productSystemSection).toContain('product-system__content')
    expect(productSystemSection).not.toContain('role="img"')
    expect(productSystemSection).not.toContain('product-system__mobile-flow')
    expect(productSystemSection).not.toContain('v-for="card in cards"')
    expect(productSystemSection).not.toContain('flowFallbackText')
    expect(productSystemSection).not.toContain('EnterpriseFlow')
    expect(productSystem).toContain('label="DeepTrols OPS platform architecture"')
    expect(productSystemFlowFrame).toContain('role="img"')
    expect(productSystemFlowFrame).toContain('height: 560px')
    expect(productSystemFlowFrame).toContain('rgba(148, 163, 184, 0.12) 1px')
    expect(productSystemFlowFrame).toContain('background-size: 48px 48px')
    expect(homeProductSystemMobileFlow).toContain('product-system__mobile-flow')
    expect(homeProductSystemMobileFlow).toContain('inputs')
    expect(homeProductSystemMobileFlow).toContain('outputs')
    expect(productSystemCards).toContain('CardGrid')
    expect(productSystemCards).toContain('BaseCard')
    expect(productSystemCards).toContain('IconBox')
    expect(productSystemCards).toContain('columns="four" gap="sm"')
    expect(productSystemCards).toContain('variant="product"')
    expect(productSystemCards).toContain('accent equal-height')
    expect(baseCard).toContain('dt-product-card')
    expect(baseCard).toContain('dt-card--adaptive')
    expect(baseCard).toContain('dt-product-card__accent')
    expect(iconBox).toContain('dt-icon-box')
    expect(cardGrid).toContain('md:grid-cols-2 lg:grid-cols-4')
    expect(productSystemCards).not.toContain('min-height')
    expect(productSystemCards).toContain('<h3>{{ card.name }}</h3>')
    expect(productSystemCards).not.toContain('{{ card.title }}')
  })
}
