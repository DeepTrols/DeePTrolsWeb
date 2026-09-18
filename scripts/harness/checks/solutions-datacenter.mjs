export function checkSolutionsDatacenterContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    datacenterPage,
    datacenterHeroComponent,
    datacenterScenariosSection,
    datacenterData,
  } = ctx

  assert(
    datacenterPage.includes('SiteHeader') &&
      datacenterPage.includes('SiteFooter') &&
      datacenterPage.includes('<DatacenterHero />') &&
      datacenterPage.includes('class="pt-32"') &&
      datacenterPage.includes('eyebrow="行业痛点"') &&
      datacenterPage.includes('title-id="datacenter-pain-title"') &&
      datacenterPage.includes(':items="datacenterPains"') &&
      datacenterPage.includes('columns="two"') &&
      datacenterPage.includes('header-width="wide"') &&
      datacenterPage.includes('<SectionShell title-id="datacenter-solution-title" spacing="compact">') &&
      datacenterPage.includes('eyebrow="解决方案"') &&
      datacenterPage.includes('<ProductSystemFlowFrame') &&
      datacenterPage.includes(':label="datacenterSolutionLabel"') &&
      datacenterPage.includes(':fallback-text="`${datacenterSolutionLabel}加载中`"') &&
      datacenterPage.includes('DatacenterSynergyFlow') &&
      datacenterPage.includes(':viewport-y="31"') &&
      datacenterPage.includes('eyebrow="核心能力"') &&
      datacenterPage.includes('title-id="datacenter-capability-title"') &&
      datacenterPage.includes('subtitle=""') &&
      datacenterPage.includes(':items="datacenterCapabilities"') &&
      datacenterPage.includes('columns="four"') &&
      datacenterPage.includes('<SectionShell title-id="datacenter-loop-title" spacing="compact">') &&
      datacenterPage.includes('eyebrow="运营闭环"') &&
      datacenterPage.includes(':label="datacenterLoopLabel"') &&
      datacenterPage.includes(':fallback-text="`${datacenterLoopLabel}加载中`"') &&
      datacenterPage.includes('DatacenterLoopFlow') &&
      datacenterPage.includes(':viewport-y="-10"') &&
      datacenterPage.includes('<ClientOnly>') &&
      datacenterPage.includes('h-[560px] w-[1704px]') &&
      datacenterPage.includes('-translate-x-1/2 -translate-y-1/2') &&
      !datacenterPage.includes(':grid="false"') &&
      datacenterPage.includes('DatacenterScenariosSection') &&
      datacenterPage.includes('<CtaSection title-id="datacenter-cta-title" />') &&
      !datacenterPage.includes('<style') &&
      !datacenterPage.includes('style='),
    'Datacenter page must assemble hero, pain grid, solution frame, capability grid, loop frame, scenarios, and CTA with manufacturing-consistent spacing.',
  )

  assert(
    datacenterHeroComponent.includes('h-[586px]') &&
      datacenterHeroComponent.includes(':src="datacenterHero.image"') &&
      datacenterHeroComponent.includes('bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0,rgba(0,0,0,0.26)_38%,rgba(0,0,0,0)_62%)]') &&
      datacenterHeroComponent.includes('page-hero__title-block') &&
      datacenterHeroComponent.includes('bg-[linear-gradient(104.09deg,#1e44e0_-15.53%,#ffffff_36.62%)]') &&
      datacenterHeroComponent.includes('max-md:whitespace-normal') &&
      datacenterHeroComponent.includes('max-md:top-[290px]') &&
      datacenterHeroComponent.includes('page-hero__actions') &&
      datacenterHeroComponent.includes('免费获取专属方案') &&
      datacenterHeroComponent.includes('to="/contact"') &&
      !datacenterHeroComponent.includes('<style') &&
      !datacenterHeroComponent.includes('style='),
    'Datacenter hero must reuse the manufacturing 586px hero layout with gradient title, white CTA, and mobile wrapping for the long title.',
  )

  assert(
    datacenterScenariosSection.includes('title="典型场景"') &&
      datacenterScenariosSection.includes('align="center"') &&
      datacenterScenariosSection.includes('grid gap-6 md:grid-cols-2 xl:grid-cols-4') &&
      datacenterScenariosSection.includes('grid-rows-[auto_auto_1fr]') &&
      datacenterScenariosSection.includes('content-start gap-4 rounded-lg border border-default bg-muted p-8') &&
      datacenterScenariosSection.includes('text-lg font-semibold text-highlighted') &&
      datacenterScenariosSection.includes('text-base font-normal text-default') &&
      !datacenterScenariosSection.includes('NuxtLink') &&
      !datacenterScenariosSection.includes('ArrowUpRight') &&
      !datacenterScenariosSection.includes('before:') &&
      !datacenterScenariosSection.includes('<style') &&
      !datacenterScenariosSection.includes('style='),
    'Datacenter scenarios must reuse the FDE application-scenario card visuals as static non-clickable cards.',
  )

  assert(
    datacenterData.includes("image: '/images/solutions/datacenter-hero.webp'") &&
      datacenterData.includes("title: '统筹算力、电力、冷却与储能，降低综合成本'") &&
      datacenterData.includes("title: 'AI 数据中心'") &&
      datacenterData.includes('算电协同运营能力图') &&
      datacenterData.includes('算电协同运营闭环能力图'),
    'Datacenter page copy must stay centralized in data/solutions/datacenter.ts.',
  )

  assert(
    existsSync(join(root, 'public/images/solutions/datacenter-hero.webp')),
    'Datacenter hero image must live under public/images/solutions.',
  )
}
