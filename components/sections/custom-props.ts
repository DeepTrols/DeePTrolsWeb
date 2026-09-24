import { z } from 'zod'
import type { CustomSectionName } from './custom-names'

/**
 * 注册组件 props 元数据（015.13 一期）：服务端 zod 校验 + admin 表单描述符的单源事实。
 * 纯 TS 模块：禁止 import .vue / 资源（?url），server 侧（component-admin）与客户端共享。
 * schema 用于 page-sections.ts 的 superRefine 入库校验；fields 经 API 下发给 vben 动态生成表单。
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
}

const emptyMeta = {
  schema: z.object({}).strict(),
  fields: [] as ComponentFieldMeta[],
}

export const CUSTOM_COMPONENT_META: Record<CustomSectionName, RegisteredComponentMeta> = {
  DdpArchitecture: {
    label: 'DDP 架构图',
    description: '数据开发平台产品架构图（零 props 自包含）',
    category: 'architecture',
    ...emptyMeta,
  },
  DlpArchitecture: {
    label: 'DLP 架构图',
    description: '数据开发套件产品架构图（零 props 自包含）',
    category: 'architecture',
    ...emptyMeta,
  },
  DmsArchitecture: {
    label: 'DMS 架构图',
    description: '数据微服务平台产品架构图（零 props 自包含）',
    category: 'architecture',
    ...emptyMeta,
  },
  ContactFormSection: {
    label: '线索表单',
    description: '联系我们线索收集表单（提交 POST /api/leads）',
    category: 'form',
    ...emptyMeta,
  },
  AboutIntroSection: {
    label: '公司介绍',
    description: '关于我们页公司简介 + 图片轮播（数据驱动）',
    category: 'content',
    ...emptyMeta,
  },
  AboutValuesSection: {
    label: '价值观',
    description: '关于我们页价值观卡片（数据驱动）',
    category: 'content',
    ...emptyMeta,
  },
  AboutAddressSection: {
    label: '公司地址',
    description: '关于我们页地址信息（数据驱动）',
    category: 'content',
    ...emptyMeta,
  },
  AboutContactSection: {
    label: '联系方式',
    description: '关于我们页联系方式卡片（数据驱动）',
    category: 'content',
    ...emptyMeta,
  },
  WhyEngine: {
    label: '产品引擎矩阵',
    description: '为什么选择我们页的引擎矩阵区（数据驱动）',
    category: 'marketing',
    ...emptyMeta,
  },
  WhyServiceReset: {
    label: '服务概览',
    description: '为什么选择我们页的服务重定义区（数据驱动）',
    category: 'marketing',
    ...emptyMeta,
  },
  WhyTrustTabs: {
    label: '信任背书',
    description: '为什么选择我们页的信任标签页（数据驱动）',
    category: 'marketing',
    ...emptyMeta,
  },
  HomeCustomerLogos: {
    label: '客户 Logo 墙',
    description: '首页客户 Logo 展示（数据驱动）',
    category: 'marketing',
    ...emptyMeta,
  },
  HomeDeliverables: {
    label: '交付成果',
    description: '首页交付成果展示（数据驱动）',
    category: 'marketing',
    ...emptyMeta,
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
