# TASK-010.3：报告页加载更多按钮
---
* TaskName：新增白皮书&报告页面加载更多按钮
* TaskDescription：根据验收反馈，在 `/resources/reports` 普通资源列表末尾新增“加载更多”按钮，结构、样式和链接按反馈片段实现。
* TaskCreator：Codex
* TaskCreationTime：2026-09-01
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-010.3 |
| Epic | EPIC-010 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 在普通资源列表最后新增 `mt-10 flex justify-center` 按钮容器。
2. 按反馈片段实现 `data-slot="base"`、primary 样式、`min-w-32` 与文案“加载更多”。
3. 同步更新需求文档、视觉契约、Harness Engineering 和任务记录。

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
- `doc/tasks/review/TASK-010.2-report-page-featured-filter.md`

---
## 实现内容
1. 在 `ReportResourcesSection.vue` 的普通资源列表末尾新增 `flex justify-center mt-10` 容器。
2. 新增“加载更多”链接，使用 `href="/zh/resources/pages/2"`、`data-slot="base"` 与反馈指定的 primary 按钮类名。
3. 更新 `report.md`，记录加载更多按钮的位置、结构、链接与样式约束。
4. 更新报告页视觉契约与 Harness Engineering，防止按钮位置、链接和类名回退。

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
| `components/service/report/ReportResourcesSection.vue` | 在资源列表末尾新增“加载更多”按钮。 |
| `doc/product/PAGE_REQUIREMENTS/SERVICE/REPORT/report.md` | 补充加载更多按钮约束。 |
| `tests/visual/site/report.contract.ts` | 增加加载更多按钮视觉契约。 |
| `scripts/harness/checks/service-report.mjs` | 增加加载更多按钮 Harness 检查。 |
| `doc/tasks/review/TASK-010.3-report-load-more-button.md` | 新增本任务记录。 |

---
## 验证记录
- `git diff --check`
- `pnpm harness:engineering`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm build`
- 浏览器验证：普通资源列表保持 6 个卡片；“加载更多”按钮位于 grid 之后；外层 class 为 `flex justify-center mt-10`；按钮 `href="/zh/resources/pages/2"`、`data-slot="base"`、文案为“加载更多”；无横向溢出。

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-010.3): add report load more button` |
| Commit Hash |  |

## 完成说明
已完成实现与验证，等待 Review。
