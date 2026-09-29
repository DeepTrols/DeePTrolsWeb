import { requireAdmin } from '../../../../utils/admin'
import { putSolutionCasePicks, solutionCasePageKeySchema, solutionCasePicksSchema } from '../../../../utils/solution-cases-admin'

// PUT /api/admin/solutions/[key]/cases — admin 整列覆盖写（015.17）：
// key/载荷 zod 校验 400；未知案例 slug 由 putSolutionCasePicks 抛 400；无 DB 503；写入异常记录日志后抛出 → 500
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsedKey = solutionCasePageKeySchema.safeParse(getRouterParam(event, 'key'))
  if (!parsedKey.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid solution case key' })
  }
  const key = parsedKey.data

  const body = await readBody(event)
  const parsedItems = solutionCasePicksSchema.safeParse(body?.items)
  if (!parsedItems.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid solution case picks' })
  }

  const ok = await putSolutionCasePicks(key, parsedItems.data)
  if (!ok) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  return { ok: true }
})
