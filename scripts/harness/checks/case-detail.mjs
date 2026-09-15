export function checkCaseDetailContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    caseDetailPage,
    casePage,
    articleBreadcrumb,
    articleContent,
    articleLinkRows,
    articleTypes,
    caseDetailData,
  } = ctx

  assert(
    caseDetailPage.includes('SiteHeader') &&
      caseDetailPage.includes('SiteFooter') &&
      caseDetailPage.includes('<ArticleBreadcrumb :items="breadcrumbItems" />') &&
      caseDetailPage.includes('aspect-[1920/363]') &&
      caseDetailPage.includes('grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1025fr)_309fr] xl:gap-[66px]') &&
      caseDetailPage.includes('<ArticleContent :blocks="detail.blocks" />') &&
      caseDetailPage.includes('相关产品') &&
      caseDetailPage.includes('title="相关客户案例"') &&
      caseDetailPage.includes('<CtaSection />') &&
      caseDetailPage.includes('statusCode: 404') &&
      !caseDetailPage.includes('<style') &&
      !caseDetailPage.includes('style='),
    'Case detail page must compose breadcrumb, 1920/363 hero, article grid with related products aside, related case rows, and the shared CTA without custom styles.',
  )

  assert(
    casePage.includes('route.query.category') &&
      casePage.includes('reportFilterTabs.some((tab) => tab.key === categoryQuery)'),
    'Cases list page must honor the ?category= query used by the detail breadcrumb.',
  )

  assert(
    articleBreadcrumb.includes('bg-[#eff0f3]') &&
      articleBreadcrumb.includes('pt-[var(--dt-header-height)]') &&
      articleBreadcrumb.includes('h-[58px]') &&
      articleBreadcrumb.includes('text-sm leading-[21px]') &&
      articleBreadcrumb.includes('text-primary hover:underline') &&
      articleBreadcrumb.includes('text-[#7e7e7e]') &&
      articleBreadcrumb.includes('rotate-45 border-r-[1.4px] border-t-[1.4px] border-[#a6a6a6]') &&
      articleBreadcrumb.includes('aria-label="面包屑"') &&
      !articleBreadcrumb.includes('<style') &&
      !articleBreadcrumb.includes('style='),
    'ArticleBreadcrumb must replicate the DeepCtrls cd-crumb bar (grey strip, 14px links, chevron separators) Tailwind-only.',
  )

  assert(
    articleContent.includes('text-base leading-[30px] text-justify text-[#1d2234]') &&
      articleContent.includes("'first:mt-0 mb-5 mt-14 text-left text-[26px] font-medium leading-[38px] text-[#1d2234]'") &&
      articleContent.includes("'first:mt-0 mb-3.5 mt-10 text-left text-xl font-medium leading-8 text-[#1d2234]'") &&
      articleContent.includes("'first:mt-0 mb-2.5 mt-8 text-left text-[17px] font-medium leading-7 text-[#1d2234]'") &&
      articleContent.includes('list-disc pl-[26px] marker:text-primary') &&
      articleContent.includes('list-decimal pl-[26px] marker:text-primary') &&
      articleContent.includes('my-9 border-l-[3px] border-l-primary py-0.5 pl-6 text-[#3f4d64]') &&
      articleContent.includes('my-12 h-px bg-[#e2e2e2]') &&
      articleContent.includes('figcaption') &&
      !articleContent.includes('<style') &&
      !articleContent.includes('style='),
    'ArticleContent must keep the fixed cd-content typography (16/30 justified body, h2-h4 scale, marker-primary lists, quote, divider, figure) Tailwind-only.',
  )

  assert(
    articleLinkRows.includes('flow-root pb-32 lg:pb-44') &&
      articleLinkRows.includes('h-[55px]') &&
      articleLinkRows.includes('size-1 shrink-0 rounded-full bg-primary') &&
      articleLinkRows.includes('truncate text-base leading-6 text-[#555]') &&
      articleLinkRows.includes('ArrowRight') &&
      !articleLinkRows.includes('<style') &&
      !articleLinkRows.includes('style='),
    'ArticleLinkRows must replicate the cd-rows related list (55px rows, primary dot, truncated label, trailing arrow) with the unified section rhythm.',
  )

  assert(
    articleTypes.includes('export type ArticleBlock =') &&
      articleTypes.includes("type: 'heading'") &&
      articleTypes.includes("type: 'paragraph'") &&
      articleTypes.includes("type: 'list'") &&
      articleTypes.includes("type: 'quote'") &&
      articleTypes.includes("type: 'image'") &&
      articleTypes.includes("type: 'divider'"),
    'Article block schema must stay centralized in types/article.ts so the backend can fill the same template for cases and future news pages.',
  )

  assert(
    caseDetailData.includes('模拟样例：7 条案例详情与 data/cases.ts 的 caseResources slug 一一对应') &&
      caseDetailData.includes('export const caseDetails: CaseDetail[] = [') &&
      caseDetailData.includes('export function getCaseDetailBySlug(slug: string)') &&
      caseDetailData.includes("slug: 'automotive-parts-device-agent'") &&
      caseDetailData.includes("slug: 'datacenter-compute-power'") &&
      caseDetailData.includes("categoryKey: 'smart-manufacturing'") &&
      caseDetailData.includes("categoryKey: 'compute-power'"),
    'Case details must stay centralized in data/case-details.ts with one placeholder detail per listed case resource.',
  )

  assert(
    existsSync(join(root, 'public/images/common/detail-hero-placeholder.svg')) &&
      existsSync(join(root, 'public/images/common/content-placeholder.svg')),
    'Article placeholder images must live under public/images/common.',
  )
}
