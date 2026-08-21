import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerBoyaoVisualContracts() {
  it('renders the boyao hero card icon boxes through the shared IconBox soft tone', () => {
    const iconBox = readComponent('components/common/card/IconBox.vue')
    const featureCard = readComponent('components/common/card/FeatureCard.vue')
    const heroVisual = readComponent('components/product/boyao/BoyaoHeroVisual.vue')

    expect(iconBox).toContain("tone?: 'primary' | 'muted' | 'white' | 'gradient' | 'soft'")
    expect(iconBox).toContain('icon-box--tone-soft')
    expect(iconBox).toContain('color-mix(in oklab, var(--dt-color-bg-soft) 50%, transparent)')
    expect(featureCard).toContain("tone?: 'primary' | 'muted' | 'white' | 'gradient' | 'soft'")
    expect(heroVisual).toContain('IconBox')
    expect(heroVisual).toContain(':size="40" tone="soft"')
    expect(heroVisual).toContain(':size="56"')
    expect(heroVisual).toContain('class="col-span-2"')
    expect(heroVisual).toContain('capabilityStyles[index]?.iconBox')
    expect(heroVisual).not.toContain('flex h-10 w-10 items-center justify-center rounded-[16px]')
    expect(heroVisual).not.toContain('flex h-14 items-center justify-center rounded-[12px]')
    expect(heroVisual).toContain('hidden w-full lg:block')
    expect(heroVisual).toContain('pointer-events-none relative ml-auto h-[520px] w-full max-w-[680px]')
    expect(heroVisual).not.toContain('max-w-2xl')
  })

  it('renders the boyao core capability section through the shared AlternatingTimelineSection', () => {
    const capability = readComponent('components/product/boyao/BoyaoCapabilitySection.vue')
    const page = readComponent('pages/products/knowledge-base.vue')
    const boyaoData = readComponent('data/boyao.ts')

    expect(capability).toContain('AlternatingTimelineSection')
    expect(capability).toContain('boyaoTimelineItems')
    expect(capability).toContain('eyebrow="核心能力"')
    expect(capability).toContain('title="让企业知识真正理解业务"')
    expect(capability).toContain('title-id="boyao-capability-title"')
    expect(capability).not.toContain('ProductSystemSection')
    expect(boyaoData).toContain('export const boyaoTimelineItems: AlternatingTimelineItem[]')
    expect(boyaoData).not.toContain('boyaoCapabilitiesPlaceholder')
    expect(boyaoData).not.toContain('boyaoShowcases')
    expect(page).toContain('BoyaoCapabilitySection')
    expect(page).not.toContain('ServiceShowcaseSection')
    expect(page).not.toContain('boyaoShowcases')
  })

  it('renders the boyao xinchuang compatibility grid through the shared CompatibilityGridSection', () => {
    const compatibility = readComponent('components/common/CompatibilityGridSection.vue')
    const page = readComponent('pages/products/knowledge-base.vue')
    const boyaoData = readComponent('data/boyao.ts')

    expect(compatibility).toContain('SectionHeader')
    expect(compatibility).toContain('CardGrid')
    expect(compatibility).toContain('columns="three"')
    expect(compatibility).toContain('IconBox')
    expect(compatibility).toContain('export interface CompatibilityGridCategory')
    expect(compatibility).toContain('uppercase tracking-wider')
    expect(page).toContain('CompatibilityGridSection')
    expect(page).toContain('eyebrow="国产化适配"')
    expect(page).toContain('title="适配信创生态"')
    expect(page).toContain('boyaoCompatibilityCategories')
    expect(page.indexOf('<BoyaoIntegrationSection')).toBeLessThan(page.indexOf('<CompatibilityGridSection'))
    expect(boyaoData).toContain('export const boyaoCompatibilityCategories: CompatibilityGridCategory[]')
  })
}
