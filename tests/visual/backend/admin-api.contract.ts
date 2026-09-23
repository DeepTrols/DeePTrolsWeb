import { expect, it } from 'vitest'
import { readComponent } from '../utils'

export function registerBackendAdminVisualContracts() {
  it('guards the admin leads APIs with sealed-session auth, rate-limited login, and zod status transitions', () => {
    const adminUtil = readComponent('server/utils/admin.ts')
    const leadsAdminUtil = readComponent('server/utils/leads-admin.ts')
    const loginApi = readComponent('server/api/admin/login.post.ts')
    const logoutApi = readComponent('server/api/admin/logout.post.ts')
    const sessionApi = readComponent('server/api/admin/session.get.ts')
    const leadsListApi = readComponent('server/api/admin/leads/index.get.ts')
    const leadPatchApi = readComponent('server/api/admin/leads/[id].patch.ts')
    const nuxtConfig = readComponent('nuxt.config.ts')

    expect(adminUtil).toContain("const SESSION_NAME = 'dt-admin'")
    expect(adminUtil).toContain('export async function requireAdmin(event: H3Event)')
    expect(adminUtil).toContain('session.data.admin !== true')
    expect(adminUtil).toContain('statusCode: 401')
    expect(adminUtil).toContain('statusCode: 503')
    expect(adminUtil).toContain('timingSafeEqual')
    expect(nuxtConfig).toContain('adminPassword')
    expect(nuxtConfig).toContain('sessionPassword')

    expect(loginApi).toContain('consumeRateLimit(`admin-login:${ip}`)')
    expect(loginApi).toContain('verifyAdminPassword(body?.password, adminPassword)')
    expect(loginApi).toContain('session.update({ admin: true })')
    expect(logoutApi).toContain('session.clear()')
    expect(sessionApi).toContain('requireAdmin')

    expect(leadsAdminUtil).toContain("z.enum(['new', 'followed', 'closed'])")
    expect(leadsAdminUtil).toContain('export async function listLeads(): Promise<LeadRecord[]>')
    expect(leadsAdminUtil).toContain('desc(leads.createdAt), desc(leads.id)')
    expect(leadsAdminUtil).toContain('export async function updateLeadStatus(id: number, status: LeadStatus): Promise<boolean>')
    expect(leadsAdminUtil).toContain('.returning({ id: leads.id })')
    expect(leadsListApi).toContain('requireAdmin')
    expect(leadPatchApi).toContain('leadStatusSchema')
    expect(leadPatchApi).toContain('updateLeadStatus')
    expect(leadPatchApi).toContain('statusCode: 400')
    expect(leadPatchApi).toContain('statusCode: 404')
  })

  it('guards the admin content CRUD APIs with requireAdmin, zod inputs, and conflict semantics', () => {
    const contentUtil = readComponent('server/utils/content-admin.ts')
    const newsUtil = readComponent('server/utils/news-admin.ts')
    const casesUtil = readComponent('server/utils/cases-admin.ts')
    const reportsUtil = readComponent('server/utils/reports-admin.ts')

    expect(contentUtil).toContain("contentStatusSchema = z.enum(['draft', 'published'])")
    expect(contentUtil).toContain('solutionKeySchema')
    expect(contentUtil).toContain('isoDateSchema')
    expect(newsUtil).toContain('newsInputSchema')
    expect(newsUtil).toContain(
      'export async function createNews(input: NewsInput): Promise<number | null>',
    )
    expect(casesUtil).toContain('caseSlugSchema')
    expect(casesUtil).toContain('caseUpdateSchema = caseInputSchema.omit({ slug: true })')
    expect(casesUtil).toContain("Promise<'conflict' | string | null>")
    expect(reportsUtil).toContain("Promise<'conflict' | number | null>")
    expect(reportsUtil).toContain("Promise<'conflict' | boolean>")

    const routes = [
      'server/api/admin/news/index.get.ts',
      'server/api/admin/news/index.post.ts',
      'server/api/admin/news/[id].get.ts',
      'server/api/admin/news/[id].put.ts',
      'server/api/admin/news/[id].delete.ts',
      'server/api/admin/cases/index.get.ts',
      'server/api/admin/cases/index.post.ts',
      'server/api/admin/cases/[slug].get.ts',
      'server/api/admin/cases/[slug].put.ts',
      'server/api/admin/cases/[slug].delete.ts',
      'server/api/admin/reports/index.get.ts',
      'server/api/admin/reports/index.post.ts',
      'server/api/admin/reports/[id].get.ts',
      'server/api/admin/reports/[id].put.ts',
      'server/api/admin/reports/[id].delete.ts',
    ].map((path) => readComponent(path))
    for (const route of routes) {
      expect(route).toContain('requireAdmin')
    }

    const newsCreate = readComponent('server/api/admin/news/index.post.ts')
    const newsUpdate = readComponent('server/api/admin/news/[id].put.ts')
    const casesCreate = readComponent('server/api/admin/cases/index.post.ts')
    const casesUpdate = readComponent('server/api/admin/cases/[slug].put.ts')
    const reportsCreate = readComponent('server/api/admin/reports/index.post.ts')
    const reportsUpdate = readComponent('server/api/admin/reports/[id].put.ts')
    expect(newsCreate).toContain("statusCode: 400, statusMessage: 'Invalid news input'")
    expect(newsCreate).toContain('statusCode: 503')
    expect(newsUpdate).toContain("statusCode: 404, statusMessage: 'News not found'")
    expect(casesCreate).toContain("statusCode: 409, statusMessage: 'Case slug already exists'")
    expect(casesCreate).toContain('statusCode: 503')
    expect(casesUpdate).toContain("statusCode: 404, statusMessage: 'Case not found'")
    expect(reportsCreate).toContain("statusCode: 409, statusMessage: 'Report href already exists'")
    expect(reportsCreate).toContain('statusCode: 503')
    expect(reportsUpdate).toContain("statusCode: 409, statusMessage: 'Report href already exists'")
    expect(reportsUpdate).toContain("statusCode: 404, statusMessage: 'Report not found'")
  })

  it('guards the media library with requireAdmin, magic-byte sniffing, and a traversal-safe local driver', () => {
    const mediaUtil = readComponent('server/utils/media-admin.ts')
    const storageUtil = readComponent('server/utils/storage.ts')
    const uploadApi = readComponent('server/api/admin/upload.post.ts')
    const mediaListApi = readComponent('server/api/admin/media/index.get.ts')
    const mediaDeleteApi = readComponent('server/api/admin/media/[id].delete.ts')

    expect(mediaUtil).toContain('MAX_UPLOAD_BYTES = 5 * 1024 * 1024')
    expect(mediaUtil).toContain('export function sniffImageMime(buffer: Buffer): MediaMime | null')
    expect(mediaUtil).toContain('export async function listMedia(): Promise<MediaAssetRecord[]>')
    expect(mediaUtil).toContain('export async function deleteMediaRecord(id: number): Promise<string | null>')
    expect(storageUtil).toContain('export interface StorageDriver')
    expect(storageUtil).toContain("PUBLIC_URL_PREFIX = '/uploads/'")
    expect(storageUtil).toContain("path.includes('..')")

    expect(uploadApi).toContain('requireAdmin')
    expect(uploadApi).toContain('consumeRateLimitWith(`admin-upload:${ip}`, 30')
    expect(uploadApi).toContain('readMultipartFormData')
    expect(uploadApi).toContain("statusCode: 400, statusMessage: 'Missing file'")
    expect(uploadApi).toContain("statusCode: 413, statusMessage: 'File too large'")
    expect(uploadApi).toContain("statusCode: 415, statusMessage: 'Unsupported image type'")
    expect(uploadApi).toContain('statusCode: 503')
    expect(mediaListApi).toContain('requireAdmin')
    expect(mediaListApi).toContain('listMedia')
    expect(mediaDeleteApi).toContain('requireAdmin')
    expect(mediaDeleteApi).toContain("statusCode: 400, statusMessage: 'Invalid media id'")
    expect(mediaDeleteApi).toContain("statusCode: 404, statusMessage: 'Media not found'")
  })
}
