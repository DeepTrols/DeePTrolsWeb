import { describe, expect, it } from 'vitest'
import {
  datacenterCapabilities,
  datacenterHero,
  datacenterLoopLabel,
  datacenterPains,
  datacenterScenarios,
  datacenterSolutionLabel,
} from '../data/solutions/datacenter'

describe('datacenter solution page content contract', () => {
  it('keeps the hero aligned with the product requirement', () => {
    expect(datacenterHero).toEqual({
      title: '统筹算力、电力、冷却与储能，降低综合成本',
      description:
        '针对算力、电力、冷却和储能各自管理、难以协同的问题，统一预测算力需求、冷却负荷、电价、绿电出力及储能状态，动态优化能源供给和算力运行策略，实现算力与能源资源的协同运营。',
      image: '/images/solutions/datacenter-hero.webp',
      imageAlt: '算电协同运营方案',
    })
  })

  it('keeps section1 as the four coordination pain points', () => {
    expect(datacenterPains.map((item) => item.title)).toEqual([
      '算力与能源脱节',
      '多系统独立运行',
      '供需预测不足',
      '调度策略缺乏协同',
    ])
    expect(datacenterPains).toHaveLength(4)
    expect(datacenterPains.every((item) => item.icon !== undefined)).toBe(true)
  })

  it('keeps section3 as the four core capabilities', () => {
    expect(datacenterCapabilities.map((item) => item.title)).toEqual([
      '算力需求预测',
      '能源供需预测',
      '多系统联合优化',
      '动态策略执行',
    ])
    expect(datacenterCapabilities).toHaveLength(4)
    expect(datacenterCapabilities.every((item) => item.icon !== undefined)).toBe(true)
  })

  it('keeps section5 as the four typical scenarios', () => {
    expect(datacenterScenarios.map((item) => item.title)).toEqual([
      'AI 数据中心',
      '智算中心',
      '企业算力中心',
      '零碳算力园区',
    ])
    expect(datacenterScenarios).toHaveLength(4)
    expect(datacenterScenarios.every((item) => item.icon !== undefined)).toBe(true)
  })

  it('keeps flow frame labels centralized in the data file', () => {
    expect(datacenterSolutionLabel).toBe('算电协同运营能力图')
    expect(datacenterLoopLabel).toBe('算电协同运营闭环能力图')
  })
})
