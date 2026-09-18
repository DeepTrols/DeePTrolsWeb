# TASK-014.37：智能制造解决方案制造智能闭环能力图
---
* TaskName：智能制造解决方案制造智能闭环能力图
* TaskDescription：为智能制造解决方案页「解决方案」section 的占位帧接入 Vue Flow 能力图，体现 感知 → 分析 → 决策 → 执行 → 反馈 的制造智能闭环。
* TaskCreator：Codex
* TaskCreationTime：2026-09-18
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.37 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
将 `/solutions/manufacturing`「解决方案 · 融合数据、知识、物联与 AI，构建制造智能闭环」section（`pages/solutions/manufacturing.vue` `#before` 槽）中既有的裸 `ProductSystemFlowFrame` 占位帧替换为真实 Vue Flow 能力图：贯通设备、数据、知识与业务，让 AI 深入制造核心场景，实现从感知、分析到决策与执行的智能闭环。遵循用户既定设计规则（横向拓扑、阶段名融入流程不带序号、无独立 header 节点、保留格子背景、画布居中）。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/manufacturing.md`（section2：flow 暂不传入 → 本任务补齐）
- `doc/tasks/review/TASK-014.36-ddp-unified-development-flow.md`（最近同类先例）

## 实现内容
1. **横向主链 + 底部回流闭环拓扑**（与既有 flow 的核心差异化——首个带回流 lane 的真闭环）：
   - **左列 · 制造现场 ×4**（220×48 源卡，tone 四色）：生产设备与产线 / 工业传感设备 / 控制系统 SCADA / 业务系统 ERP·MES
   - **四大平台面板 ×4**（200×300 虚线三层叠板，y=58，平台名即面板头 brand logo pill，无序号）：
     - 探曜 · 物联感知（tanyao-iot-logo）：设备连接 / 协议兼容 / 实时采集 / 边缘协同
     - 数曜 · 数据智能（shuyao-logo）：数据治理 / 统一数据模型 / 指标体系 / 可信底座
     - 博曜 · 知识中枢（boyao-logo）：知识沉淀 / 检索理解 / 关联建模 / 知识智能服务
     - 智曜 · AI 引擎（zhiyao-logo）：工业智能体 / 预测性维护 / 质量分析 / 生产决策
   - **右列 · 智能应用 ×4**（220×56 双行卡，对应页面 section3 四大核心功能）：设备预测性维护（健康评估 · 故障预测）/ AI 视觉质量检测（缺陷检测 · 质量追溯）/ APS 智能排程（动态排产 · 敏捷响应）/ 能源智能管理（能耗优化 · 绿色低碳）
   - **回流闭环 lane**：能源智能管理底部下行至 y=430 lane，横穿画布底部，上行回到 业务系统 ERP·MES 底部——表达「AI 与业务闭环：执行 → 反馈 → 触发流程/回到现场」（圆角 U 形专用 Return Edge）
2. **阶段标签融入流程**（无序号、无 header）：`实时感知`（228,191）/ `智能分析`（814,191）/ `自主决策`（1107,191）/ `决策执行`（1400,191）四枚白底 pill 压在对应连接器上；`闭环反馈`（814,413）压在回流 lane 上。
3. 连线：贝塞尔渐变边 11 条（4 扇入 + 3 平台间为入站 1.5px；4 扇出至应用为出站 2px `data.outbound`）+ 回流 Return Edge 1 条（出站色阶，U 形圆角路径），共 12 条。
4. 统一 1704px 画布：节点宽 220+200×4+220=1240，五段连接区各约 93；节点 x：0 / 313 / 606 / 899 / 1192 / 1484。
5. 垂直几何：内容跨度 30（应用卡顶）→ 434（回流 lane 430 + 光晕 4），跨度 404；Flow 可选 `viewportY`/`zoom` props（默认 58/1 对应 580px Demo 容器惯例）；页面接入 560px 帧传 `:viewport-y="48"`（(560−404)/2 − 30 = 48，zoom=1 完整居中）。
6. Flow 组件置于 `components/demo/manufacturing-loop/`（沿用 knowledge-hub / boyao-integration / ddp-unified-development 目录先例），不注册 harness sources / required-files（既有 Demo 组件先例）；不建独立 Demo 路由（页面直挂）。
7. **页面接入**：`pages/solutions/manufacturing.vue` `#before` 槽裸帧替换为带内容的 `ProductSystemFlowFrame`（保留 `class="mb-10"`，格子背景默认开启），帧内按共享 recipe：`w-[min(1704px,100%)]` 外层 > `absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate` 内盒居中 > `ClientOnly` + fallback。label「制造智能闭环能力图」/ fallback-text「制造智能闭环能力图加载中」。
8. 锁同步：`scripts/harness/checks/solutions-manufacturing.mjs` 与 `tests/visual/site/solutions/manufacturing.contract.ts` 中裸帧字符串断言替换为接入断言（含 flow `viewportY: 58` 默认值锁与 `manufacturingLoopReturn` / `tanyao-iot-logo.svg` 锁）。

### 图标清单（全部 lucide，d.ts 核验通过 24/24）
Factory / Radar / Gauge / AppWindow（制造现场）；Cable / Plug / Radio / Server（探曜）；DatabaseZap / Boxes / ChartColumn / ShieldCheck（数曜）；BookOpen / Search / Network / Sparkles（博曜）；Bot / Activity / ScanEye / BrainCircuit（智曜）；Wrench / Eye / CalendarClock / Zap（智能应用）。品牌 logo：`assets/images/brand/` 下 tanyao-iot-logo / shuyao-logo / boyao-logo / zhiyao-logo 四枚 pill。

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
| `components/demo/manufacturing-loop/ManufacturingLoopFlow.client.vue` | Vue Flow 节点、坐标与业务数据（横向主链 + 回流闭环；可选 `viewportY`/`zoom` props，默认 58/1） |
| `components/demo/manufacturing-loop/ManufacturingLoopNode.vue` | source / platform / app / stage 四种渲染分支（判别联合显式 v-if 收窄；source/app 带 `loop` Bottom handle） |
| `components/demo/manufacturing-loop/ManufacturingLoopCurveEdge.vue` | 贝塞尔渐变 Edge（入站/出站双色阶，`data.outbound` 切换） |
| `components/demo/manufacturing-loop/ManufacturingLoopReturnEdge.vue` | 回流闭环专用 U 形圆角渐变 Edge（出站色阶，lane y = max(端点 y)+44） |
| `pages/solutions/manufacturing.vue` | `#before` 槽占位帧 → Flow 接入（560px 共享帧，格子背景保留，`:viewport-y="48"` 居中） |
| `scripts/harness/checks/solutions-manufacturing.mjs` | 裸帧字符串断言替换为接入锁 |
| `tests/visual/site/solutions/manufacturing.contract.ts` | 同步接入契约（页面结构 + flow 默认值锁） |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.37): add manufacturing intelligence loop flow |
| Commit Hash | |

## 完成说明
已完成智能制造解决方案页「制造智能闭环能力图」并接入 `/solutions/manufacturing` `#before` 槽：横向主链（制造现场 ×4 → 探曜·物联感知 → 数曜·数据智能 → 博曜·知识中枢 → 智曜·AI 引擎 → 智能应用 ×4）+ 底部回流 lane（能源智能管理 → 圆角 U 形 Return Edge → 业务系统 ERP·MES），构成首个带真闭环回流的架构 flow，与 knowledge-hub 单向管线、boyao-integration 对称闭环、ddp 六列管线在拓扑上明确差异化。五枚无序号阶段 pill（实时感知 / 智能分析 / 自主决策 / 决策执行 / 闭环反馈）压在对应连接器与回流 lane 上；四平台面板头用各自 brand logo pill（tanyao-iot / shuyao / boyao / zhiyao）；右列四应用与页面 section3「四大核心功能」一一对应。保留 `ProductSystemFlowFrame` 格子背景与 `class="mb-10"`，1704px 画布内盒居中，内容跨度 404 < 560 帧高 → zoom=1、`:viewport-y="48"` 完整垂直居中。图标 24/24 d.ts 核验通过。锁同步：`solutions-manufacturing.mjs` / `manufacturing.contract.ts` 裸帧字符串断言替换为接入断言（含 flow `viewportY: 58` 默认值锁）。

验证结果：
- `pnpm lint`：通过（一次通过，无返工）
- `pnpm typecheck`：通过（一次通过，判别联合四分支显式 `v-if/v-else-if` 收窄）
- `pnpm test`：通过（19 文件 / 136 用例）
- `pnpm test:visual`：通过（54 用例，含更新后的 manufacturing 契约）
- `pnpm harness:engineering`：通过（文档定稿后复跑仍通过）
- SSR 验证：`/solutions/manufacturing` 返回 200，`制造智能闭环能力图` aria-label ×1、`product-system-flow-frame--grid` ×1、`h-[560px] w-[1704px]` ×1、`manufacturing-solution-title` ×2 齐全（fallback-text 因 SSR 已渲染 slot 内容而不出现，与 boyao 先例行为一致）；`/`、`/products/data-development`、`/products/knowledge-base`、`/demo/boyao-integration` 回归 200；4 个新组件 + 页面共 5 个模块经 Vite 拉取 transform 零错误；dev 日志 ERROR 计数 0（typecheck 后重启的全新实例）
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.35/36 一致）
