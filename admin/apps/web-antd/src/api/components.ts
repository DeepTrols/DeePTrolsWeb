import { requestClient } from '#/api/request';

/** 注册组件表单描述符（015.13）：与服务端 components/sections/custom-props.ts 对齐 */
export interface ComponentFieldMeta {
  default?: unknown;
  key: string;
  label: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  type:
    | 'boolean'
    | 'icon'
    | 'image'
    | 'json'
    | 'number'
    | 'select'
    | 'string'
    | 'text';
}

export interface ComponentRegistryEntry {
  category: 'architecture' | 'content' | 'form' | 'marketing';
  description: string;
  fields: ComponentFieldMeta[];
  label: string;
  name: string;
}

export interface ComponentUsage {
  count: number;
  slugs: string[];
}

/** hero split-visual 视觉白名单条目（015.18）：与服务端 hero-visual-names.ts 对齐 */
export interface HeroVisualEntry {
  label: string;
  name: string;
}

export interface AdminComponentsPayload {
  disabled: string[];
  heroVisuals: HeroVisualEntry[];
  registry: ComponentRegistryEntry[];
  source: 'db' | 'static';
  updatedAt: null | string;
  usage: Record<string, ComponentUsage>;
}

export const getComponentsApi = () =>
  requestClient.get<AdminComponentsPayload>('/admin/components');

export const saveComponentsApi = (disabled: string[]) =>
  requestClient.put<{ ok: boolean }>('/admin/components', { disabled });
