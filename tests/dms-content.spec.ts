import { describe, expect, it } from 'vitest'
import {
  dmsCapabilities,
  dmsChallengeItems,
  dmsCtaActions,
  dmsHeroActions,
  dmsHeroDisposalDone,
  dmsHeroDisposalEvent,
  dmsHeroDisposalFields,
  dmsHeroDisposalHint,
  dmsHeroDisposalSteps,
  dmsHeroIntakeFields,
  dmsHeroIntakeHint,
  dmsHeroIntakeSteps,
  dmsHeroRiskHint,
  dmsHeroRiskRules,
  dmsHeroRiskSummary,
  dmsHeroTabs,
  dmsHeroTitle,
  dmsProcessItems,
  dmsTimelineItems,
  dmsUseCaseItems,
  dmsValueItems,
} from '../data/dms'
import { primaryNavigation } from '../data/navigation'

describe('DMS product page content contract', () => {
  it('keeps the product navigation entry available', () => {
    const productColumns = primaryNavigation.find((item) => item.label === '产品')?.columns ?? []
    const productLinks = productColumns.flatMap((column) => [
      ...(column.links ?? []),
      ...(column.groups ?? []).flatMap((group) => group.links ?? []),
    ])

    const regulationLink = productLinks.find((link) => link.label === '数曜·数据要素监管平台')

    expect(regulationLink?.href).toBe('/products/data-element-regulation')
    expect(regulationLink?.description).toBe('支撑数据要素合规监管')
  })

  it('uses the exact DMS content structure from the page requirement', () => {
    expect(dmsHeroActions.map((action) => action.label)).toEqual(['申请试用', '了解更多'])
    expect(dmsChallengeItems).toHaveLength(4)
    expect(dmsCapabilities).toHaveLength(6)
    expect(dmsTimelineItems).toHaveLength(5)
    expect(dmsValueItems).toHaveLength(4)
    expect(dmsProcessItems).toHaveLength(6)
    expect(dmsUseCaseItems).toHaveLength(4)
    expect(dmsProcessItems.map((item) => item.iconLabel)).toEqual(['01', '02', '03', '04', '05', '06'])
    expect(dmsCtaActions.map((action) => action.label)).toEqual(['立即咨询', '申请试用'])
  })

  it('keeps the hero supervision script required by Hero.md', () => {
    expect(dmsHeroTitle).toBe('数据要素监管中心')
    expect(dmsHeroTabs.map((tab) => tab.id)).toEqual(['intake', 'risk', 'disposal'])
    expect(dmsHeroTabs.map((tab) => tab.title)).toEqual(['流通接入', '风险识别', '监管处置'])

    expect(dmsHeroIntakeFields.map((field) => field.label)).toEqual([
      '交易编号',
      '数据产品',
      '提供方',
      '使用方',
      '使用目的',
      '授权期限',
    ])
    expect(dmsHeroIntakeFields.map((field) => field.value)).toEqual([
      'TX-20260811-042',
      '企业经营分析数据集',
      '数源科技',
      '智联科技',
      '风险评估',
      '2026-12-31',
    ])
    expect(dmsHeroIntakeSteps).toEqual(['交易平台', '授权信息', '合同信息', '主体信息'])
    expect(dmsHeroIntakeHint).toBe('检测到新的数据流通活动，正在进入监管流程')

    expect(dmsHeroRiskRules.map((rule) => rule.label)).toEqual([
      '主体资质有效',
      '数据产品已备案',
      '使用目的已授权',
      '敏感字段超范围',
      '授权期限有效',
    ])
    expect(dmsHeroRiskRules.filter((rule) => rule.risk).map((rule) => rule.label)).toEqual(['敏感字段超范围'])
    expect(dmsHeroRiskSummary.map((field) => `${field.label} ${field.value}`)).toEqual([
      '交易编号 TX-20260811-042',
      '数据产品 企业经营分析数据集',
      '用途 风险评估',
      '字段 128',
      '敏感字段 6',
      '授权字段 124',
    ])
    expect(dmsHeroRiskHint).toBe('检测到 4 个字段超出授权范围，触发监管规则')

    expect(dmsHeroDisposalEvent).toEqual({ id: 'EVT-20260811-017', level: '中风险' })
    expect(dmsHeroDisposalFields.map((field) => `${field.label} ${field.value}`)).toEqual([
      '风险等级 中风险',
      '触发规则 数据使用范围校验',
      '涉及主体 智联科技',
      '处置状态 处理中',
    ])
    expect(dmsHeroDisposalSteps).toEqual(['发现风险', '生成预警', '创建工单', '通知责任方'])
    expect(dmsHeroDisposalDone).toBe('监管工单已创建')
    expect(dmsHeroDisposalHint).toBe('风险事件已进入处置流程，全程留痕可追溯')
  })

  it('keeps required DMS text in configured data', () => {
    const featureSource = [
      ...dmsChallengeItems,
      ...dmsCapabilities,
      ...dmsTimelineItems,
      ...dmsProcessItems,
      ...dmsUseCaseItems,
    ]
      .map((item) => `${item.title}\n${item.description}`)
      .join('\n')
    const valueSource = dmsValueItems.map((item) => `${item.metric}\n${item.title}\n${item.description}\n${item.detail}`).join('\n')
    const source = `${featureSource}\n${valueSource}`

    for (const text of [
      '风险发现滞后',
      '全流程监管体系',
      '统一监管规则',
      '100%',
      '监管规则配置',
      '数据交易平台',
      '数据运营机构',
    ]) {
      expect(source).toContain(text)
    }
  })
})
