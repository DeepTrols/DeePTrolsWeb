# TASK-013.3：宽屏布局升级（对标 DeepCtrls 官网）
---
* TaskName：宽屏布局升级（对标 DeepCtrls 官网）
* TaskDescription：参照 https://www.deepctrls.com/deepctrls_com/ 的宽屏布局体系放大全站横向尺度——Header 取消 1600px 上限改为全视口宽度（DeepCtrls header 为 left:0/right:0 无 max-width，logo 贴左、操作区 margin-left:auto）；正文/Mega/Products/Solutions/Cases/Footer 共享容器由 1440px 扩至 1720px（107.5rem），在大屏（≥1920）内容宽度由 1360px 提升到 1624px，宽容器 SectionShell/Cases 同步。
* TaskCreator：Claude
* TaskCreationTime：2026-09-04
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-013.3 |
| Epic | EPIC-013 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

---
## 任务目标
用户希望全站呈现类似 DeepCtrls 官网的「宽屏」观感。经抓取分析参考站布局体系：
1. Header 为 `position: fixed; left: 0; right: 0` 全视口宽度（无 max-width），inner padding 约 43/61px，导航紧跟 logo，操作区 `margin-left: auto`。
2. Mega Menu 面板全宽（left:0/right:0）。
3. 各 Section 全宽背景 + 流式侧边 padding，内容宽度随视口增长（1920px 视口约 1412px 内容，超宽屏继续扩展）。

据此调整本站宽度体系：
1. Header inner 移除 `max-width: 1600px` 上限——任意视口下 Logo 贴左（分级 padding 不变）、操作区贴右，与 DeepCtrls 的全宽 header 观感一致。
2. 正文共享容器 `--dt-container: 90rem (1440px) → 107.5rem (1720px)`，padding 阶梯（16/24/32/40/48）不变。效果：1440px 笔记本内容仍充满视口；1920px 桌面内容 1720−96=1624px（此前 1360px，且大于参考站的 1412px）；超宽屏留白显著缩小。
3. Mega/正文对齐线、移动端交互、字体/颜色/动效/内容均不变。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/NAVIGATION.md`
- `doc/tasks/review/TASK-013.2-global-width-header-layout.md`（上一轮宽度体系基线）

---
## 实现内容
1. `assets/scss/main.scss`：`--dt-container: 90rem → 107.5rem`（1720px）；`.site-shell .container` 规则与断点 padding 阶梯（24/32/40/48）不变。
2. `components/navigation/SiteHeader.vue`：`.site-header__inner` 删除 `max-width: 1600px; margin-inline: auto`（保留 `width: 100%` + 分级 padding 阶梯）→ Header 全视口宽度；其余布局（Logo/Nav margin-left 48px/操作区 margin-left:auto）不变。
3. `components/home/HomeCases.vue`：`.cases` `max-width: 90rem → 107.5rem`，与正文新宽度同步。
4. `components/common/section/SectionShell.vue`：wide 变体 `max-w-[90rem] → max-w-[107.5rem]`，能力同步。
5. `components/navigation/MegaMenuPanel.vue`：无需改动——`.mega-panel.container` 使用 `max-width: var(--dt-container)` 并继承共享容器阶梯，自动对齐新的正文边界。
6. 契约/测试同步：
   - `tests/visual/site/home/design.contract.ts`：token 断言改 `--dt-container: 107.5rem`。
   - `scripts/harness/checks/design-system.mjs`：token 与 SectionShell `max-w-[107.5rem]` 断言同步。
   - `tests/visual/site/home/header.contract.ts`：`max-width: 1600px` 断言替换为 `width: 100%` + 禁止 `max-width: 1600px`。
   - `tests/visual/site/home/cases.contract.ts`：`max-width: 107.5rem`。
7. 未改动项：Nav item 间距（margin-left 48px / padding 16/18/22px）、Header 高度 72px、字体/颜色/动效/内容、移动端菜单交互（≤980px 块原样保留）、页脚结构。

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
- Header 任意桌面视口下撑满宽度：1920px 时 Logo 距左 48px（≥1536 padding）、操作区距右 48px。
- 正文容器 ≥1920px 内容宽 = 1720 − 96 = 1624px（居中）；1440px 视口内容 = 视口 − 32×2 = 1376px（充满）。
- Mega Menu 内容左右边界与正文内容边界在全部桌面视口一致。
- `pnpm lint && pnpm typecheck && pnpm test && pnpm harness:engineering && pnpm build` 全绿。

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `assets/scss/main.scss` | `--dt-container` 90rem → 107.5rem（1720px）。 |
| `components/navigation/SiteHeader.vue` | inner 移除 1600px 上限，Header 全视口宽。 |
| `components/home/HomeCases.vue` | max-width 107.5rem。 |
| `components/common/section/SectionShell.vue` | wide 变体 107.5rem。 |
| `tests/visual/site/home/design.contract.ts` | token 断言同步。 |
| `tests/visual/site/home/header.contract.ts` | Header 全宽断言替换。 |
| `tests/visual/site/home/cases.contract.ts` | 107.5rem 断言。 |
| `scripts/harness/checks/design-system.mjs` | token/SectionShell 断言同步。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm harness:engineering`
- `pnpm build`
- dev 手动验证首页/产品页/解决方案页宽屏拉伸效果、Header 全宽、Mega 与正文对齐、移动端不受影响

## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `feat(TASK-013.3): widen layout system to widescreen proportions` |
| Commit Hash |  |

## 完成说明
已按 DeepCtrls 参考站的宽屏体系完成布局升级，等待用户确认后 push（远程为共享仓库）。
