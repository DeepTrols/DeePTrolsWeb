import type { Component } from 'vue'
import DeviceAgentHeroVisual from '~/components/product/device-agent/DeviceAgentHeroVisual.vue'
import DgpHeroVisual from '~/components/product/dgp/DgpHeroVisual.vue'
import TanyaoHeroVisual from '~/components/product/tanyao/TanyaoHeroVisual.vue'
import type { HeroVisualName } from './hero-visual-names'

// hero 视觉注册表：白名单名 → 零 props 动画组件（015.18，split-visual 右侧视觉）。
// 键集合被 HeroVisualName 强制与 hero-visual-names.ts 一一对应（漏改 typecheck 即挂）。
export const heroVisualComponents: Record<HeroVisualName, Component> = {
  DgpHeroVisual,
  DeviceAgentHeroVisual,
  TanyaoHeroVisual,
}
