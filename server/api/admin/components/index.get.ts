import { requireAdmin } from '../../../utils/admin'
import { getComponentUsage, getDisabledComponents, listComponentRegistry, listHeroVisuals } from '../../../utils/component-admin'

// GET /api/admin/components — 组件启停清单 + 注册组件发现 + 使用统计（015.13）+ hero 视觉白名单（015.18）
// disabled：DB 优先，未入库时 source:'static'（全启用）；registry/usage/heroVisuals 恒返回（无 DB 时 usage 为 {}）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const registry = listComponentRegistry()
  const heroVisuals = listHeroVisuals()
  const usage = await getComponentUsage()
  const record = await getDisabledComponents()
  if (record) {
    return { disabled: record.disabled, updatedAt: record.updatedAt, source: 'db' as const, registry, usage, heroVisuals }
  }
  return { disabled: [], updatedAt: null, source: 'static' as const, registry, usage, heroVisuals }
})
