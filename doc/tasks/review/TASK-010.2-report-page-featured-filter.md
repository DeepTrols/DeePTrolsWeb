# TASK-010.2：报告页推荐与筛选搜索结构
---
* TaskName：调整白皮书&报告页面推荐区与筛选搜索
* TaskDescription：根据验收反馈，在 `/resources/reports` 的 PageHero 下方新增 3 个推荐资源 Section，并在普通资源列表前新增 tab 与搜索控制条，保证页面结构顺序符合需求。
* TaskCreator：Codex
* TaskCreationTime：2026-09-01
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-010.2 |
| Epic | EPIC-010 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. PageHero 下方新增独立推荐 Section，展示 3 个推荐资源。
2. 推荐 Section 下方新增 tab 与搜索控制条，tab 文案与样式按验收反馈实现。
3. 控制条之后再进入普通资源列表 container。
4. tab 与搜索可以联动筛选资源列表。
5. 同步更新内容测试、视觉契约、Harness Engineering 和任务记录。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/PAGE_REQUIREMENTS/SERVICE/REPORT/report.md`
- `doc/tasks/review/TASK-010.1-report-service-page.md`

---
## 实现内容
1. 新增 `ReportFeaturedSection.vue`，在 PageHero 下方渲染 3 个推荐资源卡片。
2. 新增 `ReportFilterBar.vue`，实现“全部、产品规格书、电子书、白皮书、视频、幻灯片、基准测试报告”tab 与搜索输入。
3. 调整 `/resources/reports` 页面顺序为 `ReportHero`、`ReportFeaturedSection`、`ReportFilterBar`、`ReportResourcesSection`。
4. `ReportResourcesSection` 改为接收筛选后的 `items`，并增加空状态“暂无匹配资源”。
5. `data/reports.ts` 增加筛选 tab、资源类型和推荐资源数据。
6. `assets/css/tailwind.css` 增加 `accented` 与 `toned` theme color，承接验收反馈中的 `border-accented` 与 `text-toned` 类。
7. 更新产品需求文档、内容测试、视觉契约与 Harness Engineering，锁定新增结构和交互。

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
| `pages/resources/reports.vue` | 调整页面结构顺序，增加筛选状态与搜索联动。 |
| `components/service/report/ReportFeaturedSection.vue` | 新增 Hero 下方推荐资源 Section。 |
| `components/service/report/ReportFilterBar.vue` | 新增 tab 与搜索控制条。 |
| `components/service/report/ReportResourcesSection.vue` | 改为接收筛选后的资源列表并提供空状态。 |
| `data/reports.ts` | 增加资源类型、筛选 tab 与推荐资源数据。 |
| `assets/css/tailwind.css` | 增加 `accented` / `toned` Tailwind v4 theme color。 |
| `doc/product/PAGE_REQUIREMENTS/SERVICE/REPORT/report.md` | 补充推荐区、筛选条与列表顺序约束。 |
| `tests/report-content.spec.ts` | 增加筛选 tab、资源类型与推荐资源内容测试。 |
| `tests/visual/site/report.contract.ts` | 增加页面顺序、推荐区和筛选条视觉契约。 |
| `scripts/harness/checks/service-report.mjs` | 增加报告页结构顺序、推荐区和筛选条 Harness 检查。 |
| `scripts/harness/sources.mjs` | 注册新增报告页组件源文件。 |
| `scripts/harness/required-files.mjs` | 将新增报告页组件纳入必备文件。 |
| `doc/tasks/review/TASK-010.2-report-page-featured-filter.md` | 新增本任务记录。 |

---
## 验证记录
- `git diff --check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm harness:engineering`
- `pnpm test`
- `pnpm test:visual`
- `pnpm build`
- 浏览器验证：页面顺序为 Hero、推荐区、筛选搜索、普通列表；推荐资源 3 个；tab 7 个；搜索 placeholder 为“搜索”；默认普通列表 6 个；点击“白皮书”后普通列表 1 个；继续搜索 `Token` 后显示“暂无匹配资源”；无横向溢出。

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `feat(TASK-010.2): add report filters and featured resources` |
| Commit Hash |  |

## 完成说明
已完成实现与验证，等待 Review。
