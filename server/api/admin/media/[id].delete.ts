import { requireAdmin } from '../../../utils/admin'
import { deleteMediaRecord } from '../../../utils/media-admin'
import { createLocalStorageDriver } from '../../../utils/storage'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid media id' })
  }

  const path = await deleteMediaRecord(id)
  if (!path) {
    throw createError({ statusCode: 404, statusMessage: 'Media not found' })
  }

  await createLocalStorageDriver().delete(path)
  return { ok: true }
})
