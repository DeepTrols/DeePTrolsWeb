# TASK-008.10：Device Agent 上下文面板主卡简化、来源卡加高与 footer 单行
---
* TaskName：上下文面板主卡简化 + 来源卡加高改字号 + footer 不换行
* TaskDescription：按用户反馈调整 RuntimeContextPanel：1）主卡去掉 8 个字段与知识参考，改为与多源事件触发首层卡片一致的样式（size-10 icon + 「ESS-01 设备上下文」标题 + 描述，右侧 构建中/已就绪 圆角徽标）；2）四个来源卡加高（垂直布局、内容居中），标题 实时数据/历史时序/设备状态/知识库 字号 text-sm，去掉描述行，状态内容（61.8°C · 500 kW 等）字号 text-xs；3）footer 说明文案不换行（truncate 单行，title 悬停全文）。
* TaskCreator：Claude
* TaskCreationTime：2026-08-19
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.10 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **主卡简化**：去掉运行状态/最高温度/历史基线/PCS/SOC/充电功率/偏离幅度/BMS 8 个字段与知识参考行；主卡结构与事件触发面板首层卡片一致——`rounded-xl border border-primary/20 bg-primary/5 p-3` 内 `flex items-center justify-between`：左侧 size-10 圆角 icon（Box，构建期 ping 覆盖层）+ 「ESS-01 设备上下文」+ 描述「正在融合实时状态、历史时序、设备信息与知识数据。」，右侧 `rounded-full bg-primary/10` 徽标 构建中 → 已就绪。
2. **来源卡加高**：垂直布局（IconBox + 标题 + 状态，内容居中），sm+ 网格 `flex-1 max-h-36 grid-rows-1` 拉伸填充；标题 text-sm font-semibold，删除描述行，状态 font-mono text-xs；Active/完成态配色不变。
3. **footer 单行**：`truncate text-sm text-muted`（不换行，title 悬停全文），去掉 max-w-xl 与 line-clamp-2。
4. **高度预算**：主卡 64 + 来源卡 ≤144（移动端自然高 2×104+8）+ 序列卡 56，终端卡 `mt-auto` 贴底；footer 恒为单行（53px），lg 内容区 ≈299px、移动端 ≈359px，各断点无溢出、无布局跳动。
5. **不变项**：时间轴（0.5s→7.8s Context Ready，8800ms + 1200ms hold 循环）、上下文构建序列终端卡、四来源 Active 轮转、IconBox 图标体系。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md`
- `doc/tasks/review/TASK-008.8-device-agent-context-panel-rework.md`

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
| components/product/device-agent/runtime/RuntimeContextPanel.vue | 主卡简化为事件触发首层样式、四来源卡加高改字号、footer 单行 truncate |
| scripts/harness-check.mjs | 更新上下文面板 harness 断言，匹配新主卡/来源卡/footer 结构 |
| tests/visual.spec.ts | 更新上下文面板视觉断言，覆盖主卡徽标、来源卡网格与单行 footer |
| doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md | 补充主卡简化与来源卡加高实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.10): 上下文面板主卡简化、来源卡加高与 footer 单行 |
| Commit Hash    | e07739e |

## 完成说明
按用户三条反馈完成 RuntimeContextPanel 调整：1）主卡去掉 8 个字段与知识参考，改为与多源事件触发首层卡片一致的样式（size-10 icon + 「ESS-01 设备上下文」标题 + 描述，右侧 构建中/已就绪 圆角徽标）；2）四个来源卡加高为垂直布局（IconBox + 标题 + 状态，内容居中），标题 text-sm、状态 text-xs 并删除描述行；3）footer 说明文案改为 truncate 单行不换行，title 悬停查看全文。时间轴与上下文构建序列保持不变。Lint、Typecheck、Vitest（75/75）、Visual（27/27）、Harness、Build 均通过，产物 CSS 含新类名，SSR 抽查 HTTP 200。
