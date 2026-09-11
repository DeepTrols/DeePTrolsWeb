export function checkSolutionsManufacturingContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    manufacturingPage,
    manufacturingHeroComponent,
    manufacturingCapabilityCards,
    manufacturingCases,
    manufacturingData,
  } = ctx

  assert(
    manufacturingPage.includes('SiteHeader') &&
      manufacturingPage.includes('SiteFooter') &&
      manufacturingPage.includes('ManufacturingHero') &&
      manufacturingPage.includes('eyebrow="行业痛点"') &&
      manufacturingPage.includes('columns="two"') &&
      !manufacturingPage.includes(':icon-box-size="56"') &&
      !manufacturingPage.includes(':icon-size="48"') &&
      manufacturingPage.includes('<ProductSystemFlowFrame label="制造智能闭环能力图" class="mb-10" />') &&
      manufacturingPage.includes('ManufacturingCapabilityCardsSection') &&
      manufacturingPage.includes('title="为什么选择深度数智"') &&
      manufacturingPage.includes('columns="three"') &&
      manufacturingPage.includes('ManufacturingCustomerCasesSection') &&
      manufacturingPage.includes('CtaSection') &&
      manufacturingPage.includes('class="pt-32"') &&
      manufacturingPage.includes('spacing="compact"') &&
      manufacturingPage.includes('spacing="tight"') &&
      manufacturingPage.includes('container-spacing="top"'),
    'Manufacturing page must assemble hero, pain grid, flow frame, capability cards, advantage grid, cases, and CTA.',
  )
  assert(
    manufacturingHeroComponent.includes('class="relative h-[586px] overflow-hidden bg-[#1f49e5]"') &&
      manufacturingHeroComponent.includes('manufacturing-hero-title') &&
      manufacturingHeroComponent.includes('page-hero__title-block') &&
      manufacturingHeroComponent.includes('page-hero__description-block') &&
      manufacturingHeroComponent.includes('page-hero__actions') &&
      manufacturingHeroComponent.includes('w-[min(760px,100%)]') &&
      manufacturingHeroComponent.includes('top-[clamp(132px,16.67vw,320px)]') &&
      manufacturingHeroComponent.includes('top-[clamp(246px,24.375vw,468px)]') &&
      manufacturingHeroComponent.includes('bg-[linear-gradient(104.09deg,#1e44e0_-15.53%,#ffffff_36.62%)] bg-clip-text') &&
      manufacturingHeroComponent.includes('border border-white bg-transparent') &&
      manufacturingHeroComponent.includes('class="size-6 shrink-0 text-white"') &&
      manufacturingHeroComponent.includes('stroke="currentColor"') &&
      !manufacturingHeroComponent.includes('<style'),
    'Manufacturing hero must keep the 586px HOME-style layout with gradient title, wide white description, and transparent white-outline CTA with SVG arrow.',
  )
  assert(
    manufacturingCapabilityCards.includes('bg-[#f6f8fb] pb-16 lg:pb-32') &&
      manufacturingCapabilityCards.includes('class="container mt-16"') &&
      manufacturingCapabilityCards.includes('核心功能体系') &&
      manufacturingCapabilityCards.includes('xl:grid-cols-4') &&
      manufacturingCapabilityCards.includes('<BaseCard') &&
      manufacturingCapabilityCards.includes('left-4 right-4 top-[279.22px]') &&
      !manufacturingCapabilityCards.includes('w-[263px]') &&
      manufacturingCapabilityCards.includes('h-[367px]') &&
      manufacturingCapabilityCards.includes('group-hover:top-[93px]') &&
      manufacturingCapabilityCards.includes('group-hover:-translate-y-[74px]') &&
      manufacturingCapabilityCards.includes('group-hover:opacity-100') &&
      !manufacturingCapabilityCards.includes('<style'),
    'Manufacturing capability cards must reproduce the DeepCtrls sc-card drawer animation with Tailwind only.',
  )
  assert(
    manufacturingCases.includes('class="container pb-32 lg:pb-44"') &&
      manufacturingCases.includes('class="flex flex-col gap-11"') &&
      manufacturingCases.includes('lg:flex-row-reverse') &&
      manufacturingCases.includes('lg:w-[320px]') &&
      manufacturingCases.includes('查看案例详情') &&
      !manufacturingCases.includes('<style'),
    'Manufacturing customer cases must reproduce the EMQX case card layout with Tailwind only.',
  )
  assert(
    manufacturingData.includes("image: '/images/solutions/manufacturing-hero.png'") &&
      manufacturingData.includes("title: '智能制造解决方案'") &&
      manufacturingData.includes("title: 'APS智能生产排程'") &&
      manufacturingData.includes("title: '某大型装备制造企业'") &&
      manufacturingData.includes("value: '2,000+'"),
    'Manufacturing page copy must stay centralized in data/solutions/manufacturing.ts.',
  )
  assert(
    existsSync(join(root, 'public/images/solutions/manufacturing-hero.png')),
    'Manufacturing hero banner must live under public/images/solutions.',
  )
}
