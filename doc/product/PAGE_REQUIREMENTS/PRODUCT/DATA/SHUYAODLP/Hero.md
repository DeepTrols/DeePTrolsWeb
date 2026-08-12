# product/data/dlp
> 数曜·数据标签平台page-hero__visual     

参考 EMQX Tables Hero 右侧动画组件进行 1:1 内容适配。

参考页面：https://www.emqx.com/zh/cloud/emqx-tables

严格保留原组件：

* DOM 层级
* 整体宽高
* 卡片尺寸
* 圆角
* Border
* Shadow
* Glow
* Padding / Gap
* 字体大小
* Tab 布局
* 表格布局
* 动画效果
* 动画时序
* 高亮状态
* 响应式行为

不重新设计 UI，不调整现有布局，仅替换业务内容、数据及动画语义。

将原来的：

数据摄取 → 数据存储 → 数据查询

调整为：

原始数据 → 标签生成 → 标签存储 → 标签查询

通过两个 Tab 展示数曜·数据标签平台最核心的业务闭环：

标签生成 / 标签查询

- EMQX Tables 调整为 数曜·数据标签平台
- 数据摄取 数据查询 调整为 标签生成 标签查询 默认选中 标签生成
- Tab 01：标签生成 中 实时数据摄取  3 主题 修改为 实时标签生成 3 特征，原始特征数据展示客户 A1024 的三条实时业务特征：
特征 01  customer/visit_count    28 次
特征 02  customer/order_amount   ¥12,860
特征 03  customer/last_active    2 小时前

保持 EMQX 原有动画逻辑。三条数据依次进入处理状态：

customer/visit_count
        ↓
customer/order_amount
        ↓
customer/last_active

当前正在处理的数据：

* Border 切换为 Primary
* Background 切换为 Primary/10
* Icon 切换为 Primary
* 右侧出现 Pulse Arrow
* 保持原组件 transition duration

不要改变原有动画方式。

- 标签加工节点，保持原 EMQX 中间：
─────────── ◯ ───────────
结构完全不变。将圆形内部 EMQX Logo 替换为：Boxes
该节点业务含义为：
原始业务数据
      ↓
数曜标签引擎
      ↓
标签结果

页面中不需要额外增加以上文字。

通过动画自然表达数据经过数曜标签引擎完成标签计算。


- 标签生成结果，原表格标题：message_stream 调整为 tag_results
右侧：3 行 保持不变
表头：
time        source        metric        value 调整为 object      tag           type          value
保持四列 Grid 结构完全不变：grid-cols-4

标签结果中
Row 01
客户 A1024    活跃度       行为标签       高活跃
对应原始数据 customer/visit_count = 28 次

Row 02
客户 A1024    客户价值     价值标签       高价值
对应原始数据 customer/order_amount = ¥12,860

Row 03
客户 A1024    活跃状态     状态标签       近期活跃
对应原始数据 customer/last_active = 2 小时前

- 标签生成动画按照原 EMQX 数据摄取逻辑执行。
Step 01

高亮：customer/visit_count        28 次
经过数曜标签引擎。
生成：
客户 A1024    活跃度    行为标签    高活跃

Step 02

高亮：
customer/order_amount       ¥12,860
生成：
客户 A1024    客户价值    价值标签    高价值

Step 03

高亮：customer/last_active        2 小时前
生成：
客户 A1024    活跃状态    状态标签    近期活跃

- 标签生成状态处理中，正在摄取数据... 调整为 正在生成标签... 保持：

* Pulse Dot
* Primary Color
* opacity transition
* absolute positioning

全部不变。

处理完成：✓ 数据已存储，可随时查询、分析和可视化。 修改为 ✓ 标签已生成，可直接查询、分析与服务调用。 保持绿色 Success 状态及原动画。

- Tab 02：标签查询，用户点击 标签查询 进入 标签查询状态，Tab 样式完全沿用原 EMQX
- 标签查询标题：标签实时查询 右侧状态：主体画像
- 查询条件查询主体：客户 A1024 查询条件内容：customer_id = A1024 如果原组件存在查询输入框，则直接使用原输入框。

不增加新的 UI 结构 查询按钮：查询标签

- 点击：查询标签 后进入 Loading 状态：正在查询标签... 保持原组件：

* Pulse
* Primary Color
* Transition
* Loading animation

- 标签查询结果

查询完成后展示：客户 A1024

对应标签：
高活跃
高价值
近期活跃

结果表格保持四列结构。

查询结果表头：
tag           category       value         updated
Row 01
活跃度        行为标签        高活跃        刚刚
Row 02
客户价值      价值标签        高价值        刚刚
Row 03
活跃状态      状态标签        近期活跃      刚刚

- 查询完成状态

查询成功后底部显示：
✓ 已找到 3 个标签，可用于分析、分群与服务调用。

保持原 EMQX Success 状态，不要修改视觉样式

- 两个 Tab 的完整业务逻辑
标签生成：
客户业务数据

customer/visit_count
28 次
        ↓

customer/order_amount
¥12,860
        ↓

customer/last_active
2 小时前

        ↓

数曜标签引擎

        ↓

标签结果

高活跃
高价值
近期活跃

核心表达：原始数据 → 特征识别 → 标签生成

标签查询：
customer_id = A1024

        ↓

查询标签

        ↓

客户 A1024

高活跃
高价值
近期活跃

核心表达：主体查询 → 标签检索 → 标签画像

- 整个 Hero 动画需要让用户在几秒钟内理解
业务数据
    ↓
特征识别
    ↓
标签加工
    ↓
标签生成
    ↓
标签查询
    ↓
业务应用

其中 Hero 动画重点展示：标签生成 + 标签查询，不需要在 Hero 中继续展示复杂的数据治理、标签模型设计、标签服务 API 等能力，这些能力放到后续产品模块介绍

- 开发要求

1. 不修改原 EMQX Hero 动画组件整体布局。
2. 不修改组件宽度、高度及比例。
3. 不修改 Border、Radius、Shadow、Glow。
4. 不修改原有 Padding / Margin / Gap。
5. 不修改字体尺寸层级。
6. 不修改 Tab 高度及切换样式。
7. 不修改表格 Grid 结构。
8. 不修改动画 duration 和 transition 逻辑。
9. 不重新设计任何 UI。
10. 仅替换文字、模拟数据、Logo 和业务状态。
11. 保留原动画逐条处理的视觉节奏。
12. 标签生成动画完成后循环播放。
13. 用户点击“标签查询”后暂停“标签生成”动画，播放标签查询动画。
14. 用户重新点击“标签生成”后恢复标签生成动画。

最终效果需要在视觉上保持原 EMQX Tables Hero 动画的精致程度，但业务表达完全转换为：

数曜·数据标签平台将分散的业务数据转化为统一、可查询、可服务的业务标签。