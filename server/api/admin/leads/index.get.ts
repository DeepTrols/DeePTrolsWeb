import { requireAdmin } from '../../../utils/admin'
import { listLeads } from '../../../utils/leads-admin'

// GET /api/admin/leads — 线索列表（最新在前）；未配置 DB 返回空表
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return await listLeads()
})
