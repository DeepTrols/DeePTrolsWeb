import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerBackendLeadsVisualContracts() {
  it('exposes POST /api/leads with zod validation, honeypot, rate limiting, and console fallback without a database', () => {
    const schema = readComponent('server/db/schema.ts')
    const leadsUtil = readComponent('server/utils/leads.ts')
    const rateLimit = readComponent('server/utils/rate-limit.ts')
    const leadsApi = readComponent('server/api/leads.post.ts')

    expect(schema).toContain("pgEnum('lead_status', ['new', 'followed', 'closed'])")
    expect(schema).toContain("pgTable('leads'")
    expect(schema).toContain("varchar('source', { length: 200 })")
    expect(schema).toContain("leadStatusEnum('status').notNull().default('new')")

    expect(leadsUtil).toContain('leadInputSchema')
    expect(leadsUtil).toContain('z.string().trim().regex(/^1[3-9]\\d{9}$/)')
    expect(leadsUtil).toContain("input.phone !== '' || input.email !== ''")
    expect(leadsUtil).toContain('website: z.string().max(0).optional()')
    expect(leadsUtil).toContain('export async function insertLead(input: LeadInput): Promise<boolean>')
    expect(leadsUtil).toContain("status: 'new'")
    expect(leadsUtil).toContain('console.info')

    expect(rateLimit).toContain('export function consumeRateLimit(key: string, now: number = Date.now()): boolean')
    expect(rateLimit).toContain('WINDOW_MS')
    expect(rateLimit).toContain('MAX_REQUESTS')

    expect(leadsApi).toContain('consumeRateLimit(`leads:${ip}`)')
    expect(leadsApi).toContain('leadInputSchema.safeParse')
    expect(leadsApi).toContain('statusCode: 429')
    expect(leadsApi).toContain('statusCode: 400')
    expect(leadsApi).toContain('statusCode: 500')
    expect(leadsApi).toContain('return { ok: true }')
  })
}
