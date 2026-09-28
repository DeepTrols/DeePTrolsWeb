import type { H3Event } from 'h3'
import type { MockInstance } from 'vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * 审计修复（中危#6 + 低危#12）行为测试：管理会话安全加固。
 * 1. cookie Secure 显式化：改用 Nitro 编译期常量 import.meta.dev，不再依赖运行时 NODE_ENV
 *    （vitest 下 import.meta.dev 为 undefined → falsy → Secure=true，与生产构建一致）。
 * 2. sessionPassword 惰性长度校验：已配置但 <32 字符 → 可定位 500（statusMessage 含 32）；
 *    未配置 → 维持 503 "Admin not configured"；≥32 字符 → 会话创建/校验往返成功。
 *
 * admin.ts 依赖 Nitro 自动导入（useRuntimeConfig / useSession / createError），
 * 测试经 vi.stubGlobal 注入；useSession 使用本地伪 sealed 运行时
 * （模拟 iron 封装：仅同密码封装的 token 可解封，密码不符视为无会话）。
 */

/** 与 admin.ts 的 SESSION_PASSWORD_MIN_LENGTH 保持一致 */
const MIN_LENGTH = 32
const SESSION_COOKIE_NAME = 'dt-admin'
/** 边界值：恰好 32 字符（iron 允许的最短密钥） */
const VALID_PASSWORD = 'z'.repeat(MIN_LENGTH)
const SHORT_PASSWORD = 'z'.repeat(MIN_LENGTH - 1)

interface SessionCookieConfig {
  httpOnly?: boolean
  sameSite?: string
  path?: string
  secure?: boolean
}

/** 伪 useSession 收到的配置入参（即 admin.ts 传给 h3 的会话选项） */
interface SessionConfig {
  name: string
  password: string
  cookie?: SessionCookieConfig
}

interface MockRequest {
  /** 传给 admin.ts 的伪 H3Event（结构上仅需 node.req.headers / node.res.setHeader） */
  event: H3Event
  /** 读取响应 set-cookie 头（模拟浏览器侧 cookie jar） */
  getSetCookie: () => string | undefined
}

function createMockEvent(cookie?: string): MockRequest {
  const responseHeaders: Record<string, string> = {}
  const requestHeaders: Record<string, string> = {}
  if (cookie !== undefined) {
    requestHeaders.cookie = cookie
  }
  const event = {
    node: {
      req: { headers: requestHeaders },
      res: {
        setHeader: (name: string, value: string) => {
          responseHeaders[name.toLowerCase()] = value
        },
      },
    },
    context: {},
  }
  return {
    event: event as unknown as H3Event,
    getSetCookie: () => responseHeaders['set-cookie'],
  }
}

function serializeCookie(name: string, token: string, cookie?: SessionCookieConfig): string {
  const parts = [`${name}=${token}`]
  if (cookie?.path) {
    parts.push(`Path=${cookie.path}`)
  }
  if (cookie?.httpOnly) {
    parts.push('HttpOnly')
  }
  if (cookie?.sameSite) {
    parts.push(`SameSite=${cookie.sameSite}`)
  }
  if (cookie?.secure) {
    parts.push('Secure')
  }
  return parts.join('; ')
}

function readCookieToken(event: H3Event, name: string): string | undefined {
  const header = event.node.req.headers.cookie ?? ''
  for (const part of header.split(';')) {
    const trimmed = part.trim()
    if (trimmed.startsWith(`${name}=`)) {
      return trimmed.slice(name.length + 1)
    }
  }
  return undefined
}

/** 伪 h3 sealed session 运行时：token 按封装密码存入 sealedStore，仅密码一致时返回数据 */
function createFakeSessionRuntime() {
  const sealedStore = new Map<string, { password: string, data: Record<string, unknown> }>()
  const capturedConfigs: SessionConfig[] = []
  let tokenSeq = 0

  const useSession = vi.fn(async (event: H3Event, config: SessionConfig) => {
    capturedConfigs.push(config)
    const token = readCookieToken(event, config.name)
    const sealed = token === undefined ? undefined : sealedStore.get(token)
    // 密码不符 / token 被篡改 → 解封失败（模拟 iron 语义）→ 视为无会话
    let data: Record<string, unknown> = sealed && sealed.password === config.password
      ? { ...sealed.data }
      : {}

    return {
      get data() {
        return data
      },
      update: async (patch: Record<string, unknown>) => {
        data = { ...data, ...patch }
        tokenSeq += 1
        const nextToken = `fake-sealed-${tokenSeq}`
        sealedStore.set(nextToken, { password: config.password, data })
        event.node.res.setHeader('set-cookie', serializeCookie(config.name, nextToken, config.cookie))
        return { data }
      },
      clear: async () => {
        data = {}
        return { data }
      },
    }
  })

  return { useSession, capturedConfigs }
}

type AdminModule = typeof import('../server/utils/admin')

interface RuntimeError {
  statusCode?: number
  statusMessage?: string
}

/** 等待必须 reject 的调用，返回错误对象（伪 createError 的产物） */
async function captureError(promise: Promise<unknown>): Promise<RuntimeError> {
  try {
    await promise
  }
  catch (error) {
    return error as RuntimeError
  }
  throw new Error('expected the call to reject, but it resolved')
}

function fakeCreateError(input: { statusCode?: number, statusMessage?: string }): Error & RuntimeError {
  const error = new Error(input.statusMessage ?? '') as Error & RuntimeError
  error.statusCode = input.statusCode
  error.statusMessage = input.statusMessage
  return error
}

let mod: AdminModule
let runtime: ReturnType<typeof createFakeSessionRuntime>
let runtimeConfigState: { sessionPassword: string }
let consoleErrorSpy: MockInstance

beforeEach(async () => {
  // 每个用例独立模块实例（admin.ts 的 console.error 去重标记为模块级状态）
  vi.resetModules()
  runtimeConfigState = { sessionPassword: '' }
  runtime = createFakeSessionRuntime()
  vi.stubGlobal('useRuntimeConfig', () => runtimeConfigState)
  vi.stubGlobal('useSession', runtime.useSession)
  vi.stubGlobal('createError', fakeCreateError)
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
  mod = await import('../server/utils/admin')
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('cookie Secure 显式化（import.meta.dev，审计中危#6）', () => {
  it('不依赖 NODE_ENV：非 production 环境下会话 cookie 仍为 Secure（与生产构建一致）', async () => {
    // 前提确认：测试环境未注入 Nitro 编译期常量（undefined → falsy），且 NODE_ENV 非 production——
    // 旧实现（process.env.NODE_ENV === 'production'）在此条件下 secure 为 false，新实现必须为 true
    expect(import.meta.dev).toBeUndefined()
    expect(process.env.NODE_ENV).not.toBe('production')

    runtimeConfigState.sessionPassword = VALID_PASSWORD
    await mod.useAdminSession(createMockEvent().event)

    const config = runtime.capturedConfigs[0]
    expect(config?.name).toBe(SESSION_COOKIE_NAME)
    expect(config?.password).toBe(VALID_PASSWORD)
    expect(config?.cookie).toEqual({
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true,
    })
  })
})

describe('sessionPassword 惰性长度校验（审计低危#12）', () => {
  it('已配置但 <32 字符：抛 500，statusMessage 指向 32 字符下限，且在进入 iron 封装前失败', async () => {
    runtimeConfigState.sessionPassword = SHORT_PASSWORD

    const error = await captureError(mod.useAdminSession(createMockEvent().event))

    expect(error.statusCode).toBe(500)
    expect(error.statusMessage).toContain('32')
    expect(error.statusMessage).toContain('NUXT_SESSION_PASSWORD')
    // 惰性校验必须发生在调用 h3 useSession 之前，不得留给 iron 抛无指向的运行时异常
    expect(runtime.useSession).not.toHaveBeenCalled()
    // 配置指引输出一次，包含环境变量名与长度要求
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    expect(String(consoleErrorSpy.mock.calls[0]?.[0])).toContain('NUXT_SESSION_PASSWORD')
    expect(String(consoleErrorSpy.mock.calls[0]?.[0])).toContain(String(MIN_LENGTH))
  })

  it('requireAdmin 遇短密码同样抛 500（而非 503/401），且指引每进程只打印一次', async () => {
    runtimeConfigState.sessionPassword = SHORT_PASSWORD

    const first = await captureError(mod.requireAdmin(createMockEvent().event))
    const second = await captureError(mod.requireAdmin(createMockEvent().event))

    expect(first.statusCode).toBe(500)
    expect(first.statusMessage).toContain('32')
    expect(second.statusCode).toBe(500)
    expect(second.statusMessage).toContain('32')
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
  })

  it('isAdminRequest 软守卫：短密码一律返回 false，不抛错（草稿预览语义不受影响）', async () => {
    runtimeConfigState.sessionPassword = SHORT_PASSWORD

    await expect(mod.isAdminRequest(createMockEvent().event)).resolves.toBe(false)
  })
})

describe('会话创建/校验往返与既有语义', () => {
  it('恰好 32 字符密码：登录写入 Secure sealed cookie，requireAdmin 往返校验成功', async () => {
    runtimeConfigState.sessionPassword = VALID_PASSWORD

    // 创建：模拟 login.post.ts 的 session.update({ admin: true })
    const login = createMockEvent()
    const session = await mod.useAdminSession(login.event)
    await session.update({ admin: true })

    const setCookie = login.getSetCookie()
    expect(setCookie).toContain(`${SESSION_COOKIE_NAME}=`)
    expect(setCookie).toContain('Secure')
    expect(setCookie).toContain('HttpOnly')

    // 校验：下一请求携带 sealed cookie → requireAdmin 解封会话并放行
    const verify = createMockEvent(setCookie?.split(';')[0])
    const verified = await mod.requireAdmin(verify.event)
    expect(verified.data.admin).toBe(true)
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  it('未登录（无 cookie / 无法解封的 cookie）：requireAdmin 维持 401', async () => {
    runtimeConfigState.sessionPassword = VALID_PASSWORD

    const anonymous = await captureError(mod.requireAdmin(createMockEvent().event))
    expect(anonymous.statusCode).toBe(401)
    expect(anonymous.statusMessage).toBe('Unauthorized')

    const forged = await captureError(
      mod.requireAdmin(createMockEvent(`${SESSION_COOKIE_NAME}=tampered-value`).event),
    )
    expect(forged.statusCode).toBe(401)
  })

  it('未配置密码：requireAdmin 维持 503 Admin not configured，不触发长度校验误报', async () => {
    runtimeConfigState.sessionPassword = ''

    const error = await captureError(mod.requireAdmin(createMockEvent().event))
    expect(error.statusCode).toBe(503)
    expect(error.statusMessage).toBe('Admin not configured')
    expect(runtime.useSession).not.toHaveBeenCalled()
    expect(consoleErrorSpy).not.toHaveBeenCalled()

    // 软守卫同样维持 false（未配置不抛错）
    await expect(mod.isAdminRequest(createMockEvent().event)).resolves.toBe(false)
  })
})
