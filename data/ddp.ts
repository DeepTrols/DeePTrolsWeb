import {
  Activity,
  Blocks,
  Database,
  Gauge,
  Layers3,
  Network,
  ServerCog,
  ShieldCheck,
  Sparkles,
} from '@lucide/vue'
import type { Component } from 'vue'

export interface DdpFeatureItem {
  title: string
  description: string
  icon?: Component
  iconLabel?: string
}

export interface DdpTimelineItem {
  number: string
  category: string
  title: string
  description: string
  bullets: string[]
}

export const ddpHeroActions = [
  { label: '申请试用', href: '/try', variant: 'primary' as const },
  { label: '了解更多', href: '#ddp-challenge', variant: 'secondary' as const },
]

export const ddpChallengeItems: DdpFeatureItem[] = [
  {
    title: '数据孤岛难破除',
    description: '业务发展，数据架构持续演进，形成多层级、跨结构的离散数据源。',
    icon: Network,
  },
  {
    title: '传统开发模式跟不上敏捷需求',
    description: '数据需求数量呈爆发式增长,数据研发周期长，资源瓶颈显现。',
    icon: Blocks,
  },
  {
    title: '数据时效性和准确性低',
    description: '数据采集滞后性严重，数据开发过程缺管控，导致在交付端的质量堪忧。',
    icon: Gauge,
  },
  {
    title: '开发成本高的问题无解',
    description: '粗犷式的需求响应模式造成大量的存算资源与时间成本的付出，开发成果利用率低。',
    icon: ServerCog,
  },
]

export const ddpAdvantages: DdpFeatureItem[] = [
  {
    title: '更快的实施数据集成',
    description:
      '数十种数据源连接器，无需开发适配，即接即用，数据同步，数据迁移，数据入湖场景功能简单高效易操作，数据实时保鲜，最快数分钟即可完成数据集成任务。',
    icon: Sparkles,
  },
  {
    title: '更短的数据开发周期',
    description:
      '自动化生成 ETL 作业和作业编排，实时监控资源和作业负载，智能优化资源与自适应的查询加速引擎确保大规模数据性能稳定。人工作业量下降 70%+，生产周期可从一周缩短至一天。',
    icon: Gauge,
  },
  {
    title: '更敏捷的数据消费',
    description:
      '提供丰富的数据共享交换服务模式，满足数据收集到数据消费全链路取数和用数场景。面向业务，屏蔽不同底层引擎的技术差异与复杂性，数据消费需求响应效率提升 10 倍。',
    icon: Activity,
  },
  {
    title: '更合理的基础设施投资',
    description:
      '提供混合云/多云/本地化支持，易于部署且方式多样，单体、集群、容器化均有成熟部署路径。智能化监控作业与资源分配使用，能按需动态扩展或升级，保障IT设施投入更加合理。',
    icon: ShieldCheck,
  },
]

export const ddpTimelineItems: DdpTimelineItem[] = [
  {
    number: '01',
    category: '数据集成',
    title: '多源数据统一接入',
    description:
      '通过丰富的数据连接器，实现多源异构数据统一采集、同步与迁移，打通企业数据孤岛，构建统一的数据接入体系。',
    bullets: ['支持多源异构数据接入', '一键同步与数据迁移', '实时采集与统一管理'],
  },
  {
    number: '02',
    category: '数据开发',
    title: '统一开发与集中管控',
    description:
      '提供低代码与 SQL 双模式开发能力，支持湖仓一体、批流一体架构，实现数据开发标准化、协同化与安全化。',
    bullets: ['低代码与 SQL 双模式开发', '湖仓一体、批流一体架构', '数据原地加工与共享'],
  },
  {
    number: '03',
    category: '任务编排',
    title: '智能任务编排调度',
    description:
      '依托元数据与智能调度能力，实现数据任务自动编排、依赖管理与资源优化，提升数据生产效率与稳定性。',
    bullets: ['自动化任务编排与调度', '智能依赖分析与优化', '资源动态分配与管理'],
  },
  {
    number: '04',
    category: '持续交付',
    title: '持续集成与敏捷交付',
    description:
      '覆盖数据开发、测试、发布、监控全生命周期，建立持续交付体系，保障数据资产长期稳定、高质量运行。',
    bullets: ['全生命周期持续交付', '开发、测试、发布一体化', '数据质量持续保障'],
  },
]

export const ddpUnifiedDevelopmentItems: DdpFeatureItem[] = [
  {
    title: '统一数据接入',
    description:
      '连接数据库、消息系统、业务系统及数据湖，实现多源异构数据统一采集、实时同步与集中管理，构建可靠的数据接入能力。',
    iconLabel: '01',
  },
  {
    title: '智能数据解析',
    description:
      '自动完成数据解析、清洗、转换与分类，统一数据结构和业务口径，为后续开发、治理与分析提供高质量数据基础。',
    iconLabel: '02',
  },
  {
    title: '可视化编排',
    description:
      '通过可视化节点编排与智能任务调度，灵活构建数据处理流程，实现加工逻辑标准化、自动化与可复用。',
    iconLabel: '03',
  },
  {
    title: '持续交付',
    description:
      '覆盖开发、测试、发布、监控与优化全流程，实现数据任务持续交付、异常告警与智能迭代，保障数据长期稳定可用。',
    iconLabel: '04',
  },
]

export const ddpUseCaseItems: DdpFeatureItem[] = [
  {
    title: '企业数据中台',
    description:
      '连接 ERP、CRM、MES、IoT 等业务系统，统一完成数据采集、开发、加工与共享，支撑企业数据治理与业务分析。',
    icon: Database,
  },
  {
    title: '实时数据处理',
    description: '支持流批一体的数据开发模式，实现实时采集、实时计算与实时同步，满足监控预警、运营分析等实时业务需求。',
    icon: Activity,
  },
  {
    title: 'AI 数据底座',
    description:
      '统一数据开发、清洗、转换与交付流程，为大模型、智能体及 AI 应用持续提供高质量、可信赖的数据资产。',
    icon: Layers3,
  },
]

export const ddpCtaActions = [
  { label: '立即咨询', href: '/contact', variant: 'primary' as const },
  { label: '申请试用', href: '/try', variant: 'secondary' as const },
]
