import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  boyaoCapabilityNodes,
  boyaoChallenges,
  boyaoCtaActions,
  boyaoFeatures,
  boyaoHeroStats,
  boyaoShowcases,
  boyaoValueCards,
} from '../data/boyao'
import { primaryNavigation } from '../data/navigation'

const root = process.cwd()

describe('BOYAO product page content contract', () => {
  it('keeps the knowledge base navigation entry available', () => {
    const productColumns = primaryNavigation.find((item) => item.label === '产品')?.columns ?? []
    const productLinks = productColumns.flatMap((column) => [
      ...(column.links ?? []),
      ...(column.groups ?? []).flatMap((group) => group.links ?? []),
    ])

    const knowledgeLink = productLinks.find((link) => link.label === '博曜·企业级知识管理平台')

    expect(knowledgeLink?.href).toBe('/products/knowledge-base')
    expect(knowledgeLink?.description).toBe('构建 AI 可理解的知识体系')
  })

  it('uses the exact BOYAO hero stats from the page requirement', () => {
    expect(boyaoHeroStats).toHaveLength(3)
    expect(boyaoHeroStats.map((stat) => stat.value)).toEqual(['70%+', '50%+', '200+'])
    expect(boyaoHeroStats.map((stat) => stat.label)).toEqual(['运营效率提升', '检索效率提升', '服务客户'])
  })

  it('lists the four knowledge management challenges', () => {
    expect(boyaoChallenges).toHaveLength(4)
    expect(boyaoChallenges.map((item) => item.title)).toEqual([
      '来源收集难',
      '知识查找难',
      '业务利用难',
      '知识挖掘难',
    ])
  })

  it('defines the three core value cards with the required eyebrows', () => {
    expect(boyaoValueCards).toHaveLength(3)
    expect(boyaoValueCards.map((card) => card.eyebrow)).toEqual(['业务效率', '知识整合', '知识应用'])
    expect(boyaoValueCards.map((card) => card.title)).toEqual([
      '提升内外部业务效率',
      '海量碎片化知识整合',
      '更顺畅的知识共享应用',
    ])
    expect(boyaoValueCards[0]?.metrics?.map((metric) => metric.value)).toEqual(['10倍+', '70%+', '20%+'])
    expect(boyaoValueCards[0]?.metrics?.map((metric) => metric.label)).toEqual([
      '构建与运营成本降低',
      '运营效率提升',
      '助力销售业绩增长',
    ])
  })

  it('keeps the hero capability nodes aligned with the knowledge pipeline', () => {
    expect(boyaoCapabilityNodes.map((node) => node.title)).toEqual(['知识加工', '知识表示', '知识应用'])
    expect(boyaoCapabilityNodes.map((node) => node.description)).toEqual([
      '多模态文档解析',
      '语义建模·知识图谱',
      '智能检索·智能体',
    ])
  })

  it('defines the six feature cards in the required order', () => {
    expect(boyaoFeatures).toHaveLength(6)
    expect(boyaoFeatures.map((item) => item.title)).toEqual([
      '知识文档采集存储',
      '知识文档在线协作',
      '知识文档合规管理',
      '知识文档搜索利用',
      '知识文档业务融合',
      '知识文档智慧创新',
    ])
  })

  it('keeps the precision / speed / stability showcases with placeholders', () => {
    expect(boyaoShowcases).toHaveLength(3)
    expect(boyaoShowcases.map((item) => item.eyebrow)).toEqual(['精准', '高效', '稳定'])
    expect(boyaoShowcases.map((item) => item.reverse)).toEqual([false, true, false])
    expect(boyaoShowcases.every((item) => item.blocks.length >= 2)).toBe(true)
    expect(boyaoShowcases.every((item) => item.blocks.every((block) => typeof block.icon === 'function'))).toBe(true)
  })

  it('uses the required CTA actions', () => {
    expect(boyaoCtaActions.map((action) => action.label)).toEqual(['立即咨询', '申请试用'])
  })

  it('keeps the boyao logo asset available', () => {
    expect(existsSync(join(root, 'doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/博曜logo.svg'))).toBe(true)
  })
})
