# TASK-015.17 方案页案例推荐后台化

## 背景与目标

五个方案代码页（manufacturing / water / energy / fde / services/smart-education）底部的「客户案例」区此前是写死的静态数组（`data/solutions/*.ts` 每页 3 条「匿名客户+描述+3 个数据指标」，无 slug/封面/链接，与 CMS 案例库完全不相干）。本任务把这 3 个推荐位改为后台可配：从 CMS 案例库（cases 表）挑选真实案例，卡片替换为真实案例卡（封面图+标题+摘要+链接 `/cases/[slug]`）。

范围：仅现有 5 个代码页（[slug].vue 模板页和 compute 页不动）。

## 拍板决策

1. 内容来源 = 从 CMS 案例库挑选真实案例（卡片语义从匿名统计卡改为真实案例卡）
2. 仅覆盖 5 个现有方案代码页
3. 独立模块而非扩展 showcase_lists：语义非媒体素材，且公开路由需一次 SSR 直接返回解析后的案例对象

## 数据层

- 迁移 `0011_big_crusher_hogan.sql`：`solution_case_picks` 表（key varchar(50) PK、items jsonb 有序案例 slug 数组 ≤3、createdAt/updatedAt）
- 共享纯数据模块 `data/solution-case-picks.ts`（server/client 双用，禁 ?url）：
  - `SOLUTION_CASE_PAGE_KEYS = ['manufacturing', 'water', 'energy', 'smart-education', 'fde']` + `SOLUTION_CASE_PAGE_LABELS`
  - `SOLUTION_CASE_FALLBACK_CATEGORY`：manufacturing→smart-manufacturing、water→smart-water、energy→compute-power、smart-education→smart-education、fde→fde
  - `staticSolutionCaseFallback(key)`：按映射分类过滤 caseResources 封顶 3 条
  - `caseSlugFromHref(href)`：admin GET 静态回退把编辑器初值表达为 slug 列表

## 服务端

- `server/utils/solution-cases-admin.ts`（showcase-admin 三态配方）：
  - `solutionCasePageKeySchema = z.enum(SOLUTION_CASE_PAGE_KEYS)`
  - `solutionCasePicksSchema`：`z.array(caseSlugSchema).max(3)` + 去重 refine（'Duplicate case slug'）
  - `getSolutionCasePicks(key)`：无库/未命中/zod 复验失败/查询异常 → null（脏数据与异常记 logServerError）
  - `putSolutionCasePicks(key, items)`：无库 → false（端点 503）；**软外键存在性校验**——每个 slug 必须在 cases 表存在，缺失抛 400 `Unknown case slug: xxx`（抛在 catch 外，避免被 500 转换吞掉）；upsert onConflictDoUpdate；空数组合法（清空推荐位，跳过存在性查询）
  - `resolveSolutionCases(key)`：picks 命中 → join cases 表只取 `status='published'`，按 picks 顺序投影（已删/转草稿自动跳过不回退补齐——DB 有 picks 即 DB 为准）；picks 为空/无库/失败 → 静态回退（source: 'static'）
- 公开路由 `GET /api/solutions/[key]/cases`：key 白名单 400；返回 `{ key, items: CaseResource[], source }`；**永不 503**（静态回退兜底，主站 SSR 不挂）
- admin `GET /api/admin/solutions/[key]/cases`：requireAdmin；命中 `{items, updatedAt, source:'db'}`，未入库回退静态 slug 列表（`source:'static'`, updatedAt:null，编辑器从当前生效内容起步）
- admin `PUT /api/admin/solutions/[key]/cases`：requireAdmin；key 400 / 整列 zod 400 'Invalid solution case picks' / 未知 slug 400 / 无库 503

## 主站

- 新组件 `components/solution/SolutionCasePicksSection.vue`：props `{ pageKey, title? }`；`useFetch` 固定 key `solution-cases-<pageKey>` + default null；fetch 失败/空结果回退 `staticSolutionCaseFallback(pageKey)`（双层回退）；卡片 = NuxtLink（item.href）+ 封面 aspect-[400/180] + 标题 + 摘要 + 「查看案例详情」
- 5 个旧案例区组件改包装（文件/组件名保留，页面零改动）：`<SolutionCasePicksSection page-key="manufacturing" />` 等（water/energy/smart-education/fde 同）
- 删除静态案例数组：data/solutions/{manufacturing,hydraulic,energy-saving,education,fde}.ts 的 5 个 cases 数组及对应 interface

## vben admin

- 新视图 `views/content/solution-cases.vue` 挂 `/content/solution-cases`（「方案案例推荐」）：5 页 key Tabs（中文标签）+ 有序推荐列表（每行已发布案例 Select，options 来自 listAdminCasesApi，label=`标题（slug）`）+ 上移/下移（复用 menus/shared moveItem）+ 删除 + 「添加案例」（满 3 条 warning）+ source Tag（数据库/静态快照）+ 整体保存 PUT
- 400（无效/已删除案例）自定义中文提示：catch 读 `error.statusCode` + `suppressErrorToastConfig` 抑制拦截器统一 toast
- `api/content.ts`：`SolutionCasePageKey` 类型 + `getSolutionCasePicksApi` / `saveSolutionCasePicksApi`；路由注册于 `routes/modules/content.ts`

## 门禁 / 测试

- `tests/solution-cases-admin.spec.ts`（30+ 例）：key 白名单、picks schema（>3/重复/非法 slug）、静态回退映射、get 三态（无库/未命中/脏数据/异常）、put（无库 503 语义/未知 slug 400/upsert 载荷/空数组跳校验）、resolve（静态回退/按序投影/草稿删除跳过/异常回退 + published 过滤源码锁）、三端点语义（公开读永不 503、admin GET 静态回退起步、PUT 400/503、requireAdmin 源码锁）
- harness 锁同步：solutions-{manufacturing,hydraulic,energy-saving,education,fde}.mjs 案例区断言改为锁包装组件（SolutionCasePicksSection + page-key），删除 4 处静态案例标题锁；5 个视觉契约镜像同步；backend-admin.mjs 新增 015.17 断言块 + admin-api.contract.ts 镜像
- sources.mjs +7 键；required-files +迁移 0011、+4 server 文件、+data/组件、+admin 视图、+单测、+任务文档
- `tests/fde-content.spec.ts` 删除 fdeCases 两条断言

## 验证

- 迁移：db:generate（纯新表）→ db:migrate → psql `\d solution_case_picks` 确认结构
- curl（dt-admin cookie）：GET /api/solutions/manufacturing/cases（未配置 → static 回退 smart-manufacturing）→ admin PUT 3 个 slug → GET 变 db 且按序 → 第 4 条 400 / 未知 slug 400 → 主站 /solutions/manufacturing SSR HTML 出现所选案例标题+href

## 已知边界

- 回退分类每类仅 1 条静态案例（caseResources 每类 1 条）：未配置时页面只显示 1 张卡，属预期；组件网格优雅处理 1-3 条
- picks 指向的案例被删/转草稿 → 自动跳过（列表可能少于 3 条，不回退静态补齐）
- 组件层对「API 返回空 items」也回退静态（优雅 UX）；语义层（resolveSolutionCases）空 picks 回退静态但「有 picks 但部分失效」不回退
- 推荐位整列覆盖写，无并发保护（管理后台低频，同 showcase 配方）
