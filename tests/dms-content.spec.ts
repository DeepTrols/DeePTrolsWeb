import { describe, expect, it } from 'vitest'
import {
  dmsCapabilities,
  dmsChallengeItems,
  dmsCtaActions,
  dmsHeroActions,
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
