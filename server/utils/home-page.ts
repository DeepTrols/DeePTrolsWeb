import {
  homeAboutContent,
  homeCtaContent,
  homeCtaMetrics,
  homeEcosystemCards,
  homeEcosystemHeading,
  homeHeroContent,
  homeInsightsHeading,
  homeProductCards,
  homeProductSystemHeading,
  homeSolutionItems,
  homeSolutionsHeading,
} from '~/data/home-sections'
import { whyTrustTabsData, whyTrustTabsHeading } from '~/data/why-trust'
import type { PageSection } from './page-sections'

/**
 * 首页接管 seed（015.18c）：从 data 纯字符串模块组装 8 段全量 props sections，
 * 与代码回退渲染（pages/index.vue v-else 分支）内容逐字段一致（tests/home-page-seed.spec.ts parity 锁）。
 * 首段必须是可见 hero：CmsPageView 有无 hero 决定渲染默认页头，缺了会双 h1。
 * 段顺序 = 首页现状：Hero / 智能底座 / 解决方案 / ecosystem / trust / 关于我们 / Resources / CTA。
 */
export const HOME_PAGE_SLUG = '/'
export const HOME_PAGE_TITLE = '首页'

export function buildHomePageSeed(): PageSection[] {
  return [
    {
      type: 'hero',
      visible: true,
      spacing: 'compact',
      variant: 'fullscreen-image',
      title: homeHeroContent.title,
      titleLines: [...homeHeroContent.titleLines],
      subtitle: homeHeroContent.subtitle,
      ctaLabel: homeHeroContent.ctaLabel,
      ctaHref: homeHeroContent.ctaHref,
      backgroundImage: homeHeroContent.backgroundImage,
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'HomeProductSystem',
      props: {
        eyebrow: homeProductSystemHeading.eyebrow,
        title: homeProductSystemHeading.title,
        subtitle: homeProductSystemHeading.subtitle,
        flowLabel: homeProductSystemHeading.flowLabel,
        cards: homeProductCards.map(card => ({ ...card })),
      },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'HomeSolutions',
      props: {
        eyebrow: homeSolutionsHeading.eyebrow,
        title: homeSolutionsHeading.title,
        subtitle: homeSolutionsHeading.subtitle,
        items: homeSolutionItems.map(item => ({ ...item })),
      },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'HomeEcosystem',
      props: {
        eyebrow: homeEcosystemHeading.eyebrow,
        title: homeEcosystemHeading.title,
        subtitle: homeEcosystemHeading.subtitle,
        cards: homeEcosystemCards.map(card => ({ ...card, points: card.points ? [...card.points] : undefined })),
      },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'WhyTrustTabs',
      props: {
        title: whyTrustTabsHeading.title,
        tablistLabel: whyTrustTabsHeading.tablistLabel,
        tabs: whyTrustTabsData.map(tab => ({
          ...tab,
          features: tab.features.map(feature => ({ ...feature })),
        })),
      },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'HomeAbout',
      props: { ...homeAboutContent },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'HomeInsights',
      props: { ...homeInsightsHeading },
    },
    {
      type: 'cta',
      visible: true,
      spacing: 'compact',
      title: homeCtaContent.title,
      ctaLabel: homeCtaContent.ctaLabel,
      ctaHref: homeCtaContent.ctaHref,
      metrics: homeCtaMetrics.map(metric => ({ ...metric })),
    },
  ]
}
