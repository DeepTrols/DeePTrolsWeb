import { requireAdmin } from '../../../utils/admin'
import { caseInputSchema, createCase } from '../../../utils/cases-admin'

// POST /api/admin/cases — 新建案例（默认草稿；slug 冲突 409）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = caseInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid case input' })
  }

  const created = await createCase(parsed.data)
  if (created === 'conflict') {
    throw createError({ statusCode: 409, statusMessage: 'Case slug already exists' })
  }
  if (created === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }

  return { ok: true, slug: created }
})
