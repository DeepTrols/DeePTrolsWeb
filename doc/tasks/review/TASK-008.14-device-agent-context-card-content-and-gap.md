# TASK-008.14：Device Agent 来源卡内容三行化与区域间距统一
---
* TaskName：来源卡 标题+描述+状态 三行内容 + 卡片与进度条/序列卡间距按 mt-3 统一
* TaskDescription：按用户反馈调整 RuntimeContextPanel：1）四个来源卡片内容改为三行结构——标题（实时数据等）、描述（设备实时运行指标等新增）、状态值（61.8°C · 500 kW 等），保持左右横向布局不变；2）四个卡片与上方进度条、下方上下文构建序列之间的间距太大（xl+ content-center 垂直居中产生约 42px 空距），改为以进度条与主卡之间的 mt-3 间距为准：网格 xl+ 由 content-center 改为 flex-none（自然高度紧跟上下区域），<xl 保持 flex-1 铺满（间距天然为 mt-3）。
* TaskCreator：Claude
* TaskCreationTime：2026-08-19
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.14 |
| Epic | EPIC-008 |
| 状态   | Completed  |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. **来源卡内容三行化（横向布局不变）**：sourceCards 增加 description 字段：实时数据/设备实时运行指标、历史时序/历史趋势与运行基线、设备状态/设备及子系统状态、知识库/运维知识与处置规范；卡片右侧文本区改为三行——标题 `truncate text-sm font-semibold leading-5 text-highlighted`、描述 `mt-0.5 truncate text-xs leading-4 text-muted`、状态 `mt-1 truncate font-mono text-xs leading-4`（保留 sourceStatusClass 状态变色）。IconBox 居左的左右布局不变。
2. **间距统一为 mt-3**：来源网格 `xl:grid-cols-4 xl:content-center` → `xl:grid-cols-4 xl:flex-none`：xl+ 取消垂直居中与区域拉伸，卡片以自然高度（三行内容约 80px）紧跟进度条（mt-3）并被序列卡紧跟（mt-3），与主卡↔进度条间距一致；<xl 保持 2×2 flex-1 铺满（首行贴顶、末行贴底，上下间距天然 mt-3）。
3. **高度预算**：xl+ 内容区 317px = 主卡 66 + 12 + 进度条 6 + 12 + 卡片 ~80 + 12 + 序列卡 58 = 246，底部余量 ~71px（按用户要求间距优先于铺满）；<xl flex-1 铺满无余量。外壳高度不变（h-[520px] xl:h-[480px]）。
4. **不变项**：时间轴与 Active 轮转、主卡结构、进度条样式与状态联动、上下文构建序列、footer 文案、IconBox 图标体系、事件面板。

---

## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md`
- `doc/tasks/review/TASK-008.13-device-agent-event-spacing-and-context-bars.md`

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
| components/product/device-agent/runtime/RuntimeContextPanel.vue | sourceCards 增加描述行；卡片三行文本；网格 xl:flex-none 取消居中 |
| scripts/harness-check.mjs | 更新上下文网格、卡片文本行与描述内容断言 |
| tests/visual.spec.ts | 更新对应视觉断言 |
| doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/context_dev.md | 补充来源卡三行内容与间距统一实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.14): 来源卡三行内容与区域间距统一 |
| Commit Hash    | 0ca3be3 |

---

## 完成说明
- sourceCards 增加 description 字段并渲染三行文本：标题 `truncate text-sm font-semibold leading-5 text-highlighted` + 描述 `mt-0.5 truncate text-xs leading-4 text-muted` + 状态 `mt-1 truncate font-mono text-xs leading-4`（sourceStatusClass 变色保留），左右横向布局不变。
- 卡片类名收紧为 `flex h-full items-center gap-2 rounded-lg border p-2.5 transition-all duration-300`（去掉 sm:p-3、gap-2.5 → gap-2）：xl 断点文本区由 104px 增至 110px，9 字描述（历史趋势与运行基线/运维知识与处置规范）完整显示，CDP 实测 truncated=false。
- 来源网格 `xl:content-center` → `xl:flex-none`：xl+ 卡片自然高度 80px，与进度条、序列卡间距统一为 mt-3（此前 content-center 产生约 42px 空距）；<xl 保持 2×2 flex-1 铺满。
- CDP 实测 5 断点：两面板 scrollH ≤ clientH 无溢出；xl/2xl 卡片 80px、间距 12px；描述/状态无截断。
- 门禁全绿：pnpm lint、typecheck、test（75）、test:visual（27）、harness:engineering、build；构建产物含 `xl\:flex-none` 与四条新描述文案。
