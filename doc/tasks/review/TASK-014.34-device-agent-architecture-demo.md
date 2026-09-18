# TASK-014.34：Device Agent 架构 Demo
---
* TaskName：Device Agent 架构 Demo
* TaskDescription：按 EMQX 边缘计算解决方案参考结构 1:1 还原独立 Vue Flow Demo，并替换为 Device Context / Device Execution / Device Agent Runtime 业务内容。
* TaskCreator：Codex
* TaskCreationTime：2026-09-18
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.34 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
以独立 Demo 形式 1:1 复现 EMQX 边缘计算方案架构图（`emqx.com/zh/solutions/edge-computing`）的布局、卡片尺寸、虚线叠层、圆角、阴影与紫色渐变连线，仅替换需求指定的文字与图标，不接入现有业务页面。

## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/tasks/review/TASK-014.33-tanyao-iot-architecture-demo.md`（同类 Demo 先例）
- 用户提供的 EMQX 边缘计算架构 DOM 参考

## 实现内容
1. 新增 Device Agent 架构 Vue Flow 组件（左侧五张设备卡、Device Context / Device Execution 双面板、Device Agent Runtime 集群卡、右侧三组应用卡）。
2. 保留参考图 130px 设备卡、170px 面板卡（220/200 高）、240×460 集群卡、320px 应用卡、圆角、阴影、虚线叠层、内部字号与图标位置。
3. 保留紫色 oklch 渐变连线与辉光：设备→Context 为贝塞尔曲线（入站色阶 0.75/300@.35 → 0.55/285@.75，主线 1.5px），Context→Execution 为圆角 step 折线（borderRadius 8 / offset 20），Context/Execution→集群为入站曲线（left-top / left-bottom 双入点），集群→应用为出站曲线（0.55/285@.7 → 0.7/280@.85，主线 2px / 辉光 3px）。
4. 使用统一 1704px 内部画布基准：原画布 1170px（连接区 90 / 150 / 70）按比例加宽为 245 / 408 / 191，节点尺寸与纵向坐标不变（节点 x：0 / 375 / 953 / 1384）；viewport `{ x: 0, y: 29.5, zoom: 1 }` 使内容纵向跨度（-22 → 543，最低点为 Device Execution 底部 535 再加虚线叠层 8px 偏移）在 580px 容器中垂直居中（参考图 540px 容器会裁切 Device Execution 底部，按用户反馈加高至 580px）。
5. 不渲染参考图格子背景（Demo 页要求）。
6. 三处品牌 pill（Device Context / Device Execution / Device Agent Runtime）沿用 TASK-014.33 先例，以 `assets/images/brand/tanyao-iot-logo.svg` 替换 EMQX 品牌 logo；「基础设施」三卡使用 `shuyao-logo.svg` / `boyao-logo.svg` / `zhiyao-logo.svg`（与 `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/数曜|博曜|智曜logo.svg` 逐字节一致）。
7. Kafka / TimescaleDB 图标以内联 `currentColor` SVG 组件复刻（`KafkaIcon.vue` / `TimescaleIcon.vue`），保证 `dark:` 变体着色可用；其余图标使用 lucide。
8. 新增独立 Demo 路由 `/demo/device-agent-architecture`（`layout: false` + noindex，Demo 组件不注册 harness / 视觉契约，与既有 Demo 先例一致）。
9. 后续追加：将 `DeviceAgentArchitectureFlow` 接入 Device Agent 页面（`/products/device-agent`）「智能体架构」区块，替换 `DeviceAgentArchitectureSection` 原占位符；沿用 `DdpArchitecture` / `TanyaoSolutionSection` 先例（`w-[min(1704px,100%)]` 画布 + `left-1/2 top-1/2` 绝对居中 + `ClientOnly`），**保留帧格子背景**（不传 `:grid="false"`）。因内容纵向跨度 565px 大于共享帧固定高度 560px（`ProductSystemFlowFrame` 被多页共用且多处锁定，不改高度），为 Flow 增加可选 `viewport-y` / `zoom` props（默认值 29.5 / 1 保持 Demo 行为不变），页面侧以 `:zoom="0.98"`（视觉不可感知）+ `:viewport-y="24.7"` 使架构图在帧内完整垂直居中显示；同步 harness 与视觉契约锁。

### 内容替换清单
| 位置 | 参考原文 | 替换后 |
|---|---|---|
| 区域1 设备卡 ×5 | Modbus / OPC-UA / BACnet / Sparkplug B / MQTT | 实时数据 / 设备事件 / 告警事件 / 业务事件 / 用户指令（图标保留原字形） |
| 区域2 面板标题 | EMQX Neuron | Device Context |
| 区域2 条目 | 数据采集 / 数据处理 / MQTT 桥接 | 设备模型 / 实时状态 / 设备能力 |
| 区域3 面板标题 | EMQX Edge | Device Execution |
| 区域3 条目 | 轻量 MQTT / 边缘计算 / 边云桥接 | 指令下发 / 本地执行 / 结果反馈 |
| 区域4 集群标题 | EMQX 集群 | Device Agent Runtime |
| 区域4 集群主节点 | EMQX 节点 1（规则引擎 / 数据集成） | 事件感知（事件订阅 / 上下文构建） |
| 区域4 集群节点 | 节点 2 / 节点 3 / 节点 4 / 节点 N | 记忆管理 / 智能决策 / 行动执行 / Skills & Tools |
| 右上应用卡 | Agents & Applications（MES / SCADA / ERP） | Agent 应用（自动预警 / 事件处置 / 工单派发） |
| 右中应用卡 | AI Models（OpenAI / Gemini / Anthropic） | 基础设施（数曜 / 博曜 / 智曜，品牌 logo） |
| 右下应用卡 | Data Analytics（Apache Kafka / TimescaleDB / BI Dashboard） | Skills & Tools（设备控制 / 工单执行 / API 调用） |

Device Context 面板配色沿用参考站 `--color-product-neuronex: #189bfe`（Tailwind 任意值表达）；Device Execution 面板与集群卡沿用 `primary` 语义 token；应用卡图标色 `#8B5CF6` / `#0EA5E9` / `#10B981` / `#231F20`（dark `#E8E8E8`）/ `#FDB515` 按参考 DOM 保留。

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
| `components/demo/DeviceAgentArchitectureDemo.client.vue` | 1704px 独立 Demo 画布（580px 高） |
| `components/demo/device-agent/DeviceAgentArchitectureFlow.client.vue` | Vue Flow 节点、坐标与业务数据 |
| `components/demo/device-agent/DeviceAgentArchitectureNode.vue` | 设备、双面板、集群与应用分组节点（5 种 kind） |
| `components/demo/device-agent/DeviceAgentArchitectureStepEdge.vue` | 圆角折线渐变 Edge（入站色阶，无标签） |
| `components/demo/device-agent/DeviceAgentArchitectureCurveEdge.vue` | 贝塞尔渐变 Edge（入站/出站双色阶，`data.outbound` 切换） |
| `components/demo/device-agent/KafkaIcon.vue` | Apache Kafka 内联 SVG 图标（currentColor） |
| `components/demo/device-agent/TimescaleIcon.vue` | TimescaleDB 内联 SVG 图标（currentColor） |
| `pages/demo/device-agent-architecture.vue` | 独立演示路由 |
| `components/product/device-agent/DeviceAgentArchitectureSection.vue` | 智能体架构区块接入架构图（居中 + 保留格子背景 + 0.98 缩放适配 560px 帧） |
| `tests/visual/product-aiiot/device-agent-base.contract.ts` | Section2 契约锁同步 |
| `scripts/harness/checks/product-aiiot/device-agent-base.mjs` | Harness 镜像锁同步 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.34): add device agent architecture demo |
| Commit Hash | |

## 完成说明
已完成独立 Device Agent 架构 Demo（按用户要求仅生成 Demo，不接入任何业务页面；Demo 页不渲染格子背景）。保留参考结构的四段布局、五张设备卡、双面板虚线叠层、集群卡与三组应用卡的全部尺寸、圆角、阴影与图标位置；连线保留紫色 oklch 渐变与辉光（入站 1.5px / 出站 2px 主线），仅替换需求指定的文字与图标。画布按统一 1704px 基准等比加宽三段连接区（90/150/70 → 245/408/191）。

验证结果：
- `pnpm lint`：通过
- `pnpm typecheck`：通过（修复一处模板联合类型收窄：应用卡分支由 `v-else` 改为 `v-else-if="data.kind === 'integration'"`）
- `pnpm test`：通过（19 文件 / 135 用例）
- `pnpm test:visual`：通过（53 用例）
- `pnpm harness:engineering`：通过
- SSR 验证：`/demo/device-agent-architecture` 返回 200，标题与 `min-w-[1704px]` / `h-[580px]` / aria-label 标记齐全；`/products/ai-iot` 与 `/demo/tanyao-iot-architecture` 回归 200 无影响

追加接入：`DeviceAgentArchitectureSection`（`/products/device-agent` 智能体架构区块）已用该 Flow 替换占位符，按用户要求**保留格子背景**并通过 `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` 在帧内水平垂直居中；为适配 560px 共享帧高度，Flow 新增 `viewport-y` / `zoom` 可选 props（Demo 默认值不变），页面以 0.98 缩放完整显示 565px 内容跨度；契约与 harness 锁同轮更新。
