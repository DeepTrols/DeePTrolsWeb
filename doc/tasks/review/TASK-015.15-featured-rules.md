# TASK-015.15 推荐位规则收敛：featured 预算硬限制 + 案例精选/新闻头条接后台推荐

## 背景与范围

后台内容管理的「推荐到首页」无上限，但首页「创新、洞察与新闻」只展示 4 条（`HOME_INSIGHTS_MAX_ITEMS = 4`，server/utils/home-insights.ts）——管理员推荐 10 条也只有 4 条生效且不自知。同时：案例页 flow-root 精选区（CaseFeaturedSection，静态 `caseResources.slice(0,3)`）与新闻页 news-hero（NewsHero，静态 `getNewsByCategory(category).slice(0,3)`）写死数据，未接后台推荐。

已拍板决策：

1. 推荐超限 = 硬限制 409 拒绝（首页 news+reports 合计 ≤4；案例 featured ≤3）
2. news-hero 复用同一个 news.featured 字段（按分类过滤 featured，不足回退最新 3 条）

## 方案要点

### A. DB + 协议层

- 迁移 0009：cases 表 `ADD COLUMN featured boolean NOT NULL DEFAULT false`（schema.ts 同步）
- 新文件 `server/utils/featured-limits.ts`：
  - `FEATURED_LIMITS = { cases: 3, home: HOME_INSIGHTS_MAX_ITEMS }`（home 复用首页上限常量，news+reports 合并计数）
  - `countFeatured(scope, exclude?)`：home 两次 count 求和 / cases 单次；无 DB 返回 null 哨兵；异常 `internalServerError` 抛出
  - `assertFeaturedBudget(scope, exclude?)`：无 DB 返回 null（端点先判 503）；已达上限抛 409（`Home featured limit reached (4)` / `Case featured limit reached (3)`）
  - `FeaturedBudgetExclusion { newsId?, reportId?, caseSlug? }`：更新已 featured 的行排除自身，避免「保持推荐状态」被误判新增占用
  - 并发 check-then-set 竞态一期接受（管理后台低频）

### B. 服务端接线（全部写入路径收口）

- `news/[id]/featured.patch.ts`、`reports/[id]/featured.patch.ts`：置 true 前 `assertFeaturedBudget('home', { newsId/reportId: id })`
- `news/index.post.ts`、`news/[id].put.ts`、`reports/index.post.ts`、`reports/[id].put.ts`：body `featured: true` 同样过预算（PUT 排除自身）
- 新路由 `server/api/admin/cases/[slug]/featured.patch.ts`（镜像 news 版三态：503 无库 / 404 未知 slug / 409 超限）
- cases-admin：`caseInputSchema` + `featured: z.boolean().default(false)`；listAdminCases/getAdminCase/createCase/updateCase 全链路带 featured；新增 `setCaseFeatured(slug, featured)` 三态单列切换
- cases POST/PUT：`featured: true` 过 `assertFeaturedBudget('cases', ...)`
- 公开读投影加 featured（零新端点）：news-repo `listNewsItems`、cases-repo `listCaseResources` select + featured；`NewsItem` / `CaseResource` 加可选 `featured?: boolean`

### C. 主站接线（useFetch + 静态回退双层）

- `CaseFeaturedSection.vue`：`useFetch('/api/cases', { key: 'case-featured', default: () => null })` → DB 数据取 `featured === true` 前 3 条；fetch 失败 / 无任何 featured 回退静态 `caseFeatured`（文本原位保留，harness 锁不动）
- `NewsHero.vue`：`useFetch('/api/news', { key: news-hero-${category}, query: computed category })` → featured 优先、不足按发布时间（DB 已 desc）补足、封顶 3；静态回退 `getNewsByCategory(props.category).slice(0, 3)`（文本原位保留，contract 锁不动）

### D. vben admin

- `api/content.ts`：AdminCaseRecord/CaseInput + featured；`setCaseFeaturedApi`（PATCH 通用 request）
- 新闻/报告列表 featured Switch：捕获 409 → 「首页推荐最多 4 条（新闻+报告合计），请先取消其他推荐」
- 案例列表新增「推荐」列 Switch；409 → 「案例精选最多 3 条，请先取消其他推荐」
- 案例编辑页 form + `featured: false` 初始值（否则 zod default(false) 会在每次 PUT 静默清除推荐状态）

### E. 门禁 / 测试

- 新单测 `tests/featured-limits.spec.ts`（18 例）：合并计数、边界（home 4→第 5 条 409 / cases 3→第 4 条 409）、null 哨兵、异常 500、案例 PATCH 端点全语义
- harness：sources +4 键（featured-limits / 三个 featured patch 路由）、backend-admin 断言块、required-files +迁移 0009 + 新文件 + 本文档
- contract：`tests/visual/backend/admin-api.contract.ts` 镜像新断言

## 验证记录

- 迁移 0009 已对本地 PG（docker deeptrols-postgres，宿主 5433）apply，`\d cases` 确认 featured 列 not null default false
- `pnpm vitest run tests/featured-limits.spec.ts` 18/18 通过
