<script setup lang="ts">
import {
  Activity,
  BatteryCharging,
  BrainCircuit,
  CalendarClock,
  ChartColumn,
  Cpu,
  Gauge,
  RefreshCw,
  Scale,
  Snowflake,
  Sparkles,
  Sun,
  TrendingUp,
  Zap,
} from '@lucide/vue'
import { computed } from 'vue'
import { Position, VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import DatacenterLoopCurveEdge from '~/components/demo/datacenter-loop/DatacenterLoopCurveEdge.vue'
import DatacenterLoopNode from '~/components/demo/datacenter-loop/DatacenterLoopNode.vue'

// 算电协同「运营闭环」：预测 → 优化 → 执行 → 反馈 的顺时针矩形闭环拓扑（与既有流水线/汇聚/上下回环家族区分）。
// 四角 420×200 面板：智能预测（左上）→ 协同优化（右上）→ 动态执行（右下）→ 效果反馈（左下）→ 回到智能预测；
// 顶边与右边为入站渐变，底边与左边（回程）为出站渐变；中心 pill「预测 · 优化 · 执行 · 反馈 持续闭环」。
// 画布横向跨度 200 → 1504（左右各留 200），纵向 40 → 540，跨度 500。
const panels = [
  {
    id: 'forecast',
    label: '智能预测',
    caption: '统一感知算力与能源趋势',
    icon: TrendingUp,
    tone: 'violet',
    position: { x: 200, y: 40 },
    sourcePosition: Position.Right,
    targetPosition: Position.Bottom,
    items: [
      { label: '算力任务负载预测', icon: Cpu },
      { label: '电价与绿电出力预测', icon: Sun },
      { label: '冷却与储能状态预测', icon: Snowflake },
    ],
  },
  {
    id: 'optimize',
    label: '协同优化',
    caption: '成本与约束的全局求解',
    icon: BrainCircuit,
    tone: 'blue',
    position: { x: 1084, y: 40 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Left,
    items: [
      { label: '成本与容量约束建模', icon: Scale },
      { label: '多目标协同求解', icon: Sparkles },
      { label: '协同调度策略生成', icon: BrainCircuit },
    ],
  },
  {
    id: 'execute',
    label: '动态执行',
    caption: '算力与能源策略自动下发',
    icon: Zap,
    tone: 'emerald',
    position: { x: 1084, y: 340 },
    sourcePosition: Position.Left,
    targetPosition: Position.Top,
    items: [
      { label: '算力任务动态调度', icon: CalendarClock },
      { label: '冷却与储能运行调节', icon: BatteryCharging },
      { label: '绿电消纳协同执行', icon: Sun },
    ],
  },
  {
    id: 'feedback',
    label: '效果反馈',
    caption: '持续评估与策略迭代',
    icon: Gauge,
    tone: 'amber',
    position: { x: 200, y: 340 },
    sourcePosition: Position.Top,
    targetPosition: Position.Right,
    items: [
      { label: '能耗与成本指标回收', icon: Activity },
      { label: '策略执行偏差分析', icon: ChartColumn },
      { label: '预测模型滚动校准', icon: RefreshCw },
    ],
  },
] as const

const nodes: Node[] = [
  ...panels.map(panel => ({
    id: `loop-${panel.id}`,
    type: 'datacenterLoop',
    position: { ...panel.position },
    data: {
      kind: 'loopPanel',
      label: panel.label,
      caption: panel.caption,
      icon: panel.icon,
      tone: panel.tone,
      sourcePosition: panel.sourcePosition,
      targetPosition: panel.targetPosition,
      items: panel.items.map(item => ({ ...item })),
    },
    selectable: false,
    draggable: false,
  })),
  {
    id: 'pill-loop',
    type: 'datacenterLoop',
    position: { x: 728, y: 272 },
    data: { kind: 'pill', label: '预测 · 优化 · 执行 · 反馈 持续闭环' },
    selectable: false,
    draggable: false,
  },
]

const curveDefaults = {
  type: 'datacenterLoopCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  { id: 'e-forecast-optimize', source: 'loop-forecast', target: 'loop-optimize', ...curveDefaults },
  { id: 'e-optimize-execute', source: 'loop-optimize', target: 'loop-execute', ...curveDefaults },
  { id: 'e-execute-feedback', source: 'loop-execute', target: 'loop-feedback', data: { outbound: true }, ...curveDefaults },
  { id: 'e-feedback-forecast', source: 'loop-feedback', target: 'loop-forecast', data: { outbound: true }, ...curveDefaults },
]

// 内容纵向跨度 40 → 540，跨度 500；默认 viewport y = 0 对应 580px Demo 容器惯例；
// 页面接入（560px 帧）传 viewport-y=-10 即可完整垂直居中。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 0,
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
    <template #node-datacenterLoop="{ data }">
      <DatacenterLoopNode :data="data" />
    </template>
    <template #edge-datacenterLoopCurve="edgeProps">
      <DatacenterLoopCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
