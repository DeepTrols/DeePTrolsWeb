# TASK-014.16：智慧储能解决方案页面
---
* TaskName：智慧储能解决方案页面
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/energy-saving.md` 新建 `/solutions/energy` 专用页面：延续智能制造解决方案页的 Header 与 section 间距节奏（586 高 Hero、section1 `pt-32`、section2 compact、能力卡区 `pb-16 lg:pb-32` + `mt-16`、价值区 tight + container `mt-16`、案例区 `pb-32 lg:pb-44`），全部 Tailwind CSS v4，不新建样式。
* TaskCreator：Olly
* TaskCreationTime：2026-09-11
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.16 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0 |
| 负责人  | Claude |

---
## 任务目标
新建 `/solutions/energy`（导航 mega 链接与 `use-cases.ts` slug 均指向该路由）专用页面：
- Hero：与智能制造 Hero 完全一致的 586 高布局（渐变标题 + 绝对定位描述 + 透明描边白色 CTA），背景 `public/images/solutions/energy-saving-hero.png`（源自需求目录 energy-saving.png）。
- Section1 行业痛点：`ProductFeatureGridSection` BaseCard 2x2（`pt-32`、`header-width="wide"`），四条痛点文案取自需求文档。
- Section2：`SectionShell spacing="compact"` + 居中 `SectionHeader`（eyebrow 行业痛点）+ `ProductSystemFlowFrame`（flow 暂不传入）。
- Section3 解决方案：DeepCtrls `sc-card` 抽屉动画能力卡 4 张（储能设备接入管理 / 储能运行数据治理 / 电池健康状态评估 / 充放电策略优化），与制造页核心功能体系同构。
- Section4：无 eyebrow、无副标题，标题靠左对齐，下方 3 张 BaseCard（新能源高效消纳 / 削峰填谷与需量管理 / 源网荷储协同），间距延续制造页 section4（tight + container `mt-16`）。
- Section5 客户案例：延续制造页 EMQX 式案例排版，3 个储能案例（第二例 `reversed`），文案与统计数字取自用户提供的储能案例内容。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/energy-saving.md`
- `doc/tasks/review/TASK-014.15-manufacturing-solution-page.md`

---
## 实现内容
1. 新增 `pages/solutions/energy.vue`（静态路由优先于 `[slug].vue`），组装全部 section 与 `CtaSection`；`useSeoMeta` 登记标题与描述。
2. 新增 `components/solution/energy-saving/EnergySavingHero.vue`：与 `ManufacturingHero.vue` 同构的 Tailwind 复刻（h-[586px]、左侧暗色渐变、渐变标题 clamp 排版、白色描边 CTA + SVG 箭头），文案数据来自 `energySavingHero`。
3. 新增 `components/solution/energy-saving/EnergySavingCapabilityCardsSection.vue`：`#f6f8fb` 背景 + `container mt-16` + 居中 SectionHeader（eyebrow 解决方案）+ 4 张 sc-card 抽屉动画卡片，占位图 `energy-saving/image-placeholder.svg`。
4. 新增 `components/solution/energy-saving/EnergySavingValueSection.vue`：`SectionShell spacing="tight" container-spacing="top"` + 左对齐纯标题 `SectionHeader` + `CardGrid columns="three"` 3 张 BaseCard。
5. 新增 `components/solution/energy-saving/EnergySavingCustomerCasesSection.vue`：与制造页案例区同构（`container pb-32 lg:pb-44`、`gap-11`、交替 `lg:flex-row-reverse`、`lg:w-[320px]` 侧栏、3 统计格、查看案例详情按钮）。
6. 新增 `data/solutions/energy-saving.ts` 集中全部文案（Hero、痛点、能力卡、价值卡、案例）；新增 `public/images/solutions/energy-saving-hero.png` 与 `public/images/solutions/energy-saving/image-placeholder.svg`。
7. 契约同步：新增 `tests/visual/site/solutions/energy-saving.contract.ts`（注册进 `tests/visual.spec.ts`）与 `scripts/harness/checks/solutions-energy-saving.mjs`（注册进 `scripts/harness-check.mjs`，源文件登记进 `scripts/harness/sources.mjs`）；`scripts/harness/required-files.mjs` 登记页面、4 个组件、数据文件与本任务文档。

---
## 验收结果
| 检查项 | 结果 |
|---|---|
| `pnpm lint` / `pnpm typecheck` | 通过 |
| `pnpm test` / `pnpm test:visual` | 通过 |
| `pnpm harness:engineering` | 通过 |
| SSR：`/solutions/energy` | 200，各 section 顺序渲染，Header 顶部白色 logo（解决方案页节奏） |

---
## 结论
智慧储能解决方案页面已按需求文档完成，Header 与 section 间距完全延续智能制造解决方案页节奏；sc-card 抽屉动画、EMQX 案例排版与 586 Hero 布局均复用制造页同构实现，全部使用 Tailwind CSS v4，未新增任何样式文件；文案与统计数字与需求文档及用户提供内容逐字一致；契约与 Harness 检查已同步登记。
