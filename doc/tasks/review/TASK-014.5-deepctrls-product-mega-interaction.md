# TASK-014.5：核心产品 Mega 双栏联动与 Header 滚动自适应
---
* TaskName：核心产品 Mega 双栏联动与 Header 滚动自适应
* TaskDescription：严格参考 DeepCtrls 导航交互，将核心产品 Mega 调整为「品类 → 产品」双栏联动（悬停/聚焦切换右栏，默认激活数曜），并为 HOME Header 增加 Hero 区域内滚动时的深色自适应状态（is-in-hero）。
* TaskCreator：Olly
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.5 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Claude   |

---
## 任务目标
1. 核心产品 Mega 左栏展示 5 个品类入口（数曜 ｜ 数智基建、博曜 ｜ 知识中枢、核心产品、智曜 ｜ 智能引擎、探曜 ｜ 智联万物），悬停/聚焦切换右栏产品列表。
2. 面板每次打开默认激活 `数曜 ｜ 数智基建`，右栏展示数曜 4 个产品（数据治理/数据标签/数据开发/数据要素监管）。
3. 博曜→博曜·企业级知识管理平台；智曜→智曜·AgentOS；探曜→探曜·AI物联感知平台 + Device Agent；核心产品品类无子产品，点击直达 `/products`。
4. Header 在 HOME 下滚时按背景自适应：仍处于 Hero 区域内保持白字与 `rgba(0, 0, 0, 0.4)` 深色半透明背景（白色 Logo），滚出 Hero 后切换白色半透明背景与黑色 Logo。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/product/NAVIGATION.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- DeepCtrls 参考站：https://www.deepctrls.com/deepctrls_com/

---
## 实现内容
1. `data/navigation.ts`：核心产品 columns 重构为 5 个品类，产品清单下沉为各品类 `links`（8 个产品链接，href 与页脚/产品页一致）。
2. `components/navigation/MegaPanelProduct.vue`：产品分支改为 `.mega-col--categories` + `.mega-col--links` 双栏联动，`activeColumn` 默认 0，`@mouseenter`/`@focus` 切换右栏；移除旧 `entriesFor`/`titleFor` 合并逻辑；字体、分栏宽度、渐变分隔线等 DeepCtrls 样式保持不变。
3. `components/navigation/SiteHeader.vue`：新增 `isInHero` 状态（按 `.home-hero` 实际高度在 scroll/resize/路由切换时测量），`headerClasses` 增加 `is-in-hero`，`shouldUseDarkLogo` 在 Hero 区域内滚动时保持白色 Logo。
4. `assets/scss/components/_site-header.scss`：新增 `.is-in-hero` 深色半透明状态，置于白色滚动状态之后以覆盖。
5. 契约同步：`tests/home-content.spec.ts`、`tests/dgp-content.spec.ts`、`tests/tanyao-content.spec.ts`、`tests/visual/site/home/header.contract.ts`、`scripts/harness/checks/home-layout.mjs`。
6. 文档同步：`doc/product/NAVIGATION.md`（v1.4）、`doc/engineering/HOME_PAGE_BASELINE.md`。

---
## 验收标准
- [x] 核心产品 Mega 为品类→产品双栏联动，悬停/聚焦切换右栏
- [x] 打开面板默认激活数曜并展示 4 个数曜产品
- [x] 8 个产品链接 href 与产品页/页脚一致，移动端导航可完整展开
- [x] HOME 下滚在 Hero 区域内 Header 保持深色半透明与白色 Logo，滚出后切换白色 Header
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] 测试通过
- [x] Visual contract 通过
- [x] Harness Engineering 检查通过
- [x] Build 成功

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `data/navigation.ts` | 核心产品品类/产品双层结构。 |
| `components/navigation/MegaPanelProduct.vue` | 产品 Mega 双栏联动交互。 |
| `components/navigation/SiteHeader.vue` | is-in-hero 滚动状态与 Logo 切换。 |
| `assets/scss/components/_site-header.scss` | is-in-hero 深色半透明样式。 |
| `tests/home-content.spec.ts` | 核心产品结构契约重写。 |
| `tests/dgp-content.spec.ts` | 治理平台导航入口改为 link 查找。 |
| `tests/tanyao-content.spec.ts` | 探曜品类列 + AI物联感知平台 link 契约。 |
| `tests/visual/site/home/header.contract.ts` | is-in-hero 与双栏联动视觉契约。 |
| `scripts/harness/checks/home-layout.mjs` | Header/Mega Harness 断言同步。 |
| `doc/product/NAVIGATION.md` | v1.4 双栏联动与滚动自适应说明。 |
| `doc/engineering/HOME_PAGE_BASELINE.md` | Visual/Interaction 基线同步。 |
| `scripts/harness/required-files.mjs` | 登记本任务文档。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`（13 files / 95 tests passed）
- `pnpm harness:engineering`
- `pnpm build`

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | `feat(TASK-014.5): interactive product mega and in-hero header scroll state` |
| Commit Hash    |    |

## 完成说明
已完成核心产品 Mega 双栏联动与 Header Hero 区域滚动自适应，等待 Review。
