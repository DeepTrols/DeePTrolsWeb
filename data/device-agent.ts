import {
  Activity,
  ClipboardList,
  FileText,
  Layers,
  MessageCircleQuestion,
  Plug,
  Puzzle,
  Radio,
  ShieldCheck,
  Siren,
  Zap,
} from '@lucide/vue'
import type { Component } from 'vue'

export interface DeviceAgentScene {
  label: string
  icon: Component
  prompt: string
}

export interface DeviceAgentValueItem {
  iconLabel: string
  title: string
  description: string
}

export interface DeviceAgentRuntimeTab {
  id: 'events' | 'context' | 'tools' | 'skills' | 'guardrails' | 'trace'
  label: string
  icon: Component
  panelTitle: string
  panelBadge: string
}

export interface DeviceAgentTraceStep {
  time: string
  kind: string
  lines: string[]
}

export const deviceAgentScenes: DeviceAgentScene[] = [
  {
    label: '事件预警',
    icon: Siren,
    prompt: '持续监测设备运行状态，当温度超过 85℃ 或振动异常时，立即生成告警并通知相关负责人。',
  },
  {
    label: '事件处置',
    icon: Zap,
    prompt: '分析当前异常事件，结合历史处置记录生成处置方案，并自动执行可授权的处理动作。',
  },
  {
    label: '工单派发',
    icon: ClipboardList,
    prompt: '根据告警设备、故障类型和责任区域自动生成维修工单，并派发给对应运维人员。',
  },
  {
    label: '预测维护',
    icon: Activity,
    prompt: '分析设备历史运行、振动和温度数据，预测未来 7 天故障风险并生成维护计划。',
  },
  {
    label: '周报汇总',
    icon: FileText,
    prompt: '汇总本周设备运行、告警、故障和工单数据，自动生成设备运维周报。',
  },
  {
    label: '智能问数',
    icon: MessageCircleQuestion,
    prompt: '查询本月各区域设备故障率、平均维修时长和工单完成率，并分析异常变化原因。',
  },
]

export const deviceAgentValueItems: DeviceAgentValueItem[] = [
  {
    iconLabel: '01',
    title: '设备事件无法直接驱动 AI',
    description:
      '传统 Agent 依赖 API 调用或人工发起任务，难以感知持续产生的设备事件。Device Agent 以 MQTT 消息原生触发，在消息流中完成过滤、去抖与聚合，只让真正需要判断的事件进入 Agent。',
  },
  {
    iconLabel: '02',
    title: 'AI 能判断，但无法形成执行闭环',
    description:
      '传统 AI 往往停留在分析和建议阶段，与设备状态、历史数据和控制链路割裂。Device Agent 打通数据读取、状态感知、智能决策与设备控制，让 Agent 从“回答问题”走向“执行任务”。',
  },
  {
    iconLabel: '03',
    title: '通用 Agent 难以适配工业场景',
    description:
      '工业任务涉及设备协议、运行状态、控制规则和安全边界，单靠 Prompt 很难可靠落地。Device Agent 内置工业 Skills 与场景模板，让告警处置、预测性维护、OTA、设备巡检等任务快速形成可执行的 Agent 工作流。',
  },
]

export const deviceAgentRuntimeTabs: DeviceAgentRuntimeTab[] = [
  {
    id: 'events',
    label: '多源事件触发',
    icon: Radio,
    panelTitle: '事件触发器',
    panelBadge: '监听中',
  },
  {
    id: 'context',
    label: '设备上下文融合',
    icon: Layers,
    panelTitle: '设备上下文引擎',
    panelBadge: '实时构建',
  },
  {
    id: 'tools',
    label: 'MCP 工具连接',
    icon: Plug,
    panelTitle: 'MCP 工具连接',
    panelBadge: '6 个可用',
  },
  {
    id: 'skills',
    label: 'Skills 按需挂载',
    icon: Puzzle,
    panelTitle: 'Skills',
    panelBadge: '按需加载',
  },
  {
    id: 'guardrails',
    label: '安全执行护栏',
    icon: ShieldCheck,
    panelTitle: '安全执行',
    panelBadge: '护栏已启用',
  },
  {
    id: 'trace',
    label: '全链路可观测',
    icon: Activity,
    panelTitle: '运行 Trace',
    panelBadge: '采集中',
  },
]

export const deviceAgentTraceSteps: DeviceAgentTraceStep[] = [
  {
    time: '10:24:12.031',
    kind: '事件',
    lines: ['ESS-01', '最高电芯温度 > 55°C'],
  },
  {
    time: '10:24:12.084',
    kind: '上下文',
    lines: ['查询近 7 天温度与充放电历史'],
  },
  {
    time: '10:24:12.426',
    kind: '知识检索',
    lines: ['匹配储能系统运维文档', '3 篇'],
  },
  {
    time: '10:24:13.102',
    kind: 'Skill',
    lines: ['热异常诊断'],
  },
  {
    time: '10:24:15.337',
    kind: '模型推理',
    lines: ['分析电芯异常温升原因与运行风险'],
  },
  {
    time: '10:24:17.842',
    kind: '工具调用',
    lines: ['workorder.create'],
  },
  {
    time: '10:24:20.419',
    kind: '执行结果',
    lines: ['储能运维工单', 'WO-20260814-018', '创建成功'],
  },
]
