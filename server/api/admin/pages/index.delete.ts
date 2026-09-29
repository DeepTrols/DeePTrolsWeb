import { requireAdmin } from '../../../utils/admin'
import { deletePage, pageSlugSchema } from '../../../utils/pages-admin'

// DELETE /api/admin/pages?slug=<完整路径> — 015.18c：slug='/' 的接管页（取消接管）无法经
// /admin/pages/ 尾斜杠命中 [...slug].delete.ts，改走本路由；命中行删除，未命中 404
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = pageSlugSchema.safeParse(getQuery(event).slug)
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid page slug' })
  }

  const deleted = await deletePage(parsed.data)
  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  return { ok: true }
})
