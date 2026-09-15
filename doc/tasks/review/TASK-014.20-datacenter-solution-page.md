# TASK-014.20：算电协同运营方案页面
---
* TaskName：算电协同运营方案页面
* TaskDescription：根据 `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/datacenter.md` 完成算电协同运营方案页面（`/solutions/compute`），Hero 与 section 间距与智能制造解决方案页保持一致。
* TaskCreator：Olly
* TaskCreationTime：2026-09-14
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.20 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Claude    |

---
## 任务目标
严格按照 `datacenter.md` 完成算电协同运营方案页面，复用现有公共组件与 Tailwind CSS v4 样式体系，不新建样式、不写行内 style，文案逐字来自需求文档，不发散、不自造。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/NAVIGATION.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/datacenter.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/manufacturing.md`

---
## 实现内容
1. 新建静态路由页 `pages/solutions/compute.vue`，覆盖 `[slug].vue` 动态路由（与 manufacturing/energy/water 静态页并存的既有模式一致），访问路径与导航/页脚中的 `/solutions/compute` 对齐。
2. 迁移 Hero 背景素材 `solution-datacenter.webp` 至 `public/images/solutions/datacenter-hero.webp`，页面不直接引用需求目录。
3. 实现 `DatacenterHero.vue`：1:1 复用智能制造 586px Hero 布局（背景图 + 90° 黑色渐变遮罩 + 渐变标题 + 描述 + 「免费获取专属方案」白色描边 CTA）；因标题较长做两处内容驱动的移动端适配：h1 追加 `max-md:whitespace-normal`（移动端允许换行），描述块移动端定位由 `max-md:top-[230px]` 调整为 `max-md:top-[290px]`。
4. 实现 section1 行业痛点：复用 `ProductFeatureGridSection`（`columns="two"` 2X2、`header-width="wide"`、首屏后 `pt-32` 间距与制造页一致）。
5. 实现 section2 解决方案 / section4 运营闭环：复用 `SectionShell spacing="compact"` + 居中 `SectionHeader` + `ProductSystemFlowFrame`（flow 暂不传入，仅 label），布局节奏沿用 energy 页既有先例。
6. 实现 section3 核心能力：复用 `ProductFeatureGridSection`（`columns="four"` 1 行 4 个，无副标题传 `subtitle=""`）。
7. 实现 section5 典型场景：`DatacenterScenariosSection.vue` 复用 FDE 应用场景卡片视觉（bg-muted 边框卡 + 图标 + 标题 + 描述），按用户确认改为**静态不可点击卡片**（无 NuxtLink、无箭头、无 hover 覆盖层）。
8. 页面收尾复用 `CtaSection`，与其余解决方案页保持一致。
9. 文案集中于 `data/solutions/datacenter.ts`；补充内容测试、视觉契约与 Harness Engineering 检查并注册。

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
| `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/datacenter.md` | 需求文档（背景图更正为 solution-datacenter.webp；section5 标注卡片不可点击） |
| `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/solution-datacenter.webp` | Hero 源背景素材 |
| `public/images/solutions/datacenter-hero.webp` | 运行时 Hero 背景素材 |
| `data/solutions/datacenter.ts` | 算电协同运营方案页面集中内容数据 |
| `pages/solutions/compute.vue` | 算电协同运营方案静态路由页 |
| `components/solution/datacenter/DatacenterHero.vue` | 586px Hero（复用制造页布局 + 移动端换行适配） |
| `components/solution/datacenter/DatacenterScenariosSection.vue` | section5 典型场景静态卡片 |
| `tests/datacenter-content.spec.ts` | 内容契约 |
| `tests/visual/site/solutions/datacenter.contract.ts` | 视觉契约 |
| `tests/visual.spec.ts` | 注册视觉契约 |
| `scripts/harness/checks/solutions-datacenter.mjs` | Harness Engineering 检查 |
| `scripts/harness-check.mjs` | 注册 Harness 检查 |
| `scripts/harness/sources.mjs` | 登记 Harness 源文件 |
| `scripts/harness/required-files.mjs` | 登记必需文件 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | dev |
| Commit Message | feat(TASK-014.20): implement datacenter compute solution page |
| Commit Hash    | 待提交后生成 |

## 完成说明
已按 `datacenter.md` 完成算电协同运营方案页面（`/solutions/compute`）：
- 路由：静态页 `pages/solutions/compute.vue` 覆盖 `[slug].vue` 动态路由，与导航、页脚、USE_CASES 文档中已登记的 `/solutions/compute` 链接对齐；`data/solutions/use-cases.ts` 中 compute 条目保留不动（既有制造/能源/水务页同模式）。
- Hero：与智能制造 Hero 布局 1:1 一致（586px、背景图 + 渐变遮罩 + 渐变标题 + 白色描边 CTA），仅因标题长度做两处移动端适配（`max-md:whitespace-normal`、描述块 `max-md:top-[290px]`），桌面端与制造页像素一致。
- section2/section4：`ProductSystemFlowFrame` 按需求「flow 暂时不传入」，仅传 label（算电协同运营能力图 / 算电协同运营闭环能力图），组件自带加载中占位。
- section5：复用 FDE 应用场景卡片视觉，经用户确认为静态不可点击卡片。
- 背景图经用户确认使用 `solution-datacenter.webp`（需求文档中原 education.png 为模板残留，已同步更正文档）。
- 全部文案逐字来自 `datacenter.md`，集中于 `data/solutions/datacenter.ts`；页面与组件无 `<style>` 块、无行内 style，纯 Tailwind CSS v4。
- 已补充内容测试、视觉契约与 Harness Engineering 检查并注册，避免后续偏离页面要求。
