# TASK-002.4：Why 页面 Logo Strip 与 CTA 修复
---
* TaskName：Why 页面 Logo Strip 与 CTA 修复
* TaskDescription：修复 Why DeepTrols 页面中 HeroLogoStrip 抽离后的宽度与上下间距偏差，并在 Footer 前新增公共 CtaSection。
* TaskCreator：Codex
* TaskCreationTime：2026-07-31
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-002.4 |
| Epic | EPIC-002 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 修复 `WhyHeroLogos` / `HeroLogoStrip` 的宽度，恢复与页面 `.container` 一致。
2. 修复 `HeroLogoStrip` 与 Hero、Trust 区块之间的上下间距。
3. 在 Why DeepTrols 页面 Footer 前新增 `CtaSection`。
4. 更新测试与 Harness，防止该布局再次偏移。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/WhyDeepTrols.md`

---
## 实现内容
1. 为 `PageHero` 增加 `flushBottom` 配置，让 Why 页面 Hero 可去掉底部 padding，避免与抽离后的 Logo Strip 产生双倍间距。
2. 将 `HeroLogoStrip` 恢复为自带 `.container` 的公共区块，内层保留 `mt-24 border-t border-dt-line pt-12 lg:mt-28` 的原始节奏。
3. 为 `HeroLogoStrip` 增加底部区块间距，恢复 Logo Strip 到 Trust 区域之间的留白。
4. 在 Why DeepTrols 页面 Footer 前新增公共 `CtaSection`，复用 `BaseButton` 的按钮样式与 hover。
5. 更新 Visual Test 与 Harness Engineering，锁定 Why 页面 section 组成、Logo Strip 宽度节奏、CTA 存在性。
6. 更新公共组件约束文档，明确 `HeroLogoStrip` 自带 container，跟随 `PageHero` 使用时需要启用 `flushBottom`。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 文档已更新
- [x] Harness Engineering 检查通过
- [x] Why Hero logo strip 宽度与页面 container 一致
- [x] Why 页 Footer 前存在 `CtaSection`

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/PageHero.vue` | 新增 `flushBottom`，支持 Hero 底部间距按页面场景控制。 |
| `components/common/HeroLogoStrip.vue` | 恢复公共 logo strip 的 container 宽度与上下间距。 |
| `components/why/WhyHero.vue` | 启用 `flush-bottom`，避免 Hero 与 logo strip 双倍间距。 |
| `pages/why-deeptrols.vue` | 在 Footer 前新增 `CtaSection` 与 CTA action 数据。 |
| `tests/visual.spec.ts` | 增加 Why logo strip 与 CTA 的静态结构验证。 |
| `scripts/harness-check.mjs` | 增加任务文档与 Why 页面布局约束。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 `HeroLogoStrip` 复用规范。 |
| `doc/tasks/review/TASK-002.4-why-logo-strip-cta-fix.md` | 记录任务验收、测试与交付结果。 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过 |
| `pnpm test:visual` | 通过 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| `git diff --check` | 通过 |
| Browser：`http://127.0.0.1:3199/why-deeptrols` | 通过；Logo Strip 内层与 container 内容边界一致，CTA 位于 Footer 前，无 console error。 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `fix(TASK-002.4): restore why logo strip rhythm` |
| Commit Hash | 提交后回填 |

## 完成说明
已修复 Why DeepTrols 页面 Hero Logo Strip 抽离后的宽度和区块间距问题，并在 Footer 前增加复用型 CTA 区块。相关约束已进入 Visual Test 与 Harness Engineering，防止后续公共组件复用时再次偏移。
