import { requireAdmin } from '../../../utils/admin'
import { pageUpdateSchema, updatePage } from '../../../utils/pages-admin'

// PUT /api/admin/pages/<slug...> — 全量更新（slug 主键不可变，协议层 omit）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = pageUpdateSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid page input' })
  }

  const updated = await updatePage(`/${getRouterParam(event, 'slug') ?? ''}`, parsed.data)
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  return { ok: true }
})
