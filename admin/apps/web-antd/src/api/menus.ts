import { requestClient } from '#/api/request';

/** 与主站 data/navigation.ts NavLink/NavColumn/NavFeature/NavItem 形状一致（icon 为注册表名字字符串） */
export interface NavLink {
  activePaths?: string[];
  description?: string;
  href: string;
  hot?: boolean;
  icon?: string;
  label: string;
}

export interface NavColumn {
  activePaths?: string[];
  description?: string;
  footerHref?: string;
  footerLabel?: string;
  groups?: NavColumn[];
  href?: string;
  links?: NavLink[];
  subtitle?: string;
  title: string;
}

export interface NavFeature {
  description: string;
  href: string;
  icon: string;
  title: string;
}

export interface NavItem {
  activePaths?: string[];
  columns?: NavColumn[];
  features?: NavFeature[];
  featuresTitle?: string;
  href: string;
  label: string;
  layout?: 'product' | 'solutions';
  megaTitle?: string;
}

export interface FooterLink {
  arrow?: boolean;
  href: string;
  label: string;
}

export interface FooterColumn {
  groups: FooterLink[][];
  title: string;
}

export interface FooterSocial {
  href?: string;
  label: string;
  path: string;
}

export interface FooterMenu {
  columns: FooterColumn[];
  socials: FooterSocial[];
}

export type MenuKey = 'footer' | 'header';

export interface AdminMenuPayload {
  items: FooterMenu | NavItem[];
  key: MenuKey;
  source: 'db' | 'static';
  updatedAt: null | string;
}

/** icon 下拉选项：与主站 components/navigation/nav-icons.ts 注册表保持一致 */
export const NAV_ICON_OPTIONS = [
  'BatteryCharging',
  'BookOpen',
  'Bot',
  'Droplets',
  'Factory',
  'GraduationCap',
  'PlugZap',
  'RadioTower',
  'Rocket',
].map((value) => ({ label: value, value }));

export const getMenuApi = (key: MenuKey) =>
  requestClient.get<AdminMenuPayload>(`/admin/menus/${key}`);

export const saveMenuApi = (key: MenuKey, items: FooterMenu | NavItem[]) =>
  requestClient.put<{ ok: boolean }>(`/admin/menus/${key}`, { items });
