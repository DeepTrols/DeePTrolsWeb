# TASK-008.7：Device Agent 流水线卡片状态右置、标题/描述样式与 IconBox 图标
---
* TaskName：流水线卡片状态右置 + 标题/描述样式 + IconBox 圆边框图标
* TaskDescription：按用户反馈调整事件触发面板流水线卡片：1）状态在卡片中放在右侧；2）事件校验/事件去重/上下文构建标题为 `text-sm font-semibold text-highlighted`；3）描述为 `mt-1 text-xs leading-5 text-muted`；4）icon 使用 IconBox 组件（圆边框、边框带背景）。
* TaskCreator：Claude
* TaskCreationTime：2026-08-17
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.7 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **状态右置**：xl+ 卡片改为行内布局——IconBox（左）| 标题 + 描述（中）| 状态（右，ml 自动靠右）；状态 SVG + 文案随阶段演变保持不变。
2. **标题样式**：`text-sm font-semibold text-highlighted`（白色，不再随 pending 变灰）。
3. **描述样式**：`mt-1 text-xs leading-5 text-muted`（仅 xl+ 展示，附 title 悬停全文）。
4. **IconBox 图标**：改用公共 `IconBox`（size 40 / iconSize 20），圆边框 + 背景；pending 使用 `tone="soft"`，active/done 使用 `tone="primary"`，active 阶段保持 `animate-pulse`。
5. **响应式降级**：lg 断点面板列仅约 560px，无法容纳行内布局，xl 以下回退为纵向堆叠（IconBox + 标题 + 状态，隐藏描述与流线），面板高度预算不变。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/core_competence.md`
- `doc/tasks/review/TASK-008.6-device-agent-pipeline-flow-cards.md`

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
| `components/product/device-agent/runtime/RuntimeEventPanel.vue` | 流水线卡片状态右置 + 标题/描述样式 + IconBox 图标（xl+ 行内布局，xl 以下纵向堆叠） |
| `scripts/harness-check.mjs` | 替换失效的事件面板断言，新增 IconBox/标题/描述/行内布局断言 |
| `tests/visual.spec.ts` | 闭环测试补充 IconBox/标题/描述断言 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/core_competence.md` | 追加 TASK-008.7 实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.7): 流水线卡片状态右置、标题/描述样式与 IconBox 图标 |
| Commit Hash    | c33d3f2 |

## 完成说明
按用户反馈完成事件触发面板流水线卡片调整：1）状态（SVG + 文案）移至卡片右侧（xl+ 行内布局：IconBox ｜ 标题+描述 ｜ 状态，状态随阶段演变保持不变；xl 以下纵向堆叠并居中）；2）三个标题统一 `truncate text-sm font-semibold text-highlighted`（白色，不随 pending 变灰）；3）描述统一 `mt-1 hidden truncate text-xs leading-5 text-muted xl:block`（仅 xl+ 展示，附 title 悬停全文）；4）图标改用公共 `IconBox`（size 40 / iconSize 20，圆边框 + 背景），pending 使用 `tone="soft"`、active/done 使用 `tone="primary"`，active 阶段保持 `animate-pulse`。响应式：lg 面板列约 560px 无法容纳行内布局，xl 以下回退纵向堆叠（隐藏描述与流线），面板高度预算不变。门禁全部通过：lint、typecheck、vitest 75/75、visual 27/27、harness、build。
