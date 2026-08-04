import { describe, expect, it } from 'vitest'
import {
  ddpAdvantages,
  ddpChallengeItems,
  ddpCtaActions,
  ddpHeroActions,
  ddpTimelineItems,
  ddpUnifiedDevelopmentItems,
  ddpUseCaseItems,
} from '../data/ddp'
import { primaryNavigation } from '../data/navigation'

describe('DDP product page content contract', () => {
  it('keeps the product navigation entry available', () => {
    const productColumns = primaryNavigation.find((item) => item.label === '产品')?.columns ?? []
    const productLinks = productColumns.flatMap((column) => [
      ...(column.links ?? []),
      ...(column.groups ?? []).flatMap((group) => group.links ?? []),
    ])

    const developmentLink = productLinks.find((link) => link.label === '数曜·数据开发平台')

    expect(developmentLink?.href).toBe('/products/data-development')
    expect(developmentLink?.description).toBe('支持数据集成、开发与调度')
  })

  it('uses the exact DDP content structure from the page requirement', () => {
    expect(ddpHeroActions.map((action) => action.label)).toEqual(['申请试用', '了解更多'])
    expect(ddpChallengeItems).toHaveLength(4)
    expect(ddpAdvantages).toHaveLength(4)
    expect(ddpTimelineItems).toHaveLength(4)
    expect(ddpUnifiedDevelopmentItems).toHaveLength(4)
    expect(ddpUseCaseItems).toHaveLength(3)
    expect(ddpUnifiedDevelopmentItems.map((item) => item.iconLabel)).toEqual(['01', '02', '03', '04'])
    expect(ddpCtaActions.map((action) => action.label)).toEqual(['立即咨询', '申请试用'])
  })

  it('keeps required DDP text in configured data', () => {
    const source = [
      ...ddpChallengeItems,
      ...ddpAdvantages,
      ...ddpTimelineItems,
      ...ddpUnifiedDevelopmentItems,
      ...ddpUseCaseItems,
    ]
      .map((item) => `${item.title}\n${item.description}`)
      .join('\n')

    for (const text of [
      '数据孤岛难破除',
      '更快的实施数据集成',
      '多源数据统一接入',
      '统一数据接入',
      '企业数据中台',
      'AI 数据底座',
    ]) {
      expect(source).toContain(text)
    }
  })
})
