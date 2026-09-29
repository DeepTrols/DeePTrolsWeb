import { categoryScopeSchema, listCategories, staticCategoriesFor } from '../../utils/category-admin'

// GET /api/categories?scope=news-category|solution|report-type — 公开读（015.16）；
// DB 优先（含管理员清空后的空表），未配置 DB / 查询失败回退静态快照；source 标记数据来源供主站/后台诊断
export default defineEventHandler(async (event) => {
  const parsedScope = categoryScopeSchema.safeParse(getQuery(event).scope)
  if (!parsedScope.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid category scope' })
  }
  const scope = parsedScope.data

  const items = await listCategories(scope)
  if (items) {
    return { scope, items, source: 'db' as const }
  }
  return { scope, items: staticCategoriesFor(scope), source: 'static' as const }
})
