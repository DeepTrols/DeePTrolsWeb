import { requireAdmin } from '../../utils/admin'

// GET /api/admin/session — 会话探活：客户端路由中间件据此放行或跳登录
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return { ok: true }
})
