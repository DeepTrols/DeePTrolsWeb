import { describe, expect, it } from 'vitest'
import { presetInputSchema } from '../server/utils/preset-admin'

describe('presetInputSchema（015.13 区块模板协议）', () => {
  it('接受合法模板并补默认 description', () => {
    const parsed = presetInputSchema.safeParse({
      name: '首页 CTA',
      section: { type: 'cta', title: '行动起来' },
    })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.description).toBe('')
      expect(parsed.data.section.type).toBe('cta')
    }
  })

  it('拒绝空名称/超长描述/非法 section', () => {
    expect(
      presetInputSchema.safeParse({
        name: '',
        section: { type: 'cta', title: 'x' },
      }).success,
    ).toBe(false)
    expect(
      presetInputSchema.safeParse({
        name: 'x',
        description: 'x'.repeat(501),
        section: { type: 'cta', title: 'x' },
      }).success,
    ).toBe(false)
    expect(
      presetInputSchema.safeParse({ name: 'x', section: { type: 'nope' } }).success,
    ).toBe(false)
    expect(
      presetInputSchema.safeParse({ name: 'x', section: { type: 'cta' } }).success,
    ).toBe(false)
  })

  it('section 支持 custom + props', () => {
    const parsed = presetInputSchema.safeParse({
      name: '文本块模板',
      section: {
        type: 'custom',
        name: 'AboutTextBlock',
        props: { paragraphs: ['段落一'] },
      },
    })
    expect(parsed.success).toBe(true)
  })
})
