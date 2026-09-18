# TASK-014.33：探曜 AIoT 架构 Demo
---
* TaskName：探曜 AIoT 架构 Demo
* TaskDescription：按 EMQX 油气行业解决方案参考结构 1:1 还原独立 Vue Flow Demo，并替换为探曜 Edge / 探曜 AIoT 平台业务内容。
* TaskCreator：Codex
* TaskCreationTime：2026-09-18
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.33 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
以独立 Demo 形式 1:1 复现 EMQX 油气行业实时架构图（`emqx.com/zh/solutions/oil-gas`）的布局、卡片、虚线叠层、紫色渐变连线与协议标签，仅替换需求指定的文字与图标，不接入现有业务页面。

## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- 用户提供的 EMQX 油气行业架构 DOM 参考

## 实现内容
1. 新增探曜 AIoT 架构 Vue Flow 组件（左侧三组设备卡、探曜 Edge 边缘卡、探曜 AIoT 平台集群卡、右侧三组应用卡）。
2. 保留参考图 520px 高度、190×80 设备卡、170px 边缘卡、240×460 集群卡、320px 应用卡、圆角、阴影、虚线叠层、内部字号与图标位置。
3. 保留紫色 oklch 渐变连线与辉光：设备→边缘/集群为圆角 step 折线（borderRadius 8 / offset 20），集群→应用为贝塞尔曲线；协议标签（Modbus / OPC UA / BACnet / CAN / MQTT 与两处 MQTT）通过 EdgeLabelRenderer 1:1 复刻。
4. 使用统一 1704px 内部画布，按比例加宽三段连接区（120/120/80 → 294/294/196），节点尺寸与纵向坐标不变。
5. 不渲染参考图格子背景。
6. 集群标题图标与边缘卡品牌图标使用 `assets/images/brand/tanyao-iot-logo.svg`（与 `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/探曜IOT logo-1.svg` 一致）。
7. 新增独立 Demo 路由 `/demo/tanyao-iot-architecture`。
8. 后续追加：将 `TanyaoIotArchitectureFlow` 接入探曜·AI物联感知平台页面（`/products/ai-iot`）「解决方案」区块，替换 `TanyaoSolutionSection` 原流程图占位；沿用 `DdpArchitecture` 先例（`w-[min(1704px,100%)]` 画布 + `left-1/2 top-1/2` 绝对居中 + `ClientOnly`），520px 流画布在 560px 帧内水平垂直居中；**保留帧格子背景**（不传 `:grid="false"`），同步 harness 与视觉契约锁。

### 内容替换清单
| 位置 | 参考原文 | 替换后 |
|---|---|---|
| 左上 | 生产现场（工厂图标） | 工业设备（PLC / CNC / 机器人） |
| 左中 | 管网系统（管网图标） | 传感器与仪表（温度 / 压力 / 振动） |
| 左下 | 储运设施（储罐/车辆） | 工业系统（SCADA / DCS / MES） |
| 协议标签 | Modbus / OPC-UA / Sparkplug B / MQTT / ...... | Modbus / OPC UA / BACnet / CAN / MQTT |
| 中间标题 | EMQX Neuron | 探曜 Edge |
| 中间节点 | 数据采集 / 数据处理 / MQTT 桥接 | 实时采集 / 边缘计算 / 协议转换 |
| 集群标题 | EMQX 集群（EMQX logo） | 探曜 AIoT 平台（探曜IOT logo） |
| 集群节点 | 节点 1~N（规则引擎 / 数据集成） | 设备接入（设备模型 / 规则引擎）/ 设备管理 / 数据处理 / 事件中心 / 开放服务 |
| 右上 | Agents & Applications（SCADA / ERP / 车队管理） | 智能应用（设备运维 / 能源管理 / 生产协同） |
| 右中 | AI Models（OpenAI / Gemini / Anthropic） | AI 智能分析（异常检测 / 趋势预测 / 智能诊断） |
| 右下 | Data Analytics（Kafka / TimescaleDB / BI） | 数据服务（时序数据 / 数据集成 / BI 分析） |

边缘卡配色沿用参考站 `--color-product-neuronex: #189bfe`（以 Tailwind 任意值表达）；集群卡沿用 `primary` 语义 token。

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
| `components/demo/TanyaoIotArchitectureDemo.client.vue` | 1704px 独立 Demo 画布 |
| `components/demo/tanyao-iot/TanyaoIotArchitectureFlow.client.vue` | Vue Flow 节点、坐标与业务数据 |
| `components/demo/tanyao-iot/TanyaoIotArchitectureNode.vue` | 设备组、边缘、集群与应用分组节点 |
| `components/demo/tanyao-iot/TanyaoIotArchitectureStepEdge.vue` | 圆角折线渐变 Edge + 协议标签 |
| `components/demo/tanyao-iot/TanyaoIotArchitectureCurveEdge.vue` | 输出贝塞尔渐变 Edge |
| `pages/demo/tanyao-iot-architecture.vue` | 独立演示路由 |
| `components/product/tanyao/TanyaoSolutionSection.vue` | 解决方案区块接入架构图（居中 + 保留格子背景） |
| `tests/visual/product-aiiot/tanyao.contract.ts` | 解决方案接入契约锁同步 |
| `scripts/harness/checks/product-aiiot/tanyao.mjs` | Harness 镜像锁同步 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.33): add tanyao aiot architecture demo |
| Commit Hash | |

## 完成说明
已完成独立探曜 AIoT 架构 Demo（Demo 页不渲染格子背景）。保留参考结构的 520px 高度、四段布局、卡片尺寸、圆角、阴影、虚线叠层、紫色渐变连线与协议标签；按需求替换全部业务文字与图标。画布使用统一 1704px 基准并等比加宽三段连接区。

追加接入：`TanyaoSolutionSection`（`/products/ai-iot` 解决方案区块）已用该 Flow 替换占位符，按用户要求**保留格子背景**（`ProductSystemFlowFrame` grid 默认开启）并通过 `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` 在帧内水平垂直居中；契约与 harness 锁同轮更新。

验证结果：
- `pnpm typecheck`：通过
- `pnpm lint`：通过
- `pnpm test`：通过
- `pnpm test:visual`：通过
- `pnpm harness:engineering`：通过
- 浏览器验证：`/demo/tanyao-iot-architecture` 可正常访问
