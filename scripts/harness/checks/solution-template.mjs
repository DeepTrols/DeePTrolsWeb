export function checkSolutionTemplateContracts(ctx) {
  const { assert, solutionTemplateDoc, solutionTemplateTypes, solutionPageTemplate, commonComponentsDoc } = ctx

  assert(
    solutionTemplateDoc.includes('SolutionPageTemplateContent') &&
      solutionTemplateDoc.includes('components/solution/SolutionPageTemplate.vue') &&
      solutionTemplateDoc.includes('types/solution-template.ts') &&
      solutionTemplateDoc.includes('Data Contract') &&
      solutionTemplateDoc.includes('不得新增 inline style'),
    'Solution page template documentation must define component path, type path, data contract, and style limits.',
  )

  assert(
    commonComponentsDoc.includes('Solution Page Template') &&
      commonComponentsDoc.includes('components/solution/SolutionPageTemplate.vue') &&
      commonComponentsDoc.includes('doc/engineering/SOLUTION_PAGE_TEMPLATE.md') &&
      commonComponentsDoc.includes('types/solution-template.ts'),
    'Common section documentation must register the reusable solution page template.',
  )

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
    assert(solutionTemplateTypes.includes(contract), `Solution template types missing contract: ${contract}`)
  }

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
    assert(solutionPageTemplate.includes(component), `SolutionPageTemplate must compose ${component}.`)
  }

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
    assert(solutionPageTemplate.includes(`name="${slot}"`), `SolutionPageTemplate must expose ${slot} slot.`)
  }

  assert(
    solutionPageTemplate.indexOf('<SiteHeader') < solutionPageTemplate.indexOf('<PageHero') &&
      solutionPageTemplate.indexOf('<PageHero') < solutionPageTemplate.indexOf('<ProductFeatureGridSection') &&
      solutionPageTemplate.indexOf('<ProductFeatureGridSection') < solutionPageTemplate.indexOf('<AlternatingTimelineSection') &&
      solutionPageTemplate.indexOf('<AlternatingTimelineSection') < solutionPageTemplate.indexOf('<ProductArchitectureSection') &&
      solutionPageTemplate.indexOf('<ProductArchitectureSection') < solutionPageTemplate.lastIndexOf('<ProductFeatureGridSection') &&
      solutionPageTemplate.lastIndexOf('<ProductFeatureGridSection') < solutionPageTemplate.indexOf('<ServiceShowcaseSection') &&
      solutionPageTemplate.indexOf('<ServiceShowcaseSection') < solutionPageTemplate.indexOf('<EngineLinksSection') &&
      solutionPageTemplate.indexOf('<EngineLinksSection') < solutionPageTemplate.indexOf('<CtaSection') &&
      solutionPageTemplate.indexOf('<CtaSection') < solutionPageTemplate.indexOf('<SiteFooter'),
    'SolutionPageTemplate must keep the default solution page section order.',
  )

  assert(
    !solutionPageTemplate.includes('<style') &&
      !solutionPageTemplate.includes('style=') &&
      !solutionPageTemplate.includes('@apply') &&
      !solutionPageTemplate.includes('doc/product/PAGE_REQUIREMENTS'),
    'SolutionPageTemplate must avoid private styles, inline styles, @apply, and doc/product runtime assets.',
  )
}
