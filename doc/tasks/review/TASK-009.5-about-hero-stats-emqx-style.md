# TASK-009.5：About Hero 统计条 EMQX 样式重构
---
* TaskName：重构 About Hero 统计条为 EMQX About 样式
* TaskDescription：根据验收反馈，将 `500+ / 30+ / 25+` 统计条改为参考 EMQX About 的无卡片、居中栅格样式，并抽离 About 专属组件。
* TaskCreator：Codex
* TaskCreationTime：2026-08-25
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-009.5 |
| Epic | EPIC-009 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 新增 `AboutHeroStats` 组件。
2. 统计条继续位于 About Hero 文案下方。
3. 使用 EMQX About 统计区的无卡片背景、居中栅格、数字字号与说明字号。
4. 移除 About Hero 对 `HeroStatsStrip` 的依赖。
5. 同步产品需求、视觉契约、Harness 源文件和必需文件清单。

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
1. 新增 `components/about/AboutHeroStats.vue`。
2. `AboutHero` 改为在 `#after-actions` 中渲染 `AboutHeroStats`。
3. 更新 About 视觉契约与 Harness。
4. 更新 About 产品需求实现说明。

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
| `components/about/AboutHeroStats.vue` | 新增 About 专属统计条组件，使用 EMQX About 统计区样式。 |
| `components/about/AboutHero.vue` | 将 Hero 文案下方统计条改为 `AboutHeroStats`。 |
| `scripts/harness/sources.mjs` | 注册 `AboutHeroStats` Harness 源文件。 |
| `scripts/harness/required-files.mjs` | 补充 `AboutHeroStats` 必需文件。 |
| `scripts/harness/checks/about-page.mjs` | 更新 About Hero 统计区 Harness 约束。 |
| `tests/visual/site/about.contract.ts` | 更新 About 视觉契约。 |
| `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md` | 同步本次实现说明。 |

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
| 浏览器 DOM 检查 | 通过，统计区在 Hero 文案下方，3 个 item，无背景/边框；数字 36px/700，说明文字 14px，无横向溢出 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-009.5): restyle about hero stats` |
| Commit Hash | 见 Git 记录 |

## 完成说明
已完成 About Hero 统计条 EMQX 样式重构，等待 Review。
