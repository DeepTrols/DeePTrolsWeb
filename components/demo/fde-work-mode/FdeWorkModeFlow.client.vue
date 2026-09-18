<script setup lang="ts">
import {
  Database,
  FlaskConical,
  LayoutTemplate,
  RefreshCw,
  Rocket,
  Target,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import FdeWorkModeCurveEdge from '~/components/demo/fde-work-mode/FdeWorkModeCurveEdge.vue'
import FdeWorkModeNode from '~/components/demo/fde-work-mode/FdeWorkModeNode.vue'

// FDE 工作模式「从业务问题到生产系统，建立 AI 落地闭环」：六阶段单向主链拓扑。
// 业务问题识别 → 场景定义与设计 → 数据与知识连接 → 快速原型验证 → 系统集成与上线 → 生产运行迭代，
// 六卡仅由动态连接线依次串联（无回流 lane、无顶部 pill，与带回环的制造/闭环家族区分）。
// 统一 1704px 画布：六卡 220 宽，x：0/297/594/890/1187/1484，卡间连接区各 77。
const phases = [
  {
    id: 'problem',
    label: '业务问题识别',
    icon: Target,
    tone: 'violet',
    rows: ['深入真实业务现场', '与业务共同拆解问题', '识别 AI 介入环节'],
  },
  {
    id: 'design',
    label: '场景定义与设计',
    icon: LayoutTemplate,
    tone: 'blue',
    rows: ['高价值场景筛选', '价值目标量化定义', '可验证交付边界'],
  },
  {
    id: 'data',
    label: '数据与知识连接',
    icon: Database,
    tone: 'cyan',
    rows: ['多源数据连接治理', '企业知识构建', '业务上下文化'],
  },
  {
    id: 'prototype',
    label: '快速原型验证',
    icon: FlaskConical,
    tone: 'emerald',
    rows: ['快速构建可运行原型', '真实数据完成验证', '技术可行性确认'],
  },
  {
    id: 'launch',
    label: '系统集成与上线',
    icon: Rocket,
    tone: 'amber',
    rows: ['企业系统与权限安全', '生产环境部署', '运行监控与可观测'],
  },
  {
    id: 'iterate',
    label: '生产运行迭代',
    icon: RefreshCw,
    tone: 'pink',
    rows: ['真实使用反馈收集', '模型与策略持续调优', '新场景复制扩展'],
  },
] as const

const phaseX = [0, 297, 594, 890, 1187, 1484]

const nodes: Node[] = [
  ...phases.map((phase, index) => ({
    id: `phase-${phase.id}`,
    type: 'fdeWorkMode',
    position: { x: phaseX[index]!, y: 150 },
    data: { kind: 'phase', label: phase.label, icon: phase.icon, tone: phase.tone, rows: [...phase.rows] },
    selectable: false,
    draggable: false,
  })),
]

const curveDefaults = {
  type: 'fdeWorkModeCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...phases.slice(0, -1).map((phase, index) => ({
    id: `e-phase-${phase.id}-${phases[index + 1]!.id}`,
    source: `phase-${phase.id}`,
    target: `phase-${phases[index + 1]!.id}`,
    ...curveDefaults,
  })),
]

// 内容纵向跨度 150（阶段卡顶）→ 390（阶段卡底），跨度 240；
// 默认 viewport y = 20 对应 580px Demo 容器惯例；页面接入（560px 帧）传 viewport-y=10 即可完整垂直居中（240 < 560，无需缩放）。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 20,
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
    <template #node-fdeWorkMode="{ data }">
      <FdeWorkModeNode :data="data" />
    </template>
    <template #edge-fdeWorkModeCurve="edgeProps">
      <FdeWorkModeCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
