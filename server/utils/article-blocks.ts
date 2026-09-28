import { z } from 'zod'
import type { ArticleBlock } from '~/types/article'
import { safeUrlSchema } from './safe-url'

/**
 * ArticleBlock（types/article.ts）的运行时校验协议。
 * 数据库 jsonb / 后台写入必须过这层校验，前端 ArticleContent 按判别联合渲染、不接受非法 block。
 */
const headingBlock = z.object({
  type: z.literal('heading'),
  level: z.union([z.literal(2), z.literal(3), z.literal(4)]),
  text: z.string().min(1),
})

const paragraphBlock = z.object({
  type: z.literal('paragraph'),
  text: z.string().min(1),
})

const listBlock = z.object({
  type: z.literal('list'),
  ordered: z.boolean().optional(),
  items: z.array(z.string().min(1)).min(1),
})

const quoteBlock = z.object({
  type: z.literal('quote'),
  text: z.string().min(1),
})

const imageBlock = z.object({
  type: z.literal('image'),
  src: safeUrlSchema(),
  alt: z.string().min(1),
  caption: z.string().optional(),
})

const dividerBlock = z.object({
  type: z.literal('divider'),
})

export const articleBlockSchema = z.discriminatedUnion('type', [
  headingBlock,
  paragraphBlock,
  listBlock,
  quoteBlock,
  imageBlock,
  dividerBlock,
])

export const articleBlocksSchema = z.array(articleBlockSchema).min(1)

/** 校验并收窄未知数据为 ArticleBlock[]；非法结构抛 ZodError */
export function parseArticleBlocks(input: unknown): ArticleBlock[] {
  return articleBlocksSchema.parse(input) as ArticleBlock[]
}
