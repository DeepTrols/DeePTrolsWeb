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
 * 线索落库：未配置 NUXT_DATABASE_URL 时仅输出日志并返回成功（开发机无 PG 也能走完表单流程）；
 * 插入失败返回 false，由 API 层统一 500 语义（不暴露内部错误）。
 */
export async function insertLead(input: LeadInput): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    console.info('[leads] 未配置 NUXT_DATABASE_URL，线索仅输出日志：', {
      name: input.name,
      company: input.company,
      phone: input.phone,
      email: input.email,
      message: input.message,
      source: input.source,
    })
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
