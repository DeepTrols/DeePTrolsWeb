import { requireAdmin } from '../../../utils/admin'
import { getDisabledComponents } from '../../../utils/component-admin'

// GET /api/admin/components — 组件启停清单：DB 优先，未入库时 source:'static'（全启用）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const record = await getDisabledComponents()
  if (record) {
    return { disabled: record.disabled, updatedAt: record.updatedAt, source: 'db' as const }
  }
  return { disabled: [], updatedAt: null, source: 'static' as const }
})
