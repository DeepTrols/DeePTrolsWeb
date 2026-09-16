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
  { id: 'stage-adapt', type: 'flowmq', position: { x: 260, y: 145 }, data: { kind: 'stage', label: '数据接入', subtitle: '统一连接多源数据', icon: Cable, sizeClass: 'h-[90px] w-[120px]' }, selectable: false, draggable: false },
  { id: 'stage-route', type: 'flowmq', position: { x: 480, y: 145 }, data: { kind: 'stage', label: '智能治理', subtitle: '构建标准化治理体系', icon: Workflow, sizeClass: 'h-[90px] w-[120px]' }, selectable: false, draggable: false },
  { id: 'stage-deliver', type: 'flowmq', position: { x: 700, y: 145 }, data: { kind: 'stage', label: '数据赋能', subtitle: '输出高质量数据资产', icon: Network, sizeClass: 'h-[90px] w-[120px]' }, selectable: false, draggable: false },
  { id: 'target-sub', type: 'flowmq', position: { x: 900, y: 57 }, data: { kind: 'target', label: 'AI 智能化', subtitle: '知识问答 / 业务大模型', icon: Sparkles, sizeClass: 'h-16 w-[180px]' }, selectable: false, draggable: false },
  { id: 'target-stream', type: 'flowmq', position: { x: 900, y: 145 }, data: { kind: 'target', label: '业务分析', subtitle: '经营分析 / 决策支持', icon: BarChart3, sizeClass: 'h-16 w-[180px]' }, selectable: false, draggable: false },
  { id: 'target-queue', type: 'flowmq', position: { x: 900, y: 233 }, data: { kind: 'target', label: '业务应用', subtitle: '场景服务 / API 接口', icon: LayoutGrid, sizeClass: 'h-16 w-[180px]' }, selectable: false, draggable: false },
]

const featureCards = [
  {
    toneClass: 'bg-blue-500',
    items: ['多源接入', '协议适配', '实时 / 离线同步', '统一数据接入'],
  },
  {
    toneClass: 'bg-violet-500',
    items: ['数据标准化', '数据质量管理', '数据血缘与溯源', '数据安全与合规'],
  },
  {
    toneClass: 'bg-emerald-500',
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
  { id: 'edge-mqtt-adapt', source: 'client-mqtt', target: 'stage-adapt', data: { path: 'M224,89 C254,89 254,177 284,177' }, ...edgeDefaults },
  { id: 'edge-kafka-adapt', source: 'client-kafka', target: 'stage-adapt', data: { path: 'M224,177 C254,177 254,177 284,177' }, ...edgeDefaults },
  { id: 'edge-amqp-adapt', source: 'client-amqp', target: 'stage-adapt', data: { path: 'M224,265 C254,265 254,177 284,177' }, ...edgeDefaults },
  { id: 'edge-adapt-route', source: 'stage-adapt', target: 'stage-route', data: { path: 'M356,177 C430,177 430,177 504,177' }, ...edgeDefaults },
  { id: 'edge-route-deliver', source: 'stage-route', target: 'stage-deliver', data: { path: 'M576,177 C650,177 650,177 724,177' }, ...edgeDefaults },
  { id: 'edge-deliver-sub', source: 'stage-deliver', target: 'target-sub', data: { path: 'M796,177 C846,177 846,89 896,89' }, ...edgeDefaults },
  { id: 'edge-deliver-stream', source: 'stage-deliver', target: 'target-stream', data: { path: 'M796,177 C846,177 846,177 896,177' }, ...edgeDefaults },
  { id: 'edge-deliver-queue', source: 'stage-deliver', target: 'target-queue', data: { path: 'M796,177 C846,177 846,265 896,265' }, ...edgeDefaults },
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

    <div class="pointer-events-none absolute left-[431px] top-[292px] grid grid-cols-3 gap-10">
      <div
        v-for="card in featureCards"
        :key="card.items[0]"
        class="w-[200px] rounded-lg border border-dt-line bg-white px-5 py-4 shadow-[0_8px_20px_rgba(26,87,235,0.05)]"
      >
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
