export function checkBackendAdminContracts(ctx) {
  const {
    assert,
    backendAdminUtil,
    backendLeadsAdminUtil,
    backendAdminLoginApi,
    backendAdminLogoutApi,
    backendAdminSessionApi,
    backendAdminLeadsListApi,
    backendAdminLeadPatchApi,
    backendNuxtConfig,
  } = ctx

  assert(
    backendAdminUtil.includes("const SESSION_NAME = 'dt-admin'") &&
      backendAdminUtil.includes('export async function requireAdmin(event: H3Event)') &&
      backendAdminUtil.includes('statusCode: 503') &&
      backendAdminUtil.includes('session.data.admin !== true') &&
      backendAdminUtil.includes('statusCode: 401') &&
      backendAdminUtil.includes('export function verifyAdminPassword(input: unknown, expected: string): boolean') &&
      backendAdminUtil.includes('timingSafeEqual') &&
      backendNuxtConfig.includes('adminPassword') &&
      backendNuxtConfig.includes('sessionPassword'),
    'Admin util must guard via sealed session (503 unconfigured / 401 unauthenticated) with a timing-safe password check wired to runtimeConfig.',
  )

  assert(
    backendAdminLoginApi.includes('consumeRateLimit(`admin-login:${ip}`)') &&
      backendAdminLoginApi.includes('verifyAdminPassword(body?.password, adminPassword)') &&
      backendAdminLoginApi.includes('session.update({ admin: true })') &&
      backendAdminLogoutApi.includes('session.clear()') &&
      backendAdminSessionApi.includes('requireAdmin'),
    'Login must be rate-limited and sealed-session based; logout clears the session; session.get probes auth for the external admin SPA.',
  )

  assert(
    backendLeadsAdminUtil.includes("z.enum(['new', 'followed', 'closed'])") &&
      backendLeadsAdminUtil.includes('export async function listLeads(): Promise<LeadRecord[]>') &&
      backendLeadsAdminUtil.includes('desc(leads.createdAt), desc(leads.id)') &&
      backendLeadsAdminUtil.includes('export async function updateLeadStatus(id: number, status: LeadStatus): Promise<boolean>') &&
      backendLeadsAdminUtil.includes('.returning({ id: leads.id })') &&
      backendAdminLeadsListApi.includes('requireAdmin') &&
      backendAdminLeadsListApi.includes('listLeads') &&
      backendAdminLeadPatchApi.includes('leadStatusSchema') &&
      backendAdminLeadPatchApi.includes('updateLeadStatus') &&
      backendAdminLeadPatchApi.includes('statusCode: 400') &&
      backendAdminLeadPatchApi.includes('statusCode: 404'),
    'Admin leads APIs must stay behind requireAdmin with zod-validated status transitions (400 invalid / 404 unknown).',
  )
}
