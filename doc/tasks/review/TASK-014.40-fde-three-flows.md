# TASK-014.40：FDE 解决方案页三张 Vue Flow 能力图（解决方案 / 工作模式 / 交付流程）
---
* TaskName：FDE 解决方案页三张 Vue Flow 能力图
* TaskDescription：为 FDE 解决方案页三个占位帧接入 Vue Flow：①解决方案架构图（以数曜、博曜、智曜为基础能力底座，构建场景识别 → 数据连接 → 原型验证 → 系统集成与生产上线整体流程）②FDE 工作模式流程图（六阶段卡片动态连接线单向主链）③交付流程图（四阶段面板 + 里程碑 + 交付物）。
* TaskCreator：Codex
* TaskCreationTime：2026-09-18
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.40 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
将 `/solutions/fde`（别名 `/services/enterprise-ai-delivery`）`FdePageContent.vue` 中三处裸 `ProductSystemFlowFrame` 占位帧替换为真实 Vue Flow 能力图。遵循用户既定设计规则（横向拓扑、阶段名融入流程不带序号、无独立 header 节点、保留格子背景、画布居中）与本轮用户反馈调整：
1. **解决方案架构图**：以数曜、博曜、智曜三大产品为基础能力底座，向上构建「场景识别 → 数据连接 → 原型验证 → 系统集成与生产上线」整体流程（替换初版双团队汇聚拓扑）。
2. **工作模式流程图**：仅保留 6 张阶段卡片经动态连接线依次串联，去掉顶部回流连接线与「真实反馈 · 持续迭代」pill（简化初版闭环拓扑）。
3. **交付流程图**：四阶段面板 + 阶段间里程碑 + 底部交付物芯片（保持初版设计）。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/fde.md`
- `doc/tasks/review/TASK-014.39-education-agent-base-flow.md`（同轮先例）

## 实现内容
### 1. FdeSolutionFlow —— 基础能力底座 → 四段交付主链（按用户反馈重构）
- **上排 · 四段 320×250 实线面板**（y=40，x：32/472/912/1352，段间连接区各 120）：
  - 场景识别（violet，Target，「与业务共同定义问题」）：业务现场调研·深入流程与系统（Users）/ 高价值场景筛选·与业务专家共创（Target）/ 价值目标定义·可量化验收口径（Crosshair）
  - 数据连接（cyan，Database，「多源数据与知识接入」）：多源数据接入·统一采集治理融合（Database）/ 企业知识构建·业务知识库沉淀（BookOpen）/ 业务上下文化·为 AI 提供高质量上下文（Braces）
  - 原型验证（emerald，FlaskConical，「用真实数据验证价值」）：快速原型构建·可运行 AI 原型（ToyBrick）/ 真实数据验证·数据驱动价值确认（CircleCheck）/ 技术可行性确认·评估生产可用性（ScanEye）
  - 系统集成与生产上线（blue，Rocket，「生产级工程与运行」）：企业系统集成·嵌入既有业务流程（Cable）/ 安全权限合规·权限 · 安全 · 成本（ShieldCheck）/ 生产上线运行·监控与可观测（Gauge）
- **下排 · 1640×150 虚线叠板底座**（32,396）：pill「DeepTrols 基础能力」+ 注脚「数曜 × 博曜 × 智曜 · 数据、知识与智能体底座」，内嵌三张 logo 产品卡——数曜 ｜ 数智基建（数据治理 · 标签 · 开发平台，shuyao-logo）/ 博曜 ｜ 知识中枢（企业级知识管理平台，boyao-logo）/ 智曜 ｜ 智能引擎（AgentOS · Agent 基础设施平台，zhiyao-logo）
- **连线 7 条**：3 条段间入站边（主链）+ 4 条底座→各段纵向出站支撑边——底座渲染 4 个按百分比定位的 Top source handle（`!left-[9.76%]/[36.59%]/[63.41%]/[90.24%]`，id support-1..4）精确对齐各段中心，各段 Bottom target handle id `support`；纵向对齐边天然渲染为直线（sx=tx 退化贝塞尔）
- 垂直几何：跨度 40 → 554（底座虚线层底 546+8）= 514；默认 `viewportY: -7`（580px Demo 惯例），页面传 `:viewport-y="-17"`（(560−514)/2 − 40）

### 2. FdeWorkModeFlow —— 六阶段单向主链（按用户反馈简化）
- 六张 220×240 实线阶段卡（y=150，x：0/297/594/890/1187/1484，卡间连接区各 77）：业务问题识别（violet，Target）→ 场景定义与设计（blue，LayoutTemplate）→ 数据与知识连接（cyan，Database）→ 快速原型验证（emerald，FlaskConical）→ 系统集成与上线（amber，Rocket）→ 生产运行迭代（pink，RefreshCw），每卡 3 行文字芯片
- **仅 5 条动态连接线**（入站渐变边）依次串联；按用户反馈删除顶部回流 lane、「真实反馈 · 持续迭代」pill、节点 loop handles 及 `FdeWorkModeReturnEdge.vue` 文件
- 垂直几何：跨度 150 → 390 = 240；默认 `viewportY: 20`，页面传 `:viewport-y="10"`

### 3. FdeDeliveryFlow —— 四阶段面板 + 里程碑 + 交付物（初版设计保持）
- 四张 320×280 实线面板（y=40，x：0/461/923/1384）：需求诊断（violet，Compass）/ 联合验证（blue，FlaskConical）/ 工程交付（emerald，Rocket）/ 持续迭代（pink，RefreshCw），各含 3 行「图标 + 标签 + 注脚」芯片
- 阶段间连接器上压 3 枚 amber 里程碑 pill（y=163，x：325/787/1248）：场景清单确认（Flag）/ 原型价值验证（CircleCheck）/ 生产上线验收（ClipboardCheck）
- 底部 4 张交付物 tone 芯片（y=380，Package）：场景清单与价值目标 / 验证报告与可运行原型 / 生产系统与运维方案 / 迭代计划与扩展路线，由 4 条纵向出站边从各面板 Bottom 下连
- 连线 7 条：3 入站主链 + 4 出站立牌下发；垂直几何：跨度 40 → 428 = 388；默认 `viewportY: 56`，页面传 `:viewport-y="46"`

### 页面接入与锁
- `components/solution/fde/FdePageContent.vue` 三处裸帧替换为共享 recipe（`w-[min(1704px,100%)]` 外层 > `absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate` 内盒 > `ClientOnly` + fallback），格子背景默认开启；label 走数据驱动 `:label="fdeSolutionLabel/fdeWorkModeLabel/fdeDeliveryLabel"` + `:fallback-text="\`${label}加载中\`"` 模板字面量
- 锁同步：`scripts/harness/checks/solutions-fde.mjs`（单帧断言 → 16 段接入链，viewport-y 锁随用户反馈更新为 `-17`/`10`/`46`）；`tests/visual/site/solutions/fde.contract.ts`（新增三个 flow readComponent：solutionFlow 锁 `viewportY: -7`、`DeepTrols 基础能力`、`数曜 ｜ 数智基建`、`博曜 ｜ 知识中枢`、`智曜 ｜ 智能引擎`、`场景识别`、`系统集成与生产上线`；workModeFlow 锁 `viewportY: 20` 且 `not.toContain('fdeWorkModeReturn')`；deliveryFlow 锁 `viewportY: 56`、`需求诊断`、`场景清单确认`）
- Flow 组件置于 `components/demo/fde-solution|fde-work-mode|fde-delivery/`，不注册 harness sources / required-files（既有 Demo 组件先例）

### 图标清单（全部 lucide，d.ts 核验通过；Code2/CheckCircle2 该版本缺失 → 使用 Code/CircleCheck）
解决方案：Users / Target / Crosshair / Database / BookOpen / Braces / FlaskConical / ToyBrick / CircleCheck / ScanEye / Rocket / Cable / ShieldCheck / Gauge；工作模式：Target / LayoutTemplate / Database / FlaskConical / Rocket / RefreshCw；交付：Compass / Users / Target / ClipboardCheck / Database / ToyBrick / CircleCheck / Rocket / Cable / ShieldCheck / Gauge / RefreshCw / MessageSquareText / SlidersHorizontal / Sparkles / Flag / Package。品牌 logo：shuyao / boyao / zhiyao 各 ×1（FDE 服务本身无 logo，流程 pill 用纯文字样式）。

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
| `components/demo/fde-solution/FdeSolutionFlow.client.vue` | 解决方案架构图数据（底座 → 四段主链；默认 `viewportY: -7`） |
| `components/demo/fde-solution/FdeSolutionNode.vue` | stage（320×250 实线面板）/ foundation（1640×150 虚线底座，4 个百分比定位 Top handle）渲染分支 |
| `components/demo/fde-solution/FdeSolutionCurveEdge.vue` | 贝塞尔渐变 Edge（入站/出站双色阶） |
| `components/demo/fde-work-mode/FdeWorkModeFlow.client.vue` | 六阶段单向主链数据（默认 `viewportY: 20`；已按反馈移除回流边与 pill） |
| `components/demo/fde-work-mode/FdeWorkModeNode.vue` | phase 单一渲染分支（已按反馈移除 stage 分支与 loop handles） |
| `components/demo/fde-work-mode/FdeWorkModeCurveEdge.vue` | 贝塞尔渐变 Edge |
| `components/demo/fde-work-mode/FdeWorkModeReturnEdge.vue` | **已删除**（按用户反馈去掉顶部回流连接线） |
| `components/demo/fde-delivery/FdeDeliveryFlow.client.vue` | 交付流程数据（面板 + 里程碑 + 交付物；默认 `viewportY: 56`） |
| `components/demo/fde-delivery/FdeDeliveryNode.vue` | panel / milestone / deliverable 渲染分支 |
| `components/demo/fde-delivery/FdeDeliveryCurveEdge.vue` | 贝塞尔渐变 Edge |
| `components/solution/fde/FdePageContent.vue` | 三处裸帧 → Flow 接入（560px 共享帧，`:viewport-y="-17"/"10"/"46"` 居中） |
| `scripts/harness/checks/solutions-fde.mjs` | 单帧断言 → 接入锁链 |
| `tests/visual/site/solutions/fde.contract.ts` | 同步接入契约（页面结构 + 三个 flow 默认值与 label 锁） |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.40): add fde solution, work-mode and delivery flows |
| Commit Hash | |

## 完成说明
已完成 FDE 解决方案页三张能力图并接入 `/solutions/fde`（别名 `/services/enterprise-ai-delivery`）。按用户本轮反馈完成两项调整：①解决方案架构图重构为「基础能力底座 → 四段交付主链」拓扑——下排虚线底座内嵌数曜（数智基建）、博曜（知识中枢）、智曜（智能引擎）三张 logo 产品卡，经四条对齐各段中心的纵向出站边向上支撑「场景识别 → 数据连接 → 原型验证 → 系统集成与生产上线」主链；②工作模式流程图简化为六张阶段卡 + 5 条动态连接线的单向主链，删除顶部回流连接线与「真实反馈 · 持续迭代」pill（`FdeWorkModeReturnEdge.vue` 一并移除）。交付流程图保持四阶段面板 + 三枚 amber 里程碑 + 四张交付物芯片设计。三帧均保留 `ProductSystemFlowFrame` 格子背景，1704px 画布内盒居中，`:viewport-y` 分别为 -17 / 10 / 46。全部 lucide 图标 d.ts 核验通过（Code2/CheckCircle2 缺失 → Code/CircleCheck 替代）。锁同步：`solutions-fde.mjs` 16 段接入链 + `fde.contract.ts` 三个 flow 默认值与 label 锁（含 `not.toContain('fdeWorkModeReturn')` 反向锁）。

验证结果：
- `pnpm lint`：通过（反馈重构后复跑仍通过）
- `pnpm typecheck`：通过（EXIT=0，三任务合并终验一次通过）
- `pnpm test`：通过（19 文件 / 136 用例）
- `pnpm test:visual`：通过（54 用例，含更新后的 fde 契约）
- `pnpm harness:engineering`：通过（文档定稿后复跑仍通过）
- SSR 验证：`/solutions/fde` 与 `/services/enterprise-ai-delivery` 均返回 200，`FDE 解决方案能力图` / `FDE 工作模式能力图` / `FDE 交付流程能力图` aria-label 各 ×1、`product-system-flow-frame--grid` ×3、`h-[560px] w-[1704px]` ×3 齐全；回归路由 200；9 个新/改组件模块经 Vite 拉取 transform 200 零错误；dev 日志 ERROR 计数 0
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36/37/38 一致）
