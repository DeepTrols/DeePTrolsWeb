/**
 * 首页各段的纯字符串数据（015.18）：无 ?url 资源、无组件引用，server（seed/parity）与客户端共享。
 * data/home.ts 由此 import 后解析图标组件并 re-export（导出签名不变）。
 * icon 字段存 lucide 组件名字符串，渲染侧经 components/navigation/nav-icons.ts 注册表解析。
 */

export interface HomeSectionHeading {
  eyebrow: string
  title: string
  subtitle?: string
}

export interface HomeProductCardData {
  name: string
  title: string
  description: string
  icon: string
}

export interface HomeSolutionItemData {
  key: string
  tab: string
  title: string
  englishTitle: string
  description: string
  image: string
  href: string
}

export interface HomeEcosystemCardData {
  title: string
  description: string
  tag: string
  href: string
  points?: string[]
  icon: string
  variant: 'token' | 'agent' | 'infra' | 'report'
}

export interface HomeAboutContentData {
  eyebrow: string
  title: string
  bannerImage: string
  bannerAlt: string
  clientsLabelImage: string
  clientsLabelAlt: string
}

export interface HomeInsightsHeadingData {
  eyebrow: string
  title: string
  moreLabel: string
  moreHref: string
}

export interface HomeHeroContentData {
  /** 首屏主标题（兜底单行；实际渲染优先 titleLines） */
  title: string
  titleLines: string[]
  subtitle: string
  ctaLabel: string
  ctaHref: string
  backgroundImage: string
}

export interface HomeCtaMetricData {
  label: string
  value?: string
}

/** 首页 Hero 内容（与 HomeHero.vue 代码回退视觉一致；seed 显式落库供运营编辑） */
export const homeHeroContent: HomeHeroContentData = {
  title: '构建企业级AI能力体系',
  titleLines: ['构建企业级AI能力体系', '让智能成为业务增长的新引擎'],
  subtitle: '在AI时代，企业不再需要更多工具，而是需要可落地的结果',
  ctaLabel: '免费获取专属方案',
  ctaHref: '/contact',
  backgroundImage: '/images/home/deepctrls-hero-ai.webp',
}

/** 首页 CTA 文案（与 CtaSection 内建默认一致；seed 显式落库供运营编辑） */
export const homeCtaContent = {
  title: '以 AI 重塑数字世界与物理世界',
  ctaLabel: '免费获取专属方案',
  ctaHref: '/contact',
}

export const homeProductSystemHeading = {
  eyebrow: '智能底座',
  title: '连接真实业务与人工智能',
  subtitle: '以数据与知识底座桥接企业业务与人工智能。赋能 AI Agent，实现对真实业务的支撑。',
  flowLabel: '智能底座 产品架构图',
}

export const homeProductCards: HomeProductCardData[] = [
  {
    name: '数曜',
    title: '构建企业可信数据资产，打造AI时代的数据基础',
    description:
      '围绕数据采集、治理、开发、资产管理与共享流通，帮助企业建立统一、高质量的数据资产体系，为AI应用持续提供可信数据支撑。',
    icon: 'Database',
  },
  {
    name: '博曜',
    title: '构建企业知识资产，释放组织知识价值',
    description:
      '围绕知识采集、加工、组织与应用，帮助企业沉淀业务经验和行业知识，打造可检索、可推理、持续演进的知识体系。',
    icon: 'FileText',
  },
  {
    name: '探曜',
    title: '连接工业现场，驱动制造智能升级',
    description:
      '聚焦工业物联网与 Manufacturing AI，提供设备互联、实时感知、生产优化和智能决策能力，推动制造过程持续智能化。',
    icon: 'RadioTower',
  },
  {
    name: '智曜',
    title: '构建企业AI基础设施，夯实智能应用底座',
    description:
      '提供模型、算力、推理、Token 与 AI 开发平台等基础设施产品，为企业构建统一、安全、高效的 AI 运行环境。',
    icon: 'Cpu',
  },
]

export const homeSolutionsHeading: HomeSectionHeading = {
  eyebrow: '解决方案',
  title: '驱动各行业智能提升',
  subtitle: '覆盖智能制造、企业运营、AI基础设施等核心领域，帮助企业快速构建可持续演进的智能化能力',
}

export const homeSolutionItems: HomeSolutionItemData[] = [
  {
    key: 'manufacturing',
    tab: '智能制造',
    title: '智能制造智能中枢',
    englishTitle: 'Manufacturing Intelligence Hub',
    description: '融合 AI、数据与工业物联，打造覆盖制造全流程的智能化能力体系。',
    image: '/images/home/solutions/industrial.K00G2HaS.webp',
    href: '/solutions/manufacturing',
  },
  {
    key: 'environment',
    tab: '智慧储能',
    title: '储能数据与感知',
    englishTitle: 'Environmental Intelligence Sensing',
    description: '贯通感知、数据、分析与优化的储能智能能力体系',
    image: '/images/home/solutions/smart-env.CWc2pooP.webp',
    href: '/cases?category=smart-energy-storage',
  },
  {
    key: 'energy',
    tab: '算电协同',
    title: '算力与能源协同优化',
    englishTitle: 'Energy Intelligence',
    description: '统筹算力、电力、冷却与储能，降低综合成本',
    image: '/images/home/solutions/smart-energy.DHKY-NE1.webp',
    href: '/cases?category=compute-power',
  },
  {
    key: 'water',
    tab: '智慧水利',
    title: '智慧水利知识中枢',
    englishTitle: 'Spatial Reasoning Agent',
    description: '从数据治理到知识决策，构建智慧水利核心能力',
    image: '/images/home/solutions/smart-Water.DHKY-NE1.webp',
    href: '/cases?category=smart-water',
  },
  {
    key: 'compute',
    tab: '智慧教育',
    title: '面向教育场景的AI智能体与智能工作流',
    englishTitle: 'AI Computing Infrastructure',
    description: '从模型调用到任务执行，构建教育 AI 原生能力体系',
    image: '/images/home/solutions/data-center-ai.CDu93Miw.webp',
    href: '/cases?category=smart-education',
  },
  {
    key: 'data',
    tab: 'FDE',
    title: 'FDE解决方案',
    englishTitle: 'Data Engineering',
    description: '深入业务现场，让AI从概念验证走向生产价值',
    image: '/images/home/solutions/data.DHKY-NE1.webp',
    href: '/cases?category=fde',
  },
]

export const homeEcosystemHeading: HomeSectionHeading = {
  eyebrow: '深度服务',
  title: '连接企业 AI 全链路的开放生态',
  subtitle: '连接算力、模型、社区与行业知识，构建开放 AI 生态',
}

export const homeEcosystemCards: HomeEcosystemCardData[] = [
  {
    title: 'Token Hub',
    description: '统一管理企业 AI Token，实现模型调用、配额控制与成本管理',
    tag: 'AI Token Service',
    href: '/services/token-hub',
    points: ['支持DeepSeek、Qwen、OpenAI等模型接入', 'Token 配额、成本及调用统计', '企业级统一 API 接入'],
    icon: 'Sparkles',
    variant: 'token',
  },
  {
    title: '智能体社区',
    description: '汇聚行业智能体、实践案例与开发资源，加速 AI 应用落地',
    tag: 'Agent Community',
    href: '/community',
    points: ['行业智能体持续更新', '开源项目与实践案例', '社区交流与技术分享'],
    icon: 'Bot',
    variant: 'agent',
  },
  {
    title: '算力与基础设施',
    description: '提供海外 AI 服务器供应、算力中心建设及基础设施交付。',
    tag: 'AI Infrastructure',
    href: '/services/infrastructure',
    icon: 'Cpu',
    variant: 'infra',
  },
  {
    title: '行业白皮书',
    description: 'AI 行业前沿研究、技术实践与数字化建设参考。',
    tag: 'Industry Insights',
    href: '/resources/reports',
    icon: 'FileText',
    variant: 'report',
  },
]

export const homeAboutContent: HomeAboutContentData = {
  eyebrow: '关于我们',
  title: '深度数智，企业AI基础设施赛道的构建者与引领者',
  bannerImage: '/O1CN0.png',
  bannerAlt: '深度数智企业 AI 基础设施能力',
  clientsLabelImage: '/clients-label.webp',
  clientsLabelAlt: '世界级客户的选择',
}

export const homeInsightsHeading: HomeInsightsHeadingData = {
  eyebrow: '资源',
  title: '创新、洞察与新闻',
  moreLabel: '查看全部资源',
  moreHref: '/insights',
}

/** 首页 CTA 指标带（与 CtaSection 内建默认一致；seed 显式落库供运营编辑） */
export const homeCtaMetrics: HomeCtaMetricData[] = [
  { label: '新一代智能基础设施' },
  { label: '四大智能技术底座' },
  { label: '覆盖关键产业场景' },
]
