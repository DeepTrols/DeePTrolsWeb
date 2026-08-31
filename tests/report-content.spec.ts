import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { primaryNavigation } from '../data/navigation'
import { reportHero, reportResources } from '../data/reports'

const root = process.cwd()

describe('report service page content contract', () => {
  it('keeps the service navigation entry wired to the report route', () => {
    const serviceFeatures = primaryNavigation.find((item) => item.label === '服务')?.features ?? []
    const reportLink = serviceFeatures.find((feature) => feature.title === '白皮书 & 报告')

    expect(reportLink?.href).toBe('/resources/reports')
    expect(reportLink?.description).toBe('AI 行业研究与工程实践参考。')
  })

  it('uses the required hero copy from report.md', () => {
    expect(reportHero).toEqual({
      title: '白皮书&报告',
      description: '全球最新的AI相关白皮书&报告，深入了解人工智能的世界。',
    })
  })

  it('defines the report resources as a three-column resource grid source', () => {
    expect(reportResources).toHaveLength(6)
    expect(reportResources.map((item) => item.type)).toEqual(['白皮书', '报告', '白皮书', '报告', '白皮书', '报告'])
    expect(reportResources.map((item) => item.title)).toEqual([
      '企业级 AI 应用落地白皮书',
      'AI 时代的数据治理与数据底座报告',
      '企业知识工程建设实践指南',
      '工业现场智能体应用趋势报告',
      '企业模型调用与 Token 成本治理白皮书',
      'AI 算力与基础设施建设参考报告',
    ])
  })

  it('uses only runtime public images for report covers', () => {
    for (const item of reportResources) {
      expect(item.image.startsWith('/images/')).toBe(true)
      expect(existsSync(join(root, `public${item.image}`)), item.image).toBe(true)
    }
  })
})
