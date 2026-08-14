import { describe, expect, it } from 'vitest'
import { deviceAgentScenes } from '../data/device-agent'
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
})
