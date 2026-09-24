import { requestClient } from '#/api/request';

export interface AdminComponentsPayload {
  disabled: string[];
  source: 'db' | 'static';
  updatedAt: null | string;
}

export const getComponentsApi = () =>
  requestClient.get<AdminComponentsPayload>('/admin/components');

export const saveComponentsApi = (disabled: string[]) =>
  requestClient.put<{ ok: boolean }>('/admin/components', { disabled });
