import { caseSlugFromHref, staticSolutionCaseFallback } from '~/data/solution-case-picks'
import { requireAdmin } from '../../../../utils/admin'
import { getSolutionCasePicks, solutionCasePageKeySchema } from '../../../../utils/solution-cases-admin'

// GET /api/admin/solutions/[key]/cases — admin 读方案页案例推荐（015.17）：
// DB 优先；未入库时回退静态快照（slug 列表），编辑器从当前生效内容开始改（照抄 showcase GET 语义）
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsedKey = solutionCasePageKeySchema.safeParse(getRouterParam(event, 'key'))
  if (!parsedKey.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid solution case key' })
  }
  const key = parsedKey.data

  const record = await getSolutionCasePicks(key)
  if (record) {
    return { key, items: record.items, updatedAt: record.updatedAt, source: 'db' as const }
  }

  return {
    key,
    items: staticSolutionCaseFallback(key).map(item => caseSlugFromHref(item.href)),
    updatedAt: null,
    source: 'static' as const,
  }
})
