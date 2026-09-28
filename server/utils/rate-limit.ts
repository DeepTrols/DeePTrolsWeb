/**
 * 内存滑动窗口限流：单进程 Nitro 足够（与部署形态一致）。
 * 窗口期内超过上限返回 false（拒绝）；进程重启计数清零，可接受。
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
// 惰性全局清扫的桶数量阈值：超过即触发清扫，防止伪造 key 无限撑大内存
const MAX_BUCKETS = 1024

interface Bucket {
  hits: number[]
  windowMs: number
}

const buckets = new Map<string, Bucket>()
let lastSweep = 0

/**
 * 限流来源 IP：默认只信任 TCP socket 对端地址。
 * 客户端自带的 X-Forwarded-For 可任意伪造（每次请求更换 XFF 即可绕过限流），
 * 仅当 NUXT_RATE_LIMIT_TRUST_PROXY === 'true'（Nitro 部署在会覆写 XFF 的可信反代之后）
 * 才回退读取 XFF 首项。
 */
export function getRateLimitIP(event: {
  node: { req: { socket?: { remoteAddress?: string }, headers: Record<string, unknown> } }
}): string {
  const socketIP = event.node.req.socket?.remoteAddress
  if (process.env.NUXT_RATE_LIMIT_TRUST_PROXY === 'true') {
    const forwarded = event.node.req.headers['x-forwarded-for']
    const raw = typeof forwarded === 'string' ? forwarded : Array.isArray(forwarded) ? String(forwarded[0] ?? '') : ''
    const candidate = raw.split(',')[0]?.trim()
    if (candidate) return candidate
  }
  return socketIP || 'unknown'
}

export function consumeRateLimit(key: string, now: number = Date.now()): boolean {
  return consumeRateLimitWith(key, MAX_REQUESTS, WINDOW_MS, now)
}

/** 自定义窗口/上限的同款限流（如 admin 上传 30 次/10 分钟），签名锁定场景用基础版 */
export function consumeRateLimitWith(key: string, max: number, windowMs: number, now: number = Date.now()): boolean {
  sweepIfDue(now)
  const since = now - windowMs
  const hits = (buckets.get(key)?.hits ?? []).filter(timestamp => timestamp > since)
  if (hits.length >= max) {
    buckets.set(key, { hits, windowMs })
    return false
  }
  hits.push(now)
  buckets.set(key, { hits, windowMs })
  return true
}

/** 当前存活 bucket 数量：供运行监控与行为测试观测，不参与限流判定 */
export function getRateLimitBucketCount(): number {
  return buckets.size
}

/**
 * 惰性全局清扫（不引入 setInterval）：距上次清扫超过窗口时长，
 * 或 bucket 数量超过 MAX_BUCKETS 时，遍历删除过期 bucket 与空 bucket，
 * 保证伪造大量 key 的攻击无法让内存无限增长。
 */
function sweepIfDue(now: number): void {
  if (now - lastSweep <= WINDOW_MS && buckets.size <= MAX_BUCKETS) return
  for (const [key, bucket] of buckets) {
    const since = now - bucket.windowMs
    const hits = bucket.hits.filter(timestamp => timestamp > since)
    if (hits.length === 0) {
      buckets.delete(key)
    } else {
      bucket.hits = hits
    }
  }
  lastSweep = now
}
