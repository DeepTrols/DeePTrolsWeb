# TASK-008.12：Device Agent 上下文来源卡降高与事件面板间距对齐
---
* TaskName：来源卡高度对齐事件校验卡 + 事件面板三区域间距对齐上下文面板
* TaskDescription：按用户反馈调整：1）设备上下文面板的四个来源卡片在 xl+ 高度太高（flex-1 四列拉伸到 147px），需与多源事件触发面板中「事件校验」流水线卡片高度一致（xl+ 66px）；2）多源事件触发面板三个区域（主卡/事件条/流水线）之间的上下间距（mt-1.5）与设备上下文面板（mt-3）保持一致。实现：上下文来源网格 xl+ 取消 flex-1 拉伸与四列，改为自然高度 2×2（卡高 66px = 流水线卡高），<xl 仍 flex-1 拉伸铺满；事件面板 mt-1.5 → mt-3，事件条行高 leading-5 → leading-4 以容纳新增间距；面板外壳移除 lg:h-[460px]（lg+ 统一 sm:h-[480px]），修复事件面板 lg 断点既有 19px 溢出。
* TaskCreator：Claude
* TaskCreationTime：2026-08-19
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.12 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **来源卡降高（xl+）**：来源网格 `mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4` → `mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:gap-3 xl:flex-none`。xl+ 保持 2×2、自然高度（单卡 66px，与事件面板「事件校验」流水线卡完全一致，卡内仍为 IconBox 40 + 标题/状态左右布局），不再拉伸；<xl 仍 flex-1 拉伸铺满内容区。<xl 保持 2×2 拉伸（移动 ~100px / sm ~78.5px / lg ~99.5px，与事件面板流水线 <xl 竖排卡 106px 量级一致）。
2. **事件面板间距对齐**：事件条卡 `mt-1.5` → `mt-3`、流水线行 `mt-1.5` → `mt-3`，与上下文面板的 mt-3/mt-3 一致。为容纳新增 18px，事件条 4 行文字 `text-xs leading-5` → `text-xs leading-4`（事件条卡 128px → 112px）。
3. **外壳 lg 溢出修复**：RuntimePanelShell 移除 `lg:h-[460px]`（最终 `h-[520px] sm:h-[480px]`，lg+ 统一 480px）。旧结构下 lg 断点事件面板内容 scrollH 328 > 可用 309，既有 19px 被 overflow-hidden 裁切（lg footer 两行 + 竖排流水线 106px）；本次事件条行高 leading-5 → leading-4 节省 16px 后，480px 外壳内容区 329px（lg footer 两行时），事件面板堆叠 308px，CDP 实测 scrollH 327 ≤ 329，无溢出。其余面板（skills/guardrails/trace/tools）含 flex-1 或 mt-auto 吸收层，不受影响。
4. **高度预算复核**（CDP 实测 5 断点，shell 内容区 clientHeight：移动 369/389、sm 349、lg 329(事件)/349(上下文)、xl+ 349）：
   - 事件面板：主卡 66 + 12 + 事件条 112 + 12 + 流水线（<xl 106 / xl+ 66）= <xl 308、xl+ 268，全部 ≤ 可用高度，无溢出。
   - 上下文面板：主卡 66 + 12 + 网格（<xl flex-1 铺满 / xl+ 2×2 自然 144）+ 12 + 序列卡 58；xl+ 堆叠 292 ≤ 317。
5. **不变项**：时间轴与动画节奏、主卡结构、上下文构建序列终端卡、流水线卡内部结构（xl:flex-row/描述/连接线）、footer 文案、IconBox 图标体系。

---

## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md`
- `doc/tasks/review/TASK-008.11-device-agent-context-card-horizontal.md`

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
| components/product/device-agent/runtime/RuntimePanelShell.vue | 移除 lg:h-[460px]，lg+ 统一 sm:h-[480px] |
| components/product/device-agent/runtime/RuntimeContextPanel.vue | 来源网格 xl+ 取消拉伸与四列（xl:flex-none，2×2 自然高度 66px/卡） |
| components/product/device-agent/runtime/RuntimeEventPanel.vue | 事件条/流水线间距 mt-1.5 → mt-3；事件条行 leading-5 → leading-4 |
| scripts/harness-check.mjs | 更新外壳高度、事件流水线行间距、上下文网格断言 |
| tests/visual.spec.ts | 更新对应视觉断言 |
| doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md | 补充来源卡降高与间距对齐实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.12): 上下文来源卡降高对齐事件卡与事件面板间距统一 |
| Commit Hash    | 1615119 |

---

## 完成说明
- 上下文来源网格改为 `mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:gap-3 xl:flex-none`：xl+ 取消四列与 flex-1 拉伸，2×2 自然高度单卡 66px，与事件面板「事件校验」流水线卡（xl+ 66px）一致；<xl 仍 flex-1 拉伸铺满。
- 事件面板事件条卡与流水线行间距 `mt-1.5` → `mt-3`，与上下文面板统一；事件条 4 行文字 `leading-5` → `leading-4`（卡高 128 → 112px）容纳新增间距。
- RuntimePanelShell 移除 `lg:h-[460px]`（lg+ 统一 480px），修复 lg 断点事件面板既有 19px 内容裁切。
- harness-check.mjs / visual.spec.ts 同步更新外壳高度类名、事件面板 mt-3 与 leading-4 断言、上下文网格 xl:flex-none 断言。
- CDP 实测 5 断点（375/768/1024/1280/1536）：所有断点 scrollH ≤ clientH 无溢出；xl/2xl 来源卡 66px = 流水线卡 66px。
- 门禁全绿：pnpm lint、typecheck、test（75）、test:visual（27）、harness:engineering、build；构建产物 CSS 含 `xl\:flex-none`、`sm\:h-\[480px\]`，无 `lg\:h-\[460px\]` 残留。
