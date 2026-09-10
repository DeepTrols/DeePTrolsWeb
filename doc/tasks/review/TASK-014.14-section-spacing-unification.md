# TASK-014.14：全站 Section 间距统一
---
* TaskName：全站 Section 间距统一
* TaskDescription：修复所有页面 section 间距不统一问题：section 根不再携带任何 pt/pb，内部 container 统一 `mt-10 mb-10`，section 根统一 `flow-root` 防止外边距塌陷；PageHero / HomeHero / CtaSection / hero 附属条带豁免。
* TaskCreator：Olly
* TaskCreationTime：2026-09-10
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.14 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0 |
| 负责人  | Claude |

---
## 任务目标
统一全站 section 间距机制（此前 SectionShell `spacing` prop、Tailwind 根类、main.scss `.section`/`.dt-section` 三套并存）：
- section 根元素不携带任何 pt/pb（Tailwind 类与 SCSS padding 均移除）。
- section 内部 container 统一 `mt-10 mb-10`（上下各 40px，相邻 section 视觉间距 80px）。
- section 根统一加 `flow-root`，将 container 的 margin 收在 section 内部，避免外边距塌陷逃逸，保证带背景色/渐变的 section 背景完整覆盖间距区域。
- 该规则成为新建 section 的永久约定，写入 `doc/engineering/COMMON_SECTION_COMPONENTS.md`。
- 豁免清单（本次不动）：PageHero、HomeHero、CtaSection（`home-contact-cta` 固定横幅）、HeroLogoStrip / HomeCustomerLogos（hero 附属条带，`padding-top: 5.5rem` 契约锁定）。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/SOLUTION_PAGE_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`

---
## 实现内容
1. `SectionShell.vue`：删除死代码 `spacing` prop（compact/flush 无调用方），shell 根类改为 `section-shell relative flow-root` 并移除三行 pb 变体，default/wide container 统一追加 `mt-10 mb-10`；7 个调用方自动继承。
2. 直接改类的通用/产品/关于/报告 section（移除根 pt/pb → `flow-root` + 内部 container `mt-10 mb-10`）：ServiceShowcaseSection（同时移除 `dt-section`）、EngineLinksSection（同）、AlternatingTimelineSection、DlpAiModelingSection、DgpUseCasesSection、DgpEvolutionSection（根即 container，重构为 section 包裹）、TanyaoStatsSection、AboutValuesSection、AboutAddressSection、AboutContactSection、ReportFeaturedSection、ReportResourcesSection。
3. 首页 section：HomeInsights（`!pt-16 lg:!pt-24` 移除）、HomeEcosystem、HomeSolutions、HomeDeliverables（scoped clamp padding 与 lg 覆盖删除）、HomeCases（scoped padding-bottom 删除，根即 wide container，间距以 `margin: 40px auto` 承接）、HomeAbout（`pb-5 pt-[78px]` 移除，渐变背景经 `flow-root` 完整覆盖）。
4. `assets/scss/main.scss`：删除 `--dt-space-section` / `--dt-space-section-lg` token、`.section` padding 规则、`.dt-section` 规则及两者 lg 覆盖；`.section--light` 等背景/颜色规则保留。
5. 契约与 Harness 同步：design-system.mjs、why-page.mjs、service-report.mjs、home-layout.mjs、product-data/dgp.mjs、why.contract.ts、dgp.contract.ts、report.contract.ts、home/about.contract.ts、home/insights-cta.contract.ts、home/cases.contract.ts、home/hero-product.contract.ts（:44 logos 锁不动）。
6. 文档：`COMMON_SECTION_COMPONENTS.md` 新增「Section 间距统一规则」章节并更新 SectionShell / Home About / Product Feature Grid 描述；`HOME_PAGE_BASELINE.md` 与 `SOLUTION_PAGE_TEMPLATE.md` 同步节奏描述。

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
| `components/common/section/SectionShell.vue` | 删除 spacing prop，根 `flow-root`，container `mt-10 mb-10` |
| `components/common/ServiceShowcaseSection.vue` | 移除 `dt-section` 与 pb 节奏，改统一规则 |
| `components/common/EngineLinksSection.vue` | 同上 |
| `components/common/AlternatingTimelineSection.vue` | 移除根 pb，改统一规则 |
| `components/product/dlp/DlpAiModelingSection.vue` | 移除根 pb，改统一规则 |
| `components/product/dgp/DgpUseCasesSection.vue` | 移除根 pb，改统一规则 |
| `components/product/dgp/DgpEvolutionSection.vue` | 根即 container，重构为 section 包裹 + container |
| `components/product/tanyao/TanyaoStatsSection.vue` | container pt/pb 改 `mt-10 mb-10`，根加 `flow-root` |
| `components/about/AboutValuesSection.vue` | 根即 container，重构为 section 包裹 + container |
| `components/about/AboutAddressSection.vue` | 同上 |
| `components/about/AboutContactSection.vue` | 同上（保留 `text-center`） |
| `components/service/report/ReportFeaturedSection.vue` | 根即 container，重构为 section 包裹 + container |
| `components/service/report/ReportResourcesSection.vue` | `mb-24`/pb 节奏改统一规则 |
| `components/home/HomeInsights.vue` | `!pt-16 lg:!pt-24` 移除，改统一规则 |
| `components/home/HomeEcosystem.vue` | 根加 `flow-root`，container 加 mt/mb |
| `components/home/HomeSolutions.vue` | 同上 |
| `components/home/HomeDeliverables.vue` | scoped clamp padding 与 lg 覆盖删除，改统一规则 |
| `components/home/HomeCases.vue` | scoped padding-bottom 删除，`margin: 40px auto` 承接间距 |
| `components/home/HomeAbout.vue` | `pb-5 pt-[78px]` 移除，改统一规则 |
| `assets/scss/main.scss` | 删除 section 间距 token 与 `.section`/`.dt-section` padding 规则 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 新增「Section 间距统一规则」章节 |
| `doc/engineering/HOME_PAGE_BASELINE.md` | 同步 section 间距描述 |
| `doc/engineering/SOLUTION_PAGE_TEMPLATE.md` | 同步区块间距规则 |
| `scripts/harness/checks/design-system.mjs` | SectionShell 断言同步 |
| `scripts/harness/checks/why-page.mjs` | ServiceShowcase/EngineLinks/SectionShell 断言同步 |
| `scripts/harness/checks/service-report.mjs` | Report 两 section 断言同步 |
| `scripts/harness/checks/home-layout.mjs` | HomeAbout/HomeInsights/SectionShell 断言同步 |
| `scripts/harness/checks/product-data/dgp.mjs` | DgpEvolution/DgpUseCases 断言同步 |
| `tests/visual/site/why.contract.ts` | SectionShell 断言同步 |
| `tests/visual/product-data/dgp.contract.ts` | SectionShell/Evolution/UseCases 断言同步 |
| `tests/visual/site/report.contract.ts` | Featured/Resources 断言同步 |
| `tests/visual/site/home/about.contract.ts` | HomeAbout 根类与 container 断言同步 |
| `tests/visual/site/home/insights-cta.contract.ts` | HomeInsights 根类断言同步 |
| `tests/visual/site/home/cases.contract.ts` | HomeCases padding/margin 断言同步 |
| `tests/visual/site/home/hero-product.contract.ts` | HomeDeliverables 断言同步（logos 锁不动） |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | refactor(TASK-014.14): unify section spacing via container mt-10 mb-10 |
| Commit Hash    | 本轮提交见 Git 历史 |

## 完成说明
已完成全站 section 间距统一：3 套并存机制收敛为「根 `flow-root` + container `mt-10 mb-10`」单一规则，PageHero / HomeHero / CtaSection / hero 附属条带像素不变；`--dt-space-section(-lg)` token 与 `.section`/`.dt-section` padding 规则全部删除，契约、Harness 与工程文档同提交同步。

验证结果：
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm harness:engineering`
- `pnpm build`
