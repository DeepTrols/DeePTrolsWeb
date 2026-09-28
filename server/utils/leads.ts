import { z } from 'zod'
import { useNewsDatabase } from '../db/client'
import { leads } from '../db/schema'

/**
 * 线索写入协议：POST /api/leads 的唯一入口校验。
 * phone/email 至少其一；website 为蜜罐字段，必须为空（机器人填了即 400）。
 */
export const leadInputSchema = z
  .object({
    name: z.string().trim().min(1).max(50),
    company: z.string().trim().max(100).default(''),
    phone: z.union([z.literal(''), z.string().trim().regex(/^1[3-9]\d{9}$/)]).default(''),
    email: z.union([z.literal(''), z.email().max(100)]).default(''),
    message: z.string().trim().min(1).max(1000),
    source: z.string().trim().max(200).regex(/^\//).default('/contact'),
    website: z.string().max(0).optional(),
  })
  .refine(input => input.phone !== '' || input.email !== '', {
    message: '手机号与邮箱至少填写一项',
  })

export type LeadInput = z.infer<typeof leadInputSchema>

/**
 * 线索落库：
 * - 已配置数据库 → 正常插入；插入失败返回 false，由 API 层统一 500（不暴露内部错误）。
 * - 未配置 NUXT_DATABASE_URL：
 *   - 生产形态（配置了 NUXT_SESSION_PASSWORD / NUXT_ADMIN_PASSWORD）→ 抛 503，绝不静默丢弃线索；
 *   - 本地开发（无上述密码）→ 返回 true，便于无 PG 时走完表单流程调试。
 *   两种情况的日志均脱敏：只记录“发生了一次丢弃/拒绝”及时间，绝不输出姓名/电话/邮箱/留言等 PII。
 */
export async function insertLead(input: LeadInput): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    const productionShaped = Boolean(process.env.NUXT_SESSION_PASSWORD || process.env.NUXT_ADMIN_PASSWORD)
    if (productionShaped) {
      // 生产漏配 DATABASE_URL：线索不能静默丢失，返回 503 让上游/监控可见（日志不含任何 PII）
      console.info('[leads] 未配置 NUXT_DATABASE_URL，生产形态下拒绝线索写入', { at: new Date().toISOString() })
      throw createError({ statusCode: 503, statusMessage: 'Lead storage unavailable' })
    }
    // 本地开发：仅记录发生了一次丢弃，不落 PII
    console.info('[leads] 未配置 NUXT_DATABASE_URL，本地开发丢弃一条线索（PII 不记录）', { at: new Date().toISOString() })
    return true
  }

  try {
    await db
      .insert(leads)
      .values({
        name: input.name,
        company: input.company,
        phone: input.phone,
        email: input.email,
        message: input.message,
        source: input.source,
        status: 'new',
      })
    return true
  }
  catch {
    return false
  }
}
