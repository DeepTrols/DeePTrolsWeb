<script setup lang="ts">
import {
  AppWindow,
  BarChart3,
  BookOpenText,
  Bot,
  BrainCircuit,
  Database,
  FileStack,
  GitBranch,
  LayoutDashboard,
  Orbit,
  ScanText,
  SearchCheck,
  Sparkles,
  Waypoints,
  Workflow,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import KnowledgeHubEdge from './KnowledgeHubEdge.vue'
import KnowledgeHubNode from './KnowledgeHubNode.vue'

const sourceData = [
  { id: 'business', label: '业务系统', icon: AppWindow, tone: 'violet', y: 113, protocol: 'API / 数据库' },
  { id: 'document', label: '文档资料', icon: FileStack, tone: 'blue', y: 173, protocol: 'PDF / Office/图片/视频' },
  { id: 'asset', label: '数据资产', icon: Database, tone: 'emerald', y: 233, protocol: '数据表 / 指标' },
  { id: 'external', label: '外部知识', icon: BookOpenText, tone: 'orange', y: 293, protocol: '网页 / 第三方' },
] as const

const nodes: Node[] = [
  ...sourceData.flatMap((source, index) => [
    { id: source.id, type: 'knowledgeHub', position: { x: 100, y: source.y }, width: 140, data: { kind: 'source', label: source.label, icon: source.icon, tone: source.tone }, selectable: false, draggable: false },
    { id: `${source.id}-label`, type: 'knowledgeHub', position: { x: 320, y: source.y - (index === 1 ? 8 : 2) }, data: { kind: 'label', label: source.protocol }, selectable: false, draggable: false },
  ]),
  {
    id: 'processing', type: 'knowledgeHub', position: { x: 520, y: 100 }, width: 170, height: 300,
    data: { kind: 'processing', label: '博曜 · 知识加工', steps: [{ label: '知识采集', icon: ScanText }, { label: '智能解析', icon: BrainCircuit }, { label: '知识抽取', icon: GitBranch }] },
    selectable: false, draggable: false,
  },
  { id: 'ingestion-label', type: 'knowledgeHub', position: { x: 737, y: 240 }, data: { kind: 'label', label: '知识入库' }, selectable: false, draggable: false },
  {
    id: 'center', type: 'knowledgeHub', position: { x: 850, y: 20 }, width: 240, height: 460,
    data: { kind: 'center', label: '博曜 · 知识中枢', nodes: ['知识图谱', '术语与本体', '知识目录', '......', '知识空间 N'] },
    selectable: false, draggable: false,
  },
  {
    id: 'applications', type: 'knowledgeHub', position: { x: 1284, y: 25 }, width: 320,
    data: { kind: 'application', label: '智能知识应用', items: [{ label: '知识问答', icon: Bot, colorClass: 'text-violet-500' }, { label: '企业智能体', icon: Sparkles, colorClass: 'text-sky-500' }, { label: '业务 Copilot', icon: Orbit, colorClass: 'text-emerald-500' }] },
    selectable: false, draggable: false,
  },
  {
    id: 'intelligence', type: 'knowledgeHub', position: { x: 1284, y: 195 }, width: 320,
    data: { kind: 'application', label: '知识智能', items: [{ label: '语义理解', icon: BrainCircuit, colorClass: 'text-violet-500' }, { label: '智能检索', icon: SearchCheck, colorClass: 'text-sky-500' }, { label: '知识推理', icon: Waypoints, colorClass: 'text-emerald-500' }] },
    selectable: false, draggable: false,
  },
  {
    id: 'operations', type: 'knowledgeHub', position: { x: 1284, y: 365 }, width: 320,
    data: { kind: 'application', label: '知识运营', items: [{ label: '知识洞察', icon: BarChart3, colorClass: 'text-violet-500' }, { label: '知识治理', icon: Workflow, colorClass: 'text-sky-500' }, { label: '知识看板', icon: LayoutDashboard, colorClass: 'text-emerald-500' }] },
    selectable: false, draggable: false,
  },
]

const edges: Edge[] = [
  ...sourceData.map((source, index) => ({ id: `${source.id}-processing`, source: source.id, target: 'processing', targetHandle: `left-${index + 1}`, type: 'knowledgeHubDynamic', animated: true, selectable: false, data: { variant: 'step' } })),
  { id: 'processing-center', source: 'processing', sourceHandle: 'right', target: 'center', targetHandle: 'left', type: 'knowledgeHubDynamic', animated: true, selectable: false, data: { variant: 'step' } },
  ...['applications', 'intelligence', 'operations'].map(target => ({ id: `center-${target}`, source: 'center', sourceHandle: 'right', target, type: 'knowledgeHubDynamic', animated: true, selectable: false, data: { variant: 'curve' } })),
]

const proOptions = { hideAttribution: true }
</script>

<template>
  <VueFlow
    class="size-full"
    :nodes="nodes"
    :edges="edges"
    :default-viewport="{ x: 0, y: 0, zoom: 1 }"
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
    <template #node-knowledgeHub="{ data }">
      <KnowledgeHubNode :data="data" />
    </template>
    <template #edge-knowledgeHubDynamic="edgeProps">
      <KnowledgeHubEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
