<script setup lang="ts">
import {
  Activity,
  ArrowLeftRight,
  BatteryCharging,
  ChartColumn,
  ChartLine,
  CircleGauge,
  CircuitBoard,
  Cpu,
  Download,
  Gauge,
  PlugZap,
  Siren,
  Sparkles,
  Tags,
  Thermometer,
  TrendingDown,
  TriangleAlert,
  Zap,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import EnergyStorageHubCurveEdge from '~/components/demo/energy-storage-hub/EnergyStorageHubCurveEdge.vue'
import EnergyStorageHubNode from '~/components/demo/energy-storage-hub/EnergyStorageHubNode.vue'

// 智慧储能「储能智能运营能力图」：储能设备 ×5 → 探曜·AI 物联感知 → 数曜·数据治理 → 智能应用 ×3 多段横向流。
// 统一 1704px 画布：节点宽 220+240+240+320=1020，三段连接区 192/192/200，左右边距 0/100；
// x 锚点：源列 0、感知面板 412、治理集群 844、应用卡 1284。
const sources = [
  { id: 'pcs', label: 'PCS 储能变流器', icon: PlugZap, tone: 'violet', y: 30 },
  { id: 'bms', label: 'BMS 电池管理', icon: BatteryCharging, tone: 'blue', y: 130 },
  { id: 'ems', label: 'EMS 能源管理', icon: Gauge, tone: 'emerald', y: 230 },
  { id: 'meter', label: '电表与计量', icon: CircleGauge, tone: 'cyan', y: 330 },
  { id: 'env', label: '温控消防与环境', icon: Thermometer, tone: 'pink', y: 430 },
] as const

const nodes: Node[] = [
  ...sources.map(source => ({
    id: `source-${source.id}`,
    type: 'energyStorageHub',
    position: { x: 0, y: source.y },
    data: { kind: 'source', label: source.label, icon: source.icon, tone: source.tone },
    selectable: false,
    draggable: false,
  })),
  {
    id: 'sense',
    type: 'energyStorageHub',
    position: { x: 412, y: 60 },
    data: {
      kind: 'sense',
      label: '探曜·AI 物联感知',
      items: [
        { label: '设备建模', icon: CircuitBoard },
        { label: '协议解析', icon: ArrowLeftRight },
        { label: '实时采集', icon: Download },
        { label: '边缘协同', icon: Cpu },
        { label: '状态监测', icon: Activity },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'govern',
    type: 'energyStorageHub',
    position: { x: 844, y: 20 },
    data: {
      kind: 'govern',
      label: '数曜·数据治理',
      primary: {
        label: '统一数据模型',
        tags: [
          { label: 'SOC/SOH 指标', icon: ChartColumn },
          { label: '设备编码', icon: Tags },
        ],
      },
      nodes: [{ label: '数据清洗' }, { label: '质量校验' }, { label: '指标管理' }],
      finalNode: { label: '储能数据资产' },
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'app-monitor',
    type: 'energyStorageHub',
    position: { x: 1284, y: 25 },
    data: {
      kind: 'app',
      label: '运行监测与预警',
      items: [
        { label: '实时监测', icon: Activity, colorClass: 'text-[#8B5CF6]' },
        { label: '故障预警', icon: TriangleAlert, colorClass: 'text-[#0EA5E9]' },
        { label: '告警通知', icon: Siren, colorClass: 'text-[#10B981]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'app-health',
    type: 'energyStorageHub',
    position: { x: 1284, y: 195 },
    data: {
      kind: 'app',
      label: '电池健康评估',
      items: [
        { label: 'SOC/SOH 评估', icon: BatteryCharging, colorClass: 'text-[#8B5CF6]' },
        { label: '一致性分析', icon: ChartLine, colorClass: 'text-[#0EA5E9]' },
        { label: '衰减识别', icon: TrendingDown, colorClass: 'text-[#10B981]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'app-strategy',
    type: 'energyStorageHub',
    position: { x: 1284, y: 368 },
    data: {
      kind: 'app',
      label: '充放电策略优化',
      items: [
        { label: '峰谷套利', icon: Zap, colorClass: 'text-[#8B5CF6]' },
        { label: '需量管理', icon: Gauge, colorClass: 'text-[#0EA5E9]' },
        { label: '策略寻优', icon: Sparkles, colorClass: 'text-[#10B981]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
]

const curveDefaults = {
  type: 'energyStorageHubCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...sources.map(source => ({ id: `e-source-${source.id}-sense`, source: `source-${source.id}`, target: 'sense', ...curveDefaults })),
  { id: 'e-sense-govern', source: 'sense', target: 'govern', ...curveDefaults },
  { id: 'e-govern-app-monitor', source: 'govern', target: 'app-monitor', data: { outbound: true }, ...curveDefaults },
  { id: 'e-govern-app-health', source: 'govern', target: 'app-health', data: { outbound: true }, ...curveDefaults },
  { id: 'e-govern-app-strategy', source: 'govern', target: 'app-strategy', data: { outbound: true }, ...curveDefaults },
]

// 内容纵向跨度 20（治理集群顶）→ ~498（末行应用卡底），跨度 ~478；
// 默认 viewport y = 21 对应 560px 帧垂直居中（478 < 560，无需缩放）。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 21,
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
    <template #node-energyStorageHub="{ data }">
      <EnergyStorageHubNode :data="data" />
    </template>
    <template #edge-energyStorageHubCurve="edgeProps">
      <EnergyStorageHubCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
