export function checkSolutionsEducationContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    educationPage,
    educationHeroComponent,
    educationCapabilityCards,
    educationValueSection,
    educationAgentFlowSection,
    educationCases,
    educationData,
    productFeatureGridSection,
    featureCard,
    cardText,
  } = ctx

  assert(
    educationPage.includes('SiteHeader') &&
      educationPage.includes('SiteFooter') &&
      educationPage.includes('EducationHero') &&
      educationPage.includes('eyebrow="行业痛点"') &&
      educationPage.includes('columns="two"') &&
      educationPage.includes('header-width="wide"') &&
      educationPage.includes('class="pt-32"') &&
      educationPage.includes('spacing="compact"') &&
      educationPage.includes('eyebrow="解决方案"') &&
      educationPage.includes('<ProductSystemFlowFrame label="教育智能体运行底座能力图" />') &&
      educationPage.includes('EducationCapabilityCardsSection') &&
      educationPage.includes('EducationValueSection') &&
      educationPage.includes('EducationAgentFlowSection') &&
      educationPage.includes('eyebrow="教育智能体"') &&
      educationPage.includes('columns="three"') &&
      educationPage.includes('EducationCustomerCasesSection') &&
      educationPage.includes('CtaSection'),
    'Education page must assemble hero, pain grid, flow frame, capability cards, value cards, agent flow section, agent grid, cases, and CTA.',
  )
  assert(
    educationHeroComponent.includes('class="relative h-[586px] overflow-hidden bg-[#1f49e5]"') &&
      educationHeroComponent.includes('education-hero-title') &&
      educationHeroComponent.includes('page-hero__title-block') &&
      educationHeroComponent.includes('page-hero__description-block') &&
      educationHeroComponent.includes('page-hero__actions') &&
      educationHeroComponent.includes('bg-[linear-gradient(104.09deg,#1e44e0_-15.53%,#ffffff_36.62%)] bg-clip-text') &&
      educationHeroComponent.includes('border border-white bg-transparent') &&
      !educationHeroComponent.includes('<style'),
    'Education hero must mirror the manufacturing 586px hero layout with gradient title and transparent white-outline CTA.',
  )
  assert(
    educationCapabilityCards.includes('bg-[#f6f8fb] pb-16 lg:pb-32') &&
      educationCapabilityCards.includes('class="container mt-16"') &&
      educationCapabilityCards.includes('eyebrow="核心功能体系"') &&
      educationCapabilityCards.includes('从模型调用到任务执行，构建教育 AI 原生能力体系') &&
      educationCapabilityCards.includes('xl:grid-cols-4') &&
      educationCapabilityCards.includes('class="group relative h-[367px] cursor-default bg-white outline-none"') &&
      educationCapabilityCards.includes('group-hover:top-[93px]') &&
      educationCapabilityCards.includes('group-hover:-translate-y-[74px]') &&
      !educationCapabilityCards.includes('<style'),
    'Education capability cards must reproduce the DeepCtrls sc-card drawer animation with Tailwind only.',
  )
  assert(
    educationValueSection.includes('spacing="tight"') &&
      educationValueSection.includes('container-spacing="top"') &&
      educationValueSection.includes('eyebrow="核心价值"') &&
      educationValueSection.includes('让 AI 从辅助工具，走向教育业务智能执行者') &&
      educationValueSection.includes('columns="two"') &&
      educationValueSection.includes('variant="product"') &&
      educationValueSection.includes('class="!p-7 lg:!p-8"') &&
      educationValueSection.includes('<IconBox :icon="item.icon" :size="40" :icon-size="20" />') &&
      educationValueSection.includes('rounded-full bg-dt-bg-soft px-3 py-1') &&
      !educationValueSection.includes('<style'),
    'Education value section must reproduce the HOME WhyTrustTabs card layout with Tailwind-only tags.',
  )
  assert(
    educationAgentFlowSection.includes('eyebrow="AI 原生教育"') &&
      educationAgentFlowSection.includes('从 Copilot 到 Agent，让 AI 真正完成教育任务') &&
      educationAgentFlowSection.includes('mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]') &&
      educationAgentFlowSection.includes('rounded-3xl border border-default bg-dt-bg-soft/30 p-8 shadow-sm backdrop-blur-xl lg:p-10') &&
      educationAgentFlowSection.includes('[perspective:800px]') &&
      educationAgentFlowSection.includes('[transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]') &&
      educationAgentFlowSection.includes('h-[104px] w-[104px] border bg-default [transform:translateZ(-12px)]') &&
      educationAgentFlowSection.includes('h-[104px] w-[104px] overflow-hidden border bg-default [transform:translateZ(12px)]') &&
      educationAgentFlowSection.includes('h-[104px] w-[24px] origin-left border bg-muted [transform:rotateY(-90deg)_translateX(-12px)]') &&
      educationAgentFlowSection.includes('h-[24px] w-[104px] origin-bottom border-x bg-default [transform:rotateX(90deg)_translateY(12px)]') &&
      !educationAgentFlowSection.includes(' style=') &&
      educationAgentFlowSection.includes('@container aspect-[760/500] w-full') &&
      educationAgentFlowSection.includes('relative h-[500px] w-[760px] origin-top-left [transform:scale(calc(100cqw/760px))]') &&
      educationAgentFlowSection.includes('viewBox="0 0 760 500"') &&
      educationAgentFlowSection.includes('<animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />') &&
      educationAgentFlowSection.includes('from-primary/8 via-fuchsia-500/6 to-blue-500/8 blur-3xl') &&
      educationAgentFlowSection.includes('absolute left-1/2 top-[170px] -translate-x-1/2') &&
      educationAgentFlowSection.includes('animate-value-flow') &&
      educationAgentFlowSection.includes('[perspective:900px]') &&
      educationAgentFlowSection.includes('h-[150px] w-[150px] overflow-hidden border border-primary/50 bg-muted [transform:translateZ(14px)]') &&
      educationAgentFlowSection.includes('absolute left-1/2 top-[242px] w-[460px] -translate-x-1/2') &&
      educationAgentFlowSection.includes('zhiyao-logo.svg?url') &&
      !educationAgentFlowSection.includes('<style'),
    'Education agent flow section must reproduce the EMQX Edge isometric cube step layout 1:1 and place the zhiyao logo IsoCube at the diagram core.',
  )
  assert(
    educationCases.includes('class="container pb-32 lg:pb-44"') &&
      educationCases.includes('class="flex flex-col gap-11"') &&
      educationCases.includes('lg:flex-row-reverse') &&
      educationCases.includes('lg:w-[320px]') &&
      educationCases.includes('查看案例详情') &&
      !educationCases.includes('<style'),
    'Education customer cases must reproduce the manufacturing EMQX case card layout with Tailwind only.',
  )
  assert(
    productFeatureGridSection.includes('subtitle?: string') &&
      productFeatureGridSection.includes('tags?: string[]') &&
      productFeatureGridSection.includes(':subtitle="item.subtitle"') &&
      productFeatureGridSection.includes(':tags="item.tags"') &&
      featureCard.includes('subtitle?: string') &&
      featureCard.includes('tags?: string[]') &&
      featureCard.includes(':subtitle="subtitle"') &&
      featureCard.includes('v-if="tags?.length"') &&
      cardText.includes('subtitle?: string') &&
      cardText.includes('v-if="subtitle"') &&
      !cardText.includes('.card-text__subtitle'),
    'Feature grid cards must thread optional subtitle and tags from ProductFeatureGridSection through FeatureCard into CardText without new styles.',
  )
  assert(
    educationData.includes("image: '/images/solutions/education-hero.png'") &&
      educationData.includes("title: '智慧教育解决方案'") &&
      educationData.includes("title: '教育大模型网关'") &&
      educationData.includes("badge: '01'") &&
      educationData.includes("'border-violet-500/45'") &&
      educationData.includes("'bg-fuchsia-500/12'") &&
      educationData.includes("'text-blue-500'") &&
      educationData.includes("name: '智曜·AgentOS'") &&
      educationData.includes("title: 'AI 教师助手'") &&
      educationData.includes("title: '某高校教育智能体平台'") &&
      educationData.includes("value: '10,000+'"),
    'Education page copy must stay centralized in data/solutions/education.ts, including EMQX cube color classes as literal strings.',
  )
  assert(
    existsSync(join(root, 'public/images/solutions/education-hero.png')) &&
      existsSync(join(root, 'public/images/solutions/education/image-placeholder.svg')),
    'Education hero banner and placeholder must live under public/images/solutions.',
  )
}
