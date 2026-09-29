import { requireAdmin } from '../../../utils/admin'
import { getAdminPage, listAdminPages } from '../../../utils/pages-admin'

// GET /api/admin/pages — 页面列表（含草稿）；无 DB 返回空表
// ?slug=<完整路径>（015.18c）：单页编辑载荷——slug='/' 时 /admin/pages/ 尾斜杠不命中 [...slug]，
// 接管页（当前仅首页）的读取改走本分支；语义与 [...slug].get.ts 一致（含草稿，未命中 404）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const slug = getQuery(event).slug
  if (typeof slug === 'string' && slug) {
    const page = await getAdminPage(slug)
    if (!page) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }
    return page
  }

  return await listAdminPages()
})
