import { z } from 'zod'

/** 内容状态协议（cases/reports 共用；news 用同名枚举值但独立 schema 以保持实体边界） */
export const contentStatusSchema = z.enum(['draft', 'published'])
export type ContentStatus = z.infer<typeof contentStatusSchema>

/** 解决方案分类 key（与 solutionKeyEnum / data 层 SolutionFilterKey 一致） */
export const solutionKeySchema = z.enum([
  'data-infrastructure',
  'knowledge-engineering',
  'smart-manufacturing',
  'smart-water',
  'smart-education',
  'fde',
  'compute-power',
])

/** ISO 日期（date 列 mode string 的写入边界） */
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
