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
  'doc/tasks/in-progress/TASK-002.1-design-system-harness-refactor.md',
  'doc/tasks/review/TASK-002.2-code-audit-component-refactor.md',
  'doc/engineering/CODE_AUDIT_2026-07-30.md',
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
  'assets/css/tailwind.css',
  'assets/scss/main.scss',
  'components/common/BaseButton.vue',
  'components/common/SectionHeading.vue',
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
  'components/home/HomeCasesControls.vue',
  'components/home/HomeEcosystemVisual.vue',
  'components/home/ecosystem-visuals/EcosystemTokenVisual.vue',
  'components/home/ecosystem-visuals/EcosystemAgentVisual.vue',
  'components/home/ecosystem-visuals/EcosystemInfraVisual.vue',
  'components/home/ecosystem-visuals/EcosystemReportVisual.vue',
  'data/footer.ts',
  'data/ecosystemVisual.ts',
  'data/why.ts',
  'pages/why-deeptrols.vue',
  'components/why/WhyHero.vue',
  'components/why/WhyTrustTabs.vue',
  'components/why/WhyServiceReset.vue',
  'components/why/WhyEngine.vue',
]

for (const file of requiredFiles) {
  assert(existsSync(join(root, file)), `Missing required Harness file: ${file}`)
}

const tailwind = read('assets/css/tailwind.css')
const tokens = read('assets/scss/main.scss')
const packageJson = read('package.json')
const baseButton = read('components/common/BaseButton.vue')
const sectionHeading = read('components/common/SectionHeading.vue')
const header = read('components/navigation/SiteHeader.vue')
const headerDesktopNav = read('components/navigation/SiteHeaderDesktopNav.vue')
const headerActions = read('components/navigation/SiteHeaderActions.vue')
const headerMobileNav = read('components/navigation/SiteHeaderMobileNav.vue')
const megaMenu = read('components/navigation/MegaMenuPanel.vue')
const megaPanelServices = read('components/navigation/MegaPanelServices.vue')
const homeCta = read('components/home/HomeCta.vue')
const homeCases = read('components/home/HomeCases.vue')
const homeCaseSlide = read('components/home/HomeCaseSlide.vue')
const homeCasesControls = read('components/home/HomeCasesControls.vue')
const homeInsights = read('components/home/HomeInsights.vue')
const homeSolutions = read('components/home/HomeSolutions.vue')
const productSystem = read('components/home/HomeProductSystem.vue')
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
const whyTrustTabs = read('components/why/WhyTrustTabs.vue')
const whyService = read('components/why/WhyServiceReset.vue')
const whyEngine = read('components/why/WhyEngine.vue')

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

assert(baseButton.includes('data-slot="base"'), 'BaseButton must own data-slot="base".')
assert(baseButton.includes('data-slot="label"'), 'BaseButton must own data-slot="label".')
assert(baseButton.includes('data-slot="trailingIcon"'), 'BaseButton must own data-slot="trailingIcon".')
assert(sectionHeading.includes('titleId'), 'SectionHeading must support titleId for aria-labelledby.')
assert(sectionHeading.includes('nowrapSubtitle'), 'SectionHeading must support nowrapSubtitle.')

for (const [name, source] of [
  ['HomeCta', homeCta],
  ['HomeCases', homeCases],
  ['HomeInsights', homeInsights],
  ['HomeSolutions', homeSolutions],
]) {
  assert(source.includes('BaseButton'), `${name} must reuse BaseButton for CTA/action buttons.`)
}

assert(homeCases.includes('SectionHeading'), 'HomeCases must reuse SectionHeading.')
assert(homeCases.includes('HomeCaseSlide') && homeCases.includes('HomeCasesControls'), 'HomeCases must compose slide and control subcomponents.')
assert(homeCaseSlide.includes('BaseButton') && homeCaseSlide.includes('阅读案例'), 'HomeCaseSlide must reuse BaseButton for story CTAs.')
assert(homeCasesControls.includes('dt-icon-button'), 'HomeCasesControls must reuse shared icon button styling.')
assert(homeInsights.includes('SectionHeading'), 'HomeInsights must reuse SectionHeading.')
assert(homeSolutions.includes('dt-tab-list') && homeSolutions.includes('dt-tab'), 'HomeSolutions tabs must use shared dt-tab classes.')
assert(productSystem.includes('dt-product-card') && productSystem.includes('dt-icon-box'), 'Product system cards must use shared product card classes.')
assert(ecosystem.includes('dt-ecosystem-card') && ecosystem.includes('dt-card-tag'), 'Ecosystem cards must use shared ecosystem card classes.')
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
assert(whyPage.includes('WhyHero') && whyPage.includes('WhyTrustTabs') && whyPage.includes('WhyServiceReset') && whyPage.includes('WhyEngine'), 'Why page sections are incomplete.')
assert(whyHero.includes('BaseButton') && whyHero.includes('HomeCustomerLogos'), 'Why hero must reuse BaseButton and HomeCustomerLogos.')
assert(
  whyHero.includes('class="why-hero__badge mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"') &&
    whyHero.includes('<Sparkles class="why-hero__badge-icon"') &&
    whyHero.includes('<span>为什么选择 DeepTrols</span>') &&
    whyHero.includes('class="why-hero__title-line">数据、知识、智能统一</span>') &&
    whyHero.includes('class="why-hero__title-gradient">企业级AI应用服务商</span>'),
  'Why hero content hierarchy must follow the why-emqx replacement mapping.',
)
assert(whyHero.includes('font-size: 36px') && whyHero.includes('font-size: 48px') && whyHero.includes('font-size: 60px'), 'Why hero title sizes must follow the why-emqx 4xl/5xl/6xl rhythm.')
assert(
  whyHero.includes('relative overflow-hidden bg-dt-bg') &&
    whyHero.includes('pt-24 pb-24 lg:pt-32 lg:pb-32') &&
    whyHero.includes('mt-24 border-t border-dt-line pt-12 lg:mt-28') &&
    !whyHero.includes('padding: 144px') &&
    !whyHero.includes('padding-bottom: 112px'),
  'Why hero spacing must follow the why-emqx Tailwind section rhythm.',
)
assert(whyHero.includes('robot.webm?url') && whyHero.includes('<video') && !whyHero.includes('Agentic solution V1.gif') && !whyHero.includes('new URL('), 'Why hero must import the required robot WebM via ?url to avoid SSR hydration mismatch.')
assert(whyHero.includes('mix-blend-screen') && whyHero.includes('[mask-image:radial-gradient(76%_72%_at_50%_48%'), 'Why hero video must blend into the banner background with Tailwind v4 utilities.')
assert(!whyHero.includes('&::after') && !whyHero.includes('linear-gradient(180deg, var(--dt-color-bg) 0%') && !whyHero.includes('linear-gradient(90deg, var(--dt-color-bg) 0%'), 'Why hero figure must not keep the old four-edge gradient overlay.')
assert(
  whyHero.includes('max-w-[820px]') &&
    whyHero.includes('self-stretch') &&
    whyHero.includes('lg:h-full') &&
    whyHero.includes('h-[132%]') &&
    whyHero.includes('w-[132%]') &&
    whyHero.includes('!max-w-none') &&
    whyHero.includes('top-[46%]') &&
    whyHero.includes('lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1fr)]') &&
    !whyHero.includes('video {'),
  'Why hero video must be enlarged with Tailwind v4 utilities without adding extra video CSS.',
)
assert(!whyHero.includes('box-shadow: 0 24px 60px'), 'Why hero video must not use an outer framed card shadow.')
assert(whyTrustTabs.includes('SectionHeading'), 'Why trust tabs must reuse SectionHeading.')
assert(whyTrustTabs.includes('dt-segmented-tabs') && whyTrustTabs.includes('dt-segmented-tab'), 'Why trust tabs must use shared segmented tab classes.')
assert(whyTrustTabs.includes('dt-product-card') && whyTrustTabs.includes('dt-icon-box'), 'Why trust cards must use shared product card classes.')
assert(whyTrustTabs.includes('class="why-trust dt-section relative pb-32 lg:pb-44"'), 'Why trust section must use Tailwind pb-32/lg:pb-44 rhythm.')
assert(whyTrustTabs.includes('class="why-trust__heading mb-12 text-center lg:mb-16"'), 'Why trust heading must use Tailwind mb-12/lg:mb-16 rhythm.')
assert(whyTrustTabs.includes('grid gap-5 md:grid-cols-2 lg:gap-6') && !whyTrustTabs.includes('grid-template-columns: repeat(4, minmax(0, 1fr))'), 'Why trust cards must use the 2x2 EMQX Tailwind grid.')
assert(whyTrustTabs.includes('min-h-[280px] !p-7 lg:!p-8') && whyTrustTabs.includes('!size-12 !rounded-xl'), 'Why trust cards must follow EMQX Tailwind card padding and icon size.')
assert(whyService.includes('dt-section relative pb-32 lg:pb-44') && whyEngine.includes('dt-section relative pb-32 lg:pb-44'), 'Why service and engine sections must share the EMQX section rhythm.')
assert(whyService.includes('SectionHeading') && whyService.includes('fangangaishu@2x.png?url') && !whyService.includes('new URL('), 'Why service section must use SectionHeading and import the required overview image via ?url.')
assert(whyEngine.includes('SectionHeading') && whyEngine.includes('whyEngineLinks'), 'Why engine section must reuse SectionHeading and configured links.')
assert(whyData.includes('label: \'面向技术层\'') && whyData.includes('label: \'面向业务层\'') && whyData.includes('label: \'面向服务层\'') && whyData.includes('label: \'面向长期价值\''), 'Why page must define four trust tabs.')
const whyTrustFeatureGroups = [...whyData.matchAll(/label: '[^']+',[\s\S]*?features: \[([\s\S]*?)\n {4}\],/g)]
assert(
  whyTrustFeatureGroups.length === 4 &&
    whyTrustFeatureGroups.every(([, group]) => (group.match(/\n {8}title: /g) ?? []).length === 4),
  'Each Why trust tab must define four feature cards.',
)

const filesToScan = [
  ...listFiles('components', (path) => path.endsWith('.vue')),
  ...listFiles('pages', (path) => path.endsWith('.vue')),
  'assets/scss/main.scss',
]

for (const file of filesToScan) {
  const source = read(file)
  assert(!source.includes('@apply'), `${file} contains @apply, which is not processed by the current Nuxt build.`)

  if (file.endsWith('.vue') && file.startsWith('components/')) {
    assert(source.includes('lang="scss"'), `${file} must use <style scoped lang="scss">.`)
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
