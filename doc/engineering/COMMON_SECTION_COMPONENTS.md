# 公共页面区块组件

> Version: 2026-07-31

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

## Trust Tabs
公共组件：`components/common/TrustTabsSection.vue`

适用场景：
- 多维度说明“为什么选择/为什么可信/能力优势”的 tab + 卡片区块。

使用要求：
- Tab 使用 `.dt-segmented-tabs` 与 `.dt-segmented-tab`。
- 卡片使用 `.dt-product-card`、`.dt-product-card__accent`、`.dt-icon-box`。
- 卡片网格固定为 `grid gap-5 md:grid-cols-2 lg:gap-6`。
- 每个 tab 建议 4 张卡片，保持 Why 页面基准节奏。

## Service Showcase
公共组件：`components/common/ServiceShowcaseSection.vue`

适用场景：
- 左侧标题与能力列表，右侧图像/方案图的服务说明区块。

使用要求：
- 能力列表数据通过 `items` 传入。
- 右侧图片通过 `imageSrc` 与 `imageAlt` 传入。
- 不在页面内重复实现卡片 hover、圆角和间距。

## Engine Links
公共组件：`components/common/EngineLinksSection.vue`

适用场景：
- 左侧链接卡片，右侧说明文字的资源/引擎/方法论推荐区块。

使用要求：
- 链接数据通过 `links` 传入。
- 右侧标题区继续使用 `SectionHeading`。
- 链接卡片 hover 上移和 glow 效果由公共组件统一控制。

## Product System
公共组件：`components/common/ProductSystemSection.vue`

适用场景：
- 产品体系、平台体系、能力架构类区块。

使用要求：
- `ProductSystemSection` 只负责 section 背景、`.container`、`SectionHeading` 与内容布局。
- 桌面流程图外框使用 `components/common/ProductSystemFlowFrame.vue`，具体流程图由页面或业务组件传入。
- HOME 当前 VueFlow 由 `components/home/HomeProductSystemFlow.vue` 组合 `ProductSystemFlowFrame` 与 `EnterpriseFlow.client.vue`。
- HOME 移动端输入输出结构由 `components/home/HomeProductSystemMobileFlow.vue` 承载，不写入公共 section。
- 底部卡片使用 `components/common/ProductSystemCards.vue`，并保持 `.dt-product-card`、`.dt-product-card__accent`、`.dt-icon-box`。
- 公共 section 不得直接依赖 `EnterpriseFlow.client.vue`、VueFlow、流程图 fallback、移动端输入输出数据或卡片循环。

## Product Feature Grid
公共组件：`components/common/ProductFeatureGridSection.vue`

适用场景：
- 产品页的核心价值、产品能力、优势能力等“标题 + 卡片网格”区块。
- DGP 当前用于“核心价值”和“产品能力”。

使用要求：
- 必须传入 `eyebrow`、`title`、`titleId`、`subtitle` 与 `items`。
- `items` 可传入 `icon`，产品页卡片应默认带 icon，保持 FlowMQ 式图标盒。
- 默认四列节奏为 `grid gap-5 lg:gap-6`、`md:grid-cols-2 lg:grid-cols-4`。
- 卡片不得使用固定高度；通过 `auto-rows-fr`、`h-full` 与内容高度共同决定同一网格内的卡片高度。
- 产品页特性区块默认不使用 `pt-24`，区块之间只保留 `pb-32 lg:pb-44` 节奏。
- 组件只使用 Tailwind CSS v4 utility class，不新增 `<style>`。

## System Cards
公共组件：`components/common/SystemCards.vue`

适用场景：
- 产品架构、能力阶段、平台阶段等 3 列阶段说明卡片。
- 可作为 `ProductSystemSection` 默认 slot 的内容；如页面有自定义流程图，应在 slot 中自行组合流程图与 `SystemCards`。

使用要求：
- 根布局保持 `mt-10 grid auto-rows-fr items-stretch gap-4 md:grid-cols-3 lg:mt-12`。
- 卡片保持 `rounded-2xl border border-dt-line`、`hover:border-dt-primary/40` 的公共 hover 节奏。
- 卡片不得使用固定高度；架构区需要流程图背景但暂不引入流程图时，必须先组合 `ProductSystemFlowFrame` 作为占位。
- 组件只接收 `cards` 数据，不包含产品页专属文案。
- 组件只使用 Tailwind CSS v4 utility class，不新增 `<style>`。

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
