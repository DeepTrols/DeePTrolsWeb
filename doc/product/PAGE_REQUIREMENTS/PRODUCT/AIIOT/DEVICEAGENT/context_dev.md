# DEVICEAGENT
> Device Agent-核心能力-设备上下文融合右侧动画调整

要求：不允许新建样式，必须通过Tailwind CSS v4

严格参考EMQX Agents「核心能力」右侧动画的实现方式，在不改变现有右侧动画整体尺寸、外层结构、视觉语言和交互风格的基础上，实现「设备融合上下文」动画。

不要重新设计整个模块，不要做架构图，不要做复杂数据大屏。

严格沿用现有 EMQX 右侧动画的设计语言：

* 外层保持 h-[520px] sm:h-[480px] lg:h-[460px]
* rounded-2xl
* border border-muted/60
* bg-muted/30
* 内层使用 bg-default
* 主卡使用 border-primary/20 bg-primary/5
* Active 状态使用 text-primary / bg-primary/10 / border-primary/30
* 非 Active 状态使用 text-muted / bg-muted/20 / border-muted/60
* 保留现有 light / dark theme
* 使用现有 Tailwind Token，不写死背景色
* 图标统一使用 Lucide
* 保持 EMQX 当前动画克制、轻量、工程化的风格
* 不使用 Canvas、SVG 大型架构图、3D、粒子特效
* 不增加外层容器高度
* 不改变左侧能力 Tab
* 只实现右侧动画内容

整体布局

右侧动画内部从上到下分为 4 个区域：

1. 顶部标题栏
2. 当前设备上下文主卡
3. 四个上下文来源卡片
4. 上下文构建序列

最底部保留 EMQX 原有说明文字区域。

整体信息密度参考现有 MCP 工具控制台 动画，不要设计得比原版复杂。

1、顶部标题
MCP 工具控制台 修改为 设备上下文引擎
已类型化 修改为 实时构建

结构保持：
<div class="mb-4 flex items-center justify-between gap-3">

动画运行时 Badge 前增加一个 primary 小圆点，轻微 pulse

2. 当前设备上下文主卡

参考 EMQX 当前 humans.approve Active 主卡的视觉样式：
border-primary/20
bg-primary/5
rounded-xl
p-4

不要做成复杂仪表盘。

主卡左侧：

Lucide 图标：

Box

标题：

ESS-01 设备上下文

Badge：

构建中

描述：

正在融合实时状态、历史时序、设备信息与知识数据。

主卡右侧或下方展示 4 个核心字段：
最高电芯温度      61.8°C

SOC               86%

充电功率          500 kW

运行状态          充电中

建议使用：
grid grid-cols-2 gap-x-6 gap-y-2

字段名使用：

text-xs text-muted

字段值使用：

text-sm font-medium text-highlighted

当前异常温度：

61.8°C

可以使用：

text-amber-500

不要使用大号数字，不要做数据大屏效果。

3. 四个上下文来源卡片

严格参考 EMQX MCP 动画中的 4 个 Tool 卡片：
broker.publish
tables.query
fleets.shadow
humans.approve

保持：grid gap-2 sm:grid-cols-4
改成：

实时数据

Lucide：

Activity

标题：

实时数据

描述：

设备实时运行指标

状态内容：

61.8°C · 500 kW

历史时序

Lucide：

ChartNoAxesCombined

标题：

历史时序

描述：

历史趋势与运行基线

状态内容：

7 天 · 42.6°C

设备状态

Lucide：

Cpu

标题：

设备状态

描述：

设备及子系统状态

状态内容：

BMS 告警

知识库

Lucide：

BookOpen

标题：

知识库

描述：

运维知识与处置规范

状态内容：

2 条匹配

每张卡片结构统一：

[Icon]

实时数据

设备实时运行指标

61.8°C · 500 kW

不要塞更多内容。

Icon部分使用IconBox

4. Active 动画机制

四张来源卡不是静态展示。

按照以下顺序依次激活：
实时数据
↓
历史时序
↓
设备状态
↓
知识库
↓
上下文构建完成

当前 Active 卡片使用：
border-primary/30
bg-primary/5
text-primary

其他卡片：
border-muted/60
bg-muted/20
text-muted

每个阶段约：

1000–1400ms

切换时使用：
transition-all duration-300

不要使用强烈闪烁。

5. 实时数据阶段

动画开始后：

实时数据

卡片首先 Active。

主卡 Badge：

读取中

主卡逐渐出现：

最高电芯温度
61.8°C

SOC
86%

充电功率
500 kW

底部「上下文构建序列」显示：

context.realtime({
  device: "ESS-01"
})

右侧状态：

读取实时设备数据

完成后显示：

✓ 已读取

6. 历史时序阶段

实时数据卡恢复普通状态。

历史时序

变为 Active。

主卡增加：
历史基线
42.6°C

当前偏离
+45.1%

构建序列切换为：
context.timeseries({
  device: "ESS-01",
  window: "7d"
})

右侧：

查询近 7 天运行基线

完成：

✓ 已聚合

7. 设备状态阶段

设备状态

变为 Active。

主卡增加状态：

PCS
正常

BMS
告警

构建序列：
context.device({
  device: "ESS-01"
})

右侧：

读取设备与子系统状态

完成：

✓ 已关联

8. 知识库阶段

知识库

变为 Active。

主卡底部增加一条轻量知识提示：

知识参考

持续高温可能与散热异常、
电芯一致性下降或充电倍率过高相关。

不要做大段文字。

context.knowledge({
  query: "电芯持续高温"
})

右侧：

检索相关运维知识

完成：

✓ 匹配 2 条

9. 上下文构建完成

四个数据源读取完成后进入最终阶段。

主卡 Badge：

从：

构建中

变成：

Ready

或者中文：

已就绪

主卡最终显示：
ESS-01 设备上下文

运行状态        充电中
SOC             86%
最高温度        61.8°C
历史基线        42.6°C
偏离幅度        +45.1%
充电功率        500 kW
PCS             正常
BMS             告警

底部调用序列：
context.build({
  device: "ESS-01",
  sources: 4
})

右侧状态：

✓ Context Ready · 1.2s

最终状态停留约 2 秒。

然后整个动画重新开始。

10. 上下文构建序列

这一部分严格参考 EMQX 原版：

类型化调用序列

所在的 terminal 风格卡片。

标题改成：

上下文构建序列

Lucide 使用：

Terminal

保持：

rounded-xl
border border-muted/60
bg-default
p-3
font-mono
text-xs

不要同时显示五行代码。

每个动画阶段只显示当前正在执行的一条调用。

例如：

> 上下文构建序列

context.timeseries({
  device: "ESS-01",
  window: "7d"
})

正在查询历史时序...

这样保持和 EMQX 原动画相同的信息密度。

11. 最底部说明

保持 EMQX 原来的：

border-t border-muted/40 px-5 py-4

文案修改为：

Agent 自动融合实时状态、历史时序、设备信息与知识数据，为每一次运行动态构建设备级上下文。

使用：

text-sm text-muted

12. 动画完整时间线
动画循环顺序：
0.0s
初始化
设备上下文引擎 · 实时构建

↓

0.5s
实时数据 Active
context.realtime()
读取 61.8°C / 86% / 500 kW

↓

1.8s
实时数据 ✓
历史时序 Active
context.timeseries()

↓

3.1s
历史时序 ✓
显示 42.6°C / +45.1%

↓

3.5s
设备状态 Active
context.device()

↓

4.8s
显示 PCS 正常 / BMS 告警

↓

5.2s
知识库 Active
context.knowledge()

↓

6.5s
匹配 2 条运维知识

↓

7.0s
context.build()

↓

7.8s
Context Ready
四张卡片全部完成

↓

10.0s
重新开始

最终效果必须看起来像原 EMQX Agents 页面原生存在的另一个 Capability Animation，而不是后来额外设计的一张数据大屏。

重点保持：

简单、克制、工程化、状态驱动。

视觉结构严格控制为：

设备上下文引擎                    实时构建

┌─────────────────────────────────────┐
│ ESS-01 设备上下文          构建中   │
│                                     │
│ 61.8°C    86%    500kW    充电中   │
└─────────────────────────────────────┘

[实时数据] [历史时序] [设备状态] [知识库]

┌─────────────────────────────────────┐
│ > 上下文构建序列                    │
│ context.timeseries({...})           │
└─────────────────────────────────────┘

───────────────────────────────────────
Agent 自动融合实时状态、历史时序、设备信息
与知识数据，为每一次运行动态构建设备级上下文。

不要自行增加新的模块、图表、仪表盘、拓扑图或复杂装饰。
实现说明（TASK-008.8）：`RuntimeContextPanel.vue` 按上述规范整体重做，全部使用 Tailwind CSS v4，无新增样式块。面板标题经 `RuntimePanelShell` 渲染为「设备上下文引擎 · 实时构建」，shell 新增可选 `badge-dot` 属性（徽标前 `size-1 animate-pulse rounded-full bg-primary` 小圆点，仅本面板启用）。主卡 `rounded-xl border border-primary/20 bg-primary/5 p-3`：Box 图标（`bg-primary/15` 圆角底 + 构建期 `animate-ping` 覆盖层，Ready 后隐去）+「ESS-01 设备上下文」+ 阶段徽标（构建中 → 读取中 → 构建中 → 已就绪）+ 融合描述（sm+ 两行钳制）；8 个字段以 `grid grid-cols-2 gap-x-6 gap-y-1` 一次渲染、按阶段 opacity 渐显（实时阶段：运行状态/SOC/最高温度/充电功率，150ms 交错；3.1s：历史基线/偏离幅度；4.8s：PCS/BMS），61.8°C 使用 `text-amber-500`；知识参考行于 6.5s 渐显。四个来源卡 `grid grid-cols-2 gap-2 sm:grid-cols-4`（IconBox size 40：Activity / ChartNoAxesCombined / Cpu / BookOpen，idle 为 soft、激活/完成为 primary），在各自时间窗内 Active（`border-primary/30 bg-primary/5`，`transition-all duration-300`），窗口外回落普通态，Ready 后统一完成态；描述行仅 xl+ 展示。「上下文构建序列」终端卡每阶段只显示当前一条 `context.*` 调用（单行 font-mono 截断）与右侧状态（LoaderCircle 进行中 / CircleCheck 完成）。时间轴：0.5s 实时数据 → 1.8s 历史时序 → 3.1s 基线字段 → 3.5s 设备状态 → 4.8s PCS/BMS → 5.2s 知识库 → 6.5s 知识参考 → 7.0s context.build → 7.8s Context Ready，`useRuntimeTimeline(8800)` + 1200ms 循环停留 ≈ 10s 重播。footer 文案经 shell footer 插槽渲染（`line-clamp-2`）。高度预算：lg 内容区约 277px = 主卡 ≤138 + 来源卡 52（xl 60）+ 序列卡 56 + 间距；移动端主卡隐藏描述、来源卡 2×2（p-1 高 48），各断点均无布局跳动。`data/device-agent.ts` 中 context Tab 的 panelTitle/panelBadge 同步为「设备上下文引擎 / 实时构建」。

主卡简化与来源卡加高补充（TASK-008.10）：按反馈调整——1）主卡去掉 8 个字段（运行状态/SOC/最高温度/充电功率/历史基线/偏离幅度/PCS/BMS）与知识参考行，改为与「多源事件触发」首层卡片一致的结构：`rounded-xl border border-primary/20 bg-primary/5 p-3` 内 `flex items-center justify-between`，左侧 size-10 圆角 icon（Box + 构建期 animate-ping 覆盖层，Ready 后隐去）+「ESS-01 设备上下文」+ 描述「正在融合实时状态、历史时序、设备信息与知识数据。」，右侧 `rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary` 徽标（构建中 → 已就绪）。2）四个来源卡加高为垂直布局（IconBox + 标题 + 状态，`justify-center` 居中），标题升级为 `text-sm font-semibold leading-5`，删除描述行，状态内容改为 `font-mono text-xs leading-4`；sm+ 网格 `sm:max-h-36 sm:flex-1 sm:grid-rows-1` 拉伸填充，移动端 2×2 自然高度。3）footer 说明文案改为 `truncate text-sm text-muted` 单行不换行（去掉 max-w-xl 与 line-clamp-2，title 悬停全文）。时间轴、上下文构建序列、Active 轮转与 IconBox 体系不变。
