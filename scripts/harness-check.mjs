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
  'doc/engineering/HOME_PAGE_BASELINE.md',
  'doc/engineering/HARNESS_ENGINEERING.md',
  'doc/product/BRAND_GUIDE.md',
  'doc/product/CONTENT_GUIDE.md',
  'doc/product/NAVIGATION.md',
  'doc/product/PRODUCT_VISION.md',
  'doc/product/SITE_MAP.md',
  'doc/product/PAGE_REQUIREMENTS/HOME/HOME.md',
  'doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/WhyDeepTrols.md',
  'doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/Agentic solution V1.gif',
  'doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/fangangaishu@2x.png',
  'assets/css/tailwind.css',
  'assets/scss/main.scss',
  'components/common/BaseButton.vue',
  'components/common/SectionHeading.vue',
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
const homeCta = read('components/home/HomeCta.vue')
const homeCases = read('components/home/HomeCases.vue')
const homeInsights = read('components/home/HomeInsights.vue')
const homeSolutions = read('components/home/HomeSolutions.vue')
const productSystem = read('components/home/HomeProductSystem.vue')
const ecosystem = read('components/home/HomeEcosystem.vue')
const footer = read('components/layout/SiteFooter.vue')
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
assert(homeInsights.includes('SectionHeading'), 'HomeInsights must reuse SectionHeading.')
assert(homeSolutions.includes('dt-tab-list') && homeSolutions.includes('dt-tab'), 'HomeSolutions tabs must use shared dt-tab classes.')
assert(productSystem.includes('dt-product-card') && productSystem.includes('dt-icon-box'), 'Product system cards must use shared product card classes.')
assert(ecosystem.includes('dt-ecosystem-card') && ecosystem.includes('dt-card-tag'), 'Ecosystem cards must use shared ecosystem card classes.')
assert(footer.includes('dt-button dt-button--primary dt-button--lg'), 'Footer subscribe button must reuse dt-button classes.')
assert(whyPage.includes('SiteHeader') && whyPage.includes('SiteFooter'), 'Why page must reuse global Header and Footer.')
assert(whyPage.includes('WhyHero') && whyPage.includes('WhyTrustTabs') && whyPage.includes('WhyServiceReset') && whyPage.includes('WhyEngine'), 'Why page sections are incomplete.')
assert(whyHero.includes('BaseButton') && whyHero.includes('HomeCustomerLogos'), 'Why hero must reuse BaseButton and HomeCustomerLogos.')
assert(whyHero.includes('Agentic solution V1.gif'), 'Why hero must use the required Agentic solution GIF.')
assert(whyHero.includes('mix-blend-mode: screen') && whyHero.includes('mask-image: radial-gradient(76% 72% at 50% 48%'), 'Why hero GIF must blend into the banner background.')
assert(!whyHero.includes('box-shadow: 0 24px 60px'), 'Why hero GIF must not use an outer framed card shadow.')
assert(whyTrustTabs.includes('SectionHeading'), 'Why trust tabs must reuse SectionHeading.')
assert(whyTrustTabs.includes('dt-tab-list') && whyTrustTabs.includes('dt-tab'), 'Why trust tabs must use shared dt-tab classes.')
assert(whyTrustTabs.includes('dt-product-card') && whyTrustTabs.includes('dt-icon-box'), 'Why trust cards must use shared product card classes.')
assert(whyService.includes('SectionHeading') && whyService.includes('fangangaishu@2x.png'), 'Why service section must use SectionHeading and required overview image.')
assert(whyEngine.includes('SectionHeading') && whyEngine.includes('whyEngineLinks'), 'Why engine section must reuse SectionHeading and configured links.')
assert(whyData.includes('label: \'面向技术层\'') && whyData.includes('label: \'面向业务层\'') && whyData.includes('label: \'面向服务层\'') && whyData.includes('label: \'面向长期价值\''), 'Why page must define four trust tabs.')

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

  const sourceWithoutRequiredNavWrapper = source.replace(' style="position:relative;"', '')
  assert(!/\sstyle=/.test(sourceWithoutRequiredNavWrapper), `${file} contains an inline style attribute.`)
}

assert(!footer.includes('class="site-footer__locale"'), 'Footer locale switcher must remain removed.')
assert(
  footer.indexOf('class="site-footer__main"') > -1 &&
    footer.indexOf('class="site-footer__socials"') > footer.indexOf('</nav>') &&
    footer.indexOf('class="site-footer__rule site-footer__rule--bottom"') > footer.indexOf('class="site-footer__socials"'),
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
