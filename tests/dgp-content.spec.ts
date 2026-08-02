import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  dgpCapabilities,
  dgpCoreValues,
  dgpCtaActions,
  dgpEvolutionItems,
  dgpSystemCards,
  dgpUseCases,
} from '../data/dgp'
import { primaryNavigation } from '../data/navigation'

const root = process.cwd()

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

  it('keeps required DGP visual assets local', () => {
    for (const asset of [
      'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ban-shape1.png',
      'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ban-shape2.png',
      'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ban-shape3.png',
      'doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ruizhi1.png',
    ]) {
      expect(existsSync(join(root, asset))).toBe(true)
    }
  })
})
