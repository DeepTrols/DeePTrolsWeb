<script setup lang="ts">
import {
  BookOpen,
  BrainCircuit,
  ClipboardList,
  Cpu,
  GraduationCap,
  LifeBuoy,
  Plug,
  Presentation,
  School,
  ShieldCheck,
  ToyBrick,
  Workflow,
  Wrench,
} from '@lucide/vue'
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import zhiyaoLogo from '~/assets/images/brand/zhiyao-logo.svg'
import EducationAgentBaseCurveEdge from '~/components/demo/education-agent-base/EducationAgentBaseCurveEdge.vue'
import EducationAgentBaseNode from '~/components/demo/education-agent-base/EducationAgentBaseNode.vue'

// 智慧教育解决方案「构建面向教育业务的 AI 智能体运行底座」：三列中枢辐射拓扑。
// 左列资源 ×5（大模型/知识/MCP/Tools/校园业务系统）扇入 智曜·统一接入 网关面板，
// 网关汇入中央 智曜·Agent Runtime 运行底座（2×2 象限：模型调用/任务编排/工具执行/运行治理），
// 底座向右扇出「教、学、管、服」教育智能体 ×4，AI 从回答问题走向理解任务、调用工具和完成业务。
// 统一 1704px 画布：节点宽 220+240+400+268=1128，三段连接区各 192；x：0/412/844/1436。
const resources = [
  { id: 'llm', label: '大模型服务', icon: BrainCircuit, tone: 'violet', y: 30 },
  { id: 'knowledge', label: '教育知识库', icon: BookOpen, tone: 'blue', y: 130 },
  { id: 'mcp', label: 'MCP 服务', icon: Plug, tone: 'emerald', y: 230 },
  { id: 'tools', label: 'Tools 工具集', icon: Wrench, tone: 'cyan', y: 330 },
  { id: 'campus', label: '校园业务系统', icon: School, tone: 'pink', y: 430 },
] as const

const agents = [
  { id: 'teach', label: 'AI 教师助手', badge: '教', sublabel: '智能备课 · 教学辅助', icon: Presentation, tone: 'violet', y: 50 },
  { id: 'learn', label: 'AI 学习助手', badge: '学', sublabel: '个性化学习陪伴', icon: GraduationCap, tone: 'blue', y: 156 },
  { id: 'admin', label: 'AI 教务助手', badge: '管', sublabel: '教务协同 · 数据洞察', icon: ClipboardList, tone: 'emerald', y: 262 },
  { id: 'service', label: 'AI 校园服务助手', badge: '服', sublabel: '统一校园服务入口', icon: LifeBuoy, tone: 'pink', y: 368 },
] as const

const nodes: Node[] = [
  ...resources.map(resource => ({
    id: `resource-${resource.id}`,
    type: 'educationAgentBase',
    position: { x: 0, y: resource.y },
    data: { kind: 'resource', label: resource.label, icon: resource.icon, tone: resource.tone },
    selectable: false,
    draggable: false,
  })),
  {
    id: 'gateway',
    type: 'educationAgentBase',
    position: { x: 412, y: 60 },
    data: {
      kind: 'gateway',
      label: '智曜 · 统一接入',
      logo: zhiyaoLogo,
      items: [
        { label: '模型统一接入', icon: Cpu },
        { label: '知识关联接入', icon: BookOpen },
        { label: 'MCP 协议接入', icon: Plug },
        { label: '工具注册接入', icon: Wrench },
        { label: '系统能力封装', icon: School },
      ],
    },
    selectable: false,
    draggable: false,
  },
  {
    id: 'runtime',
    type: 'educationAgentBase',
    position: { x: 844, y: 90 },
    data: {
      kind: 'runtime',
      label: '智曜 · Agent Runtime',
      logo: zhiyaoLogo,
      caption: '理解任务 · 调用工具 · 完成业务',
      quadrants: [
        { label: '模型调用', caption: '多模型统一调度', icon: Cpu },
        { label: '任务编排', caption: '理解 · 规划 · 拆解', icon: Workflow },
        { label: '工具执行', caption: 'MCP · Tools · API', icon: ToyBrick },
        { label: '运行治理', caption: '权限 · 监控 · 审计', icon: ShieldCheck },
      ],
    },
    selectable: false,
    draggable: false,
  },
  { id: 'stage-connect', type: 'educationAgentBase', position: { x: 272, y: 242 }, data: { kind: 'stage', label: '统一连接' }, selectable: false, draggable: false },
  { id: 'stage-runtime', type: 'educationAgentBase', position: { x: 708, y: 242 }, data: { kind: 'stage', label: '运行底座' }, selectable: false, draggable: false },
  { id: 'stage-agents', type: 'educationAgentBase', position: { x: 1290, y: 242 }, data: { kind: 'stage', label: '教 · 学 · 管 · 服' }, selectable: false, draggable: false },
  ...agents.map(agent => ({
    id: `agent-${agent.id}`,
    type: 'educationAgentBase',
    position: { x: 1436, y: agent.y },
    data: { kind: 'agent', label: agent.label, badge: agent.badge, sublabel: agent.sublabel, icon: agent.icon, tone: agent.tone },
    selectable: false,
    draggable: false,
  })),
]

const curveDefaults = {
  type: 'educationAgentBaseCurve',
  animated: true,
  selectable: false,
}

const edges: Edge[] = [
  ...resources.map(resource => ({ id: `e-resource-${resource.id}-gateway`, source: `resource-${resource.id}`, target: 'gateway', ...curveDefaults })),
  { id: 'e-gateway-runtime', source: 'gateway', target: 'runtime', ...curveDefaults },
  ...agents.map(agent => ({ id: `e-runtime-agent-${agent.id}`, source: 'runtime', target: `agent-${agent.id}`, data: { outbound: true }, ...curveDefaults })),
]

// 内容纵向跨度 30（资源首行顶）→ 488（网关虚线叠层底 480+8），跨度 458；
// 默认 viewport y = 31 对应 580px Demo 容器惯例；页面接入（560px 帧）传 viewport-y=21 即可完整垂直居中（458 < 560，无需缩放）。
const props = withDefaults(
  defineProps<{
    viewportY?: number
    zoom?: number
  }>(),
  {
    viewportY: 31,
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
    <template #node-educationAgentBase="{ data }">
      <EducationAgentBaseNode :data="data" />
    </template>
    <template #edge-educationAgentBaseCurve="edgeProps">
      <EducationAgentBaseCurveEdge v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>
