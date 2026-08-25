export function checkWhyPageContracts(ctx) {
  const { assert, tailwind, sectionShell, baseCard, iconBox, cardGrid, baseTabs, pageHero, heroLogoStrip, trustTabsSection, serviceShowcaseSection, engineLinksSection, whyData, whyPage, whyHero, whyHeroLogos, whyHeroVisual, whyHeroAnimation, whyTrustTabs, whyService, whyEngine } = ctx
assert(whyPage.includes('SiteHeader') && whyPage.includes('SiteFooter'), 'Why page must reuse global Header and Footer.')
assert(
  whyPage.includes('WhyHero') &&
    whyPage.includes('WhyHeroLogos') &&
    whyPage.includes('WhyTrustTabs') &&
    whyPage.includes('WhyServiceReset') &&
    whyPage.includes('WhyEngine') &&
    whyPage.includes('CtaSection') &&
    whyPage.includes('whyCtaActions'),
  'Why page sections are incomplete.',
)
assert(whyHero.includes('PageHero') && pageHero.includes('BaseButton'), 'Why hero must reuse the shared PageHero and BaseButton.')
assert(!whyHero.includes('HomeCustomerLogos') && !whyHero.includes('why-hero__logos'), 'WhyHero must not own the hero logo strip.')
assert(whyHeroLogos.includes('HeroLogoStrip') && whyHeroLogos.includes('HomeCustomerLogos'), 'Why hero logos must be extracted into a dedicated component.')
assert(
  whyHero.includes('flush-bottom') &&
    heroLogoStrip.includes('class="container"') &&
    heroLogoStrip.includes('hero-logo-strip__inner mt-24 border-t border-dt-line pt-12 lg:mt-28') &&
    heroLogoStrip.includes('padding-bottom: 96px') &&
    heroLogoStrip.includes('padding-bottom: 128px'),
  'HeroLogoStrip must restore the original contained width and hero logo spacing rhythm.',
)
assert(
  pageHero.includes('class="page-hero__badge mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"') &&
    pageHero.includes('class="page-hero__badge-icon"') &&
    whyHero.includes('badge="为什么选择 DeepTrols"') &&
    whyHero.includes('visual-size="large"') &&
    whyHero.includes('title-line="数据、知识、智能统一"') &&
    whyHero.includes('title-gradient="企业级AI应用服务商"'),
  'Why hero content hierarchy must follow the why-emqx replacement mapping.',
)
assert(pageHero.includes('font-size: 36px') && pageHero.includes('font-size: 48px') && pageHero.includes('font-size: 60px'), 'Why hero title sizes must follow the why-emqx 4xl/5xl/6xl rhythm.')
assert(
  pageHero.includes('class="page-hero relative overflow-hidden"') &&
    pageHero.includes('container page-hero__body relative isolate pt-24 lg:pt-32') &&
    pageHero.includes('class="page-hero__body-bg absolute inset-0 z-0 bg-dt-bg"') &&
    pageHero.includes('class="page-hero__background" aria-hidden="true"') &&
    pageHero.includes('page-hero__inner relative z-10 flex flex-col items-center') &&
    pageHero.includes('width: 100vw') &&
    pageHero.includes('transform: translateX(-50%)') &&
    pageHero.includes('z-index: 1') &&
    pageHero.includes('pt-24 lg:pt-32') &&
    pageHero.includes("flushBottom ? 'pb-0 lg:pb-0' : 'pb-24 lg:pb-32'") &&
    heroLogoStrip.includes('mt-24 border-t border-dt-line pt-12 lg:mt-28') &&
    !pageHero.includes('padding: 144px') &&
    !pageHero.includes('padding-bottom: 112px'),
  'Why hero spacing must follow the why-emqx Tailwind section rhythm.',
)
assert(
  whyHero.includes('WhyHeroVisual') &&
    !whyHero.includes('<video') &&
    !whyHero.includes('robot.webm') &&
    !whyHero.includes('new URL('),
  'Why hero must render the FlowMQ-style WhyHeroVisual instead of the robot video.',
)
assert(
  whyHeroVisual.includes('viewBox="0 0 560 480"') &&
    whyHeroVisual.includes('whyHeroNodes') &&
    whyHeroVisual.includes('whyHeroCenterLogo') &&
    whyHeroVisual.includes('useWhyHeroAnimation'),
  'WhyHeroVisual must keep the FlowMQ 560x480 canvas and the brand node wiring.',
)
assert(
  whyHeroVisual.includes('rx="16"') &&
    whyHeroVisual.includes('why-hv-hub-ring') &&
    !whyHeroVisual.includes('hubRingArcs') &&
    whyHeroVisual.includes('fill-[var(--dt-color-bg-elevated)]'),
  'Why hero center must be a rounded-rect wordmark badge and nodes must carry a solid background color like the FlowMQ hero.',
)
assert(
  whyHeroAnimation.includes('ROTATE_DURATION_MS = 800') &&
    whyHeroAnimation.includes('SETTLE_DELAY_MS = 200') &&
    whyHeroAnimation.includes('MESSAGE_DURATION_MS = 900') &&
    whyHeroAnimation.includes('HOLD_DURATION_MS = 400') &&
    whyHeroAnimation.includes('START_DELAY_MS = 400') &&
    whyHeroAnimation.includes('INITIAL_ROTATION_DEG = 270'),
  'useWhyHeroAnimation must keep the original FlowMQ state-machine timings.',
)
assert(
  whyData.includes('whyHeroNodes') &&
    whyData.includes('whyHeroCenterLogo') &&
    whyData.includes('shuyao-logo.svg?url') &&
    whyData.includes('boyao-logo.svg?url') &&
    whyData.includes('tanyao-iot-logo.svg?url') &&
    whyData.includes('zhiyao-logo.svg?url') &&
    whyData.includes("whyHeroCenterLogo = '/logo-while.svg'"),
  'Why hero data must map the four brand node logos plus the public white wordmark center logo.',
)
assert(
  tailwind.includes('--animate-why-node-pulse') && tailwind.includes('--animate-why-center-pulse'),
  'Why hero node and center pulse animations must stay registered in the Tailwind theme.',
)
assert(!whyHero.includes('&::after') && !whyHero.includes('linear-gradient(180deg, var(--dt-color-bg) 0%') && !whyHero.includes('linear-gradient(90deg, var(--dt-color-bg) 0%'), 'Why hero figure must not keep the old four-edge gradient overlay.')
assert(
  pageHero.includes('max-w-[820px]') &&
    pageHero.includes('self-stretch') &&
    pageHero.includes("visualSize: 'default'") &&
    pageHero.includes("'max-w-lg self-center'") &&
    whyHero.includes('lg:h-full') &&
    whyHero.includes('max-w-[728px]') &&
    pageHero.includes('lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1fr)]'),
  'Why hero visual must keep the large PageHero layout with the FlowMQ 1.3x size cap.',
)
assert(!whyHero.includes('box-shadow: 0 24px 60px'), 'Why hero visual must not use an outer framed card shadow.')
assert(whyTrustTabs.includes('TrustTabsSection') && trustTabsSection.includes('SectionHeader'), 'Why trust tabs must reuse TrustTabsSection and SectionHeader.')
assert(trustTabsSection.includes('BaseTabs') && baseTabs.includes('dt-segmented-tabs') && baseTabs.includes('dt-segmented-tab'), 'Why trust tabs must use shared segmented tab classes.')
assert(trustTabsSection.includes('BaseCard') && trustTabsSection.includes('IconBox') && baseCard.includes('dt-product-card') && iconBox.includes('dt-icon-box'), 'Why trust cards must use shared product card classes.')
assert(trustTabsSection.includes('SectionShell') && sectionShell.includes('pb-32 lg:pb-44'), 'Why trust section must use Tailwind pb-32/lg:pb-44 rhythm.')
assert(trustTabsSection.includes('mb-12 text-center lg:mb-16'), 'Why trust heading must use Tailwind mb-12/lg:mb-16 rhythm.')
assert(trustTabsSection.includes('CardGrid') && cardGrid.includes('gap-5 lg:gap-6') && cardGrid.includes('md:grid-cols-2') && !trustTabsSection.includes('grid-template-columns: repeat(4, minmax(0, 1fr))'), 'Why trust cards must use the 2x2 EMQX Tailwind grid.')
assert(
  trustTabsSection.includes('variant="product"') &&
    trustTabsSection.includes('equal-height') &&
    trustTabsSection.includes('!p-7 lg:!p-8') &&
    baseCard.includes('dt-card--adaptive') &&
    !trustTabsSection.includes('min-h-[280px]') &&
    iconBox.includes('dt-icon-box') &&
    !trustTabsSection.includes('!rounded-xl') &&
    trustTabsSection.includes(':size="40"') &&
    trustTabsSection.includes(':icon-size="20"'),
  'Why trust cards must use DGP card radius/icon size and avoid fixed card height.',
)
assert(serviceShowcaseSection.includes('dt-section relative pb-32 lg:pb-44') && engineLinksSection.includes('dt-section relative pb-32 lg:pb-44'), 'Why service and engine sections must share the EMQX section rhythm.')
assert(
  serviceShowcaseSection.includes('FeatureCard') &&
    serviceShowcaseSection.includes('variant="soft"') &&
    baseCard.includes('dt-card--soft') &&
    !serviceShowcaseSection.includes('border-radius: 24px') &&
    !serviceShowcaseSection.includes('transform: translateY(-4px)'),
  'Why service cards must use shared global card radius and hover.',
)
assert(
  engineLinksSection.includes('BaseCard') &&
    engineLinksSection.includes('IconBox') &&
    engineLinksSection.includes('CardText') &&
    engineLinksSection.includes('variant="soft"') &&
    engineLinksSection.includes('tone="white"') &&
    baseCard.includes('dt-card--soft') &&
    iconBox.includes('dt-icon-box') &&
    !engineLinksSection.includes('border-radius: 24px') &&
    !engineLinksSection.includes('transform: translateY(-4px)'),
  'Why engine cards and icon boxes must use shared global card and icon classes.',
)
assert(whyService.includes('ServiceShowcaseSection') && serviceShowcaseSection.includes('SectionHeader') && whyService.includes('fangangaishu.png?url') && !whyService.includes('new URL('), 'Why service section must use ServiceShowcaseSection and import the required overview image via ?url.')
assert(whyEngine.includes('EngineLinksSection') && whyEngine.includes('whyEngineLinks') && engineLinksSection.includes('SectionHeader'), 'Why engine section must reuse EngineLinksSection and configured links.')
assert(whyData.includes('label: \'面向技术层\'') && whyData.includes('label: \'面向业务层\'') && whyData.includes('label: \'面向服务层\'') && whyData.includes('label: \'面向长期价值\''), 'Why page must define four trust tabs.')
const whyTrustFeatureGroups = [...whyData.matchAll(/label: '[^']+',[\s\S]*?features: \[([\s\S]*?)\n {4}\],/g)]
assert(
  whyTrustFeatureGroups.length === 4 &&
    whyTrustFeatureGroups.every(([, group]) => (group.match(/\n {8}title: /g) ?? []).length === 4),
  'Each Why trust tab must define four feature cards.',
)
}
