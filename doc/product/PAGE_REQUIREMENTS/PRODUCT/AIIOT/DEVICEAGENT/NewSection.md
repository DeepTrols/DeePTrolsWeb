# DEVICEAGENT
> Device Agent页面结构-新增Section

Section2:
section-heading__eyebrow：智能体架构
标题：从设备模型，到真正会行动的 Agent
副标题：Agent 理解设备能力，读取实时状态，执行指令并返回可验证的结果。

使用ProductSystemFlowFrame组件，flow暂时不传入


Section3:
section-heading__eyebrow：核心价值
标题：Device Agent解决的三个关键问题
副标题：Device Agent 打通设备事件、实时数据、AI 决策与设备执行，让 Agent 能够感知现场、理解状态并自主完成工业任务。

ProductFeatureGridSection组件1x3  icon去边框，是用数字icon

01
设备事件无法直接驱动 AI
传统 Agent 依赖 API 调用或人工发起任务，难以感知持续产生的设备事件。Device Agent 以 MQTT 消息原生触发，在消息流中完成过滤、去抖与聚合，只让真正需要判断的事件进入 Agent。

02
AI 能判断，但无法形成执行闭环
传统 AI 往往停留在分析和建议阶段，与设备状态、历史数据和控制链路割裂。Device Agent 打通数据读取、状态感知、智能决策与设备控制，让 Agent 从“回答问题”走向“执行任务”。

03
通用 Agent 难以适配工业场景
工业任务涉及设备协议、运行状态、控制规则和安全边界，单靠 Prompt 很难可靠落地。Device Agent 内置工业 Skills 与场景模板，让告警处置、预测性维护、OTA、设备巡检等任务快速形成可执行的 Agent 工作流。


Section4:
section-heading__eyebrow：核心能力
标题：为设备事件而生的 Agent Runtime
副标题：从事件触发、多源上下文到工具调用与设备执行，构建设备侧 AI 的运行时基础，让预警、处置、派单与设备操作形成自动化闭环。

参考 https://www.emqx.com/zh/cloud/emqx-agents 中 <div class="grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-10"><div class="flex flex-col gap-2"><button type="button" class="group relative flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 border-transparent bg-transparent hover:bg-muted/50"><div class="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 opacity-0"></div><div class="flex size-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300 bg-muted/60 text-muted group-hover:text-highlighted"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-5" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9m2.9 2.8a6.14 6.14 0 0 0-.8 7.5"></path><circle cx="12" cy="9" r="2"></circle><path d="M16.2 4.8c2 2 2.26 5.11.8 7.47M19.1 1.9a9.96 9.96 0 0 1 0 14.1m-9.6 2h5M8 22l4-11l4 11"></path></g></svg></div><div class="min-w-0 flex-1"><h3 class="text-[15px] font-semibold transition-colors duration-300 text-muted">MQTT 原生触发器</h3></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-4 shrink-0 transition-all duration-300 -translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-40" width="1em" height="1em" viewBox="0 0 24 24">……的布局、交互和动画样式，保留左侧 6 个能力 Tab + 右侧对应动画的整体结构，不改变原有圆角、边框、渐变、Hover、选中态、过渡动画、卡片高度和响应式布局。

动画中的所有可见文案统一使用中文，仅保留必要的技术术语与接口名，如 MCP、Skills、Trace、device.execute_command。
6 个核心能力为：

1. 多源事件触发
2. 设备上下文融合
3. MCP 工具连接
4. Skills 按需挂载
5. 安全执行护栏
6. 全链路可观测

统一使用同一个设备案例：

ESS-01 储能柜电芯温度异常

1. 多源事件触发

顶部标题：事件触发器
状态：监听中

右侧动画展示不同类型事件持续进入 Device Agent Runtime。

事件来源：
设备事件
ESS-01 / 电芯温度异常
61.8°C

指标告警
最高电芯温度 > 55°C
当前 61.8°C

规则事件
持续高温规则
已命中

定时任务
储能柜巡检
10:00

四类事件使用独立小卡片展示。
事件卡片依次激活，通过动态流线汇聚到中央：
DEVICE AGENT
事件已触发

Agent 激活后，底部依次出现：
事件校验        ✓
事件去重        ✓
上下文构建      进行中

底部：
让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。

动画流程：

事件出现 → 事件激活 → 流入 Runtime → Agent 唤醒 → 事件校验 → 去重 → 构建上下文

流线使用 primary 色弱发光效果，不使用复杂粒子。

2、设备上下文融合
右侧顶部：设备上下文
状态：正在构建

动画展示 Device Agent 围绕 ESS-01 自动构建设备上下文。

四类数据来源：
实时数据

最高电芯温度
61.8°C

SOC
86%

充电功率
500 kW

---

历史时序

近 7 天温度基线
42.6°C

当前偏离
+45.1%

---

设备状态

ESS-01
充电中

PCS
正常

BMS
告警

---

知识库

储能系统运维手册
KB-204

热异常处置规范
KB-317

---

四类数据源通过动态连线汇聚到：

上下文引擎

ESS-01

随后动态生成：

设备上下文

设备          ESS-01
运行状态      充电中
SOC           86%
最高温度      61.8°C
历史基线      42.6°C
偏离幅度      +45.1%
充电功率      500 kW
BMS 状态      告警

下方知识参考：
知识参考

持续高温可能与散热异常、
电芯一致性下降或充电倍率过高相关。

底部：

上下文已就绪 · 1.2 秒

动画流程：

实时数据 → 历史时序 → 设备状态 → 知识库 → Context Engine → 设备上下文

数据源依次激活，连线产生流动效果，字段逐行生成。


3、MCP 工具连接

顶部：MCP 工具

状态：6 个可用

展示 Device Agent 可调用的工具。

工具分类：
设备工具

device.get_status
device.read_property
device.execute_command

---

数据工具

timeseries.query
knowledge.search

---

业务工具

workorder.create

首先展示 Agent 判断：
Agent 判断

检测到 ESS-01 电芯温度持续异常，
需要进一步确认历史趋势、
SOC、充电功率与设备运行状态。

随后调用：
查询历史时序

timeseries.query

设备
ESS-01

指标
最高电芯温度

时间范围
近 7 天

✓ 284 ms

返回：
近 7 天基线
42.6°C

当前
61.8°C

偏离
+45.1%

随后调用：
查询知识库

knowledge.search

查询
储能柜电芯持续高温原因

✓ 176 ms

返回：
找到 3 条相关知识

热管理异常
电芯一致性异常
充电倍率过高

最后展示：
下一步动作

创建储能运维工单

动画流程：

Agent 判断 → 选择 Tool → 参数生成 → Tool 执行 → 返回结果 → 再次推理 → 下一步动作

当前正在调用的工具使用 primary 高亮。


4、Skills 按需挂载

顶部：Skills

状态：按需加载

首先出现事件：
收到事件

ESS-01
电芯温度告警

61.8°C

随后 Device Agent 开始匹配 Skills：

正在匹配 Skills...

设备巡检              62%

告警分诊              96%

热异常诊断            93%

工单派发              87%

百分比使用 progress 动画逐渐增长。

高匹配 Skills 被依次选中：

✓ 告警分诊

✓ 热异常诊断

✓ 工单派发

随后三个 Skills 动态组合形成执行链：

告警分诊
    ↓
热异常分析
    ↓
处置决策
    ↓
工单派发

每个节点依次进入 Active 状态。

底部：

已挂载 3 个 Skills · 就绪

动画流程：

事件进入 → Skills 匹配 → 匹配度计算 → Skills 选择 → 动态挂载 → 形成任务链

不要把 Skills 做成单纯静态列表，需要明显体现“根据事件按需加载”。


5、安全执行护栏
顶部：安全执行
状态：护栏已启用

首先展示 Agent 计划执行的真实设备动作：
待执行动作

device.execute_command

动作参数：
设备
ESS-01

指令
降低充电功率

当前功率
500 kW

目标功率
400 kW

调整幅度
-20%

随后 Guardrails 开始检查：
权限检查          ✓

设备范围检查      ✓

参数校验          ✓

安全策略检查      ✓

四个检查项逐条执行。

随后显示：
风险等级

中风险

因为涉及真实储能设备控制，进入人工审批：

需要人工审批

Device Agent 请求执行：

将 ESS-01 充电功率
从 500 kW 降低至 400 kW

[ 批准 ]

[ 拒绝 ]

动画自动模拟点击：
批准

随后状态变为：
已批准

正在执行...

展示设备执行：

ESS-01

充电功率

500 kW
   ↓
400 kW

最终：
✓ 执行确认

设备状态正常

动画流程：

Agent 提议动作 → 权限检查 → 参数校验 → 安全策略 → 风险判断 → 人工审批 → 执行动作 → 设备确认

需要明确体现：

Agent 决策不等于直接执行，真实设备动作必须经过安全护栏。


6、全链路可观测
顶部：运行 Trace

状态：采集中

顶部展示三个运行指标：

耗时
8.4 秒

---

工具调用
4

---

Skills
3

主体展示一次完整 Device Agent Runtime Trace。

按照时间顺序逐条出现：

10:24:12.031

事件

ESS-01
最高电芯温度 > 55°C

↓

10:24:12.084

上下文

查询近 7 天温度与充放电历史

↓

10:24:12.426

知识检索

匹配储能系统运维文档
3 篇

↓

10:24:13.102

Skill

热异常诊断

↓

10:24:15.337

模型推理

分析电芯异常温升原因与运行风险

↓

10:24:17.842

工具调用

workorder.create

↓

10:24:20.419

执行结果

储能运维工单
WO-20260814-018

创建成功

当前正在执行的 Trace 节点使用 primary 高亮。

已完成节点降低亮度但保留完成状态。

顶部指标随动画同步变化：

* 耗时逐渐增加
* Tool 调用数量逐渐增加
* Skills 数量逐渐增加

底部增加：

重放本次运行

点击后重新播放整个 Trace 动画。


统一交互要求

左侧 Tab 保持参考页面交互方式：

* 默认一个 Tab 处于 Active 状态
* Active Tab 显示 primary 左侧竖线
* Active 图标使用 primary
* Active 背景使用轻微 primary gradient
* Hover 时背景变为 muted
* Hover 时右侧箭头出现
* 点击 Tab 后平滑切换右侧内容
* 右侧动画重新从第一阶段开始

右侧统一保持参考页面的：

* 大圆角容器
* muted 背景
* 内层 default 卡片
* primary / muted 状态体系
* font-mono 技术数据展示
* 小尺寸状态 Badge
* 克制的边框和阴影
* 不改变整体高度，避免切换 Tab 时页面跳动

6 个动画不要设计成完全独立的 Demo。

必须让用户能够感受到这是同一次：

ESS-01 储能柜电芯温度异常

在 Device Agent 中经历：

事件发生 → 上下文构建 → 工具调用 → Skills 挂载 → 安全执行 → Trace 追踪

从而完整表现 Device Agent 作为事件驱动 Agent Runtime，从感知设备变化到分析、决策、执行和追踪的完整技术闭环。


实现说明（TASK-008.3）：三个 Section 依次装配在 `pages/products/device-agent.vue` 的 Section1（智能体生态）之后。Section2「智能体架构」落地为 `components/product/device-agent/DeviceAgentArchitectureSection.vue`，复用公共 `ProductSystemSection` + `ProductSystemFlowFrame`（flow 暂不传入，仅占位，桌面端显示网格底纹占位框）。Section3「核心价值」落地为 `components/product/device-agent/DeviceAgentValueSection.vue`，复用 `ProductFeatureGridSection(columns="three")`，数据集中在 `data/device-agent.ts`（`deviceAgentValueItems`，`iconLabel` 01/02/03），并传入 `:icon-bordered="false"` 去掉数字 icon 边框；为此公共 `FeatureCard` 的 `iconLabel` 分支新增对 `iconBordered`/`iconFilled` 的支持（通过 `--dt-icon-box-shadow`/`--dt-icon-box-bg` 变量覆写，默认渲染不变）。

Section4「核心能力」落地为 `components/product/device-agent/DeviceAgentRuntimeSection.vue`，整体沿用参考页 `grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-10` 布局：左侧 6 个能力 Tab（Active 竖线 / primary 图标 / `from-primary/10 to-primary/5` 渐变、Hover `bg-dt-bg-soft/50` 与右侧箭头），右侧动画面板通过 `:key` 切换并重播入场动画。6 个动画面板位于 `components/product/device-agent/runtime/`（RuntimeEventPanel / RuntimeContextPanel / RuntimeToolsPanel / RuntimeSkillsPanel / RuntimeGuardrailsPanel / RuntimeTracePanel），统一经 `RuntimePanelShell` 承载固定高度容器（`h-[520px] sm:h-[480px] lg:h-[460px]`、muted 外层 + default 内层卡片、状态 Badge），并共享 `useRuntimeTimeline.ts` 的 SSR 安全 rAF 计时器驱动分阶段动画；能力 Tab 与 Trace 步骤数据集中在 `data/device-agent.ts`（`deviceAgentRuntimeTabs` / `deviceAgentTraceSteps`）。全部动画统一使用 ESS-01 储能柜电芯温度异常案例，Trace 面板底部提供「重放本次运行」按钮重放整条 Trace。

因站点仅暗色主题且 `bg-muted`/`bg-default`/`text-muted` 等为 `@utility` 不支持透明度修饰符，参考页的 `bg-muted/N` 统一等价为 `bg-dt-bg-soft/N`、`border-muted/60` 等价为 `border-dt-line-strong/60`、`bg-default` 等价为 `bg-dt-bg`；新增组件全部 Tailwind-only，不新增 `<style>`；面板入场动画使用 `assets/css/tailwind.css` 新增的 `--animate-panel-in` token。

排版与动效优化补充：针对首版面板在固定高度内容过密、字号过小（9–10px）导致的排版错乱，6 个动画面板已整体重构——正文统一不小于 11px（`text-xs` 为主、紧凑行 `text-[11px] leading-4`、仅 Trace 时间戳保留 `text-[10px]`），并按 lg 内层约 348px 的高度预算为每个阶段预留固定布局区域：所有元素一次性渲染、仅以 opacity 渐显，杜绝动画过程中的布局跳动；Skills 任务链改为横向排列，MCP 工具调用改为左右双卡片 + 底部 3 列工具格，Trace 改为单行条目（时间戳列 + 类别/详情同行截断）并以竖线连接，审批与执行流程双栏排布。进度条宽度类按 1% 粒度生成（`useRuntimeTimeline.ts` 的 `RUNTIME_BAR_WIDTH_CLASSES`），保证条宽与百分比文案精确一致。
循环播放补充（TASK-008.5）：`useRuntimeTimeline` 调整为循环播放——elapsed 推进至 totalMs 后保持终态 `RUNTIME_LOOP_HOLD_MS`（1200ms）再归零重播，6 个动画面板统一循环展示；Trace 面板「重放本次运行」仍可立即从第一阶段重播。

实现说明（TASK-008.9）：按需求方 inline 规范 `mcp_dev.md` 对齐「MCP 工具连接」面板（`components/product/device-agent/runtime/RuntimeToolsPanel.vue`，Tailwind-only，196 行）：shell 标题改为「MCP 工具连接」并启用 `badge-dot`（复用 TASK-008.8 的 `RuntimePanelShell.badgeDot`），`data/device-agent.ts` tools Tab `panelTitle` 同步；「Agent 判断」卡 0.5s 渐显并 Active，第一次调用开始后回落普通态；两次调用卡（timeseries.query / knowledge.search）保持左右双卡布局，参数与结果按 `ROW_STAGGER_MS = 150` 逐行 opacity 渐显，完成后右上角显示 `CircleCheck + 284 ms / 176 ms`，调用期间底部工具格对应工具高亮；结果 chips 文案按规范修正为「电芯一致性异常」；新增 shell footer 文案「Agent 通过 MCP 协议连接设备、数据与业务工具，在消息流中完成读取、查询、检索与执行。」。时间轴重排：JUDGE 500 → CALL1 1800（params 2000 / done 2600 / results 2800）→ CALL2 4000（params 4200 / done 4800 / results 5000）→ 下一步 6200 → 总时长 7200ms，`useRuntimeTimeline(7200)` + 1200ms hold ≈ 8.4s 重播；全部元素一次渲染、仅 opacity 渐显，无布局跳动。
