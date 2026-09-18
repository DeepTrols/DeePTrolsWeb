# TASK-014.38：智慧水利解决方案知识中枢能力图
---
* TaskName：智慧水利解决方案知识中枢能力图
* TaskDescription：为智慧水利解决方案页「解决方案」section 的占位帧接入 Vue Flow 能力图，体现数据与知识双轮驱动、数据治理 → 知识构建 → 知识服务 → 智能决策的完整能力体系。
* TaskCreator：Codex
* TaskCreationTime：2026-09-18
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.38 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
将 `/solutions/water`「解决方案 · 构建数据与知识双轮驱动的智慧水利知识中枢」section（`pages/solutions/water.vue` `SectionShell` 内）中既有的裸 `ProductSystemFlowFrame` 占位帧替换为真实 Vue Flow 能力图：以数曜构建统一、可信的水利数据底座，以博曜将预案、规则、历史场景、专业资料与专家经验转化为水利知识资产，形成从数据治理 → 知识构建 → 知识服务 → 智能决策的完整能力体系。遵循用户既定设计规则（横向拓扑、阶段名融入流程不带序号、无独立 header 节点、保留格子背景、画布居中）。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/hydraulic.md`（section2：flow 暂不传入 → 本任务补齐）
- `doc/tasks/review/TASK-014.37-manufacturing-loop-flow.md`（最近同类先例）

## 实现内容
1. **双轨汇聚拓扑**（首个双 lane 汇聚结构，与既有四张 flow 明确差异化——knowledge-hub 单向管线 / boyao-integration 对称闭环 / ddp 六列管线 / manufacturing 主链+回流）：
   - **上轨 · 数据轮**（lane 中心 y=130）：数据源 ×3（220×48）水雨情监测数据 / 水利基础数据 / 业务与空间数据 → **数曜 · 数据轮**（200×240 虚线叠板，shuyao logo pill）：多源汇聚 / 标准治理 / 融合关联 / 可信底座 → **统一数据底座**（200×240 实线资产卡，shuyao pill + 三横条母题行）：水文水情库 / 工程与空间库 / 业务主题库
   - **下轨 · 知识轮**（lane 中心 y=390）：知识源 ×3 预案与规范文档 / 历史事件场景 / 专家经验沉淀 → **博曜 · 知识轮**（200×240 虚线叠板，boyao logo pill）：知识抽取 / 知识图谱 / 语义理解 / 知识推理 → **水利知识资产**（200×240 实线资产卡，boyao pill）：预案与规则库 / 历史场景库 / 专题知识图谱
   - **中轴汇聚**（画布正中 y=260）：双轨汇入 **博曜 · 知识服务**（200×300）：智能问答 / 语义检索 / 知识可视化 / 知识推荐 → **智曜 · 智能决策**（200×300，zhiyao logo pill）：相似场景匹配 / 规则智能调用 / 预案辅助推荐 / 四预业务支撑
   - **右列 · 「四预」应用 ×4**（220×56 双行卡）：智能预报（水雨情趋势预测）/ 智能预警（风险阈值告警）/ 数字预演（调度方案仿真推演）/ 预案推荐（处置方案匹配）
   - 虚线叠板 = 处理平台，实线卡 = 资产库，视觉语义分层
2. **阶段标签融入流程**（无序号、无 header）：`数据治理`（521,113）/ `知识构建`（521,373）压双轨连接器，`知识服务`（814,243）/ `智能决策`（1107,243）/ `四预支撑`（1400,243）压中轴连接器——完整复现副标题能力链。
3. 连线全部为贝塞尔渐变边（入站 1.5px / 出站 2px，`data.outbound` 切换双色阶；userSpaceOnUse 渐变天然支持双轨汇聚斜连线）：3+3 扇入 + 2 轮→资产 + 2 资产→服务汇聚 + 服务→决策 + 4 扇出至四预应用（出站），共 15 条。
4. 统一 1704px 画布：节点宽 220+200×4+220=1240，五段连接区各约 93；节点 x：0 / 313 / 606 / 899 / 1192 / 1484。
5. 垂直几何：内容跨度 10（双轨面板顶）→ 518（知识轮虚线叠层底 510+8），跨度 508；Flow 可选 `viewportY`/`zoom` props（默认 26/1 对应 580px Demo 容器惯例）；页面接入 560px 帧传 `:viewport-y="16"`（(560−508)/2 − 10 = 16，zoom=1 完整居中）。
6. Flow 组件置于 `components/demo/hydraulic-hub/`（沿用既有 flow 目录先例），不注册 harness sources / required-files（既有 Demo 组件先例）；不建独立 Demo 路由（页面直挂）。
7. **页面接入**：`pages/solutions/water.vue` 裸帧替换为带内容的 `ProductSystemFlowFrame`（格子背景默认开启，未传 `:grid="false"`），帧内按共享 recipe：`w-[min(1704px,100%)]` 外层 > `absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate` 内盒居中 > `ClientOnly` + fallback。label「智慧水利知识中枢能力图」/ fallback-text「智慧水利知识中枢能力图加载中」。
8. 锁同步：`scripts/harness/checks/solutions-hydraulic.mjs` 与 `tests/visual/site/solutions/hydraulic.contract.ts` 中裸帧字符串断言替换为接入断言（含 flow `viewportY: 26` 默认值锁与双轮 label 锁）。

### 图标清单（全部 lucide，d.ts 核验通过；历史事件场景原拟 History 经核验该版本缺失，替换为 Archive）
Droplets / Database / Globe（数据源）；FileText / Archive / Users（知识源）；Cable / Scale / Shuffle / ShieldCheck（数据轮）；ScanText / Network / BookOpen / BrainCircuit（知识轮）；MessagesSquare / Search / Eye / Lightbulb（知识服务）；GitCompare / Scale / ClipboardCheck / Radar（智能决策）；Activity / Siren / Workflow / Sparkles（四预应用）。品牌 logo：`assets/images/brand/` 下 shuyao-logo ×2 / boyao-logo ×3 / zhiyao-logo ×1 pill。tone 色板新增 amber（静态类串，JIT 可检出）。

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
| `components/demo/hydraulic-hub/HydraulicHubFlow.client.vue` | Vue Flow 节点、坐标与业务数据（双轨汇聚拓扑；可选 `viewportY`/`zoom` props，默认 26/1） |
| `components/demo/hydraulic-hub/HydraulicHubNode.vue` | source / wheel·service（共用 panel 分支，240/300 双高度）/ asset / app / stage 渲染分支 |
| `components/demo/hydraulic-hub/HydraulicHubCurveEdge.vue` | 贝塞尔渐变 Edge（入站/出站双色阶，`data.outbound` 切换） |
| `pages/solutions/water.vue` | 裸占位帧 → Flow 接入（560px 共享帧，格子背景保留，`:viewport-y="16"` 居中） |
| `scripts/harness/checks/solutions-hydraulic.mjs` | 裸帧字符串断言替换为接入锁 |
| `tests/visual/site/solutions/hydraulic.contract.ts` | 同步接入契约（页面结构 + flow 默认值与双轮 label 锁） |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.38): add hydraulic knowledge hub flow |
| Commit Hash | |

## 完成说明
已完成智慧水利解决方案页「智慧水利知识中枢能力图」并接入 `/solutions/water`：双轨汇聚拓扑——上轨数据轮（数据源 ×3 → 数曜·数据轮 → 统一数据底座）、下轨知识轮（知识源 ×3 → 博曜·知识轮 → 水利知识资产），双轨在画布正中汇聚为 博曜·知识服务 → 智曜·智能决策 → 右列「四预」应用 ×4（智能预报 / 智能预警 / 数字预演 / 预案推荐），完整复现副标题「数据治理 → 知识构建 → 知识服务 → 智能决策」能力链。五枚无序号阶段 pill：数据治理 / 知识构建 压双轨连接器，知识服务 / 智能决策 / 四预支撑 压中轴连接器。虚线叠板 = 处理平台、实线卡 = 资产库的视觉语义分层；tone 色板新增 amber。保留 `ProductSystemFlowFrame` 格子背景，1704px 画布内盒居中，内容跨度 508 < 560 帧高 → zoom=1、`:viewport-y="16"` 完整垂直居中。历史事件场景图标原拟 `History` 经 d.ts 核验缺失，替换为 `Archive`，其余 24 枚核验通过。锁同步：`solutions-hydraulic.mjs` / `hydraulic.contract.ts` 裸帧字符串断言替换为接入断言（含 flow `viewportY: 26` 默认值锁与双轮 label 锁）。

验证结果：
- `pnpm lint`：通过（一次通过，无返工）
- `pnpm typecheck`：通过（一次通过，wheel/service 同构接口共用分支显式收窄）
- `pnpm test`：通过（19 文件 / 136 用例）
- `pnpm test:visual`：通过（54 用例，含更新后的 hydraulic 契约）
- `pnpm harness:engineering`：通过（文档定稿后复跑仍通过）
- SSR 验证：`/solutions/water` 返回 200，`智慧水利知识中枢能力图` aria-label ×1、`product-system-flow-frame--grid` ×1、`h-[560px] w-[1704px]` ×1、`hydraulic-system-title` ×2 齐全（fallback-text 因 SSR 已渲染 slot 内容而不出现，与 boyao/manufacturing 先例一致）；`/`、`/solutions/manufacturing`、`/products/data-development`、`/products/knowledge-base` 回归 200；3 个新组件 + 页面共 4 个模块经 Vite 拉取 transform 零错误；dev 日志 ERROR 计数 0（typecheck 后重启的全新实例）
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.35/36/37 一致）
