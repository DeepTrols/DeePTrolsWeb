import { resolveSolutionCases, solutionCasePageKeySchema } from '../../../utils/solution-cases-admin'

// GET /api/solutions/[key]/cases — 公开读方案页案例推荐（015.17）：
// DB picks 优先，未配置/未命中/失败自动回退静态快照（永不 503，主站 SSR 不挂）
export default defineEventHandler(async (event) => {
  const parsedKey = solutionCasePageKeySchema.safeParse(getRouterParam(event, 'key'))
  if (!parsedKey.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid solution case key' })
  }
  const key = parsedKey.data

  const result = await resolveSolutionCases(key)
  return { key, items: result.items, source: result.source }
})
