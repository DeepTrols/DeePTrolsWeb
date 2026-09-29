import { z } from 'zod'
import { CUSTOM_SECTION_NAMES } from '~/components/sections/custom-names'
import { CUSTOM_COMPONENT_META } from '~/components/sections/custom-props'
import { HERO_VISUAL_NAMES } from '~/components/sections/hero-visual-names'
import { navIconComponents } from '~/components/navigation/nav-icons'
import { articleBlocksSchema } from './article-blocks'
import { safeUrlSchema } from './safe-url'

/**
 * CMS 页面区块协议（Phase D 布局管理）。
 * 每型一个 zod schema，sectionsSchema 为 discriminatedUnion；Phase C 的 richText 形状保持兼容。
 * 渲染侧注册表见 components/sections/（标准型）与 custom-registry.ts（custom 逃生门）。
 */

const visibleField = { visible: z.boolean().default(true) }

/** 区块间距三档（015.12）：tight=pb-8/lg:pb-16，compact=pb-16/lg:pb-32（现状视觉默认），default=pb-32/lg:pb-44 */
export const sectionSpacingSchema = z.enum(['tight', 'compact', 'default']).default('compact')
const sharedFields = { ...visibleField, spacing: sectionSpacingSchema }

/**
 * Hero 版式（015.18）：simple=极简文本（存量默认，向后兼容）；
 * fullscreen-image=全屏背景图横幅（首页 HomeHero 形态）；split-visual=图文分栏（PageHero 家族归并）；
 * banner-dark=深色媒体横幅（方案页五合一，mediaType 选图/视频）；fullscreen-video=全屏视频居中（FDE 形态）。
 * per-variant 必填组校验集中在 pageSectionsSchema.superRefine（union 成员不能挂 superRefine）。
 */
export const heroVariantSchema = z
  .enum(['simple', 'fullscreen-image', 'split-visual', 'banner-dark', 'fullscreen-video'])
  .default('simple')

/** 大图横幅： eyebrow/title/subtitle 居中头图区（页面含 hero 区块时替代默认页头）；
 *  015.18 起 variant 驱动版式，扁平字段组按 variant 取用（未用字段允许存在但不渲染） */
export const heroSectionSchema = z.object({
  type: z.literal('hero'),
  ...sharedFields,
  variant: heroVariantSchema,
  eyebrow: z.string().trim().max(100).optional(),
  title: z.string().trim().min(1).max(500),
  subtitle: z.string().trim().max(1000).optional(),
  /** fullscreen-image：多行主标题（缺省回退 [title]） */
  titleLines: z.array(z.string().trim().min(1).max(200)).min(1).max(4).optional(),
  /** fullscreen-image / banner-dark(image)：背景图（站内路径或 http(s)） */
  backgroundImage: z.string().trim().max(1000).optional(),
  /** banner-dark(video) / fullscreen-video：背景视频 */
  backgroundVideo: z.string().trim().max(1000).optional(),
  /** banner-dark：媒体类型（缺省 image） */
  mediaType: z.enum(['image', 'video']).optional(),
  /** split-visual：徽标文案与对齐（缺省 left） */
  badge: z.string().trim().max(100).optional(),
  description: z.string().trim().max(1000).optional(),
  align: z.enum(['left', 'center']).optional(),
  ctaLabel: z.string().trim().max(100).optional(),
  ctaHref: safeUrlSchema(500).optional(),
  secondaryCtaLabel: z.string().trim().max(100).optional(),
  secondaryCtaHref: safeUrlSchema(500).optional(),
  /** split-visual 右侧视觉：none（缺省）/ component（白名单动画）/ image（静态图） */
  visualType: z.enum(['none', 'component', 'image']).optional(),
  visualName: z.enum(HERO_VISUAL_NAMES).optional(),
  visualImage: z.string().trim().max(1000).optional(),
  visualAlt: z.string().trim().max(500).optional(),
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
          // Object.hasOwn：`in` 会命中原型链键（toString/constructor 等），导致白名单绕过
          .refine(name => Object.hasOwn(navIconComponents, name), { message: 'Unknown nav icon' })
          .optional(),
        points: z.array(z.string().trim().min(1).max(200)).max(8).optional(),
        tags: z.array(z.string().trim().min(1).max(50)).max(8).optional(),
      }),
    )
    .min(1)
    .max(24),
})

/** CTA 横幅：复用 CtaSection；metrics 指标带（015.18 首页接管：HomeCta 三标签透传） */
export const ctaSectionSchema = z.object({
  type: z.literal('cta'),
  ...sharedFields,
  title: z.string().trim().min(1).max(500),
  description: z.string().trim().max(1000).optional(),
  ctaLabel: z.string().trim().min(1).max(100).default('免费获取专属方案'),
  ctaHref: safeUrlSchema(500).default('/contact'),
  metrics: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(200),
        value: z.string().trim().max(100).optional(),
      }),
    )
    .max(8)
    .optional(),
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

/** 逃生门/注册组件：按名映射定制组件（注册表见 custom-names.ts，元数据见 custom-props.ts）。
 *  props 为稀疏存储（015.13）：zod 不设默认值，渲染靠 SFC withDefaults，入库前按组件 schema 校验 */
export const customSectionSchema = z.object({
  type: z.literal('custom'),
  ...sharedFields,
  name: z.enum(CUSTOM_SECTION_NAMES),
  props: z.record(z.string(), z.unknown()).optional(),
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
export const pageSectionsSchema = z.array(pageSectionSchema).max(50).superRefine((sections, ctx) => {
  // hero 型区块至多 1 个：多 hero 会渲染出多个 h1，破坏页面标题语义
  let heroCount = 0
  for (const [index, section] of sections.entries()) {
    if (section.type !== 'hero') continue
    heroCount += 1
    if (heroCount > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At most one hero section is allowed',
        path: [index],
      })
    }
    // per-variant 必填组（015.18）：flat 字段组按 variant 校验，缺字段在这里统一报错
    const requireField = (field: 'backgroundImage' | 'backgroundVideo' | 'visualImage' | 'visualName', message: string) => {
      if (!section[field]) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [index, field] })
      }
    }
    switch (section.variant) {
      case 'banner-dark': {
        if ((section.mediaType ?? 'image') === 'video') {
          requireField('backgroundVideo', 'banner-dark video hero requires backgroundVideo')
        }
        else {
          requireField('backgroundImage', 'banner-dark image hero requires backgroundImage')
        }
        break
      }
      case 'fullscreen-image': {
        requireField('backgroundImage', 'fullscreen-image hero requires backgroundImage')
        break
      }
      case 'fullscreen-video': {
        requireField('backgroundVideo', 'fullscreen-video hero requires backgroundVideo')
        break
      }
      case 'split-visual': {
        const visualType = section.visualType ?? 'none'
        if (visualType === 'component') {
          requireField('visualName', 'split-visual component hero requires visualName')
        }
        if (visualType === 'image') {
          requireField('visualImage', 'split-visual image hero requires visualImage')
        }
        break
      }
      default: {
        break
      }
    }
  }
  // zod v3 discriminatedUnion 成员不能挂 superRefine → custom 的 per-name props 校验集中在这里
  for (const [index, section] of sections.entries()) {
    if (section.type !== 'custom') continue
    const meta = CUSTOM_COMPONENT_META[section.name]
    const result = meta.schema.safeParse(section.props ?? {})
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${section.name}: ${issue.message}`,
          path: [index, 'props', ...issue.path],
        })
      }
    }
  }
})
export type PageSection = z.infer<typeof pageSectionSchema>
