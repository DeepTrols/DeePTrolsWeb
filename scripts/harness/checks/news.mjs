export function checkNewsContracts(ctx) {
  const {
    assert,
    existsSync,
    join,
    root,
    newsPage,
    newsHeroComponent,
    newsCategoryTabs,
    newsListSection,
    pagerArrows,
    newsData,
  } = ctx

  assert(
    newsPage.includes('SiteHeader') &&
      newsPage.includes('SiteFooter') &&
      newsPage.includes('<NewsHero :category="activeCategory" />') &&
      newsPage.includes('<NewsCategoryTabs :active-category="activeCategory" @change="handleCategoryChange" />') &&
      newsPage.includes('<NewsListSection :items="categoryItems" />') &&
      newsPage.includes('news-page') &&
      newsPage.includes('route.query.category') &&
      newsPage.includes("title: '新闻动态 - DeepTrols'") &&
      !newsPage.includes('<style') &&
      !newsPage.includes('style='),
    'News list page must assemble hero carousel, category tabs, and paginated list with ?category= query sync and no CTA (reference main only has hero+tabs+list).',
  )

  assert(
    newsHeroComponent.includes('md:h-[650px]') &&
      newsHeroComponent.includes('bg-[#111318]') &&
      newsHeroComponent.includes("bg-[url('/images/news/news-hero-bg.svg')]") &&
      newsHeroComponent.includes('class="container relative flex') &&
      newsHeroComponent.includes('md:grid-cols-[minmax(0,588fr)_minmax(0,712fr)]') &&
      newsHeroComponent.includes('md:gap-[103px]') &&
      newsHeroComponent.includes('md:pt-[223px]') &&
      newsHeroComponent.includes('text-base leading-[31px] text-justify text-[#ffffffb8]') &&
      newsHeroComponent.includes('text-[26px] font-normal leading-[38px] tracking-[1px] !text-white') &&
      newsHeroComponent.includes('md:text-[30px] md:leading-[50px]') &&
      newsHeroComponent.includes('hover:!text-[#9db2ff]') &&
      newsHeroComponent.includes('md:h-[99px]') &&
      newsHeroComponent.includes('text-lg leading-[31px] tracking-[1px] text-[#ffffffc7]') &&
      newsHeroComponent.includes('md:top-[547px]') &&
      newsHeroComponent.includes('md:w-[647.5px]') &&
      newsHeroComponent.includes('bg-[#ffffff38]') &&
      newsHeroComponent.includes('after:top-[5.5px] after:h-0.5 after:bg-white') &&
      newsHeroComponent.includes('md:mt-[186px]') &&
      newsHeroComponent.includes('md:h-[361px]') &&
      newsHeroComponent.includes('group-hover:scale-[1.03]') &&
      newsHeroComponent.includes('AUTOPLAY_INTERVAL = 6000') &&
      !newsHeroComponent.includes('<style') &&
      !newsHeroComponent.includes('style='),
    'NewsHero must replicate the mc-hero dark banner (650px, text left / 712x361 media right, segmented progress bar, 6s autoplay headline carousel) Tailwind-only.',
  )

  assert(
      newsCategoryTabs.includes('shadow-[0_12px_20px_#f1f5fa]') &&
      newsCategoryTabs.includes('h-[74px]') &&
      newsCategoryTabs.includes('class="container grid h-[74px] grid-cols-3"') &&
      newsCategoryTabs.includes('grid-cols-3') &&
      newsCategoryTabs.includes('text-lg leading-[73px] text-[#969696]') &&
      newsCategoryTabs.includes('hover:text-primary') &&
      newsCategoryTabs.includes('h-1 w-[263px] max-w-full -translate-x-1/2 bg-primary') &&
      !newsCategoryTabs.includes('<style') &&
      !newsCategoryTabs.includes('style='),
    'NewsCategoryTabs must replicate the mc-tabs bar (74px white strip, three equal 18px tabs, 263x4 primary underline).',
  )

  assert(
    newsListSection.includes('md:pt-[138px]') &&
      newsListSection.includes('class="container pb-16 md:pb-[91px]"') &&
      newsListSection.includes('md:pb-[91px]') &&
      newsListSection.includes('md:grid-cols-[minmax(0,855fr)_minmax(0,484fr)]') &&
      newsListSection.includes('md:gap-x-[61px]') &&
      newsListSection.includes('md:pt-[11px]') &&
      newsListSection.includes('border-b border-[#e7eaef] pb-8 mb-8') &&
      newsListSection.includes('text-[22px] font-normal leading-10 tracking-[1px] !text-[#2d2d2d]') &&
      newsListSection.includes('hover:!text-primary') &&
      newsListSection.includes('leading-[26px] text-[#555]') &&
      newsListSection.includes('rounded-[6px]') &&
      newsListSection.includes('shadow-[0_4px_16px_#1d22341a]') &&
      newsListSection.includes('hover:shadow-[0_10px_28px_#1d223429]') &&
      newsListSection.includes('group-hover:scale-[1.04]') &&
      newsListSection.includes('md:h-[246px]') &&
      newsListSection.includes('PAGE_SIZE = 5') &&
      newsListSection.includes('PagerArrows') &&
      newsListSection.includes('md:justify-end') &&
      newsListSection.includes('text-[#68758c]') &&
      !newsListSection.includes('<style') &&
      !newsListSection.includes('style='),
    'NewsListSection must replicate the mc-list rows (855 text column, 484x246 rounded thumbnail, mid-gap rule, 5 per page with right-aligned pager arrows) and empty state.',
  )

  assert(
    pagerArrows.includes('size-[49px]') &&
      pagerArrows.includes('gap-[17px]') &&
      pagerArrows.includes('ArrowRight') &&
      pagerArrows.includes('rotate-180') &&
      pagerArrows.includes('disabled:opacity-45') &&
      !pagerArrows.includes('<style') &&
      !pagerArrows.includes('style='),
    'PagerArrows must stay a shared 49x49 arrow button pair (lucide ArrowRight, prev rotated 180deg, gap 17px, disabled opacity .45) reused by list pagination and news related groups.',
  )

  assert(
    newsData.includes("export type NewsCategory = 'company' | 'media' | 'insight'") &&
      newsData.includes('export const newsItems: NewsItem[] = [') &&
      newsData.includes('模拟样例') &&
      newsData.includes("{ key: 'company', label: '公司动态' }") &&
      newsData.includes("{ key: 'media', label: '新闻报道' }") &&
      newsData.includes("{ key: 'insight', label: '技术洞见' }") &&
      newsData.includes('export function getNewsByCategory(category: NewsCategory)'),
    'News data must stay centralized in data/news.ts with 40 entries, three category tabs, and placeholder covers marked as 模拟样例.',
  )

  assert(
    existsSync(join(root, 'public/images/news/news-hero-bg.svg')),
    'News hero background must live under public/images/news.',
  )
}
