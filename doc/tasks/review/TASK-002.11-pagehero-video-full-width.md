# TASK-002.11：PageHero 视频背景全屏宽度修复
---
* TaskName：修复 PageHero 视频背景被 container 限宽
* TaskDescription：根据验收反馈，About Hero 背景视频应铺满屏幕宽度，而不是被 `.container.page-hero__body` 限制为内容宽度。
* TaskCreator：Codex
* TaskCreationTime：2026-08-25
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-002.11 |
| Epic | EPIC-002 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 保持 `.page-hero__background` 与 `.page-hero__body-bg`、`.page-hero__inner` 平级。
2. 让 `.page-hero__background` 宽度为 `100vw`。
3. 使用居中位移避免背景被 container 限制。
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
1. `.page-hero__background` 改为 `inset: 0 auto 0 50%`。
2. `.page-hero__background` 增加 `width: 100vw` 与 `transform: translateX(-50%)`。
3. 同步 Why 页面视觉契约、Harness 与公共组件说明。

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
| `components/common/PageHero.vue` | `.page-hero__background` 改为 `100vw` 全屏宽度并居中。 |
| `tests/visual/site/why.contract.ts` | 增加背景层全屏宽度契约。 |
| `scripts/harness/checks/why-page.mjs` | 增加背景层全屏宽度 Harness 约束。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 记录 PageHero 背景层必须铺满屏幕宽度。 |

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
| 浏览器宽度检查 | 通过，viewport 为 1280px，`.page-hero__background` 与 video 均为 1280px，无横向溢出和控制台错误 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-002.11): expand page hero video to viewport width` |
| Commit Hash | 见 Git 记录 |

## 完成说明
已完成 PageHero 视频背景全屏宽度修复，等待 Review。
