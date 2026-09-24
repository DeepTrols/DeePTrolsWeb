import type { PageSection } from './pages';

import { requestClient } from '#/api/request';

/** 区块模板（015.13）：运营可复用的区块快照 */
export interface SectionPreset {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  section: PageSection;
  updatedAt: string;
}

export interface PresetInput {
  description: string;
  name: string;
  section: PageSection;
}

export const listPresetsApi = () =>
  requestClient.get<{ presets: SectionPreset[] }>('/admin/presets');

export const createPresetApi = (data: PresetInput) =>
  requestClient.post<{ id: number }>('/admin/presets', data);

export const updatePresetApi = (id: number, data: PresetInput) =>
  requestClient.put<{ ok: boolean }>(`/admin/presets/${id}`, data);

export const deletePresetApi = (id: number) =>
  requestClient.delete<{ ok: boolean }>(`/admin/presets/${id}`);
