import { useAdminSession, verifyAdminPassword } from '../../utils/admin'
import { assertBodyWithinLimit, MAX_JSON_BODY_BYTES } from '../../utils/body-limit'
import { consumeRateLimit, getRateLimitIP } from '../../utils/rate-limit'

// POST /api/admin/login — 管理登录：限流防爆破 + 请求体大小预检 + 恒定时间比对 + sealed session
export default defineEventHandler(async (event) => {
  // 限流 key 默认取 socket 对端地址，不信任客户端 XFF（防伪造绕过爆破防护），见 rate-limit.ts
  const ip = getRateLimitIP(event)
  if (!consumeRateLimit(`admin-login:${ip}`)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  const { adminPassword, sessionPassword } = useRuntimeConfig()
  if (!adminPassword || !sessionPassword) {
    throw createError({ statusCode: 503, statusMessage: 'Admin not configured' })
  }

  // 读取前先按 Content-Length 挡下超大 body（h3 readBody 无默认上限，防内存打爆）
  assertBodyWithinLimit(event, MAX_JSON_BODY_BYTES)
  const body = await readBody(event)
  if (!verifyAdminPassword(body?.password, adminPassword)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  const session = await useAdminSession(event)
  await session.update({ admin: true })
  return { ok: true }
})
