import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { useNewsDatabase } from '../db/client'
import { leads } from '../db/schema'
import { internalServerError } from './server-log'

/** 线索状态流转协议：admin PATCH 的入口校验 */
export const leadStatusSchema = z.enum(['new', 'followed', 'closed'])
export type LeadStatus = z.infer<typeof leadStatusSchema>

export interface LeadRecord {
  id: number
  name: string
  company: string
  phone: string
  email: string
  message: string
  source: string
  status: LeadStatus
  createdAt: string
}

/** 线索列表（admin）：最新在前；未配置 DB 返回空表（页面显示空状态）；查询异常记录日志后抛出（端点 500） */
export async function listLeads(): Promise<LeadRecord[]> {
  const db = useNewsDatabase()
  if (!db) {
    return []
  }

  try {
    const rows = await db
      .select({
        id: leads.id,
        name: leads.name,
        company: leads.company,
        phone: leads.phone,
        email: leads.email,
        message: leads.message,
        source: leads.source,
        status: leads.status,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .orderBy(desc(leads.createdAt), desc(leads.id))
      .limit(200)

    return rows.map(row => ({ ...row, createdAt: row.createdAt.toISOString() }))
  }
  catch (error) {
    throw internalServerError('leads-admin.listLeads', error)
  }
}

/** 状态流转：命中行返回 true；未配置 DB / 未知 id 返回 false（API 层 404 语义）；异常记录日志后抛出（端点 500） */
export async function updateLeadStatus(id: number, status: LeadStatus): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    const rows = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning({ id: leads.id })
    return rows.length > 0
  }
  catch (error) {
    throw internalServerError('leads-admin.updateLeadStatus', error, { id })
  }
}
