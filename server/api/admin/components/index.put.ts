import { requireAdmin } from '../../../utils/admin'
import { disabledComponentsSchema, setDisabledComponents } from '../../../utils/component-admin'

// PUT /api/admin/components — 组件启停整表覆盖写：zod 校验 400；无 DB/写入失败 503
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody(event)
  const parsed = disabledComponentsSchema.safeParse(body?.disabled)
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid component list' })
  }

  const ok = await setDisabledComponents(parsed.data)
  if (!ok) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  return { ok: true }
})
