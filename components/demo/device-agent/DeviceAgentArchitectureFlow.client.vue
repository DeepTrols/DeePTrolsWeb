<script setup lang="ts">
import { computed } from 'vue'
import {
  Briefcase,
  Building2,
  CloudUpload,
  Cpu,
  Database,
  Download,
  Factory,
  LayoutDashboard,
  MonitorCog,
  Radio,
  RadioTower,
  Server,
  Waypoints,
  Zap,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import DeviceAgentArchitectureCurveEdge from '~/components/demo/device-agent/DeviceAgentArchitectureCurveEdge.vue'
import DeviceAgentArchitectureNode from '~/components/demo/device-agent/DeviceAgentArchitectureNode.vue'
import DeviceAgentArchitectureStepEdge from '~/components/demo/device-agent/DeviceAgentArchitectureStepEdge.vue'
import KafkaIcon from '~/components/demo/device-agent/KafkaIcon.vue'
import TimescaleIcon from '~/components/demo/device-agent/TimescaleIcon.vue'
import boyaoLogo from '~/assets/images/brand/boyao-logo.svg'
import shuyaoLogo from '~/assets/images/brand/shuyao-logo.svg'
import zhiyaoLogo from '~/assets/images/brand/zhiyao-logo.svg'

// 1:1 复刻 EMQX 边缘计算方案架构图（仅替换文字与图标），按统一 1704px 内部画布基准加宽三段连接区：
// 原画布 1170px（连接区 90 / 150 / 70）→ 1704px（连接区 245 / 408 / 191），节点尺寸与纵向坐标保持不变。
const nodes: Node[] = [
  { id: 'device-realtime', type: 'deviceAgent', position: { x: 0, y: -22 }, data: { kind: 'device', label: '实时数据', tone: 'violet', icon: Cpu }, selectable: false, draggable: false },
  { id: 'device-event', type: 'deviceAgent', position: { x: 0, y: 46 }, data: { kind: 'device', label: '设备事件', tone: 'blue', icon: Server }, selectable: false, draggable: false },
  { id: 'device-alarm', type: 'deviceAgent', position: { x: 0, y: 114 }, data: { kind: 'device', label: '告警事件', tone: 'pink', icon: Building2 }, selectable: false, draggable: false },
  { id: 'device-business', type: 'deviceAgent', position: { x: 0, y: 182 }, data: { kind: 'device', label: '业务事件', tone: 'emerald', icon: Zap }, selectable: false, draggable: false },
  { id: 'device-command', type: 'deviceAgent', position: { x: 0, y: 250 }, data: { kind: 'device', label: '用户指令', tone: 'cyan', icon: Radio }, selectable: false, draggable: false },
  {
    id: 'context',
    type: 'deviceAgent',
    position: { x: 375, y: 21 },
    data: {
      kind: 'context',
      label: 'Device Context',
      items: [
        { label: '设备模型', icon: Download },
        { label: '实时状态', icon: Cpu },
        { label: '设备能力', icon: RadioTower },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'execution',
    type: 'deviceAgent',
    position: { x: 375, y: 335 },
    data: {
      kind: 'execution',
      label: 'Device Execution',
      items: [
        { label: '指令下发', icon: Radio },
        { label: '本地执行', icon: Cpu },
        { label: '结果反馈', icon: CloudUpload },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'cluster',
    type: 'deviceAgent',
    position: { x: 953, y: 30 },
    data: {
      kind: 'cluster',
      label: 'Device Agent Runtime',
      primary: {
        label: '事件感知',
        tags: [
          { label: '事件订阅', icon: Waypoints },
          { label: '上下文构建', icon: Database },
        ],
      },
      nodes: [{ label: '记忆管理' }, { label: '智能决策' }, { label: '行动执行' }],
      finalNode: { label: 'Skills & Tools' },
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'integration-0',
    type: 'deviceAgent',
    position: { x: 1384, y: 35 },
    data: {
      kind: 'integration',
      label: 'Agent 应用',
      items: [
        { label: '自动预警', icon: Factory, colorClass: 'text-[#8B5CF6]' },
        { label: '事件处置', icon: MonitorCog, colorClass: 'text-[#0EA5E9]' },
        { label: '工单派发', icon: Briefcase, colorClass: 'text-[#10B981]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'integration-1',
    type: 'deviceAgent',
    position: { x: 1384, y: 205 },
    data: {
      kind: 'integration',
      label: '基础设施',
      items: [
        { label: '数曜', icon: shuyaoLogo },
        { label: '博曜', icon: boyaoLogo },
        { label: '智曜', icon: zhiyaoLogo },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'integration-2',
    type: 'deviceAgent',
    position: { x: 1384, y: 375 },
    data: {
      kind: 'integration',
      label: 'Skills & Tools',
      items: [
        { label: '设备控制', icon: KafkaIcon, colorClass: 'text-[#231F20] dark:text-[#E8E8E8]' },
        { label: '工单执行', icon: TimescaleIcon, colorClass: 'text-[#FDB515]' },
        { label: 'API 调用', icon: LayoutDashboard, colorClass: 'text-[#8B5CF6]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
]

const curveDefaults = {
  type: 'deviceAgentCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  { id: 'e-device-realtime-context', source: 'device-realtime', target: 'context', ...curveDefaults },
  { id: 'e-device-event-context', source: 'device-event', target: 'context', ...curveDefaults },
  { id: 'e-device-alarm-context', source: 'device-alarm', target: 'context', ...curveDefaults },
  { id: 'e-device-business-context', source: 'device-business', target: 'context', ...curveDefaults },
  { id: 'e-device-command-context', source: 'device-command', target: 'context', ...curveDefaults },
  { id: 'e-context-execution', source: 'context', sourceHandle: 'bottom', target: 'execution', type: 'deviceAgentStep', animated: true, selectable: false },
  { id: 'e-context-cluster', source: 'context', sourceHandle: 'right', target: 'cluster', targetHandle: 'left-top', ...curveDefaults },
  { id: 'e-execution-cluster', source: 'execution', target: 'cluster', targetHandle: 'left-bottom', ...curveDefaults },
  { id: 'e-cluster-integration-0', source: 'cluster', target: 'integration-0', data: { outbound: true }, ...curveDefaults },
  { id: 'e-cluster-integration-1', source: 'cluster', target: 'integration-1', data: { outbound: true }, ...curveDefaults },
  { id: 'e-cluster-integration-2', source: 'cluster', target: 'integration-2', data: { outbound: true }, ...curveDefaults },
]

// 内容纵向跨度 -22 → 543（最低点为 Device Execution 底部 335+200=535，再加虚线叠层 8px 偏移），
// 默认 viewport y = 29.5 使其在 580px Demo 容器中垂直居中；
// 页面接入（560px 帧）时通过 viewport-y / zoom 覆盖（0.98 缩放 + y=24.7 可使 565px 跨度完整居中显示）。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 29.5,
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
    <template #node-deviceAgent="{ data }">
      <DeviceAgentArchitectureNode :data="data" />
    </template>
    <template #edge-deviceAgentStep="edgeProps">
      <DeviceAgentArchitectureStepEdge v-bind="edgeProps" />
    </template>
    <template #edge-deviceAgentCurve="edgeProps">
      <DeviceAgentArchitectureCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
