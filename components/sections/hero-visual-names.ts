/**
 * CMS hero split-visual 右侧视觉白名单（TASK-015.18）。
 * 纯字符串常量模块：服务端 zod 校验与客户端注册表共用，禁止引入任何组件/依赖。
 * 新增条目必须同步 components/sections/hero-visual-registry.ts 的组件映射（typecheck 强制）。
 * 仅登记「零 props 自包含」的动画视觉组件；需要配置的视觉走 visualType:'image' 静态图。
 */
export const HERO_VISUAL_NAMES = ['DgpHeroVisual', 'DeviceAgentHeroVisual', 'TanyaoHeroVisual'] as const

export type HeroVisualName = (typeof HERO_VISUAL_NAMES)[number]

/** 中文名（admin 下拉与组件发现 API 下发用） */
export const HERO_VISUAL_LABELS: Record<HeroVisualName, string> = {
  DgpHeroVisual: '数据治理平台 Hero 动画',
  DeviceAgentHeroVisual: '设备智能体 Hero 动画',
  TanyaoHeroVisual: '探曜 AIoT Hero 动画',
}
