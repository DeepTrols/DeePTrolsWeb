<script setup lang="ts">
import {
  Activity,
  AppWindow,
  Cable,
  CalendarClock,
  Cloud,
  Database,
  Download,
  Droplets,
  FlaskConical,
  Gauge,
  GitBranch,
  LayoutTemplate,
  Network,
  Radio,
  Rocket,
  Scale,
  ScanText,
  ScrollText,
  Search,
  Shuffle,
  Siren,
  Workflow,
  Zap,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import DdpUnifiedDevelopmentCurveEdge from '~/components/demo/ddp-unified-development/DdpUnifiedDevelopmentCurveEdge.vue'
import DdpUnifiedDevelopmentNode from '~/components/demo/ddp-unified-development/DdpUnifiedDevelopmentNode.vue'

// 数曜·数据开发平台「统一数据开发：从接入到交付」：横向六列管线拓扑。
// 数据源 ×5 → 统一数据接入 → 智能数据解析 → 可视化编排 → 持续交付 → 高质量数据资产（集群卡收束）。
// 四个阶段名即面板头（数曜 logo pill），无序号、无独立 header 节点，阶段融入流程本身。
// 统一 1704px 画布：节点宽 220+200×4+240=1260，五段连接区各约 89；x：0/309/597/886/1174/1464。
const sources = [
  { id: 'db', label: '业务数据库', icon: Database, tone: 'violet', y: 60 },
  { id: 'mq', label: '消息队列', icon: Radio, tone: 'blue', y: 148 },
  { id: 'biz', label: '业务系统', icon: AppWindow, tone: 'pink', y: 236 },
  { id: 'lake', label: '数据湖', icon: Cloud, tone: 'emerald', y: 324 },
  { id: 'log', label: '文件与日志', icon: ScrollText, tone: 'cyan', y: 412 },
] as const

const stages = [
  {
    id: 'ingest',
    label: '统一数据接入',
    x: 309,
    items: [
      { label: '多源连接器', icon: Cable },
      { label: '实时同步', icon: Zap },
      { label: '批量采集', icon: Download },
      { label: '接入监控', icon: Activity },
    ],
  },
  {
    id: 'parse',
    label: '智能数据解析',
    x: 597,
    items: [
      { label: '智能解析', icon: ScanText },
      { label: '数据清洗', icon: Droplets },
      { label: '转换分类', icon: Shuffle },
      { label: '口径统一', icon: Scale },
    ],
  },
  {
    id: 'orchestrate',
    label: '可视化编排',
    x: 886,
    items: [
      { label: 'DAG 编排', icon: Workflow },
      { label: '拖拽构建', icon: LayoutTemplate },
      { label: '智能调度', icon: CalendarClock },
      { label: '依赖管理', icon: GitBranch },
    ],
  },
  {
    id: 'deliver',
    label: '持续交付',
    x: 1174,
    items: [
      { label: '开发测试', icon: FlaskConical },
      { label: '发布上线', icon: Rocket },
      { label: '运行监控', icon: Gauge },
      { label: '异常告警', icon: Siren },
    ],
  },
] as const

const nodes: Node[] = [
  ...sources.map(source => ({
    id: `source-${source.id}`,
    type: 'ddpUnifiedDevelopment',
    position: { x: 0, y: source.y },
    data: { kind: 'source', label: source.label, icon: source.icon, tone: source.tone },
    selectable: false,
    draggable: false,
  })),
  ...stages.map(stage => ({
    id: `stage-${stage.id}`,
    type: 'ddpUnifiedDevelopment',
    position: { x: stage.x, y: 110 },
    data: { kind: 'stage', label: stage.label, items: stage.items },
    selectable: false,
    draggable: false,
  })),
  {
    id: 'assets',
    type: 'ddpUnifiedDevelopment',
    position: { x: 1464, y: 30 },
    data: {
      kind: 'assets',
      label: '数曜 · 数据资产',
      primary: {
        label: '统一资产目录',
        tags: [
          { label: '全域检索', icon: Search },
          { label: '血缘追溯', icon: Network },
        ],
      },
      nodes: [{ label: '数仓模型' }, { label: '指标体系' }, { label: '标签库' }, { label: '数据服务' }],
      finalNode: { label: '资产空间 N' },
    },
    selectable: false,
    draggable: false,
  },
]

const curveDefaults = {
  type: 'ddpUnifiedDevelopmentCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...sources.map(source => ({ id: `e-source-${source.id}-ingest`, source: `source-${source.id}`, target: 'stage-ingest', ...curveDefaults })),
  { id: 'e-ingest-parse', source: 'stage-ingest', target: 'stage-parse', ...curveDefaults },
  { id: 'e-parse-orchestrate', source: 'stage-parse', target: 'stage-orchestrate', ...curveDefaults },
  { id: 'e-orchestrate-deliver', source: 'stage-orchestrate', target: 'stage-deliver', ...curveDefaults },
  { id: 'e-deliver-assets', source: 'stage-deliver', target: 'assets', data: { outbound: true }, ...curveDefaults },
]

// 内容纵向跨度 30（资产集群顶）→ 498（集群虚线叠层底 490+8），跨度 468；
// 默认 viewport y = 26 对应 580px 容器；页面接入（560px 帧）传 viewport-y=16 即可完整垂直居中（468 < 560，无需缩放）。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 26,
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
    <template #node-ddpUnifiedDevelopment="{ data }">
      <DdpUnifiedDevelopmentNode :data="data" />
    </template>
    <template #edge-ddpUnifiedDevelopmentCurve="edgeProps">
      <DdpUnifiedDevelopmentCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
