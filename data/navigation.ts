import {
  BookOpen,
  Boxes,
  Building2,
  Cpu,
  Database,
  FileText,
  Globe2,
  HardDrive,
  Network,
  RadioTower,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from '@lucide/vue'
import type { Component } from 'vue'

export interface NavLink {
  label: string
  description?: string
  href: string
  icon?: Component
}

export interface NavColumn {
  title: string
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
  layout?: 'product' | 'solutions' | 'services'
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
        title: 'DATA',
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
        title: 'KNOWLEDGE BASE',
        links: [
          {
            label: '博曜·企业级知识管理平台',
            description: '构建 AI 可理解的知识体系',
            href: '/products/knowledge-base',
            icon: BookOpen,
          },
        ],
        groups: [
          {
            title: 'AI IOT',
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
        title: 'AI SECURITY',
        links: [
          {
            label: 'API安全管控平台',
            description: '为 API 接口提供完整的安全管控方案',
            href: '/products/api-security',
            icon: ShieldCheck,
          },
          {
            label: 'API安全审计系统',
            description: '审计 API 访问行为及识别应用缺陷',
            href: '/products/api-audit',
            icon: ScrollText,
          },
          {
            label: '业务威胁感知系统',
            description: '全程式业务威胁感知和可编程攻防对抗',
            href: '/products/threat-sensing',
            icon: Sparkles,
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
        footerLabel: 'View All',
        footerHref: '/solutions',
        links: [
          { label: '智能制造', href: '/solutions/manufacturing' },
          { label: '智慧环保', href: '/solutions/environment' },
          { label: '智慧水利', href: '/solutions/water' },
          { label: '智慧能源', href: '/solutions/energy' },
          { label: '数据治理', href: '/solutions/data-governance' },
          { label: '企业AI应用', href: '/solutions/enterprise-ai' },
          { label: '智慧城市', href: '/solutions/city' },
          { label: '智慧医疗', href: '/solutions/healthcare' },
        ],
      },
      {
        title: '行业',
        footerLabel: 'View All',
        footerHref: '/industries',
        links: [
          { label: '制造业', href: '/industries/manufacturing' },
          { label: '能源', href: '/industries/energy' },
          { label: '交通运输与物流', href: '/industries/logistics' },
          { label: '政府/公共事业', href: '/industries/public-sector' },
          { label: '教育', href: '/industries/education' },
          { label: '水利/水务', href: '/industries/water' },
          { label: '金融服务', href: '/industries/finance' },
          { label: '城市治理', href: '/industries/city-governance' },
          { label: '零售', href: '/industries/retail' },
        ],
      },
      {
        title: '技术方向',
        footerLabel: 'View All',
        footerHref: '/technology',
        links: [
          { label: '数据工程', href: '/technology/data-engineering' },
          { label: '知识工程', href: '/technology/knowledge-engineering' },
          { label: 'OPC服务', href: '/technology/opc' },
          { label: '工业物联网', href: '/technology/industrial-iot' },
          { label: 'Token智能', href: '/technology/token-intelligence' },
        ],
      },
    ],
    featuresTitle: 'FDE',
    features: [
      {
        title: 'OPC公共服务平台',
        description: '工业现场连接、数据接入与公共能力封装。',
        href: '/solutions/opc-platform',
        icon: RadioTower,
      },
      {
        title: '企业AI落地服务',
        description: '面向场景的 AI 应用规划、建设与运营。',
        href: '/solutions/enterprise-ai-delivery',
        icon: Building2,
      },
    ],
  },
  {
    label: '服务',
    href: '/services',
    layout: 'services',
    features: [
      {
        title: 'Token Hub',
        description: '统一管理企业 AI Token 与模型调用成本。',
        href: '/services/token-hub',
        icon: Sparkles,
      },
      {
        title: '白皮书 & 报告',
        description: 'AI 行业研究与工程实践参考。',
        href: '/resources/reports',
        icon: BookOpen,
      },
      {
        title: '产品文档',
        description: '产品能力、接入方式与最佳实践。',
        href: '/docs',
        icon: FileText,
      },
      {
        title: '算力与基础设施',
        description: '服务器供应、算力中心建设与交付。',
        href: '/services/infrastructure',
        icon: Cpu,
      },
      {
        title: '智能体社区',
        description: '行业智能体、开源项目与技术分享。',
        href: '/community',
        icon: Globe2,
      },
    ],
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
