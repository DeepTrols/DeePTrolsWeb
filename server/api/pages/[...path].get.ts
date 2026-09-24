import { isAdminRequest } from '../../utils/admin'
import { getAdminPage, getPublishedPage } from '../../utils/pages-admin'

// GET /api/pages/<path...> — 公开：仅 published 页；未命中/草稿/无 DB 一律 404（catch-all 分发器据此回退占位）
// ?preview=1 + 已登录 admin（015.13 草稿预览）：优先返回最新保存行（无论状态）并标 preview:true；
// 显式 query 触发，避免管理员浏览主站时误见草稿
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  const slug = `/${path ?? ''}`
  const query = getQuery(event)

  if (query.preview === '1' && (await isAdminRequest(event))) {
    const draft = await getAdminPage(slug)
    if (draft) {
      return {
        slug: draft.slug,
        title: draft.title,
        seoDescription: draft.seoDescription,
        sections: draft.sections,
        updatedAt: draft.updatedAt,
        preview: true,
      }
    }
  }

  const page = await getPublishedPage(slug)
  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }
  return page
})
