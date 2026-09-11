# TASK-014.15：智能制造解决方案页面重构
---
* TaskName：智能制造解决方案页面重构
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/manufacturing.md` 重建 `/solutions/manufacturing` 专用页面：586 高首页 Hero 布局 + 行业痛点 2x2 + 解决方案（FlowFrame + 4 卡）+ DeepCtrls sc-card 核心功能区 + 3x3 优势区 + EMQX 1:1 案例区，全部 Tailwind CSS v4，不新建样式。
* TaskCreator：Olly
* TaskCreationTime：2026-09-11
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.15 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0 |
| 负责人  | Codex |

---
## 任务目标
将 `/solutions/manufacturing` 从通用 `SolutionPageTemplate` 生成页升级为需求文档定义的专用布局：
- Hero：高度 586，首页 Hero 布局（渐变标题 + 描述绝对定位），背景 `public/images/solutions/manufacturing-hero.png`（源自需求目录 manufacturing.png）。
- Section1 行业痛点：`ProductFeatureGridSection` BaseCard 2x2，大 ICON（56/48）。
- Section2 解决方案：`ProductSystemFlowFrame`（flow 暂不传入）+ `ProductFeatureGridSection` 4 卡。
- Section3 核心功能体系：新建 DeepCtrls `sc-card` 风格组件，抽屉动画（hover/focus 白层 181px→93px、内容上移 74px、描述淡入），图片占位符。
- Section4 为什么选择深度数智：无 eyebrow，`ProductFeatureGridSection` 3x3 共 9 项。
- Section5 客户案例：EMQX 案例卡 1:1 排版（交替左右 logo 栏、3 统计格、查看案例详情按钮），图片占位符。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/manufacturing.md`

---
## 实现内容
1. 新增 `pages/solutions/manufacturing.vue`（静态路由优先于 `[slug].vue`），组装全部 section 与 `CtaSection`。
2. 新增 `components/solution/manufacturing/ManufacturingHero.vue`：Tailwind 复刻首页 Hero 布局（h-[586px]、左侧暗色渐变、渐变标题 clamp 排版、移动端回落位）。
3. 新增 `components/solution/manufacturing/ManufacturingCapabilityCardsSection.vue`：`#f6f8fb` 背景区 + 4 张 295×367 卡片（xl 四列无间隙），抽屉/位移/淡入动画全部使用 Tailwind group-hover / group-focus-visible 变体，无 `<style>`。
4. 新增 `components/solution/manufacturing/ManufacturingCustomerCasesSection.vue`：`container pb-32 lg:pb-44` + `flex flex-col gap-11`，案例卡边框圆角、统计三格边框、`lg:w-[320px]` 侧栏与第二例 `lg:flex-row-reverse` 均 1:1 还原 EMQX 排版。
5. 新增 `data/solutions/manufacturing.ts` 集中全部文案与 lucide 图标；新增 `public/images/solutions/manufacturing-hero.png` 与 `public/images/solutions/manufacturing/image-placeholder.svg` 占位图。
6. 通用 `[slug].vue` 模板与 `data/solutions/use-cases.ts` 保持不动，其余解决方案路由不受影响。
7. 按 Review 反馈修复 Hero 首屏排版：标题恢复 DeepCtrls 首页式渐变文字，描述宽度放宽到 `760px` 并独立定位，`page-hero__actions` 独立定位为透明背景、白色字体、白色外边框与白色 SVG 箭头。
8. 按二次 Review 修复 Header 与制造页细节：Header 改为顶部透明、滚动/Mega/移动菜单白底；行业痛点标题使用 `header-width="wide"` 保持居中；Hero CTA 使用白色文字与白色 SVG；核心功能卡片恢复公共卡片圆角、边框与 hover，同时保留抽屉动画并让占位图 100% 铺满。

---
## 验收结果
| 检查项 | 结果 |
|---|---|
| `pnpm lint` / `pnpm typecheck` | 通过 |
| `pnpm test` / `pnpm test:visual` | 通过 |
| `pnpm harness:engineering` | 通过 |
| SSR：`/solutions/manufacturing` | 200，六个 section 顺序渲染 |

---
## 结论
智能制造解决方案页面已按需求文档完成专用布局重构；Hero 标题、描述与透明描边 CTA 已完成 Review 修复，Header 顶部透明状态、行业痛点标题居中与核心功能卡片公共样式已同步修正，sc-card 抽屉动画与 EMQX 案例排版均以纯 Tailwind CSS v4 还原，未新增任何样式文件；契约与 Harness 检查已同步登记。
