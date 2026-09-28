export function checkDgpProductContracts(ctx) {
  const { assert, sectionHeader, dgpData, dgpPage, dgpHero, dgpHeroVisual, dgpArchitecture, dgpEvolution, dgpEvolutionSourceVisual, dgpEvolutionQualityVisual, dgpEvolutionAssetVisual, dgpUseCases } = ctx
assert(
  dgpPage.includes('SiteHeader') &&
    dgpPage.includes('SiteFooter') &&
    dgpPage.includes('DgpHero') &&
    dgpPage.includes('ProductFeatureGridSection') &&
    dgpPage.includes('DgpArchitecture') &&
    dgpPage.includes('DgpEvolutionSection') &&
    dgpPage.includes('DgpUseCasesSection') &&
    dgpPage.includes('CtaSection') &&
    dgpPage.includes('title-id="dgp-cta-title"') &&
    dgpPage.includes('nowrap-subtitle'),
  'DGP page must compose the required product sections with global Header, Footer, and CtaSection.',
)
assert(
  dgpHero.includes('PageHero') &&
    dgpHero.includes('background-image-src="/images/products/product-hero-bg.webp"') &&
    dgpHero.includes('import { Database }') &&
    dgpHero.includes('badge="数曜·数据治理平台"') &&
    dgpHero.includes('title-line="可用、可管、可信"') &&
    dgpHero.includes('title-gradient="企业数据底座"') &&
    dgpHero.includes('visual-label="SHUYAODGP_HORE_WEBM"') &&
    dgpHero.includes('visual-size="large"') &&
    dgpHero.includes('class="min-h-[655px]"') &&
    dgpHero.includes('DgpHeroVisual'),
  'DGP hero must follow the PageHero contract from DGP.md.',
)
assert(
  dgpHeroVisual.includes('数曜·数据治理平台') &&
    dgpHeroVisual.includes('Intelligent') &&
    dgpHeroVisual.includes('HeroVisualShell') &&
    dgpHeroVisual.includes('Governed Data') &&
    dgpHeroVisual.includes('Client') &&
    dgpHeroVisual.includes('dgpGovernanceScenes') &&
    dgpHeroVisual.includes('bg-dt-bg-soft/35') &&
    dgpHeroVisual.includes('sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]') &&
    dgpHeroVisual.includes('motion-safe:animate-pulse') &&
    !dgpHeroVisual.includes('<style') &&
    !dgpHeroVisual.includes('esenruizhi.com'),
  'DGP hero visual must reproduce the EMQX edge console card as a Tailwind-only component.',
)
assert(
  dgpArchitecture.includes('ProductArchitectureSection') &&
    dgpArchitecture.includes('产品架构图占位符') &&
    dgpArchitecture.includes('w-full overflow-hidden @container') &&
    dgpArchitecture.includes('scale-[min(1,calc(100cqw/1704px))]') &&
    !dgpArchitecture.includes(':heading-wide="false"') &&
    !dgpArchitecture.includes(':nowrap-subtitle="false"') &&
    dgpArchitecture.includes('SystemCards') &&
    !dgpArchitecture.includes('EnterpriseFlow'),
  'DGP architecture must reuse ProductArchitectureSection, flow background placeholder, and SystemCards without a flow chart.',
)
assert(
  dgpEvolution.includes('企业数据治理体系的演进') &&
    dgpEvolution.includes('class="container"') &&
    dgpEvolution.includes('SectionHeader') &&
    !dgpEvolution.includes('eyebrow-size="sm"') &&
    !dgpEvolution.includes('eyebrow-tone="primary"') &&
    dgpEvolution.includes('nowrap-subtitle') &&
    sectionHeader.includes('section-heading--eyebrow-sm') &&
    sectionHeader.includes('section-heading--eyebrow-primary') &&
    sectionHeader.includes('section-heading--nowrap-subtitle') &&
    dgpEvolution.includes('class="py-4 lg:py-8"') &&
    !dgpEvolution.includes('class="dt-card p-6 backdrop-blur-xl"') &&
    dgpEvolution.includes('rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[13px] font-semibold text-primary/80') &&
    dgpEvolution.includes('lg:grid-cols-2 lg:gap-12') &&
    dgpEvolution.includes('DgpEvolutionVisual') &&
    dgpEvolution.includes('核心能力动画') &&
    !dgpEvolution.includes('图片占位符') &&
    !dgpEvolution.includes('border border-dt-line bg-dt-bg-soft/40') &&
    !dgpEvolution.includes('SectionHeading') &&
    !dgpEvolution.includes('<style'),
  'DGP evolution section must keep the required alternating Tailwind layout and mount its three capability visuals.',
)
for (const visual of [dgpEvolutionSourceVisual, dgpEvolutionQualityVisual, dgpEvolutionAssetVisual]) {
  assert(
    visual.includes('useRuntimeTimeline') &&
      visual.includes('border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)]') &&
      visual.includes('flex items-center border-b border-muted px-4 py-3') &&
      visual.includes('size-3 rounded-full bg-red-500/70') &&
      visual.includes('size-3 rounded-full bg-yellow-500/70') &&
      visual.includes('size-3 rounded-full bg-green-500/70') &&
      visual.includes('flex flex-1 flex-col p-4 lg:p-5') &&
      !visual.includes('<style') &&
      !visual.includes('style='),
    'DGP evolution capability visuals must carry the shared runtime timeline and the macOS window traffic-light bar.',
  )
}
assert(
  dgpUseCases.includes('SectionShell') &&
    dgpUseCases.includes('SectionHeader') &&
    dgpUseCases.includes('eyebrow="应用场景"') &&
    dgpUseCases.includes('title="数据治理赋能关键业务场景"') &&
    dgpUseCases.includes('CardGrid columns="two"') &&
    dgpUseCases.includes('BaseCard') &&
    dgpUseCases.includes('IconBox') &&
    dgpUseCases.includes('CardText') &&
    dgpUseCases.includes('equal-height') &&
    !dgpUseCases.includes('BaseTabs') &&
    !dgpUseCases.includes('role="tabpanel"') &&
    !dgpUseCases.includes('min-h-[') &&
    !dgpUseCases.includes('<style'),
  'DGP use cases must use the shared 2x2 BaseCard scene grid.',
)
const dgpSources = [dgpData, dgpPage, dgpHero, dgpArchitecture, dgpEvolution, dgpUseCases].join('\n')
for (const text of [
  '为什么选择数曜·治理数据平台',
  '让治理好的数据，安全、高效、稳定地供给业务',
  '数据接入 → 智能治理 → 数据赋能',
  '专为企业数据治理打造',
  '企业数据治理体系的演进',
  '数据治理赋能关键业务场景',
]) {
  assert(dgpSources.includes(text), `DGP requirement text is missing: ${text}`)
}
for (const text of [
  '让数据快速可用',
  '统一数据服务出口',
  '保障调用安全可控',
  '支撑高并发稳定服务',
  '数据集成',
  '数据资产',
  '政务数据治理',
  '制造数据治理',
  '企业经营数据治理',
  'AI 数据基础设施',
]) {
  assert(dgpData.includes(text), `DGP configured content is missing: ${text}`)
}
for (const text of [
  '客户数据域',
  '订单数据域',
  '产品数据域',
  '12 张数据表',
  '8 张数据表',
  '16 张数据表',
  'CUSTOMER_PROFILE',
  'ORDER_STANDARD',
  'PRODUCT_QUALITY',
  '客户主数据治理',
  '订单字段标准化',
  '产品数据质量检测',
  '$ govern --domain customer_profile',
  '$ govern --domain order_standard',
  '$ govern --domain product_quality',
  '> Scanning 12 data tables',
  '> Quality score: 97.6%',
  '> Quality score: 98.2%',
  '> Quality score: 96.8%',
]) {
  assert(dgpData.includes(text), `DGP governance scene content is missing: ${text}`)
}
}
