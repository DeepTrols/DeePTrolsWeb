# TASK-014.21：行业案例页面
---
* TaskName：行业案例页面
* TaskDescription：根据 `doc/product/PAGE_REQUIREMENTS/CASE/case.md` 完成行业案例页面（顶级路由 `/cases`），Hero 复用智能制造布局并替换为视频背景 + 70% 黑色遮罩，导航「行业案例」由 `/resources/reports` 改指 `/cases`。
* TaskCreator：Olly
* TaskCreationTime：2026-09-14
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.21 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Claude    |

---
## 任务目标
严格按照 `case.md` 完成行业案例页面，复用现有公共组件与 Tailwind CSS v4 样式体系，不新建样式、不写行内 style，文案逐字来自需求文档。

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
- `doc/product/PAGE_REQUIREMENTS/CASE/case.md`
- `doc/product/PAGE_REQUIREMENTS/SERVICE/REPORT/report.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/manufacturing.md`

---
## 实现内容
1. 新建顶级路由页 `pages/cases.vue`（经用户确认采用 `/cases`，非 `/resources/cases`）；导航「行业案例」由 `/resources/reports` 改指 `/cases`，白皮书&报告路由保留（页脚「白皮书&报告」链接直达），`NAVIGATION.md` 与 report 相关测试/Harness 锁同步更新。
2. 迁移 Hero 视频素材 `conteq_expo_visual_1 (1080p).mp4` 至 `public/images/cases/case-hero.mp4`，页面不直接引用需求目录。
3. 实现 `CaseHero.vue`：复用智能制造 586px Hero 布局（渐变标题 + 描述 + 「免费获取专属方案」白色描边 CTA），背景由图片替换为视频（`<video autoplay muted loop playsinline>`，参照 FDE Hero 既有写法），遮罩由 90° 渐变改为黑色 70% 透明度（`bg-black/70`）；因主标题较长做移动端适配：h1 追加 `max-md:whitespace-normal`，描述块移动端定位 `max-md:top-[250px]`。
4. 实现 section1：复用 `ProductMetricsSection`（product-metrics 组件），四项指标：100+ 服务客户、300+ 落地项目、50%-70% AI赋能业务提效、10+ 覆盖行业。
5. 实现 section2 `CaseFeaturedSection.vue`：复用 reports 推荐资源 section 结构（`flow-root pb-16 lg:pb-32` + 3 列栅格 + `ReportResourceCard`），经用户确认去掉类型 tag 徽标与分类行——`ReportResourceCard` 新增 `hideMeta` prop（`v-if` 条件渲染，reports 页默认展示不受影响）。
6. tab 栏：直接复用 `ReportFilterBar`（同 reports：全部 + 7 个方案分类 + 搜索框），过滤字段为可选 `solutionKey`。
7. 实现 section3 `CaseResourcesSection.vue`：复用 reports 资源列表面板结构（3 列栅格 + hide-meta 卡片 + 「加载更多」白色文字按钮 `text-white`，链接沿用 `/zh/resources/pages/2`），空列表显示「暂无匹配案例」。
8. 数据集中于 `data/cases.ts`；经用户确认案例内容清单后续提供，`caseFeatured`/`caseResources` 暂为空数组占位（「全部」与各分类 tab 显示空态）。
9. 补充内容测试、视觉契约与 Harness Engineering 检查并注册。

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
| `doc/product/PAGE_REQUIREMENTS/CASE/case.md` | 行业案例页需求文档 |
| `doc/product/PAGE_REQUIREMENTS/CASE/conteq_expo_visual_1 (1080p).mp4` | Hero 源视频素材 |
| `public/images/cases/case-hero.mp4` | 运行时 Hero 视频素材 |
| `data/cases.ts` | 行业案例页集中内容数据（资源列表空占位） |
| `pages/cases.vue` | 行业案例顶级路由页（后于 TASK-014.22 迁移为 `pages/cases/index.vue`） |
| `components/case/CaseHero.vue` | 586px 视频背景 Hero（70% 黑色遮罩） |
| `components/case/CaseFeaturedSection.vue` | section2 推荐案例 3 列栅格（hide-meta 卡片） |
| `components/case/CaseResourcesSection.vue` | section3 案例列表面板 + 加载更多 |
| `components/service/report/ReportResourceCard.vue` | 新增 `hideMeta` prop 与结构化 item 类型 |
| `data/navigation.ts` | 「行业案例」href 改为 `/cases` |
| `doc/product/NAVIGATION.md` | 行业案例直链路由说明更新 |
| `tests/case-content.spec.ts` | 行业案例内容契约 |
| `tests/visual/site/case.contract.ts` | 行业案例视觉契约 |
| `tests/visual.spec.ts` | 注册视觉契约 |
| `tests/report-content.spec.ts` | 行业案例导航锁改指 `/cases` |
| `tests/visual/site/report.contract.ts` | navigation 锁同步 `/cases` |
| `scripts/harness/checks/case-page.mjs` | 行业案例 Harness Engineering 检查 |
| `scripts/harness/checks/service-report.mjs` | navigation 锁同步 `/cases` |
| `scripts/harness-check.mjs` | 注册 Harness 检查 |
| `scripts/harness/sources.mjs` | 登记 Harness 源文件 |
| `scripts/harness/required-files.mjs` | 登记必需文件 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | dev |
| Commit Message | feat(TASK-014.21): implement industry cases page |
| Commit Hash    | 待提交后生成 |

## 完成说明
已按 `case.md` 完成行业案例页面（`/cases`）：
- 路由与导航：经用户确认采用顶级路由 `/cases`；导航「行业案例」改指新页，`/resources/reports` 保留可直达；report-content.spec、report.contract、service-report.mjs、NAVIGATION.md 四处旧锁同步更新。
- Hero：与智能制造 Hero 布局 1:1 一致（586px、渐变标题、白色描边 CTA），背景替换为迁移后的 `case-hero.mp4` 视频（autoplay/muted/loop/playsinline，参照 FDE Hero 写法），遮罩为黑色 70% 透明度；两处内容驱动的移动端适配（`max-md:whitespace-normal`、描述块 `max-md:top-[250px]`）。
- section1：复用 product-metrics 组件，四项指标文案逐字来自 case.md。
- section2/section3：复用 reports 页推荐区（`pb-16 lg:pb-32`）与资源面板结构，卡片经 `ReportResourceCard` 新增的 `hideMeta` prop 去掉类型 tag 与分类行；「加载更多」按钮文字为白色（`text-white`）。
- tab 栏：直接复用 `ReportFilterBar`（全部 + 数据设施/知识工程/智能制造/智慧水利/智慧教育/FDE/算电协同 + 搜索），与 reports 页行为一致。
- 数据：经用户确认新建独立 `data/cases.ts`，案例内容清单后续提供，资源列表暂为空数组占位（页面显示空态提示）。
- 页面与组件无 `<style>` 块、无行内 style，纯 Tailwind CSS v4；已补充内容测试、视觉契约与 Harness Engineering 检查并注册。

## Review 修改记录
### 2026-09-14 填充模拟案例内容
- 应用户要求模拟案例数据：`data/cases.ts` 填入 7 条占位案例（每个方案分类 tab 各 1 条：智能制造/数据设施/知识工程/智慧水利/智慧教育/FDE/算电协同），`caseFeatured = caseResources.slice(0, 3)`（与 reports 页 featured 派生方式一致），代码注释标明「模拟样例，待产品提供后整体替换」。
- 图片全部复用 `public/images` 既有素材，不新增资源文件；详情 href 采用 `/cases/<slug>` 占位（详情页不在本任务范围）。
- 同步锁：`tests/case-content.spec.ts`（7 条 + 分类全覆盖断言）、`tests/visual/site/case.contract.ts`、`scripts/harness/checks/case-page.mjs`（空数组锁改为占位数据锁）。

### 2026-09-14 指标条间距收紧 + 「加载更多」白色文字修复
- `ProductMetricsSection` 新增 `spacing?: 'default' | 'compact'` prop（与 `SectionShell` 同名变体对齐：default `pb-32 lg:pb-44`、compact `pb-16 lg:pb-32`）；`pages/cases.vue` 传 `spacing="compact"`，产品页保持默认不受影响。同步锁：`tanyao.contract.ts`、`product-aiiot/tanyao.mjs`（根类锁改为 `product-metrics flow-root bg-white` + 两个变体断言）、`case.contract.ts`、`case-page.mjs`（usage 锁加 `spacing="compact"`）；`COMMON_SECTION_COMPONENTS.md` Product Metrics 章节更新。
- 修复「加载更多」按钮文字非白色：`main.scss` 未分层的 `a { color: inherit }` 覆盖了分层的 `.text-white` utility（与 `dt-button--primary` 既有注释同一冲突）。按既有先例新增未分层规则 `a.load-more-link { color: #ffffff; }`，`CaseResourcesSection` 与 `ReportResourcesSection`（同一克隆按钮、同一 bug）锚点类名前缀加 `load-more-link`。锁：`case.contract.ts` / `case-page.mjs` / `report.contract.ts` / `service-report.mjs` 加 `load-more-link`，`design-system.mjs` token 列表加 `a.load-more-link`；`TASK-010.2` 已同步记录。
