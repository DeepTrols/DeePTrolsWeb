import { requireAdmin } from '../../../utils/admin'
import { footerMenuSchema, headerMenuSchema, menuKeySchema, upsertMenuItems } from '../../../utils/menu-admin'

// PUT /api/admin/menus/[key] — admin 整树覆盖写：zod 校验 400；无 DB/写入失败 503
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsedKey = menuKeySchema.safeParse(getRouterParam(event, 'key'))
  if (!parsedKey.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid menu key' })
  }
  const key = parsedKey.data

  const body = await readBody(event)
  const parsedItems = key === 'header' ? headerMenuSchema.safeParse(body?.items) : footerMenuSchema.safeParse(body?.items)
  if (!parsedItems.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid menu items' })
  }

  const ok = await upsertMenuItems(key, parsedItems.data)
  if (!ok) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  return { ok: true }
})
