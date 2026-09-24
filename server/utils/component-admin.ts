import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { CUSTOM_SECTION_NAMES } from '~/components/sections/custom-names'
import { useNewsDatabase } from '../db/client'
import { componentStates } from '../db/schema'

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

/** 读禁用清单：命中返回 { disabled, updatedAt }；无 DB/未入库/zod 复验失败返回 null（调用方按 [] 处理） */
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
    return parsed.success ? { disabled: parsed.data, updatedAt: row.updatedAt.toISOString() } : null
  }
  catch {
    return null
  }
}

/** 写禁用清单（upsert 幂等）：成功 true；无 DB/失败 false */
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
  catch {
    return false
  }
}
