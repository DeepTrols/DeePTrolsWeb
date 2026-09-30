import { requireAdmin } from '../../../utils/admin'
import { ABOUT_PAGE_TITLE, buildAboutPageSeed } from '../../../utils/about-page'
import { buildHomePageSeed, HOME_PAGE_SLUG, HOME_PAGE_TITLE } from '../../../utils/home-page'
import { createPage, isTakeoverPath } from '../../../utils/pages-admin'
import type { PageSection } from '../../../utils/page-sections'

/**
 * POST /api/admin/pages/takeover — 接管代码页（015.18c/015.20b）：{ slug } 命中接管白名单才放行；
 * 已有同 slug 行 409；插入 status='draft'（管理员预览核对后显式发布，发布前线上仍走代码渲染）。
 * 取消接管 = 复用 DELETE /api/admin/pages/[slug]，页面立即回落代码。
 */
const TAKEOVER_SEEDS: Record<string, { builder: () => PageSection[], title: string }> = {
  [HOME_PAGE_SLUG]: { builder: buildHomePageSeed, title: HOME_PAGE_TITLE },
  '/about_us': { builder: buildAboutPageSeed, title: ABOUT_PAGE_TITLE },
}

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody<{ slug?: unknown }>(event)
  const slug = typeof body?.slug === 'string' ? body.slug : ''
  if (!isTakeoverPath(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Path is not take-over-able' })
  }

  const seed = TAKEOVER_SEEDS[slug]
  const created = await createPage({
    slug,
    title: seed?.title ?? slug,
    seoDescription: '',
    sortOrder: 0,
    status: 'draft',
    sections: seed?.builder() ?? [],
  })
  if (created === 'conflict') {
    throw createError({ statusCode: 409, statusMessage: 'Page slug already exists' })
  }
  if (!created) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  return { slug: created }
})
