import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { useNewsDatabase } from '../db/client'
import { reports } from '../db/schema'
import { contentStatusSchema, solutionKeySchema } from './content-admin'

export const reportTypeSchema = z.enum(['产品规格书', '电子书', '白皮书', '视频', '幻灯片', '基准测试报告'])

/** 报告写入协议（新建/更新同一形状；href 唯一约束冲突返回 'conflict'） */
export const reportInputSchema = z.object({
  type: reportTypeSchema,
  category: z.string().trim().min(1).max(200),
  solutionKey: solutionKeySchema.nullable().default(null),
  title: z.string().trim().min(1).max(500),
  summary: z.string().trim().min(1),
  image: z.string().trim().min(1).max(1000),
  href: z.string().trim().min(1).max(500),
  sortOrder: z.number().int().min(0),
  status: contentStatusSchema.default('draft'),
  featured: z.boolean().default(false),
})
export type ReportInput = z.infer<typeof reportInputSchema>

export interface AdminReportRecord {
  id: number
  type: z.infer<typeof reportTypeSchema>
  category: string
  title: string
  href: string
  sortOrder: number
  status: z.infer<typeof contentStatusSchema>
  featured: boolean
  updatedAt: string
}

export interface AdminReportPayload extends ReportInput {
  id: number
}

/** 报告列表（admin）：含草稿，按 sortOrder；未配置 DB 返回空表 */
export async function listAdminReports(): Promise<AdminReportRecord[]> {
  const db = useNewsDatabase()
  if (!db) {
    return []
  }

  try {
    const rows = await db
      .select({
        id: reports.id,
        type: reports.type,
        category: reports.category,
        title: reports.title,
        href: reports.href,
        sortOrder: reports.sortOrder,
        status: reports.status,
        featured: reports.featured,
        updatedAt: reports.updatedAt,
      })
      .from(reports)
      .orderBy(asc(reports.sortOrder), asc(reports.id))
      .limit(500)

    return rows.map(row => ({ ...row, updatedAt: row.updatedAt.toISOString() }))
  }
  catch {
    return []
  }
}

export async function getAdminReport(id: number): Promise<AdminReportPayload | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .select({
        id: reports.id,
        type: reports.type,
        category: reports.category,
        solutionKey: reports.solutionKey,
        title: reports.title,
        summary: reports.summary,
        image: reports.image,
        href: reports.href,
        sortOrder: reports.sortOrder,
        status: reports.status,
        featured: reports.featured,
      })
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1)

    return rows[0] ?? null
  }
  catch {
    return null
  }
}

/** 新建：href 冲突返回 'conflict'；成功返回新 id；无 DB/失败返回 null */
export async function createReport(input: ReportInput): Promise<'conflict' | number | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const existing = await db.select({ id: reports.id }).from(reports).where(eq(reports.href, input.href)).limit(1)
    if (existing.length) {
      return 'conflict'
    }
    const rows = await db.insert(reports).values(input).returning({ id: reports.id })
    return rows[0]?.id ?? null
  }
  catch {
    return null
  }
}

/** 更新：href 冲突返回 'conflict'；命中行返回 true；未命中/失败返回 false */
export async function updateReport(id: number, input: ReportInput): Promise<'conflict' | boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const existing = await db.select({ id: reports.id }).from(reports).where(eq(reports.href, input.href)).limit(1)
    if (existing.length && existing[0]?.id !== id) {
      return 'conflict'
    }
    const rows = await db
      .update(reports)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(reports.id, id))
      .returning({ id: reports.id })
    return rows.length > 0
  }
  catch {
    return false
  }
}

/** 删除：命中行返回 true */
export async function deleteReport(id: number): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const rows = await db.delete(reports).where(eq(reports.id, id)).returning({ id: reports.id })
    return rows.length > 0
  }
  catch {
    return false
  }
}
