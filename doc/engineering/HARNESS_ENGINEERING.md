# Harness Engineering
> Version: 1.0
> Last Updated: 2026-08-03

## Purpose
Harness Engineering 是 DeepTrols 官网开发的执行约束：每次任务都必须先读取任务与产品文档，再修改代码；修改后必须通过可执行检查，避免“只凭视觉猜测”和“文档、代码、测试脱节”。

---
## Required Flow
每次开发必须按以下顺序执行：

1. Read Task：读取当前 `doc/tasks/**` 任务文件。
2. Read Documents：读取本任务引用的产品与工程文档。
3. Analyze：检查现有代码结构、复用入口、风险点。
4. Implement：只修改与任务有关的代码。
5. Test：执行质量门禁。
6. Fix：修复检查失败项。
7. Update Task：更新任务实现内容、测试结果、已知问题。
8. Git：在仓库可用时 commit 并 push。

---
## Required Documents
涉及官网页面或样式的任务必须读取：
- `AGENTS.md`
- `doc/tasks/README.md`
- 当前任务文件
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- 对应 `doc/product/PAGE_REQUIREMENTS/**`
- `doc/product/NAVIGATION.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`

---
## Quality Gates
任务完成前必须执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:visual
pnpm build
pnpm harness:engineering
```

如任一命令失败，不得将任务标记为完成。

---
## Engineering Rules
1. 公共视觉能力必须沉淀到 `components/common` 或 `assets/scss/main.scss` 的 `dt-*` 公共层。
2. 页面组件不得重复实现按钮、Tab、标题、CTA、平台卡片和生态卡片。
3. 所有 Vue 组件样式必须使用 `<style scoped lang="scss">`。
4. 禁止新增 inline style。当前唯一例外是 Header 主导航为复刻导航 DOM 所需的 `style="position:relative;"`。
5. 禁止在 `assets/` 和 `components/` 中提交 `@apply`，当前构建链路不会处理它。
6. Header、Footer、section 宽度、字号、hover、圆角、按钮、tab 和卡片默认遵循 HOME 基准。
7. 如果确需偏离，必须先更新页面需求文档并说明理由。
8. Why/Home/DGP 已抽离的 Hero、Logo Strip、Trust Tabs、Service Showcase、Engine Links、Product System、Product Feature Grid、CTA 必须优先复用公共组件。
9. Section、Card、Tabs、Carousel 的基础语义与视觉基线必须优先落到 `SectionShell`、`SectionHeader`、`BaseCard`、`IconBox`、`CardText`、`CardGrid`、`FeatureCard`、`BaseTabs`、`CarouselRoot`、`CarouselControls`。

---
## Harness Script
`pnpm harness:engineering` 会检查：
- Tailwind v4 theme bridge 是否存在。
- 公共 `dt-*` 类是否存在。
- `BaseButton`、`SectionHeader`、`SectionHeading` 兼容入口是否提供必需 DOM/props。
- Section/Card/Tabs/Carousel 公共基础组件是否存在并承载视觉、ARIA 与交互契约。
- 公共页面区块组件是否存在并被页面封装组件复用。
- HOME 关键模块是否复用公共入口。
- 组件是否使用 SCSS，是否存在非法 inline style。
- 是否存在未处理的 `@apply`。
- Vue 组件是否超过 300 行。
- 当前任务与基准文档是否存在。

该脚本不能替代浏览器视觉验收，但可以防止基础工程约束失效。
