import { z } from 'zod'
import { CUSTOM_SECTION_NAMES } from '~/components/sections/custom-names'
import { navIconComponents } from '~/components/navigation/nav-icons'
import { articleBlocksSchema } from './article-blocks'

/**
 * CMS 页面区块协议（Phase D 布局管理）。
 * 每型一个 zod schema，sectionsSchema 为 discriminatedUnion；Phase C 的 richText 形状保持兼容。
 * 渲染侧注册表见 components/sections/（标准型）与 custom-registry.ts（custom 逃生门）。
 */

const visibleField = { visible: z.boolean().default(true) }

/** 区块间距三档（015.12）：tight=pb-8/lg:pb-16，compact=pb-16/lg:pb-32（现状视觉默认），default=pb-32/lg:pb-44 */
export const sectionSpacingSchema = z.enum(['tight', 'compact', 'default']).default('compact')
const sharedFields = { ...visibleField, spacing: sectionSpacingSchema }

/** 大图横幅： eyebrow/title/subtitle 居中头图区（页面含 hero 区块时替代默认页头） */
export const heroSectionSchema = z.object({
  type: z.literal('hero'),
  ...sharedFields,
  eyebrow: z.string().trim().max(100).optional(),
  title: z.string().trim().min(1).max(500),
  subtitle: z.string().trim().max(1000).optional(),
})

/** 指标带：复用 ProductMetricsSection（items { value, label }，1-8 条） */
export const metricsSectionSchema = z.object({
  type: z.literal('metrics'),
  ...sharedFields,
  items: z
    .array(
      z.object({
        value: z.string().trim().min(1).max(100),
        label: z.string().trim().min(1).max(200),
      }),
    )
    .min(1)
    .max(8),
})

/** 特性网格：复用 ProductFeatureGridSection；icon 为 nav-icons 注册表字符串名 */
export const featureGridSectionSchema = z.object({
  type: z.literal('featureGrid'),
  ...sharedFields,
  eyebrow: z.string().trim().max(100).optional(),
  title: z.string().trim().min(1).max(500),
  subtitle: z.string().trim().max(1000).optional(),
  columns: z.enum(['two', 'three', 'four']).default('three'),
  items: z
    .array(
      z.object({
        title: z.string().trim().min(1).max(200),
        subtitle: z.string().trim().max(200).optional(),
        description: z.string().trim().min(1).max(2000),
        icon: z
          .string()
          .trim()
          .refine(name => name in navIconComponents, { message: 'Unknown nav icon' })
          .optional(),
        points: z.array(z.string().trim().min(1).max(200)).max(8).optional(),
        tags: z.array(z.string().trim().min(1).max(50)).max(8).optional(),
      }),
    )
    .min(1)
    .max(24),
})

/** CTA 横幅：复用 CtaSection */
export const ctaSectionSchema = z.object({
  type: z.literal('cta'),
  ...sharedFields,
  title: z.string().trim().min(1).max(500),
  description: z.string().trim().max(1000).optional(),
  ctaLabel: z.string().trim().min(1).max(100).default('免费获取专属方案'),
  ctaHref: z.string().trim().min(1).max(500).default('/contact'),
})

/** 富文本：ArticleBlock[]（Phase C 唯一类型，形状不变） */
export const richTextSectionSchema = z.object({
  type: z.literal('richText'),
  ...sharedFields,
  blocks: articleBlocksSchema,
})

/** Logo 墙：静态网格（name 必填，image/text 至少其一由 refine 保证） */
export const logoStripSectionSchema = z.object({
  type: z.literal('logoStrip'),
  ...sharedFields,
  title: z.string().trim().max(500).optional(),
  logos: z
    .array(
      z
        .object({
          name: z.string().trim().min(1).max(200),
          image: z.string().trim().max(1000).optional(),
          text: z.string().trim().max(200).optional(),
        })
        .refine(logo => logo.image || logo.text, { message: 'Logo needs image or text' }),
    )
    .min(1)
    .max(24),
})

/** 图片横幅：容器宽大图 + 可选说明 */
export const imageBannerSectionSchema = z.object({
  type: z.literal('imageBanner'),
  ...sharedFields,
  src: z.string().trim().min(1).max(1000),
  alt: z.string().trim().min(1).max(500),
  caption: z.string().trim().max(500).optional(),
})

/** 逃生门：按名映射现有零 props 定制组件（注册表见 custom-names.ts），props 不入库 */
export const customSectionSchema = z.object({
  type: z.literal('custom'),
  ...sharedFields,
  name: z.enum(CUSTOM_SECTION_NAMES),
})

export const pageSectionSchema = z.discriminatedUnion('type', [
  heroSectionSchema,
  metricsSectionSchema,
  featureGridSectionSchema,
  ctaSectionSchema,
  richTextSectionSchema,
  logoStripSectionSchema,
  imageBannerSectionSchema,
  customSectionSchema,
])
export const pageSectionsSchema = z.array(pageSectionSchema).max(50)
export type PageSection = z.infer<typeof pageSectionSchema>
