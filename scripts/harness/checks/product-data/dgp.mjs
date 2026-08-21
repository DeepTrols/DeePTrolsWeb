export function checkDgpProductContracts(ctx) {
  const { assert, sectionHeader, baseTabs, dgpData, dgpPage, dgpHero, dgpHeroVisual, dgpArchitecture, dgpEvolution, dgpUseCases } = ctx
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
    dgpHero.includes('import { Database }') &&
    dgpHero.includes('badge="数曜·数据治理平台"') &&
    dgpHero.includes('title-line="可用、可管、可信"') &&
    dgpHero.includes('title-gradient="企业数据底座"') &&
    dgpHero.includes('visual-label="SHUYAODGP_HORE_WEBM"') &&
    dgpHero.includes('visual-size="large"') &&
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
    !dgpArchitecture.includes(':heading-wide="false"') &&
    !dgpArchitecture.includes(':nowrap-subtitle="false"') &&
    dgpArchitecture.includes('SystemCards') &&
    !dgpArchitecture.includes('EnterpriseFlow'),
  'DGP architecture must reuse ProductArchitectureSection, flow background placeholder, and SystemCards without a flow chart.',
)
assert(
  dgpEvolution.includes('企业数据治理体系的演进') &&
    dgpEvolution.includes('class="container pb-32 lg:pb-44"') &&
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
    dgpEvolution.includes('图片占位符') &&
    !dgpEvolution.includes('border border-dt-line bg-dt-bg-soft/40') &&
    !dgpEvolution.includes('SectionHeading') &&
    !dgpEvolution.includes('<style'),
  'DGP evolution section must keep the required alternating Tailwind layout.',
)
assert(
  dgpUseCases.includes('class="pb-32 lg:pb-44"') &&
    dgpUseCases.includes('text-center text-4xl font-bold leading-[1.2] tracking-tight text-highlighted') &&
    dgpUseCases.includes('text-center text-base text-default') &&
    dgpUseCases.includes('lg:whitespace-nowrap') &&
    dgpUseCases.includes('BaseTabs') &&
    dgpUseCases.includes('useCaseTabs') &&
    dgpUseCases.includes('variant="underline"') &&
    baseTabs.includes('role="tablist"') &&
    baseTabs.includes('data-slot="root"') &&
    baseTabs.includes('data-slot="list"') &&
    baseTabs.includes('data-slot="trigger"') &&
    baseTabs.includes('data-slot="indicator"') &&
    baseTabs.includes('data-slot="label"') &&
    baseTabs.includes('px-5 py-4 text-base font-medium') &&
    baseTabs.includes('border-b border-dt-line') &&
    dgpUseCases.includes('role="tabpanel"') &&
    dgpUseCases.includes('BaseButton') &&
    dgpUseCases.includes('了解更多') &&
    !dgpUseCases.includes('class="dt-tab"') &&
    !dgpUseCases.includes('SectionHeading') &&
    !dgpUseCases.includes('!pb-0') &&
    !dgpUseCases.includes('<style'),
  'DGP use cases must keep the EMQX product tabs and shared button implementation.',
)
const dgpSources = [dgpData, dgpPage, dgpHero, dgpArchitecture, dgpEvolution, dgpUseCases].join('\n')
for (const text of [
  '为什么选择数曜·治理数据平台',
  '让治理好的数据，安全、高效、稳定地供给业务',
  '数据接入 → 智能治理 → 数据赋能',
  '专为企业数据治理打造',
  '企业数据治理体系的演进',
  '推动企业数据基础设施建设',
  '开启企业数据治理新征程',
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
  '物联数据汇聚与治理',
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
