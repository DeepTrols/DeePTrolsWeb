import { listReportResources } from '../../utils/reports-repo'

// GET /api/reports — 公开读；DB 未配置时自动回退静态数据；筛选/搜索在页面侧进行
export default defineEventHandler(async () => {
  return await listReportResources()
})
