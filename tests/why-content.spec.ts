import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { primaryNavigation } from '../data/navigation'
import { whyEngineLinks, whyServiceItems, whyTrustTabs } from '../data/why'

const root = process.cwd()

describe('why deeptrols content contract', () => {
  it('keeps the primary navigation wired to the Why DeepTrols route', () => {
    expect(primaryNavigation[0]).toMatchObject({
      label: 'Why DeepTrols',
      href: '/why-deeptrols',
    })
  })

  it('defines four trust tabs with four enterprise features each', () => {
    expect(whyTrustTabs.map((tab) => tab.label)).toEqual([
      '面向技术层',
      '面向业务层',
      '面向服务层',
      '面向长期价值',
    ])
    expect(whyTrustTabs.every((tab) => tab.features.length === 4)).toBe(true)
    expect(whyTrustTabs[0]?.features.map((feature) => feature.title)).toEqual([
      '生产级架构',
      '开放兼容',
      '持续演进',
      '安全可控',
    ])
    expect(whyTrustTabs[1]?.features.map((feature) => feature.title)).toEqual([
      '行业理解',
      '场景驱动',
      '集成能力',
      '持续交付',
    ])
    expect(whyTrustTabs[2]?.features.map((feature) => feature.title)).toEqual([
      '全程陪伴',
      '快速交付',
      '长期服务',
      '效果量化',
    ])
  })

  it('keeps service reset and engine content aligned with the page requirement', () => {
    expect(whyServiceItems.map((item) => item.title)).toEqual([
      '交付可量化，区别传统软件交付',
      '没有隐形的业务负担',
      '摆脱业务系统锁定',
    ])
    expect(whyEngineLinks.map((link) => link.title)).toEqual([
      'DeepTrolsOPS企业AI引擎',
      'FDE企业AI服务指南',
    ])
  })

  it('uses the required Why page source assets from the product brief', () => {
    expect(existsSync(join(root, 'doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/Agentic solution V1.gif'))).toBe(true)
    expect(existsSync(join(root, 'doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/fangangaishu@2x.png'))).toBe(true)
  })
})
