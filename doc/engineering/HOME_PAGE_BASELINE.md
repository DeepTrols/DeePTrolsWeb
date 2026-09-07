# HOME Page Baseline
> Version: 2.0
> Source Page: `pages/index.vue`
> Last Updated: 2026-09-07
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
2. 全站内容区默认使用 `--dt-container: 1200px` + `20px` 横向 padding；特殊宽区块使用 `--dt-container-wide: 1400px`。
3. 常规页面 Hero 外层 section 不写局部 padding，内部 `.container` 使用 Tailwind v4 utility `pt-[112px] pb-20 lg:pt-[132px] lg:pb-24`。
4. 常规页面 Hero 后续模块统一使用 `dt-section relative pb-20 lg:pb-[132px]`，不要在页面 scoped CSS 中重复声明 section `padding-bottom`。
5. Header 高度固定为 `62px`，使用 `fixed` 全视口顶部、白色半透明背景、`15px` backdrop blur、弱边框和轻阴影。
6. Header 是全视口宽度，内部 padding 按 DeepCtrls Header 节奏：桌面 `padding-left: 43px`、`padding-right: 61px`；普通页面内容仍使用 `.container`。
7. Header logo 使用 `/logo-while.svg`，当前宽度为 `200px`；浅色 Header 下通过样式滤镜保证可读。Footer logo 当前宽度为 `240px`。
8. Footer 使用 HOME 当前结构：订阅区、分隔线、`site-footer__main`、与 main 平级的 `site-footer__socials`、底部分隔线、备案与版权；Footer 背景为 `#191a1e`。
9. HOME Hero 与区域一共享视频背景：`public/videos/home-hero-bg.mp4`（`preload="metadata"` + 挂载后按需播放）；Hero 内不得恢复 canvas / TresJS。

---
## Typography
1. 全局字体使用 `"Noto Sans SC", "Source Han Sans CN", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`，与 `assets/scss/main.scss` 中 `:root` 保持一致。
2. Section 标题默认使用 `SectionHeading`：
   - eyebrow：`14px / 500 / uppercase`
   - title：`35px / 500 / 1.28`
   - subtitle：`15px / 27px / 400`
3. 需要桌面不换行的 subtitle 必须使用 `nowrap-subtitle` prop，不允许在页面内重复写局部规则。

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
| CTA 面板 | `.dt-cta-panel` |

禁止在新页面重复复制 `HomeCta`、`HomeCases`、`HomeInsights` 中曾经存在的局部按钮 CSS。

---
## Interaction Baseline
1. Header 主导航 DOM 保持 `div style="position:relative;" > ul > li > button`，主导航按钮内不渲染 SVG。
2. Mega Menu 只在 hover 对应按钮及面板时保持显示，离开按钮和面板后必须收回。
3. Tab 使用 `role="tablist"` / `role="tab"` / `aria-selected`。
4. Carousel 使用 `role="region"`、`aria-roledescription="carousel"`、`data-slot="root/viewport/container/item"`。
5. Hover 动画保持 `150ms-300ms`，只服务阅读和状态反馈，不做无意义装饰。

---
## Tailwind CSS v4 + SCSS Rules
1. Tailwind v4 入口为 `assets/css/tailwind.css`，使用 `@theme inline` 映射 DeepTrols token。
2. 项目语义 token 与公共组件层在 `assets/scss/main.scss` 中维护。
3. 由于当前 Nuxt 构建链路不会处理 Vue scoped SCSS 中的 `@apply`，禁止在 `assets/` 与 `components/` 中提交 `@apply`，避免产物残留无效 CSS。
4. 新页面的组件样式必须使用 `<style scoped lang="scss">`，并优先引用 `dt-*` 公共类。
5. 页面级间距优先直接在模板中使用 Tailwind v4 utilities，例如 `pt-[112px] pb-20 lg:pt-[132px] lg:pb-24`、`pb-20 lg:pb-[132px]`、`mb-12 lg:mb-16`、`grid gap-5 md:grid-cols-2 lg:gap-6`。
6. 色彩、hover、按钮、tab、卡片、标题不得在页面内重新发明。
7. 普通信息卡的外框圆角统一走 `--dt-card-radius`，icon 外层背景/边框圆角统一走 `--dt-icon-box-radius`；组件内不得再写私有 card/icon 圆角覆盖。
8. 普通信息卡不得写固定高度或固定 `min-height`；需要同一行等高时使用 grid 的 `auto-rows-fr`、`items-stretch` 与 `.dt-card--adaptive`。

---
## Documentation Rule
后续任何页面需求若与本基准冲突，必须在对应 `PAGE_REQUIREMENTS/**.md` 中明确写出“允许偏离 HOME 基准”的具体理由和范围。
