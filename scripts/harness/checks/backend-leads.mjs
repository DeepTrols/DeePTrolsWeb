export function checkBackendLeadsContracts(ctx) {
  const {
    assert,
    backendNewsSchema,
    backendLeadsUtil,
    backendRateLimit,
    backendLeadsApi,
  } = ctx

  assert(
    backendNewsSchema.includes("pgEnum('lead_status', ['new', 'followed', 'closed'])") &&
      backendNewsSchema.includes("pgTable('leads'") &&
      backendNewsSchema.includes("varchar('source', { length: 200 })") &&
      backendNewsSchema.includes("leadStatusEnum('status').notNull().default('new')"),
    'Leads schema must persist name/company/phone/email/message/source with a new|followed|closed status enum.',
  )

  assert(
    backendLeadsUtil.includes('leadInputSchema') &&
      backendLeadsUtil.includes('z.string().trim().min(1).max(50)') &&
      backendLeadsUtil.includes('z.string().trim().regex(/^1[3-9]\\d{9}$/)') &&
      backendLeadsUtil.includes("input.phone !== '' || input.email !== ''") &&
      backendLeadsUtil.includes('website: z.string().max(0).optional()') &&
      backendLeadsUtil.includes('export async function insertLead(input: LeadInput): Promise<boolean>') &&
      backendLeadsUtil.includes("status: 'new'") &&
      backendLeadsUtil.includes('console.info'),
    'Leads util must validate the write payload with zod (phone/email at least one, honeypot empty) and degrade to console logging without a database.',
  )

  assert(
    backendRateLimit.includes('export function consumeRateLimit(key: string, now: number = Date.now()): boolean') &&
      backendRateLimit.includes('WINDOW_MS') &&
      backendRateLimit.includes('MAX_REQUESTS'),
    'Rate limit must stay an in-memory sliding window keyed per caller.',
  )

  assert(
    backendLeadsApi.includes('consumeRateLimit(`leads:${ip}`)') &&
      backendLeadsApi.includes('leadInputSchema.safeParse') &&
      backendLeadsApi.includes('statusCode: 429') &&
      backendLeadsApi.includes('statusCode: 400') &&
      backendLeadsApi.includes('statusCode: 500') &&
      backendLeadsApi.includes('return { ok: true }'),
    'POST /api/leads must combine rate limit + zod validation and never leak internal errors (429/400/500 semantics).',
  )
}
