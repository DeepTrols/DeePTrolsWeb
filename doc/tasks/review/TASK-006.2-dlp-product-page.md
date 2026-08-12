# TASK-006.2：数曜·数据标签平台页面
---
* TaskName：数曜·数据标签平台页面
* TaskDescription：根据 DLP.md 完成 `/products/data-labeling` 数曜·数据标签平台产品页，严格复用 HOME 基准与公共组件，页面新增样式仅使用 Tailwind CSS v4 utility。
* TaskCreator：Codex
* TaskCreationTime：2026-08-04
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-006.2 |
| Epic | EPIC-006 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 创建 `/products/data-labeling` 路由。
2. 严格根据 `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/DLP.md` 实现数曜·数据标签平台页面。
3. 页面使用公共 Header、Footer、PageHero、ProductFeatureGridSection、ProductSystemFlowFrame、CtaSection 等公共组件。
4. 新增 DLP 页面业务组件不写 scoped CSS，仅使用 Tailwind CSS v4 utility 与 `dt-*` 公共样式层。
5. 更新测试与 Harness Engineering，确保后续页面不偏离。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/NAVIGATION.md`
- `doc/product/SITE_MAP.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/DLP.md`

---
## 实现内容
1. 新增 `/products/data-labeling` 页面，接入公共 Header、Footer 和 SEO。
2. 新增 `data/dlp.ts`，集中管理 DLP Hero、挑战、核心优势、核心能力时间轴、标签沉淀、应用场景与 CTA 数据。
3. 新增 `DlpHero` 与 `DlpHeroVisual`，Hero 使用公共 `PageHero`，右侧视觉为 Tailwind-only 图片占位。
4. 新增 `DlpArchitecture`，复用 `ProductSystemSection` 与 `ProductSystemFlowFrame`，暂不传入具体 flow。
5. 新增 `DlpCapabilityTimelineSection`，按 DLP.md 要求实现 EMQX Edge 风格的中轴交错能力区，文字侧为纯文本块，不使用 card 边框与 icon。
6. 新增 `DlpAiModelingSection`，实现 AI 辅助建标左右布局，右侧图片占位。
7. 扩展 `ProductFeatureGridSection` 支持 `columns="three"`，用于 DLP 核心优势三列网格与三张应用场景卡片。
8. 新增 `tests/dlp-content.spec.ts`，并更新 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs`，将 DLP 页面纳入内容、视觉和 Harness 契约。
9. 更新 `doc/engineering/COMMON_SECTION_COMPONENTS.md`，记录 Product Feature Grid 的 2 / 3 / 4 列复用方式。
10. 复核修复 DLP 核心能力区：移除 `BaseCard` 与 `IconBox`，恢复 EMQX Edge 风格无边框交错叙事排版。
11. 复核修复 DGP 企业级数据治理区：移除文字侧 `.dt-card` 外壳，保持与产品页交错叙事区一致。
12. 复核修复 DLP 核心能力与 DGP 企业级数据治理的 `SectionHeader` eyebrow 样式，恢复全局默认标题层级。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过
- [x] 浏览器验证无 console error

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `pages/products/data-labeling.vue` | 新增数曜·数据标签平台页面 |
| `data/dlp.ts` | 新增 DLP 页面集中内容配置 |
| `components/product/dlp/DlpHero.vue` | 新增 DLP Hero 配置封装 |
| `components/product/dlp/DlpHeroVisual.vue` | 新增 Hero 图片占位视觉 |
| `components/product/dlp/DlpArchitecture.vue` | 新增解决方案架构区 |
| `components/product/dlp/DlpCapabilityTimelineSection.vue` | 新增核心能力交错时间轴区 |
| `components/product/dlp/DlpAiModelingSection.vue` | 新增 AI 辅助建标区 |
| `components/product/dgp/DgpEvolutionSection.vue` | 复核修复企业级数据治理交错叙事文字侧，去除 card 外壳 |
| `data/dlp.ts` | 复核移除核心能力时间线不再展示的 icon 字段 |
| `components/common/ProductFeatureGridSection.vue` | 支持 `columns="three"` |
| `tests/dlp-content.spec.ts` | 新增 DLP 内容契约测试 |
| `tests/visual.spec.ts` | 新增 DLP 页面视觉契约 |
| `scripts/harness-check.mjs` | 新增 DLP Harness 检查 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 Product Feature Grid 三列复用说明与交错叙事区约束 |
| `doc/engineering/COMPONENT_REFINEMENT_AUDIT.md` | 校准 DGP 企业级数据治理的抽离方向 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/DLP.md` | 新增 DLP 产品页面需求文档 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `git pull --ff-only` | 通过，Already up to date |
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，5 个文件、21 个测试 |
| `pnpm test:visual` | 通过，7 个测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| `git diff --check` | 通过 |
| Browser desktop check | 通过，`/products/data-labeling` H1 正常、14 个 section、console error 0、warning 0 |
| Browser mobile check | 通过，390px 宽度无横向溢出、console error 0 |
| Review DLP desktop check | 通过，核心优势 `md:grid-cols-3`、6 张卡片；核心能力 5 个纯文本块、card/icon 数量 0、eyebrow 16px、console error/warn 0 |
| Review DGP desktop check | 通过，企业级数据治理 3 个纯文本块、card/icon 数量 0、eyebrow 16px、console error/warn 0 |
| Review DLP mobile check | 通过，375px 宽度无横向溢出、核心能力 card/icon 数量 0、console error/warn 0 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `feat(TASK-006.2): implement data labeling product page` |
| Commit Hash | `fa61f65` |
| Review Fix Commit Message | `fix(TASK-006.2): align DLP timeline layout` |
| Review Fix Commit Hash | `267f4be` |

## 完成说明
已完成数曜·数据标签平台页面首版实现，页面严格按 DLP.md 区块顺序组合，新增 DLP 业务组件均为 Tailwind-only，未新增 scoped CSS。复核阶段已将核心优势调整为桌面三列网格，并将 DLP 核心能力与 DGP 企业级数据治理恢复为 EMQX 产品页风格的无边框交错叙事排版。当前工作区存在任务开始前已有的 `components/product/dgp/DgpHero.vue` 本地修改，本任务未修改该文件。

---
## 追加实现：Hero 动画视觉（Hero.md）
依据 `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/Hero.md`，将 DLP Hero 右侧图片占位替换为 EMQX Tables Hero（`CloudEmqxTablesHeroVisual`）1:1 内容适配的动画组件。从原页面 SSR HTML 与编译产物中逐行提取原组件 DOM、类名、状态机与时序后原样复刻，仅替换文字、模拟数据、Logo 与业务状态，不重新设计任何 UI：

1. `DlpHeroVisual` 单组件复刻原组件：Glow 背景层、titlebar（红黄绿圆点 + 数曜·数据标签平台 + `w-12` 占位）、双 Tab（标签生成/标签查询，`border-b-2 border-primary` 激活态、`hidden sm:inline` 标签文字）、`h-[475px] overflow-hidden p-5` body，全部类名与原组件一致。
2. 标签生成 Tab：`实时标签生成` + `3 特征` 徽标；三条 `customer/*` 特征行按原逻辑依次高亮（`border-primary/50 bg-primary/10`、Icon→Primary、右侧 Pulse Arrow 仅当前行出现）；中部「─── ◯ ───」引擎节点结构不变，圆形内 EMQX Logo 替换为 `Boxes`；`tag_results` 表 `grid-cols-4`（object/tag/type/value）逐行 opacity 显现、当前行 `bg-primary/5`；底部 `relative mt-3 h-[34px]` 状态叠层 Pulse Dot「正在生成标签...」与绿色 Success「✓ 标签已生成，可直接查询、分析与服务调用。」。时序保持原组件 500ms 启动 / 1000ms 步进 / 500ms 完成，并按 Hero.md #12 在 Success 后停留 3s 循环重播。
3. 标签查询 Tab：`标签实时查询` + `主体画像` 徽标，右侧重置/查询标签按钮（待机 `animate-glow bg-primary`，运行中 `bg-primary/50`）；SQL 代码块（`SELECT tag, category, value, updated FROM tag_results WHERE customer_id = 'A1024';`）行号 + 语法高亮，分词逻辑与原组件一致；点击「查询标签」后 Loading「正在查询标签...」→ 结果表 tag/category/value/updated 以 200ms+150ms 间隔逐行显现 → Success「✓ 已找到 3 个标签，可用于分析、分群与服务调用。」；切回标签生成 Tab 恢复生成动画（Hero.md #13/#14）。
4. 新增 `useDlpHeroAnimation.ts` 复刻原组件状态机与动画时序，新增 `heroSql.ts` 复刻原 SQL 分词器与 token 配色；均 Tailwind-only、无 scoped CSS。
5. `assets/css/tailwind.css` 通过 `@theme` 新增 `--animate-glow` 与原组件一致的 glow keyframes（`#8b5cf6` 阴影，2s ease-in-out infinite）。
6. 仅做 token 桥接映射，不改视觉：`bg-muted/30|/50`→`bg-dt-bg-soft/30|/50`、`border-muted/50`→`border-dt-line-strong/50`、`text-muted/50`→`text-dt-text-muted/50`、`bg-white dark:bg-default`→`bg-default`（本站固定暗色）。
7. 移除上一版自行设计的 `DlpTagGenerationPanel` / `DlpTagQueryPanel` / `DlpTagEngineNode` / `DlpHeroStatus`，改为严格复刻的单组件实现；同步更新 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs` 为单组件 + heroSql 契约。

### 追加测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，7 个文件、30 个测试 |
| `pnpm test:visual` | 通过，9 个测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| Headless 浏览器验证（桌面） | 标签生成：特征依次高亮 + Pulse Arrow、`tag_results` 逐行生成、行数徽标、Success 叠层、3s 后循环重播均与原组件一致；标签查询：SQL 高亮、Loading→逐行结果→Success、按钮 glow 正常 |
| Headless 浏览器验证（390px） | Tab 标签收起为 icon、表格内部横向滚动、无整页横向溢出 |

### 追加修改文件
| 文件 | 说明 |
|----|----|
| `components/product/dlp/DlpHeroVisual.vue` | EMQX Tables Hero 1:1 复刻的双 Tab 动画卡片（Tailwind-only） |
| `components/product/dlp/useDlpHeroAnimation.ts` | 复刻原组件状态机与动画时序 |
| `components/product/dlp/heroSql.ts` | 复刻原 SQL 分词器、关键字/函数列表与 token 配色 |
| `assets/css/tailwind.css` | 新增 `--animate-glow` 与 glow keyframes |
| `data/dlp.ts` | Hero 动画模拟数据（特征/标签结果/查询结果） |
| `tests/visual.spec.ts` | 更新 DLP Hero 视觉契约为单组件契约 |
| `scripts/harness-check.mjs` | 更新 DLP Hero Harness 契约为单组件 + heroSql 契约 |
| 删除 `DlpTagGenerationPanel.vue` 等 4 个组件 | 移除上一版自行设计实现 |

### 复核反馈修复（Tab / 查询按钮 / Hero 宽度）
通过 CDP 读取原站与本地页面真实 computed style 逐项对齐，修复三类偏差：

1. **按钮字体被全局 reset 覆盖**：`assets/scss/main.scss` 中无层级 `button { font: inherit }` 在 Tailwind v4 原生 cascade layers 下胜过 utilities 层，导致 Tab 与查询按钮的 `text-xs`/`text-[10px]`/`font-medium`/`font-semibold` 全部失效（computed 16px/400）。已将该 reset 包裹进 `@layer base`，修复后 Tab 12px/500/h38、按钮 10px/600/h23，与原站完全一致。
2. **Hero 宽度对齐 DGP**：`DlpHero` 增加 `visual-size="large"`（与 DGP 相同的 `minmax(520px,1fr)` 视觉列），`DlpHeroVisual` 根节点补 `w-full` 填充 PageHero 的 flex 插槽（同 `DgpHeroVisual` 约定）。卡片宽度由 346px 提升至 630px（原站 576px，DGP 视觉列基准）。
3. **圆角对齐原站 computed 值**：原站 radius 为默认 2 倍（rounded-3xl=48、2xl=32、xl=24、lg=16、md=12，rounded=4 保持）。`DlpHeroVisual` 改用 `rounded-[48px]/[32px]/[24px]/[16px]/[12px]` 精确匹配，`rounded`/`rounded-full` 保持。
4. **page-hero__content 垂直居中**：`visual-size="large"` 下 `page-hero__inner` 使用 `lg:items-stretch`，文字列随视觉列拉伸后顶部对齐。`components/common/PageHero.vue` 的 `page-hero__content` 增加 `lg:self-center`，文字列在网格行内垂直居中，视觉列保持 `self-stretch` 不受影响；`visual-size="default"` 页面本已 `lg:items-center`，无回归。CDP 探针：DLP 文字列与视觉列中心差 0（上/下留白均 93px）、DGP 中心差 0.5px、DDP/DMS default 页面保持居中。`tests/visual.spec.ts` 同步更新该 class 契约。

修复后探针比对：卡片 630×557 r32（原站 576×557 r32），Tab 与按钮全部指标与原站一致；`tests/visual.spec.ts` 与 `scripts/harness-check.mjs` 的 DLP Hero 契约同步改为要求 `visual-size="large"`。

| 命令 | 结果 |
|----|----|
| `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm test:visual` / `pnpm harness:engineering` / `pnpm build` | 全部通过 |
| CDP 探针比对 | Tab h38 fs12 fw500、查询按钮 h23 fs10 fw600 r12、卡片 r32，均与原站一致 |
| CDP 垂直居中探针 | DLP 文字列 alignSelf=center、与视觉列中心差 0（上下留白均 93px）；DGP 中心差 0.5px；DDP/DMS default 页面保持居中，无回归 |
