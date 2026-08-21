export function checkDesignSystemContracts(ctx) {
  const { assert, tailwind, tokens, componentAudit, packageJson, baseButton, sectionHeading, sectionHeader, sectionShell, baseCard, iconBox, cardText, cardGrid, featureCard, pageHero, alternatingTimelineSection, compatibilityGridSection, productFeatureGridSection, productArchitectureSection, heroVisualPanel, heroVisualShell, assetBoundary, knowledgeBase, heroStatsStrip } = ctx
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
  productArchitectureSection.includes('ProductSystemSection') &&
    productArchitectureSection.includes('ProductSystemFlowFrame') &&
    productArchitectureSection.includes('<slot name="after" />') &&
    productArchitectureSection.includes('frameOffset?: boolean'),
  'ProductArchitectureSection must centralize product architecture section layout, flow frame fallback, and after-slot composition.',
)
assert(
  heroVisualShell.includes('HeroVisualPanel') &&
    heroVisualShell.includes('glowClass') &&
    heroVisualShell.includes('panelClass') &&
    heroVisualPanel.includes('panelClass'),
  'HeroVisualShell and HeroVisualPanel must provide reusable product hero visual primitives.',
)
assert(
  assetBoundary.includes('doc/product/**/imgs') &&
    assetBoundary.includes('assets/images/**') &&
    assetBoundary.includes('运行时代码不得新增对该目录的直接导入'),
  'Asset boundary documentation must define runtime asset locations and forbid direct doc/product image imports.',
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
}
