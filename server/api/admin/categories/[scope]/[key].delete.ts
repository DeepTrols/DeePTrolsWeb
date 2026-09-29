import { requireAdmin } from '../../../../utils/admin'
import { categoryScopeSchema, countCategoryRefs, deleteCategory } from '../../../../utils/category-admin'

// DELETE /api/admin/categories/[scope]/[key] — 删除分类；被内容引用 409（statusMessage 附引用数）；未命中 404；无 DB 503
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsedScope = categoryScopeSchema.safeParse(getRouterParam(event, 'scope'))
  const key = getRouterParam(event, 'key')?.trim()
  if (!parsedScope.success || !key) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown category' })
  }

  const deleted = await deleteCategory(parsedScope.data, key)
  if (deleted === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }
  if (deleted === 'in-use') {
    const refs = (await countCategoryRefs(parsedScope.data, key)) ?? 0
    throw createError({ statusCode: 409, statusMessage: `Category in use (${refs} references)` })
  }
  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }
  return { ok: true }
})
