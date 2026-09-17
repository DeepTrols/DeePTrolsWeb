<script setup lang="ts">
import {
  Activity,
  Braces,
  CalendarClock,
  CodeXml,
  Database,
  FileStack,
  GitBranch,
  PlugZap,
  ServerCog,
  Warehouse,
  Webhook,
  Workflow,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import SmartDataHubEdge from '~/components/demo/smart-data-hub/SmartDataHubEdge.vue'
import SmartDataHubNode from '~/components/demo/smart-data-hub/SmartDataHubNode.vue'

const nodes: Node[] = [
  {
    id: 'sources',
    type: 'smartDataHub',
    position: { x: 100, y: 140 },
    width: 260,
    height: 280,
    data: {
      kind: 'sources',
      label: '数据源',
      items: [
        { label: '业务数据库', icon: Database, tone: 'cyan' },
        { label: '数据仓库', icon: Warehouse, tone: 'blue' },
        { label: '文件数据', icon: FileStack, tone: 'orange' },
        { label: 'API/消息', icon: Webhook, tone: 'pink' },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'center-ring',
    type: 'smartDataHubRing',
    position: { x: 602, y: 30 },
    width: 500,
    height: 500,
    data: {},
    selectable: false,
    draggable: false,
  },
  {
    id: 'core',
    type: 'smartDataHub',
    position: { x: 682, y: 110 },
    width: 340,
    height: 340,
    data: {
      kind: 'core',
      label: '数曜 · 数据开发平台',
      subtitle: '智能数据开发引擎',
      orbitIcons: [
        { icon: PlugZap, colorClass: 'text-primary' },
        { icon: CodeXml, colorClass: 'text-emerald-500' },
        { icon: CalendarClock, colorClass: 'text-blue-500' },
        { icon: Activity, colorClass: 'text-violet-500' },
      ],
      tags: ['开发', '编排', '调度'],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'output',
    type: 'smartDataHub',
    position: { x: 1364, y: 140 },
    width: 240,
    height: 280,
    data: {
      kind: 'output',
      label: '开发全流程',
      items: [
        { label: '数据集成', icon: GitBranch, colorClass: 'text-emerald-500' },
        { label: '数据开发', icon: Braces, colorClass: 'text-blue-500' },
        { label: '任务编排', icon: Workflow, colorClass: 'text-violet-500' },
        { label: '调度运维', icon: ServerCog, colorClass: 'text-amber-500' },
      ],
    },
    selectable: false,
    draggable: false,
  },
]

const edges: Edge[] = [
  { id: 'sources-core', source: 'sources', target: 'core', targetHandle: 'left', type: 'smartDataHubDynamic', animated: true, selectable: false },
  { id: 'core-output', source: 'core', sourceHandle: 'right', target: 'output', type: 'smartDataHubDynamic', animated: true, selectable: false },
]

const defaultViewport = { x: 0, y: 0, zoom: 1 }
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
    <template #node-smartDataHub="{ data }">
      <SmartDataHubNode :data="data" />
    </template>
    <template #node-smartDataHubRing>
      <div class="size-[500px] rounded-full border border-primary/10"></div>
    </template>
    <template #edge-smartDataHubDynamic="edgeProps">
      <SmartDataHubEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
