# TASK-014.39：智慧教育解决方案教育智能体运行底座能力图
---
* TaskName：智慧教育解决方案教育智能体运行底座能力图
* TaskDescription：为智慧教育解决方案页「解决方案」section 的占位帧接入 Vue Flow 能力图，体现基于智曜统一连接大模型、知识、MCP、Tools 与校园业务系统，构建覆盖「教、学、管、服」的教育智能体体系。
* TaskCreator：Codex
* TaskCreationTime：2026-09-18
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.39 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
将 `/services/smart-education`「解决方案 · 构建面向教育业务的 AI 智能体运行底座」section（`pages/services/smart-education.vue` `SectionShell` 内）中既有的裸 `ProductSystemFlowFrame` 占位帧替换为真实 Vue Flow 能力图：基于智曜统一连接大模型、知识、MCP、Tools 与校园业务系统，为教育智能体提供模型调用、任务编排、工具执行和运行治理能力，快速构建覆盖「教、学、管、服」的教育智能体体系，让 AI 从回答问题进一步走向理解任务、调用工具和完成业务。遵循用户既定设计规则（横向拓扑、阶段名融入流程不带序号、无独立 header 节点、保留格子背景、画布居中）。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/education.md`
- `doc/tasks/review/TASK-014.38-hydraulic-hub-flow.md`（最近同类先例）

## 实现内容
1. **三列枢纽辐射拓扑**（首个单一 tall 枢纽 + 2×2 象限结构，与既有 flow 家族明确差异化——knowledge-hub 单向管线 / boyao 对称闭环 / ddp 六列管线 / manufacturing 主链+底部回流 / hydraulic 双轨汇聚）：
   - **左列 · 接入资源 ×5**（220×48 tone 芯片）：大模型服务（BrainCircuit，violet）/ 教育知识库（BookOpen，blue）/ MCP 服务（Plug，emerald）/ Tools 工具集（Wrench，cyan）/ 校园业务系统（School，pink）
   - **中列 · 智曜 统一接入**（412,60，240×420 虚线叠板，zhiyao logo pill）：模型统一接入（Cpu）/ 知识关联接入（BookOpen）/ MCP 协议接入（Plug）/ 工具注册接入（Wrench）/ 系统能力封装（School）
   - **中列 · 智曜 Agent Runtime**（844,90，400×360 虚线叠板，zhiyao logo pill + 右侧注脚「理解任务 · 调用工具 · 完成业务」）：2×2 象限格——模型调用（Cpu，多模型统一调度）/ 任务编排（Workflow，理解 · 规划 · 拆解）/ 工具执行（ToyBrick，MCP · Tools · API）/ 运行治理（ShieldCheck，权限 · 监控 · 审计）
   - **右列 · 教育智能体 ×4**（268×88 双行 tone 卡 + 右上角「教/学/管/服」徽标）：AI 教师助手（Presentation，violet，智能备课 · 教学辅助）/ AI 学习助手（GraduationCap，blue，个性化学习陪伴）/ AI 教务助手（ClipboardList，emerald，教务协同 · 数据洞察）/ AI 校园服务助手（LifeBuoy，pink，统一校园服务入口）
2. **阶段标签融入流程**（无序号、无 header）：`统一连接`（272,242）压资源→接入连接器，`运行底座`（708,242）压接入→Runtime 连接器，`教 · 学 · 管 · 服`（1290,242）压 Runtime→智能体连接器。
3. 连线全部为贝塞尔渐变边（入站 1.5px / 出站 2px，`data.outbound` 切换双色阶）：5 扇入 + 接入→Runtime + 4 扇出至教育智能体（出站），共 10 条。
4. 统一 1704px 画布：节点宽 220+240+400+268=1128，连接区分配后 x：0 / 412 / 844 / 1436。
5. 垂直几何：内容跨度 30 → 488，跨度 458；Flow 可选 `viewportY`/`zoom` props（默认 31/1 对应 580px Demo 容器惯例）；页面接入 560px 帧传 `:viewport-y="21"`（(560−458)/2 − 30 = 21，zoom=1 完整居中）。
6. Flow 组件置于 `components/demo/education-agent-base/`（沿用既有 flow 目录先例），不注册 harness sources / required-files（既有 Demo 组件先例）；不建独立 Demo 路由（页面直挂）。
7. **页面接入**：`pages/services/smart-education.vue` 裸帧替换为带内容的 `ProductSystemFlowFrame`（格子背景默认开启），帧内按共享 recipe：`w-[min(1704px,100%)]` 外层 > `absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate` 内盒居中 > `ClientOnly` + fallback。label「教育智能体运行底座能力图」/ fallback-text「教育智能体运行底座能力图加载中」。
8. 锁同步：`scripts/harness/checks/solutions-education.mjs` 与 `tests/visual/site/solutions/education.contract.ts` 中裸帧字符串断言替换为接入断言（含 flow `viewportY: 31` 默认值锁与「智曜 · 统一接入」「智曜 · Agent Runtime」label 锁）。

### 图标清单（全部 lucide，d.ts 核验通过）
BookOpen / BrainCircuit / ClipboardList / Cpu / GraduationCap / LifeBuoy / Plug / Presentation / School / ShieldCheck / ToyBrick / Workflow / Wrench。品牌 logo：`assets/images/brand/zhiyao-logo.svg` ×2 pill（统一接入 / Agent Runtime）。

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
| `components/demo/education-agent-base/EducationAgentBaseFlow.client.vue` | Vue Flow 节点、坐标与业务数据（三列枢纽辐射拓扑；可选 `viewportY`/`zoom` props，默认 31/1） |
| `components/demo/education-agent-base/EducationAgentBaseNode.vue` | resource / gateway / runtime（2×2 象限）/ agent（教学管服徽标）/ stage 渲染分支 |
| `components/demo/education-agent-base/EducationAgentBaseCurveEdge.vue` | 贝塞尔渐变 Edge（入站/出站双色阶，`data.outbound` 切换） |
| `pages/services/smart-education.vue` | 裸占位帧 → Flow 接入（560px 共享帧，格子背景保留，`:viewport-y="21"` 居中） |
| `scripts/harness/checks/solutions-education.mjs` | 裸帧字符串断言替换为接入锁 |
| `tests/visual/site/solutions/education.contract.ts` | 同步接入契约（页面结构 + flow 默认值与双平台 label 锁） |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.39): add education agent runtime base flow |
| Commit Hash | |

## 完成说明
已完成智慧教育解决方案页「教育智能体运行底座能力图」并接入 `/services/smart-education`：三列枢纽辐射拓扑——左列五类接入资源（大模型服务 / 教育知识库 / MCP 服务 / Tools 工具集 / 校园业务系统）汇入「智曜 · 统一接入」平台，再进入「智曜 · Agent Runtime」运行底座（模型调用 / 任务编排 / 工具执行 / 运行治理 2×2 象限，注脚「理解任务 · 调用工具 · 完成业务」），向右扇出覆盖「教、学、管、服」的四类教育智能体。三枚无序号阶段 pill：统一连接 / 运行底座 / 教 · 学 · 管 · 服。保留 `ProductSystemFlowFrame` 格子背景，1704px 画布内盒居中，内容跨度 458 < 560 帧高 → zoom=1、`:viewport-y="21"` 完整垂直居中。13 枚 lucide 图标 d.ts 核验通过。锁同步：`solutions-education.mjs` / `education.contract.ts` 裸帧断言替换为接入断言（含 flow `viewportY: 31` 默认值锁与双平台 label 锁）。

验证结果：
- `pnpm lint`：通过（一次通过，无返工）
- `pnpm typecheck`：通过（EXIT=0，三任务合并终验一次通过）
- `pnpm test`：通过（19 文件 / 136 用例）
- `pnpm test:visual`：通过（54 用例，含更新后的 education 契约）
- `pnpm harness:engineering`：通过（文档定稿后复跑仍通过）
- SSR 验证：`/services/smart-education` 返回 200，`教育智能体运行底座能力图` aria-label ×1、`product-system-flow-frame--grid` ×1、`h-[560px] w-[1704px]` ×1 齐全（fallback-text 因 SSR 已渲染 slot 内容而不出现，与 hydraulic 先例一致）；`/`、`/solutions/water`、`/solutions/manufacturing`、`/products/data-development` 回归 200；3 个新组件模块经 Vite 拉取 transform 200 零错误；dev 日志 ERROR 计数 0（typecheck 后重启的全新实例）
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36/37/38 一致）
