import { requireAdmin } from '../../../utils/admin'
import { listPresets } from '../../../utils/preset-admin'

// GET /api/admin/presets — 区块模板列表（无 DB 503）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const presets = await listPresets()
  if (!presets) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }
  return { presets }
})
