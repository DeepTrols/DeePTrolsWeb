export function checkNewsDetailContracts(ctx) {
  const {
    assert,
    newsDetailPage,
    newsRelatedAside,
    newsRelatedCard,
    articleContent,
    header,
    newsDetailData,
  } = ctx

  assert(
    newsDetailPage.includes('SiteHeader') &&
      newsDetailPage.includes('SiteFooter') &&
      newsDetailPage.includes('<ArticleBreadcrumb :items="breadcrumbItems" />') &&
      newsDetailPage.includes('news-detail-page bg-white bg-[linear-gradient(180deg,#eff5fe,transparent)] bg-[length:100%_1134px] bg-no-repeat') &&
      newsDetailPage.includes('grid grid-cols-1 gap-18 pt-12 pb-24 xl:grid-cols-[minmax(0,1fr)_376px] xl:gap-[124px]') &&
      newsDetailPage.includes("label: '新闻动态', href: '/news'") &&
      newsDetailPage.includes("label: '文章正文'") &&
      newsDetailPage.includes('h-[30px] w-[104px] place-items-center rounded-[44px] bg-primary/8 text-sm font-medium text-primary') &&
      newsDetailPage.includes('text-[30px] font-normal leading-[44px] text-[#1d2234] md:text-[48px] md:leading-[57px]') &&
      newsDetailPage.includes('发布时间: {{ formatNewsDateShort(newsItem.publishedAt) }}') &&
      newsDetailPage.includes('mt-[34px] block h-px bg-[#d9dde4]') &&
      newsDetailPage.includes('mt-10 md:mt-[66px]') &&
      newsDetailPage.includes('<ArticleContent :blocks="detail.blocks" variant="news" />') &&
      newsDetailPage.includes('xl:pt-[261px]') &&
      newsDetailPage.includes('<CtaSection />') &&
      newsDetailPage.includes('statusCode: 404') &&
      !newsDetailPage.includes('<style') &&
      !newsDetailPage.includes('style='),
    'News detail page must replicate the ma-* layout (gradient background, breadcrumb, pill/48px title/unpadded time/rule, two-column grid with 376px aside, ArticleContent news variant, shared CTA) and 404 on unknown ids.',
  )

  assert(
    newsRelatedAside.includes('相关动态') &&
      newsRelatedAside.includes('text-[38px] font-normal leading-[42px] text-[#1d2234] max-md:text-[28px] max-md:leading-[34px]') &&
      newsRelatedAside.includes('GROUP_SIZE = 3') &&
      newsRelatedAside.includes('item.id !== props.currentId') &&
      newsRelatedAside.includes("index === 0 ? 'mt-[43px]' : 'mt-[42px]'") &&
      newsRelatedAside.includes('PagerArrows') &&
      newsRelatedAside.includes('mt-10 flex justify-start xl:mt-20 xl:justify-end') &&
      !newsRelatedAside.includes('<style') &&
      !newsRelatedAside.includes('style='),
    'NewsRelatedAside must replicate ma-aside (38px title, 3-card groups excluding the current article, relpager group paging, empty state).',
  )

  assert(
    newsRelatedCard.includes('h-[213px]') &&
      newsRelatedCard.includes('bg-[#8a8a8a]') &&
      newsRelatedCard.includes('group-hover:scale-[1.04]') &&
      newsRelatedCard.includes('line-clamp-2 mt-[22px] block h-[50px] text-justify text-base font-light leading-[25px]') &&
      newsRelatedCard.includes('group-hover:text-primary') &&
      newsRelatedCard.includes('mt-3 block text-[15px] font-light leading-[26px] text-[#555]') &&
      newsRelatedCard.includes('formatNewsDateShort') &&
      !newsRelatedCard.includes('<style') &&
      !newsRelatedCard.includes('style='),
    'NewsRelatedCard must replicate ma-relcard (213px media with hover zoom, two-line justified light title, unpadded date).',
  )

  assert(
    articleContent.includes("variant?: 'case' | 'news'") &&
      articleContent.includes("variant: 'case'") &&
      articleContent.includes('text-base leading-[30px] text-justify text-[#1d2234]') &&
      articleContent.includes("'first:mt-0 mb-5 mt-14 text-left text-[26px] font-medium leading-[38px] text-[#1d2234]'") &&
      articleContent.includes('mb-12 list-disc pl-[26px] marker:text-primary') &&
      articleContent.includes('my-12 h-px bg-[#e2e2e2]') &&
      articleContent.includes('text-base leading-[30px] text-justify text-[#555] max-md:text-left max-md:leading-7') &&
      articleContent.includes("'mb-[30px]'") &&
      articleContent.includes('mb-[30px] list-disc pl-[26px] marker:text-primary') &&
      articleContent.includes('my-12 h-px bg-[#d9dde4]') &&
      !articleContent.includes('<style') &&
      !articleContent.includes('style='),
    'ArticleContent must expose the news variant (#555 body, 30px paragraph/list spacing, #d9dde4 divider, mobile leading-7 left align) without touching the locked case literals.',
  )

  assert(
    header.includes('isNewsDetailRoute') &&
      header.includes("route.path.startsWith('/news/')") &&
      header.includes('isCaseDetailRoute.value ||\n    isNewsDetailRoute.value,'),
    'SiteHeader must treat news detail routes as dark-header routes while keeping the /news list hero on the white foreground.',
  )

  assert(
    newsDetailData.includes('export const newsDetails: NewsDetail[] = [') &&
      newsDetailData.includes('export function getNewsDetailById(id: number)') &&
      newsDetailData.includes('模拟样例') &&
      newsDetailData.includes("text: '算电协同进入新基建阶段'"),
    'News details must stay centralized in data/news-details.ts with the real id-29 article and 模拟样例 generated bodies for the remaining items.',
  )
}
