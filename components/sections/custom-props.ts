import { z } from 'zod'
import { navIconComponents } from '~/components/navigation/nav-icons'
import type { CustomSectionName } from './custom-names'

/**
 * 注册组件 props 元数据（015.13 一期）：服务端 zod 校验 + admin 表单描述符的单源事实。
 * 纯 TS 模块：禁止 import .vue / 资源（?url），server 侧（component-admin）与客户端共享。
 * schema 用于 page-sections.ts 的 superRefine 入库校验；fields 经 API 下发给 vben 动态生成表单。
 * 015.18 首页段组件：props 全可选（稀疏存储，零 props = SFC 缺省读 data 静态）。
 */

export interface ComponentFieldMeta {
  key: string
  label: string
  type: 'boolean' | 'icon' | 'image' | 'json' | 'number' | 'select' | 'string' | 'text'
  required?: boolean
  options?: { label: string; value: string }[]
  default?: unknown
  placeholder?: string
}

export interface RegisteredComponentMeta {
  label: string
  description: string
  category: 'architecture' | 'content' | 'form' | 'marketing'
  schema: z.ZodObject<z.ZodRawShape>
  fields: ComponentFieldMeta[]
  /** 015.19d：零 props 数据驱动组件的内容运维入口（后台路由或代码数据源），组件管理详情展示 */
  contentEntry?: { label: string, adminRoute?: string, dataPath?: string }
}

const emptyMeta = {
  schema: z.object({}).strict(),
  fields: [] as ComponentFieldMeta[],
}

/** 可选短文本（015.18 首页段 props 稀疏存储） */
const optText = (max: number) => z.string().trim().min(1).max(max).optional()

/** 图标名白名单（nav-icons 注册表；Object.hasOwn 防原型链键绕过，page-sections 同例） */
const iconName = z
  .string()
  .trim()
  .min(1)
  .max(50)
  .refine(name => Object.hasOwn(navIconComponents, name), { message: 'Unknown nav icon' })

/** 首页段标题三件套字段（vben 动态表单共用） */
const headingFields: ComponentFieldMeta[] = [
  { key: 'eyebrow', label: '眉题', type: 'string' },
  { key: 'title', label: '标题', type: 'string' },
  { key: 'subtitle', label: '副标题', type: 'text' },
]

/** 首页段标题三件套 schema（全可选） */
const headingShape = {
  eyebrow: optText(100),
  title: optText(200),
  subtitle: z.string().trim().max(500).optional(),
}

export const CUSTOM_COMPONENT_META: Record<CustomSectionName, RegisteredComponentMeta> = {
  DdpArchitecture: {
    label: 'DDP 架构图',
    description: '数据开发平台产品架构图（零 props 自包含）',
    category: 'architecture',
    ...emptyMeta,
    contentEntry: { label: '组件源码（架构图内置）', dataPath: 'components/product/ddp/DdpArchitecture.vue' },
  },
  DlpArchitecture: {
    label: 'DLP 架构图',
    description: '数据开发套件产品架构图（零 props 自包含）',
    category: 'architecture',
    ...emptyMeta,
    contentEntry: { label: '组件源码（架构图内置）', dataPath: 'components/product/dlp/DlpArchitecture.vue' },
  },
  DmsArchitecture: {
    label: 'DMS 架构图',
    description: '数据微服务平台产品架构图（零 props 自包含）',
    category: 'architecture',
    ...emptyMeta,
    contentEntry: { label: '组件源码（架构图内置）', dataPath: 'components/product/dms/DmsArchitecture.vue' },
  },
  ContactFormSection: {
    label: '线索表单',
    description: '联系我们线索收集表单（提交 POST /api/leads）',
    category: 'form',
    ...emptyMeta,
    contentEntry: { label: '线索管理（提交数据）', adminRoute: '/leads' },
  },
  AboutIntroSection: {
    label: '公司介绍',
    description: '关于我们页公司简介 + 图片轮播（数据驱动）',
    category: 'content',
    ...emptyMeta,
    contentEntry: { label: '关于页静态数据', dataPath: 'data/about.ts' },
  },
  AboutValuesSection: {
    label: '价值观',
    description: '关于我们页价值观卡片（数据驱动）',
    category: 'content',
    ...emptyMeta,
    contentEntry: { label: '关于页静态数据', dataPath: 'data/about.ts' },
  },
  AboutAddressSection: {
    label: '公司地址',
    description: '关于我们页地址信息（数据驱动）',
    category: 'content',
    ...emptyMeta,
    contentEntry: { label: '关于页静态数据', dataPath: 'data/about.ts' },
  },
  AboutContactSection: {
    label: '联系方式',
    description: '关于我们页联系方式卡片（数据驱动）',
    category: 'content',
    ...emptyMeta,
    contentEntry: { label: '关于页静态数据', dataPath: 'data/about.ts' },
  },
  WhyEngine: {
    label: '产品引擎矩阵',
    description: '为什么选择我们页的引擎矩阵区（数据驱动）',
    category: 'marketing',
    ...emptyMeta,
    contentEntry: { label: 'why 页静态数据', dataPath: 'data/why.ts' },
  },
  WhyServiceReset: {
    label: '服务概览',
    description: '为什么选择我们页的服务重定义区（数据驱动）',
    category: 'marketing',
    ...emptyMeta,
    contentEntry: { label: 'why 页静态数据', dataPath: 'data/why.ts' },
  },
  WhyTrustTabs: {
    label: '信任背书',
    description: '为什么页/首页信任标签页（props 全可选，缺省读 data/why 静态）',
    category: 'marketing',
    schema: z
      .object({
        title: optText(200),
        tablistLabel: optText(100),
        tabs: z
          .array(
            z.object({
              key: z.string().trim().min(1).max(50),
              label: z.string().trim().min(1).max(50),
              features: z
                .array(
                  z.object({
                    title: z.string().trim().min(1).max(100),
                    subtitle: z.string().trim().min(1).max(100),
                    description: z.string().trim().min(1).max(1000),
                    icon: iconName.optional(),
                  }),
                )
                .min(1)
                .max(8),
            }),
          )
          .min(1)
          .max(8)
          .optional(),
      })
      .strict(),
    fields: [
      { key: 'title', label: '标题', type: 'string' },
      { key: 'tablistLabel', label: '标签组 aria 名', type: 'string' },
      {
        key: 'tabs',
        label: '标签页（JSON 数组 {key,label,features[{title,subtitle,description,icon}]}）',
        type: 'json',
        placeholder: '[{"key":"technology","label":"面向技术层","features":[...]}]',
      },
    ],
  },
  HomeProductSystem: {
    label: '智能底座',
    description: '首页智能底座段（架构图保持代码内置；props 全可选，缺省读 data 静态）',
    category: 'marketing',
    schema: z
      .object({
        ...headingShape,
        flowLabel: optText(100),
        cards: z
          .array(
            z.object({
              name: z.string().trim().min(1).max(50),
              title: optText(200),
              description: z.string().trim().min(1).max(500),
              icon: iconName.optional(),
            }),
          )
          .min(1)
          .max(8)
          .optional(),
      })
      .strict(),
    fields: [
      ...headingFields,
      { key: 'flowLabel', label: '架构图 aria 标签', type: 'string' },
      {
        key: 'cards',
        label: '产品卡片（JSON 数组 {name,title,description,icon}）',
        type: 'json',
        placeholder: '[{"name":"数曜","description":"...","icon":"Database"}]',
      },
    ],
  },
  HomeSolutions: {
    label: '解决方案',
    description: '首页解决方案轮播段（props 全可选，缺省读 data 静态）',
    category: 'marketing',
    schema: z
      .object({
        ...headingShape,
        items: z
          .array(
            z.object({
              key: z.string().trim().min(1).max(50),
              tab: z.string().trim().min(1).max(50),
              title: z.string().trim().min(1).max(200),
              englishTitle: z.string().trim().max(200).optional(),
              description: z.string().trim().min(1).max(500),
              image: z.string().trim().min(1).max(1000),
              href: z.string().trim().min(1).max(500),
            }),
          )
          .min(1)
          .max(12)
          .optional(),
      })
      .strict(),
    fields: [
      ...headingFields,
      {
        key: 'items',
        label: '方案项（JSON 数组 {key,tab,title,description,image,href}）',
        type: 'json',
        placeholder: '[{"key":"manufacturing","tab":"智能制造","title":"...","description":"...","image":"/images/...","href":"/solutions/..."}]',
      },
    ],
  },
  HomeEcosystem: {
    label: '开放生态',
    description: '首页 ecosystem 段（SVG 视觉代码内置；props 全可选，缺省读 data 静态）',
    category: 'marketing',
    schema: z
      .object({
        ...headingShape,
        cards: z
          .array(
            z.object({
              title: z.string().trim().min(1).max(100),
              description: z.string().trim().min(1).max(500),
              tag: z.string().trim().min(1).max(100),
              href: z.string().trim().min(1).max(500),
              points: z.array(z.string().trim().min(1).max(200)).max(8).optional(),
              icon: iconName.optional(),
              variant: z.enum(['token', 'agent', 'infra', 'report']),
            }),
          )
          .min(1)
          .max(8)
          .optional(),
      })
      .strict(),
    fields: [
      ...headingFields,
      {
        key: 'cards',
        label: '生态卡片（JSON 数组 {title,description,tag,href,points,icon,variant}）',
        type: 'json',
        placeholder: '[{"title":"Token Hub","description":"...","tag":"...","href":"/services/token-hub","variant":"token"}]',
      },
    ],
  },
  HomeAbout: {
    label: '关于我们',
    description: '首页关于我们段（partnerRows 走 015.14 showcase 渠道；props 全可选）',
    category: 'marketing',
    schema: z
      .object({
        eyebrow: optText(100),
        title: optText(200),
        bannerImage: z.string().trim().max(1000).optional(),
        bannerAlt: z.string().trim().max(200).optional(),
        clientsLabelImage: z.string().trim().max(1000).optional(),
        clientsLabelAlt: z.string().trim().max(200).optional(),
      })
      .strict(),
    fields: [
      { key: 'eyebrow', label: '眉题', type: 'string' },
      { key: 'title', label: '标题', type: 'string' },
      { key: 'bannerImage', label: '横幅图', type: 'image' },
      { key: 'bannerAlt', label: '横幅图 alt', type: 'string' },
      { key: 'clientsLabelImage', label: '客户标签图', type: 'image' },
      { key: 'clientsLabelAlt', label: '客户标签图 alt', type: 'string' },
    ],
  },
  HomeInsights: {
    label: 'Resources 推荐',
    description: '首页 Resources 段（条目永远走 /api/home/insights 推荐位；仅标题/More 链接可配）',
    category: 'marketing',
    schema: z
      .object({
        eyebrow: optText(100),
        title: optText(200),
        moreLabel: optText(50),
        moreHref: z.string().trim().max(500).optional(),
      })
      .strict(),
    fields: [
      { key: 'eyebrow', label: '眉题', type: 'string' },
      { key: 'title', label: '标题', type: 'string' },
      { key: 'moreLabel', label: 'More 按钮文案', type: 'string' },
      { key: 'moreHref', label: 'More 按钮链接', type: 'string' },
    ],
  },
  HomeCustomerLogos: {
    label: '客户 Logo 墙',
    description: '首页客户 Logo 展示（数据驱动）',
    category: 'marketing',
    ...emptyMeta,
    contentEntry: { label: 'Logo 墙素材管理', adminRoute: '/showcase/logos' },
  },
  HomeDeliverables: {
    label: '交付成果',
    description: '首页交付成果展示（数据驱动）',
    category: 'marketing',
    ...emptyMeta,
    contentEntry: { label: '首页静态数据', dataPath: 'data/home.ts' },
  },
  AboutTextBlock: {
    label: '段落文本块',
    description: '大字号段落文本（关于页风格），支持对齐与宽度档位',
    category: 'content',
    schema: z
      .object({
        paragraphs: z.array(z.string().trim().min(1).max(2000)).min(1).max(12),
        align: z.enum(['left', 'center']).optional(),
        size: z.enum(['default', 'full', 'large']).optional(),
      })
      .strict(),
    fields: [
      {
        key: 'paragraphs',
        label: '段落（JSON 字符串数组）',
        type: 'json',
        required: true,
        default: [''],
        placeholder: '["第一段","第二段"]',
      },
      {
        key: 'align',
        label: '对齐',
        type: 'select',
        default: 'center',
        options: [
          { label: '居中', value: 'center' },
          { label: '左对齐', value: 'left' },
        ],
      },
      {
        key: 'size',
        label: '宽度/字号档',
        type: 'select',
        default: 'large',
        options: [
          { label: '大（默认）', value: 'large' },
          { label: '标准', value: 'default' },
          { label: '通栏', value: 'full' },
        ],
      },
    ],
  },
  AboutHeroStats: {
    label: '关键数据带',
    description: '关于页关键数字（value/label 三列网格）',
    category: 'content',
    schema: z
      .object({
        items: z
          .array(
            z.object({
              value: z.string().trim().min(1).max(100),
              label: z.string().trim().min(1).max(200),
            }),
          )
          .min(1)
          .max(6),
      })
      .strict(),
    fields: [
      {
        key: 'items',
        label: '数据项（JSON 数组 {value,label}）',
        type: 'json',
        required: true,
        default: [{ value: '500+', label: '全球客户' }],
        placeholder: '[{"value":"500+","label":"全球客户"}]',
      },
    ],
  },
}
