import { requireAdmin } from '../../../utils/admin'
import { deletePage } from '../../../utils/pages-admin'

// DELETE /api/admin/pages/<slug...> — 删除页面
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const deleted = await deletePage(`/${getRouterParam(event, 'slug') ?? ''}`)
  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  return { ok: true }
})
