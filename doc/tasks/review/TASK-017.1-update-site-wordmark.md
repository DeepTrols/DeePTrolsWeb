# TASK-017.1 更新官网品牌 Wordmark

## 状态

Review

## 需求

- 将官网 Header 与 Footer 的 DeepTrols Logo 更换为新版英文椭圆 Wordmark。
- Header 保留现有明暗状态自动切换逻辑。
- 不影响产品架构图中的图标型 Logo。

## 相关文档

- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/NAVIGATION.md`
- `doc/product/BRAND_GUIDE.md`

## 实施计划

1. 将用户提供的明暗 Wordmark 迁移到 `public/images/brand/` 并优化输出尺寸。
2. 更新 Header 的状态 Logo 映射与 Footer Logo。
3. 同步 HOME 视觉基准与导航文档。
4. 执行质量门禁并进行浏览器验证。

## 验收标准

- 透明深色 Hero 上显示浅色 Wordmark。
- 浅色页面、滚动、Header hover 及 Mega Menu 展开时显示深色 Wordmark。
- Footer 在深色背景上显示浅色 Wordmark。
- Logo 不拉伸、不变形、不引起 Header 布局跳动。

## 实施记录

- 将用户提供的 `7737×1482` 透明 PNG 等比优化为 `2400×459` 运行时资产：
  - `public/images/brand/deeptrols-wordmark-light.png`
  - `public/images/brand/deeptrols-wordmark-dark.png`
- Header 保留原有状态切换逻辑，更新为新版明暗 Wordmark。
- Footer 在深色背景上统一使用浅色 Wordmark。
- 同步视觉基准、资产边界、导航需求、HOME 需求及自动化契约。
- Why 页流程图内部的 `/logo-while.svg` 保持不变，避免影响产品视觉。

## 测试结果

- `pnpm lint`：通过。
- `pnpm typecheck`：通过。
- `pnpm test`：通过，46 个测试文件 / 531 项测试。
- `pnpm test:visual`：通过，73 项视觉契约测试。
- `pnpm harness:engineering`：通过。
- `pnpm build`：通过。
- 浏览器验收：首页顶部浅色 Logo 、滚动后深色 Logo 及 Footer 资产加载正常，无拉伸或 Header 布局跳动。

## 已知问题

- 当前工作区存在大量与本任务无关的未提交修改，本任务不会回退或纳入这些变更。
- 生产构建仍输出与本任务无关的既有 Tailwind 任意值 CSS 警告，不影响本次构建成功。
