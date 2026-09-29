import { requireAdmin } from '../../../utils/admin'
import { assertCategoryExists } from '../../../utils/category-admin'
import { assertFeaturedBudget } from '../../../utils/featured-limits'
import { reportInputSchema, updateReport } from '../../../utils/reports-admin'

// PUT /api/admin/reports/:id — 全量更新（href 冲突 409）；featured: true 过推荐位预算（015.15，超限 409，排除自身）
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

  if (parsed.data.featured) {
    const budget = await assertFeaturedBudget('home', { reportId: id })
    if (budget === null) {
      throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
    }
  }

  // 分类软外键存在性校验（015.16，未知分类 400）：type 必填、solutionKey 可空；category 为自由文本不校验
  await assertCategoryExists('report-type', parsed.data.type)
  if (parsed.data.solutionKey) {
    await assertCategoryExists('solution', parsed.data.solutionKey)
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
