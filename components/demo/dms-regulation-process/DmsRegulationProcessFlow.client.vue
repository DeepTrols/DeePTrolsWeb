<script setup lang="ts">
import {
  Activity,
  ChartPie,
  ClipboardList,
  FileClock,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  ListFilter,
  Radar,
  ScrollText,
  ShieldAlert,
  SlidersHorizontal,
  TrendingUp,
  TriangleAlert,
  Users,
  Zap,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import DmsRegulationProcessCurveEdge from '~/components/demo/dms-regulation-process/DmsRegulationProcessCurveEdge.vue'
import DmsRegulationProcessNode from '~/components/demo/dms-regulation-process/DmsRegulationProcessNode.vue'
import DmsRegulationProcessReturnEdge from '~/components/demo/dms-regulation-process/DmsRegulationProcessReturnEdge.vue'

// 数曜·数据要素监管平台「事前预防 → 事中监控 → 事后处置 → 监管分析」横向主链 + 底部回流闭环。
// 四段虚线面板顺次衔接，底部回流 lane 由 监管分析 下行、横穿画布、上行回到 事前预防，
// 「规则持续优化」pill 压在回流 lane 上，表达监管规则随分析结果持续迭代的闭环。
// 统一 1704px 画布：节点宽 240×4=960，三段连接区各 200，左右边距 72；x：72/512/952/1392。
const stages = [
  {
    id: 'prevent',
    label: '事前预防',
    x: 72,
    loop: 'target',
    items: [
      { label: '监管规则体系', icon: ScrollText },
      { label: '风险等级分层', icon: ShieldAlert },
      { label: '触发条件配置', icon: SlidersHorizontal },
      { label: '处置动作定义', icon: Zap },
    ],
  },
  {
    id: 'monitor',
    label: '事中监控',
    x: 512,
    items: [
      { label: '业务数据监测', icon: Activity },
      { label: '异常行为感知', icon: Radar },
      { label: '风险事件生成', icon: TriangleAlert },
      { label: '事件收敛去重', icon: ListFilter },
    ],
  },
  {
    id: 'handle',
    label: '事后处置',
    x: 952,
    items: [
      { label: '自动工单生成', icon: ClipboardList },
      { label: '多角色协同', icon: Users },
      { label: '状态跟踪', icon: ListChecks },
      { label: '全过程留痕', icon: FileClock },
    ],
  },
  {
    id: 'analysis',
    label: '监管分析',
    x: 1392,
    loop: 'source',
    items: [
      { label: '监管驾驶舱', icon: LayoutDashboard },
      { label: '风险态势', icon: ChartPie },
      { label: '趋势分析', icon: TrendingUp },
      { label: '决策支撑', icon: Lightbulb },
    ],
  },
] as const

const nodes: Node[] = [
  ...stages.map(stage => ({
    id: `stage-${stage.id}`,
    type: 'dmsRegulationProcess',
    position: { x: stage.x, y: 40 },
    data: { kind: 'stage', label: stage.label, items: stage.items, ...('loop' in stage ? { loop: stage.loop } : {}) },
    selectable: false,
    draggable: false,
  })),
  { id: 'pill-loop', type: 'dmsRegulationProcess', position: { x: 797, y: 368 }, data: { kind: 'pill', label: '规则持续优化' }, selectable: false, draggable: false },
]

const curveDefaults = {
  type: 'dmsRegulationProcessCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  { id: 'e-prevent-monitor', source: 'stage-prevent', target: 'stage-monitor', ...curveDefaults },
  { id: 'e-monitor-handle', source: 'stage-monitor', target: 'stage-handle', ...curveDefaults },
  { id: 'e-handle-analysis', source: 'stage-handle', target: 'stage-analysis', ...curveDefaults },
  {
    id: 'e-analysis-prevent-loop',
    source: 'stage-analysis',
    sourceHandle: 'loop',
    target: 'stage-prevent',
    targetHandle: 'loop',
    type: 'dmsRegulationProcessReturn',
    animated: true,
    selectable: false,
  },
]

// 内容纵向跨度 40（面板顶）→ 400（回流 pill 底，lane 384 + 光晕 4 亦在其内），跨度 360；
// 默认 viewport y = 60 对应 560px 帧垂直居中（360 < 560，无需缩放）。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 60,
    zoom: 1,
  },
)

const defaultViewport = computed(() => ({ x: 0, y: props.viewportY, zoom: props.zoom }))
const proOptions = { hideAttribution: true }
</script>

<template>
  <VueFlow
    class="size-full"
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
    <template #node-dmsRegulationProcess="{ data }">
      <DmsRegulationProcessNode :data="data" />
    </template>
    <template #edge-dmsRegulationProcessCurve="edgeProps">
      <DmsRegulationProcessCurveEdge v-bind="edgeProps" />
    </template>
    <template #edge-dmsRegulationProcessReturn="edgeProps">
      <DmsRegulationProcessReturnEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
