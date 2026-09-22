# TASK-014.42：知识中枢标签居中与制造闭环阶段条顶部化
---
* TaskName：知识中枢协议标签居中 + 制造闭环阶段条迁移顶部悬浮 pill
* TaskDescription：①博曜知识管理平台架构图的 4 个协议 tag（API/数据库、PDF/Office/图片/视频、数据表/指标、网页/第三方）与对应连接线严格居中；②智能制造方案架构图的 实时感知/智能分析/自主决策/决策执行 从连接器 pill 改为 EMQX 风格顶部悬浮阶段条。
* TaskCreator：Claude
* TaskCreationTime：2026-09-20
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.42 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

## 任务目标
1. knowledge-hub 架构图：协议标签与源节点 → 加工台连接线段水平、垂直双向居中（此前手写偏移 `y: source.y - (index === 1 ? 8 : 2)` 既不一致也未对齐线高）。
2. manufacturing-loop 架构图：移除压在连接器上的 4 枚阶段 pill，改由页面顶部 EMQX 风格悬浮条承载阶段序列（实时感知 → 智能分析 → 自主决策 → 决策执行），画布内仅保留「闭环反馈」pill。

## 前置文档
- `AGENTS.md`
- `.claude/skills/architecture-flow/SKILL.md`
- `doc/tasks/review/TASK-014.41-datacenter-synergy-loop-flows.md`（同轮先例）
- 参考样式：https://www.emqx.com/zh/products/emqx-edge 顶部虚线悬浮 pill

## 实现内容
### 1. knowledge-hub 协议标签居中（结构化方案，消除手调像素）
- `KnowledgeSourceNode.vue`：源节点高度显式锁定 `h-8`（32px，替代 py-1.5 的自然高度），中心线恒为 +16。
- `KnowledgeHubNode.vue`：label 分支增加 `-translate-x-1/2 -translate-y-1/2` 自居中，节点 position 即标签中心点。
- `KnowledgeHubFlow.client.vue`：标签 position 统一为 `{ x: 310, y: source.y + 16 }`——横轴锚定连接线段中点（源节点右缘 240 → step 拐点 380，中点 310），纵轴对齐源节点中心即连接线高度；移除 per-index 手调偏移。

### 2. manufacturing 阶段条顶部化
- `data/solutions/manufacturing.ts`：新增 `manufacturingStages`（实时感知 Radar / 智能分析 BrainCircuit / 自主决策 Sparkles / 决策执行 Zap，lucide 图标数据驱动）。
- `ManufacturingLoopFlow.client.vue`：删除 stage-sensing/analysis/decision/execution 四个节点（原 y=191 压连接器），保留 stage-feedback「闭环反馈」（814,413 压回流 lane）；头部注释同步。
- `pages/solutions/manufacturing.vue`：在 `relative z-[1]` 容器内新增 EMQX 风格悬浮条——`pointer-events-none absolute left-1/2 top-5 z-20 w-[96%] max-w-6xl -translate-x-1/2` + `rounded-full border border-dashed border-primary/40 bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur-sm`，内部 4 阶段（size-8 圆形 icon 盒 + 15px 半粗标签）以 ArrowRight 串联；帧本身 `display:none` <1024px，移动端天然不涉及。

### 锁同步
- `scripts/harness/checks/solutions-manufacturing.mjs`：页面新增悬浮条类名/manufacturingStages 断言；数据锁增加 manufacturingStages 四行。
- `tests/visual/site/solutions/manufacturing.contract.ts`：页面悬浮条契约 + loopFlow `not.toContain('stage-sensing' 等)` + 保留「闭环反馈」+ 数据 manufacturingStages 锁。
- `tests/visual/demo-knowledge-hub.contract.ts`：新增 `centers protocol labels on their connection lines` 用例（`x: 310, y: source.y + 16` / `-translate-x-1/2 -translate-y-1/2` / `h-8 w-[140px]`）。

## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [ ] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过

## 修改文件
| 文件 | 说明 |
|---|---|
| `components/demo/knowledge-hub/KnowledgeSourceNode.vue` | 源节点显式 `h-8` |
| `components/demo/knowledge-hub/KnowledgeHubNode.vue` | label 分支自居中 translate |
| `components/demo/knowledge-hub/KnowledgeHubFlow.client.vue` | 标签 position 统一锚定线段中点 + 注释 |
| `components/demo/manufacturing-loop/ManufacturingLoopFlow.client.vue` | 移除 4 枚阶段 pill 节点 |
| `data/solutions/manufacturing.ts` | 新增 `manufacturingStages` |
| `pages/solutions/manufacturing.vue` | 顶部 EMQX 风格阶段悬浮条 |
| `scripts/harness/checks/solutions-manufacturing.mjs` | 悬浮条 + 阶段数据锁 |
| `tests/visual/site/solutions/manufacturing.contract.ts` | 悬浮条契约 + pill 移除/保留锁 |
| `tests/visual/demo-knowledge-hub.contract.ts` | 标签居中契约 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.42): center knowledge-hub labels and move manufacturing stages to top bar |
| Commit Hash | |

## 完成说明
①知识中枢架构图 4 个协议 tag 改为结构化居中：源节点锁高 32px，标签节点 `-translate-1/2` 自居中后锚定 (310, source.y+16)，即连接线段（240→380 水平段）中点与线高，消除原 `-2/-8` 手调偏移导致的参差。②智能制造架构图 4 枚阶段 pill 从连接器上移除，阶段序列改由页面顶部 EMQX 风格虚线悬浮条承载（icon 圆盒 + ArrowRight 串联），数据集中于 `manufacturingStages`；画布内保留「闭环反馈」pill。锁同步完成。

验证结果：
- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：通过（19 文件 / 137 用例，含新增居中契约）
- `pnpm harness:engineering`：通过
- SSR 验证：`/solutions/manufacturing` 200，阶段条文案与帧 aria-label 齐全；`/products/knowledge-base` 200（协议标签为 ClientOnly 流内渲染，SSR 不含属预期）
- Build 未执行（保护运行中的 dev 实例，与 TASK-014.36~41 一致）
