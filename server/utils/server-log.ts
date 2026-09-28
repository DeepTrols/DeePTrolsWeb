/**
 * 服务端统一错误日志（审计#6）：仓储/管理层的每个 catch 必须经此记录，
 * 消除静默吞错——生产故障不得再被伪装成「数据消失 / 找不到 / 数据库未配置」。
 *
 * 约定：
 * - scope 用 `模块.操作`（如 news-admin.updateNews），直接定位失败点；
 * - context 只放关键标识（id/slug/key/数量），禁止携带整行业务数据（正文/PII 不进日志）；
 * - error 原样交给 console.error（Node 侧自带堆栈），不做二次包装吞栈。
 */
export function logServerError(scope: string, error: unknown, context?: Record<string, unknown>): void {
  if (context && Object.keys(context).length > 0) {
    console.error(`[server] ${scope} failed`, context, error)
  }
  else {
    console.error(`[server] ${scope} failed`, error)
  }
}

/**
 * 管理侧（admin）路径失败 → 500：先按统一格式落日志，再返回脱敏的 H3Error 供调用方抛出。
 * 三态语义由此保证：哨兵返回（null/false）只代表「未配置 DB / 行未命中」（端点映射 503/404），
 * 真实异常一律走本助手 → 端点透出 500，不再落入 404/503 分支。
 * createError 为 Nitro 对 server/ 目录的 h3 自动导入（与 utils/admin.ts 同一先例）。
 */
export function internalServerError(scope: string, error: unknown, context?: Record<string, unknown>): ReturnType<typeof createError> {
  logServerError(scope, error, context)
  return createError({ statusCode: 500, statusMessage: 'Internal server error' })
}
