# TASK-008.21：全链路可观测动画面板重设计
---
* TaskName：重设计 Device Agent「全链路可观测」右侧动画
* TaskDescription：参考同页「多源事件触发、设备上下文融合、MCP 工具连接、Skills 按需挂载、安全执行护栏」动画风格，重构「运行 Trace」面板为常驻元素、状态切换、卡片化链路与观测详情组合，保留耗时 / 工具调用 / Skills 指标与自动循环播放能力。
* TaskCreator：Codex
* TaskCreationTime：2026-08-21
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-008.21 |
| Epic | EPIC-008 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/NewSection.md`
- `doc/tasks/review/TASK-008.3-device-agent-runtime-sections.md`

## 任务目标
1. Trace 面板保持 `RuntimePanelShell` 外壳、固定高度与深色卡片语言。
2. 所有 Trace 元素始终存在，不再用 `opacity-0` 隐藏待执行节点。
3. 当前节点使用 `primary`，已完成节点使用 `emerald` 完成状态，未执行节点使用 `muted`。
4. 视觉结构参考前序动画：小卡片、IconBox、连接箭头/线、状态 chip、实时指标与自动循环播放。
5. 同步更新 Harness 与视觉契约，防止回退为静态日志列表。

## 实施记录
- 已读取现有 Trace 面板、前序 Runtime 动画结构、NewSection 产品文档与工程约束。
- 已重构 `RuntimeTracePanel.vue`：顶部指标 + 常驻 Trace Span 链路 + 当前 Span 详情。
- 已移除 Trace 待执行节点的 `opacity-0` 隐藏逻辑，改为 pending / current / done 三态切换。
- 已更新 Harness 与视觉契约，锁定 IconBox、ArrowRight、当前 Span、三态卡片、无 `opacity-0`。
- 已更新产品需求实现补充。
- 2026-08-22 修正 Trace 面板高度溢出：去掉独立连接行，将 ArrowRight 收进 Trace Span 卡片，压缩顶部指标、右侧详情与主内容间距；浏览器复测 `overflowingElements: []`，面板外框 `scrollHeight` 与 `clientHeight` 对齐。
- 2026-08-22 按反馈移除「重放本次运行」按钮，Trace 依赖统一运行时循环自动重播，释放底部高度预算。
- 2026-08-24 按反馈细调 Trace 面板：指标 label 改为 `text-xs leading-5`，指标值改为 `text-sm leading-5`；7 个进程外层改 `gap-2`，单个进程内部改 `gap-5`；Observability 标题改 `text-sm font-semibold`，说明文案改 `mt-2 leading-5`。

## 修改文件
| 文件 | 说明 |
|----|----|
| `components/product/device-agent/runtime/RuntimeTracePanel.vue` | 重构全链路可观测动画面板 |
| `tests/visual/product-aiiot/device-agent-panels.contract.ts` | 增加 Trace 面板视觉契约 |
| `scripts/harness/checks/product-aiiot/device-agent-runtime-final.mjs` | 增加 Trace 面板 Harness 约束 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/NewSection.md` | 补充 TASK-008.21 实现说明 |
| `doc/tasks/review/TASK-008.21-device-agent-trace-panel-redesign.md` | 新增本任务记录 |

## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] 单元测试通过
- [x] 视觉契约通过
- [x] Harness Engineering 检查通过
- [x] Build 成功
- [x] Git Commit / Push 完成

## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，10 files / 82 tests |
| `pnpm test:visual` | 通过，34 tests |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过；存在当前项目既有 Tailwind CSS 优化警告与 Nuxt 插件耗时提示 |
| 浏览器高度复测 | 通过，Trace 面板外框 `480px`、内部 slot `402px`、Trace 列表 `258px`，`overflowing: []` |

## 已知问题
- 无新增已知问题。
