import { requireAdmin } from '../../../utils/admin'
import { getAdminPage } from '../../../utils/pages-admin'

// GET /api/admin/pages/<slug...> — 单页编辑载荷（含草稿）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const page = await getAdminPage(`/${getRouterParam(event, 'slug') ?? ''}`)
  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }
  return page
})
