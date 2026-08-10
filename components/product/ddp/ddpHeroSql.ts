// 1:1 对齐 EMQX data-processing HeroVisual 的 SQL 行/词法结构（indent * 12px、top = 16 + revealed * 24）
export type DdpSqlTokenType =
  | 'keyword'
  | 'variable'
  | 'property'
  | 'punctuation'
  | 'alias'
  | 'string'
  | 'operator'
  | 'number'

export interface DdpSqlToken {
  text: string
  type: DdpSqlTokenType
}

export interface DdpSqlLine {
  id: string
  indent: number
  tokens: DdpSqlToken[]
}

export const ddpHeroSqlLines: DdpSqlLine[] = [
  {
    id: 'insert',
    indent: 0,
    tokens: [
      { text: 'INSERT OVERWRITE TABLE ', type: 'keyword' },
      { text: 'dws_user_order_summary', type: 'variable' },
    ],
  },
  {
    id: 'partition',
    indent: 0,
    tokens: [
      { text: 'PARTITION ', type: 'keyword' },
      { text: '(', type: 'punctuation' },
      { text: 'dt', type: 'variable' },
      { text: '=', type: 'operator' },
      { text: "'${bizdate}'", type: 'string' },
      { text: ')', type: 'punctuation' },
    ],
  },
  { id: 'select', indent: 0, tokens: [{ text: 'SELECT', type: 'keyword' }] },
  {
    id: 'user-id',
    indent: 2,
    tokens: [
      { text: 'o', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'user_id', type: 'property' },
      { text: ',', type: 'punctuation' },
    ],
  },
  {
    id: 'region',
    indent: 2,
    tokens: [
      { text: 'u', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'region', type: 'property' },
      { text: ',', type: 'punctuation' },
    ],
  },
  {
    id: 'total-amount',
    indent: 2,
    tokens: [
      { text: 'SUM', type: 'keyword' },
      { text: '(', type: 'punctuation' },
      { text: 'o', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'order_amount', type: 'property' },
      { text: ') ', type: 'punctuation' },
      { text: 'AS ', type: 'keyword' },
      { text: 'total_amount', type: 'alias' },
      { text: ',', type: 'punctuation' },
    ],
  },
  {
    id: 'order-cnt',
    indent: 2,
    tokens: [
      { text: 'COUNT', type: 'keyword' },
      { text: '(', type: 'punctuation' },
      { text: 'DISTINCT ', type: 'keyword' },
      { text: 'o', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'order_id', type: 'property' },
      { text: ') ', type: 'punctuation' },
      { text: 'AS ', type: 'keyword' },
      { text: 'order_cnt', type: 'alias' },
      { text: ',', type: 'punctuation' },
    ],
  },
  {
    id: 'avg-amount',
    indent: 2,
    tokens: [
      { text: 'AVG', type: 'keyword' },
      { text: '(', type: 'punctuation' },
      { text: 'o', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'order_amount', type: 'property' },
      { text: ') ', type: 'punctuation' },
      { text: 'AS ', type: 'keyword' },
      { text: 'avg_amount', type: 'alias' },
    ],
  },
  {
    id: 'from',
    indent: 0,
    tokens: [
      { text: 'FROM ', type: 'keyword' },
      { text: 'dwd_order_detail ', type: 'variable' },
      { text: 'o', type: 'variable' },
    ],
  },
  {
    id: 'join',
    indent: 0,
    tokens: [
      { text: 'LEFT JOIN ', type: 'keyword' },
      { text: 'dim_user_info ', type: 'variable' },
      { text: 'u', type: 'variable' },
    ],
  },
  {
    id: 'on',
    indent: 2,
    tokens: [
      { text: 'ON ', type: 'keyword' },
      { text: 'o', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'user_id ', type: 'property' },
      { text: '= ', type: 'operator' },
      { text: 'u', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'user_id', type: 'property' },
    ],
  },
  {
    id: 'where',
    indent: 0,
    tokens: [
      { text: 'WHERE ', type: 'keyword' },
      { text: 'o', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'order_status ', type: 'property' },
      { text: '= ', type: 'operator' },
      { text: "'SUCCESS'", type: 'string' },
    ],
  },
  {
    id: 'and-dt',
    indent: 2,
    tokens: [
      { text: 'AND ', type: 'keyword' },
      { text: 'o', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'dt ', type: 'property' },
      { text: '= ', type: 'operator' },
      { text: "'${bizdate}'", type: 'string' },
    ],
  },
  {
    id: 'group-by',
    indent: 0,
    tokens: [
      { text: 'GROUP BY ', type: 'keyword' },
      { text: 'o', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'user_id', type: 'property' },
      { text: ', ', type: 'punctuation' },
      { text: 'u', type: 'variable' },
      { text: '.', type: 'punctuation' },
      { text: 'region', type: 'property' },
    ],
  },
]

// 原组件词法配色（g 映射）逐字保留
export const ddpSqlTokenClasses: Record<DdpSqlTokenType, string> = {
  keyword: 'text-primary',
  variable: 'text-blue-500 dark:text-blue-400',
  property: 'text-blue-500 dark:text-blue-400',
  punctuation: 'text-muted',
  alias: 'text-blue-500 dark:text-blue-400',
  string: 'text-emerald-600 dark:text-emerald-400',
  operator: 'text-muted',
  number: 'text-amber-600 dark:text-amber-400',
}

// 光标 top = 16 + revealed * 24，Tailwind 字面量供扫描
export const ddpSqlCursorTopClasses = [
  'top-[16px]',
  'top-[40px]',
  'top-[64px]',
  'top-[88px]',
  'top-[112px]',
  'top-[136px]',
  'top-[160px]',
  'top-[184px]',
  'top-[208px]',
  'top-[232px]',
  'top-[256px]',
  'top-[280px]',
  'top-[304px]',
  'top-[328px]',
  'top-[352px]',
]
