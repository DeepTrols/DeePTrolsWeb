import { insertLead, leadInputSchema } from '../utils/leads'
import { consumeRateLimit, getRateLimitIP } from '../utils/rate-limit'

// POST /api/leads — 全站唯一公开写接口：限流 + 蜜罐 + zod 校验三件套；失败不暴露内部错误
export default defineEventHandler(async (event) => {
  // 限流 key 默认取 socket 对端地址，不信任客户端 XFF（防伪造绕过），见 rate-limit.ts
  const ip = getRateLimitIP(event)
  if (!consumeRateLimit(`leads:${ip}`)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  const parsed = leadInputSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid lead payload' })
  }

  const ok = await insertLead(parsed.data)
  if (!ok) {
    throw createError({ statusCode: 500, statusMessage: 'Lead submit failed' })
  }

  return { ok: true }
})
