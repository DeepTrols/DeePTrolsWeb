# TASK-014.18：智慧教育解决方案页面
---
* TaskName：智慧教育解决方案页面
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/education.md` 新建 `/services/smart-education` 专用页面：延续智能制造解决方案页的 Header 与 section 间距节奏（586 高 Hero、section1 `pt-32`、section2 compact、能力卡区 `pb-16 lg:pb-32` + `mt-16`、价值区 tight + container `mt-16`、案例区 `pb-32 lg:pb-44`），全部 Tailwind CSS v4，不新建样式；section5「AI 原生教育」严格 1:1 复刻 EMQX Edge 立体方块排版。
* TaskCreator：Olly
* TaskCreationTime：2026-09-11
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.18 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0 |
| 负责人  | Claude |

---
## 任务目标
新建 `/services/smart-education`（导航 mega 链接「智慧教育解决方案」href 已由 `tests/solution-use-cases.spec.ts` 锁定指向该路由，此前为 catch-all 占位页）专用页面：
- Hero：与智能制造 Hero 完全一致的 586 高布局（渐变标题 + 绝对定位描述 + 透明描边白色 CTA），背景 `public/images/solutions/education-hero.png`（源自需求目录 education.png）。
- Section1 行业痛点：`ProductFeatureGridSection` BaseCard 2x2（`pt-32`、`header-width="wide"`），4 条痛点（标题 + 描述，无 points）。
- Section2 解决方案：`SectionShell spacing="compact"` + 居中 `SectionHeader` + `ProductSystemFlowFrame`（label 教育智能体运行底座能力图，flow 暂不传入）。
- Section3 核心功能体系：与制造/储能/水利页同构的 DeepCtrls `sc-card` 抽屉动画能力卡 4 张（教育大模型网关 / 教育智能体开发 / 教育智能工作流 / 校园 MCP 服务），每张含 3 条要点 + 描述。
- Section4 核心价值：按首页「为什么DeepTrols值得信赖」card 排版（`dt-product-card` + accent + IconBox 40/20 + 主色副标题），4 项各含 3 个 Tags 胶囊，间距延续制造页 section4（tight + container `mt-16`）。
- Section5a AI 原生教育：严格 1:1 复刻 EMQX Edge（https://www.emqx.com/zh/products/emqx-edge）左侧 01/02/03 立体方块步骤排版（perspective:800px + rotateX(55deg) rotateZ(-45deg) + preserve-3d 四层方块、色板 violet/fuchsia/blue-500、徽章、tags chips），右侧严格按 EMQX 760×500 绝对定位画布复刻：`origin-top-left` 画布经容器查询 `[transform:scale(calc(100cqw/760px))]` 等比缩放、中央光晕渐变、6 条 `stroke-dasharray` 流动虚线（`<animate stroke-dashoffset>` + 渐变描边 + 高斯模糊 glow）、顶部 Teacher/Student/Campus Apps 三入口胶囊（56×210）、左右 4 个能力块（多模型统一接入/知识与上下文 ↔ 校园系统连接/智能工具调用）、中央 150px 立体方块（primary 色板 + 网格纹理 + `animate-value-flow` 悬浮动画）内嵌智曜 logo（`assets/images/brand/zhiyao-logo.svg`）+「智曜·AgentOS / 理解 · 规划 · 执行」、底部 460px 圆角卡内 模型与算力/知识与数据/校园业务系统 三基础块；右列以 `flex-1` 拉伸保持与左侧步骤面板等高。
- Section5b 教育智能体：`ProductFeatureGridSection` BaseCard 3x3（`spacing="compact"`），9 个智能体各含副标题短语 + 描述 + 3 个 Tags。
- Section6 客户案例：延续 EMQX 式案例排版，3 个教育案例（第二例 `reversed`），文案与统计数字取自需求文档。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/education.md`
- `doc/tasks/review/TASK-014.15-manufacturing-solution-page.md`
- `doc/tasks/review/TASK-014.17-hydraulic-solution-page.md`

---
## 实现内容
1. 新增 `pages/services/smart-education.vue`（静态路由优先于 `[...slug].vue` catch-all），组装全部 section 与 `CtaSection`；`useSeoMeta` 登记标题与描述。
2. 共享组件向后兼容扩展：`ProductFeatureGridItem` 新增可选 `subtitle?: string` 与 `tags?: string[]`，经 `FeatureCard` 透传——subtitle 由 `CardText` 在标题后以 Tailwind 主色行渲染，tags 由 `FeatureCard` 以 Boyao 风格 chips（`rounded-md border border-default bg-default px-2.5 py-1 text-[10px] font-semibold text-muted shadow-sm`）渲染（无新增样式，未传新 props 的既有页面渲染结果不变）。
3. 新增 `components/solution/education/EducationHero.vue`：与 `HydraulicHero.vue` 同构的 Tailwind 复刻，文案数据来自 `educationHero`。
4. 新增 `components/solution/education/EducationCapabilityCardsSection.vue`：`#f6f8fb` 背景 + `container mt-16` + 居中 SectionHeader（eyebrow 核心功能体系）+ 4 张 sc-card 抽屉动画卡片，占位图 `education/image-placeholder.svg`。
5. 新增 `components/solution/education/EducationValueSection.vue`：`SectionShell spacing="tight" container-spacing="top"` + 居中 SectionHeader（eyebrow 核心价值）+ `CardGrid columns="two"`，水利页同款信赖卡 Tailwind 复刻 + Tags 胶囊。
6. 新增 `components/solution/education/EducationAgentFlowSection.vue`：EMQX Edge 1:1 复刻——左面板 `rounded-3xl border border-default bg-dt-bg-soft/30 p-8 shadow-sm backdrop-blur-xl lg:p-10` + `space-y-10` 三步骤（立体方块四层结构以 Tailwind v4 任意属性工具类实现：`[perspective:800px]`、`[transform:rotateX(55deg)_rotateZ(-45deg)]`、`[transform-style:preserve-3d]`、`[transform:translateZ(±12px)]` 等，全站禁用内联 style 属性；`-right-2 -top-2` 序号徽章、tags chips）；右侧严格按用户提供的 EMQX 画布标记复刻：`@container aspect-[760/500]` + `h-[500px] w-[760px] origin-top-left [transform:scale(calc(100cqw/760px))]` 等比缩放画布、中央光晕、SVG 流动虚线（含 `<animate>`）、顶部/左右/底部胶囊块绝对定位坐标与 EMQX 一致（top-[12px]/top-[120px]/top-[300px]/top-[170px]/top-[242px] 等）、中央 150px 立体方块（`[perspective:900px]`、primary 色板、`[background-size:26px_26px]` 网格纹理、复用既有 `animate-value-flow` 悬浮动画替代 EMQX `_platformFloat` CSS module 类）内嵌智曜 logo（`assets/images/brand/zhiyao-logo.svg?url`）；右列 `flex flex-col` + 面板 `flex-1` 与左侧步骤面板等高。立体方块色板类名以字面量存于数据文件供 Tailwind 扫描。
7. 新增 `components/solution/education/EducationCustomerCasesSection.vue`：与制造/储能/水利页案例区同构（`container pb-32 lg:pb-44`、`gap-11`、交替 `lg:flex-row-reverse`、`lg:w-[320px]` 侧栏、3 统计格、查看案例详情按钮）。
8. 新增 `data/solutions/education.ts` 集中全部文案（hero/pains/capabilities/values/flowSteps 含 cubeColors/diagram/agents/cases）；新增 `public/images/solutions/education-hero.png` 与 `public/images/solutions/education/image-placeholder.svg`。需求文档中「可以配 Tags：」为编写指令，按指令以 tags 呈现；「严格参考…要求1:1还原」等排版指令不属于页面文案，未纳入。
9. 契约同步：新增 `tests/visual/site/solutions/education.contract.ts`（注册进 `tests/visual.spec.ts`）与 `scripts/harness/checks/solutions-education.mjs`（注册进 `scripts/harness-check.mjs`，源文件登记进 `scripts/harness/sources.mjs`）；`scripts/harness/required-files.mjs` 登记页面、5 个组件、数据文件与本任务文档。

---
## 验收结果
| 检查项 | 结果 |
|---|---|
| `pnpm lint` / `pnpm typecheck` | 通过 |
| `pnpm test` / `pnpm test:visual` | 通过 |
| `pnpm harness:engineering` | 通过 |
| SSR：`/services/smart-education` | 200，各 section 顺序渲染，Header 顶部白色 logo（解决方案页节奏） |

---
## 结论
智慧教育解决方案页面已按需求文档完成，Header 与 section 间距完全延续智能制造解决方案页节奏；section5「AI 原生教育」严格 1:1 复刻 EMQX Edge 立体方块步骤排版（Tailwind 任意属性 3D transform + violet/fuchsia/blue 色板 + 序号徽章 + tags），右侧严格按用户提供的 EMQX 760×500 绝对定位画布复刻（容器查询等比缩放、流动虚线、光晕、150px 中央立体方块内嵌智曜 logo、底部基础能力卡），并与左侧面板等高；教育智能体 3x3 网格通过共享组件可选 `subtitle`/`tags` 扩展实现（向后兼容）；未新增任何样式文件；契约与 Harness 检查已同步登记。
