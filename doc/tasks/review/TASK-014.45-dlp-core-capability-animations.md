# TASK-014.45：数曜·数据标签平台核心能力动画
---
* TaskName：DLP 核心能力区五组动画（标签建模/生产/治理/服务/场景应用）
* TaskDescription：将数曜·数据标签平台页面「核心能力 · 让每一个标签创造价值」交替时间线（AlternatingTimelineSection + dlpTimelineItems ×5）的五个图片占位符替换为标签建模、标签生产、标签治理、标签服务、场景应用五组循环动画。
* TaskCreator：User
* TaskCreationTime：2026-09-21
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.45 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

## 任务目标
在不改变现有 Section 标题、间距、文案和左右交替布局的前提下，以统一状态机（useRuntimeTimeline 循环时间轴 + 1.2s 终态停留）和固定高度面板呈现五项标签平台核心能力。用户指定配方 `$product-capability-animation`（技能文件已不存在，以 TASK-006.7 DGP evolution 先例为事实配方）。

## 前置文档
- `AGENTS.md`
- `doc/tasks/review/TASK-006.7-dgp-evolution-capability-animations.md`（配方先例）
- `components/product/dgp/evolution/*`（面板与 Stepper 视觉先例）
- `components/product/device-agent/useRuntimeTimeline.ts`（统一状态机）

## 实现内容
1. `AlternatingTimelineSection`：视觉格新增 `#visual="{ item, index }"` scoped slot，原占位符（grid 底纹 + 图片占位符文案）转为 fallback 并内聚 `role="img"`/aria-label；DMS 等未提供 slot 的用法渲染保持不变。
2. 新建 `components/product/dlp/capability/`：
   - `DlpTagModelingVisual`（标签建模）：三张标签模型卡（customer/visit_count 基础、order_amount 规则、high_value_flag 组合）逐个点亮 + Stepper 目录规划→口径定义→规范校验→模型发布。
   - `DlpTagProductionVisual`（标签生产）：三条任务行（用户活跃 实时/价值分层/流失预警 离线）进度条经 `getRuntimeBarWidthClass` 依次填满 + Stepper 规则配置→依赖调度→离线计算→实时更新。
   - `DlpTagGovernanceVisual`（标签治理）：质量分 72→98 增长、血缘链（源表→加工任务→业务标签）逐节点点亮、版本 pill v1.0→v1.2 + Stepper 血缘追踪→质量监测→版本管理→生命周期。
   - `DlpTagServiceVisual`（标签服务）：标签 chips（高活跃/高价值/近期活跃）→ 统一服务网关 → API 查询/批量输出/人群圈选依次点亮，QPS 0→860 + Stepper 服务注册→权限审批→API 发布→调用监控。
   - `DlpScenarioApplyVisual`（场景应用）：用户画像/精准营销/风险识别/AI 模型四卡依次点亮，覆盖人群 0→1280 万 + Stepper 人群圈选→画像洞察→策略执行→效果回流。
   - `DlpCapabilityVisual`：index → 五组件分发（DgpEvolutionVisual 同款）。
3. 动画统一 `useRuntimeTimeline(6000)` 循环 + `activeStep`（500ms 起每 1200ms 一步）+ `finished = elapsed >= 5300`；面板固定 `min-h-[280px] lg:min-h-[360px]`，Tailwind-only、Lucide 图标、无 `<style>`/inline style。
4. `DlpCapabilityTimelineSection` 经 `#visual` 注入分发组件。
5. 应用户要求，五个动画面板顶部统一增加 macOS 窗口红绿灯栏（`flex items-center border-b border-muted px-4 py-3` + 红/黄/绿 `size-3 rounded-full bg-{red,yellow,green}-500/70` 圆点），面板内容改由 `flex flex-1 flex-col p-4 lg:p-5` 容器承载。

### 锁同步
- `required-files.mjs`：新增 capability/ 6 文件。
- `sources.mjs`：新增 `dlpCapabilityVisual` + 5 个 visual 源。
- `checks/product-data/dlp.mjs`：timeline slot 断言 + 分发器断言 + 5 动画内容/无 style 断言。
- `tests/visual/product-data/dlp.contract.ts`：同步（含 AlternatingTimelineSection slot 断言与 5 动画组断言）。

## 验收标准
- [x] 五组动画完成并接入原交替时间线布局
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
| `components/common/AlternatingTimelineSection.vue` | 新增 #visual scoped slot（占位符转 fallback） |
| `components/product/dlp/capability/DlpCapabilityVisual.vue` | 新建：五动画分发器 |
| `components/product/dlp/capability/DlpTagModelingVisual.vue` | 新建：标签建模动画 |
| `components/product/dlp/capability/DlpTagProductionVisual.vue` | 新建：标签生产动画 |
| `components/product/dlp/capability/DlpTagGovernanceVisual.vue` | 新建：标签治理动画 |
| `components/product/dlp/capability/DlpTagServiceVisual.vue` | 新建：标签服务动画 |
| `components/product/dlp/capability/DlpScenarioApplyVisual.vue` | 新建：场景应用动画 |
| `components/product/dlp/DlpCapabilityTimelineSection.vue` | #visual slot 接入分发器 |
| `scripts/harness/{required-files.mjs,sources.mjs,checks/product-data/dlp.mjs}` | 锁同步 |
| `tests/visual/product-data/dlp.contract.ts` | 契约同步 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.45): add DLP core capability animations |
| Commit Hash | |

## 完成说明
五组动画接入既有交替时间线布局，均保持固定高度（280/360px）与 SSR 完整首帧（elapsed=0 静态渲染，客户端 rAF 启动循环）；桌面与移动均无溢出。DMS 页 AlternatingTimelineSection 渲染不变（slot fallback 保持原占位符）。

验证结果：
- `pnpm lint`：通过
- `pnpm typecheck`：通过（初报 `taskProgress[index]` noUncheckedIndexedAccess 三处，改为 `taskProgress(index)` 函数访问后通过）
- `pnpm test`：通过（19 文件 / 137 用例）
- `pnpm harness:engineering`：通过
- SSR 验证：`/products/data-labeling` 200，HTML 含五组动画面板标记（标签模型设计/标签生产任务/标签治理看板/标签服务中心/标签场景应用）；页面残留「图片占位符」仅来自 AI 辅助建标 section（既有，不在本任务范围）
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36~44 一致）
