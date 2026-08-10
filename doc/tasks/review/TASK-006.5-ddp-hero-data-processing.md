# TASK-006.5：数曜·数据开发平台 Hero 视觉（Hero.md）
---
* TaskName：DDP Hero data-processing 视觉
* TaskDescription：根据 `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODDP/Hero.md`，将 `/products/data-development` Hero 右侧占位视觉替换为 EMQX data-processing 页（https://www.emqx.com/zh/features/data-processing）Hero 右侧组件的 1:1 内容适配：Tab「规则引擎→SQL 开发」「Flow 编排器→可视化编排」，SQL 替换为 dws_user_order_summary 汇总脚本，Flow 五节点替换为数仓分层节点，协议图标替换为数据表/数仓类 Lucide 图标；样式、布局、节点位置、连线、动画与交互逻辑保持不变。
* TaskCreator：Codex
* TaskCreationTime：2026-08-10
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-006.5 |
| Epic | EPIC-006 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 严格复刻 EMQX data-processing 页 Hero 右侧 `HeroVisual` 组件，不允许自行创作、不允许新建样式（仅 Tailwind CSS v4）。
2. Tab 文案：规则引擎 → SQL 开发；Flow 编排器 → 可视化编排。
3. SQL 内容替换为 Hero.md 指定的 `INSERT OVERWRITE TABLE dws_user_order_summary` 脚本。
4. Flow 节点替换：MQTT Messages/factory/+/status → DWD Detail/dwd_order_detail；Filter & Transform/temp > 45 → Data Transform/join · aggregate；Kafka/alerts topic → DIM Join/dim_user_info；PostgreSQL/events table → DWS Summary/dws_user_order_summary；MQTT Publish/alerts/critical → ADS Application/ads_user_value。
5. MQTT/Kafka/PostgreSQL 图标替换为数据表/数仓类 Lucide 图标，其余不变。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`、`doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODDP/DDP.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODDP/Hero.md`
- `doc/tasks/review/TASK-006.3-ddp-product-page.md`

---
## 原组件提取结论（实现依据）
从原站 SSR HTML、`data-processing.DIyQTyh-.css` 与 `IGFKgOkR.js`（`FeaturesDataProcessingHeroVisual` / `HeroVisual` / `Node`）逐行提取：

- 外层：`relative` + `pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/15 blur-2xl` 光晕 + `relative overflow-hidden rounded-2xl border border-muted bg-default shadow-2xl` 卡片；卡片 `mouseenter/mouseleave` 暂停/恢复自动轮播。
- 窗口栏：`flex items-center border-b border-muted px-4 py-3` + 三颗 `size-3 rounded-full bg-red/yellow/green-500/70`。
- Tab 栏：`flex border-b border-muted`；按钮基类 `flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors`，激活 `border-b-2 border-primary text-highlighted`，非激活 `text-muted hover:text-highlighted`；图标 `size-4`：sql 为 `lucide:code-2`，flow 为 `lucide:workflow`。
- 内容区：`relative h-[320px]`，两个 `absolute inset-0 transition-opacity duration-300` 面板按 tab 切换（非激活 `pointer-events-none opacity-0`）。
- SQL 面板：`relative h-full p-4`；行号列 `absolute left-4 top-4 flex flex-col font-mono text-xs text-muted/50`，每行 `h-6 leading-6 transition-opacity duration-300`，已显 `opacity 1` 未显 `0.3`；代码列 `ml-8 font-mono text-sm leading-6`，每行 `whitespace-pre transition-all duration-300`，`padding-left: indent*12px`，未显 `opacity 0 translateY(8px)`；光标 `absolute ml-8 h-5 w-0.5 animate-pulse bg-primary`，`top: 16 + revealed*24 px; left: 32px`，仅在 `tab=sql && revealed < lines` 时渲染。
- 时序：行间隔 `300ms`；自动轮播 `5000ms`（sql → flow → sql 且重置行计数）；挂载即启动；hover 暂停。
- 词法配色：keyword `text-primary`；variable/property/alias `text-blue-500 dark:text-blue-400`；string `text-emerald-600 dark:text-emerald-400`；operator/punctuation `text-muted`；number `text-amber-600 dark:text-amber-400`。
- Flow 面板：`@vue-flow/core`，props：`nodes-draggable/nodes-connectable/elements-selectable/zoom-on-scroll/zoom-on-pinch/pan-on-scroll/pan-on-drag/zoom-on-double-click` 全 false，`prevent-scrolling` true，`fit-view-on-init`，`fit-view-options {padding:.15, maxZoom:1}`，挂载 100ms 后 `fitView({padding:.2})`；`default-edge-options {type:'default', style:{strokeWidth:1.5, stroke:'rgba(148, 163, 184, 0.7)'}}`；Background `:gap="20" :size="1"`；SSR 不渲染（客户端挂载）。
- 节点位置：src(0,90)、filter(280,90)、sink-kafka(560,0)、sink-pg(560,90)、sink-mqtt(560,180)；边：src→filter、filter→三 sink。
- 节点卡片：`flow-node relative flex min-w-[190px] flex-col gap-1 rounded-lg border bg-default px-4 py-3 shadow-sm transition-all duration-200 border-muted/60 hover:border-muted`；左侧 `absolute inset-y-0 left-0 w-2 rounded-l-xl` tone 色条（source `bg-emerald-500`、filter `bg-indigo-500`、sink `bg-purple-500`）；图标 `size-5 text-highlighted`；标题 `text-sm font-semibold text-highlighted`；副标题 `text-xs text-muted`；非 source 有左 target Handle、非 sink 有右 source Handle，handle 样式 12px 圆点（`bg 文本 muted + 2px border 背景色`）。

---
## 内容替换映射
| 原内容 | 替换为 | 图标 |
|----|----|----|
| Tab 规则引擎 | SQL 开发 | 保持 `Code2` |
| Tab Flow 编排器 | 可视化编排 | 保持 `Workflow` |
| 节点 MQTT Messages / factory/+/status | DWD Detail / dwd_order_detail | `MessageSquare` → `Table2` |
| 节点 Filter & Transform / temp > 45 | Data Transform / join · aggregate | 保持 `Filter` |
| 节点 Kafka / alerts topic | DIM Join / dim_user_info | `apachekafka` → `Table` |
| 节点 PostgreSQL / events table | DWS Summary / dws_user_order_summary | `postgresql` → `Database` |
| 节点 MQTT Publish / alerts/critical | ADS Application / ads_user_value | `mqtt` → `Warehouse` |

---
## 实现内容
1. `DdpHeroVisual.vue`：1:1 复刻 EMQX data-processing HeroVisual 窗口卡片（光晕、窗口栏、Tab 栏、双面板淡入切换、hover 暂停轮播）；SQL 面板按行号列 + 词法着色代码列 + 脉冲光标逐行显示；Flow 面板客户端挂载。
2. `ddpHeroSql.ts`：Hero.md 指定的 14 行数仓汇总 SQL 行/词法结构（indent、token 类型），保留原组件词法配色与光标 top 序列（`top = 16 + revealed * 24`）。
3. `useDdpHeroAnimation.ts`：原组件时序状态机（行显示 300ms、Tab 轮播 5000ms、sql→flow→sql 重置行计数、hover 仅暂停轮播）。
4. `DdpFlowCanvas.client.vue`：`@vue-flow/core` + `@vue-flow/background`，节点位置/连线/边样式逐字保留，内容替换为数仓分层节点；`ClientOnly` 包裹保证 SSR 不渲染 vue-flow。
5. `DdpFlowNode.vue`：原组件节点卡片（tone 色条、图标、标题/副标题、12px Handle）。
6. 接入层适配（不改原组件逻辑，仅保证在 PageHero 中正确渲染）：
   - 根节点 `relative w-full`：`page-hero__visual` 为 flex 容器，绝对定位面板不撑开宽度，需 w-full 使卡片占满视觉列（与 `DlpHeroVisual` 一致）。
   - 内容区高度 `h-[368px]`：Hero.md 指定的 SQL 为 14 行（16px 上边距 + 14×24px + 16px 下边距 = 368px），原 `h-[320px]` 会裁掉 `AND` 与 `GROUP BY` 两行；其余样式不变。
   - `VueFlow :min-zoom="0.2"`：vue-flow 默认 minZoom 0.5，390px 视口理论适配 zoom≈0.39 被钳制导致节点溢出裁切；桌面端 zoom≈0.55 不受影响。
7. `package.json`/`pnpm-lock.yaml`：新增 `@vue-flow/background` 依赖。
8. `nuxt.config.ts`：pnpm 隐藏层将 vitest 依赖的 vite@5 提升，`@nuxt/schema` 的 vite 类型解析到 vite@5，与 tailwind 插件（vite@8 Plugin）冲突导致 `pnpm typecheck` 失败；以 `as never` 收敛插件类型（环境型修复，不改变运行时行为）。
9. `assets/css/tailwind.css`：语义颜色桥（`--color-dimmed` 别名 + `@utility bg-default/bg-muted/bg-elevated/border-default/border-muted/ring-accented/text-default/text-muted/text-highlighted`）。DDP 窗口卡片的 `bg-default`、`border-muted`、`text-dimmed/50` 等类依赖该桥才能取到正确语义色（原 `--color-default` 别名指向文本色，会导致卡片背景错误），故随本任务一并提交；`scripts/harness-check.mjs` / `tests/visual.spec.ts` 中对应的 Tailwind 断言同步更新。
10. `tests/visual.spec.ts` 与 `scripts/harness-check.mjs`：新增/更新 DDP Hero 视觉契约（Tab 文案、SQL 内容、词法配色、动画时序、Flow 节点/连线、`ClientOnly`、`h-[368px]`、无 `<style>`、无占位符）。

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
| `components/product/ddp/DdpHeroVisual.vue` | 占位视觉替换为 EMQX data-processing 窗口卡片 1:1 适配 |
| `components/product/ddp/ddpHeroSql.ts` | 新增 Hero.md 数仓 SQL 行/词法数据与配色、光标 top 序列 |
| `components/product/ddp/useDdpHeroAnimation.ts` | 新增行显示/Tab 轮播状态机（300ms/5000ms） |
| `components/product/ddp/DdpFlowCanvas.client.vue` | 新增 vue-flow 画布，数仓五节点 + 四边，ClientOnly 挂载 |
| `components/product/ddp/DdpFlowNode.vue` | 新增 flow 节点卡片（tone 色条 + Lucide 数据表/数仓图标） |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODDP/Hero.md` | 纳入 Hero 视觉需求文档 |
| `package.json` / `pnpm-lock.yaml` | 新增 `@vue-flow/background` |
| `nuxt.config.ts` | vite 双版本类型冲突收敛，恢复 typecheck 通过 |
| `assets/css/tailwind.css` | 语义颜色桥（`--color-dimmed` + `@utility bg-default/border-muted/text-muted` 等），DDP 窗口卡片语义色类依赖 |
| `tests/visual.spec.ts` | 新增 DDP Hero 视觉契约断言 |
| `scripts/harness-check.mjs` | 新增 DDP Hero Harness 检查 |
| `doc/tasks/in-progress/TASK-006.5-*.md` → `doc/tasks/review/` | 任务状态流转 Review |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，7 个文件、31 个测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| 浏览器桌面验证（headless Chrome 1440×900） | 通过：SSR 200；Tab 点击切换正常；5s 自动轮播正常；hover 暂停/移出恢复正常；SQL 14 行全部显示未裁切；Flow 5 节点 4 边完整且 fitView 正常；无 console warn/error |
| 浏览器移动端验证（headless Chrome 390×844） | 通过：无横向溢出；Flow 节点在卡片内完整适配（min-zoom 修复）；无 console warn/error |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-006.5): implement ddp hero data-processing visual |
| Commit Hash    | `6016de3e49bcebae6f593c3fc8a463d26fdb5c41` |

### 修订记录
| 字段             | 内容 |
|----------------|----|
| Commit Message | fix(TASK-006.5): align ddp hero visual width with EMQX data-processing |
| Commit Hash    | `9c0ad4ac33639dab25fdc9c255adb79ead4f6550` |
| 说明           | `PageHero.vue` 新增 `visualSize="fluid"` 变体（`lg:flex-row lg:items-center lg:justify-between` + `max-w-lg xl:max-w-xl 2xl:max-w-2xl`），`DdpHero.vue` 使用 `visual-size="fluid"`，Hero 视觉列宽度与 EMQX data-processing 页 1:1 对齐（1440→576px、1600/1920→672px、390→358px 无横向溢出）；`harness-check.mjs` / `visual.spec.ts` 同步新增 fluid 变体契约断言。 |

## 完成说明
已按 Hero.md 完成 `/products/data-development` Hero 右侧视觉替换：SQL 开发/可视化编排双 Tab、14 行数仓 SQL 逐行动画、数仓分层五节点 Flow 画布，样式/布局/节点位置/连线/动画时序与 EMQX data-processing 原组件保持一致。必要的接入层适配共三处并已记录于实现内容：内容区高度 320→368px（14 行 SQL 不裁切）、根节点 w-full（PageHero flex 容器撑宽）、VueFlow min-zoom 0.2（移动端 fitView 不被默认 minZoom 钳制）；另以 ClientOnly 保证 vue-flow 仅客户端渲染；随提交纳入 Tailwind 语义颜色桥（`--color-dimmed` 别名 + `bg-default/border-muted/text-muted` 等 `@utility`），保证窗口卡片语义色类取到正确设计令牌。质量门（lint/typecheck/test/harness/build）与 headless Chrome 桌面/移动端验证全部通过。
