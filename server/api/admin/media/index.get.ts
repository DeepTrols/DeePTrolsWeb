import { requireAdmin } from '../../../utils/admin'
import { listMedia } from '../../../utils/media-admin'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return await listMedia()
})
