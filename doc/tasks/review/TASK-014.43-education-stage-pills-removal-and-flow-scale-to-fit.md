# TASK-014.43：教育运行底座阶段 pill 移除与全部架构图自适应缩放
---
* TaskName：education-agent-base 移除 3 枚阶段 pill + 全站流程图 scale-to-fit 自适应（禁止剪裁/横滑）
* TaskDescription：①智慧教育解决方案架构图移除 统一连接/运行底座/教·学·管·服 三枚阶段 pill；②全部生产嵌入位（15 处）由 `w-[min(1704px,100%)]` 裁剪容器改为 `@container` + `scale-[min(1,calc(100cqw/1704px))]` 等比缩放，任何视口不剪裁、不产生横向滚动；③纯图 section（仅标题+帧）在 <1024px 整体隐藏（`max-lg:hidden`）。
* TaskCreator：Claude
* TaskCreationTime：2026-09-20
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.43 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

## 任务目标
1. `EducationAgentBaseFlow`：删除 stage-connect（统一连接，272,242）/ stage-runtime（运行底座，708,242）/ stage-agents（教 · 学 · 管 · 服，1290,242）三个节点；`EducationAgentBaseNode` 同步移除 `StageNodeData` 类型与 stage 渲染分支。
2. 全站架构/流程图自适应：外层 `w-[min(1704px,100%)] overflow-hidden`（窄屏裁右缘）→ `w-full overflow-hidden @container`；内层 1704px 画布追加 `scale-[min(1,calc(100cqw/1704px))]`，容器查询宽度不足时整体等比缩小（Tailwind v4 `translate`/`scale` 为独立 CSS 属性，与 `-translate-x-1/2 -translate-y-1/2` 居中叠加无冲突；浏览器不支持 calc 除法时 scale 声明失效、优雅回退为旧裁剪行为）。
3. 移动端（<1024px）：`ProductSystemFlowFrame` 本就 `display:none`；纯图 section（标题+帧，无其他内容）追加 `max-lg:hidden` 整体隐藏，避免空标题。含 items/卡片的 section 保留（帧自隐、内容仍在）。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/tasks/review/TASK-014.39-education-agent-base-flow.md`（被移除 pill 的引入方）
- `doc/tasks/review/TASK-014.42-knowledge-hub-labels-and-manufacturing-stage-bar.md`（同类阶段 pill 处理先例）

## 实现内容
### 1. education-agent-base 阶段 pill 移除
- `EducationAgentBaseFlow.client.vue`：删除 3 个 stage 节点，头部注释说明阶段语义改由节点与连线承载。
- `EducationAgentBaseNode.vue`：移除 `StageNodeData` interface 与 `v-else-if="data.kind === 'stage'"` 分支，props 联合类型收敛为 4 种。

### 2. scale-to-fit 改造（15 处嵌入位）
统一配方（高度按各位点 460/480/520/560/640 保持）：
```
- <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
+ <div class="relative z-[1] mx-auto h-full w-full overflow-hidden @container">
-   <div class="absolute left-1/2 top-1/2 h-[Hpx] w-[1704px] -translate-x-1/2 -translate-y-1/2">
+   <div class="absolute left-1/2 top-1/2 h-[Hpx] w-[1704px] -translate-x-1/2 -translate-y-1/2 scale-[min(1,calc(100cqw/1704px))]">
```
- 页面级：`pages/solutions/manufacturing.vue`（560，含阶段悬浮条）、`water.vue`（560）、`compute.vue` ×2（560）、`pages/services/smart-education.vue`（560）、`components/solution/fde/FdePageContent.vue` ×3（560）。
- 区块级：`DeviceAgentArchitectureSection`（560）、`DmsArchitecture`（480）、`DlpArchitecture`（640）、`DdpArchitecture`（560）、`DdpUnifiedDevelopmentSection`（560）、`DgpArchitecture`（460，同时修正外层 `w-[min(1600px,100%)]` 与内层 1704 不一致的历史问题）、`TanyaoSolutionSection`（520）、`BoyaoArchitectureSection`（520）、`BoyaoIntegrationSection`（560）。
- `components/home/HomeProductSystem.vue`：外层补 `overflow-hidden @container`，新增 `h-[560px] w-[1600px]` 绝对居中内层 + `scale-[min(1,calc(100cqw/1600px))]`（该图 1600 基准），`DeepTrolsArchitectureFlow` 移入内层。

### 3. 移动端隐藏（max-lg:hidden）
- SectionShell 直挂：`water.vue` hydraulic-system、`smart-education.vue` education-system、`compute.vue` datacenter-solution/datacenter-loop、`FdePageContent.vue` fde-work-mode/fde-delivery。
- ProductArchitectureSection 复用位（类经单根链透传至 SectionShell 根）：DeviceAgent、Dms、Dlp、Ddp、BoyaoArchitecture、BoyaoIntegration。
- `DdpUnifiedDevelopmentSection`：`#after` 内帧包装 `mt-12 lg:mt-16` → `mt-12 max-lg:hidden lg:mt-16`（section 本体含 items 网格，保留）。
- 不隐藏：manufacturing（帧在 ProductFeatureGridSection #before，下方有 items）、Dgp/Tanyao/HomeProductSystem（帧后有 SystemCards/ProductSystemCards）。

### 锁同步
- harness：`solutions-{education,manufacturing,hydraulic,datacenter,fde}.mjs`、`product-aiiot/{tanyao,device-agent-base}.mjs`、`product-data/{dlp,dms,ddp,dgp}.mjs`、`home-layout.mjs` 更新外层类断言并新增 `@container`/`scale-[min(1,calc(100cqw/…))]`/`max-lg:hidden` 锁；`sources.mjs` 新增 `educationAgentBaseFlow` 源，`solutions-education.mjs` 新增 stage pill 移除负向锁。
- tests：`site/solutions/{manufacturing,education,hydraulic,fde,datacenter}.contract.ts`、`site/boyao.contract.ts`、`product-aiiot/{tanyao,device-agent-base}.contract.ts`、`product-data/{dms,dlp,ddp}.contract.ts`、`core.contract.ts` 同步。

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
| `components/demo/education-agent-base/EducationAgentBaseFlow.client.vue` | 移除 3 枚阶段 pill 节点 + 注释 |
| `components/demo/education-agent-base/EducationAgentBaseNode.vue` | 移除 StageNodeData 与 stage 分支 |
| `pages/services/smart-education.vue` | scale-to-fit + section 移动端隐藏 |
| `pages/solutions/{manufacturing,water,compute}.vue` | scale-to-fit（water/compute 含 section 隐藏） |
| `components/solution/fde/FdePageContent.vue` | ×3 scale-to-fit + 2 个独立 section 隐藏 |
| `components/product/device-agent/DeviceAgentArchitectureSection.vue` | scale-to-fit + 隐藏 |
| `components/product/{dms/DmsArchitecture,dlp/DlpArchitecture,ddp/DdpArchitecture}.vue` | scale-to-fit + 隐藏 |
| `components/product/ddp/DdpUnifiedDevelopmentSection.vue` | scale-to-fit + #after 帧移动端隐藏 |
| `components/product/dgp/DgpArchitecture.vue` | scale-to-fit（并修正 1600/1704 不一致） |
| `components/product/{tanyao/TanyaoSolutionSection,boyao/BoyaoArchitectureSection,boyao/BoyaoIntegrationSection}.vue` | scale-to-fit（boyao 两处含隐藏） |
| `components/home/HomeProductSystem.vue` | 1600 基准 scale-to-fit 重构 |
| `scripts/harness/{sources.mjs,checks/*.mjs}` | 锁同步 + 新增 educationAgentBaseFlow 源 |
| `tests/visual/**` | 契约同步（10 文件） |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.43): remove education stage pills and scale all flow diagrams to fit |
| Commit Hash | |

## 完成说明
①智慧教育架构图 3 枚阶段 pill（统一连接/运行底座/教·学·管·服）从画布移除，节点类型联合收敛，阶段语义由三列拓扑与连线承载。②全站 15 处生产嵌入位统一改为 `@container` + `scale-[min(1,calc(100cqw/Wpx))]` 等比缩放：1024–1703px 区间画布随容器宽度整体缩小、无剪裁无横滑；≥1704 时 scale=1 不变；不支持 calc 除法时优雅回退旧裁剪。③纯图 section（仅标题+帧）<1024px 整体 `max-lg:hidden`；含 items/卡片的 section 保留由帧自隐。全部门禁通过。

验证结果：
- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：通过（19 文件 / 137 用例）
- `pnpm harness:engineering`：通过
- SSR 验证：`/`、`/services/smart-education`、`/solutions/{manufacturing,water,compute}`、`/services/enterprise-ai-delivery`、`/products/{knowledge-base,data-governance}` 全部 200；smart-education SSR HTML 含 `max-lg:hidden`/`@container`/`scale-[min(1,calc(100cqw/1704px))]`，无残留 `w-[min(1704px`。
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36~42 一致）
