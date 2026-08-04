# TASK-006.2：数曜·数据标签平台页面
---
* TaskName：数曜·数据标签平台页面
* TaskDescription：根据 DLP.md 完成 `/products/data-labeling` 数曜·数据标签平台产品页，严格复用 HOME 基准与公共组件，页面新增样式仅使用 Tailwind CSS v4 utility。
* TaskCreator：Codex
* TaskCreationTime：2026-08-04
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-006.2 |
| Epic | EPIC-006 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 创建 `/products/data-labeling` 路由。
2. 严格根据 `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/DLP.md` 实现数曜·数据标签平台页面。
3. 页面使用公共 Header、Footer、PageHero、ProductFeatureGridSection、ProductSystemFlowFrame、CtaSection 等公共组件。
4. 新增 DLP 页面业务组件不写 scoped CSS，仅使用 Tailwind CSS v4 utility 与 `dt-*` 公共样式层。
5. 更新测试与 Harness Engineering，确保后续页面不偏离。

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
- `doc/product/SITE_MAP.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/DLP.md`

---
## 实现内容
1. 新增 `/products/data-labeling` 页面，接入公共 Header、Footer 和 SEO。
2. 新增 `data/dlp.ts`，集中管理 DLP Hero、挑战、核心优势、核心能力时间轴、标签沉淀、应用场景与 CTA 数据。
3. 新增 `DlpHero` 与 `DlpHeroVisual`，Hero 使用公共 `PageHero`，右侧视觉为 Tailwind-only 图片占位。
4. 新增 `DlpArchitecture`，复用 `ProductSystemSection` 与 `ProductSystemFlowFrame`，暂不传入具体 flow。
5. 新增 `DlpCapabilityTimelineSection`，按 DLP.md 要求实现 EMQX Edge 风格的中轴交错能力区，文字侧为纯文本块，不使用 card 边框与 icon。
6. 新增 `DlpAiModelingSection`，实现 AI 辅助建标左右布局，右侧图片占位。
7. 扩展 `ProductFeatureGridSection` 支持 `columns="three"`，用于 DLP 核心优势三列网格与三张应用场景卡片。
8. 新增 `tests/dlp-content.spec.ts`，并更新 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs`，将 DLP 页面纳入内容、视觉和 Harness 契约。
9. 更新 `doc/engineering/COMMON_SECTION_COMPONENTS.md`，记录 Product Feature Grid 的 2 / 3 / 4 列复用方式。
10. 复核修复 DLP 核心能力区：移除 `BaseCard` 与 `IconBox`，恢复 EMQX Edge 风格无边框交错叙事排版。
11. 复核修复 DGP 企业级数据治理区：移除文字侧 `.dt-card` 外壳，保持与产品页交错叙事区一致。
12. 复核修复 DLP 核心能力与 DGP 企业级数据治理的 `SectionHeader` eyebrow 样式，恢复全局默认标题层级。

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
- [x] 浏览器验证无 console error

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `pages/products/data-labeling.vue` | 新增数曜·数据标签平台页面 |
| `data/dlp.ts` | 新增 DLP 页面集中内容配置 |
| `components/product/dlp/DlpHero.vue` | 新增 DLP Hero 配置封装 |
| `components/product/dlp/DlpHeroVisual.vue` | 新增 Hero 图片占位视觉 |
| `components/product/dlp/DlpArchitecture.vue` | 新增解决方案架构区 |
| `components/product/dlp/DlpCapabilityTimelineSection.vue` | 新增核心能力交错时间轴区 |
| `components/product/dlp/DlpAiModelingSection.vue` | 新增 AI 辅助建标区 |
| `components/product/dgp/DgpEvolutionSection.vue` | 复核修复企业级数据治理交错叙事文字侧，去除 card 外壳 |
| `data/dlp.ts` | 复核移除核心能力时间线不再展示的 icon 字段 |
| `components/common/ProductFeatureGridSection.vue` | 支持 `columns="three"` |
| `tests/dlp-content.spec.ts` | 新增 DLP 内容契约测试 |
| `tests/visual.spec.ts` | 新增 DLP 页面视觉契约 |
| `scripts/harness-check.mjs` | 新增 DLP Harness 检查 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 Product Feature Grid 三列复用说明与交错叙事区约束 |
| `doc/engineering/COMPONENT_REFINEMENT_AUDIT.md` | 校准 DGP 企业级数据治理的抽离方向 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/DLP.md` | 新增 DLP 产品页面需求文档 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `git pull --ff-only` | 通过，Already up to date |
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，5 个文件、21 个测试 |
| `pnpm test:visual` | 通过，7 个测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| `git diff --check` | 通过 |
| Browser desktop check | 通过，`/products/data-labeling` H1 正常、14 个 section、console error 0、warning 0 |
| Browser mobile check | 通过，390px 宽度无横向溢出、console error 0 |
| Review DLP desktop check | 通过，核心优势 `md:grid-cols-3`、6 张卡片；核心能力 5 个纯文本块、card/icon 数量 0、eyebrow 16px、console error/warn 0 |
| Review DGP desktop check | 通过，企业级数据治理 3 个纯文本块、card/icon 数量 0、eyebrow 16px、console error/warn 0 |
| Review DLP mobile check | 通过，375px 宽度无横向溢出、核心能力 card/icon 数量 0、console error/warn 0 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `feat(TASK-006.2): implement data labeling product page` |
| Commit Hash | `fa61f65` |
| Review Fix Commit Message | `fix(TASK-006.2): align DLP timeline layout` |
| Review Fix Commit Hash | 提交后更新 |

## 完成说明
已完成数曜·数据标签平台页面首版实现，页面严格按 DLP.md 区块顺序组合，新增 DLP 业务组件均为 Tailwind-only，未新增 scoped CSS。复核阶段已将核心优势调整为桌面三列网格，并将 DLP 核心能力与 DGP 企业级数据治理恢复为 EMQX 产品页风格的无边框交错叙事排版。当前工作区存在任务开始前已有的 `components/product/dgp/DgpHero.vue` 本地修改，本任务未修改该文件。
