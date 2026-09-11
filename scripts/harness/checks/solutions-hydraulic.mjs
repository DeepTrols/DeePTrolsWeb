export function checkSolutionsHydraulicContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    hydraulicPage,
    hydraulicHeroComponent,
    hydraulicCapabilityCards,
    hydraulicValueSection,
    hydraulicCases,
    hydraulicData,
    productFeatureGridSection,
    featureCard,
    cardText,
  } = ctx

  assert(
    hydraulicPage.includes('SiteHeader') &&
      hydraulicPage.includes('SiteFooter') &&
      hydraulicPage.includes('HydraulicHero') &&
      hydraulicPage.includes('eyebrow="行业痛点"') &&
      hydraulicPage.includes('columns="two"') &&
      hydraulicPage.includes('header-width="wide"') &&
      hydraulicPage.includes('class="pt-32"') &&
      hydraulicPage.includes('spacing="compact"') &&
      hydraulicPage.includes('eyebrow="解决方案"') &&
      hydraulicPage.includes('<ProductSystemFlowFrame label="智慧水利知识中枢能力图" />') &&
      hydraulicPage.includes('HydraulicCapabilityCardsSection') &&
      hydraulicPage.includes('HydraulicValueSection') &&
      hydraulicPage.includes('HydraulicCustomerCasesSection') &&
      hydraulicPage.includes('CtaSection'),
    'Hydraulic page must assemble hero, pain grid with points, flow frame, capability cards, value cards, cases, and CTA.',
  )
  assert(
    hydraulicHeroComponent.includes('class="relative h-[586px] overflow-hidden bg-[#1f49e5]"') &&
      hydraulicHeroComponent.includes('hydraulic-hero-title') &&
      hydraulicHeroComponent.includes('page-hero__title-block') &&
      hydraulicHeroComponent.includes('page-hero__description-block') &&
      hydraulicHeroComponent.includes('page-hero__actions') &&
      hydraulicHeroComponent.includes('w-[min(760px,100%)]') &&
      hydraulicHeroComponent.includes('top-[clamp(132px,16.67vw,320px)]') &&
      hydraulicHeroComponent.includes('top-[clamp(246px,24.375vw,468px)]') &&
      hydraulicHeroComponent.includes('bg-[linear-gradient(104.09deg,#1e44e0_-15.53%,#ffffff_36.62%)] bg-clip-text') &&
      hydraulicHeroComponent.includes('border border-white bg-transparent') &&
      hydraulicHeroComponent.includes('!text-white') &&
      hydraulicHeroComponent.includes('class="size-6 shrink-0 !text-white"') &&
      hydraulicHeroComponent.includes('stroke="currentColor"') &&
      !hydraulicHeroComponent.includes('<style'),
    'Hydraulic hero must mirror the manufacturing 586px hero layout with gradient title and transparent white-outline CTA.',
  )
  assert(
    hydraulicCapabilityCards.includes('bg-[#f6f8fb] pb-16 lg:pb-32') &&
      hydraulicCapabilityCards.includes('class="container mt-16"') &&
      hydraulicCapabilityCards.includes('eyebrow="核心功能体系"') &&
      hydraulicCapabilityCards.includes('从数据治理到知识决策，构建智慧水利核心能力') &&
      hydraulicCapabilityCards.includes('xl:grid-cols-4') &&
      hydraulicCapabilityCards.includes('<BaseCard') &&
      hydraulicCapabilityCards.includes('class="group relative h-[367px] cursor-default bg-white outline-none"') &&
      hydraulicCapabilityCards.includes('left-4 right-4 top-[279.22px]') &&
      hydraulicCapabilityCards.includes('inset-x-0 top-0 h-[181px] w-full') &&
      hydraulicCapabilityCards.includes('h-full w-full min-w-full object-cover') &&
      hydraulicCapabilityCards.includes('group-hover:top-[93px]') &&
      hydraulicCapabilityCards.includes('group-hover:-translate-y-[74px]') &&
      hydraulicCapabilityCards.includes('group-hover:opacity-100') &&
      !hydraulicCapabilityCards.includes('<style'),
    'Hydraulic capability cards must reproduce the DeepCtrls sc-card drawer animation with Tailwind only.',
  )
  assert(
    hydraulicValueSection.includes('spacing="tight"') &&
      hydraulicValueSection.includes('container-spacing="top"') &&
      hydraulicValueSection.includes('eyebrow="核心价值"') &&
      hydraulicValueSection.includes('让水利知识可沉淀、可理解、可调用、可决策') &&
      hydraulicValueSection.includes('columns="two"') &&
      hydraulicValueSection.includes('variant="product"') &&
      hydraulicValueSection.includes('class="!p-7 lg:!p-8"') &&
      hydraulicValueSection.includes('<IconBox :icon="item.icon" :size="40" :icon-size="20" />') &&
      hydraulicValueSection.includes('rounded-full bg-dt-bg-soft px-3 py-1') &&
      !hydraulicValueSection.includes('<style'),
    'Hydraulic value section must reproduce the HOME WhyTrustTabs card layout with Tailwind-only tags.',
  )
  assert(
    hydraulicCases.includes('class="container pb-32 lg:pb-44"') &&
      hydraulicCases.includes('class="flex flex-col gap-11"') &&
      hydraulicCases.includes('lg:flex-row-reverse') &&
      hydraulicCases.includes('lg:w-[320px]') &&
      hydraulicCases.includes('查看案例详情') &&
      !hydraulicCases.includes('<style'),
    'Hydraulic customer cases must reproduce the manufacturing EMQX case card layout with Tailwind only.',
  )
  assert(
    productFeatureGridSection.includes('points?: string[]') &&
      productFeatureGridSection.includes(':points="item.points"') &&
      featureCard.includes('points?: string[]') &&
      featureCard.includes(':points="points"') &&
      cardText.includes('points?: string[]') &&
      cardText.includes('v-if="points?.length"') &&
      !cardText.includes('.card-text__points'),
    'Feature grid cards must thread optional bullet points from ProductFeatureGridSection through FeatureCard into CardText without new styles.',
  )
  assert(
    hydraulicData.includes("image: '/images/solutions/hydraulic-hero.png'") &&
      hydraulicData.includes("title: '智慧水利解决方案'") &&
      hydraulicData.includes("title: '水利知识库管理'") &&
      hydraulicData.includes("title: '某省级水利知识平台'") &&
      hydraulicData.includes("value: '185类'"),
    'Hydraulic page copy must stay centralized in data/solutions/hydraulic.ts.',
  )
  assert(
    existsSync(join(root, 'public/images/solutions/hydraulic-hero.png')) &&
      existsSync(join(root, 'public/images/solutions/hydraulic/image-placeholder.svg')),
    'Hydraulic hero banner and placeholder must live under public/images/solutions.',
  )
}
