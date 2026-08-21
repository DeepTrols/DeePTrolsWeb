# TASK-008.16：上下文快照横排去框 + 上下文面板高度对齐事件面板
---
* TaskName：上下文快照区域去外框/标题/图标改单行横排，设备上下文引擎面板高度与多源事件触发面板对齐
* TaskDescription：按用户反馈「去掉上下文快照的最外层边框以及"上下文快照"和 svg，7 个卡片横向排列，保证整个设备上下文引擎的高度与多源事件触发的动画高度一致」：上下文快照区域（TASK 参考 image.png 新增，位于上下文构建序列上方、与时间轴阶段联动高亮）移除外层 rounded-xl 边框卡与标题行（ScanEye 图标 + "上下文快照"文字），7 个字段芯片改为单行横向排列；撤销上一版为快照区域增加的面板高度覆盖与 RuntimePanelShell heightClass 机制，面板恢复统一外壳高度，与多源事件触发面板完全一致。
* TaskCreator：Claude
* TaskCreationTime：2026-08-20
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.16 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **上下文快照去框横排**（RuntimeContextSnapshot.vue）：
   - 移除外层 `rounded-xl border` 容器卡与标题行（ScanEye 图标 + "上下文快照"标题）。
   - 7 个字段芯片单行横排：`flex gap-1.5 overflow-x-auto xl:grid xl:grid-cols-7`，芯片 `min-w-[92px] flex-1 rounded-lg border p-1.5 xl:min-w-0`；<xl 横向滚动兜底，xl+ 七列等宽网格。
   - 字段语义不变：运行状态 充电中 / 最高电芯温度 61.8 °C（amber）/ SOC 86%（realtime）、历史基线 42.6 °C / 偏离幅度 +45.1 %（amber，timeseries）、BMS 状态 告警（amber，device）、知识匹配 2 条（primary，knowledge）；激活态 `border-primary/30 bg-primary/5` + 值文字 primary，异常值恒为 amber 不随阶段变色。
   - "● 持续更新" 同步脉冲保留：`absolute -top-3 right-0` 定位于芯片行右上角间隙，`animate-sync-pulse`（opacity 0.45→1→0.45），不占垂直空间、不呼吸不缩放。
2. **面板高度对齐**：撤销上一版对上下文面板的高度覆盖（h-[720px] xl:h-[560px]）与 RuntimePanelShell 的 heightClass prop，外壳恢复统一 `h-[530px] xl:h-[480px]`，与事件面板一致。
3. **高度预算适配**（固定外壳内不溢出不裁切）：
   - 区域间距恢复 TASK-008.15 节奏：进度条行 / 来源网格 / 序列卡均 `mt-3 xl:mt-5`。
   - 来源卡描述行 <xl 隐藏（`hidden xl:block`），保证 <xl 两行网格 + 快照行 + 序列卡在 530px 外壳内容盒（377–397px）内完整容纳；xl+ 固定堆叠 ≤ 347px 内容盒。
   - 来源网格保持 `grid min-h-0 flex-1 ... xl:flex-none xl:grid-cols-4`，<xl 弹性铺满剩余空间。
4. **动画 token**：assets/css/tailwind.css 新增 `--animate-sync-pulse: sync-pulse 2s ease-in-out infinite;` 与 `@keyframes sync-pulse { 0%,100% {opacity:.45} 50% {opacity:1} }`（Tailwind v4 @theme 内声明，不新建样式块）。
5. **同步更新**：scripts/harness-check.mjs 与 tests/visual.spec.ts 断言（快照文件纳入 requiredFiles、去除"上下文快照"标题断言、横排类名字符串、mt-3/xl:mt-5 字面量、shell 高度字符串恢复原值）。

---

## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESSENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/image.png`
- `doc/tasks/review/TASK-008.15-device-agent-panel-gap-mt5.md`

---

## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---

## 修改文件
| 文件 | 说明 |
|----|----|
| components/product/device-agent/runtime/RuntimeContextSnapshot.vue | 快照区域：去外框/标题/图标，7 芯片单行横排，同步脉冲绝对定位 |
| components/product/device-agent/runtime/RuntimeContextPanel.vue | 移除高度覆盖，间距 mt-3 xl:mt-5，来源卡描述 <xl 隐藏，快照 group 联动 |
| components/product/device-agent/runtime/RuntimePanelShell.vue | 移除 heightClass prop，恢复统一外壳高度 |
| assets/css/tailwind.css | 新增 --animate-sync-pulse token 与 @keyframes sync-pulse |
| scripts/harness-check.mjs | 快照文件纳入检查清单，更新横排/间距/shell 断言 |
| tests/visual.spec.ts | 同步更新视觉断言 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.16): 上下文快照横排去框 + 面板高度对齐事件面板 |
| Commit Hash    | —    |

---

## 完成说明
- 上下文快照区域不再带外框与标题：7 个字段芯片直接作为来源网格与构建序列之间的一行，视觉上像"上下文一直存在、Runtime 正在持续刷新其中的一部分"。
- 阶段联动保持：context.realtime → 运行状态/最高电芯温度/SOC；context.timeseries → 历史基线/偏离幅度；context.device → BMS 状态；context.knowledge → 知识匹配；build 阶段全部回落 muted。
- 设备上下文引擎面板高度与多源事件触发面板完全一致（外壳 530/xl 480），RuntimePanelShell 重新成为所有运行面板统一高度来源。
- CDP 实测 5 断点（375/768/1024/1280/1536）×3 面板：shell 高度一致（<xl 530 / xl 480），内容盒 scrollH == clientH，零溢出零裁切。
- 门禁全绿：eslint、typecheck、vitest（75 例）、harness:engineering、build。
