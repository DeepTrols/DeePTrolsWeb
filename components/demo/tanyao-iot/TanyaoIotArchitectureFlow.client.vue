<script setup lang="ts">
import {
  Activity,
  ArrowLeftRight,
  Bot,
  ChartLine,
  ChartPie,
  CircuitBoard,
  Cpu,
  Database,
  Download,
  Factory,
  Gauge,
  LayoutDashboard,
  MonitorCog,
  Network,
  SearchCheck,
  Thermometer,
  TrendingUp,
  TriangleAlert,
  Users,
  Waypoints,
  Workflow,
  Zap,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import TanyaoIotArchitectureCurveEdge from '~/components/demo/tanyao-iot/TanyaoIotArchitectureCurveEdge.vue'
import TanyaoIotArchitectureNode from '~/components/demo/tanyao-iot/TanyaoIotArchitectureNode.vue'
import TanyaoIotArchitectureStepEdge from '~/components/demo/tanyao-iot/TanyaoIotArchitectureStepEdge.vue'

// 1:1 复刻 EMQX 油气行业实时架构图，按统一 1704px 内部画布基准加宽三段连接区：
// 原画布 1240px（连接区 120 / 120 / 80）→ 1704px（连接区 294 / 294 / 196），节点尺寸与纵向坐标保持不变。
const nodes: Node[] = [
  { id: 'device-production', type: 'tanyaoIot', position: { x: 0, y: 11.2 }, data: { kind: 'device', label: '工业设备', tone: 'orange', icons: [CircuitBoard, Cpu, Bot] }, selectable: false, draggable: false },
  { id: 'device-pipeline', type: 'tanyaoIot', position: { x: 0, y: 121.2 }, data: { kind: 'device', label: '传感器与仪表', tone: 'blue', icons: [Thermometer, Gauge, Activity] }, selectable: false, draggable: false },
  { id: 'device-storage', type: 'tanyaoIot', position: { x: 0, y: 384.8 }, data: { kind: 'device', label: '工业系统', tone: 'cyan', icons: [LayoutDashboard, Network, Factory] }, selectable: false, draggable: false },
  {
    id: 'edge',
    type: 'tanyaoIot',
    position: { x: 484, y: 31.2 },
    data: {
      kind: 'edge',
      label: '探曜 Edge',
      items: [
        { label: '实时采集', icon: Download },
        { label: '边缘计算', icon: Cpu },
        { label: '协议转换', icon: ArrowLeftRight },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'platform',
    type: 'tanyaoIot',
    position: { x: 948, y: 20 },
    data: {
      kind: 'cluster',
      label: '探曜 AIoT 平台',
      primary: {
        label: '设备接入',
        tags: [
          { label: '设备模型', icon: Workflow },
          { label: '规则引擎', icon: Database },
        ],
      },
      nodes: [{ label: '设备管理' }, { label: '数据处理' }, { label: '事件中心' }],
      finalNode: { label: '开放服务' },
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'integration-0',
    type: 'tanyaoIot',
    position: { x: 1384, y: 25 },
    data: {
      kind: 'integration',
      label: '智能应用',
      items: [
        { label: '设备运维', icon: MonitorCog, colorClass: 'text-[#8B5CF6]' },
        { label: '能源管理', icon: Zap, colorClass: 'text-[#0EA5E9]' },
        { label: '生产协同', icon: Users, colorClass: 'text-[#10B981]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'integration-1',
    type: 'tanyaoIot',
    position: { x: 1384, y: 195 },
    data: {
      kind: 'integration',
      label: 'AI 智能分析',
      items: [
        { label: '异常检测', icon: TriangleAlert, colorClass: 'text-[#8B5CF6]' },
        { label: '趋势预测', icon: TrendingUp, colorClass: 'text-[#0EA5E9]' },
        { label: '智能诊断', icon: SearchCheck, colorClass: 'text-[#10B981]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'integration-2',
    type: 'tanyaoIot',
    position: { x: 1384, y: 368 },
    data: {
      kind: 'integration',
      label: '数据服务',
      items: [
        { label: '时序数据', icon: ChartLine, colorClass: 'text-[#231F20]' },
        { label: '数据集成', icon: Waypoints, colorClass: 'text-[#FDB515]' },
        { label: 'BI 分析', icon: ChartPie, colorClass: 'text-[#8B5CF6]' },
      ],
    },
    selectable: false,
    draggable: false,
  },
]

const stepDefaults = {
  type: 'tanyaoIotStep',
  animated: true,
  selectable: false,
}

const curveDefaults = {
  type: 'tanyaoIotCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  { id: 'e-device-production-edge', source: 'device-production', target: 'edge', data: { label: 'Modbus\nOPC UA\nBACnet\nCAN\nMQTT', labelAtJunction: true }, ...stepDefaults },
  { id: 'e-device-pipeline-edge', source: 'device-pipeline', target: 'edge', ...stepDefaults },
  { id: 'e-device-storage-platform', source: 'device-storage', target: 'platform', targetHandle: 'left-bottom', data: { label: 'MQTT' }, ...stepDefaults },
  { id: 'e-edge-platform', source: 'edge', target: 'platform', targetHandle: 'left-top', data: { label: 'MQTT' }, ...stepDefaults },
  { id: 'e-platform-integration-0', source: 'platform', target: 'integration-0', ...curveDefaults },
  { id: 'e-platform-integration-1', source: 'platform', target: 'integration-1', ...curveDefaults },
  { id: 'e-platform-integration-2', source: 'platform', target: 'integration-2', ...curveDefaults },
]

const defaultViewport = { x: 0, y: 12, zoom: 1 }
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
    <template #node-tanyaoIot="{ data }">
      <TanyaoIotArchitectureNode :data="data" />
    </template>
    <template #edge-tanyaoIotStep="edgeProps">
      <TanyaoIotArchitectureStepEdge v-bind="edgeProps" />
    </template>
    <template #edge-tanyaoIotCurve="edgeProps">
      <TanyaoIotArchitectureCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
