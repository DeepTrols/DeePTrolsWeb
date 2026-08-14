import { Activity, ClipboardList, FileText, MessageCircleQuestion, Siren, Zap } from '@lucide/vue'
import type { Component } from 'vue'

export interface DeviceAgentScene {
  label: string
  icon: Component
  prompt: string
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
