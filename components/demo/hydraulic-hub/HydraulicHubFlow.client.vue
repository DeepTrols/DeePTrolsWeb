<script setup lang="ts">
import {
  Activity,
  Archive,
  BookOpen,
  BrainCircuit,
  Cable,
  ClipboardCheck,
  Database,
  Droplets,
  Eye,
  FileText,
  GitCompare,
  Globe,
  Lightbulb,
  MessagesSquare,
  Network,
  Radar,
  Scale,
  ScanText,
  Search,
  ShieldCheck,
  Shuffle,
  Siren,
  Sparkles,
  Users,
  Workflow,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import boyaoLogo from '~/assets/images/brand/boyao-logo.svg'
import shuyaoLogo from '~/assets/images/brand/shuyao-logo.svg'
import zhiyaoLogo from '~/assets/images/brand/zhiyao-logo.svg'
import HydraulicHubCurveEdge from '~/components/demo/hydraulic-hub/HydraulicHubCurveEdge.vue'
import HydraulicHubNode from '~/components/demo/hydraulic-hub/HydraulicHubNode.vue'

// 智慧水利解决方案「构建数据与知识双轮驱动的智慧水利知识中枢」：双轨汇聚拓扑。
// 上轨·数据轮：数据源 ×3 → 数曜·数据轮 → 统一数据底座；下轨·知识轮：知识源 ×3 → 博曜·知识轮 → 水利知识资产；
// 双轨在正中汇聚为 博曜·知识服务 → 智曜·智能决策 → 右列「四预」应用 ×4（预报/预警/预演/预案推荐）。
// 阶段 pill（无序号）：数据治理 / 知识构建 压双轨连接器，知识服务 / 智能决策 / 四预支撑 压中轴连接器。
// 统一 1704px 画布：节点宽 220+200×4+220=1240，五段连接区各约 93；x：0/313/606/899/1192/1484。
const dataSources = [
  { id: 'rain', label: '水雨情监测数据', icon: Droplets, tone: 'cyan', y: 30 },
  { id: 'base', label: '水利基础数据', icon: Database, tone: 'blue', y: 106 },
  { id: 'spatial', label: '业务与空间数据', icon: Globe, tone: 'violet', y: 182 },
] as const

const knowledgeSources = [
  { id: 'plan-doc', label: '预案与规范文档', icon: FileText, tone: 'pink', y: 290 },
  { id: 'history', label: '历史事件场景', icon: Archive, tone: 'amber', y: 366 },
  { id: 'expert', label: '专家经验沉淀', icon: Users, tone: 'emerald', y: 442 },
] as const

const apps = [
  { id: 'forecast', label: '智能预报', sublabel: '水雨情趋势预测', icon: Activity, tone: 'cyan', y: 82 },
  { id: 'warning', label: '智能预警', sublabel: '风险阈值告警', icon: Siren, tone: 'blue', y: 182 },
  { id: 'rehearsal', label: '数字预演', sublabel: '调度方案仿真推演', icon: Workflow, tone: 'emerald', y: 282 },
  { id: 'plan-rec', label: '预案推荐', sublabel: '处置方案匹配', icon: Sparkles, tone: 'pink', y: 382 },
] as const

const nodes: Node[] = [
  ...dataSources.map(source => ({
    id: `source-${source.id}`,
    type: 'hydraulicHub',
    position: { x: 0, y: source.y },
    data: { kind: 'source', label: source.label, icon: source.icon, tone: source.tone },
    selectable: false,
    draggable: false,
  })),
  ...knowledgeSources.map(source => ({
    id: `source-${source.id}`,
    type: 'hydraulicHub',
    position: { x: 0, y: source.y },
    data: { kind: 'source', label: source.label, icon: source.icon, tone: source.tone },
    selectable: false,
    draggable: false,
  })),
  {
    id: 'wheel-data',
    type: 'hydraulicHub',
    position: { x: 313, y: 10 },
    data: {
      kind: 'wheel',
      label: '数曜 · 数据轮',
      logo: shuyaoLogo,
      items: [
        { label: '多源汇聚', icon: Cable },
        { label: '标准治理', icon: Scale },
        { label: '融合关联', icon: Shuffle },
        { label: '可信底座', icon: ShieldCheck },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'wheel-knowledge',
    type: 'hydraulicHub',
    position: { x: 313, y: 270 },
    data: {
      kind: 'wheel',
      label: '博曜 · 知识轮',
      logo: boyaoLogo,
      items: [
        { label: '知识抽取', icon: ScanText },
        { label: '知识图谱', icon: Network },
        { label: '语义理解', icon: BookOpen },
        { label: '知识推理', icon: BrainCircuit },
      ],
    },
    selectable: false,
    draggable: false,
  },
  { id: 'stage-governance', type: 'hydraulicHub', position: { x: 521, y: 113 }, data: { kind: 'stage', label: '数据治理' }, selectable: false, draggable: false },
  { id: 'stage-construction', type: 'hydraulicHub', position: { x: 521, y: 373 }, data: { kind: 'stage', label: '知识构建' }, selectable: false, draggable: false },
  {
    id: 'asset-data',
    type: 'hydraulicHub',
    position: { x: 606, y: 10 },
    data: {
      kind: 'asset',
      label: '统一数据底座',
      logo: shuyaoLogo,
      rows: ['水文水情库', '工程与空间库', '业务主题库'],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'asset-knowledge',
    type: 'hydraulicHub',
    position: { x: 606, y: 270 },
    data: {
      kind: 'asset',
      label: '水利知识资产',
      logo: boyaoLogo,
      rows: ['预案与规则库', '历史场景库', '专题知识图谱'],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'service',
    type: 'hydraulicHub',
    position: { x: 899, y: 110 },
    data: {
      kind: 'service',
      label: '博曜 · 知识服务',
      logo: boyaoLogo,
      items: [
        { label: '智能问答', icon: MessagesSquare },
        { label: '语义检索', icon: Search },
        { label: '知识可视化', icon: Eye },
        { label: '知识推荐', icon: Lightbulb },
      ],
    },
    selectable: false,
    draggable: false,
  },
  { id: 'stage-service', type: 'hydraulicHub', position: { x: 814, y: 243 }, data: { kind: 'stage', label: '知识服务' }, selectable: false, draggable: false },
  {
    id: 'decision',
    type: 'hydraulicHub',
    position: { x: 1192, y: 110 },
    data: {
      kind: 'service',
      label: '智曜 · 智能决策',
      logo: zhiyaoLogo,
      items: [
        { label: '相似场景匹配', icon: GitCompare },
        { label: '规则智能调用', icon: Scale },
        { label: '预案辅助推荐', icon: ClipboardCheck },
        { label: '四预业务支撑', icon: Radar },
      ],
    },
    selectable: false,
    draggable: false,
  },
  { id: 'stage-decision', type: 'hydraulicHub', position: { x: 1107, y: 243 }, data: { kind: 'stage', label: '智能决策' }, selectable: false, draggable: false },
  { id: 'stage-siyu', type: 'hydraulicHub', position: { x: 1400, y: 243 }, data: { kind: 'stage', label: '四预支撑' }, selectable: false, draggable: false },
  ...apps.map(app => ({
    id: `app-${app.id}`,
    type: 'hydraulicHub',
    position: { x: 1484, y: app.y },
    data: { kind: 'app', label: app.label, sublabel: app.sublabel, icon: app.icon, tone: app.tone },
    selectable: false,
    draggable: false,
  })),
]

const curveDefaults = {
  type: 'hydraulicHubCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...dataSources.map(source => ({ id: `e-source-${source.id}-wheel-data`, source: `source-${source.id}`, target: 'wheel-data', ...curveDefaults })),
  ...knowledgeSources.map(source => ({ id: `e-source-${source.id}-wheel-knowledge`, source: `source-${source.id}`, target: 'wheel-knowledge', ...curveDefaults })),
  { id: 'e-wheel-data-asset', source: 'wheel-data', target: 'asset-data', ...curveDefaults },
  { id: 'e-wheel-knowledge-asset', source: 'wheel-knowledge', target: 'asset-knowledge', ...curveDefaults },
  { id: 'e-asset-data-service', source: 'asset-data', target: 'service', ...curveDefaults },
  { id: 'e-asset-knowledge-service', source: 'asset-knowledge', target: 'service', ...curveDefaults },
  { id: 'e-service-decision', source: 'service', target: 'decision', ...curveDefaults },
  ...apps.map(app => ({ id: `e-decision-app-${app.id}`, source: 'decision', target: `app-${app.id}`, data: { outbound: true }, ...curveDefaults })),
]

// 内容纵向跨度 10（双轨面板顶）→ 518（知识轮虚线叠层底 510+8），跨度 508；
// 默认 viewport y = 26 对应 580px Demo 容器惯例；页面接入（560px 帧）传 viewport-y=16 即可完整垂直居中（508 < 560，无需缩放）。
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
    <template #node-hydraulicHub="{ data }">
      <HydraulicHubNode :data="data" />
    </template>
    <template #edge-hydraulicHubCurve="edgeProps">
      <HydraulicHubCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
