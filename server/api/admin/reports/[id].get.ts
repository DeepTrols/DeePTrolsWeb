import { requireAdmin } from '../../../utils/admin'
import { getAdminReport } from '../../../utils/reports-admin'

// GET /api/admin/reports/:id — 编辑载荷
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const raw = getRouterParam(event, 'id')
  const id = Number(raw)
  if (!raw || !Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid report id' })
  }

  const payload = await getAdminReport(id)
  if (!payload) {
    throw createError({ statusCode: 404, statusMessage: 'Report not found' })
  }

  return payload
})
