# TASK-002.8：PageHero 背景作用域修正
---
* TaskName：调整 PageHero 的 `bg-dt-bg` 挂载位置
* TaskDescription：根据页面验收反馈，将 `bg-dt-bg` 从 `PageHero` 外层 section 移到 `.page-hero__body`，外层不再承载背景或边框。
* TaskCreator：Codex
* TaskCreationTime：2026-08-24
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-002.8 |
| Epic | EPIC-002 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. `PageHero` 外层 section 去掉 `bg-dt-bg`。
2. 将 `bg-dt-bg` 放到 `.page-hero__body` 上。
3. 同步 Why 页面视觉契约、Harness 与公共组件文档。

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
1. 调整 `components/common/PageHero.vue` 的背景类位置。
2. 更新 `tests/visual/site/why.contract.ts`。
3. 更新 `scripts/harness/checks/why-page.mjs`。
4. 更新 `doc/engineering/COMMON_SECTION_COMPONENTS.md`。

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
| `components/common/PageHero.vue` | 外层 section 移除 `bg-dt-bg`，`.page-hero__body` 增加 `bg-dt-bg`。 |
| `tests/visual/site/why.contract.ts` | 更新 PageHero 背景类位置视觉契约。 |
| `scripts/harness/checks/why-page.mjs` | 更新 Why 页面 Harness 约束。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 记录 PageHero 外层不承载背景或边框的约束。 |

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
| 浏览器 DOM 检查 | 通过，外层 `.page-hero` 无 `bg-dt-bg` 且边框为 0，`.page-hero__body` 带 `bg-dt-bg`，无横向溢出和控制台错误 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-002.8): scope page hero background` |
| Commit Hash | 见 Git 记录 |

## 完成说明
已完成 PageHero 背景作用域修正，等待 Review。
