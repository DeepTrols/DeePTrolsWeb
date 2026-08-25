# TASK-009.7：About Hero 视频背景底部融合
---
* TaskName：修复 About Hero 视频背景与页面背景色差
* TaskDescription：根据验收反馈，About Hero 视频背景底部仍与页面 `#151515` 背景存在色差，需要通过渐变和遮罩让视频底部自然贴合页面背景。
* TaskCreator：Codex
* TaskCreationTime：2026-08-25
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-009.7 |
| Epic | EPIC-009 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. About Hero 视频背景底部逐渐接近页面背景色 `#151515`。
2. 避免只依赖透明度造成的亮色视频色差带。
3. 保持 `PageHero` 公共能力可复用，并避免组件超过 300 行。
4. 同步视觉契约、Harness 和工程文档。

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
1. 将 `PageHero` 公共视觉样式从 `components/common/PageHero.vue` 迁移到 `assets/scss/components/_page-hero.scss`。
2. `assets/scss/main.scss` 引入 PageHero SCSS 模块。
3. `.page-hero__background` 改为以 `var(--dt-color-bg)` 为底色，取消父层整体透明 mask，避免底部融合区出现亮色视频残留。
4. `.page-hero__background-video` 增加 `mask-image`，让视频自身在底部渐隐。
5. `.page-hero__background::after` 增加以 `var(--dt-color-bg)` 收尾的底部压色渐变，确保底部与页面背景一致。
6. 更新 About / Why 视觉契约和 Harness 源文件，让 PageHero 样式迁移后仍被工程检查覆盖。

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
| `components/common/PageHero.vue` | 移除内联组件样式，仅保留结构与 props。 |
| `assets/scss/components/_page-hero.scss` | 新增 PageHero 公共 SCSS，并实现视频底部融合遮罩。 |
| `assets/scss/main.scss` | 引入 PageHero SCSS 模块。 |
| `tests/visual/site/about.contract.ts` | 更新 About 视觉契约，校验背景融合样式。 |
| `tests/visual/site/why.contract.ts` | 将 PageHero 样式断言迁移到公共 SCSS。 |
| `scripts/harness/checks/about-page.mjs` | 新增 PageHero 视频遮罩与底部压色 Harness 检查。 |
| `scripts/harness/checks/why-page.mjs` | 将 PageHero 样式断言迁移到公共 SCSS。 |
| `scripts/harness/sources.mjs` | 注册 `pageHeroStyles` 源文件。 |
| `scripts/harness/required-files.mjs` | 将 PageHero SCSS 纳入必备文件。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 PageHero 样式边界与视频融合约束。 |
| `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md` | 记录 About Hero 视频背景融合实现说明。 |

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
- 浏览器计算样式验证：页面背景和 `.page-hero__background` 均为 `rgb(21, 21, 21)`；`.page-hero__background::after` 渐变最终为 `rgb(21, 21, 21) 100%`；视频存在 `mask-image`；无横向溢出。

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-009.7): blend about hero video background` |
| Commit Hash |  |

## 完成说明
已完成实现与验证，等待 Review。
