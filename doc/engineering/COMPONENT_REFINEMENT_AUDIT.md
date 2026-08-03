# Component Refinement Audit
> Version: 2026-08-03
> Scope: HOME、Why DeepTrols、数曜·数据治理平台
> Status: Phase 1 implemented. P0 基础组件已抽离并接入 HOME、Why DeepTrols、DGP 的首批可复用位置。

## 目标
后续页面需要直接复用组件，但不能把页面布局写死在组件里。本次拆分建议遵循：

1. 样式统一放在全局 token / `dt-*` 公共类中。
2. 布局差异通过小组件组合、有限 props 和 slots 解决。
3. 不做“万能大组件”，避免一个组件承载所有页面场景。
4. 页面区块组件负责组织数据与布局，基础组件负责统一视觉和交互。

## 已执行：Phase 1 P0 基础组件
2026-08-03 已按本审计建议完成第一批精细组件抽离：

| 组件 | 路径 | 当前接入位置 |
|----|----|----|
| `SectionShell` | `components/common/section/SectionShell.vue` | `ProductFeatureGridSection`、`ProductSystemSection`、`TrustTabsSection` |
| `SectionHeader` | `components/common/section/SectionHeader.vue` | `SectionHeading` 兼容包装、`ProductSystemSection`、`TrustTabsSection`、`ServiceShowcaseSection`、`EngineLinksSection`、`DgpEvolutionSection` |
| `BaseCard` | `components/common/card/BaseCard.vue` | `ProductSystemCards`、`TrustTabsSection`、`EngineLinksSection` |
| `IconBox` | `components/common/card/IconBox.vue` | `ProductSystemCards`、`TrustTabsSection`、`FeatureCard`、`EngineLinksSection` |
| `CardText` | `components/common/card/CardText.vue` | `FeatureCard`、`EngineLinksSection` |
| `FeatureCard` | `components/common/card/FeatureCard.vue` | `ProductFeatureGridSection`、`SystemCards`、`ServiceShowcaseSection` |
| `CardGrid` | `components/common/card/CardGrid.vue` | `ProductFeatureGridSection`、`SystemCards`、`ProductSystemCards`、`TrustTabsSection` |
| `BaseTabs` | `components/common/tabs/BaseTabs.vue` | `HomeSolutions`、`DgpUseCasesSection`、`TrustTabsSection` |
| `CarouselRoot` / `CarouselControls` | `components/common/carousel/*` | 已新增基础组件，页面迁移留到下一批 carousel 专项 |

验证已更新到公共组件层：`tests/visual.spec.ts` 与 `scripts/harness-check.mjs` 会同时检查页面组合关系和公共组件的视觉/ARIA 契约。

## 初始统计
| 项目 | 数量 | 说明 |
|----|----:|----|
| `SectionHeading` 使用 | 9 | 但 DGP Evolution、DGP Use Cases、CTA 仍有手写标题结构 |
| `BaseButton` 使用 | 11 | 按钮公共化基本稳定 |
| `<article>` 卡片结构 | 12 | 分布在能力卡、故事卡、媒体卡、阶段卡 |
| `dt-card` / `dt-product-card` / `dt-ecosystem-card` | 13 | 外框圆角、hover 已全局化，但标题/描述/icon 布局仍分散 |
| `dt-icon-box` | 13 | 圆角已统一，尺寸、色调、是否背景仍在局部组件处理 |
| `role="tablist"` | 4 | 当前存在 pill tab、segmented tab、underline tab 三种 |
| Carousel / slide slot 结构 | 9 | Deliverables、Solutions、Cases 都重复 root / viewport / container / item 结构 |
| 点击型卡片 / 资源链接卡 | 8 | `NuxtLink` 卡片在 Ecosystem、Insights、Solutions、Engine 中重复 |
| 超过 250 行组件 | 7 | 主要集中在 HOME 复杂区块和导航 |

超过 250 行的页面组件：

| 文件 | 行数 | 建议 |
|----|----:|----|
| `components/home/HomeSolutions.vue` | 295 | 抽 Tabs、Carousel、MediaOverlayCard |
| `components/home/HomeCases.vue` | 289 | 抽 LogoTabs、CarouselShell、StorySectionShell |
| `components/home/HomeEcosystemVisual.vue` | 287 | 暂不抽业务外层，可拆视觉舞台与动画样式 |
| `components/home/HomeInsights.vue` | 278 | 抽 ResourceGrid、ResourceCard |
| `components/home/HomeDeliverables.vue` | 276 | 抽 CarouselShell、SplitMediaCard |
| `components/navigation/MegaMenuPanel.vue` | 269 | 本轮暂不处理，导航有独立交互约束 |
| `components/navigation/SiteHeader.vue` | 298 | 本轮暂不处理，Header 已按 EMQX 结构约束 |

## 核心问题
### Section Header
当前 `SectionHeading` 已支持 eyebrow、title、subtitle、left / center、nowrap，但后续仍需要：

- 右对齐场景。
- 标题层级可变：`h1` / `h2` / `h3`。
- 标题大小可变：hero、section、compact。
- header 宽度可变：默认、宽屏、full。
- subtitle 是否 nowrap 可动态。
- eyebrow / subtitle 均可选。
- header 右侧 actions slot，例如 Cases / Insights 顶部按钮。

### Card
目前 card 外框、hover、icon 圆角已经统一，但卡片内部仍有以下差异：

- 标题在 icon 右侧或下方。
- icon 外框尺寸 40 / 48 / 56 不同。
- icon 本身尺寸 20 / 24 / 28 / 48 不同。
- title 字号存在 15 / 20 / 24 / 30+ 等差异。
- description 字号存在 14 / 15 / 16 / 18 / 20 等差异。
- card 是否可点击跳转。
- card 是否有 button。
- card 是否有 tag、points、stats、logo、视觉动画。
- card 是否有背景图或右侧动画。
- card 是否需要 accent line / glow / media overlay。

因此不建议只做一个固定 `FeatureCard`。应先抽 `BaseCard`、`IconBox`、`CardText`、`CardGrid`，再用它们组合出业务卡片。

### Tabs
当前有三种 tab：

- HOME Solutions：pill tab，`.dt-tab-list` + `.dt-tab`。
- Why Trust：segmented tab，`.dt-segmented-tabs` + `.dt-segmented-tab`。
- DGP Use Cases：underline tab，active indicator 在底部。

建议抽同一个状态组件，不统一视觉为一种样式，而是统一 ARIA、键盘、`v-model`、数据结构和 slot。

### Carousel
Deliverables、Solutions、Cases 都有类似结构：

- `role="region"`
- `aria-roledescription="carousel"`
- `data-slot="root" / "viewport" / "container" / "item"`
- active index 控制 `translate3d`
- previous / next controls 或 tab 控制

建议抽 `CarouselRoot` 与 `CarouselControls`。具体 slide 内容仍由 slot 或业务组件提供。

## 推荐精细组件结构
### P0：基础组件，先抽
这些组件应先完成，因为它们会影响后续所有页面。

| 组件 | 建议路径 | 作用 | 可变点 |
|----|----|----|----|
| `SectionShell` | `components/common/section/SectionShell.vue` | 统一 section、container、底部间距、背景 | `container="default/wide/none"`、`spacing="default/compact/flush"`、`as`、`aria-labelledby` |
| `SectionHeader` | `components/common/section/SectionHeader.vue` | 替代并增强 `SectionHeading` | `eyebrow?`、`title?`、`subtitle?`、`align`、`level`、`titleSize`、`nowrapSubtitle`、`width`、`actions` slot |
| `BaseCard` | `components/common/card/BaseCard.vue` | 只负责卡片外壳、链接语义、hover、accent | `href?`、`as`、`variant`、`padding`、`interactive`、`accent`、`equalHeight` |
| `IconBox` | `components/common/card/IconBox.vue` | 统一 icon 背景/边框/圆角/尺寸 | `icon?`、`size`、`iconSize`、`tone`、`background` |
| `CardText` | `components/common/card/CardText.vue` | 统一 card 内标题与描述字号 | `title`、`description`、`titleSize`、`descriptionSize`、`align` |
| `FeatureCard` | `components/common/card/FeatureCard.vue` | 常规 icon + title + desc + optional action | `layout="vertical/horizontal"`、`href?`、`action?`、`iconPosition` |
| `CardGrid` | `components/common/card/CardGrid.vue` | 统一卡片网格与等高行为 | `columns="2/3/4"`、`gap`、`equalRows` |
| `BaseTabs` | `components/common/tabs/BaseTabs.vue` | 统一 tab 状态、ARIA、键盘 | `variant="pill/segmented/underline"`、`modelValue`、`items`、`idPrefix` |
| `CarouselRoot` | `components/common/carousel/CarouselRoot.vue` | 统一 carousel 语义与 translate | `activeIndex`、`itemCount`、`axis`、`gap`、`transition`、slots |
| `CarouselControls` | `components/common/carousel/CarouselControls.vue` | 统一左右切换按钮 | `size`、`tone`、`labels` |

### P1：区块组合组件，第二批抽
这些组件基于 P0 组件，适合用于产品、方案、行业、服务页面。

| 组件 | 建议路径 | 可覆盖现有位置 |
|----|----|----|
| `FeatureGridSection` | `components/common/sections/FeatureGridSection.vue` | `ProductFeatureGridSection`、DGP 核心价值、DGP 产品能力 |
| `TabCardsSection` | `components/common/sections/TabCardsSection.vue` | `TrustTabsSection`、后续 Why / Advantage 页 |
| `SplitShowcaseSection` | `components/common/sections/SplitShowcaseSection.vue` | `ServiceShowcaseSection`、`EngineLinksSection` 的左右布局基础 |
| `MediaOverlayCard` | `components/common/card/MediaOverlayCard.vue` | HOME Solutions panel、DGP Use Case panel |
| `ResourceCard` | `components/common/card/ResourceCard.vue` | HOME Insights featured / list |
| `UseCaseTabsSection` | `components/common/sections/UseCaseTabsSection.vue` | HOME Solutions、DGP Use Cases、后续行业应用页 |
| `AlternatingFeatureRows` | `components/common/sections/AlternatingFeatureRows.vue` | DGP Evolution、后续产品演进 / 能力递进区 |
| `StorySlide` | `components/common/story/StorySlide.vue` | HOME Cases slide、后续客户案例页 |
| `LogoTabs` | `components/common/tabs/LogoTabs.vue` | HOME Cases logo tabs、后续客户列表 |
| `StatGrid` / `StatCard` | `components/common/card/StatCard.vue` | HOME Cases stats、后续成果数据展示 |

### P2：复杂业务组件，确认后再抽
这些组件有较强业务视觉或动画，不建议第一轮强行公共化。

| 组件 | 当前位置 | 建议 |
|----|----|----|
| Hero 背景与内容 | `components/common/PageHero.vue` | 可拆 `HeroBackground`、`HeroContent`，但保留 `visual` slot |
| HOME Deliverables | `components/home/HomeDeliverables.vue` | 用 `CarouselRoot` + `SplitMediaCard` 重构，不先做泛化业务组件 |
| HOME Ecosystem | `components/home/HomeEcosystem.vue` | 可抽 `VisualFeatureCard`，动画仍保留业务 slot |
| Ecosystem SVG 动画 | `components/home/HomeEcosystemVisual.vue` 与 `ecosystem-visuals/*` | 只抽舞台/hover 动效，不抽具体 SVG 内容 |
| HOME Cases | `components/home/HomeCases.vue` | 先抽 carousel、tabs、slide 子件，再考虑案例区 section |
| HOME Insights | `components/home/HomeInsights.vue` | 抽 ResourceCard 后可大幅缩短 |

## 当前页面可拆位置清单
### HOME
| 区块 | 当前文件 | 可拆组件 | 优先级 |
|----|----|----|----|
| Hero + Deliverables 视频外层 | `pages/index.vue` | `HeroVideoBackdrop` 或保留页面级 wrapper | P2 |
| Hero | `HomeHero.vue` | 可后续迁到 `PageHero` 体系，但 HOME Hero 特殊，不首批抽 | P2 |
| 三大业务方向 | `HomeDeliverables.vue` | `CarouselRoot`、`CarouselControls`、`SplitMediaCard` | P1 |
| 产品体系 | `HomeProductSystem.vue` + common product components | `SectionShell`、`SectionHeader`、`CardGrid`、`FeatureCard` | P0/P1 |
| 解决方案 | `HomeSolutions.vue` | `BaseTabs(pill)`、`CarouselRoot`、`MediaOverlayCard`、`SectionActions` | P1 |
| 生态 | `HomeEcosystem.vue` | `CardGrid`、`VisualFeatureCard`、`IconBox`、`Tag`、`CheckList` | P1/P2 |
| 客户故事 | `HomeCases.vue`、`HomeCaseSlide.vue` | `LogoTabs`、`CarouselRoot`、`StorySlide`、`StatGrid` | P1/P2 |
| 洞察资源 | `HomeInsights.vue` | `ResourceCard`、`ResourceGrid`、`SectionHeader actions slot` | P1 |
| CTA | `HomeCta.vue` + `CtaSection.vue` | `SectionShell` + `SectionHeader` + `BaseButton` | P1 |

### Why DeepTrols
| 区块 | 当前文件 | 可拆组件 | 优先级 |
|----|----|----|----|
| Hero | `WhyHero.vue` + `PageHero.vue` | `HeroBackground`、`HeroContent`、`HeroVisual` slot | P2 |
| Logo strip | `WhyHeroLogos.vue` + `HeroLogoStrip.vue` | 已合适，暂不抽 | Keep |
| Trust tabs | `TrustTabsSection.vue` | `BaseTabs(segmented)`、`CardGrid`、`FeatureCard(layout=horizontal)` | P0/P1 |
| Service reset | `ServiceShowcaseSection.vue` | `SplitShowcaseSection`、`FeatureCard(layout=horizontal)` | P1 |
| Engine links | `EngineLinksSection.vue` | `SplitShowcaseSection(reverse)`、`FeatureCard(clickable)` | P1 |
| CTA | 页面直接用 `CtaSection` | 后续接 `SectionShell` | P1 |

### 数曜·数据治理平台
| 区块 | 当前文件 | 可拆组件 | 优先级 |
|----|----|----|----|
| Hero | `DgpHero.vue` + `PageHero.vue` | `PageHero` 已复用，视觉保留 slot | Keep |
| 核心价值 | `ProductFeatureGridSection.vue` | `FeatureGridSection` + `FeatureCard` | P0/P1 |
| 产品架构 | `DgpArchitecture.vue`、`ProductSystemSection.vue`、`SystemCards.vue` | `SectionShell`、`ProductSystemFlowFrame`、`CardGrid`、`FeatureCard` | P0/P1 |
| 产品能力 | `ProductFeatureGridSection.vue` | 同核心价值 | P0/P1 |
| 企业级数据治理 | `DgpEvolutionSection.vue` | `SectionHeader`、`AlternatingFeatureRows`、`FeatureCard`、`BulletList` | P1 |
| 应用场景 | `DgpUseCasesSection.vue` | `BaseTabs(underline)`、`MediaOverlayCard` / `UseCasePanel` | P1 |
| CTA | `CtaSection.vue` | 后续接 `SectionShell` + `SectionHeader` | P1 |

## 建议 props 边界
### `SectionHeader`
```ts
interface SectionHeaderProps {
  eyebrow?: string
  title?: string
  titleId?: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  level?: 1 | 2 | 3
  titleSize?: 'hero' | 'section' | 'compact'
  subtitleSize?: 'default' | 'large'
  nowrapSubtitle?: boolean
  width?: 'default' | 'wide' | 'full'
}
```

需要右侧按钮时使用 `actions` slot，不把按钮数组写死在 header 组件中。

### `BaseCard`
```ts
interface BaseCardProps {
  as?: 'article' | 'div' | 'li'
  href?: string
  variant?: 'default' | 'feature' | 'soft' | 'product' | 'ecosystem' | 'media'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean | 'auto'
  accent?: boolean
  equalHeight?: boolean
}
```

内容通过 slots 放入：

- `icon`
- `header`
- `title`
- `description`
- `meta`
- `action`
- `visual`

### `FeatureCard`
```ts
interface FeatureCardProps {
  title: string
  description?: string
  icon?: Component
  href?: string
  layout?: 'vertical' | 'horizontal'
  titleSize?: 'sm' | 'md' | 'lg'
  descriptionSize?: 'sm' | 'md' | 'lg'
  iconSize?: 20 | 24 | 28
  iconBoxSize?: 40 | 48 | 56
  tone?: 'primary' | 'muted' | 'white' | 'gradient'
  showAccent?: boolean
}
```

如果有 button、tag、points、stats、visual，使用 slots；不要继续给 `FeatureCard` 堆大量 props。

### `BaseTabs`
```ts
interface TabItem {
  key: string
  label: string
}

interface BaseTabsProps {
  modelValue: string
  items: TabItem[]
  idPrefix: string
  label: string
  variant?: 'pill' | 'segmented' | 'underline'
  panelIdPrefix?: string
}
```

组件负责 `role="tablist"`、`role="tab"`、`aria-selected`、`aria-controls`、键盘左右切换；panel 内容仍由调用方控制。

### `CarouselRoot`
```ts
interface CarouselRootProps {
  activeIndex: number
  itemCount: number
  label: string
  transition?: 'default' | 'slow' | 'none'
}
```

组件负责 root / viewport / container 的语义和移动；slide 内容使用 slot。

## 样式层建议
在 `assets/scss/main.scss` 保留当前 `dt-card` / `dt-icon-box` 基准，并继续增加轻量文本工具类：

- `.dt-card-title--sm`：15px / 600
- `.dt-card-title--md`：20px / 700
- `.dt-card-title--lg`：24px / 700
- `.dt-card-description--sm`：14px
- `.dt-card-description--md`：16px
- `.dt-card-description--lg`：18px 或 20px
- `.dt-section-header--left|center|right`
- `.dt-section-header--default|wide|full`
- `.dt-media-card`
- `.dt-media-card__overlay`

这些 class 只定义视觉基准；布局顺序仍交给组件 props / slots。

## 不建议首批抽象的内容
- Header / Mega Menu / Footer：已有明确 EMQX 结构约束，后续单独优化。
- Ecosystem 具体 SVG 动画：保留业务视觉组件，只抽外层舞台和 hover 状态。
- HOME Hero 视频背景：当前是 HOME 特殊视觉，不作为通用 Hero 默认能力。
- ProductSystemFlowFrame 内具体流程图：保持 slot，避免公共组件依赖业务流程图。
- `data/*.ts` 文案数据：保留页面/业务数据结构，公共组件只要求字段契约。

## 推荐执行顺序
1. [x] 新增 P0 基础组件，并补测试和 Harness。
2. [x] 将 `ProductFeatureGridSection`、`SystemCards`、`ProductSystemCards` 改为基于 `BaseCard` / `IconBox` / `CardGrid`。
3. [x] 将 `TrustTabsSection`、`ServiceShowcaseSection`、`EngineLinksSection` 改为基于 P0 基础组件。
4. [x] 抽 `BaseTabs` 后迁移 Why segmented tabs、HOME Solutions pill tabs、DGP underline tabs。
5. [ ] 抽 `CarouselRoot` 后迁移 HOME Deliverables、HOME Solutions、HOME Cases。
6. 抽 `ResourceCard` / `MediaOverlayCard` / `StorySlide` 后处理 HOME Insights、HOME Cases、DGP Use Cases。
7. 最后再拆 PageHero 和 Ecosystem 复杂视觉，避免第一轮影响已验收页面。

## 验收口径
执行组件拆分时，每一步都应满足：

- 页面视觉不变化，除非需求明确允许。
- 组件保持小于 300 行。
- 全局 card 圆角 16px、icon 外框圆角 12px 不回退。
- Section header 的 eyebrow/title/subtitle/nowrap/align 可动态控制。
- Tab 和 Carousel 的 ARIA 结构不回退。
- `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm test:visual`、`pnpm harness:engineering`、`pnpm build` 通过。
