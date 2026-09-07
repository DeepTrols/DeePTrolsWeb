import { describe, expect, it } from 'vitest'
import { primaryNavigation } from '../data/navigation'
import { customerLogos, customerStories, deliverables, ecosystemCards, productCards, solutions } from '../data/home'

describe('home content contract', () => {
  it('defines the primary navigation required by product documents', () => {
    expect(primaryNavigation.map((item) => item.label)).toEqual([
      'Why DeepTrols',
      '核心产品',
      '解决方案',
      'Token Hub',
      '资源',
      '关于我们',
    ])
  })

  it('keeps the product menu aligned with the DeepCtrls-style core mega copy', () => {
    const productColumns = primaryNavigation.find((item) => item.label === '核心产品')?.columns ?? []
    const productLinks = productColumns.flatMap((column) => [
      ...(column.links ?? []),
      ...(column.groups ?? []).flatMap((group) => group.links ?? []),
    ])

    expect(productLinks.some((link) => link.label === '数曜·数据资产管理平台')).toBe(false)
    expect(primaryNavigation.find((item) => item.label === '核心产品')).toMatchObject({
      href: '/products',
      layout: 'product',
      megaTitle: '核心技术',
    })
    expect(productColumns.map((column) => column.title)).toEqual(['数曜 ｜ 数智基建', '数曜·数据治理平台'])
    expect(productColumns.map((column) => column.description)).toEqual([
      '构建面向 AI 的企业数据基础设施',
      '构建高质量企业数据体系',
    ])
    expect(productColumns[0]?.links?.find((link) => link.label === '博曜 ｜ 知识中枢')?.description).toBe(
      '让企业知识可沉淀、可理解、可调用',
    )
    expect(productLinks.find((link) => link.label === '核心产品')?.href).toBe('/products')
    expect(productLinks.find((link) => link.label === '智曜 ｜ 智能引擎')?.description).toBe('汇聚算力与模型能力，驱动企业智能应用')
    expect(productLinks.find((link) => link.label === '探曜 ｜ 智联万物')?.description).toBe('连接设备与场景，让 AI 感知真实世界')
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
