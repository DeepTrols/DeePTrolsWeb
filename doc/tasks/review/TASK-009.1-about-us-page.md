# TASK-009.1：About Us 页面
---
* TaskName：实现 About Us 关于我们页面
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md` 创建 `about_us` 路由，复用公共 Header/Footer、居中 PageHero、统计条、公司介绍、核心价值观、公司地址与联系我们区块。
* TaskCreator：Codex
* TaskCreationTime：2026-08-24
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-009.1 |
| Epic | EPIC-009 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 新增 `/about_us` 页面，公共 Header 与 Footer 保持全站一致。
2. Hero 使用公共 `PageHero` 居中展示，不渲染 badge、badge icon 与 title gradient，并使用需求指定背景视频。
3. 落地全球客户、覆盖行业、构建场景统计条。
4. 新增公司介绍文本、3 张核心价值观卡片、公司地址与联系我们区块。
5. 同步测试、Harness 与文档记录，保证后续不回退。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md`
- `doc/product/NAVIGATION.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`

---
## 实现内容
1. 阅读 About 产品需求和公共组件约束。
2. 新增 About 页面数据、页面组件与 About 专属业务组件。
3. 扩展公共 `PageHero`，支持无 badge / 无 gradient 的居中 Hero。
4. 更新导航关于我们链接至 `/about_us`。
5. 补充测试与 Harness 约束。
6. 执行质量门禁并完成浏览器验证。

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
| `pages/about_us.vue` | 新增 About Us 页面路由与 SEO。 |
| `data/about.ts` | 新增 About 页面结构化内容。 |
| `components/about/AboutHero.vue` | 新增 About Hero 业务组件。 |
| `components/about/AboutStatsSection.vue` | 原统计条区块，已于 `TASK-009.4` 并入 `AboutHero` 并删除独立 section。 |
| `components/about/AboutIntroSection.vue` | 新增公司介绍区块。 |
| `components/about/AboutTextBlock.vue` | 新增 About 文本块组件。 |
| `components/about/AboutValuesSection.vue` | 新增核心价值观交互卡片区块。 |
| `components/about/AboutAddressSection.vue` | 新增公司地址区块。 |
| `components/about/AboutContactSection.vue` | 新增联系我们区块。 |
| `components/common/PageHero.vue` | 扩展公共 Hero，支持无 badge、无 gradient、可选视觉区和背景视频。 |
| `data/navigation.ts` | 关于我们导航入口更新为 `/about_us`。 |
| `public/images/about/custom-rad-hero-bg-video.mp4` | 迁移 About Hero 运行时视频资产。 |
| `tests/about-content.spec.ts` | 新增 About 内容契约测试。 |
| `tests/visual/site/about.contract.ts` | 新增 About 视觉契约。 |
| `tests/visual.spec.ts` | 注册 About 视觉契约。 |
| `scripts/harness/checks/about-page.mjs` | 新增 About Harness 检查。 |
| `scripts/harness-check.mjs` | 接入 About Harness 检查。 |
| `scripts/harness/required-files.mjs` | 补充 About 必需文件。 |
| `scripts/harness/sources.mjs` | 补充 About Harness 源文件。 |
| `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md` | 补充实现记录。 |
| `doc/product/NAVIGATION.md` | 同步 About 路由。 |
| `doc/product/SITE_MAP.md` | 同步 About 路由。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 `PageHero` 可选能力说明。 |
| `doc/engineering/ASSET_BOUNDARY.md` | 补充 About 运行时资产边界。 |

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
| 浏览器渲染检查 | 通过，Hero、统计、介绍、价值观、地址、联系、Footer 均已渲染，控制台无错误 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `feat(TASK-009.1): implement about us page` |
| Commit Hash | 见 Git 记录 |

## 完成说明
已完成 `/about_us` 页面实现、公共组件扩展、导航与文档同步，并通过质量门禁。等待 Review。
