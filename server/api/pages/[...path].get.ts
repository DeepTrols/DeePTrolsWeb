import { getPublishedPage } from '../../utils/pages-admin'

// GET /api/pages/<path...> — 公开：仅 published 页；未命中/草稿/无 DB 一律 404（catch-all 分发器据此回退占位）
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  const page = await getPublishedPage(`/${path ?? ''}`)
  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }
  return page
})
