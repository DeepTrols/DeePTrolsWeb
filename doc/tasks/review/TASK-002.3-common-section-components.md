# TASK-002.3：公共页面区块组件抽离
---
* TaskName：公共页面区块组件抽离
* TaskDescription：将 Why DeepTrols 与 HOME 中可复用的页面区块抽离为公共组件，保留页面专用组件作为轻量配置封装，方便后续页面保持统一视觉与交互。
* TaskCreator：Codex
* TaskCreationTime：2026-07-31
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-002.3 |
| Epic | EPIC-002 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 抽离 Why Hero 为公共 Hero 组件，且从 Hero 中移除 logo 区域。
2. 将 Why Hero logos 单独抽离为组件。
3. 抽离 Why Trust、Why Service、Why Engine 为公共区块组件。
4. 抽离 HOME Product System 为公共产品体系区块，流程图通过 slot 传入。
5. 抽离 HOME CTA 为公共 CTA 区块组件。
6. 更新 Harness、测试和工程文档，避免后续页面复用偏差。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/CODE_AUDIT_2026-07-30.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`
- `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/WhyDeepTrols.md`

---
## 实现内容
1. 新增 `PageHero`，抽离 Why Hero 的背景、标题、按钮和视觉 slot，`WhyHero` 仅保留 DeepTrols 文案与 robot 视频。
2. 新增 `HeroLogoStrip` 与 `WhyHeroLogos`，从 `WhyHero` 中移除 `why-hero__logos` 区域。
3. 新增 `TrustTabsSection`，抽离 Why Trust 的 segmented tabs 与 2×2 卡片网格。
4. 新增 `ServiceShowcaseSection`，抽离 Why Service 的服务列表与右侧图片展示结构。
5. 新增 `EngineLinksSection`，抽离 Why Engine 的链接卡片与说明区块。
6. 新增 `ProductSystemSection`，抽离 HOME Product System 的标题、移动端兜底和产品卡片；桌面流程图通过 `#desktop-flow` slot 传入。
7. 新增 `CtaSection`，抽离 HOME CTA 的 panel、按钮和响应式字号。
8. 新增 `doc/engineering/COMMON_SECTION_COMPONENTS.md`，记录公共区块组件复用约束。
9. 更新 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs`，使测试和 Harness 检查公共组件复用关系。
10. 2026-08-03 追加 P0 精细组件抽离：新增 `SectionShell`、`SectionHeader`、`BaseCard`、`IconBox`、`CardText`、`CardGrid`、`FeatureCard`、`BaseTabs`、`CarouselRoot`、`CarouselControls`。
11. 将 `ProductFeatureGridSection`、`SystemCards`、`ProductSystemCards`、`TrustTabsSection`、`ServiceShowcaseSection`、`EngineLinksSection`、`ProductSystemSection` 改为组合 P0 公共组件。
12. 将 HOME Solutions、DGP Use Cases、Why Trust 的 tab 统一迁移到 `BaseTabs`，保留 pill、underline、segmented 三种视觉变体。
13. 将 `DgpEvolutionSection` 标题迁移到 `SectionHeader`，并保留页面原有 alternating layout。
14. 新增 `doc/engineering/COMPONENT_REFINEMENT_AUDIT.md` 的 Phase 1 落地记录，并同步 `COMMON_SECTION_COMPONENTS.md` 与 `HARNESS_ENGINEERING.md`。

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
- [x] Why Hero 不再包含 logo 区域
- [x] Product System 公共组件不直接依赖具体流程图

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/PageHero.vue` | 新增公共 Hero 区块 |
| `components/common/HeroLogoStrip.vue` | 新增公共 Hero logo strip |
| `components/common/TrustTabsSection.vue` | 新增公共 Trust Tabs 区块 |
| `components/common/ServiceShowcaseSection.vue` | 新增公共服务展示区块 |
| `components/common/EngineLinksSection.vue` | 新增公共引擎链接区块 |
| `components/common/ProductSystemSection.vue` | 新增公共产品体系区块，流程图走 slot |
| `components/common/CtaSection.vue` | 新增公共 CTA 区块 |
| `components/common/section/SectionShell.vue` | 新增公共 section 外壳组件 |
| `components/common/section/SectionHeader.vue` | 新增公共 section 标题组件 |
| `components/common/card/BaseCard.vue` | 新增公共 card 外壳组件 |
| `components/common/card/IconBox.vue` | 新增公共 icon 外框组件 |
| `components/common/card/CardText.vue` | 新增公共 card 文案组件 |
| `components/common/card/CardGrid.vue` | 新增公共 card 网格组件 |
| `components/common/card/FeatureCard.vue` | 新增公共功能卡组件 |
| `components/common/tabs/BaseTabs.vue` | 新增公共 tab 状态与 ARIA 组件 |
| `components/common/carousel/CarouselRoot.vue` | 新增公共 carousel root 组件 |
| `components/common/carousel/CarouselControls.vue` | 新增公共 carousel 控制组件 |
| `components/common/ProductFeatureGridSection.vue` | 改为组合 `SectionShell`、`SectionHeader`、`CardGrid`、`FeatureCard` |
| `components/common/SystemCards.vue` | 改为组合 `CardGrid`、`FeatureCard` |
| `components/common/ProductSystemCards.vue` | 改为组合 `CardGrid`、`BaseCard`、`IconBox` |
| `components/home/HomeSolutions.vue` | 改为使用 `BaseTabs` |
| `components/product/dgp/DgpUseCasesSection.vue` | 改为使用 `BaseTabs(underline)` |
| `components/product/dgp/DgpEvolutionSection.vue` | 改为使用 `SectionHeader` |
| `doc/engineering/COMPONENT_REFINEMENT_AUDIT.md` | 记录精细组件抽离统计、结构与 Phase 1 执行状态 |
| `components/why/WhyHero.vue` | 改为 `PageHero` 配置封装 |
| `components/why/WhyHeroLogos.vue` | 新增 Why Hero logo 区块 |
| `components/why/WhyTrustTabs.vue` | 改为 `TrustTabsSection` 配置封装 |
| `components/why/WhyServiceReset.vue` | 改为 `ServiceShowcaseSection` 配置封装 |
| `components/why/WhyEngine.vue` | 改为 `EngineLinksSection` 配置封装 |
| `components/home/HomeProductSystem.vue` | 改为 `ProductSystemSection` 配置封装，并传入 `EnterpriseFlow` slot |
| `components/home/HomeCta.vue` | 改为 `CtaSection` 配置封装 |
| `pages/why-deeptrols.vue` | 接入独立 `WhyHeroLogos` |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 新增公共区块复用文档 |
| `doc/engineering/HARNESS_ENGINEERING.md` | 补充公共区块组件约束 |
| `scripts/harness-check.mjs` | 补充公共区块组件 Harness 检查 |
| `tests/visual.spec.ts` | 更新视觉契约到公共组件层 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，4 个文件、17 个测试 |
| `pnpm test:visual` | 通过，6 个测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过；Nuxt/Rolldown 输出 plugin timings 性能提示，不影响构建结果 |
| `git diff --check` | 通过 |
| `curl -I http://127.0.0.1:43101/` | 通过，HTTP 200 |
| `curl -I http://127.0.0.1:43101/why-deeptrols` | 通过，HTTP 200 |
| `curl -I http://127.0.0.1:43101/products/data-governance` | 通过，HTTP 200 |
| Browser runtime check | 通过，HOME / Why DeepTrols / DGP 均无 console error |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `refactor(TASK-002.3): extract shared component primitives` |
| Commit Hash | 本次提交后以 `git log -1 --oneline` 为准 |

## 完成说明
公共区块已抽离，Why/Home/DGP 页面现有视觉和内容由页面封装组件传入公共组件。2026-08-03 追加的 P0 精细组件已接入首批区块，carousel 基础组件已新增但业务 carousel 迁移留到下一批。
