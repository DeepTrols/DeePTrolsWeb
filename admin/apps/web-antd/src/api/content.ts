import { requestClient } from '#/api/request';

export type ContentStatus = 'draft' | 'published';
export type SolutionKey =
  | 'compute-power'
  | 'data-infrastructure'
  | 'fde'
  | 'knowledge-engineering'
  | 'smart-education'
  | 'smart-manufacturing'
  | 'smart-water';

export interface AdminNewsRecord {
  id: number;
  title: string;
  category: 'company' | 'insight' | 'media';
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
  category: 'company' | 'insight' | 'media';
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
