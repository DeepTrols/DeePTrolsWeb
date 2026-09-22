# TASK-014.44：智慧储能解决方案架构图与 DMS 监管流程图
---
* TaskName：energy.vue 解决方案 section eyebrow 修正 + 储能智能运营能力图构建接入 + 数曜·数据要素监管平台监管流程图构建接入
* TaskDescription：①pages/solutions/energy.vue「构建设备感知与数据驱动的智慧储能运营体系」section eyebrow 由 行业痛点 改为 解决方案；②构建「储能智能运营能力图」（储能设备×5 → 探曜·AI 物联感知 → 数曜·数据治理 → 智能应用×3）并接入该 section 的 ProductSystemFlowFrame 占位帧；③构建数曜·数据要素监管平台「数据要素监管流程图」（事前预防 → 事中监控 → 事后处置 → 监管分析 + 底部规则持续优化回流闭环）并接入 DmsRegulationProcessSection 的 #before 占位帧。
* TaskCreator：Claude
* TaskCreationTime：2026-09-20
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.44 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

## 任务目标
1. energy.vue 系统 section：`eyebrow="行业痛点"` → `eyebrow="解决方案"`。
2. 新建 `components/demo/energy-storage-hub/`（Flow/Node/CurveEdge 三件套），按 1704px 画布多段横向流：5 储能设备源（PCS/BMS/EMS/电表/温控消防）→ 探曜·AI 物联感知面板（#189bfe 配色）→ 数曜·数据治理集群卡（统一数据模型 + SOC/SOH 指标/设备编码 tags）→ 3 应用卡（运行监测与预警/电池健康评估/充放电策略优化）；接入 energy.vue（scale-to-fit + max-lg:hidden）。
3. 新建 `components/demo/dms-regulation-process/`（Flow/Node/CurveEdge/ReturnEdge 四件套），四段虚线面板横向主链 + 底部 U 形回流（监管分析 → 事前预防，「规则持续优化」pill 压 lane）；接入 DmsRegulationProcessSection #before（占位文案→正式 label/fallback）。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/tasks/review/TASK-014.41-datacenter-synergy-loop-flows.md`（viewportY/zoom props 先例）
- `doc/tasks/review/TASK-014.43-education-stage-pills-removal-and-flow-scale-to-fit.md`（scale-to-fit 与移动端隐藏规范）

## 实现内容
### 1. 储能智能运营能力图（energy-storage-hub）
- 画布 1704px：节点宽 220+240+240+320=1020，三段连接区 192/192/200，x 锚点 0/412/844/1284。
- 源芯片 ×5（h-12 w220，violet/blue/emerald/cyan/pink）：PCS 储能变流器 PlugZap / BMS 电池管理 BatteryCharging / EMS 能源管理 Gauge / 电表与计量 CircleGauge / 温控消防与环境 Thermometer，y 30~430 步进 100。
- 探曜·AI 物联感知面板（240×420，#189bfe 三层虚线叠板 + tanyao-iot logo pill）：设备建模/协议解析/实时采集/边缘协同/状态监测。
- 数曜·数据治理集群卡（240×460，primary + shuyao logo）：统一数据模型（SOC/SOH 指标 ChartColumn、设备编码 Tags）→ 数据清洗/质量校验/指标管理 → 储能数据资产。
- 应用卡 ×3（w320，y 25/195/368）：运行监测与预警（实时监测/故障预警/告警通知）、电池健康评估（SOC/SOH 评估/一致性分析/衰减识别）、充放电策略优化（峰谷套利/需量管理/策略寻优），图标色 #8B5CF6/#0EA5E9/#10B981。
- 边：统一贝塞尔 CurveEdge，入站 1.5px、出站（治理→应用）`outbound` 2px 亮色阶。
- 内容跨度 y20→~498（478px），默认 `viewportY: 21` 垂直居中 560px 帧。
- energy.vue：SectionShell 加 `class="max-lg:hidden"`（纯图 section），帧内标准 `@container` + `scale-[min(1,calc(100cqw/1704px))]` + ClientOnly。

### 2. 数据要素监管流程图（dms-regulation-process）
- 画布 1704px：四段面板 240×300，y 40，x 72/512/952/1392（连接区 200×3，左右边距 72），shuyao logo pill。
- 事前预防（监管规则体系 ScrollText/风险等级分层 ShieldAlert/触发条件配置 SlidersHorizontal/处置动作定义 Zap）→ 事中监控（业务数据监测 Activity/异常行为感知 Radar/风险事件生成 TriangleAlert/事件收敛去重 ListFilter）→ 事后处置（自动工单生成 ClipboardList/多角色协同 Users/状态跟踪 ListChecks/全过程留痕 FileClock）→ 监管分析（监管驾驶舱 LayoutDashboard/风险态势 ChartPie/趋势分析 TrendingUp/决策支撑 Lightbulb）。
- 回流：监管分析 底部 `loop` source → 事前预防 底部 `loop` target，U 形 lane（底+44=384），出站色阶 2px；「规则持续优化」pill（797,368）压 lane。
- 内容跨度 40→400（360px），默认 `viewportY: 60` 垂直居中 560px 帧。
- DmsRegulationProcessSection：label 数据要素监管流程图占位→数据要素监管流程图，fallback-text→数据要素监管流程图加载中，#before 包装 `mb-12 max-lg:hidden lg:mb-16`（section 含 items 保留，仅帧包装移动端隐藏）。

### 3. 锁同步
- `scripts/harness/sources.mjs`：新增 `energyStorageHubFlow`、`dmsRegulationProcessFlow` 源。
- `scripts/harness/checks/solutions-energy-saving.mjs`：占位帧断言替换为嵌入断言（SectionShell max-lg:hidden、eyebrow 解决方案、fallback-text、EnergyStorageHubFlow、scale-to-fit 类串）+ flow 拓扑断言。
- `scripts/harness/checks/product-data/dms.mjs`：占位断言替换为嵌入断言 + flow 四段+回流断言（含 `!includes('占位')` 负向锁）。
- `tests/visual/site/solutions/energy-saving.contract.ts`、`tests/visual/product-data/dms.contract.ts`：同步。

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
| `components/demo/energy-storage-hub/EnergyStorageHubFlow.client.vue` | 新建：储能智能运营能力图编排 |
| `components/demo/energy-storage-hub/EnergyStorageHubNode.vue` | 新建：source/sense/govern/app 四种节点 |
| `components/demo/energy-storage-hub/EnergyStorageHubCurveEdge.vue` | 新建：贝塞尔渐变边（含 outbound） |
| `components/demo/dms-regulation-process/DmsRegulationProcessFlow.client.vue` | 新建：监管流程图编排 |
| `components/demo/dms-regulation-process/DmsRegulationProcessNode.vue` | 新建：stage 面板 + pill 节点 |
| `components/demo/dms-regulation-process/DmsRegulationProcessCurveEdge.vue` | 新建：段间贝塞尔边 |
| `components/demo/dms-regulation-process/DmsRegulationProcessReturnEdge.vue` | 新建：底部 U 形回流边 |
| `pages/solutions/energy.vue` | eyebrow 修正 + 能力图嵌入（scale-to-fit + max-lg:hidden） |
| `components/product/dms/DmsRegulationProcessSection.vue` | 监管流程图嵌入，占位文案转正 |
| `scripts/harness/{sources.mjs,checks/solutions-energy-saving.mjs,checks/product-data/dms.mjs}` | 锁同步 |
| `tests/visual/{site/solutions/energy-saving.contract.ts,product-data/dms.contract.ts}` | 契约同步 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.44): add energy storage hub flow and dms regulation process flow |
| Commit Hash | |

## 完成说明
①energy.vue 系统 section eyebrow 行业痛点→解决方案，并嵌入新建「储能智能运营能力图」：5 储能设备 → 探曜·AI 物联感知（#189bfe）→ 数曜·数据治理（primary 集群卡）→ 3 智能应用，标准 scale-to-fit 接入，纯图 section 移动端隐藏。②DMS 监管流程占位帧替换为正式「数据要素监管流程图」：事前预防 → 事中监控 → 事后处置 → 监管分析 四段虚线面板 + 底部「规则持续优化」回流闭环，#before 包装 max-lg:hidden。全部门禁通过。

验证结果：
- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：通过（19 文件 / 137 用例）
- `pnpm harness:engineering`：通过
- SSR 验证：`/solutions/energy`、`/products/data-element-regulation` 均 200；HTML 含 `max-lg:hidden`/`@container`/`scale-[min(1,calc(100cqw/1704px))]`，无 `w-[min(1704px` 残留；DMS 页残留「占位」均为时间线图片占位符（既有，与本任务无关）
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36~43 一致）
