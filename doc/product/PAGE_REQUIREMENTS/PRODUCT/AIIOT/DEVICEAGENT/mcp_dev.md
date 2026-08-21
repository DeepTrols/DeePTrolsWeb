# DEVICEAGENT
> Device Agent-核心能力-MCP工具连接右侧动画调整

要求：不允许新建样式，必须通过Tailwind CSS v4

严格参考EMQX Agents「核心能力」右侧动画的实现方式，在不改变现有右侧动画整体尺寸、外层结构、视觉语言和交互风格的基础上，实现「MCP工具连接」动画。

- 整体结构
保持现有 EMQX Capability Animation 外框：

整个动画分为3个区域，分别是：
左侧MCP与系统来源、右侧MCPTools、底部调用示例

1、左侧MCP与系统来源
1.1 中央 MCP 工具层
动画视觉中心设置一个 MCP 节点。不要做复杂 3D 六边形。使用 EMQX 风格圆角卡片：

rounded-xl
border border-primary/30
bg-primary/5
内部：

Lucide：

Box

标题：

MCP 工具层

副状态：

Tools Ready
MCP 节点保持左侧MCP与系统来源的视觉中心。

Active 时可以：

* border-primary/40
* bg-primary/10
* icon text-primary

允许轻微 shadow-primary/10，不要做强烈霓虹光。

1.2 系统来源（以下icon均使用IconBox）

1.2.1 左侧系统来源
MCP 左侧只保留 3 个来源，不要增加更多。
数据平台

Icon：

Database

内容：
数据平台
查询 / 写入

企业系统

Icon：

FileText

内容：
企业系统
ERP / OA / CRM

三张卡片纵向排列。

1.2.2 右侧 MCP Tools

MCP 右侧只展示 3 个工具。

不要一次展示 6 个或更多工具。

数据查询

Icon：

ChartNoAxesCombined

内容：
数据查询
tables.query


指令下发

Icon：

Send

内容：
指令下发
device.command


人工审批

Icon：

UserCheck

内容：
人工审批
humans.approve

与左侧来源保持相同尺寸。

1.3 连接线
左侧系统：
数据平台
设备管理
企业系统

通过细线连接到：
MCP 工具层

MCP 工具层再连接：
数据查询
指令下发
人工审批

连接线使用：
border-primary/40

或 SVG stroke：
stroke-primary/40

不要做粗线。

不要做大量发光。

只在当前正在调用的路径上增加一个小型 primary 光点移动。

用一个小圆点沿路径移动即可。

2、右侧MCPTools
不要再显示：

* 协议
* 认证
* 延迟
* 成功率
* Server 信息
* Connection ID

这些信息全部删除，避免拥挤。

只保留：

当前工具

tables.query

● 已连接

查询历史时序数据

下面可以显示两个参数：
设备
ESS-01

时间范围
近 7 天
不要超过两个参数。

视觉：

rounded-xl
border border-muted/60
bg-default
p-4

tables.query 使用：

font-mono
text-primary

状态：已连接
使用小型绿色 Badge。

3、底部调用示例
严格参考 EMQX 原来的 terminal / 类型化调用区域。

标题：

调用示例

Lucide：

Terminal

内容只保留一行：
tools.tables.query({ device: "ESS-01", window: "7d" })

右侧动态状态：

第一阶段：

准备调用

第二阶段：

执行中 ···

第三阶段：

✓ 成功

不要显示复杂 JSON 返回结果。

- 动画逻辑
整个动画控制在约 6 秒一个循环。通过一次 tables.query 调用展示 MCP 工作过程。
状态 01：Ready

整个界面已经完整存在。


顶部：

MCP 工具连接

右侧：

● 已连接

MCP 中央节点：
MCP 工具层

Tools Ready

当前工具：

当前工具

tables.query

● 就绪


Terminal：
tools.tables.query({ device: "ESS-01", window: "7d" })

右侧：

等待调用

停留约：

1 秒

状态 02：Tool Active

不要让任何新元素出现。

只改变已有元素状态。

数据平台：
muted
↓
primary active

tables.query：
muted
↓
primary active

对应路径：
数据平台
    ↓
MCP 工具层
    ↓
tables.query

从：

primary/15

变为：

primary/50

其他路径仍然保持低亮度。

当前工具状态：

● 调用中

Terminal：

执行中 ···

状态 03：数据流动

保持所有卡片位置完全不变。

只在：

数据平台 → MCP 工具层

以及：

MCP 工具层 → tables.query

两段路径上增加一个非常小的 primary 光点。

光点沿连接线循环移动。

效果类似：

数据平台 ───●────→ MCP ───●────→ tables.query

不要使用：

* 粒子群
* 大面积 Glow
* 路径闪烁
* 卡片缩放
* 卡片位移

只需要一个克制的小型流动点。

状态 04：执行中

当前工具卡内容保持原位置，只修改状态：
当前工具

tables.query

● 执行中

查询历史时序数据

参数保持：

设备
ESS-01

时间范围
近 7 天

Terminal：
tools.tables.query({ device: "ESS-01", window: "7d" })

执行中 ···

可以让 Terminal 右侧三个小圆点做轻微：

opacity 0.3 → 1

循环。

除此之外不要增加动画。


状态 05：执行完成

仍然不新增任何元素。

只进行状态替换。

tables.query：

从：

调用中

变为：

✓ 调用完成

当前工具卡：

当前工具

tables.query

✓ 已完成

查询历史时序数据

Terminal：
tools.tables.query({ device: "ESS-01", window: "7d" })

✓ 调用成功 · 284 ms

路径上的流动光点停止。

路径保持 primary 高亮约 1 秒。

状态 06：恢复 Ready

不要淡出整个 UI。

不要重新加载。

只把状态恢复：

数据平台       Active → Muted

tables.query   Active → Muted

连接路径       primary/50 → primary/15

调用成功       → 等待调用

中央 MCP 始终保持：

MCP 工具层

Tools Ready

然后开始下一轮。

- 动画视觉原则
整个动画应该让用户感觉：

这是一个已经运行起来的 MCP Runtime，我们正在观察其中一次 Tool Call。

而不是：

页面正在向用户逐个介绍 MCP 有哪些组成部分。

因此严格禁止：

系统卡片依次出现
↓
MCP 出现
↓
Tools 出现
↓
Terminal 出现

改成：

完整 Runtime 界面

        ↓

某条调用路径 Active

        ↓

数据流动

        ↓

Tool 执行中

        ↓

调用成功

        ↓

恢复 Ready

动画允许范围

只允许以下动画：

连接线

primary/15 → primary/50

卡片状态

muted → primary

数据流

小型 primary 圆点沿 SVG Path 移动

Badge

就绪 → 调用中 → 已完成

Terminal

等待调用 → 执行中 ··· → ✓ 调用成功 · 284 ms

Loading

三个小圆点轻微 opacity 动画

- footer部分的“Agent 通过 MCP 协议连接设备、数据与业务工具，在消息流中完成读取、查询、检索与执行。”不要换行