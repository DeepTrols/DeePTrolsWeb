import { z } from 'zod'
import { navIconComponents } from '~/components/navigation/nav-icons'
import { aboutAddress, aboutContacts, aboutIntroParagraphs, aboutValues } from '~/data/about'
import { deliverablesData } from '~/data/home-deliverables'
import { homeEcosystemCards, homeProductCards, homeSolutionItems } from '~/data/home-sections'
import { whyEngineHeading, whyEngineLinksData, whyServiceItemsData, whyServiceResetHeading } from '~/data/why-sections'
import { whyTrustTabsData } from '~/data/why-trust'
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
  type: 'boolean' | 'icon' | 'image' | 'json' | 'list' | 'number' | 'select' | 'string' | 'text'
  required?: boolean
  options?: { label: string; value: string }[]
  default?: unknown
  placeholder?: string
  /** list 字段：对象行的子字段描述符（可再嵌套一层 list） */
  itemFields?: ComponentFieldMeta[]
  /** list 字段：标量行元素类型（与 itemFields 互斥） */
  itemType?: 'number' | 'string'
  /** list 字段：行数上下限（仅编辑器按钮态；服务端权威是 zod min/max） */
  minItems?: number
  maxItems?: number
  /** list 字段：prop 缺失时编辑器的预览行（不自动落库，保持稀疏存储） */
  fallback?: unknown
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
    description: '关于我们页公司简介 + 图片轮播（图集走素材管理；文字可后台编辑）',
    category: 'content',
    schema: z
      .object({
        title: optText(100),
        paragraphs: z
          .array(z.string().trim().min(1).max(2000))
          .min(1)
          .max(12)
          .optional(),
      })
      .strict(),
    fields: [
      { key: 'title', label: '标题', type: 'string', default: '公司介绍' },
      {
        key: 'paragraphs',
        label: '简介段落',
        type: 'list',
        itemType: 'string',
        minItems: 1,
        maxItems: 12,
        fallback: aboutIntroParagraphs,
      },
    ],
  },
  AboutValuesSection: {
    label: '价值观',
    description: '关于我们页价值观卡片（数据驱动，可后台编辑）',
    category: 'content',
    schema: z
      .object({
        title: optText(200),
        subtitle: optText(500),
        items: z
          .array(
            z.object({
              title: z.string().trim().min(1).max(100),
              revealTitle: z.string().trim().min(1).max(100),
              description: z.string().trim().min(1).max(1000),
            }),
          )
          .min(1)
          .max(8)
          .optional(),
      })
      .strict(),
    fields: [
      { key: 'title', label: '标题', type: 'string', default: '我们的核心价值观' },
      {
        key: 'subtitle',
        label: '副标题',
        type: 'text',
        default: '这些原则指引着我们的一言一行，从产品创新到客户关系，贯穿始终。',
      },
      {
        key: 'items',
        label: '价值观卡片',
        type: 'list',
        minItems: 1,
        maxItems: 8,
        fallback: aboutValues,
        itemFields: [
          { key: 'title', label: '卡片标题', type: 'string', required: true },
          { key: 'revealTitle', label: '展开标题', type: 'string', required: true },
          { key: 'description', label: '描述', type: 'text', required: true },
        ],
      },
    ],
  },
  AboutAddressSection: {
    label: '公司地址',
    description: '关于我们页地址信息（地图嵌入保持代码内置；文字可后台编辑）',
    category: 'content',
    schema: z
      .object({
        title: optText(100),
        company: optText(200),
        address: optText(500),
      })
      .strict(),
    fields: [
      { key: 'title', label: '标题', type: 'string', default: '公司地址' },
      { key: 'company', label: '公司名', type: 'string', default: '武汉深度数智科技有限公司' },
      { key: 'address', label: '地址', type: 'text', default: aboutAddress },
    ],
  },
  AboutContactSection: {
    label: '联系方式',
    description: '关于我们页联系方式卡片（数据驱动，可后台编辑）',
    category: 'content',
    schema: z
      .object({
        title: optText(100),
        items: z
          .array(
            z.object({
              label: z.string().trim().min(1).max(100),
              value: z.string().trim().min(1).max(200),
              href: z.string().trim().min(1).max(500),
            }),
          )
          .min(1)
          .max(8)
          .optional(),
      })
      .strict(),
    fields: [
      { key: 'title', label: '标题', type: 'string', default: '联系我们' },
      {
        key: 'items',
        label: '联系方式',
        type: 'list',
        minItems: 1,
        maxItems: 8,
        fallback: aboutContacts,
        itemFields: [
          { key: 'label', label: '名称', type: 'string', required: true },
          { key: 'value', label: '内容', type: 'string', required: true },
          { key: 'href', label: '链接', type: 'string', required: true },
        ],
      },
    ],
  },
  WhyEngine: {
    label: '产品引擎矩阵',
    description: '为什么选择我们页的引擎矩阵区（链接可后台编辑）',
    category: 'marketing',
    schema: z
      .object({
        eyebrow: optText(100),
        title: optText(200),
        description: optText(1000),
        links: z
          .array(
            z.object({
              title: z.string().trim().min(1).max(200),
              description: z.string().trim().min(1).max(500),
              href: z.string().trim().min(1).max(500),
              icon: iconName.optional(),
            }),
          )
          .min(1)
          .max(8)
          .optional(),
      })
      .strict(),
    fields: [
      { key: 'eyebrow', label: '眉题', type: 'string', default: whyEngineHeading.eyebrow },
      { key: 'title', label: '标题', type: 'string', default: whyEngineHeading.title },
      { key: 'description', label: '描述', type: 'text', default: whyEngineHeading.description },
      {
        key: 'links',
        label: '引擎链接',
        type: 'list',
        minItems: 1,
        maxItems: 8,
        fallback: whyEngineLinksData,
        itemFields: [
          { key: 'title', label: '标题', type: 'string', required: true },
          { key: 'description', label: '描述', type: 'text', required: true },
          { key: 'href', label: '链接', type: 'string', required: true },
          { key: 'icon', label: '图标', type: 'icon' },
        ],
      },
    ],
  },
  WhyServiceReset: {
    label: '服务概览',
    description: '为什么选择我们页的服务重定义区（概览图代码内置；条目可后台编辑）',
    category: 'marketing',
    schema: z
      .object({
        eyebrow: optText(100),
        title: optText(200),
        items: z
          .array(
            z.object({
              title: z.string().trim().min(1).max(200),
              description: z.string().trim().min(1).max(1000),
              icon: iconName.optional(),
            }),
          )
          .min(1)
          .max(8)
          .optional(),
      })
      .strict(),
    fields: [
      { key: 'eyebrow', label: '眉题', type: 'string', default: whyServiceResetHeading.eyebrow },
      { key: 'title', label: '标题', type: 'string', default: whyServiceResetHeading.title },
      {
        key: 'items',
        label: '服务条目',
        type: 'list',
        minItems: 1,
        maxItems: 8,
        fallback: whyServiceItemsData,
        itemFields: [
          { key: 'title', label: '标题', type: 'string', required: true },
          { key: 'description', label: '描述', type: 'text', required: true },
          { key: 'icon', label: '图标', type: 'icon' },
        ],
      },
    ],
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
        label: '标签页',
        type: 'list',
        minItems: 1,
        maxItems: 8,
        fallback: whyTrustTabsData,
        itemFields: [
          { key: 'key', label: 'key', type: 'string', required: true },
          { key: 'label', label: '标签文案', type: 'string', required: true },
          {
            key: 'features',
            label: '特性卡',
            type: 'list',
            minItems: 1,
            maxItems: 8,
            itemFields: [
              { key: 'title', label: '标题', type: 'string', required: true },
              { key: 'subtitle', label: '副标题', type: 'string', required: true },
              { key: 'description', label: '描述', type: 'text', required: true },
              { key: 'icon', label: '图标', type: 'icon' },
            ],
          },
        ],
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
        label: '产品卡片',
        type: 'list',
        minItems: 1,
        maxItems: 8,
        fallback: homeProductCards,
        itemFields: [
          { key: 'name', label: '产品名', type: 'string', required: true },
          { key: 'title', label: '标题', type: 'string' },
          { key: 'description', label: '描述', type: 'text', required: true },
          { key: 'icon', label: '图标', type: 'icon' },
        ],
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
        label: '方案项',
        type: 'list',
        minItems: 1,
        maxItems: 12,
        fallback: homeSolutionItems,
        itemFields: [
          { key: 'key', label: 'key', type: 'string', required: true },
          { key: 'tab', label: 'tab 文案', type: 'string', required: true },
          { key: 'title', label: '标题', type: 'string', required: true },
          { key: 'englishTitle', label: '英文标题', type: 'string' },
          { key: 'description', label: '描述', type: 'text', required: true },
          { key: 'image', label: '配图', type: 'image', required: true },
          { key: 'href', label: '跳转链接', type: 'string', required: true },
        ],
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
        label: '生态卡片',
        type: 'list',
        minItems: 1,
        maxItems: 8,
        fallback: homeEcosystemCards,
        itemFields: [
          { key: 'title', label: '标题', type: 'string', required: true },
          { key: 'description', label: '描述', type: 'text', required: true },
          { key: 'tag', label: '标签', type: 'string', required: true },
          { key: 'href', label: '跳转链接', type: 'string', required: true },
          {
            key: 'points',
            label: '要点',
            type: 'list',
            itemType: 'string',
            maxItems: 8,
          },
          { key: 'icon', label: '图标', type: 'icon' },
          {
            key: 'variant',
            label: '视觉变体',
            type: 'select',
            required: true,
            options: [
              { label: 'token', value: 'token' },
              { label: 'agent', value: 'agent' },
              { label: 'infra', value: 'infra' },
              { label: 'report', value: 'report' },
            ],
          },
        ],
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
    description: '首页交付成果轮播（CSS 仅支持 3 屏，items 硬限 3 条；可后台编辑）',
    category: 'marketing',
    schema: z
      .object({
        items: z
          .array(
            z.object({
              title: z.string().trim().min(1).max(200),
              description: z.string().trim().min(1).max(1000),
              icon: iconName.optional(),
              image: z.string().trim().min(1).max(1000),
              href: z.string().trim().min(1).max(500),
            }),
          )
          .min(3)
          .max(3)
          .optional(),
      })
      .strict(),
    fields: [
      {
        key: 'items',
        label: '业务方向（固定 3 屏）',
        type: 'list',
        minItems: 3,
        maxItems: 3,
        fallback: deliverablesData,
        itemFields: [
          { key: 'title', label: '标题', type: 'string', required: true },
          { key: 'description', label: '描述', type: 'text', required: true },
          { key: 'icon', label: '图标', type: 'icon' },
          { key: 'image', label: '配图', type: 'image', required: true },
          { key: 'href', label: '跳转链接', type: 'string', required: true },
        ],
      },
    ],
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
        label: '段落',
        type: 'list',
        itemType: 'string',
        required: true,
        minItems: 1,
        maxItems: 12,
        default: [''],
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
  AboutHero: {
    label: '关于页 Hero',
    description: '关于我们页首屏视觉（零 props 自包含，视觉/动画代码内置）',
    category: 'content',
    ...emptyMeta,
    contentEntry: { label: '组件源码（Hero 视觉内置）', dataPath: 'components/about/AboutHero.vue' },
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
        label: '数据项',
        type: 'list',
        required: true,
        minItems: 1,
        maxItems: 6,
        default: [{ value: '500+', label: '全球客户' }],
        itemFields: [
          { key: 'value', label: '数值', type: 'string', required: true },
          { key: 'label', label: '名称', type: 'string', required: true },
        ],
      },
    ],
  },
}
