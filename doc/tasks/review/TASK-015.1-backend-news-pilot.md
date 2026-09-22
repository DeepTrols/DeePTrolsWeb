# TASK-015.1 后台 Phase 1：新闻实体全链路试点

> 依据 doc/engineering/BACKEND_CMS_PLAN.md §8 Phase 1：以新闻单实体跑通「库 → API → 页面 → 门禁」全链路，跑通后复制到案例/报告。

## 技术选型落地

- PostgreSQL + Drizzle ORM（drizzle-orm 0.45 + postgres.js 3.4 驱动）+ drizzle-kit 迁移 + tsx 跑种子
- zod 4 做 ArticleBlock 运行时校验（server 边界协议）
- Nitro 同仓 `server/`，runtimeConfig.databaseUrl（`NUXT_DATABASE_URL`）私密注入

## 文件清单

| 文件 | 作用 |
|---|---|
| `server/db/schema.ts` | news / news_details 表；枚举 news_category(company/media/insight)、news_status(draft/published)；blocks jsonb `$type<ArticleBlock[]>`；详情 1:1 cascade |
| `server/db/client.ts` | 惰性单例 `useNewsDatabase()`：未配 databaseUrl 返回 null（静态回退的关键） |
| `server/db/migrations/0000_*.sql` | drizzle-kit generate 产物 |
| `server/utils/article-blocks.ts` | 六种 block 的 zod discriminatedUnion + `parseArticleBlocks` |
| `server/utils/news-repo.ts` | 仓储：DB 优先（仅 published，publishedAt+id 降序），未配置/失败/空表 → data/*.ts 回退；详情经 zod 校验 |
| `server/api/news/index.get.ts` | GET /api/news?category=（category 白名单校验） |
| `server/api/news/[id].get.ts` | GET /api/news/:id → { item, detail }；非法 id 400、未知 id 404 |
| `scripts/db-seed-news.ts` | 种子：data/*.ts → PG 幂等 upsert（按 id）；缺详情/缺连接串即 exit 1 |
| `drizzle.config.ts` / `.env.example` | kit 配置 / NUXT_DATABASE_URL 样例 |
| `nuxt.config.ts` | runtimeConfig.databaseUrl |
| `pages/news/index.vue` `[id].vue` | useFetch 切 API + 静态回退（`default: () => newsItems` / `payload ?? 静态`）；模板与 harness 锁定串零改动 |
| `package.json` | db:generate / db:migrate / db:seed 脚本 |

## 关键设计

- **双层回退**：API 层（无 DB/查询失败/空表 → 静态）+ 页面层（fetch 失败 → 静态 import）。开发机无 PG 也能正常跑全站
- **id 沿用静态编号**：种子按 id upsert 幂等，迁移期 data/*.ts 为唯一事实源，入库后冻结
- `useFetch` 从 `#imports` 显式导入（eslint no-undef 约定）

## 门禁同步

- 新增 `tests/article-blocks.spec.ts`：zod 协议单测 + 40 条种子详情全量过校验
- 新增 `tests/visual/backend/news-api.contract.ts`（注册进 visual.spec）
- 新增 `scripts/harness/checks/backend-news.mjs`（注册进 harness-check）；sources.mjs +9、required-files.mjs +13

## 验证

- lint / typecheck / test(141) / test:visual(56) / harness:engineering 全绿
- SSR 冒烟：`/api/news` 200、`?category=insight` 19 条、`/api/news/29` 200、`/api/news/9999` 404、`/api/news/abc` 400；`/news`、`/news/29` 200 且渲染 API 数据
- 注：新增 server/ 路由需重启 dev 才注册（Nitro 不热加载新路由文件）

## 待办（有 PG 环境后）

1. ~~`cp .env.example .env` 填 NUXT_DATABASE_URL~~ 已完成
2. ~~`pnpm db:migrate && pnpm db:seed`~~ 已完成
3. ~~重启 dev，验证 /api/news 返回库数据~~ 已完成

## 本地 PG 验证记录（2026-09-22）

- `docker-compose.yml`：postgres:17-alpine（本地已有镜像，Docker Hub 拉取超时），容器 `deeptrols-postgres`，**宿主端口 5433**（5432 被本机现有 postgres + SSH 转发占用）
- `pnpm db:migrate && pnpm db:seed`：news ×40 + news_details ×40 入库
- 全链路验证通过：
  - 改库标题 → `/api/news/29` 与 SSR 页 `/news/29` 均输出 DB 值（确认非静态回退）
  - `status='draft'` → 列表 40→39（枚举过滤端到端生效）
  - 还原后数据复原；typecheck/lint/test/visual/harness 全绿
- 坑：drizzle-kit 与 tsx 不自动加载 `.env`，命令需 `export NUXT_DATABASE_URL`（或 `node --env-file`）；drizzle-kit migrate 失败时错误被 spinner 吞掉，先用 `psql` 直连排查
