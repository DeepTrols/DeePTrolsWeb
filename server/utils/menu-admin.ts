import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { navIconComponents } from '~/components/navigation/nav-icons'
import { useNewsDatabase } from '../db/client'
import { navMenus } from '../db/schema'
import { safeUrlSchema } from './safe-url'
import { internalServerError, logServerError } from './server-log'

/** 菜单 key：header 主导航 / footer 页脚 */
export const menuKeySchema = z.enum(['header', 'footer'])
export type MenuKey = z.infer<typeof menuKeySchema>

/** icon 只接受 nav-icons 注册表已登记的名字（未登记会在渲染侧静默不渲染，这里提前拦截）
 *  Object.hasOwn：`in` 会命中原型链键（toString/constructor 等），导致白名单绕过 */
const navIconNameSchema = z
  .string()
  .trim()
  .min(1)
  .max(50)
  .refine(name => Object.hasOwn(navIconComponents, name), { message: 'Unknown nav icon' })

const navLinkSchema = z.object({
  label: z.string().trim().min(1).max(100),
  description: z.string().trim().max(200).optional(),
  href: safeUrlSchema(500),
  activePaths: z.array(z.string().trim().min(1).max(200)).max(20).optional(),
  icon: navIconNameSchema.optional(),
  hot: z.boolean().optional(),
})

type NavColumnInput = z.infer<typeof navColumnBaseSchema> & { groups?: NavColumnInput[] }
const navColumnBaseSchema = z.object({
  title: z.string().trim().min(1).max(100),
  subtitle: z.string().trim().max(100).optional(),
  description: z.string().trim().max(200).optional(),
  href: safeUrlSchema(500).optional(),
  activePaths: z.array(z.string().trim().min(1).max(200)).max(20).optional(),
  links: z.array(navLinkSchema).max(50).optional(),
  footerLabel: z.string().trim().max(100).optional(),
  footerHref: safeUrlSchema(500).optional(),
})
// groups 自嵌套一层（NavColumn.groups?: NavColumn[]）
const navColumnSchema: z.ZodType<NavColumnInput> = navColumnBaseSchema.extend({
  groups: z.array(z.lazy(() => navColumnSchema)).max(20).optional(),
})

const navFeatureSchema = z.object({
  title: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(200),
  href: safeUrlSchema(500),
  icon: navIconNameSchema,
})

const navItemSchema = z.object({
  label: z.string().trim().min(1).max(100),
  href: safeUrlSchema(500),
  activePaths: z.array(z.string().trim().min(1).max(200)).max(20).optional(),
  layout: z.enum(['product', 'solutions']).optional(),
  megaTitle: z.string().trim().max(100).optional(),
  columns: z.array(navColumnSchema).max(20).optional(),
  features: z.array(navFeatureSchema).max(20).optional(),
  featuresTitle: z.string().trim().max(100).optional(),
})

/** header 菜单 = NavItem[]（形状与 data/navigation.ts 一致） */
export const headerMenuSchema = z.array(navItemSchema).min(1).max(20)
export type HeaderMenuItems = z.infer<typeof headerMenuSchema>

const footerLinkSchema = z.object({
  label: z.string().trim().min(1).max(100),
  href: safeUrlSchema(500),
  arrow: z.boolean().optional(),
})

const footerColumnSchema = z.object({
  title: z.string().trim().min(1).max(100),
  groups: z.array(z.array(footerLinkSchema).max(50)).max(20),
})

const footerSocialSchema = z.object({
  label: z.string().trim().min(1).max(100),
  href: safeUrlSchema(500).optional(),
  path: z.string().trim().min(1),
})

/** footer 菜单 = { columns, socials }（形状与 data/footer.ts 一致） */
export const footerMenuSchema = z.object({
  columns: z.array(footerColumnSchema).max(20),
  socials: z.array(footerSocialSchema).max(20),
})
export type FooterMenuItems = z.infer<typeof footerMenuSchema>

/** 按 key 校验整棵菜单树；失败返回 null */
export function parseMenuItems(key: MenuKey, items: unknown): HeaderMenuItems | FooterMenuItems | null {
  const result = key === 'header' ? headerMenuSchema.safeParse(items) : footerMenuSchema.safeParse(items)
  return result.success ? result.data : null
}

/** 读菜单：命中返回 { items, updatedAt }；无 DB/未命中/zod 复验失败/查询异常返回 null（调用方回退静态数据）。
 *  公开导航 GET /api/navigation 依赖此回退，异常不抛出，但必须记录日志让故障可见 */
export async function getMenuItems(
  key: MenuKey,
): Promise<{ items: HeaderMenuItems | FooterMenuItems, updatedAt: string } | null> {
  const db = useNewsDatabase()
  if (!db) {
    return null
  }

  try {
    const rows = await db
      .select({ items: navMenus.items, updatedAt: navMenus.updatedAt })
      .from(navMenus)
      .where(eq(navMenus.key, key))
      .limit(1)

    const row = rows[0]
    if (!row) {
      return null
    }
    const items = parseMenuItems(key, row.items)
    if (!items) {
      // 库内菜单树未过 zod 复验（脏数据）：记录后按未入库处理（回退静态快照）
      logServerError('menu-admin.getMenuItems', 'menu items failed zod revalidation', { key })
      return null
    }
    return { items, updatedAt: row.updatedAt.toISOString() }
  }
  catch (error) {
    logServerError('menu-admin.getMenuItems', error, { key })
    return null
  }
}

/** 写菜单（整树覆盖，upsert 幂等）：成功 true；未配置 DB 返回 false（端点 503）；异常记录日志后抛出（端点 500） */
export async function upsertMenuItems(key: MenuKey, items: HeaderMenuItems | FooterMenuItems): Promise<boolean> {
  const db = useNewsDatabase()
  if (!db) {
    return false
  }

  try {
    await db
      .insert(navMenus)
      .values({ key, items })
      .onConflictDoUpdate({ target: navMenus.key, set: { items, updatedAt: new Date() } })
    return true
  }
  catch (error) {
    throw internalServerError('menu-admin.upsertMenuItems', error, { key })
  }
}
