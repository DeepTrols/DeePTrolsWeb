import { requestClient } from '#/api/request';

/** 注册组件表单描述符（015.13）：与服务端 components/sections/custom-props.ts 对齐 */
export interface ComponentFieldMeta {
  default?: unknown;
  /** list 字段：prop 缺失时编辑器的预览行（不自动落库） */
  fallback?: unknown;
  /** list 字段：对象行子字段描述符（可再嵌套一层 list） */
  itemFields?: ComponentFieldMeta[];
  /** list 字段：标量行元素类型（与 itemFields 互斥） */
  itemType?: 'number' | 'string';
  key: string;
  label: string;
  maxItems?: number;
  minItems?: number;
  options?: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  type:
    | 'boolean'
    | 'icon'
    | 'image'
    | 'json'
    | 'list'
    | 'number'
    | 'select'
    | 'string'
    | 'text';
}

export interface ComponentRegistryEntry {
  category: 'architecture' | 'content' | 'form' | 'marketing';
  contentEntry?: ComponentContentEntry;
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

/** 组件内容运维入口（015.19d）：零 props 数据驱动组件的内容不在 CMS，指向后台路由或代码数据源 */
export interface ComponentContentEntry {
  adminRoute?: string;
  dataPath?: string;
  label: string;
}

/** 组件全量清单条目（015.19d）：标准区块 + 定制组件 + hero 视觉三类 */
export interface ComponentCatalogEntry {
  category: 'architecture' | 'content' | 'form' | 'marketing' | null;
  contentEntry?: ComponentContentEntry;
  description: string;
  fields: { key: string; label: string; required?: boolean; type: string }[];
  id: string;
  kind: 'custom' | 'hero-visual' | 'standard';
  label: string;
}

export interface AdminComponentsPayload {
  catalog: ComponentCatalogEntry[];
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
