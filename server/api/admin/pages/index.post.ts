import { requireAdmin } from '../../../utils/admin'
import { createPage, pageInputSchema } from '../../../utils/pages-admin'

// POST /api/admin/pages — 新建 CMS 页（slug 冲突 409；保留路径/非法输入 400）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = pageInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid page input' })
  }

  const created = await createPage(parsed.data)
  if (created === 'conflict') {
    throw createError({ statusCode: 409, statusMessage: 'Page slug already exists' })
  }
  if (!created) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  return { slug: created }
})
