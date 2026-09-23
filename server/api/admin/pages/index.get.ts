import { requireAdmin } from '../../../utils/admin'
import { listAdminPages } from '../../../utils/pages-admin'

// GET /api/admin/pages — 页面列表（含草稿）；无 DB 返回空表
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return await listAdminPages()
})
