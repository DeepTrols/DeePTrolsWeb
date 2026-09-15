export function checkSolutionsFdeContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    fdePage,
    fdeAliasPage,
    fdePageContent,
    fdeHeroComponent,
    fdeEvolutionSection,
    fdeEvolutionVisual,
    fdeEvolutionCube,
    fdeEvolutionPrototypeVisual,
    fdeEvolutionProductionVisual,
    fdeEvolutionScaleVisual,
    fdeCapabilityCards,
    fdeValueSection,
    fdeUseCases,
    fdeCases,
    fdeData,
  } = ctx

  assert(
    fdePage.includes('SiteHeader') &&
      fdePage.includes('SiteFooter') &&
      fdePage.includes('FdePageContent') &&
      fdeAliasPage.includes('FdePageContent') &&
      fdePageContent.includes('<FdeHero />') &&
      fdePageContent.includes('eyebrow="行业痛点"') &&
      fdePageContent.includes('FdeEvolutionSection') &&
      fdePageContent.includes('eyebrow="解决方案"') &&
      fdePageContent.includes(':items="fdeSolutionItems"') &&
      fdePageContent.includes('columns="four"') &&
      fdePageContent.includes('<ProductSystemFlowFrame :label="fdeSolutionLabel" class="mb-10" />') &&
      fdePageContent.includes('eyebrow="FDE工作模式"') &&
      fdePageContent.includes('FdeCapabilityCardsSection') &&
      fdePageContent.includes('<FdeValueSection />') &&
      fdePageContent.includes('FdeUseCasesSection') &&
      fdePageContent.includes('eyebrow="交付流程"') &&
      fdePageContent.includes('FdeCustomerCasesSection') &&
      fdePageContent.includes('CtaSection') &&
      !fdePageContent.includes('<style') &&
      !fdePageContent.includes('style='),
    'FDE page must assemble hero, pain grid, value evolution, solution frame, work-mode frame, capability cards, value cards, use cases, cases, and CTA.',
  )

  assert(
    fdeHeroComponent.includes('min-h-screen') &&
      fdeHeroComponent.includes(':src="fdeHero.video"') &&
      fdeHeroComponent.includes('autoplay') &&
      fdeHeroComponent.includes('muted') &&
      fdeHeroComponent.includes('loop') &&
      fdeHeroComponent.includes('playsinline') &&
      fdeHeroComponent.includes('items-center justify-center') &&
      fdeHeroComponent.includes('<h2') &&
      !fdeHeroComponent.includes('pt-[var(--dt-header-height)]') &&
      !fdeHeroComponent.includes('whitespace-nowrap') &&
      !fdeHeroComponent.includes('<style') &&
      !fdeHeroComponent.includes('style='),
    'FDE hero must use the migrated full-screen video background and centered hero copy without custom styles.',
  )

  assert(
    fdeEvolutionSection.includes('eyebrow="FDE 的价值演进"') &&
      fdeEvolutionSection.includes('title="从 AI 原型，到真正进入生产"') &&
      fdeEvolutionSection.includes('align="left"') &&
      fdeEvolutionSection.includes('width="wide"') &&
      fdeEvolutionSection.includes('grid gap-0') &&
      fdeEvolutionSection.includes('lg:grid-cols-2') &&
      fdeEvolutionSection.includes("item.visualSide === 'left' ? 'lg:col-start-2' : 'lg:col-start-1'") &&
      fdeEvolutionSection.includes("item.visualSide === 'left' ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2'") &&
      fdeEvolutionSection.includes('text-sm font-semibold uppercase tracking-wide text-muted') &&
      fdeEvolutionSection.includes('mt-3 text-2xl font-semibold leading-tight text-highlighted') &&
      fdeEvolutionSection.includes('mt-5 space-y-2 text-base text-default') &&
      fdeEvolutionSection.includes('mt-2 size-1.5 shrink-0 rounded-full bg-primary/70') &&
      fdeEvolutionSection.includes('class="w-full bg-default"') &&
      fdeEvolutionSection.includes('flex items-start gap-2') &&
      fdeEvolutionSection.includes('[&_.rounded-lg]:rounded-none [&_.rounded-2xl]:rounded-none [&_.rounded-md]:rounded-none') &&
      !fdeEvolutionSection.includes('style=') &&
      !fdeEvolutionSection.includes('<style'),
    'FDE section2 must reproduce the alternating EMQX evolution rows with left-aligned heading and matching text hierarchy.',
  )

  assert(
    fdeEvolutionVisual.includes('FdeEvolutionPrototypeVisual') &&
      fdeEvolutionVisual.includes('FdeEvolutionProductionVisual') &&
      fdeEvolutionVisual.includes('FdeEvolutionScaleVisual') &&
      !fdeEvolutionVisual.includes('<style') &&
      !fdeEvolutionVisual.includes('style='),
    'FDE section2 visual dispatcher must route the three EMQX replica variants without custom styles.',
  )

  assert(
    fdeEvolutionCube.includes('inline-flex [perspective:800px]') &&
      fdeEvolutionCube.includes('[transform:rotateX(55deg)_rotate(-45deg)]') &&
      fdeEvolutionCube.includes('[transform-style:preserve-3d]') &&
      fdeEvolutionCube.includes('h-[90px] w-[90px] [transform:translateZ(10px)]') &&
      fdeEvolutionCube.includes('h-[70px] w-[70px] [transform:translateZ(8px)]') &&
      fdeEvolutionCube.includes('border-violet-500/20') &&
      fdeEvolutionCube.includes('border-blue-500/20') &&
      fdeEvolutionCube.includes('border-violet-500/40') &&
      fdeEvolutionCube.includes('bg-dt-bg-elevated/50') &&
      !fdeEvolutionCube.includes('<style') &&
      !fdeEvolutionCube.includes('style='),
    'FDE iso cube must reproduce the EMQX cube geometry with Tailwind arbitrary 3D transforms only.',
  )

  assert(
    fdeEvolutionPrototypeVisual.includes('业务问题') &&
      fdeEvolutionPrototypeVisual.includes('场景·数据') &&
      fdeEvolutionPrototypeVisual.includes('AI原型') &&
      fdeEvolutionPrototypeVisual.includes('模型·应用') &&
      fdeEvolutionPrototypeVisual.includes('M 160 155 Q 260 125 360 155') &&
      fdeEvolutionPrototypeVisual.includes('animateMotion') &&
      fdeEvolutionPrototypeVisual.includes('id="fdeUnifiedGrad"') &&
      fdeEvolutionPrototypeVisual.includes('size-[260px]') &&
      fdeEvolutionPrototypeVisual.includes('from-primary/8 via-violet-500/5 to-blue-500/8') &&
      fdeEvolutionPrototypeVisual.includes('mt-10 flex items-center gap-3 rounded-full border border-primary/40 bg-default px-5 py-2.5 backdrop-blur-sm') &&
      fdeEvolutionPrototypeVisual.includes('h-4 w-px bg-default') &&
      !fdeEvolutionPrototypeVisual.includes('<style') &&
      !fdeEvolutionPrototypeVisual.includes('style='),
    'FDE section2 card1 must 1:1 replicate the EMQX dual-cube particle animation with the required FDE copy.',
  )

  assert(
    fdeEvolutionProductionVisual.includes('生产业务请求') &&
      !fdeEvolutionProductionVisual.includes('Production Workload') &&
      fdeEvolutionProductionVisual.includes('AI 应用') &&
      fdeEvolutionProductionVisual.includes('企业系统') &&
      fdeEvolutionProductionVisual.includes('运行治理') &&
      fdeEvolutionProductionVisual.includes('animate-pulse-dot') &&
      fdeEvolutionProductionVisual.includes('M 200 165 L 270 165') &&
      fdeEvolutionProductionVisual.includes('M 310 165 L 370 165') &&
      fdeEvolutionProductionVisual.includes('id="fdeStorageFlow"') &&
      fdeEvolutionProductionVisual.includes('size-[280px]') &&
      fdeEvolutionProductionVisual.includes('flex items-end gap-8') &&
      fdeEvolutionProductionVisual.includes('animate-value-hub') &&
      fdeEvolutionProductionVisual.includes('text-lg font-bold text-primary') &&
      !fdeEvolutionProductionVisual.includes('<style') &&
      !fdeEvolutionProductionVisual.includes('style='),
    'FDE section2 card2 must 1:1 replicate the EMQX storage-flow animation with the required FDE copy.',
  )

  assert(
    fdeEvolutionScaleVisual.includes('业务上下文') &&
      fdeEvolutionScaleVisual.includes('FDE') &&
      fdeEvolutionScaleVisual.includes('知识智能体') &&
      fdeEvolutionScaleVisual.includes('数据智能体') &&
      fdeEvolutionScaleVisual.includes('业务智能体') &&
      fdeEvolutionScaleVisual.includes('viewBox="0 0 400 400"') &&
      fdeEvolutionScaleVisual.includes('id="fdeAIInputClip"') &&
      fdeEvolutionScaleVisual.includes('M 200 72 L 200 148') &&
      fdeEvolutionScaleVisual.includes('M 200 155 Q 140 185 100 235') &&
      fdeEvolutionScaleVisual.includes('M 200 155 Q 260 185 300 235') &&
      fdeEvolutionScaleVisual.includes('animate-value-hub') &&
      fdeEvolutionScaleVisual.includes('mt-14 flex items-start gap-10') &&
      fdeEvolutionScaleVisual.includes('flex size-16 items-center justify-center rounded-2xl border border-default bg-default shadow-lg') &&
      !fdeEvolutionScaleVisual.includes('<style') &&
      !fdeEvolutionScaleVisual.includes('style='),
    'FDE section2 card3 must 1:1 replicate the EMQX AI-hub animation with the required FDE copy.',
  )

  assert(
    fdeCapabilityCards.includes('bg-[#f6f8fb] pb-16 lg:pb-32') &&
      fdeCapabilityCards.includes('class="container mt-16"') &&
      fdeCapabilityCards.includes('eyebrow="核心能力"') &&
      fdeCapabilityCards.includes('xl:grid-cols-4') &&
      fdeCapabilityCards.includes('class="group relative h-[367px] cursor-default bg-white outline-none"') &&
      fdeCapabilityCards.includes('src="/images/solutions/fde/image-placeholder.svg"') &&
      fdeCapabilityCards.includes('group-hover:top-[93px]') &&
      fdeCapabilityCards.includes('group-hover:-translate-y-[74px]') &&
      !fdeCapabilityCards.includes('<style'),
    'FDE section5 must reuse the existing DeepCtrls-style capability drawer card interaction with Tailwind only.',
  )

  assert(
    fdeUseCases.includes('CarouselControls') &&
      fdeUseCases.includes('relative flow-root bg-dt-bg pb-16 lg:pb-32') &&
      fdeUseCases.includes('eyebrow="应用场景"') &&
      fdeUseCases.includes('title="从一个高价值问题开始，让 AI 深入核心业务"') &&
      fdeUseCases.includes('updateControls') &&
      fdeUseCases.includes('getUseCaseStep') &&
      fdeUseCases.includes('scrollBy') &&
      fdeUseCases.includes('snap-x snap-mandatory gap-6') &&
      fdeUseCases.includes('basis-full shrink-0 snap-start') &&
      fdeUseCases.includes('layout="split"') &&
      fdeUseCases.includes(':previous-disabled="!canGoPrevious"') &&
      fdeUseCases.includes(':next-disabled="!canGoNext"') &&
      fdeUseCases.includes('previous-label="上一条应用场景"') &&
      fdeUseCases.includes('next-label="下一条应用场景"') &&
      fdeUseCases.includes('grid-rows-[auto_auto_1fr]') &&
      fdeUseCases.includes('content-start gap-4 rounded-lg border border-default bg-muted p-8') &&
      fdeUseCases.includes('before:inset-0 before:rounded-lg before:bg-[image:var(--dt-gradient-hero)] before:opacity-0') &&
      fdeUseCases.includes('hover:border-primary hover:before:opacity-100') &&
      fdeUseCases.includes('absolute top-4 right-4 z-10 size-5 text-dimmed opacity-0 transition-opacity duration-300 group-hover:opacity-100') &&
      fdeUseCases.includes('text-lg font-semibold text-highlighted') &&
      fdeUseCases.includes('text-base font-normal text-default') &&
      !fdeUseCases.includes('<style') &&
      !fdeUseCases.includes('style='),
    'FDE section7 must use the shared carousel primitives and EMQX-style application scenario cards.',
  )

  assert(
    fdeValueSection.includes('eyebrow="核心价值"') &&
      fdeValueSection.includes('title="缩短 AI 从想法到价值的距离"') &&
      fdeValueSection.includes('SectionShell title-id="fde-value-title" spacing="compact" container-spacing="top"') &&
      fdeValueSection.includes('<CardGrid columns="two">') &&
      fdeValueSection.includes('variant="product"') &&
      fdeValueSection.includes('equal-height') &&
      fdeValueSection.includes('class="!p-7 lg:!p-8"') &&
      fdeValueSection.includes('<IconBox :icon="item.icon" :size="40" :icon-size="20" />') &&
      fdeValueSection.includes('rounded-full bg-dt-bg-soft px-3 py-1 text-xs leading-relaxed text-muted') &&
      !fdeValueSection.includes('<style') &&
      !fdeValueSection.includes('style='),
    'FDE core values must reuse the smart-education BaseCard value layout instead of inventing a new one.',
  )

  assert(
    fdeCases.includes('class="container pb-32 lg:pb-44"') &&
      fdeCases.includes('class="flex flex-col gap-11"') &&
      fdeCases.includes('flex flex-col rounded-lg border border-default lg:flex-row') &&
      fdeCases.includes('lg:flex-row-reverse') &&
      fdeCases.includes('bg-[image:var(--dt-gradient-text)] bg-clip-text text-transparent') &&
      fdeCases.includes('lg:w-[320px]') &&
      fdeCases.includes('<BaseButton href="/cases">查看案例详情</BaseButton>') &&
      !fdeCases.includes('<style'),
    'FDE cases must reproduce the smart-education solution case layout with Tailwind only.',
  )

  assert(
    fdeData.includes("video: '/images/solutions/fde/hero-bg.mp4'") &&
      fdeData.includes("title: 'DeepTrols FDE解决方案'") &&
      fdeData.includes("title: '企业知识智能化'") &&
      fdeData.includes("metric: '50%'") &&
      fdeData.includes("metric: '70%'") &&
      fdeData.includes("metric: '5%'"),
    'FDE page copy must stay centralized in data/solutions/fde.ts.',
  )

  assert(existsSync(join(root, 'public/images/solutions/fde/hero-bg.mp4')), 'FDE hero video must live under public/images/solutions/fde.')
  assert(
    existsSync(join(root, 'public/images/solutions/fde/image-placeholder.svg')),
    'FDE placeholders must live under public/images/solutions/fde.',
  )
}
