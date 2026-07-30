# 代码审计报告：2026-07-30

## 审计范围
- `components/` 与 `pages/` 下的 Vue 单文件组件规模。
- Header、Mega Menu、Footer、Home Cases、Home Ecosystem Visual 等近期高频修改模块。
- SCSS、Tailwind CSS v4、Design Token、公共按钮与公共标题组件的复用情况。
- Harness Engineering 与视觉契约测试是否能阻止已发现问题回归。

## 审计结论
本轮审计发现的 P0 问题是多个核心组件超过 300 行，且 Harness Engineering 未对组件规模建立硬性约束。已通过组件拆分、数据外置和契约测试更新完成修复。

截至本报告生成时，`components/` 与 `pages/` 下 Vue 组件最高行数如下：

| 文件 | 行数 | 状态 |
|---|---:|---|
| `components/navigation/SiteHeader.vue` | 298 | 已压到上限内 |
| `components/home/HomeSolutions.vue` | 295 | 合规，后续变更需优先拆分 |
| `components/home/HomeCases.vue` | 289 | 已拆分 |
| `components/home/HomeEcosystemVisual.vue` | 287 | 已拆分 |
| `components/home/HomeInsights.vue` | 278 | 合规，后续变更需关注 |
| `components/home/HomeDeliverables.vue` | 276 | 合规，后续变更需关注 |
| `components/navigation/MegaMenuPanel.vue` | 269 | 已拆分 |

## 已修复问题
1. `SiteHeader.vue` 从约 644 行拆分为父级状态容器与 4 个子组件：
   - `SiteHeaderDesktopNav.vue`
   - `SiteHeaderActions.vue`
   - `SiteHeaderMobileNav.vue`
   - `SiteHeaderMenuButton.vue`

2. `SiteFooter.vue` 从约 630 行拆分为父级布局容器、内容组件和数据模块：
   - `FooterSubscribe.vue`
   - `FooterMain.vue`
   - `FooterSocials.vue`
   - `FooterBottom.vue`
   - `data/footer.ts`

3. `HomeEcosystemVisual.vue` 从约 551 行拆分为视觉容器、四个 SVG 子组件和几何数据模块：
   - `EcosystemTokenVisual.vue`
   - `EcosystemAgentVisual.vue`
   - `EcosystemInfraVisual.vue`
   - `EcosystemReportVisual.vue`
   - `data/ecosystemVisual.ts`

4. `HomeCases.vue` 从约 480 行拆分为轮播容器、Slide 与 Controls：
   - `HomeCaseSlide.vue`
   - `HomeCasesControls.vue`

5. `MegaMenuPanel.vue` 从约 313 行拆分出服务型 Mega Menu：
   - `MegaPanelServices.vue`

6. `tests/visual.spec.ts` 已新增 300 行组件上限检查，并将 Header、Footer、Cases、Ecosystem Visual 的断言改为匹配拆分后的职责边界。

7. `scripts/harness-check.mjs` 已新增 300 行组件上限检查，并覆盖拆分组件、Footer 数据模块、Header 子组件、Mega Menu 服务面板、Cases 子组件和 Ecosystem Visual 数据外置。

## 其他审计发现
1. Inline style：
   - 仅保留 Header 主导航要求的 `style="position:relative;"`。
   - 该例外来自 `doc/product/NAVIGATION.md` 与 HOME 基准约束，Harness 已显式放行该单点例外。

2. `@apply`：
   - 源码中未发现组件或样式文件使用 `@apply`。
   - Harness 继续阻止 `assets/scss/main.scss`、`components/`、`pages/` 中出现未处理的 `@apply`。

3. 调试代码：
   - 业务组件未发现 `console.*`、`debugger`、`TODO`、`FIXME`。
   - `scripts/harness-check.mjs` 中的 `console.error` / `console.log` 属于 CLI 输出，保留。

4. SCSS 约束：
   - `components/` 下 Vue 组件均保持 `<style scoped lang="scss">`。
   - 空样式块仅用于视觉子组件继承父级 `:deep()` 样式，不引入重复 CSS。

5. 可复用性：
   - 首页 CTA、Cases、Solutions、Insights 继续复用 `BaseButton`。
   - Cases、Insights、Solutions、Why 页面继续复用 `SectionHeading`。
   - Footer 文案和社交图标路径已集中到 `data/footer.ts`，避免布局组件承载大量配置。

## 仍需关注
1. `HomeSolutions.vue` 当前为 295 行，接近 300 行上限。后续若新增交互或卡片样式，应优先拆分为 `HomeSolutionTabs.vue` 与 `HomeSolutionPanel.vue`。
2. `HomeInsights.vue` 与 `HomeDeliverables.vue` 分别为 278 行与 276 行，仍处于可接受范围，但后续不要继续堆叠新的卡片模板。
3. `data/footer.ts` 与 `data/ecosystemVisual.ts` 包含较长静态数据，符合职责拆分目标；若未来数据增长明显，应继续拆分为按域命名的数据文件。
4. 本轮不修改未跟踪目录 `doc/product/PAGE_REQUIREMENTS/PRODUCT/`，避免污染用户正在准备的产品页需求资料。

## 回归保护
后续开发必须继续执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:visual
pnpm harness:engineering
pnpm build
```

其中 `pnpm harness:engineering` 与 `pnpm test:visual` 已覆盖本轮审计新增的组件规模与结构契约。
