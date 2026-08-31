# TASK-010.1：服务白皮书&报告页面
---
* TaskName：实现服务-白皮书&报告页面
* TaskDescription：根据 `doc/product/PAGE_REQUIREMENTS/SERVICE/REPORT/report.md`，实现服务栏目下的白皮书&报告页面，复用公共 Header、Footer、PageHero 和资源卡片样式。
* TaskCreator：Codex
* TaskCreationTime：2026-08-31
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-010.1 |
| Epic | EPIC-010 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 新增服务白皮书&报告页面路由。
2. 页面使用公共 Header 与 Footer。
3. Hero 使用公共 `PageHero` 居中展示。
4. 标题为“白皮书&报告”，副标题为“全球最新的AI相关白皮书&报告，深入了解人工智能的世界。”。
5. 资源卡片区参考 `report.md` 中 EMQX Resources 的三列卡片布局、图片比例、徽标、圆角与 hover 放大节奏。
6. 同步测试、Harness Engineering 与任务记录。

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
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/SITE_MAP.md`
- `doc/product/PAGE_REQUIREMENTS/SERVICE/REPORT/report.md`

---
## 实现内容
1. 新增 `/resources/reports` 页面，复用 `SiteHeader`、`SiteFooter`、`ReportHero` 与 `ReportResourcesSection`。
2. 新增 `data/reports.ts`，集中维护 Hero 文案和 6 个白皮书/报告资源卡片数据。
3. 新增 `ReportHero.vue`，以居中 `PageHero` 对齐参考资源页的 Hero 间距与标题、副标题字号。
4. 新增 `ReportResourceCard.vue` 与 `ReportResourcesSection.vue`，实现 3 列资源卡片、400:180 图片比例、类型徽标、圆角与 hover 放大。
5. 新增内容测试、视觉契约与 Harness Engineering 检查，锁定路由、文案、卡片结构、运行时资产边界和导航/页脚入口。
6. 更新 `report.md`，明确本页面采用 `/resources/reports` 路由，并记录资源卡片和资产使用约束。

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
| `pages/resources/reports.vue` | 新增服务白皮书&报告页面路由。 |
| `components/service/report/ReportHero.vue` | 新增页面 Hero，复用居中 `PageHero`。 |
| `components/service/report/ReportResourcesSection.vue` | 新增资源列表 Section。 |
| `components/service/report/ReportResourceCard.vue` | 新增资源卡片组件。 |
| `data/reports.ts` | 新增白皮书&报告页面数据源。 |
| `tests/report-content.spec.ts` | 新增内容与运行时资产测试。 |
| `tests/visual/site/report.contract.ts` | 新增报告页视觉契约。 |
| `tests/visual.spec.ts` | 注册报告页视觉契约。 |
| `scripts/harness/checks/service-report.mjs` | 新增服务报告页 Harness 检查。 |
| `scripts/harness-check.mjs` | 注册服务报告页 Harness 检查。 |
| `scripts/harness/sources.mjs` | 注册报告页 Harness 源文件。 |
| `scripts/harness/required-files.mjs` | 将报告页相关文件纳入必备文件。 |
| `doc/product/PAGE_REQUIREMENTS/SERVICE/REPORT/report.md` | 补充实现说明与资产约束。 |

---
## 验证记录
- `git diff --check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm harness:engineering`
- `pnpm test`
- `pnpm test:visual`
- `pnpm build`
- `curl -I http://127.0.0.1:3103/resources/reports` 返回 `HTTP/1.1 200 OK`
- 浏览器验证：标题为“白皮书&报告”，副标题符合需求；资源卡片 6 个；桌面栅格 3 列；首图比例约 `2.22`；页面背景为 `rgb(21, 21, 21)`；无横向溢出。

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `feat(TASK-010.1): add report service page` |
| Commit Hash |  |

## 完成说明
已完成实现与验证，等待 Review。
