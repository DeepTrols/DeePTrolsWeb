import { describe, expect, it } from 'vitest'
import { articleBlockSchema } from '../server/utils/article-blocks'
import { caseInputSchema } from '../server/utils/cases-admin'
import { footerMenuSchema, headerMenuSchema } from '../server/utils/menu-admin'
import { ctaSectionSchema, featureGridSectionSchema } from '../server/utils/page-sections'
import { reportInputSchema } from '../server/utils/reports-admin'
import { isSafeUrl, safeUrlSchema } from '../server/utils/safe-url'

/**
 * 审计修复（高危#3 + 中危#15）行为测试：
 * - href/src 类字段协议白名单（存储型 XSS 入库防线）
 * - icon 白名单原型链绕过（`in` → Object.hasOwn）
 */

describe('isSafeUrl 单元', () => {
  it('拒绝 javascript: 及其大小写混合/前导空白/控制字符变体', () => {
    expect(isSafeUrl('javascript:alert(1)')).toBe(false)
    expect(isSafeUrl('JaVaScRiPt:alert(document.cookie)')).toBe(false)
    expect(isSafeUrl('JAVASCRIPT:alert(1)')).toBe(false)
    expect(isSafeUrl(' javascript:alert(1)')).toBe(false)
    expect(isSafeUrl('\tjavascript:alert(1)')).toBe(false)
    expect(isSafeUrl('\njavascript:alert(1)')).toBe(false)
    expect(isSafeUrl('\u0000javascript:alert(1)')).toBe(false)
    expect(isSafeUrl('java\u0001script:alert(1)')).toBe(false)
    expect(isSafeUrl('java\tscript:alert(1)')).toBe(false)
  })

  it('拒绝 data:/vbscript:/ftp:/file: 等非白名单协议', () => {
    expect(isSafeUrl('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==')).toBe(false)
    expect(isSafeUrl('vbscript:msgbox(1)')).toBe(false)
    expect(isSafeUrl('ftp://example.com/a')).toBe(false)
    expect(isSafeUrl('file:///etc/passwd')).toBe(false)
  })

  it('拒绝空串与纯空白', () => {
    expect(isSafeUrl('')).toBe(false)
    expect(isSafeUrl('   ')).toBe(false)
  })

  it('允许相对引用与 http/https/mailto/tel（大小写不敏感）', () => {
    expect(isSafeUrl('/')).toBe(true)
    expect(isSafeUrl('/contact')).toBe(true)
    expect(isSafeUrl('/products/ai-iot?x=1#y')).toBe(true)
    expect(isSafeUrl('#anchor')).toBe(true)
    expect(isSafeUrl('./x')).toBe(true)
    expect(isSafeUrl('x/y')).toBe(true)
    expect(isSafeUrl('https://example.com')).toBe(true)
    expect(isSafeUrl('http://example.com/a')).toBe(true)
    expect(isSafeUrl('HTTPS://EXAMPLE.COM')).toBe(true)
    expect(isSafeUrl('MailTo:hello@example.com')).toBe(true)
    expect(isSafeUrl('tel:+8613800000000')).toBe(true)
  })
})

describe('safeUrlSchema 工厂', () => {
  it('非空、限长并复用 isSafeUrl 白名单', () => {
    const schema = safeUrlSchema(10)
    expect(schema.safeParse('/ok').success).toBe(true)
    expect(schema.safeParse('').success).toBe(false)
    expect(schema.safeParse('/way-too-long-path').success).toBe(false)
    expect(schema.safeParse('javascript:alert(1)').success).toBe(false)
    // 短载荷只触发白名单 refine，验证错误消息清晰
    const rejected = schema.safeParse('data:x/1')
    expect(rejected.success).toBe(false)
    if (!rejected.success) {
      expect(rejected.error.issues[0]?.message).toContain('http/https/mailto/tel')
    }
  })

  it('省略 maxLength 时不限长但仍走白名单', () => {
    const schema = safeUrlSchema()
    expect(schema.safeParse(`/images/${'a'.repeat(3000)}.svg`).success).toBe(true)
    expect(schema.safeParse('javascript:alert(1)').success).toBe(false)
  })
})

describe('page-sections 协议级校验', () => {
  const cta = { type: 'cta', title: '联系我们' } as const

  it('ctaHref 拒绝 javascript:，接受相对路径/https/mailto，保留默认值', () => {
    expect(ctaSectionSchema.safeParse({ ...cta, ctaHref: 'javascript:alert(1)' }).success).toBe(false)
    expect(ctaSectionSchema.safeParse({ ...cta, ctaHref: 'JaVaScRiPt:alert(1)' }).success).toBe(false)
    expect(ctaSectionSchema.safeParse({ ...cta, ctaHref: 'data:text/html,<script>alert(1)</script>' }).success).toBe(false)
    expect(ctaSectionSchema.safeParse({ ...cta, ctaHref: '/contact' }).success).toBe(true)
    expect(ctaSectionSchema.safeParse({ ...cta, ctaHref: 'https://example.com/contact' }).success).toBe(true)
    expect(ctaSectionSchema.safeParse({ ...cta, ctaHref: 'mailto:hello@example.com' }).success).toBe(true)
    const parsed = ctaSectionSchema.safeParse(cta)
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.ctaHref).toBe('/contact')
    }
  })

  it('featureGrid icon 拒绝原型链键，接受注册表名字', () => {
    const section = { type: 'featureGrid', title: '网格', items: [{ title: '能力', description: '描述' }] }
    expect(
      featureGridSectionSchema.safeParse({
        ...section,
        items: [{ title: '能力', description: '描述', icon: 'toString' }],
      }).success,
    ).toBe(false)
    expect(
      featureGridSectionSchema.safeParse({
        ...section,
        items: [{ title: '能力', description: '描述', icon: 'constructor' }],
      }).success,
    ).toBe(false)
    expect(
      featureGridSectionSchema.safeParse({
        ...section,
        items: [{ title: '能力', description: '描述', icon: 'hasOwnProperty' }],
      }).success,
    ).toBe(false)
    expect(
      featureGridSectionSchema.safeParse({
        ...section,
        items: [{ title: '能力', description: '描述', icon: 'BookOpen' }],
      }).success,
    ).toBe(true)
  })
})

describe('menu-admin 协议级校验', () => {
  it('header 菜单各层 href 拒绝 javascript:，icon 拒绝原型链键', () => {
    expect(headerMenuSchema.safeParse([{ label: 'X', href: 'javascript:alert(1)' }]).success).toBe(false)
    expect(
      headerMenuSchema.safeParse([
        { label: 'X', href: '/x', columns: [{ title: 'C', links: [{ label: 'L', href: 'JaVaScRiPt:alert(1)' }] }] },
      ]).success,
    ).toBe(false)
    expect(
      headerMenuSchema.safeParse([
        { label: 'X', href: '/x', columns: [{ title: 'C', links: [{ label: 'L', href: '/l', icon: 'toString' }] }] },
      ]).success,
    ).toBe(false)
    expect(
      headerMenuSchema.safeParse([
        { label: 'X', href: '/x', features: [{ title: 'F', description: 'D', href: 'vbscript:msgbox(1)', icon: 'Rocket' }] },
      ]).success,
    ).toBe(false)
    expect(headerMenuSchema.safeParse([{ label: 'X', href: '/x' }]).success).toBe(true)
  })

  it('footer 菜单链接与社交 href 拒绝 javascript:', () => {
    expect(
      footerMenuSchema.safeParse({
        columns: [{ title: 'C', groups: [[{ label: 'L', href: 'javascript:alert(1)' }]] }],
        socials: [],
      }).success,
    ).toBe(false)
    expect(
      footerMenuSchema.safeParse({
        columns: [],
        socials: [{ label: 'S', href: 'javascript:alert(1)', path: 'M0 0h24v24H0z' }],
      }).success,
    ).toBe(false)
    expect(
      footerMenuSchema.safeParse({
        columns: [{ title: 'C', groups: [[{ label: 'L', href: 'https://example.com' }]] }],
        socials: [{ label: 'S', href: 'https://github.com', path: 'M0 0h24v24H0z' }],
      }).success,
    ).toBe(true)
  })
})

describe('内容写入协议的链接字段', () => {
  it('article image src 拒绝 javascript:/data:，接受相对路径', () => {
    expect(articleBlockSchema.safeParse({ type: 'image', src: 'javascript:alert(1)', alt: '图' }).success).toBe(false)
    expect(articleBlockSchema.safeParse({ type: 'image', src: 'data:image/svg+xml,<svg/>', alt: '图' }).success).toBe(false)
    expect(articleBlockSchema.safeParse({ type: 'image', src: '/images/a.svg', alt: '图' }).success).toBe(true)
  })

  it('report href 拒绝 javascript:，接受相对路径', () => {
    const report = {
      type: '白皮书',
      category: 'C',
      title: 'T',
      summary: 'S',
      image: '/images/r.png',
      sortOrder: 0,
    }
    expect(reportInputSchema.safeParse({ ...report, href: 'javascript:alert(1)' }).success).toBe(false)
    expect(reportInputSchema.safeParse({ ...report, href: '/reports/whitepaper' }).success).toBe(true)
  })

  it('case relatedProducts href 拒绝 javascript:，接受相对路径', () => {
    const base = {
      slug: 'demo-case',
      title: 'T',
      summary: 'S',
      image: '/images/c.png',
      sortOrder: 0,
      detailTitle: 'D',
      categoryKey: 'smart-water',
      heroImage: '/images/h.png',
      blocks: [{ type: 'paragraph', text: '正文' }],
    }
    expect(
      caseInputSchema.safeParse({
        ...base,
        relatedProducts: [{ name: 'N', desc: 'D', href: 'javascript:alert(1)' }],
      }).success,
    ).toBe(false)
    expect(
      caseInputSchema.safeParse({
        ...base,
        relatedProducts: [{ name: 'N', desc: 'D', href: '/products/ai-iot' }],
      }).success,
    ).toBe(true)
  })
})
