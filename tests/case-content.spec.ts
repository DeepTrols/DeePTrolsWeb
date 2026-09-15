import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { primaryNavigation } from '../data/navigation'
import { caseFeatured, caseHero, caseMetrics, caseResources } from '../data/cases'

const root = process.cwd()

describe('industry cases page content contract', () => {
  it('wires the top-level 行业案例 navigation entry to the /cases route', () => {
    const casesLink = primaryNavigation.find((item) => item.label === '行业案例')

    expect(casesLink?.href).toBe('/cases')
  })

  it('keeps the hero copy aligned with case.md', () => {
    expect(caseHero).toEqual({
      title: '深度数智 智能化转型实践精选',
      subtitle:
        '从数据、知识与物联感知，到 AI 智能体与算力能源协同，DeepTrols 深入客户真实业务场景，将技术能力与行业需求结合，持续构建可运行、可验证、可演进的智能应用。',
      video: '/images/cases/case-hero.mp4',
    })
  })

  it('keeps section1 as the four product metrics from case.md', () => {
    expect(caseMetrics).toEqual([
      { value: '100+', label: '服务客户' },
      { value: '300+', label: '落地项目' },
      { value: '50%-70%', label: 'AI赋能业务提效' },
      { value: '10+', label: '覆盖行业' },
    ])
  })

  it('provides placeholder case resources covering every solution filter category', () => {
    expect(caseResources).toHaveLength(7)
    expect(caseFeatured).toEqual(caseResources.slice(0, 3))
    expect(new Set(caseResources.map((item) => item.solutionKey)).size).toBe(7)

    for (const item of caseResources) {
      expect(item.title.length).toBeGreaterThan(0)
      expect(item.summary.length).toBeGreaterThan(0)
      expect(item.image.startsWith('/images/')).toBe(true)
      expect(item.href.startsWith('/cases/')).toBe(true)
    }
  })

  it('migrates the hero video into public runtime assets', () => {
    expect(existsSync(join(root, 'public/images/cases/case-hero.mp4'))).toBe(true)
  })
})
