import { requireAdmin } from '../../../utils/admin'
import { getAdminNews } from '../../../utils/news-admin'

// GET /api/admin/news/:id — 编辑载荷（含 blocks）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const raw = getRouterParam(event, 'id')
  const id = Number(raw)
  if (!raw || !Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid news id' })
  }

  const payload = await getAdminNews(id)
  if (!payload) {
    throw createError({ statusCode: 404, statusMessage: 'News not found' })
  }

  return payload
})
