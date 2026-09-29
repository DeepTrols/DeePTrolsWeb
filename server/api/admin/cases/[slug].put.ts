import { requireAdmin } from '../../../utils/admin'
import { caseSlugSchema, caseUpdateSchema, updateCase } from '../../../utils/cases-admin'
import { assertCategoryExists } from '../../../utils/category-admin'
import { assertFeaturedBudget } from '../../../utils/featured-limits'

// PUT /api/admin/cases/:slug — 全量更新（slug 不可改）；featured: true 过推荐位预算（015.15，超限 409，排除自身）
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

  if (parsed.data.featured) {
    const budget = await assertFeaturedBudget('cases', { caseSlug: slugParsed.data })
    if (budget === null) {
      throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
    }
  }

  // 行业分类软外键存在性校验（015.16，未知分类 400）：solutionKey 可空，categoryKey 必填
  if (parsed.data.solutionKey) {
    await assertCategoryExists('solution', parsed.data.solutionKey)
  }
  await assertCategoryExists('solution', parsed.data.categoryKey)

  const updated = await updateCase(slugParsed.data, parsed.data)
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Case not found' })
  }

  return { ok: true }
})
