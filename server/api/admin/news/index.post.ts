import { requireAdmin } from '../../../utils/admin'
import { assertFeaturedBudget } from '../../../utils/featured-limits'
import { createNews, newsInputSchema } from '../../../utils/news-admin'

// POST /api/admin/news — 新建新闻（默认草稿，id 自动顺延）；featured: true 过推荐位预算（015.15，超限 409）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = newsInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid news input' })
  }

  if (parsed.data.featured) {
    const budget = await assertFeaturedBudget('home')
    if (budget === null) {
      throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
    }
  }

  const id = await createNews(parsed.data)
  if (id === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }

  return { ok: true, id }
})
