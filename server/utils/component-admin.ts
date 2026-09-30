import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { CUSTOM_SECTION_NAMES } from '~/components/sections/custom-names'
import type { ComponentFieldMeta } from '~/components/sections/custom-props'
import { CUSTOM_COMPONENT_META } from '~/components/sections/custom-props'
import { HERO_VISUAL_LABELS, HERO_VISUAL_NAMES } from '~/components/sections/hero-visual-names'
import { useNewsDatabase } from '../db/client'
import { componentStates, pages } from '../db/schema'
import { pageSectionsSchema } from './page-sections'
import { internalServerError, logServerError } from './server-log'

/**
 * 组件管理（015.12）：页面可插入组件 = 8 标准区块 type + 定制架构组件（CUSTOM_SECTION_NAMES）。
 * 组件 ID 约定：标准型 = type 字符串（'hero' 等小写），定制 = 组件名（PascalCase，不会撞 type）。
 * 启停是编辑面语义：禁用后 admin 编辑器「新增区块」下拉不再出现；渲染器与 zod 不变，
 * 已发布页含被禁用组件照常渲染（避免线上页面被运营动作破坏）。
 */
export const PAGE_COMPONENT_IDS = [
  'hero',
  'metrics',
  'featureGrid',
  'cta',
  'richText',
  'logoStrip',
  'imageBanner',
  'custom',
  ...CUSTOM_SECTION_NAMES,
] as const

const knownIds: ReadonlySet<string> = new Set([...PAGE_COMPONENT_IDS, ...HERO_VISUAL_NAMES])

/** 单行 key：当前只有页面区块这一类组件 */
export const COMPONENT_STATE_KEY = 'page-sections' as const

export const disabledComponentsSchema = z
  .array(z.string().trim().min(1).max(50))
  .max(100)
  .refine(ids => ids.every(id => knownIds.has(id)), { message: 'Unknown component id' })

/** 读禁用清单：命中返回 { disabled, updatedAt }；无 DB/未入库/zod 复验失败返回 null（调用方按 [] 处理，复验失败会记录日志）；查询异常记录日志后抛出（端点 500） */
export async function getDisabledComponents(): Promise<{ disabled: string[], updatedAt: string } | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .select({ disabled: componentStates.disabled, updatedAt: componentStates.updatedAt })
      .from(componentStates)
      .where(eq(componentStates.key, COMPONENT_STATE_KEY))
      .limit(1)

    const row = rows[0]
    if (!row) {
      return null
    }
    const parsed = disabledComponentsSchema.safeParse(row.disabled)
    if (!parsed.success) {
      // 脏数据行：记录后按未入库处理（回退全启用），不再静默吞掉
      logServerError('component-admin.getDisabledComponents', parsed.error, { key: COMPONENT_STATE_KEY })
      return null
    }
    return { disabled: parsed.data, updatedAt: row.updatedAt.toISOString() }
  }
  catch (error) {
    throw internalServerError('component-admin.getDisabledComponents', error)
  }
}

/** 写禁用清单（upsert 幂等）：成功 true；未配置 DB 返回 false（端点 503）；异常记录日志后抛出（端点 500） */
export async function setDisabledComponents(disabled: string[]): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    await db
      .insert(componentStates)
      .values({ key: COMPONENT_STATE_KEY, disabled })
      .onConflictDoUpdate({
        target: componentStates.key,
        set: { disabled, updatedAt: new Date() },
      })
    return true
  }
  catch (error) {
    throw internalServerError('component-admin.setDisabledComponents', error, { count: disabled.length })
  }
}

/** 注册组件发现（015.13）：schema 不出门的 JSON 子集（label/description/category/fields 给 vben 动态表单） */
export interface ComponentRegistryEntry {
  name: string
  label: string
  description: string
  category: 'architecture' | 'content' | 'form' | 'marketing'
  fields: ComponentFieldMeta[]
  contentEntry?: ComponentContentEntry
}

export function listComponentRegistry(): ComponentRegistryEntry[] {
  return CUSTOM_SECTION_NAMES.map(name => {
    const meta = CUSTOM_COMPONENT_META[name]
    return {
      name,
      label: meta.label,
      description: meta.description,
      category: meta.category,
      fields: meta.fields,
      contentEntry: meta.contentEntry,
    }
  })
}

/** hero split-visual 视觉白名单发现（015.18）：name + 中文名下发给 vben hero 表单下拉 */
export function listHeroVisuals(): { label: string, name: string }[] {
  return HERO_VISUAL_NAMES.map(name => ({ name, label: HERO_VISUAL_LABELS[name] }))
}

/** 标准区块型中文名（015.19d 组件清单下发用） */
const STANDARD_COMPONENT_LABELS: Record<string, string> = {
  hero: 'Hero 首屏',
  metrics: '指标带',
  featureGrid: '特性网格',
  cta: 'CTA 横幅',
  richText: '富文本',
  logoStrip: 'Logo 墙',
  imageBanner: '图片横幅',
  custom: '定制组件容器',
}

/** 组件内容运维入口（015.19d）：零 props 数据驱动组件的内容不在 CMS，指向后台路由或代码数据源 */
export interface ComponentContentEntry {
  label: string
  adminRoute?: string
  dataPath?: string
}

/** 组件全量清单条目（015.19d）：标准区块 + 定制组件 + hero 视觉三类统一下发 */
export interface ComponentCatalogEntry {
  id: string
  kind: 'custom' | 'hero-visual' | 'standard'
  label: string
  description: string
  category: ComponentRegistryEntry['category'] | null
  fields: ComponentFieldMeta[]
  contentEntry?: ComponentContentEntry
}

/** hero 视觉组件源码路径（组件管理详情「内容入口」展示用） */
const HERO_VISUAL_PATHS: Record<(typeof HERO_VISUAL_NAMES)[number], string> = {
  DgpHeroVisual: 'components/product/dgp/DgpHeroVisual.vue',
  DeviceAgentHeroVisual: 'components/product/device-agent/DeviceAgentHeroVisual.vue',
  TanyaoHeroVisual: 'components/product/tanyao/TanyaoHeroVisual.vue',
}

/** 全量组件清单：8 标准 type + 定制注册表 + hero 视觉白名单（组件管理页「全部组件」数据源） */
export function listComponentCatalog(): ComponentCatalogEntry[] {
  const standards: ComponentCatalogEntry[] = PAGE_COMPONENT_IDS.map((id) => {
    const custom = CUSTOM_SECTION_NAMES.includes(id as (typeof CUSTOM_SECTION_NAMES)[number])
    if (custom) {
      const meta = CUSTOM_COMPONENT_META[id as (typeof CUSTOM_SECTION_NAMES)[number]]
      return {
        id,
        kind: 'custom' as const,
        label: meta.label,
        description: meta.description,
        category: meta.category,
        fields: meta.fields,
        contentEntry: meta.contentEntry,
      }
    }
    return {
      id,
      kind: 'standard' as const,
      label: STANDARD_COMPONENT_LABELS[id] ?? id,
      description: 'CMS 标准区块型（参数在页面编辑器区块表单维护）',
      category: null,
      fields: [],
    }
  })
  const heroVisuals: ComponentCatalogEntry[] = HERO_VISUAL_NAMES.map(name => ({
    id: name,
    kind: 'hero-visual' as const,
    label: HERO_VISUAL_LABELS[name],
    description: 'hero split-visual 右侧动画视觉（零 props 自包含）',
    category: null,
    fields: [],
    contentEntry: { label: '组件源码（动画内置）', dataPath: HERO_VISUAL_PATHS[name] },
  }))
  return [...standards, ...heroVisuals]
}

/** 组件使用统计：组件 ID（标准型=type，定制=组件名）→ 引用页数与 slug 列表 */
export interface ComponentUsage {
  count: number
  slugs: string[]
}

/** 纯函数：对页面 rows 统计每个组件的引用次数（sections 解析失败的行跳过；visible:false 也算使用） */
export function scanSectionUsage(rows: { sections: unknown, slug: string }[]): Record<string, ComponentUsage> {
  const usage: Record<string, { count: number, slugs: Set<string> }> = {}
  for (const row of rows) {
    const parsed = pageSectionsSchema.safeParse(row.sections)
    if (!parsed.success) {
      continue
    }
    const seen = new Set<string>()
    for (const section of parsed.data) {
      const id = section.type === 'custom' ? section.name : section.type
      if (!seen.has(id)) {
        seen.add(id)
        usage[id] ??= { count: 0, slugs: new Set() }
        usage[id].count += 1
        usage[id].slugs.add(row.slug)
      }
      // 015.19d：hero split-visual 选用组件视觉时，视觉组件也计使用（name 为 PascalCase 不与 type 撞）
      const visualId = section.type === 'hero' && section.visualType === 'component' ? section.visualName : undefined
      if (visualId && !seen.has(visualId)) {
        seen.add(visualId)
        usage[visualId] ??= { count: 0, slugs: new Set() }
        usage[visualId].count += 1
        usage[visualId].slugs.add(row.slug)
      }
    }
  }
  return Object.fromEntries(
    Object.entries(usage).map(([id, entry]) => [id, { count: entry.count, slugs: [...entry.slugs].sort() }]),
  )
}

/** DB 读取全部页面 sections 并统计；无 DB 返回 {}；查询异常记录日志后抛出（端点 500） */
export async function getComponentUsage(): Promise<Record<string, ComponentUsage>> {
  const db = useNewsDatabase()
  if (!db) {
    return {}
  }

  try {
    const rows = await db.select({ slug: pages.slug, sections: pages.sections }).from(pages).limit(500)
    return scanSectionUsage(rows)
  }
  catch (error) {
    throw internalServerError('component-admin.getComponentUsage', error)
  }
}
