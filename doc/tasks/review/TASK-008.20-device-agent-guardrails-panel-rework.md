# TASK-008.20：安全执行护栏面板重构（参考图三列布局 + 减法精简 + 四步轻量 Stepper）
---
* TaskName：按参考图重构「安全执行护栏」动画面板并做减法精简：待执行动作 / Guardrails 校验 + 单行风险 / 人工审批三列常驻布局，底部四步轻量 Stepper，完整演绎 动作 → 校验 → 风险 → 审批 → 执行 → 验证 → 完成 一轮真实设备安全执行
* TaskDescription：外壳尺寸 / 标题样式 / Footer 严格保持 Skills 面板同款（RuntimePanelShell h-530 / xl-480）。参考图（image copy.png）三列内容落地后按减法要求精简：左列仅保留 device.command / ESS-01 / 调整充电功率 / 500 kW → 420 kW（主视觉，虚线箭头 + 执行光点，执行后 500 kW 划线）；中列 Guardrails 校验保留 4 项压缩行（01 身份与权限 / 02 设备范围 / 03 参数边界 / 04 运行安全策略，无描述，状态 ✓ emerald / spinner primary / ○ muted 切换），底部单行风险结果「中风险 · ALLOW_WITH_APPROVAL · 需人工审批」；右列人工审批卡（等待审批 amber → 已批准 emerald，ESS-01 / 调整充电功率 / 500 kW → 420 kW 三行，拒绝 / 批准按钮，批准等待期轻微 primary 高亮、批准后填充，不模拟点击）。xl 两条列间虚线连接线（固定端点节点 + 单光点：动作→校验 1.0~1.6s、校验→审批 4.4~5.0s）。底部单行轻量 Stepper：安全校验 → 人工审批 → 指令执行 → 结果验证（图标 + 名称 + xl 状态词；当前 primary / 已完成 emerald / 未执行 muted，箭头随下一步激活点亮）。全元素第一帧常驻，仅颜色 / 状态 / 路径亮度 / 单光点变化；循环约 11.2s。
* TaskCreator：Claude
* TaskCreationTime：2026-08-20
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.20 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **时间线**（useGuardrailsTimeline.ts，useRuntimeTimeline(10000) + 1.2s 停留 ≈ 11.2s 循环）：
   - 0~1.0s Ready（全 muted）；1.0s 待执行动作轻微高亮 + 左连接线 primary + 光点 1.0~1.6s；
   - 1.6s 起 4 项校验依次 Active→Passed（各 700ms，1.6/2.3/3.0/3.7 → 4.4s 全通过），校验项始终存在只切状态；
   - 4.4s 风险行高亮 + 右连接线 primary + 光点 4.4~5.0s；5.0s 人工审批 Active「等待审批」+ 批准按钮轻微高亮；6.2s 「已批准」；
   - 6.4s 指令执行（500 kW 划线、420 kW primary、箭头光点 6.4~7.4s）；7.4s 结果验证；8.4s 全部完成（Stepper 全 emerald）；停留至 10s 平滑回 Ready。
2. **左列 待执行动作**（精简后）：Terminal 标题 + device.command（mono primary）+ ESS-01（text-sm 加粗）+ 调整充电功率（muted）+ 500 kW → 420 kW 主视觉盒（text-sm mono、虚线箭头 SVG、执行光点）；无字段标题 / 无生效方式。
3. **中列 Guardrails 校验**（精简后）：4 压缩行 `px-2.5 py-1.5`（mono 编号 + 短标题 + 右侧状态图标）；底部 border-t 单行风险：中风险（amber + TriangleAlert）· ALLOW_WITH_APPROVAL（mono，base 隐藏）· 需人工审批。
4. **右列 人工审批**（精简后）：UserRound 标题 + 等待审批/已批准 chip；ESS-01 / 调整充电功率 / 500 kW → 420 kW 三行；拒绝 / 批准按钮（状态色切换，不模拟点击）。
5. **列间连接线**（xl only）：`w-5` 虚线 SVG（dasharray 3 4、linecap round、/30 → /70）+ 固定 5px 端点节点 + 单光点按 grProgress 移动。
6. **底部轻量 Stepper**（RuntimeGuardrailsSequence.vue）：单行 `mt-auto pt-2 xl:pt-3`，四步 图标+名称+（xl 状态词 等待中/校验中/审批中/执行中/验证中/已通过/已批准/已下发/验证通过），ArrowRight 连接（下一步激活后 primary）；状态色 muted → primary → emerald。
7. **约束保持**：全元素第一帧常驻（无 opacity-0 门控、无 fade/slide/scale、无元素增删、无布局位移）；仅 Tailwind v4、无 `<style>`；Footer 单行 truncate 不变；base 断点两列 + 审批卡 col-span-2、风险 mono 段 sm 起显示、Stepper 状态词 xl 起显示。
8. **减法原则**：精简后不回填新内容，卡片 p-3、列间 gap-3/4 增加留白，2~3 秒可读「动作正在经过安全护栏 → 审批 → 执行 → 验证」。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/image copy.png`
- `doc/tasks/review/TASK-008.19-device-agent-skills-panel-rework.md`

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
| components/product/device-agent/runtime/useGuardrailsTimeline.ts | 新增：护栏时间线常量（10s 循环）+ grProgress / grCheckState 纯函数 |
| components/product/device-agent/runtime/RuntimeGuardrailsPanel.vue | 重写：三列常驻布局（待执行动作 / Guardrails 校验+单行风险 / 人工审批）+ xl 虚线连接线光点 + Footer |
| components/product/device-agent/runtime/RuntimeGuardrailsSequence.vue | 重写：单行四步轻量 Stepper（muted → primary → emerald） |
| scripts/harness-check.mjs | guardrails 断言块重写（精简文案 + Stepper 四步 + 无 opacity-0） |
| tests/visual.spec.ts | 同上视觉断言更新 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.20): 安全执行护栏三列常驻布局 + 四步轻量 Stepper |
| Commit Hash    | —    |

---
## 完成说明
- 先按参考图落地三列完整版（含执行预览 / 执行日志 / 字段式列表 / 五节点序列卡），再按减法要求精简：左列去字段标题、中列去描述并单行风险、右列去字段列表与辅助卡、序列改四步 Stepper，信息密度降至 2~3 秒可读。
- 精简同时解决初版 378 行超 300 行限制与 base 断点 15px 内容溢出：最终面板 280 行、Stepper 97 行；base 间距 `mt-2.5 / gap-1 / pt-2`、xl `mt-3 / gap-1.5 / pt-3` 双档留白。
- 动画全常驻零增删：校验行 ✓/spinner/○ 切换、审批 chip 等待审批→已批准、批准按钮轻微高亮→填充、500 kW 划线→420 kW primary、两条 xl 连接线单光点、Stepper muted→primary→emerald。
- CDP 实测 375 / 768 / 1536 三断点 × 五阶段（ready / checks / approval / exec / done）：`bodyScrollH == bodyClientH`（base 397 / xl 347）零内容溢出，`document/section scrollWidth == clientWidth` 零横向溢出；状态文本逐阶段采样正确（校验中→已通过、等待审批→已批准、执行中→已下发、验证通过）。
- 门禁全绿：eslint、typecheck、vitest（75 例）、harness:engineering、build。

## 2026-08-21 迭代记录
- 按页面反馈将三列标题「待执行动作 / Guardrails 校验 / 人工审批」统一调整为 `text-sm`。
- 将底部四步由轻量 Stepper 调整为 4 个 IconBox 卡片：安全校验（权限·参数·策略校验）、人工审批（人工审批确认）、指令执行（指令下发执行）、结果验证（执行结果验证）。
- 同步更新 Harness 与视觉契约，校验 IconBox 四卡片结构与新副标题文案。
