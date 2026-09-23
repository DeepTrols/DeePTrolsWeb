import { footerColumns, footerSocials } from '~/data/footer'
import { primaryNavigation } from '~/data/navigation'
import { getMenuItems, menuKeySchema } from '../utils/menu-admin'
import type { MenuKey } from '../utils/menu-admin'

// GET /api/navigation?key=header|footer — 公开读；DB 优先，未配置/未命中自动回退 data/ 静态快照
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const parsedKey = menuKeySchema.safeParse(query.key)
  if (!parsedKey.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid menu key' })
  }
  const key: MenuKey = parsedKey.data

  const record = await getMenuItems(key)
  if (record) {
    return record.items
  }

  return key === 'header' ? primaryNavigation : { columns: footerColumns, socials: footerSocials }
})
