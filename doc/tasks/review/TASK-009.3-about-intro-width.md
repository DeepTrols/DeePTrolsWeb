# TASK-009.3：About 公司介绍宽度修正
---
* TaskName：统一 About 公司介绍标题与正文宽度
* TaskDescription：修正 `/about_us` 页面公司介绍 card 中标题与正文宽度不一致的问题。
* TaskCreator：Codex
* TaskCreationTime：2026-08-24
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-009.3 |
| Epic | EPIC-009 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 公司介绍正文宽度与“公司介绍”标题宽度保持一致。
2. 不影响其他使用 `AboutTextBlock` 的区块。
3. 更新测试与 Harness 约束。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md`

---
## 实现内容
1. 为 `AboutTextBlock` 增加 `full` 尺寸。
2. `AboutIntroSection` 使用 `size="full"`。
3. 同步 About 视觉契约与 Harness。

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
| `components/about/AboutTextBlock.vue` | 增加 `full` 尺寸，使正文可占满父容器内容宽度。 |
| `components/about/AboutIntroSection.vue` | 公司介绍正文改用 `size="full"`。 |
| `tests/visual/site/about.contract.ts` | 补充公司介绍宽度契约。 |
| `scripts/harness/checks/about-page.mjs` | 补充公司介绍宽度 Harness 约束。 |
| `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md` | 同步实现说明。 |

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
| 浏览器宽度检查 | 通过，标题与正文宽度均为 1151px，差值 0px，控制台无错误 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-009.3): align about intro text width` |
| Commit Hash | 见 Git 记录 |

## 完成说明
已完成公司介绍标题与正文宽度统一，等待 Review。
