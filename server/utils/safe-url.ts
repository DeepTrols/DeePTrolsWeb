import { z } from 'zod'

/**
 * href/src 类字段的共享安全校验（存储型 XSS 的服务端入库防线）。
 * 规则：
 * - 含控制字符（\x00-\x1F / \x7F）一律拒绝：浏览器解析 URL 时会静默剥离控制字符，
 *   形如 "java\x09script:" 的混淆可绕过纯前缀匹配，因此不只拦前导位置；
 * - trim 后若带 URL scheme（RFC 3986 前缀），scheme 必须属于白名单
 *   {http, https, mailto, tel}（大小写不敏感），否则拒绝；
 * - 无 scheme 的相对引用（/path、#anchor、./x、x/y）一律允许。
 */
const SAFE_URL_SCHEMES: ReadonlySet<string> = new Set(['http', 'https', 'mailto', 'tel'])

const URL_SCHEME_RE = /^([a-zA-Z][a-zA-Z0-9+.-]*):/

function containsControlChar(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code <= 0x1f || code === 0x7f) {
      return true
    }
  }
  return false
}

/** URL 是否可安全入库：拒绝 javascript:/data:/vbscript: 等危险协议，允许相对引用与 http/https/mailto/tel */
export function isSafeUrl(value: string): boolean {
  if (containsControlChar(value)) {
    return false
  }
  const trimmed = value.trim()
  if (!trimmed) {
    return false
  }
  const matched = URL_SCHEME_RE.exec(trimmed)
  if (!matched) {
    return true
  }
  const scheme = matched[1]
  return scheme !== undefined && SAFE_URL_SCHEMES.has(scheme.toLowerCase())
}

/**
 * href/src 类字段的 zod 工厂：非空、限长（maxLength 省略 = 不限长，保持字段原语义）、协议白名单。
 * refine 的输入是 trim 后的字符串；isSafeUrl 自身也会 trim，两层行为一致。
 */
export function safeUrlSchema(maxLength?: number) {
  const base = z.string().trim().min(1)
  const bounded = maxLength === undefined ? base : base.max(maxLength)
  return bounded.refine(isSafeUrl, {
    message: 'URL must be a relative reference or use http/https/mailto/tel scheme',
  })
}
