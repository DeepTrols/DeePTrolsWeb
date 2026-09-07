# TASK-013.4：解决方案 Mega 去掉左侧介绍面板，与产品 Mega 结构统一
---
* TaskName：解决方案 Mega 去掉左侧介绍面板，与产品 Mega 结构统一
* TaskDescription：按用户要求移除解决方案 Mega Menu 左侧介绍面板（「解决方案」主标题 +「多行业场景解决方案赋能企业AI落地」「涵盖30+的应用场景，以数据与知识底座桥接企业业务与人工智能」两行描述），解决方案 Mega 改为与产品 Mega 完全一致的渲染路径——共享 MegaPanelProduct 面板组件（品类标题「应用场景」+ 4×2 卡片网格，卡片规格/间距/字体与产品 Mega 相同）；删除 MegaPanelSolutions.vue 死代码并同步数据模型（NavSummary 类型下线）与全部 Harness 登记。
* TaskCreator：Claude
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-013.4 |
| Epic | EPIC-013 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

---
## 任务目标
1. 解决方案 Mega 不再展示左侧介绍面板（主标题「解决方案」+ 两行描述文案）。
2. 解决方案 Mega 与产品 Mega 保持高度一致：同一面板组件、同一品类标题样式（12px/760 弱化色）、同一卡片规格（icon + label + description + hot 标签）、同一网格（repeat(4) 列、卡片间距 16px）。
3. 8 个应用场景卡片、hot 标签、落链均不变。

---
## 前置文档
- `AGENTS.md`
- `doc/product/NAVIGATION.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/tasks/review/TASK-013.1-global-navigation-amend.md`（解决方案 Mega 基线）

---
## 实现内容
1. `components/navigation/MegaMenuPanel.vue`：
   - 移除 `MegaPanelSolutions` 导入与 `v-else-if="item.layout === 'solutions'"` 分支；`MegaPanelProduct` 渲染条件扩为 `item.layout === 'product' || item.layout === 'solutions'`——两种 Mega 共享同一渲染路径，天然保证一致性。
   - 删除 `.mega-panel--solutions` 双列（左介绍 + 右网格）布局规则；`min-height: 268px` 选择器收窄为 `.mega-panel__columns--product`。
2. 删除 `components/navigation/MegaPanelSolutions.vue`（服务面板 TASK-013.1 已下线，本次介绍面板移除后该组件成为死代码）。
3. `data/navigation.ts`：
   - 删除解决方案 NavItem 的 `summary`（标题 + 两行描述）。
   - 下线 `NavSummary` 接口与 `NavItem.summary` 字段（无其他使用方）。
   - 解决方案列结构不变：单列「应用场景」8 个卡片链接（含 hot）。经 `columnSpanClass` 计算为 span-4 → 4×2 网格。
4. `doc/product/NAVIGATION.md`：版本 1.1 → 1.2；重写解决方案 Mega 结构图（品类标题 + 4×2 网格），注明与产品 Mega 共享面板组件、无左侧介绍面板。
5. Harness/契约同步：
   - `scripts/harness/sources.mjs`：删除 `megaPanelSolutions` 源登记。
   - `scripts/harness/required-files.mjs`：删除 `components/navigation/MegaPanelSolutions.vue`；登记本任务文档。
   - `scripts/harness/checks/home-layout.mjs`：解构移除 `megaPanelSolutions`；Mega 断言改为「MegaPanelProduct 同时承载 product/solutions 布局 + 禁止 MegaPanelSolutions/MegaPanelServices 残留」。
6. 未改动项：8 个卡片 label/description/href/icon、hot 标签、移动端导航（泛化渲染 columns.links，不受影响）、Header/Nav/Mega 宽度体系（TASK-013.2/013.3 基线）。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] Harness Engineering 检查通过

验收细节：
- 解决方案 Mega 打开后：顶部品类标题「应用场景」，下方 8 卡 4×2 网格；无左侧介绍面板、无「多行业场景解决方案…」文案。
- 产品 Mega 视觉/结构不变；两个 Mega 卡片样式逐像素一致（同一组件）。
- `tests/solution-use-cases.spec.ts`「导航与路由对齐」用例（断言 `应用场景` 列 8 卡 href）保持通过。
- `pnpm lint && pnpm typecheck && pnpm test && pnpm harness:engineering && pnpm build` 全绿。

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/navigation/MegaMenuPanel.vue` | solutions 走 MegaPanelProduct；删除双列布局规则。 |
| `components/navigation/MegaPanelSolutions.vue` | 删除（死代码）。 |
| `data/navigation.ts` | 删除 summary 数据与 NavSummary 类型。 |
| `doc/product/NAVIGATION.md` | 版本 1.2；解决方案 Mega 结构更新。 |
| `scripts/harness/sources.mjs` | 移除 megaPanelSolutions 登记。 |
| `scripts/harness/required-files.mjs` | 移除组件登记；新增本任务文档。 |
| `scripts/harness/checks/home-layout.mjs` | Mega 断言同步。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm harness:engineering`
- `pnpm build`
- dev 手动验证：解决方案 Mega 无介绍面板、与产品 Mega 卡片一致；移动端导航正常

## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `feat(TASK-013.4): align solutions mega with product mega layout` |
| Commit Hash |  |

## 完成说明
解决方案 Mega 已与产品 Mega 统一为同一渲染路径，等待用户确认后 push（远程为共享仓库）。
