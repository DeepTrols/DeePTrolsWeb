import { integer, jsonb, pgEnum, pgTable, text, timestamp, varchar, date } from 'drizzle-orm/pg-core'
import type { ArticleBlock } from '~/types/article'

// 与 data/news.ts NewsCategory 一致
export const newsCategoryEnum = pgEnum('news_category', ['company', 'media', 'insight'])
export const newsStatusEnum = pgEnum('news_status', ['draft', 'published'])

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
