import type { ComponentFieldMeta } from '#/api/components';
import type { HeroVariant, PageSection } from '#/api/pages';

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

/** hero 版式（015.18）：与服务端 heroVariantSchema 一致 */
export const heroVariantLabels: Record<HeroVariant, string> = {
  'banner-dark': '深色媒体横幅',
  'fullscreen-image': '全屏背景图横幅',
  'fullscreen-video': '全屏视频居中',
  simple: '极简文本',
  'split-visual': '图文分栏',
};

export const heroVariantOptions = (
  Object.keys(heroVariantLabels) as HeroVariant[]
).map((value) => ({ label: heroVariantLabels[value], value }));

/** hero split-visual 视觉类型 */
export const heroVisualTypeOptions = [
  { label: '无视觉', value: 'none' },
  { label: '注册动画组件', value: 'component' },
  { label: '上传静态图', value: 'image' },
];

/** hero banner-dark 媒体类型 */
export const heroMediaTypeOptions = [
  { label: '图片', value: 'image' },
  { label: '视频', value: 'video' },
];

/** hero split-visual 对齐 */
export const heroAlignOptions = [
  { label: '左对齐', value: 'left' },
  { label: '居中', value: 'center' },
];

/** hero 视觉白名单（API heroVisuals 下发后以其为准，此为 fallback） */
export const heroVisualOptions = [
  { label: '数据治理平台 Hero 动画', value: 'DgpHeroVisual' },
  { label: '设备智能体 Hero 动画', value: 'DeviceAgentHeroVisual' },
  { label: '探曜 AIoT Hero 动画', value: 'TanyaoHeroVisual' },
];

/** 定制组件中文名（组件管理页与编辑下拉共用；API registry 下发后以其为准，此为 fallback） */
export const customSectionLabels: Record<string, string> = {
  AboutAddressSection: '公司地址',
  AboutContactSection: '联系方式',
  AboutHeroStats: '关键数据带',
  AboutIntroSection: '公司介绍',
  AboutTextBlock: '段落文本块',
  AboutValuesSection: '价值观',
  ContactFormSection: '线索表单',
  DdpArchitecture: '博曜数据开发架构图',
  DlpArchitecture: '数据标注平台架构图',
  DmsArchitecture: '数据要素监管架构图',
  HomeAbout: '首页关于我们',
  HomeCustomerLogos: '客户 Logo 墙',
  HomeDeliverables: '交付成果',
  HomeEcosystem: '首页开放生态',
  HomeInsights: '首页 Resources',
  HomeProductSystem: '首页智能底座',
  HomeSolutions: '首页解决方案',
  WhyEngine: '产品引擎矩阵',
  WhyServiceReset: '服务概览',
  WhyTrustTabs: '信任背书',
};

/** 组件管理页说明列（8 标准区块 + 定制组件；API registry 下发后以其为准，此为 fallback） */
export const componentDescriptions: Record<string, string> = {
  AboutAddressSection: '关于页地址信息（定制，数据驱动）',
  AboutContactSection: '关于页联系方式卡片（定制，数据驱动）',
  AboutHeroStats: '关于页关键数字网格（定制，props: items）',
  AboutIntroSection: '关于页公司简介 + 图片轮播（定制，数据驱动）',
  AboutTextBlock: '大字号段落文本块（定制，props: paragraphs/align/size）',
  AboutValuesSection: '关于页价值观卡片（定制，数据驱动）',
  ContactFormSection: '线索收集表单（定制，提交 POST /api/leads）',
  cta: '行动号召横幅：标题 + 描述 + 按钮',
  custom: '逃生门：按名嵌入定制组件（015.13 起支持 props）',
  DdpArchitecture: '博曜 DDP 产品架构图（定制）',
  DlpArchitecture: '数据标注 DLP 产品架构图（定制）',
  DmsArchitecture: '数据要素 DMS 产品架构图（定制）',
  featureGrid: '卡片网格：标题/副题/图标/要点/标签，两至四列',
  hero: '页面主标题区（含时替代默认页头；015.18 起五版式可选）',
  HomeAbout: '首页关于我们段（定制，props 全可选）',
  HomeCustomerLogos: '首页客户 Logo 展示（定制，数据驱动）',
  HomeDeliverables: '首页交付成果展示（定制，数据驱动）',
  HomeEcosystem: '首页开放生态段（定制，props 全可选）',
  HomeInsights: '首页 Resources 段（定制，条目走推荐位 API）',
  HomeProductSystem: '首页智能底座段（定制，props 全可选）',
  HomeSolutions: '首页解决方案轮播段（定制，props 全可选）',
  imageBanner: '容器宽大图 + 可选说明文字',
  logoStrip: '合作伙伴静态 logo 墙（图或文字）',
  metrics: '指标带：数值 + 说明，1-8 条',
  richText: '正文富文本（ArticleBlock[]）',
  WhyEngine: '为什么页引擎矩阵区（定制，数据驱动）',
  WhyServiceReset: '为什么页服务重定义区（定制，数据驱动）',
  WhyTrustTabs: '为什么页信任标签页（定制，数据驱动）',
};

/** 与服务端 custom-names.ts 注册表保持一致（fallback；优先用 API registry） */
export const customSectionOptions = [
  'AboutAddressSection',
  'AboutContactSection',
  'AboutHeroStats',
  'AboutIntroSection',
  'AboutTextBlock',
  'AboutValuesSection',
  'ContactFormSection',
  'DdpArchitecture',
  'DlpArchitecture',
  'DmsArchitecture',
  'HomeAbout',
  'HomeCustomerLogos',
  'HomeDeliverables',
  'HomeEcosystem',
  'HomeInsights',
  'HomeProductSystem',
  'HomeSolutions',
  'WhyEngine',
  'WhyServiceReset',
  'WhyTrustTabs',
].map((value) => ({ label: customSectionLabels[value] ?? value, value }));

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
      return {
        spacing: 'compact',
        title: '页面主标题',
        type,
        variant: 'simple',
        visible: true,
      };
    }
    case 'imageBanner': {
      // 服务端 src 为 min(1) 必填：默认给主站既有的宽幅占位图（public/images/common/）
      return {
        alt: '配图',
        spacing: 'compact',
        src: '/images/common/detail-hero-placeholder.svg',
        type,
        visible: true,
      };
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

/** 拖入定制组件的新区块（015.13）：props 初值取描述符 default（稀疏存储，SFC withDefaults 兜底） */
export function createCustomSection(
  name: string,
  fields?: ComponentFieldMeta[],
): PageSection {
  const props: Record<string, unknown> = {};
  for (const field of fields ?? []) {
    if (field.default !== undefined) {
      props[field.key] = field.default;
    }
  }
  return {
    name,
    props: Object.keys(props).length > 0 ? props : undefined,
    spacing: 'compact',
    type: 'custom',
    visible: true,
  };
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
