<script setup lang="ts">
import {
  Activity,
  BadgeCheck,
  BellRing,
  Building2,
  Cable,
  ChartNoAxesCombined,
  CircleGauge,
  ClipboardPlus,
  Database,
  HandCoins,
  Handshake,
  History,
  LayoutDashboard,
  Radar,
  ScrollText,
  ShieldCheck,
  TriangleAlert,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import RegulationArchitectureEdge from '~/components/demo/regulation/RegulationArchitectureEdge.vue'
import RegulationArchitectureNode from '~/components/demo/regulation/RegulationArchitectureNode.vue'

const nodes: Node[] = [
  { id: 'resource', type: 'regulation', position: { x: 0, y: 64 }, data: { kind: 'source', label: '数据资源', icon: Database, tone: 'violet' }, selectable: false, draggable: false },
  { id: 'product', type: 'regulation', position: { x: 0, y: 140 }, data: { kind: 'source', label: '数据产品', icon: CircleGauge, tone: 'blue' }, selectable: false, draggable: false },
  { id: 'transaction', type: 'regulation', position: { x: 0, y: 216 }, data: { kind: 'source', label: '数据交易', icon: HandCoins, tone: 'pink' }, selectable: false, draggable: false },
  { id: 'interface', type: 'regulation', position: { x: 0, y: 292 }, data: { kind: 'source', label: '数据接口', icon: Cable, tone: 'orange' }, selectable: false, draggable: false },
  { id: 'entity', type: 'regulation', position: { x: 0, y: 368 }, data: { kind: 'source', label: '流通主体', icon: Building2, tone: 'cyan' }, selectable: false, draggable: false },
  {
    id: 'platform',
    type: 'regulation',
    position: { x: 470, y: 143 },
    width: 480,
    data: {
      kind: 'core',
      label: '数曜 · 数据要素监管平台',
      icon: ShieldCheck,
      primaryTitle: '实时监管',
      primarySubtitle: '全链路动态监测',
      primaryIcon: Radar,
      modules: [
        { label: '监管规则', icon: ScrollText },
        { label: '风险预警', icon: TriangleAlert },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'risk',
    type: 'regulation',
    position: { x: 1160, y: 29.5 },
    width: 320,
    data: {
      kind: 'integration',
      label: '风险监管',
      items: [
        { label: '实时监测', icon: Activity, colorClass: 'text-[#8B5CF6]' },
        { label: '智能预警', icon: BellRing, colorClass: 'text-[#0EA5E9]' },
        { label: '风险处置', icon: ShieldCheck, colorClass: 'text-[#10B981]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'coordination',
    type: 'regulation',
    position: { x: 1160, y: 176.5 },
    width: 320,
    data: {
      kind: 'integration',
      label: '协同处置',
      items: [
        { label: '工单派发', icon: ClipboardPlus, colorClass: 'text-[#6366F1]' },
        { label: '协同处置', icon: Handshake, colorClass: 'text-[#F59E0B]' },
        { label: '闭环核查', icon: BadgeCheck, colorClass: 'text-[#0EA5E9]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'analysis',
    type: 'regulation',
    position: { x: 1160, y: 323.5 },
    width: 320,
    data: {
      kind: 'integration',
      label: '监管分析',
      items: [
        { label: '全过程留痕', icon: History, colorClass: 'text-[#231F20]' },
        { label: '监管驾驶舱', icon: LayoutDashboard, colorClass: 'text-[#0EA5E9]' },
        { label: '统计分析', icon: ChartNoAxesCombined, colorClass: 'text-[#8B5CF6]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
]

const edgeDefaults = {
  type: 'regulationDynamic',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  { id: 'resource-platform', source: 'resource', target: 'platform', data: { direction: 'inbound' }, ...edgeDefaults },
  { id: 'product-platform', source: 'product', target: 'platform', data: { direction: 'inbound' }, ...edgeDefaults },
  { id: 'transaction-platform', source: 'transaction', target: 'platform', data: { direction: 'inbound' }, ...edgeDefaults },
  { id: 'interface-platform', source: 'interface', target: 'platform', data: { direction: 'inbound' }, ...edgeDefaults },
  { id: 'entity-platform', source: 'entity', target: 'platform', data: { direction: 'inbound' }, ...edgeDefaults },
  { id: 'platform-risk', source: 'platform', target: 'risk', data: { direction: 'outbound' }, ...edgeDefaults },
  { id: 'platform-coordination', source: 'platform', target: 'coordination', data: { direction: 'outbound' }, ...edgeDefaults },
  { id: 'platform-analysis', source: 'platform', target: 'analysis', data: { direction: 'outbound' }, ...edgeDefaults },
]

const defaultViewport = { x: 112, y: 2, zoom: 1 }
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
    <template #node-regulation="{ data }">
      <RegulationArchitectureNode :data="data" />
    </template>
    <template #edge-regulationDynamic="edgeProps">
      <RegulationArchitectureEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
