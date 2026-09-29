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

/** hero 版式（015.18）：与服务端 page-sections.ts heroVariantSchema 一致 */
export type HeroVariant =
  | 'banner-dark'
  | 'fullscreen-image'
  | 'fullscreen-video'
  | 'simple'
  | 'split-visual';

export type PageSection =
  | {
      align?: 'center' | 'left';
      backgroundImage?: string;
      backgroundVideo?: string;
      badge?: string;
      ctaHref?: string;
      ctaLabel?: string;
      description?: string;
      eyebrow?: string;
      mediaType?: 'image' | 'video';
      secondaryCtaHref?: string;
      secondaryCtaLabel?: string;
      spacing: SectionSpacing;
      subtitle?: string;
      title: string;
      titleLines?: string[];
      type: 'hero';
      variant: HeroVariant;
      visible: boolean;
      visualAlt?: string;
      visualImage?: string;
      visualName?: string;
      visualType?: 'component' | 'image' | 'none';
    }
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
      metrics?: { label: string; value?: string }[];
      spacing: SectionSpacing;
      title: string;
      type: 'cta';
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
  /** 015.18 接管标记：代码路径命中接管白名单且 DB 存在同 slug CMS 行 */
  takenOver?: boolean;
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

/**
 * slug 含前导斜杠（如 /solutions/smart-retail），直接拼接；
 * slug='/'（015.18 接管页）时 /admin/pages/ 尾斜杠不命中 [...slug] 路由，改走 index 路由 ?slug= 分支
 */
const pageUrl = (slug: string) =>
  slug === '/'
    ? `/admin/pages?slug=${encodeURIComponent('/')}`
    : `/admin/pages${slug}`;

export const getAdminPageApi = (slug: string) =>
  requestClient.get<AdminPagePayload>(pageUrl(slug));

export const createPageApi = (data: PageInput) =>
  requestClient.post<{ slug: string }>('/admin/pages', data);

export const updatePageApi = (slug: string, data: PageUpdateInput) =>
  requestClient.put(pageUrl(slug), { ...data, slug });

export const deletePageApi = (slug: string) =>
  requestClient.delete(pageUrl(slug));

/** 接管代码页（015.18）：白名单路径（当前仅 '/'）创建 draft 种子页；409 = 已存在 */
export const takeoverPageApi = (slug: string) =>
  requestClient.post<{ slug: string }>('/admin/pages/takeover', { slug });
