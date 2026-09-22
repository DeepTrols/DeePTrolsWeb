import { z } from 'zod'
import { requireAdmin } from '../../../utils/admin'
import { leadStatusSchema, updateLeadStatus } from '../../../utils/leads-admin'

// PATCH /api/admin/leads/:id — 线索状态流转（new/followed/closed）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const raw = getRouterParam(event, 'id')
  const id = Number(raw)
  if (!raw || !Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid lead id' })
  }

  const parsed = z.object({ status: leadStatusSchema }).safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid lead status' })
  }

  const updated = await updateLeadStatus(id, parsed.data.status)
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Lead not found' })
  }

  return { ok: true }
})
