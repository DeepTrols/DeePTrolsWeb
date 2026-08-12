import {
  Activity,
  ArrowLeftRight,
  Blocks,
  Database,
  Gauge,
  Gavel,
  HardDrive,
  Layers3,
  Network,
  ScrollText,
  ServerCog,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from '@lucide/vue'
import type { Component } from 'vue'

export type DmsHeroStage = 'intake' | 'risk' | 'disposal'

export interface DmsHeroTab {
  id: DmsHeroStage
  title: string
  icon: Component
}

export interface DmsHeroField {
  label: string
  value: string
}

export interface DmsHeroRiskRule {
  label: string
  risk?: boolean
}

export const dmsHeroTitle = '数据要素监管中心'

export const dmsHeroTabs: DmsHeroTab[] = [
  { id: 'intake', title: '流通接入', icon: ArrowLeftRight },
  { id: 'risk', title: '风险识别', icon: ShieldAlert },
  { id: 'disposal', title: '监管处置', icon: Gavel },
]

export const dmsHeroIntakeBadge = '4 个接入项'

export const dmsHeroIntakeFields: DmsHeroField[] = [
  { label: '交易编号', value: 'TX-20260811-042' },
  { label: '数据产品', value: '企业经营分析数据集' },
  { label: '提供方', value: '数源科技' },
  { label: '使用方', value: '智联科技' },
  { label: '使用目的', value: '风险评估' },
  { label: '授权期限', value: '2026-12-31' },
]

export const dmsHeroIntakeSteps = ['交易平台', '授权信息', '合同信息', '主体信息']

export const dmsHeroIntakeHint = '检测到新的数据流通活动，正在进入监管流程'

export const dmsHeroRiskRules: DmsHeroRiskRule[] = [
  { label: '主体资质有效' },
  { label: '数据产品已备案' },
  { label: '使用目的已授权' },
  { label: '敏感字段超范围', risk: true },
  { label: '授权期限有效' },
]

export const dmsHeroRiskSummary: DmsHeroField[] = [
  { label: '交易编号', value: 'TX-20260811-042' },
  { label: '数据产品', value: '企业经营分析数据集' },
  { label: '用途', value: '风险评估' },
  { label: '字段', value: '128' },
  { label: '敏感字段', value: '6' },
  { label: '授权字段', value: '124' },
]

export const dmsHeroRiskHint = '检测到 4 个字段超出授权范围，触发监管规则'

export const dmsHeroDisposalFields: DmsHeroField[] = [
  { label: '风险等级', value: '中风险' },
  { label: '触发规则', value: '数据使用范围校验' },
  { label: '涉及主体', value: '智联科技' },
  { label: '处置状态', value: '处理中' },
]

export const dmsHeroDisposalEvent = { id: 'EVT-20260811-017', level: '中风险' }

export const dmsHeroDisposalSteps = ['发现风险', '生成预警', '创建工单', '通知责任方']

export const dmsHeroDisposalDone = '监管工单已创建'

export const dmsHeroDisposalHint = '风险事件已进入处置流程，全程留痕可追溯'

export interface DmsFeatureItem {
  title: string
  description: string
  icon?: Component
  iconLabel?: string
}

export interface DmsTimelineItem {
  number: string
  category: string
  title: string
  description: string
  bullets: string[]
}

export interface DmsValueItem {
  metric: string
  title: string
  description: string
  detail: string
}

export const dmsHeroActions = [
  { label: '申请试用', href: '/try', variant: 'primary' as const },
  { label: '了解更多', href: '#dms-challenge', variant: 'secondary' as const },
]

export const dmsChallengeItems: DmsFeatureItem[] = [
  {
    title: '风险发现滞后',
    description: '异常行为依赖人工巡检，难以及时发现违规事件。',
    icon: Gauge,
  },
  {
    title: '缺少统一监管规则',
    description: '监管标准分散，难以形成统一监管体系。',
    icon: ShieldCheck,
  },
  {
    title: '事件处置效率低',
    description: '风险发现后依赖人工流转，处理周期长。',
    icon: ServerCog,
  },
  {
    title: '缺乏全过程追溯',
    description: '无法完整记录事件产生、处理、解除全过程。',
    icon: ScrollText,
  },
]

export const dmsCapabilities: DmsFeatureItem[] = [
  {
    title: '统一监管规则',
    description: '统一配置监管规则、风险等级与执行动作，实现监管标准统一管理。',
    icon: ShieldCheck,
  },
  {
    title: '实时风险监测',
    description: '持续监测主体、产品、交易、交付等业务过程，自动发现异常行为。',
    icon: Activity,
  },
  {
    title: '智能事件预警',
    description: '根据规则自动生成预警事件，支持事件收敛，避免重复预警。',
    icon: Sparkles,
  },
  {
    title: '工单协同处置',
    description: '预警自动生成工单，实现监管部门协同处理和闭环管理。',
    icon: Blocks,
  },
  {
    title: '全生命周期追踪',
    description: '完整记录事件创建、升级、处理、解除全过程。',
    icon: Network,
  },
  {
    title: '监管驾驶舱',
    description: '统一展示规则、事件、工单及风险趋势，辅助监管决策。',
    icon: Gauge,
  },
]

export const dmsTimelineItems: DmsTimelineItem[] = [
  {
    number: '01',
    category: '规则中心',
    title: '统一监管规则',
    description:
      '统一配置监管规则、风险等级与执行策略，覆盖数据主体、数据产品、交易、交付等全流程监管场景。',
    bullets: ['规则分类统一管理', '风险等级分级配置', '多种执行动作组合', '灵活启停与持续迭代'],
  },
  {
    number: '02',
    category: '风险监测',
    title: '实时事件监控',
    description: '持续监测数据流通全过程，自动识别异常行为，第一时间生成预警事件，实现风险实时感知。',
    bullets: ['实时业务监测', '自动风险识别', '智能事件生成', '重复事件自动收敛'],
  },
  {
    number: '03',
    category: '协同处置',
    title: '智能工单闭环',
    description: '事件自动关联工单，支持协同分派、跟踪处理与全过程留痕，形成完整监管闭环。',
    bullets: ['自动创建工单', '多角色协同处理', '全流程状态跟踪', '完整审计追溯'],
  },
  {
    number: '04',
    category: '监管分析',
    title: '可视化监管驾驶舱',
    description: '统一展示规则运行、事件趋势、工单处置与风险分布，帮助监管部门实时掌握整体运行态势。',
    bullets: ['规则运行统计', '风险趋势分析', '高频事件排行', '多维监管指标'],
  },
  {
    number: '05',
    category: '全生命周期',
    title: '全流程监管体系',
    description:
      '覆盖规则配置、风险监测、事件预警、工单处置与监管分析，实现数据要素流通全过程可监管、可追溯、可量化。',
    bullets: ['事前风险预防', '事中实时监测', '事后闭环处置', '全流程监管分析'],
  },
]

export const dmsValueItems: DmsValueItem[] = [
  {
    metric: '100%',
    title: '监管流程覆盖',
    description: '覆盖规则配置、风险监测、事件处置与监管分析，实现数据要素全生命周期监管。',
    detail: '覆盖事前预防、事中监测、事后处置。',
  },
  {
    metric: '24×7',
    title: '实时风险监测',
    description: '持续监测数据要素流通全过程，第一时间发现异常行为并触发预警。',
    detail: '实时监测 · 自动预警 · 快速响应。',
  },
  {
    metric: '360°',
    title: '全景监管分析',
    description: '提供多维统计分析与风险趋势洞察，为监管决策提供全面的数据支撑。',
    detail: '全局洞察 · 风险研判 · 决策支撑。',
  },
  {
    metric: '10X',
    title: '可扩展监管规则',
    description: '支持持续扩展监管规则与监管场景，满足不同业务需求。',
    detail: '主体监管 · 产品监管 · 交易监管 · 交付监管',
  },
]

export const dmsProcessItems: DmsFeatureItem[] = [
  {
    title: '监管规则配置',
    description:
      '构建统一的监管规则体系，支持灵活配置规则类型、风险等级、触发条件与执行动作，为数据主体、数据产品、交易及交付等监管场景建立标准化、可扩展的监管基础。',
    iconLabel: '01',
  },
  {
    title: '实时业务监测',
    description:
      '持续监测数据要素流通全过程，实时采集主体管理、产品开发、交易流转、交付应用等业务数据，全面感知流通过程中的异常行为与风险变化。',
    iconLabel: '02',
  },
  {
    title: '智能风险识别',
    description:
      '基于预设监管规则自动识别违规行为，实时生成预警事件，并通过事件收敛机制避免重复告警，实现风险精准识别与持续跟踪。',
    iconLabel: '03',
  },
  {
    title: '预警通知响应',
    description:
      '根据风险等级自动执行通知、限制、拦截等处置策略，及时向相关责任人发送预警信息，实现风险快速响应与分级处置。',
    iconLabel: '04',
  },
  {
    title: '工单协同处置',
    description:
      '自动关联监管事件生成工单，支持多角色协同处理、状态跟踪与全过程留痕，形成从发现、处置到解除的监管闭环。',
    iconLabel: '05',
  },
  {
    title: '监管分析决策',
    description:
      '汇聚监管规则、预警事件、处置工单及运行数据，通过可视化监管驾驶舱全面展示风险态势、监管成效与趋势分析，为科学监管决策提供数据支撑。',
    iconLabel: '06',
  },
]

export const dmsUseCaseItems: DmsFeatureItem[] = [
  {
    title: '数据交易平台',
    description:
      '围绕数据产品上架、交易撮合、订单签约、产品交付等关键环节，建立统一监管规则和实时风险监测机制，及时发现违规交易、异常行为和履约风险，保障数据交易规范运行。',
    icon: Database,
  },
  {
    title: '公共数据运营',
    description:
      '针对公共数据授权、资源申请、产品开发、开放共享等业务流程，持续监测数据流通全过程，提升公共数据授权运营的规范性、安全性和透明度。',
    icon: Layers3,
  },
  {
    title: '数据要素管理部门',
    description:
      '面向政府监管部门，统一监管规则、预警事件、工单处置与监管分析，实现数据主体、数据产品及流通活动的全过程监管，为科学决策提供数据支撑。',
    icon: HardDrive,
  },
  {
    title: '数据运营机构',
    description:
      '对数据主体管理、产品运营、数据交付及应用服务开展持续监管，自动识别异常风险，形成从预警、处置到追溯的闭环管理，提升运营效率与合规水平。',
    icon: Network,
  },
]

export const dmsCtaActions = [
  { label: '立即咨询', href: '/contact', variant: 'primary' as const },
  { label: '申请试用', href: '/try', variant: 'secondary' as const },
]
