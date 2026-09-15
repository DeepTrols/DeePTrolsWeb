<script setup lang="ts">
import {
  Blocks,
  Brain,
  Building2,
  Cpu,
  Database,
  FileText,
  Folder,
  Grid2X2,
  HardDrive,
  ImageIcon,
  Layers3,
  MessageSquareMore,
  Monitor,
  Network,
  Server,
  Share2,
  ShieldCheck,
  User,
  Users,
  Wrench,
} from '@lucide/vue'
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import AgentOsDemoNode from '~/components/flow/agentos-flow/AgentOsDemoNode.vue'
import AgentOsDynamicEdge from '~/components/flow/agentos-flow/AgentOsDynamicEdge.vue'

const nodes: Node[] = [
  {
    id: 'access',
    type: 'demo',
    position: { x: 420, y: 5 },
    data: {
      kind: 'access',
      badge: '多端接入',
      sizeClass: 'h-[126px] w-[700px]',
      items: [
        { label: '员工', icon: User },
        { label: '业务应用', icon: Blocks },
        { label: '智能助手', icon: MessageSquareMore },
        { label: '企业系统', icon: Monitor },
        { label: '合作伙伴', icon: Users },
      ],
    },
  },
  { id: 'understand', type: 'demo', position: { x: 510, y: 205 }, data: { kind: 'task', title: '理解意图', sizeClass: 'h-[54px] w-[128px]' } },
  { id: 'plan', type: 'demo', position: { x: 500, y: 292 }, data: { kind: 'task', title: '规划任务', sizeClass: 'h-[54px] w-[128px]' } },
  { id: 'tool-call', type: 'demo', position: { x: 915, y: 205 }, data: { kind: 'task', title: '调用工具', sizeClass: 'h-[54px] w-[128px]' } },
  { id: 'execute', type: 'demo', position: { x: 925, y: 292 }, data: { kind: 'task', title: '执行任务', sizeClass: 'h-[54px] w-[128px]' } },
  { id: 'reflect', type: 'demo', position: { x: 1138, y: 262 }, data: { kind: 'task', title: '反思优化', sizeClass: 'h-[54px] w-[130px]' } },
  { id: 'memory', type: 'demo', position: { x: 1138, y: 332 }, data: { kind: 'task', title: '持续记忆', sizeClass: 'h-[54px] w-[130px]' } },
  { id: 'agent', type: 'demo', position: { x: 650, y: 175 }, data: { kind: 'agent', sizeClass: 'h-[205px] w-[280px]' } },
  {
    id: 'platform',
    type: 'demo',
    position: { x: 320, y: 410 },
    data: {
      kind: 'platform',
      subtitle: '企业级智能体运行与治理平台',
      sizeClass: 'h-[184px] w-[850px]',
      items: [
        { label: '上下文管理', icon: Layers3 },
        { label: '记忆管理', icon: Brain },
        { label: '任务规划', icon: Network },
        { label: '工具调用', icon: Wrench },
        { label: '多智能体协作', icon: Users },
        { label: '安全与治理', icon: ShieldCheck },
      ],
    },
  },
  {
    id: 'knowledge',
    type: 'demo',
    position: { x: 18, y: 430 },
    data: { kind: 'side', title: '知识', tone: 'violet', sizeClass: 'h-[154px] w-[170px]', items: [{ label: '知识', icon: FileText }], bullets: ['企业知识库', '文档资料', '业务规则', '经验知识'] },
  },
  {
    id: 'data',
    type: 'demo',
    position: { x: 18, y: 640 },
    data: { kind: 'side', title: '数据', tone: 'cyan', sizeClass: 'h-[172px] w-[170px]', items: [{ label: '数据', icon: Database }], bullets: ['业务数据', '实时数据', '数据仓库', '数据分析'] },
  },
  {
    id: 'tools',
    type: 'demo',
    position: { x: 1340, y: 415 },
    data: { kind: 'side', title: '工具', tone: 'teal', sizeClass: 'h-[190px] w-[170px]', items: [{ label: '工具', icon: Wrench }], bullets: ['企业 API', '第三方工具', '业务系统操作', '自定义技能'] },
  },
  {
    id: 'mcp',
    type: 'demo',
    position: { x: 1340, y: 640 },
    data: { kind: 'side', title: 'MCP', tone: 'violet', sizeClass: 'h-[198px] w-[170px]', items: [{ label: 'MCP', icon: Share2 }], bullets: ['标准协议接入', '快速连接能力', '发现可用工具', '支持多种资源'] },
  },
  {
    id: 'model',
    type: 'demo',
    position: { x: 285, y: 630 },
    data: {
      kind: 'layer',
      badge: '模型服务层',
      sizeClass: 'h-[118px] w-[930px]',
      columns: 5,
      items: [
        { label: '通用大模型', icon: Brain },
        { label: '行业大模型', icon: Cpu },
        { label: '开源模型', icon: Network },
        { label: '多模态模型', icon: ImageIcon },
        { label: '私有化模型', icon: Server },
      ],
    },
  },
  {
    id: 'resource',
    type: 'demo',
    position: { x: 145, y: 790 },
    data: {
      kind: 'layer',
      badge: '企业资源层',
      sizeClass: 'h-[126px] w-[1245px]',
      columns: 9,
      items: [
        { label: 'ERP', subtitle: '企业资源计划', icon: Building2 },
        { label: 'CRM', subtitle: '客户关系管理', icon: Users },
        { label: 'OA', subtitle: '办公协同', icon: Folder },
        { label: 'MES', subtitle: '生产制造执行', icon: Grid2X2 },
        { label: 'IoT', subtitle: '物联网设备', icon: Monitor },
        { label: '数据库', icon: Database },
        { label: '文件系统', icon: FileText },
        { label: '非结构化数据', icon: HardDrive },
        { label: '其他系统', subtitle: '更多业务系统', icon: Blocks },
      ],
    },
  },
]

const edgeBase = {
  type: 'dynamic',
  selectable: false,
  animated: true,
}

const edges: Edge[] = [
  { id: 'access-agent', source: 'access', sourceHandle: 'bottom-source', target: 'agent', targetHandle: 'top-target', data: { tone: 'blue' }, ...edgeBase },
  { id: 'agent-platform', source: 'agent', sourceHandle: 'bottom-source', target: 'platform', targetHandle: 'top-target', data: { tone: 'cyan' }, ...edgeBase },
  { id: 'agent-understand', source: 'agent', sourceHandle: 'left-source', target: 'understand', targetHandle: 'right-target', data: { tone: 'blue' }, ...edgeBase },
  { id: 'understand-plan', source: 'understand', sourceHandle: 'bottom-source', target: 'plan', targetHandle: 'top-target', data: { tone: 'violet' }, ...edgeBase },
  { id: 'agent-tool-call', source: 'agent', sourceHandle: 'right-source', target: 'tool-call', targetHandle: 'left-target', data: { tone: 'blue' }, ...edgeBase },
  { id: 'tool-call-execute', source: 'tool-call', sourceHandle: 'bottom-source', target: 'execute', targetHandle: 'top-target', data: { tone: 'violet' }, ...edgeBase },
  { id: 'reflect-agent', source: 'reflect', sourceHandle: 'left-source', target: 'agent', targetHandle: 'right-target', data: { tone: 'blue' }, ...edgeBase },
  { id: 'memory-platform', source: 'memory', sourceHandle: 'bottom-source', target: 'platform', targetHandle: 'right-target', data: { tone: 'blue' }, ...edgeBase },
  { id: 'knowledge-platform', source: 'knowledge', sourceHandle: 'right-source', target: 'platform', targetHandle: 'left-target', data: { tone: 'violet' }, ...edgeBase },
  { id: 'data-platform', source: 'data', sourceHandle: 'right-source', target: 'platform', targetHandle: 'left-target', data: { tone: 'cyan' }, ...edgeBase },
  { id: 'tools-platform', source: 'tools', sourceHandle: 'left-source', target: 'platform', targetHandle: 'right-target', data: { tone: 'cyan' }, ...edgeBase },
  { id: 'mcp-platform', source: 'mcp', sourceHandle: 'left-source', target: 'platform', targetHandle: 'right-target', data: { tone: 'violet' }, ...edgeBase },
  { id: 'resource-model', source: 'resource', sourceHandle: 'top-source', target: 'model', targetHandle: 'bottom-target', data: { tone: 'blue' }, ...edgeBase },
  { id: 'model-platform', source: 'model', sourceHandle: 'top-source', target: 'platform', targetHandle: 'bottom-target', data: { tone: 'blue' }, ...edgeBase },
]

const proOptions = { hideAttribution: true }
</script>

<template>
  <section
    class="relative h-[930px] w-full overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_50%_29%,rgba(59,130,246,0.78),transparent_31%),radial-gradient(circle_at_14%_56%,rgba(168,85,247,0.56),transparent_22%),radial-gradient(circle_at_89%_56%,rgba(20,184,166,0.5),transparent_24%),linear-gradient(145deg,#020617_0%,#052c78_42%,#07183f_68%,#020617_100%)] p-4"
    aria-label="智曜 AgentOS 架构 Vue Flow demo"
  >
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(125,211,252,0.24),transparent_34%)]"></div>
    <div class="pointer-events-none absolute left-1/2 top-[170px] h-[250px] w-[940px] -translate-x-1/2 rounded-[50%] border border-cyan-300/45 shadow-[0_0_40px_rgba(34,211,238,0.45),inset_0_0_30px_rgba(79,70,229,0.35)]"></div>
    <div class="pointer-events-none absolute left-1/2 top-[230px] h-[150px] w-[650px] -translate-x-1/2 rounded-[50%] border border-fuchsia-400/60 shadow-[0_0_35px_rgba(217,70,239,0.48)]"></div>
    <div class="pointer-events-none absolute left-1/2 top-[575px] h-[118px] w-[930px] -translate-x-1/2 rounded-[30px] bg-blue-950/40 shadow-[0_32px_36px_rgba(15,23,42,0.8)] [clip-path:polygon(4%_0,96%_0,100%_100%,0_100%)]"></div>
    <div class="pointer-events-none absolute left-1/2 top-[748px] h-[126px] w-[1245px] -translate-x-1/2 rounded-[34px] bg-blue-950/35 shadow-[0_34px_40px_rgba(15,23,42,0.88)] [clip-path:polygon(4%_0,96%_0,100%_100%,0_100%)]"></div>

    <VueFlow
      class="relative z-10 h-full w-full"
      :nodes="nodes"
      :edges="edges"
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
      fit-view-on-init
      :fit-view-options="{ padding: 0.03, maxZoom: 1 }"
    >
      <template #node-demo="{ data }">
        <AgentOsDemoNode :data="data" />
      </template>
      <template #edge-dynamic="edgeProps">
        <AgentOsDynamicEdge v-bind="edgeProps" />
      </template>
    </VueFlow>
  </section>
</template>
