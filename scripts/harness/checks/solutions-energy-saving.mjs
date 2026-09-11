export function checkSolutionsEnergySavingContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    energySavingPage,
    energySavingHeroComponent,
    energySavingCapabilityCards,
    energySavingValueSection,
    energySavingCases,
    energySavingData,
  } = ctx

  assert(
    energySavingPage.includes('SiteHeader') &&
      energySavingPage.includes('SiteFooter') &&
      energySavingPage.includes('EnergySavingHero') &&
      energySavingPage.includes('eyebrow="行业痛点"') &&
      energySavingPage.includes('columns="two"') &&
      energySavingPage.includes('header-width="wide"') &&
      energySavingPage.includes('class="pt-32"') &&
      energySavingPage.includes('spacing="compact"') &&
      energySavingPage.includes('<ProductSystemFlowFrame label="储能智能运营能力图" />') &&
      energySavingPage.includes('EnergySavingCapabilityCardsSection') &&
      energySavingPage.includes('EnergySavingValueSection') &&
      energySavingPage.includes('EnergySavingCustomerCasesSection') &&
      energySavingPage.includes('CtaSection'),
    'Energy-saving page must assemble hero, pain grid, flow frame, capability cards, value cards, cases, and CTA.',
  )
  assert(
    energySavingHeroComponent.includes('class="relative h-[586px] overflow-hidden bg-[#1f49e5]"') &&
      energySavingHeroComponent.includes('energy-saving-hero-title') &&
      energySavingHeroComponent.includes('page-hero__title-block') &&
      energySavingHeroComponent.includes('page-hero__description-block') &&
      energySavingHeroComponent.includes('page-hero__actions') &&
      energySavingHeroComponent.includes('w-[min(760px,100%)]') &&
      energySavingHeroComponent.includes('top-[clamp(132px,16.67vw,320px)]') &&
      energySavingHeroComponent.includes('top-[clamp(246px,24.375vw,468px)]') &&
      energySavingHeroComponent.includes('bg-[linear-gradient(104.09deg,#1e44e0_-15.53%,#ffffff_36.62%)] bg-clip-text') &&
      energySavingHeroComponent.includes('border border-white bg-transparent') &&
      energySavingHeroComponent.includes('!text-white') &&
      energySavingHeroComponent.includes('class="size-6 shrink-0 !text-white"') &&
      energySavingHeroComponent.includes('stroke="currentColor"') &&
      !energySavingHeroComponent.includes('<style'),
    'Energy-saving hero must mirror the manufacturing 586px hero layout with gradient title and transparent white-outline CTA.',
  )
  assert(
    energySavingCapabilityCards.includes('bg-[#f6f8fb] pb-16 lg:pb-32') &&
      energySavingCapabilityCards.includes('class="container mt-16"') &&
      energySavingCapabilityCards.includes('eyebrow="解决方案"') &&
      energySavingCapabilityCards.includes('贯通感知、数据、分析与优化的储能智能能力体系') &&
      energySavingCapabilityCards.includes('xl:grid-cols-4') &&
      energySavingCapabilityCards.includes('<BaseCard') &&
      energySavingCapabilityCards.includes('class="group relative h-[367px] cursor-default bg-white outline-none"') &&
      energySavingCapabilityCards.includes('left-4 right-4 top-[279.22px]') &&
      energySavingCapabilityCards.includes('inset-x-0 top-0 h-[181px] w-full') &&
      energySavingCapabilityCards.includes('h-full w-full min-w-full object-cover') &&
      energySavingCapabilityCards.includes('group-hover:top-[93px]') &&
      energySavingCapabilityCards.includes('group-hover:-translate-y-[74px]') &&
      energySavingCapabilityCards.includes('group-hover:opacity-100') &&
      !energySavingCapabilityCards.includes('<style'),
    'Energy-saving capability cards must reproduce the DeepCtrls sc-card drawer animation with Tailwind only.',
  )
  assert(
    energySavingValueSection.includes('spacing="tight"') &&
      energySavingValueSection.includes('container-spacing="top"') &&
      energySavingValueSection.includes('align="left"') &&
      energySavingValueSection.includes('columns="three"') &&
      energySavingValueSection.includes('<BaseCard') &&
      !energySavingValueSection.includes('eyebrow=') &&
      !energySavingValueSection.includes('subtitle=') &&
      !energySavingValueSection.includes('<style'),
    'Energy-saving value section must render a left-aligned title-only header with three BaseCards.',
  )
  assert(
    energySavingCases.includes('class="container pb-32 lg:pb-44"') &&
      energySavingCases.includes('class="flex flex-col gap-11"') &&
      energySavingCases.includes('lg:flex-row-reverse') &&
      energySavingCases.includes('lg:w-[320px]') &&
      energySavingCases.includes('查看案例详情') &&
      !energySavingCases.includes('<style'),
    'Energy-saving customer cases must reproduce the manufacturing EMQX case card layout with Tailwind only.',
  )
  assert(
    energySavingData.includes("image: '/images/solutions/energy-saving-hero.png'") &&
      energySavingData.includes("title: '智慧储能解决方案'") &&
      energySavingData.includes("title: '储能设备接入管理'") &&
      energySavingData.includes("title: '某大型工业园区储能项目'") &&
      energySavingData.includes("value: '99.9%'"),
    'Energy-saving page copy must stay centralized in data/solutions/energy-saving.ts.',
  )
  assert(
    existsSync(join(root, 'public/images/solutions/energy-saving-hero.png')) &&
      existsSync(join(root, 'public/images/solutions/energy-saving/image-placeholder.svg')),
    'Energy-saving hero banner and placeholder must live under public/images/solutions.',
  )
}
