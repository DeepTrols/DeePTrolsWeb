import { requireAdmin } from '../../../utils/admin'
import { caseSlugSchema, deleteCase } from '../../../utils/cases-admin'

// DELETE /api/admin/cases/:slug — 删除（详情行级联）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = caseSlugSchema.safeParse(getRouterParam(event, 'slug'))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid case slug' })
  }

  const deleted = await deleteCase(parsed.data)
  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'Case not found' })
  }

  return { ok: true }
})
