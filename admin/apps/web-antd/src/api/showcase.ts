import { requestClient } from '#/api/request';

/** 与主站 server/utils/showcase-admin.ts 协议对齐（015.14） */
export type ShowcaseKey = 'about-gallery' | 'home-logos';

export interface ShowcaseGalleryItem {
  alt: string;
  image: string;
}

export interface ShowcaseLogoItem {
  image: string;
  name: string;
}

export interface AdminShowcasePayload<T> {
  items: T;
  key: ShowcaseKey;
  /** Logo 静态回退中被丢弃的纯文本条目数（DB 协议仅图片条目） */
  skippedTextEntries: number;
  source: 'db' | 'static';
  updatedAt: null | string;
}

export const getShowcaseApi = <T>(key: ShowcaseKey) =>
  requestClient.get<AdminShowcasePayload<T>>(`/admin/showcase/${key}`);

export const saveShowcaseApi = <T>(key: ShowcaseKey, items: T) =>
  requestClient.put<{ ok: boolean }>(`/admin/showcase/${key}`, { items });
