import { describe, expect, it } from 'vitest'
import { headerActions, primaryNavigation } from '../data/navigation'
import { customerLogos, customerStories, deliverables, ecosystemCards, productCards, solutions } from '../data/home'

describe('home content contract', () => {
  it('defines the primary navigation required by product documents', () => {
    expect(primaryNavigation.map((item) => item.label)).toEqual([
      'Why DeepTrols',
      '产品',
      '解决方案',
      '服务',
      '关于我们',
    ])
    expect(headerActions.map((item) => item.label)).toEqual(['GitHub', '语言切换', '登录OPS'])
  })

  it('keeps required homepage sections populated', () => {
    expect(customerLogos).toHaveLength(9)
    expect(deliverables).toHaveLength(3)
    expect(productCards).toHaveLength(4)
    expect(solutions).toHaveLength(6)
    expect(ecosystemCards).toHaveLength(4)
    expect(customerStories).toHaveLength(3)
  })

  it('uses available public solution assets', () => {
    expect(solutions.map((solution) => solution.image)).toEqual([
      '/images/home/solutions/industrial.K00G2HaS.png',
      '/images/home/solutions/smart-env.CWc2pooP.png',
      '/images/home/solutions/smart-energy.DHKY-NE1.png',
      '/images/home/solutions/smart-Water.DHKY-NE1.png',
      '/images/home/solutions/data-center-ai.CDu93Miw.png',
      '/images/home/solutions/data.DHKY-NE1.png',
    ])
    expect(solutions.map((solution) => solution.href)).toEqual([
      '/solutions/manufacturing',
      '/solutions/environment',
      '/solutions/energy',
      '/solutions/water',
      '/solutions/compute',
      '/solutions/data-governance',
    ])
  })

  it('keeps ecosystem cards aligned with the homepage brief', () => {
    expect(ecosystemCards.map((card) => card.href)).toEqual([
      '/services/token-hub',
      '/community',
      '/services/infrastructure',
      '/resources/reports',
    ])
    expect(ecosystemCards[0]?.points).toEqual([
      '支持DeepSeek、Qwen、OpenAI等模型接入',
      'Token 配额、成本及调用统计',
      '企业级统一 API 接入',
    ])
    expect(ecosystemCards[1]?.points).toEqual(['行业智能体持续更新', '开源项目与实践案例', '社区交流与技术分享'])
    expect(ecosystemCards[2]?.points).toBeUndefined()
    expect(ecosystemCards[3]?.points).toBeUndefined()
  })
})
