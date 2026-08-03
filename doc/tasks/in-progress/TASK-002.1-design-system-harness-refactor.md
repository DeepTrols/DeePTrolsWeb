# TASK-002.1：设计系统与 Harness Engineering 修复
---
* TaskName：设计系统与 Harness Engineering 修复
* TaskDescription：基于首页已验收的视觉基准，抽取可复用 Tailwind CSS v4 + SCSS 设计系统，修复任务执行约束缺失，并更新产品与工程文档。
* TaskCreator：Codex
* TaskCreationTime：2026-07-30
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-002.1 |
| Epic | EPIC-002 |
| 状态   | In Progress |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 排查首页与全局代码中不符合规范、影响后续页面一致性的实现。
2. 将重复的颜色、按钮、字体、hover、tab、卡片等样式抽取为 Tailwind CSS v4 + SCSS 公共层。
3. 建立后续页面必须遵循的 HOME 基准约束文档。
4. 更新品牌、内容、导航、产品愿景、站点地图、HOME 与 AGENTS 文档，避免旧描述影响后续开发。
5. 增加 Harness Engineering 检查入口，使任务流程和质量门禁可执行、可验证。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/product/PRODUCT_VISION.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/NAVIGATION.md`
- `doc/product/SITE_MAP.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`

---
## 排查结论
1. 首页与布局组件存在大量重复按钮样式：`HomeCta`、`HomeCases`、`HomeInsights`、`HomeSolutions`、`HomeDeliverables` 与 `SiteFooter` 各自维护 `data-slot="base"` 按钮，hover、focus、圆角、间距容易不一致。
2. `SectionHeading` 已存在，但 `HomeCases`、`HomeInsights` 又手写 eyebrow/title/subtitle，导致标题层级和后续页面复用标准不清晰。
3. tab 样式只存在于 `HomeSolutions` 局部，后续页面容易重新实现并跑偏。
4. EMQX 风格卡片在 `HomeProductSystem`、`HomeEcosystem`、`HomeCases` 多处重复，颜色、阴影、hover token 没有形成统一入口。
5. 颜色、阴影、动画时间等 token 已在 `assets/scss/main.scss` 初步存在，但没有暴露为 Tailwind v4 主题变量和公共组件层。
6. 组件体积偏大：`SiteFooter.vue`、`SiteHeader.vue`、`HomeCases.vue`、`HomeEcosystemVisual.vue`、`HomeSolutions.vue`、`HomeInsights.vue` 均超过建议的 300 行，后续应继续拆分为数据、交互、视觉子组件。
7. Hero canvas 已移除，本任务已同步移除 `@tresjs/core`、`three`、`@types/three` 残留依赖。
8. 项目缺少可执行的 Harness Engineering 检查命令，导致任务流程、文档同步和视觉基准只能依赖人工记忆。

---
## 实现内容
1. 新增 Tailwind CSS v4 theme bridge 与 SCSS 公共组件层。
2. 改造 `BaseButton`，统一按钮 DOM、`data-slot`、label、trailing icon、hover 与 focus。
3. 改造 `SectionHeading`，将标题层级收敛到公共 Tailwind/SCSS class。
4. 将 CTA、Cases、Insights、Solutions 的重复按钮改为复用 `BaseButton`。
5. 将 Solutions tab 接入公共 `dt-tab-list` 与 `dt-tab`。
6. 将 Product System 与 Ecosystem 卡片接入 `dt-product-card`、`dt-icon-box`、`dt-ecosystem-card` 与 `dt-card-tag`。
7. 将 Footer 订阅按钮接入公共 `dt-button`。
8. 新增 `doc/engineering/HOME_PAGE_BASELINE.md`，约束后续页面默认遵循 HOME 基准。
9. 新增 `doc/engineering/HARNESS_ENGINEERING.md` 与 `scripts/harness-check.mjs`，让 Harness Engineering 可执行。
10. 更新产品与工程文档，使其与当前 HOME 页面、Header、Footer、CTA、生态与视觉基准一致。
11. 恢复本地 Git 仓库，新增 `.gitignore`，排除依赖、构建产物、系统文件与旧重复素材目录。
11. 移除 Hero canvas/Tres 残留依赖：`@tresjs/core`、`three`、`@types/three`。
12. 更新视觉契约测试，使其检查公共设计系统复用，而不是鼓励页面内重复 CSS。
13. 统一 HOME、Why DeepTrols 与 DGP 的带 icon 信息卡视觉基准：card 圆角采用 DGP `rounded-2xl` / 16px，icon 外框采用 DGP `rounded-xl` / 12px，普通信息卡移除固定高度。
14. 修复 Why Trust technology panel 的 icon 外框尺寸比例：统一为 DGP 基准 `size-10` + 20px icon，避免 `size-12` 下圆角视觉不一致。

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
| `assets/css/tailwind.css` | Tailwind CSS v4 theme bridge |
| `assets/scss/main.scss` | 全局 token 与公共组件层 |
| `components/common/BaseButton.vue` | 公共按钮 |
| `components/common/SectionHeading.vue` | 公共标题 |
| `components/common/ProductSystemCards.vue` | 移除普通产品卡固定高度，复用公共 card/icon 圆角 |
| `components/common/TrustTabsSection.vue` | 移除 Why trust 卡固定高度，保留 DGP icon 圆角 |
| `components/common/ServiceShowcaseSection.vue` | 统一服务卡片圆角到 DGP card 基准 |
| `components/common/EngineLinksSection.vue` | 统一引擎链接卡片与 icon 圆角到 DGP 基准 |
| `components/home/**` | 首页重复按钮、tab 与标题复用 |
| `components/layout/SiteFooter.vue` | Footer 订阅按钮复用公共按钮 |
| `doc/engineering/**` | HOME 基准与 Harness Engineering 文档 |
| `doc/product/**` | 产品文档同步 |
| `doc/tasks/README.md` | 任务流程加入 Harness Engineering |
| `doc/tasks/TASK_TEMPLATE.md` | 任务模板加入 Harness 验收项 |
| `doc/tasks/in-progress/TASK-001.1-homepage-initial.md` | 同步 Tres 依赖已移除状态 |
| `AGENTS.md` | 工程执行规范同步 |
| `scripts/harness-check.mjs` | Harness 检查脚本 |
| `package.json` / `pnpm-lock.yaml` | 新增 Harness 脚本并移除废弃 Tres/Three 依赖 |
| `tests/**` | 视觉与工程契约更新 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | `main` |
| Commit Message | `chore(TASK-002.1): initialize project repository` |
| Commit Hash    | `4c34240` |
| Git Status     | 通过：本地 Git 仓库已恢复 |
| Git Push       | 通过：已推送至 `origin/main` |

## 完成说明
已完成代码规范排查、公共设计系统抽取、HOME 基准文档、Harness Engineering 脚本、产品文档同步、废弃依赖移除、本地 Git 恢复与 GitHub 推送。远端 `main` 已按当前本地提交覆盖，不合并远端旧历史。

## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，4 个测试文件 / 17 个测试 |
| `pnpm test:visual` | 通过，6 个视觉契约测试 |
| `pnpm build` | 通过；仅有 Nuxt/Rolldown plugin timing 性能提示 |
| `pnpm harness:engineering` | 通过 |
| Browser card radius verification | 通过，HOME、Why DeepTrols、DGP 的带 icon 信息卡 card 圆角均为 16px，icon 外框均为 12px，普通卡 `min-height:auto`，无横向溢出，无 console error |
| Browser Why Trust technology icon verification | 通过，`why-trust-title-panel-technology` 中 4 个 icon 外框均为 40×40、圆角 12px，内部 SVG 为 20×20，无横向溢出，无 console error |

## SSR 验证
- 使用生产构建 `HOST=127.0.0.1 PORT=3600 node .output/server/index.mjs` 启动预览。
- 首页 SSR HTML 命中 `dt-button`、`dt-cta-panel` 与 19 个 `data-slot="base"`。
- SSR HTML 未命中 `<canvas`、`tresjs`、`three.js` 或 `@apply`。
- Footer 顺序满足 `site-footer__main` -> `site-footer__socials` -> `site-footer__rule site-footer__rule--bottom`。

## 已知问题
- `SiteHeader.vue`、`SiteFooter.vue`、`HomeCases.vue`、`HomeEcosystemVisual.vue` 等组件仍超过 300 行；本任务已先抽取公共视觉入口，后续建议单独拆分结构组件与 SVG 动画组件。
