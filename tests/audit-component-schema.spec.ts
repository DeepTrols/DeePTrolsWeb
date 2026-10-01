import { describe, expect, it } from 'vitest'
import { PAGE_COMPONENT_IDS, disabledComponentsSchema } from '../server/utils/component-admin'

/**
 * 审计#19：disabledComponentsSchema 行为级测试（此前仅有源码文本合同，见 scripts/harness/checks/backend-admin.mjs）。
 * 实现语义（server/utils/component-admin.ts，只读）：
 * - z.array(z.string().trim().min(1).max(50)).max(100) + refine 全量成员必须命中 knownIds（PAGE_COMPONENT_IDS）。
 * - 元素先 trim 再校验，因此 refine 的已知 id 判断作用于 trim 后的值，parse 结果也是 trim 后的值。
 * - 重复 id：不去重、不拒绝——数组原样透传（按实现断言）。
 */

function parse(input: unknown) {
  return disabledComponentsSchema.safeParse(input)
}

describe('disabledComponentsSchema（审计#19：组件禁用清单 zod 行为）', () => {
  it('合法输入通过：空数组 / 标准 type / 全部已知 id', () => {
    expect(parse([])).toMatchObject({ success: true, data: [] })
    const single = parse(['hero', 'cta', 'custom'])
    expect(single.success).toBe(true)
    expect(single.data).toEqual(['hero', 'cta', 'custom'])

    const all = parse([...PAGE_COMPONENT_IDS])
    expect(all.success).toBe(true)
    expect(all.data).toEqual([...PAGE_COMPONENT_IDS])
  })

  it('每个已知组件 id 单独提交均通过（8 标准 type + 定制组件名注册表同步）', () => {
    for (const id of PAGE_COMPONENT_IDS) {
      const parsed = parse([id])
      expect(parsed.success, `known id rejected: ${id}`).toBe(true)
      expect(parsed.data).toEqual([id])
    }
  })

  it('trim 语义：首尾空白去除后再匹配已知 id，data 为 trim 后的值', () => {
    const parsed = parse(['  hero  ', '\tcta\n'])
    expect(parsed.success).toBe(true)
    expect(parsed.data).toEqual(['hero', 'cta'])
  })

  it('未知组件 id 拒绝：refine 报 Unknown component id，大小写敏感，混合合法项也整体拒绝', () => {
    const unknown = parse(['nope'])
    expect(unknown.success).toBe(false)
    if (!unknown.success) {
      expect(unknown.error.issues[0]?.message).toBe('Unknown component id')
      // refine 失败作用于数组整体（非单个元素路径）
      expect(unknown.error.issues[0]?.path).toEqual([])
    }

    expect(parse(['Hero']).success).toBe(false)
    expect(parse(['HERO']).success).toBe(false)
    expect(parse(['NotAComponent']).success).toBe(false)
    expect(parse(['hero', 'bogus']).success).toBe(false)
  })

  it('数量上限：恰 100 项通过，101 项拒绝', () => {
    expect(parse(Array.from({ length: 100 }, () => 'hero')).success).toBe(true)
    expect(parse(Array.from({ length: 101 }, () => 'hero')).success).toBe(false)
  })

  it('重复 id 语义（按实现）：不去重、不拒绝，重复项原样保留', () => {
    const parsed = parse(['hero', 'hero', 'cta'])
    expect(parsed.success).toBe(true)
    expect(parsed.data).toEqual(['hero', 'hero', 'cta'])
  })

  it('非数组拒绝：字符串 / 数字 / null / undefined / 对象', () => {
    for (const invalid of ['hero', 'hero,cta', 42, null, undefined, {}, { 0: 'hero', length: 1 }]) {
      expect(parse(invalid).success, `should reject: ${JSON.stringify(invalid)}`).toBe(false)
    }
  })

  it('元素边界：空串 / 纯空白（trim 后为空）/ 超 50 字符 / 非字符串元素均拒绝', () => {
    expect(parse(['']).success).toBe(false)
    expect(parse(['   ']).success).toBe(false)
    expect(parse(['x'.repeat(51)]).success).toBe(false)

    const wrongType = parse([42])
    expect(wrongType.success).toBe(false)
    if (!wrongType.success) {
      // 元素级失败：错误路径指向具体下标（先于 refine 触发）
      expect(wrongType.error.issues[0]?.path).toEqual([0])
    }
    expect(parse([null]).success).toBe(false)
    expect(parse([{ id: 'hero' }]).success).toBe(false)
    expect(parse(['hero', 42]).success).toBe(false)
  })
})
