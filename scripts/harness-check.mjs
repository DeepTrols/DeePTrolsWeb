import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

const root = process.cwd()
const failures = []

function read(path) {
  return readFileSync(join(root, path), 'utf8')
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

function listFiles(directory, predicate) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = `${directory}/${entry.name}`

    if (entry.isDirectory()) {
      return listFiles(path, predicate)
    }

    return predicate(path) ? [path] : []
  })
}

const requiredFiles = [
  'AGENTS.md',
  'doc/tasks/README.md',
  'doc/tasks/TASK_TEMPLATE.md',
  'doc/tasks/review/TASK-002.1-design-system-harness-refactor.md',
  'doc/tasks/review/TASK-002.2-code-audit-component-refactor.md',
  'doc/tasks/review/TASK-002.3-common-section-components.md',
  'doc/tasks/review/TASK-002.4-why-logo-strip-cta-fix.md',
  'doc/tasks/review/TASK-002.5-product-system-section-split.md',
  'doc/tasks/review/TASK-006.1-dgp-product-page.md',
  'doc/tasks/review/TASK-006.2-dlp-product-page.md',
  'doc/tasks/review/TASK-006.3-ddp-product-page.md',
  'doc/tasks/review/TASK-006.4-dms-product-page.md',
  'doc/engineering/CODE_AUDIT_2026-07-30.md',
  'doc/engineering/COMMON_SECTION_COMPONENTS.md',
  'doc/engineering/COMPONENT_REFINEMENT_AUDIT.md',
  'doc/engineering/HOME_PAGE_BASELINE.md',
  'doc/engineering/HARNESS_ENGINEERING.md',
  'doc/product/BRAND_GUIDE.md',
  'doc/product/CONTENT_GUIDE.md',
  'doc/product/NAVIGATION.md',
  'doc/product/PRODUCT_VISION.md',
  'doc/product/SITE_MAP.md',
  'doc/product/PAGE_REQUIREMENTS/HOME/HOME.md',
  'doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/WhyDeepTrols.md',
  'doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/robot.webm',
  'doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/fangangaishu@2x.png',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/DGP.md',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/Hero.md',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ban-shape1.png',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ban-shape2.png',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ban-shape3.png',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ruizhi1.png',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/DLP.md',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/Hero.md',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODDP/DDP.md',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODMS/DMS.md',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODMS/Hero.md',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/TANYAOIOT/TANYAO.md',
  'doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/DEVICEAGENT.md',
  'assets/css/tailwind.css',
  'assets/scss/main.scss',
  'components/common/BaseButton.vue',
  'components/common/SectionHeading.vue',
  'components/common/section/SectionHeader.vue',
  'components/common/section/SectionShell.vue',
  'components/common/card/BaseCard.vue',
  'components/common/card/IconBox.vue',
  'components/common/card/CardText.vue',
  'components/common/card/CardGrid.vue',
  'components/common/card/FeatureCard.vue',
  'components/common/tabs/BaseTabs.vue',
  'components/common/carousel/CarouselRoot.vue',
  'components/common/carousel/CarouselControls.vue',
  'components/common/PageHero.vue',
  'components/common/HeroLogoStrip.vue',
  'components/common/TrustTabsSection.vue',
  'components/common/ServiceShowcaseSection.vue',
  'components/common/EngineLinksSection.vue',
  'components/common/AlternatingTimelineSection.vue',
  'components/common/CompatibilityGridSection.vue',
  'components/common/ProductFeatureGridSection.vue',
  'components/common/ProductSystemSection.vue',
  'components/common/ProductSystemFlowFrame.vue',
  'components/common/ProductSystemCards.vue',
  'components/common/SystemCards.vue',
  'components/common/CtaSection.vue',
  'components/layout/SiteFooter.vue',
  'components/layout/FooterSubscribe.vue',
  'components/layout/FooterMain.vue',
  'components/layout/FooterSocials.vue',
  'components/layout/FooterBottom.vue',
  'components/navigation/SiteHeader.vue',
  'components/navigation/SiteHeaderDesktopNav.vue',
  'components/navigation/SiteHeaderActions.vue',
  'components/navigation/SiteHeaderMobileNav.vue',
  'components/navigation/SiteHeaderMenuButton.vue',
  'components/navigation/MegaMenuPanel.vue',
  'components/navigation/MegaPanelServices.vue',
  'components/home/HomeCaseSlide.vue',
  'components/home/HomeProductSystemFlow.vue',
  'components/home/HomeProductSystemMobileFlow.vue',
  'components/home/HomeEcosystemVisual.vue',
  'components/home/ecosystem-visuals/EcosystemTokenVisual.vue',
  'components/home/ecosystem-visuals/EcosystemAgentVisual.vue',
  'components/home/ecosystem-visuals/EcosystemInfraVisual.vue',
  'components/home/ecosystem-visuals/EcosystemReportVisual.vue',
  'data/footer.ts',
  'data/ecosystemVisual.ts',
  'data/why.ts',
  'data/dgp.ts',
  'data/dlp.ts',
  'data/ddp.ts',
  'data/dms.ts',
  'data/tanyao.ts',
  'data/device-agent.ts',
  'pages/why-deeptrols.vue',
  'pages/products/data-governance.vue',
  'pages/products/data-labeling.vue',
  'pages/products/data-development.vue',
  'pages/products/data-element-regulation.vue',
  'pages/products/ai-iot.vue',
  'pages/products/device-agent.vue',
  'components/why/WhyHero.vue',
  'components/why/WhyHeroLogos.vue',
  'components/why/WhyHeroVisual.vue',
  'components/why/useWhyHeroAnimation.ts',
  'components/why/WhyTrustTabs.vue',
  'components/why/WhyServiceReset.vue',
  'components/why/WhyEngine.vue',
  'components/product/dgp/DgpHero.vue',
  'components/product/dgp/DgpHeroVisual.vue',
  'components/product/dgp/DgpArchitecture.vue',
  'components/product/dgp/DgpEvolutionSection.vue',
  'components/product/dgp/DgpUseCasesSection.vue',
  'components/product/dlp/DlpHero.vue',
  'components/product/dlp/DlpHeroVisual.vue',
  'components/product/dlp/heroSql.ts',
  'components/product/dlp/useDlpHeroAnimation.ts',
  'components/product/dlp/DlpArchitecture.vue',
  'components/product/dlp/DlpCapabilityTimelineSection.vue',
  'components/product/dlp/DlpAiModelingSection.vue',
  'components/product/ddp/DdpHero.vue',
  'components/product/ddp/DdpHeroVisual.vue',
  'components/product/ddp/ddpHeroSql.ts',
  'components/product/ddp/useDdpHeroAnimation.ts',
  'components/product/ddp/DdpFlowCanvas.client.vue',
  'components/product/ddp/DdpFlowNode.vue',
  'components/product/ddp/DdpArchitecture.vue',
  'components/product/ddp/DdpCapabilityTimelineSection.vue',
  'components/product/ddp/DdpUnifiedDevelopmentSection.vue',
  'components/product/dms/DmsHero.vue',
  'components/product/dms/DmsHeroVisual.vue',
  'components/product/dms/useDmsHeroAnimation.ts',
  'components/product/dms/DmsArchitecture.vue',
  'components/product/dms/DmsIntelligentRegulationSection.vue',
  'components/product/dms/DmsBusinessValueSection.vue',
  'components/product/dms/DmsRegulationProcessSection.vue',
  'components/product/tanyao/TanyaoHero.vue',
  'components/product/tanyao/TanyaoHeroVisual.vue',
  'components/product/tanyao/TanyaoSolutionSection.vue',
  'components/product/tanyao/TanyaoCapabilitySection.vue',
  'components/product/tanyao/TanyaoStatsSection.vue',
  'components/product/device-agent/DeviceAgentHero.vue',
  'components/product/device-agent/DeviceAgentHeroVisual.vue',
  'components/product/device-agent/DeviceAgentArchitectureSection.vue',
  'components/product/device-agent/DeviceAgentValueSection.vue',
  'components/product/device-agent/DeviceAgentRuntimeSection.vue',
  'components/product/device-agent/useRuntimeTimeline.ts',
  'components/product/device-agent/runtime/RuntimePanelShell.vue',
  'components/product/device-agent/runtime/RuntimeEventPanel.vue',
  'components/product/device-agent/runtime/RuntimeContextPanel.vue',
  'components/product/device-agent/runtime/RuntimeToolsPanel.vue',
  'components/product/device-agent/runtime/RuntimeSkillsPanel.vue',
  'components/product/device-agent/runtime/RuntimeGuardrailsPanel.vue',
  'components/product/device-agent/runtime/RuntimeTracePanel.vue',
]

for (const file of requiredFiles) {
  assert(existsSync(join(root, file)), `Missing required Harness file: ${file}`)
}

const tailwind = read('assets/css/tailwind.css')
const tokens = read('assets/scss/main.scss')
const componentAudit = read('doc/engineering/COMPONENT_REFINEMENT_AUDIT.md')
const packageJson = read('package.json')
const baseButton = read('components/common/BaseButton.vue')
const sectionHeading = read('components/common/SectionHeading.vue')
const sectionHeader = read('components/common/section/SectionHeader.vue')
const sectionShell = read('components/common/section/SectionShell.vue')
const baseCard = read('components/common/card/BaseCard.vue')
const iconBox = read('components/common/card/IconBox.vue')
const cardText = read('components/common/card/CardText.vue')
const cardGrid = read('components/common/card/CardGrid.vue')
const featureCard = read('components/common/card/FeatureCard.vue')
const baseTabs = read('components/common/tabs/BaseTabs.vue')
const carouselRoot = read('components/common/carousel/CarouselRoot.vue')
const carouselControls = read('components/common/carousel/CarouselControls.vue')
const pageHero = read('components/common/PageHero.vue')
const heroLogoStrip = read('components/common/HeroLogoStrip.vue')
const trustTabsSection = read('components/common/TrustTabsSection.vue')
const serviceShowcaseSection = read('components/common/ServiceShowcaseSection.vue')
const engineLinksSection = read('components/common/EngineLinksSection.vue')
const alternatingTimelineSection = read('components/common/AlternatingTimelineSection.vue')
const compatibilityGridSection = read('components/common/CompatibilityGridSection.vue')
const productFeatureGridSection = read('components/common/ProductFeatureGridSection.vue')
const productSystemSection = read('components/common/ProductSystemSection.vue')
const productSystemFlowFrame = read('components/common/ProductSystemFlowFrame.vue')
const productSystemCards = read('components/common/ProductSystemCards.vue')
const systemCards = read('components/common/SystemCards.vue')
const ctaSection = read('components/common/CtaSection.vue')
const header = read('components/navigation/SiteHeader.vue')
const headerDesktopNav = read('components/navigation/SiteHeaderDesktopNav.vue')
const headerActions = read('components/navigation/SiteHeaderActions.vue')
const headerMobileNav = read('components/navigation/SiteHeaderMobileNav.vue')
const megaMenu = read('components/navigation/MegaMenuPanel.vue')
const megaPanelServices = read('components/navigation/MegaPanelServices.vue')
const homeCta = read('components/home/HomeCta.vue')
const homeCases = read('components/home/HomeCases.vue')
const homeCaseSlide = read('components/home/HomeCaseSlide.vue')
const homeInsights = read('components/home/HomeInsights.vue')
const homeSolutions = read('components/home/HomeSolutions.vue')
const productSystem = read('components/home/HomeProductSystem.vue')
const homeProductSystemFlow = read('components/home/HomeProductSystemFlow.vue')
const homeProductSystemMobileFlow = read('components/home/HomeProductSystemMobileFlow.vue')
const ecosystem = read('components/home/HomeEcosystem.vue')
const ecosystemVisual = read('components/home/HomeEcosystemVisual.vue')
const ecosystemVisualData = read('data/ecosystemVisual.ts')
const footer = read('components/layout/SiteFooter.vue')
const footerSubscribe = read('components/layout/FooterSubscribe.vue')
const footerMain = read('components/layout/FooterMain.vue')
const footerSocials = read('components/layout/FooterSocials.vue')
const footerBottom = read('components/layout/FooterBottom.vue')
const footerData = read('data/footer.ts')
const whyData = read('data/why.ts')
const whyPage = read('pages/why-deeptrols.vue')
const whyHero = read('components/why/WhyHero.vue')
const whyHeroLogos = read('components/why/WhyHeroLogos.vue')
const whyHeroVisual = read('components/why/WhyHeroVisual.vue')
const whyHeroAnimation = read('components/why/useWhyHeroAnimation.ts')
const whyTrustTabs = read('components/why/WhyTrustTabs.vue')
const whyService = read('components/why/WhyServiceReset.vue')
const whyEngine = read('components/why/WhyEngine.vue')
const dgpData = read('data/dgp.ts')
const dgpPage = read('pages/products/data-governance.vue')
const dgpHero = read('components/product/dgp/DgpHero.vue')
const dgpHeroVisual = read('components/product/dgp/DgpHeroVisual.vue')
const dgpArchitecture = read('components/product/dgp/DgpArchitecture.vue')
const dgpEvolution = read('components/product/dgp/DgpEvolutionSection.vue')
const dgpUseCases = read('components/product/dgp/DgpUseCasesSection.vue')
const dlpData = read('data/dlp.ts')
const dlpPage = read('pages/products/data-labeling.vue')
const dlpHero = read('components/product/dlp/DlpHero.vue')
const dlpHeroVisual = read('components/product/dlp/DlpHeroVisual.vue')
const dlpHeroSql = read('components/product/dlp/heroSql.ts')
const dlpArchitecture = read('components/product/dlp/DlpArchitecture.vue')
const dlpTimeline = read('components/product/dlp/DlpCapabilityTimelineSection.vue')
const dlpAiModeling = read('components/product/dlp/DlpAiModelingSection.vue')
const ddpData = read('data/ddp.ts')
const ddpPage = read('pages/products/data-development.vue')
const ddpHero = read('components/product/ddp/DdpHero.vue')
const ddpHeroVisual = read('components/product/ddp/DdpHeroVisual.vue')
const ddpHeroSql = read('components/product/ddp/ddpHeroSql.ts')
const ddpHeroAnimation = read('components/product/ddp/useDdpHeroAnimation.ts')
const ddpFlowCanvas = read('components/product/ddp/DdpFlowCanvas.client.vue')
const ddpFlowNode = read('components/product/ddp/DdpFlowNode.vue')
const ddpArchitecture = read('components/product/ddp/DdpArchitecture.vue')
const ddpTimeline = read('components/product/ddp/DdpCapabilityTimelineSection.vue')
const ddpUnifiedDevelopment = read('components/product/ddp/DdpUnifiedDevelopmentSection.vue')
const dmsData = read('data/dms.ts')
const dmsPage = read('pages/products/data-element-regulation.vue')
const dmsHero = read('components/product/dms/DmsHero.vue')
const dmsHeroVisual = read('components/product/dms/DmsHeroVisual.vue')
const dmsHeroAnimation = read('components/product/dms/useDmsHeroAnimation.ts')
const dmsArchitecture = read('components/product/dms/DmsArchitecture.vue')
const dmsIntelligentRegulation = read('components/product/dms/DmsIntelligentRegulationSection.vue')
const dmsBusinessValue = read('components/product/dms/DmsBusinessValueSection.vue')
const dmsRegulationProcess = read('components/product/dms/DmsRegulationProcessSection.vue')
const knowledgeBase = read('pages/products/knowledge-base.vue')
const heroStatsStrip = read('components/common/HeroStatsStrip.vue')
const tanyaoData = read('data/tanyao.ts')
const tanyaoPage = read('pages/products/ai-iot.vue')
const tanyaoHero = read('components/product/tanyao/TanyaoHero.vue')
const tanyaoHeroVisual = read('components/product/tanyao/TanyaoHeroVisual.vue')
const tanyaoSolution = read('components/product/tanyao/TanyaoSolutionSection.vue')
const tanyaoCapability = read('components/product/tanyao/TanyaoCapabilitySection.vue')
const tanyaoStats = read('components/product/tanyao/TanyaoStatsSection.vue')
const deviceAgentData = read('data/device-agent.ts')
const deviceAgentPage = read('pages/products/device-agent.vue')
const deviceAgentHero = read('components/product/device-agent/DeviceAgentHero.vue')
const deviceAgentHeroVisual = read('components/product/device-agent/DeviceAgentHeroVisual.vue')
const deviceAgentArchitectureSection = read('components/product/device-agent/DeviceAgentArchitectureSection.vue')
const deviceAgentValueSection = read('components/product/device-agent/DeviceAgentValueSection.vue')
const deviceAgentRuntimeSection = read('components/product/device-agent/DeviceAgentRuntimeSection.vue')
const runtimeTimeline = read('components/product/device-agent/useRuntimeTimeline.ts')
const runtimePanelShell = read('components/product/device-agent/runtime/RuntimePanelShell.vue')
const runtimeEventPanel = read('components/product/device-agent/runtime/RuntimeEventPanel.vue')
const runtimeContextPanel = read('components/product/device-agent/runtime/RuntimeContextPanel.vue')
const runtimeToolsPanel = read('components/product/device-agent/runtime/RuntimeToolsPanel.vue')
const runtimeSkillsPanel = read('components/product/device-agent/runtime/RuntimeSkillsPanel.vue')
const runtimeGuardrailsPanel = read('components/product/device-agent/runtime/RuntimeGuardrailsPanel.vue')
const runtimeTracePanel = read('components/product/device-agent/runtime/RuntimeTracePanel.vue')

assert(tailwind.includes('@import "tailwindcss"'), 'Tailwind CSS v4 entry is missing.')
assert(tailwind.includes('@theme inline'), 'Tailwind CSS v4 theme bridge is missing.')
assert(!packageJson.includes('@tresjs/core'), 'Package still contains @tresjs/core after Hero canvas removal.')
assert(!packageJson.includes('"three"'), 'Package still contains three after Hero canvas removal.')
assert(!packageJson.includes('@types/three'), 'Package still contains @types/three after Hero canvas removal.')

for (const token of [
  '--dt-color-bg: #151515',
  '--dt-container: 80rem',
  '.dt-button',
  '.dt-tab-list',
  '.dt-tab',
  '.dt-segmented-tabs',
  '.dt-segmented-tab',
  '.dt-product-card',
  '.dt-ecosystem-card',
  '.dt-card-tag',
  '.dt-cta-panel',
]) {
  assert(tokens.includes(token), `Missing shared design token or class: ${token}`)
}

for (const token of [
  '--color-primary: var(--dt-color-primary)',
  '--color-dimmed: var(--dt-color-text-muted)',
]) {
  assert(tailwind.includes(token), `Missing Tailwind v4 color alias: ${token}`)
}
for (const utility of [
  '@utility bg-default',
  'background-color: var(--dt-color-bg)',
  '@utility border-default',
  'border-color: var(--dt-color-line)',
  '@utility text-default',
  'color: var(--dt-color-text)',
  '@utility text-muted',
  'color: var(--dt-color-text-muted)',
  '@utility text-highlighted',
  'color: var(--dt-color-text-highlighted)',
]) {
  assert(tailwind.includes(utility), `Missing Tailwind semantic utility: ${utility}`)
}

assert(baseButton.includes('data-slot="base"'), 'BaseButton must own data-slot="base".')
assert(baseButton.includes('data-slot="label"'), 'BaseButton must own data-slot="label".')
assert(baseButton.includes('data-slot="trailingIcon"'), 'BaseButton must own data-slot="trailingIcon".')
assert(componentAudit.includes('SectionHeader') && componentAudit.includes('BaseCard') && componentAudit.includes('BaseTabs'), 'Component refinement audit must document the extracted component baseline.')
assert(sectionHeading.includes('titleId'), 'SectionHeading must support titleId for aria-labelledby.')
assert(sectionHeading.includes('nowrapSubtitle'), 'SectionHeading must support nowrapSubtitle.')
assert(sectionHeading.includes('SectionHeader'), 'SectionHeading must stay as a compatibility wrapper around SectionHeader.')
assert(sectionHeader.includes("align?: 'left' | 'center' | 'right'"), 'SectionHeader must support left, center, and right alignment.')
assert(sectionHeader.includes('level?: 1 | 2 | 3'), 'SectionHeader must support semantic heading levels.')
assert(sectionHeader.includes('slots.actions'), 'SectionHeader must support an actions slot.')
assert(sectionHeader.includes('section-heading--nowrap-subtitle'), 'SectionHeader nowrap mode must expose a desktop-wide wrapper class.')
assert(sectionHeader.includes('max-width: none'), 'SectionHeader nowrap mode must remove the desktop max-width limit.')
assert(sectionHeader.includes('class="section-heading dt-section-heading"'), 'SectionHeader must own the canonical section heading classes.')
assert(sectionShell.includes('pb-32 lg:pb-44') && sectionShell.includes('container') && sectionShell.includes('max-w-[96rem]'), 'SectionShell must centralize section spacing and container widths.')
assert(baseCard.includes('NuxtLink') && baseCard.includes('dt-card--adaptive') && baseCard.includes('dt-card__accent'), 'BaseCard must centralize card shell, link semantics, accent, and adaptive height.')
assert(iconBox.includes('dt-icon-box') && iconBox.includes('dt-icon-box--gradient'), 'IconBox must centralize icon shell classes and gradient tone.')
assert(
  iconBox.includes('bordered?: boolean') &&
    iconBox.includes('filled?: boolean') &&
    iconBox.includes('icon-box--borderless') &&
    iconBox.includes('icon-box--unfilled') &&
    featureCard.includes(':bordered="iconBordered"') &&
    featureCard.includes(':filled="iconFilled"') &&
    productFeatureGridSection.includes(':icon-bordered="iconBordered"') &&
    productFeatureGridSection.includes(':icon-filled="iconFilled"'),
  'IconBox must expose configurable border and fill options passed through FeatureCard and ProductFeatureGridSection.',
)
assert(
  iconBox.includes("tone?: 'primary' | 'muted' | 'white' | 'gradient' | 'soft'") &&
    iconBox.includes('icon-box--tone-soft') &&
    iconBox.includes('color-mix(in oklab, var(--dt-color-bg-soft) 50%, transparent)'),
  'IconBox must provide primary, muted, white, gradient, and soft tones, with soft reproducing the bg-soft/50 + line ring shell.',
)
assert(cardText.includes('card-text__title') && cardText.includes('card-text__description'), 'CardText must centralize card title and description typography.')
assert(cardGrid.includes('auto-rows-fr items-stretch') && cardGrid.includes('md:grid-cols-2 lg:grid-cols-4'), 'CardGrid must centralize equal-height responsive card grids.')
assert(cardGrid.includes('md:grid-cols-3') && productFeatureGridSection.includes("columns?: 'two' | 'three' | 'four'"), 'ProductFeatureGridSection must support two, three, and four column product feature grids.')
assert(featureCard.includes('BaseCard') && featureCard.includes('IconBox') && featureCard.includes('CardText'), 'FeatureCard must compose the base card, icon, and text atoms.')
assert(
  featureCard.includes('iconLabel?: string') &&
    productFeatureGridSection.includes(':icon-label="item.iconLabel"') &&
    productFeatureGridSection.includes('<slot name="after" />') &&
    productFeatureGridSection.includes('<slot name="before" />'),
  'FeatureCard and ProductFeatureGridSection must support numbered icon labels plus before/after slot composition.',
)
assert(
  alternatingTimelineSection.includes('SectionHeader') &&
    alternatingTimelineSection.includes('lg:left-1/2') &&
    alternatingTimelineSection.includes('space-y-[4.5rem]') &&
    alternatingTimelineSection.includes('class="py-4 lg:py-8"') &&
    alternatingTimelineSection.includes('role="img"') &&
    alternatingTimelineSection.includes('图片占位符') &&
    !alternatingTimelineSection.includes('BaseCard') &&
    !alternatingTimelineSection.includes('IconBox') &&
    !alternatingTimelineSection.includes('<style'),
  'AlternatingTimelineSection must centralize the EMQX Edge-like Tailwind-only numbered timeline without cards or icons.',
)
assert(
  compatibilityGridSection.includes('SectionHeader') &&
    compatibilityGridSection.includes('CardGrid') &&
    compatibilityGridSection.includes('columns="three"') &&
    compatibilityGridSection.includes('IconBox') &&
    compatibilityGridSection.includes('export interface CompatibilityGridCategory') &&
    compatibilityGridSection.includes('uppercase tracking-wider') &&
    !compatibilityGridSection.includes('<style'),
  'CompatibilityGridSection must centralize the EMQX tables-like three-column categorized icon grid with IconBox and SectionHeader.',
)
assert(
  knowledgeBase.includes('CompatibilityGridSection') &&
    knowledgeBase.includes('boyaoCompatibilityCategories') &&
    knowledgeBase.includes('国产化适配') &&
    knowledgeBase.indexOf('<BoyaoIntegrationSection') < knowledgeBase.indexOf('<CompatibilityGridSection'),
  'Knowledge base page must render the xinchuang compatibility grid below the integration section.',
)
assert(
  heroStatsStrip.includes('columns?: 3 | 4') &&
    heroStatsStrip.includes('grid-cols-2 sm:grid-cols-4') &&
    heroStatsStrip.includes('grid-cols-3') &&
    heroStatsStrip.includes("placement?: 'hero' | 'section'") &&
    heroStatsStrip.includes('mx-auto mt-8 max-w-2xl lg:mx-0') &&
    heroStatsStrip.includes('rounded-xl border border-default bg-dt-bg-soft/50 px-4 py-4 text-center backdrop-blur-sm') &&
    heroStatsStrip.includes('text-2xl font-semibold text-highlighted lg:text-3xl') &&
    heroStatsStrip.includes('mt-1 text-xs text-muted lg:text-sm'),
  'HeroStatsStrip must support three and four column strips plus hero and standalone section placement with the larger section typography.',
)
assert(
  alternatingTimelineSection.includes('v-if="item.bullets.length"'),
  'AlternatingTimelineSection must hide the bullet list when a timeline item has no bullets.',
)
assert(
  pageHero.includes('flushVisualEnd?: boolean') &&
    pageHero.includes("flushVisualEnd ? 'lg:-mr-4 lg:justify-self-end' : ''"),
  'PageHero must support flushVisualEnd to cancel the container right padding for the hero visual.',
)
assert(
  pageHero.includes("align?: 'left' | 'center'") &&
    pageHero.includes("align: 'left',") &&
    pageHero.includes("align === 'center' ? 'max-w-4xl' : 'max-w-2xl lg:self-center lg:text-left'") &&
    pageHero.includes("align === 'center' ? 'lg:flex lg:justify-center' : ''") &&
    pageHero.includes("align === 'center' ? '' : 'lg:justify-start'") &&
    pageHero.includes("v-if=\"align !== 'center'\" class=\"page-hero__visual-glow\""),
  'PageHero must support the centered align variant (centered content, description, actions, visual and no visual glow) used by the Device Agent hero.',
)
assert(
  tanyaoHeroVisual.includes('viewBox="0 0 560 560"') &&
    tanyaoHeroVisual.includes('tanyaoFlowGradientUp') &&
    tanyaoHeroVisual.includes('tanyaoFlowGradientDown') &&
    tanyaoHeroVisual.includes('stroke-dashoffset') &&
    tanyaoHeroVisual.includes('IconBox') &&
    tanyaoHeroVisual.includes('tone="soft"') &&
    tanyaoHeroVisual.includes('探曜AIoT') &&
    tanyaoHeroVisual.includes('智能物联底座') &&
    tanyaoHeroVisual.includes('链接生态') &&
    tanyaoHeroVisual.includes('DeepSeek') &&
    tanyaoHeroVisual.includes('千问') &&
    tanyaoHeroVisual.includes('智谱') &&
    tanyaoHeroVisual.includes('Kimi') &&
    tanyaoHeroVisual.includes('探曜 Edge') &&
    tanyaoHeroVisual.includes('设备接入') &&
    tanyaoHeroVisual.includes('边缘计算') &&
    tanyaoHeroVisual.includes('策略执行') &&
    tanyaoHeroVisual.includes('Node-RED') &&
    tanyaoHeroVisual.includes('Neuron') &&
    tanyaoHeroVisual.includes('grid-cols-5') &&
    tanyaoHeroVisual.includes('工业设备') &&
    tanyaoHeroVisual.includes('传感器') &&
    tanyaoHeroVisual.includes('能源设备') &&
    tanyaoHeroVisual.includes('PLC') &&
    tanyaoHeroVisual.includes('摄像头') &&
    tanyaoHeroVisual.includes('h-[600px]') &&
    tanyaoHeroVisual.includes('top-[18px]') &&
    tanyaoHeroVisual.includes('top-[208px]') &&
    tanyaoHeroVisual.includes('bottom-[46px]') &&
    tanyaoHeroVisual.includes('rounded-[24px]') &&
    tanyaoHeroVisual.includes('rounded-[32px]') &&
    !tanyaoHeroVisual.includes('<style'),
  'TanyaoHeroVisual must replicate the EMQX Edge three-layer hero visual with IconBox logos, the expanded AI ecosystem / edge runtime / device tiles, boyao-aligned card radii, and Tailwind-only styles.',
)
assert(
  tanyaoHero.includes('PageHero') &&
    tanyaoHero.includes('badge="探曜·AI物联感知平台"') &&
    tanyaoHero.includes('title-line="连接、感知、智能"') &&
    tanyaoHero.includes('title-gradient="AIoT智能物联底座"') &&
    tanyaoHero.includes('visual-label="TANYAOIOT_HORE_WEBM"') &&
    tanyaoHero.includes('flush-bottom') &&
    !tanyaoHero.includes('flush-visual-end') &&
    !tanyaoHero.includes('HeroStatsStrip'),
  'TanyaoHero must compose the shared PageHero with the requirement copy and a flush-bottom rhythm, and must align the visual right edge the boyao way (ml-auto canvas, no flush-visual-end); the stats strip lives in its own section.',
)
assert(
  tanyaoStats.includes('HeroStatsStrip') &&
    tanyaoStats.includes('tanyaoHeroStats') &&
    tanyaoStats.includes(':columns="4"') &&
    tanyaoStats.includes('placement="section"') &&
    tanyaoStats.includes('container') &&
    !tanyaoStats.includes('<style'),
  'TanyaoStatsSection must render the 1x4 HeroStatsStrip as a standalone section below the flush-bottom hero.',
)
assert(
  tanyaoSolution.includes('ProductSystemSection') &&
    tanyaoSolution.includes('ProductSystemFlowFrame') &&
    tanyaoSolution.includes('SystemCards') &&
    tanyaoSolution.includes('tanyaoSolutionCards') &&
    tanyaoSolution.includes('eyebrow="解决方案"') &&
    tanyaoSolution.includes('fallback-text="解决方案流程图占位符"') &&
    !tanyaoSolution.includes('<style'),
  'TanyaoSolutionSection must combine ProductSystemSection with SystemCards and a flow frame placeholder.',
)
assert(
  tanyaoCapability.includes('AlternatingTimelineSection') &&
    tanyaoCapability.includes('tanyaoTimelineItems') &&
    tanyaoCapability.includes('eyebrow="核心能力"') &&
    tanyaoCapability.includes('title-id="tanyao-capability-title"') &&
    !tanyaoCapability.includes('<style'),
  'TanyaoCapabilitySection must reuse the shared AlternatingTimelineSection for the six core capabilities.',
)
assert(
  tanyaoPage.includes('SiteHeader') &&
    tanyaoPage.includes('SiteFooter') &&
    tanyaoPage.includes('eyebrow="挑战"') &&
    tanyaoPage.includes('eyebrow="Device Agent"') &&
    tanyaoPage.includes('columns="three"') &&
    tanyaoPage.includes('title-id="tanyao-cta-title"') &&
    tanyaoPage.indexOf('<TanyaoHero') < tanyaoPage.indexOf('<TanyaoStatsSection') &&
    tanyaoPage.indexOf('<TanyaoStatsSection') < tanyaoPage.indexOf('tanyao-challenge-title') &&
    tanyaoPage.indexOf('tanyao-challenge-title') < tanyaoPage.indexOf('<TanyaoSolutionSection') &&
    tanyaoPage.indexOf('<TanyaoSolutionSection') < tanyaoPage.indexOf('<TanyaoCapabilitySection') &&
    tanyaoPage.indexOf('<TanyaoCapabilitySection') < tanyaoPage.indexOf('tanyao-agent-title') &&
    tanyaoPage.indexOf('tanyao-agent-title') < tanyaoPage.indexOf('<CtaSection'),
  'The ai-iot page must assemble hero, stats section, challenges, solution, capabilities, Device Agent grid, and CTA in order.',
)
assert(
  tanyaoData.includes('export const tanyaoHeroStats: HeroStatItem[]') &&
    tanyaoData.includes('export const tanyaoChallenges: ProductFeatureGridItem[]') &&
    tanyaoData.includes('export const tanyaoSolutionCards: SystemCard[]') &&
    tanyaoData.includes('export const tanyaoTimelineItems: AlternatingTimelineItem[]') &&
    tanyaoData.includes('export const tanyaoAgents: ProductFeatureGridItem[]') &&
    tanyaoData.includes('tanyaoIotLogo') &&
    tanyaoData.includes('deepseekLogo') &&
    tanyaoData.includes('qwenLogo') &&
    tanyaoData.includes('zhipuLogo') &&
    tanyaoData.includes('kimiLogo'),
  'data/tanyao.ts must centralize the TANYAO page content with typed exports and all ecosystem logo assets.',
)
assert(
  deviceAgentHeroVisual.includes('relative mt-10 w-full max-w-[860px]') &&
    deviceAgentHeroVisual.includes(
      'pointer-events-none absolute -inset-x-12 -bottom-4 -top-8 -z-0 rounded-[3rem] bg-primary/8 blur-3xl lg:-inset-x-24',
    ) &&
    deviceAgentHeroVisual.includes(
      'relative overflow-hidden rounded-2xl border border-primary/20 bg-elevated shadow-lg transition-shadow',
    ) &&
    deviceAgentHeroVisual.includes('relative min-h-[140px] px-5 pt-5 pb-3') &&
    deviceAgentHeroVisual.includes(
      'pointer-events-none absolute inset-x-5 top-5 text-left text-base leading-relaxed text-muted sm:text-lg',
    ) &&
    deviceAgentHeroVisual.includes('ml-[2px] inline-block h-[1em] w-[1.5px] animate-pulse bg-primary align-baseline') &&
    deviceAgentHeroVisual.includes('aria-label="Agent 编排器"') &&
    deviceAgentHeroVisual.includes('rows="3"') &&
    deviceAgentHeroVisual.includes(
      'relative w-full resize-none bg-transparent text-base leading-relaxed text-highlighted outline-none sm:text-lg',
    ) &&
    deviceAgentHeroVisual.includes(
      'flex items-center justify-between gap-3 border-t border-primary/15 bg-dt-bg-soft/30 px-3 py-2.5',
    ) &&
    deviceAgentHeroVisual.includes(
      'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors',
    ) &&
    deviceAgentHeroVisual.includes('border-primary/30 bg-primary/10 text-primary') &&
    deviceAgentHeroVisual.includes('border-default bg-dt-bg/70 text-muted hover:bg-dt-bg-soft/50 hover:text-highlighted') &&
    deviceAgentHeroVisual.includes('aria-label="发送"') &&
    deviceAgentHeroVisual.includes('ArrowUp') &&
    deviceAgentHeroVisual.includes('aria-pressed') &&
    deviceAgentHeroVisual.includes('deviceAgentScenes') &&
    deviceAgentHeroVisual.includes('onMounted') &&
    deviceAgentHeroVisual.includes('onBeforeUnmount') &&
    !deviceAgentHeroVisual.includes('<style'),
  'DeviceAgentHeroVisual must replicate the EMQX Agents orchestrator panel (glow, panel, ghost typing overlay with pulsing cursor, scene buttons, send button) Tailwind-only with SSR-safe timers.',
)
assert(
  deviceAgentHero.includes('PageHero') &&
    deviceAgentHero.includes('align="center"') &&
    deviceAgentHero.includes('badge="Device Agent"') &&
    deviceAgentHero.includes('title-line="让Agent基于实时数据决策与行动"') &&
    deviceAgentHero.includes('title-gradient="串联事件、记忆、执行和决策"') &&
    deviceAgentHero.includes('visual-label="DEVICEAGENT_HORE_WEBM"') &&
    deviceAgentHero.includes(':actions="[]"') &&
    deviceAgentHero.includes('Cpu'),
  'DeviceAgentHero must compose the shared PageHero centered variant with the requirement copy and no hero actions.',
)
assert(
  deviceAgentPage.includes('SiteHeader') &&
    deviceAgentPage.includes('SiteFooter') &&
    deviceAgentPage.includes('<DeviceAgentHero') &&
    deviceAgentPage.includes('eyebrow="智能体生态"') &&
    deviceAgentPage.includes('title-id="device-agent-ecosystem-title"') &&
    deviceAgentPage.includes(':items="tanyaoAgents"') &&
    deviceAgentPage.includes('columns="three"') &&
    deviceAgentPage.includes('<DeviceAgentArchitectureSection') &&
    deviceAgentPage.includes('<DeviceAgentValueSection') &&
    deviceAgentPage.includes('<DeviceAgentRuntimeSection') &&
    deviceAgentPage.indexOf('<DeviceAgentHero') < deviceAgentPage.indexOf('device-agent-ecosystem-title') &&
    deviceAgentPage.indexOf('device-agent-ecosystem-title') < deviceAgentPage.indexOf('<DeviceAgentArchitectureSection') &&
    deviceAgentPage.indexOf('<DeviceAgentArchitectureSection') < deviceAgentPage.indexOf('<DeviceAgentValueSection') &&
    deviceAgentPage.indexOf('<DeviceAgentValueSection') < deviceAgentPage.indexOf('<DeviceAgentRuntimeSection'),
  'The device-agent page must assemble hero, ecosystem grid, architecture, core value, and runtime sections in order.',
)
assert(
  deviceAgentData.includes('export interface DeviceAgentScene') &&
    deviceAgentData.includes('export const deviceAgentScenes: DeviceAgentScene[]') &&
    deviceAgentData.includes('事件预警') &&
    deviceAgentData.includes('事件处置') &&
    deviceAgentData.includes('工单派发') &&
    deviceAgentData.includes('预测维护') &&
    deviceAgentData.includes('周报汇总') &&
    deviceAgentData.includes('智能问数') &&
    deviceAgentData.includes('温度超过 85℃'),
  'data/device-agent.ts must centralize the six orchestrator scenes with typed exports.',
)
assert(
  deviceAgentArchitectureSection.includes('ProductSystemSection') &&
    deviceAgentArchitectureSection.includes('eyebrow="智能体架构"') &&
    deviceAgentArchitectureSection.includes('title="从设备模型，到真正会行动的 Agent"') &&
    deviceAgentArchitectureSection.includes('title-id="device-agent-architecture-title"') &&
    deviceAgentArchitectureSection.includes('ProductSystemFlowFrame') &&
    deviceAgentArchitectureSection.includes('label="Device Agent 智能体架构图占位"') &&
    !deviceAgentArchitectureSection.includes('<style'),
  'The device-agent architecture section must reuse ProductSystemSection with a ProductSystemFlowFrame placeholder (no flow yet) and stay Tailwind-only.',
)
assert(
  deviceAgentValueSection.includes('ProductFeatureGridSection') &&
    deviceAgentValueSection.includes('eyebrow="核心价值"') &&
    deviceAgentValueSection.includes('title="Device Agent解决的三个关键问题"') &&
    deviceAgentValueSection.includes('title-id="device-agent-value-title"') &&
    deviceAgentValueSection.includes(':items="deviceAgentValueItems"') &&
    deviceAgentValueSection.includes('columns="three"') &&
    deviceAgentValueSection.includes(':icon-bordered="false"'),
  'The device-agent core value section must render three borderless numeric-icon cards via ProductFeatureGridSection.',
)
assert(
  featureCard.includes('feature-card__icon-label--borderless') &&
    featureCard.includes('feature-card__icon-label--unfilled') &&
    featureCard.includes('--dt-icon-box-shadow: none') &&
    featureCard.includes('--dt-icon-box-bg: transparent'),
  'FeatureCard numeric icon labels must honor iconBordered/iconFilled via icon-box CSS variables.',
)
assert(
  deviceAgentRuntimeSection.includes('title-id="device-agent-runtime-title"') &&
    deviceAgentRuntimeSection.includes('eyebrow="核心能力"') &&
    deviceAgentRuntimeSection.includes('title="为设备事件而生的 Agent Runtime"') &&
    deviceAgentRuntimeSection.includes('grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-10') &&
    deviceAgentRuntimeSection.includes('deviceAgentRuntimeTabs') &&
    deviceAgentRuntimeSection.includes('aria-pressed') &&
    deviceAgentRuntimeSection.includes('border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5') &&
    deviceAgentRuntimeSection.includes('border-transparent bg-transparent hover:bg-dt-bg-soft/50') &&
    deviceAgentRuntimeSection.includes('absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-300') &&
    deviceAgentRuntimeSection.includes('bg-primary/15 text-primary') &&
    deviceAgentRuntimeSection.includes('bg-dt-bg-soft/60 text-muted group-hover:text-highlighted') &&
    deviceAgentRuntimeSection.includes('group-hover:translate-x-0 group-hover:opacity-40') &&
    deviceAgentRuntimeSection.includes('ChevronRight') &&
    deviceAgentRuntimeSection.includes(':key="active?.id"') &&
    !deviceAgentRuntimeSection.includes('<style'),
  'DeviceAgentRuntimeSection must replicate the EMQX agents left-tab layout (active bar, gradient, hover arrow) with keyed panel switching, Tailwind-only.',
)
assert(
  runtimePanelShell.includes('animate-panel-in') &&
    runtimePanelShell.includes(
      'relative flex h-[520px] flex-col overflow-hidden rounded-2xl border border-dt-line-strong/60 bg-dt-bg-soft/30 sm:h-[480px] lg:h-[460px]',
    ) &&
    runtimePanelShell.includes('flex min-h-0 flex-1 flex-col rounded-xl border border-dt-line-strong/60 bg-dt-bg p-4') &&
    runtimePanelShell.includes('rounded bg-dt-bg-soft/40 px-2 py-0.5 text-[10px] font-medium text-muted') &&
    runtimePanelShell.includes('v-if="$slots.footer"') &&
    runtimePanelShell.includes('relative border-t border-dt-line-strong/40 px-5 py-4') &&
    runtimePanelShell.includes('<slot name="footer" />') &&
    !runtimePanelShell.includes('<style'),
  'RuntimePanelShell must keep the reference fixed-height muted container with an inner default card, status badge, and optional footer slot, Tailwind-only.',
)
assert(
  tailwind.includes('--animate-panel-in: panel-in 0.32s ease-out both') &&
    tailwind.includes('@keyframes panel-in'),
  'tailwind.css must define the runtime panel entry animation token.',
)
assert(
  runtimeTimeline.includes('export function useRuntimeTimeline') &&
    runtimeTimeline.includes('requestAnimationFrame') &&
    runtimeTimeline.includes('onMounted') &&
    runtimeTimeline.includes('onBeforeUnmount') &&
    runtimeTimeline.includes('import.meta.client') &&
    runtimeTimeline.includes('RUNTIME_BAR_WIDTH_CLASSES') &&
    runtimeTimeline.includes("w-[100%]") &&
    runtimeTimeline.includes('export const RUNTIME_LOOP_HOLD_MS') &&
    runtimeTimeline.includes('(now - startedAt) % cycleMs'),
  'useRuntimeTimeline must be an SSR-safe rAF timeline with literal Tailwind width classes and a looping playback cycle.',
)
assert(
  runtimeEventPanel.includes('title="事件触发器"') &&
    runtimeEventPanel.includes('badge="监听中"') &&
    runtimeEventPanel.includes('DEVICE AGENT') &&
    runtimeEventPanel.includes('等待事件') &&
    runtimeEventPanel.includes('事件已触发') &&
    runtimeEventPanel.includes('事件校验') &&
    runtimeEventPanel.includes('事件去重') &&
    runtimeEventPanel.includes('上下文构建') &&
    runtimeEventPanel.includes('61.8°C') &&
    runtimeEventPanel.includes('让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。') &&
    !runtimeEventPanel.includes('<style'),
  'The event trigger panel must animate the four ESS-01 event sources into the Device Agent runtime with the validation pipeline.',
)
assert(
  runtimeEventPanel.includes('rounded-xl border border-primary/20 bg-primary/5 p-3') &&
    runtimeEventPanel.includes('animate-ping') &&
    runtimeEventPanel.includes('truncate font-mono text-base font-semibold text-highlighted') &&
    runtimeEventPanel.includes("triggered ? '事件已触发' : '等待事件'") &&
    runtimeEventPanel.includes('h-1.5 flex-1 rounded-full transition-colors duration-200') &&
    runtimeEventPanel.includes("index < activeBars ? 'bg-primary' : 'bg-dt-bg-soft'") &&
    runtimeEventPanel.includes('rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5') &&
    runtimeEventPanel.includes('mt-1.5 flex items-stretch gap-1') &&
    runtimeEventPanel.includes('验证来源与事件结构') &&
    runtimeEventPanel.includes('过滤短时重复事件') &&
    runtimeEventPanel.includes('关联设备与历史上下文') &&
    runtimeEventPanel.includes('校验通过') &&
    runtimeEventPanel.includes('去重完成') &&
    runtimeEventPanel.includes('构建中...') &&
    runtimeEventPanel.includes('BadgeCheck') &&
    runtimeEventPanel.includes('CopyCheck') &&
    runtimeEventPanel.includes('Database') &&
    runtimeEventPanel.includes('ArrowRight') &&
    runtimeEventPanel.includes('animate-pulse') &&
    runtimeEventPanel.includes("import IconBox from '~/components/common/card/IconBox.vue'") &&
    runtimeEventPanel.includes("stepState(index) === 'pending' ? 'soft' : 'primary'") &&
    runtimeEventPanel.includes('truncate text-sm font-semibold text-highlighted') &&
    runtimeEventPanel.includes('mt-1 hidden truncate text-xs leading-5 text-muted xl:block') &&
    runtimeEventPanel.includes('flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg border p-2.5 transition-colors duration-500 xl:flex-row xl:items-center xl:gap-2.5') &&
    runtimeEventPanel.includes('<template #footer>') &&
    runtimeEventPanel.includes('max-w-xl text-sm text-muted lg:line-clamp-2') &&
    !runtimeEventPanel.includes('<style'),
  'The event trigger panel must follow the EMQX reference: primary DEVICE AGENT status card, four event progress bars, three always-visible horizontal pipeline state cards, and the caption in the shell footer.',
)
assert(
  runtimeContextPanel.includes('title="设备上下文"') &&
    runtimeContextPanel.includes('badge="正在构建"') &&
    runtimeContextPanel.includes('上下文引擎') &&
    runtimeContextPanel.includes('设备上下文') &&
    runtimeContextPanel.includes('知识参考') &&
    runtimeContextPanel.includes('上下文已就绪 · 1.2 秒') &&
    runtimeContextPanel.includes('+45.1%') &&
    !runtimeContextPanel.includes('<style'),
  'The context panel must fuse realtime, history, status, and knowledge sources into the ESS-01 device context.',
)
assert(
  runtimeToolsPanel.includes('title="MCP 工具"') &&
    runtimeToolsPanel.includes('badge="6 个可用"') &&
    runtimeToolsPanel.includes('device.execute_command') &&
    runtimeToolsPanel.includes('timeseries.query') &&
    runtimeToolsPanel.includes('knowledge.search') &&
    runtimeToolsPanel.includes('workorder.create') &&
    runtimeToolsPanel.includes('Agent 判断') &&
    runtimeToolsPanel.includes('下一步动作') &&
    runtimeToolsPanel.includes('创建储能运维工单') &&
    !runtimeToolsPanel.includes('<style'),
  'The MCP tools panel must show the ESS-01 reasoning loop across device, data, and business tools.',
)
assert(
  runtimeSkillsPanel.includes('title="Skills"') &&
    runtimeSkillsPanel.includes('badge="按需加载"') &&
    runtimeSkillsPanel.includes('正在匹配 Skills...') &&
    runtimeSkillsPanel.includes('getRuntimeBarWidthClass') &&
    runtimeSkillsPanel.includes('告警分诊') &&
    runtimeSkillsPanel.includes('热异常诊断') &&
    runtimeSkillsPanel.includes('工单派发') &&
    runtimeSkillsPanel.includes('热异常分析') &&
    runtimeSkillsPanel.includes('处置决策') &&
    runtimeSkillsPanel.includes('已挂载 3 个 Skills · 就绪') &&
    !runtimeSkillsPanel.includes('<style'),
  'The skills panel must animate on-demand matching progress into a mounted execution chain.',
)
assert(
  runtimeGuardrailsPanel.includes('title="安全执行"') &&
    runtimeGuardrailsPanel.includes('badge="护栏已启用"') &&
    runtimeGuardrailsPanel.includes('device.execute_command') &&
    runtimeGuardrailsPanel.includes('权限检查') &&
    runtimeGuardrailsPanel.includes('设备范围检查') &&
    runtimeGuardrailsPanel.includes('参数校验') &&
    runtimeGuardrailsPanel.includes('安全策略检查') &&
    runtimeGuardrailsPanel.includes('中风险') &&
    runtimeGuardrailsPanel.includes('需要人工审批') &&
    runtimeGuardrailsPanel.includes('批准') &&
    runtimeGuardrailsPanel.includes('拒绝') &&
    runtimeGuardrailsPanel.includes('执行确认') &&
    !runtimeGuardrailsPanel.includes('<style'),
  'The guardrails panel must show the approval-gated execution from proposal to device confirmation.',
)
assert(
  runtimeTracePanel.includes('title="运行 Trace"') &&
    runtimeTracePanel.includes('badge="采集中"') &&
    runtimeTracePanel.includes('deviceAgentTraceSteps') &&
    runtimeTracePanel.includes('重放本次运行') &&
    runtimeTracePanel.includes('restart') &&
    runtimeTracePanel.includes('耗时') &&
    runtimeTracePanel.includes('工具调用') &&
    runtimeTracePanel.includes('Skills') &&
    !runtimeTracePanel.includes('<style'),
  'The trace panel must replay the full ESS-01 runtime trace with live stats and a replay control.',
)
assert(
  deviceAgentData.includes('export interface DeviceAgentValueItem') &&
    deviceAgentData.includes('export const deviceAgentValueItems: DeviceAgentValueItem[]') &&
    deviceAgentData.includes('设备事件无法直接驱动 AI') &&
    deviceAgentData.includes('AI 能判断，但无法形成执行闭环') &&
    deviceAgentData.includes('通用 Agent 难以适配工业场景') &&
    deviceAgentData.includes('MQTT 消息原生触发') &&
    deviceAgentData.includes('export interface DeviceAgentRuntimeTab') &&
    deviceAgentData.includes('export const deviceAgentRuntimeTabs: DeviceAgentRuntimeTab[]') &&
    deviceAgentData.includes('多源事件触发') &&
    deviceAgentData.includes('设备上下文融合') &&
    deviceAgentData.includes('MCP 工具连接') &&
    deviceAgentData.includes('Skills 按需挂载') &&
    deviceAgentData.includes('安全执行护栏') &&
    deviceAgentData.includes('全链路可观测') &&
    deviceAgentData.includes('export interface DeviceAgentTraceStep') &&
    deviceAgentData.includes('export const deviceAgentTraceSteps: DeviceAgentTraceStep[]') &&
    deviceAgentData.includes('WO-20260814-018') &&
    deviceAgentData.includes('10:24:12.031') &&
    deviceAgentData.includes('10:24:20.419'),
  'data/device-agent.ts must centralize core value items, runtime capability tabs, and trace steps with typed exports.',
)
assert(
  baseTabs.includes('role="tablist"') &&
    baseTabs.includes('role="tab"') &&
    baseTabs.includes('dt-tab-list') &&
    baseTabs.includes('dt-segmented-tabs') &&
    baseTabs.includes("variant === 'underline'") &&
    baseTabs.includes('handleKeydown'),
  'BaseTabs must centralize ARIA, keyboard behavior, and pill/segmented/underline variants.',
)
assert(carouselRoot.includes('role="region"') && carouselRoot.includes('data-active-slide') && !carouselRoot.includes(':style'), 'CarouselRoot must centralize carousel semantics without inline style attributes.')
assert(carouselRoot.includes('--dt-carousel-align') && carouselRoot.includes('--dt-carousel-gutter'), 'CarouselRoot must expose align and gutter CSS variable hooks for host pages.')
assert(carouselControls.includes('previousLabel') && carouselControls.includes('nextLabel') && carouselControls.includes('ChevronLeft') && carouselControls.includes('ChevronRight'), 'CarouselControls must centralize previous/next control semantics.')
assert(carouselControls.includes('dt-icon-button'), 'CarouselControls must reuse the shared dt-icon-button baseline.')
assert(
  tokens.includes('--dt-card-radius: var(--dt-radius-lg)') &&
    tokens.includes('--dt-icon-box-radius: var(--dt-radius-md)') &&
    tokens.includes('.dt-card') &&
    tokens.includes('.dt-card--adaptive') &&
    tokens.includes('.dt-card--feature') &&
    tokens.includes('.dt-card--soft'),
  'Shared card radius, hover, and adaptive height must be defined globally.',
)
assert(tokens.includes('.dt-icon-box') && tokens.includes('border-radius: var(--dt-icon-box-radius)'), 'Shared icon boxes must use the global DGP rounded-xl radius baseline.')
assert(tokens.includes('.dt-product-card') && tokens.includes('border-radius: var(--dt-card-radius)'), 'Shared product cards must use the global DGP rounded-2xl radius baseline.')
assert(!tokens.includes('min-height: 280px'), 'Shared ecosystem cards must not define a fixed minimum height.')

for (const [name, source] of [
  ['CtaSection', ctaSection],
  ['HomeCases', homeCases],
  ['HomeInsights', homeInsights],
  ['HomeSolutions', homeSolutions],
]) {
  assert(source.includes('BaseButton'), `${name} must reuse BaseButton for CTA/action buttons.`)
}

assert(homeCases.includes('SectionHeading'), 'HomeCases must reuse SectionHeading.')
assert(
  homeCases.includes('HomeCaseSlide') && homeCases.includes('CarouselRoot') && homeCases.includes('CarouselControls'),
  'HomeCases must compose slides and controls through the shared CarouselRoot/CarouselControls components.',
)
assert(!homeCases.includes('cases__track') && !homeCases.includes('HomeCasesControls'), 'HomeCases must not hand-roll carousel tracks or private control components.')
assert(!existsSync(join(root, 'components/home/HomeCasesControls.vue')), 'HomeCasesControls must stay replaced by the shared CarouselControls component.')
assert(homeCaseSlide.includes('BaseButton') && homeCaseSlide.includes('阅读案例'), 'HomeCaseSlide must reuse BaseButton for story CTAs.')
assert(homeInsights.includes('SectionHeading'), 'HomeInsights must reuse SectionHeading.')
assert(homeSolutions.includes('BaseTabs') && homeSolutions.includes('solutionTabs') && homeSolutions.includes('variant="pill"'), 'HomeSolutions must compose the shared BaseTabs pill variant.')
assert(homeSolutions.includes('CarouselRoot') && !homeSolutions.includes('solutions__carousel-container'), 'HomeSolutions must render slides through the shared CarouselRoot component without hand-rolled tracks.')
assert(baseTabs.includes('dt-tab-list') && baseTabs.includes('dt-tab'), 'BaseTabs must own shared dt-tab classes.')
assert(
  productSystem.includes('ProductSystemSection') &&
    productSystem.includes('HomeProductSystemFlow') &&
    productSystem.includes('HomeProductSystemMobileFlow') &&
    productSystem.includes('ProductSystemCards'),
  'HomeProductSystem must compose the shared section, flow, mobile flow, and card components.',
)
assert(
  productSystemSection.includes('SectionShell') &&
    productSystemSection.includes('SectionHeader') &&
    productSystemSection.includes('subtitle-size="large"') &&
    productSystemSection.includes('product-system__content') &&
    !productSystemSection.includes('role="img"') &&
    !productSystemSection.includes('product-system__mobile-flow') &&
    !productSystemSection.includes('v-for="card in cards"') &&
    !productSystemSection.includes('flowFallbackText') &&
    !productSystemSection.includes('EnterpriseFlow'),
  'ProductSystemSection must only own the shared section background, layout, and typography.',
)
assert(
  homeProductSystemFlow.includes('ProductSystemFlowFrame') &&
    homeProductSystemFlow.includes('shouldRenderFlow') &&
    homeProductSystemFlow.includes('<EnterpriseFlow v-if="shouldRenderFlow" />') &&
    productSystemFlowFrame.includes('role="img"') &&
    productSystemFlowFrame.includes('height: 560px') &&
    productSystemFlowFrame.includes('rgba(148, 163, 184, 0.12) 1px') &&
    productSystemFlowFrame.includes('background-size: 48px 48px'),
  'Product system VueFlow must be isolated behind a dedicated flow frame component.',
)
assert(
  homeProductSystemMobileFlow.includes('product-system__mobile-flow') &&
    homeProductSystemMobileFlow.includes('inputs') &&
    homeProductSystemMobileFlow.includes('outputs'),
  'Home product mobile flow must be isolated from ProductSystemSection.',
)
assert(productSystemCards.includes('BaseCard') && productSystemCards.includes('CardGrid') && productSystemCards.includes('IconBox'), 'Product system cards must compose shared card primitives.')
assert(baseCard.includes('dt-product-card') && iconBox.includes('dt-icon-box'), 'Product system cards must use shared product card classes.')
assert(baseCard.includes('dt-card--adaptive'), 'Product system cards must use shared adaptive card height.')
assert(!productSystemCards.includes('min-height'), 'Product system cards must not define a fixed card height.')
assert(
  productFeatureGridSection.includes('SectionShell') &&
    productFeatureGridSection.includes('SectionHeader') &&
    productFeatureGridSection.includes('CardGrid') &&
    productFeatureGridSection.includes('FeatureCard') &&
    sectionShell.includes('pb-32 lg:pb-44') &&
    sectionShell.includes('bg-dt-bg') &&
    !productFeatureGridSection.includes('pt-24') &&
    cardGrid.includes('md:grid-cols-2 lg:grid-cols-4') &&
    cardGrid.includes('auto-rows-fr items-stretch') &&
    featureCard.includes('BaseCard') &&
    featureCard.includes('IconBox') &&
    featureCard.includes('CardText') &&
    baseCard.includes('dt-card--feature') &&
    baseCard.includes('dt-card__accent') &&
    iconBox.includes('dt-icon-box--gradient') &&
    !productFeatureGridSection.includes('mb-6') &&
    featureCard.includes('iconSize: 20') &&
    featureCard.includes("titleSize: 'sm'") &&
    featureCard.includes("descriptionSize: 'sm'") &&
    !productFeatureGridSection.includes('text-base leading-relaxed') &&
    productFeatureGridSection.includes(':title-id="titleId"') &&
    !productFeatureGridSection.includes('min-h-[') &&
    !productFeatureGridSection.includes('<style'),
  'ProductFeatureGridSection must provide a Tailwind-only reusable icon product feature grid.',
)
assert(
  systemCards.includes('CardGrid') &&
    systemCards.includes('FeatureCard') &&
    systemCards.includes('columns="three" gap="sm"') &&
    systemCards.includes('mt-10 lg:mt-12') &&
    cardGrid.includes('md:grid-cols-3') &&
    systemCards.includes('dt-icon-box dt-icon-box--gradient') &&
    !systemCards.includes('min-h-[') &&
    !systemCards.includes('<style'),
  'SystemCards must provide the FlowMQ-like Tailwind system card grid.',
)
assert(homeCta.includes('CtaSection') && ctaSection.includes('dt-cta-panel'), 'HomeCta must reuse the shared CtaSection.')
assert(ecosystem.includes('dt-ecosystem-card') && ecosystem.includes('dt-card-tag'), 'Ecosystem cards must use shared ecosystem card classes.')
assert(ecosystem.includes('ecosystem-card__icon-box dt-icon-box'), 'Ecosystem icon boxes must use the shared global icon box class.')
assert(ecosystemVisual.includes('visualComponents[variant]') && ecosystemVisualData.includes('serverLines'), 'Ecosystem visual must keep geometry data outside the wrapper component.')
assert(
  header.includes('SiteHeaderDesktopNav') &&
    header.includes('SiteHeaderActions') &&
    header.includes('SiteHeaderMobileNav') &&
    header.includes('SiteHeaderMenuButton') &&
    headerDesktopNav.includes('<div style="position:relative;">') &&
    headerActions.includes('登录OPS') &&
    headerMobileNav.includes('mobile-navigation'),
  'Header must remain split into desktop nav, actions, menu button, and mobile nav subcomponents.',
)
assert(megaMenu.includes('MegaPanelServices') && megaPanelServices.includes('mega-panel__service'), 'MegaMenu services layout must stay in a dedicated subcomponent.')
assert(footerSubscribe.includes('dt-button dt-button--primary dt-button--lg'), 'Footer subscribe button must reuse dt-button classes.')
assert(
  footer.includes('FooterSubscribe') &&
    footer.includes('FooterMain') &&
    footer.includes('FooterSocials') &&
    footer.includes('FooterBottom') &&
    footerMain.includes('footerColumns') &&
    footerSocials.includes('footerSocials') &&
    footerBottom.includes('京公网安备100861001010000号') &&
    footerData.includes('数曜·数据治理平台'),
  'Footer must stay split into content, socials, bottom legal, and data modules.',
)
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
  pageHero.includes('relative overflow-hidden bg-dt-bg') &&
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
    whyData.includes('数曜logo.svg?url') &&
    whyData.includes('博曜logo.svg?url') &&
    whyData.includes('探曜IOT logo-1.svg?url') &&
    whyData.includes('智曜logo.svg?url') &&
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
assert(whyService.includes('ServiceShowcaseSection') && serviceShowcaseSection.includes('SectionHeader') && whyService.includes('fangangaishu@2x.png?url') && !whyService.includes('new URL('), 'Why service section must use ServiceShowcaseSection and import the required overview image via ?url.')
assert(whyEngine.includes('EngineLinksSection') && whyEngine.includes('whyEngineLinks') && engineLinksSection.includes('SectionHeader'), 'Why engine section must reuse EngineLinksSection and configured links.')
assert(whyData.includes('label: \'面向技术层\'') && whyData.includes('label: \'面向业务层\'') && whyData.includes('label: \'面向服务层\'') && whyData.includes('label: \'面向长期价值\''), 'Why page must define four trust tabs.')
const whyTrustFeatureGroups = [...whyData.matchAll(/label: '[^']+',[\s\S]*?features: \[([\s\S]*?)\n {4}\],/g)]
assert(
  whyTrustFeatureGroups.length === 4 &&
    whyTrustFeatureGroups.every(([, group]) => (group.match(/\n {8}title: /g) ?? []).length === 4),
  'Each Why trust tab must define four feature cards.',
)
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
  dgpArchitecture.includes('ProductSystemSection') &&
    dgpArchitecture.includes('ProductSystemFlowFrame') &&
    dgpArchitecture.includes('产品架构图占位符') &&
    dgpArchitecture.includes('content-flush') &&
    !dgpArchitecture.includes(':heading-wide="false"') &&
    !dgpArchitecture.includes(':nowrap-subtitle="false"') &&
    dgpArchitecture.includes('SystemCards') &&
    !dgpArchitecture.includes('EnterpriseFlow'),
  'DGP architecture must reuse ProductSystemSection, flow background placeholder, and SystemCards without a flow chart.',
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
assert(
  dlpPage.includes('SiteHeader') &&
    dlpPage.includes('SiteFooter') &&
    dlpPage.includes('DlpHero') &&
    dlpPage.includes('ProductFeatureGridSection') &&
    dlpPage.includes('DlpArchitecture') &&
    dlpPage.includes('DlpCapabilityTimelineSection') &&
    dlpPage.includes('DlpAiModelingSection') &&
    dlpPage.includes('CtaSection') &&
    dlpPage.includes('id="dlp-challenge"') &&
    dlpPage.includes('columns="two"') &&
    dlpPage.includes('columns="three"') &&
    !dlpPage.includes('<style'),
  'DLP page must compose the required product sections with global Header, Footer, feature grids, timeline, AI assist, and CtaSection.',
)
assert(
  dlpHero.includes('PageHero') &&
    dlpHero.includes('import { Boxes }') &&
    dlpHero.includes('badge="数曜·数据标签平台"') &&
    dlpHero.includes('title-line="协同、智能、高效"') &&
    dlpHero.includes('title-gradient="标签生产平台"') &&
    dlpHero.includes('visual-label="SHUYAODGP_HORE_WEBM"') &&
    dlpHero.includes('DlpHeroVisual') &&
    dlpHero.includes('visual-size="large"'),
  'DLP hero must follow the PageHero contract from DLP.md with the same large visual width as DGP.',
)
assert(
  dlpHeroVisual.includes('数曜·数据标签平台') &&
    dlpHeroVisual.includes('标签生成') &&
    dlpHeroVisual.includes('标签查询') &&
    dlpHeroVisual.includes('实时标签生成') &&
    dlpHeroVisual.includes('tag_results') &&
    dlpHeroVisual.includes('h-[475px]') &&
    dlpHeroVisual.includes('grid-cols-4') &&
    dlpHeroVisual.includes('正在生成标签...') &&
    dlpHeroVisual.includes('标签已生成，可直接查询、分析与服务调用。') &&
    dlpHeroVisual.includes('标签实时查询') &&
    dlpHeroVisual.includes('主体画像') &&
    dlpHeroVisual.includes('查询标签') &&
    dlpHeroVisual.includes('正在查询标签...') &&
    dlpHeroVisual.includes('已找到 3 个标签，可用于分析、分群与服务调用。') &&
    dlpHeroVisual.includes('animate-glow') &&
    dlpHeroVisual.includes('dlpHeroFeatures') &&
    dlpHeroVisual.includes('dlpHeroTagResults') &&
    dlpHeroVisual.includes('dlpHeroQueryResults') &&
    !dlpHeroVisual.includes('BaseTabs') &&
    !dlpHeroVisual.includes('DlpTagGenerationPanel') &&
    !dlpHeroVisual.includes('DlpTagQueryPanel') &&
    !dlpHeroVisual.includes('图片占位符') &&
    !dlpHeroVisual.includes('style='),
  'DLP hero visual must be a single-component 1:1 adaptation of the EMQX Tables hero animation from Hero.md.',
)
assert(
  dlpHeroSql.includes('tag_results') &&
    dlpHeroSql.includes("customer_id = 'A1024'") &&
    dlpHeroSql.includes('tokenizeSql') &&
    dlpHeroSql.includes('dlpSqlTokenClasses'),
  'DLP hero SQL helper must provide the tag query statement and syntax tokens from Hero.md.',
)
assert(
  read('assets/css/tailwind.css').includes('--animate-glow') &&
    read('assets/css/tailwind.css').includes('@keyframes glow'),
  'Tailwind theme must define the animate-glow keyframes used by the DLP hero query button.',
)
assert(
  dlpArchitecture.includes('ProductSystemSection') &&
    dlpArchitecture.includes('ProductSystemFlowFrame') &&
    dlpArchitecture.includes('fallback-text="标签体系架构图占位符"') &&
    dlpArchitecture.includes('content-flush') &&
    !dlpArchitecture.includes('EnterpriseFlow') &&
    !dlpArchitecture.includes('<style'),
  'DLP architecture must reuse ProductSystemSection and ProductSystemFlowFrame without a flow chart.',
)
assert(
  dlpTimeline.includes('AlternatingTimelineSection') &&
    !dlpTimeline.includes('BaseCard') &&
    !dlpTimeline.includes('IconBox') &&
    dlpTimeline.includes('dlpTimelineItems') &&
    !dlpTimeline.includes('item.icon') &&
    !dlpTimeline.includes('eyebrow-size="sm"') &&
    !dlpTimeline.includes('eyebrow-tone="primary"') &&
    !dlpTimeline.includes('<style'),
  'DLP core capability timeline must reuse the shared EMQX Edge-like Tailwind-only alternating timeline.',
)
assert(
  dlpAiModeling.includes('SectionHeader') &&
    dlpAiModeling.includes('AI 辅助建标') &&
    dlpAiModeling.includes('图片占位符') &&
    !dlpAiModeling.includes('<style'),
  'DLP AI modeling section must use SectionHeader and a Tailwind-only image placeholder.',
)
const dlpSources = [dlpData, dlpPage, dlpHero, dlpArchitecture, dlpTimeline, dlpAiModeling].join('\n')
for (const text of [
  '数曜·数据标签平台',
  '协同、智能、高效',
  '标签生产平台',
  '厌倦了低效的标签建设？',
  '轻松构建企业标签体系',
  '让每一个标签创造价值',
  '从数据对象到标签服务',
  '通过 AI 快速完成标签设计与建模',
  '为企业 AI 场景赋能',
  '立即咨询',
]) {
  assert(dlpSources.includes(text), `DLP requirement text is missing: ${text}`)
}
assert(
  ddpPage.includes('SiteHeader') &&
    ddpPage.includes('SiteFooter') &&
    ddpPage.includes('DdpHero') &&
    ddpPage.includes('ProductFeatureGridSection') &&
    ddpPage.includes('DdpArchitecture') &&
    ddpPage.includes('DdpCapabilityTimelineSection') &&
    ddpPage.includes('DdpUnifiedDevelopmentSection') &&
    ddpPage.includes('CtaSection') &&
    ddpPage.includes('id="ddp-challenge"') &&
    ddpPage.includes('columns="two"') &&
    ddpPage.includes('columns="three"') &&
    ddpPage.includes('title-id="ddp-cta-title"') &&
    !ddpPage.includes('<style'),
  'DDP page must compose the required product sections with global Header, Footer, feature grids, timeline, unified development, and CtaSection.',
)
assert(
  ddpHero.includes('PageHero') &&
    ddpHero.includes('import { Network }') &&
    ddpHero.includes('badge="数曜·数据开发平台"') &&
    ddpHero.includes('title-line="标准、智能、高效"') &&
    ddpHero.includes('title-gradient="数据开发平台"') &&
    ddpHero.includes('visual-label="SHUYAODDP_HORE_WEBM"') &&
    ddpHero.includes('DdpHeroVisual') &&
    ddpHero.includes('visual-size="fluid"') &&
    !ddpHero.includes('visual-size="large"'),
  'DDP hero must follow the PageHero contract from DDP.md.',
)
assert(
  pageHero.includes("visualSize?: 'default' | 'large' | 'fluid'") &&
    pageHero.includes('lg:flex-row lg:items-center lg:justify-between') &&
    pageHero.includes('max-w-lg xl:max-w-xl 2xl:max-w-2xl'),
  'PageHero fluid visual size must reproduce the EMQX data-processing responsive hero visual width.',
)
assert(
  ddpHeroVisual.includes('SQL 开发') &&
    ddpHeroVisual.includes('可视化编排') &&
    ddpHeroVisual.includes('h-[368px]') &&
    ddpHeroVisual.includes('<ClientOnly>') &&
    ddpHeroVisual.includes('DdpFlowCanvas') &&
    ddpHeroVisual.includes('useDdpHeroAnimation') &&
    !ddpHeroVisual.includes('图片占位符') &&
    !ddpHeroVisual.includes('<style'),
  'DDP hero visual must reproduce the EMQX data-processing window card with SQL/flow tabs.',
)
assert(
  ddpHeroSql.includes("text: 'INSERT OVERWRITE TABLE '") &&
    ddpHeroSql.includes("text: 'dws_user_order_summary'") &&
    ddpHeroSql.includes("text: 'PARTITION '") &&
    ddpHeroSql.includes('${bizdate}') &&
    ddpHeroSql.includes("text: 'GROUP BY '") &&
    ddpHeroSql.includes("text: 'dwd_order_detail '") &&
    ddpHeroSql.includes("text: 'dim_user_info '") &&
    ddpHeroSql.includes('text-emerald-600 dark:text-emerald-400') &&
    ddpHeroSql.includes('top-[352px]'),
  'DDP hero SQL must use the Hero.md warehouse script with the original token palette.',
)
assert(
  ddpHeroAnimation.includes('LINE_REVEAL_INTERVAL_MS = 300') &&
    ddpHeroAnimation.includes('TAB_SWITCH_INTERVAL_MS = 5000'),
  'DDP hero animation must keep the original 300ms line reveal and 5s tab rotation.',
)
assert(
  ddpFlowCanvas.includes('@vue-flow/core') &&
    ddpFlowCanvas.includes('DWD Detail') &&
    ddpFlowCanvas.includes('Data Transform') &&
    ddpFlowCanvas.includes('DIM Join') &&
    ddpFlowCanvas.includes('DWS Summary') &&
    ddpFlowCanvas.includes('ADS Application') &&
    ddpFlowCanvas.includes('x: 560') &&
    ddpFlowCanvas.includes('fit-view-on-init'),
  'DDP flow canvas must keep the original node layout with warehouse-layer content.',
)
assert(
  ddpFlowNode.includes('bg-emerald-500') &&
    ddpFlowNode.includes('bg-indigo-500') &&
    ddpFlowNode.includes('bg-purple-500') &&
    ddpFlowNode.includes('min-w-[190px]') &&
    !ddpFlowNode.includes('<style'),
  'DDP flow node must keep the original card markup and tone stripe palette.',
)
assert(
  ddpArchitecture.includes('ProductSystemSection') &&
    ddpArchitecture.includes('ProductSystemFlowFrame') &&
    ddpArchitecture.includes('title="构建智能数据开发体系"') &&
    ddpArchitecture.includes('fallback-text="数据开发体系架构图占位符"') &&
    ddpArchitecture.includes('content-flush') &&
    !ddpArchitecture.includes('EnterpriseFlow') &&
    !ddpArchitecture.includes('<style'),
  'DDP architecture must reuse ProductSystemSection and ProductSystemFlowFrame without a flow chart.',
)
assert(
  ddpTimeline.includes('AlternatingTimelineSection') &&
    ddpTimeline.includes('ddpTimelineItems') &&
    ddpTimeline.includes('title="覆盖数据开发全生命周期"') &&
    !ddpTimeline.includes('BaseCard') &&
    !ddpTimeline.includes('IconBox') &&
    !ddpTimeline.includes('<style'),
  'DDP core capability timeline must reuse the shared alternating timeline component.',
)
assert(
  ddpUnifiedDevelopment.includes('ProductFeatureGridSection') &&
    ddpUnifiedDevelopment.includes('ProductSystemFlowFrame') &&
    ddpUnifiedDevelopment.includes('title="统一数据开发：从接入到交付"') &&
    ddpUnifiedDevelopment.includes('ddpUnifiedDevelopmentItems') &&
    ddpUnifiedDevelopment.includes('fallback-text="统一数据开发流程图占位符"') &&
    !ddpUnifiedDevelopment.includes('<style'),
  'DDP unified development section must compose ProductFeatureGridSection with ProductSystemFlowFrame through the after slot.',
)
const ddpSources = [ddpData, ddpPage, ddpHero, ddpArchitecture, ddpTimeline, ddpUnifiedDevelopment].join('\n')
for (const text of [
  '数曜·数据开发平台',
  '标准、智能、高效',
  '数据开发平台',
  '数据开发，正在成为企业增长瓶颈',
  '构建智能数据开发体系',
  '持续释放企业数据生产力',
  '覆盖数据开发全生命周期',
  '统一数据开发：从接入到交付',
  '赋能企业数据工程实践',
  '开启企业数据治理新征程',
]) {
  assert(ddpSources.includes(text), `DDP requirement text is missing: ${text}`)
}
for (const text of [
  '数据孤岛难破除',
  '更快的实施数据集成',
  '多源数据统一接入',
  '持续集成与敏捷交付',
  '企业数据中台',
  'AI 数据底座',
]) {
  assert(ddpData.includes(text), `DDP configured content is missing: ${text}`)
}
assert(
  dmsPage.includes('SiteHeader') &&
    dmsPage.includes('SiteFooter') &&
    dmsPage.includes('DmsHero') &&
    dmsPage.includes('ProductFeatureGridSection') &&
    dmsPage.includes('DmsArchitecture') &&
    dmsPage.includes('DmsIntelligentRegulationSection') &&
    dmsPage.includes('DmsBusinessValueSection') &&
    dmsPage.includes('DmsRegulationProcessSection') &&
    dmsPage.includes('CtaSection') &&
    dmsPage.includes('id="dms-challenge"') &&
    dmsPage.includes('columns="three"') &&
    dmsPage.includes('columns="two"') &&
    dmsPage.includes('title-id="dms-cta-title"') &&
    !dmsPage.includes('<style'),
  'DMS page must compose the required product sections with global Header, Footer, feature grids, timeline, business value, process flow, and CtaSection.',
)
assert(
  dmsHero.includes('PageHero') &&
    dmsHero.includes('import { HardDrive }') &&
    dmsHero.includes('badge="数曜·数据要素监管平台"') &&
    dmsHero.includes('title-line="让数据流通安全、可信"') &&
    dmsHero.includes('title-gradient="全流程监管平台"') &&
    dmsHero.includes('visual-label="SHUYAODMS_HORE_WEBM"') &&
    dmsHero.includes('visual-size="large"') &&
    dmsHero.includes('DmsHeroVisual'),
  'DMS hero must follow the PageHero contract from DMS.md and Hero.md.',
)
assert(
  dmsHeroVisual.includes('dmsHeroTitle') &&
    dmsHeroVisual.includes('dmsHeroTabs') &&
    dmsHeroVisual.includes('dmsHeroIntakeFields') &&
    dmsHeroVisual.includes('dmsHeroRiskRules') &&
    dmsHeroVisual.includes('dmsHeroRiskSummary') &&
    dmsHeroVisual.includes('dmsHeroDisposalFields') &&
    dmsHeroVisual.includes('dmsHeroDisposalSteps') &&
    dmsHeroVisual.includes('useDmsHeroAnimation') &&
    dmsHeroVisual.includes('getProgressWidthClass') &&
    dmsHeroVisual.includes('relative h-[320px]') &&
    dmsHeroVisual.includes('flex gap-1.5 border-t border-muted px-5 py-3') &&
    !dmsHeroVisual.includes('<style') &&
    !dmsHeroVisual.includes('style='),
  'DMS hero visual must be a Tailwind-only 1:1 adaptation of the EMQX smart-data-hub window hero from Hero.md.',
)
assert(
  dmsHeroAnimation.includes('STAGE_DURATION_MS = 5000') &&
    dmsHeroAnimation.includes('PROGRESS_WIDTH_CLASSES') &&
    dmsHeroAnimation.includes('getProgressWidthClass') &&
    dmsHeroAnimation.includes('INTAKE_STEP_INTERVAL_MS = 800') &&
    dmsHeroAnimation.includes('RISK_SCAN_START_MS = 700') &&
    dmsHeroAnimation.includes('RISK_SCAN_INTERVAL_MS = 500') &&
    dmsHeroAnimation.includes('DISPOSAL_STEP_START_MS = 900') &&
    dmsHeroAnimation.includes('DISPOSAL_STEP_INTERVAL_MS = 800') &&
    dmsHeroAnimation.includes('DISPOSAL_DONE_DELAY_MS = 4100'),
  'useDmsHeroAnimation must keep the smart-data-hub 5s auto-cycle and the staged supervision phase timings.',
)
assert(
  dmsData.includes('dmsHeroTitle') &&
    dmsData.includes('dmsHeroTabs') &&
    dmsData.includes('流通接入') &&
    dmsData.includes('风险识别') &&
    dmsData.includes('监管处置') &&
    dmsData.includes('TX-20260811-042') &&
    dmsData.includes('企业经营分析数据集') &&
    dmsData.includes('敏感字段超范围') &&
    dmsData.includes('EVT-20260811-017') &&
    dmsData.includes('监管工单已创建') &&
    dmsData.includes('风险事件已进入处置流程，全程留痕可追溯'),
  'DMS hero data must carry the supervision event script from Hero.md.',
)
assert(
  dmsArchitecture.includes('ProductSystemSection') &&
    dmsArchitecture.includes('ProductSystemFlowFrame') &&
    dmsArchitecture.includes('title="构建数据要素流通全过程监管体系"') &&
    dmsArchitecture.includes('fallback-text="数据要素监管体系架构图占位符"') &&
    dmsArchitecture.includes('content-flush') &&
    !dmsArchitecture.includes('EnterpriseFlow') &&
    !dmsArchitecture.includes('<style'),
  'DMS architecture must reuse ProductSystemSection and ProductSystemFlowFrame without a flow chart.',
)
assert(
  dmsIntelligentRegulation.includes('AlternatingTimelineSection') &&
    dmsIntelligentRegulation.includes('dmsTimelineItems') &&
    dmsIntelligentRegulation.includes('title="智能监管，全程守护"') &&
    !dmsIntelligentRegulation.includes('BaseCard') &&
    !dmsIntelligentRegulation.includes('IconBox') &&
    !dmsIntelligentRegulation.includes('<style'),
  'DMS intelligent regulation section must reuse the shared alternating timeline component.',
)
assert(
  dmsBusinessValue.includes('ProductSystemSection') &&
    dmsBusinessValue.includes('eyebrow="业务价值"') &&
    dmsBusinessValue.includes('title="可量化的数据要素监管效能"') &&
    dmsBusinessValue.includes('title-id="dms-business-value-title"') &&
    dmsBusinessValue.includes('dmsValueItems') &&
    dmsBusinessValue.includes('grid gap-5 md:grid-cols-2') &&
    dmsBusinessValue.includes('group relative overflow-hidden rounded-2xl border border-default bg-default p-7 shadow-sm transition-shadow duration-500 hover:shadow-md lg:p-9') &&
    dmsBusinessValue.includes('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent') &&
    dmsBusinessValue.includes('text-4xl font-bold tracking-tight text-primary lg:text-5xl') &&
    dmsBusinessValue.includes('mt-4 text-sm leading-relaxed text-muted') &&
    dmsBusinessValue.includes('mt-5 text-[13px] italic text-dimmed/60') &&
    dmsBusinessValue.includes('item.detail') &&
    !dmsBusinessValue.includes('<style'),
  'DMS business value section must reuse ProductSystemSection and reproduce the EMQX product business-value cards 1:1 with Tailwind-only markup.',
)
assert(
  dmsRegulationProcess.includes('ProductFeatureGridSection') &&
    dmsRegulationProcess.includes('ProductSystemFlowFrame') &&
    dmsRegulationProcess.includes('dmsProcessItems') &&
    dmsRegulationProcess.includes('<template #before>') &&
    dmsRegulationProcess.includes('fallback-text="数据要素监管流程图占位符"') &&
    !dmsRegulationProcess.includes('<style'),
  'DMS regulation process must compose ProductFeatureGridSection with ProductSystemFlowFrame through the before slot.',
)
const dmsSources = [dmsData, dmsPage, dmsHero, dmsArchitecture, dmsIntelligentRegulation, dmsBusinessValue, dmsRegulationProcess].join('\n')
for (const text of [
  '数曜·数据要素监管平台',
  '让数据流通安全、可信',
  '全流程监管平台',
  '数据流通不断扩大 监管能力亟需升级',
  '构建数据要素流通全过程监管体系',
  '要素全流程监管能力',
  '智能监管，全程守护',
  '可量化的数据要素监管效能',
  '事前预防 → 事中监控 → 事后处置 → 监管分析',
  '赋能多场景数据要素监管',
  '开启智能化数据要素监管',
]) {
  assert(dmsSources.includes(text), `DMS requirement text is missing: ${text}`)
}
for (const text of [
  '风险发现滞后',
  '实时风险监测',
  '统一监管规则',
  '100%',
  '监管规则配置',
  '数据交易平台',
  '数据运营机构',
]) {
  assert(dmsData.includes(text), `DMS configured content is missing: ${text}`)
}
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

const filesToScan = [
  ...listFiles('components', (path) => path.endsWith('.vue')),
  ...listFiles('pages', (path) => path.endsWith('.vue')),
  'assets/scss/main.scss',
]

for (const file of filesToScan) {
  const source = read(file)
  assert(!source.includes('@apply'), `${file} contains @apply, which is not processed by the current Nuxt build.`)

  if (file.endsWith('.vue') && file.startsWith('components/') && source.includes('<style')) {
    assert(source.includes('<style scoped lang="scss">'), `${file} must use <style scoped lang="scss">.`)
  }

  if (file.endsWith('.vue')) {
    const lineCount = source.split(/\r?\n/).length
    assert(lineCount <= 300, `${file} exceeds the 300-line component limit (${lineCount}).`)
  }

  const sourceWithoutRequiredNavWrapper = source.replace(' style="position:relative;"', '')
  assert(!/\sstyle=/.test(sourceWithoutRequiredNavWrapper), `${file} contains an inline style attribute.`)
}

const footerSources = [footer, footerSubscribe, footerMain, footerSocials, footerBottom, footerData].join('\n')
assert(!footerSources.includes('class="site-footer__locale"'), 'Footer locale switcher must remain removed.')
assert(
  footer.indexOf('<FooterMain') > -1 &&
    footer.indexOf('<FooterSocials') > footer.indexOf('<FooterMain') &&
    footer.indexOf('class="site-footer__rule site-footer__rule--bottom"') > footer.indexOf('<FooterSocials'),
  'Footer socials must be a sibling after site-footer__main and before bottom rule.',
)

if (failures.length) {
  console.error('Harness Engineering check failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Harness Engineering check passed.')
