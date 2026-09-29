import { requestClient, suppressErrorToastConfig } from '#/api/request';

export type ContentStatus = 'draft' | 'published';
/** 015.16 起分类动态化（content_categories 表）：key 放宽为任意字符串 */
export type SolutionKey = string;

export interface AdminNewsRecord {
  id: number;
  title: string;
  category: string;
  publishedAt: string;
  status: ContentStatus;
  featured: boolean;
  hasDetail: boolean;
  updatedAt: string;
}

export interface NewsInput {
  title: string;
  summary: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  status: ContentStatus;
  featured: boolean;
  blocks: unknown[];
}

export interface AdminNewsPayload extends Omit<NewsInput, 'blocks'> {
  id: number;
  blocks: null | unknown[];
}

export interface AdminCaseRecord {
  slug: string;
  title: string;
  solutionKey: null | SolutionKey;
  sortOrder: number;
  status: ContentStatus;
  featured: boolean;
  hasDetail: boolean;
  updatedAt: string;
}

export interface CaseInput {
  slug: string;
  title: string;
  summary: string;
  image: string;
  solutionKey: null | SolutionKey;
  sortOrder: number;
  status: ContentStatus;
  featured: boolean;
  detailTitle: string;
  categoryKey: SolutionKey;
  heroImage: string;
  blocks: unknown[];
  relatedProducts: unknown[];
}

export interface AdminReportRecord {
  id: number;
  type: string;
  category: string;
  title: string;
  href: string;
  sortOrder: number;
  status: ContentStatus;
  featured: boolean;
  updatedAt: string;
}

export interface ReportInput {
  type: string;
  category: string;
  solutionKey: null | SolutionKey;
  title: string;
  summary: string;
  image: string;
  href: string;
  sortOrder: number;
  status: ContentStatus;
  featured: boolean;
}

export interface AdminReportPayload extends ReportInput {
  id: number;
}

// 新闻
export const listAdminNewsApi = () =>
  requestClient.get<AdminNewsRecord[]>('/admin/news');
export const getAdminNewsApi = (id: number) =>
  requestClient.get<AdminNewsPayload>(`/admin/news/${id}`);
export const createNewsApi = (data: NewsInput) =>
  requestClient.post<{ id: number; ok: boolean }>('/admin/news', data);
export const updateNewsApi = (id: number, data: NewsInput) =>
  requestClient.put(`/admin/news/${id}`, data);
export const deleteNewsApi = (id: number) =>
  requestClient.delete(`/admin/news/${id}`);
/** 首页推荐单列切换（审计#16）：RequestClient 无 patch 快捷方法，走通用 request */
export const setNewsFeaturedApi = (id: number, featured: boolean) =>
  requestClient.request<{ ok: boolean }>(`/admin/news/${id}/featured`, {
    data: { featured },
    method: 'PATCH',
    // 409 推荐位上限由列表页组件弹中文提示，抑制拦截器统一 toast
    ...suppressErrorToastConfig,
  });

// 案例
export const listAdminCasesApi = () =>
  requestClient.get<AdminCaseRecord[]>('/admin/cases');
export const getAdminCaseApi = (slug: string) =>
  requestClient.get<CaseInput>(`/admin/cases/${slug}`);
export const createCaseApi = (data: CaseInput) =>
  requestClient.post<{ ok: boolean; slug: string }>('/admin/cases', data);
export const updateCaseApi = (slug: string, data: Omit<CaseInput, 'slug'>) =>
  requestClient.put(`/admin/cases/${slug}`, data);
export const deleteCaseApi = (slug: string) =>
  requestClient.delete(`/admin/cases/${slug}`);
/** 案例精选推荐单列切换（015.15，镜像审计#16）：RequestClient 无 patch 快捷方法，走通用 request */
export const setCaseFeaturedApi = (slug: string, featured: boolean) =>
  requestClient.request<{ ok: boolean }>(`/admin/cases/${slug}/featured`, {
    data: { featured },
    method: 'PATCH',
    ...suppressErrorToastConfig,
  });

// 报告
export const listAdminReportsApi = () =>
  requestClient.get<AdminReportRecord[]>('/admin/reports');
export const getAdminReportApi = (id: number) =>
  requestClient.get<AdminReportPayload>(`/admin/reports/${id}`);
export const createReportApi = (data: ReportInput) =>
  requestClient.post<{ id: number; ok: boolean }>('/admin/reports', data);
export const updateReportApi = (id: number, data: ReportInput) =>
  requestClient.put(`/admin/reports/${id}`, data);
export const deleteReportApi = (id: number) =>
  requestClient.delete(`/admin/reports/${id}`);
/** 首页推荐单列切换（审计#16）：RequestClient 无 patch 快捷方法，走通用 request */
export const setReportFeaturedApi = (id: number, featured: boolean) =>
  requestClient.request<{ ok: boolean }>(`/admin/reports/${id}/featured`, {
    data: { featured },
    method: 'PATCH',
    ...suppressErrorToastConfig,
  });

// 内容分类（015.16）
export type CategoryScope = 'news-category' | 'report-type' | 'solution';

export interface AdminCategoryRecord {
  scope: CategoryScope;
  key: string;
  label: string;
  sortOrder: number;
  /** 引用计数（删除前置提示；被引用时服务端 409 拒绝删除） */
  refs: number;
  updatedAt: string;
}

export interface CategoryInput {
  scope: CategoryScope;
  key: string;
  label: string;
  sortOrder: number;
}

/** 公开端点（无需会话）：编辑页 Select options 也用同一数据源，静态回退在服务端完成 */
export const listCategoriesApi = (scope: CategoryScope) =>
  requestClient.get<{ items: { key: string; label: string }[] }>(
    '/categories',
    { params: { scope } },
  );

export const listAdminCategoriesApi = (scope: CategoryScope) =>
  requestClient.get<AdminCategoryRecord[]>('/admin/categories', {
    params: { scope },
  });
// 分类 CRUD 的 409（key 冲突 / 引用中）由视图组件弹中文提示
export const createCategoryApi = (data: CategoryInput) =>
  requestClient.post<{ ok: boolean }>('/admin/categories', data, {
    ...suppressErrorToastConfig,
  });
export const updateCategoryApi = (
  scope: CategoryScope,
  key: string,
  data: { label: string; sortOrder: number },
) =>
  requestClient.put(
    `/admin/categories/${scope}/${encodeURIComponent(key)}`,
    data,
    { ...suppressErrorToastConfig },
  );
export const deleteCategoryApi = (scope: CategoryScope, key: string) =>
  requestClient.delete(
    `/admin/categories/${scope}/${encodeURIComponent(key)}`,
    {
      ...suppressErrorToastConfig,
    },
  );

// 方案页案例推荐（015.17）：solution_case_picks 表，每页 ≤3 条有序案例 slug
export type SolutionCasePageKey =
  | 'energy'
  | 'fde'
  | 'manufacturing'
  | 'smart-education'
  | 'water';

export interface AdminSolutionCasePicksPayload {
  items: string[];
  key: SolutionCasePageKey;
  source: 'db' | 'static';
  updatedAt: null | string;
}

export const getSolutionCasePicksApi = (key: SolutionCasePageKey) =>
  requestClient.get<AdminSolutionCasePicksPayload>(
    `/admin/solutions/${key}/cases`,
  );
// 400（非法整列 / 未知案例 slug）由视图组件弹中文提示，抑制拦截器统一 toast
export const saveSolutionCasePicksApi = (
  key: SolutionCasePageKey,
  items: string[],
) =>
  requestClient.put<{ ok: boolean }>(
    `/admin/solutions/${key}/cases`,
    { items },
    { ...suppressErrorToastConfig },
  );
