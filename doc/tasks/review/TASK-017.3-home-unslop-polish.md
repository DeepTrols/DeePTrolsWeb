# TASK-017.3 HOME Unslop 精修

## 状态

Review

## 目标

在 TASK-017.2 的基础上对 HOME 首页执行第二轮轻度 Unslop，修复仍显模板化或信息表达不足的细节，不改变区块顺序、业务内容、Flow 和能力动画。

## Direction

- **Product**：连接企业数据、知识、设备、模型与业务系统的 AI 基础设施。
- **Character**：克制、精确、工程化。
- **World**：数据链路、知识网络与业务运行现场。
- **Moments**：产品架构 Flow 与真实能力运行面板。
- **Signature**：数据 → 知识 → 智能 → 执行的闭环连接关系。

## 审计

- Hero 标题行高偏松，主按钮面积和高饱和蓝色抢占视觉焦点。
- 生态卡片只有 hover 后才显露动作，默认视觉过淡且留白偏大。
- Trust 区块与相邻区块仍沿用同一套大间距，页面节奏缺少层次。
- Resources 主卡桌面端只显示图片，核心内容不可见。
- CTA 使用整块高饱和蓝色，与架构 Flow 争夺主要视觉 Moment。

## 约束

- 不改变首页区块顺序及文案。
- 不删除或重构 Flow、动态 Edge、能力动画和客户 Logo 滚动。
- 共享组件仅允许通过 HOME opt-in 变体调整。
- 不影响其他页面。

## 验收

- 首页主要视觉焦点清晰，Flow 与内容优先于装饰。
- 桌面与移动端信息完整，无溢出和遮挡。
- 所有质量门禁通过。

## 实施记录

- Hero：移除冲突的旧 padding 工具类，修复 CTA 被 Flex 从 44px 压缩到 18px 的问题；收紧标题行高并改为安静的浅色主按钮。
- Ecosystem：卡片统一 24px 内边距，提高静态架构线可见度，动作入口默认保持低对比可见。
- Trust：HOME 变体收紧标题区和卡片间距，不改变其他页面默认样式。
- Resources：新增 `HomeInsightsHeader`，并在桌面主资源卡上恢复可见标题与摘要层。
- CTA：通过 HOME 专用遮罩降低高饱和蓝色面积，主按钮与 Hero 形成一致的控件语言。
- Flow、动态 Edge、能力动画、客户 Logo 滚动和区块顺序均保持不变。

本轮使用 Damir Sokolovsky（[@heydamir](https://x.com/heydamir)）创建的 Unslop 方法，依据 CC BY 4.0 使用。

## 测试结果

- `pnpm lint`：通过。
- `pnpm typecheck`：通过。
- `pnpm test`：通过，46 个测试文件、531 项测试全部通过。
- `pnpm test:visual`：通过，73 项视觉契约全部通过。
- `pnpm harness:engineering`：通过。
- `pnpm build`：通过；仅保留项目已有 Tailwind 任意值解析警告。
- 浏览器复核：Hero、Resources 与 CTA 桌面视觉正常，CTA 实际高度恢复为 44px。
