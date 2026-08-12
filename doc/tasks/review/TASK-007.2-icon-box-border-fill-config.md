# TASK-007.2：IconBox 通用组件支持尺寸/边框/背景动态配置
---
* TaskName：IconBox 通用组件支持尺寸/边框/背景动态配置
* TaskDescription：将博曜产品页「挑战」板块的 icon 外框样式（圆角、背景、尺寸、边框）在公共组件 `IconBox` 中完成可配置化封装：引用处可动态配置尺寸（`size` / `iconSize`）、有无边框（`bordered`）、以及有无背景色（`filled`），并通过 `FeatureCard`、`ProductFeatureGridSection` 逐层透传，保持现有调用方零视觉变化。
* TaskCreator：Claude
* TaskCreationTime：2026-08-12
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-007.2 |
| Epic | EPIC-007 |
| 状态   | Review   |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. 「挑战」板块 icon 外框（`.dt-icon-box` + `.dt-icon-box--gradient`：40px 盒、`--dt-icon-box-radius` 圆角、渐变背景、1px 内描边）已经由公共组件 `components/common/card/IconBox.vue` 承载；本任务将其边框与背景封装为可配置项，不新建重复组件（遵守 `COMMON_SECTION_COMPONENTS.md`：IconBox 统一 icon 外框，业务组件不得重新定义）。
2. `IconBox` 新增 `bordered`（有无边框，默认 `true`）与 `filled`（有无背景色，默认 `true`）props，通过覆盖全局 `--dt-icon-box-shadow` / `--dt-icon-box-bg` 变量实现，兼容 `primary` / `muted` / `white` / `gradient` 全部 tone。
3. 尺寸沿用既有 `size`（40/48/56）与 `iconSize`（20/24/28/48）props，并补齐 `FeatureCard` → `ProductFeatureGridSection` 的透传，使挑战/功能板块引用处可直接配置。
4. 所有现有调用方（DGP/DLP/DDP/DMS/Why/Home/博曜）默认值下保持零视觉变化。
5. 不新增页面级样式；圆角继续统一取自 `--dt-icon-box-radius`，不做逐组件圆角配置。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`

---
## 实现内容
1. `components/common/card/IconBox.vue`：新增 `bordered` / `filled` props（默认均为 `true`），新增 scoped 修饰类 `icon-box--borderless`（`--dt-icon-box-shadow: none`）与 `icon-box--unfilled`（`--dt-icon-box-bg: transparent`）。实现方式为覆盖全局 `.dt-icon-box` 已暴露的 CSS 变量钩子，不使用 inline style，兼容四种 tone（含 `white` tone 的 `--dt-color-line` 描边与 `gradient` tone 的渐变背景）。
2. `components/common/card/FeatureCard.vue`：新增 `iconBordered` / `iconFilled` props（默认 `true`）并透传 `IconBox`。
3. `components/common/ProductFeatureGridSection.vue`：新增 `iconBoxSize` / `iconSize` / `iconBordered` / `iconFilled` props（默认 40/20/true/true）并透传 `FeatureCard`，挑战/功能板块引用处可直接配置尺寸、边框与背景。
4. `tests/visual.spec.ts`：新增 `exposes configurable icon box size, border, and fill through the feature grid` 契约断言。
5. `scripts/harness-check.mjs`：补充 IconBox 边框/背景可配置及透传链断言。
6. `doc/engineering/COMMON_SECTION_COMPONENTS.md`：Card Primitives 使用要求补充 IconBox 可配置说明。

### 引用示例
```html
<!-- 挑战板块默认样式：带边框 + 渐变背景（与现网一致，可省略全部配置项） -->
<ProductFeatureGridSection eyebrow="挑战" ... :items="boyaoChallenges" />

<!-- 动态配置：更大尺寸、无边框 -->
<ProductFeatureGridSection ... :icon-box-size="48" :icon-size="24" :icon-bordered="false" />

<!-- 带边框但无背景色 -->
<ProductFeatureGridSection ... :icon-filled="false" />

<!-- 直接使用 IconBox -->
<IconBox :icon="Inbox" :size="56" :icon-size="28" tone="gradient" :bordered="true" :filled="false" />
```

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常（纯 props 扩展，无布局变化）
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/card/IconBox.vue` | 新增 bordered / filled 配置与 borderless / unfilled 修饰类 |
| `components/common/card/FeatureCard.vue` | 透传 iconBordered / iconFilled |
| `components/common/ProductFeatureGridSection.vue` | 透传 iconBoxSize / iconSize / iconBordered / iconFilled |
| `tests/visual.spec.ts` | 新增可配置契约断言 |
| `scripts/harness-check.mjs` | 新增 IconBox 可配置断言 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 更新 IconBox 使用说明 |
| `doc/tasks/review/TASK-007.2-icon-box-border-fill-config.md` | 任务文档（由 in-progress/ 移入） |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | ✅ 通过 |
| `pnpm typecheck` | ✅ 通过 |
| `pnpm test` | ✅ 8 个文件 42/42 通过 |
| `pnpm test:visual` | ✅ 10/10 通过 |
| `pnpm harness:engineering` | ✅ 通过 |
| `pnpm build` | ✅ 构建成功（产物 CSS 已输出 `icon-box--borderless` / `icon-box--unfilled` 规则） |

---
## 既有在途修改处理
任务开始前工作区已存在 `components/product/boyao/BoyaoHeroVisual.vue` 的文案修改（Hero 中央胶囊「博曜·企业级知识管理平台」→「博曜」），与本任务无关，未纳入提交。另有任务前已存在的未跟踪文件与本任务无关，未纳入提交：`components/common/AgentComposer.vue`、`doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/icon——logo.svg`、`doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/imgs/`。

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-007.2): make icon box border and fill configurable |
| Commit Hash    |  |

## 完成说明
已将「挑战」板块 icon 外框的边框与背景封装为公共 `IconBox` 的可配置能力：`bordered` 控制 1px 内边框、`filled` 控制背景色（两者默认 true，可自由组合，满足「带边框无背景」等诉求），尺寸沿用 `size` / `iconSize`；配置经 `FeatureCard`（`iconBordered` / `iconFilled`）与 `ProductFeatureGridSection`（另含 `iconBoxSize` / `iconSize`）逐层透传，挑战/功能板块引用处可直接动态配置。圆角继续统一取自 `--dt-icon-box-radius`，未新建重复组件。所有现有调用方默认值下零视觉变化；契约测试、harness 与全部质量门通过。
