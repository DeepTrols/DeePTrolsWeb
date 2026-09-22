# TASK-014.47：数曜·数据要素监管平台智能监管动画
---
* TaskName：DMS 智能监管区五组动画（统一监管规则/实时事件监控/智能工单闭环/监管驾驶舱/全流程监管体系）
* TaskDescription：将数曜·数据要素监管平台页面「智能监管 · 智能监管，全程守护」交替时间线（AlternatingTimelineSection + dmsTimelineItems ×5）的五个图片占位符替换为统一监管规则、实时事件监控、智能工单闭环、可视化监管驾驶舱、全流程监管体系五组循环动画。
* TaskCreator：User
* TaskCreationTime：2026-09-21
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.47 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

## 任务目标
沿用 TASK-014.45/46 确立的能力动画配方（useRuntimeTimeline 循环时间轴 + macOS 窗口红绿灯栏 + 固定高度面板 + 四步 Stepper），在不改变 Section 标题、间距、文案和左右交替布局的前提下呈现 DMS 五项智能监管能力。用户指定配方 `$product-capability-animation`（技能文件已不存在，以 TASK-006.7 DGP evolution + TASK-014.45/46 为事实配方）。

## 前置文档
- `AGENTS.md`
- `doc/tasks/review/TASK-014.45-dlp-core-capability-animations.md`
- `doc/tasks/review/TASK-014.46-ddp-core-capability-animations.md`
- `components/product/device-agent/useRuntimeTimeline.ts`（统一状态机）

## 实现内容
1. 新建 `components/product/dms/capability/`：
   - `DmsRuleCenterVisual`（统一监管规则）：数据主体准入校验（高）/交易频次限制（中）/交付完整性核验（低）三条规则带风险等级 pill 逐条启用 + Stepper 规则分类→等级配置→动作组合→发布启用。
   - `DmsEventMonitorVisual`（实时事件监控）：异常交易行为/越权数据访问/交付延迟预警三条事件依次生成（雷达脉动 pill 计数），末段相似告警收敛去重 ×3 + Stepper 实时监测→风险识别→事件生成→收敛去重。
   - `DmsWorkOrderVisual`（智能工单闭环）：工单卡 WO-20260921-017 待创建→处理中→已完成，监管员/安全官/运维组三角色的协同分派依次点亮 + Stepper 工单创建→协同分派→状态跟踪→审计留痕。
   - `DmsCockpitVisual`（监管驾驶舱）：规则运行 96%/工单处置率 88%/风险收敛率 92% 三条指标经 `getRuntimeBarWidthClass` 依次填充 + Stepper 指标汇聚→趋势分析→风险分布→决策支撑。
   - `DmsLifecycleVisual`（全流程监管体系）：事前预防→事中监测→事后处置三阶段链依次点亮，末段审计留痕归档 + Stepper 事前预防→事中监测→事后处置→全程追溯。
   - `DmsCapabilityVisual`：index → 五组件分发（DlpCapabilityVisual 同款）。
2. 动画统一 `useRuntimeTimeline(6000)` 循环 + `activeStep`（500ms 起每 1200ms 一步）+ `finished = elapsed >= 5300`；面板固定 `min-h-[280px] lg:min-h-[360px]` + 窗口红绿灯栏，Tailwind-only、Lucide 图标、无 `<style>`/inline style。
3. `DmsIntelligentRegulationSection` 经 `#visual` 注入分发组件，带 `transparent-visual`（与 DLP/DDP 一致）；DMS 页智能监管区图片占位符全部移除。

### 锁同步
- `required-files.mjs`：新增 capability/ 6 文件。
- `sources.mjs`：新增 `dmsCapabilityVisual` + 5 个 visual 源。
- `checks/product-data/dms.mjs`：timeline slot 断言 + 分发器断言 + 5 动画内容/窗口栏/无 style 断言。
- `tests/visual/product-data/dms.contract.ts`：同步（timeline slot + 5 动画组断言）。

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
| `components/product/dms/capability/DmsCapabilityVisual.vue` | 新建：五动画分发器 |
| `components/product/dms/capability/DmsRuleCenterVisual.vue` | 新建：统一监管规则动画 |
| `components/product/dms/capability/DmsEventMonitorVisual.vue` | 新建：实时事件监控动画 |
| `components/product/dms/capability/DmsWorkOrderVisual.vue` | 新建：智能工单闭环动画 |
| `components/product/dms/capability/DmsCockpitVisual.vue` | 新建：监管驾驶舱动画 |
| `components/product/dms/capability/DmsLifecycleVisual.vue` | 新建：全流程监管体系动画 |
| `components/product/dms/DmsIntelligentRegulationSection.vue` | #visual slot 接入分发器 |
| `scripts/harness/{required-files.mjs,sources.mjs,checks/product-data/dms.mjs}` | 锁同步 |
| `tests/visual/product-data/dms.contract.ts` | 契约同步 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.47): add DMS intelligent regulation animations |
| Commit Hash | |

## 完成说明
五组动画接入既有交替时间线布局，均保持固定高度（280/360px）与 SSR 完整首帧（elapsed=0 静态渲染，客户端 rAF 启动循环）；面板顶部统一窗口红绿灯栏。DMS 页智能监管区不再渲染图片占位符。

验证结果：
- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：通过（19 文件 / 137 用例）
- `pnpm harness:engineering`：通过
- SSR 验证：`/products/data-element-regulation` 200，HTML 含五组动画面板标记（监管规则中心/实时风险监测/智能工单闭环/可视化监管驾驶舱/全流程监管体系）与红绿灯圆点，无「图片占位符」残留
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36~46 一致）
