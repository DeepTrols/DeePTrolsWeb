import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { primaryNavigation } from '../data/navigation'
import {
  tanyaoAgents,
  tanyaoChallenges,
  tanyaoCtaActions,
  tanyaoHeroStats,
  tanyaoSolutionCards,
  tanyaoTimelineItems,
} from '../data/tanyao'

const root = process.cwd()

describe('TANYAO product page content contract', () => {
  it('keeps the ai-iot navigation entry available', () => {
    const productColumns = primaryNavigation.find((item) => item.label === '产品')?.columns ?? []
    const productLinks = productColumns.flatMap((column) => [
      ...(column.links ?? []),
      ...(column.groups ?? []).flatMap((group) => group.links ?? []),
    ])

    const tanyaoLink = productLinks.find((link) => link.label === '探曜·AI物联感知平台')

    expect(tanyaoLink?.href).toBe('/products/ai-iot')
    expect(tanyaoLink?.description).toBe('实现设备、数据与智能应用互联')
  })

  it('uses the exact TANYAO hero stats from the page requirement', () => {
    expect(tanyaoHeroStats).toHaveLength(4)
    expect(tanyaoHeroStats.map((stat) => stat.value)).toEqual(['100+', '30+', '100+', '百万TPS'])
    expect(tanyaoHeroStats.map((stat) => stat.label)).toEqual(['服务企业', '工业协议支持', '标准物模型', '处理能力'])
  })

  it('lists the four IoT platform challenges', () => {
    expect(tanyaoChallenges).toHaveLength(4)
    expect(tanyaoChallenges.map((item) => item.title)).toEqual([
      '设备种类多、协议复杂',
      '数据有了，但价值释放不出来',
      'AI 想做事，却进不了现场运行',
      '平台能连，却难以持续演进',
    ])
  })

  it('defines the three solution stage cards', () => {
    expect(tanyaoSolutionCards).toHaveLength(3)
    expect(tanyaoSolutionCards.map((card) => card.title)).toEqual(['多源接入', '边缘感知', 'AI 驱动'])
  })

  it('feeds the capability timeline with the six required items in order', () => {
    expect(tanyaoTimelineItems).toHaveLength(6)
    expect(tanyaoTimelineItems.map((item) => item.number)).toEqual(['01', '02', '03', '04', '05', '06'])
    expect(tanyaoTimelineItems.map((item) => item.category)).toEqual([
      '全栈连接',
      '多协议',
      '云边协同',
      '时序数据引擎',
      '规则引擎',
      '深度融合',
    ])
    expect(tanyaoTimelineItems.map((item) => item.bullets.length)).toEqual([0, 0, 0, 0, 0, 0])
  })

  it('lists the nine device agents in the required order', () => {
    expect(tanyaoAgents).toHaveLength(9)
    expect(tanyaoAgents.map((item) => item.title)).toEqual([
      '设备知识Agent',
      '异常分析Agent',
      '工单处置Agent',
      '运行报告Agent',
      '能耗分析Agent',
      'AIoT 伴随Agent',
      '设备健康Agent',
      '预测维护Agent',
      '能效优化Agent',
    ])
  })

  it('uses the required CTA actions', () => {
    expect(tanyaoCtaActions.map((action) => action.label)).toEqual(['立即咨询', '申请试用'])
    expect(tanyaoCtaActions.map((action) => action.href)).toEqual(['/contact', '/try'])
  })

  it('keeps the tanyao and ecosystem logo assets available', () => {
    for (const asset of [
      'assets/images/brand/tanyao-iot-logo.svg',
      'assets/images/brand/shuyao-logo.svg',
      'assets/images/brand/zhiyao-logo.svg',
      'assets/images/brand/boyao-logo.svg',
      'assets/images/brand/deepseek-logo.svg',
      'assets/images/brand/qwen-logo.svg',
      'assets/images/brand/zhipu-logo.svg',
      'assets/images/brand/kimi-logo.svg',
    ]) {
      expect(existsSync(join(root, asset)), asset).toBe(true)
    }
  })
})
