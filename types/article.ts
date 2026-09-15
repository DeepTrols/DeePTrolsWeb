/**
 * 结构化文章内容模版的共享类型。
 * 内容以「block 数组」描述，排版固定在 ArticleContent 组件内，
 * 供行业案例详情页使用，后续新闻等详情页复用同一模版（后台按此结构填充内容即可）。
 */
export interface ArticleHeadingBlock {
  type: 'heading'
  /** 标题层级：2 = 章节标题，3 = 小节标题，4 = 段内标题 */
  level: 2 | 3 | 4
  text: string
}

export interface ArticleParagraphBlock {
  type: 'paragraph'
  text: string
}

export interface ArticleListBlock {
  type: 'list'
  /** 缺省为无序列表 */
  ordered?: boolean
  items: string[]
}

export interface ArticleQuoteBlock {
  type: 'quote'
  text: string
}

export interface ArticleImageBlock {
  type: 'image'
  src: string
  alt: string
  /** 可选图注 */
  caption?: string
}

export interface ArticleDividerBlock {
  type: 'divider'
}

export type ArticleBlock =
  | ArticleHeadingBlock
  | ArticleParagraphBlock
  | ArticleListBlock
  | ArticleQuoteBlock
  | ArticleImageBlock
  | ArticleDividerBlock

export interface ArticleBreadcrumbItem {
  label: string
  /** 缺省时渲染为当前页文本（不可点击） */
  href?: string
}

export interface ArticleLinkRowItem {
  label: string
  href: string
}
