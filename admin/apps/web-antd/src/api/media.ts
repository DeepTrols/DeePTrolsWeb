import { requestClient } from '#/api/request';

export interface MediaAssetRecord {
  id: number;
  path: string;
  filename: string;
  mime: string;
  size: number;
  alt: string;
  createdAt: string;
}

export const listMediaApi = () =>
  requestClient.get<MediaAssetRecord[]>('/admin/media');

export const uploadMediaApi = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return requestClient.post<MediaAssetRecord>('/admin/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteMediaApi = (id: number) =>
  requestClient.delete<{ ok: boolean }>(`/admin/media/${id}`);

export function formatMediaSize(size: number): string {
  if (size >= 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}
