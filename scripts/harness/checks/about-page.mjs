export function checkAboutPageContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    pageHero,
    aboutData,
    aboutPage,
    aboutHero,
    aboutStatsSection,
    aboutIntroSection,
    aboutTextBlock,
    aboutValuesSection,
    aboutAddressSection,
    aboutContactSection,
    navigationData,
  } = ctx

  assert(aboutPage.includes('SiteHeader') && aboutPage.includes('SiteFooter'), 'About page must reuse global Header and Footer.')
  assert(
    aboutPage.includes('AboutHero') &&
      aboutPage.includes('AboutStatsSection') &&
      aboutPage.includes('AboutIntroSection') &&
      aboutPage.includes('AboutValuesSection') &&
      aboutPage.includes('AboutAddressSection') &&
      aboutPage.includes('AboutContactSection'),
    'About page sections are incomplete.',
  )
  assert(navigationData.includes("label: '关于我们'") && navigationData.includes("href: '/about_us'"), 'Header About navigation must point to /about_us.')

  assert(
    aboutHero.includes('PageHero') &&
      aboutHero.includes('title-id="about-hero-title"') &&
      aboutHero.includes(':title-line="aboutHero.title"') &&
      aboutHero.includes(':description="aboutHero.description"') &&
      aboutHero.includes(':visual-label="aboutHero.visualLabel"') &&
      aboutHero.includes(':background-video-src="aboutHero.backgroundVideo"') &&
      aboutHero.includes('align="center"') &&
      aboutHero.includes('class="about-hero"') &&
      aboutHero.includes('min-height: 560px') &&
      aboutHero.includes('padding-top: 8.5rem') &&
      !aboutHero.includes('badge=') &&
      !aboutHero.includes('badge-icon') &&
      !aboutHero.includes('title-gradient'),
    'About hero must use centered PageHero without badge, badge icon, or title gradient.',
  )
  assert(
    pageHero.includes('badge?: string') &&
      pageHero.includes('titleGradient?: string') &&
      pageHero.includes('actions?: PageHeroAction[]') &&
      pageHero.includes('backgroundVideoSrc?: string') &&
      pageHero.includes('v-if="backgroundVideoSrc"') &&
      pageHero.includes('class="page-hero__background-video"') &&
      pageHero.includes('v-if="badge"') &&
      pageHero.includes('v-if="titleGradient"') &&
      pageHero.includes('v-if="actions.length"') &&
      pageHero.includes('v-if="hasVisual"'),
    'PageHero must support optional badge, optional gradient, optional actions, optional visual slot, and runtime background video.',
  )
  assert(
    aboutStatsSection.includes('SectionShell') &&
      aboutStatsSection.includes('HeroStatsStrip') &&
      aboutStatsSection.includes('placement="section"'),
    'About stats must reuse HeroStatsStrip in section placement.',
  )
  assert(
    aboutIntroSection.includes('about-intro-card') &&
      aboutIntroSection.includes('公司介绍') &&
      aboutIntroSection.includes('AboutTextBlock') &&
      aboutIntroSection.includes('align="left"') &&
      aboutTextBlock.includes('max-w-5xl text-xl leading-relaxed md:text-2xl'),
    'About intro must use a left-aligned card with the shared AboutTextBlock large text rhythm.',
  )
  assert(
    aboutValuesSection.includes('我们的核心价值观') &&
      aboutValuesSection.includes('grid grid-cols-1 gap-6 md:grid-cols-3') &&
      aboutValuesSection.includes('tabindex="0"') &&
      aboutValuesSection.includes('translate-y-full') &&
      aboutValuesSection.includes('group-hover:translate-y-0') &&
      aboutValuesSection.includes('group-focus-visible:translate-y-0') &&
      aboutValuesSection.includes('<style scoped lang="scss">'),
    'About values section must render the required 3-card animated value grid.',
  )
  assert(
    aboutAddressSection.includes('title="公司地址"') &&
      aboutAddressSection.includes('aboutMap') &&
      aboutAddressSection.includes('<iframe') &&
      aboutAddressSection.includes('查看地图'),
    'About address must render a map-based address panel.',
  )
  assert(
    aboutContactSection.includes('联系我们') &&
      aboutContactSection.includes('grid grid-cols-1 overflow-hidden rounded-2xl border border-default md:grid-cols-2') &&
      aboutContactSection.includes('v-for="item in aboutContacts"') &&
      !aboutContactSection.includes('aboutContacts.filter'),
    'About contact section must render four channels as a two-by-two grid.',
  )
  assert(
    aboutData.includes("title: '关于深度数智（DEEPTROLS）'") &&
      aboutData.includes("visualLabel: 'ABOUTUS_HORE_WEBM'") &&
      aboutData.includes("backgroundVideo: '/images/about/custom-rad-hero-bg-video.mp4'") &&
      aboutData.includes("title: '极客'") &&
      aboutData.includes("revealTitle: '技术驱动'") &&
      aboutData.includes("value: 'contact@deeptrols.com'") &&
      aboutData.includes("value: 'product@deeptrols.com'") &&
      aboutData.includes("value: 'support@deeptrols.com'") &&
      aboutData.includes("value: 'hr@deeptrols.com'") &&
      aboutData.includes('export const aboutMap') &&
      !aboutData.includes("label: '社交媒体'"),
    'About data must keep the product requirement copy centralized.',
  )
  assert(existsSync(join(root, 'public/images/about/custom-rad-hero-bg-video.mp4')), 'About hero background video must live under public/images/about.')
}
