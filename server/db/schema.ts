import { boolean, integer, jsonb, pgEnum, pgTable, primaryKey, serial, text, timestamp, varchar, date } from 'drizzle-orm/pg-core'
import type { ArticleBlock } from '~/types/article'
import type { CaseRelatedProduct } from '~/data/case-details'

// 015.16：分类完全动态化——news.category / cases.solutionKey / caseDetails.categoryKey / reports.solutionKey / reports.type
// 已从 pgEnum 迁移为 varchar（迁移 0010 人工改写 USING ::text + DROP TYPE）；取值由 content_categories 表管理
export const newsStatusEnum = pgEnum('news_status', ['draft', 'published'])
export const contentStatusEnum = pgEnum('content_status', ['draft', 'published'])
export const leadStatusEnum = pgEnum('lead_status', ['new', 'followed', 'closed'])

// 列表表：字段与 data/news.ts NewsItem 一一对应；id 沿用静态数据编号（种子按 id upsert）
export const news = pgTable('news', {
  id: integer('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  summary: text('summary').notNull(),
  coverImage: varchar('cover_image', { length: 1000 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  publishedAt: date('published_at', { mode: 'string' }).notNull(),
  status: newsStatusEnum('status').notNull().default('published'),
  // 首页「创新、洞察与新闻」推荐位（015.12）：featured 且 published 的新闻优先进入 /api/home/insights
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 详情表：与列表 1:1；blocks 存 ArticleBlock[]（写入侧经 zod 校验，见 server/utils/article-blocks.ts）
export const newsDetails = pgTable('news_details', {
  newsId: integer('news_id')
    .primaryKey()
    .references(() => news.id, { onDelete: 'cascade' }),
  blocks: jsonb('blocks').$type<ArticleBlock[]>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 案例列表：slug 为主键（沿用静态路由段）；href 由 /cases/${slug} 派生不入库；sortOrder 保持静态数组顺序
export const cases = pgTable('cases', {
  slug: varchar('slug', { length: 200 }).primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  summary: text('summary').notNull(),
  image: varchar('image', { length: 1000 }).notNull(),
  solutionKey: varchar('solution_key', { length: 50 }),
  sortOrder: integer('sort_order').notNull(),
  status: contentStatusEnum('status').notNull().default('published'),
  // 案例页精选推荐位（015.15）：featured 且 published 的案例进入 CaseFeaturedSection，上限见 featured-limits.ts
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 案例详情：与列表 1:1；relatedProducts 经 zod 校验（见 server/utils/cases-repo.ts）
export const caseDetails = pgTable('case_details', {
  caseSlug: varchar('case_slug', { length: 200 })
    .primaryKey()
    .references(() => cases.slug, { onDelete: 'cascade' }),
  title: varchar('title', { length: 500 }).notNull(),
  categoryKey: varchar('category_key', { length: 50 }).notNull(),
  heroImage: varchar('hero_image', { length: 1000 }).notNull(),
  blocks: jsonb('blocks').$type<ArticleBlock[]>().notNull(),
  relatedProducts: jsonb('related_products').$type<CaseRelatedProduct[]>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 报告资源：无自然键，serial id + href 唯一（种子按 href upsert）；sortOrder 保持静态数组顺序
export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull(),
  category: varchar('category', { length: 200 }).notNull(),
  solutionKey: varchar('solution_key', { length: 50 }),
  title: varchar('title', { length: 500 }).notNull(),
  summary: text('summary').notNull(),
  image: varchar('image', { length: 1000 }).notNull(),
  href: varchar('href', { length: 500 }).notNull().unique(),
  sortOrder: integer('sort_order').notNull(),
  status: contentStatusEnum('status').notNull().default('published'),
  // 首页推荐位（015.12）：featured 且 published 的报告按 sortOrder 补足新闻之后的推荐位
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 线索：全站唯一公开写表；phone/email 至少其一由 zod 边界保证（server/utils/leads.ts）
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  company: varchar('company', { length: 100 }).notNull().default(''),
  phone: varchar('phone', { length: 20 }).notNull().default(''),
  email: varchar('email', { length: 100 }).notNull().default(''),
  message: text('message').notNull(),
  source: varchar('source', { length: 200 }).notNull().default('/contact'),
  status: leadStatusEnum('status').notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// 媒体库：admin 上传的图片资源；path 为站点可访问路径（/uploads/YYYY-MM/<uuid>.<ext>），文件本体走 StorageDriver（server/utils/storage.ts）
export const mediaAssets = pgTable('media_assets', {
  id: serial('id').primaryKey(),
  path: varchar('path', { length: 500 }).notNull().unique(),
  filename: varchar('filename', { length: 255 }).notNull(),
  mime: varchar('mime', { length: 100 }).notNull(),
  size: integer('size').notNull(),
  alt: varchar('alt', { length: 500 }).notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// 导航菜单：key 主键（header/footer），items 存整棵菜单树（写入侧经 zod 校验，见 server/utils/menu-admin.ts）
export const navMenus = pgTable('nav_menus', {
  key: varchar('key', { length: 50 }).primaryKey(),
  items: jsonb('items').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// CMS 页：slug 主键存完整路径（如 /solutions/smart-retail）；sections 存区块数组（Phase C 仅 richText，写入侧经 zod 校验，见 server/utils/pages-admin.ts）
export const pages = pgTable('pages', {
  slug: varchar('slug', { length: 300 }).primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  seoDescription: varchar('seo_description', { length: 500 }).notNull().default(''),
  status: contentStatusEnum('status').notNull().default('draft'),
  sortOrder: integer('sort_order').notNull().default(0),
  sections: jsonb('sections').notNull().default([]),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 组件启停（015.12）：key 主键单行 'page-sections'，disabled 存被禁用的区块/定制组件 ID 列表
// 编辑面语义：仅影响 admin 编辑器「新增区块」下拉，渲染器与 zod 不变（已发布页照常渲染）
export const componentStates = pgTable('component_states', {
  key: varchar('key', { length: 50 }).primaryKey(),
  disabled: jsonb('disabled').$type<string[]>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 区块模板库（015.13）：运营可复用的区块快照；section 存单个 PageSection（写入侧经 zod 校验，见 server/utils/preset-admin.ts）
export const sectionPresets = pgTable('section_presets', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  description: varchar('description', { length: 500 }).notNull().default(''),
  section: jsonb('section').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 内容分类（015.16）：scope+key 复合主键；scope ∈ news-category / solution（案例与报告共享）/ report-type（key=label，允许中文）
export const contentCategories = pgTable(
  'content_categories',
  {
    scope: varchar('scope', { length: 30 }).notNull(),
    key: varchar('key', { length: 50 }).notNull(),
    label: varchar('label', { length: 100 }).notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  table => [primaryKey({ columns: [table.scope, table.key] })],
)

// 展示位素材（015.14）：key 主键（about-gallery 关于页图集 / home-logos 首页 Logo 墙），items 存整列素材（写入侧经 zod 校验，见 server/utils/showcase-admin.ts）
export const showcaseLists = pgTable('showcase_lists', {
  key: varchar('key', { length: 50 }).primaryKey(),
  label: varchar('label', { length: 100 }).notNull().default(''),
  items: jsonb('items').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 方案页案例推荐（015.17）：key 主键（manufacturing/water/energy/smart-education/fde 五个代码页），
// items 存有序案例 slug 数组（≤3 且不重复，写入侧经 zod 校验 + cases 表存在性软外键，见 server/utils/solution-cases-admin.ts）
export const solutionCasePicks = pgTable('solution_case_picks', {
  key: varchar('key', { length: 50 }).primaryKey(),
  items: jsonb('items').$type<string[]>().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
