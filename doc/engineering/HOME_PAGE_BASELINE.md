# HOME Page Baseline
> Version: 2.0
> Source Page: `pages/index.vue`
> Last Updated: 2026-09-09
> Visual Reference: `https://www.deepctrls.com/deepctrls_com/`

## Purpose
后续所有 DeepTrols 官网页面，除非需求文档明确提出特殊设计，否则必须以当前 HOME 页面为视觉、结构、交互和代码复用基准。

本文件用于约束：
- 页面宽度
- DeepCtrls 浅色视觉基线
- Header / Mega Menu / Footer
- 标题层级
- 按钮、Tab、卡片、CTA
- 动画节奏
- 组件复用方式

---
## Visual Baseline
1. 页面背景使用 `#ffffff`，浅色区块使用 `#f0f5ff`，表单/轻面使用 `#edf2fa`。
2. 全站内容区默认参考 DeepCtrls 的横向 gutter 节奏：`--dt-page-gutter: clamp(48px, 13.23vw, 254px)`，`--dt-container: calc(100% - (var(--dt-page-gutter) * 2))`，容器不再使用固定 `1200px` 上限；HOME Hero 文案区（`.home-hero__content`）与其他 section 左右对齐，宽度同样使用 `--dt-container`（`--dt-hero-gutter: clamp(48px, 10.42vw, 200px)` token 保留但不再用于 Hero 文案区）。
3. 常规页面 Hero 外层 section 不写局部 padding，内部 `.container`（`.page-hero__body`）使用 Tailwind v4 utility `pt-40 pb-32 lg:pb-44`（`flushBottom` 时底部为 `pb-0 lg:pb-0`）。
4. 常规页面 Hero 后续模块遵循「Section 间距统一规则」（TASK-014.14，见 `COMMON_SECTION_COMPONENTS.md`）：section 根统一加 `flow-root pb-32 lg:pb-44`（底部 128px，lg 以上 176px，不写 pt），内部 `.container` 不携带垂直 margin；不要在页面 scoped CSS 中重复声明 section 垂直 padding，旧的 `dt-section` / `--dt-space-section(-lg)` 节奏已删除。HOME 专属例外：hero 下首个 section（`HomeDeliverables`）与 `HomeInsights` 根节点额外携带 `pt-32`，`HomeAbout` 底部收窄为 `pb-10`。
5. Header 高度固定为 `62px`，使用 `fixed` 全视口顶部，层级为 `z-index: 1000`；所有页面顶部默认透明并使用白色 Logo，滚动、Mega 展开或移动菜单展开时切换为白色半透明背景与黑色 Logo。`is-in-hero` 只用于识别 HOME Hero 区域，不再触发深色半透明 Header 背景。
6. Header 是全视口宽度，内部 padding 按 DeepCtrls Header 节奏：桌面 `padding-left: 43px`、`padding-right: 61px`；普通页面内容仍使用 `.container`。
7. Header logo 使用运行时品牌图：所有页面顶部透明状态为 `/images/brand/deeptrols-logo-white.png`，滚动、Mega 展开或移动菜单展开时为 `/images/brand/deeptrols-logo-black.png`；Header logo 高度按参考站为 `35px`。Footer logo 当前宽度为 `240px`。
8. Footer 使用 HOME 当前结构：订阅区、分隔线、`site-footer__main`、与 main 平级的 `site-footer__socials`、底部分隔线、备案与版权；Footer 背景为 `#191a1e`。
9. HOME Hero 参考 DeepCtrls 首页首屏：`aspect-ratio: 1920 / 655`，使用 `/images/home/deepctrls-hero-ai.png` 作为背景图并叠加左侧黑色线性遮罩；Hero 与区域一不再共用视频背景，Hero 内不得恢复 canvas / TresJS。
10. HOME 当前不展示 `CUSTOMER STORIES` section；`HomeProductSystem` 当前挂载 `ProductSystemSection`、`ProductSystemFlowFrame` 架构占位框与 `ProductSystemCards`，不得在 `product-system__content` 中恢复旧桌面或移动端流程图，待流程图重新设计后再单独接入。
11. HOME 在 `Ecosystem` 与 `Resources` 之间挂载 `components/home/HomeAbout.vue`。该区块参考 DeepCtrls 首页公司与合作客户区域：白色到浅蓝渐变背景、居中 SectionHeading、`/O1CN0.png` 宽幅 banner、`/clients-label.webp` 客户标签，以及三行 `partner-rows` 走马灯。组件必须保持 Tailwind-only，不写 `<style>`；走马灯动画 token 维护在 `assets/css/tailwind.css`。
12. HOME About 标题不要主动插入换行，保持完整标题一行排版；窄屏仅允许浏览器按容器宽度自然换行。About section 遵循「Section 间距统一规则」，但底部间距按 HOME 专属节奏收窄为 `pb-10`：根节点 `flow-root pb-10`，内部 `.container` 仅保留 `mb-10` 与底部走马灯分隔，渐变背景完整覆盖底部间距区域；下方 `Resources` section 同样按统一规则渲染。

---
## Typography
1. 全局字体使用 `"Source Han Sans CN", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`，与 `assets/scss/main.scss` 中 `:root` 保持一致。
2. Section 标题默认使用 `SectionHeading`：
   - eyebrow：`14px / 500 / uppercase`
   - title：`35px / 500 / 1.28`
   - subtitle：`15px / 27px / 400`
3. 所有 section 标题默认不得主动换行：公共 `SectionHeader` 与 `.dt-section-title` 在桌面端必须保持 `white-space: nowrap`；少数未使用公共标题组件的 section 标题必须显式补充 Tailwind v4 `whitespace-nowrap`。
4. 需要桌面不换行的 subtitle 必须使用 `nowrap-subtitle` prop，不允许在页面内重复写局部规则。

---
## Reusable Components
后续页面必须优先复用以下公共入口：

| 场景 | 入口 |
|----|----|
| 主按钮 / 次按钮 / 图标箭头按钮 | `components/common/BaseButton.vue` |
| Section 标题 | `components/common/SectionHeading.vue` |
| 通用按钮样式 | `.dt-button`、`.dt-button--primary`、`.dt-button--secondary`、`.dt-button--ghost` |
| Tab 列表 | `.dt-tab-list` + `.dt-tab` |
| Why / 对比页圆角分段 Tab | `.dt-segmented-tabs` + `.dt-segmented-tab` |
| 全局信息卡基准 | `.dt-card` + `.dt-card--adaptive`，统一 card 圆角、hover、边框与自适应高度 |
| DGP / 能力类卡片 | `.dt-card dt-card--adaptive dt-card--feature` + `.dt-card__accent` + `.dt-icon-box dt-icon-box--gradient` |
| 平台能力卡片 | `.dt-product-card dt-card--adaptive` + `.dt-product-card__accent` + `.dt-icon-box` |
| 轻量链接 / 服务卡片 | `.dt-card dt-card--soft` + `.dt-icon-box` |
| Ecosystem 卡片 | `.dt-ecosystem-card` + `.dt-card-tag` + `.dt-icon-box` |
| HOME 关于我们 | `components/home/HomeAbout.vue` + `data/home.ts` 的 `homeAbout` |
| 页面底部 CTA | `components/common/CtaSection.vue` + `.home-contact-cta` |

禁止在新页面重复复制 `HomeCta`、`HomeCases`、`HomeInsights` 中曾经存在的局部按钮 CSS。页面底部 CTA 默认使用 DeepCtrls 风格 `home-contact-cta` 横幅，背景图固定为 `/contact-cta-banner.webp`，`.home-contact-cta__inner` 使用 `var(--dt-container)` 与页面内容左边缘对齐，标题为“以 AI 重塑数字世界与物理世界”，三项指标为“新一代智能基础设施 / 四大智能技术底座 / 覆盖关键产业场景”，按钮为“免费获取专属方案”。该 CTA 只能在组件模板内使用 Tailwind CSS v4 工具类表达尺寸、背景、定位、hover 与响应式，不允许新增独立 CTA SCSS 文件或组件私有 style。HOME 的 Use Cases section 使用默认页面背景 `var(--dt-color-bg)`。

HOME 关于我们区块的数据必须集中在 `data/home.ts`：eyebrow 为“关于我们”，标题为“深度数智，企业AI基础设施赛道的构建者与引领者”，banner 使用 `/O1CN0.png`，客户标签使用 `/clients-label.webp`。三行合作方 logo 走马灯使用 Tailwind v4 animation token `animate-home-about-marquee-left/right`，不得在组件 scoped CSS 内重复定义 keyframes。标题由 `HomeAbout.vue` 直接渲染完整数据原文，不在展示层主动插入换行。

---
## Interaction Baseline
1. Header 主导航 DOM 保持 `div style="position:relative;" > ul > li > button`，主导航按钮内不渲染 SVG。
2. Mega Menu 只在 hover 对应按钮及面板时保持显示，离开按钮和面板后必须收回。Mega 参考 DeepCtrls：左侧 `.mega-title`，右侧文字入口；核心产品使用 `.mega-cols` 双栏联动（`.mega-col--categories` 品类栏 hover/focus 切换 `.mega-col--links` 产品栏；面板打开按当前路由激活对应品类，无匹配时激活第一个品类；品类栏不含 `核心产品` 入口），解决方案使用 `.mega-solutions` 横向 `4 × 2` 网格，`hot` 标签随标题 inline-flex 排版、紧贴标题文字右上角。条目标题 `24px / 35px`，描述 `14px / 16px`，hover/focus/active 仅将标题切换为蓝色，不使用图标卡片。
3. Tab 使用 `role="tablist"` / `role="tab"` / `aria-selected`。
4. Carousel 使用 `role="region"`、`aria-roledescription="carousel"`、`data-slot="root/viewport/container/item"`。
5. Hover 动画保持 `150ms-300ms`，只服务阅读和状态反馈，不做无意义装饰。

---
## Tailwind CSS v4 + SCSS Rules
1. Tailwind v4 入口为 `assets/css/tailwind.css`，使用 `@theme inline` 映射 DeepTrols token。
2. 项目语义 token 与公共组件层在 `assets/scss/main.scss` 中维护。
3. 由于当前 Nuxt 构建链路不会处理 Vue scoped SCSS 中的 `@apply`，禁止在 `assets/` 与 `components/` 中提交 `@apply`，避免产物残留无效 CSS。
4. 新页面的组件样式必须使用 `<style scoped lang="scss">`，并优先引用 `dt-*` 公共类。
5. 页面级间距优先直接在模板中使用 Tailwind v4 utilities，例如 Hero 容器 `pt-40 pb-32 lg:pb-44`、常规 section 根 `flow-root pb-32 lg:pb-44`、`mb-12 lg:mb-16`、`grid gap-5 md:grid-cols-2 lg:gap-6`。
6. 色彩、hover、按钮、tab、卡片、标题不得在页面内重新发明。
7. 普通信息卡的外框圆角统一走 `--dt-card-radius`，icon 外层背景/边框圆角统一走 `--dt-icon-box-radius`；组件内不得再写私有 card/icon 圆角覆盖。
8. 普通信息卡不得写固定高度或固定 `min-height`；需要同一行等高时使用 grid 的 `auto-rows-fr`、`items-stretch` 与 `.dt-card--adaptive`。

---
## Documentation Rule
后续任何页面需求若与本基准冲突，必须在对应 `PAGE_REQUIREMENTS/**.md` 中明确写出“允许偏离 HOME 基准”的具体理由和范围。
