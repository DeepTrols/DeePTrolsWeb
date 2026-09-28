import { requireAdmin } from '../../../utils/admin'
import { putShowcase, showcaseItemsSchema, showcaseKeySchema } from '../../../utils/showcase-admin'

// PUT /api/admin/showcase/[key] — admin 整列覆盖写：zod 校验 400；无 DB 503；写入异常由 showcase-admin 记录日志后抛出 → 500
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsedKey = showcaseKeySchema.safeParse(getRouterParam(event, 'key'))
  if (!parsedKey.success) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown showcase key' })
  }
  const key = parsedKey.data

  const body = await readBody(event)
  const parsedItems = showcaseItemsSchema(key).safeParse(body?.items)
  if (!parsedItems.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid showcase items' })
  }

  const ok = await putShowcase(key, parsedItems.data)
  if (!ok) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  return { ok: true }
})
