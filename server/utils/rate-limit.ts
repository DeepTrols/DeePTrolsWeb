/**
 * 内存滑动窗口限流：单进程 Nitro 足够（与部署形态一致）。
 * 窗口期内超过上限返回 false（拒绝）；进程重启计数清零，可接受。
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

const buckets = new Map<string, number[]>()

export function consumeRateLimit(key: string, now: number = Date.now()): boolean {
  return consumeRateLimitWith(key, MAX_REQUESTS, WINDOW_MS, now)
}

/** 自定义窗口/上限的同款限流（如 admin 上传 30 次/10 分钟），签名锁定场景用基础版 */
export function consumeRateLimitWith(key: string, max: number, windowMs: number, now: number = Date.now()): boolean {
  const since = now - windowMs
  const hits = (buckets.get(key) ?? []).filter(timestamp => timestamp > since)
  if (hits.length >= max) {
    buckets.set(key, hits)
    return false
  }
  hits.push(now)
  buckets.set(key, hits)
  return true
}
