import { integer, jsonb, pgEnum, pgTable, serial, text, timestamp, varchar, date } from 'drizzle-orm/pg-core'
import type { ArticleBlock } from '~/types/article'
import type { CaseRelatedProduct } from '~/data/case-details'

// 与 data/news.ts NewsCategory 一致
export const newsCategoryEnum = pgEnum('news_category', ['company', 'media', 'insight'])
export const newsStatusEnum = pgEnum('news_status', ['draft', 'published'])
// 与 data/reports.ts ReportSolutionFilterKey / ReportResourceType 一致（案例与报告共用的内容状态枚举）
export const solutionKeyEnum = pgEnum('solution_key', [
  'data-infrastructure',
  'knowledge-engineering',
  'smart-manufacturing',
  'smart-water',
  'smart-education',
  'fde',
  'compute-power',
])
export const reportTypeEnum = pgEnum('report_type', ['产品规格书', '电子书', '白皮书', '视频', '幻灯片', '基准测试报告'])
export const contentStatusEnum = pgEnum('content_status', ['draft', 'published'])
export const leadStatusEnum = pgEnum('lead_status', ['new', 'followed', 'closed'])

// 列表表：字段与 data/news.ts NewsItem 一一对应；id 沿用静态数据编号（种子按 id upsert）
export const news = pgTable('news', {
  id: integer('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  summary: text('summary').notNull(),
  coverImage: varchar('cover_image', { length: 1000 }).notNull(),
  category: newsCategoryEnum('category').notNull(),
  publishedAt: date('published_at', { mode: 'string' }).notNull(),
  status: newsStatusEnum('status').notNull().default('published'),
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
  solutionKey: solutionKeyEnum('solution_key'),
  sortOrder: integer('sort_order').notNull(),
  status: contentStatusEnum('status').notNull().default('published'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 案例详情：与列表 1:1；relatedProducts 经 zod 校验（见 server/utils/cases-repo.ts）
export const caseDetails = pgTable('case_details', {
  caseSlug: varchar('case_slug', { length: 200 })
    .primaryKey()
    .references(() => cases.slug, { onDelete: 'cascade' }),
  title: varchar('title', { length: 500 }).notNull(),
  categoryKey: solutionKeyEnum('category_key').notNull(),
  heroImage: varchar('hero_image', { length: 1000 }).notNull(),
  blocks: jsonb('blocks').$type<ArticleBlock[]>().notNull(),
  relatedProducts: jsonb('related_products').$type<CaseRelatedProduct[]>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// 报告资源：无自然键，serial id + href 唯一（种子按 href upsert）；sortOrder 保持静态数组顺序
export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  type: reportTypeEnum('type').notNull(),
  category: varchar('category', { length: 200 }).notNull(),
  solutionKey: solutionKeyEnum('solution_key'),
  title: varchar('title', { length: 500 }).notNull(),
  summary: text('summary').notNull(),
  image: varchar('image', { length: 1000 }).notNull(),
  href: varchar('href', { length: 500 }).notNull().unique(),
  sortOrder: integer('sort_order').notNull(),
  status: contentStatusEnum('status').notNull().default('published'),
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
