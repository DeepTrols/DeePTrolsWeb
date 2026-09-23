# TASK-015.9 后台 Phase 6：动态路由 + CMS 页（CMS 四件套 Phase C）

> 方案来源：doc/engineering/CMS_PAGE_PLAN.md。目标：pages 表入库 + catch-all 分发器渲染 CMS 页，Phase C 区块仅 richText（ArticleBlock[]），存量代码路由零占用、零破坏。

## Phase C1：pages 表 + 协议层 + API

- `server/db/schema.ts` + 迁移 `0005_loose_yellowjacket.sql`：`pages`（slug varchar(300) PK 存完整路径如 `/solutions/smart-retail` / title / seoDescription / status 复用 content_status 枚举 / sortOrder / sections jsonb default []）
- `server/utils/pages-admin.ts`：
  - `pageSlugSchema`：完整路径正则（段级 `[a-z0-9][a-z0-9-]*`，拒尾斜杠/空段）+ refine 黑名单
  - **保留清单**：`CMS_RESERVED_EXACT_PATHS`（19 个代码静态路由完整路径）+ `CMS_RESERVED_PREFIXES`（/admin /api /cases /demo /news /uploads）+ `isReservedPagePath`；Nuxt 文件路由优先于 catch-all，占用代码路径的 CMS 页永远渲染不到，必须入库前拦截
  - `pageSectionSchema`：Phase C 唯一区块 `{ type: 'richText', blocks: articleBlocksSchema }`；Phase D 布局管理扩展为 discriminatedUnion
  - `pageInputSchema` / `pageUpdateSchema = omit({ slug: true })`（slug 主键不可变，案例同先例）
  - CRUD 走 reports-admin 模式：create `'conflict' | string | null`、update/delete boolean、公开 `getPublishedPage` 仅 published 且 sections 出库再过一次 zod（防脏数据打爆渲染器）
- 路由：
  - `GET /api/pages/<path...>`（公开）：仅 published，未命中/草稿/无 DB 一律 404
  - admin 5 路由全 requireAdmin：list / create（400 非法输入含保留路径 / 409 slug 冲突 / 503 无库）/ get / put（404 未命中）/ delete（404）
- 单测 `tests/pages-admin.spec.ts`（10 个）：slug 形状/黑名单/保留前缀、**pages/ 目录扫描锁定黑名单完整性**（静态路由必须被精确路径或前缀覆盖；动态路由父前缀必须保留，唯一例外 /solutions/[slug] 有 CMS 回退）、richText 区块校验、默认值、update omit slug

## Phase C2：catch-all 分发器 + 渲染

- `components/common/CmsPageView.vue`（新）：统一渲染器（site shell + hero 标题/描述 + sections v-for → ArticleContent richText）；**独立组件的关键动机**：`pages/solutions/[slug].vue` 被 harness 锁定不得出现 SiteHeader/SiteFooter/`<style` 字符串，回退分支必须委托子组件
- `pages/[...slug].vue` 改分发器：`useFetch<PublishedPagePayload>(`/api/pages${route.path}`)`，命中 → CmsPageView（robots index,follow + CMS 标题/描述）；未命中 → 原占位页原样保留（noindex）
- `pages/solutions/[slug].vue` CMS 回退：静态 miss 时 `useFetch` 带 `immediate: !currentPage.value`（静态命中零请求），再 miss 才 `createError 404 fatal`；全部锁定字符串保留（SolutionPageTemplate/SolutionScenarioVisual/getSolutionUseCaseBySlug/createError/#hero-visual），门禁零改动通过

## Phase C3：vben /pages 列表与编辑

- `src/api/pages.ts`：PageSection/PageInput/AdminPageRecord/AdminPagePayload 类型 + 5 个 API（slug 含前导斜杠直接拼接 URL）
- `src/router/routes/modules/pages.ts`：/pages 列表 + /pages/create + /pages/edit（hideInMenu，**slug 含斜杠走 query 传参**，避免路径参数 %2F 编码坑）
- `src/views/pages/list.vue`：路径（外链新窗口）/标题/排序/状态 Tag/更新时间 + 编辑/删除 Popconfirm
- `src/views/pages/edit.vue`：元数据表单（slug 编辑态 disabled）+ sections JSON Textarea（parseJsonField 校验 + richText 提示）+ 保存/保存并发布，复用 content/shared/options

## 验证

- 门禁：lint / typecheck / test(194) / test:visual(64) / harness:engineering 全绿；vben 侧 `pnpm lint`（admin 根）+ vue-tsc 全绿
- 真实 PG E2E（cookie session，测试数据已清理）：
  - 未认证 admin list 401；保留路径创建 400（/contact、/news/x）；坏 sections 400
  - draft 创建 → 公开 404 → PUT 发布 → 公开 200（内容与 SEO 字段齐全）
  - **SSR 证据 ×2**：`/solutions/e2e-cms`（走 solutions/[slug] CMS 回退分支）与 `/e2e-landing`（catch-all 分发器）均命中 E2ECMSP9 标记且 title 正确；发布后 robots=index,follow、占位页 noindex 不受影响
  - 存量零破坏：未知路径仍占位页、/solutions/energy 静态页不受影响
  - 重复创建 409 / 更新未命中 404 / 删除 200 / 再删 404；草稿化后公开 404 + 前台回落占位页
  - 经 vben proxy（:5666）登录 + list + 保留路径 400 全通
- 锁：harness `sources.mjs` +9、`required-files.mjs` +13、`backend-admin.mjs` +2 assert（页面协议+路由与分发语义）、`admin-api.contract.ts` +1 it（含「公开 API 不得有 requireAdmin」反向断言）

## 备注 / 坑

- **黑名单完整性靠单测扫描 pages/ 目录锁定**：新增代码页面文件若不入保留清单，测试即挂——黑名单不会随路由漂移失效
- solutions/[slug] 回退用 `immediate: !currentPage.value` 而非条件 await useFetch：静态命中路径零请求开销，也避免条件 await 的 setup 时序复杂度
- vben 编辑页 slug 走 query 传参（`/pages/edit?slug=...`）：slug 含 `/`，路径参数会被 %2F 编码问题困扰
- 新增 server 路由文件必须重启 dev（Nitro 不热加载新路由）——本次重启后 /api/pages 探针 404 即就绪
- 下一期：Phase D 布局管理（015.10）：section 注册表（hero/metrics/featureGrid/cta/logoStrip/imageBanner + custom:\* 逃生门）+ CmsPageRenderer + vben 结构化区块编辑器，见 CMS_PAGE_PLAN.md
