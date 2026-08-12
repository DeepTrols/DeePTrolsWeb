import { describe, expect, it } from 'vitest'
import {
  dgpCapabilities,
  dgpCoreValues,
  dgpCtaActions,
  dgpEvolutionItems,
  dgpGovernanceScenes,
  dgpSystemCards,
  dgpUseCases,
} from '../data/dgp'
import { primaryNavigation } from '../data/navigation'

describe('DGP product page content contract', () => {
  it('keeps the product navigation entry available', () => {
    const productColumns = primaryNavigation.find((item) => item.label === '产品')?.columns ?? []
    const productLinks = productColumns.flatMap((column) => [
      ...(column.links ?? []),
      ...(column.groups ?? []).flatMap((group) => group.links ?? []),
    ])

    const governanceLink = productLinks.find((link) => link.label === '数曜·数据治理平台')

    expect(governanceLink?.href).toBe('/products/data-governance')
    expect(governanceLink?.description).toBe('构建高质量企业数据体系')
  })

  it('uses the exact DGP content structure from the page requirement', () => {
    expect(dgpCoreValues).toHaveLength(4)
    expect(dgpSystemCards).toHaveLength(3)
    expect(dgpCapabilities).toHaveLength(8)
    expect(dgpEvolutionItems).toHaveLength(3)
    expect(dgpUseCases).toHaveLength(4)
    expect(dgpCtaActions.map((action) => action.label)).toEqual(['咨询合作', '申请试用'])
  })

  it('keeps the DGP hero governance scenes aligned with Hero.md', () => {
    expect(dgpGovernanceScenes).toHaveLength(3)
    expect(dgpGovernanceScenes.map((scene) => scene.name)).toEqual(['客户数据域', '订单数据域', '产品数据域'])
    expect(dgpGovernanceScenes.map((scene) => scene.count)).toEqual(['12 张数据表', '8 张数据表', '16 张数据表'])
    expect(dgpGovernanceScenes.map((scene) => scene.code)).toEqual([
      'CUSTOMER_PROFILE',
      'ORDER_STANDARD',
      'PRODUCT_QUALITY',
    ])
    expect(dgpGovernanceScenes.map((scene) => scene.description)).toEqual([
      '客户主数据治理',
      '订单字段标准化',
      '产品数据质量检测',
    ])
    expect(dgpGovernanceScenes.map((scene) => scene.command)).toEqual([
      '$ govern --domain customer_profile',
      '$ govern --domain order_standard',
      '$ govern --domain product_quality',
    ])
    expect(dgpGovernanceScenes[0]?.logs).toEqual([
      '> Scanning 12 data tables',
      '> Detecting duplicate customer records',
      '> Standardizing phone and address fields',
      '> Merging 1,286 duplicate records',
      '> Quality score: 97.6%',
    ])
    expect(dgpGovernanceScenes[1]?.logs).toHaveLength(5)
    expect(dgpGovernanceScenes[2]?.logs).toHaveLength(5)
  })
})
