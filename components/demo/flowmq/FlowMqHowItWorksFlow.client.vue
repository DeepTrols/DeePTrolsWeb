<script setup lang="ts">
import {
  Archive,
  Cable,
  GitFork,
  Inbox,
  List,
  Mail,
  Radio,
  Route,
  Send,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import FlowMqHowItWorksEdge from '~/components/demo/flowmq/FlowMqHowItWorksEdge.vue'
import FlowMqHowItWorksNode from '~/components/demo/flowmq/FlowMqHowItWorksNode.vue'

const nodes: Node[] = [
  { id: 'client-mqtt', type: 'flowmq', position: { x: 0, y: 57 }, data: { kind: 'client', label: 'MQTT Client', icon: Radio, sizeClass: 'h-16 w-[220px]' }, selectable: false, draggable: false },
  { id: 'client-kafka', type: 'flowmq', position: { x: 0, y: 145 }, data: { kind: 'client', label: 'Kafka Producer', icon: Archive, sizeClass: 'h-16 w-[220px]' }, selectable: false, draggable: false },
  { id: 'client-amqp', type: 'flowmq', position: { x: 0, y: 233 }, data: { kind: 'client', label: 'AMQP Publisher', icon: Mail, sizeClass: 'h-16 w-[220px]' }, selectable: false, draggable: false },
  { id: 'stage-adapt', type: 'flowmq', position: { x: 260, y: 145 }, data: { kind: 'stage', label: '协议接入', subtitle: 'Protocol Adapter', icon: Cable, sizeClass: 'h-[90px] w-[120px]' }, selectable: false, draggable: false },
  { id: 'stage-route', type: 'flowmq', position: { x: 480, y: 145 }, data: { kind: 'stage', label: '统一路由', subtitle: 'Unified Router', icon: Route, sizeClass: 'h-[90px] w-[120px]' }, selectable: false, draggable: false },
  { id: 'stage-deliver', type: 'flowmq', position: { x: 700, y: 145 }, data: { kind: 'stage', label: '多模投递', subtitle: 'Multi-mode Delivery', icon: GitFork, sizeClass: 'h-[90px] w-[120px]' }, selectable: false, draggable: false },
  { id: 'target-sub', type: 'flowmq', position: { x: 900, y: 57 }, data: { kind: 'target', label: 'Subscription', subtitle: '实时推送', icon: Send, sizeClass: 'h-16 w-[180px]' }, selectable: false, draggable: false },
  { id: 'target-stream', type: 'flowmq', position: { x: 900, y: 145 }, data: { kind: 'target', label: 'Stream', subtitle: '日志持久化', icon: List, sizeClass: 'h-16 w-[180px]' }, selectable: false, draggable: false },
  { id: 'target-queue', type: 'flowmq', position: { x: 900, y: 233 }, data: { kind: 'target', label: 'Queue', subtitle: '消息队列', icon: Inbox, sizeClass: 'h-16 w-[180px]' }, selectable: false, draggable: false },
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
</template>
