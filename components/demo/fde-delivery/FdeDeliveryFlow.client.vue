<script setup lang="ts">
import {
  Cable,
  CircleCheck,
  ClipboardCheck,
  Compass,
  Database,
  Flag,
  FlaskConical,
  Gauge,
  MessageSquareText,
  Package,
  RefreshCw,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  ToyBrick,
  Users,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import FdeDeliveryCurveEdge from '~/components/demo/fde-delivery/FdeDeliveryCurveEdge.vue'
import FdeDeliveryNode from '~/components/demo/fde-delivery/FdeDeliveryNode.vue'

// FDE 交付流程「与业务一起构建，在真实使用中持续迭代」：四阶段面板 + 连接器里程碑 + 交付物拓扑。
// 需求诊断 → 联合验证 → 工程交付 → 持续迭代，连接器上压 amber 里程碑 pill（场景清单确认 / 原型价值验证 / 生产上线验收），
// 每阶段向下输出交付物芯片（场景清单与价值目标 / 验证报告与可运行原型 / 生产系统与运维方案 / 迭代计划与扩展路线）。
// 统一 1704px 画布：四面板 320 宽，x：0/461/923/1384，连接区各 141。
const panelX = [0, 461, 923, 1384]

const panels = [
  {
    id: 'diagnose',
    label: '需求诊断',
    caption: '与业务共同定义问题',
    icon: Compass,
    tone: 'violet',
    rows: [
      { label: '业务现场调研', caption: '深入流程与系统', icon: Users },
      { label: '问题与场景拆解', caption: '与业务专家共创', icon: Target },
      { label: '价值目标定义', caption: '可量化验收口径', icon: ClipboardCheck },
    ],
  },
  {
    id: 'validate',
    label: '联合验证',
    caption: '用真实数据验证价值',
    icon: FlaskConical,
    tone: 'blue',
    rows: [
      { label: '数据与知识接入', caption: '多源数据治理融合', icon: Database },
      { label: '快速原型构建', caption: '可运行 AI 原型', icon: ToyBrick },
      { label: '真实场景验证', caption: '数据驱动价值确认', icon: CircleCheck },
    ],
  },
  {
    id: 'deliver',
    label: '工程交付',
    caption: '生产级工程标准',
    icon: Rocket,
    tone: 'emerald',
    rows: [
      { label: '系统集成开发', caption: '嵌入既有业务流程', icon: Cable },
      { label: '安全权限合规', caption: '权限 · 安全 · 成本', icon: ShieldCheck },
      { label: '上线切换运行', caption: '监控与可观测', icon: Gauge },
    ],
  },
  {
    id: 'iterate',
    label: '持续迭代',
    caption: '基于反馈持续演进',
    icon: RefreshCw,
    tone: 'pink',
    rows: [
      { label: '使用效果反馈', caption: '真实数据回收评估', icon: MessageSquareText },
      { label: '场景持续优化', caption: '模型与策略调优', icon: SlidersHorizontal },
      { label: '能力复制扩展', caption: '走向更多业务流程', icon: Sparkles },
    ],
  },
] as const

const milestones = [
  { id: 'scope', label: '场景清单确认', icon: Flag, x: 325 },
  { id: 'poc', label: '原型价值验证', icon: CircleCheck, x: 787 },
  { id: 'launch', label: '生产上线验收', icon: ClipboardCheck, x: 1248 },
] as const

const deliverables = [
  { id: 'scope', label: '场景清单与价值目标', tone: 'violet' },
  { id: 'poc', label: '验证报告与可运行原型', tone: 'blue' },
  { id: 'system', label: '生产系统与运维方案', tone: 'emerald' },
  { id: 'roadmap', label: '迭代计划与扩展路线', tone: 'pink' },
] as const

const nodes: Node[] = [
  ...panels.map((panel, index) => ({
    id: `panel-${panel.id}`,
    type: 'fdeDelivery',
    position: { x: panelX[index]!, y: 40 },
    data: { kind: 'panel', label: panel.label, caption: panel.caption, icon: panel.icon, tone: panel.tone, rows: panel.rows.map(row => ({ ...row })) },
    selectable: false,
    draggable: false,
  })),
  ...milestones.map(milestone => ({
    id: `milestone-${milestone.id}`,
    type: 'fdeDelivery',
    position: { x: milestone.x, y: 163 },
    data: { kind: 'milestone', label: milestone.label, icon: milestone.icon },
    selectable: false,
    draggable: false,
  })),
  ...deliverables.map((deliverable, index) => ({
    id: `deliverable-${deliverable.id}`,
    type: 'fdeDelivery',
    position: { x: panelX[index]!, y: 380 },
    data: { kind: 'deliverable', label: deliverable.label, icon: Package, tone: deliverable.tone },
    selectable: false,
    draggable: false,
  })),
]

const curveDefaults = {
  type: 'fdeDeliveryCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...panels.slice(0, -1).map((panel, index) => ({
    id: `e-panel-${panel.id}-${panels[index + 1]!.id}`,
    source: `panel-${panel.id}`,
    target: `panel-${panels[index + 1]!.id}`,
    ...curveDefaults,
  })),
  ...panels.map((panel, index) => ({
    id: `e-panel-${panel.id}-deliverable`,
    source: `panel-${panel.id}`,
    target: `deliverable-${deliverables[index]!.id}`,
    data: { outbound: true },
    ...curveDefaults,
  })),
]

// 内容纵向跨度 40（阶段面板顶）→ 428（交付物芯片底），跨度 388；
// 默认 viewport y = 56 对应 580px Demo 容器惯例；页面接入（560px 帧）传 viewport-y=46 即可完整垂直居中（388 < 560，无需缩放）。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 56,
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
    <template #node-fdeDelivery="{ data }">
      <FdeDeliveryNode :data="data" />
    </template>
    <template #edge-fdeDeliveryCurve="edgeProps">
      <FdeDeliveryCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
