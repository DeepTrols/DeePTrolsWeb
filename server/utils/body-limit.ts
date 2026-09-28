import type { H3Event } from 'h3'

/**
 * 请求体大小预检（审计中危#5）。
 *
 * h3 v1 的 readBody / readMultipartFormData 没有默认体积上限：它们会先把整个请求体
 * 缓冲进内存，之后业务层才有机会校验大小。攻击者只需声明并发送一个超大 body，
 * 就能在业务校验（如 upload 的 5MB 检查）生效之前把进程内存打满。
 *
 * 本函数在“读取 body 之前”先看 Content-Length 头：
 * - 存在且 > maxBytes → 立即抛 413，不缓冲任何字节；
 * - 不存在（chunked transfer-encoding，无 Content-Length）→ 放行，
 *   由调用方现有的“读后大小校验”兜底（chunked 场景无法预知长度）。
 *
 * 只读取 Node IncomingMessage 的原始头（与 rate-limit.ts 同款做法），
 * 唯一的运行时依赖是 Nitro 自动导入的 createError，便于在 vitest 中桩化测试。
 */
export function assertBodyWithinLimit(event: H3Event, maxBytes: number): void {
  const raw = event.node.req.headers['content-length']
  // 无 Content-Length（chunked）或空值：放行，交由读后校验兜底
  if (!raw) {
    return
  }
  const length = Number(raw)
  // 非法/NaN 长度不在此处判定，交给读后校验；仅在明确超限且为有限数时拦截
  if (Number.isFinite(length) && length > maxBytes) {
    throw createError({ statusCode: 413, statusMessage: 'Payload too large' })
  }
}

/** JSON 写接口（登录 / 线索）请求体上限：远大于合法载荷，仅用于挡下超大 body 打内存 */
export const MAX_JSON_BODY_BYTES = 64 * 1024
