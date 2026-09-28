/**
 * 存量数据 URL 审计脚本（审计#22，只读、不改库）。
 * 扫描目标：
 * - nav_menus.items（jsonb 整棵菜单树）
 * - reports.href（列）
 * - case_details.related_products（jsonb）
 * - pages.sections（jsonb）
 * 判定标准与运行时一致：server/utils/safe-url.ts 的 isSafeUrl
 * （拒绝 javascript:/data:/vbscript: 等危险协议与控制字符，允许相对引用与 http/https/mailto/tel）。
 *
 * 用法：NUXT_DATABASE_URL=postgres://... npx tsx scripts/check-unsafe-urls.ts
 * 退出码：0 = 无 DB（跳过）或全部安全；1 = 发现不安全值或扫描不完整（连接失败/表缺失）。
 * 写侧已由 safeUrlSchema 封死（审计#9），本脚本用于排查历史入库的脏数据；
 * 案例 relatedProducts 读侧另有消毒兜底（cases-repo.sanitizeCaseRelatedProducts）。
 * 如需扩展目标（如 news_details.blocks / case_details.blocks 的图片 src），按同一 collectUnsafeUrls 模式追加即可。
 */
import process from 'node:process'
import postgres from 'postgres'
// vitest/tsx 直跑无 Nitro 自动导入，safe-url 仅依赖 zod，可显式相对导入
import { isSafeUrl } from '../server/utils/safe-url'

const databaseUrl = process.env.NUXT_DATABASE_URL ?? process.env.DATABASE_URL
if (!databaseUrl) {
  console.log('未检测到 NUXT_DATABASE_URL / DATABASE_URL：无数据库环境，跳过存量 URL 审计（退出码 0）。')
  process.exit(0)
}

interface UnsafeUrlEntry {
  table: string
  row: string
  field: string
  value: string
}

/** URL 语义的 jsonb 键名（href/ctaHref/footerHref/src/url/*link 结尾）；仅字符串值参与判定 */
const URL_KEY_RE = /(href|src|url|link)$/i

/** 递归遍历 jsonb 值，收集 URL 语义键下的不安全字符串（空串不属于安全问题，跳过） */
function collectUnsafeUrls(
  table: string,
  row: string,
  value: unknown,
  path: string,
  key: string,
  out: UnsafeUrlEntry[],
): void {
  if (typeof value === 'string') {
    if (URL_KEY_RE.test(key) && value.trim() !== '' && !isSafeUrl(value)) {
      out.push({ table, row, field: path, value })
    }
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectUnsafeUrls(table, row, item, `${path}[${index}]`, key, out)
    })
    return
  }
  if (value !== null && typeof value === 'object') {
    for (const [childKey, child] of Object.entries(value as Record<string, unknown>)) {
      collectUnsafeUrls(table, row, child, path === '' ? childKey : `${path}.${childKey}`, childKey, out)
    }
  }
}

const sql = postgres(databaseUrl, { max: 1 })
const results: UnsafeUrlEntry[] = []
let scanFailures = 0

try {
  await sql`SELECT 1`
}
catch (error) {
  console.error('无法连接数据库，终止存量 URL 审计：', error)
  await sql.end().catch(() => {})
  process.exit(1)
}

/** 单表扫描：失败（如迁移未跑、表缺失）记警告继续，最终退出码体现「扫描不完整」 */
async function scanTable(label: string, scan: () => Promise<void>): Promise<void> {
  try {
    await scan()
  }
  catch (error) {
    scanFailures += 1
    console.error(`[warn] 扫描 ${label} 失败，结果不完整：`, error)
  }
}

await scanTable('nav_menus.items', async () => {
  const rows = await sql`SELECT key, items FROM nav_menus` as { key: string, items: unknown }[]
  for (const row of rows) {
    collectUnsafeUrls('nav_menus', `key=${row.key}`, row.items, 'items', 'items', results)
  }
})

await scanTable('reports.href', async () => {
  const rows = await sql`SELECT id, href FROM reports` as { id: number, href: string }[]
  for (const row of rows) {
    if (typeof row.href === 'string' && row.href.trim() !== '' && !isSafeUrl(row.href)) {
      results.push({ table: 'reports', row: `id=${row.id}`, field: 'href', value: row.href })
    }
  }
})

await scanTable('case_details.related_products', async () => {
  const rows = await sql`SELECT case_slug, related_products FROM case_details` as { case_slug: string, related_products: unknown }[]
  for (const row of rows) {
    collectUnsafeUrls(
      'case_details',
      `case_slug=${row.case_slug}`,
      row.related_products,
      'related_products',
      'related_products',
      results,
    )
  }
})

await scanTable('pages.sections', async () => {
  const rows = await sql`SELECT slug, sections FROM pages` as { slug: string, sections: unknown }[]
  for (const row of rows) {
    collectUnsafeUrls('pages', `slug=${row.slug}`, row.sections, 'sections', 'sections', results)
  }
})

await sql.end()

if (results.length > 0) {
  console.error(`发现 ${results.length} 处不安全 URL（表 | 行 | 字段 | 值）：`)
  for (const entry of results) {
    // JSON.stringify 让控制字符（\t/\u0000 等混淆写法）可见
    console.error(`- ${entry.table} | ${entry.row} | ${entry.field} | ${JSON.stringify(entry.value)}`)
  }
}

if (results.length > 0 || scanFailures > 0) {
  if (scanFailures > 0) {
    console.error(`扫描不完整：${scanFailures} 个目标失败。`)
  }
  process.exit(1)
}

console.log('存量 URL 审计通过：nav_menus / reports.href / case_details.related_products / pages.sections 未发现不安全值。')
