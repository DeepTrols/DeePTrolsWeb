import { isAdminRequest } from '../../utils/admin'
import { getAdminPage, getPublishedPage } from '../../utils/pages-admin'

// GET /api/pages — 首页接管公开读（015.18c）：slug 固定 '/'；语义与 [...path].get.ts 一致。
// 独立文件的原因：Nitro [...path] catch-all 不匹配 /api/pages（尾斜杠变体会穿透到 Nuxt 页面渲染器），
// 首页分发器必须有一个确定命中的路由。
export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (query.preview === '1' && (await isAdminRequest(event))) {
    const draft = await getAdminPage('/')
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

  const page = await getPublishedPage('/')
  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }
  return page
})
