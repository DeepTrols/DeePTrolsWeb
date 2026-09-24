import { requireAdmin } from '../../../utils/admin'
import { presetInputSchema, updatePreset } from '../../../utils/preset-admin'

// PUT /api/admin/presets/<id> — 更新区块模板（未命中 404；非法输入 400）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid preset id' })
  }

  const parsed = presetInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid preset input' })
  }

  const updated = await updatePreset(id, parsed.data)
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Preset not found' })
  }

  return { ok: true }
})
