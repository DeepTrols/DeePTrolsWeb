# TASK-008.19：Skills 按需挂载面板重构（事件风格触发卡 + 常驻候选卡 + Skill 挂载序列卡 + Footer）
---
* TaskName：重构「Skills 按需挂载」动画面板：顶部改为多源事件触发风格触发卡、候选 Skills 卡默认常驻、移除执行链路行、底部新增「Skill 挂载序列」序列卡（skills.mount 代码随选中增长、状态 匹配中 → 挂载中 → ✓ 3 Skills mounted）、新增单行 truncate Footer
* TaskDescription：基于 TASK-008.18 后的面板继续修改，不改外壳尺寸与其他能力面板。顶部「收到事件 ESS-01 · 电芯温度告警 61.8°C」条替换为多源事件触发顶部卡片样式并按槽位替换：DEVICE AGENT 槽 → 「ESS-01 · 电芯温度告警」、等待事件槽 → 「收到事件」、实时槽 → 「61.8°C」（Puzzle 图标 + animate-ping 方块）。四张候选 Skills 卡（设备巡检 62 / 告警分诊 96 / 热异常诊断 93 / 工单派发 87）默认显示、移除 opacity 门控，进度条动画不变，选中仍为告警分诊 / 热异常诊断 / 工单派发。移除第三部分链路行（告警分诊 → 热异常分析 → 处置决策 → 工单派发）与「已挂载 3 个 Skills · 就绪」尾行。底部新增与设备上下文引擎「上下文构建序列」同构的「Skill 挂载序列」卡：左侧 `skills.mount([...])` 代码随选中依次增加「告警分诊」「热异常诊断」「工单派发」，右侧状态 匹配中（进度条加载时）→ 挂载中（选中时）→ ✓ 3 Skills mounted（全部选中后）；「正在匹配 Skills...」行同步在进度条加载完后变为「正在挂载 Skills...」、全部选中后显示「3 Skills mounted」。新增 Footer：「Agent 通过 Skills 按需挂载能力，在运行时动态组合知识与工具，完成感知、分析与执行。」单行 truncate。
* TaskCreator：Claude
* TaskCreationTime：2026-08-20
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.19 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **顶部触发卡**（多源事件触发顶部卡片样式，槽位替换）：
   - 容器 `rounded-xl border border-primary/20 bg-primary/5 p-3`；图标方块 `size-10 rounded-xl bg-primary/15` 内 Puzzle 图标 + `animate-ping` 覆盖层；
   - 眉行（DEVICE AGENT 槽）`truncate text-xs font-medium text-primary` → 「ESS-01 · 电芯温度告警」；主行（等待事件槽）`truncate font-mono text-base font-semibold text-highlighted` → 「收到事件」（常驻，不切换）；右侧 chip（实时槽）`rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary` → 「61.8°C」。
2. **状态行**（原「正在匹配 Skills...」行）：移除 opacity 门控、常驻；图标 LoaderCircle（spin，未就绪）→ CircleCheck（就绪）；文本三段：进度条加载时「正在匹配 Skills...」、加载完后「正在挂载 Skills...」、全部选中后「3 Skills mounted」；颜色 `text-muted` → 就绪 `text-primary`（transition-colors）。
3. **候选 Skills 卡**：四张卡（设备巡检 62 / 告警分诊 96 / 热异常诊断 93 / 工单派发 87）默认显示、无 opacity 门控；容器 `mt-1.5 grid gap-1`、卡片 `rounded-lg border px-2.5 py-1`、进度条 `mt-0.5 h-1`（压缩以容纳 Footer）；进度动画与百分比文本不变，选中仍为告警分诊 / 热异常诊断 / 工单派发（选中卡 CircleCheck + `border-primary/40 bg-primary/5`）。
4. **移除第三部分**：链路行（告警分诊 → 热异常分析 → 处置决策 → 工单派发，含 ArrowRight 连接符）与「已挂载 3 个 Skills · 就绪」尾行整体删除。
5. **底部「Skill 挂载序列」卡**（与上下文构建序列同构）：`mt-auto rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5`；Terminal 图标 `size-3.5 shrink-0 text-muted` + 标题 `truncate text-xs font-semibold text-highlighted`「Skill 挂载序列」；右侧状态 `ml-auto flex shrink-0 items-center gap-1 text-[11px] leading-4 text-primary`：匹配中（LoaderCircle spin）→ 挂载中（LoaderCircle spin）→ ✓ 3 Skills mounted（CircleCheck）；代码行 `mt-1 truncate font-mono text-xs leading-4 text-muted` 初始 `skills.mount([])`，随选中依次增长为 `skills.mount(["告警分诊"])` → `["告警分诊", "热异常诊断"]` → `["告警分诊", "热异常诊断", "工单派发"]`。
6. **Footer**：`truncate text-sm text-muted` 单行 + title 属性：「Agent 通过 Skills 按需挂载能力，在运行时动态组合知识与工具，完成感知、分析与执行。」；仅 Skills 面板新增，不影响其他面板。
7. **时间线**（useRuntimeTimeline(6000)）：BAR_START 1200 / STAGGER 150 / DURATION 1800 → BARS_DONE 3450；SELECT_START 4000 / INTERVAL 400（4000 / 4400 / 4800 依次选中）；READY 4800；循环 + 1.2s 停留。
8. **约束保持**：仅 Tailwind v4、无 `<style>`、无元素 fade/slide 进出（卡片/状态行全常驻）、footer 单行 truncate、harness 与 visual.spec 同步。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/tasks/review/TASK-008.17-device-agent-mcp-panel-rework.md`
- `doc/tasks/review/TASK-008.18-device-agent-mcp-hex-hub-rework.md`

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
| components/product/device-agent/runtime/RuntimeSkillsPanel.vue | 重写：事件风格触发卡 + 常驻四候选卡 + Skill 挂载序列卡 + 单行 truncate Footer；移除链路行 / 尾行 / opacity 门控 |
| scripts/harness-check.mjs | Skills 断言块重写（触发卡槽位、三段状态、skills.mount、Footer、无链路行 / 无 opacity-0） |
| tests/visual.spec.ts | 同上视觉断言更新 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.19): Skills 面板事件风格触发卡 + Skill 挂载序列 + Footer |
| Commit Hash    | —    |

---
## 完成说明
- 顶部触发卡完全复用多源事件触发顶部卡片骨架（rounded-xl primary/20 容器 + size-10 ping 图标方块 + 眉行/主行/右 chip），槽位替换为 ESS-01 · 电芯温度告警 / 收到事件 / 61.8°C。
- 候选卡与状态行全部常驻（无 opacity-0 门控），进度条节奏不变（1.2s 起步、150ms 交错、1.8s 充满）；选中仍为告警分诊 / 热异常诊断 / 工单派发三张。
- 序列卡与上下文构建序列同构：Terminal 图标 + 标题 + 右侧 spinner/check 状态 + mono 代码行；skills.mount 参数随选中从 `[]` 依次增长到三项，状态流 匹配中 → 挂载中 → ✓ 3 Skills mounted，「正在匹配 Skills...」行同步切换。
- Footer 采用设备上下文引擎同款单行 truncate 结构，新增约 54px 高度后将候选卡压缩为 `gap-1 / py-1 / mt-0.5 h-1` 进度条以适配固定外壳。
- CDP 实测 375 / 768 / 1536 三断点：`bodyScrollH == bodyClientH`（base 397 / xl 347）零内容溢出，`document/section scrollWidth == clientWidth` 零横向溢出；四阶段（匹配 / 加载 / 挂载 / 就绪）文本与代码行状态逐一采样正确。
- 门禁全绿：eslint、typecheck、vitest（75 例）、harness:engineering、build。
