<script setup lang="ts">
import {
  BarChart3,
  Activity,
  BookOpen,
  Brain,
  Cloud,
  Database,
  Droplets,
  Factory,
  Globe2,
  GraduationCap,
  Handshake,
  Layers3,
  Lightbulb,
  MonitorCog,
  Network,
  RadioTower,
  ShieldCheck,
  Server,
  Sparkles,
  Zap,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import DeepTrolsArchitectureDynamicEdge from '~/components/flow/DeepTrolsArchitectureDynamicEdge.vue'
import DeepTrolsArchitectureNode from '~/components/flow/DeepTrolsArchitectureNode.vue'

const nodes: Node[] = [
  { id: 'center-ring', type: 'emqx', position: { x: 506, y: -10 }, data: { kind: 'ring', sizeClass: 'size-[500px]' }, selectable: false, draggable: false },
  { id: 'p-sensors', type: 'emqx', position: { x: 0, y: 28 }, data: { kind: 'physical', label: '企业业务数据 · 经营数据', icon: Database, tone: 'violet', sizeClass: 'h-[58px] w-[400px]' }, selectable: false, draggable: false },
  { id: 'p-vehicles', type: 'emqx', position: { x: 0, y: 104 }, data: { kind: 'physical', label: '企业知识资产 · 文档/图片/视频资料', icon: BookOpen, tone: 'blue', sizeClass: 'h-[58px] w-[400px]' }, selectable: false, draggable: false },
  { id: 'p-robots', type: 'emqx', position: { x: 0, y: 180 }, data: { kind: 'physical', label: '物理设备设施 · 感知终端', icon: Factory, tone: 'pink', sizeClass: 'h-[58px] w-[400px]' }, selectable: false, draggable: false },
  { id: 'p-factories', type: 'emqx', position: { x: 0, y: 256 }, data: { kind: 'physical', label: '企业业务系统 · ERP/MES/OA', icon: MonitorCog, tone: 'emerald', sizeClass: 'h-[58px] w-[400px]' }, selectable: false, draggable: false },
  { id: 'p-drones', type: 'emqx', position: { x: 0, y: 332 }, data: { kind: 'physical', label: '实时感知数据 · 状态/设备/运维/工单/预警数据', icon: Activity, tone: 'amber', sizeClass: 'h-[58px] w-[400px]' }, selectable: false, draggable: false },
  { id: 'p-actuators', type: 'emqx', position: { x: 0, y: 408 }, data: { kind: 'physical', label: '外部数据服务 · 第三方接口', icon: Globe2, tone: 'cyan', sizeClass: 'h-[58px] w-[400px]' }, selectable: false, draggable: false },
  { id: 'emqx', type: 'emqx', position: { x: 640, y: 124 }, data: { kind: 'core', sizeClass: 'size-[232px]', items: [{ label: '知识中枢', icon: BookOpen }, { label: '数智基建', icon: Layers3 }, { label: '智联万物', icon: Network }, { label: '智能引擎', icon: Sparkles }] }, selectable: false, draggable: false },
  { id: 'integration-0', type: 'emqx', position: { x: 1112, y: 22.5 }, data: { kind: 'integration', label: 'AI Agent', sizeClass: 'h-[125px] w-[400px]', items: [{ label: '知识智能', icon: Brain }, { label: '数据智能', icon: BarChart3 }, { label: '业务智能', icon: Lightbulb }, { label: '物联智能', icon: RadioTower }] }, selectable: false, draggable: false },
  { id: 'integration-1', type: 'emqx', position: { x: 1112, y: 182.5 }, data: { kind: 'integration', label: '智能应用', sizeClass: 'h-[125px] w-[400px]', items: [{ label: '智能制造', icon: Factory }, { label: '能源运营', icon: Zap }, { label: '水利知识库', icon: Droplets }, { label: '智慧教育', icon: GraduationCap }] }, selectable: false, draggable: false },
  { id: 'integration-2', type: 'emqx', position: { x: 1112, y: 342.5 }, data: { kind: 'integration', label: '企业服务', sizeClass: 'h-[125px] w-[400px]', items: [{ label: 'FDE', icon: ShieldCheck }, { label: 'TokenHub', icon: Cloud }, { label: '数据工程', icon: Server }, { label: '知识工程', icon: Handshake }] }, selectable: false, draggable: false },
]

const edgeDefaults = {
  type: 'emqxDynamic',
  animated: true,
  selectable: false,
  sourceHandle: 'right-source',
  targetHandle: 'left-target',
}

const edges: Edge[] = [
  { id: 'e-sensors-emqx', source: 'p-sensors', target: 'emqx', data: { path: 'M404,57 C520,57 520,240 636,240' }, ...edgeDefaults },
  { id: 'e-vehicles-emqx', source: 'p-vehicles', target: 'emqx', data: { path: 'M404,133 C520,133 520,240 636,240' }, ...edgeDefaults },
  { id: 'e-robots-emqx', source: 'p-robots', target: 'emqx', data: { path: 'M404,209 C520,209 520,240 636,240' }, ...edgeDefaults },
  { id: 'e-factories-emqx', source: 'p-factories', target: 'emqx', data: { path: 'M404,285 C520,285 520,240 636,240' }, ...edgeDefaults },
  { id: 'e-drones-emqx', source: 'p-drones', target: 'emqx', data: { path: 'M404,361 C520,361 520,240 636,240' }, ...edgeDefaults },
  { id: 'e-actuators-emqx', source: 'p-actuators', target: 'emqx', data: { path: 'M404,437 C520,437 520,240 636,240' }, ...edgeDefaults },
  { id: 'e-emqx-integration-0', source: 'emqx', target: 'integration-0', data: { path: 'M876,240 C992.5,240 992.5,85 1109,85' }, ...edgeDefaults },
  { id: 'e-emqx-integration-1', source: 'emqx', target: 'integration-1', data: { path: 'M876,240 C992.5,240 992.5,245 1109,245' }, ...edgeDefaults },
  { id: 'e-emqx-integration-2', source: 'emqx', target: 'integration-2', data: { path: 'M876,240 C992.5,240 992.5,405 1109,405' }, ...edgeDefaults },
]

const defaultViewport = { x: 44, y: 40, zoom: 1 }
const proOptions = { hideAttribution: true }
</script>

<template>
  <VueFlow
    class="relative size-full"
    :nodes="nodes"
    :edges="edges"
    :default-viewport="defaultViewport"
    :nodes-draggable="false"
    :nodes-connectable="false"
    :elements-selectable="false"
    :zoom-on-scroll="false"
    :zoom-on-pinch="false"
    :pan-on-drag="false"
    :pan-on-scroll="false"
    :zoom-on-double-click="false"
    :prevent-scrolling="true"
    :pro-options="proOptions"
  >
    <template #node-emqx="{ data }">
      <DeepTrolsArchitectureNode :data="data" />
    </template>
    <template #edge-emqxDynamic="edgeProps">
      <DeepTrolsArchitectureDynamicEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
