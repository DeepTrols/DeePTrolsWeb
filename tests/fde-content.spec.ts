import { describe, expect, it } from 'vitest'
import {
  fdeCapabilities,
  fdeCases,
  fdeCoreValues,
  fdeEvolutionItems,
  fdeHero,
  fdePainPoints,
  fdeSolutionItems,
  fdeUseCases,
} from '../data/solutions/fde'

describe('FDE solution page content contract', () => {
  it('keeps the hero aligned with the product requirement', () => {
    expect(fdeHero).toEqual({
      title: 'DeepTrols FDE解决方案',
      description: '深入业务现场，让AI从概念验证走向生产价值',
      video: '/images/solutions/fde/hero-bg.mp4',
    })
  })

  it('keeps section2 as the three-step FDE value evolution', () => {
    expect(fdeEvolutionItems.map((item) => item.eyebrow)).toEqual(['从需求到验证', '从 PoC 到生产', '规模演进'])
    expect(fdeEvolutionItems.map((item) => item.title)).toEqual([
      '更快确认 AI 是否真正值得做',
      '让验证有效的 AI 真正进入业务系统',
      '让 AI 随业务持续优化和扩展',
    ])
    expect(fdeEvolutionItems.map((item) => item.visualSide)).toEqual(['right', 'left', 'right'])
    expect(fdeEvolutionItems.map((item) => item.visual)).toEqual(['prototype', 'production', 'scale'])
    expect(fdeEvolutionItems.map((item) => item.metric)).toEqual(['50%', '70%', '5%'])
    expect(fdeEvolutionItems.every((item) => item.bullets.length === 3)).toBe(true)
  })

  it('keeps section7 as six concrete application scenario cards', () => {
    expect(fdeUseCases.map((item) => item.title)).toEqual([
      '企业知识智能化',
      '业务流程智能体',
      '数据分析智能体',
      '智能制造应用',
      'AI 内容生产',
      '行业 AI 应用',
    ])
    expect(fdeUseCases).toHaveLength(6)
    expect(fdeUseCases.every((item) => item.href.startsWith('/'))).toBe(true)
  })

  it('keeps all FDE data groups complete', () => {
    expect(fdePainPoints).toHaveLength(4)
    expect(fdePainPoints.every((item) => item.points?.length === 3)).toBe(true)
    expect(fdeSolutionItems).toHaveLength(4)
    expect(fdeCapabilities).toHaveLength(4)
    expect(fdeCapabilities.every((item) => item.points.length === 3)).toBe(true)
    expect(fdeCoreValues).toHaveLength(4)
    expect(fdeCoreValues.every((item) => item.tags?.length === 3)).toBe(true)
    expect(fdeCases).toHaveLength(3)
    expect(fdeCases.every((item) => item.stats.length === 3)).toBe(true)
  })
})
