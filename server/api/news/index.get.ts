import { newsCategoryTabs } from '~/data/news'
import type { NewsCategory } from '~/data/news'
import { listNewsItems } from '../../utils/news-repo'

// GET /api/news?category=company|media|insight — 公开读；DB 未配置时自动回退静态数据
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category: NewsCategory | undefined
    = typeof query.category === 'string' && newsCategoryTabs.some(tab => tab.key === query.category)
      ? (query.category as NewsCategory)
      : undefined

  return await listNewsItems(category)
})
