/**
 * 行业分类（solution）与报告类型（report-type）静态快照（015.16）：
 * content_categories 表无 DB / 查询失败时的回退数据；server 与 client 双侧共享，故必须是纯字符串模块（禁 ?url 资源导入）。
 * sortOrder 顺序与迁移 0010 种子一致；新闻分类快照沿用 data/news.ts newsCategoryTabs（不重复维护）。
 */
export interface ContentCategoryItem {
  key: string
  label: string
}

/** 行业分类：案例（cases.solutionKey / caseDetails.categoryKey）与报告（reports.solutionKey）共享 */
export const solutionCategories: ContentCategoryItem[] = [
  { key: 'data-infrastructure', label: '数据设施' },
  { key: 'knowledge-engineering', label: '知识工程' },
  { key: 'smart-manufacturing', label: '智能制造' },
  { key: 'smart-water', label: '智慧水利' },
  { key: 'smart-education', label: '智慧教育' },
  { key: 'fde', label: 'FDE' },
  { key: 'compute-power', label: '算电协同' },
  { key: 'smart-energy-storage', label: '智慧储能' },
]

/** 报告类型：key 即 label（中文取值，与历史数据一致） */
export const reportTypeCategories: ContentCategoryItem[] = [
  { key: '产品规格书', label: '产品规格书' },
  { key: '电子书', label: '电子书' },
  { key: '白皮书', label: '白皮书' },
  { key: '视频', label: '视频' },
  { key: '幻灯片', label: '幻灯片' },
  { key: '基准测试报告', label: '基准测试报告' },
]
