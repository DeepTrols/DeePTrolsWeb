import { asc, eq } from 'drizzle-orm'
import { reportResources, type ReportResource } from '~/data/reports'
import { useNewsDatabase } from '../db/client'
import { reports } from '../db/schema'

/**
 * 报告仓储（Phase 1 复制）：配置了 NUXT_DATABASE_URL 时读 PostgreSQL，
 * 未配置 / 查询失败 / 表为空时回退 data/reports.ts 静态数据（种子数据源）。
 * 报告无详情页，仅列表实体。
 */
export async function listReportResources(): Promise<ReportResource[]> {
  const db = useNewsDatabase()
  if (!db) {
    return reportResources
  }

  try {
    const rows = await db
      .select({
        type: reports.type,
        category: reports.category,
        solutionKey: reports.solutionKey,
        title: reports.title,
        summary: reports.summary,
        image: reports.image,
        href: reports.href,
      })
      .from(reports)
      .where(eq(reports.status, 'published'))
      .orderBy(asc(reports.sortOrder))

    if (!rows.length) {
      return reportResources
    }
    return rows.map(row => ({ ...row, solutionKey: row.solutionKey ?? undefined }))
  }
  catch {
    return reportResources
  }
}
