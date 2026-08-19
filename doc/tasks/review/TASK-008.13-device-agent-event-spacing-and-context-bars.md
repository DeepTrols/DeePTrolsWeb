# TASK-008.13：Device Agent 事件面板间距加大与上下文来源横排加进度条
---
* TaskName：事件面板中间区域间距加大 + 上下文来源卡横排与来源进度条
* TaskDescription：按用户反馈调整：1）多源事件触发面板中间区域（事件条卡）太拥挤：进度条与下方四行内容的间距（mb-2）太小、设备事件/指标告警/规则事件/定时任务四行之间间距（gap-1）太小，分别加大为 mb-3 与 gap-2，不改变结构；2）设备上下文融合面板：四个来源卡横向排列（xl+ 单行四列），并在来源卡上方新增一条与多源事件触发中间区域相同样式的进度条，四段随四个来源的状态（idle/active/done）同步变色，其余内容布局不变。外壳高度调整为 h-[520px] xl:h-[480px]（sm–lg 恢复 520px）以容纳事件条卡加高，CDP 实测各断点无溢出。
* TaskCreator：Claude
* TaskCreationTime：2026-08-19
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.13 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **事件面板中间区域放宽（不改结构）**：事件条卡内部进度条行 `mb-2` → `mb-3`（进度条与四行内容间距 8→12px）；四行事件列表 `grid gap-1` → `grid gap-2`（行间距 4→8px）。事件条卡高度 112 → 128px。结构、类名体系、动画逻辑不变。
2. **上下文来源卡横向排列**：来源网格 `mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:gap-3 xl:flex-none` → `mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4 xl:content-center`：xl+ 单行四列（卡高保持 66px，与事件校验流水线卡一致；单行在 151px 网格区内垂直居中，避免底部大块留白），<xl 保持 2×2 flex-1 拉伸铺满。
3. **来源进度条**：主卡与来源网格之间新增 `mt-3 flex items-center gap-2` 进度条行，四段 `h-1.5 flex-1 rounded-full transition-colors duration-200`，按 `sourceState(card)` 着色（idle → bg-dt-bg-soft，active/done → bg-primary），与多源事件触发中间区域进度条样式一致、随四个来源的时间窗状态同步变化。
4. **外壳高度**：RuntimePanelShell `h-[520px] sm:h-[480px]` → `h-[520px] xl:h-[480px]`（移动/sm/lg 520px，xl+ 480px）。事件条卡加高 16px 后 sm 断点（480 外壳内容区 317px）放不下 324px 堆叠，且 lg 断点 footer 两行内容区仅 297px；恢复 sm–lg 520px 后内容区 337px（lg footer 两行时）/357px，各断点均无溢出。其余面板含 flex-1/mt-auto 吸收层，不受影响。
5. **不变项**：时间轴与动画节奏、主卡结构、上下文构建序列终端卡、流水线卡内部结构、footer 文案、IconBox 图标体系、两面板区域间 mt-3 间距。

---

## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md`
- `doc/tasks/review/TASK-008.12-device-agent-context-card-height-and-spacing.md`

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
| components/product/device-agent/runtime/RuntimeEventPanel.vue | 事件条卡进度条行 mb-2→mb-3、四行事件 gap-1→gap-2 |
| components/product/device-agent/runtime/RuntimeContextPanel.vue | 新增来源进度条（四段随来源状态变色）；来源网格 xl+ 单行四列 + content-center |
| components/product/device-agent/runtime/RuntimePanelShell.vue | 外壳高度 h-[520px] xl:h-[480px]（sm–lg 恢复 520px） |
| scripts/harness-check.mjs | 更新外壳高度、事件条卡间距、上下文网格与进度条断言 |
| tests/visual.spec.ts | 更新对应视觉断言 |
| doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md | 补充来源横排与进度条、事件间距实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.13): 事件面板间距加大与上下文来源横排进度条 |
| Commit Hash    | 5fb2aab |

---

## 完成说明
- 事件条卡：进度条行 `mb-2` → `mb-3`（8→12px），四行事件 `grid gap-1` → `grid gap-2`（4→8px），卡高 112 → 128px，结构与类名体系不变。
- 上下文面板：主卡下新增四段来源进度条（`h-1.5 flex-1 rounded-full transition-colors duration-200`，随 sourceState 在 bg-dt-bg-soft / bg-primary 间切换）；来源网格 xl+ 单行四列（`xl:grid-cols-4 xl:content-center`，卡高保持 66px 并在网格区垂直居中），<xl 保持 2×2 拉伸铺满。
- 外壳高度改为 `h-[520px] xl:h-[480px]`（sm–lg 恢复 520px），容纳事件条卡加高，避免 sm/lg 溢出。
- harness-check.mjs / visual.spec.ts 同步外壳高度、事件条 mb-3/gap-2、上下文网格与进度条断言。
- CDP 实测 5 断点（375/768/1024/1280/1536）：两面板 scrollH ≤ clientH 无溢出；xl/2xl 来源卡 66px = 流水线卡 66px；进度条与来源卡状态同步。
- 门禁全绿：pnpm lint、typecheck、test（75）、test:visual（27）、harness:engineering、build；构建产物 CSS 含 `xl\:h-\[480px\]`、`xl\:grid-cols-4`、`xl\:content-center`、`mb-3`、`gap-2`。
