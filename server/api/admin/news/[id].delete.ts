import { requireAdmin } from '../../../utils/admin'
import { deleteNews } from '../../../utils/news-admin'

// DELETE /api/admin/news/:id — 删除（详情行级联）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const raw = getRouterParam(event, 'id')
  const id = Number(raw)
  if (!raw || !Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid news id' })
  }

  const deleted = await deleteNews(id)
  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'News not found' })
  }

  return { ok: true }
})
