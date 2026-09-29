import { z } from 'zod'

/** 内容状态协议（cases/reports 共用；news 用同名枚举值但独立 schema 以保持实体边界） */
export const contentStatusSchema = z.enum(['draft', 'published'])
export type ContentStatus = z.infer<typeof contentStatusSchema>

/** 解决方案分类 key（015.16 起动态化：格式校验在此，存在性校验在写入路由经 category-admin.assertCategoryExists；静态快照见 data/solution-categories.ts） */
export const solutionKeySchema = z.string().trim().min(1).max(50)

/** ISO 日期（date 列 mode string 的写入边界） */
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
