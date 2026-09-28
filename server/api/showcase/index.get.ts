import { aboutIntroGallery } from '~/data/about'
import { customerLogos } from '~/data/home-logos'
import { getShowcase, showcaseKeySchema } from '../../utils/showcase-admin'
import type { ShowcaseKey } from '../../utils/showcase-admin'

// GET /api/showcase?key=about-gallery|home-logos — 公开读；DB 优先，未配置/未命中自动回退 data/ 静态快照
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const parsedKey = showcaseKeySchema.safeParse(query.key)
  if (!parsedKey.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid showcase key' })
  }
  const key: ShowcaseKey = parsedKey.data

  const record = await getShowcase(key)
  if (record) {
    return { key, items: record.items, source: 'db' as const }
  }

  const items = key === 'about-gallery' ? aboutIntroGallery : customerLogos
  return { key, items, source: 'static' as const }
})
