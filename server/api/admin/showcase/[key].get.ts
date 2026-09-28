import { aboutIntroGallery } from '~/data/about'
import { customerLogos } from '~/data/home-logos'
import { requireAdmin } from '../../../utils/admin'
import { getShowcase, showcaseKeySchema } from '../../../utils/showcase-admin'

// GET /api/admin/showcase/[key] — admin 读展示位素材：DB 优先，未入库时回退静态快照（编辑器从当前内容开始改）。
// Logo 静态回退含纯文本条目：DB 协议只收图片条目，这里丢弃文本条目并以 skippedTextEntries 显式计数，
// 避免管理员保存时静默丢失（015.14 决策）。
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parsedKey = showcaseKeySchema.safeParse(getRouterParam(event, 'key'))
  if (!parsedKey.success) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown showcase key' })
  }
  const key = parsedKey.data

  const record = await getShowcase(key)
  if (record) {
    return { key, items: record.items, updatedAt: record.updatedAt, source: 'db' as const, skippedTextEntries: 0 }
  }

  if (key === 'about-gallery') {
    return { key, items: aboutIntroGallery, updatedAt: null, source: 'static' as const, skippedTextEntries: 0 }
  }

  const imageLogos = customerLogos.filter(logo => typeof logo.image === 'string' && logo.image.length > 0)
  return {
    key,
    items: imageLogos,
    updatedAt: null,
    source: 'static' as const,
    skippedTextEntries: customerLogos.length - imageLogos.length,
  }
})
