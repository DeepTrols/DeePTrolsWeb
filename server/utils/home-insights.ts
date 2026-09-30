import type { InsightItem } from '~/data/home-insights'
import { newsCategoryTabs } from '~/data/news'

/**
 * 首页「创新、洞察与新闻」推荐位合并规则（审计#19：从 server/api/home/insights.get.ts 内联逻辑抽出为纯函数，供行为级测试覆盖）。
 * 职责边界：
 * - 端点负责 DB 查询（featured+published 过滤、news publishedAt desc / reports sortOrder asc 排序、limit）与静态回退决策；
 * - 本模块负责新闻行 → InsightItem 映射、新闻优先/报告补足的顺序保持合并、上限截断；返回空数组即触发端点静态回退。
 */

/** 端点查询投影出的 featured 新闻行（与 insights.get.ts 的 select 字段一一对应） */
export interface InsightNewsRow {
  id: number
  title: string
  summary: string
  coverImage: string
  category: string
}

/** 端点查询投影出的 featured 报告行：字段与 InsightItem 同构，直接进入合并结果 */
export type InsightReportRow = InsightItem

/** 推荐位上限（端点查询 limit 与合并截断共用同一常量） */
export const HOME_INSIGHTS_MAX_ITEMS = 4

// Map 键宽化为 string：DB 行的 category 是普通字符串，未登记 key 时 get 返回 undefined 走原样回退
const newsCategoryLabels = new Map<string, string>(newsCategoryTabs.map(tab => [tab.key, tab.label]))

/** 纯函数：新闻行 → InsightItem（category key → 中文标签，未登记 key 原样回退；href 由 id 派生） */
export function toNewsInsight(row: InsightNewsRow): InsightItem {
  return {
    category: newsCategoryLabels.get(row.category) ?? row.category,
    title: row.title,
    summary: row.summary,
    image: row.coverImage,
    href: `/news/${row.id}`,
  }
}

/**
 * 纯函数合并规则：featured 新闻优先 → featured 报告补足 → 封顶 maxItems（非负整数，由端点常量保证）。
 * 顺序保持：不重排序，输出顺序 = 新闻入参顺序（DB publishedAt desc）→ 报告入参顺序（DB sortOrder asc）；不修改入参数组。
 */
export function mergeHomeInsights(
  newsRows: InsightNewsRow[],
  reportRows: InsightReportRow[],
  maxItems: number = HOME_INSIGHTS_MAX_ITEMS,
): InsightItem[] {
  const items: InsightItem[] = newsRows.slice(0, maxItems).map(toNewsInsight)
  if (items.length < maxItems) {
    items.push(...reportRows.slice(0, maxItems - items.length))
  }
  return items
}
