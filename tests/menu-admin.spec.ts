import { describe, expect, it } from 'vitest'
import { footerColumns, footerSocials } from '../data/footer'
import { primaryNavigation } from '../data/navigation'
import { footerMenuSchema, headerMenuSchema, menuKeySchema, parseMenuItems } from '../server/utils/menu-admin'

describe('menuKeySchema', () => {
  it('只接受 header / footer', () => {
    expect(menuKeySchema.safeParse('header').success).toBe(true)
    expect(menuKeySchema.safeParse('footer').success).toBe(true)
    expect(menuKeySchema.safeParse('sidebar').success).toBe(false)
    expect(menuKeySchema.safeParse(undefined).success).toBe(false)
  })
})

describe('headerMenuSchema', () => {
  it('静态导航快照通过校验（含 icon 字符串与嵌套 groups）', () => {
    expect(headerMenuSchema.safeParse(primaryNavigation).success).toBe(true)
  })

  it('拒绝空数组与非法 layout', () => {
    expect(headerMenuSchema.safeParse([]).success).toBe(false)
    expect(headerMenuSchema.safeParse([{ label: 'X', href: '/x', layout: 'weird' }]).success).toBe(false)
  })

  it('拒绝未登记的 icon 名字', () => {
    const items = [{ label: 'X', href: '/x', columns: [{ title: 'C', links: [{ label: 'L', href: '/l', icon: 'NotARealIcon' }] }] }]
    expect(headerMenuSchema.safeParse(items).success).toBe(false)
  })

  it('拒绝缺 label/href 的链接', () => {
    expect(headerMenuSchema.safeParse([{ label: 'X' }]).success).toBe(false)
    expect(headerMenuSchema.safeParse([{ label: '', href: '/x' }]).success).toBe(false)
  })
})

describe('footerMenuSchema', () => {
  it('静态页脚快照通过校验', () => {
    expect(footerMenuSchema.safeParse({ columns: footerColumns, socials: footerSocials }).success).toBe(true)
  })

  it('拒绝缺 socials 或非法结构', () => {
    expect(footerMenuSchema.safeParse({ columns: footerColumns }).success).toBe(false)
    expect(footerMenuSchema.safeParse({ columns: 'nope', socials: [] }).success).toBe(false)
  })
})

describe('parseMenuItems', () => {
  it('按 key 分发校验，失败返回 null', () => {
    expect(parseMenuItems('header', primaryNavigation)).not.toBeNull()
    expect(parseMenuItems('footer', { columns: footerColumns, socials: footerSocials })).not.toBeNull()
    // 形状错配：header 数据喂给 footer 校验应失败
    expect(parseMenuItems('footer', primaryNavigation)).toBeNull()
    expect(parseMenuItems('header', { columns: footerColumns, socials: footerSocials })).toBeNull()
  })
})
