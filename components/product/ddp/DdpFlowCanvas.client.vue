<script setup lang="ts">
import { Database, Filter, Table, Table2, Warehouse } from '@lucide/vue'
import { Background } from '@vue-flow/background'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import { onMounted } from 'vue'
import DdpFlowNode from '~/components/product/ddp/DdpFlowNode.vue'

// 原组件节点位置逐字保留：src(0,90) filter(280,90) sinks(560, 0/90/180)
const nodes: Node[] = [
  {
    id: 'src-dwd',
    position: { x: 0, y: 90 },
    data: { title: 'DWD Detail', subtitle: 'dwd_order_detail', tone: 'source', icon: Table2 },
    type: 'flowNode',
  },
  {
    id: 'filter-1',
    position: { x: 280, y: 90 },
    data: { title: 'Data Transform', subtitle: 'join · aggregate', tone: 'filter', icon: Filter },
    type: 'flowNode',
  },
  {
    id: 'sink-dim',
    position: { x: 560, y: 0 },
    data: { title: 'DIM Join', subtitle: 'dim_user_info', tone: 'sink', icon: Table },
    type: 'flowNode',
  },
  {
    id: 'sink-dws',
    position: { x: 560, y: 90 },
    data: { title: 'DWS Summary', subtitle: 'dws_user_order_summary', tone: 'sink', icon: Database },
    type: 'flowNode',
  },
  {
    id: 'sink-ads',
    position: { x: 560, y: 180 },
    data: { title: 'ADS Application', subtitle: 'ads_user_value', tone: 'sink', icon: Warehouse },
    type: 'flowNode',
  },
]

// 原组件边样式：strokeWidth 1.5 + rgba(148, 163, 184, 0.7)
const edgeStyle = { strokeWidth: 1.5, stroke: 'rgba(148, 163, 184, 0.7)' }

const edges: Edge[] = [
  { id: 'e-src-filter', source: 'src-dwd', target: 'filter-1', type: 'default', style: edgeStyle },
  { id: 'e-filter-dim', source: 'filter-1', target: 'sink-dim', type: 'default', style: edgeStyle },
  { id: 'e-filter-dws', source: 'filter-1', target: 'sink-dws', type: 'default', style: edgeStyle },
  { id: 'e-filter-ads', source: 'filter-1', target: 'sink-ads', type: 'default', style: edgeStyle },
]

const { fitView } = useVueFlow()

onMounted(() => {
  setTimeout(() => fitView({ padding: 0.2 }), 100)
})
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :nodes-draggable="false"
    :nodes-connectable="false"
    :elements-selectable="false"
    :zoom-on-scroll="false"
    :zoom-on-pinch="false"
    :pan-on-scroll="false"
    :pan-on-drag="false"
    :zoom-on-double-click="false"
    :prevent-scrolling="true"
    :min-zoom="0.2"
    fit-view-on-init
    :fit-view-options="{ padding: 0.15, maxZoom: 1 }"
    :default-edge-options="{ type: 'default', style: edgeStyle }"
  >
    <template #node-flowNode="{ data }">
      <DdpFlowNode :data="data" />
    </template>
    <Background :gap="20" :size="1" pattern-color="var(--dt-color-line-strong)" />
  </VueFlow>
</template>
