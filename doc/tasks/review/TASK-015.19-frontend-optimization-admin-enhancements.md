# TASK-015.19 前端优化与后台增强

> 状态：已完成（a–e 全部完成）
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

## 015.19c 区块模板多区块组合（已完成）

### 需求
页面由区块组成；模板应能把多个组件/区块组合成一个区块模块（section 组合），并可在后台编辑模板内容。

### 改动
- 迁移 `0013_preset_sections_array`（手写：drizzle-kit 对 rename 需交互确认，非 TTY 不可用）：section 列原位数组化（jsonb_typeof 守卫幂等）→ 改名 sections；快照 0013_snapshot.json 与 journal 手工维护。
- `server/db/schema.ts`：sectionPresets.sections jsonb notNull default []。
- `server/utils/preset-admin.ts`：presetInputSchema.sections 复用 `pageSectionsSchema.min(1)`（hero≤1、per-variant 必填组、custom props 页面级约束对模板生效）。
- admin：`api/presets.ts` 类型改 sections；`SectionsEditor.vue` onAdd preset 分支整组插入、savePreset 存 `[clone]`；`SectionPalette.vue` 模板项摘要改类型拼接 + 「N 区块」徽标；`presets.vue` 编辑 Modal 升级 Drawer 内嵌 SectionsEditor（名称/描述+区块内容同屏编辑），表格类型列多 Tag、摘要拼接。
- 坑：structuredClone 不能克隆 reactive 代理（DataCloneError），openEdit/saveEdit 均先 toRaw。
- 锁同步：preset-admin.spec（sections 载荷 + 空数组拒绝 + 双 hero 拒绝且单 hero 合法）、audit-error-states.spec、admin-api.contract.ts、backend-admin.mjs。

### 验证
- 质量门全绿（含 build）。
- `PUT /api/admin/presets/1` 双 hero → 400；POST 两区块模板 → id；GET 列表旧模板（id=3）自动数组化为 1 区块（向后兼容生效）。
- 浏览器：模板列表多 Tag（富文本+CTA 横幅）与摘要拼接；编辑 Drawer 打开含 2 个区块卡片与面板「2 区块」徽标；改名保存回列表生效。

## 015.19d 组件管理扩覆盖（已完成）

### 需求
组件管理覆盖全部组件（8 标准区块 + 20 定制组件 + hero 视觉），且可运维（看用法、跳内容入口）。

### 改动
- `server/utils/component-admin.ts`：knownIds 并入 HERO_VISUAL_NAMES；scanSectionUsage 统计 hero `visualName`；新增 `listComponentCatalog()`（标准/定制/hero 视觉三类，含 kind/label/description/category/fields/contentEntry）。
- `components/sections/custom-props.ts`：meta 增可选 `contentEntry {label, adminRoute?, dataPath?}`；12 个零 props 数据驱动组件登记内容入口（ContactFormSection→/leads、HomeCustomerLogos→/showcase/logos、About*/Why*→data 源等）。
- `server/api/admin/components/index.get.ts`：payload 增 `catalog`（旧字段保留兼容）。
- admin `views/components/index.vue`：行源改 catalog（kind 三色 Tag）+ kind/分类筛选 + 关键词搜索 + 详情 Drawer（fields 表、usage slugs、contentEntry 跳转/展示）；顺带承接工作区既有 toast 清理 hunk。
- admin `views/pages/edit.vue`：hero 视觉下拉按 disabled 过滤（停用即从表单消失）。
- 锁同步：component-registry.spec、audit-component-schema.spec、admin-api.contract.ts（catalog + 纯度正则改意图锁）、backend-admin.mjs。

### 验证
- 质量门全绿（含 build）。
- `GET /api/admin/components` catalog 含 3 条 kind=hero-visual；停用某 hero 视觉后页面编辑器下拉少一项、usage 计数出现。
- 浏览器：组件管理列表 31 行、筛选/搜索生效、详情 Drawer 展示 fields 与内容入口。

## 015.19e 页面编辑实时预览（已完成）

### 需求
页面管理编辑区块时不保存即可在预览中看到当前内容（表单 + 实时预览同屏）。

### 改动
- 机制：postMessage 桥。admin `views/pages/edit.vue`：previewUrl 追加 `&live=1`；Drawer 打开后 watch sections/sectionsText/sectionMode（deep）+ 300ms debounce 向 iframe post `{type:'dt-cms-live-preview', payload:{title,seoDescription,sections}}`，targetOrigin DEV=`http://localhost:3000`/prod=同 origin（绝不 '*'）；JSON 模式解析失败不 post。
- 主站 `pages/[...slug].vue`：仅 `preview:true`（服务端 admin 门）+ `live=1` 时注册 message 监听；origin 白名单（DEV `http://localhost:5666`/prod 同 origin）+ type 校验 + 客户端消毒（数组 1–50、剔 `on*` 键、visible 强转 boolean），非法载荷保持上一帧；横幅 live 态显示「实时预览 · 未保存内容」。
- 验证期修复三处：
  1. SSR 崩溃——`window` 在 setup 顶层被求值（`LIVE_ALLOWED_ORIGINS` 与 immediate watch）→ `import.meta.client` 门 + 客户端求值 origin。
  2. DataCloneError——postMessage 不能克隆 reactive 代理 → 发送前 JSON 往返转纯对象。
  3. 首帧丢失——iframe `@load` 首发早于主站 hydration，监听器未挂 → 反向握手：主站挂载后 post `dt-cms-live-preview-ready`，admin 收到补发。
  4. 抽屉遮罩拦截表单点击 → Drawer `:mask="false"` 非模态 + 打开时容器 `pr-[56%]` 让表单回流到左侧，边改边看。
- `components/common/CmsPageView.vue`：新增 `previewBanner` prop 承载 live 态文案。
- 锁同步：admin-api.contract.ts（`dt-cms-live-preview` / `route.query.live === '1'` / `LIVE_ALLOWED_ORIGINS`）、backend-admin.mjs。

### 验证
- 质量门全绿（lint/typecheck/test/test:visual/harness/build，build 后重启双 dev）。
- 浏览器：打开「预览草稿」→ iframe 横幅「实时预览 · 未保存内容」；改富文本段落/页面标题/SEO 描述（不保存）→ ~300ms 内 iframe 文案、`document.title`、meta description 同步，旧文案消失。
- 负例：伪造 origin（http://evil.example）投喂被忽略；60 区块超上限被忽略；`onclick` 键被消毒剥离（渲染 DOM 无 `[onclick]`）；合法段落文本照常渲染。
- 临时草稿页 `/live-preview-test` 已 DELETE（404 确认）。
