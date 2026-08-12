# 公共页面区块组件

> Version: 2026-08-03

本文件约束官网后续页面复用区块的方式。除非页面需求明确提出特殊结构，否则应优先复用本文件中的公共组件，避免各页面在标题层级、间距、按钮、卡片和 hover 行为上出现偏差。

## Hero
公共组件：`components/common/PageHero.vue`

适用场景：
- Why、About、Product、Solution 等页面首屏。
- 需要 EMQX 风格背景网格、左右 glow、胶囊 eyebrow、双行标题、描述与两个 CTA 的页面。

使用要求：
- 页面组件只传入 `badge`、`titleLine`、`titleGradient`、`description`、`actions`。
- 视觉素材通过 `#visual` slot 传入。
- 默认 `visualSize` 为 `default`，右侧视觉保持产品页正常尺寸；只有 Why DeepTrols 这类明确需要放大视觉的页面可以传入 `visualSize="large"`。
- `PageHero` 不承载客户 logo；logo 必须通过独立区块渲染。

## Hero Logo Strip
公共组件：`components/common/HeroLogoStrip.vue`

适用场景：
- Hero 下方的客户 logo 或合作伙伴 logo 区域。

使用要求：
- 通过默认 slot 传入 logo 列表组件。
- 组件内部自带 `.container`，不要在页面外层重复包裹容器。
- 当 logo strip 紧跟 `PageHero` 时，Hero 应启用 `flushBottom`，由 `HeroLogoStrip` 承接底部留白。
- Why DeepTrols 当前使用 `components/why/WhyHeroLogos.vue` 接入 `HomeCustomerLogos`。

## Section Shell / Header
公共组件：
- `components/common/section/SectionShell.vue`
- `components/common/section/SectionHeader.vue`
- `components/common/SectionHeading.vue` 仅作为兼容包装入口

使用要求：
- 新区块优先直接使用 `SectionShell` + `SectionHeader`。
- `SectionShell` 负责 section 标签、container 宽度、背景和 `pb-32 lg:pb-44` 等节奏。
- `SectionHeader` 负责 eyebrow、title、subtitle、nowrap、宽度、对齐、语义标题层级和 actions slot。
- `SectionHeading` 只用于兼容既有 HOME 组件；后续新增页面不要继续扩展它。

## Card Primitives
公共组件：
- `components/common/card/BaseCard.vue`
- `components/common/card/IconBox.vue`
- `components/common/card/CardText.vue`
- `components/common/card/CardGrid.vue`
- `components/common/card/FeatureCard.vue`

使用要求：
- `BaseCard` 只负责外壳、链接语义、variant、padding、accent 和自适应高度。
- `IconBox` 统一 icon 外框圆角、尺寸和色调；不要在业务组件中重新定义 icon 外框圆角。
- `IconBox` 支持动态配置：`size` / `iconSize` 控制盒体与图标尺寸，`bordered` 控制 1px 内边框（默认 true），`filled` 控制背景色（默认 true，可与 bordered 自由组合，如「带边框无背景」）；`FeatureCard` 通过 `iconBordered` / `iconFilled` 透传，`ProductFeatureGridSection` 另透传 `iconBoxSize` / `iconSize`，挑战/功能等板块引用处可直接配置。
- `IconBox` 色调提供 `primary` / `muted` / `white` / `gradient` / `soft` 五档：`soft` 为 bg-soft 半透明底 + line 内描边，用于 hero 视觉面板等深色图标盒（如博曜 hero 卡片头部与应用模块图标）；图标本身的颜色可通过默认插槽自带 `text-*` 类保留。
- `CardText` 统一 card 标题与描述的字号层级。
- `CardGrid` 统一 2 / 3 / 4 列和 `auto-rows-fr items-stretch` 等高行为。
- `FeatureCard` 用于常规 icon + title + desc + optional action；复杂 media、stats、points 或右侧动画应继续使用 slot/业务组件组合，不把 props 做成万能组件。
- 需要数字阶段标识时，`FeatureCard` 可传入 `iconLabel`，组件仍使用 `.dt-icon-box dt-icon-box--gradient` 统一 icon 外框。

## Base Tabs
公共组件：`components/common/tabs/BaseTabs.vue`

使用要求：
- 页面通过 `v-model`、`items`、`idPrefix`、`label` 和 `variant` 使用。
- 视觉变体允许 `pill`、`segmented`、`underline`，但 ARIA、键盘左右切换、`data-slot` 结构统一由 `BaseTabs` 负责。
- Tab panel 内容仍由调用方控制，避免 `BaseTabs` 绑定业务数据结构。

## Carousel
公共组件：
- `components/common/carousel/CarouselRoot.vue`
- `components/common/carousel/CarouselControls.vue`

适用场景：
- 需要左右滑动切换的幻灯片区块（客户故事、解决方案面板等）。

使用要求：
- 轮播必须使用 `CarouselRoot`，不得在页面/业务组件内手写 `data-slot` 轨道、`data-active-slide` 位移或 translate3d 切换样式；`role="region"`、`aria-roledescription="carousel"`、`data-slot="root/viewport/container"` 语义由 `CarouselRoot` 集中承载（HOME_PAGE_BASELINE 轮播契约）。
- `CarouselRoot` 接收 `activeIndex` / `itemCount`，命名经 `label`（aria-label）或 `labelledBy`（aria-labelledby）二选一传入；过渡速度 `transition` 支持 `default`（300ms）/ `slow` / `none`，最多支持 10 张幻灯片。
- 幻灯片宽度与内容由调用方通过默认插槽控制；整屏等宽幻灯片使用 `flex: 0 0 100%`（参考 `HomeCaseSlide` / `.solutions__carousel-item`）。
- 宿主圆角与轨道对齐/负边距槽宽通过宿主类覆盖：圆角直接写在宿主类上，对齐与槽宽使用 `--dt-carousel-align`（默认 `stretch`）与 `--dt-carousel-gutter`（默认 `0px`）变量钩子，不得使用 `:deep()` 穿透 `CarouselRoot` 内部。
- 上一项/下一项按钮必须使用 `CarouselControls`（`previousLabel` / `nextLabel`，emit `previous` / `next`），按钮视觉沿用全局 `.dt-icon-button` 基线；外层布局（display/gap/响应式显隐）由调用方类控制。
- 参考实现：`HomeCases`（CarouselRoot + CarouselControls + logo tabs）、`HomeSolutions`（CarouselRoot + BaseTabs 驱动）。

## Trust Tabs
公共组件：`components/common/TrustTabsSection.vue`

适用场景：
- 多维度说明“为什么选择/为什么可信/能力优势”的 tab + 卡片区块。

使用要求：
- Tab 使用 `.dt-segmented-tabs` 与 `.dt-segmented-tab`。
- Tab 状态和 ARIA 通过 `BaseTabs(variant="segmented")` 承载。
- 卡片使用 `BaseCard(variant="product")`、`.dt-card--adaptive`、`.dt-product-card__accent`、`IconBox`。
- 卡片网格通过 `CardGrid(columns="two")` 承载，保持 `gap-5 md:grid-cols-2 lg:gap-6`。
- 卡片不得写固定 `min-height`；高度由内容和当前网格行决定。
- 每个 tab 建议 4 张卡片，保持 Why 页面基准节奏。

## Service Showcase
公共组件：`components/common/ServiceShowcaseSection.vue`

适用场景：
- 左侧标题与能力列表，右侧图像/方案图的服务说明区块。

使用要求：
- 能力列表数据通过 `items` 传入。
- 右侧图片通过 `imageSrc` 与 `imageAlt` 传入。
- 能力列表卡片必须使用 `FeatureCard(variant="soft")`。
- 不在页面内重复实现卡片 hover、圆角和间距。

## Engine Links
公共组件：`components/common/EngineLinksSection.vue`

适用场景：
- 左侧链接卡片，右侧说明文字的资源/引擎/方法论推荐区块。

使用要求：
- 链接数据通过 `links` 传入。
- 右侧标题区继续使用 `SectionHeader`。
- 链接卡片必须使用 `BaseCard(variant="soft")`；icon 外框必须使用 `IconBox`。
- 链接卡片 hover 上移由全局 `.dt-card` 统一控制，局部组件只保留 glow 动效。

## Card Radius And Height
适用范围：
- 带 icon 的普通信息卡、能力卡、链接卡、产品阶段卡。
- 不包含 Solutions、Cases、Insights、Deliverables 等媒体卡、走马灯卡或视觉展示面板。

使用要求：
- Card 外框圆角统一走全局变量：`--dt-card-radius: var(--dt-radius-lg)`，实际为 16px。
- Icon 外框圆角统一走全局变量：`--dt-icon-box-radius: var(--dt-radius-md)`，实际为 12px。
- 普通信息卡不得写固定高度或固定 `min-height`；需要同一行等高时使用 grid 的 `auto-rows-fr`、`items-stretch` 与 `.dt-card--adaptive`。
- 普通信息卡 hover 统一走 `.dt-card` / `.dt-product-card` / `.dt-ecosystem-card`，不要在组件内重复写 `transform`、`border-color`、`box-shadow`。
- 功能卡默认使用 `.dt-card dt-card--adaptive dt-card--feature`；轻量链接/服务卡使用 `.dt-card dt-card--soft`。
- Icon 外框统一使用 `.dt-icon-box`；需要 DGP 式渐变背景时增加 `.dt-icon-box--gradient`。
- 生态卡使用 `.dt-ecosystem-card` 时也必须遵守同一圆角、hover 和高度基准。

## Product System
公共组件：`components/common/ProductSystemSection.vue`

适用场景：
- 产品体系、平台体系、能力架构类区块。

使用要求：
- `ProductSystemSection` 只负责 section 背景、`.container`、`SectionHeader` 与内容布局。
- 桌面流程图外框使用 `components/common/ProductSystemFlowFrame.vue`，具体流程图由页面或业务组件传入。
- HOME 当前 VueFlow 由 `components/home/HomeProductSystemFlow.vue` 组合 `ProductSystemFlowFrame` 与 `EnterpriseFlow.client.vue`。
- HOME 移动端输入输出结构由 `components/home/HomeProductSystemMobileFlow.vue` 承载，不写入公共 section。
- 底部卡片使用 `components/common/ProductSystemCards.vue`，由 `CardGrid`、`BaseCard`、`IconBox` 组合，并保持 `.dt-product-card`、`.dt-card--adaptive`、`.dt-product-card__accent`、`.dt-icon-box`。
- 公共 section 不得直接依赖 `EnterpriseFlow.client.vue`、VueFlow、流程图 fallback、移动端输入输出数据或卡片循环。

## Product Feature Grid
公共组件：`components/common/ProductFeatureGridSection.vue`

适用场景：
- 产品页的核心价值、产品能力、优势能力等“标题 + 卡片网格”区块。
- DGP 当前用于“核心价值”和“产品能力”。

使用要求：
- 必须传入 `eyebrow`、`title`、`titleId`、`subtitle` 与 `items`。
- `items` 可传入 `icon`，产品页卡片应默认带 icon，保持 FlowMQ 式图标盒。
- 默认四列节奏为 `grid gap-5 lg:gap-6`、`md:grid-cols-2 lg:grid-cols-4`；需要三张应用场景卡片时可使用 `columns="three"`；需要 2×2 卡片时使用 `columns="two"`。
- 卡片必须通过 `FeatureCard` 组合 `BaseCard` 与 `IconBox`，最终使用 `.dt-card dt-card--adaptive dt-card--feature` 与 `.dt-icon-box dt-icon-box--gradient`。
- 需要在卡片网格后追加流程图、说明图等内容时，使用 `#after` slot，避免重复手写 section/header/card-grid 结构。
- 需要在卡片网格前放置流程图、架构图等内容时，使用 `#before` slot；例如 DMS “监管流程”先展示流程占位，再展示阶段卡片。
- 卡片不得使用固定高度；通过 `auto-rows-fr`、`items-stretch` 与 `.dt-card--adaptive` 共同决定同一网格内的卡片高度。
- 产品页特性区块默认不使用 `pt-24`，区块之间只保留 `pb-32 lg:pb-44` 节奏。
- 组件只使用 Tailwind CSS v4 utility class，不新增 `<style>`。

## System Cards
公共组件：`components/common/SystemCards.vue`

适用场景：
- 产品架构、能力阶段、平台阶段等 3 列阶段说明卡片。
- 可作为 `ProductSystemSection` 默认 slot 的内容；如页面有自定义流程图，应在 slot 中自行组合流程图与 `SystemCards`。

使用要求：
- 根布局通过 `CardGrid(columns="three" gap="sm")` 承载，并在调用处保留 `mt-10 lg:mt-12`。
- 卡片通过 `FeatureCard` 保持 `.dt-card dt-card--adaptive dt-card--feature` 与 `.dt-icon-box dt-icon-box--gradient`，圆角、边框、hover 和高度自适应均由全局类控制。
- 卡片不得使用固定高度；架构区需要流程图背景但暂不引入流程图时，必须先组合 `ProductSystemFlowFrame` 作为占位。
- 组件只接收 `cards` 数据，不包含产品页专属文案。
- 组件只使用 Tailwind CSS v4 utility class，不新增 `<style>`。

## Alternating Narrative Rows

公共组件：`components/common/AlternatingTimelineSection.vue`

适用场景：
- 产品页中类似 EMQX Edge / EMQX 产品页的左右交错叙事区块，例如 DLP “核心能力”、DGP “企业级数据治理”。
- 需要中轴编号、左右交错文字与视觉占位的核心能力区，例如 DLP / DDP。

使用要求：
- 顶部标题继续使用 `SectionHeader` 默认 eyebrow 样式，不在业务组件里覆盖为小号或私有色调。
- 内容行使用 `grid gap-6 lg:grid-cols-2 lg:gap-12` 与左右交错的 `lg:col-start-*` 控制排版。
- 文字侧必须是纯文本块，例如 `py-4 lg:py-8`，不得套 `BaseCard`、`.dt-card` 或 `IconBox`。
- 分类标签可使用 `rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[13px] font-semibold text-primary/80`。
- 视觉侧按需求放置真实图片、动画或占位图；缺失素材时可使用 Tailwind-only 占位，不加卡片边框。

## Compatibility Grid
公共组件：`components/common/CompatibilityGridSection.vue`

适用场景：
- 国产化适配、协议/环境兼容等「兼容性目录」区块（EMQX tables 式分类 icon 网格）。

使用要求：
- 必须传入 `eyebrow`、`title`、`titleId`、`subtitle`、`categories`；`categories` 为 `{ key, title, items: { label, icon }[] }` 分类数组，`icon` 传图片资源 URL（`?url` 导入）。
- 分类卡一行 3 个（`CardGrid(columns="three")`），同行等高；分类标题统一为 uppercase 小号标题，不得在业务组件内重写。
- 条目的 icon 外框必须使用 `IconBox`（`tone="soft"`：`color-mix(in oklab, var(--dt-color-bg-soft) 50%, transparent)` 半透明底 + line 内描边，等价于设计稿的 `--ui-bg-muted` 50% 底），logo 图片经默认插槽以 `<img :src>` 传入并保持足够尺寸（40px 盒内不小于 32px）；不要在业务组件中重新定义 icon 外框圆角或底色。
- 分类卡外壳使用 `border-muted` + `bg-dt-bg-soft/30` 半透明面板与 `rounded-2xl` 圆角；条目行使用 `border-muted` / `bg-default`，hover 仅允许 `border-primary/30` / `bg-primary/5`，不得另写卡片 hover。
- 组件只使用 Tailwind CSS v4 utility class，不新增 `<style>`。
- 参考实现：knowledge-base「国产化适配」区块（`boyaoCompatibilityCategories`）。

## CTA
公共组件：`components/common/CtaSection.vue`

适用场景：
- 页面底部行动号召。

使用要求：
- 使用 `dt-cta-panel` 与 `BaseButton`。
- 页面只传入标题、描述和按钮数组。
- 不在页面内复制 CTA panel 样式。

## 质量约束
- 所有公共区块组件必须小于等于 300 行。
- 公共区块组件必须使用 `<script setup lang="ts">`；需要新增组件样式时必须使用 `<style scoped lang="scss">`，Tailwind-only 组件可以不声明 `<style>`。
- 禁止在公共组件中使用未处理的 `@apply`。
- 禁止新增 inline style。Header 主导航规定的 `style="position:relative;"` 是唯一例外。
- 修改公共区块后必须执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:visual
pnpm harness:engineering
pnpm build
```
