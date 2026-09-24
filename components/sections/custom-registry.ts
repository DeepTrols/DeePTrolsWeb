import type { Component } from 'vue'
import DdpArchitecture from '~/components/product/ddp/DdpArchitecture.vue'
import DlpArchitecture from '~/components/product/dlp/DlpArchitecture.vue'
import DmsArchitecture from '~/components/product/dms/DmsArchitecture.vue'
import type { CustomSectionName } from './custom-names'

// custom 逃生门注册表：名字 → 零 props 定制组件（架构图类）。
// 键集合被 CustomSectionName 强制与 custom-names.ts 一一对应（漏改 typecheck 即挂）。
export const customSectionComponents: Record<CustomSectionName, Component> = {
  DdpArchitecture,
  DlpArchitecture,
  DmsArchitecture,
}
