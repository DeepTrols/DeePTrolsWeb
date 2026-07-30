# HOME Page Baseline
> Version: 1.0
> Source Page: `pages/index.vue`
> Last Updated: 2026-07-30

## Purpose
后续所有 DeepTrols 官网页面，除非需求文档明确提出特殊设计，否则必须以当前 HOME 页面为视觉、结构、交互和代码复用基准。

本文件用于约束：
- 页面宽度
- 深色主色调
- Header / Mega Menu / Footer
- 标题层级
- 按钮、Tab、卡片、CTA
- 动画节奏
- 组件复用方式

---
## Visual Baseline
1. 页面背景使用 `#151515`，不得新增浅色 `section--light` 白底区域。
2. 内容区默认使用项目 `.container` 断点：移动端 `1rem` padding，桌面按 Tailwind container 节奏，宽屏最大 `96rem` 仅用于客户故事等特殊宽屏模块。
3. Header 高度固定为 `72px`，使用 `bg-default/95` 等效深色背景、弱边框、`backdrop-blur` 与轻阴影。
4. Header container 必须与页面内容宽度一致，不允许单独猜测宽度。
5. Header logo 使用 `/logo-while.svg`，当前宽度为 `200px`；Footer logo 当前宽度为 `240px`。
6. Footer 使用 HOME 当前结构：订阅区、分隔线、`site-footer__main`、与 main 平级的 `site-footer__socials`、底部分隔线、备案与版权。
7. Hero 与区域一共享视频背景：`public/花瓣素材_+暖蓝光泄漏背景可循环_465316undefined (1) 2.mp4`；Hero 内不得恢复 canvas / TresJS。

---
## Typography
1. 全局字体使用系统 sans-serif，与 `assets/scss/main.scss` 中 `:root` 保持一致。
2. Section 标题默认使用 `SectionHeading`：
   - eyebrow：`16px / 600 / uppercase`
   - title：`36px`，`sm` 起 `48px`，`line-height: 1.2`
   - subtitle：默认 `18px`，`md` 起 `20px`
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
| EMQX Platform 风格能力卡片 | `.dt-product-card` + `.dt-product-card__accent` + `.dt-icon-box` |
| Ecosystem 卡片 | `.dt-ecosystem-card` + `.dt-card-tag` |
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
5. 色彩、hover、按钮、tab、卡片、标题不得在页面内重新发明。

---
## Documentation Rule
后续任何页面需求若与本基准冲突，必须在对应 `PAGE_REQUIREMENTS/**.md` 中明确写出“允许偏离 HOME 基准”的具体理由和范围。
