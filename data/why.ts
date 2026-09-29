import {
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  FileText,
  Network,
} from '@lucide/vue'
import type { Component } from 'vue'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import boyaoLogo from '../assets/images/brand/boyao-logo.svg?url'
import shuyaoLogo from '../assets/images/brand/shuyao-logo.svg?url'
import tanyaoLogo from '../assets/images/brand/tanyao-iot-logo.svg?url'
import zhiyaoLogo from '../assets/images/brand/zhiyao-logo.svg?url'
import { whyTrustTabsData } from './why-trust'

// whyTrustTabs 字面值已抽到 data/why-trust.ts（015.18：server seed/parity 需避开本文件的 ?url 资源导入）；
// 此处解析图标字符串为组件并保持导出签名不变（未注册名兜底 FileText，parity 测试断言全覆盖）
const iconOf = (name: string): Component => resolveNavIcon(name) ?? FileText

export interface WhyTrustFeature {
  title: string
  subtitle: string
  description: string
  icon: Component
}

export interface WhyTrustTab {
  key: string
  label: string
  features: WhyTrustFeature[]
}

export interface WhyServiceItem {
  title: string
  description: string
  icon: Component
}

export interface WhyEngineLink {
  title: string
  description: string
  href: string
  icon: Component
}

export const whyTrustTabs: WhyTrustTab[] = whyTrustTabsData.map((tab) => ({
  ...tab,
  features: tab.features.map((feature) => ({ ...feature, icon: iconOf(feature.icon) })),
}))

export const whyServiceItems: WhyServiceItem[] = [
  {
    title: '交付可量化，区别传统软件交付',
    description: '相比传统软件厂商的交付模式，避免交付即终止，以可量化的指标评估交付成果。',
    icon: ChartNoAxesCombined,
  },
  {
    title: '没有隐形的业务负担',
    description:
      '告别复杂培训、专人维护和繁琐操作，让 AI 像企业员工一样自然融入业务流程，真正做到开箱可用、持续可用。',
    icon: Bot,
  },
  {
    title: '摆脱业务系统锁定',
    description:
      '摆脱对 ERP、MES、OA 等系统形成的数据孤岛与平台依赖，让企业掌握数据、流程及 AI 能力的长期主导权，避免业务能力被单一软件供应商限制。',
    icon: Network,
  },
]

export const whyEngineLinks: WhyEngineLink[] = [
  {
    title: 'DeepTrolsOPS企业AI引擎',
    description: '统一智能体、知识与模型能力，加速企业 AI 落地',
    href: '/products/deeptrols-ops',
    icon: BrainCircuit,
  },
  {
    title: 'FDE企业AI服务指南',
    description: '面向企业 AI 落地的实践方法与最佳指南',
    href: '/resources/fde',
    icon: FileText,
  },
]

export interface WhyHeroNodeConfig {
  id: string
  label: string
  logo: string
  color: string
  glowColor: string
  fillClass: string
  strokeClass: string
}

// FlowMQ 原组件节点色映射：MQTT #8b5cf6 → 数曜、Kafka #3b82f6 → 探曜、AMQP #06b6d4 → 博曜，新增智曜 #f97316
export const whyHeroNodes: WhyHeroNodeConfig[] = [
  {
    id: 'shuyao',
    label: '数曜',
    logo: shuyaoLogo,
    color: '#8b5cf6',
    glowColor: 'rgba(138, 92, 246, 0.77)',
    fillClass: 'fill-violet-500/12',
    strokeClass: 'stroke-violet-500/25',
  },
  {
    id: 'tanyao',
    label: '探曜',
    logo: tanyaoLogo,
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.55)',
    fillClass: 'fill-blue-500/12',
    strokeClass: 'stroke-blue-500/25',
  },
  {
    id: 'boyao',
    label: '博曜',
    logo: boyaoLogo,
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.55)',
    fillClass: 'fill-cyan-500/12',
    strokeClass: 'stroke-cyan-500/25',
  },
  {
    id: 'zhiyao',
    label: '智曜',
    logo: zhiyaoLogo,
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.55)',
    fillClass: 'fill-orange-500/12',
    strokeClass: 'stroke-orange-500/25',
  },
]

export const whyHeroCenterLogo = '/logo-while.svg'
