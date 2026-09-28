import { describe, expect, it } from 'vitest'
import { aboutIntroGallery } from '../data/about'
import { customerLogos } from '../data/home-logos'
import {
  SHOWCASE_KEYS,
  galleryItemSchema,
  galleryListSchema,
  logoItemSchema,
  logoListSchema,
  parseShowcaseItems,
  showcaseItemsSchema,
  showcaseKeySchema,
} from '../server/utils/showcase-admin'

describe('showcaseKeySchema', () => {
  it('只接受 about-gallery / home-logos', () => {
    expect(showcaseKeySchema.safeParse('about-gallery').success).toBe(true)
    expect(showcaseKeySchema.safeParse('home-logos').success).toBe(true)
    expect(showcaseKeySchema.safeParse('footer-logos').success).toBe(false)
    expect(showcaseKeySchema.safeParse(undefined).success).toBe(false)
  })

  it('SHOWCASE_KEYS 与 schema 白名单一致', () => {
    expect(SHOWCASE_KEYS).toEqual(['about-gallery', 'home-logos'])
  })
})

describe('galleryItemSchema', () => {
  it('接受合法条目', () => {
    expect(galleryItemSchema.safeParse({ image: '/uploads/2026-09/a.jpg', alt: '办公区' }).success).toBe(true)
  })

  it('拒绝空 alt / 超长 alt / 空 image', () => {
    expect(galleryItemSchema.safeParse({ image: '/a.jpg', alt: '' }).success).toBe(false)
    expect(galleryItemSchema.safeParse({ image: '/a.jpg', alt: 'x'.repeat(201) }).success).toBe(false)
    expect(galleryItemSchema.safeParse({ image: '', alt: 'a' }).success).toBe(false)
  })

  it('拒绝危险协议 image', () => {
    expect(galleryItemSchema.safeParse({ image: 'javascript:alert(1)', alt: 'a' }).success).toBe(false)
    expect(galleryItemSchema.safeParse({ image: 'data:image/png;base64,xx', alt: 'a' }).success).toBe(false)
  })
})

describe('logoItemSchema', () => {
  it('接受合法图片条目（DB 协议仅图片形态）', () => {
    expect(logoItemSchema.safeParse({ name: '武汉大数据', image: '/images/logos/wh-bigdata.png' }).success).toBe(true)
  })

  it('拒绝缺 image / 空 name / 超长 name', () => {
    expect(logoItemSchema.safeParse({ name: '广药白云山' }).success).toBe(false)
    expect(logoItemSchema.safeParse({ name: '广药白云山', text: 'GYBYS' }).success).toBe(false)
    expect(logoItemSchema.safeParse({ name: '', image: '/a.png' }).success).toBe(false)
    expect(logoItemSchema.safeParse({ name: 'x'.repeat(101), image: '/a.png' }).success).toBe(false)
  })
})

describe('列表上限与 key 分发', () => {
  it('图集整列上限 24，Logo 整列上限 40', () => {
    const gallery = Array.from({ length: 25 }, (_, i) => ({ image: '/a.jpg', alt: `a${i}` }))
    const logos = Array.from({ length: 41 }, (_, i) => ({ name: `n${i}`, image: '/a.png' }))
    expect(galleryListSchema.safeParse(gallery).success).toBe(false)
    expect(galleryListSchema.safeParse(gallery.slice(0, 24)).success).toBe(true)
    expect(logoListSchema.safeParse(logos).success).toBe(false)
    expect(logoListSchema.safeParse(logos.slice(0, 40)).success).toBe(true)
  })

  it('showcaseItemsSchema 按 key 分发到对应列表协议', () => {
    expect(showcaseItemsSchema('about-gallery')).toBe(galleryListSchema)
    expect(showcaseItemsSchema('home-logos')).toBe(logoListSchema)
  })

  it('parseShowcaseItems 校验失败返回 null', () => {
    expect(parseShowcaseItems('about-gallery', [{ image: '/a.jpg', alt: 'a' }])).toEqual([{ image: '/a.jpg', alt: 'a' }])
    expect(parseShowcaseItems('about-gallery', [{ image: '/a.jpg' }])).toBeNull()
    expect(parseShowcaseItems('home-logos', [{ name: 'n' }])).toBeNull()
  })
})

describe('静态回退快照与协议对齐', () => {
  it('aboutIntroGallery 全量通过图集协议', () => {
    expect(galleryListSchema.safeParse(aboutIntroGallery).success).toBe(true)
  })

  it('customerLogos 中的图片条目全量通过 Logo 协议', () => {
    const imageLogos = customerLogos.filter(logo => typeof logo.image === 'string')
    expect(imageLogos.length).toBeGreaterThan(0)
    expect(logoListSchema.safeParse(imageLogos).success).toBe(true)
  })

  it('customerLogos 保留纯文本条目（仅静态回退，不入库）', () => {
    expect(customerLogos.some(logo => logo.text !== undefined)).toBe(true)
  })
})
