<script setup lang="ts">
import {
  BarChart3,
  Cable,
  Database,
  Factory,
  Files,
  LayoutGrid,
  Network,
  Sparkles,
  Workflow,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import FlowMqHowItWorksEdge from '~/components/demo/flowmq/FlowMqHowItWorksEdge.vue'
import FlowMqHowItWorksNode from '~/components/demo/flowmq/FlowMqHowItWorksNode.vue'

const nodes: Node[] = [
  { id: 'client-mqtt', type: 'flowmq', position: { x: 0, y: 57 }, data: { kind: 'client', label: '企业业务数据', subtitle: 'ERP / CRM / 财务数据', icon: Database, sizeClass: 'h-16 w-[220px]' }, selectable: false, draggable: false },
  { id: 'client-kafka', type: 'flowmq', position: { x: 0, y: 145 }, data: { kind: 'client', label: '非结构化数据', subtitle: '文件 / 图像 / 视频', icon: Files, sizeClass: 'h-16 w-[220px]' }, selectable: false, draggable: false },
  { id: 'client-amqp', type: 'flowmq', position: { x: 0, y: 233 }, data: { kind: 'client', label: '生产设备数据', subtitle: 'IoT / 传感器 / 工业协议', icon: Factory, sizeClass: 'h-16 w-[220px]' }, selectable: false, draggable: false },
  { id: 'stage-adapt', type: 'flowmq', position: { x: 340, y: 145 }, data: { kind: 'stage', label: '数据接入', subtitle: '统一连接多源数据', icon: Cable, sizeClass: 'h-[90px] w-[120px]' }, selectable: false, draggable: false },
  { id: 'stage-route', type: 'flowmq', position: { x: 600, y: 145 }, data: { kind: 'stage', label: '智能治理', subtitle: '构建标准化治理体系', icon: Workflow, sizeClass: 'h-[90px] w-[120px]' }, selectable: false, draggable: false },
  { id: 'stage-deliver', type: 'flowmq', position: { x: 860, y: 145 }, data: { kind: 'stage', label: '数据赋能', subtitle: '输出高质量数据资产', icon: Network, sizeClass: 'h-[90px] w-[120px]' }, selectable: false, draggable: false },
  { id: 'target-sub', type: 'flowmq', position: { x: 1100, y: 57 }, data: { kind: 'target', label: 'AI 智能化', subtitle: '知识问答 / 业务大模型', icon: Sparkles, sizeClass: 'h-16 w-[180px]' }, selectable: false, draggable: false },
  { id: 'target-stream', type: 'flowmq', position: { x: 1100, y: 145 }, data: { kind: 'target', label: '业务分析', subtitle: '经营分析 / 决策支持', icon: BarChart3, sizeClass: 'h-16 w-[180px]' }, selectable: false, draggable: false },
  { id: 'target-queue', type: 'flowmq', position: { x: 1100, y: 233 }, data: { kind: 'target', label: '业务应用', subtitle: '场景服务 / API 接口', icon: LayoutGrid, sizeClass: 'h-16 w-[180px]' }, selectable: false, draggable: false },
]

const featureCards = [
  {
    toneClass: 'bg-blue-500',
    toneTextClass: 'text-blue-500',
    items: ['多源接入', '协议适配', '实时 / 离线同步', '统一数据接入'],
  },
  {
    toneClass: 'bg-violet-500',
    toneTextClass: 'text-violet-500',
    items: ['数据标准化', '数据质量管理', '数据血缘与溯源', '数据安全与合规'],
  },
  {
    toneClass: 'bg-emerald-500',
    toneTextClass: 'text-emerald-500',
    items: ['数据服务发布', '数据分析与挖掘', '数据资产管理', '支持 AI 与业务创新'],
  },
]

const edgeDefaults = {
  type: 'flowmqDynamic',
  animated: true,
  selectable: false,
  sourceHandle: 'right-source',
  targetHandle: 'left-target',
}

const edges: Edge[] = [
  { id: 'edge-mqtt-adapt', source: 'client-mqtt', target: 'stage-adapt', data: { path: 'M224,89 C294,89 294,177 364,177' }, ...edgeDefaults },
  { id: 'edge-kafka-adapt', source: 'client-kafka', target: 'stage-adapt', data: { path: 'M224,177 C294,177 294,177 364,177' }, ...edgeDefaults },
  { id: 'edge-amqp-adapt', source: 'client-amqp', target: 'stage-adapt', data: { path: 'M224,265 C294,265 294,177 364,177' }, ...edgeDefaults },
  { id: 'edge-adapt-route', source: 'stage-adapt', target: 'stage-route', data: { path: 'M436,177 C530,177 530,177 624,177' }, ...edgeDefaults },
  { id: 'edge-route-deliver', source: 'stage-route', target: 'stage-deliver', data: { path: 'M696,177 C790,177 790,177 884,177' }, ...edgeDefaults },
  { id: 'edge-deliver-sub', source: 'stage-deliver', target: 'target-sub', data: { path: 'M956,177 C1026,177 1026,89 1096,89' }, ...edgeDefaults },
  { id: 'edge-deliver-stream', source: 'stage-deliver', target: 'target-stream', data: { path: 'M956,177 C1026,177 1026,177 1096,177' }, ...edgeDefaults },
  { id: 'edge-deliver-queue', source: 'stage-deliver', target: 'target-queue', data: { path: 'M956,177 C1026,177 1026,265 1096,265' }, ...edgeDefaults },
]

const defaultViewport = { x: 211, y: 13, zoom: 1 }
const proOptions = { hideAttribution: true }
</script>

<template>
  <div class="relative size-full">
    <VueFlow
      class="relative size-full"
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
      <template #node-flowmq="{ data }">
        <FlowMqHowItWorksNode :data="data" />
      </template>
      <template #edge-flowmqDynamic="edgeProps">
        <FlowMqHowItWorksEdge v-bind="edgeProps" />
      </template>
    </VueFlow>

    <div class="pointer-events-none absolute left-[511px] top-[292px] grid grid-cols-3 gap-[60px]">
      <div
        v-for="card in featureCards"
        :key="card.items[0]"
        class="relative w-[200px] rounded-lg border border-dt-line bg-white px-5 py-4 shadow-[0_8px_20px_rgba(26,87,235,0.05)]"
      >
        <svg :class="['absolute left-[19px] top-[26px] h-[90px] w-2 overflow-visible', card.toneTextClass]" viewBox="0 0 8 90" aria-hidden="true">
          <line x1="4" y1="0" x2="4" y2="90" stroke="currentColor" stroke-width="1" stroke-opacity="0.18" stroke-linecap="round" />
          <line x1="4" y1="0" x2="4" y2="90" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 10" stroke-linecap="round">
            <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.4s" repeatCount="indefinite" />
          </line>
        </svg>
        <ul class="space-y-2.5">
          <li v-for="item in card.items" :key="item" class="flex items-center gap-2.5 text-sm leading-5 text-dt-text-muted">
            <span :class="['size-1.5 shrink-0 rounded-full', card.toneClass]" aria-hidden="true"></span>
            <span class="whitespace-nowrap">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
