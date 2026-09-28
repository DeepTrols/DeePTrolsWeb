import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { insertLead, leadInputSchema } from '../server/utils/leads'
import { consumeRateLimit } from '../server/utils/rate-limit'

// insertLead 依赖 useNewsDatabase（内部使用 Nitro 的 useRuntimeConfig）；测试整体桩化 db/client，
// 只验证“无 DB”回退分支（与 tests/audit-seed-fallback.spec.ts 同款做法）。
const dbState = vi.hoisted(() => ({ current: null as unknown }))
vi.mock('../server/db/client', () => ({
  useNewsDatabase: () => dbState.current,
}))

const validPayload = {
  name: '张三',
  company: '某制造企业',
  phone: '13812345678',
  email: '',
  message: '希望了解设备智能体在产线的落地方式。',
  source: '/contact',
  website: '',
}

describe('lead input zod protocol', () => {
  it('accepts a valid payload with phone only and applies defaults', () => {
    const parsed = leadInputSchema.parse(validPayload)
    expect(parsed.source).toBe('/contact')
    expect(parsed.email).toBe('')
  })

  it('accepts email-only contact and defaults optional fields', () => {
    const parsed = leadInputSchema.parse({
      name: '李四',
      email: 'lisi@example.com',
      message: '想了解知识工程方案。',
    })
    expect(parsed.company).toBe('')
    expect(parsed.phone).toBe('')
    expect(parsed.source).toBe('/contact')
  })

  it('rejects payloads missing both phone and email', () => {
    const result = leadInputSchema.safeParse({ name: '王五', message: '咨询' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid phone/email formats and over-length fields', () => {
    expect(leadInputSchema.safeParse({ ...validPayload, phone: '123' }).success).toBe(false)
    expect(leadInputSchema.safeParse({ ...validPayload, email: 'not-an-email' }).success).toBe(false)
    expect(leadInputSchema.safeParse({ ...validPayload, name: 'x'.repeat(51) }).success).toBe(false)
    expect(leadInputSchema.safeParse({ ...validPayload, message: '' }).success).toBe(false)
  })

  it('rejects honeypot-filled submissions and non-path sources', () => {
    expect(leadInputSchema.safeParse({ ...validPayload, website: 'https://spam.example' }).success).toBe(false)
    expect(leadInputSchema.safeParse({ ...validPayload, source: 'https://evil.example' }).success).toBe(false)
  })
})

describe('sliding window rate limit', () => {
  it('allows up to 5 requests per 10-minute window then rejects', () => {
    const key = 'test:ip-a'
    const start = 1_000_000
    for (let i = 0; i < 5; i++) {
      expect(consumeRateLimit(key, start + i * 1000)).toBe(true)
    }
    expect(consumeRateLimit(key, start + 6000)).toBe(false)
  })

  it('recovers after the window slides past old hits', () => {
    const key = 'test:ip-b'
    const start = 5_000_000
    for (let i = 0; i < 5; i++) {
      consumeRateLimit(key, start + i)
    }
    expect(consumeRateLimit(key, start + 10)).toBe(false)
    expect(consumeRateLimit(key, start + 10 * 60 * 1000 + 1)).toBe(true)
  })
})

describe('insertLead 无数据库回退（审计中危#9：PII 脱敏 + 生产不静默丢弃）', () => {
  const parsed = leadInputSchema.parse({
    name: '张三',
    company: '某制造企业',
    phone: '13812345678',
    email: 'zhangsan@example.com',
    message: '希望了解设备智能体在产线的落地方式。',
    source: '/contact',
    website: '',
  })

  let infoSpy: ReturnType<typeof vi.spyOn>

  function loggedText(): string {
    return infoSpy.mock.calls.map(args => args.map(arg => JSON.stringify(arg)).join(' ')).join('\n')
  }

  beforeEach(() => {
    dbState.current = null
    delete process.env.NUXT_SESSION_PASSWORD
    delete process.env.NUXT_ADMIN_PASSWORD
    vi.stubGlobal('createError', (input: { statusCode: number, statusMessage?: string }) => {
      const error = new Error(input.statusMessage ?? `HTTP ${input.statusCode}`) as Error & { statusCode: number }
      error.statusCode = input.statusCode
      return error
    })
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
  })

  afterEach(() => {
    infoSpy.mockRestore()
    vi.unstubAllGlobals()
    delete process.env.NUXT_SESSION_PASSWORD
    delete process.env.NUXT_ADMIN_PASSWORD
  })

  it('本地开发（未配置管理密码）无 DB：返回 true，且日志不含任何 PII', async () => {
    await expect(insertLead(parsed)).resolves.toBe(true)
    const logged = loggedText()
    expect(logged).not.toContain('张三')
    expect(logged).not.toContain('13812345678')
    expect(logged).not.toContain('zhangsan@example.com')
    expect(logged).not.toContain('落地方式')
    expect(logged).toContain('leads')
  })

  it('生产形态（配置了 session 密码）无 DB：抛 503，绝不静默丢弃线索', async () => {
    process.env.NUXT_SESSION_PASSWORD = 'x'.repeat(32)
    await expect(insertLead(parsed)).rejects.toMatchObject({ statusCode: 503 })
    expect(loggedText()).not.toContain('张三')
  })

  it('生产形态（配置了 admin 密码）无 DB：同样抛 503', async () => {
    process.env.NUXT_ADMIN_PASSWORD = 'admin-secret'
    await expect(insertLead(parsed)).rejects.toMatchObject({ statusCode: 503 })
  })
})
