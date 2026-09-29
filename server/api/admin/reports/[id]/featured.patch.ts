import { z } from 'zod'
import { requireAdmin } from '../../../../utils/admin'
import { assertFeaturedBudget } from '../../../../utils/featured-limits'
import { setReportFeatured } from '../../../../utils/reports-admin'

// PATCH /api/admin/reports/:id/featured — 首页推荐单列切换（不走整条 PUT 读改写；审计#16）
// 置 true 前过推荐位预算（015.15）：news+reports featured 合计超 4 → 409 硬限制
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

  if (parsed.data.featured) {
    // 排除自身：已推荐的报告重复置 true 不再占用预算
    const budget = await assertFeaturedBudget('home', { reportId: id })
    if (budget === null) {
      throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
    }
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
