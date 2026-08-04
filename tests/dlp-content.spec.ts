import { describe, expect, it } from 'vitest'
import {
  dlpAdvantages,
  dlpAssetItems,
  dlpChallengeItems,
  dlpCtaActions,
  dlpHeroActions,
  dlpTimelineItems,
  dlpUseCaseItems,
} from '../data/dlp'
import { primaryNavigation } from '../data/navigation'

describe('DLP product page content contract', () => {
  it('keeps the product navigation entry available', () => {
    const productColumns = primaryNavigation.find((item) => item.label === '产品')?.columns ?? []
    const productLinks = productColumns.flatMap((column) => [
      ...(column.links ?? []),
      ...(column.groups ?? []).flatMap((group) => group.links ?? []),
    ])

    const labelingLink = productLinks.find((link) => link.label === '数曜·数据标签平台')

    expect(labelingLink?.href).toBe('/products/data-labeling')
    expect(labelingLink?.description).toBe('为 AI 提供高质量训练数据')
  })

  it('uses the exact DLP content structure from the page requirement', () => {
    expect(dlpHeroActions.map((action) => action.label)).toEqual(['申请试用', '了解更多'])
    expect(dlpChallengeItems).toHaveLength(4)
    expect(dlpAdvantages).toHaveLength(6)
    expect(dlpTimelineItems).toHaveLength(5)
    expect(dlpAssetItems).toHaveLength(4)
    expect(dlpUseCaseItems).toHaveLength(3)
    expect(dlpCtaActions.map((action) => action.label)).toEqual(['立即咨询', '申请试用'])
  })

  it('keeps required DLP text in configured data', () => {
    const source = [
      ...dlpChallengeItems,
      ...dlpAdvantages,
      ...dlpTimelineItems,
      ...dlpAssetItems,
      ...dlpUseCaseItems,
    ]
      .map((item) => `${item.title}\n${item.description}`)
      .join('\n')

    for (const text of [
      '标准混乱',
      '统一定义标签标准',
      '主体对象自由定义',
      '精准用户运营',
      'AI 智能应用',
    ]) {
      expect(source).toContain(text)
    }
  })
})
