import { describe, expect, it } from 'vitest'
import {
  deviceAgentRuntimeTabs,
  deviceAgentScenes,
  deviceAgentTraceSteps,
  deviceAgentValueItems,
} from '../data/device-agent'
import { primaryNavigation } from '../data/navigation'

describe('Device Agent product page content contract', () => {
  it('keeps the device-agent navigation entry available', () => {
    const productColumns = primaryNavigation.find((item) => item.label === '产品')?.columns ?? []
    const productLinks = productColumns.flatMap((column) => [
      ...(column.links ?? []),
      ...(column.groups ?? []).flatMap((group) => group.links ?? []),
    ])

    const deviceAgentLink = productLinks.find((link) => link.label === 'Device Agent')

    expect(deviceAgentLink?.href).toBe('/products/device-agent')
    expect(deviceAgentLink?.description).toBe('具备自主执行能力的设备智能体')
  })

  it('defines the six orchestrator scenes in the required order', () => {
    expect(deviceAgentScenes).toHaveLength(6)
    expect(deviceAgentScenes.map((scene) => scene.label)).toEqual([
      '事件预警',
      '事件处置',
      '工单派发',
      '预测维护',
      '周报汇总',
      '智能问数',
    ])
  })

  it('uses the exact scene prompts from the page requirement', () => {
    expect(deviceAgentScenes.map((scene) => scene.prompt)).toEqual([
      '持续监测设备运行状态，当温度超过 85℃ 或振动异常时，立即生成告警并通知相关负责人。',
      '分析当前异常事件，结合历史处置记录生成处置方案，并自动执行可授权的处理动作。',
      '根据告警设备、故障类型和责任区域自动生成维修工单，并派发给对应运维人员。',
      '分析设备历史运行、振动和温度数据，预测未来 7 天故障风险并生成维护计划。',
      '汇总本周设备运行、告警、故障和工单数据，自动生成设备运维周报。',
      '查询本月各区域设备故障率、平均维修时长和工单完成率，并分析异常变化原因。',
    ])
  })

  it('assigns an icon to every scene', () => {
    for (const scene of deviceAgentScenes) {
      expect(scene.icon, scene.label).toBeTruthy()
    }
  })

  it('defines the three core value items with numeric icons', () => {
    expect(deviceAgentValueItems.map((item) => item.iconLabel)).toEqual(['01', '02', '03'])
    expect(deviceAgentValueItems.map((item) => item.title)).toEqual([
      '设备事件无法直接驱动 AI',
      'AI 能判断，但无法形成执行闭环',
      '通用 Agent 难以适配工业场景',
    ])
    for (const item of deviceAgentValueItems) {
      expect(item.description.length, item.title).toBeGreaterThan(0)
    }
  })

  it('defines the six runtime capability tabs in the required order', () => {
    expect(deviceAgentRuntimeTabs.map((tab) => tab.id)).toEqual([
      'events',
      'context',
      'tools',
      'skills',
      'guardrails',
      'trace',
    ])
    expect(deviceAgentRuntimeTabs.map((tab) => tab.label)).toEqual([
      '多源事件触发',
      '设备上下文融合',
      'MCP 工具连接',
      'Skills 按需挂载',
      '安全执行护栏',
      '全链路可观测',
    ])
    for (const tab of deviceAgentRuntimeTabs) {
      expect(tab.icon, tab.label).toBeTruthy()
      expect(tab.panelTitle, tab.label).toBeTruthy()
      expect(tab.panelBadge, tab.label).toBeTruthy()
    }
  })

  it('keeps the ESS-01 trace timeline ordered by timestamp', () => {
    expect(deviceAgentTraceSteps.map((step) => step.kind)).toEqual([
      '事件',
      '上下文',
      '知识检索',
      'Skill',
      '模型推理',
      '工具调用',
      '执行结果',
    ])
    const times = deviceAgentTraceSteps.map((step) => step.time)
    expect(times[0]).toBe('10:24:12.031')
    expect(times[times.length - 1]).toBe('10:24:20.419')
    expect([...times].sort()).toEqual(times)
    for (const step of deviceAgentTraceSteps) {
      expect(step.lines.length, step.kind).toBeGreaterThan(0)
    }
  })
})
