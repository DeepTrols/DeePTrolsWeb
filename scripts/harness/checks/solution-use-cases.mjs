const useCaseRoutes = [
  '/solutions/manufacturing',
  '/solutions/environment',
  '/solutions/water',
  '/solutions/energy',
  '/solutions/data-governance',
  '/solutions/enterprise-ai',
  '/solutions/city',
  '/solutions/healthcare',
]

export function checkSolutionUseCaseContracts(ctx) {
  const {
    assert,
    navigationData,
    footerData,
    solutionUseCaseData,
    solutionUseCasePage,
    solutionScenarioVisual,
    solutionUseCasesDoc,
  } = ctx

  assert(
    solutionUseCasePage.includes('SolutionPageTemplate') &&
      solutionUseCasePage.includes('SolutionScenarioVisual') &&
      solutionUseCasePage.includes('getSolutionUseCaseBySlug') &&
      solutionUseCasePage.includes('createError') &&
      solutionUseCasePage.includes('<template #hero-visual>') &&
      !solutionUseCasePage.includes('SiteHeader') &&
      !solutionUseCasePage.includes('SiteFooter') &&
      !solutionUseCasePage.includes('<style') &&
      !solutionUseCasePage.includes('style='),
    'Solution use case route must render through SolutionPageTemplate with the shared hero visual slot and no duplicated shell/styles.',
  )

  assert(
    solutionScenarioVisual.includes('HeroVisualShell') &&
      solutionScenarioVisual.includes('IconBox') &&
      solutionScenarioVisual.includes('panel-class="overflow-hidden rounded-2xl border border-default bg-dt-bg-soft/70') &&
      solutionScenarioVisual.includes('v-for="(layer, index) in visual.layers"') &&
      solutionScenarioVisual.includes('v-for="signal in visual.signals"') &&
      !solutionScenarioVisual.includes('<style') &&
      !solutionScenarioVisual.includes('style=') &&
      !solutionScenarioVisual.includes('@apply'),
    'Solution scenario visual must reuse HeroVisualShell and IconBox without private styles.',
  )

  assert(
      solutionUseCaseData.includes('solutionUseCaseSlugs') &&
      solutionUseCaseData.includes('solutionUseCasePages') &&
      solutionUseCaseData.includes('solutionUseCaseRouteHrefs') &&
      solutionUseCaseData.includes('getSolutionUseCaseBySlug') &&
      solutionUseCaseData.includes("badge: '应用场景'") &&
      solutionUseCaseData.includes('value: {') &&
      solutionUseCaseData.includes('approach: {') &&
      solutionUseCaseData.includes('architecture: {') &&
      solutionUseCaseData.includes('capabilities: {') &&
      solutionUseCaseData.includes('showcase: {') &&
      solutionUseCaseData.includes('related: {') &&
      solutionUseCaseData.includes('cta: {') &&
      !solutionUseCaseData.includes('doc/product/PAGE_REQUIREMENTS'),
    'Solution use case data must define reusable template content without doc/product runtime assets.',
  )

  assert(
    solutionUseCasesDoc.includes('解决方案：应用场景页面') &&
      solutionUseCasesDoc.includes('pages/solutions/[slug].vue') &&
      solutionUseCasesDoc.includes('data/solutions/use-cases.ts') &&
      solutionUseCasesDoc.includes('SolutionPageTemplate') &&
      solutionUseCasesDoc.includes('SolutionScenarioVisual') &&
      solutionUseCasesDoc.includes('咨询合作 / 申请试用'),
    'Solution use case requirement document must record generated routes, template usage, data source, and CTA baseline.',
  )

  for (const route of useCaseRoutes) {
    assert(solutionUseCaseData.includes(route), `Solution use case data missing route ${route}.`)
    assert(solutionUseCasesDoc.includes(route), `Solution use case requirement document missing route ${route}.`)
    assert(navigationData.includes(route), `Solution navigation missing route ${route}.`)
    assert(footerData.includes(route), `Footer use case links missing route ${route}.`)
  }
}
