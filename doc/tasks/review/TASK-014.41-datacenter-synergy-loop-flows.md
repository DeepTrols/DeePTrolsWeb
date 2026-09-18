# TASK-014.41：算电协同运营方案页两张 Vue Flow 能力图（解决方案 / 运营闭环）
---
* TaskName：算电协同运营方案页两张 Vue Flow 能力图
* TaskDescription：为算电协同运营方案页两个占位帧接入 Vue Flow：①解决方案架构图（核心驱动五输入 → 三段能力 → 四策略扇出）②运营闭环流程图（预测 → 优化 → 执行 → 反馈顺时针矩形闭环）。
* TaskCreator：Codex
* TaskCreationTime：2026-09-18
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.41 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
将 `/solutions/compute`「解决方案 · 构建算力与能源协同优化的统一运营体系」与「运营闭环 · 预测、优化、执行、反馈持续闭环」两个 section（`pages/solutions/compute.vue`）中既有的裸 `ProductSystemFlowFrame` 占位帧替换为真实 Vue Flow 能力图。遵循用户既定设计规则（横向拓扑、阶段名融入流程不带序号、无独立 header 节点、保留格子背景、画布居中）。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/datacenter.md`
- `doc/tasks/review/TASK-014.40-fde-three-flows.md`（同轮先例）

## 实现内容
### 1. DatacenterSynergyFlow —— 核心驱动五输入 → 三段能力 → 四策略扇出
- **左列 · 输入资源 ×5**（220×48 tone 芯片，y：30/130/230/330/430）：算力任务负载（Cpu，violet，**核心驱动**——amber「核心」角标 `-top-2.5` 强调）/ 电力与电价（Zap，amber）/ 冷却系统（Snowflake，cyan）/ 储能状态（BatteryCharging，emerald）/ 新能源出力（Sun，pink）
- **中段 · 三座 240×300 虚线叠板平台**（y=110，x：351/722/1093，纯文字 pill 头，无 logo——运营体系非单一产品）：
  - 统一预测：算力负载预测（Activity）/ 电价与绿电预测（TrendingUp）/ 冷却负荷预测（Thermometer）/ 储能 SOC 预测（Gauge）
  - 算电协同优化：成本优化计算（Scale）/ 容量约束建模（Boxes）/ 多目标协同求解（BrainCircuit）/ 策略动态生成（Sparkles）
  - 动态策略执行：算力任务调度（CalendarClock）/ 冷却设定调整（Snowflake）/ 储能充放控制（BatteryCharging）/ 绿电消纳协同（Sun）
- **右列 · 协同调度策略 ×4**（240×64 双行 tone 卡，y：50/154/258/362）：算力调度策略·任务与功率协同调度（Cpu，violet）/ 冷却运行策略·冷源动态调节（Snowflake，cyan）/ 储能充放策略·削峰填谷 · 电价套利（BatteryCharging，emerald）/ 绿电消纳策略·低碳优先调度（Sun，amber）
- **阶段 pill**：`资源接入`（240,242）压输入→预测连接器，`策略下发`（1354,242）压执行→策略连接器（三段平台名即阶段名，融入流程无序号）
- **连线 11 条**：5 扇入 + 2 段间 + 4 扇出（出站双色阶）；贝塞尔渐变边，userSpaceOnUse 天然支持扇形斜连线
- 垂直几何：跨度 20（核心角标顶）→ 478 = 458；默认 `viewportY: 41`（580px Demo 惯例），页面传 `:viewport-y="31"`（(560−458)/2 − 20）
- `as const` 异构数组仅首项含 `core`，map 中用 `'core' in input ? input.core : false` 收窄

### 2. DatacenterLoopFlow —— 顺时针矩形闭环（首个周界回环拓扑，与既有家族差异化）
- **四角 420×200 实线面板**：智能预测（violet，TrendingUp，左上 200,40）→ 协同优化（blue，BrainCircuit，右上 1084,40）→ 动态执行（emerald，Zap，右下 1084,340）→ 效果反馈（amber，Gauge，左下 200,340）→ 回到智能预测；各含 3 行图标芯片：
  - 智能预测「统一感知算力与能源趋势」：算力任务负载预测（Cpu）/ 电价与绿电出力预测（Sun）/ 冷却与储能状态预测（Snowflake）
  - 协同优化「成本与约束的全局求解」：成本与容量约束建模（Scale）/ 多目标协同求解（Sparkles）/ 协同调度策略生成（BrainCircuit）
  - 动态执行「算力与能源策略自动下发」：算力任务动态调度（CalendarClock）/ 冷却与储能运行调节（BatteryCharging）/ 绿电消纳协同执行（Sun）
  - 效果反馈「持续评估与策略迭代」：能耗与成本指标回收（Activity）/ 策略执行偏差分析（ChartColumn）/ 预测模型滚动校准（RefreshCw）
- **每面板 sourcePosition/targetPosition 数据驱动**（forecast：Right/Bottom，optimize：Bottom/Left，execute：Left/Top，feedback：Top/Right），顺时针走线
- **中心 pill**（728,272）：「预测 · 优化 · 执行 · 反馈 持续闭环」
- **连线 4 条**：顶边（预测→优化）与右边（优化→执行）入站色阶，底边（执行→反馈）与左边（反馈→预测，右→左 + 自下而上）出站色阶；纵横边 sx=tx / sy 退化贝塞尔渲染为直线
- 垂直几何：跨度 40 → 540 = 500；默认 `viewportY: 0`，页面传 `:viewport-y="-10"`（(560−500)/2 − 40）
- 画布横向 200 → 1504，左右各留 200 对称边距

### 页面接入与锁
- `pages/solutions/compute.vue` 两处裸帧替换为共享 recipe（`w-[min(1704px,100%)]` 外层 > `absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate` 内盒 > `ClientOnly` + fallback），格子背景默认开启；label 数据驱动 `:label="datacenterSolutionLabel/datacenterLoopLabel"` + `:fallback-text="\`${label}加载中\`"`
- 锁同步：`scripts/harness/checks/solutions-datacenter.mjs`（两处单帧断言 → 接入链，含 `:viewport-y="31"/"-10"`、`<ClientOnly>`、`h-[560px] w-[1704px]`、`!:grid="false"`）；`tests/visual/site/solutions/datacenter.contract.ts`（新增 synergyFlow/loopFlow readComponent：锁 `viewportY: 41` + `type: 'datacenterSynergyCurve'` + `算力任务负载`/`算电协同优化`/`动态策略执行`；`viewportY: 0` + `type: 'datacenterLoopCurve'` + `智能预测`/`协同优化`/`效果反馈`/`预测 · 优化 · 执行 · 反馈 持续闭环`）
- Flow 组件置于 `components/demo/datacenter-synergy|datacenter-loop/`，不注册 harness sources / required-files（既有 Demo 组件先例）

### 图标清单（全部 lucide，d.ts 核验通过；BatteryHalf/LineChart/BarChart3 该版本缺失但未采用）
协同图：Cpu / Zap / Snowflake / BatteryCharging / Sun / Activity / TrendingUp / Thermometer / Gauge / Scale / Boxes / BrainCircuit / Sparkles / CalendarClock；闭环图：TrendingUp / BrainCircuit / Zap / Gauge / Cpu / Sun / Snowflake / Scale / Sparkles / CalendarClock / BatteryCharging / Activity / ChartColumn / RefreshCw。无品牌 logo（运营体系能力图，纯文字 pill 头）。

## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [ ] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过

## 修改文件
| 文件 | 说明 |
|---|---|
| `components/demo/datacenter-synergy/DatacenterSynergyFlow.client.vue` | 五输入→三段→四策略拓扑数据（默认 `viewportY: 41`） |
| `components/demo/datacenter-synergy/DatacenterSynergyNode.vue` | input（核心角标）/ stage（虚线叠板）/ strategy（双行 tone 卡）/ pill 渲染分支 |
| `components/demo/datacenter-synergy/DatacenterSynergyCurveEdge.vue` | 贝塞尔渐变 Edge（入站/出站双色阶） |
| `components/demo/datacenter-loop/DatacenterLoopFlow.client.vue` | 顺时针矩形闭环拓扑数据（默认 `viewportY: 0`） |
| `components/demo/datacenter-loop/DatacenterLoopNode.vue` | loopPanel（数据驱动 handle 方位）/ pill 渲染分支 |
| `components/demo/datacenter-loop/DatacenterLoopCurveEdge.vue` | 贝塞尔渐变 Edge |
| `pages/solutions/compute.vue` | 两处裸帧 → Flow 接入（560px 共享帧，`:viewport-y="31"/"-10"` 居中） |
| `scripts/harness/checks/solutions-datacenter.mjs` | 两处单帧断言 → 接入锁链 |
| `tests/visual/site/solutions/datacenter.contract.ts` | 同步接入契约（页面结构 + 两个 flow 默认值与 label 锁） |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.41): add datacenter synergy and loop flows |
| Commit Hash | |

## 完成说明
已完成算电协同运营方案页两张能力图并接入 `/solutions/compute`：①「算电协同运营能力图」——核心驱动五输入（算力任务负载带 amber「核心」角标 + 电力与电价 / 冷却系统 / 储能状态 / 新能源出力）汇入 统一预测 → 算电协同优化 → 动态策略执行 三段虚线平台，向右扇出 算力调度 / 冷却运行 / 储能充放 / 绿电消纳 四类协同调度策略，`资源接入` / `策略下发` 两枚阶段 pill 融入连接器；②「算电协同运营闭环能力图」——首个顺时针矩形周界闭环拓扑：智能预测（左上）→ 协同优化（右上）→ 动态执行（右下）→ 效果反馈（左下）→ 回到智能预测，顶/右边入站色阶、底/左边出站色阶，中心 pill「预测 · 优化 · 执行 · 反馈 持续闭环」，与页面标题「预测、优化、执行、反馈持续闭环」一致。两帧均保留 `ProductSystemFlowFrame` 格子背景，1704px 画布内盒居中，`:viewport-y` 分别为 31 / -10。全部 lucide 图标 d.ts 核验通过。锁同步：`solutions-datacenter.mjs` 接入链 + `datacenter.contract.ts` 两个 flow 默认值与 label 锁。

验证结果：
- `pnpm lint`：通过（一次通过，无返工）
- `pnpm typecheck`：通过（EXIT=0，三任务合并终验一次通过；`as const` 异构数组经 `'core' in input` 收窄）
- `pnpm test`：通过（19 文件 / 136 用例）
- `pnpm test:visual`：通过（54 用例，含更新后的 datacenter 契约）
- `pnpm harness:engineering`：通过（文档定稿后复跑仍通过）
- SSR 验证：`/solutions/compute` 返回 200，`算电协同运营能力图` / `算电协同运营闭环能力图` aria-label 各 ×1、`product-system-flow-frame--grid` ×2、`h-[560px] w-[1704px]` ×2 齐全（fallback-text 因 SSR 已渲染 slot 内容而不出现，与既有先例一致）；`/`、`/solutions/water`、`/solutions/manufacturing`、`/products/data-development` 回归 200；6 个新组件模块经 Vite 拉取 transform 200 零错误；dev 日志 ERROR 计数 0（typecheck 后重启的全新实例）
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36/37/38 一致）
