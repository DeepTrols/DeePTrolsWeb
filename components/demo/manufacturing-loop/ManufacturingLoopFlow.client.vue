<script setup lang="ts">
import {
  Activity,
  AppWindow,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Cable,
  CalendarClock,
  ChartColumn,
  DatabaseZap,
  Eye,
  Factory,
  Gauge,
  Network,
  Plug,
  Radio,
  Radar,
  ScanEye,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import boyaoLogo from '~/assets/images/brand/boyao-logo.svg'
import shuyaoLogo from '~/assets/images/brand/shuyao-logo.svg'
import tanyaoLogo from '~/assets/images/brand/tanyao-iot-logo.svg'
import zhiyaoLogo from '~/assets/images/brand/zhiyao-logo.svg'
import ManufacturingLoopCurveEdge from '~/components/demo/manufacturing-loop/ManufacturingLoopCurveEdge.vue'
import ManufacturingLoopNode from '~/components/demo/manufacturing-loop/ManufacturingLoopNode.vue'
import ManufacturingLoopReturnEdge from '~/components/demo/manufacturing-loop/ManufacturingLoopReturnEdge.vue'

// 智能制造解决方案「融合数据、知识、物联与 AI，构建制造智能闭环」：横向主链 + 底部回流闭环。
// 左列制造现场 ×4 → 探曜·物联感知 → 数曜·数据智能 → 博曜·知识中枢 → 智曜·AI 引擎 → 右列智能应用 ×4，
// 底部回流 lane 由 能源智能管理 应用下行、横穿画布、上行回到 业务系统，表达「执行 → 反馈 → 现场/业务」闭环。
// 阶段 pill（无序号）：实时感知 / 智能分析 / 自主决策 / 决策执行 压在对应连接器上，闭环反馈压在回流 lane 上。
// 统一 1704px 画布：节点宽 220+200×4+220=1240，五段连接区各约 93；x：0/313/606/899/1192/1484。
const sources = [
  { id: 'line', label: '生产设备与产线', icon: Factory, tone: 'violet', y: 34 },
  { id: 'sensor', label: '工业传感设备', icon: Radar, tone: 'blue', y: 134 },
  { id: 'scada', label: '控制系统 SCADA', icon: Gauge, tone: 'pink', y: 234 },
  { id: 'biz', label: '业务系统 ERP·MES', icon: AppWindow, tone: 'emerald', y: 334 },
] as const

const platforms = [
  {
    id: 'tanyao',
    label: '探曜 · 物联感知',
    logo: tanyaoLogo,
    x: 313,
    items: [
      { label: '设备连接', icon: Cable },
      { label: '协议兼容', icon: Plug },
      { label: '实时采集', icon: Radio },
      { label: '边缘协同', icon: Server },
    ],
  },
  {
    id: 'shuyao',
    label: '数曜 · 数据智能',
    logo: shuyaoLogo,
    x: 606,
    items: [
      { label: '数据治理', icon: DatabaseZap },
      { label: '统一数据模型', icon: Boxes },
      { label: '指标体系', icon: ChartColumn },
      { label: '可信底座', icon: ShieldCheck },
    ],
  },
  {
    id: 'boyao',
    label: '博曜 · 知识中枢',
    logo: boyaoLogo,
    x: 899,
    items: [
      { label: '知识沉淀', icon: BookOpen },
      { label: '检索理解', icon: Search },
      { label: '关联建模', icon: Network },
      { label: '知识智能服务', icon: Sparkles },
    ],
  },
  {
    id: 'zhiyao',
    label: '智曜 · AI 引擎',
    logo: zhiyaoLogo,
    x: 1192,
    items: [
      { label: '工业智能体', icon: Bot },
      { label: '预测性维护', icon: Activity },
      { label: '质量分析', icon: ScanEye },
      { label: '生产决策', icon: BrainCircuit },
    ],
  },
] as const

const apps = [
  { id: 'maintenance', label: '设备预测性维护', sublabel: '健康评估 · 故障预测', icon: Wrench, tone: 'violet', y: 30 },
  { id: 'vision', label: 'AI 视觉质量检测', sublabel: '缺陷检测 · 质量追溯', icon: Eye, tone: 'blue', y: 130 },
  { id: 'aps', label: 'APS 智能排程', sublabel: '动态排产 · 敏捷响应', icon: CalendarClock, tone: 'emerald', y: 230 },
  { id: 'energy', label: '能源智能管理', sublabel: '能耗优化 · 绿色低碳', icon: Zap, tone: 'cyan', y: 330 },
] as const

const nodes: Node[] = [
  ...sources.map(source => ({
    id: `source-${source.id}`,
    type: 'manufacturingLoop',
    position: { x: 0, y: source.y },
    data: { kind: 'source', label: source.label, icon: source.icon, tone: source.tone },
    selectable: false,
    draggable: false,
  })),
  ...platforms.map(platform => ({
    id: `platform-${platform.id}`,
    type: 'manufacturingLoop',
    position: { x: platform.x, y: 58 },
    data: { kind: 'platform', label: platform.label, logo: platform.logo, items: platform.items },
    selectable: false,
    draggable: false,
  })),
  { id: 'stage-sensing', type: 'manufacturingLoop', position: { x: 228, y: 191 }, data: { kind: 'stage', label: '实时感知' }, selectable: false, draggable: false },
  { id: 'stage-analysis', type: 'manufacturingLoop', position: { x: 814, y: 191 }, data: { kind: 'stage', label: '智能分析' }, selectable: false, draggable: false },
  { id: 'stage-decision', type: 'manufacturingLoop', position: { x: 1107, y: 191 }, data: { kind: 'stage', label: '自主决策' }, selectable: false, draggable: false },
  { id: 'stage-execution', type: 'manufacturingLoop', position: { x: 1400, y: 191 }, data: { kind: 'stage', label: '决策执行' }, selectable: false, draggable: false },
  { id: 'stage-feedback', type: 'manufacturingLoop', position: { x: 814, y: 413 }, data: { kind: 'stage', label: '闭环反馈' }, selectable: false, draggable: false },
  ...apps.map(app => ({
    id: `app-${app.id}`,
    type: 'manufacturingLoop',
    position: { x: 1484, y: app.y },
    data: { kind: 'app', label: app.label, sublabel: app.sublabel, icon: app.icon, tone: app.tone },
    selectable: false,
    draggable: false,
  })),
]

const curveDefaults = {
  type: 'manufacturingLoopCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...sources.map(source => ({ id: `e-source-${source.id}-tanyao`, source: `source-${source.id}`, target: 'platform-tanyao', ...curveDefaults })),
  { id: 'e-tanyao-shuyao', source: 'platform-tanyao', target: 'platform-shuyao', ...curveDefaults },
  { id: 'e-shuyao-boyao', source: 'platform-shuyao', target: 'platform-boyao', ...curveDefaults },
  { id: 'e-boyao-zhiyao', source: 'platform-boyao', target: 'platform-zhiyao', ...curveDefaults },
  ...apps.map(app => ({ id: `e-zhiyao-app-${app.id}`, source: 'platform-zhiyao', target: `app-${app.id}`, data: { outbound: true }, ...curveDefaults })),
  {
    id: 'e-loop-return',
    source: 'app-energy',
    sourceHandle: 'loop',
    target: 'source-biz',
    targetHandle: 'loop',
    type: 'manufacturingLoopReturn',
    animated: true,
    selectable: false,
  },
]

// 内容纵向跨度 30（智能应用顶）→ 434（回流 lane 430 + 光晕 4），跨度 404；
// 默认 viewport y = 58 对应 580px Demo 容器；页面接入（560px 帧）传 viewport-y=48 即可完整垂直居中（404 < 560，无需缩放）。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 58,
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
    <template #node-manufacturingLoop="{ data }">
      <ManufacturingLoopNode :data="data" />
    </template>
    <template #edge-manufacturingLoopCurve="edgeProps">
      <ManufacturingLoopCurveEdge v-bind="edgeProps" />
    </template>
    <template #edge-manufacturingLoopReturn="edgeProps">
      <ManufacturingLoopReturnEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
