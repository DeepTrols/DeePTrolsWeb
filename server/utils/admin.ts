import { timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

/**
 * 管理后台会话与鉴权（Phase 3）：h3 sealed session（cookie 加密），
 * 密码经 runtimeConfig 私密注入（NUXT_ADMIN_PASSWORD / NUXT_SESSION_PASSWORD）。
 */
const SESSION_NAME = 'dt-admin'

export function useAdminSession(event: H3Event) {
  const { sessionPassword } = useRuntimeConfig()
  return useSession(event, {
    name: SESSION_NAME,
    password: sessionPassword,
    cookie: { httpOnly: true, sameSite: 'lax', path: '/' },
  })
}

/** admin 接口守卫：未配置 session 密码 503（功能未启用），未登录 401 */
export async function requireAdmin(event: H3Event) {
  const { sessionPassword } = useRuntimeConfig()
  if (!sessionPassword) {
    throw createError({ statusCode: 503, statusMessage: 'Admin not configured' })
  }

  const session = await useAdminSession(event)
  if (session.data.admin !== true) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return session
}

/** 恒定时间密码比对，防时序侧信道 */
export function verifyAdminPassword(input: unknown, expected: string): boolean {
  if (typeof input !== 'string' || !expected) {
    return false
  }
  const inputBuffer = Buffer.from(input)
  const expectedBuffer = Buffer.from(expected)
  return inputBuffer.length === expectedBuffer.length && timingSafeEqual(inputBuffer, expectedBuffer)
}
