<script setup lang="ts">
import {
  Braces,
  Cable,
  Cpu,
  DatabaseZap,
  Download,
  Factory,
  FileText,
  Globe,
  HardDrive,
  KeyRound,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  Webhook,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import BoyaoIntegrationCurveEdge from '~/components/demo/boyao-integration/BoyaoIntegrationCurveEdge.vue'
import BoyaoIntegrationNode from '~/components/demo/boyao-integration/BoyaoIntegrationNode.vue'

// 博曜·企业级知识管理平台「系统集成」能力：横向对称闭环拓扑（区别于 knowledge-hub 的单向管线）。
// 左排异构系统 ×5（采集端）→ 博曜·集成引擎 → 统一知识文档库（居中）→ 博曜·调用服务网关 → 右排同一批异构系统的内嵌调用端点 ×5，
// 两端镜像表达「从异构系统采集、向异构系统回送」的闭环。
// 阶段标签融入流程：系统集成 / 统一采集 / 开放调用 三枚白底 pill 压在对应连接器上，无序号。
// 统一 1704px 画布：节点宽 220+170+240+170+220=1020，四段连接区各 171；x：0/391/732/1143/1484（文档库居中 852）。
const systems = [
  { id: 'oa', label: 'OA 办公系统', sublabel: '知识门户', icon: FileText, tone: 'violet', sourceY: 60, endpointY: 56 },
  { id: 'erp', label: 'ERP 经营系统', sublabel: '智能助手', icon: Factory, tone: 'blue', sourceY: 148, endpointY: 144 },
  { id: 'crm', label: 'CRM 客户系统', sublabel: '文档侧栏', icon: Users, tone: 'pink', sourceY: 236, endpointY: 232 },
  { id: 'mes', label: 'MES 生产系统', sublabel: '工艺知识库', icon: Cpu, tone: 'emerald', sourceY: 324, endpointY: 320 },
  { id: 'file', label: '网盘与文件库', sublabel: '全局搜索', icon: HardDrive, tone: 'cyan', sourceY: 412, endpointY: 408 },
] as const

const nodes: Node[] = [
  ...systems.map(system => ({
    id: `source-${system.id}`,
    type: 'boyaoIntegration',
    position: { x: 0, y: system.sourceY },
    data: { kind: 'source', label: system.label, icon: system.icon, tone: system.tone },
    selectable: false,
    draggable: false,
  })),
  {
    id: 'engine',
    type: 'boyaoIntegration',
    position: { x: 391, y: 130 },
    data: {
      kind: 'engine',
      label: '博曜 · 集成引擎',
      items: [
        { label: '连接器管理', icon: Cable },
        { label: '自动采集', icon: Download },
        { label: '增量同步', icon: RefreshCw },
        { label: '权限映射', icon: KeyRound },
      ],
    },
    selectable: false,
    draggable: false,
  },
  { id: 'stage-integration', type: 'boyaoIntegration', position: { x: 266, y: 243 }, data: { kind: 'stage', label: '系统集成' }, selectable: false, draggable: false },
  {
    id: 'library',
    type: 'boyaoIntegration',
    position: { x: 732, y: 30 },
    data: {
      kind: 'library',
      label: '博曜 · 知识文档库',
      primary: {
        label: '组织统一文档库',
        tags: [
          { label: '全文索引', icon: Search },
          { label: '向量化', icon: DatabaseZap },
        ],
      },
      nodes: [{ label: '研发文档' }, { label: '营销资料' }, { label: '制度规范' }, { label: '合同档案' }],
      finalNode: { label: '文档空间 N' },
    },
    selectable: false,
    draggable: false,
  },
  { id: 'stage-collection', type: 'boyaoIntegration', position: { x: 607, y: 243 }, data: { kind: 'stage', label: '统一采集' }, selectable: false, draggable: false },
  {
    id: 'gateway',
    type: 'boyaoIntegration',
    position: { x: 1143, y: 130 },
    data: {
      kind: 'gateway',
      label: '博曜 · 调用服务',
      items: [
        { label: '开放 API', icon: Globe },
        { label: 'SDK 集成', icon: Braces },
        { label: 'Webhook 推送', icon: Webhook },
        { label: '统一鉴权', icon: ShieldCheck },
      ],
    },
    selectable: false,
    draggable: false,
  },
  { id: 'stage-invocation', type: 'boyaoIntegration', position: { x: 1018, y: 243 }, data: { kind: 'stage', label: '开放调用' }, selectable: false, draggable: false },
  ...systems.map(system => ({
    id: `endpoint-${system.id}`,
    type: 'boyaoIntegration',
    position: { x: 1484, y: system.endpointY },
    data: { kind: 'endpoint', label: system.label, sublabel: system.sublabel, icon: system.icon, tone: system.tone },
    selectable: false,
    draggable: false,
  })),
]

const curveDefaults = {
  type: 'boyaoIntegrationCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...systems.map(system => ({ id: `e-source-${system.id}-engine`, source: `source-${system.id}`, target: 'engine', ...curveDefaults })),
  { id: 'e-engine-library', source: 'engine', target: 'library', ...curveDefaults },
  { id: 'e-library-gateway', source: 'library', target: 'gateway', data: { outbound: true }, ...curveDefaults },
  ...systems.map(system => ({ id: `e-gateway-endpoint-${system.id}`, source: 'gateway', target: `endpoint-${system.id}`, data: { outbound: true }, ...curveDefaults })),
]

// 内容纵向跨度 30（文档库顶）→ 498（文档库虚线叠层底 490+8），跨度 468；
// 默认 viewport y = 26 使其在 580px Demo 容器中垂直居中；
// 页面接入（560px 帧）时通过 viewport-y 覆盖（y=16 可使 468px 跨度在 560px 帧内完整居中，无需缩放）。
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
    <template #node-boyaoIntegration="{ data }">
      <BoyaoIntegrationNode :data="data" />
    </template>
    <template #edge-boyaoIntegrationCurve="edgeProps">
      <BoyaoIntegrationCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
