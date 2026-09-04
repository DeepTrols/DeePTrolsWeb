# TASK-013.2：全站桌面端宽度体系与 Header/Navigation 布局重构
---
* TaskName：全站桌面端宽度体系与 Header/Navigation 布局重构
* TaskDescription：统一全站横向布局体系——正文容器 1440px（取消 ≥1536px 扩展为 1536px 的规则，改为分级 padding）；Header 独享 1600px 容器，Logo 左对齐 + Nav 紧跟（margin-left 48px）+ 操作区 margin-left:auto；Nav item 间距分级 16/18/22px；Mega Menu 与正文共享容器对齐线；Cases/SectionShell 宽容器同步 1440px。
* TaskCreator：Claude
* TaskCreationTime：2026-09-04
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-013.2 |
| Epic | EPIC-013 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Claude |

---
## 任务目标
1. 全局正文容器：桌面端统一 `max-width: 1440px; margin-inline: auto`，padding-inline 按断点分级（<768: 16px / 768–1023: 24px / 1024–1279: 32px / ≥1280: 40px / ≥1536: 48px）；取消 ≥1536px 时正文扩展到 1536px 的旧规则。
2. Header 独享更宽容器：`.site-header__inner` max-width 1600px，Logo 最左、主导航紧跟 Logo（margin-left 48px）、右侧操作区 `margin-left: auto`，不使用绝对定位居中。
3. Mega Menu 与正文、产品区、解决方案区保持同一条左右对齐线。
4. 宽度体系统一：Header 1600px；正文/Hero/Mega/Products/Solutions/Cases/Footer 1440px；全宽背景区域 100vw。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/NAVIGATION.md`

---
## 实现内容
1. `assets/scss/main.scss`：
   - `--dt-container: 80rem → 90rem`（1440px）；删除 `--dt-container-2xl`（≥1536px 1536px 规则下线）。
   - `.site-shell .container`：`max-width: var(--dt-container); margin-inline: auto; padding-inline: 16px` 基础 + 断点 padding 阶梯（24/32/40/48）；删除原 40rem/48rem/64rem/80rem/96rem 的 max-width 阶梯。
   - 保留 `@media (min-width: 1536px)`（padding 48px，契约断言仍在）。
2. `components/navigation/SiteHeader.vue`：
   - inner 容器脱离共享 `.container`（移除 class，保留 `data-slot="container"`），scoped 定义 `max-width: 1600px; margin-inline: auto` + padding 阶梯（16/24/32/40/48，与正文对齐，≥1280 后为 40/48 与需求一致）。
   - `.site-header__left` 由 `flex: 1 1 0` 收窄为 `flex: 0 1 auto`（Nav 紧跟 Logo，不再撑满）；移除 1280px gap 40px 规则；宽度让位由操作区 `margin-left: auto` 承担；≤980px 移动端块不变。
   - Header 高度仍为 `--dt-header-main-height: 72px`（原本即 72px，未改动）。
3. `components/navigation/SiteHeaderDesktopNav.vue`：
   - `.site-header__nav`：`margin-left: 48px`（移除 justify-content: space-between / flex 基线）。
   - nav button `padding-inline`：基础 16px；≥1280px 18px；≥1536px 22px；删除 ≤1120px 收窄至 12px 的旧规则。
4. `components/navigation/SiteHeaderActions.vue`：操作区 `margin-left: auto`（移除 flex: 1 1 0 / justify-content: flex-end）。
5. `components/navigation/MegaMenuPanel.vue`：`.mega-panel.container` 继承全局容器阶梯（width 100% / max-width 1440px / margin-inline auto / 分级 padding），`padding` 简写改为 `padding-block: 30px 34px` 以免覆盖共享 padding-inline——在全部视口下与正文内容左右边界严格一致（需求中 `calc(100vw - 80px)` 仅在 1280–1535px 区间等效，继承共享容器在 ≥1536 与 <1280 区间也保持对齐，满足「Mega 与正文同一条对齐线」的硬性要求）。
6. `components/home/HomeCases.vue`：`.cases` max-width 96rem → 90rem（1440px），补齐 padding 阶梯（24/32/40/48），与正文对齐。
7. `components/common/section/SectionShell.vue`：wide 变体 `max-w-[96rem] → max-w-[90rem]`（当前无页面使用，保持能力同步）。
8. 契约/测试同步：
   - `tests/visual/site/home/design.contract.ts`：token 断言改 `--dt-container: 90rem`，`--dt-container-2xl` 改为禁止存在。
   - `scripts/harness/checks/design-system.mjs`：token 与 SectionShell `max-w-[90rem]` 断言同步。
   - `tests/visual/site/home/header.contract.ts`：`flex: 1 1 0` 断言替换为 `max-width: 1600px` + `flex: 0 1 auto`；新增操作区 `margin-left: auto`、Nav `margin-left: 48px`、`padding-inline: 22px` 断言。
   - `tests/visual/site/home/cases.contract.ts`：`max-width: 90rem`。
9. 未改动项：字体/颜色/动效/组件内容、移动端菜单交互（≤980px 块原样保留）、页脚结构。

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
- 正文容器 ≥1280px 内容宽 = 1440 − 80 = 1360px；≥1536px = 1440 − 96 = 1344px；不再随视口扩展到 1536px。
- Header inner 1600px 上限，Logo 最左、Nav 紧跟（48px）、操作区最右（margin-left: auto）。
- Mega Menu 内容左右边界与正文内容边界在全部桌面视口一致。
- `pnpm lint && pnpm typecheck && pnpm test && pnpm harness:engineering && pnpm build` 全绿。

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `assets/scss/main.scss` | 容器 1440px + 分级 padding；删除 --dt-container-2xl 与 1536px 扩展规则。 |
| `components/navigation/SiteHeader.vue` | inner 1600px 专用容器；left 收窄；移除居中/撑满布局。 |
| `components/navigation/SiteHeaderDesktopNav.vue` | nav margin-left 48px；item padding 16/18/22px。 |
| `components/navigation/SiteHeaderActions.vue` | margin-left: auto。 |
| `components/navigation/MegaMenuPanel.vue` | padding-block 化，继承共享容器对齐。 |
| `components/home/HomeCases.vue` | max-width 90rem + padding 阶梯。 |
| `components/common/section/SectionShell.vue` | wide 变体 90rem。 |
| `tests/visual/site/home/design.contract.ts` | token 断言同步。 |
| `tests/visual/site/home/header.contract.ts` | Header/Nav 新布局断言。 |
| `tests/visual/site/home/cases.contract.ts` | 90rem 断言。 |
| `scripts/harness/checks/design-system.mjs` | token/SectionShell 断言同步。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm harness:engineering`
- `pnpm build`
- dev 手动验证首页/产品页/解决方案页横向对齐、Header/Nav/Mega 布局、移动端不受影响

## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `feat(TASK-013.2): unify desktop width system and header navigation layout` |
| Commit Hash |  |

## 完成说明
已按需求完成宽度体系与 Header/Navigation 布局重构，等待用户确认后 push（远程为共享仓库）。
