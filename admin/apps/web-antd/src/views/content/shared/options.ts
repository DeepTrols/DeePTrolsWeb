import type { ContentStatus, SolutionKey } from '#/api/content';

import { onMounted, ref } from 'vue';

import { listCategoriesApi } from '#/api/content';

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
)
  // 015.16：SolutionKey 放宽为 string 后索引签名返回 string | undefined，?? value 兜底
  .map((value) => ({ label: solutionKeyLabels[value] ?? value, value }));

export const reportTypeOptions = [
  '产品规格书',
  '电子书',
  '白皮书',
  '视频',
  '幻灯片',
  '基准测试报告',
].map((value) => ({ label: value, value }));

/**
 * 动态分类 options（015.16）：编辑页 Select 数据源改 /api/categories（分类管理维护），
 * 请求失败回退静态常量（fallback 参数）；须在 setup 内调用（onMounted 拉取）。
 */
export function useCategoryOptions(
  scope: 'news-category' | 'report-type' | 'solution',
  fallback: { label: string; value: string }[],
) {
  const options = ref(fallback);
  onMounted(async () => {
    try {
      const res = await listCategoriesApi(scope);
      options.value = res.items.map((item) => ({
        label: item.label,
        value: item.key,
      }));
    } catch {
      // 接口失败沿用静态回退（编辑已有内容不阻塞）
    }
  });
  return options;
}

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
