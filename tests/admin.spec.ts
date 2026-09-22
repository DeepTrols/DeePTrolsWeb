import { describe, expect, it } from 'vitest'
import { verifyAdminPassword } from '../server/utils/admin'
import { leadStatusSchema } from '../server/utils/leads-admin'

describe('admin password verification', () => {
  it('accepts the exact password in constant time', () => {
    expect(verifyAdminPassword('s3cret-admin', 's3cret-admin')).toBe(true)
  })

  it('rejects wrong, length-mismatched, and non-string inputs', () => {
    expect(verifyAdminPassword('wrong', 's3cret-admin')).toBe(false)
    expect(verifyAdminPassword('s3cret-admi', 's3cret-admin')).toBe(false)
    expect(verifyAdminPassword(undefined, 's3cret-admin')).toBe(false)
    expect(verifyAdminPassword(123, 's3cret-admin')).toBe(false)
  })

  it('rejects everything when the expected password is empty (unconfigured)', () => {
    expect(verifyAdminPassword('', '')).toBe(false)
    expect(verifyAdminPassword('anything', '')).toBe(false)
  })
})

describe('lead status transition protocol', () => {
  it('accepts the three lifecycle states', () => {
    expect(leadStatusSchema.parse('new')).toBe('new')
    expect(leadStatusSchema.parse('followed')).toBe('followed')
    expect(leadStatusSchema.parse('closed')).toBe('closed')
  })

  it('rejects unknown statuses', () => {
    expect(leadStatusSchema.safeParse('done').success).toBe(false)
    expect(leadStatusSchema.safeParse('').success).toBe(false)
    expect(leadStatusSchema.safeParse(1).success).toBe(false)
  })
})
