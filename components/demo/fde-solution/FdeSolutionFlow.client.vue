<script setup lang="ts">
import {
  BookOpen,
  Braces,
  Cable,
  CircleCheck,
  Crosshair,
  Database,
  FlaskConical,
  Gauge,
  Rocket,
  ScanEye,
  ShieldCheck,
  Target,
  ToyBrick,
  Users,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import boyaoLogo from '~/assets/images/brand/boyao-logo.svg'
import shuyaoLogo from '~/assets/images/brand/shuyao-logo.svg'
import zhiyaoLogo from '~/assets/images/brand/zhiyao-logo.svg'
import FdeSolutionCurveEdge from '~/components/demo/fde-solution/FdeSolutionCurveEdge.vue'
import FdeSolutionNode from '~/components/demo/fde-solution/FdeSolutionNode.vue'

// FDE 解决方案「让工程团队与业务团队共同完成 AI 落地」：基础能力底座 → 四段交付主链拓扑。
// 上排四段 320×250 面板：场景识别 → 数据连接 → 原型验证 → 系统集成与生产上线（横向主链）；
// 下排 1640×150 虚线底座「DeepTrols 基础能力」内嵌 数曜/博曜/智曜 三张 logo 产品卡，
// 经四条对齐各段中心的纵向出站边向上支撑主链（底座多 Top handle 按百分比对齐，与既有家族拓扑区分）。
// 统一 1704px 画布：x：32/472/912/1352，段间连接区各 120；纵向 40 → 546。
const stages = [
  {
    id: 'identify',
    label: '场景识别',
    caption: '与业务共同定义问题',
    icon: Target,
    tone: 'violet',
    x: 32,
    rows: [
      { label: '业务现场调研', caption: '深入流程与系统', icon: Users },
      { label: '高价值场景筛选', caption: '与业务专家共创', icon: Target },
      { label: '价值目标定义', caption: '可量化验收口径', icon: Crosshair },
    ],
  },
  {
    id: 'data',
    label: '数据连接',
    caption: '多源数据与知识接入',
    icon: Database,
    tone: 'cyan',
    x: 472,
    rows: [
      { label: '多源数据接入', caption: '统一采集治理融合', icon: Database },
      { label: '企业知识构建', caption: '业务知识库沉淀', icon: BookOpen },
      { label: '业务上下文化', caption: '为 AI 提供高质量上下文', icon: Braces },
    ],
  },
  {
    id: 'prototype',
    label: '原型验证',
    caption: '用真实数据验证价值',
    icon: FlaskConical,
    tone: 'emerald',
    x: 912,
    rows: [
      { label: '快速原型构建', caption: '可运行 AI 原型', icon: ToyBrick },
      { label: '真实数据验证', caption: '数据驱动价值确认', icon: CircleCheck },
      { label: '技术可行性确认', caption: '评估生产可用性', icon: ScanEye },
    ],
  },
  {
    id: 'launch',
    label: '系统集成与生产上线',
    caption: '生产级工程与运行',
    icon: Rocket,
    tone: 'blue',
    x: 1352,
    rows: [
      { label: '企业系统集成', caption: '嵌入既有业务流程', icon: Cable },
      { label: '安全权限合规', caption: '权限 · 安全 · 成本', icon: ShieldCheck },
      { label: '生产上线运行', caption: '监控与可观测', icon: Gauge },
    ],
  },
] as const

const foundationProducts = [
  { name: '数曜 ｜ 数智基建', description: '数据治理 · 标签 · 开发平台', logo: shuyaoLogo },
  { name: '博曜 ｜ 知识中枢', description: '企业级知识管理平台', logo: boyaoLogo },
  { name: '智曜 ｜ 智能引擎', description: 'AgentOS · Agent 基础设施平台', logo: zhiyaoLogo },
]

const nodes: Node[] = [
  ...stages.map(stage => ({
    id: `stage-${stage.id}`,
    type: 'fdeSolution',
    position: { x: stage.x, y: 40 },
    data: { kind: 'stage', label: stage.label, caption: stage.caption, icon: stage.icon, tone: stage.tone, rows: stage.rows.map(row => ({ ...row })) },
    selectable: false,
    draggable: false,
  })),
  {
    id: 'foundation',
    type: 'fdeSolution',
    position: { x: 32, y: 396 },
    data: {
      kind: 'foundation',
      label: 'DeepTrols 基础能力',
      caption: '数曜 × 博曜 × 智曜 · 数据、知识与智能体底座',
      products: foundationProducts,
    },
    selectable: false,
    draggable: false,
  },
]

const curveDefaults = {
  type: 'fdeSolutionCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...stages.slice(0, -1).map((stage, index) => ({
    id: `e-stage-${stage.id}-${stages[index + 1]!.id}`,
    source: `stage-${stage.id}`,
    target: `stage-${stages[index + 1]!.id}`,
    ...curveDefaults,
  })),
  ...stages.map((stage, index) => ({
    id: `e-foundation-stage-${stage.id}`,
    source: 'foundation',
    sourceHandle: `support-${index + 1}`,
    target: `stage-${stage.id}`,
    targetHandle: 'support',
    data: { outbound: true },
    ...curveDefaults,
  })),
]

// 内容纵向跨度 40 → 554（底座虚线层底 546+8），跨度 514；
// 默认 viewport y = -7 对应 580px Demo 容器惯例；页面接入（560px 帧）传 viewport-y=-17 即可完整垂直居中。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: -7,
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
    <template #node-fdeSolution="{ data }">
      <FdeSolutionNode :data="data" />
    </template>
    <template #edge-fdeSolutionCurve="edgeProps">
      <FdeSolutionCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
