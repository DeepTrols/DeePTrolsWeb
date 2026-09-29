import {
  BatteryCharging,
  BookOpen,
  Bot,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  Cpu,
  Database,
  Droplets,
  Factory,
  FileText,
  Gauge,
  GraduationCap,
  Network,
  Orbit,
  PlugZap,
  RadioTower,
  Rocket,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from '@lucide/vue'
import type { Component } from 'vue'

/**
 * 导航图标注册表（TASK-015.8）：导航数据（含 DB 菜单）只存 lucide 组件名字符串，
 * 渲染侧在此解析为组件。新增导航图标时在此登记。
 * 015.18 起 CMS 首页段组件（productCards/ecosystemCards/whyTrustTabs）的图标字符串也走此注册表。
 */
export const navIconComponents: Record<string, Component> = {
  BatteryCharging,
  BookOpen,
  Bot,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  Cpu,
  Database,
  Droplets,
  Factory,
  FileText,
  Gauge,
  GraduationCap,
  Network,
  Orbit,
  PlugZap,
  RadioTower,
  Rocket,
  ShieldCheck,
  Sparkles,
  Waypoints,
}

/** 未登记的名字返回 undefined（模板 v-if 兜住，不渲染图标） */
export function resolveNavIcon(name?: string): Component | undefined {
  return name ? navIconComponents[name] : undefined
}
