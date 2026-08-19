# TASK-008.15：运行面板区域间距 mt-3 → mt-5
---
* TaskName：事件面板与上下文面板区域间距统一 mt-3 → mt-5 + 外壳高度 h-[520px] → h-[530px]
* TaskDescription：按用户反馈「间距mt-3修改为mt-5」，将两个运行时面板（多源事件触发 RuntimeEventPanel、设备上下文融合 RuntimeContextPanel）内部各区域之间的 mt-3 间距统一改为 mt-5：事件面板主卡→事件条卡、事件条卡→流水线；上下文面板主卡→进度条、进度条→来源网格、来源网格→序列卡。间距加大后 <xl 断点事件面板堆叠超出内容区，外壳高度由 h-[520px] 调整为 h-[530px]（xl:h-[480px] 不变）以容纳新堆叠高度。
* TaskCreator：Claude
* TaskCreationTime：2026-08-19
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.15 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **区域间距 mt-3 → mt-5**（两面板对齐，共 5 处）：
   - RuntimeEventPanel.vue：事件条卡 `mt-3 rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5` → mt-5；流水线 `mt-3 flex items-stretch gap-1` → mt-5。
   - RuntimeContextPanel.vue：进度条行 `mt-3 flex items-center gap-2` → mt-5；来源网格 `mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4 xl:flex-none` → mt-5；序列卡 `mt-3 rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5` → mt-5。
2. **外壳高度**：RuntimePanelShell `h-[520px]` → `h-[530px]`，`xl:h-[480px]` 不变。事件面板 <xl 堆叠：66 + 20 + 128 + 20 + 106 = 340px；移动/lg 内容盒 530−79−72−32 = 347 ≥ 340 ✔；sm 内容盒 367 ✔；xl+ 堆叠 300 ≤ 317 ✔。上下文面板移动/lg 内容盒 367 → 网格 flex-1 约 177（两行各约 84.5）✔；xl+ 固定堆叠 270 ≤ 317 ✔。
3. **同步更新**：scripts/harness-check.mjs 与 tests/visual.spec.ts 中 shell 高度字符串与 5 处 mt-5 断言。
4. **不变项**：两面板区域结构、时间轴与 Active 轮转、进度条联动、卡片内部三行内容、footer 文案、IconBox 体系、其余 Capability 面板（tools/skills/guardrails/trace 经 flex-1/mt-auto 自适应吸收）。

---

## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESSENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md`
- `doc/tasks/review/TASK-008.14-device-agent-context-card-content-and-gap.md`

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
| components/product/device-agent/runtime/RuntimePanelShell.vue | 外壳 h-[520px] → h-[530px] |
| components/product/device-agent/runtime/RuntimeEventPanel.vue | 两处区域间距 mt-3 → mt-5 |
| components/product/device-agent/runtime/RuntimeContextPanel.vue | 三处区域间距 mt-3 → mt-5 |
| scripts/harness-check.mjs | 更新 shell 高度与 mt-5 断言 |
| tests/visual.spec.ts | 更新对应视觉断言 |
| doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md | 补充间距 mt-5 实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.15): 运行面板区域间距 mt-3 → mt-5 |
| Commit Hash    | ee60c62 |

---

## 完成说明
- 两面板 5 处区域间距 mt-3 → mt-5：事件面板事件条卡、流水线行；上下文面板进度条行、来源网格、序列卡。
- RuntimePanelShell 外壳 `h-[520px]` → `h-[530px]`（`xl:h-[480px]` 不变）：事件面板 <xl 堆叠由 324px 增至 340px，移动/lg 内容盒 347px 恰好容纳（7px 余量），sm 内容盒 367px、xl+ 内容盒 317px ≥ 堆叠 300px。
- 上下文面板：来源网格 <xl 保持 flex-1 铺满（移动/sm/lg 两行各约 82–84px），xl+ flex-none 自然高度 80px；固定堆叠 270px ≤ 317px。
- harness-check.mjs 与 visual.spec.ts 同步更新 shell 高度字符串与 5 处 mt-5 字面量断言。
- CDP 实测 5 断点（375/768/1024/1280/1536）：两面板 scrollH ≤ clientH 无溢出、无裁切。
- 门禁全绿：pnpm lint、typecheck、test（75）、test:visual（27）、harness:engineering、build；构建产物含 `h-\[530px\]` 与 `mt-5`。
