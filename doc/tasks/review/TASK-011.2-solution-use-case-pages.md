# TASK-011.2：解决方案应用场景页面
---
* TaskName：生成解决方案应用场景页面
* TaskDescription：基于 `SolutionPageTemplate` 和现有公共组件，生成解决方案 Mega Menu 中“应用场景”分类下的全部页面。
* TaskCreator：Codex
* TaskCreationTime：2026-09-01
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-011.2 |
| Epic | EPIC-011 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 按 `NAVIGATION.md` 和 `SITE_MAP.md` 生成 8 个应用场景页面：智能制造、智慧环保、智慧水利、智慧能源、数据治理、企业AI应用、智慧城市、智慧医疗。
2. 页面必须使用现有 `SolutionPageTemplate` 和公共组件，不新增私有卡片、按钮、标题、CTA 样式。
3. 使用数据驱动方式生成页面，避免 8 个路由重复写页面结构。
4. 补充测试与 Harness Engineering，确保路由、导航、内容结构和模板复用不回退。
5. 完成质量门、启动烟测、Git commit 和 push。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/engineering/SOLUTION_PAGE_TEMPLATE.md`
- `doc/product/NAVIGATION.md`
- `doc/product/SITE_MAP.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`

---
## 实现内容
1. 新增 `data/solutions/use-cases.ts`，集中维护 8 个“应用场景”页面的数据、路由、Hero 视觉配置与模板内容。
2. 新增 `pages/solutions/[slug].vue`，使用动态路由生成 `/solutions/manufacturing`、`/solutions/environment`、`/solutions/water`、`/solutions/energy`、`/solutions/data-governance`、`/solutions/enterprise-ai`、`/solutions/city`、`/solutions/healthcare`。
3. 新增 `SolutionScenarioVisual.vue`，通过 `HeroVisualShell` 与 `IconBox` 组合首屏右侧视觉，不新增私有 SCSS。
4. 全部页面复用 `SolutionPageTemplate`，默认包含 Hero、Stats、核心价值、落地路径、方案架构、核心能力、服务交付、相关产品与资源、CTA。
5. 新增 `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/USE_CASES.md`，记录应用场景页面清单、结构、数据源与实现约束。
6. 修正 Footer 中“智慧城市”入口，从 `/solutions/smart-city` 对齐为 `/solutions/city`。
7. 新增内容测试、视觉契约与 Harness Engineering 检查，确保 8 个页面、导航入口、Footer 入口和模板复用不回退。

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
| `data/solutions/use-cases.ts` | 新增应用场景页面数据源与路由清单。 |
| `pages/solutions/[slug].vue` | 新增解决方案应用场景动态路由。 |
| `components/solution/SolutionScenarioVisual.vue` | 新增复用公共视觉 primitives 的场景 Hero 视觉。 |
| `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/USE_CASES.md` | 新增应用场景页面需求落地文档。 |
| `doc/engineering/SOLUTION_PAGE_TEMPLATE.md` | 补充当前应用场景页面实现引用。 |
| `data/footer.ts` | 修正智慧城市链接为 `/solutions/city`。 |
| `tests/solution-use-cases.spec.ts` | 新增应用场景内容、导航和 Footer 契约测试。 |
| `tests/visual/site/solutions/use-cases.contract.ts` | 新增应用场景视觉与模板复用契约。 |
| `tests/visual.spec.ts` | 注册应用场景视觉契约。 |
| `scripts/harness/checks/solution-use-cases.mjs` | 新增应用场景 Harness 检查。 |
| `scripts/harness-check.mjs` | 接入应用场景 Harness 检查。 |
| `scripts/harness/sources.mjs` | 将应用场景数据、页面、视觉组件和需求文档纳入 Harness source map。 |
| `scripts/harness/required-files.mjs` | 将应用场景相关文件纳入 Harness 必需文件清单。 |

---
## 验证记录
- `git pull --ff-only`
- `git diff --check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm harness:engineering`
- `pnpm test`
- `pnpm test:visual`
- `pnpm build`
- `pnpm dev --host 127.0.0.1 --port 3104`
- 本地烟测：8 个应用场景路由均返回 `200 OK`，并渲染 `solution-page-template` 与“咨询合作”CTA：
  - `/solutions/manufacturing`
  - `/solutions/environment`
  - `/solutions/water`
  - `/solutions/energy`
  - `/solutions/data-governance`
  - `/solutions/enterprise-ai`
  - `/solutions/city`
  - `/solutions/healthcare`

## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `feat(TASK-011.2): add solution use case pages` |
| Commit Hash |  |

## 完成说明
已完成 8 个解决方案应用场景页面的动态生成、公共模板复用、文档、测试、Harness 与本地烟测，等待 Review。
