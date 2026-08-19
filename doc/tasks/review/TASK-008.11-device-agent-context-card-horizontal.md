# TASK-008.11：Device Agent 上下文来源卡左右布局与面板间距加大
---
* TaskName：来源卡 icon/文字左右布局 + 主卡/来源卡/序列卡间距加大
* TaskDescription：按用户反馈调整 RuntimeContextPanel：1）四个上下文来源卡片内部由垂直堆叠改为左右布局（IconBox 居左，标题 + 状态居右，垂直居中，truncate 防溢出）；2）加大主卡片、来源卡片、上下文构建序列卡片之间的上下间距（mt-1.5 → mt-3）。来源网格改为 flex-1 自适应拉伸（移除 sm:max-h-36 上限与 mt-auto），sm–lg 断点 2×2 排布（lg 面板列宽 592px 时四列横排文字会被截断），xl+ 恢复单行四列。
* TaskCreator：Claude
* TaskCreationTime：2026-08-19
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.11 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **来源卡左右布局**：卡片 `flex h-full items-center gap-2.5 rounded-lg border p-2.5 sm:p-3`（去掉 flex-col/justify-center 垂直堆叠）；左侧 IconBox size-40 shrink-0，右侧 `min-w-0 flex-1` 容器内标题 text-sm font-semibold 与状态 font-mono text-xs 均 truncate 单行。
2. **间距加大**：主卡 → 来源网格 `mt-1.5` → `mt-3`；来源网格 → 序列卡由 `mt-auto` 改为 `mt-3`；序列卡不再吸底，间距确定性。
3. **网格自适应**：来源网格 `mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4`（去掉 sm:max-h-36 / sm:flex-1 / sm:grid-rows-1）。lg 面板列宽约 592px、内部可用约 518px，四列卡片仅约 123px 宽，左右布局下文字区不足；故 sm–lg 采用 2×2（卡宽 ≥255px），xl+（列宽 ≥848px）单行四列。
4. **高度预算**（shell 内容区：移动 359 / sm 319 / lg+ 299）：主卡 64 + mt-3 12 + 网格 flex-1（移动 215 两行各 ~103；sm 175 两行各 ~81；lg 155 两行各 ~71；xl+ 单行 155）+ mt-3 12 + 序列卡 56，各断点恰好填满，无溢出、无布局跳动。
5. **不变项**：时间轴（0.5s→7.8s Context Ready，8800ms + 1200ms hold 循环）、主卡结构与徽标、上下文构建序列终端卡、四来源 Active 轮转配色、footer 单行文案、IconBox 图标体系。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md`
- `doc/tasks/review/TASK-008.10-device-agent-context-panel-simplify.md`

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
| components/product/device-agent/runtime/RuntimeContextPanel.vue | 来源卡左右布局、间距 mt-3、网格 flex-1 自适应（sm–lg 2×2，xl+ 四列） |
| scripts/harness-check.mjs | 更新上下文面板 harness 断言，匹配左右布局与间距 |
| tests/visual.spec.ts | 更新上下文面板视觉断言，覆盖左右布局类名并断言不再含 mt-auto |
| doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md | 补充来源卡左右布局与间距加大实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.11): 上下文来源卡左右布局与面板间距加大 |
| Commit Hash    | 46f0207 |

## 完成说明
按用户两条反馈完成 RuntimeContextPanel 调整：1）四个上下文来源卡内部由垂直堆叠改为左右布局——IconBox 居左（size 40），右侧 min-w-0 flex-1 容器内标题 text-sm 与状态 font-mono text-xs 均 truncate 单行；因 lg 断点面板列宽约 592px、四列横排单卡仅约 123px 宽导致文字区不足，来源网格改为 sm–lg 2×2、xl+ 单行四列，并以 flex-1 自适应拉伸填充（移除 sm:max-h-36 与 mt-auto，间距确定性）。2）主卡→来源卡、来源卡→序列卡间距由 mt-1.5/mt-auto 统一加大为 mt-3。经 headless Chromium 实测验证 flex 拉伸与 2×2 隐式行填充行为：移动 359 / sm 319 / lg+ 299 内容区各断点恰好填满，无溢出无跳动。时间轴、Active 轮转、footer 单行文案与 IconBox 体系不变。Lint、Typecheck、Vitest（75/75）、Visual（27/27）、Harness、Build 均通过，产物 CSS 含新类名，SSR 抽查 HTTP 200。
