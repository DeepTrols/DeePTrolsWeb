# TASK-008.17：MCP 工具连接右侧动画按 mcp_dev.md 重做
---
* TaskName：按 mcp_dev.md 重做「MCP 工具连接」运行面板右侧动画（三区域 + 6 秒一次 Tool Call 循环）
* TaskDescription：阅读 `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/mcp_dev.md` 并执行：重写 RuntimeToolsPanel.vue，实现「左侧 MCP 与系统来源关系图 + 右侧当前工具卡 + 底部调用示例」三区域结构。动画语义为"观察一个已经运行起来的 MCP Runtime 中的一次 tables.query 调用"：Ready（1s）→ Tool Active（数据平台与 tables.query 转 primary，路径 15→50）→ 数据流动（两段路径各一个 primary 光点沿线移动）→ 执行中 → ✓ 调用成功 · 284 ms（路径保持高亮约 1s）→ 恢复 Ready，约 6 秒一循环。全程无元素新增/消失，只有状态变化；footer 文案不换行；仅使用 Tailwind v4，不新建样式块。
* TaskCreator：Claude
* TaskCreationTime：2026-08-20
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.17 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **三区域结构**（RuntimeToolsPanel.vue 重写，外壳尺寸/视觉语言不变）：
   - 左侧关系图 `grid h-full grid-cols-[1fr_auto_1fr] gap-1.5`：左列 3 个系统来源（数据平台 Database 查询 / 写入、设备管理 Cpu 接入 / 监测、企业系统 FileText ERP / OA / CRM）；中央 `w-24 xl:w-28` MCP 枢纽（rounded-xl 卡片：Box 图标 + "MCP 工具层" + "Tools Ready"，Active 时 border-primary/40 bg-primary/10）；右列 3 个 MCP Tools（数据查询 ChartNoAxesCombined tables.query、指令下发 Send device.command、人工审批 UserCheck humans.approve）。卡片统一 `h-14 xl:h-16`，IconBox 默认尺寸。
   - 右侧当前工具卡 `rounded-xl border border-dt-line-strong/60 bg-dt-bg p-3 xl:w-[240px] xl:p-4`：只保留「当前工具 / tables.query（font-mono text-primary）/ ● 已连接（emerald-400）/ 查询历史时序数据」+ 两个参数（设备 ESS-01、时间范围 近 7 天，`hidden xl:grid`）；删除协议/认证/延迟/成功率/Server/Connection ID 等拥挤信息。
   - 底部调用示例 `rounded-xl border bg-dt-bg p-2.5 xl:mt-4`：Terminal 图标 + 标题"调用示例" + 单行代码 `tools.tables.query({ device: "ESS-01", window: "7d" })`，右侧动态状态文字。
2. **连接线**：细线（h-px / w-px 绝对定位元素）构成 来源→MCP→工具 总线；默认 `bg-primary/15`，Active 路径 `bg-primary/50`；只在 Active 路径上出现流动光点 `animate-line-dot`（小圆点沿线循环移动），无粒子群/大面积 Glow/路径闪烁/卡片缩放位移。
3. **动画时间轴**（约 6 秒一循环，useRuntimeTimeline(6000)）：
   - `ACTIVE_MS=1000`：Tool Active（数据平台卡与 tables.query 卡 → border-primary/40 bg-primary/5；路径 15→50；当前工具 ● 调用中；Terminal 执行中 ···）
   - `FLOW_MS=1800`：数据流动（两段路径出现 animate-line-dot 光点）
   - `EXEC_MS=2600`：执行中（当前工具 ● 执行中）
   - `DONE_MS=3800`：✓ 已完成（badge CircleCheck ✓ 已完成；Terminal ✓ 调用成功 · 284 ms；光点停止、路径保持高亮）
   - `RESET_MS=4800`：恢复 Ready（全部回落 muted / primary/15 / 等待调用），衔接循环尾停留。
   - 顶部面板 badge「已连接」常驻；状态只在已有元素上切换，无元素出现/消失。
4. **footer 不换行**：footer 文案单行 `truncate`——"Agent 通过 MCP 协议连接设备、数据与业务工具，在消息流中完成读取、查询、检索与执行。"
5. **样式约束**：仅 Tailwind v4 工具类；assets/css/tailwind.css @theme 内新增 `--animate-line-dot: line-dot 1.1s linear infinite;` 与 `@keyframes line-dot { from {left:0%} to {left:100%} }`，不新建样式块、组件内无 `<style>`。
6. **同步更新**：data/device-agent.ts tools tab `panelBadge: '6 个可用'` → `'已连接'`；scripts/harness-check.mjs 与 tests/visual.spec.ts 的 tools 断言块整体替换（结构/文案/时间轴常量/animate-line-dot/无 style 块）。

---

## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESSENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/mcp_dev.md`
- `doc/tasks/review/TASK-008.9-device-agent-mcp-tools-panel.md`
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
| components/product/device-agent/runtime/RuntimeToolsPanel.vue | 按 mcp_dev.md 重写：三区域结构 + 6 秒 Tool Call 状态循环 |
| assets/css/tailwind.css | 新增 --animate-line-dot token 与 @keyframes line-dot |
| data/device-agent.ts | tools tab panelBadge 同步为「已连接」 |
| scripts/harness-check.mjs | tools 断言块整体替换 |
| tests/visual.spec.ts | tools 视觉断言整体替换 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.17): 按 mcp_dev.md 重做 MCP 工具连接右侧动画 |
| Commit Hash    | —    |

---

## 完成说明
- 三区域落地：左侧 3 来源 | MCP 工具层枢纽 | 3 工具 的 hub-and-spoke 关系图（纯 h-px/w-px 绝对定位连线，无 SVG path）；右侧当前工具卡精简为规范字段 + ≤2 参数；底部单行调用示例 + 三段状态文字。
- 动画语义符合 mcp_dev.md：完整 Runtime 界面常驻 → 调用路径 Active → 光点数据流 → 执行中 → ✓ 调用成功 · 284 ms（高亮保持约 1s）→ 恢复 Ready；全程无元素增删，只有边框亮度/文字颜色/光点三类变化。
- 组件 187 行，低于 300 行上限；无 `<style>` 块，全部 Tailwind v4。
- data/device-agent.ts tools tab panelBadge 与面板 badge 一致为「已连接」。
- CDP 实测 5 断点（375/768/1024/1280/1536）：shell 与事件/上下文面板一致（<xl 530 / xl 480），内容盒 scrollH == clientH，零溢出；footer 单行 truncate 不换行。
- 门禁全绿：eslint、typecheck、vitest（75 例）、harness:engineering、build。
