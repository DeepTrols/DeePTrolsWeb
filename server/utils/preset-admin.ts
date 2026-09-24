import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { useNewsDatabase } from '../db/client'
import { sectionPresets } from '../db/schema'
import { pageSectionSchema } from './page-sections'

/**
 * 区块模板库（015.13）：运营把编辑器里的区块快照存成可复用模板。
 * section 存单个 PageSection（zod 校验）；一期模板内容不在列表页编辑——改内容 = 编辑器改完另存新模板。
 */
export const presetInputSchema = z.object({
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(500).default(''),
  section: pageSectionSchema,
})
export type PresetInput = z.infer<typeof presetInputSchema>

export interface SectionPresetRecord extends PresetInput {
  id: number
  createdAt: string
  updatedAt: string
}

function toRecord(row: typeof sectionPresets.$inferSelect): SectionPresetRecord | null {
  const section = pageSectionSchema.safeParse(row.section)
  if (!section.success) {
    return null
  }
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    section: section.data,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

/** 列表：按 id 升序；无 DB/失败返回 null（调用方 503） */
export async function listPresets(): Promise<SectionPresetRecord[] | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db.select().from(sectionPresets).orderBy(asc(sectionPresets.id)).limit(200)
    return rows.flatMap((row) => {
      const record = toRecord(row)
      return record ? [record] : []
    })
  }
  catch {
    return null
  }
}

export async function getPreset(id: number): Promise<SectionPresetRecord | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db.select().from(sectionPresets).where(eq(sectionPresets.id, id)).limit(1)
    const row = rows[0]
    return row ? toRecord(row) : null
  }
  catch {
    return null
  }
}

/** 新建：成功返回 id；无 DB/失败返回 null */
export async function createPreset(input: PresetInput): Promise<number | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db.insert(sectionPresets).values(input).returning({ id: sectionPresets.id })
    return rows[0]?.id ?? null
  }
  catch {
    return null
  }
}

/** 更新（一期仅改名/描述由路由层控制字段）：命中 true；未命中/失败 false */
export async function updatePreset(id: number, input: PresetInput): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const rows = await db
      .update(sectionPresets)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(sectionPresets.id, id))
      .returning({ id: sectionPresets.id })
    return rows.length > 0
  }
  catch {
    return false
  }
}

/** 删除：命中行返回 true */
export async function deletePreset(id: number): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const rows = await db.delete(sectionPresets).where(eq(sectionPresets.id, id)).returning({ id: sectionPresets.id })
    return rows.length > 0
  }
  catch {
    return false
  }
}
