import { z } from 'zod'
import { requireAdmin } from '../../../../utils/admin'
import { setReportFeatured } from '../../../../utils/reports-admin'

// PATCH /api/admin/reports/:id/featured — 首页推荐单列切换（不走整条 PUT 读改写；审计#16）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const raw = getRouterParam(event, 'id')
  const id = Number(raw)
  if (!raw || !Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid report id' })
  }

  const parsed = z.object({ featured: z.boolean() }).safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid featured payload' })
  }

  const updated = await setReportFeatured(id, parsed.data.featured)
  if (updated === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Report not found' })
  }

  return { ok: true }
})
