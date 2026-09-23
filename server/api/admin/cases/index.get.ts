import { requireAdmin } from '../../../utils/admin'
import { listAdminCases } from '../../../utils/cases-admin'

// GET /api/admin/cases — 案例列表（含草稿）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return await listAdminCases()
})
