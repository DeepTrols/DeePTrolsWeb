import { describe, expect, it } from 'vitest'
import { primaryNavigation } from '../data/navigation'
import { customerLogos, deliverables, ecosystemCards, homeAbout, productCards, solutions } from '../data/home'

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
    const productLinks = productColumns.flatMap((column) => column.links ?? [])

    expect(productLinks.some((link) => link.label === '数曜·数据资产管理平台')).toBe(false)
    expect(primaryNavigation.find((item) => item.label === '核心产品')).toMatchObject({
      href: '/products',
      layout: 'product',
      megaTitle: '核心技术',
    })
    expect(productColumns.map((column) => column.title)).toEqual([
      '数曜 ｜ 数智基建',
      '博曜 ｜ 知识中枢',
      '智曜 ｜ 智能引擎',
      '探曜 ｜ 智联万物',
    ])
    expect(productColumns.map((column) => column.description)).toEqual([
      '构建面向 AI 的企业数据基础设施',
      '让企业知识可沉淀、可理解、可调用',
      '汇聚算力与模型能力，驱动企业智能应用',
      '连接设备与场景，让 AI 感知真实世界',
    ])
    expect(productColumns.some((column) => column.title === '核心产品')).toBe(false)
    expect(productColumns[0]?.links?.map((link) => link.label)).toEqual([
      '数曜·数据治理平台',
      '数曜·数据标签平台',
      '数曜·数据开发平台',
      '数曜·数据要素监管平台',
    ])
    expect(productLinks.find((link) => link.label === '数曜·数据治理平台')?.description).toBe('构建高质量企业数据体系')
    expect(productLinks.find((link) => link.label === '博曜·企业级知识管理平台')?.description).toBe('构建AI可理解的知识体系')
    expect(productLinks.find((link) => link.label === '智曜·AgentOS')?.description).toBe('Agent基础设施平台')
    expect(productLinks.find((link) => link.label === '探曜·AI物联感知平台')?.description).toBe(
      '实现设备、数据与智能应用互联',
    )
    expect(productLinks.find((link) => link.label === 'Device Agent')?.href).toBe('/products/device-agent')
  })

  it('keeps required homepage sections populated', () => {
    expect(customerLogos).toHaveLength(9)
    expect(deliverables).toHaveLength(3)
    expect(productCards).toHaveLength(4)
    expect(solutions).toHaveLength(6)
    expect(ecosystemCards).toHaveLength(4)
    expect(homeAbout.partnerRows).toHaveLength(3)
    expect(homeAbout.partnerRows.map((row) => row.length)).toEqual([15, 14, 12])
  })

  it('keeps the HOME about section aligned with the DeepCtrls reference assets', () => {
    expect(homeAbout).toMatchObject({
      eyebrow: '关于我们',
      title: '深度数智，企业AI基础设施赛道的构建者与引领者',
      bannerImage: '/O1CN0.png',
      bannerAlt: '深度数智企业 AI 基础设施能力',
      clientsLabelImage: '/clients-label.webp',
      clientsLabelAlt: '世界级客户的选择',
    })
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
