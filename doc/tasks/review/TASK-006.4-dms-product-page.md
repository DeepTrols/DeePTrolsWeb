# TASK-006.4：数曜·数据要素监管平台页面
---
* TaskName：数曜·数据要素监管平台页面
* TaskDescription：根据 DMS.md 完成 `/products/data-element-regulation` 数曜·数据要素监管平台产品页，严格复用 HOME 基准与公共组件，页面新增样式仅使用 Tailwind CSS v4 utility。
* TaskCreator：Codex
* TaskCreationTime：2026-08-06
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-006.4 |
| Epic | EPIC-006 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 创建 `/products/data-element-regulation` 路由。
2. 严格根据 `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODMS/DMS.md` 实现数曜·数据要素监管平台页面。
3. 页面使用公共 Header、Footer、PageHero、ProductFeatureGridSection、ProductSystemFlowFrame、AlternatingTimelineSection、CtaSection 等公共组件。
4. DMS 页面业务组件不写 scoped CSS，仅使用 Tailwind CSS v4 utility 与既有公共样式层。
5. 同步内容、视觉和 Harness 契约测试，避免后续页面偏差。

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
- `doc/product/PRODUCT_VISION.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODMS/DMS.md`

---
## 实现内容
1. 新增 `/products/data-element-regulation` 页面，接入公共 Header、Footer 和 SEO。
2. 新增 `data/dms.ts`，集中管理 DMS Hero、挑战、核心能力、智能监管时间线、业务价值、监管流程、应用场景与 CTA 数据。
3. 新增 `DmsHero` 与 `DmsHeroVisual`，Hero 使用公共 `PageHero`，右侧视觉为 Tailwind-only 图片占位。
4. 新增 `DmsArchitecture`，复用 `ProductSystemSection` 与 `ProductSystemFlowFrame`，暂不传入具体 flow。
5. 新增 `DmsIntelligentRegulationSection`，复用公共 `AlternatingTimelineSection` 完成智能监管交错叙事。
6. 新增 `DmsBusinessValueSection`，按 DMS.md 中 EMQX 产品页业务价值卡片节奏，用 Tailwind-only markup 实现 2×2 价值卡片。
7. 新增 `DmsRegulationProcessSection`，通过 `ProductFeatureGridSection #before` 组合流程图占位与 3 列阶段卡片。
8. 扩展 `ProductFeatureGridSection` 支持 `#before` slot，满足先展示流程/架构占位再展示卡片的产品模块。
9. 新增 `tests/dms-content.spec.ts`，并更新 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs`，将 DMS 页面纳入内容、视觉和 Harness 契约。
10. 更新 `doc/engineering/COMMON_SECTION_COMPONENTS.md` 与 `doc/engineering/COMPONENT_REFINEMENT_AUDIT.md`，记录 DMS 复用结构与 `#before` slot 约束。
11. 修正业务价值区域：去掉额外 `SectionHeader` 变体，改为与 EMQX 产品页一致的原生标题结构；卡片去掉额外 detail 文案，保持 `metric + h3 + p` 结构，并修复 Tailwind `bg-default` 语义映射避免白底。
12. 业务价值区域重构：改用公共 `ProductSystemSection` 承载标题与内容；卡片按 EMQX 产品页（emqx.com/zh/products/emqx）业务价值区 1:1 还原（渐变顶线、`metric + h3` 基线行、`mt-4 text-sm text-muted` 描述、`mt-5 text-[13px] italic text-dimmed/60` 注释行）；`data/dms.ts` 恢复 `detail` 字段承载 DMS.md 第三行文案；Tailwind theme 新增 `--color-dimmed: var(--dt-color-text-muted)` 以支持 `text-dimmed/60` 透明度修饰符。
13. Hero 文案调整：`title-line` 改为「让数据流通安全、可信」，`description` 改为「实现数据要素全流程智能监管，保障数据安全、合规、高效流通。」；同步更新 DMS.md 需求文档、harness 断言、visual 契约与页面 SEO description。

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
| `pages/products/data-element-regulation.vue` | 新增数曜·数据要素监管平台页面 |
| `data/dms.ts` | 新增 DMS 页面集中内容配置 |
| `components/product/dms/DmsHero.vue` | 新增 DMS Hero 配置封装 |
| `components/product/dms/DmsHeroVisual.vue` | 新增 Hero 图片占位视觉 |
| `components/product/dms/DmsArchitecture.vue` | 新增解决方案架构区 |
| `components/product/dms/DmsIntelligentRegulationSection.vue` | 新增智能监管交错时间线区 |
| `components/product/dms/DmsBusinessValueSection.vue` | 新增业务价值区 |
| `components/product/dms/DmsRegulationProcessSection.vue` | 新增监管流程区 |
| `components/common/ProductFeatureGridSection.vue` | 支持 `#before` slot |
| `tests/dms-content.spec.ts` | 新增 DMS 内容契约测试 |
| `tests/visual.spec.ts` | 新增 DMS 页面视觉契约 |
| `scripts/harness-check.mjs` | 新增 DMS Harness 检查 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 `#before` slot 说明 |
| `doc/engineering/COMPONENT_REFINEMENT_AUDIT.md` | 补充 DMS 组件复用结构 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODMS/DMS.md` | 新增 DMS 产品页面需求文档 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `git pull --ff-only` | 通过，Already up to date |
| `pnpm test` | 通过，7 个文件、30 个测试 |
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test:visual` | 通过，9 个视觉契约测试 |
| `pnpm build` | 通过 |
| `pnpm harness:engineering` | 通过 |
| 浏览器桌面验证 | 通过，`/products/data-element-regulation` 可打开，无横向溢出，无 console warn/error |
| 浏览器移动端验证 | 通过，390px 视口无横向溢出，无 console warn/error |
| 构建产物 CSS 验证 | 通过，`.bg-default` 编译为 `var(--dt-color-bg)`，`.text-default` 编译为 `var(--dt-color-text)` |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `feat(TASK-006.4): implement data element regulation product page` |
| Commit Hash | `9977b05c817d9b442bfd08bab0c9a28381ae2e9a` |

## 完成说明
已按 DMS.md 完成数曜·数据要素监管平台页面实现，页面区块顺序、文案、按钮、占位视觉和 CTA 均按需求文档配置。新增 DMS 业务组件均为 Tailwind-only，未新增 scoped CSS。工作区中任务开始前已有的 `components/product/dgp/DgpHero.vue` 本地修改（补充 Hero 按钮），已按用户要求随本批次一并暂存。
