import { useFetch } from '#imports'
import { newsCategoryTabs } from '~/data/news'
import { reportTypeCategories, solutionCategories } from '~/data/solution-categories'
import type { ContentCategoryItem } from '~/data/solution-categories'

interface CategoriesResponse {
  scope: string
  items: ContentCategoryItem[]
  source: 'db' | 'static'
}

/**
 * 内容分类双层回退（TASK-015.16）：
 * 1. API 层 /api/categories DB 优先，无库回退静态快照；
 * 2. 页面层 useFetch 失败回退静态 import（default）。
 * key 固定；返回 { key, label }[]（sortOrder 已在服务端排好）。
 */
export function useNewsCategories() {
  return useFetch('/api/categories', {
    key: 'categories-news-category',
    query: { scope: 'news-category' },
    default: () => newsCategoryTabs,
    transform: (res: CategoriesResponse) => res.items,
  })
}

export function useSolutionCategories() {
  return useFetch('/api/categories', {
    key: 'categories-solution',
    query: { scope: 'solution' },
    default: () => solutionCategories,
    transform: (res: CategoriesResponse) => res.items,
  })
}

export function useReportTypes() {
  return useFetch('/api/categories', {
    key: 'categories-report-type',
    query: { scope: 'report-type' },
    default: () => reportTypeCategories,
    transform: (res: CategoriesResponse) => res.items,
  })
}
