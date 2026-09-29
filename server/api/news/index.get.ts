import { listNewsItems } from '../../utils/news-repo'

// GET /api/news?category=<key> — 公开读；DB 未配置时自动回退静态数据
// 015.16：分类动态化后 key 不再限静态三值——任意 ≤50 字符串透传 repo 等值过滤（未知 key 得空表）
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = typeof query.category === 'string' && query.category.trim().length > 0 && query.category.length <= 50
    ? query.category
    : undefined

  return await listNewsItems(category)
})
