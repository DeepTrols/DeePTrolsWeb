# DEVICEAGENT
> Device Agent页面结构

要求：不允许新建样式，必须通过Tailwind CSS v4


创建knowledge-base路由
1、公共的Header与Footer
2、PageHero需要采用居中展示

badge="Device Agent"
:badge-icon="Cpu"
title-line="让Agent基于实时数据决策与行动"
title-gradient="串联事件、记忆、执行和决策"
description="Device Agent是运行在本地或云端的事件驱动Agent Runtime，原生连接时序数据、知识库与设备，可快速实现设备自动预警、事件处置、工单派发等任务。"
visual-label="DEVICEAGENT_HORE_WEBM"

中间的动画page-hero__visual
 参考https://www.emqx.com/zh/cloud/emqx-agents 中的<div class="relative mt-10 w-full max-w-[860px]" style="opacity: 1; transform: none;"><div class="pointer-events-none absolute -inset-x-12 -bottom-4 -top-8 -z-0 rounded-[3rem] bg-primary/8 blur-3xl lg:-inset-x-24" aria-hidden="true"></div><div class="relative"><div class="relative w-full"><div class="relative overflow-hidden transition-shadow rounded-2xl border border-primary/15 bg-default shadow-sm dark:border-primary/20 dark:bg-elevated dark:shadow-lg"><div class="relative min-h-[140px] px-5 pt-5 pb-3"><div aria-hidden="true" class="pointer-events-none absolute text-left leading-relaxed text-muted text-base sm:text-lg inset-x-5 top-5">将固件 v2.4 以 10% 灰度发布到 EU-West 设备群，KPI 退化时自动暂停。 <span class="ml-[2px] inline-block h-[1em] w-[1.5px] animate-pulse bg-primary align-baseline"></span></div><textarea aria-label="Agent 编排器" rows="3" placeholder="" class="relative w-full resize-none bg-transparent leading-relaxed text-highlighted outline-none text-base sm:text-lg"></textarea></div><div class="flex items-center justify-between gap-3 border-t py-2.5 border-primary/10 bg-primary/3 px-3 dark:border-primary/15 dark:bg-muted/30"><div class="flex flex-wrap items-center gap-1.5"><button type="button" aria-pressed="false" class="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors border-default bg-default/70 text-muted hover:bg-muted/50 hover:text-highlighted">……要求1:1复制 

 保持原页面 DOM 结构、布局、尺寸、圆角、边框、阴影、背景、字体、间距、响应式、输入动画、光标动画、按钮样式及所有交互效果不变，不重新设计 UI。
仅将原有 Agent 场景内容替换为以下 6 个场景：

1. 事件预警
持续监测设备运行状态，当温度超过 85℃ 或振动异常时，立即生成告警并通知相关负责人。

2. 事件处置
分析当前异常事件，结合历史处置记录生成处置方案，并自动执行可授权的处理动作。

3. 工单派发
根据告警设备、故障类型和责任区域自动生成维修工单，并派发给对应运维人员。

4. 预测维护
分析设备历史运行、振动和温度数据，预测未来 7 天故障风险并生成维护计划。

5. 周报汇总
汇总本周设备运行、告警、故障和工单数据，自动生成设备运维周报。

6. 智能问数
查询本月各区域设备故障率、平均维修时长和工单完成率，并分析异常变化原因。
底部场景按钮按照：
事件预警 / 事件处置 / 工单派发 / 预测维护 / 周报汇总 / 智能问数


Section1:
section-heading__eyebrow：智能体生态
标题：让 AI 进入 IoT 业务现场的场景智能体
副标题：围绕设备、运维、报告、能耗与管理场景，探曜将 AI 封装为可落地的场景智能体，帮助企业更低门槛地把 AI 用在真实业务中。

引用探曜·AI物联感知平台页面中的板块5中的内容

实现说明（TASK-008.2）：页面落地于 `pages/products/device-agent.vue`（导航 `/products/device-agent`），6 个 Agent 场景文案集中在 `data/device-agent.ts`（`DeviceAgentScene { label, icon, prompt }`）。Hero 采用公共 `PageHero` 新增的 `align="center"` 单列居中版式（文案 `max-w-4xl text-center`、描述/CTA 居中、视觉居中且不渲染 `page-hero__visual-glow`），badge/title/description/visual-label 按需求传入，`actions` 传空数组（本页 Hero 无 CTA）。中部视觉 `components/product/device-agent/DeviceAgentHeroVisual.vue` Tailwind-only 1:1 复刻 EMQX Agents 编排器面板：外层 glow、`rounded-2xl` 面板、ghost 打字层（含 `animate-pulse` 光标）+ `Agent 编排器` textarea、底部场景按钮条与发送按钮，全部沿用原 DOM 结构/尺寸/圆角/边框/阴影/字体/间距/响应式；打字机自动轮播与场景切换计时器在 `onMounted` 启动、`onBeforeUnmount` 清理（SSR 安全）。因站点仅暗色且 `bg-muted`/`bg-default` 为 `@utility` 不支持透明度修饰符，面板背景取暗色值 `bg-elevated`、发送区背景以 `bg-dt-bg-soft/30` 等价实现 `dark:bg-muted/30`、未激活按钮背景以 `bg-dt-bg/70`/`hover:bg-dt-bg-soft/50` 等价实现 `bg-default/70`/`hover:bg-muted/50`。Section1 复用探曜页板块5 的 `tanyaoAgents` 数据，经公共 `ProductFeatureGridSection`（`columns="three"`、`nowrap-subtitle`）渲染，仅替换 eyebrow/标题/副标题。



