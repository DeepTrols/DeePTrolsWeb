import { requireAdmin } from '../../../utils/admin'
import { caseSlugSchema, getAdminCase } from '../../../utils/cases-admin'

// GET /api/admin/cases/:slug — 编辑载荷（含 blocks/relatedProducts）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = caseSlugSchema.safeParse(getRouterParam(event, 'slug'))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid case slug' })
  }

  const payload = await getAdminCase(parsed.data)
  if (!payload) {
    throw createError({ statusCode: 404, statusMessage: 'Case not found' })
  }

  return payload
})
