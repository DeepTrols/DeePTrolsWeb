import { useAdminSession } from '../../utils/admin'

// POST /api/admin/logout — 清除管理会话；未配置时幂等返回成功
export default defineEventHandler(async (event) => {
  const { sessionPassword } = useRuntimeConfig()
  if (sessionPassword) {
    const session = await useAdminSession(event)
    await session.clear()
  }
  return { ok: true }
})
