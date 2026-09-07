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

describe('DLP product page content contract', () => {
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
