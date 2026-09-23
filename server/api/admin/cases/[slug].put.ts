import { requireAdmin } from '../../../utils/admin'
import { caseSlugSchema, caseUpdateSchema, updateCase } from '../../../utils/cases-admin'

// PUT /api/admin/cases/:slug — 全量更新（slug 不可改）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const slugParsed = caseSlugSchema.safeParse(getRouterParam(event, 'slug'))
  if (!slugParsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid case slug' })
  }

  const parsed = caseUpdateSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid case input' })
  }

  const updated = await updateCase(slugParsed.data, parsed.data)
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Case not found' })
  }

  return { ok: true }
})
