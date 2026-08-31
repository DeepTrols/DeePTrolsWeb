export function checkServiceReportContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    navigationData,
    footerData,
    reportDoc,
    reportData,
    reportPage,
    reportHero,
    reportResourcesSection,
    reportResourceCard,
  } = ctx

  assert(reportDoc.includes('白皮书&报告 页面结构'), 'Report product requirement must remain available.')
  assert(
    reportPage.includes('SiteHeader') &&
      reportPage.includes('SiteFooter') &&
      reportPage.includes('ReportHero') &&
      reportPage.includes('ReportResourcesSection') &&
      reportPage.includes('report-page'),
    'Report page must reuse global shell and render the required sections.',
  )
  assert(
    reportHero.includes('PageHero') &&
      reportHero.includes('title-id="report-hero-title"') &&
      reportHero.includes(':title-line="reportHero.title"') &&
      reportHero.includes(':description="reportHero.description"') &&
      reportHero.includes('align="center"'),
    'Report hero must compose centered PageHero with the required copy.',
  )
  assert(
    reportHero.includes('padding-top: 8.5rem') &&
      reportHero.includes('padding-bottom: 4rem') &&
      reportHero.includes('padding-top: 9.5rem') &&
      reportHero.includes('padding-bottom: 5rem') &&
      reportHero.includes('font-size: 24px') &&
      reportHero.includes('font-size: 48px'),
    'Report hero spacing and typography must follow the resources page reference.',
  )
  assert(
    reportResourcesSection.includes('class="container pb-32"') &&
      reportResourcesSection.includes('class="mb-24"') &&
      reportResourcesSection.includes('class="grid grid-cols-1 gap-8 md:grid-cols-3"') &&
      reportResourcesSection.includes('ReportResourceCard') &&
      reportResourcesSection.includes(':eager="index === 0"'),
    'Report resources must follow the three-column resources grid rhythm.',
  )
  assert(
    reportResourceCard.includes('class="group block"') &&
      reportResourceCard.includes('class="relative mb-4 aspect-[400/180] overflow-hidden rounded-lg"') &&
      reportResourceCard.includes('rounded-full bg-violet-500 px-2.5 py-0.5 text-sm text-white') &&
      reportResourceCard.includes('width="400"') &&
      reportResourceCard.includes('height="180"') &&
      reportResourceCard.includes('object-cover transition-transform duration-300 group-hover:scale-105') &&
      !reportResourceCard.includes('style='),
    'Report resource cards must match the requested image, badge, radius, and hover rhythm without inline style.',
  )
  assert(
    reportData.includes("title: '白皮书&报告'") &&
      reportData.includes("description: '全球最新的AI相关白皮书&报告，深入了解人工智能的世界。'") &&
      reportData.includes("type: '白皮书'") &&
      reportData.includes("type: '报告'") &&
      !reportData.includes('doc/product/PAGE_REQUIREMENTS'),
    'Report data must keep required copy centralized and avoid doc/product runtime assets.',
  )
  assert(navigationData.includes("href: '/resources/reports'"), 'Service navigation must link to /resources/reports.')
  assert(footerData.includes("href: '/resources/reports'"), 'Footer service link must link to /resources/reports.')

  for (const image of [
    'public/images/home/solutions/data-center-ai.CDu93Miw.png',
    'public/images/home/solutions/data.DHKY-NE1.png',
    'public/images/solutions/data-engineering.jpg',
    'public/images/home/solutions/industrial.K00G2HaS.png',
    'public/images/solutions/data-center.jpg',
    'public/images/solutions/smart-energy.jpg',
  ]) {
    assert(existsSync(join(root, image)), `${image} must exist for report cover cards.`)
  }
}
