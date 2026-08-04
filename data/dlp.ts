import {
  Activity,
  BadgeCheck,
  Blocks,
  Boxes,
  Database,
  Gauge,
  Layers3,
  Network,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Tags,
} from '@lucide/vue'
import type { Component } from 'vue'

export interface DlpFeatureItem {
  title: string
  description: string
  icon: Component
}

export interface DlpTimelineItem {
  number: string
  category: string
  title: string
  description: string
  bullets: string[]
  icon: Component
}

export const dlpHeroActions = [
  { label: '申请试用', href: '/try', variant: 'primary' as const },
  { label: '了解更多', href: '#dlp-challenge', variant: 'secondary' as const },
]

export const dlpChallengeItems: DlpFeatureItem[] = [
  {
    title: '标准混乱',
    description:
      '缺乏统一的标签标准和管理规范，不同部门各自定义标签，命名、口径与计算规则不一致，导致重复建设、数据难以共享，业务协同效率持续下降。',
    icon: BadgeCheck,
  },
  {
    title: '开发繁琐',
    description:
      '标签创建高度依赖 SQL 开发和人工维护，从需求提出到上线周期长。面对频繁变化的业务需求，开发资源持续投入，标签生产效率难以提升。',
    icon: Blocks,
  },
  {
    title: '治理缺失',
    description:
      '随着标签数量不断增长，缺乏质量、血缘、版本及生命周期管理能力，标签可信度和可维护性逐渐降低，治理成本不断增加。',
    icon: ShieldCheck,
  },
  {
    title: '价值孤岛',
    description:
      '标签分散在不同业务系统和数据平台，缺少统一的服务能力，难以支撑分析、营销、运营及 AI 等多场景应用，数据价值无法持续释放。',
    icon: Network,
  },
]

export const dlpAdvantages: DlpFeatureItem[] = [
  {
    title: '统一标签标准',
    description: '建立统一的标签规范、命名规则和业务口径，避免重复建设，提升标签一致性与共享能力。',
    icon: BadgeCheck,
  },
  {
    title: '可视化建模',
    description: '通过可视化方式快速完成标签设计与配置，降低开发门槛，提升标签生产效率。',
    icon: Layers3,
  },
  {
    title: '自动化生产',
    description: '支持定时、实时等多种标签计算模式，实现标签自动生成、更新与持续维护。',
    icon: ServerCog,
  },
  {
    title: '全程治理',
    description: '提供标签血缘、质量、版本、生命周期等治理能力，保障标签可信、可管、可追溯。',
    icon: ShieldCheck,
  },
  {
    title: '标签服务',
    description: '统一提供标签查询、开放接口和服务能力，实现 BI、营销、运营及 AI 应用共享调用。',
    icon: Tags,
  },
  {
    title: 'AI 深度融合',
    description: '面向大模型和智能体提供高质量标签数据支撑，为画像分析、智能推荐、精准运营等 AI 场景持续赋能。',
    icon: Sparkles,
  },
]

export const dlpTimelineItems: DlpTimelineItem[] = [
  {
    number: '01',
    category: '标签建模',
    title: '统一定义标签标准',
    description:
      '通过统一的标签目录、命名规范和业务口径，建立标准化标签模型，减少跨部门理解偏差与重复建设。',
    bullets: ['统一标签分类与命名规范', '支持基础、规则与组合标签', '沉淀可复用的标签模型'],
    icon: Boxes,
  },
  {
    number: '02',
    category: '标签生产',
    title: '快速完成标签生产',
    description: '通过可视化配置与自动化计算能力，降低标签开发门槛，快速响应持续变化的业务需求。',
    bullets: ['可视化配置标签规则', '支持离线与实时计算', '自动调度标签更新任务'],
    icon: Gauge,
  },
  {
    number: '03',
    category: '标签治理',
    title: '让标签持续可信可用',
    description:
      '围绕质量、血缘、版本和生命周期进行统一治理，确保每个标签来源清晰、口径一致、状态可控。',
    bullets: ['追踪标签来源与加工血缘', '管理标签版本与变更记录', '监测质量、热度与使用状态'],
    icon: ShieldCheck,
  },
  {
    number: '04',
    category: '标签服务',
    title: '统一开放标签能力',
    description:
      '将分散的标签转化为标准化服务，通过接口、查询与人群圈选能力，为不同业务系统提供统一调用入口。',
    bullets: ['提供统一标签查询服务', '支持 API 与批量数据输出', '支持人群筛选与标签组合'],
    icon: Tags,
  },
  {
    number: '05',
    category: '场景应用',
    title: '驱动数据与 AI 应用',
    description: '将高质量标签快速应用于用户洞察、精准运营、风险识别和 AI 场景，让标签真正进入业务流程。',
    bullets: ['支撑用户画像与精细化运营', '服务推荐、营销与风险分析', '为模型与智能体提供标签数据'],
    icon: Sparkles,
  },
]

export const dlpAssetItems: DlpFeatureItem[] = [
  {
    title: '主体对象自由定义',
    description:
      '万物皆对象，万物皆可建模。支持用户自定义实体对象(Object) 对现实世界建模，并通过可视化配置将主体对象与数据湖中的原料数据表进行映射，以备标签加工时使用。',
    icon: Database,
  },
  {
    title: '标签定义模式丰富',
    description:
      '提供拖拽模式、圈选模式、轻量脚本等多种可视化标签定义模式，最大化满足业务专家灵活便捷自定义标签需求。',
    icon: Layers3,
  },
  {
    title: '动态打标自动落库',
    description: '标签加工引擎读取标签加工规则自动加工标签数据，加工结果自动落表，标签数据物理分散存储、逻辑统一，用户无感。',
    icon: Activity,
  },
  {
    title: '标签即服务',
    description: '提供基于标签体系在线发布API服务、基于标签进行查询与分析的自助式服务，实现价值数据萃取和便捷服务化。',
    icon: Tags,
  },
]

export const dlpUseCaseItems: DlpFeatureItem[] = [
  {
    title: '精准用户运营',
    description: '基于统一标签体系构建用户画像，支持人群圈选、精准营销和个性化运营，提升用户触达效率与转化效果。',
    icon: Tags,
  },
  {
    title: '企业数据分析',
    description: '通过标签沉淀业务特征，支撑经营分析、指标监测和多维洞察，帮助企业快速发现业务机会。',
    icon: Activity,
  },
  {
    title: 'AI 智能应用',
    description: '为大模型、智能体和推荐系统提供高质量标签数据，提升 AI 对业务的理解能力和决策效果。',
    icon: Sparkles,
  },
]

export const dlpCtaActions = [
  { label: '立即咨询', href: '/contact', variant: 'primary' as const },
  { label: '申请试用', href: '/try', variant: 'secondary' as const },
]
