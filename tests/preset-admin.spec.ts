import { describe, expect, it } from 'vitest'
import { presetInputSchema } from '../server/utils/preset-admin'

describe('presetInputSchema（015.13 区块模板协议，015.19c 升级为多区块组合）', () => {
  it('接受合法模板并补默认 description', () => {
    const parsed = presetInputSchema.safeParse({
      name: '首页 CTA',
      sections: [{ type: 'cta', title: '行动起来' }],
    })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.description).toBe('')
      expect(parsed.data.sections[0]?.type).toBe('cta')
    }
  })

  it('拒绝空名称/超长描述/非法 section/空区块数组', () => {
    expect(
      presetInputSchema.safeParse({
        name: '',
        sections: [{ type: 'cta', title: 'x' }],
      }).success,
    ).toBe(false)
    expect(
      presetInputSchema.safeParse({
        name: 'x',
        description: 'x'.repeat(501),
        sections: [{ type: 'cta', title: 'x' }],
      }).success,
    ).toBe(false)
    expect(
      presetInputSchema.safeParse({ name: 'x', sections: [{ type: 'nope' }] }).success,
    ).toBe(false)
    expect(
      presetInputSchema.safeParse({ name: 'x', sections: [{ type: 'cta' }] }).success,
    ).toBe(false)
    expect(presetInputSchema.safeParse({ name: 'x', sections: [] }).success).toBe(false)
  })

  it('复用页面级约束：模板含 2 个 hero → 拒绝（hero≤1）', () => {
    const hero = {
      type: 'hero',
      variant: 'banner-dark',
      title: 't',
      backgroundImage: '/images/x.webp',
    } as const
    // 单 hero 且字段齐全 → 合法，证明下面失败确因 hero≤1
    expect(presetInputSchema.safeParse({ name: '单 hero', sections: [hero] }).success).toBe(true)
    expect(
      presetInputSchema.safeParse({
        name: '双 hero',
        sections: [hero, hero],
      }).success,
    ).toBe(false)
  })

  it('sections 支持 custom + props', () => {
    const parsed = presetInputSchema.safeParse({
      name: '文本块模板',
      sections: [
        {
          type: 'custom',
          name: 'AboutTextBlock',
          props: { paragraphs: ['段落一'] },
        },
      ],
    })
    expect(parsed.success).toBe(true)
  })
})
