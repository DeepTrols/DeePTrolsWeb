import { requireAdmin } from '../../../utils/admin'
import { listAdminReports } from '../../../utils/reports-admin'

// GET /api/admin/reports — 报告列表（含草稿）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return await listAdminReports()
})
