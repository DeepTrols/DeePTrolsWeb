import { readComponent } from '../../utils'

export function loadHomeVisualSources() {
    const tailwind = readComponent('assets/css/tailwind.css')
    const tokens = readComponent('assets/scss/main.scss')
    const page = readComponent('pages/index.vue')
    const header = readComponent('components/navigation/SiteHeader.vue')
    const headerDesktopNav = readComponent('components/navigation/SiteHeaderDesktopNav.vue')
    const headerActions = readComponent('components/navigation/SiteHeaderActions.vue')
    const headerMobileNav = readComponent('components/navigation/SiteHeaderMobileNav.vue')
    const headerMenuButton = readComponent('components/navigation/SiteHeaderMenuButton.vue')
    const baseButton = readComponent('components/common/BaseButton.vue')
    const sectionHeading = readComponent('components/common/SectionHeading.vue')
    const sectionHeader = readComponent('components/common/section/SectionHeader.vue')
    const baseCard = readComponent('components/common/card/BaseCard.vue')
    const iconBox = readComponent('components/common/card/IconBox.vue')
    const cardGrid = readComponent('components/common/card/CardGrid.vue')
    const baseTabs = readComponent('components/common/tabs/BaseTabs.vue')
    const productSystemSection = readComponent('components/common/ProductSystemSection.vue')
    const productSystemFlowFrame = readComponent('components/common/ProductSystemFlowFrame.vue')
    const productSystemCards = readComponent('components/common/ProductSystemCards.vue')
    const ctaSection = readComponent('components/common/CtaSection.vue')
    const hero = readComponent('components/home/HomeHero.vue')
    const logos = readComponent('components/home/HomeCustomerLogos.vue')
    const deliverables = readComponent('components/home/HomeDeliverables.vue')
    const productSystem = readComponent('components/home/HomeProductSystem.vue')
    const homeProductSystemFlow = readComponent('components/home/HomeProductSystemFlow.vue')
    const homeProductSystemMobileFlow = readComponent('components/home/HomeProductSystemMobileFlow.vue')
    const homeSolutions = readComponent('components/home/HomeSolutions.vue')
    const homeEcosystem = readComponent('components/home/HomeEcosystem.vue')
    const ecosystemVisual = readComponent('components/home/HomeEcosystemVisual.vue')
    const ecosystemTokenVisual = readComponent('components/home/ecosystem-visuals/EcosystemTokenVisual.vue')
    const ecosystemAgentVisual = readComponent('components/home/ecosystem-visuals/EcosystemAgentVisual.vue')
    const ecosystemInfraVisual = readComponent('components/home/ecosystem-visuals/EcosystemInfraVisual.vue')
    const ecosystemReportVisual = readComponent('components/home/ecosystem-visuals/EcosystemReportVisual.vue')
    const ecosystemVisualData = readComponent('data/ecosystemVisual.ts')
    const homeCases = readComponent('components/home/HomeCases.vue')
    const homeCaseSlide = readComponent('components/home/HomeCaseSlide.vue')
    const carouselRoot = readComponent('components/common/carousel/CarouselRoot.vue')
    const carouselControls = readComponent('components/common/carousel/CarouselControls.vue')
    const homeInsights = readComponent('components/home/HomeInsights.vue')
    const homeCta = readComponent('components/home/HomeCta.vue')
    const siteFooter = readComponent('components/layout/SiteFooter.vue')
    const footerSubscribe = readComponent('components/layout/FooterSubscribe.vue')
    const footerMain = readComponent('components/layout/FooterMain.vue')
    const footerSocials = readComponent('components/layout/FooterSocials.vue')
    const footerBottom = readComponent('components/layout/FooterBottom.vue')
    const footerData = readComponent('data/footer.ts')
    const footerMainIndex = siteFooter.indexOf('<FooterMain')
    const footerSocialsIndex = siteFooter.indexOf('<FooterSocials')
    const footerBottomRuleIndex = siteFooter.indexOf('class="site-footer__rule site-footer__rule--bottom"')
    const footerSources = [siteFooter, footerSubscribe, footerMain, footerSocials, footerBottom, footerData].join('\n')
    const enterpriseFlow = readComponent('components/flow/EnterpriseFlow.client.vue')

  return {
    tailwind,
    tokens,
    page,
    header,
    headerDesktopNav,
    headerActions,
    headerMobileNav,
    headerMenuButton,
    baseButton,
    sectionHeading,
    sectionHeader,
    baseCard,
    iconBox,
    cardGrid,
    baseTabs,
    productSystemSection,
    productSystemFlowFrame,
    productSystemCards,
    ctaSection,
    hero,
    logos,
    deliverables,
    productSystem,
    homeProductSystemFlow,
    homeProductSystemMobileFlow,
    homeSolutions,
    homeEcosystem,
    ecosystemVisual,
    ecosystemTokenVisual,
    ecosystemAgentVisual,
    ecosystemInfraVisual,
    ecosystemReportVisual,
    ecosystemVisualData,
    homeCases,
    homeCaseSlide,
    carouselRoot,
    carouselControls,
    homeInsights,
    homeCta,
    siteFooter,
    footerSubscribe,
    footerMain,
    footerSocials,
    footerBottom,
    footerData,
    footerMainIndex,
    footerSocialsIndex,
    footerBottomRuleIndex,
    footerSources,
    enterpriseFlow,
  }
}
