import {
  BookOpenText,
  Boxes,
  BrainCircuit,
  ClipboardCheck,
  Database,
  FileQuestion,
  Factory,
  Image,
  Layers,
  LineChart,
  MessageSquareText,
  Rocket,
  Sparkles,
  Workflow,
} from '@lucide/vue'
import type { Component } from 'vue'
import type { ProductFeatureGridItem } from '~/components/common/ProductFeatureGridSection.vue'

export const fdeHero = {
  title: 'DeepTrols FDE解决方案',
  description: '深入业务现场，让AI从概念验证走向生产价值',
  video: '/images/solutions/fde/hero-bg.mp4',
}

export const fdePainPoints: ProductFeatureGridItem[] = [
  {
    title: '场景难定义，AI 与业务脱节',
    description:
      '企业知道需要 AI，却很难将业务问题转化为可执行的 AI 场景。缺少同时理解业务与技术的工程团队，容易出现“技术可以实现，但业务并不需要”。',
    points: ['需求停留在功能描述', '业务价值难以量化', '技术与业务语言不一致'],
    icon: FileQuestion,
  },
  {
    title: '数据难就绪，模型缺少业务上下文',
    description:
      'AI 落地不仅需要模型，更依赖企业内部数据、知识与业务上下文。ERP、MES、CRM、文档和数据库相互独立，使模型难以真正理解企业。',
    points: ['数据分散在多个系统', '专业知识难以调用', '数据质量参差不齐'],
    icon: Database,
  },
  {
    title: 'Demo 容易，生产上线困难',
    description:
      '一个可演示的 AI 应用可以快速完成，但进入真实生产环境后，还需要解决系统集成、权限、安全、性能、成本、可靠性和可观测性等大量工程问题。',
    points: ['PoC 与生产环境存在断层', '准确率与稳定性难保障', '权限安全要求复杂'],
    icon: Rocket,
  },
  {
    title: '业务持续变化，固定交付难以适应',
    description:
      'AI 项目天然具有探索性，需要在真实业务反馈中不断验证和调整。传统“需求—开发—验收”的固定项目模式，很难适应 AI 应用持续迭代的特点。',
    points: ['需求持续演进', '模型能力快速变化', '一次性交付难以持续优化'],
    icon: Workflow,
  },
]

export interface FdeEvolutionItem {
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  metric: string
  metricLabel: string
  visual: 'prototype' | 'production' | 'scale'
  visualSide: 'left' | 'right'
}

export const fdeEvolutionItems: FdeEvolutionItem[] = [
  {
    eyebrow: '从需求到验证',
    title: '更快确认 AI 是否真正值得做',
    description:
      'FDE 从真实业务问题出发，快速完成场景梳理、数据接入与原型验证，在大规模投入之前先验证技术可行性与业务价值。',
    bullets: ['聚焦高价值业务问题', '快速构建可运行原型', '用真实数据完成验证'],
    metric: '50%',
    metricLabel: '验证周期缩短',
    visual: 'prototype',
    visualSide: 'right',
  },
  {
    eyebrow: '从 PoC 到生产',
    title: '让验证有效的 AI 真正进入业务系统',
    description:
      'FDE 不以 Demo 验收为终点，而是继续完成企业系统连接、权限安全、部署运维与生产工程，让 AI 从“能演示”变成“能使用、能运行”。',
    bullets: ['企业系统与数据集成', '权限、安全与生产部署', '运行监控与异常治理'],
    metric: '70%',
    metricLabel: '生产转化提升',
    visual: 'production',
    visualSide: 'left',
  },
  {
    eyebrow: '规模演进',
    title: '让 AI 随业务持续优化和扩展',
    description:
      'FDE 不以单个应用上线为终点，而是将已验证的数据、知识、模型、工具与工程能力持续沉淀和复用，逐步扩展到更多业务流程与智能体，让 AI 从单点项目走向企业级规模化应用。',
    bullets: ['运行数据持续反馈', 'Agent 与流程持续优化', '新场景快速复制扩展'],
    metric: '5%',
    metricLabel: 'AI实现规模化价值',
    visual: 'scale',
    visualSide: 'right',
  },
]

export const fdeSolutionItems: ProductFeatureGridItem[] = [
  {
    title: '不是卖一套标准软件',
    description: '根据真实业务问题构建 AI 能力。',
    icon: Boxes,
  },
  {
    title: '不是交付一个 Demo',
    description: '从 PoC 一直负责到生产环境。',
    icon: ClipboardCheck,
  },
  {
    title: '不是替客户定义业务',
    description: '与业务专家共同设计解决方案。',
    icon: MessageSquareText,
  },
  {
    title: '不是一次性交付',
    description: '基于真实业务反馈持续迭代。',
    icon: Workflow,
  },
]

export interface FdeCapabilityCard {
  title: string
  points: string[]
  description: string
}

export const fdeCapabilities: FdeCapabilityCard[] = [
  {
    title: 'AI 场景工程',
    points: ['业务问题识别', 'AI 场景设计', '价值目标定义'],
    description:
      '深入真实业务流程，与业务人员共同拆解问题，识别适合 AI 介入的关键环节，将模糊的 AI 需求转化为明确、可验证、可交付的应用场景。',
  },
  {
    title: '数据与知识工程',
    points: ['多源数据连接', '企业知识构建', '业务上下文治理'],
    description:
      '连接数据库、文档、API 与既有业务系统，对企业数据和专业知识进行治理、组织与上下文化，为模型、RAG 和智能体提供可信业务基础。',
  },
  {
    title: 'Agent 应用工程',
    points: ['智能体构建', 'Workflow 编排', 'Tools / MCP 集成'],
    description:
      '围绕真实业务任务构建 AI Agent，将模型、知识、工具与业务系统连接起来，实现任务理解、规划、执行与结果反馈，让 AI 从辅助问答走向业务执行。',
  },
  {
    title: '生产级 AI 工程',
    points: ['系统集成与部署', '安全权限治理', '运行监控与优化'],
    description:
      '将验证有效的 AI 应用部署至生产环境，完善身份权限、安全、性能、成本、日志与可观测能力，并根据真实运行数据持续优化。',
  },
]

export const fdeCoreValues: ProductFeatureGridItem[] = [
  {
    title: '周级验证',
    subtitle: '更快找到真正值得做的 AI 场景',
    description:
      '通过业务现场调研与快速原型，在投入大规模建设前验证场景可行性和业务价值，减少无效需求与重复开发。',
    tags: ['快速原型', '场景验证', '价值验证'],
    icon: Sparkles,
  },
  {
    title: '端到端',
    subtitle: '从业务问题一直做到生产上线',
    description:
      '同一团队贯穿场景定义、数据准备、AI 开发、系统集成和生产部署，减少多团队之间的沟通与交付断层。',
    tags: ['需求到生产', '统一团队', '工程闭环'],
    icon: Workflow,
  },
  {
    title: '深度融合',
    subtitle: 'AI 真正进入企业核心流程',
    description:
      '通过 API、MCP、Tools 与企业系统连接，将 AI 嵌入已有业务流程，让模型不仅能够回答问题，更能够获取数据、调用工具和执行任务。',
    tags: ['系统连接', '业务嵌入', '智能执行'],
    icon: Layers,
  },
  {
    title: '持续进化',
    subtitle: 'AI 随业务一起持续优化',
    description:
      '基于真实用户反馈、运行数据和业务变化持续调整模型、知识、Agent 与 Workflow，让 AI 应用从“项目交付”转变为持续演进的生产能力。',
    tags: ['持续迭代', '运行反馈', '能力进化'],
    icon: LineChart,
  },
]

export interface FdeUseCase {
  title: string
  description: string
  href: string
  icon: Component
}

export const fdeUseCases: FdeUseCase[] = [
  {
    title: '企业知识智能化',
    description: '将制度、产品、项目和专业资料转化为企业知识能力，构建可信问答、知识检索和专业知识助手。',
    href: '/solutions/enterprise-ai',
    icon: BookOpenText,
  },
  {
    title: '业务流程智能体',
    description: '围绕销售、采购、运营、客服等业务流程构建 Agent，通过工具调用完成查询、分析、生成和业务执行。',
    href: '/solutions/enterprise-ai',
    icon: Workflow,
  },
  {
    title: '数据分析智能体',
    description: '让 AI 连接数据库和业务指标，通过自然语言完成数据查询、指标分析、异常发现和经营报告生成。',
    href: '/solutions/data-governance',
    icon: Database,
  },
  {
    title: '智能制造应用',
    description: '深入生产现场连接 MES、ERP、设备和工艺数据，构建设备诊断、质量分析、生产辅助及工业智能体。',
    href: '/solutions/manufacturing',
    icon: Factory,
  },
  {
    title: 'AI 内容生产',
    description: '围绕营销、电商、出版等场景构建文本、图片、视频及多模态内容生成工作流，实现规模化内容生产。',
    href: '/services/enterprise-ai-delivery',
    icon: Image,
  },
  {
    title: '行业 AI 应用',
    description: '结合行业数据、专业知识与业务规则，为能源、水利、教育、环保等专业场景构建垂直 AI 应用。',
    href: '/solutions/energy',
    icon: BrainCircuit,
  },
]

export interface FdeCaseStat {
  value: string
  label: string
}

export interface FdeCase {
  title: string
  description: string
  stats: FdeCaseStat[]
  reversed?: boolean
}

export const fdeCases: FdeCase[] = [
  {
    title: '某大型制造企业',
    description:
      '围绕生产现场数据与核心业务流程，由 FDE 团队深入业务部门，与工艺、设备及信息化团队共同梳理 AI 应用场景，连接 MES、ERP、设备数据与企业知识，快速构建设备分析与生产辅助智能体，并在真实生产环境持续迭代。',
    stats: [
      { value: '20+', label: '核心业务场景梳理' },
      { value: '10+', label: '业务系统与数据源连接' },
      { value: '周级', label: 'AI 场景快速验证' },
    ],
  },
  {
    title: '某能源企业',
    description:
      '围绕能源运营与设备管理场景，将运行数据、设备资料、历史工单和专业知识统一接入 AI 应用，通过 FDE 模式快速完成场景定义、知识构建、Agent 开发与业务系统集成。',
    stats: [
      { value: '百万级', label: '运行数据处理' },
      { value: '多系统', label: '业务数据统一连接' },
      { value: '持续迭代', label: '生产级 AI 应用' },
    ],
    reversed: true,
  },
  {
    title: '某大型集团企业',
    description:
      '面向集团内部知识获取与业务协同需求，FDE 团队与客户业务人员联合构建企业 AI 助手，连接内部知识、业务数据和办公系统，实现从智能问答逐步扩展至数据分析、材料生成与业务任务执行。',
    stats: [
      { value: '10+', label: '核心业务部门覆盖' },
      { value: '100,000+', label: '企业知识资产接入' },
      { value: '多场景', label: 'AI Agent 持续扩展' },
    ],
  },
]

export const fdeWorkModeLabel = 'FDE 工作模式能力图'
export const fdeDeliveryLabel = 'FDE 交付流程能力图'
export const fdeSolutionLabel = 'FDE 解决方案能力图'
