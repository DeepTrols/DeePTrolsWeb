# TASK-015.2 后台 Phase 1：案例/报告实体复制

> 依据 doc/engineering/BACKEND_CMS_PLAN.md §8 Phase 1：将 TASK-015.1 新闻试点的「库 → API → 页面 → 门禁」配方复制到案例（slug 主键 + 详情 1:1 + relatedProducts jsonb）与报告（href 唯一、无详情页）两个实体，验证配方泛化性。

## 相对新闻试点的新变化

- **slug 主键**：cases 以静态路由段为主键，`href` 由 `/cases/${slug}` 派生不入库；详情 API 按 slug 校验（`^[a-z0-9][a-z0-9-]*$` 否则 400）
- **relatedProducts jsonb**：新增 zod 校验 `parseCaseRelatedProducts`（{name, desc, href}[]），与 blocks 一样过 server 边界协议
- **sortOrder 列**：案例/报告无发布时间，加 `sort_order` 保持静态数组顺序（`asc(sortOrder)`）
- **reports 无自然键**：`serial id` 主键 + `href` 唯一约束，种子按 href upsert
- **种子合并**：`scripts/db-seed-news.ts` → `scripts/db-seed.ts` 单脚本三种子（news 按 id / cases 按 slug / reports 按 href，均幂等 upsert）

## 文件清单

| 文件 | 作用 |
|---|---|
| `server/db/schema.ts` | +solution_key(7) / report_type(6) / content_status 枚举；cases(slug PK)、case_details(1:1 cascade，blocks+relatedProducts jsonb)、reports(serial id + href unique) |
| `server/utils/cases-repo.ts` | `listCaseResources()` / `getCasePayloadBySlug(slug)`（返回 { detail, resources }，resources 供相关案例与 SEO 摘要）；双层回退同新闻 |
| `server/utils/reports-repo.ts` | `listReportResources()`；报告仅列表实体（静态 href 为占位，无详情页） |
| `server/api/cases/index.get.ts` | GET /api/cases（筛选/搜索留页面侧，与静态行为一致） |
| `server/api/cases/[slug].get.ts` | GET /api/cases/:slug；非法 slug 400、未知 slug 404 |
| `server/api/reports/index.get.ts` | GET /api/reports |
| `scripts/db-seed.ts` | 合并种子：news ×40 + cases ×7 + case_details ×7 + reports ×6；缺详情/缺连接串 exit 1 |
| `server/db/migrations/0001_*.sql` | drizzle-kit generate 产物 |
| `pages/cases/index.vue` `pages/cases/[slug].vue` `pages/resources/reports.vue` | useFetch 切 API + 静态回退；模板与 harness 锁定串零改动 |
| `vitest.config.ts` | 修复 `~` alias：`URL.pathname` 会把「项目」目录百分号编码导致运行时 `~/` 导入解析失败，改 `fileURLToPath` |

## 门禁同步

- `tests/article-blocks.spec.ts` +7 条案例详情全量校验（blocks + relatedProducts）
- 新增 `tests/visual/backend/content-api.contract.ts`（注册进 visual.spec）；news-api.contract.ts 种子路径改 db-seed.ts
- 新增 `scripts/harness/checks/backend-content.mjs`（注册进 harness-check）；sources.mjs +5、required-files.mjs +9（含 0001 迁移）

## 验证

- lint / typecheck / test(143) / test:visual(57) / harness:engineering 全绿
- 本地 PG（5433）`pnpm db:migrate && pnpm db:seed` 成功
- SSR 冒烟：`/api/cases` 200 ×7、`/api/reports` 200 ×6、`/api/cases/energy-group-data-governance` 200（blocks 15 + relatedProducts 3 + resources 7）、未知 slug 404、非法 slug 400；`/cases`、`/cases/<slug>`、`/resources/reports` 均 200
- 全链路验证：改库案例标题 → `/api/cases` 与 SSR `/cases/<slug>` 均输出 DB 值；report 置 draft → 列表 6→5；还原后复原
- 注：新增 server/ 路由需重启 dev 才注册（Nitro 不热加载新路由文件）
