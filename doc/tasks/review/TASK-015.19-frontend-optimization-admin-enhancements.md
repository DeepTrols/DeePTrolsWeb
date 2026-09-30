# TASK-015.19 前端优化与后台增强

> 状态：进行中（a/b 已完成）
> 范围：首页文案与 tab 改版、导航 mega 调整、方案页案例展示旧视觉回归+后台指标、区块模板多区块组合、组件管理扩覆盖、页面编辑实时预览

## 015.19a 首页与导航文案改版（已完成）

### 需求
- 首页：`DeepTrols OPS`→`智能底座`；`Use Cases`→`解决方案`；`ecosystem`→`深度服务`；`Resources`→`资源`。
- Use Cases 五 tab 重命名与条目重写：智慧环保→智慧储能（储能数据与感知 / 贯通感知、数据、分析与优化的储能智能能力体系）、智慧能源→算电协同（算力与能源协同优化 / 统筹算力、电力、冷却与储能，降低综合成本）、智慧水利条目→智慧水利知识中枢（从数据治理到知识决策，构建智慧水利核心能力）、算力中心→智慧教育（面向教育场景的AI智能体与智能工作流 / 从模型调用到任务执行，构建教育 AI 原生能力体系）、数据治理→FDE（FDE解决方案 / 深入业务现场，让AI从概念验证走向生产价值）。
- 五 tab「阅读案例」改跳行业案例页并默认选中对应 tag：smart-energy-storage（新增「智慧储能」）/ compute-power / smart-water / smart-education / fde；智能制造 tab 不动。
- 导航：核心产品 mega 标题「核心技术」→「核心产品」；核心产品与解决方案两个 mega 标题均无 index 页，改为不可点击。

### 改动
- `data/home-sections.ts`：唯一代码源，全部文案与 5 个 href。
- `data/solution-categories.ts`、`data/reports.ts`：追加 `smart-energy-storage / 智慧储能`（静态回退）。
- DB：`content_categories` 幂等 INSERT（迁移 0012 同语句；本地先行插入）。
- `data/navigation.ts`：megaTitle。
- `components/navigation/MegaPanelProduct.vue`：mega 标题 NuxtLink→div（保留 `mega-title` 类），删除 hover/focus 变色与 chevron。
- 锁同步：hero-product/solutions/insights-cta/ecosystem 四个 visual contract、home-content.spec、category-admin.spec（0010/0012 种子清单）、report-content.spec、home-layout.mjs（3 hunk）。
- `pnpm db:seed` 刷新 nav_menus（onConflictDoUpdate）。

### 验证
- 质量门全绿（lint/typecheck/test/test:visual/harness/build）。
- `/api/categories?scope=solution` 含 smart-energy-storage；`/cases?category=smart-energy-storage` 该 tab `aria-selected="true"`。
- `/api/navigation?key=header` megaTitle=核心产品；浏览器悬停两 mega：标题 tagName=DIV、cursor=auto。
- 首页 SSR 含全部新文案。

### 范围外残留（后续任务统一）
- `/solutions` 页 use-cases 与 footer 仍为旧话术（智慧环保/智慧能源/算力中心/数据治理）。
- 导航「智慧储能解决方案」仍跳 `/solutions/energy`，与首页 tab 跳 `/cases?category=smart-energy-storage` 语义并存。

## 015.19b 方案页案例旧视觉回归 + 后台指标（已完成）

### 需求
- 解决方案页案例展示回滚到旧视觉（全宽交替大卡：标题+摘要+三指标渐变带+案例图+详情按钮）。
- 后台新建/编辑案例提供 3 组「指标名称+指标数量」输入，与方案页大卡三指标对应。

### 决策
- 旧视觉 + 后台数据：保留 015.17 推荐位链路（solution_case_picks），卡片数据改读 cases 表新增 `metrics` jsonb 列（非 case_details：resolveSolutionCases 单表读、免 join、免详情行缺失丢卡）。
- 字段映射：title→title、description→summary、stats→metrics、占位图→image、按钮→/cases/[slug]、reversed→index 奇偶。

### 改动
- 迁移 `0012_dear_blizzard`：cases.metrics jsonb notNull default [] + 智慧储能分类幂等 INSERT。
- `server/db/schema.ts`、`server/utils/cases-admin.ts`（caseMetricSchema + caseInputSchema + 读写投影；顺带承接工作区既有加固 relatedProducts.max(20)）、`cases-repo.ts`、`solution-cases-admin.ts`、`scripts/db-seed.ts`。
- `data/cases.ts`：CaseMetric 类型 + 7 条案例各 3 指标。
- `components/solution/SolutionCasePicksSection.vue`：template 重写为旧视觉（script 数据链路与 useFetch key 原样保留）。
- admin：`api/content.ts` CaseMetricInput/CaseInput.metrics；`views/content/cases/edit.vue` 案例指标结构化行编辑（最多 3 条，禁裸 JSON）。
- 锁同步：backend-admin.mjs（caseMetricSchema + 旧视觉四锁）、admin-api.contract.ts、content-admin.spec.ts（>3/空值拒绝）、solution-cases-admin.spec.ts（caseRow/toEqual 加 metrics）。

### 验证
- 质量门全绿（含 build）；迁移与 seed 后 `/api/solutions/smart-education/cases` items 含 metrics。
- 方案页 SSR 渲染指标带（/solutions/manufacturing 等四页）；picks 空 → 静态回退单卡带指标。
- 后台编辑页回显 3 行指标（20+/教育智能体上线），达上限隐藏新增按钮。

## 015.19c 区块模板多区块组合（待做）

迁移 0013 section→sections 幂等数组化；preset-admin 复用 pageSectionsSchema 页面级约束；presets.vue 嵌 SectionsEditor；拖入整组插入。

## 015.19d 组件管理扩覆盖（待做）

catalog 含 hero 视觉 + visualName usage + 零 props 组件 contentEntry + vben 筛选/搜索/详情抽屉 + hero 下拉按启停过滤。

## 015.19e 页面编辑实时预览（待做）

postMessage 桥（live=1 + admin 门 + origin 双向白名单 + 客户端消毒），未保存 sections 即改即览。
