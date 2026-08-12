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
9. 修复 `PageHero` 视觉尺寸：默认恢复产品页正常尺寸，Why DeepTrols 显式使用 `visualSize="large"`。
10. 修复核心价值与产品能力卡片：补齐 icon，移除固定高度，使用内容高度与网格拉齐机制控制卡片高度。
11. 修复产品架构：恢复 `ProductSystemFlowFrame` 网格背景占位，仍不引入实际流程图。
12. 修复企业级数据治理配图占位：移除配图区域边框与背景。
13. 修复应用场景：按 EMQX 产品页 tabs 结构改为 `data-slot="root/list/trigger/indicator/label"`、底部主色指示条与产品页式 tab hover。
14. 修复核心价值区块：移除 `pt-24`，卡片 icon 去掉 `mb-6`，h3/p 改为指定的 `text-[15px]` 与 `text-sm` FlowMQ 式结构。
15. 修复产品能力区块：与核心价值复用同一卡片结构，并统一核心价值、产品能力、产品架构标题区的公共约束。
16. 修复企业级数据治理：按 EMQX `products/emqx` 的 `section.container`、heading、pill eyebrow、卡片排版与间距结构重写。
17. 修复应用场景：按 EMQX `products/emqx-neuron` 的 h2/p/tabs 结构重写，去掉旧 `SectionHeading` 与 `!pb-0`。
18. 修复 DGP 各区块副标题：桌面端统一不换行并解除 `SectionHeading` nowrap 模式的 760px 限制，移动端保持自然换行且无横向溢出。

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
| `components/common/SectionHeading.vue` | 增强 `nowrapSubtitle` 模式，桌面端解除最大宽度避免副标题换行。 |
| `components/common/SystemCards.vue` | 新增产品系统阶段卡片公共组件。 |
| `components/common/ProductSystemSection.vue` | 增加 `contentFlush` 支持，并修复 `SectionHeading` 标题 prop。 |
| `components/common/PageHero.vue` | 增加 `visualSize`，隔离 Why 页大视觉与产品页正常视觉尺寸。 |
| `components/why/WhyHero.vue` | 显式启用 `visual-size="large"`。 |
| `assets/css/tailwind.css` | 增加 EMQX 风格文本色别名，映射到 DeepTrols 设计 token。 |
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
| Browser DGP 修复验证 | 通过，Hero 视觉约 512px，核心价值/产品能力 icon 完整，卡片 `min-height:auto`，架构占位 560px，演进配图背景透明，tabs 可切换 |
| Browser DGP 最新修复验证 | 通过，核心价值无 `pt-24`，h3/p class 与要求一致，核心/能力/架构标题结构统一，应用场景无横向溢出 |
| Browser DGP 副标题验证 | 通过，桌面 1440px 下 5 个相关副标题均为 `white-space: nowrap` 且无横向溢出；移动 390px 下恢复自然换行且无横向溢出 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `fix(TASK-006.1): prevent dgp subtitles wrapping` |
| Commit Hash | `2da24931d98b673aafd7acabca307860da89d22c` |

## 完成说明
已按照 DGP.md 完成产品页实现，并根据复核反馈修复 Hero 视觉尺寸、核心/能力卡片、产品架构占位、企业级数据治理配图、应用场景 tabs、产品页源码级 class 结构与桌面端副标题不换行。页面内容、区块结构、Hero 本地素材、公共组件复用和 Harness Engineering 均已纳入验证。

---
## 追加实现：Hero 动画视觉（Hero.md）
依据 `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/Hero.md`，将 DGP Hero 右侧 `.ban-img` 本地素材动效替换为 EMQX emqx-edge 产品页 Edge Broker 控制台卡片 1:1 内容适配的动画组件，并补齐 Hero 行动按钮与宽视觉：

1. `DgpHeroVisual` 重写为 EMQX edge 控制台卡片：左侧「数曜·数据治理平台 / Intelligent / Governed Data」品牌区与 Client 连接列表，右侧治理终端按 `dgpGovernanceScenes` 三个数据域（客户数据域/订单数据域/产品数据域）循环执行打字命令 + 扫描日志 + 质量分动画；全部 Tailwind utility，无 scoped CSS、无内联 style。
2. `data/dgp.ts` 新增 `dgpGovernanceScenes`（命令、日志、数据表数量、质量分），文案与 Hero.md 一致。
3. `DgpHero` 增加 `visual-size="large"` 与 `heroActions`（立即咨询/申请试用），对齐 DMS/DLP 的 PageHero 宽视觉约定。
4. `DGP.md` 右侧视觉说明改为引用 `Hero.md`，废弃原 `.ban-img` 素材方案（imgs 仅作存档）。
5. 同步更新 `tests/dgp-content.spec.ts`、`tests/visual.spec.ts`、`scripts/harness-check.mjs` 的 DGP Hero 契约（终端文案、治理场景数据、`visual-size="large"`、无 `<style>`/`style=`）。

### 追加测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm test:visual` / `pnpm harness:engineering` / `pnpm build` | 通过（`pnpm test`/`test:visual`/`harness` 仅余 DDP 在途改名的既有断言失败，与本任务无关） |
| Headless 浏览器验证 | `/products/data-governance` 终端打字动画三场景循环、Client 列表、Hero 按钮与宽视觉正常，无 console error |

### 追加修改文件
| 文件 | 说明 |
|----|----|
| `components/product/dgp/DgpHeroVisual.vue` | EMQX edge 控制台卡片 1:1 动画组件 |
| `components/product/dgp/DgpHero.vue` | `visual-size="large"` + Hero 行动按钮 |
| `data/dgp.ts` | 新增 `dgpGovernanceScenes` |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/Hero.md` | 新增 Hero 视觉需求文档 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/DGP.md` | 右侧视觉说明改为引用 Hero.md |
| `tests/dgp-content.spec.ts` / `tests/visual.spec.ts` / `scripts/harness-check.mjs` | DGP Hero 契约更新 |
