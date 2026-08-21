# DeepTrols Web 项目审计报告
> Date: 2026-08-21  
> Scope: 当前本地工作区 `main`，包含未提交 Device Agent 相关改动  
> Focus: 代码规范、重复组件、冗余精简、可组件化机会

---

## 结论摘要

项目整体工程底座已经成型：Nuxt 4、Tailwind CSS v4、SCSS token、公共 Section/Card/Tabs/Carousel/Hero/CTA 组件均已存在，且当前质量门禁通过。当前主要问题不在“无法运行”，而在长期维护成本开始上升：

1. 组件数量增长快，视觉类组件和产品页区块存在重复模式。
2. `tests/visual.spec.ts` 与 `scripts/harness-check.mjs` 已经膨胀成单文件巨石。
3. 多个 Vue 组件接近 300 行上限，后续继续改动容易越界。
4. 存在空 `<style>`、疑似未引用组件、文档资产与运行资产混放等冗余。
5. Device Agent runtime 面板一类复杂动画区块仍有固定高度和局部视觉实现，组件化边界还可以继续收紧。

当前没有发现 P0 级阻断问题；建议优先处理 P1/P2 维护性问题。

---

## 当前工作区状态

审计时工作区存在未提交改动，主要集中在 Device Agent runtime 重构：

```text
M assets/css/tailwind.css
M components/product/device-agent/DeviceAgentRuntimeSection.vue
M components/product/device-agent/runtime/RuntimeContextPanel.vue
M components/product/device-agent/runtime/RuntimeGuardrailsPanel.vue
M components/product/device-agent/runtime/RuntimeSkillsPanel.vue
M components/product/device-agent/runtime/RuntimeToolsPanel.vue
M data/device-agent.ts
M scripts/harness-check.mjs
M tests/visual.spec.ts
?? components/product/device-agent/runtime/RuntimeContextSnapshot.vue
?? components/product/device-agent/runtime/RuntimeGuardrailsSequence.vue
?? components/product/device-agent/runtime/RuntimeToolsGraph.vue
?? components/product/device-agent/runtime/RuntimeToolsHex.vue
?? components/product/device-agent/runtime/useGuardrailsTimeline.ts
?? doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/image*.png
?? doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/mcp_dev.md
?? doc/tasks/review/TASK-008.16...TASK-008.20...
```

本报告只新增审计文档，不修改上述业务代码。

---

## 校验结果

| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm harness:engineering` | 通过 |
| `pnpm test:visual` | 通过，27 tests |
| `pnpm test` | 通过，10 files / 75 tests |
| `pnpm build` | 通过，有 `[PLUGIN_TIMINGS]` warning |

构建输出观察：

- 总产物约 `4.37 MB`，gzip 约 `1.01 MB`。
- 最大页面 SSR chunk：`device-agent-*.mjs` 约 `130 kB`，source map 约 `71 kB`。
- `entry.*.css` 约 `114 kB`，需关注 Tailwind utility 增长。
- 多个知识库兼容性 SVG logo 被打入构建，单个 SVG 原始体积较大，例如 `数曜logo`、`博曜logo`、`麒麟系列logo` 等。

---

## 代码规模问题

### P1：多个 Vue 组件接近 300 行上限

项目规则建议组件小于 300 行。当前没有超过 300 行的 Vue 组件，但已有多个组件处在危险区间：

| 行数 | 文件 |
|----:|----|
| 299 | `components/navigation/SiteHeader.vue` |
| 288 | `components/home/HomeEcosystemVisual.vue` |
| 284 | `components/product/boyao/BoyaoHeroVisual.vue` |
| 284 | `components/product/dgp/DgpHeroVisual.vue` |
| 280 | `components/product/device-agent/runtime/RuntimeGuardrailsPanel.vue` |
| 279 | `components/common/PageHero.vue` |
| 279 | `components/home/HomeInsights.vue` |
| 277 | `components/home/HomeDeliverables.vue` |
| 273 | `components/home/HomeCases.vue` |
| 271 | `components/product/device-agent/runtime/RuntimeContextPanel.vue` |
| 271 | `components/product/tanyao/TanyaoHeroVisual.vue` |
| 270 | `components/navigation/MegaMenuPanel.vue` |
| 267 | `components/product/dms/DmsHeroVisual.vue` |

影响：

- 后续需求迭代很容易突破 Harness 的 300 行约束。
- 复杂动画/视觉/交互逻辑混在一个 SFC 中，review 成本高。
- 接近上限的组件更容易出现“为了不超行数而硬压代码”的反向问题。

建议：

- `SiteHeader.vue`：继续拆分 sticky/mega-menu 状态管理为 composable，例如 `useMegaMenuState.ts`。
- `PageHero.vue`：把背景、badge、title/actions 拆成内部小组件，保留公共 API 不变。
- `HomeCases` / `HomeDeliverables` / `HomeInsights`：将数据切换逻辑、卡片 item、媒体 panel 进一步独立。
- 各产品 `*HeroVisual.vue`：优先抽象公共视觉 shell，而不是继续复制整套 panel。

### P1：测试与 Harness 脚本膨胀

| 行数 | 文件 |
|----:|----|
| 2022 | `tests/visual.spec.ts` |
| 1899 | `scripts/harness-check.mjs` |

影响：

- 新增页面时只能继续往巨型文件里塞断言。
- 失败定位成本上升，单个测试文件含多个页面/组件契约。
- Harness 逻辑难以复用或按模块演进。

建议拆分：

- `tests/visual/home.spec.ts`
- `tests/visual/product-data.spec.ts`
- `tests/visual/product-aiiot.spec.ts`
- `tests/visual/common-components.spec.ts`
- `scripts/harness/readers.mjs`
- `scripts/harness/check-common.mjs`
- `scripts/harness/check-home.mjs`
- `scripts/harness/check-products.mjs`
- `scripts/harness/check-style-rules.mjs`

---

## 重复组件与重复实现

### P1：产品 HeroVisual 重复度高

当前产品视觉组件较多：

```text
components/product/boyao/BoyaoHeroVisual.vue
components/product/ddp/DdpHeroVisual.vue
components/product/device-agent/DeviceAgentHeroVisual.vue
components/product/dgp/DgpHeroVisual.vue
components/product/dlp/DlpHeroVisual.vue
components/product/dms/DmsHeroVisual.vue
components/product/tanyao/TanyaoHeroVisual.vue
components/why/WhyHeroVisual.vue
```

重复模式：

- 深色外壳、弱边框、glow、面板头部。
- 终端/SQL/日志/表格/流程节点。
- 轮播式打字或阶段动画。
- `setTimeout` / `setInterval` 定时器清理逻辑。

建议抽象：

| 公共组件/Composable | 用途 |
|----|----|
| `HeroVisualShell.vue` | 统一外框、glow、padding、视觉尺寸 |
| `VisualPanel.vue` | 面板标题栏、border、background |
| `TerminalFrame.vue` | 终端/日志/SQL 展示 |
| `DataTableFrame.vue` | 表格/标签结果/指标列表 |
| `MetricBadge.vue` | 小型状态数字、pill、badge |
| `useAnimationTimers.ts` | 统一 timer 注册、清理、reduced-motion 处理 |

注意：不要把所有视觉做成万能 props 组件。建议保留产品视觉业务组件，但内部复用 primitives。

### P1：产品架构区块重复

重复文件：

```text
components/product/ddp/DdpArchitecture.vue
components/product/dgp/DgpArchitecture.vue
components/product/dlp/DlpArchitecture.vue
components/product/dms/DmsArchitecture.vue
components/product/tanyao/TanyaoSolutionSection.vue
components/product/boyao/BoyaoArchitectureSection.vue
components/product/boyao/BoyaoIntegrationSection.vue
components/product/device-agent/DeviceAgentArchitectureSection.vue
```

共同结构：

```text
ProductSystemSection
  ProductSystemFlowFrame
```

建议新增：

```text
components/common/ProductArchitectureSection.vue
```

接口建议：

```ts
interface ProductArchitectureSectionProps {
  eyebrow: string
  title: string
  titleId: string
  subtitle: string
  label: string
  fallbackText: string
  contentFlush?: boolean
}
```

有真实流程图时通过默认 slot 覆盖；只有占位时直接由公共组件处理。

### P2：业务价值/Value Card 可继续统一

当前已有 `components/common/card/ValueCard.vue`，但产品页业务价值类区块仍可能出现单独实现。

建议新增：

```text
components/common/ValueGridSection.vue
```

用于：

- DMS「业务价值」
- Boyao 核心价值的非定制卡片
- 后续所有 `metric + title + desc` 价值区块

保留 `ValueCard` 作为单卡 primitive，`ValueGridSection` 负责 section/header/grid。

### P2：Device Agent runtime 面板可继续组件化

当前 runtime 目录已经开始拆：

```text
RuntimePanelShell.vue
RuntimeContextPanel.vue
RuntimeContextSnapshot.vue
RuntimeToolsPanel.vue
RuntimeToolsGraph.vue
RuntimeToolsHex.vue
RuntimeSkillsPanel.vue
RuntimeGuardrailsPanel.vue
RuntimeGuardrailsSequence.vue
RuntimeTracePanel.vue
```

仍可抽象的重复点：

- Runtime 小型状态 pill。
- Runtime card row / item row。
- Runtime 进度条。
- Runtime 节点连线/graph node。
- Runtime panel 内部 header 的 badge/dot/mono label。

建议新增：

```text
components/product/device-agent/runtime/primitives/RuntimeStatusPill.vue
components/product/device-agent/runtime/primitives/RuntimeProgressBar.vue
components/product/device-agent/runtime/primitives/RuntimeNodeCard.vue
components/product/device-agent/runtime/primitives/RuntimeMetricRow.vue
```

---

## 项目冗余与可精简点

### P1：疑似未使用组件 `AgentComposer.vue`

`components/common/AgentComposer.vue` 没有任何显式引用。历史任务文档也多次记录它是“任务前已有未跟踪文件”。

证据：

```text
components/common/AgentComposer.vue
```

影响：

- 公共组件目录中存在未接入能力，会误导后续页面复用。
- 如果不是实验组件，应移出正式组件树。

建议：

- 若未来 Device Agent 需要它：补齐接入页面与视觉契约测试。
- 若只是实验代码：移动到 `doc/experiments/` 或删除。

### P2：空 `<style scoped lang="scss"></style>` 冗余

以下文件存在空 style block：

```text
components/why/WhyTrustTabs.vue
components/why/WhyEngine.vue
components/why/WhyHeroLogos.vue
components/why/WhyServiceReset.vue
components/home/HomeCta.vue
components/home/ecosystem-visuals/EcosystemReportVisual.vue
components/home/ecosystem-visuals/EcosystemTokenVisual.vue
components/home/ecosystem-visuals/EcosystemInfraVisual.vue
components/home/ecosystem-visuals/EcosystemAgentVisual.vue
```

建议：

- 直接删除空 style block。
- Harness 可增加“禁止空 style block”检查。

### P2：文档资产与运行资产混放

现状：

- `doc/product/PAGE_REQUIREMENTS/**/imgs` 中有运行时会被导入的素材。
- `public/images/**` 中也有部分相同或同源素材。
- 构建产物显示多个大 SVG logo 被打入 client assets。

影响：

- `doc/` 既是需求文档目录又承担运行资产来源，边界不清。
- 后续迁移文档、生成站点或清理需求文件时容易误删运行资产。
- 大 SVG 直接打包，首屏/路由资源体积可能变大。

建议：

- 运行资产统一进入 `assets/` 或 `public/images/`。
- `doc/product/PAGE_REQUIREMENTS/**/imgs` 只保留需求引用图。
- 对大 SVG 做 SVGO 压缩，必要时转为静态 public URL。
- 建立 `doc/engineering/ASSET_POLICY.md`。

### P2：本地生成目录存在，会干扰扫描

当前工作区存在：

```text
.output
.nuxt
node_modules/.cache
```

这些目录已被 `.gitignore` 忽略，未被 Git 跟踪，但会影响手动搜索、磁盘和审计脚本速度。

建议：

- 常规审计脚本默认排除 `.output`、`.nuxt`、`node_modules`。
- 如需干净审计，可先执行 `pnpm clean`。当前项目没有 clean 脚本，建议增加：

```json
"clean": "rm -rf .nuxt .output node_modules/.cache"
```

如需跨平台可使用 Node 脚本代替 `rm -rf`。

---

## 代码规范问题

### P1：固定高度仍在复杂 runtime 区块中出现

典型示例：

```text
components/product/device-agent/runtime/RuntimePanelShell.vue
class="... h-[530px] ... xl:h-[480px]"
```

影响：

- 与 HOME 基准中“普通信息卡不得固定高度”的方向存在张力。
- 小屏、内容增减、字体缩放时容易遮挡或溢出。

建议：

- 如果是视觉演示面板，应在组件文档中声明“演示画布固定高度例外”。
- 否则改为 `min-h` + container query / `aspect-ratio` + 内部滚动。
- Runtime 子面板统一接收 `density` / `heightMode`，避免每个 panel 自己猜高度。

### P2：动画 timer 分散

存在多个局部 timer/composable：

```text
components/why/useWhyHeroAnimation.ts
components/product/ddp/useDdpHeroAnimation.ts
components/product/dlp/useDlpHeroAnimation.ts
components/product/dms/useDmsHeroAnimation.ts
components/product/device-agent/DeviceAgentHeroVisual.vue
components/product/dgp/DgpHeroVisual.vue
```

建议：

- 抽 `useAnimationTimers`，统一注册/清理 `setTimeout`、`setInterval`。
- 内置 `prefers-reduced-motion` 处理。
- 统一 pause/resume API，便于 tab 隐藏或组件卸载时暂停动画。

### P2：Tailwind 语义 utility 与颜色 token 需要持续约束

当前项目已使用 Tailwind v4 `@theme inline` 和 `@utility`。需要注意：

- `@utility bg-muted` 不支持 `/50` 透明度修饰，已有文档提醒应使用 `bg-dt-bg-soft/50`。
- `bg-default`、`text-default` 等语义类不能再次混为同一个 color alias，否则会出现背景色变文字色的问题。

建议：

- Harness 中保留对 `bg-default` / `text-default` 编译语义的检查。
- 新页面优先使用 `dt-*` token，避免直接写任意 `bg-[var(...)]`。

---

## 可组件化清单

按优先级建议如下：

| 优先级 | 建议组件/模块 | 覆盖范围 |
|----|----|----|
| P1 | `ProductArchitectureSection.vue` | DGP/DLP/DDP/DMS/Tanyao/Boyao/DeviceAgent 架构占位区 |
| P1 | `HeroVisualShell.vue` + `VisualPanel.vue` | 所有产品 HeroVisual |
| P1 | `useAnimationTimers.ts` | Why/DGP/DLP/DDP/DMS/DeviceAgent 动画 |
| P1 | 拆分 `tests/visual.spec.ts` | 全站视觉契约测试 |
| P1 | 拆分 `scripts/harness-check.mjs` | Harness Engineering |
| P2 | `ValueGridSection.vue` | 业务价值、可量化价值、核心价值 |
| P2 | Runtime primitives | Device Agent runtime panel |
| P2 | `AssetPolicy` + asset migration | doc/public/assets 边界 |
| P3 | 删除空 style block | 9 个文件 |
| P3 | 清理/接入 `AgentComposer.vue` | 疑似未使用组件 |

---

## 建议任务拆分

### TASK-AUDIT-001：拆分测试与 Harness

目标：

- 将 `tests/visual.spec.ts` 按页面/公共组件拆分。
- 将 `scripts/harness-check.mjs` 拆为多个模块。
- 保持 `pnpm test:visual` 与 `pnpm harness:engineering` 命令不变。

收益：

- 降低后续新增页面时的测试维护成本。
- 更容易定位失败来源。

### TASK-AUDIT-002：抽象产品架构区块

目标：

- 新增 `ProductArchitectureSection.vue`。
- 迁移 DGP/DLP/DDP/DMS/Tanyao/Boyao/DeviceAgent 中结构一致的架构区块。

收益：

- 减少重复 section/header/flow-frame 组合。
- 避免后续架构区间距、标题、fallback 样式不一致。

### TASK-AUDIT-003：Hero Visual primitives

目标：

- 新增 `HeroVisualShell`、`VisualPanel`、`MetricBadge`、`TerminalFrame`。
- 先迁移 DDP/DLP/DMS 三个最相近的数据类产品 HeroVisual。

收益：

- 降低视觉组件行数。
- 统一 panel border、bg、radius、glow、motion。

### TASK-AUDIT-004：Runtime primitives

目标：

- 抽象 Device Agent runtime 面板中的 status/progress/node/metric row。
- 逐步消除 runtime 目录中重复 Tailwind 字符串。

收益：

- 降低 runtime panel 后续微调成本。
- 固定高度与响应式策略可以集中管理。

### TASK-AUDIT-005：资产边界清理

目标：

- 明确 `doc/` 只存需求素材，运行素材移到 `assets/` 或 `public/`。
- 压缩大 SVG。
- 增加资产策略文档。

收益：

- 减少 bundle 风险。
- 降低需求文档目录与运行代码耦合。

---

## 审计判定

当前项目可继续开发，但建议先安排一轮维护性重构，优先处理：

1. 拆分巨型测试与 Harness。
2. 抽象产品架构区块。
3. 抽象 HeroVisual primitives。
4. 清理空 style 与疑似未使用组件。
5. 建立资产边界。

这几项完成后，后续新增产品页会更稳定，也更不容易再次出现“同一类区块每个页面细节不同”的问题。
