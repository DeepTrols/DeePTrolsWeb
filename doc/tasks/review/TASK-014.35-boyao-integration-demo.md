# TASK-014.35：博曜系统集成架构 Demo
---
* TaskName：博曜系统集成架构 Demo
* TaskDescription：为博曜·企业级知识管理平台新增「系统集成」能力独立 Vue Flow Demo，体现 集成 → 采集 → 调用 主链路。
* TaskCreator：Codex
* TaskCreationTime：2026-09-18
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.35 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
以独立 Demo 形式（不接入业务页面）呈现博曜·企业级知识管理平台的系统集成能力：强大的集成引擎从异构系统自动采集知识文档，形成整个组织的统一知识文档库，同时为异构系统提供知识文档调用服务。按 `architecture-flow` skill 的房屋风格自主设计，并与既有 `knowledge-hub` Demo（博曜平台总架构）在拓扑上明确差异化。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/tasks/review/TASK-014.34-device-agent-architecture-demo.md`（最近同类先例）

## 实现内容（第三轮定稿版：横向对称闭环）
1. **横向五段对称闭环拓扑**（与 knowledge-hub 单向管线的核心差异化）：
   - **左排 · 异构系统 ×5**（220×48 源卡，tone 五色，采集端）：OA 办公系统 / ERP 经营系统 / CRM 客户系统 / MES 生产系统 / 网盘与文件库
   - **博曜 · 集成引擎**（170×260 虚线三层叠板 + boyao logo pill）：连接器管理 / 自动采集 / 增量同步 / 权限映射
   - **博曜 · 知识文档库**（240×460 集群卡，画布正中 x=732）：组织统一文档库（全文索引 / 向量化 tags）+ 研发文档 / 营销资料 / 制度规范 / 合同档案 + `......` + 末节点「文档空间 N」opacity-70
   - **博曜 · 调用服务网关**（170×260 虚线叠板，镜像引擎）：开放 API / SDK 集成 / Webhook 推送 / 统一鉴权
   - **右排 · 同一批异构系统的内嵌调用端点 ×5**（220×56 双行卡，图标与 tone 与左排一一镜像，形成「从异构系统采集、向异构系统回送」闭环）：OA·知识门户 / ERP·智能助手 / CRM·文档侧栏 / MES·工艺知识库 / 网盘·全局搜索
2. **阶段标签融入流程**（用户要求：不置顶、无序号、不加 header）：`系统集成`（266,243）/ `统一采集`（607,243）/ `开放调用`（1018,243）三枚白底不透明 pill 节点，分别压在 源→引擎 / 引擎→文档库 / 文档库→网关 三段连接器上，成为流程本身的注解。
3. 连线全部为贝塞尔渐变边（入站 1.5px / 出站 2px，`data.outbound` 切换双色阶）：5 条扇入 + 引擎→文档库 + 文档库→网关（出站起）+ 5 条扇出至端点，共 12 条。
4. 统一 1704px 画布：节点宽 220+170+240+170+220=1020，四段连接区各 171；节点 x：0 / 391 / 732 / 1143 / 1484（文档库居中 852，画布对称）。
5. 垂直几何：内容跨度 30（文档库顶）→ 498（文档库虚线叠层底 490+8），跨度 468；容器 `h-[580px]`，viewport `{ x: 0, y: 26, zoom: 1 }` 垂直居中。
6. Demo 页不渲染格子背景；Demo 组件不注册 harness / 视觉契约（既有 Demo 先例）。
7. 独立 Demo 路由 `/demo/boyao-integration`（`layout: false` + noindex）。
8. **页面接入**（追加）：`/products/knowledge-base` 的「系统集成」section（`BoyaoIntegrationSection.vue`）由占位符替换为本 Flow——沿用同页 `BoyaoArchitectureSection`（knowledge-hub 接入）先例：`ProductArchitectureSection`（560px 共享帧，格子背景默认开启，未传 `:grid="false"`）> `w-[min(1704px,100%)]` 外层 > `absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate-x-1/2 -translate-y-1/2` 内盒居中 > `ClientOnly` + fallback。Flow 新增可选 `viewportY`/`zoom` props（默认 26/1 = Demo 值，demo 页零变化）；页面接入传 `:viewport-y="16"`（内容跨度 468 < 560，zoom=1 即可完整居中：(560−468)/2 − 30 = 16）。label「博曜系统集成架构图」/ fallback-text「系统集成架构图加载中」。锁同步：`tests/visual/site/boyao.contract.ts` 新增接入契约块（含 `viewportY: 26` 默认值锁）。

### 图标清单（全部 lucide，d.ts 核验通过）
FileText / Factory / Users / Cpu / HardDrive（左排源卡与右排端点卡镜像复用）；Cable / Download / RefreshCw / KeyRound（引擎条目）；Globe / Braces / Webhook / ShieldCheck（网关条目）；Search / DatabaseZap（文档库 tags）。品牌 logo：`assets/images/brand/boyao-logo.svg`（引擎 / 网关 / 文档库 pill）。

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
| `components/demo/BoyaoIntegrationDemo.client.vue` | 1704px 独立 Demo 画布（580px 高） |
| `components/demo/boyao-integration/BoyaoIntegrationFlow.client.vue` | Vue Flow 节点、坐标与业务数据（横向对称闭环拓扑；可选 `viewportY`/`zoom` props，默认 26/1） |
| `components/demo/boyao-integration/BoyaoIntegrationNode.vue` | stage / source / endpoint / engine·gateway（共用分支）/ library 五种渲染分支 |
| `components/demo/boyao-integration/BoyaoIntegrationCurveEdge.vue` | 贝塞尔渐变 Edge（入站/出站双色阶，`data.outbound` 切换；userSpaceOnUse 渐变天然支持纵向连线，零改动） |
| `pages/demo/boyao-integration.vue` | 独立演示路由 |
| `components/product/boyao/BoyaoIntegrationSection.vue` | 页面接入：`/products/knowledge-base`「系统集成」section 占位符 → Flow（560px 共享帧，格子背景保留，`:viewport-y="16"` 居中） |
| `tests/visual/site/boyao.contract.ts` | 新增接入契约块（section 结构 + `viewportY: 26` 默认值锁） |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.35): add boyao integration architecture demo |
| Commit Hash | |

## 完成说明
已完成博曜系统集成架构独立 Demo（仅生成 Demo，不接入任何业务页面；Demo 页不渲染格子背景）。

**返工记录**：
- 第二轮：首版四段横向流（左源卡 → 引擎 → 集群卡 → 右列三张应用卡 + 顶部阶段 pill）被反馈与 `knowledge-hub` Demo 重合度过高，且要求阶段标签融入流程；曾改为纵向三段「集成总线」拓扑（1400×820）。
- 第三轮（定稿）：用户明确 ① 必须横向、② 阶段标签不带 123 序号、③ 不要 header 等额外元素。最终采用**横向五段对称闭环**：左排异构系统 ×5 → 集成引擎 → 知识文档库（画布正中）→ 调用服务网关（镜像引擎）→ 右排同一批异构系统的内嵌调用端点 ×5，两端镜像表达「采集进来、调用回去」闭环——与 knowledge-hub 的「收敛后发散」单向管线在拓扑上明确区分；阶段标签为三枚无序号白底 pill（系统集成 / 统一采集 / 开放调用）压在对应连接器上；画布回到 1704×580。

**追加页面接入**：按用户要求将 Flow 引入 `/products/knowledge-base`「系统集成」section（`BoyaoIntegrationSection.vue`），保留 `ProductSystemFlowFrame` 格子背景（未传 `:grid="false"`），1704px 画布经 `absolute left-1/2 top-1/2 -translate` 内盒居中；内容跨度 468 < 560 帧高，zoom=1、`:viewport-y="16"` 即完整垂直居中（沿用同页 `BoyaoArchitectureSection` 先例，仅 device-agent 因跨度 565>560 才需 0.98 缩放）。Flow 增加可选 `viewportY`/`zoom` props，默认值即 Demo 值（26/1），demo 页零变化。锁同步：`boyao.contract.ts` 新增接入契约块。接入后验证：lint / typecheck / test（19 文件 136 用例）/ test:visual（54 用例）/ harness 全部通过；SSR `/products/knowledge-base` 200 且 `博曜系统集成架构图` aria-label、`product-system-flow-frame--grid`、`h-[560px] w-[1704px]` 标记齐全，`/demo/boyao-integration` 回归 200；dev 日志无新增组件错误（仅全站既有 Hydration 警告模式）。

验证结果（第三轮定稿版）：
- `pnpm lint`：通过（一次通过，无返工）
- `pnpm typecheck`：通过（一次通过，判别联合全部显式 `v-if/v-else-if` 收窄，engine/gateway 共用分支为同构接口）
- `pnpm test`：通过（19 文件 / 135 用例）
- `pnpm test:visual`：通过（53 用例）
- `pnpm harness:engineering`：通过
- SSR 验证：`/demo/boyao-integration` 返回 200，标题与 `min-w-[1704px]` / `h-[580px]` / aria-label 标记齐全；`/`、`/demo/knowledge-hub` 回归 200；三个组件模块经 Vite 拉取 transform 零错误；dev 日志中四条 Unhandled rejection（Users 未导入 ×1、flags ×1、index ×2）均为分步写入时 HMR 新旧版本错配的瞬时产物，最终代码零 `index`/`stage.index` 残留引用，定稿后无新增错误
