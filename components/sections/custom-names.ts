/**
 * CMS custom 区块可选组件名（逃生门 + 注册组件）。
 * 纯字符串常量模块：服务端 zod 校验与客户端注册表共用，禁止引入任何组件/依赖。
 * 新增条目必须同步 components/sections/custom-registry.ts 的组件映射
 * 与 components/sections/custom-props.ts 的元数据（typecheck/单测会强制）。
 */
export const CUSTOM_SECTION_NAMES = [
  'AboutAddressSection',
  'AboutContactSection',
  'AboutHeroStats',
  'AboutIntroSection',
  'AboutTextBlock',
  'AboutValuesSection',
  'ContactFormSection',
  'DdpArchitecture',
  'DlpArchitecture',
  'DmsArchitecture',
  'HomeAbout',
  'HomeCustomerLogos',
  'HomeDeliverables',
  'HomeEcosystem',
  'HomeInsights',
  'HomeProductSystem',
  'HomeSolutions',
  'WhyEngine',
  'WhyServiceReset',
  'WhyTrustTabs',
] as const

export type CustomSectionName = (typeof CUSTOM_SECTION_NAMES)[number]
