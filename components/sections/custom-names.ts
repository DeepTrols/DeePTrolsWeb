/**
 * CMS custom 区块可选组件名（逃生门）。
 * 纯字符串常量模块：服务端 zod 校验与客户端注册表共用，禁止引入任何组件/依赖。
 * 新增条目必须同步 components/sections/custom-registry.ts 的组件映射（typecheck 会强制）。
 */
export const CUSTOM_SECTION_NAMES = ['DdpArchitecture', 'DlpArchitecture', 'DmsArchitecture'] as const

export type CustomSectionName = (typeof CUSTOM_SECTION_NAMES)[number]
