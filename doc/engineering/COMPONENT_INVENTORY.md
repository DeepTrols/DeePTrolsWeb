# 前端组件清单与组件化审计

> 日期：2026-09-29
> 范围：`components/` 309 个 .vue + `pages/` 36 个 .vue（合计约 29,000 行）
> 方法：引用统计（字面标签 PascalCase/kebab + 显式 import + 注册表对象）+ 四片并行整文件审计 + 关键结论人工复核
> 关联文档：`COMMON_SECTION_COMPONENTS.md`、`HOME_PAGE_BASELINE.md`、`COMPONENT_REFINEMENT_AUDIT.md`

## 0. 审计口径与数据修正

- 引用统计面：`pages/`、`components/`、`layouts/`（不存在）、`app.vue`；对候选死代码再全仓复核（含 `.ts` 注册表、`scripts/harness/`、`tests/`、`doc/`）。
- **修正声明**：初版统计报「74 个零引用」为口径错误（未剥 `.client.vue` 后缀、未计显式 import 与注册表分发）。修正后**真零引用仅 4 个**，且全部属于「主动退役」或「harness 钉住」，**不存在意外死代码**。本仓库的真实问题不是死代码，而是**同构复制**。
- 真零引用 4 件及定性：
  | 组件 | 定性 | 依据 |
  |---|---|---|
  | `components/home/HomeCases.vue` | 主动退役（TASK-014.10 从首页移除） | `doc/tasks/review/TASK-014.10-home-remove-cases-flow.md:33`；harness 负断言 `scripts/harness/checks/home-layout.mjs:28` |
  | `components/home/HomeDeliverables.vue` | 主动退役（同上） | 同上 |
  | `components/home/HomeProductSystemFlow.vue` | harness 钉住的历史件，文档禁止恢复挂载 | `scripts/harness/required-files.mjs:424`；`doc/product/PAGE_REQUIREMENTS/HOME/HOME.md:82` |
  | `components/home/HomeProductSystemMobileFlow.vue` | 同上 | `required-files.mjs:425`；HOME.md:82 |

---

## 1. 现状组件清单（按目录）

### 1.1 `components/common/`（41 个）——规范源层

| 组件 | 引用 | 状态 |
|---|---|---|
| `section/SectionHeader.vue` | 36 文件 | **规范源**（标题区唯一事实源；harness 锁定 `design-system.mjs:58-64`） |
| `ProductFeatureGridSection.vue` | 34 | **规范源**（特性网格） |
| `card/IconBox.vue` | 22 | 规范源（图标原语） |
| `section/SectionShell.vue` | 20 | 规范源（间距/容器壳）；spacing 映射被复制 5 份（见 D9） |
| `CtaSection.vue` | 19 | 规范源（CTA 横幅；harness 逐类名锁定 `home-layout.mjs:170-183`） |
| `ProductSystemFlowFrame.vue` | 15 | 规范源但**能力缺口**：写死 `height:560px`、无缩放 props，逼出 19 处复制（D3） |
| `card/BaseCard.vue` | 14 | 规范源（卡片壳）；`variant="ecosystem"/"media"` 零使用者（待清退） |
| `PageHero.vue` | 13 | 规范源（浅色 hero）；12 个业务 hero 正确包装它 |
| `card/CardGrid.vue` | 10 | 规范源（栅格） |
| `ProductArchitectureSection.vue` | 9 | 规范源（架构区壳） |
| `BaseButton.vue` | 8 | 规范源；仍有 3 类手写按钮绕过它（D9-P3） |
| `ProductMetricsSection.vue` | 8 | 规范源；自带 spacing 复制（D9-P6） |
| `AlternatingTimelineSection.vue` | 6 | 规范源；`DgpEvolutionSection` 绕过它重写（D7） |
| `SectionHeading.vue` | 5 | **兼容壳，待废弃**：纯转发 SectionHeader；harness/文档已定性（`design-system.mjs:55-57`、`COMMON_SECTION_COMPONENTS.md:89,97`） |
| `card/FeatureCard.vue` / `card/CardText.vue` / `card/ValueCard.vue` | 3/4/1 | 层次清晰；ValueCard 绕过 BaseCard 手写壳（待重构） |
| `CmsPageView.vue` | 3 | CMS 页壳；**依赖方向倒置**（common 反向 import sections，见 D12-4） |
| `IsoCube.vue` | 3 | **待推广**：`FdeEvolutionCube`、`EducationArchitectureDiagram` 手写同几何重写 |
| `PagerArrows.vue` | 3 | 健康，无第二套实现 |
| `ProductSystemSection.vue` / `SystemCards.vue` / `ProductSystemCards.vue` | 3/3/1 | 命名易混 trio；后两者建议合并为 `variant` 参数件 |
| `carousel/CarouselRoot.vue` / `CarouselControls.vue` | 2/4 | **待推广**：`HomeDeliverables`、两个 snap 轮播手写同构逻辑 |
| `tabs/BaseTabs.vue` | 2 | **待推广**：`HomeCases`、`ReportFilterBar` 手写 tablist |
| `HeroStatsStrip.vue` | 1 | **待推广**：`AboutHeroStats` 手写同构统计格 |
| `HeroLogoStrip.vue` / `ProductValueSection.vue` | 1/1 | **删除候选**（纯包装/纯组合，无第二使用者） |
| `article/ArticleContent.vue` 等 3 件 | 3 | 健康（`variant` 吸收 case/news 差异是正面样板） |
| `hero-visual/HeroVisualShell.vue` / `HeroVisualPanel.vue` | 2/1 | 壳层建设半途而废：3 个 HeroVisual 手写同款 glow 未用它（D8） |
| `CompatibilityGridSection.vue` / `TrustTabsSection.vue` / `CtaSection` 等 | ≤1 | harness 钉住，保留 |

### 1.2 `components/sections/`（8 个）——CMS 渲染层

`CmsPageRenderer`（分发器）+ `CmsHero` + `CmsImageBanner` + `CmsLogoStrip` + `heroes/` 4 变体。设计正确（单一分发点），问题在**静态孪生兄弟未删**（D2）：`CmsHeroBannerDark` 注释自认「方案页深色横幅五合一」但 6 个静态 hero 仍在页面服役；`CmsHeroFullscreenVideo` 与 `FdeHero` 逐行同构；`CmsHeroFullscreenImage` 与 `HomeHero` 重复 ~170 行 scoped SCSS。

### 1.3 `components/layout/`（5）与 `components/navigation/`（8）

健康承重层（SiteFooter/SiteHeader 各 26 引用）。局部样式重复：页脚链接 focus/hover 三连 ×3（D9-P9）、Mega 面板 strong/small 规则 ×2（D9-P10）。

### 1.4 业务目录现状

| 目录 | 数量 | 结构 | 判定 |
|---|---|---|---|
| `product/` | 85 | 7 条产品线 ×（Hero/HeroVisual/Architecture/Capability*/叶子视觉件） | Section 层复用 common 良好；**叶子视觉件与 dispatcher 是重复重灾区**（D7/D8） |
| `demo/` | 77 | 19 族 ×（Flow.client + Node + CurveEdge/ReturnEdge/StepEdge）+ 10 个 Demo 包装 | **全仓最大复制源**（D4，6,894 行） |
| `solution/` | 34 | 6 业务线 ×（Hero/CapabilityCards/Value/CustomerCases）+ `SolutionPageTemplate` + `FdePageContent` | 同构族 ×4 组 + 双轨制（D5/D12） |
| `home/` | 18 | 首页模块 | 4 件退役/钉住（§0）；`HomeHero` 与 CMS 件重复（D2） |
| `news/`(5) `case/`(3) `service/`(5) | 13 | 列表/详情区块 | 四段可收敛为 1（D6）；分页逻辑 ×3（D10） |
| `about/`(8) `contact/`(2) `why/`(6) | 16 | 页面区块 | 多件绕过 SectionShell/SectionHeader 手写壳（D9-P7）；2 件 snap 轮播重复（D10） |
| `flow/` | 7 | VueFlow 架构图 | 与 demo 族同范式（D4）；`EnterpriseFlow.client.vue` 传递性死（唯一引用方 HomeProductSystemFlow 已退役，但 tests 仍读其内容） |

---

## 2. 重复创建问题清单（D1–D12）

### D1 页面外壳手写 ×26（无 `layouts/`）
`app.vue` 仅裸 `<NuxtPage/>`；26 个页面各自手写 `site-shell + SiteHeader + main#main-content + SiteFooter`（如 `pages/products/data-labeling.vue:20-22`；`grep -rl site-shell pages components` = 26 文件；`SolutionPageTemplate.vue:42-44`、`CmsPageView.vue:18-19` 各再内嵌一份）。
**收敛**：新增 `layouts/default.vue`（或 `common/AppShell.vue`），页面只留 `<main>` 内容。

### D2 Hero 三轨并行（≈900 行重复）
- 深色横幅骨架 ×7：`sections/heroes/CmsHeroBannerDark.vue:27-91`（已 props 化）vs `solution/{datacenter,education,energy-saving,hydraulic,manufacturing}/*Hero.vue`（各 56 行，diff 仅数据 import 与 2 个 utility 值）+ `case/CaseHero.vue`（video 变体，借用 `page-hero__title-block` 类名却不导入组件 `CaseHero.vue:20`）。共享 `h-[586px]`、`top-[clamp(78px,10.729vw,206px)]`、同一条 ~40 类名 outline-white CTA 串与同一 SVG 箭头。
- `solution/fde/FdeHero.vue:6-37` ≡ `sections/heroes/CmsHeroFullscreenVideo.vue:12-43`（class 串 diff 为空）。
- `home/HomeHero.vue:17-183` ↔ `sections/heroes/CmsHeroFullscreenImage.vue:35-211`（~170 行 scoped SCSS 逐行同构，组件注释自认「复制 HomeHero」）。
- 渐变 CTA + 双伪元素箭头 ×3：`assets/scss/components/_page-hero.scss:147-203`、`HomeHero.vue:76-134`、`CmsHeroFullscreenImage.vue:105-163`。
**收敛**：静态 6 hero 废弃改传 props 给 CmsHeroBannerDark（提升为 `common/hero/DarkBannerHero`）；FdeHero 并入 FullscreenVideo；HomeHero 改为向 CMS 件传数据；抽 `.dt-hero-cta` 普通 SCSS 类（禁 @apply）。

### D3 流程图 1704px 缩放装置 ×19 处 / 37 文件
`absolute left-1/2 top-1/2 h-[Npx] w-[1704px] -translate-x/y-1/2 scale-[min(1,calc(100cqw/1704px))]` 精确命中 19 处（`HomeProductSystem.vue:59-60`、`FdePageContent.vue:56,83,112`、7 个产品 Architecture Section、`pages/solutions/compute.vue:58,92` 等），仅高度 460–640px 不同。根因：`ProductSystemFlowFrame.vue:28` 写死 560px 且无 props。
**收敛**：给 FlowFrame 加 `frameWidth/frameHeight` props 内置缩放层（或 `.dt-flow-scaler` 普通类）。

### D4 demo 流程图三件套（6,894 行 / 79 文件，可压缩 40–50%）
- **CurveEdge ×14**（各 53–65 行）：12 份差异 0–3 行且仅为中文注释；另 2 份（`dms-regulation-process/`、`tanyao-iot/`）是缺 `outbound` 特性的旧演化快照（stroke-width 写死 2.5/1.5 与 3/2）——同一组件 3 个版本并行。
- ReturnEdge ×2、StepEdge ×2、单体 Edge ×5：共享同一 `<defs>` 骨架（gradient + feGaussianBlur glow + 三层 path）。合计 ≈1,388 行 → 可收敛为 3 个参数化 Edge（~200 行）。
- **VueFlow 壳模板块 ×22 文件**：15 个 props + `withDefaults(viewportY/zoom)` + `proOptions` 逐字相同（仅 slot 名不同），≈660 行 → 1 个 `FlowCanvas`（nodes/edges schema + node/edge 组件注入）。
- Node 族：`handleClass` 常量 18 文件完全相同、`toneClasses` violet 行 11 文件相同 → 抽共享 ts。
- Demo 包装层 ×10（13–18 行纯样板）+ `pages/demo/*.vue` ×11（各 19 行同构，见 D10）。

### D5 解决方案同构族（≈1,100–1,300 行）
- `*CapabilityCardsSection` ×5（65–69 行/个，diff 14–22 行全为数据；含同款魔法坐标 `217.22/255.22/279.22px`）→ 1 个 `SolutionCapabilityCardsSection`。
- `*ValueSection` ×4：education/hydraulic/fde 三胞胎卡片体逐字相同（≈`FeatureCard layout="horizontal"` + tags 胶囊样式分叉）；energy-saving 为简形变体（可以 `columns`/简形 items 覆盖）。
- `*CustomerCasesSection` ×5（各 7 行）：纯字符串转发 `SolutionCasePicksSection page-key="…"`，零信息量 → 整族删除。
- `*Hero` ×5 + `CaseHero`：见 D2。
- 双轨制根因：`SolutionPageTemplate`（数据驱动，仅 `[slug].vue` 用）与业务线硬编码轨并存。

### D6 列表/详情四段与卡片
- `CaseFeaturedSection` / `CaseResourcesSection` / `ReportFeaturedSection` / `ReportResourcesSection` 四件同骨架（sr-only h2「推荐资源」+ `grid md:grid-cols-3` + 空态）→ 1 个 `common/ResourceGridSection`（slot 放分页/加载更多）。
- `service/report/ReportResourceCard.vue` 是事实公共件（4 处引用，含 case 域跨目录 import）→ 迁 `common/card/ResourceCard.vue`；`SolutionCasePicksSection.vue:38-59` 未复用而是内联重写同款卡（同 `aspect-[400/180]`、同 `group-hover:scale-105`、同排版）。
- `ReportResourcesSection.vue:26-32`「加载更多」硬编码外链 `/zh/resources/pages/2`（疑死链）。

### D7 产品线 dispatcher 与叶子视觉件
- 6 份复制粘贴 dispatcher：`const visuals=[A,B,C]` + `<component :is="visuals[index]">`（`BoyaoCapabilityVisual.vue:12`、`Ddp:13`、`Dlp:14`、`Dms:14`、`Tanyao:22`、`DgpEvolution:12`）。
- 5 个 `*CapabilityTimelineSection` 是 `AlternatingTimelineSection` 的 21 行同构薄包装；但 `DgpEvolutionSection.vue:24-58` 绕过它重写（同列切换类、同 eyebrow 胶囊、同发光圆点 `shadow-[0_0_14px_rgba(26,87,235,0.45)]`）。
- 26 个叶子视觉件共享逐字节外框 class（`min-h-[280px] … rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)]`）+ 红黄绿三点窗口 chrome（30 文件）+ `steps/activeStep` 时间轴范式（27 文件）；且与 `RuntimePanelShell` 两套壳并行互不复用。
- **依赖方向倒置**：6 条产品线的视觉件全部 import `~/components/product/device-agent/useRuntimeTimeline`（33 文件命中）——全站公共资产放错目录。

### D8 HeroVisual 族（7 个 / 1,585 行）
- 「IDE 窗口」原型（Ddp/Dlp/Dms）：外层 glow 与 `HeroVisualShell.vue:12` 默认 glowClass **逐字相同却未用 Shell**（`DdpHeroVisual.vue:31-34`、`Dlp:41-44`、`Dms:44-47`）；三点 chrome ×3、Tab 栏 ×3（各 ~15 行近逐字）→ 抽 `HeroWindowShell`。
- 「画布 + SVG 光点」原型（Boyao/Tanyao）：同包装类串 + 同 feGaussianBlur 流动光点范式 → 抽 `HeroCanvasStage` + 光点原语。
- 配套 ts 成对重复：`useDlpHeroAnimation`(123) / `useDdpHeroAnimation`(76) / `useDmsHeroAnimation`(210) 同为 tab 状态机；`dlp/heroSql.ts` ≡ `ddp/ddpHeroSql.ts` 平行 SQL tokenizer → 各合一。

### D9 样式层重复（top 模式）
| # | 模式 | 命中 | 收敛 |
|---|---|---|---|
| P1 | 深色横幅 hero 骨架 | ×7 | 见 D2 |
| P3 | 渐变 CTA + 伪元素箭头 | ×3 | `.dt-hero-cta` 普通类 |
| P6 | spacing 三档映射 | ×6（`ProductMetricsSection.vue:20-25` 注释自认 mirrors、`CmsPageRenderer.vue:31-43`、`CmsImageBanner/CmsLogoStrip/CmsHero`） | 共享纯函数或套 SectionShell |
| P7 | 标题包装 `mb-12 text-center lg:mb-16` | ×24–28 | SectionHeader align=center 配套间距 |
| P8 | `main.scss:189-223` 的 `dt-section-*` 死类 ↔ SectionHeader scoped 双份事实源 | 2 份 | 删死类（同步 `design-system.mjs`、`HOME_PAGE_BASELINE.md:42`） |
| P9 | 页脚链接 focus/hover 三连 | ×3 | SiteFooter 层一条规则 |
| P10 | Mega 面板 strong/small 规则 | ×2 | 归 MegaPanelNavLink |
| P13 | 占位网格两套实现（SCSS 48px ↔ Tailwind 44px） | ×2 | `.dt-placeholder-grid` |
| P14 | `.dt-cta-panel` 僵尸类（`main.scss:563-586,615-618`，零使用者；harness 一边要求存在一边禁止 CtaSection 使用；AGENTS.md:133 仍列为公共入口） | 1 | 删除并同步三处 |
| 其他 | 4 页重复 `.x-page{background:var(--dt-color-bg)}`（与 `.site-shell` 语义重复）；off-token 硬编码色（`#1d2234/#7e7e7e/#d9dde4/#161f23/#1f49e5`、`bg-slate-950`、`bg-white`） | 4+9 | 走 token / 删除 |

### D10 页面级样板
- `pages/demo/*.vue` ×11（各 19 行同构：`layout:false` + noindex + `<main><XxxDemo/></main>`）→ 单动态路由 `pages/demo/[name].vue` + name→异步组件映射。
- 404 双语义 fetch 样板 ×3 页（`news/[id].vue:22-74` 内部还写 4 遍：32-39/43-49/55-61/65-71；`cases/[slug].vue:23-53`；`solutions/[slug].vue:18-32`）→ `composables/use-detail-resource.ts`。
- CMS preview 拉取样板 ×3（`index.vue:13-18`、`[...slug].vue:18-22`、`solutions/[slug].vue:21-24`）→ `use-cms-page.ts`。
- 列表筛选样板 ×3（`cases/index.vue:24-46`、`news/index.vue:21-51`、`reports.vue:17-32`）→ `use-list-filters.ts`。
- 分页逻辑 ×3（`CaseResourcesSection.vue:12-37`、`NewsListSection.vue:13-38`、`NewsRelatedAside.vue:14-39`，逐行同构）→ `composables/use-pagination.ts`。
- snap 轮播逻辑 ×2（`AboutIntroImageCarousel.vue:11-71` ↔ `FdeUseCasesSection.vue:8-68` 近逐行）→ `use-snap-carousel.ts`。
- 文章页版式 ×2（`news/[id].vue:104-127` ↔ `cases/[slug].vue:97-119`：双栏 grid + article + aside + CtaSection；侧栏一个组件一个页面内联）→ `common/article/ArticlePageLayout` + `ArticleHeader` + 泛化 `ArticleRelatedAside`。

### D11 公共层职责重叠
- `SectionHeading`（兼容壳，5 引用）→ 迁移后废弃。
- `ProductSystemCards`(1 引用) vs `SystemCards`(3 引用) → 合并为 `variant: 'numbered' | 'icon'`；`SystemCards.vue:27-29` 手写编号块重复 FeatureCard 的 `icon-label` 能力。
- `ValueCard` 绕过 BaseCard 手写壳；`BaseCard` 的 `ecosystem/media` variant 零使用者而 `HomeEcosystem.vue:60,78` 手写 `dt-ecosystem-card`（双轨）。
- `IsoCube`(3) vs `FdeEvolutionCube.vue:13-90`（同几何 Tailwind 重写）+ 2 处手写等距变换 → IsoCube 加 props 收编。
- `BaseTabs`/`CarouselRoot`/`BaseButton`/`HeroStatsStrip` 低引用但存在手写反例（`HomeCases.vue:51-63,150-163`、`ReportFilterBar.vue:62-95`、`HomeDeliverables.vue:76-99,171-214`、`ReportResourcesSection.vue:29`、`AboutHeroStats.vue:13-18`）→ 推广而非删除。

### D12 结构性问题
1. **solutions 双内容源**：`data/solutions/use-cases.ts` 的 seed `manufacturing:150 / water:266 / energy:324 / compute:382` 被同名静态路由遮蔽**永久不可达**（死内容），且同 URL 文案已分叉（seed compute「算力中心」vs `compute.vue:21`「算电协同」）。
2. **`pages/solutions/fde.vue` ≡ `pages/services/enterprise-ai-delivery.vue`**（逐行等价，SEO 标题一字不差）→ 保留一个 + 301。
3. **CMS 与 common 边界**：`CmsHero` simple 变体（`CmsHero.vue:81-94`）≡ `CmsPageView` 默认页头（`CmsPageView.vue:28-43`）；logo 墙双轨（`logoStrip`→CmsLogoStrip 静态网格 vs custom 注册 `HomeCustomerLogos` 走马灯）语义重叠。
4. **依赖方向倒置**：`common/CmsPageView.vue:3-5` 反向 import `sections/CmsPageRenderer` 与 layout/navigation 壳 → 归入 sections/ 或由 D1 的 layout 承接。

---

## 3. 目标组件清单

### 3.1 新增组件 / composable 提案

| 新增 | 目录 | 收敛对象 | 概要 |
|---|---|---|---|
| `default.vue`（layout） | `layouts/` | D1 的 26 份外壳 | site-shell + SiteHeader + main + SiteFooter |
| `FlowCanvas.vue` | `components/flow/` | D4 的 22 份 VueFlow 壳 | nodes/edges schema + viewportY/zoom + node/edge 注入 |
| `FlowCurveEdge/FlowReturnEdge/FlowStepEdge` + `flow-node-tokens.ts` | `components/flow/` | D4 的 18 份 Edge、handleClass/toneClasses | 参数化边 + 共享色板/Handle 常量 |
| FlowFrame 缩放 props | `common/ProductSystemFlowFrame.vue` | D3 的 19 处 | `frameWidth/frameHeight` 内置缩放层 |
| `hero/DarkBannerHero.vue` | `components/common/hero/` | D2 的 7 份深色 hero | 即提升 CmsHeroBannerDark |
| `hero/FullscreenVideoHero` 合并 FdeHero；HomeHero 并入 CmsHeroFullscreenImage | `sections/heroes/` | D2 | 单实现双消费（CMS + 静态页） |
| `.dt-hero-cta` / `.dt-flow-scaler` / `.dt-placeholder-grid` / `.dt-section-head` | `assets/scss/` | D9 P3/P5/P7/P13 | 普通 SCSS 类（禁 @apply） |
| `SolutionCapabilityCardsSection.vue` / `SolutionValueCardsSection.vue` | `components/solution/` | D5 | props：titleId/eyebrow/title/subtitle/width/spacing/columns/items |
| `SolutionStaticPageTemplate.vue` | `components/solution/` | D5/D12 | 静态方案页骨架（Hero→痛点→流程→能力→价值→案例→CTA） |
| `ResourceGridSection.vue` + `card/ResourceCard.vue` | `components/common/` | D6 | 4→1；ReportResourceCard 迁移 |
| `article/ArticlePageLayout.vue` + `ArticleHeader.vue` + 泛化 `ArticleRelatedAside` | `components/common/article/` | D10 | 双栏文章版式 |
| `HeroWindowShell.vue` / `HeroCanvasStage.vue` | `components/common/hero-visual/` | D8 | glow+chrome+tabs+定高 slot / 画布+SVG 光点原语 |
| `BaseInput.vue` | `components/common/` | ContactForm 手写 inputClass | 表单输入原语 |
| `use-pagination.ts` / `use-snap-carousel.ts` / `use-detail-resource.ts` / `use-cms-page.ts` / `use-list-filters.ts` / `use-section-spacing.ts` / `useHeroTabAnimation.ts` + 通用 SQL tokenizer | `composables/` | D9-P6、D10、D8 | 逻辑层收敛 |
| `pages/demo/[name].vue` | `pages/` | D10 的 11 页 | 单动态路由 + 映射表 |
| `useRuntimeTimeline` 迁移 | `composables/`（自 product/device-agent/） | D7 | 33 文件反向依赖转正 |

### 3.2 删除 / 合并清单（含前置同步）

| 处置 | 文件 | 前置同步 |
|---|---|---|
| 删除（纯透传） | 5 × `solution/*/*CustomerCasesSection.vue`、`why/WhyHeroLogos.vue`、`solution/fde/FdeEvolutionVisual.vue` | 页面改直用 `SolutionCasePicksSection` / 内联 / 组件 map |
| 合并删除 | 5 × `solution/*/*Hero.vue` + `case/CaseHero.vue` → DarkBannerHero；`fde/FdeHero.vue` → FullscreenVideo；5 × `*CapabilityCardsSection`、4 × `*ValueSection` → 参数化件 | 无 harness 钉 |
| 迁移 5 处后废弃 | `common/SectionHeading.vue` | `design-system.mjs:55-64`、`COMMON_SECTION_COMPONENTS.md:89,97` |
| 删除候选 | `common/HeroLogoStrip.vue`、`common/ProductValueSection.vue` | 无 |
| 退役件清退 | `home/HomeCases.vue`、`home/HomeDeliverables.vue` | `home-layout.mjs:28` 负断言、`AGENTS.md:94`、`HOME_PAGE_BASELINE.md:64`、`COMMON_SECTION_COMPONENTS.md:159` |
| 钉住勿删 | `home/HomeProductSystemFlow.vue`、`HomeProductSystemMobileFlow.vue`、`flow/EnterpriseFlow.client.vue` | `required-files.mjs:424-425`；`tests/visual/site/home/context.ts:59`、`footer.contract.ts:123-125` 仍读其内容 |
| 样式清退 | `.dt-cta-panel`、`main.scss:189-223` 死类、BaseCard `ecosystem/media` variant | `design-system.mjs:23,58-64`、`home-layout.mjs:181`、`AGENTS.md:133`、`HOME_PAGE_BASELINE.md:42` |
| CMS 注册件勿误删 | `why/WhyEngine|WhyServiceReset|WhyTrustTabs`、`about/AboutTextBlock|AboutHeroStats`、`contact/*` | `sections/custom-registry.ts:26-47`（键受 `custom-names.ts` 约束） |

### 3.3 内容源治理
- 删除被遮蔽的 4 个 solution seed，或反向删除静态页迁模板轨（二选一，以模板轨为收敛方向）。
- `fde` / `enterprise-ai-delivery` 双路由保留一个 + 301。
- `ReportResourcesSection.vue:26-32` 死链修复。

---

## 4. 优先级路线

- **P0（高收益/低风险）**：D3 缩放 props、D5 四族收敛与透传 wrapper 删除、D4 Edge 三件收敛、D9 P6/P7 间距与标题包装、D11 推广项（IsoCube/BaseTabs/Carousel/HeroStatsStrip）。
- **P1**：D2 hero 三轨归一（≈900 行）、D4 FlowCanvas、D6 ResourceGrid、D10 composables 五件。
- **P2**：D1 layouts/default、demo 单路由、D7 叶子视觉件壳与 useRuntimeTimeline 迁移、D8 HeroWindowShell。
- **P3**：D12 内容源治理、CMS/common 依赖方向、样式死类清退（需同步 harness 与文档）。

## 5. 量化汇总（估算）

- 可删/合并文件：≈40 个；净删模板与样式：≈4,000–6,000 行（D4 ≈2,000、D2 ≈900、D5 ≈1,200、D1 外壳 24 份、D9 样式层数百）。
- 重复创建热点排序：demo 流程图族 > 页面外壳 > hero 三轨 > 流程缩放装置 > 解决方案族 > 样式层间距/标题包装。
- 健康基线（勿动）：`pages/products/*.vue` 对 common section 的复用、`ArticleContent` 的 variant 模式、`ReportFilterBar` 的 props 化、CMS 单一分发点。
