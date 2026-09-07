import {
  BatteryCharging,
  BookOpen,
  Bot,
  Boxes,
  Cpu,
  Database,
  Droplets,
  Factory,
  Globe2,
  GraduationCap,
  HardDrive,
  Leaf,
  Network,
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
    label: '产品',
    href: '/products',
    layout: 'product',
    columns: [
      {
        title: '数曜',
        subtitle: '数智基建',
        href: '/products',
        links: [
          {
            label: '数曜·数据治理平台',
            description: '构建高质量企业数据体系',
            href: '/products/data-governance',
            icon: Database,
          },
          {
            label: '数曜·数据标签平台',
            description: '为 AI 提供高质量训练数据',
            href: '/products/data-labeling',
            icon: Boxes,
          },
          {
            label: '数曜·数据开发平台',
            description: '支持数据集成、开发与调度',
            href: '/products/data-development',
            icon: Network,
          },
          {
            label: '数曜·数据要素监管平台',
            description: '支撑数据要素合规监管',
            href: '/products/data-element-regulation',
            icon: HardDrive,
          },
        ],
      },
      {
        title: '博曜',
        subtitle: '知识中枢',
        href: '/products/knowledge-base',
        links: [
          {
            label: '博曜·企业级知识管理平台',
            description: '构建 AI 可理解的知识体系',
            href: '/products/knowledge-base',
            icon: BookOpen,
          },
        ],
      },
      {
        title: '智曜',
        subtitle: '智能引擎',
        href: '/products/agentos',
        links: [
          {
            label: '智曜·AgentOS',
            description: 'Agent基础设施平台',
            href: '/products/agentos',
            icon: Bot,
          },
        ],
      },
      {
        title: '探曜',
        subtitle: '智联万物',
        href: '/products/ai-iot',
        links: [
          {
            label: '探曜·AI物联感知平台',
            description: '实现设备、数据与智能应用互联',
            href: '/products/ai-iot',
            icon: RadioTower,
          },
          {
            label: 'Device Agent',
            description: '具备自主执行能力的设备智能体',
            href: '/products/device-agent',
            icon: Cpu,
          },
        ],
      },
    ],
  },
  {
    label: '解决方案',
    href: '/solutions',
    layout: 'solutions',
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

export const headerActions = [
  {
    label: 'GitHub',
    href: 'https://github.com',
  },
  {
    label: '语言切换',
    href: '/en',
    icon: Globe2,
  },
  {
    label: '登录OPS',
    href: '/console',
  },
]
