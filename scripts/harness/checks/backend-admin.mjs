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
    backendContentAdminUtil,
    backendNewsAdminUtil,
    backendCasesAdminUtil,
    backendReportsAdminUtil,
    backendAdminNewsListApi,
    backendAdminNewsCreateApi,
    backendAdminNewsGetApi,
    backendAdminNewsUpdateApi,
    backendAdminNewsDeleteApi,
    backendAdminCasesListApi,
    backendAdminCasesCreateApi,
    backendAdminCaseGetApi,
    backendAdminCaseUpdateApi,
    backendAdminCaseDeleteApi,
    backendAdminReportsListApi,
    backendAdminReportsCreateApi,
    backendAdminReportGetApi,
    backendAdminReportUpdateApi,
    backendAdminReportDeleteApi,
    backendStorageUtil,
    backendMediaAdminUtil,
    backendAdminUploadApi,
    backendAdminMediaListApi,
    backendAdminMediaDeleteApi,
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

  assert(
    backendContentAdminUtil.includes("contentStatusSchema = z.enum(['draft', 'published'])") &&
      backendContentAdminUtil.includes('solutionKeySchema') &&
      backendContentAdminUtil.includes('isoDateSchema') &&
      backendNewsAdminUtil.includes('newsInputSchema') &&
      backendNewsAdminUtil.includes('export async function createNews(input: NewsInput): Promise<number | null>') &&
      backendNewsAdminUtil.includes('export async function updateNews(id: number, input: NewsInput): Promise<boolean>') &&
      backendCasesAdminUtil.includes('caseSlugSchema') &&
      backendCasesAdminUtil.includes('caseUpdateSchema = caseInputSchema.omit({ slug: true })') &&
      backendCasesAdminUtil.includes("Promise<'conflict' | string | null>") &&
      backendReportsAdminUtil.includes("Promise<'conflict' | number | null>") &&
      backendReportsAdminUtil.includes("Promise<'conflict' | boolean>"),
    'Content admin utils must zod-validate news/case/report inputs, keep case slug immutable on update, and surface slug/href conflicts.',
  )

  const contentRoutes = [
    backendAdminNewsListApi,
    backendAdminNewsCreateApi,
    backendAdminNewsGetApi,
    backendAdminNewsUpdateApi,
    backendAdminNewsDeleteApi,
    backendAdminCasesListApi,
    backendAdminCasesCreateApi,
    backendAdminCaseGetApi,
    backendAdminCaseUpdateApi,
    backendAdminCaseDeleteApi,
    backendAdminReportsListApi,
    backendAdminReportsCreateApi,
    backendAdminReportGetApi,
    backendAdminReportUpdateApi,
    backendAdminReportDeleteApi,
  ]
  assert(
    contentRoutes.every((route) => route.includes('requireAdmin')) &&
      backendAdminNewsCreateApi.includes("statusCode: 400, statusMessage: 'Invalid news input'") &&
      backendAdminNewsCreateApi.includes('statusCode: 503') &&
      backendAdminNewsUpdateApi.includes("statusCode: 404, statusMessage: 'News not found'") &&
      backendAdminNewsDeleteApi.includes("statusCode: 404, statusMessage: 'News not found'") &&
      backendAdminCasesCreateApi.includes("statusCode: 409, statusMessage: 'Case slug already exists'") &&
      backendAdminCasesCreateApi.includes('statusCode: 503') &&
      backendAdminCaseUpdateApi.includes("statusCode: 404, statusMessage: 'Case not found'") &&
      backendAdminCaseDeleteApi.includes("statusCode: 404, statusMessage: 'Case not found'") &&
      backendAdminReportsCreateApi.includes("statusCode: 409, statusMessage: 'Report href already exists'") &&
      backendAdminReportsCreateApi.includes('statusCode: 503') &&
      backendAdminReportUpdateApi.includes("statusCode: 409, statusMessage: 'Report href already exists'") &&
      backendAdminReportUpdateApi.includes("statusCode: 404, statusMessage: 'Report not found'") &&
      backendAdminReportDeleteApi.includes("statusCode: 404, statusMessage: 'Report not found'"),
    'Admin content CRUD routes must stay behind requireAdmin with 400/404/409/503 semantics (case slug + report href conflicts).',
  )

  assert(
    backendMediaAdminUtil.includes('MAX_UPLOAD_BYTES = 5 * 1024 * 1024') &&
      backendMediaAdminUtil.includes('export function sniffImageMime(buffer: Buffer): MediaMime | null') &&
      backendMediaAdminUtil.includes('export async function listMedia(): Promise<MediaAssetRecord[]>') &&
      backendMediaAdminUtil.includes('export async function deleteMediaRecord(id: number): Promise<string | null>') &&
      backendStorageUtil.includes('export interface StorageDriver') &&
      backendStorageUtil.includes("PUBLIC_URL_PREFIX = '/uploads/'") &&
      backendStorageUtil.includes("path.includes('..')"),
    'Media library must keep a 5MB whitelist (magic-byte sniffed) upload protocol and a traversal-guarded local StorageDriver.',
  )

  assert(
    backendAdminUploadApi.includes('requireAdmin') &&
      backendAdminUploadApi.includes('consumeRateLimitWith(`admin-upload:${ip}`, 30') &&
      backendAdminUploadApi.includes('readMultipartFormData') &&
      backendAdminUploadApi.includes("statusCode: 400, statusMessage: 'Missing file'") &&
      backendAdminUploadApi.includes("statusCode: 413, statusMessage: 'File too large'") &&
      backendAdminUploadApi.includes("statusCode: 415, statusMessage: 'Unsupported image type'") &&
      backendAdminUploadApi.includes('statusCode: 503') &&
      backendAdminMediaListApi.includes('requireAdmin') &&
      backendAdminMediaListApi.includes('listMedia') &&
      backendAdminMediaDeleteApi.includes('requireAdmin') &&
      backendAdminMediaDeleteApi.includes("statusCode: 400, statusMessage: 'Invalid media id'") &&
      backendAdminMediaDeleteApi.includes("statusCode: 404, statusMessage: 'Media not found'"),
    'Admin upload/media routes must stay behind requireAdmin with rate-limited multipart upload (400/413/415/503) and 400/404 delete semantics.',
  )
}
