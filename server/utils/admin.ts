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
    // h3 默认 secure:true——本地 http 下非 Chrome 浏览器（Safari/Firefox）会拒存 Secure cookie，
    // 表现为登录后所有请求 401；仅生产（HTTPS 部署）开 Secure
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    },
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
