import { requireAdmin } from '../../../utils/admin'
import { deleteReport } from '../../../utils/reports-admin'

// DELETE /api/admin/reports/:id — 删除
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const raw = getRouterParam(event, 'id')
  const id = Number(raw)
  if (!raw || !Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid report id' })
  }

  const deleted = await deleteReport(id)
  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'Report not found' })
  }

  return { ok: true }
})
