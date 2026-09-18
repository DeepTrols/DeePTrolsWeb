<script setup lang="ts">
import {
  Activity,
  BatteryCharging,
  Boxes,
  BrainCircuit,
  CalendarClock,
  Cpu,
  Gauge,
  Scale,
  Snowflake,
  Sparkles,
  Sun,
  Thermometer,
  TrendingUp,
  Zap,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import DatacenterSynergyCurveEdge from '~/components/demo/datacenter-synergy/DatacenterSynergyCurveEdge.vue'
import DatacenterSynergyNode from '~/components/demo/datacenter-synergy/DatacenterSynergyNode.vue'

// 算电协同运营「构建算力与能源协同优化的统一运营体系」：核心驱动五输入 → 三段能力 → 四策略扇出拓扑。
// 左列输入 ×5（算力任务负载为核心驱动，amber「核心」角标强调；电力与电价 / 冷却系统 / 储能状态 / 新能源输出），
// 经 统一预测 → 算力与能源协同优化 → 动态策略执行 三段虚线平台，向右扇出协同调度策略 ×4。
// 统一 1704px 画布：节点宽 220+240×3+240=1180，四段连接区各 131；x：0/351/722/1093/1464。
const inputs = [
  { id: 'compute', label: '算力任务负载', icon: Cpu, tone: 'violet', core: true, y: 30 },
  { id: 'power', label: '电力与电价', icon: Zap, tone: 'amber', y: 130 },
  { id: 'cooling', label: '冷却系统', icon: Snowflake, tone: 'cyan', y: 230 },
  { id: 'storage', label: '储能状态', icon: BatteryCharging, tone: 'emerald', y: 330 },
  { id: 'renewable', label: '新能源出力', icon: Sun, tone: 'pink', y: 430 },
] as const

const strategies = [
  { id: 'compute', label: '算力调度策略', sublabel: '任务与功率协同调度', icon: Cpu, tone: 'violet', y: 50 },
  { id: 'cooling', label: '冷却运行策略', sublabel: '冷源动态调节', icon: Snowflake, tone: 'cyan', y: 154 },
  { id: 'storage', label: '储能充放策略', sublabel: '削峰填谷 · 电价套利', icon: BatteryCharging, tone: 'emerald', y: 258 },
  { id: 'renewable', label: '绿电消纳策略', sublabel: '低碳优先调度', icon: Sun, tone: 'amber', y: 362 },
] as const

const nodes: Node[] = [
  ...inputs.map(input => ({
    id: `input-${input.id}`,
    type: 'datacenterSynergy',
    position: { x: 0, y: input.y },
    data: { kind: 'input', label: input.label, icon: input.icon, tone: input.tone, core: 'core' in input ? input.core : false },
    selectable: false,
    draggable: false,
  })),
  {
    id: 'stage-forecast',
    type: 'datacenterSynergy',
    position: { x: 351, y: 110 },
    data: {
      kind: 'stage',
      label: '统一预测',
      items: [
        { label: '算力负载预测', icon: Activity },
        { label: '电价与绿电预测', icon: TrendingUp },
        { label: '冷却负荷预测', icon: Thermometer },
        { label: '储能 SOC 预测', icon: Gauge },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'stage-optimize',
    type: 'datacenterSynergy',
    position: { x: 722, y: 110 },
    data: {
      kind: 'stage',
      label: '算电协同优化',
      items: [
        { label: '成本优化计算', icon: Scale },
        { label: '容量约束建模', icon: Boxes },
        { label: '多目标协同求解', icon: BrainCircuit },
        { label: '策略动态生成', icon: Sparkles },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'stage-execute',
    type: 'datacenterSynergy',
    position: { x: 1093, y: 110 },
    data: {
      kind: 'stage',
      label: '动态策略执行',
      items: [
        { label: '算力任务调度', icon: CalendarClock },
        { label: '冷却设定调整', icon: Snowflake },
        { label: '储能充放控制', icon: BatteryCharging },
        { label: '绿电消纳协同', icon: Sun },
      ],
    },
    selectable: false,
    draggable: false,
  },
  { id: 'pill-intake', type: 'datacenterSynergy', position: { x: 240, y: 242 }, data: { kind: 'pill', label: '资源接入' }, selectable: false, draggable: false },
  { id: 'pill-dispatch', type: 'datacenterSynergy', position: { x: 1354, y: 242 }, data: { kind: 'pill', label: '策略下发' }, selectable: false, draggable: false },
  ...strategies.map(strategy => ({
    id: `strategy-${strategy.id}`,
    type: 'datacenterSynergy',
    position: { x: 1464, y: strategy.y },
    data: { kind: 'strategy', label: strategy.label, sublabel: strategy.sublabel, icon: strategy.icon, tone: strategy.tone },
    selectable: false,
    draggable: false,
  })),
]

const curveDefaults = {
  type: 'datacenterSynergyCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...inputs.map(input => ({ id: `e-input-${input.id}-forecast`, source: `input-${input.id}`, target: 'stage-forecast', ...curveDefaults })),
  { id: 'e-forecast-optimize', source: 'stage-forecast', target: 'stage-optimize', ...curveDefaults },
  { id: 'e-optimize-execute', source: 'stage-optimize', target: 'stage-execute', ...curveDefaults },
  ...strategies.map(strategy => ({ id: `e-execute-strategy-${strategy.id}`, source: 'stage-execute', target: `strategy-${strategy.id}`, data: { outbound: true }, ...curveDefaults })),
]

// 内容纵向跨度 20（核心角标顶 30−10）→ 478（末行输入芯片底），跨度 458；
// 默认 viewport y = 41 对应 580px Demo 容器惯例；页面接入（560px 帧）传 viewport-y=31 即可完整垂直居中（458 < 560，无需缩放）。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 41,
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
    <template #node-datacenterSynergy="{ data }">
      <DatacenterSynergyNode :data="data" />
    </template>
    <template #edge-datacenterSynergyCurve="edgeProps">
      <DatacenterSynergyCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
