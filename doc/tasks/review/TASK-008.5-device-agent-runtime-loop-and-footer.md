# TASK-008.5：Device Agent Runtime 动画循环播放、footer 分割线修正与流水线状态卡片
---
* TaskName：Runtime 动画循环播放 + 事件面板 footer 分割线贴合外框 + 流水线横向状态卡片
* TaskDescription：按用户反馈调整 Section4 Runtime 动画：1）整个动画需要循环——`useRuntimeTimeline` 播放至终态后停留片刻自动归零重播，6 个面板统一循环；2）事件面板底部说明文案的上边线（footer 分割线）应左右与面板外边框贴合，并与内层卡片保持间距；3）事件校验 / 事件去重 / 上下文构建改为横向三卡片，每张带 icon，通过背景色变化与状态 SVG 演变动画，且初始状态一直显示。
* TaskCreator：Claude
* TaskCreationTime：2026-08-17
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.5 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **动画循环**：`useRuntimeTimeline` 由「播放一次后停止」改为循环播放——elapsed 推进到 totalMs 后保持终态 `RUNTIME_LOOP_HOLD_MS`（1200ms），随后归零重播；Trace 面板「重放本次运行」仍可立即从第一阶段重播。
2. **footer 分割线修正**：`RuntimePanelShell` 的 footer 由 `p-5` 内衬区域移至面板根级，使 `border-t` 分割线左右贴合面板外边框；footer 与内层卡片之间恢复 `p-5` 底部留白间距（20px）。事件面板内容高度预算不变（lg ≈297px）。
3. **流水线横向状态卡片**：事件校验 / 事件去重 / 上下文构建由竖排渐显列表改为 `grid grid-cols-3` 横向三卡片，初始状态一直显示；每张卡片带主题 icon（ShieldCheck / Combine / Layers）与状态 SVG（CircleDashed 待处理 → LoaderCircle 进行中 → CircleCheck 完成），背景色随状态由 `bg-dt-bg-soft/20` → `bg-primary/10` → `bg-primary/5` 过渡；上下文构建在循环终态保持「进行中」。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/NewSection.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/core_competence.md`
- `doc/tasks/review/TASK-008.4-device-agent-event-trigger-panel.md`

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
| `components/product/device-agent/useRuntimeTimeline.ts` | 计时器改为循环播放：终态停留 `RUNTIME_LOOP_HOLD_MS`（1200ms）后 elapsed 归零重播 |
| `components/product/device-agent/runtime/RuntimePanelShell.vue` | footer 移至面板根级：分割线左右贴合外边框，与内层卡片保留 p-5 底部间距 |
| `components/product/device-agent/runtime/RuntimeEventPanel.vue` | 流水线改为横向三状态卡片：主题 icon + 状态 SVG 演变 + 背景色过渡，初始状态一直显示 |
| `scripts/harness-check.mjs` | 新增循环播放与流水线状态卡片断言 |
| `tests/visual.spec.ts` | 同步新增循环播放契约断言 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/NewSection.md` | 追加循环播放补充说明 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/core_competence.md` | 追加 footer 分割线修正与流水线卡片化补充说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.5): loop runtime animations and align panel footer divider |
| Commit Hash    | 8ae96fb |
| Commit Message（追加） | feat(TASK-008.5): turn event pipeline into three horizontal state cards |
| Commit Hash（追加） | 7969a8e |

## 完成说明
三项反馈均已落地并通过全部质量门禁（lint / typecheck / 75 项单测 / harness / build）：1）`useRuntimeTimeline` 以 `totalMs + RUNTIME_LOOP_HOLD_MS` 为周期循环推进，6 个 Runtime 面板动画播完终态停留 1200ms 后自动重播，Trace 面板「重放本次运行」仍可立即重置；2）事件面板 footer 分割线移至面板根级，左右与外边框贴合，并与内层卡片恢复 20px 间距，面板内容高度预算不变；3）事件校验 / 事件去重 / 上下文构建改为横向三卡片且初始状态一直显示，每张卡片带主题 icon 与状态 SVG（CircleDashed → LoaderCircle → CircleCheck）演变，背景色随阶段过渡，上下文构建在循环终态保持进行中。构建产物 CSS 与 SSR 抽测确认新结构渲染正常。
