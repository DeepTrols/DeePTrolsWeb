import { requireAdmin } from '../../../utils/admin'
import { categoryScopeSchema, listAdminCategories } from '../../../utils/category-admin'

// GET /api/admin/categories?scope= — admin 列表（含引用计数）；无 DB 503；scope 非法 400
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsedScope = categoryScopeSchema.safeParse(getQuery(event).scope)
  if (!parsedScope.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid category scope' })
  }

  const records = await listAdminCategories(parsedScope.data)
  if (records === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }
  return records
})
