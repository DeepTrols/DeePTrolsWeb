import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// 审计高危#1 行为测试：限流 key 不信任可伪造的 XFF + buckets 惰性全局清扫。
// 每个用例通过 vi.resetModules + 动态导入获得独立的 rate-limit 模块实例，避免桶状态跨用例串扰。
async function loadRateLimit() {
  vi.resetModules()
  return await import('../server/utils/rate-limit')
}

type RateLimitModule = Awaited<ReturnType<typeof loadRateLimit>>

const WINDOW_MS = 10 * 60 * 1000
// 与 rate-limit.ts 内部 MAX_BUCKETS 保持一致（超过即触发尺寸清扫）
const MAX_BUCKETS = 1024

// 构造最小 event 形状（rate-limit 仅读取 socket.remoteAddress 与 x-forwarded-for 头）
function mockEvent(remoteAddress: string | undefined, xForwardedFor?: string) {
  return {
    node: {
      req: {
        socket: remoteAddress === undefined ? {} : { remoteAddress },
        headers: xForwardedFor === undefined ? {} : { 'x-forwarded-for': xForwardedFor },
      },
    },
  }
}

let mod: RateLimitModule

beforeEach(async () => {
  delete process.env.NUXT_RATE_LIMIT_TRUST_PROXY
  mod = await loadRateLimit()
})

afterEach(() => {
  delete process.env.NUXT_RATE_LIMIT_TRUST_PROXY
})

describe('rate-limit source IP (XFF spoofing bypass)', () => {
  it('defaults to the socket remote address and ignores client-supplied XFF', () => {
    expect(mod.getRateLimitIP(mockEvent('203.0.113.9', '198.51.100.7'))).toBe('203.0.113.9')
    expect(mod.getRateLimitIP(mockEvent('203.0.113.9'))).toBe('203.0.113.9')
    expect(mod.getRateLimitIP(mockEvent(undefined, '198.51.100.7'))).toBe('unknown')
    expect(mod.getRateLimitIP(mockEvent(undefined))).toBe('unknown')
  })

  it('shares one bucket across rotating XFF values from the same socket, so the 5/10min limit holds', () => {
    const now = 1_000_000
    // 攻击者每次请求更换随机 XFF，但 socket 地址相同 → key 相同 → 第 6 次必须被拒
    for (let i = 0; i < 5; i++) {
      const ip = mod.getRateLimitIP(mockEvent('203.0.113.9', `198.51.100.${i}`))
      expect(mod.consumeRateLimit(`admin-login:${ip}`, now + i)).toBe(true)
    }
    const forged = mod.getRateLimitIP(mockEvent('203.0.113.9', '198.51.100.250'))
    expect(forged).toBe('203.0.113.9')
    expect(mod.consumeRateLimit(`admin-login:${forged}`, now + 5)).toBe(false)
    // leads key 同样生效
    expect(mod.consumeRateLimit(`leads:${forged}`, now + 6)).toBe(true)
    for (let i = 0; i < 4; i++) {
      mod.consumeRateLimit(`leads:${forged}`, now + 7 + i)
    }
    expect(mod.consumeRateLimit(`leads:${forged}`, now + 11)).toBe(false)
  })

  it('falls back to the first XFF entry only when NUXT_RATE_LIMIT_TRUST_PROXY=true', () => {
    process.env.NUXT_RATE_LIMIT_TRUST_PROXY = 'true'
    expect(mod.getRateLimitIP(mockEvent('127.0.0.1', '198.51.100.7, 10.0.0.1'))).toBe('198.51.100.7')
    expect(mod.getRateLimitIP(mockEvent('127.0.0.1'))).toBe('127.0.0.1')

    process.env.NUXT_RATE_LIMIT_TRUST_PROXY = 'false'
    expect(mod.getRateLimitIP(mockEvent('127.0.0.1', '198.51.100.7'))).toBe('127.0.0.1')
  })
})

describe('rate-limit buckets lazy global sweep', () => {
  it('removes expired buckets once the next call is more than one window after the last sweep', () => {
    const t0 = 1_000_000
    // 首次调用（距 lastSweep=0 超窗口）触发一次空清扫并把 lastSweep 固定在 t0
    expect(mod.consumeRateLimit('sweep:a', t0)).toBe(true)
    // b 在清扫时刻仍处于窗口内（t0 + 599_999 > since = t0 + 1）
    expect(mod.consumeRateLimit('sweep:b', t0 + 599_999)).toBe(true)
    expect(mod.getRateLimitBucketCount()).toBe(2)

    // 距上次清扫超过窗口时长 → 本次调用先全局清扫：a 过期被删、b 保留，再写入 c
    expect(mod.consumeRateLimit('sweep:c', t0 + WINDOW_MS + 1)).toBe(true)
    expect(mod.getRateLimitBucketCount()).toBe(2)

    // 过期 key 被清扫后重新计数（滑动窗口恢复）
    expect(mod.consumeRateLimit('sweep:a', t0 + WINDOW_MS + 2)).toBe(true)
    expect(mod.getRateLimitBucketCount()).toBe(3)
  })

  it('sweeps expired buckets when the map grows beyond the size threshold, even inside the window', () => {
    const t0 = 1_000_000
    // 首个调用固定 lastSweep = t0
    mod.consumeRateLimit('size:seed', t0)
    mod.consumeRateLimit('size:expired', t0)
    expect(mod.getRateLimitBucketCount()).toBe(2)

    // now 恰好 = t0 + 窗口：时间触发条件（距上次清扫 > 窗口）不满足，只能靠尺寸阈值触发
    const now = t0 + WINDOW_MS
    for (let i = 0; i < MAX_BUCKETS; i++) {
      mod.consumeRateLimit(`size:k${i}`, now)
    }

    // 尺寸超过阈值后清扫：hits 停留在 t0 的 seed/expired（t0 ≤ since = now - 窗口）被删除，
    // 仅剩 now 时刻写入的 MAX_BUCKETS 个存活桶（若无清扫应为 MAX_BUCKETS + 2）
    expect(mod.getRateLimitBucketCount()).toBe(MAX_BUCKETS)
  })
})
