import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerSolutionTemplateVisualContracts() {
  it('composes solution pages from existing shared sections and style contracts', () => {
    const template = readComponent('components/solution/SolutionPageTemplate.vue')
    const types = readComponent('types/solution-template.ts')
    const docs = readComponent('doc/engineering/SOLUTION_PAGE_TEMPLATE.md')
    const commonDocs = readComponent('doc/engineering/COMMON_SECTION_COMPONENTS.md')

    for (const component of [
      'SiteHeader',
      'SiteFooter',
      'PageHero',
      'HeroStatsStrip',
      'ProductFeatureGridSection',
      'AlternatingTimelineSection',
      'ProductArchitectureSection',
      'SystemCards',
      'ServiceShowcaseSection',
      'EngineLinksSection',
      'CtaSection',
    ]) {
      expect(template).toContain(component)
    }

    expect(template.indexOf('<SiteHeader')).toBeLessThan(template.indexOf('<PageHero'))
    expect(template.indexOf('<PageHero')).toBeLessThan(template.indexOf('<ProductFeatureGridSection'))
    expect(template.indexOf('<ProductFeatureGridSection')).toBeLessThan(template.indexOf('<AlternatingTimelineSection'))
    expect(template.indexOf('<AlternatingTimelineSection')).toBeLessThan(template.indexOf('<ProductArchitectureSection'))
    expect(template.indexOf('<ProductArchitectureSection')).toBeLessThan(template.lastIndexOf('<ProductFeatureGridSection'))
    expect(template.lastIndexOf('<ProductFeatureGridSection')).toBeLessThan(template.indexOf('<ServiceShowcaseSection'))
    expect(template.indexOf('<ServiceShowcaseSection')).toBeLessThan(template.indexOf('<EngineLinksSection'))
    expect(template.indexOf('<EngineLinksSection')).toBeLessThan(template.indexOf('<CtaSection'))
    expect(template.indexOf('<CtaSection')).toBeLessThan(template.indexOf('<SiteFooter'))

    for (const slot of [
      'hero-visual',
      'hero-after-actions',
      'after-hero',
      'after-value',
      'after-approach',
      'architecture-visual',
      'architecture-after',
      'after-architecture',
      'after-capabilities',
      'after-showcase',
      'before-cta',
    ]) {
      expect(template).toContain(`name="${slot}"`)
    }

    expect(template).toContain(':align="content.hero.align ?? \'left\'"')
    expect(template).toContain(':visual-size="content.hero.visualSize ?? \'default\'"')
    expect(template).toContain(':flush-bottom="heroFlushBottom"')
    expect(template).toContain(':columns="content.heroStatsColumns ?? 3"')
    expect(template).toContain(':icon-box-size="content.value.iconBoxSize ?? 40"')
    expect(template).toContain(':icon-bordered="content.capabilities.iconBordered ?? true"')
    expect(template).toContain(':frame-offset="content.architecture.frameOffset ?? true"')
    expect(template).not.toContain('<style')
    expect(template).not.toContain('style=')
    expect(template).not.toContain('@apply')
    expect(template).not.toContain('doc/product/PAGE_REQUIREMENTS')

    for (const contract of [
      'export interface SolutionPageTemplateContent',
      'export interface SolutionTemplateHero',
      "align?: 'left' | 'center'",
      "visualSize?: 'default' | 'large' | 'fluid'",
      'heroStatsColumns?: 3 | 4',
      'iconBoxSize?: 40 | 48 | 56',
      'contentFlush?: boolean',
      'frameOffset?: boolean',
    ]) {
      expect(types).toContain(contract)
    }

    expect(docs).toContain('Default Structure')
    expect(docs).toContain('Data Contract')
    expect(docs).toContain('Existing Component Mapping')
    expect(docs).toContain('不得新增 inline style')
    expect(commonDocs).toContain('Solution Page Template')
    expect(commonDocs).toContain('components/solution/SolutionPageTemplate.vue')
  })
}
