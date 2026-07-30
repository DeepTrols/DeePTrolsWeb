# TASK-005.1：Why DeepTrols 页面实现
---
* TaskName：Why DeepTrols 页面实现
* TaskDescription：基于 `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/WhyDeepTrols.md` 与 HOME 基准，完成 `/why-deeptrols` 页面。
* TaskCreator：Codex
* TaskCreationTime：2026-07-30
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-005.1 |
| Epic | EPIC-005 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/WhyDeepTrols.md`
- `doc/product/NAVIGATION.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/SITE_MAP.md`

---
## 任务目标
1. 新增 `/why-deeptrols` 路由页面，复用公共 Header 与 Footer。
2. 按需求实现 Banner、客户 Logo、为什么值得信赖 Tabs、重塑服务、重塑引擎。
3. 使用 HOME 页面视觉基准、公共按钮、公共标题、公共 Tab 与公共卡片样式。
4. 接入需求指定素材：`Agentic solution V1.gif` 与 `fangangaishu@2x.png`。
5. 增加内容与视觉契约测试。

---
## 实现内容
1. 新增 `data/why.ts`，集中维护 Why 页面 Tabs、重塑服务与重塑引擎内容。
2. 新增 `/why-deeptrols` 路由页面，复用公共 `SiteHeader` 与 `SiteFooter`。
3. 新增 `components/why/WhyHero.vue`，按需求实现 EMQX why 页面风格的深色网格 Banner、主标题、CTA 与指定 GIF 视觉素材。
4. 新增 `components/why/WhyTrustTabs.vue`，实现“为什么DeepTrols值得信赖”四组 Tab，复用 `SectionHeading`、`.dt-tab-list`、`.dt-tab`、`.dt-product-card` 与 `.dt-icon-box`。
5. 新增 `components/why/WhyServiceReset.vue`，实现“业务价值可衡量，AI成果可持续”与需求指定 `fangangaishu@2x.png` 图片展示。
6. 新增 `components/why/WhyEngine.vue`，实现“重塑引擎”说明和左侧两张 EMQX 风格资源入口卡片。
7. 新增 `tests/why-content.spec.ts`，覆盖 Why 页面导航、Tabs、内容与素材契约。
8. 更新 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs`，将 Why 页面纳入公共视觉与 Harness Engineering 约束。
9. 将 `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/WhyDeepTrols.md` 和 `imgs/` 需求素材纳入版本控制。
10. 根据 Review 反馈调整 Banner 右侧 GIF：去掉外层线框、背景卡片与重阴影，使用光晕、边缘 mask 与 `mix-blend-mode: screen` 让素材融入 Banner 背景。
11. 根据 Review 反馈继续放大 Banner 右侧 GIF 至 `760px` 视觉宽度，并增加上下左右四向渐变遮罩，让素材边缘逐渐接近 Banner 背景色。
12. 根据 Review 反馈修正 `why-hero__content` 层级：使用 EMQX why Hero 同款 badge、H1 双行 block、描述块和 CTA actions 结构，`为什么选择 DeepTrols` 作为 badge，H1 使用 `数据、知识、智能统一` 与渐变 `企业级AI应用服务商`。
13. 根据 Review 反馈移除 Why Hero 底部 padding，并将 `why-trust` 区域调整为 EMQX why 页面节奏：`pb-32/lg:pb-44`、标题区 `mb-12/lg:mb-16`、Tab 下 2x2 卡片、每个 Tab 4 张卡片、卡片 `p-7/lg:p-8` 与 48px icon。

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `git pull --ff-only` | 通过，Already up to date |
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，13 tests |
| `pnpm test:visual` | 通过，5 tests |
| `pnpm build` | 通过；仅有 Nuxt/Rolldown plugin timing 性能提示 |
| `pnpm harness:engineering` | 通过 |
| Review fix: Banner GIF 融合 | 通过，已移除外层线框并补充视觉契约 |
| Review fix: Banner GIF 四向遮罩与尺寸 | 通过，已放大 GIF 并增加上下左右渐变遮罩 |
| Review fix: Hero 内容层级 | 通过，已补齐 badge、H1 block、描述块、actions 结构与 EMQX 4xl/5xl/6xl 字号节奏 |
| Review fix: Hero padding 与 Trust 卡片布局 | 通过，Hero 底部 padding 已清零，Trust 区已改为 EMQX 2x2 卡片节奏 |

## SSR 验证
- 使用生产构建 `HOST=127.0.0.1 PORT=3700 node .output/server/index.mjs` 启动预览。
- `/why-deeptrols` SSR HTML 命中 `为什么选择`、`数据、知识、智能统一`、`立即咨询`、`为什么DeepTrols值得信赖`、四个 Tab、`业务价值可衡量，AI成果可持续`、`重塑引擎`、`DeepTrolsOPS企业AI引擎`、`FDE企业AI服务指南`、`site-header`、`site-footer`、`Agentic solution V1` 与 `fangangaishu`。
- 使用生产构建 `HOST=127.0.0.1 PORT=3701 node .output/server/index.mjs` 复验 Hero 内容层级，SSR HTML 中 `为什么选择 DeepTrols`、`数据、知识、智能统一`、`企业级AI应用服务商`、描述和 CTA 均命中，且核心文案顺序正确。
- 使用生产构建 `HOST=127.0.0.1 PORT=3702 node .output/server/index.mjs` 复验页面可访问，并通过源码契约检查 Hero badge、H1 双行 block、描述块、actions、字号和对齐规则。
- 生产预览服务已停止。

## 已知问题
- `Agentic solution V1.gif` 为需求指定素材，源文件约 28MB，生产构建会按原素材打包；如后续需要性能优化，应由产品确认是否允许转码或替换素材。

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `feat(TASK-005.1): implement why deeptrols page` |
| Commit Hash | `1ec1a39` |
| Review Fix Commit Message | `fix(TASK-005.1): blend why hero visual` |
| Review Fix Commit Hash | `47b2fde` |
| Hero Content Fix Commit Message | `fix(TASK-005.1): match why hero emqx content block` |
| Hero Content Fix Commit Hash | `002b889` |
| Git Push | 通过：已推送至 `origin/main` |
