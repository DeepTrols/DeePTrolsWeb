export function checkHomeLayoutContracts(ctx) {
  const { assert, existsSync, join, root, tokens, sectionShell, baseCard, iconBox, cardGrid, featureCard, baseTabs, carouselRoot, carouselControls, productFeatureGridSection, productSystemSection, productSystemFlowFrame, productSystemCards, systemCards, ctaSection, header, headerDesktopNav, headerActions, headerMobileNav, megaMenu, megaPanelServices, homeCta, homeCases, homeCaseSlide, homeInsights, homeSolutions, productSystem, homeProductSystemFlow, homeProductSystemMobileFlow, ecosystem, ecosystemVisual, ecosystemVisualData, footer, footerSubscribe, footerMain, footerSocials, footerBottom, footerData } = ctx
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
}
