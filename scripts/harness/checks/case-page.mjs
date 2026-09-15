export function checkCasePageContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    casePage,
    caseHeroComponent,
    caseFeaturedSection,
    caseResourcesSection,
    reportResourceCard,
    caseData,
    navigationData,
  } = ctx

  assert(
    casePage.includes('SiteHeader') &&
      casePage.includes('SiteFooter') &&
      casePage.includes('<CaseHero />') &&
      casePage.includes('<ProductMetricsSection :items="caseMetrics" spacing="compact" />') &&
      casePage.includes('<CaseFeaturedSection />') &&
      casePage.includes('ReportFilterBar') &&
      casePage.includes('v-model:active-filter="activeCaseFilter"') &&
      casePage.includes('<CaseResourcesSection :items="filteredCaseResources" />') &&
      casePage.includes('cases-page') &&
      casePage.includes("title: '行业案例 - DeepTrols'") &&
      !casePage.includes('<style') &&
      !casePage.includes('style='),
    'Cases page must assemble hero, metrics strip, featured grid, reports-style filter tabs, and resources grid without custom styles.',
  )

  assert(
    caseHeroComponent.includes('h-[586px]') &&
      caseHeroComponent.includes('<video') &&
      caseHeroComponent.includes(':src="caseHero.video"') &&
      caseHeroComponent.includes('bg-black/70') &&
      caseHeroComponent.includes('page-hero__title-block') &&
      caseHeroComponent.includes('bg-[linear-gradient(104.09deg,#1e44e0_-15.53%,#ffffff_36.62%)]') &&
      caseHeroComponent.includes('max-md:whitespace-normal') &&
      caseHeroComponent.includes('max-md:top-[250px]') &&
      caseHeroComponent.includes('page-hero__actions') &&
      caseHeroComponent.includes('免费获取专属方案') &&
      caseHeroComponent.includes('to="/contact"') &&
      !caseHeroComponent.includes('<style') &&
      !caseHeroComponent.includes('style='),
    'Cases hero must reuse the manufacturing 586px hero layout with video background, 70% black overlay, gradient title, white CTA, and mobile wrapping.',
  )

  assert(
    caseFeaturedSection.includes('flow-root pb-16 lg:pb-32') &&
      caseFeaturedSection.includes('aria-labelledby="case-featured-title"') &&
      caseFeaturedSection.includes('grid grid-cols-1 gap-8 md:grid-cols-3') &&
      caseFeaturedSection.includes('ReportResourceCard') &&
      caseFeaturedSection.includes('hide-meta') &&
      caseFeaturedSection.includes('caseFeatured') &&
      !caseFeaturedSection.includes('<style') &&
      !caseFeaturedSection.includes('style='),
    'Cases featured section must reuse the report featured grid rhythm without tag/category meta.',
  )

  assert(
    caseResourcesSection.includes('id="case-resources-panel"') &&
      caseResourcesSection.includes('flow-root pb-32 lg:pb-44') &&
      caseResourcesSection.includes('grid grid-cols-1 gap-8 md:grid-cols-3') &&
      caseResourcesSection.includes('hide-meta') &&
      caseResourcesSection.includes('暂无匹配案例') &&
      caseResourcesSection.includes('PAGE_SIZE = 6') &&
      caseResourcesSection.includes('PagerArrows') &&
      caseResourcesSection.includes('mt-10 flex justify-center md:justify-end') &&
      !caseResourcesSection.includes('加载更多') &&
      !caseResourcesSection.includes('load-more-link') &&
      !caseResourcesSection.includes('<style') &&
      !caseResourcesSection.includes('style='),
    'Cases resources section must reuse the report resources panel with news-style PagerArrows paging (6 per page) and empty state, without the old load-more link.',
  )

  assert(
    reportResourceCard.includes('hideMeta?: boolean') &&
      reportResourceCard.includes('v-if="!hideMeta && item.type"') &&
      reportResourceCard.includes('v-if="!hideMeta && item.category"'),
    'ReportResourceCard must support hideMeta so the cases page can drop the type badge and category line.',
  )

  assert(
    caseData.includes("title: '深度数智 智能化转型实践精选'") &&
      caseData.includes("video: '/images/cases/case-hero.mp4'") &&
      caseData.includes("{ value: '100+', label: '服务客户' }") &&
      caseData.includes("{ value: '300+', label: '落地项目' }") &&
      caseData.includes("{ value: '50%-70%', label: 'AI赋能业务提效' }") &&
      caseData.includes("{ value: '10+', label: '覆盖行业' }") &&
      caseData.includes('模拟样例：案例内容清单待产品提供后整体替换') &&
      caseData.includes('export const caseResources: CaseResource[] = [') &&
      caseData.includes('export const caseFeatured = caseResources.slice(0, 3)') &&
      caseData.includes("solutionKey: 'smart-manufacturing'") &&
      caseData.includes("solutionKey: 'data-infrastructure'") &&
      caseData.includes("solutionKey: 'knowledge-engineering'") &&
      caseData.includes("solutionKey: 'smart-water'") &&
      caseData.includes("solutionKey: 'smart-education'") &&
      caseData.includes("solutionKey: 'fde'") &&
      caseData.includes("solutionKey: 'compute-power'"),
    'Cases page copy must stay centralized in data/cases.ts with placeholder case resources covering all seven solution filter categories.',
  )

  assert(
    navigationData.includes("href: '/cases'"),
    'Top-level 行业案例 navigation must link to /cases.',
  )

  assert(
    existsSync(join(root, 'public/images/cases/case-hero.mp4')),
    'Cases hero video must live under public/images/cases.',
  )
}
