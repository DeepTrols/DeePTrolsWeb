# TASK-015.13 · 全面审计修复

> 审计日期：2026-09-24 · 审计基线：dev @ 7f423dd · Wave 1 完成：2026-09-28

## 背景

对全仓进行综合审计：质量门禁 5/5 通过（lint/typecheck/test/harness/build）；发现高危 4 项、中危 12 项、低危约 20 项。修复按 P0/P1/P2 三波组织（会话任务 #7~#22）。

## Wave 1（P0）—— 已完成

| # | 修复 | 关键改动 |
|---|------|---------|
| 1 | 限流 XFF 伪造绕过 + buckets 内存无限增长 | `server/utils/rate-limit.ts`：新增 `getRateLimitIP`（默认只取 socket 对端地址；`NUXT_RATE_LIMIT_TRUST_PROXY=true` 时才信任反代 XFF）+ 惰性全局清扫（时间窗/1024 桶阈值）；login/leads/upload 端点切换 |
| 2 | DB 未命中回退静态种子，下架/删除不生效 | `news-repo.ts`/`cases-repo.ts`/`reports-repo.ts`：查询成功时 DB 为唯一事实源（行级未命中→null→404，空表→空列表）；静态回退仅保留给未配置/查询失败；harness 断言描述同步 |
| 3 | href/src 无协议白名单（存储型 XSS 面）+ icon 白名单 `in` 原型链绕过 | 新增 `server/utils/safe-url.ts`（`isSafeUrl`/`safeUrlSchema`：拒绝 javascript:/data:/vbscript:/控制字符混淆，允许相对引用与 http/https/mailto/tel）；应用于 menu-admin（7 处）、page-sections、reports-admin、cases-admin、article-blocks 共 12 个字段；icon 校验改 `Object.hasOwn` |
| 4 | admin 编辑页 keep-alive 旧表单覆盖新数据 | news/cases/reports/pages 4 个 edit.vue：抽取 `loadRecord()` + `onActivated` 重取（首次激活跳过防双重拉取）+ loading 防重入 |

新增行为测试：`tests/audit-rate-limit.spec.ts`（5 例）、`tests/audit-seed-fallback.spec.ts`（11 例）、`tests/audit-url-safety.spec.ts`（13 例）。

## 遗留项（Wave 1 执行中发现，任务 #22 跟踪）

- 页面层 `?? 静态数据` 兜底使已下架内容仍可渲染（`pages/news/[id].vue`、`pages/cases/[slug].vue`；需 pages + harness + visual 契约三处联动）
- `cases-repo.ts:18` 读侧 `caseRelatedProductSchema.href` 未入白名单（历史入库的 javascript: href 读取侧仍放行）
- DB 存量 URL 字段未清洗（写入侧已封死）

## Wave 2（P1）—— 待执行

请求体大小限制 + 上传链路生产可用性（#11）/ 仓储层错误处理三态重构 + 可选乐观锁（#12）/ cookie Secure 显式化 + sessionPassword 长度校验（#13）/ leads PII 脱敏（#14）/ news 主键 sequence 迁移 + 23505→409（#15）/ featured PATCH 端点（#16）/ blocks-html caption 往返 + SectionBody 受控（#17）/ 页面层兜底遗留（#22）

## Wave 3（P2）—— 待执行

订阅表单接入 leads + 首页大图 WebP（#18）/ 行为级测试补齐（#19）/ 低危批量清理（#20）/ 仓库卫生（#21）

## 验收

每波完成标准：`pnpm lint` / `typecheck` / `test` / `harness:engineering` / `build` 全绿 + 按任务独立 commit。
