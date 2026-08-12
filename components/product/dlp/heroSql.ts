export type DlpSqlTokenType =
  | 'keyword'
  | 'function'
  | 'string'
  | 'number'
  | 'operator'
  | 'identifier'
  | 'punctuation'
  | 'whitespace'

export interface DlpSqlToken {
  text: string
  type: DlpSqlTokenType
}

export const dlpHeroSql = `SELECT tag, category, value, updated
FROM tag_results
WHERE customer_id = 'A1024';`

export const dlpHeroSqlLines = dlpHeroSql.split('\n')

const SQL_KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
  'ORDER',
  'BY',
  'DESC',
  'ASC',
  'LIMIT',
  'AND',
  'OR',
  'NOT',
  'IN',
  'AS',
  'JOIN',
  'ON',
  'GROUP',
  'HAVING',
  'INSERT',
  'UPDATE',
  'DELETE',
  'CREATE',
  'DROP',
  'ALTER',
  'TABLE',
  'INDEX',
  'VIEW',
  'INNER',
  'LEFT',
  'RIGHT',
  'OUTER',
  'UNION',
  'ALL',
  'DISTINCT',
  'BETWEEN',
  'LIKE',
  'IS',
  'NULL',
  'TRUE',
  'FALSE',
  'CASE',
  'WHEN',
  'THEN',
  'ELSE',
  'END',
]

const SQL_FUNCTIONS = [
  'now',
  'interval',
  'COUNT',
  'SUM',
  'AVG',
  'MIN',
  'MAX',
  'COALESCE',
  'CAST',
  'DATE',
  'TIME',
  'TIMESTAMP',
]

const SQL_TOKEN_PATTERN = /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\d+\.?\d*|\w+|[();>=<+\-/*]|\s+)/g

export function tokenizeSql(line: string): DlpSqlToken[] {
  const tokens: DlpSqlToken[] = []
  const matches = line.match(SQL_TOKEN_PATTERN) || []

  for (const match of matches) {
    if (/^\s+$/.test(match)) {
      tokens.push({ text: match, type: 'whitespace' })
    } else if (/^['"].*['"]$/.test(match)) {
      tokens.push({ text: match, type: 'string' })
    } else if (/^\d+(?:\.\d*)?$/.test(match)) {
      tokens.push({ text: match, type: 'number' })
    } else if (SQL_KEYWORDS.includes(match.toUpperCase())) {
      tokens.push({ text: match, type: 'keyword' })
    } else if (SQL_FUNCTIONS.includes(match) || SQL_FUNCTIONS.includes(match.toUpperCase())) {
      tokens.push({ text: match, type: 'function' })
    } else if (/^[(),.;]$/.test(match)) {
      tokens.push({ text: match, type: 'punctuation' })
    } else if (/^[>=<+\-/*]+$/.test(match)) {
      tokens.push({ text: match, type: 'operator' })
    } else {
      tokens.push({ text: match, type: 'identifier' })
    }
  }

  return tokens
}

export const dlpSqlTokenClasses: Record<DlpSqlTokenType, string> = {
  keyword: 'text-primary',
  function: 'text-amber-400',
  string: 'text-emerald-400',
  number: 'text-amber-400',
  operator: 'text-muted',
  identifier: 'text-highlighted',
  punctuation: 'text-muted',
  whitespace: '',
}
