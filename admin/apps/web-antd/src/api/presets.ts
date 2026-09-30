import type { PageSection } from './pages';

import { requestClient } from '#/api/request';

/** 区块模板（015.13，015.19c 升级为多区块组合）：运营可复用的区块组合 */
export interface SectionPreset {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  sections: PageSection[];
  updatedAt: string;
}

export interface PresetInput {
  description: string;
  name: string;
  sections: PageSection[];
}

export const listPresetsApi = () =>
  requestClient.get<{ presets: SectionPreset[] }>('/admin/presets');

export const createPresetApi = (data: PresetInput) =>
  requestClient.post<{ id: number }>('/admin/presets', data);

export const updatePresetApi = (id: number, data: PresetInput) =>
  requestClient.put<{ ok: boolean }>(`/admin/presets/${id}`, data);

export const deletePresetApi = (id: number) =>
  requestClient.delete<{ ok: boolean }>(`/admin/presets/${id}`);
