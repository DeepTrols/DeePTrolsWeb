# TASK-014.36：数曜统一数据开发流程图
---
* TaskName：数曜统一数据开发流程图
* TaskDescription：为数曜·数据开发平台「统一数据开发」section 的占位帧接入 Vue Flow 流程图，体现 接入 → 解析 → 编排 → 交付 → 数据资产 主链路。
* TaskCreator：Codex
* TaskCreationTime：2026-09-18
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.36 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
将 `/products/data-development`「统一数据开发：从接入到交付」section（`DdpUnifiedDevelopmentSection.vue`）中既有的 `ProductSystemFlowFrame` 占位帧替换为真实 Vue Flow 流程图：覆盖数据接入、开发、编排与持续交付全流程，为企业持续输出高质量数据资产。按 `architecture-flow` skill 房屋风格自主设计，遵循用户既定设计规则（横向拓扑、阶段名融入面板不带序号、无独立 header 节点、页面接入保留格子背景并居中）。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/tasks/review/TASK-014.35-boyao-integration-demo.md`（最近同类先例：页面接入 recipe + viewportY/zoom props 模式）

## 实现内容
1. **横向六列管线拓扑**：
   - **左排 · 数据源 ×5**（220×48 源卡，tone 五色）：业务数据库 / 消息队列 / 业务系统 / 数据湖 / 文件与日志
   - **四阶段面板 ×4**（200×300 虚线三层叠板，y=110，阶段名即面板头 shuyao logo pill，无序号）：
     - 统一数据接入：多源连接器 / 实时同步 / 批量采集 / 接入监控
     - 智能数据解析：智能解析 / 数据清洗 / 转换分类 / 口径统一
     - 可视化编排：DAG 编排 / 拖拽构建 / 智能调度 / 依赖管理
     - 持续交付：开发测试 / 发布上线 / 运行监控 / 异常告警
   - **数曜 · 数据资产**（240×460 集群卡，画布最右 x=1464）：统一资产目录（全域检索 / 血缘追溯 tags）+ 数仓模型 / 指标体系 / 标签库 / 数据服务 + `......` + 末节点「资产空间 N」opacity-70
   - 四阶段与 `data/ddp.ts` 的 `ddpUnifiedDevelopmentItems`（01-04 功能卡）文案一一对应，图卡互补不重复编号
2. 连线全部为贝塞尔渐变边（入站 1.5px / 出站 2px，`data.outbound` 切换双色阶）：5 条扇入 + 3 条阶段间 + 持续交付→数据资产（出站），共 9 条。
3. 统一 1704px 画布：节点宽 220+200×4+240=1260，五段连接区各约 89；节点 x：0 / 309 / 597 / 886 / 1174 / 1464。
4. 垂直几何：内容跨度 30（资产集群顶）→ 498（集群虚线叠层底 490+8），跨度 468；Flow 可选 `viewportY`/`zoom` props（默认 26/1，沿用 boyao-integration 模式）；页面接入 560px 帧传 `:viewport-y="16"`（(560−468)/2 − 30 = 16，zoom=1 完整居中）。
5. **页面接入**：`DdpUnifiedDevelopmentSection.vue` `#after` 槽内保留 `ProductFeatureGridSection` + `mt-12 lg:mt-16` 外层与 `ProductSystemFlowFrame`（格子背景默认开启），帧内按共享 recipe：`w-[min(1704px,100%)]` 外层 > `absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate` 内盒居中 > `ClientOnly` + fallback。label「统一数据开发流程图」/ fallback-text「统一数据开发流程图加载中」。
6. Flow 组件置于 `components/demo/ddp-unified-development/`（沿用 knowledge-hub / boyao-integration 目录先例），不注册 harness sources / required-files（既有 Demo 组件先例）；不建独立 Demo 路由（本任务为页面直挂）。
7. 锁同步：`scripts/harness/checks/product-data/ddp.mjs` 与 `tests/visual/product-data/ddp.contract.ts` 中占位符断言替换为接入断言（含 `viewportY: 26` 默认值锁）。

### 图标清单（全部 lucide，d.ts 核验通过；数据湖原拟 Waves 经核验该版本缺失，替换为 Cloud）
Database / Radio / AppWindow / Cloud / ScrollText（数据源）；Cable / Zap / Download / Activity（接入）；ScanText / Droplets / Shuffle / Scale（解析）；Workflow / LayoutTemplate / CalendarClock / GitBranch（编排）；FlaskConical / Rocket / Gauge / Siren（交付）；Search / Network（资产 tags）。品牌 logo：`assets/images/brand/shuyao-logo.svg`（阶段面板 / 资产集群 pill）。

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
| `components/demo/ddp-unified-development/DdpUnifiedDevelopmentFlow.client.vue` | Vue Flow 节点、坐标与业务数据（横向六列管线；可选 `viewportY`/`zoom` props，默认 26/1） |
| `components/demo/ddp-unified-development/DdpUnifiedDevelopmentNode.vue` | source / stage / assets 三种渲染分支（判别联合显式 v-if 收窄） |
| `components/demo/ddp-unified-development/DdpUnifiedDevelopmentCurveEdge.vue` | 贝塞尔渐变 Edge（入站/出站双色阶，`data.outbound` 切换） |
| `components/product/ddp/DdpUnifiedDevelopmentSection.vue` | 占位帧 → Flow 接入（560px 共享帧，格子背景保留，`:viewport-y="16"` 居中） |
| `scripts/harness/checks/product-data/ddp.mjs` | 统一数据开发断言块替换占位符锁为接入锁 |
| `tests/visual/product-data/ddp.contract.ts` | 同步接入契约（section 结构 + flow `viewportY: 26` 默认值锁） |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.36): add ddp unified development flow |
| Commit Hash | |

## 完成说明
已完成数曜·数据开发平台「统一数据开发」流程图并接入 `/products/data-development`：横向六列管线（数据源 ×5 → 统一数据接入 → 智能数据解析 → 可视化编排 → 持续交付 → 数曜·数据资产集群卡），四阶段名作为面板头 pill（shuyao logo，无序号、无独立 header 节点），9 条贝塞尔渐变边（末段出站双色阶）。`DdpUnifiedDevelopmentSection.vue` `#after` 槽占位帧替换为 Flow，保留 `ProductSystemFlowFrame` 格子背景（未传 `:grid="false"`），1704px 画布经内盒 `absolute left-1/2 top-1/2 -translate` 居中；内容跨度 468 < 560 帧高，zoom=1、`:viewport-y="16"` 完整垂直居中（沿用 boyao-integration 先例）。图标核验：原拟数据湖图标 `Waves` 在当前 lucide 版本 d.ts 中缺失，替换为已核验的 `Cloud`，其余 22 枚全部核验通过。锁同步：`ddp.mjs` / `ddp.contract.ts` 占位符断言替换为接入断言（含 flow `viewportY: 26` 默认值锁）。

验证结果：
- `pnpm lint`：通过（一次通过，无返工）
- `pnpm typecheck`：通过（一次通过，判别联合三分支显式 `v-if/v-else-if` 收窄）
- `pnpm test`：通过（19 文件 / 136 用例）
- `pnpm test:visual`：通过（54 用例，含新接入契约）
- `pnpm harness:engineering`：通过
- SSR 验证：`/products/data-development` 返回 200，`统一数据开发流程图` aria-label ×1、`product-system-flow-frame--grid` ×2（含 DdpArchitecture）、`h-[560px] w-[1704px]` ×2、`ddp-unified-development-title` ×2 齐全，旧「统一数据开发流程图占位」0 残留（页面其余 8 处「图片占位符」为其他 section 特性卡既有内容，与本任务无关）；`/`、`/products/knowledge-base`、`/demo/boyao-integration` 回归 200；三个新组件 + section 共 4 个模块经 Vite 拉取 transform 零错误；dev 日志 ERROR 计数 0（typecheck 后重启的全新实例）
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.35 一致）
