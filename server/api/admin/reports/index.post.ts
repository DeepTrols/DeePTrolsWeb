import { requireAdmin } from '../../../utils/admin'
import { assertCategoryExists } from '../../../utils/category-admin'
import { assertFeaturedBudget } from '../../../utils/featured-limits'
import { createReport, reportInputSchema } from '../../../utils/reports-admin'

// POST /api/admin/reports — 新建报告（默认草稿；href 冲突 409）；featured: true 过推荐位预算（015.15，超限 409）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = reportInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid report input' })
  }

  if (parsed.data.featured) {
    const budget = await assertFeaturedBudget('home')
    if (budget === null) {
      throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
    }
  }

  // 分类软外键存在性校验（015.16，未知分类 400）：type 必填、solutionKey 可空；category 为自由文本不校验
  await assertCategoryExists('report-type', parsed.data.type)
  if (parsed.data.solutionKey) {
    await assertCategoryExists('solution', parsed.data.solutionKey)
  }

  const created = await createReport(parsed.data)
  if (created === 'conflict') {
    throw createError({ statusCode: 409, statusMessage: 'Report href already exists' })
  }
  if (created === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }

  return { ok: true, id: created }
})
