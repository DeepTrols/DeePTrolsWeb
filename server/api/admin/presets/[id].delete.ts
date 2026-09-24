import { requireAdmin } from '../../../utils/admin'
import { deletePreset } from '../../../utils/preset-admin'

// DELETE /api/admin/presets/<id> — 删除区块模板（未命中 404）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid preset id' })
  }

  const deleted = await deletePreset(id)
  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'Preset not found' })
  }

  return { ok: true }
})
