# TASK-013.1：全局导航栏重构（产品/解决方案 Mega 重排 + 服务导航下线）
---
* TaskName：全局导航栏重构（产品/解决方案 Mega 重排 + 服务导航下线）
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/HOME/nav_amend.md` 重构全局导航：产品 Mega 调整为「数曜 4 卡 + 博曜/智曜/探曜」两行布局并移除 AI SECURITY；解决方案 Mega 调整为「左侧标题描述 + 右侧 4×2 卡片网格（含 2 个 hot 标签）」；移除「服务」导航，Token Hub 与「资源」（原 白皮书&报告）提升为顶级直链。
* TaskCreator：Claude
* TaskCreationTime：2026-09-04
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-013.1 |
| Epic | EPIC-013 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

---
## 任务目标
1. 产品 Mega：第一行「数曜 ｜ 数智基建 >」4 卡横排；第二行「博曜 ｜ 知识中枢 >」1 卡、「智曜 ｜ 智能引擎 >」1 卡（新增 智曜·AgentOS）、「探曜 ｜ 智联万物 >」2 卡；移除 AI SECURITY；两行卡位对齐，字体样式不变、icon 适当放大。
2. 解决方案 Mega：左侧「解决方案」主标题 + 两行描述；右侧 4×2 卡片网格，`FDE解决方案` 与 `算电协同运营方案` 右上角带 hot 标签。
3. 移除「服务」导航；`Token Hub`（`/services/token-hub`）与 `资源`（`/resources/reports`）成为顶级直链。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/NAVIGATION.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/nav_amend.md`

---
## 实现内容
1. `data/navigation.ts`：
   - 类型扩展：`NavLink.hot?`（hot 标签）、`NavColumn.subtitle?/href?`（品类标题「数曜 ｜ 数智基建 >」及标题链接）、`NavItem.summary?`（解决方案左侧介绍）；`layout` 收窄为 `'product' | 'solutions'`。
   - 产品：四列 数曜(4 卡)/博曜(1 卡)/智曜(1 卡，新增 智曜·AgentOS → `/products/agentos` 占位)/探曜(2 卡)；现有 7 个产品链接的 label/description/href 全部保留（被 7 个产品页测试锁定）；删除 AI SECURITY 列（3 个安全产品仍保留在页脚，页面可直达）。
   - 解决方案：`summary` 两行描述 + 单列 8 卡片。落链决策（用户确认）：复用现有页 + noindex 占位页——智慧储能→`/solutions/energy`、算电协同→`/solutions/compute`、FDE→`/services/enterprise-ai-delivery`；智慧教育/零碳园区/AI+供应链→新增 `/services/smart-education`、`/services/zero-carbon-park`、`/services/ai-supply-chain` 占位路由（`/solutions/*` 无 seed 会 404，占位必须走 `/services/*`，由 `pages/[...slug].vue` 承接）。不新增解决方案页面。
   - 删除「服务」项；在 解决方案 与 关于我们 之间插入 `Token Hub`、`资源` 两个直链。
2. Mega 组件拆分（遵守 ≤300 行组件契约，沿用「每种布局独立子组件」的既有架构）：
   - `MegaPanelNavLink.vue`：共享卡片链接（icon + 标题 + 描述 + hot 标签）。
   - `MegaPanelProduct.vue`：产品布局 `repeat(4, minmax(0,1fr))` 网格，列按卡片数 span（数曜 span 4 / 博曜 1 / 智曜 1 / 探曜 2），第二行自动对齐第一行 4 个卡位；品类标题渲染为「标题 ｜ 副标题 + 箭头」的可点击链接（`.mega-panel__category`）；卡间距 16px、行间距 26px。
   - `MegaPanelSolutions.vue`：左侧 `.mega-panel__summary`（颜色背景面板、内容垂直居中、两行描述同规格），右侧 4×2 卡片网格。
   - `MegaMenuPanel.vue`：布局路由 + 默认列/分组 + features；产品与解决方案列容器共享 `min-height` 保证两个 Mega 高度一致；`.mega-panel__hot` 右上角 pill。
   - 卡片字体大小/字重保持不变（14px/650、12px），icon 18→22；保留 groups/view-all 通用模板块与 980px 隐藏规则；无 inline style、无 @apply。
3. 顶级导航项间距加大：`SiteHeaderDesktopNav.vue` nav button `padding-inline` 12→14px（≥1280px 16→20px）。
3. 删除 `components/navigation/MegaPanelServices.vue`（服务布局下线后的死代码），同步 `scripts/harness/sources.mjs`、`scripts/harness/required-files.mjs`，`scripts/harness/checks/home-layout.mjs` 断言改为禁止再次引用 `MegaPanelServices`。
4. 契约/测试同步：
   - `tests/home-content.spec.ts`：主导航 labels 更新为 6 项。
   - `tests/report-content.spec.ts`：改为断言顶级「资源」直链指向 `/resources/reports`。
   - `tests/solution-use-cases.spec.ts`：导航对齐用例重写为 8 卡片表 + `/solutions/*` href 必须属于已生成路由。
   - `tests/visual/site/solutions/use-cases.contract.ts`、`scripts/harness/checks/solution-use-cases.mjs`：data/doc/footer 仍校验全部 9 条用例路由；navigation 校验收窄为导航中存在的 4 条（manufacturing/water/energy/compute）。
5. 文档：`doc/product/NAVIGATION.md` 升级 v1.1 重写 Mega 结构；`doc/product/PAGE_REQUIREMENTS/HOME/HOME.md` 导航示例同步；本任务文档登记 `scripts/harness/required-files.mjs`。

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

验收细节：
- 产品 Mega 两行卡位对齐，AI SECURITY 消失，智曜·AgentOS 出现，品类标题可点击。
- 解决方案 Mega 左标题右 4×2 网格，FDE/算电协同带 hot 标签。
- 顶级导航无「服务」；Token Hub、资源 为直链；资源→/resources/reports。
- 智慧教育等 4 个占位卡片落入 noindex 占位页（非 404）。
- `pnpm lint && pnpm typecheck && pnpm test && pnpm harness:engineering && pnpm build` 全绿。

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `data/navigation.ts` | 导航数据重构：产品四品类列、解决方案 8 卡片、服务下线、Token Hub/资源 直链。 |
| `components/navigation/MegaMenuPanel.vue` | 产品两行卡位网格 + 解决方案左右布局 + hot 标签；移除服务分支。 |
| `components/navigation/MegaPanelServices.vue` | 删除（服务布局下线）。 |
| `scripts/harness/sources.mjs` | 移除 `megaPanelServices` 源。 |
| `scripts/harness/required-files.mjs` | 移除 MegaPanelServices；登记本任务文档。 |
| `scripts/harness/checks/home-layout.mjs` | 服务面板断言改为禁止引用 `MegaPanelServices`。 |
| `scripts/harness/checks/solution-use-cases.mjs` | navigation 路由校验收窄为导航中存在的 4 条。 |
| `tests/home-content.spec.ts` | 主导航 labels 更新。 |
| `tests/report-content.spec.ts` | 「资源」直链断言。 |
| `tests/solution-use-cases.spec.ts` | 导航 8 卡片对齐用例重写。 |
| `tests/visual/site/solutions/use-cases.contract.ts` | navigation 路由断言拆分。 |
| `doc/product/NAVIGATION.md` | v1.1：Mega 结构与顶级直链重写。 |
| `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md` | 导航示例同步。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm harness:engineering`
- `pnpm build`
- dev 手动验证三个 Mega 与直链、占位页落链、移动端导航

## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `feat(TASK-013.1): restructure global navigation mega menus and top-level links` |
| Commit Hash |  |

## 完成说明
已按 nav_amend.md 完成导航重构，等待用户确认后 push（远程为共享仓库）。
