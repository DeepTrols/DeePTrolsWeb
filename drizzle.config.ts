import { defineConfig } from 'drizzle-kit'

// 迁移仅针对内容表（server/db/schema.ts）；DATABASE_URL 供 db:seed / drizzle-kit migrate 使用
export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL ?? process.env.DATABASE_URL ?? '',
  },
})
