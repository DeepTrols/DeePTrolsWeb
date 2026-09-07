import {
  BatteryCharging,
  BookOpen,
  Bot,
  Droplets,
  Factory,
  GraduationCap,
  Leaf,
  PlugZap,
  RadioTower,
  Rocket,
  Truck,
} from '@lucide/vue'
import type { Component } from 'vue'

export interface NavLink {
  label: string
  description?: string
  href: string
  icon?: Component
  hot?: boolean
}

export interface NavColumn {
  title: string
  subtitle?: string
  description?: string
  href?: string
  links?: NavLink[]
  groups?: NavColumn[]
  footerLabel?: string
  footerHref?: string
}

export interface NavFeature {
  title: string
  description: string
  href: string
  icon: Component
}

export interface NavItem {
  label: string
  href: string
  layout?: 'product' | 'solutions'
  megaTitle?: string
  columns?: NavColumn[]
  features?: NavFeature[]
  featuresTitle?: string
}

export const primaryNavigation: NavItem[] = [
  {
    label: 'Why DeepTrols',
    href: '/why-deeptrols',
  },
  {
    label: '核心产品',
    href: '/products',
    layout: 'product',
    megaTitle: '核心技术',
    columns: [
      {
        title: '数曜 ｜ 数智基建',
        description: '构建面向 AI 的企业数据基础设施',
        href: '/products/data-governance',
        links: [
          { label: '博曜 ｜ 知识中枢', description: '让企业知识可沉淀、可理解、可调用', href: '/products/knowledge-base', icon: BookOpen },
        ],
      },
      {
        title: '数曜·数据治理平台',
        description: '构建高质量企业数据体系',
        href: '/products/data-governance',
        links: [
          { label: '核心产品', href: '/products' },
          { label: '智曜 ｜ 智能引擎', description: '汇聚算力与模型能力，驱动企业智能应用', href: '/products/agentos', icon: Bot },
          { label: '探曜 ｜ 智联万物', description: '连接设备与场景，让 AI 感知真实世界', href: '/products/ai-iot', icon: RadioTower },
        ],
      },
    ],
  },
  {
    label: '解决方案',
    href: '/solutions',
    layout: 'solutions',
    megaTitle: '解决方案',
    columns: [
      {
        title: '应用场景',
        links: [
          {
            label: '智能制造解决方案',
            description: '融合设备、数据与智能生产',
            href: '/solutions/manufacturing',
            icon: Factory,
          },
          {
            label: '智慧储能解决方案',
            description: '驱动储能安全、高效与智能运营',
            href: '/solutions/energy',
            icon: BatteryCharging,
          },
          {
            label: '智慧水利/水务解决方案',
            description: '感知水务全域，智能调度运营',
            href: '/solutions/water',
            icon: Droplets,
          },
          {
            label: '智慧教育解决方案',
            description: 'AI赋能教学、管理与学习',
            href: '/services/smart-education',
            icon: GraduationCap,
          },
        ],
      },
      {
        title: '行业方案',
        links: [
          {
            label: 'FDE解决方案',
            description: '深入业务现场，让AI真正落地',
            href: '/services/enterprise-ai-delivery',
            icon: Rocket,
            hot: true,
          },
          {
            label: '算电协同运营方案',
            description: '统筹算力、电力、冷却与储能',
            href: '/solutions/compute',
            icon: PlugZap,
            hot: true,
          },
          {
            label: '零碳园区智能化解决方案',
            description: '协同能源、设备与园区运营',
            href: '/services/zero-carbon-park',
            icon: Leaf,
          },
          {
            label: 'AI+供应链解决方案',
            description: 'AI驱动供应链预测与协同决策',
            href: '/services/ai-supply-chain',
            icon: Truck,
          },
        ],
      },
    ],
  },
  {
    label: 'Token Hub',
    href: '/services/token-hub',
  },
  {
    label: '资源',
    href: '/resources/reports',
  },
  {
    label: '关于我们',
    href: '/about_us',
  },
]
