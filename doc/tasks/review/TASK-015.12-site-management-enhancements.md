# TASK-015.12 站点管理增强：页面全量列表 + 组件管理 + section 间距 + 首页推荐

## 背景

后台站点管理四项增强（015.9/015.10 布局管理与页面管理之后）：

1. 页面管理列表拉取全部现有页面（20 个静态代码页 + 动态路由页 + DB CMS 页）；代码页只读
2. 组件管理：页面可插入组件（8 标准区块 + 3 定制架构组件）注册表清单 + 启停开关（入库）
3. 每 section 三档间距枚举；SectionBody 对照 schema 字段补缺
4. 首页「创新、洞察与新闻」改为从新闻/报告的 featured 标志推荐（DB 优先 + 静态回退）

## 方案要点

### A. 页面列表全量（代码页只读）

- `server/utils/pages-admin.ts`：`CODE_PAGE_CATALOG`（20 个 `CMS_RESERVED_EXACT_PATHS` 一一对应中文标题 + `/news` `/news/:id` `/cases` `/cases/:slug` `/solutions/:slug` 动态条目 + 11 个 `/demo/*` 演示页）
- `AdminPageRecord` 加 `source: 'cms' | 'code'`；code 行 `status/sortOrder/updatedAt` 为 null
- `listAdminPages()` 合并：catalog 在前、DB 行在后（保留路径黑名单保证不撞 slug）
- vben `/pages` 列表加「来源」列；code 行仅「查看」（新窗口），无编辑/删除
- `tests/pages-admin.spec.ts` 锁 catalog 完整性（覆盖全部保留精确路径、静态路径全部保留、动态条目固定、demo 11 个）

### B. 组件管理（注册表清单 + 启停）

- `component_states` 表：key PK（单行 `'page-sections'`）+ `disabled jsonb` + updatedAt
- `server/utils/component-admin.ts`：`PAGE_COMPONENT_IDS`（8 type ∪ CUSTOM_SECTION_NAMES）+ `disabledComponentsSchema`（refine 已知集合）+ get/set（upsert 幂等，失败回退 null/false）
- 路由 `GET/PUT /api/admin/components`（requireAdmin；GET 未入库 `source:'static'` = 全启用）
- **编辑面语义**：zod 协议与渲染器不动，已发布页含被禁用组件照常渲染
- vben `/components` 管理页：11 行（ID/名称/类型/说明/启用 Switch），保存提交未启用行 id 列表
- `views/pages/sections.ts` 新增 `customSectionLabels` / `componentDescriptions`
- 编辑器接入：edit.vue onMounted 拉启停 → 过滤后 options 传给 SectionsEditor（`sectionTypeOptions` prop）→ SectionBody（`customSectionOptions` prop）；缺省回退静态全量

### C. section 间距 + 字段补缺

- 8 型全部加 `spacing: z.enum(['tight','compact','default']).default('compact')`（compact = 现状视觉）
- 语义沿用 SectionShell 节奏：tight=`pb-8 lg:pb-16`、compact=`pb-16 lg:pb-32`、default=`pb-32 lg:pb-44`
- 渲染器 `spacingClass(section)` 映射；metrics/featureGrid prop 直通（ProductMetricsSection 补 `'tight'`）；hero/logoStrip/imageBanner 组件加 `spacing` prop（hero 节奏小一档：pb-8/12/16）；cta/custom 外层包裹 div；richText 内联 section 同映射
- vben：`spacingOptions`（紧凑/标准/宽松）、`createSection` 各型带 `spacing:'compact'`、SectionBody 顶部统一「间距」Select（全型通用）
- 字段补缺：featureGrid item 的 `points`（每行一条）/ `tags`（逗号分隔）失焦写回；logoStrip `text` 等已覆盖

### D. 首页推荐（news/reports featured）

- news/reports 表各加 `featured boolean notNull default false`；admin 协议层 input schema + 列表/详情记录同步
- `GET /api/home/insights`（公开）：featured+published 新闻（publishedAt desc）优先 → 报告（sortOrder asc, id asc）补足 → 封顶 4 条；DB 不可用/异常/零推荐回退静态 insights
- **坑**：静态 insights 原在 `data/home.ts`，但该文件顶层有 `?url` 资源导入，Nitro 服务端构建无法解析（build 报 ENOENT `*.svg?url`）→ 抽到 `data/home-insights.ts`（纯字符串），home.ts re-export 保持兼容
- `HomeInsights.vue`：`useFetch('/api/home/insights', { key: 'home-insights', default: () => insights })`（双层回退）
- vben 新闻/报告列表「推荐到首页」Switch（拉完整记录翻转 featured 后 PUT）；两个编辑页同步加 Switch

## 验证

- 根仓 lint / typecheck / test（27 文件 216 用例）/ test:visual（66 用例）/ harness:engineering / build 全绿 ✅
- `cd admin && pnpm lint` + `cd apps/web-antd && pnpm typecheck` 全绿 ✅
- drizzle-kit generate + migrate（`0006_watery_shriek.sql`：news/reports featured 列 + component_states 表），psql 抽查通过 ✅
- 浏览器 E2E（playwright 系统 Chrome + dt-admin cookie + localStorage core-access）全过 ✅：
  - `/pages` 列表出现「代码页」标记，代码行只读（查看/无编辑删除）
  - `/components` 禁用 featureGrid → 保存 → `/pages/edit` 新增区块下拉无「特性网格」→ 恢复
  - 区块间距：richText 改宽松 → SSR `pb-32 lg:pb-44`；改紧凑 → `pb-8 lg:pb-16`（API 建页 → 断言 → 删页）
  - 新闻列表推荐开关 → 首页 SSR 出现标题 → 取消 → 消失
- E2E 后状态还原：测试页已删、news featured 复位、组件全启用
- E2E 坑：antd 两汉字按钮自动插空格（`保 存`），playwright 定位用 `/保\s*存/`
