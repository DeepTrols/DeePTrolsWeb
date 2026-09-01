# TASK-011.1：解决方案页面模板
---
* TaskName：设计并实现可复用解决方案页面模板
* TaskDescription：基于现有公共组件和 HOME 基准样式，沉淀可复用的解决方案页面模板，为后续应用场景、行业、技术方向与 FDE 页面提供统一骨架。
* TaskCreator：Codex
* TaskCreationTime：2026-09-01
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-011.1 |
| Epic | EPIC-011 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 梳理现有公共组件，避免为解决方案页重新发明样式。
2. 定义解决方案页面模板的数据结构与插槽扩展边界。
3. 新增可复用模板组件，复用 Header、Footer、PageHero、Feature Grid、Timeline、Architecture、Showcase、Engine Links 与 CTA 等现有能力。
4. 输出模板使用文档，约束后续解决方案页面的结构、样式和允许扩展点。
5. 同步 Harness Engineering 与测试，防止模板偏离现有公共组件体系。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/NAVIGATION.md`
- `doc/product/SITE_MAP.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`

---
## 实现内容
1. 新增 `SolutionPageTemplate.vue`，统一装配解决方案类页面的 Header、Hero、统计条、价值卡片、落地路径、架构区、能力卡片、服务展示、相关资源与 CTA。
2. 新增 `SolutionPageTemplateContent` 类型，约束 SEO、Hero、Stats、Feature Grid、Timeline、Architecture、Showcase、Related Links、CTA 等数据结构。
3. 模板不新增 `<style>`，只透传到现有公共组件与 Tailwind CSS v4 / `dt-*` 公共样式。
4. 支持 `hero-visual`、`architecture-visual` 等有限 slot，允许页面注入专属视觉但不重写公共按钮、卡片、标题和 CTA。
5. 新增 `doc/engineering/SOLUTION_PAGE_TEMPLATE.md`，并同步 `COMMON_SECTION_COMPONENTS.md`，形成后续解决方案页面开发约束。
6. 同步 Harness Engineering 与视觉契约测试，防止模板结构、slot、公共组件复用和样式边界回退。
7. 将 `HeroStatsStrip` 的 hero 背景类改为 `bg-dt-bg-soft/50`，减少 Tailwind v4 任意变量透明度写法带来的构建警告风险。

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
| `components/solution/SolutionPageTemplate.vue` | 新增解决方案页面模板，复用现有公共组件和样式体系。 |
| `types/solution-template.ts` | 新增解决方案页面模板数据类型。 |
| `doc/engineering/SOLUTION_PAGE_TEMPLATE.md` | 新增模板使用规范、默认结构、数据契约与 slot 边界。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 注册解决方案页面模板作为公共页面区块。 |
| `scripts/harness/sources.mjs` | 将模板、类型与文档纳入 Harness source map。 |
| `scripts/harness/required-files.mjs` | 将模板相关文件纳入必需文件清单。 |
| `scripts/harness-check.mjs` | 接入解决方案模板 Harness 检查。 |
| `scripts/harness/checks/solution-template.mjs` | 新增模板结构、slot、样式边界与类型契约检查。 |
| `tests/visual.spec.ts` | 注册解决方案模板视觉契约测试。 |
| `tests/visual/site/solution-template.contract.ts` | 新增模板公共组件复用与样式边界测试。 |
| `components/common/HeroStatsStrip.vue` | 将 hero 统计条背景类统一为 `bg-dt-bg-soft/50`。 |
| `tests/visual/product-aiiot/tanyao.contract.ts` | 同步 HeroStatsStrip 背景类契约。 |

---
## 验证记录
- `git diff --check`
- `pnpm harness:engineering`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm build`
- `pnpm dev --host 127.0.0.1 --port 3104`
- 本地烟测：`http://127.0.0.1:3104/` 返回 `200 OK`，验证后已停止临时 dev server。
- 浏览器验证：本任务只新增可复用模板组件，不新增独立解决方案路由；响应式能力由模板复用的 `PageHero`、`SectionShell`、`ProductFeatureGridSection`、`AlternatingTimelineSection`、`ProductArchitectureSection`、`ServiceShowcaseSection`、`EngineLinksSection` 与 `CtaSection` 既有响应式契约承载。

## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `feat(TASK-011.1): add solution page template` |
| Commit Hash |  |

## 完成说明
已完成解决方案页面模板、类型定义、工程文档、Harness Engineering 与测试契约，等待 Review。
