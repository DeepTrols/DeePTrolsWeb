import { requireAdmin } from '../../../utils/admin'
import { reportInputSchema, updateReport } from '../../../utils/reports-admin'

// PUT /api/admin/reports/:id — 全量更新（href 冲突 409）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const raw = getRouterParam(event, 'id')
  const id = Number(raw)
  if (!raw || !Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid report id' })
  }

  const parsed = reportInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid report input' })
  }

  const updated = await updateReport(id, parsed.data)
  if (updated === 'conflict') {
    throw createError({ statusCode: 409, statusMessage: 'Report href already exists' })
  }
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Report not found' })
  }

  return { ok: true }
})
