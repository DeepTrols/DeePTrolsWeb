/**
 * 内存滑动窗口限流：单进程 Nitro 足够（与部署形态一致）。
 * 窗口期内超过上限返回 false（拒绝）；进程重启计数清零，可接受。
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

const buckets = new Map<string, number[]>()

export function consumeRateLimit(key: string, now: number = Date.now()): boolean {
  const since = now - WINDOW_MS
  const hits = (buckets.get(key) ?? []).filter(timestamp => timestamp > since)
  if (hits.length >= MAX_REQUESTS) {
    buckets.set(key, hits)
    return false
  }
  hits.push(now)
  buckets.set(key, hits)
  return true
}
