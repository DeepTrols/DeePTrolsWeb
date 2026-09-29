import { requireAdmin } from '../../../utils/admin'
import { categoryInputSchema, createCategory } from '../../../utils/category-admin'

// POST /api/admin/categories — 新建分类；body 校验 400；同 scope+key 已存在 409；无 DB 503
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsed = categoryInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid category payload' })
  }

  const created = await createCategory(parsed.data)
  if (created === null) {
    throw createError({ statusCode: 503, statusMessage: 'Database not configured' })
  }
  if (created === 'conflict') {
    throw createError({ statusCode: 409, statusMessage: 'Category already exists' })
  }
  return { ok: true }
})
