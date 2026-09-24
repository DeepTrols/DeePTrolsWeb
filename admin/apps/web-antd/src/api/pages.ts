import type { ContentStatus } from './content';

import { requestClient } from '#/api/request';

/** 区块判别联合：与服务端 server/utils/page-sections.ts 的 zod schema 一一对应 */
export type SectionSpacing = 'compact' | 'default' | 'tight';

export interface FeatureGridItem {
  description: string;
  icon?: string;
  points?: string[];
  subtitle?: string;
  tags?: string[];
  title: string;
}

export interface LogoItem {
  image?: string;
  name: string;
  text?: string;
}

export type PageSection =
  | {
      alt: string;
      caption?: string;
      spacing: SectionSpacing;
      src: string;
      type: 'imageBanner';
      visible: boolean;
    }
  | {
      blocks: unknown[];
      spacing: SectionSpacing;
      type: 'richText';
      visible: boolean;
    }
  | {
      columns: 'four' | 'three' | 'two';
      eyebrow?: string;
      items: FeatureGridItem[];
      spacing: SectionSpacing;
      subtitle?: string;
      title: string;
      type: 'featureGrid';
      visible: boolean;
    }
  | {
      ctaHref: string;
      ctaLabel: string;
      description?: string;
      spacing: SectionSpacing;
      title: string;
      type: 'cta';
      visible: boolean;
    }
  | {
      eyebrow?: string;
      spacing: SectionSpacing;
      subtitle?: string;
      title: string;
      type: 'hero';
      visible: boolean;
    }
  | {
      items: { label: string; value: string }[];
      spacing: SectionSpacing;
      type: 'metrics';
      visible: boolean;
    }
  | {
      logos: LogoItem[];
      spacing: SectionSpacing;
      title?: string;
      type: 'logoStrip';
      visible: boolean;
    }
  | {
      name: string;
      props?: Record<string, unknown>;
      spacing: SectionSpacing;
      type: 'custom';
      visible: boolean;
    };

export interface AdminPageRecord {
  slug: string;
  title: string;
  /** cms = DB 可编辑页；code = 代码路由（只读，无 CMS 字段） */
  source: 'cms' | 'code';
  sortOrder: null | number;
  status: ContentStatus | null;
  updatedAt: null | string;
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
