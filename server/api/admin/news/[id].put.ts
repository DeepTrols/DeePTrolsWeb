import { requireAdmin } from '../../../utils/admin'
import { newsInputSchema, updateNews } from '../../../utils/news-admin'

// PUT /api/admin/news/:id — 全量更新（字段 + blocks，status 流转同此入口）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const raw = getRouterParam(event, 'id')
  const id = Number(raw)
  if (!raw || !Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid news id' })
  }

  const parsed = newsInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid news input' })
  }

  const updated = await updateNews(id, parsed.data)
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'News not found' })
  }

  return { ok: true }
})
