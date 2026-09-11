# TASK-014.17：智慧水利解决方案页面
---
* TaskName：智慧水利解决方案页面
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/hydraulic.md` 新建 `/solutions/water` 专用页面：延续智能制造解决方案页的 Header 与 section 间距节奏（586 高 Hero、section1 `pt-32`、section2 compact、能力卡区 `pb-16 lg:pb-32` + `mt-16`、价值区 tight + container `mt-16`、案例区 `pb-32 lg:pb-44`），全部 Tailwind CSS v4，不新建样式。
* TaskCreator：Olly
* TaskCreationTime：2026-09-11
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.17 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0 |
| 负责人  | Claude |

---
## 任务目标
新建 `/solutions/water`（导航 mega 链接「智慧水利/水务解决方案」与 `use-cases.ts` slug `water` 均指向该路由）专用页面：
- Hero：与智能制造 Hero 完全一致的 586 高布局（渐变标题 + 绝对定位描述 + 透明描边白色 CTA），背景 `public/images/solutions/hydraulic-hero.png`（源自需求目录 hydraulic.png）。
- Section1 行业痛点：`ProductFeatureGridSection` BaseCard 2x2（`pt-32`、`header-width="wide"`），每条痛点含 3 条要点（・列表）+ 描述。
- Section2 解决方案：`SectionShell spacing="compact"` + 居中 `SectionHeader` + `ProductSystemFlowFrame`（flow 暂不传入）。
- Section3 核心功能体系：与制造/储能页同构的 DeepCtrls `sc-card` 抽屉动画能力卡 4 张（水利知识库管理 / 水利知识图谱 / 水利智能问答 / 水利辅助决策）。
- Section4 核心价值：按首页「为什么DeepTrols值得信赖」card 排版（`dt-product-card` + accent + IconBox 40/20 + 主色副标题），4 项各含 3 个 Tags 胶囊，间距延续制造页 section4（tight + container `mt-16`）。
- Section5 客户案例：延续 EMQX 式案例排版，3 个水利案例（第二例 `reversed`），文案与统计数字取自需求文档。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/hydraulic.md`
- `doc/tasks/review/TASK-014.15-manufacturing-solution-page.md`
- `doc/tasks/review/TASK-014.16-energy-saving-solution-page.md`

---
## 实现内容
1. 新增 `pages/solutions/water.vue`（静态路由优先于 `[slug].vue`），组装全部 section 与 `CtaSection`；`useSeoMeta` 登记标题与描述。
2. 共享组件向后兼容扩展：`ProductFeatureGridItem` 新增可选 `points?: string[]`，经 `FeatureCard` 透传至 `CardText`，在标题与描述之间渲染 Tailwind 圆点列表（无新增样式，未传 `points` 的既有页面渲染结果不变）。
3. 新增 `components/solution/hydraulic/HydraulicHero.vue`：与 `ManufacturingHero.vue` 同构的 Tailwind 复刻，文案数据来自 `hydraulicHero`。
4. 新增 `components/solution/hydraulic/HydraulicCapabilityCardsSection.vue`：`#f6f8fb` 背景 + `container mt-16` + 居中 SectionHeader（eyebrow 核心功能体系）+ 4 张 sc-card 抽屉动画卡片，占位图 `hydraulic/image-placeholder.svg`。
5. 新增 `components/solution/hydraulic/HydraulicValueSection.vue`：`SectionShell spacing="tight" container-spacing="top"` + 居中 SectionHeader（eyebrow 核心价值）+ `CardGrid columns="two"`，卡片以 Tailwind 复刻 `TrustTabsSection` 排版（`variant="product"`、accent、`!p-7 lg:!p-8`、IconBox 40/20、24px 粗标题、主色副标题、Tags 胶囊 `rounded-full bg-dt-bg-soft`）。
6. 新增 `components/solution/hydraulic/HydraulicCustomerCasesSection.vue`：与制造/储能页案例区同构（`container pb-32 lg:pb-44`、`gap-11`、交替 `lg:flex-row-reverse`、`lg:w-[320px]` 侧栏、3 统计格、查看案例详情按钮）。
7. 新增 `data/solutions/hydraulic.ts` 集中全部文案；新增 `public/images/solutions/hydraulic-hero.png` 与 `public/images/solutions/hydraulic/image-placeholder.svg`。需求文档中指代来源方案的备注句（"方案中也明确指出…"、"方案特别提出…"、"平台原设计也包含…"、"原方案明确设计了…"）不属于页面文案，未纳入。
8. 契约同步：新增 `tests/visual/site/solutions/hydraulic.contract.ts`（注册进 `tests/visual.spec.ts`）与 `scripts/harness/checks/solutions-hydraulic.mjs`（注册进 `scripts/harness-check.mjs`，源文件登记进 `scripts/harness/sources.mjs`）；`scripts/harness/required-files.mjs` 登记页面、4 个组件、数据文件与本任务文档。

---
## 验收结果
| 检查项 | 结果 |
|---|---|
| `pnpm lint` / `pnpm typecheck` | 通过 |
| `pnpm test` / `pnpm test:visual` | 通过 |
| `pnpm harness:engineering` | 通过 |
| SSR：`/solutions/water` | 200，各 section 顺序渲染，Header 顶部白色 logo（解决方案页节奏） |

---
## 结论
智慧水利解决方案页面已按需求文档完成，Header 与 section 间距完全延续智能制造解决方案页节奏；行业痛点卡通过共享组件可选 `points` 扩展支持要点列表（向后兼容），核心价值区以纯 Tailwind 复刻首页信赖卡排版并补充 Tags 胶囊，sc-card 抽屉动画与 EMQX 案例排版复用制造/储能页同构实现；未新增任何样式文件；契约与 Harness 检查已同步登记。
