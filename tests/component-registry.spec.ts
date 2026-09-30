import { describe, expect, it } from 'vitest'
import type { ComponentFieldMeta } from '../components/sections/custom-props'
import { CUSTOM_SECTION_NAMES } from '../components/sections/custom-names'
import { CUSTOM_COMPONENT_META } from '../components/sections/custom-props'
import { listComponentRegistry, scanSectionUsage } from '../server/utils/component-admin'

/** list 字段空白行（满足子字段 required 与嵌套 list 下限），用于 min/max 与 zod 一致性断言 */
function blankValue(field: ComponentFieldMeta): unknown {
  if (field.itemType === 'number') {
    return 0
  }
  if (field.itemType === 'string') {
    return 'x'
  }
  const row: Record<string, unknown> = {}
  for (const sub of field.itemFields ?? []) {
    if (sub.type === 'list') {
      const count = sub.minItems ?? 1
      row[sub.key] = Array.from({ length: count }, () => blankValue(sub))
    }
    else if (sub.type === 'number') {
      row[sub.key] = 0
    }
    else if (sub.type === 'boolean') {
      row[sub.key] = false
    }
    else if (sub.type === 'select' && sub.options?.length) {
      row[sub.key] = sub.options[0]?.value ?? 'x'
    }
    else {
      row[sub.key] = 'x'
    }
  }
  return row
}

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
    const zeroProps = ['DdpArchitecture', 'ContactFormSection', 'HomeCustomerLogos', 'AboutHero'] as const
    for (const name of zeroProps) {
      const meta = CUSTOM_COMPONENT_META[name]
      expect(meta.fields).toEqual([])
      expect(meta.schema.safeParse({}).success).toBe(true)
      expect(meta.schema.safeParse({ any: 'x' }).success).toBe(false)
    }
  })

  it('list 字段（015.20a）：fallback JSON 安全且过自身 schema；min/max 与 zod 一致', () => {
    for (const name of CUSTOM_SECTION_NAMES) {
      const meta = CUSTOM_COMPONENT_META[name]
      for (const field of meta.fields) {
        if (field.type !== 'list') {
          continue
        }
        if (field.fallback !== undefined) {
          expect(() => JSON.stringify(field.fallback), `${name}.${field.key} fallback 非 JSON 安全`).not.toThrow()
          expect(
            meta.schema.safeParse({ [field.key]: field.fallback }).success,
            `${name}.${field.key} fallback 未过自身 schema`,
          ).toBe(true)
        }
        if (field.maxItems !== undefined) {
          const over = Array.from({ length: field.maxItems + 1 }, () => blankValue(field))
          expect(
            meta.schema.safeParse({ [field.key]: over }).success,
            `${name}.${field.key} maxItems 与 zod max 不一致`,
          ).toBe(false)
        }
        if (field.minItems !== undefined && field.minItems > 0) {
          const under = Array.from({ length: field.minItems - 1 }, () => blankValue(field))
          expect(
            meta.schema.safeParse({ [field.key]: under }).success,
            `${name}.${field.key} minItems 与 zod min 不一致`,
          ).toBe(false)
        }
      }
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
