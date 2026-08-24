# TASK-009.4：About 统计条移入 Hero
---
* TaskName：将 About 统计条从独立 section 移入 Hero 文案下方
* TaskDescription：根据验收反馈，`500+ / 30+ / 25+` 三组统计数据必须位于“关于深度数智（DEEPTROLS）”标题与描述下方，不能作为独立 section 渲染。
* TaskCreator：Codex
* TaskCreationTime：2026-08-24
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-009.4 |
| Epic | EPIC-009 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 从 `about_us` 页面移除独立 `AboutStatsSection`。
2. 将 `HeroStatsStrip` 放入 `AboutHero` 的 `#after-actions` slot。
3. 删除不再使用的 `components/about/AboutStatsSection.vue`。
4. 同步 About 产品需求、视觉契约、Harness 源文件和必需文件清单。

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
1. `AboutHero` 引入 `HeroStatsStrip` 和 `aboutStats`。
2. `pages/about_us.vue` 移除 `AboutStatsSection` 引用与调用。
3. 删除 `AboutStatsSection.vue`。
4. 更新测试、Harness 与产品需求文档。

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
| `components/about/AboutHero.vue` | 将 `HeroStatsStrip` 放入 Hero 的 `#after-actions` slot。 |
| `components/about/AboutStatsSection.vue` | 删除独立统计 section。 |
| `pages/about_us.vue` | 移除 `AboutStatsSection` 引用与调用。 |
| `scripts/harness/sources.mjs` | 移除 `AboutStatsSection` Harness 源文件。 |
| `scripts/harness/required-files.mjs` | 移除 `AboutStatsSection` 必需文件。 |
| `scripts/harness/checks/about-page.mjs` | 更新 About 页面结构约束。 |
| `tests/visual/site/about.contract.ts` | 更新 About 视觉契约。 |
| `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md` | 同步统计条位于 Hero 内的实现说明。 |
| `doc/tasks/review/TASK-009.1-about-us-page.md` | 标注原独立统计 section 已被 TASK-009.4 替代。 |

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
| 浏览器 DOM 检查 | 通过，统计条位于 Hero 内容区与描述下方，`main` 直接子节点不再包含独立统计 section，无横向溢出和控制台错误 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-009.4): move about stats into hero` |
| Commit Hash | 见 Git 记录 |

## 完成说明
已完成 About 统计条结构修正，等待 Review。
