import { requireAdmin } from '../../../utils/admin'
import { buildHomePageSeed, HOME_PAGE_TITLE } from '../../../utils/home-page'
import { createPage, isTakeoverPath } from '../../../utils/pages-admin'

/**
 * POST /api/admin/pages/takeover — 接管代码页（015.18c）：{ slug } 命中接管白名单（当前仅 '/'）才放行；
 * 已有同 slug 行 409；插入 status='draft'（管理员预览核对后显式发布，发布前线上仍走代码渲染）。
 * 取消接管 = 复用 DELETE /api/admin/pages/[slug]，首页立即回落代码。
 */
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody<{ slug?: unknown }>(event)
  const slug = typeof body?.slug === 'string' ? body.slug : ''
  if (!isTakeoverPath(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Path is not take-over-able' })
  }

  const created = await createPage({
    slug,
    title: HOME_PAGE_TITLE,
    seoDescription: '',
    sortOrder: 0,
    status: 'draft',
    sections: buildHomePageSeed(),
  })
  if (created === 'conflict') {
    throw createError({ statusCode: 409, statusMessage: 'Page slug already exists' })
  }
  if (!created) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  return { slug: created }
})
