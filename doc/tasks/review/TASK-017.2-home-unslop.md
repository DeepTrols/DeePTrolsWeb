# TASK-017.2 HOME Unslop 视觉收敛

## 状态

Review

## 目标

使用 `unslop` 工作流程对 HOME 首页执行一次完整视觉收敛，在不改变内容顺序、不删除 Flow 与能力动画、不影响其他页面的前提下，减少 AI 模板感与视觉噪声。

## 约束

- 保留 HOME 现有区块顺序与全部业务文案。
- 保留产品架构 Flow、能力动画及必要的状态动效。
- 不修改共享组件的默认视觉；必要时只增加 HOME 专用可选变体。
- 不修改其他页面的排版、颜色、交互与内容。
- 遵守 Tailwind CSS v4、SCSS、Design Token 与 Harness Engineering 约束。

## Unslop Direction

- **Product**：为企业连接数据、知识、设备、模型与业务系统的 AI 基础设施。
- **Character**：克制、精确、工程化。
- **World**：生产控制台、数据链路、知识网络与业务运行现场。
- **Moments**：产品架构 Flow 与真实能力运行面板承担主要色彩和动态。
- **Signature**：“数据 → 知识 → 智能 → 执行”的闭环连接线。

## 审计摘要

- Hero 泛化 AI 发光视觉、渐变标题与渐变按钮同时抢占注意力。
- 通用卡片存在彩色阴影、顶部渐变线、上浮等多重 hover 效果。
- Section eyebrow 普遍大写与宽字距，与新 Wordmark 的视觉语言不一致。
- 区块统一使用大间距，缺少内容密度带来的节奏差异。
- 页面已有的 Flow 和能力动画辨识度高，应成为主要视觉 Moment。

## 实施阶段

1. Spacing
2. Color
3. Icons
4. Copy（仅检查，不改业务文案）
5. Type
6. Layout
7. Details
8. Visuals
9. Motion

## 验收标准

- HOME 内容与区块顺序不变。
- Flow 与能力动画可正常交互。
- 首页色彩、字体、卡片、按钮、间距与动效明显收敛。
- 其他页面无视觉回归。
- 桌面与移动端无溢出、遮挡或布局跳动。
- 全部质量门禁通过。

## 实施记录

- Hero：降低遮罩与按钮的装饰性，去除渐变标题和发光反馈，保留原背景与文案。
- Product System：保留 Vue Flow 与网格画布，收敛标题、能力卡片和 hover，架构图继续作为首页主视觉 Moment。
- Solutions / Ecosystem / Trust：统一紧凑节奏、自然 eyebrow、低噪声边框与状态反馈。
- About / Insights / CTA：统一 4px 间距体系，去除图片缩放、渐变标题和额外阴影。
- 新增 `HomeEcosystemCard`，将生态卡片从区块编排中拆出，组件均控制在 300 行以内。
- 共享组件仅新增 opt-in 参数，默认值保持原行为，避免影响其他页面。
- 更新 HOME 视觉契约、Harness 与页面基线文档。

## 测试结果

- `pnpm lint`：通过。
- `pnpm typecheck`：通过。
- `pnpm test`：通过，46 个测试文件、531 项测试全部通过。
- `pnpm test:visual`：通过，73 项视觉契约全部通过。
- `pnpm harness:engineering`：通过。
- `pnpm build`：通过；保留项目已有 Tailwind 任意值解析警告，无新增构建失败。
- 浏览器复核：桌面首页区块顺序、Flow、生态动画、合作客户滚动与 CTA 均正常。

## 已知问题

- 当前工作区存在大量与本任务无关的未提交修改，不回退、不纳入本任务。
