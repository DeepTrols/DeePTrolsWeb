import { requireAdmin } from '../../../../utils/admin'
import { categoryScopeSchema, categoryUpdateSchema, updateCategory } from '../../../../utils/category-admin'

// PUT /api/admin/categories/[scope]/[key] — 更新 label/sortOrder（主键 scope+key 不可改）；body 校验 400；未命中 404；无 DB 503
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsedScope = categoryScopeSchema.safeParse(getRouterParam(event, 'scope'))
  const key = getRouterParam(event, 'key')?.trim()
  if (!parsedScope.success || !key) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown category' })
  }

  const parsed = categoryUpdateSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid category payload' })
  }

  const updated = await updateCategory(parsedScope.data, key, parsed.data)
  if (updated === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }
  return { ok: true }
})
