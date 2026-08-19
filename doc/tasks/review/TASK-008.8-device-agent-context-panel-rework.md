# TASK-008.8：Device Agent 设备上下文融合面板重做
---
* TaskName：设备上下文融合动画面板重做（EMQX 工程化风格）
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md` 重做 RuntimeContextPanel：顶部标题「设备上下文引擎 · 实时构建」（shell 徽标前加 primary pulse 小圆点）；主卡（border-primary/20 bg-primary/5）展示 ESS-01 设备上下文（Box 图标 + 构建中/读取中/已就绪 徽标 + 融合描述 + 8 字段 2 列渐显 + 知识参考）；四个上下文来源卡（实时数据/历史时序/设备状态/知识库，IconBox 图标，依次 Active 轮转）；终端风「上下文构建序列」卡片每阶段只显示当前一条 context.* 调用与状态；底部 footer 说明文案。全部 Tailwind CSS v4，不新增样式块，循环播放（8800ms + 1200ms hold ≈ 10s 重播）。
* TaskCreator：Claude
* TaskCreationTime：2026-08-19
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.8 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **面板标题**：shell 标题改为「设备上下文引擎」，徽标改为「实时构建」，`RuntimePanelShell` 新增可选 `badge-dot`（徽标前 primary 小圆点 `animate-pulse`），其余面板不受影响。
2. **主卡**：`border-primary/20 bg-primary/5 rounded-xl`；Box 图标 + 「ESS-01 设备上下文」+ 阶段徽标（构建中 → 读取中 → 构建中 → 已就绪）+ 描述；8 个字段 `grid grid-cols-2` 随阶段渐显（opacity-only），61.8°C 使用 `text-amber-500`；知识参考行在知识阶段后渐显。
3. **四个来源卡**：`grid grid-cols-2 gap-2 sm:grid-cols-4`，每卡 IconBox（Activity / ChartNoAxesCombined / Cpu / BookOpen）+ 标题 + 描述（仅 xl+）+ 状态内容；按 实时数据 → 历史时序 → 设备状态 → 知识库 依次 Active（`border-primary/30 bg-primary/5`，`transition-all duration-300`），Ready 后全部完成态。
4. **上下文构建序列**：终端风卡片（Terminal 图标 + 标题 + 右侧状态 + 当前一条 `context.*` 调用单行 font-mono），阶段状态：读取实时设备数据 → ✓ 已读取 / 查询近 7 天运行基线 → ✓ 已聚合 / 读取设备与子系统状态 → ✓ 已关联 / 检索相关运维知识 → ✓ 匹配 2 条 / ✓ Context Ready · 1.2s。
5. **footer**：shell footer 插槽文案「Agent 自动融合实时状态、历史时序、设备信息与知识数据，为每一次运行动态构建设备级上下文。」。
6. **时间轴**：0.5s 实时数据 → 1.8s ✓/历史时序 → 3.1s ✓（基线/偏离字段）→ 3.5s 设备状态 → 4.8s ✓（PCS/BMS 字段）→ 5.2s 知识库 → 6.5s ✓（知识参考）→ 7.0s context.build → 7.8s Context Ready → 总时长 8800ms，循环 hold 1200ms ≈ 10s 重播。
7. **高度预算**：lg 内容区约 277px（footer 2 行）——主卡 ≤138 + 来源卡 52（xl 60）+ 序列卡 56 + 间距；移动端（520px shell、footer line-clamp-2）主卡隐藏描述、来源卡 2×2（p-1，高 48）。全部元素一次渲染、仅 opacity 渐显，无布局跳动。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md`
- `doc/tasks/review/TASK-008.7-device-agent-pipeline-card-layout.md`

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
| `components/product/device-agent/runtime/RuntimeContextPanel.vue` | 整体重做：主卡 + 四来源卡 + 上下文构建序列 + footer（Tailwind-only，290 行） |
| `components/product/device-agent/runtime/RuntimePanelShell.vue` | 新增可选 `badge-dot`（徽标前 primary pulse 小圆点） |
| `data/device-agent.ts` | context Tab panelTitle/panelBadge 同步为「设备上下文引擎 / 实时构建」 |
| `scripts/harness-check.mjs` | 更新上下文面板断言；shell 断言新增 badgeDot |
| `tests/visual.spec.ts` | 闭环测试同步上下文面板与 shell 断言 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md` | 追加 TASK-008.8 实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.8): 重做设备上下文融合面板为 EMQX 工程化动画 |
| Commit Hash    | 2fba429 |

## 完成说明
按 context_dev.md 完成「设备上下文融合」面板重做：顶部「设备上下文引擎 · 实时构建」（shell 徽标带 pulse 小圆点）；主卡展示 ESS-01 设备上下文（Box 图标 + 构建中/读取中/已就绪 徽标 + 融合描述 + 8 字段 2 列 opacity 渐显 + 61.8°C amber 高亮 + 知识参考行）；四个来源卡（IconBox：Activity/ChartNoAxesCombined/Cpu/BookOpen）按 实时数据→历史时序→设备状态→知识库 依次 Active 轮转，Ready 后统一完成态；终端风「上下文构建序列」每阶段只显示当前一条 context.* 调用与右侧状态（LoaderCircle/CircleCheck）；footer 为规范说明文案。时间轴 0.5s→7.8s Context Ready，useRuntimeTimeline(8800) + 1200ms 循环停留 ≈ 10s 重播。各断点高度预算受控（lg 内容区 ≈277px），全部元素一次渲染、仅 opacity 渐显，无布局跳动；全部 Tailwind CSS v4 无新增样式块。门禁全绿（lint/typecheck/vitest 75/75/visual 27/27/harness/build），构建产物 CSS 校验与 SSR 200 通过。
