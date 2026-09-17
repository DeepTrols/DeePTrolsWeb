<script setup lang="ts">
import {
  BadgeCent,
  BookOpenText,
  ChartNoAxesCombined,
  CircleUserRound,
  Database,
  FileInput,
  ScanSearch,
  Tags,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import TagPlatformArchitectureEdge from '~/components/demo/tag-platform/TagPlatformArchitectureEdge.vue'
import TagPlatformArchitectureNode from '~/components/demo/tag-platform/TagPlatformArchitectureNode.vue'

const nodes: Node[] = [
  { id: 'business', type: 'tagPlatform', position: { x: 30, y: 120 }, data: { kind: 'source', label: '业务数据', icon: Database, tone: 'violet' }, selectable: false, draggable: false },
  { id: 'user', type: 'tagPlatform', position: { x: 30, y: 204 }, data: { kind: 'source', label: '用户数据', icon: CircleUserRound, tone: 'blue' }, selectable: false, draggable: false },
  { id: 'behavior', type: 'tagPlatform', position: { x: 30, y: 288 }, data: { kind: 'source', label: '行为数据', icon: ChartNoAxesCombined, tone: 'amber' }, selectable: false, draggable: false },
  { id: 'transaction', type: 'tagPlatform', position: { x: 30, y: 372 }, data: { kind: 'source', label: '交易数据', icon: BadgeCent, tone: 'emerald' }, selectable: false, draggable: false },
  { id: 'external', type: 'tagPlatform', position: { x: 30, y: 456 }, data: { kind: 'source', label: '外部数据', icon: FileInput, tone: 'pink' }, selectable: false, draggable: false },
  {
    id: 'processing',
    type: 'tagPlatform',
    position: { x: 290, y: 255 },
    width: 270,
    data: {
      kind: 'process',
      label: '标签加工',
      layer: '加工层',
      description: '统一数据口径，完成标签定义、计算与生成。',
      features: ['标签定义', '规则计算', '智能打标'],
      icon: ScanSearch,
      tone: 'blue',
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'governance',
    type: 'tagPlatform',
    position: { x: 615, y: 255 },
    width: 280,
    data: {
      kind: 'process',
      label: '标签治理',
      layer: '治理层',
      description: '统一管理标签体系、质量与生命周期。',
      features: ['标签分类', '质量管理', '版本管理'],
      icon: BookOpenText,
      tone: 'primary',
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'asset-center',
    type: 'tagPlatform',
    position: { x: 955, y: 238 },
    width: 300,
    data: {
      kind: 'asset',
      label: '数曜 · 数据标签平台',
      layer: '标签资产中心',
      description: '沉淀统一、可信、可复用的企业标签资产。',
      features: ['统一标签目录', '标签查询与服务', '业务与 AI 应用'],
      icon: Tags,
    },
    selectable: false,
    draggable: false,
  },
]

const edgeDefaults = {
  type: 'tagPlatformDynamic',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  { id: 'business-processing', source: 'business', target: 'processing', ...edgeDefaults },
  { id: 'user-processing', source: 'user', target: 'processing', ...edgeDefaults },
  { id: 'behavior-processing', source: 'behavior', target: 'processing', ...edgeDefaults },
  { id: 'transaction-processing', source: 'transaction', target: 'processing', ...edgeDefaults },
  { id: 'external-processing', source: 'external', target: 'processing', ...edgeDefaults },
  { id: 'processing-governance', source: 'processing', target: 'governance', ...edgeDefaults },
  { id: 'governance-assets', source: 'governance', target: 'asset-center', ...edgeDefaults },
]

const defaultViewport = { x: 172.5, y: 3, zoom: 1 }
const proOptions = { hideAttribution: true }
</script>

<template>
  <div class="absolute inset-0 z-10 translate-y-8">
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
      <template #node-tagPlatform="{ data }">
        <TagPlatformArchitectureNode :data="data" />
      </template>
      <template #edge-tagPlatformDynamic="edgeProps">
        <TagPlatformArchitectureEdge v-bind="edgeProps" />
      </template>
    </VueFlow>
  </div>
</template>
