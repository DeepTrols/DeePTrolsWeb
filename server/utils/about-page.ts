import { aboutAddress, aboutContacts, aboutIntroParagraphs, aboutValues } from '~/data/about'
import { whyEngineHeading, whyEngineLinksData, whyServiceItemsData, whyServiceResetHeading } from '~/data/why-sections'
import type { PageSection } from './page-sections'

/**
 * 关于我们页接管 seed（015.20b）：从 data 纯字符串模块组装 7 段全量 props sections，
 * 与代码回退渲染（pages/about_us.vue v-else 分支）内容逐字段一致（tests/about-page-seed.spec.ts parity 锁）。
 * 首段 AboutHero 为零 props 视觉段：CmsPageView 有无 hero 决定渲染默认页头，缺了会双 h1。
 * 段顺序 = 关于页现状：Hero / 公司介绍 / 服务概览 / 重塑引擎 / 价值观 / 公司地址 / 联系方式。
 */
export const ABOUT_PAGE_SLUG = '/about_us'
export const ABOUT_PAGE_TITLE = '关于我们'

export const ABOUT_VALUES_SUBTITLE = '这些原则指引着我们的一言一行，从产品创新到客户关系，贯穿始终。'
export const ABOUT_COMPANY_NAME = '武汉深度数智科技有限公司'

export function buildAboutPageSeed(): PageSection[] {
  return [
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'AboutHero',
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'AboutIntroSection',
      props: {
        title: '公司介绍',
        paragraphs: [...aboutIntroParagraphs],
      },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'WhyServiceReset',
      props: {
        eyebrow: whyServiceResetHeading.eyebrow,
        title: whyServiceResetHeading.title,
        items: whyServiceItemsData.map(item => ({ ...item })),
      },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'WhyEngine',
      props: {
        eyebrow: whyEngineHeading.eyebrow,
        title: whyEngineHeading.title,
        description: whyEngineHeading.description,
        links: whyEngineLinksData.map(link => ({ ...link })),
      },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'AboutValuesSection',
      props: {
        title: '我们的核心价值观',
        subtitle: ABOUT_VALUES_SUBTITLE,
        items: aboutValues.map(item => ({ ...item })),
      },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'AboutAddressSection',
      props: {
        title: '公司地址',
        company: ABOUT_COMPANY_NAME,
        address: aboutAddress,
      },
    },
    {
      type: 'custom',
      visible: true,
      spacing: 'compact',
      name: 'AboutContactSection',
      props: {
        title: '联系我们',
        items: aboutContacts.map(item => ({ ...item })),
      },
    },
  ]
}
