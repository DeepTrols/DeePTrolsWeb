import { timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

/**
 * 管理后台会话与鉴权（Phase 3）：h3 sealed session（cookie 加密），
 * 密码经 runtimeConfig 私密注入（NUXT_ADMIN_PASSWORD / NUXT_SESSION_PASSWORD）。
 */
const SESSION_NAME = 'dt-admin'
/** iron 封装密钥最短长度：h3 useSession 要求 ≥32 字符，更短会在运行时封装阶段抛异常 */
const SESSION_PASSWORD_MIN_LENGTH = 32

/** 配置指引每进程只输出一次（会话入口被 admin 每个请求触达，避免刷屏） */
let passwordGuidanceLogged = false

/**
 * 惰性校验 sessionPassword 长度（会话创建/校验的统一入口）：
 * 已配置但 <32 字符时抛可定位的 500（明确 statusMessage）并 console.error 一次配置指引，
 * 而不是等 iron 在运行时封装阶段抛出无法指向配置问题的未处理异常。
 * 未配置（空）不在此拦截——各入口维持现有 503 "Admin not configured" 语义。
 */
function assertSessionPasswordUsable(password: string): void {
  if (!password || password.length >= SESSION_PASSWORD_MIN_LENGTH) {
    return
  }
  if (!passwordGuidanceLogged) {
    passwordGuidanceLogged = true
    console.error(
      `[admin] sessionPassword 仅 ${password.length} 字符，iron 封装会话密钥要求至少 ${SESSION_PASSWORD_MIN_LENGTH} 字符。`
      + ' 请将 NUXT_SESSION_PASSWORD 设为 ≥32 字符的随机串（如 `openssl rand -hex 32`）后重启服务。',
    )
  }
  throw createError({
    statusCode: 500,
    statusMessage: `NUXT_SESSION_PASSWORD must be at least ${SESSION_PASSWORD_MIN_LENGTH} characters`,
  })
}

export async function useAdminSession(event: H3Event) {
  const { sessionPassword } = useRuntimeConfig()
  assertSessionPasswordUsable(sessionPassword)
  return useSession(event, {
    name: SESSION_NAME,
    password: sessionPassword,
    // h3 默认 secure:true——本地 http 下非 Chrome 浏览器（Safari/Firefox）会拒存 Secure cookie，
    // 表现为登录后所有请求 401，因此仅生产（HTTPS 部署）强制 Secure。
    // import.meta.dev 为 Nitro 编译期常量：dev 构建为 true、生产构建恒为 false，
    // 不依赖运行时 NODE_ENV（`node .output/server/index.mjs` 不兜底注入，显式导出易遗漏）；
    // vitest 下 import.meta.dev 为 undefined（falsy）→ Secure=true，与生产一致。
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: !import.meta.dev,
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

/** 软守卫（015.13 草稿预览）：是否已登录 admin。未配置/未登录/异常一律 false，不抛错 */
export async function isAdminRequest(event: H3Event): Promise<boolean> {
  try {
    const { sessionPassword } = useRuntimeConfig()
    if (!sessionPassword) {
      return false
    }
    const session = await useAdminSession(event)
    return session.data.admin === true
  }
  catch {
    return false
  }
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
