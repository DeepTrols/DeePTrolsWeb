import {
  BookOpen,
  Brain,
  BrainCircuit,
  Database,
  History,
  Network,
  Search,
} from '@lucide/vue'
import type { Component } from 'vue'
import type { ProductFeatureGridItem } from '~/components/common/ProductFeatureGridSection.vue'

export const hydraulicHero = {
  title: '智慧水利解决方案',
  description:
    '融合数曜·数据治理与博曜·企业级知识管理能力，汇聚水利基础、监测、业务与空间数据，构建覆盖知识治理、知识图谱、智能检索与业务推理的智慧水利知识中枢，为防洪减灾、水资源管理及“四预”业务提供可信、智能的决策支撑。',
  image: '/images/solutions/hydraulic-hero.png',
  imageAlt: '智慧水利解决方案',
}

export const hydraulicPains: ProductFeatureGridItem[] = [
  {
    title: '多源数据分散，跨业务信息难以贯通',
    points: ['水利数据来源复杂', '业务系统相互独立', '数据标准口径不一'],
    description:
      '水文、水资源、防洪、工程、空间地理及跨部门数据分布于不同系统，数据结构和标准不统一，跨系统查询、关联与综合分析成本高。',
    icon: Network,
  },
  {
    title: '专业知识分散，行业经验难以沉淀',
    points: ['预案文档大量分散', '专家经验高度隐性', '知识更新传承困难'],
    description:
      '防洪预案、调度规则、技术规范、历史案例及专家经验大量存在于 PDF、Word 和人员经验中，缺乏结构化沉淀与持续复用机制。',
    icon: BookOpen,
  },
  {
    title: '历史场景孤立，辅助决策依赖人工',
    points: ['历史事件检索困难', '相似场景难以匹配', '处置经验复用不足'],
    description:
      '历史洪水、干旱、工程险情及处置过程缺乏统一组织和关联，突发事件发生后仍需人工查找资料、比对历史案例并研判处置方案。',
    icon: History,
  },
  {
    title: '知识与业务脱节，智能应用难以深入',
    points: ['知识无法实时调用', '业务规则难以计算', '“四预”缺乏知识支撑'],
    description:
      '现有应用更多停留在查询、统计与阈值告警层面，知识、规则、实时数据与业务流程尚未形成深度连接，难以支撑复杂水利场景的智能分析与辅助决策。',
    icon: Brain,
  },
]

export interface HydraulicCapabilityCard {
  title: string
  points: string[]
  description: string
}

export const hydraulicCapabilities: HydraulicCapabilityCard[] = [
  {
    title: '水利知识库管理',
    points: ['多源专业资料统一汇聚', '预案规则结构化管理', '知识全生命周期维护'],
    description:
      '统一汇聚防洪、水资源、水生态等领域的预案、规范、业务规则、预报方案与专业资料，通过知识抽取、分类、融合和标准化处理，构建持续更新的水利专业知识库。',
  },
  {
    title: '水利知识图谱',
    points: ['水利对象关系建模', '时空关系关联分析', '专题知识图谱构建'],
    description:
      '围绕河流、水库、水闸、泵站、监测站等水利对象建立实体、属性与关系模型，将工程、监测、业务规则和历史事件关联起来，形成可查询、可追溯、可推理的水利知识网络。',
  },
  {
    title: '水利智能问答',
    points: ['自然语言知识检索', '专业问题智能问答', '答案来源精准溯源'],
    description:
      '基于博曜知识检索与大模型能力，让业务人员通过自然语言查询法规规范、工程资料、业务规则和历史案例，快速定位知识来源与相关上下文，降低专业知识获取成本。',
  },
  {
    title: '水利辅助决策',
    points: ['历史相似场景匹配', '业务规则智能调用', '应急预案辅助推荐'],
    description:
      '融合实时水雨情、历史场景、业务规则与预案知识，根据当前工况快速匹配相似事件和处置经验，为防洪调度、水资源配置及突发事件处置提供知识支撑和方案参考。',
  },
]

export interface HydraulicValue {
  title: string
  subtitle: string
  description: string
  tags: string[]
  icon: Component
}

export const hydraulicValues: HydraulicValue[] = [
  {
    title: '统一沉淀',
    subtitle: '水利知识形成统一资产',
    description:
      '将预案、规范、业务规则、历史场景、预报方案及专家经验统一汇聚，通过结构化抽取、分类、融合与标准化治理，将分散知识转化为可持续维护和复用的水利知识资产。',
    tags: ['多源知识汇聚', '统一知识标准', '持续更新维护'],
    icon: Database,
  },
  {
    title: '秒级检索',
    subtitle: '专业知识随问随取',
    description:
      '基于博曜知识检索与智能问答能力，让业务人员通过自然语言快速获取工程资料、法规规范、调度规则、历史案例和预案内容，并精准定位知识来源与上下文，大幅降低资料查找成本。',
    tags: ['智能问答', '语义检索', '答案可溯源'],
    icon: Search,
  },
  {
    title: '场景复用',
    subtitle: '历史经验转化为决策能力',
    description:
      '将历史洪水、降雨、干旱、工程险情及处置过程进行结构化沉淀，建立事件、工况、措施与结果之间的关联，在新事件发生时快速匹配相似场景和历史经验，为业务研判提供参考。',
    tags: ['相似场景匹配', '历史事件复盘', '经验持续复用'],
    icon: History,
  },
  {
    title: '智能决策',
    subtitle: '知识驱动“四预”业务',
    description:
      '将实时监测数据、业务规则、历史场景和应急预案进行关联，通过知识推理与规则调用，为预报、预警、预演、预案提供统一知识支撑，推动水利业务从“人工查资料”向“智能辅助决策”升级。',
    tags: ['知识推理', '预案推荐', '四预支撑'],
    icon: BrainCircuit,
  },
]

export interface HydraulicCaseStat {
  value: string
  label: string
}

export interface HydraulicCase {
  title: string
  description: string
  stats: HydraulicCaseStat[]
  reversed?: boolean
}

export const hydraulicCases: HydraulicCase[] = [
  {
    title: '某省级水利知识平台',
    description:
      '围绕省级智慧水利建设，汇聚水利基础、监测、业务、知识及空间地理等多源数据，构建覆盖流域防洪、水资源管理的统一知识体系。通过预案知识库、业务规则库、历史场景库和专题知识图谱建设，为知识检索、智能问答、场景匹配及“四预”业务提供统一知识服务。',
    stats: [
      { value: '6大类', label: '水利数据统一治理' },
      { value: '185类', label: '水利要素关联管理' },
      { value: '4类', label: '核心业务知识库' },
    ],
  },
  {
    title: '某流域防洪知识平台',
    description:
      '围绕流域防洪调度业务，统一沉淀防洪预案、业务规则、历史洪水、典型降雨及预报方案，将分散的文档资料与历史事件转化为结构化知识。结合实时水雨情开展历史场景匹配、业务规则调用和应急预案推荐，为防洪研判与应急处置提供辅助决策支持。',
    stats: [
      { value: '4类', label: '防洪专题知识库' },
      { value: '50场次', label: '典型降雨场景沉淀' },
      { value: '30年', label: '历史洪水资料覆盖范围' },
    ],
    reversed: true,
  },
  {
    title: '某区域水资源智能调度平台',
    description:
      '围绕水资源配置与应急调度，汇聚水资源调度方案、水量分配规则、生态流量保障方案及历史干旱、水污染和工程险情数据，构建水资源专业知识体系，为调水方案检索、历史场景复盘、规则查询和辅助决策提供统一知识支撑。',
    stats: [
      { value: '4类', label: '水资源核心知识库' },
      { value: '多源', label: '调度知识统一汇聚' },
      { value: '全流程', label: '知识服务支撑' },
    ],
  },
]
