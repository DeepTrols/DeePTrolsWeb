import { describe, expect, it } from 'vitest'
import { CUSTOM_SECTION_NAMES } from '../components/sections/custom-names'
import {
  ctaSectionSchema,
  customSectionSchema,
  featureGridSectionSchema,
  heroSectionSchema,
  imageBannerSectionSchema,
  logoStripSectionSchema,
  metricsSectionSchema,
  pageSectionSchema,
  pageSectionsSchema,
  richTextSectionSchema,
} from '../server/utils/page-sections'

describe('heroSectionSchema', () => {
  it('接受最小与完整 hero', () => {
    expect(heroSectionSchema.safeParse({ type: 'hero', title: '标题' }).success).toBe(true)
    const parsed = heroSectionSchema.safeParse({
      type: 'hero',
      eyebrow: '方案',
      title: '标题',
      subtitle: '副标题',
    })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.visible).toBe(true)
    }
  })

  it('拒绝缺 title', () => {
    expect(heroSectionSchema.safeParse({ type: 'hero' }).success).toBe(false)
  })
})

describe('metricsSectionSchema', () => {
  it('接受 1-8 条指标', () => {
    const section = { type: 'metrics', items: [{ value: '99.9%', label: '可用性' }] }
    expect(metricsSectionSchema.safeParse(section).success).toBe(true)
  })

  it('拒绝空 items 与缺 value', () => {
    expect(metricsSectionSchema.safeParse({ type: 'metrics', items: [] }).success).toBe(false)
    expect(
      metricsSectionSchema.safeParse({ type: 'metrics', items: [{ label: 'x' }] }).success,
    ).toBe(false)
  })
})

describe('featureGridSectionSchema', () => {
  const item = { title: '能力', description: '描述' }

  it('接受默认值与 icon 字符串', () => {
    const parsed = featureGridSectionSchema.safeParse({
      type: 'featureGrid',
      title: '网格',
      items: [{ ...item, icon: 'BookOpen' }],
    })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.columns).toBe('three')
      expect(parsed.data.visible).toBe(true)
    }
  })

  it('拒绝未登记 icon 与空 items', () => {
    expect(
      featureGridSectionSchema.safeParse({
        type: 'featureGrid',
        title: '网格',
        items: [{ ...item, icon: 'NotARealIcon' }],
      }).success,
    ).toBe(false)
    expect(
      featureGridSectionSchema.safeParse({ type: 'featureGrid', title: '网格', items: [] }).success,
    ).toBe(false)
  })
})

describe('ctaSectionSchema', () => {
  it('补默认按钮文案与链接', () => {
    const parsed = ctaSectionSchema.safeParse({ type: 'cta', title: '行动起来' })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.ctaLabel).toBe('免费获取专属方案')
      expect(parsed.data.ctaHref).toBe('/contact')
    }
  })
})

describe('richTextSectionSchema', () => {
  it('保持 Phase C 形状（无 visible 字段也兼容）', () => {
    const parsed = richTextSectionSchema.safeParse({
      type: 'richText',
      blocks: [{ type: 'paragraph', text: '正文' }],
    })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.visible).toBe(true)
    }
  })
})

describe('logoStripSectionSchema', () => {
  it('image/text 至少其一', () => {
    expect(
      logoStripSectionSchema.safeParse({ type: 'logoStrip', logos: [{ name: 'A', text: 'A 公司' }] })
        .success,
    ).toBe(true)
    expect(
      logoStripSectionSchema.safeParse({ type: 'logoStrip', logos: [{ name: 'A' }] }).success,
    ).toBe(false)
    expect(logoStripSectionSchema.safeParse({ type: 'logoStrip', logos: [] }).success).toBe(false)
  })
})

describe('imageBannerSectionSchema', () => {
  it('src/alt 必填', () => {
    expect(
      imageBannerSectionSchema.safeParse({ type: 'imageBanner', src: '/a.webp', alt: '图' }).success,
    ).toBe(true)
    expect(imageBannerSectionSchema.safeParse({ type: 'imageBanner', src: '/a.webp' }).success).toBe(
      false,
    )
  })
})

describe('customSectionSchema（逃生门）', () => {
  it('只接受注册表内的组件名', () => {
    expect(customSectionSchema.safeParse({ type: 'custom', name: 'DmsArchitecture' }).success).toBe(
      true,
    )
    expect(customSectionSchema.safeParse({ type: 'custom', name: 'EvilComponent' }).success).toBe(
      false,
    )
    expect(CUSTOM_SECTION_NAMES.length).toBeGreaterThan(0)
  })
})

describe('pageSectionSchema discriminatedUnion', () => {
  it('拒绝未知 type', () => {
    expect(pageSectionSchema.safeParse({ type: 'carousel', items: [] }).success).toBe(false)
    expect(pageSectionSchema.safeParse({}).success).toBe(false)
  })

  it('spacing 三档枚举默认 compact（015.12）', () => {
    const parsed = pageSectionSchema.safeParse({ type: 'hero', title: '标题' })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.spacing).toBe('compact')
    }
    expect(pageSectionSchema.safeParse({ type: 'hero', title: '标题', spacing: 'tight' }).success).toBe(true)
    expect(pageSectionSchema.safeParse({ type: 'hero', title: '标题', spacing: 'wide' }).success).toBe(false)
  })

  it('混合区块数组整树校验', () => {
    const sections = [
      { type: 'hero', title: '标题' },
      { type: 'metrics', items: [{ value: '1', label: 'x' }] },
      { type: 'cta', title: 'CTA' },
      { type: 'custom', name: 'DlpArchitecture' },
      { type: 'richText', blocks: [{ type: 'divider' }], visible: false },
    ]
    expect(pageSectionsSchema.safeParse(sections).success).toBe(true)
  })
})
