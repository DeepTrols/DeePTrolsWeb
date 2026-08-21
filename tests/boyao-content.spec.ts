import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  boyaoCapabilityNodes,
  boyaoChallenges,
  boyaoCompatibilityCategories,
  boyaoCtaActions,
  boyaoFeatures,
  boyaoHeroStats,
  boyaoTimelineItems,
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

  it('feeds the core capability timeline with the precision / efficiency / stability items', () => {
    expect(boyaoTimelineItems).toHaveLength(3)
    expect(boyaoTimelineItems.map((item) => item.number)).toEqual(['01', '02', '03'])
    expect(boyaoTimelineItems.map((item) => item.category)).toEqual(['精准', '高效', '稳定'])
    expect(boyaoTimelineItems.map((item) => item.title)).toEqual([
      '多模态文档解析，表格识别更精准',
      '解析速度极快，100页快至1.5秒',
      '稳定性极高，成功率可达99.999%',
    ])
    expect(boyaoTimelineItems.map((item) => item.bullets.length)).toEqual([3, 2, 2])
  })

  it('lists the xinchuang compatibility catalog in the required category order', () => {
    expect(boyaoCompatibilityCategories.map((category) => category.title)).toEqual([
      'CPU',
      '流式文件',
      '操作系统',
      '数据库',
      '中间件',
      '浏览器',
    ])
    expect(boyaoCompatibilityCategories.map((category) => category.items.length)).toEqual([5, 2, 3, 4, 4, 2])
    expect(boyaoCompatibilityCategories[0]?.items.map((item) => item.label)).toEqual([
      '龙芯',
      '飞腾',
      '鲲鹏',
      '兆芯',
      '海光',
    ])
    expect(
      boyaoCompatibilityCategories.every((category) =>
        category.items.every((item) => typeof item.icon === 'string' && item.icon.length > 0),
      ),
    ).toBe(true)
  })

  it('uses the required CTA actions', () => {
    expect(boyaoCtaActions.map((action) => action.label)).toEqual(['立即咨询', '申请试用'])
  })

  it('keeps the boyao logo asset available', () => {
    expect(existsSync(join(root, 'assets/images/brand/boyao-logo.svg'))).toBe(true)
  })
})
