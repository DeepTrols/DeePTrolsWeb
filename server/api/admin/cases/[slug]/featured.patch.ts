import { z } from 'zod'
import { requireAdmin } from '../../../../utils/admin'
import { caseSlugSchema, setCaseFeatured } from '../../../../utils/cases-admin'
import { assertFeaturedBudget } from '../../../../utils/featured-limits'

// PATCH /api/admin/cases/:slug/featured — 案例精选推荐单列切换（015.15，镜像 audit#16 news/reports 版）
// 置 true 前过推荐位预算：cases.featured 超 3 → 409 硬限制
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const slugParsed = caseSlugSchema.safeParse(getRouterParam(event, 'slug'))
  if (!slugParsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid case slug' })
  }
  const slug = slugParsed.data

  const parsed = z.object({ featured: z.boolean() }).safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid featured payload' })
  }

  if (parsed.data.featured) {
    // 排除自身：已推荐的案例重复置 true 不再占用预算
    const budget = await assertFeaturedBudget('cases', { caseSlug: slug })
    if (budget === null) {
      throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
    }
  }

  const updated = await setCaseFeatured(slug, parsed.data.featured)
  if (updated === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Case not found' })
  }

  return { ok: true }
})
