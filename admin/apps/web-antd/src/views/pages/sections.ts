import type { PageSection } from '#/api/pages';

export type SectionType = PageSection['type'];

export const sectionTypeLabels: Record<SectionType, string> = {
  cta: 'CTA 横幅',
  custom: '定制组件',
  featureGrid: '特性网格',
  hero: 'Hero 横幅',
  imageBanner: '图片横幅',
  logoStrip: 'Logo 墙',
  metrics: '指标带',
  richText: '富文本',
};

export const sectionTypeOptions = (
  Object.keys(sectionTypeLabels) as SectionType[]
).map((value) => ({ label: sectionTypeLabels[value], value }));

export const featureGridColumnOptions = [
  { label: '两列', value: 'two' },
  { label: '三列', value: 'three' },
  { label: '四列', value: 'four' },
];

/** 区块间距三档（与服务端 page-sections.ts spacing 枚举一致；compact 为现状视觉） */
export const spacingOptions = [
  { label: '紧凑', value: 'tight' },
  { label: '标准', value: 'compact' },
  { label: '宽松', value: 'default' },
];

/** 定制组件中文名（组件管理页与编辑下拉共用） */
export const customSectionLabels: Record<string, string> = {
  DdpArchitecture: '博曜数据开发架构图',
  DlpArchitecture: '数据标注平台架构图',
  DmsArchitecture: '数据要素监管架构图',
};

/** 组件管理页说明列（8 标准区块 + 定制组件） */
export const componentDescriptions: Record<string, string> = {
  cta: '行动号召横幅：标题 + 描述 + 按钮',
  custom: '逃生门：按名嵌入定制架构组件（props 不入库）',
  DdpArchitecture: '博曜 DDP 产品架构图（定制）',
  DlpArchitecture: '数据标注 DLP 产品架构图（定制）',
  DmsArchitecture: '数据要素 DMS 产品架构图（定制）',
  featureGrid: '卡片网格：标题/副题/图标/要点/标签，两至四列',
  hero: '页面主标题区（含时替代默认页头）',
  imageBanner: '容器宽大图 + 可选说明文字',
  logoStrip: '合作伙伴静态 logo 墙（图或文字）',
  metrics: '指标带：数值 + 说明，1-8 条',
  richText: '正文富文本（ArticleBlock[]）',
};

/** 与服务端 custom-names.ts 注册表保持一致（逃生门） */
export const customSectionOptions = [
  'DdpArchitecture',
  'DlpArchitecture',
  'DmsArchitecture',
].map((value) => ({ label: value, value }));

/** 各型默认新区块（spacing 默认 compact = 现状视觉） */
export function createSection(type: SectionType): PageSection {
  switch (type) {
    case 'cta': {
      return {
        ctaHref: '/contact',
        ctaLabel: '免费获取专属方案',
        spacing: 'compact',
        title: '以 AI 重塑数字世界与物理世界',
        type,
        visible: true,
      };
    }
    case 'custom': {
      return {
        name: 'DmsArchitecture',
        spacing: 'compact',
        type,
        visible: true,
      };
    }
    case 'featureGrid': {
      return {
        columns: 'three',
        items: [{ description: '能力描述', title: '能力标题' }],
        spacing: 'compact',
        title: '特性网格标题',
        type,
        visible: true,
      };
    }
    case 'hero': {
      return { spacing: 'compact', title: '页面主标题', type, visible: true };
    }
    case 'imageBanner': {
      return { alt: '配图', spacing: 'compact', src: '', type, visible: true };
    }
    case 'logoStrip': {
      return {
        logos: [{ name: '合作伙伴', text: '合作伙伴' }],
        spacing: 'compact',
        type,
        visible: true,
      };
    }
    case 'metrics': {
      return {
        items: [{ label: '指标说明', value: '99.9%' }],
        spacing: 'compact',
        type,
        visible: true,
      };
    }
    case 'richText': {
      return {
        blocks: [{ text: '在此填写正文段落', type: 'paragraph' }],
        spacing: 'compact',
        type,
        visible: true,
      };
    }
  }
}

/** 列表行摘要（类型标签旁的辅助文本） */
export function sectionSummary(section: PageSection): string {
  switch (section.type) {
    case 'cta':
    case 'hero': {
      return section.title;
    }
    case 'custom': {
      return section.name;
    }
    case 'featureGrid': {
      return `${section.title}（${section.items.length} 项）`;
    }
    case 'imageBanner': {
      return section.alt;
    }
    case 'logoStrip': {
      return section.title ?? `${section.logos.length} 个 logo`;
    }
    case 'metrics': {
      return `${section.items.length} 条指标`;
    }
    case 'richText': {
      return `${section.blocks.length} 个 block`;
    }
  }
}
