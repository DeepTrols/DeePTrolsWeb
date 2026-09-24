import { describe, expect, it } from 'vitest'
import { CUSTOM_SECTION_NAMES } from '../components/sections/custom-names'
import { CUSTOM_COMPONENT_META } from '../components/sections/custom-props'
import { listComponentRegistry, scanSectionUsage } from '../server/utils/component-admin'

describe('CUSTOM_COMPONENT_META（015.13 注册组件元数据）', () => {
  it('全名覆盖：每个注册名都有元数据', () => {
    for (const name of CUSTOM_SECTION_NAMES) {
      expect(CUSTOM_COMPONENT_META[name], `missing meta for ${name}`).toBeDefined()
      expect(CUSTOM_COMPONENT_META[name].label.length).toBeGreaterThan(0)
    }
  })

  it('fields.key 必须存在于 zod schema shape（描述符与校验同步）', () => {
    for (const name of CUSTOM_SECTION_NAMES) {
      const meta = CUSTOM_COMPONENT_META[name]
      const shape = meta.schema.shape as Record<string, unknown>
      for (const field of meta.fields) {
        expect(shape, `${name}.${field.key} not in schema`).toHaveProperty(field.key)
      }
    }
  })

  it('零 props 组件 schema 为空 strict 对象', () => {
    const zeroProps = ['DdpArchitecture', 'ContactFormSection', 'HomeCustomerLogos'] as const
    for (const name of zeroProps) {
      const meta = CUSTOM_COMPONENT_META[name]
      expect(meta.fields).toEqual([])
      expect(meta.schema.safeParse({}).success).toBe(true)
      expect(meta.schema.safeParse({ any: 'x' }).success).toBe(false)
    }
  })

  it('listComponentRegistry 输出 JSON 安全子集（不含 zod schema）', () => {
    const registry = listComponentRegistry()
    expect(registry).toHaveLength(CUSTOM_SECTION_NAMES.length)
    for (const entry of registry) {
      expect(entry).not.toHaveProperty('schema')
      expect(() => JSON.stringify(entry)).not.toThrow()
    }
  })
})

describe('scanSectionUsage（组件使用统计）', () => {
  it('统计标准型与定制组件（同页同组件只计一次，visible:false 也算）', () => {
    const usage = scanSectionUsage([
      {
        slug: '/a',
        sections: [
          { type: 'hero', title: 'x' },
          { type: 'custom', name: 'WhyEngine' },
          { type: 'custom', name: 'WhyEngine', visible: false },
        ],
      },
      {
        slug: '/b',
        sections: [{ type: 'custom', name: 'WhyEngine' }],
      },
      { slug: '/broken', sections: [{ type: 'nope' }] },
    ])
    expect(usage.hero).toEqual({ count: 1, slugs: ['/a'] })
    expect(usage.WhyEngine).toEqual({ count: 2, slugs: ['/a', '/b'] })
    expect(usage.nope).toBeUndefined()
  })

  it('空输入返回空表', () => {
    expect(scanSectionUsage([])).toEqual({})
  })
})
