import type { ContentStatus } from './content';

import { requestClient } from '#/api/request';

/** Phase C 唯一区块类型：富文本（ArticleBlock[]）；Phase D 扩展更多类型 */
export interface PageSection {
  blocks: unknown[];
  type: 'richText';
}

export interface AdminPageRecord {
  slug: string;
  sortOrder: number;
  status: ContentStatus;
  title: string;
  updatedAt: string;
}

export interface PageInput {
  sections: PageSection[];
  seoDescription: string;
  slug: string;
  sortOrder: number;
  status: ContentStatus;
  title: string;
}

export interface AdminPagePayload extends PageInput {
  updatedAt: string;
}

export type PageUpdateInput = Omit<PageInput, 'slug'>;

export const listAdminPagesApi = () =>
  requestClient.get<AdminPageRecord[]>('/admin/pages');

/** slug 含前导斜杠（如 /solutions/smart-retail），直接拼接 */
export const getAdminPageApi = (slug: string) =>
  requestClient.get<AdminPagePayload>(`/admin/pages${slug}`);

export const createPageApi = (data: PageInput) =>
  requestClient.post<{ slug: string }>('/admin/pages', data);

export const updatePageApi = (slug: string, data: PageUpdateInput) =>
  requestClient.put(`/admin/pages${slug}`, data);

export const deletePageApi = (slug: string) =>
  requestClient.delete(`/admin/pages${slug}`);
