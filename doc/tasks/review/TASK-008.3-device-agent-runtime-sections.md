# TASK-008.3：Device Agent 页新增智能体架构 / 核心价值 / 核心能力 Section
---
* TaskName：Device Agent 页新增 Section2-4（智能体架构 / 核心价值 / 核心能力）
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/NewSection.md` 在 `/products/device-agent` 页面新增三个 Section：Section2 智能体架构（ProductSystemFlowFrame 占位）、Section3 核心价值（1×3 数字 icon 卡片）、Section4 核心能力（EMQX emqx-agents 式左 6 Tab + 右动画的 Agent Runtime 展示，统一 ESS-01 储能柜电芯温度异常案例）。
* TaskCreator：Claude
* TaskCreationTime：2026-08-14
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.3 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
在 TASK-008.2 已落地的 Device Agent 页面（`pages/products/device-agent.vue`）基础上，按 NewSection.md 新增三个 Section：

1. **Section2 智能体架构**：标题「从设备模型，到真正会行动的 Agent」，使用 `ProductSystemSection` + `ProductSystemFlowFrame`（flow 暂不传入，仅占位）。
2. **Section3 核心价值**：标题「Device Agent解决的三个关键问题」，`ProductFeatureGridSection` 1×3，icon 去边框、使用数字 icon（01/02/03）。
3. **Section4 核心能力**：标题「为设备事件而生的 Agent Runtime」，参考 EMQX emqx-agents 能力区布局（`grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-10`），左侧 6 个能力 Tab + 右侧对应动画面板；6 个能力为多源事件触发 / 设备上下文融合 / MCP 工具连接 / Skills 按需挂载 / 安全执行护栏 / 全链路可观测；统一使用 ESS-01 储能柜电芯温度异常案例，形成事件发生 → 上下文构建 → 工具调用 → Skills 挂载 → 安全执行 → Trace 追踪的完整闭环。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/NewSection.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/DEVICEAGENT.md`
- `doc/tasks/review/TASK-008.2-device-agent-product-page.md`

---
## 实现内容
1. Section2：新增 `components/product/device-agent/DeviceAgentArchitectureSection.vue`（ProductSystemSection + ProductSystemFlowFrame 占位，flow 暂不传入）。
2. Section3：新增 `components/product/device-agent/DeviceAgentValueSection.vue`（ProductFeatureGridSection columns=three + `:icon-bordered="false"`），数据 `deviceAgentValueItems`（iconLabel 01/02/03）放入 `data/device-agent.ts`；扩展公共 `FeatureCard` iconLabel 分支使其尊重 `iconBordered` / `iconFilled`（向后兼容，默认渲染不变）。
3. Section4：新增 `components/product/device-agent/DeviceAgentRuntimeSection.vue` 及 `runtime/` 目录下 6 个动画面板组件 + `useRuntimeTimeline.ts` SSR 安全计时 composable；Tab 交互与右侧容器按参考页 1:1 复刻（Active 竖线 / 图标 / 渐变背景、Hover 箭头、固定面板高度 h-[520px] sm:h-[480px] lg:h-[460px]、font-mono 技术数据、小 Badge），暗色主题适配 `bg-muted/N` → `bg-dt-bg-soft/N`、`border-muted/60` → `border-dt-line-strong/60`；Trace 面板底部提供「重放本次运行」按钮。
4. 页面装配：`pages/products/device-agent.vue` 在 Section1（智能体生态）后依次装配 Section2/3/4。
5. Harness 与测试：`scripts/harness-check.mjs` 增加 requiredFiles 与类名断言；`tests/visual.spec.ts` 与 `tests/device-agent-content.spec.ts` 扩展契约与内容断言。
6. 文档：`COMMON_SECTION_COMPONENTS.md`（FeatureCard iconLabel 配置说明）、`NewSection.md` 追加实现说明。
7. 面板排版优化（用户反馈）：针对首版动画排版错乱与字号过小，6 个动画面板整体重构——正文不小于 11px（紧凑行 `text-[11px] leading-4`，仅 Trace 时间戳 `text-[10px]`），按 lg 内层约 348px 高度预算预留固定布局区域、全部元素一次性渲染仅以 opacity 渐显；Skills 任务链改横向、MCP 工具调用改双卡片 + 3 列工具格、Trace 改单行条目 + 竖线连接、审批与执行双栏排布；进度条宽度类按 1% 粒度生成以精确匹配百分比文案。

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
| `pages/products/device-agent.vue` | Section1 后依次装配 Section2/3/4 |
| `components/product/device-agent/DeviceAgentArchitectureSection.vue` | 新增：Section2 智能体架构（ProductSystemSection + ProductSystemFlowFrame 占位） |
| `components/product/device-agent/DeviceAgentValueSection.vue` | 新增：Section3 核心价值（1×3 数字 icon、去边框） |
| `components/product/device-agent/DeviceAgentRuntimeSection.vue` | 新增：Section4 核心能力（左 6 Tab + 右动画面板，EMQX 参考布局） |
| `components/product/device-agent/runtime/RuntimePanelShell.vue` | 新增：面板公共外壳（固定高度、Badge、入场动画） |
| `components/product/device-agent/runtime/RuntimeEventPanel.vue` | 新增：多源事件触发动画面板 |
| `components/product/device-agent/runtime/RuntimeContextPanel.vue` | 新增：设备上下文融合动画面板 |
| `components/product/device-agent/runtime/RuntimeToolsPanel.vue` | 新增：MCP 工具连接动画面板 |
| `components/product/device-agent/runtime/RuntimeSkillsPanel.vue` | 新增：Skills 按需挂载动画面板 |
| `components/product/device-agent/runtime/RuntimeGuardrailsPanel.vue` | 新增：安全执行护栏动画面板 |
| `components/product/device-agent/runtime/RuntimeTracePanel.vue` | 新增：全链路可观测 Trace 面板（含重放按钮） |
| `components/product/device-agent/useRuntimeTimeline.ts` | 新增：SSR 安全 rAF 计时 composable + 1% 粒度进度条宽度类 |
| `components/common/card/FeatureCard.vue` | iconLabel 分支支持 `iconBordered` / `iconFilled`（向后兼容） |
| `data/device-agent.ts` | 新增核心价值项、Runtime Tab、Trace 步骤数据与类型 |
| `assets/css/tailwind.css` | 新增 `--animate-panel-in` token 与 keyframes |
| `scripts/harness-check.mjs` | 新增文件清单与类名/文案断言 |
| `tests/visual.spec.ts` | 新增 Section2/3/4 契约与闭环断言 |
| `tests/device-agent-content.spec.ts` | 新增核心价值项 / Tab / Trace 步骤内容断言 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 FeatureCard iconLabel 配置说明 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/NewSection.md` | 追加实现说明与排版优化补充 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.3): add device agent architecture, value, and runtime sections |
| Commit Hash    | 4a8d234 |

## 完成说明
三个 Section 已按 NewSection.md 全部落地并通过质量门禁（lint / typecheck / 75 项单测 / 27 项视觉契约 / harness / build）。Section4 六个动画面板统一使用 ESS-01 储能柜电芯温度异常案例，形成事件发生 → 上下文构建 → 工具调用 → Skills 挂载 → 安全执行 → Trace 追踪的完整闭环；针对用户反馈的排版错乱与字号过小问题，已按高度预算整体重构面板排版（正文 ≥11px、opacity-only 渐显、无布局跳动）。构建产物 CSS 已验证包含全部任意值类，SSR 页面渲染正常。
