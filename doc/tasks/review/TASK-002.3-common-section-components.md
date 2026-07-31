# TASK-002.3：公共页面区块组件抽离
---
* TaskName：公共页面区块组件抽离
* TaskDescription：将 Why DeepTrols 与 HOME 中可复用的页面区块抽离为公共组件，保留页面专用组件作为轻量配置封装，方便后续页面保持统一视觉与交互。
* TaskCreator：Codex
* TaskCreationTime：2026-07-31
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-002.3 |
| Epic | EPIC-002 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 抽离 Why Hero 为公共 Hero 组件，且从 Hero 中移除 logo 区域。
2. 将 Why Hero logos 单独抽离为组件。
3. 抽离 Why Trust、Why Service、Why Engine 为公共区块组件。
4. 抽离 HOME Product System 为公共产品体系区块，流程图通过 slot 传入。
5. 抽离 HOME CTA 为公共 CTA 区块组件。
6. 更新 Harness、测试和工程文档，避免后续页面复用偏差。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/CODE_AUDIT_2026-07-30.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`
- `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/WhyDeepTrols.md`

---
## 实现内容
1. 新增 `PageHero`，抽离 Why Hero 的背景、标题、按钮和视觉 slot，`WhyHero` 仅保留 DeepTrols 文案与 robot 视频。
2. 新增 `HeroLogoStrip` 与 `WhyHeroLogos`，从 `WhyHero` 中移除 `why-hero__logos` 区域。
3. 新增 `TrustTabsSection`，抽离 Why Trust 的 segmented tabs 与 2×2 卡片网格。
4. 新增 `ServiceShowcaseSection`，抽离 Why Service 的服务列表与右侧图片展示结构。
5. 新增 `EngineLinksSection`，抽离 Why Engine 的链接卡片与说明区块。
6. 新增 `ProductSystemSection`，抽离 HOME Product System 的标题、移动端兜底和产品卡片；桌面流程图通过 `#desktop-flow` slot 传入。
7. 新增 `CtaSection`，抽离 HOME CTA 的 panel、按钮和响应式字号。
8. 新增 `doc/engineering/COMMON_SECTION_COMPONENTS.md`，记录公共区块组件复用约束。
9. 更新 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs`，使测试和 Harness 检查公共组件复用关系。

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
- [x] Why Hero 不再包含 logo 区域
- [x] Product System 公共组件不直接依赖具体流程图

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/PageHero.vue` | 新增公共 Hero 区块 |
| `components/common/HeroLogoStrip.vue` | 新增公共 Hero logo strip |
| `components/common/TrustTabsSection.vue` | 新增公共 Trust Tabs 区块 |
| `components/common/ServiceShowcaseSection.vue` | 新增公共服务展示区块 |
| `components/common/EngineLinksSection.vue` | 新增公共引擎链接区块 |
| `components/common/ProductSystemSection.vue` | 新增公共产品体系区块，流程图走 slot |
| `components/common/CtaSection.vue` | 新增公共 CTA 区块 |
| `components/why/WhyHero.vue` | 改为 `PageHero` 配置封装 |
| `components/why/WhyHeroLogos.vue` | 新增 Why Hero logo 区块 |
| `components/why/WhyTrustTabs.vue` | 改为 `TrustTabsSection` 配置封装 |
| `components/why/WhyServiceReset.vue` | 改为 `ServiceShowcaseSection` 配置封装 |
| `components/why/WhyEngine.vue` | 改为 `EngineLinksSection` 配置封装 |
| `components/home/HomeProductSystem.vue` | 改为 `ProductSystemSection` 配置封装，并传入 `EnterpriseFlow` slot |
| `components/home/HomeCta.vue` | 改为 `CtaSection` 配置封装 |
| `pages/why-deeptrols.vue` | 接入独立 `WhyHeroLogos` |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 新增公共区块复用文档 |
| `doc/engineering/HARNESS_ENGINEERING.md` | 补充公共区块组件约束 |
| `scripts/harness-check.mjs` | 补充公共区块组件 Harness 检查 |
| `tests/visual.spec.ts` | 更新视觉契约到公共组件层 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，3 个文件、13 个测试 |
| `pnpm test:visual` | 通过，5 个测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过；Nuxt/Rolldown 输出 plugin timings 性能提示，不影响构建结果 |
| `git diff --check` | 通过 |
| `curl -I http://127.0.0.1:3199/` | 通过，HTTP 200 |
| `curl -I http://127.0.0.1:3199/why-deeptrols` | 通过，HTTP 200 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `refactor(TASK-002.3): extract shared section components` |
| Commit Hash | `40f07b5` |

## 完成说明
公共区块已抽离，Why/Home 页面现有视觉和内容由页面封装组件传入公共组件。`doc/product/PAGE_REQUIREMENTS/PRODUCT/` 仍为未跟踪目录，本任务未修改。
