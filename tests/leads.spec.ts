import { describe, expect, it } from 'vitest'
import { leadInputSchema } from '../server/utils/leads'
import { consumeRateLimit } from '../server/utils/rate-limit'

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
