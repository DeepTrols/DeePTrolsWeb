# TASK-002.9：PageHero body 背景层结构修正
---
* TaskName：将 PageHero 的 `bg-dt-bg` 改为 inner 平级背景层
* TaskDescription：根据验收反馈，将 `bg-dt-bg` 从 `.page-hero__body` class 移到 body 内部独立背景层，使背景层与 `.page-hero__inner` 平级并位于内容下方。
* TaskCreator：Codex
* TaskCreationTime：2026-08-24
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-002.9 |
| Epic | EPIC-002 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. `bg-dt-bg` 不挂在 `PageHero` 外层 section。
2. `bg-dt-bg` 不直接挂在 `.page-hero__body`。
3. 新增 `.page-hero__body-bg` 背景层，与 `.page-hero__inner` 平级。
4. 更新公共组件文档、视觉契约和 Harness。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`

---
## 实现内容
1. `PageHero` body 改为 `relative isolate`。
2. 新增 `page-hero__body-bg absolute inset-0 z-0 bg-dt-bg`。
3. `page-hero__inner` 改为 `relative z-10`，确保内容位于背景层上方。
4. 同步 Why 页面视觉契约、Harness 和公共组件说明。

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
| `components/common/PageHero.vue` | 新增 `.page-hero__body-bg` 背景层，并让它与 `.page-hero__inner` 平级。 |
| `tests/visual/site/why.contract.ts` | 更新 PageHero 层级视觉契约。 |
| `scripts/harness/checks/why-page.mjs` | 更新 Why 页面 Harness 约束。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 更新 PageHero 背景层约束说明。 |

---
## 验证记录
| 命令 / 检查 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，11 个测试文件 / 88 个测试 |
| `pnpm test:visual` | 通过，35 个视觉契约测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| `/about_us` HTTP 检查 | 通过，返回 200 |
| `/why-deeptrols` HTTP 检查 | 通过，返回 200 |
| 浏览器 DOM 检查 | 通过，`.page-hero__body-bg` 与 `.page-hero__inner` 平级；`bg-dt-bg` 只在背景层上；外层 section 与 body 均不带 `bg-dt-bg`；无横向溢出 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-002.9): place page hero background as body layer` |
| Commit Hash | 见 Git 记录 |

## 完成说明
已完成 PageHero body 背景层结构修正，等待 Review。
