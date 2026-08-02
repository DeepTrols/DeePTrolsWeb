# TASK-006.1：数曜·数据治理平台产品页
---
* TaskName：数曜·数据治理平台产品页
* TaskDescription：根据 DGP 产品需求文档完成 `/products/data-governance` 页面，实现 Hero、核心价值、产品架构、产品能力、企业级数据治理、应用场景与 CTA。
* TaskCreator：Codex
* TaskCreationTime：2026-08-02
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-006.1 |
| Epic | EPIC-006 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 创建 `/products/data-governance` 路由。
2. 严格按照 `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/DGP.md` 实现页面结构与文案。
3. Hero 使用公共 `PageHero`，右侧视觉使用本地下载素材和 Tailwind v4 / SVG 原生动画。
4. 沉淀可复用的产品核心价值/能力卡片组件与系统阶段卡片组件。
5. 产品架构板块使用 `ProductSystemSection.vue`，暂不引入流程图。
6. CTA 使用公共 `CtaSection.vue`。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/NAVIGATION.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/DGP.md`

---
## 实现内容
1. 新增 `/products/data-governance` 路由，页面由全局 `SiteHeader`、`SiteFooter` 与 DGP 产品区块组成。
2. 新增 DGP 数据模块，集中维护核心价值、产品架构卡片、产品能力、企业级数据治理演进、应用场景与 CTA 文案。
3. Hero 复用 `PageHero`，使用 `Database` badge icon，并根据 DGP.md 固定首屏标题、描述和 `SHUYAODGP_HORE_WEBM` visual label。
4. Hero 右侧视觉使用已下载到本地的 4 个素材文件，并通过 Tailwind CSS v4 utility class 与 SVG 原生动画实现循环动效。
5. 新增 `ProductFeatureGridSection.vue`，用于产品页核心价值与产品能力卡片区块。
6. 新增 `SystemCards.vue`，用于产品架构阶段卡片；`DgpArchitecture.vue` 复用 `ProductSystemSection.vue`，不引入流程图。
7. 新增 DGP 企业级数据治理演进区块与应用场景 tab 区块，缺失图片按需求使用占位符。
8. 更新公共区块文档与 Harness Engineering，确保 DGP 页、公共产品组件和本地素材引用被持续检查。

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
- [x] 页面可访问 `/products/data-governance`
- [x] 页面文案与 DGP.md 保持一致
- [x] Hero 右侧动画不引用远程素材

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `pages/products/data-governance.vue` | 新增数曜·数据治理平台产品页。 |
| `data/dgp.ts` | 新增 DGP 产品页结构化内容。 |
| `components/product/dgp/DgpHero.vue` | 新增 DGP Hero 组合组件。 |
| `components/product/dgp/DgpHeroVisual.vue` | 新增 DGP Hero 本地素材动效。 |
| `components/product/dgp/DgpArchitecture.vue` | 新增 DGP 产品架构区块。 |
| `components/product/dgp/DgpEvolutionSection.vue` | 新增企业级数据治理演进区块。 |
| `components/product/dgp/DgpUseCasesSection.vue` | 新增应用场景 tab 区块。 |
| `components/common/ProductFeatureGridSection.vue` | 新增产品核心价值/能力公共网格区块。 |
| `components/common/SystemCards.vue` | 新增产品系统阶段卡片公共组件。 |
| `components/common/ProductSystemSection.vue` | 增加 `contentFlush` 支持，并修复 `SectionHeading` 标题 prop。 |
| `tests/dgp-content.spec.ts` | 新增 DGP 内容契约测试。 |
| `tests/visual.spec.ts` | 增加 DGP 页面视觉/结构契约测试。 |
| `scripts/harness-check.mjs` | 增加 DGP 页与公共产品区块 Harness 检查。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 增加公共产品区块使用约束。 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/*.png` | 新增 DGP Hero 本地视觉素材。 |
| `doc/tasks/review/TASK-006.1-dgp-product-page.md` | 新增并更新任务记录。 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，4 个测试文件 / 17 个测试 |
| `pnpm test:visual` | 通过，6 个视觉契约测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| Browser `http://127.0.0.1:3101/products/data-governance` | 通过，7 个 section、4 个 tab、本地图片加载成功、无 console error |
| Browser Mobile 390px | 通过，无横向溢出、核心内容可见、无 console error |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `feat(TASK-006.1): implement data governance product page` |
| Commit Hash | 待回填 |

## 完成说明
已按照 DGP.md 完成产品页实现。页面内容、区块结构、Hero 本地素材、公共组件复用和 Harness Engineering 均已纳入验证。
