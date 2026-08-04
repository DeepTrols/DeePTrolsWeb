# TASK-006.3：数曜·数据开发平台页面
---
* TaskName：数曜·数据开发平台页面
* TaskDescription：根据 DDP.md 完成 `/products/data-development` 数曜·数据开发平台产品页，严格复用 HOME 基准与公共组件，页面新增样式仅使用 Tailwind CSS v4 utility。
* TaskCreator：Codex
* TaskCreationTime：2026-08-04
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-006.3 |
| Epic | EPIC-006 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 创建 `/products/data-development` 路由。
2. 严格根据 `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODDP/DDP.md` 实现数曜·数据开发平台页面。
3. 页面使用公共 Header、Footer、PageHero、ProductFeatureGridSection、ProductSystemFlowFrame、CtaSection 等公共组件。
4. DDP 页面业务组件不写 scoped CSS，仅使用 Tailwind CSS v4 utility 与 `dt-*` 公共样式层。
5. 复用 DLP 核心能力交错时间线形态，不重复实现已有能力。

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
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODDP/DDP.md`

---
## 实现内容
1. 新增 `/products/data-development` 页面，接入公共 Header、Footer 和 SEO。
2. 新增 `data/ddp.ts`，集中管理 DDP Hero、挑战、核心优势、核心能力时间线、统一数据开发、应用场景与 CTA 数据。
3. 新增 `DdpHero` 与 `DdpHeroVisual`，Hero 使用公共 `PageHero`，右侧视觉为 Tailwind-only 图片占位。
4. 新增 `DdpArchitecture`，复用 `ProductSystemSection` 与 `ProductSystemFlowFrame`，暂不传入具体 flow。
5. 新增 `AlternatingTimelineSection` 公共组件，并将 DLP / DDP 核心能力统一改为复用该组件。
6. 新增 `DdpCapabilityTimelineSection`，按 DDP.md 要求使用核心能力中轴交错时间线。
7. 新增 `DdpUnifiedDevelopmentSection`，通过 `ProductFeatureGridSection #after` 组合数字 icon 卡片与 `ProductSystemFlowFrame`。
8. 扩展 `FeatureCard` 支持 `iconLabel`，扩展 `ProductFeatureGridSection` 支持数字 icon 透传和 after slot。
9. 新增 `tests/ddp-content.spec.ts`，并更新 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs`，将 DDP 页面纳入内容、视觉和 Harness 契约。
10. 更新 `doc/engineering/COMMON_SECTION_COMPONENTS.md` 与 `doc/engineering/COMPONENT_REFINEMENT_AUDIT.md`，记录 DDP 复用结构与公共组件约束。

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
| `pages/products/data-development.vue` | 新增数曜·数据开发平台页面 |
| `data/ddp.ts` | 新增 DDP 页面集中内容配置 |
| `components/product/ddp/DdpHero.vue` | 新增 DDP Hero 配置封装 |
| `components/product/ddp/DdpHeroVisual.vue` | 新增 Hero 图片占位视觉 |
| `components/product/ddp/DdpArchitecture.vue` | 新增解决方案架构区 |
| `components/product/ddp/DdpCapabilityTimelineSection.vue` | 新增核心能力交错时间线区 |
| `components/product/ddp/DdpUnifiedDevelopmentSection.vue` | 新增统一数据开发区 |
| `components/common/AlternatingTimelineSection.vue` | 新增公共中轴交错时间线组件 |
| `components/product/dlp/DlpCapabilityTimelineSection.vue` | 改为复用公共时间线组件 |
| `components/common/card/FeatureCard.vue` | 支持数字 icon label |
| `components/common/ProductFeatureGridSection.vue` | 支持 `iconLabel` 透传与 `#after` slot |
| `tests/ddp-content.spec.ts` | 新增 DDP 内容契约测试 |
| `tests/visual.spec.ts` | 新增 DDP 页面视觉契约，更新 DLP 时间线复用契约 |
| `scripts/harness-check.mjs` | 新增 DDP Harness 检查 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充数字 icon、after slot 与时间线组件说明 |
| `doc/engineering/COMPONENT_REFINEMENT_AUDIT.md` | 补充 DDP 组件复用结构 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODDP/DDP.md` | 新增 DDP 产品页面需求文档 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `git pull --ff-only` | 通过，Already up to date |
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，6 个文件、25 个测试 |
| `pnpm test:visual` | 通过，8 个视觉契约测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| 浏览器桌面验证 | 通过，`/products/data-development` 可打开，无横向溢出，无 console warn/error |
| 浏览器移动端验证 | 通过，390px 视口无横向溢出，无 console warn/error |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | 提交后更新 |
| Commit Hash | 提交后更新 |

## 完成说明
已按 DDP.md 完成数曜·数据开发平台页面实现，页面区块顺序、文案、按钮、占位视觉和 CTA 均按需求文档配置。新增 DDP 业务组件均为 Tailwind-only，未新增 scoped CSS。当前工作区存在任务开始前已有的 `components/product/dgp/DgpHero.vue` 本地修改，本任务未修改该文件。
