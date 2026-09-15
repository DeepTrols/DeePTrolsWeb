# TASK-014.19：FDE 解决方案页面
---
* TaskName：FDE 解决方案页面
* TaskDescription：根据 `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/fde.md` 完成 FDE 解决方案页面，重点实现 section2 价值演进与 section7 应用场景横向滑动卡片。
* TaskCreator：Olly
* TaskCreationTime：2026-09-14
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.19 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
严格按照 `fde.md` 完成 FDE 解决方案页面，复用现有公共组件与 Tailwind CSS v4 样式体系，不发散、不自造新的视觉规范。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/NAVIGATION.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/fde.md`

---
## 实现内容
1. 新增 FDE 解决方案页面入口，覆盖导航中的 FDE 方案访问路径。
2. 迁移 Hero 视频素材到运行时资源目录，避免页面直接引用 `doc/product/**/imgs` 或需求目录。
3. 实现全屏视频 Hero，居中展示需求标题与副标题。
4. 实现 section1 行业痛点，复用 `ProductFeatureGridSection`。
5. 重点实现 section2「FDE 的价值演进」，按需求构建三段交替图文与动画。
6. 实现 section3 / section4 / section5 / section6 / section8 / section9，并复用公共组件。
7. 重点实现 section7「应用场景」，复用 `CarouselRoot` 与 `CarouselControls` 实现 6 张横向滑动卡片。
8. 补充内容测试、视觉契约与 Harness Engineering 检查。

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

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/fde.md` | FDE 解决方案需求文档 |
| `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/hero-bg.mp4` | FDE Hero 源视频素材 |
| `public/images/solutions/fde/hero-bg.mp4` | 运行时 Hero 视频素材 |
| `public/images/solutions/fde/image-placeholder.svg` | FDE 能力卡与案例占位图 |
| `data/solutions/fde.ts` | FDE 页面集中内容数据 |
| `pages/services/enterprise-ai-delivery.vue` | FDE 解决方案主路由 |
| `pages/solutions/fde.vue` | FDE 解决方案别名路由 |
| `components/solution/fde/FdePageContent.vue` | FDE 页面 section 组装 |
| `components/solution/fde/FdeHero.vue` | 全屏视频 Hero |
| `components/solution/fde/FdeEvolutionSection.vue` | section2 FDE 价值演进交替布局 |
| `components/solution/fde/FdeEvolutionVisual.vue` | section2 三段动画视觉分发器 |
| `components/solution/fde/FdeEvolutionCube.vue` | section2 等距立方体（纯 Tailwind 3D） |
| `components/solution/fde/FdeEvolutionPrototypeVisual.vue` | section2 卡片1 双立方体粒子动画（EMQX 1:1） |
| `components/solution/fde/FdeEvolutionProductionVisual.vue` | section2 卡片2 数据流动画（EMQX 1:1） |
| `components/solution/fde/FdeEvolutionScaleVisual.vue` | section2 卡片3 AI Hub 辐射动画（EMQX 1:1） |
| `components/solution/fde/FdeCapabilityCardsSection.vue` | section5 核心能力抽屉卡片 |
| `components/solution/fde/FdeValueSection.vue` | section6 核心价值（复用智慧教育 BaseCard 布局） |
| `components/solution/fde/FdeUseCasesSection.vue` | section7 应用场景轮播 |
| `components/solution/fde/FdeCustomerCasesSection.vue` | FDE 客户案例 |
| `tests/fde-content.spec.ts` | FDE 内容契约 |
| `tests/visual/site/solutions/fde.contract.ts` | FDE 视觉契约 |
| `tests/visual.spec.ts` | 注册 FDE 视觉契约 |
| `scripts/harness/checks/solutions-fde.mjs` | FDE Harness Engineering 检查 |
| `scripts/harness-check.mjs` | 注册 FDE Harness 检查 |
| `scripts/harness/sources.mjs` | 登记 FDE Harness 源文件 |
| `scripts/harness/required-files.mjs` | 登记 FDE 必需文件 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-014.19): implement FDE solution page |
| Commit Hash    | 待提交后生成 |

## 完成说明
已按 `fde.md` 完成 FDE 解决方案页面：
- Hero 使用迁移到 `public/images/solutions/fde/hero-bg.mp4` 的全屏视频背景，标题与副标题居中展示。
- section2「FDE 的价值演进」按文档要求实现三段交替图文结构；三段视觉 1:1 复刻 EMQX 参考实现（等距立方体、粒子路径、胶囊指标全部对齐参考标记），仅通过 Tailwind CSS v4 任意值类与 SVG SMIL 动画实现，无任何新建样式。
- section1 / section3 / section6 副标题使用 `fde.md` 需求原文。
- section7「应用场景」复用 `CarouselRoot` 与 `CarouselControls`，实现 6 个横向滑动应用场景卡片，卡片样式对齐 EMQX automotive 参考（bg-muted 卡片、hover 主色描边与覆盖层、右上角箭头）。
- 其余痛点、解决方案、工作模式、核心能力、核心价值、交付流程、客户案例与 CTA 均复用现有公共组件和 Tailwind CSS v4 样式体系。
- 已补充内容测试、视觉契约与 Harness Engineering 检查，避免后续偏离页面要求。

Review 修改记录：
- Hero：H1 改为「DeepTrols FDE」，副标题改为 h3「深入业务现场，让AI从概念验证走向生产价值」；移除 `pt-[var(--dt-header-height)]` 与 `whitespace-nowrap`，文案实现真正的横竖居中。
- section2 卡片2：顶部胶囊去掉「Production Workload → 」，仅保留「生产业务请求」。
- section3 解决方案：ProductFeatureGridSection 由 2X2 改为 1 行 4 个（`columns="four"`）。
- section6 核心价值：新增 `FdeValueSection.vue`，与智慧教育解决方案页核心价值完全一致（SectionShell + CardGrid two + BaseCard product/accent + IconBox + 标签胶囊）。
- section7 应用场景：hover 覆盖层由实色 `bg-dt-primary-soft`（遮挡文字）改为半透明 `bg-[image:var(--dt-gradient-hero)]`，对齐 EMQX automotive 参考效果。
- section9 案例：重写为与智慧教育解决方案页案例完全一致的布局（rounded-lg 边框卡 + 渐变数字统计条 + 320px 占位图侧栏）。
- Hero：H1 文案改为「DeepTrols FDE解决方案」；副标题由 h3 升级为 h2，字体大小改为全站 H2 标准（SectionHeader title-section 的 35px），fde.md 需求文档与内容/视觉/Harness 锁同步更新。
- 2026-09-15：导航数据新增 `activePaths`，使 `/services/enterprise-ai-delivery` 与 `/solutions/fde` 停留时主导航「解决方案」和 Mega 对应链接保持 active 状态。
