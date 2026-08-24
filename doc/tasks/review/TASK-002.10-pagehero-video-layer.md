# TASK-002.10：PageHero 视频背景遮挡修复
---
* TaskName：修复 PageHero 视频背景被 `bg-dt-bg` 遮挡
* TaskDescription：上一轮将 `bg-dt-bg` 放入 `.page-hero__body-bg` 后，实色背景层遮挡了视频背景。本任务调整 PageHero 层级，让视频/网格/glow 背景层位于 `body-bg` 之上、内容层之下。
* TaskCreator：Codex
* TaskCreationTime：2026-08-24
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-002.10 |
| Epic | EPIC-002 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 保持 `.page-hero__body-bg` 与 `.page-hero__inner` 平级。
2. 将视频/网格/glow 背景层移动到 `.page-hero__body` 内。
3. 背景层层级高于 `body-bg`，低于内容层。
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
1. `PageHero` 将 `.page-hero__background` 移到 `.page-hero__body` 内部。
2. `.page-hero__background` 层级从 `z-index: -1` 改为 `z-index: 1`。
3. `.page-hero__inner` 保持 `z-10`，确保文案层级最高。
4. 同步 Why 页面视觉契约、Harness 与公共组件说明。

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
| `components/common/PageHero.vue` | 将 `.page-hero__background` 移入 `.page-hero__body`，层级调整为 `z-index: 1`。 |
| `tests/visual/site/why.contract.ts` | 增加视频背景层级契约。 |
| `scripts/harness/checks/why-page.mjs` | 增加视频背景层级 Harness 约束。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 更新 PageHero 三层背景结构说明。 |

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
| 浏览器 DOM 检查 | 通过，`.page-hero__body-bg` 为 `z=0`，视频背景层为 `z=1`，`.page-hero__inner` 为 `z=10`，视频 src 正常，无横向溢出和控制台错误 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-002.10): keep page hero video above base background` |
| Commit Hash | 见 Git 记录 |

## 完成说明
已完成 PageHero 视频背景遮挡修复，等待 Review。
