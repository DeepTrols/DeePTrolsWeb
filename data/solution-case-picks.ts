/**
 * 方案页案例推荐（015.17）页面 key 注册表与静态回退：
 * solution_case_picks 表未配置 / 未入库 / 查询失败时的回退数据；server 与 client 双侧共享，
 * 故必须是纯字符串/纯函数模块（禁 ?url 资源导入，同 data/solution-categories.ts 先例）。
 */
import { caseResources } from './cases'
import type { CaseResource } from './cases'

/** 五个方案代码页的推荐位 key（manufacturing 智能制造 / water 智慧水利 / energy 算电协同 / smart-education 智慧教育 / fde FDE） */
export const SOLUTION_CASE_PAGE_KEYS = ['manufacturing', 'water', 'energy', 'smart-education', 'fde'] as const
export type SolutionCasePageKey = (typeof SOLUTION_CASE_PAGE_KEYS)[number]

export const SOLUTION_CASE_PAGE_LABELS: Record<SolutionCasePageKey, string> = {
  manufacturing: '智能制造',
  water: '智慧水利',
  energy: '算电协同',
  'smart-education': '智慧教育',
  fde: 'FDE',
}

/** 页面 key → 静态回退行业分类（solution 分类 key，见 data/solution-categories.ts） */
export const SOLUTION_CASE_FALLBACK_CATEGORY: Record<SolutionCasePageKey, string> = {
  manufacturing: 'smart-manufacturing',
  water: 'smart-water',
  energy: 'compute-power',
  'smart-education': 'smart-education',
  fde: 'fde',
}

/** 静态回退：按页面映射分类过滤静态案例库，封顶 3 条（与 resolveSolutionCases 回退分支同一数据源） */
export function staticSolutionCaseFallback(key: SolutionCasePageKey): CaseResource[] {
  return caseResources.filter(item => item.solutionKey === SOLUTION_CASE_FALLBACK_CATEGORY[key]).slice(0, 3)
}

/** 案例 href（/cases/<slug>）→ slug：admin GET 静态回退需把编辑器初值表达为 slug 列表 */
export function caseSlugFromHref(href: string): string {
  return href.replace(/^\/cases\//, '')
}
