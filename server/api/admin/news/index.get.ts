import { requireAdmin } from '../../../utils/admin'
import { listAdminNews } from '../../../utils/news-admin'

// GET /api/admin/news — 新闻列表（含草稿）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return await listAdminNews()
})
