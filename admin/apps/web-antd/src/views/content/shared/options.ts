import type { ContentStatus, SolutionKey } from '#/api/content';

export const statusLabels: Record<ContentStatus, string> = {
  draft: '草稿',
  published: '已发布',
};

export const statusColors: Record<ContentStatus, string> = {
  draft: 'orange',
  published: 'green',
};

export const statusOptions = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
];

export const newsCategoryLabels: Record<string, string> = {
  company: '公司动态',
  insight: '技术洞见',
  media: '新闻报道',
};

export const newsCategoryOptions = [
  { label: '公司动态', value: 'company' },
  { label: '新闻报道', value: 'media' },
  { label: '技术洞见', value: 'insight' },
];

export const solutionKeyLabels: Record<SolutionKey, string> = {
  'compute-power': '算电协同',
  'data-infrastructure': '数据设施',
  fde: 'FDE',
  'knowledge-engineering': '知识工程',
  'smart-education': '智慧教育',
  'smart-manufacturing': '智能制造',
  'smart-water': '智慧水利',
};

export const solutionKeyOptions = (
  Object.keys(solutionKeyLabels) as SolutionKey[]
).map((value) => ({ label: solutionKeyLabels[value], value }));

export const reportTypeOptions = [
  '产品规格书',
  '电子书',
  '白皮书',
  '视频',
  '幻灯片',
  '基准测试报告',
].map((value) => ({ label: value, value }));

/** JSON 文本域解析（blocks/relatedProducts）；失败返回 null 由调用方提示 */
export function parseJsonField(text: string): null | unknown[] {
  try {
    const value = JSON.parse(text);
    return Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

export function toJsonText(value: null | undefined | unknown[]): string {
  return value ? JSON.stringify(value, null, 2) : '';
}
