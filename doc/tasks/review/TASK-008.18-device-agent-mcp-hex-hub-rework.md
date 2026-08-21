# TASK-008.18：MCP 工具连接六边形枢纽 + 贝塞尔虚线路径 + 三条 Tool Call 循环
---
* TaskName：升级「MCP 工具连接」中央视觉（大号六边形 MCP Hub + 多层轮廓 + 柔和虚线曲线 + 固定节点 + 单路径流光）并将 Tool Call 循环扩展为三条
* TaskDescription：基于 TASK-008.17 继续修改，不推翻三区域结构、不改变外壳尺寸与整体布局。中央 MCP 工具层改为大号圆角六边形（clip-path，xl 宽 132px）+ 3 层低透明度六边形轮廓；连接线弃用 h-px/w-px 直角总线，改为 SVG 贝塞尔虚线路径（stroke-width 1、dasharray 4 5、linecap round、默认 stroke-primary/30、Active /70），来源出口 / MCP 接口 / 工具入口设固定 6px 发光节点，Active 路径单个 5~6px 光点沿贝塞尔移动；Tool Call 循环由 1 条扩展为 3 条（tables.query / device.command / humans.approve，各 3s 约 9s 循环），右侧当前工具卡随循环整组切换（4 参数 + 完成状态行），底部调用示例同步。同期微调：关系图卡片标题 text-sm / 副标题 text-xs；右卡工具名 text-sm 加粗、参数与描述 text-xs、参数区 gap-2 mt-3；Tools Ready text-xs；设备上下文引擎来源卡 mt-2、移除「持续更新」角标；修复移动端横向溢出与网格轨道 min-content 撑宽问题。
* TaskCreator：Claude
* TaskCreationTime：2026-08-20
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.18 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **中央六边形枢纽**（RuntimeToolsHex.vue 重写）：
   - 主六边形放大为视觉中心：`h-[97px] w-[84px] xl:h-[152px] xl:w-[132px]`；形状由 `@utility clip-hex` 的圆角六边形 `clip-path: path(...)` 定义（基于 polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%) 的 r=8 圆角化，xl 断点切换 132×152 路径）。
   - 三层嵌套：外层 `clip-hex bg-primary/30`（Active `/45`）作细描边 → `clip-hex-inner inset-px bg-dt-bg` 深色基底（遮住路径末端、保留暗色层次，非实心紫块）→ `clip-hex-inner inset-px bg-primary/10`（Active `/15`）+ 内发光 `shadow-[inset_0_0_18px_rgba(139,92,246,0.15)]`。
   - 内容保持 Box 图标 + 「MCP 工具层」+ 「Tools Ready」（text-xs）；完全静止，不旋转/缩放/漂浮/呼吸。
   - 3 层外部轮廓环：SVG `viewBox="0 0 146 170"`（`h-[143px] w-[123px] xl:h-[224px] xl:w-[193px]`），同心放大 1.15/1.3/1.45 的六边形 polygon，stroke-primary/16、/12、/8，`stroke-linejoin="round"`。
2. **贝塞尔虚线连接线**（RuntimeToolsGraph.vue 重写）：
   - 布局 `grid h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 xl:gap-6`，中列 `relative w-24 xl:w-[150px]`；两侧行网格 `grid-rows-3 grid-cols-[minmax(0,1fr)]` 保证卡片可收缩 truncate。
   - 两套整像素 viewBox SVG 跨网格间隙：base `0 0 128 198`（`-left-4 -right-4`，xl:hidden）、xl `0 0 198 241`（`-left-6 -right-6`，hidden xl:block），`preserveAspectRatio="none"` + `vector-effect="non-scaling-stroke"`；行中心恒为 1/6、1/2、5/6。
   - 路径为三次贝塞尔 `M 0 ry C cx ry, cx py, tuck py`：水平离开卡片侧边、S 形柔和弯曲、水平接入六边形平边并 tucked 于深色基底之下，无 90° 折线；`stroke-width="1" stroke-dasharray="4 5" stroke-linecap="round" fill="none"`，默认 `stroke-primary/30`、Active `stroke-primary/70`。
   - 固定节点：12 个 `r="3"`（6px）`fill-primary` 圆点（来源出口 / 工具入口 / MCP 左右接口），`drop-shadow-[0_0_3px_rgba(139,92,246,0.5)]` 轻微 glow，第一帧起常驻、不增删。
   - 单光点：`r="3"` 圆点按贝塞尔参数方程 `bezierPoint` 求值，先来源→MCP（0.3~0.9s）再 MCP→工具（0.9~1.5s），同一时刻仅一个光点，无粒子/闪烁/大 glow。
3. **三条 Tool Call 循环**（RuntimeToolsPanel.vue）：`CALL_MS=3000 / DOT_A_MS=300 / DOT_B_MS=900 / EXEC_MS=1500 / DONE_MS=2200`，`useRuntimeTimeline(CALL_MS * 3)` 约 9s；Call 01 tables.query（数据平台→数据查询）、Call 02 device.command（设备管理→指令下发）、Call 03 humans.approve（企业系统→人工审批），代码行分别为 `tools.tables.query({ device: "ESS-01", window: "7d" })` / `tools.device.command({ device: "ESS-01", action: "set_power" })` / `tools.humans.approve({ device: "ESS-01", action: "set_power" })`；状态 调用中→已完成 / 执行中→已完成 / 等待审批→已批准；底部调用示例代码与状态同步。
4. **右侧当前工具卡**：结构常驻、整组切换（禁止逐字段出现）。工具名 `font-mono text-sm font-bold text-primary`；描述 text-xs（查询储能柜历史时序数据 / 向储能柜下发运行控制指令 / 高风险动作请求人工确认）；参数区 `mt-3 hidden gap-2 xl:grid` 四行两列 key/value（key 左 text-muted、value 右 font-mono，text-xs）+ 末行「完成状态 ✓ 已完成/已批准」；宽度/边框/背景不变，xl 下面板高度仍由关系图列主导（外壳 480 不变）。
5. **关系图卡片字体**：6 张来源/工具卡标题 `text-sm font-semibold`、副标题 `text-xs`（mono 副标题同 text-xs）。
6. **设备上下文引擎微调**：4 张来源卡容器 `mt-3 … xl:mt-5` → `mt-2`；RuntimeContextSnapshot 移除右上角「持续更新」+ sync-pulse 圆点角标（快照行其余不变）。
7. **溢出修复**：SectionShell 面板包裹层 `relative` → `relative min-w-0`（footer nowrap 的 min-content 不再撑宽 section 网格轨道）；关系图外/行网格均用 `minmax(0,1fr)` 杜绝 nowrap 文本撑宽轨道。
8. **约束保持**：无元素新增/消失（节点/路径/卡片全常驻）、无 fade/slide/scale-in、footer 单行 truncate、仅 Tailwind v4、组件无 `<style>`、harness 与 visual.spec 同步。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/mcp_dev.md`
- `doc/tasks/review/TASK-008.16-device-agent-snapshot-row-height-align.md`
- `doc/tasks/review/TASK-008.17-device-agent-mcp-panel-rework.md`

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
| components/product/device-agent/runtime/RuntimeToolsHex.vue | 重写：大号圆角六边形枢纽（三层 clip 嵌套 + 内发光）+ 3 层同心轮廓环 |
| components/product/device-agent/runtime/RuntimeToolsGraph.vue | 重写：双断点整像素 viewBox 贝塞尔虚线路径、固定发光节点、bezierPoint 单光点 |
| components/product/device-agent/runtime/RuntimeToolsPanel.vue | 三条 Tool Call 数据（4 参数/完成状态/描述）、右卡字体与间距、调用示例同步 |
| components/product/device-agent/runtime/RuntimeContextPanel.vue | 来源卡容器 mt-2 |
| components/product/device-agent/runtime/RuntimeContextSnapshot.vue | 移除「持续更新」角标 |
| components/product/device-agent/DeviceAgentRuntimeSection.vue | 面板包裹层 min-w-0 修复横向溢出 |
| assets/css/tailwind.css | clip-hex / clip-hex-inner 圆角六边形 path() 工具（含 xl 断点），移除 --animate-line-dot |
| scripts/harness-check.mjs | 六边形/贝塞尔/三循环/上下文断言块更新 |
| tests/visual.spec.ts | 同上视觉断言更新 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.18): 六边形 MCP 枢纽 + 贝塞尔虚线路径 + 三条 Tool Call 循环 |
| Commit Hash    | —    |

---
## 完成说明
- 最终视觉符合目标语义：大号中央六边形 MCP Hub（xl 132×152，圆角 clip-path，细描边 + 深色基底 + bg-primary/10 内发光）+ 多层六边形轮廓（/16、/12、/8 同心放大、静止）+ 柔和虚线贝塞尔曲线路径（无 90° 折线）+ 固定 6px 发光节点 + 单路径流光（一个 6px 光点沿贝塞尔来源→MCP→工具）。
- 圆角六边形实现：`@utility clip-hex` / `clip-hex-inner` 以 `clip-path: path('…Q…')` 表达（r=8/r=7 圆角化 93%/7% 六边形），xl 断点经 `@media (width >= 80rem)` 切换 132×152 / 130×150 路径；内层 1px inset 使用独立 inner 路径避免底角被裁平。
- 三循环节奏实测：0.0s 路径 Active → 0.3s 光点出发 → 0.9s 进入工具段 → 1.5s 执行中 → 2.2s 完成 → 3.0s 切换，9s 循环 + 1.2s 停留回 Ready；右卡与底部示例整组同步，无逐字段出现。
- 右卡信息增强：工具名 text-sm 加粗、描述与参数 text-xs、参数区 mt-3 gap-2 四行 + 完成状态行（✓ 已完成 / ✓ 已批准）；xl 外壳高度仍 480（关系图列 241 主导，inner scrollH == clientH）。
- 响应式修复：CDP 实测 375/768/1024/1280/1536 五断点 `scrollWidth == clientWidth` 零横向溢出（min-w-0 + minmax(0,1fr) 双保险），纵向 inner overflow=0；移动端 62px 卡片内文本 truncate 不撑宽。
- 设备上下文引擎：来源卡 mt-2 收紧、「持续更新」角标移除后快照行布局不变。
- 门禁全绿：eslint、typecheck、vitest（75 例）、harness:engineering、build。
