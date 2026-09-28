import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { CUSTOM_SECTION_NAMES } from '~/components/sections/custom-names'
import type { ComponentFieldMeta } from '~/components/sections/custom-props'
import { CUSTOM_COMPONENT_META } from '~/components/sections/custom-props'
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

const knownIds: ReadonlySet<string> = new Set(PAGE_COMPONENT_IDS)

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
    }
  })
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
      if (seen.has(id)) {
        continue
      }
      seen.add(id)
      usage[id] ??= { count: 0, slugs: new Set() }
      usage[id].count += 1
      usage[id].slugs.add(row.slug)
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
