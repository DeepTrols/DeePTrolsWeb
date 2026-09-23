import { footerColumns, footerSocials } from '~/data/footer'
import { primaryNavigation } from '~/data/navigation'
import { requireAdmin } from '../../../utils/admin'
import { getMenuItems, menuKeySchema } from '../../../utils/menu-admin'

// GET /api/admin/menus/[key] — admin 读菜单：DB 优先，未入库时回退静态快照（编辑器从当前内容开始改）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsedKey = menuKeySchema.safeParse(getRouterParam(event, 'key'))
  if (!parsedKey.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid menu key' })
  }
  const key = parsedKey.data

  const record = await getMenuItems(key)
  if (record) {
    return { key, items: record.items, updatedAt: record.updatedAt, source: 'db' as const }
  }

  const items = key === 'header' ? primaryNavigation : { columns: footerColumns, socials: footerSocials }
  return { key, items, updatedAt: null, source: 'static' as const }
})
