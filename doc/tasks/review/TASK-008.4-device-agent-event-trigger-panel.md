# TASK-008.4：Device Agent 核心能力「多源事件触发」右侧动画调整
---
* TaskName：多源事件触发右侧动画调整（DEVICE AGENT 状态卡 + 4 进度条 + footer 文案）
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/core_competence.md` 调整 `/products/device-agent` Section4「多源事件触发」右侧动画面板：顶部新增 EMQX 参考样式的 DEVICE AGENT 状态卡（ping 图标 + 等待事件→事件已触发），中部卡片将参考页 3 条进度条扩展为 4 条并对应四类事件源，底部流水线字体升级为 text-sm，说明文案移出内层卡片至面板 footer。
* TaskCreator：Claude
* TaskCreationTime：2026-08-17
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.4 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
在 TASK-008.3 已落地的 RuntimeEventPanel 基础上，按 core_competence.md 调整「多源事件触发」右侧动画（仅 Tailwind CSS v4，不允许新建样式）：

1. **顶部 DEVICE AGENT 状态卡**：参考 EMQX `rounded-xl border border-primary/20 bg-primary/5 p-4` 结构——左侧带 `animate-ping` 覆盖层的 primary 图标框 + `text-xs font-medium text-primary` 标签（topic filter → **DEVICE AGENT**）+ `font-mono font-semibold text-highlighted` 状态值（factory/+/robot/+ → 默认 **等待事件**），右侧圆角徽标。
2. **中部事件进度卡**：参考 EMQX `rounded-xl border border-muted/60 bg-default p-4` 结构，将 3 条进度条（`h-1.5 flex-1 rounded-full transition-colors duration-200`）扩展为 **4 条**，分别对应设备事件（61.8°C）/ 指标告警（当前 61.8°C）/ 规则事件（已命中）/ 定时任务（10:00）；进度条随事件到达由 muted 转 primary 并展示对应事件内容。**4 条进度条全部完成后，顶部状态值由「等待事件」变为「事件已触发」。**
3. **底部流水线**：保留现有布局与交互（事件校验 ✓ / 事件去重 ✓ / 上下文构建 进行中），字体改为 **text-sm**。
4. **说明文案外移**：「让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。」移出内层卡片，放入面板底部 footer（`border-t` + `px-5 py-4` + `max-w-xl text-sm text-muted lg:line-clamp-2`）；为此 `RuntimePanelShell` 新增可选 `footer` 插槽（其余 5 个面板不受影响）。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/core_competence.md`
- `doc/tasks/review/TASK-008.3-device-agent-runtime-sections.md`

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
| `components/product/device-agent/runtime/RuntimeEventPanel.vue` | 按 EMQX 参考重构：DEVICE AGENT 状态卡（ping 图标 + 等待事件→事件已触发 + 实时徽标）、4 条事件进度条卡片、text-sm 流水线、说明文案移入 footer |
| `components/product/device-agent/runtime/RuntimePanelShell.vue` | 新增可选 `footer` 插槽（`border-t border-dt-line-strong/40 px-5 py-4`），其余面板不受影响 |
| `scripts/harness-check.mjs` | 新增 shell footer 插槽与事件面板新结构断言 |
| `tests/visual.spec.ts` | 同步新增 shell footer 与事件面板结构契约断言 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/core_competence.md` | 追加实现说明（TASK-008.4） |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.4): rework event trigger panel with DEVICE AGENT status card and footer caption |
| Commit Hash    | 26ec67d |

## 完成说明
已按 core_competence.md 完成「多源事件触发」右侧动画调整并全部通过质量门禁（lint / typecheck / 75 项单测 / harness / build）：顶部 DEVICE AGENT 状态卡使用参考页 primary 卡片结构并带 `animate-ping` 图标覆盖层，状态值在 4 条进度条全部点亮后由「等待事件」切换为「事件已触发」；中部卡片将参考页 3 条进度条扩展为 4 条并对应四类 ESS-01 事件源，事件内容随进度条同步渐显；底部流水线保留原布局与交互、字体升级为 text-sm；说明文案经新增的 shell footer 插槽移出内层卡片。因站点主题无 success 色，徽标采用 primary 等价样式；全程 Tailwind-only，未新增 `<style>`。构建产物 CSS 已验证包含 `animate-ping`、`h-1.5`、`lg:line-clamp-2`、`border-primary/20` 等新类，SSR 渲染正常。
