/**
 * why 页服务概览/引擎矩阵纯字符串数据（015.20b）：无 ?url 资源、无组件引用，
 * server（seed/parity/组件描述符 default）与客户端共享；data/why.ts 解析图标后 re-export。
 */

export interface WhyServiceItemData {
  title: string
  description: string
  icon: string
}

export interface WhyEngineLinkData {
  title: string
  description: string
  href: string
  icon: string
}

export const whyServiceItemsData: WhyServiceItemData[] = [
  {
    title: '交付可量化，区别传统软件交付',
    description: '相比传统软件厂商的交付模式，避免交付即终止，以可量化的指标评估交付成果。',
    icon: 'ChartNoAxesCombined',
  },
  {
    title: '没有隐形的业务负担',
    description:
      '告别复杂培训、专人维护和繁琐操作，让 AI 像企业员工一样自然融入业务流程，真正做到开箱可用、持续可用。',
    icon: 'Bot',
  },
  {
    title: '摆脱业务系统锁定',
    description:
      '摆脱对 ERP、MES、OA 等系统形成的数据孤岛与平台依赖，让企业掌握数据、流程及 AI 能力的长期主导权，避免业务能力被单一软件供应商限制。',
    icon: 'Network',
  },
]

export const whyEngineLinksData: WhyEngineLinkData[] = [
  {
    title: 'DeepTrolsOPS企业AI引擎',
    description: '统一智能体、知识与模型能力，加速企业 AI 落地',
    href: '/products/deeptrols-ops',
    icon: 'BrainCircuit',
  },
  {
    title: 'FDE企业AI服务指南',
    description: '面向企业 AI 落地的实践方法与最佳指南',
    href: '/resources/fde',
    icon: 'FileText',
  },
]

export const whyServiceResetHeading = {
  eyebrow: 'Service Model',
  title: '业务价值可衡量，AI成果可持续',
}

export const whyEngineHeading = {
  eyebrow: 'Reinvention Engine',
  title: '重塑引擎',
  description:
    '重塑引擎是DeepTrols持续实现自我重塑的核心能力体系。它推动我们不断打造更专业、更深厚的行业与技术能力，以 AI 赋能服务交付，持续引领技术创新，并沉淀最先进的工具、方法论与实践体系。',
}
