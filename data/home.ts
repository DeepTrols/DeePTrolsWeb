import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  Cpu,
  Database,
  Factory,
  FileText,
  Gauge,
  Landmark,
  Network,
  Orbit,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from '@lucide/vue'
import type { Component } from 'vue'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import boyaoLogo from '../assets/images/brand/boyao-logo.svg?url'
import deepseekLogo from '../assets/images/brand/deepseek-logo.svg?url'
import kimiLogo from '../assets/images/brand/kimi-logo.svg?url'
import qwenLogo from '../assets/images/brand/qwen-logo.svg?url'
import shuyaoLogo from '../assets/images/brand/shuyao-logo.svg?url'
import tanyaoIotLogo from '../assets/images/brand/tanyao-iot-logo.svg?url'
import zhipuLogo from '../assets/images/brand/zhipu-logo.svg?url'
import zhiyaoLogo from '../assets/images/brand/zhiyao-logo.svg?url'
import logo360 from '../assets/images/compatibility/360-logo.svg?url'
import baolandeLogo from '../assets/images/compatibility/baolande-logo.svg?url'
import damengLogo from '../assets/images/compatibility/dameng-logo.svg?url'
import dongfangtongLogo from '../assets/images/compatibility/dongfangtong-logo.svg?url'
import feitengLogo from '../assets/images/compatibility/feiteng-logo.svg?url'
import gaussdbLogo from '../assets/images/compatibility/gaussdb.svg?url'
import haiguangLogo from '../assets/images/compatibility/haiguang-logo.svg?url'
import honglianhuaLogo from '../assets/images/compatibility/honglianhua-logo.svg?url'
import jindieTianyanLogo from '../assets/images/compatibility/jindie-tianyan-logo.svg?url'
import kunpengLogo from '../assets/images/compatibility/kunpeng-logo.svg?url'
import longxinLogo from '../assets/images/compatibility/longxin-logo.svg?url'
import qilinLogo from '../assets/images/compatibility/qilin-series-logo.svg?url'
import rendaJincangLogo from '../assets/images/compatibility/renda-jincang-logo.svg?url'
import shenzhouTongyongLogo from '../assets/images/compatibility/shenzhou-tongyong-logo.svg?url'
import tongxinUosLogo from '../assets/images/compatibility/tongxin-uos-logo.svg?url'
import wpsLogo from '../assets/images/compatibility/wps-logo.svg?url'
import yongzhongLogo from '../assets/images/compatibility/yongzhong-office-logo.svg?url'
import zhaoxinLogo from '../assets/images/compatibility/zhaoxin-logo.svg?url'
import zhongchuangLogo from '../assets/images/compatibility/zhongchuang-logo.svg?url'
import zhongkeFangdeLogo from '../assets/images/compatibility/zhongke-fangde-logo.svg?url'
import { customerLogos } from './home-logos'
import { homeAboutContent, homeEcosystemCards, homeProductCards, homeSolutionItems } from './home-sections'

export interface Deliverable {
  title: string
  description: string
  icon: Component
  image: string
  href: string
}

export interface ProductCard {
  name: string
  title: string
  description: string
  icon: Component
}

export interface SolutionItem {
  key: string
  tab: string
  title: string
  englishTitle: string
  description: string
  image: string
  href: string
}

export interface EcosystemCard {
  title: string
  description: string
  tag: string
  href: string
  points?: string[]
  icon: Component
  variant: 'token' | 'agent' | 'infra' | 'report'
}

export interface CustomerStoryStat {
  value: string
  label: string
  icon: Component
}

export interface CustomerStory {
  name: string
  logoText: string
  title: string
  description: string
  image: string
  href: string
  stats: CustomerStoryStat[]
}

// InsightItem 与 insights 已抽到 data/home-insights.ts（015.12：server 路由回退需避开本文件的 ?url 资源导入）
export type { InsightItem } from './home-insights'
export { insights } from './home-insights'

// CustomerLogo 与 customerLogos 已抽到 data/home-logos.ts（015.14：server 路由回退需避开本文件的 ?url 资源导入）
export type { CustomerLogo } from './home-logos'
export { customerLogos }

export interface HomeAboutPartner {
  name: string
  image?: string
  text?: string
}

export interface HomeAboutContent {
  eyebrow: string
  title: string
  bannerImage: string
  bannerAlt: string
  clientsLabelImage: string
  clientsLabelAlt: string
  partnerRows: HomeAboutPartner[][]
}

// 首页段字面值已抽到 data/home-sections.ts（015.18：server seed/parity 需避开本文件的 ?url 资源导入）；
// 此处解析图标字符串为组件并保持导出签名不变
const iconOf = (name: string): Component => resolveNavIcon(name) ?? FileText

export const homeAbout: HomeAboutContent = {
  ...homeAboutContent,
  partnerRows: [
    [
      ...customerLogos,
      { name: '数曜', image: shuyaoLogo },
      { name: '博曜', image: boyaoLogo },
      { name: '探曜', image: tanyaoIotLogo },
      { name: '智曜', image: zhiyaoLogo },
      { name: 'DeepSeek', image: deepseekLogo },
      { name: 'Qwen', image: qwenLogo },
    ],
    [
      { name: '360', image: logo360 },
      { name: '鲲鹏', image: kunpengLogo },
      { name: 'GaussDB', image: gaussdbLogo },
      { name: '麒麟软件', image: qilinLogo },
      { name: '达梦数据库', image: damengLogo },
      { name: 'WPS', image: wpsLogo },
      { name: '统信 UOS', image: tongxinUosLogo },
      { name: '宝兰德', image: baolandeLogo },
      { name: '海光', image: haiguangLogo },
      { name: '龙芯', image: longxinLogo },
      { name: '兆芯', image: zhaoxinLogo },
      { name: '飞腾', image: feitengLogo },
      { name: '人大金仓', image: rendaJincangLogo },
      { name: '东方通', image: dongfangtongLogo },
    ],
    [
      { name: '智谱 AI', image: zhipuLogo },
      { name: 'Kimi', image: kimiLogo },
      { name: '金蝶天燕', image: jindieTianyanLogo },
      { name: '永中 Office', image: yongzhongLogo },
      { name: '中创中间件', image: zhongchuangLogo },
      { name: '中科方德', image: zhongkeFangdeLogo },
      { name: '神州通用', image: shenzhouTongyongLogo },
      { name: '红莲花', image: honglianhuaLogo },
      { name: '武汉大数据', image: '/images/logos/wh-bigdata.png' },
      { name: '一汽丰田', image: '/images/logos/faw-toyota.png' },
      { name: '同仁堂健康', image: '/images/logos/tongrentang.png' },
      { name: '北京航空航天大学', image: '/images/logos/beihang.png' },
    ],
  ],
}

export const deliverables: Deliverable[] = [
  {
    title: '企业级 AI 应用构建与业务智能化服务',
    description:
      '通过连接企业数据、知识、模型与业务系统，围绕企业真实业务场景，提供从需求梳理、场景规划、智能体设计到应用开发、系统集成和持续运营的全流程服务。',
    icon: BrainCircuit,
    image: '/images/home/solutions/industrial.K00G2HaS.webp',
    href: '/services/enterprise-ai-delivery',
  },
  {
    title: '企业级 AI 平台工程与数字化系统建设服务',
    description:
      '面向企业 AI 应用规模化建设需求，提供统一技术架构、平台研发、系统集成、数据工程、知识工程、模型服务和智能体工程等平台工程服务。',
    icon: Waypoints,
    image: '/images/home/solutions/data.DHKY-NE1.webp',
    href: '/services/platform-engineering',
  },
  {
    title: 'AI 算力、模型与基础资源一体化服务',
    description:
      '围绕企业 AI 应用所需的算力、模型、数据和开发资源，提供 AI 服务器、算力中心规划建设、异构算力调度、模型接入管理、Token 管理及资源运营服务。',
    icon: Cpu,
    image: '/images/home/solutions/data-center-ai.CDu93Miw.webp',
    href: '/services/infrastructure',
  },
]

export const platformInputs = [
  { label: '数据', icon: Database },
  { label: '知识', icon: FileText },
  { label: 'Token', icon: Sparkles },
  { label: '算力', icon: Cpu },
  { label: '安全', icon: ShieldCheck },
]

export const platformOutputs = [
  {
    title: '智能制造',
    rows: [
      { name: 'Manufacturing Brain', value: '规划 | 预测 | 排产', icon: Factory },
      { name: 'Manufacturing Intelligence', value: '质量 | 设备 | 供应链', icon: Gauge },
      { name: 'Manufacturing Copilot', value: '能源 | 安全 | 经营', icon: Bot },
    ],
  },
  {
    title: '企业AI应用',
    rows: [
      { name: 'Enterprise Brain', value: '知识 | 分析 | 决策', icon: BrainCircuit },
      { name: 'Enterprise Intelligence', value: '营销 | 销售 | 服务', icon: ChartNoAxesCombined },
      { name: 'Enterprise Copilot', value: '办公 | 协同 | 执行', icon: Bot },
    ],
  },
  {
    title: 'AI基础设施',
    rows: [
      { name: 'AI Infrastructure Brain', value: '调度 | 编排 | 治理', icon: Orbit },
      { name: 'AI Infrastructure Intelligence', value: '算力 | 模型 | 平台', icon: Network },
      { name: 'AI Infrastructure Copilot', value: '开发 | 运维 | 服务', icon: Cpu },
    ],
  },
]

export const productCards: ProductCard[] = homeProductCards.map((card) => ({ ...card, icon: iconOf(card.icon) }))

export const solutions: SolutionItem[] = homeSolutionItems

export const ecosystemCards: EcosystemCard[] = homeEcosystemCards.map((card) => ({ ...card, icon: iconOf(card.icon) }))

export const customerStoryStats: CustomerStoryStat[] = [
  { value: '国家级', label: '数据基础设施试点', icon: Landmark },
  { value: '公共数据', label: '交易流通平台', icon: Building2 },
  { value: '数据要素', label: '可信流通', icon: CheckCircle2 },
]

export const customerStories: CustomerStory[] = [
  {
    name: '武汉大数据',
    logoText: 'WH',
    title: '构建国家级数据基础设施，释放公共数据价值',
    description:
      '围绕公共数据交易流通平台建设，提供数据汇聚、数据治理、可信流通及共享交换能力，支撑武汉国家级数据基础设施试点建设。',
    image: '/images/home/solutions/data.DHKY-NE1.webp',
    href: '/cases/wuhan-data',
    stats: customerStoryStats,
  },
  {
    name: '一汽丰田',
    logoText: 'FT',
    title: '打造制造数据闭环，提升智能运营效率',
    description:
      '连接生产、质量、设备与供应链数据，构建可持续演进的数据与知识底座，让智能分析和运营决策进入真实业务流程。',
    image: '/images/home/solutions/industrial.K00G2HaS.webp',
    href: '/cases/manufacturing-intelligence',
    stats: [
      { value: '跨系统', label: '制造数据联通', icon: Network },
      { value: '智能化', label: '运营决策支撑', icon: BrainCircuit },
      { value: '可持续', label: '能力持续演进', icon: CheckCircle2 },
    ],
  },
  {
    name: '同仁堂健康',
    logoText: 'TRT',
    title: '沉淀行业知识资产，支撑健康业务智能化',
    description:
      '围绕知识采集、组织、检索与应用，帮助业务团队沉淀行业经验和产品知识，提升服务响应、内容生产与经营分析效率。',
    image: '/images/home/solutions/smart-env.CWc2pooP.webp',
    href: '/cases/knowledge-intelligence',
    stats: [
      { value: '知识库', label: '业务经验沉淀', icon: FileText },
      { value: 'AI辅助', label: '服务响应提效', icon: Bot },
      { value: '经营侧', label: '洞察分析支持', icon: ChartNoAxesCombined },
    ],
  },
]

export const arrowIcon = ArrowRight
