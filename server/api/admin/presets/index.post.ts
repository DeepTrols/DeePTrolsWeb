import { requireAdmin } from '../../../utils/admin'
import { createPreset, presetInputSchema } from '../../../utils/preset-admin'

// POST /api/admin/presets — 新建区块模板（非法输入 400；无 DB 503）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = presetInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid preset input' })
  }

  const id = await createPreset(parsed.data)
  if (id === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  return { id }
})
