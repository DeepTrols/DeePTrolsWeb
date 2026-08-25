# TASK-009.6：About Hero 统计条 section 宽度修正
---
* TaskName：让 AboutHeroStats 使用 Hero section 宽度
* TaskDescription：根据验收反馈，`AboutHeroStats` 不应被 `page-hero__content max-w-4xl` 限制，而应与 Hero section 宽度一致。
* TaskCreator：Codex
* TaskCreationTime：2026-08-25
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-009.6 |
| Epic | EPIC-009 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. `AboutHeroStats` 继续位于 About Hero 内、标题和描述下方。
2. `AboutHeroStats` 宽度与 Hero section/body 宽度一致。
3. 避免被 `.page-hero__content` 的 `max-w-4xl` 限制。
4. 同步 PageHero 公共 slot 文档、About 需求说明、视觉契约和 Harness。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md`

---
## 实现内容
1. `PageHero` 新增 `#after-content` slot，位于 `.page-hero__inner` 下。
2. `AboutHero` 将统计条从 `#after-actions` 移到 `#after-content`。
3. `AboutHeroStats` 外层包装增加 `w-full`，使用 Hero section 宽度。
4. 更新测试、Harness 和文档。

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
| `components/common/PageHero.vue` | 新增 Hero 内层 section 宽度 `#after-content` slot。 |
| `components/about/AboutHero.vue` | 将 `AboutHeroStats` 移入 `#after-content`，并保持 `w-full`。 |
| `tests/visual/site/about.contract.ts` | 更新 About Hero 视觉契约，约束统计条不能回到 `#after-actions`。 |
| `scripts/harness/checks/about-page.mjs` | 更新 Harness Engineering 检查。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 `PageHero #after-content` 使用约束。 |
| `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md` | 记录 About Hero 统计条 section 宽度实现说明。 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-009.6): expand about hero stats width` |
| Commit Hash |  |

---
## 验证记录
- `git diff --check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm harness:engineering`
- `pnpm build`
- `curl -I http://127.0.0.1:3103/about_us` 返回 `HTTP/1.1 200 OK`
- 浏览器实测：`.about-hero-stats` 宽度 `1233px`，等于 `.page-hero__inner` 宽度；`.page-hero__content` 宽度 `896px`；统计条不在文案容器内；无横向溢出。

## 完成说明
已完成实现与验证，等待 Review。
