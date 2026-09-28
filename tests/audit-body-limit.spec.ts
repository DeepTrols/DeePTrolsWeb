import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, sep } from 'node:path'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { assertBodyWithinLimit, MAX_JSON_BODY_BYTES } from '../server/utils/body-limit'
import { resolveUploadFile } from '../server/utils/storage'

// 审计中危#5（请求体大小预检）+ 中危#8（/uploads 运行时直出路由的穿越防护）行为测试。
// createError / defineEventHandler 等是 Nitro 自动导入的全局，测试中桩化，
// 与 tests/audit-seed-fallback.spec.ts 同款做法（先 stubGlobal 再动态 import 路由）。

interface Destroyable {
  on?: (event: string, cb: (...args: unknown[]) => void) => void
  destroy?: () => void
}

type ErrorInput = { statusCode: number, statusMessage?: string }

beforeAll(() => {
  vi.stubGlobal('createError', (input: ErrorInput) => {
    const error = new Error(input.statusMessage ?? `HTTP ${input.statusCode}`) as Error & { statusCode: number }
    error.statusCode = input.statusCode
    return error
  })
})

afterAll(() => {
  vi.unstubAllGlobals()
})

function mockEvent(contentLength?: string) {
  const headers: Record<string, string> = {}
  if (contentLength !== undefined) {
    headers['content-length'] = contentLength
  }
  return { node: { req: { headers } } } as unknown as Parameters<typeof assertBodyWithinLimit>[0]
}

describe('assertBodyWithinLimit（审计中危#5：读取前按 Content-Length 预检）', () => {
  it('Content-Length 超过上限立即抛 413（不缓冲请求体）', () => {
    let caught: { statusCode?: number } | undefined
    try {
      assertBodyWithinLimit(mockEvent(String(MAX_JSON_BODY_BYTES + 1)), MAX_JSON_BODY_BYTES)
    }
    catch (error) {
      caught = error as { statusCode?: number }
    }
    expect(caught?.statusCode).toBe(413)
  })

  it('恰好等于上限放行', () => {
    expect(() => assertBodyWithinLimit(mockEvent(String(MAX_JSON_BODY_BYTES)), MAX_JSON_BODY_BYTES)).not.toThrow()
  })

  it('小于上限放行', () => {
    expect(() => assertBodyWithinLimit(mockEvent('1024'), MAX_JSON_BODY_BYTES)).not.toThrow()
  })

  it('无 Content-Length（chunked）放行，交由读后校验兜底', () => {
    expect(() => assertBodyWithinLimit(mockEvent(undefined), MAX_JSON_BODY_BYTES)).not.toThrow()
  })

  it('非法 Content-Length（NaN）不在此处拦截，放行', () => {
    expect(() => assertBodyWithinLimit(mockEvent('not-a-number'), MAX_JSON_BODY_BYTES)).not.toThrow()
  })

  it('上限常量为 64KB', () => {
    expect(MAX_JSON_BODY_BYTES).toBe(64 * 1024)
  })
})

describe('resolveUploadFile（审计中危#8：/uploads 直出路由的安全路径解析）', () => {
  let root: string

  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), 'dt-uploads-resolve-'))
  })

  afterEach(async () => {
    await rm(root, { force: true, recursive: true })
  })

  it('合法相对路径解析为目录内文件 + 白名单 Content-Type', () => {
    const resolved = resolveUploadFile('2026-09/abc.png', root)
    expect(resolved).not.toBeNull()
    expect(resolved?.file).toBe(join(root, '2026-09', 'abc.png'))
    expect(resolved?.contentType).toBe('image/png')
  })

  it('白名单扩展名（大小写不敏感）均命中对应 Content-Type', () => {
    expect(resolveUploadFile('a.PNG', root)?.contentType).toBe('image/png')
    expect(resolveUploadFile('a.jpg', root)?.contentType).toBe('image/jpeg')
    expect(resolveUploadFile('a.jpeg', root)?.contentType).toBe('image/jpeg')
    expect(resolveUploadFile('a.webp', root)?.contentType).toBe('image/webp')
    expect(resolveUploadFile('a.gif', root)?.contentType).toBe('image/gif')
    expect(resolveUploadFile('a.avif', root)?.contentType).toBe('image/avif')
  })

  it('非白名单扩展名（svg/html/无扩展名）返回 null', () => {
    expect(resolveUploadFile('a.svg', root)).toBeNull()
    expect(resolveUploadFile('a.html', root)).toBeNull()
    expect(resolveUploadFile('noext', root)).toBeNull()
  })

  it('目录穿越（../、多级、URL 编码 %2e%2e%2f）一律拒绝', () => {
    expect(resolveUploadFile('../secret.png', root)).toBeNull()
    expect(resolveUploadFile('2026-09/../../secret.png', root)).toBeNull()
    expect(resolveUploadFile('%2e%2e%2fsecret.png', root)).toBeNull()
    expect(resolveUploadFile('..%2f..%2fsecret.png', root)).toBeNull()
  })

  it('绝对路径 / NUL / 空串拒绝', () => {
    expect(resolveUploadFile('/etc/passwd', root)).toBeNull()
    expect(resolveUploadFile('a\u0000.png', root)).toBeNull()
    expect(resolveUploadFile('', root)).toBeNull()
  })

  it('任何输入解析成功时，结果文件都严格位于上传根目录内（无法逃逸）', () => {
    const inputs = [
      '/etc/passwd.png',
      '//etc/passwd.png',
      '..%2f..%2fetc%2fpasswd.png',
      'a/../../../etc/passwd.png',
      '\\..\\secret.png',
      '2026-09/ok.png',
    ]
    for (const input of inputs) {
      const resolved = resolveUploadFile(input, root)
      if (resolved) {
        expect(resolved.file.startsWith(root + sep)).toBe(true)
      }
    }
  })
})

describe('GET /uploads/** 路由处理器（审计中危#8：生产直出 + 穿越拒绝）', () => {
  let root: string
  let sentHeaders: Record<string, string>
  let sentStream: Destroyable | null

  beforeEach(async () => {
    vi.resetModules()
    root = await mkdtemp(join(tmpdir(), 'dt-uploads-route-'))
    process.env.NUXT_UPLOADS_DIR = root
    sentHeaders = {}
    sentStream = null
    vi.stubGlobal('defineEventHandler', (handler: unknown) => handler)
    vi.stubGlobal('getRouterParam', (event: { params?: Record<string, string> }, key: string) => event.params?.[key])
    vi.stubGlobal('setResponseHeader', (_event: unknown, name: string, value: string) => {
      sentHeaders[name] = value
    })
    vi.stubGlobal('sendStream', (_event: unknown, stream: Destroyable) => {
      sentStream = stream
      stream.on?.('error', () => {})
      stream.destroy?.()
      return Promise.resolve()
    })
  })

  afterEach(async () => {
    delete process.env.NUXT_UPLOADS_DIR
    await rm(root, { force: true, recursive: true })
  })

  async function loadHandler(): Promise<(event: unknown) => Promise<unknown>> {
    const mod = await import('../server/routes/uploads/[...path].get')
    return mod.default as unknown as (event: unknown) => Promise<unknown>
  }

  it('命中文件：设置 Content-Type/Content-Length/Cache-Control 并流式返回', async () => {
    await mkdir(join(root, '2026-09'), { recursive: true })
    const bytes = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
    await writeFile(join(root, '2026-09', 'x.png'), bytes)

    const handler = await loadHandler()
    await handler({ params: { path: '2026-09/x.png' } })

    expect(sentHeaders['Content-Type']).toBe('image/png')
    expect(sentHeaders['Content-Length']).toBe(bytes.length)
    expect(sentHeaders['Cache-Control']).toContain('max-age=31536000')
    expect(sentStream).not.toBeNull()
  })

  it('目录穿越：抛 404 且不发送任何流', async () => {
    const handler = await loadHandler()
    await expect(handler({ params: { path: '../secret.png' } })).rejects.toMatchObject({ statusCode: 404 })
    expect(sentStream).toBeNull()
  })

  it('白名单扩展名但文件不存在：抛 404', async () => {
    const handler = await loadHandler()
    await expect(handler({ params: { path: '2026-09/missing.png' } })).rejects.toMatchObject({ statusCode: 404 })
    expect(sentStream).toBeNull()
  })

  it('非白名单扩展名（svg）：抛 404，即便文件存在也不直出', async () => {
    await mkdir(join(root, '2026-09'), { recursive: true })
    await writeFile(join(root, '2026-09', 'evil.svg'), '<svg/>')

    const handler = await loadHandler()
    await expect(handler({ params: { path: '2026-09/evil.svg' } })).rejects.toMatchObject({ statusCode: 404 })
    expect(sentStream).toBeNull()
  })
})
