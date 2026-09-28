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

## 遗留项（Wave 1 发现 → 已由 #22 解决）

- ~~页面层 `?? 静态数据` 兜底使已下架内容仍可渲染~~ → #22 双语义：API 404 → 页面 fatal 404；非 404 失败保留静态兜底
- ~~cases-repo.ts 读侧 href 未入白名单~~ → #22 读取边界"消毒而非拒绝"：不安全 href → `'#'` + 日志
- ~~DB 存量 URL 字段未清洗~~ → #22 新增只读排查脚本 `scripts/check-unsafe-urls.ts`（需在有 DB 环境执行）

## Wave 2（P1）—— 已完成（2026-09-28）

| # | 修复 | 关键改动 |
|---|------|---------|
| #12 | 仓储层错误处理重构 | 新增 `server-log.ts`（logServerError/internalServerError）；9 个 `*-admin.ts` + 3 个 `*-repo.ts` 三态语义：未配置→503 哨兵 / 未命中→404 / 异常→结构化日志+500 穿透；公开读静态回退保留且落日志 |
| #11 | 请求体限制 + 上传生产可用 | `body-limit.ts` content-length 前置校验（login/leads 64KB、upload MAX+1MB → 413）；新增 `server/routes/uploads/[...path].get.ts` 运行时磁盘流式直出（防路径穿越 + 扩展名白名单 + immutable 强缓存），`NUXT_UPLOADS_DIR` 支持挂载卷 |
| #14 | leads 回退安全 | 日志 PII 全脱敏；生产形态（已配 SESSION/ADMIN_PASSWORD）无 DB → 503，线索不再静默丢弃 |
| #13 | 会话安全 | cookie Secure 改 `!import.meta.dev`（摆脱 NODE_ENV 依赖）；sessionPassword <32 字符 → 明确 500 配置错误（指引去重打印） |
| #15 | 主键竞态（保守方案，无迁移） | createNews 23505 重算 id 重试（≤3 次）耗尽 → 409；pages/reports check-then-insert/update 23505 → 409；**sequence 根治方案留待确认（迁移 0008）** |
| #16 | featured 切换 | 新增 `PATCH /api/admin/news|reports/:id/featured`（单列更新、三态语义）；admin 列表页开关改调 PATCH，取消推荐不再被缺 blocks 阻止，消除整条 PUT 读改写 |
| #17 | 编辑器数据丢失 | blocks-html 以 `<img title>` 承载 caption 完成 tiptap 往返（headless Chromium 真实验证）；SectionBody featureGrid 受控输入 + WeakMap 稳定 key，并修复 custom 组件 json 草稿同类串卡 |
| #22 | 页面层 404 双语义 | `pages/news/[id].vue`、`pages/cases/[slug].vue`：API 404 → fatal 404（静态种子不复活）；网络/5xx 失败保留静态兜底；harness 与 visual 契约同步 |

新增行为测试：`audit-error-states`（52 例）、`audit-body-limit`、`audit-session-security`（7 例）、`audit-conflict-409`（9 例）、`audit-featured-patch`（16 例）；`leads.spec.ts` 同步扩展。

## Wave 2 后新遗留（并入 #20 / 待决策）

- 存量 URL 排查需在有 DB 环境执行：`NUXT_DATABASE_URL=... npx tsx scripts/check-unsafe-urls.ts`
- news 主键 sequence 迁移（0008）根治方案待确认
- 新端点/新脚本未登记 harness `sources.mjs`/`required-files.mjs`
- `leads.ts` insertLead 的 DB 异常分支未接结构化日志
- 富文本编辑器内暂无 caption 可视化编辑 UI（title 仅作往返载体）
- 管理类列表 GET 现在可能返回 500（此前静默空列表），admin 端错误提示体验待确认

## Wave 3（P2）—— 待执行

订阅表单接入 leads + 首页大图 WebP（#18）/ 行为级测试补齐（#19）/ 低危批量清理（#20）/ 仓库卫生（#21）

## 验收

每波完成标准：`pnpm lint` / `typecheck` / `test` / `harness:engineering` / `build` 全绿 + 按任务独立 commit。
