import { z } from 'zod'
import { requireAdmin } from '../../../utils/admin'
import { pageSlugSchema, pageUpdateSchema, updatePage } from '../../../utils/pages-admin'

// PUT /api/admin/pages — body 带 slug 的全量更新（015.18c）：slug='/' 的接管页无法经
// /admin/pages/ 尾斜杠命中 [...slug].put.ts，改走本路由；其余 slug 也可使用（与 [...slug].put.ts 同语义）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = z
    .object({ slug: pageSlugSchema })
    .passthrough()
    .safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid page input' })
  }
  const update = pageUpdateSchema.safeParse(parsed.data)
  if (!update.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid page input' })
  }

  const updated = await updatePage(parsed.data.slug, update.data)
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  return { ok: true }
})
