# TASK-014.46：数曜·数据开发平台核心能力动画
---
* TaskName：DDP 核心能力区四组动画（数据集成/数据开发/任务编排/持续交付）
* TaskDescription：将数曜·数据开发平台页面「核心能力 · 覆盖数据开发全生命周期」交替时间线（AlternatingTimelineSection + ddpTimelineItems ×4）的四个图片占位符替换为数据集成、数据开发、任务编排、持续交付四组循环动画；并应用户要求为 DLP+DDP 全部 9 个能力动画面板统一增加 macOS 窗口红绿灯栏。
* TaskCreator：User
* TaskCreationTime：2026-09-21
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.46 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

## 任务目标
沿用 TASK-014.45 确立的能力动画配方（useRuntimeTimeline 循环时间轴 + 固定高度面板 + 四步 Stepper），在不改变 Section 标题、间距、文案和左右交替布局的前提下呈现 DDP 四项核心能力。动画面板顶部统一加窗口红绿灯栏（用户指定 HTML 结构）。

## 前置文档
- `AGENTS.md`
- `doc/tasks/review/TASK-014.45-dlp-core-capability-animations.md`（配方与 slot 先例）
- `components/product/device-agent/useRuntimeTimeline.ts`（统一状态机）

## 实现内容
1. 新建 `components/product/ddp/capability/`：
   - `DdpDataIntegrationVisual`（数据集成）：MySQL/业务系统/Kafka/数据湖四类连接器依次点亮（Kafka 在 2600~3600ms 呈现 amber 冲突态「增量位点校验 · 自动对齐」），同步百分比 0→100% + Stepper 连接配置→全量同步→增量采集→统一目录。
   - `DdpDataDevelopmentVisual`（数据开发）：低代码/SQL 双模式切换 pill，task_customer_value.sql 三行 SQL（SELECT/FROM/GROUP BY）逐行浮现，随后语法校验通过、运行成功（影响 3 张下游表）+ Stepper 任务创建→代码开发→语法校验→提交运行。
   - `DdpTaskOrchestrationVisual`（任务编排）：DAG 依赖链 数据抽取→数据清洗→聚合加工 依次 等待→运行→成功，计算资源分配条经 `getRuntimeBarWidthClass` 0→100% + Stepper 依赖解析→智能编排→调度执行→资源优化。
   - `DdpContinuousDeliveryVisual`（持续交付）：开发→测试→发布→监控流水线依次点亮，版本徽标 v2.3.0 构建中→已发布，质量门禁行 + Stepper 代码提交→自动测试→发布上线→运行监控。
   - `DdpCapabilityVisual`：index → 四组件分发（DlpCapabilityVisual 同款）。
2. 动画统一 `useRuntimeTimeline(6000)` 循环 + `activeStep`（500ms 起每 1200ms 一步）+ `finished = elapsed >= 5300`；面板固定 `min-h-[280px] lg:min-h-[360px]`，Tailwind-only、Lucide 图标、无 `<style>`/inline style。
3. `DdpCapabilityTimelineSection` 经 `#visual` 注入分发组件，并带 `transparent-visual`（与 DLP 一致）。
4. 窗口红绿灯栏：经脚本化结构变换应用于全部 9 个能力动画面板（DLP×5 + DDP×4）——面板根去掉 padding，插入 `flex items-center border-b border-muted px-4 py-3` 栏（红/黄/绿 `size-3 rounded-full bg-{red,yellow,green}-500/70` 圆点），内容移入 `flex flex-1 flex-col p-4 lg:p-5` 容器。
5. 追加：应用户后续要求，DGP evolution 三个动画（多源数据统一接入/数据标准与质量治理/数据资产沉淀与服务）同样补上窗口红绿灯栏，手法一致；`sources.mjs`/`required-files.mjs`/`checks/product-data/dgp.mjs`/`dgp.contract.ts` 同步补齐三个 evolution visual 源与窗口栏断言。

### 锁同步
- `required-files.mjs`：新增 capability/ 5 文件。
- `sources.mjs`：新增 `ddpCapabilityVisual` + 4 个 visual 源。
- `checks/product-data/ddp.mjs`：timeline slot 断言 + 分发器断言 + 4 动画内容/窗口栏/无 style 断言；`checks/product-data/dlp.mjs` 补 5 动画窗口栏断言。
- `tests/visual/product-data/ddp.contract.ts`：同步（timeline slot + 4 动画组含窗口栏断言）；`dlp.contract.ts` 补窗口栏断言。

## 验收标准
- [x] 四组动画完成并接入原交替时间线布局
- [x] 9 个能力动画面板统一窗口红绿灯栏
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
| `components/product/ddp/capability/DdpCapabilityVisual.vue` | 新建：四动画分发器 |
| `components/product/ddp/capability/DdpDataIntegrationVisual.vue` | 新建：数据集成动画 |
| `components/product/ddp/capability/DdpDataDevelopmentVisual.vue` | 新建：数据开发动画 |
| `components/product/ddp/capability/DdpTaskOrchestrationVisual.vue` | 新建：任务编排动画 |
| `components/product/ddp/capability/DdpContinuousDeliveryVisual.vue` | 新建：持续交互动画 |
| `components/product/ddp/DdpCapabilityTimelineSection.vue` | #visual slot 接入分发器 |
| `components/product/dlp/capability/*.vue`（5 个） | 追加窗口红绿灯栏 |
| `scripts/harness/{required-files.mjs,sources.mjs,checks/product-data/ddp.mjs,checks/product-data/dlp.mjs}` | 锁同步 |
| `tests/visual/product-data/{ddp,dlp}.contract.ts` | 契约同步 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.46): add DDP core capability animations |
| Commit Hash | |

## 完成说明
四组动画接入既有交替时间线布局，均保持固定高度（280/360px）与 SSR 完整首帧（elapsed=0 静态渲染，客户端 rAF 启动循环）；窗口红绿灯栏经脚本化变换一次应用于 9 个面板并全部通过结构校验。

验证结果：
- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：通过（19 文件 / 137 用例）
- `pnpm harness:engineering`：通过
- SSR 验证：`/products/data-development` 200，含四组动画面板标记（多源数据接入/统一开发工作台/智能任务编排/持续交付流水线）与红绿灯圆点；`/products/data-labeling` 200，五组面板标记与圆点齐全
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36~45 一致）
