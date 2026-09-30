import { FileText } from '@lucide/vue'
import type { Component } from 'vue'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import boyaoLogo from '../assets/images/brand/boyao-logo.svg?url'
import shuyaoLogo from '../assets/images/brand/shuyao-logo.svg?url'
import tanyaoLogo from '../assets/images/brand/tanyao-iot-logo.svg?url'
import zhiyaoLogo from '../assets/images/brand/zhiyao-logo.svg?url'
import { whyTrustTabsData } from './why-trust'
import { whyEngineLinksData, whyServiceItemsData } from './why-sections'

// whyTrustTabs / whyServiceItems / whyEngineLinks 字面值已抽到纯字符串模块
// （015.18 seed、015.20b 组件描述符 default 需避开本文件的 ?url 资源导入）；
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

export const whyServiceItems: WhyServiceItem[] = whyServiceItemsData.map(item => ({
  ...item,
  icon: iconOf(item.icon),
}))

export const whyEngineLinks: WhyEngineLink[] = whyEngineLinksData.map(link => ({
  ...link,
  icon: iconOf(link.icon),
}))

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
