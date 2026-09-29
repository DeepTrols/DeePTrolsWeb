import { requireAdmin } from '../../../utils/admin'
import { caseInputSchema, createCase } from '../../../utils/cases-admin'
import { assertCategoryExists } from '../../../utils/category-admin'
import { assertFeaturedBudget } from '../../../utils/featured-limits'

// POST /api/admin/cases — 新建案例（默认草稿；slug 冲突 409）；featured: true 过推荐位预算（015.15，超限 409）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = caseInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid case input' })
  }

  if (parsed.data.featured) {
    const budget = await assertFeaturedBudget('cases')
    if (budget === null) {
      throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
    }
  }

  // 行业分类软外键存在性校验（015.16，未知分类 400）：solutionKey 可空，categoryKey 必填
  if (parsed.data.solutionKey) {
    await assertCategoryExists('solution', parsed.data.solutionKey)
  }
  await assertCategoryExists('solution', parsed.data.categoryKey)

  const created = await createCase(parsed.data)
  if (created === 'conflict') {
    throw createError({ statusCode: 409, statusMessage: 'Case slug already exists' })
  }
  if (created === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }

  return { ok: true, slug: created }
})
