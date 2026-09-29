# TASK-015.16 内容分类管理

## 背景与目标

案例/新闻/报告的分类此前硬编码在四层（pgEnum + zod z.enum + TS union + admin options 常量），新增分类要改代码发版。本任务把分类收敛为 `content_categories` 表动态管理：

- 三个 scope：`news-category`（新闻分类）、`solution`（行业分类，案例与报告共享）、`report-type`（报告类型，key=label 允许中文）
- 后台新增「分类管理」模块（/content/categories）：scope 切换 + 引用计数 + CRUD
- 主站 6 处消费点改动态数据源（静态回退双层语义不变）

## 拍板决策

1. 分类完全动态：DB 分类表 + pgEnum→varchar 迁移（不做硬 FK——静态回退模式下无库可写）
2. 报告与案例共享行业分类（solution scope）；报告自由文本 `category` 字段保留不动
3. 软外键：内容写入（news/cases/reports POST/PUT 六条路径）校验分类 key 在库存在（400）；删除分类前引用计数（news.category / cases.solutionKey + caseDetails.categoryKey + reports.solutionKey / reports.type），被引用 → 409 'in-use'
4. 无 DB 时写入跳过存在性校验（静态回退模式不约束）

## 数据层

- 迁移 `0010_damp_skreet.sql`（drizzle-kit generate 后**人工改写**）：
  - `content_categories` 表：scope+key 复合 PK、label、sortOrder、createdAt/updatedAt
  - 五列 pgEnum→varchar(50)：`ALTER COLUMN ... SET DATA TYPE varchar(50) USING col::text`（generate 产物无 USING，Postgres 无法自动 cast enum→varchar），随后 DROP TYPE
  - 现有枚举值全量种子入库（幂等 ON CONFLICT DO NOTHING），sort_order 与静态回退数组顺序一致
- schema.ts：newsCategoryEnum / solutionKeyEnum / reportTypeEnum 三个 pgEnum 删除；newsStatusEnum / contentStatusEnum / leadStatusEnum 保留

## 服务端

- `server/utils/category-admin.ts`（menu-admin 配方三态语义）：
  - `CATEGORY_SCOPES` / `categoryInputSchema`（slug 类 scope key 走 `/^[a-z0-9][a-z0-9-]*$/`，report-type 允许中文，per-scope superRefine）
  - `staticCategoriesFor(scope)`：新闻分类沿用 data/news.ts newsCategoryTabs（单一事实源）；solution/report-type 走新纯字符串模块 `data/solution-categories.ts`
  - `listCategories`（null 哨兵→公开路由回退静态）/ `listAdminCategories`（附引用计数）/ `createCategory`（conflict）/ `updateCategory` / `deleteCategory`（in-use）/ `categoryExists` / `assertCategoryExists`（400）/ `countCategoryRefs`（solution 三表合并）
- 公开路由 `GET /api/categories?scope=`：DB 优先（含管理员清空后的空表），无库回退静态快照，`source: 'db' | 'static'` 标记
- admin 路由：`GET/POST /api/admin/categories`、`PUT/DELETE /api/admin/categories/[scope]/[key]`（全 requireAdmin；409 in-use 的 statusMessage 附引用数；503 无库）
- 写入协议放宽：content-admin.solutionKeySchema / news-admin.newsCategorySchema / reports-admin.reportTypeSchema 由 z.enum 改 `z.string().trim().min(1).max(50)`，存在性校验移至写入路由（zod 不碰 DB）
- `GET /api/news?category=` 改透传任意 ≤50 字符串（repo 等值过滤，未知 key 得空表）——不再以静态 tabs 做白名单

## 主站（6 处消费点）

- `composables/use-categories.ts`：useNewsCategories / useSolutionCategories / useReportTypes（useFetch 固定 key + transform 取 items + default 静态回退）
- `NewsCategoryTabs.vue`：数据源改 composable；`grid grid-cols-3` 改 `flex`（每项 flex-1，数量自适应）
- `pages/news/index.vue`：?category= 校验以动态 tabs 为准（与组件共享 useFetch 缓存），回退静态
- `pages/cases/index.vue`：?category= 校验改动态 solution 分类（solutionKeys computed）
- `ReportFilterBar.vue`：行业 tabs 动态化；新增 `withTypeFilter` + `activeType`——报告页双筛选（行业 + 类型），案例页不变
- `pages/resources/reports.vue`：接双筛选
- 面包屑 key→label：pages/news/[id].vue（动态优先回退 getNewsCategoryLabel）、pages/cases/[slug].vue（动态优先回退 reportFilterTabs）
- data/news.ts NewsCategory、data/reports.ts ReportResourceType/ReportSolutionFilterKey 放宽为 string（静态常量保留作回退）

## vben admin

- 新视图 `views/content/categories.vue` 挂 /content/categories（「分类管理」）：scope Tabs + 表格（key/名称/排序/引用数/更新时间）+ 新建/编辑 Modal（编辑时 key 锁定）+ 删除（409 in-use 提示引用数）
- `views/content/shared/options.ts`：新增 `useCategoryOptions(scope, fallback)`（onMounted 拉公开 /api/categories，失败回退静态常量）；news/cases/reports 三个编辑页 Select 全部接动态 options
- api/content.ts：SolutionKey 放宽为 string；新增 listCategoriesApi（公开）+ listAdminCategoriesApi/createCategoryApi/updateCategoryApi/deleteCategoryApi

## 门禁 / 测试

- `tests/category-admin.spec.ts`（22 例）：scope 白名单、key 正则两族（slug/中文）、静态快照与迁移 0010 种子对齐、z.enum 放宽、listCategories 三态（空表不回退静态）、引用计数（solution 三表合并）、软外键 400/跳过、create conflict、delete in-use
- harness 文本锁同步：news.mjs（flex 布局 + NewsCategory=string）、backend-news.mjs（?category= 透传）、case-detail.mjs（动态校验）；contract 镜像同步（news.contract / news-api.contract / case-detail.contract / admin-api.contract 015.16 块）
- sources.mjs +11 键；required-files +迁移 0010、+6 server 文件、+data/composable、+admin 视图、+单测、+任务文档

## 验证

- 迁移：`pg_dump` 备份 → db:migrate → psql 确认五列 varchar(50)、content_categories 16 行种子、news/reports/cases 行数无损
- curl（dt-admin cookie）：GET /api/categories 三 scope（source:db）→ admin CRUD → 删除被引用分类 409 → 新闻 POST 未知分类 400 → 主站 /news tabs 渲染新分类

## 已知边界

- 分类重命名不改 key（label 可改）；改 key = 新建 + 迁移引用 + 删旧（删除被引用时 409 拦住）
- 删除分类的引用计数为删除时快照；并发写入竞态一期接受（管理后台低频）
- 静态回退模式下（无 DB）分类固定为种子快照，分类管理端点 503
