# TASK-008.9：Device Agent MCP 工具连接面板对齐
---
* TaskName：MCP 工具连接动画面板对齐（mcp_dev 规范）
* TaskDescription：按需求方提供的 `mcp_dev.md`（inline 规范，仓库中无对应文件）对齐 RuntimeToolsPanel：shell 标题改为「MCP 工具连接」并启用 `badge-dot`（6 个可用）；Agent 判断卡在调用阶段由 Active 回落为普通态；两次工具调用（timeseries.query / knowledge.search）参数与结果按 150ms 逐行 stagger 渐显；底部保留 6 工具格与「下一步动作：创建储能运维工单」；新增 shell footer 说明文案。时间轴重排为 7200ms（+1200ms hold ≈ 8.4s 重播）。全部 Tailwind CSS v4，不新增样式块。
* TaskCreator：Claude
* TaskCreationTime：2026-08-19
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.9 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **面板标题**：shell 标题「MCP 工具」→「MCP 工具连接」，徽标保持「6 个可用」并启用 `badge-dot`（复用 TASK-008.8 的 RuntimePanelShell `badgeDot` prop）；`data/device-agent.ts` tools Tab `panelTitle` 同步。
2. **Agent 判断卡**：0.5s 渐显并进入 Active 态（`border-primary/40 bg-primary/5`），第一次调用开始（1.8s）后回落为普通态（`border-dt-line-strong/60 bg-dt-bg-soft/20`）。
3. **调用卡 1（查询历史时序 / timeseries.query）**：1.8s 卡片渐显并 Active；2.0s 起参数（设备 ESS-01 / 指标 最高电芯温度 / 时间范围 近 7 天）按 150ms stagger 逐行渐显；2.6s 右上角 `CircleCheck 284 ms`，卡片 Active 至 4.0s；2.8s 起结果 chips（基线 42.6°C / 当前 61.8°C / 偏离 +45.1%）逐枚渐显。
4. **调用卡 2（查询知识库 / knowledge.search）**：4.0s 渐显并 Active；4.2s 参数行（查询：电芯持续高温原因）渐显；4.8s `CircleCheck 176 ms`；5.0s 「找到 3 条相关知识」+ 结果 chips（热管理异常 / 电芯一致性异常 / 充电倍率过高）逐枚渐显，Active 至 6.2s。
5. **工具格与下一步**：底部 6 工具格（3 设备 + 2 数据 + 1 业务）保持 `mt-auto`，调用期间对应工具（timeseries.query / knowledge.search）高亮；6.2s 「下一步动作 → 创建储能运维工单」渐显。
6. **footer**：shell footer 插槽文案「Agent 通过 MCP 协议连接设备、数据与业务工具，在消息流中完成读取、查询、检索与执行。」。
7. **时间轴**：JUDGE 500 → CALL1_START 1800（params 2000 / done 2600 / results 2800）→ CALL2_START 4000（params 4200 / done 4800 / results 5000）→ NEXT 6200 → 总时长 7200ms，`useRuntimeTimeline(7200)` + 1200ms hold ≈ 8.4s 重播。全部元素一次渲染、仅 opacity 渐显，无布局跳动。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- 需求方 inline 规范 `mcp_dev.md`（随 TASK-008.9 指令提供，仓库中无对应文件）
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/NewSection.md`（MCP 工具连接面板章节）
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
| `components/product/device-agent/runtime/RuntimeToolsPanel.vue` | 标题改「MCP 工具连接」+ badge-dot；时间轴重排为 7200ms，判断卡 Active→普通态切换，双调用卡参数/结果按 150ms 逐行渐显，新增 footer（Tailwind-only，196 行） |
| `data/device-agent.ts` | tools Tab panelTitle 同步为「MCP 工具连接」 |
| `scripts/harness-check.mjs` | 更新 MCP 面板断言（标题/badge-dot/文案/时序常量/footer） |
| `tests/visual.spec.ts` | 闭环测试同步 MCP 面板断言 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/NewSection.md` | 追加 TASK-008.9 实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.9): MCP 工具连接面板对齐 mcp_dev 规范 |
| Commit Hash    | b871dc3 |

## 完成说明
按需求方 inline 规范 mcp_dev.md 对齐「MCP 工具连接」面板：shell 标题「MCP 工具连接 · 6 个可用」并启用 badge-dot（primary pulse 小圆点）；「Agent 判断」卡 0.5s 渐显并 Active，第一次调用开始后回落普通态；timeseries.query（参数 ESS-01 / 最高电芯温度 / 近 7 天，结果 基线 42.6°C / 当前 61.8°C / 偏离 +45.1%，284 ms）与 knowledge.search（查询 电芯持续高温原因，找到 3 条相关知识：热管理异常 / 电芯一致性异常 / 充电倍率过高，176 ms）双调用卡参数与结果按 ROW_STAGGER_MS=150 逐行 opacity 渐显，调用期间底部 6 工具格对应工具高亮；6.2s「下一步动作 → 创建储能运维工单」渐显；footer 为规范说明文案。时间轴 JUDGE 500 → CALL1 1800 → CALL2 4000 → NEXT 6200 → 总时长 7200ms，useRuntimeTimeline(7200) + 1200ms hold ≈ 8.4s 重播；全部元素一次渲染、仅 opacity 渐显，无布局跳动，全部 Tailwind CSS v4 无新增样式块。门禁全绿（lint/typecheck/vitest 75/75/visual 27/27/harness/build），构建产物 CSS 校验与 SSR 200 通过。mcp_dev.md 为 inline 规范（仓库中无对应文件），实现说明追加至 NewSection.md。
