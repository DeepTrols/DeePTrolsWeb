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
}
