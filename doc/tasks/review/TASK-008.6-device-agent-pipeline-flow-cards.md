# TASK-008.6：Device Agent 事件面板流水线卡片内容布局与流向动画
---
* TaskName：流水线卡片内容布局重做（大 icon + 描述 + 状态行 + 卡片间流线）
* TaskDescription：按用户反馈重做事件触发面板底部流水线：事件校验 / 事件去重 / 上下文构建三张卡片不再只是三个独立方块，而是形成明显的 Pipeline——每张卡片使用大 icon（BadgeCheck / CopyCheck / Database）+ 标题 + 描述 + 状态行（处理中... → ✓ 校验通过 / ✓ 去重完成 / 构建中...），卡片之间以流线（ArrowRight）连接并随状态推进依次点亮，上下文构建阶段图标保持轻微 Pulse，直观呈现「事件进入 → 校验 → 去重 → Context Build → 唤醒 Agent」。
* TaskCreator：Claude
* TaskCreationTime：2026-08-17
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.6 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **卡片内容布局**：每张卡片 = 大 icon（`size-6`）+ 标题 + 描述（验证来源与事件结构 / 过滤短时重复事件 / 关联设备与历史上下文）+ 状态行；状态行随动画演变：待处理 → 处理中...（LoaderCircle 旋转）→ ✓ 校验通过 / ✓ 去重完成（CircleCheck），上下文构建为「构建中...」并保持进行中。
2. **Pipeline 流线**：卡片之间以 ArrowRight 流线连接（`sm+` 显示），当流转到下一张卡片时流线点亮（muted/40 → primary），形成「事件进入 → 校验 → 去重 → Context Build → 唤醒 Agent」的视觉动线。
3. **图标 Pulse**：处于 active 阶段的卡片图标附加 `animate-pulse` 轻微脉动（上下文构建在循环终态前持续 active，因此持续脉动）。
4. **响应式**：移动端卡片内容纵向居中排布并隐藏描述行，`sm+` 恢复横向 icon + 文本布局；面板高度预算不变（lg 内容 ≤297px）。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/core_competence.md`
- `doc/tasks/review/TASK-008.5-device-agent-runtime-loop-and-footer.md`

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
| `components/product/device-agent/runtime/RuntimeEventPanel.vue` | 流水线卡片重做：大 icon（BadgeCheck / CopyCheck / Database）+ 标题 + 描述 + 状态行；ArrowRight 流线连接卡片并随流转点亮；active 阶段图标 animate-pulse |
| `scripts/harness-check.mjs` | 更新流水线结构断言（描述文案 / 状态文案 / 图标 / 流线 / pulse） |
| `tests/visual.spec.ts` | 同步新增流水线流向契约断言 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/core_competence.md` | 追加流水线内容布局重做补充说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.6): rework pipeline cards into a connected flow with big icons |
| Commit Hash    | f056bfb |

## 完成说明
流水线三卡片已按反馈重做并通过全部质量门禁（lint / typecheck / 75 项单测 / harness / build）：每张卡片为大 icon（BadgeCheck / CopyCheck / Database，Layers3 不在 @lucide/vue 中故上下文构建使用 Database）+ 标题 + 描述 + 状态行，状态随动画演变——待处理 → 处理中...（LoaderCircle 旋转）→ ✓ 校验通过 / ✓ 去重完成（CircleCheck），上下文构建保持「构建中...」；卡片间以 ArrowRight 流线连接（sm+ 显示），流转时由 muted 转 primary，active 卡片图标附加 animate-pulse 轻微脉动，形成「事件进入 → 校验 → 去重 → Context Build → 唤醒 Agent」的动线。移动端卡片纵向居中并隐藏描述行，lg 内容高度 272px 仍在 297px 预算内。构建 CSS 与 SSR 抽测确认新结构渲染正常。
