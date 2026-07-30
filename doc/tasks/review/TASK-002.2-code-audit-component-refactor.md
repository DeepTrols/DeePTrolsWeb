# TASK-002.2：代码审计与组件拆分修复
---
* TaskName：代码审计与组件拆分修复
* TaskDescription：审计当前官网代码中不符合工程规范的实现，优先修复超过 300 行组件、重复数据和 Harness 覆盖不足问题，并生成工程审计文档。
* TaskCreator：Codex
* TaskCreationTime：2026-07-30
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-002.2 |
| Epic | EPIC-002 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 扫描当前组件规模、样式规范、可复用性和 Harness Engineering 覆盖风险。
2. 修复明确违反组件建议规模的遗留问题，避免单个 Vue 组件超过 300 行。
3. 将可配置数据从布局组件中抽离，降低后续页面维护成本。
4. 补充工程契约，避免超长组件问题再次回归。
5. 生成代码审计报告，记录已修复问题和残余风险。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/tasks/in-progress/TASK-002.1-design-system-harness-refactor.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/NAVIGATION.md`

---
## 初始审计发现
1. `components/navigation/SiteHeader.vue` 约 644 行，Header 状态管理、桌面导航、右侧动作、移动导航和样式集中在一个组件。
2. `components/layout/SiteFooter.vue` 约 630 行，Footer 导航数据、订阅区、主导航、社交图标和样式集中在一个组件。
3. `components/home/HomeEcosystemVisual.vue` 约 551 行，四套 SVG 动画、几何数据和动画样式集中在一个组件。
4. `components/home/HomeCases.vue` 约 480 行，carousel 状态、header、tabs、slide card、controls 和样式集中在一个组件。
5. `components/navigation/MegaMenuPanel.vue` 约 313 行，略超 300 行，主要由模板和 scoped SCSS 组成。
6. 当前 Harness Engineering 尚未检查组件最大行数，无法阻止上述问题回归。
7. 当前工作区存在未跟踪目录 `doc/product/PAGE_REQUIREMENTS/PRODUCT/`，本任务不修改该目录。

---
## 实现内容
1. 拆分超长组件，确保 `components/` 与 `pages/` 下所有 Vue 文件不超过 300 行。
2. 将 Header 拆为父级交互容器、桌面导航、右侧动作、移动导航和菜单按钮组件。
3. 将 Footer 拆为订阅区、主导航、社交区、底部备案版权和独立数据模块。
4. 将客户故事轮播拆为容器、Slide 与 Controls，保持按钮复用 `BaseButton`。
5. 将生态视觉动画拆为容器、四个 SVG 子组件和独立几何数据模块。
6. 将服务型 Mega Menu 拆为独立子组件。
7. 补充 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs`，新增 300 行上限和拆分组件契约。
8. 生成 `doc/engineering/CODE_AUDIT_2026-07-30.md`，记录审计结论、已修复问题与残余风险。

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
- [x] 所有 Vue 组件不超过 300 行
- [x] 代码审计文档已生成

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/navigation/SiteHeader.vue` | 收敛为 Header 状态与布局容器 |
| `components/navigation/SiteHeaderDesktopNav.vue` | 新增桌面主导航组件 |
| `components/navigation/SiteHeaderActions.vue` | 新增 Header 右侧动作组件 |
| `components/navigation/SiteHeaderMobileNav.vue` | 新增移动端导航组件 |
| `components/navigation/SiteHeaderMenuButton.vue` | 新增移动端菜单按钮组件 |
| `components/navigation/MegaMenuPanel.vue` | 拆出服务布局后收敛主面板职责 |
| `components/navigation/MegaPanelServices.vue` | 新增服务型 Mega Menu 子组件 |
| `components/layout/SiteFooter.vue` | 收敛为 Footer 布局容器 |
| `components/layout/FooterSubscribe.vue` | 新增 Footer 订阅区 |
| `components/layout/FooterMain.vue` | 新增 Footer 主导航区 |
| `components/layout/FooterSocials.vue` | 新增 Footer 社交区 |
| `components/layout/FooterBottom.vue` | 新增 Footer 备案版权区 |
| `data/footer.ts` | 新增 Footer 导航和社交图标数据 |
| `components/home/HomeCases.vue` | 拆出 Slide 与 Controls |
| `components/home/HomeCaseSlide.vue` | 新增客户故事 Slide |
| `components/home/HomeCasesControls.vue` | 新增客户故事控制按钮 |
| `components/home/HomeEcosystemVisual.vue` | 收敛为生态视觉容器 |
| `components/home/ecosystem-visuals/*.vue` | 新增四类生态 SVG 视觉组件 |
| `data/ecosystemVisual.ts` | 新增生态视觉几何数据 |
| `tests/visual.spec.ts` | 更新视觉契约并新增组件 300 行约束 |
| `scripts/harness-check.mjs` | 更新 Harness Engineering 结构契约和 300 行约束 |
| `doc/engineering/CODE_AUDIT_2026-07-30.md` | 新增代码审计报告 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，3 个文件、13 个测试 |
| `pnpm test:visual` | 通过，5 个测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| `git diff --check` | 通过 |
| `curl -I http://127.0.0.1:3199/` | 通过，HTTP 200 |
| `curl -I http://127.0.0.1:3199/why-deeptrols` | 通过，HTTP 200 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `refactor(TASK-002.2): audit and split oversized components` |
| Commit Hash | 待更新 |

## 完成说明
本轮已修复审计中发现的超长组件问题，并将约束写入测试与 Harness。未跟踪目录 `doc/product/PAGE_REQUIREMENTS/PRODUCT/` 属于既有工作区内容，本任务未修改。
