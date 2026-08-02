import {
  Activity,
  ArrowLeftRight,
  BadgeCheck,
  Blocks,
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

export interface DgpFeatureItem {
  title: string
  description: string
  icon: Component
}

export interface DgpSystemCard {
  title: string
  description: string
}

export interface DgpEvolutionItem {
  eyebrow: string
  title: string
  description: string
  bullets: string[]
}

export interface DgpUseCase {
  key: string
  tab: string
  title: string
  description: string
  href: string
}

export const dgpCoreValues: DgpFeatureItem[] = [
  {
    title: '让数据快速可用',
    description:
      '把数仓与各类数据源中的数据三分钟封装为标准 API，无需逐个开发接口，加快数据对外开放。',
    icon: Sparkles,
  },
  {
    title: '统一数据服务出口',
    description: '生成与已有 API 统一纳管到 API 市场，接口格式、调用方式与权限统一，告别接口散乱。',
    icon: Network,
  },
  {
    title: '保障调用安全可控',
    description: '申请-授权流程配合多种签名鉴权与限流，控制谁能调、调多少，保障数据输出安全。',
    icon: ShieldCheck,
  },
  {
    title: '支撑高并发稳定服务',
    description: 'API 网关、横向扩展与缓存加速，支撑大调用量下的稳定、低延迟数据服务。',
    icon: Gauge,
  },
]

export const dgpSystemCards: DgpSystemCard[] = [
  {
    title: '数据接入',
    description:
      '统一连接数据库、API、文件、消息队列、IoT 等多源异构数据，构建标准化的数据接入体系，实现企业数据的高效汇聚与统一管理。',
  },
  {
    title: '智能治理',
    description:
      '围绕数据标准、数据质量、元数据、标签体系及资产管理，建立全生命周期治理机制，持续提升数据的准确性、一致性与可信度。',
  },
  {
    title: '数据赋能',
    description:
      '将治理后的高质量数据以数据服务、共享交换、分析应用等方式持续输出，为企业决策分析、业务创新及 AI 应用提供可靠的数据支撑。',
  },
]

export const dgpCapabilities: DgpFeatureItem[] = [
  {
    title: '数据集成',
    description:
      '对数据进行建模、清洗、转换、抽取等工作，既可对多源异构数据进行整合，也可为数据应用提供数据模型。',
    icon: Blocks,
  },
  {
    title: '数据交换',
    description: '用于实现异构系统间的数据传输交换，可提供文件、接口、数据库等多种交换方式。',
    icon: ArrowLeftRight,
  },
  {
    title: '实时计算存储',
    description: '海量数据分布式高效存储和统一管理，为企业业务决策提供实时的数据支撑。',
    icon: ServerCog,
  },
  {
    title: '元数据',
    description: '描述数据特征的数据，是数据治理的基础，可分析数据来龙去脉，提供血缘关系、影响分析及数据地图等。',
    icon: Layers3,
  },
  {
    title: '数据标准',
    description: '对数据进行统一约束和规范，评估标准落地情况，提供系统建设依据。',
    icon: BadgeCheck,
  },
  {
    title: '数据质量',
    description: '发现质量问题，提供绩效评分，出具质量分析报告，发起数据整改。让数据清澈如水。',
    icon: Activity,
  },
  {
    title: '主数据',
    description: '对需要共享的数据建立统一视图和集中管理，为各业务系统数据调用提供黄金数据。',
    icon: Database,
  },
  {
    title: '数据资产',
    description: '将数据作为资产，对外提供数据服务，进行不同角色的目录化管理，获知资产访问方式、利用情况等。',
    icon: Tags,
  },
]

export const dgpEvolutionItems: DgpEvolutionItem[] = [
  {
    eyebrow: '统一治理',
    title: '一个平台，治理全域数据',
    description:
      '统一连接数据库、API、文件、消息队列及 IoT 等多源异构数据，将分散的数据治理工具整合至同一平台，构建覆盖数据全生命周期的一体化治理体系。',
    bullets: ['多源异构数据统一接入', '数据标准与元数据统一管理', '数据治理流程统一编排'],
  },
  {
    eyebrow: '质量可信',
    title: '让每一份数据准确、完整、可信',
    description:
      '围绕数据完整性、准确性、一致性和及时性建立自动化质量管控机制，持续发现、定位和修复数据问题，保障关键业务数据稳定可靠。',
    bullets: ['自动化数据质量检测', '数据血缘与影响分析', '问题发现、告警与闭环整改'],
  },
  {
    eyebrow: '资产赋能',
    title: '让数据从资源转化为资产',
    description:
      '通过数据目录、标签体系、资产盘点和服务发布，将治理后的数据统一沉淀为可查找、可理解、可使用的数据资产，为业务分析与 AI 应用持续供给高质量数据。',
    bullets: ['企业数据资产统一目录', '数据标签与资产画像', '数据服务与共享应用'],
  },
]

export const dgpUseCases: DgpUseCase[] = [
  {
    key: 'government',
    tab: '政务数据',
    title: '政务数据治理',
    description:
      '打通跨部门、跨层级数据资源，建立统一的数据标准、数据目录与共享交换体系，支撑公共数据资源高效流通与应用。',
    href: '/solutions/public-sector-data',
  },
  {
    key: 'manufacturing',
    tab: '智能制造',
    title: '物联数据汇聚与治理',
    description:
      '统一采集设备、MES、ERP、SCADA 等多源数据，构建制造数据底座，为质量分析、设备预测及 AI 应用提供可信数据。',
    href: '/solutions/manufacturing',
  },
  {
    key: 'predictive-maintenance',
    tab: '预测性维护',
    title: '预测性维护',
    description: '从关键资产采集实时振动、温度和使用数据，为 AI/ML 模型提供输入，在故障发生前精准预测。',
    href: '/solutions/predictive-maintenance',
  },
  {
    key: 'energy',
    tab: '能源电力',
    title: '数据引擎',
    description: '汇聚设备、监测、调度及业务数据，形成统一能源数据底座，为设备运维、负荷预测及能源优化提供数据支撑。',
    href: '/solutions/energy',
  },
]

export const dgpCtaActions = [
  { label: '咨询合作', href: '/contact', variant: 'primary' as const },
  { label: '申请试用', href: '/try', variant: 'secondary' as const },
]
