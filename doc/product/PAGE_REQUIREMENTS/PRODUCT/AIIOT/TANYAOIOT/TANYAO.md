# TANYAO IOT
> 探曜·AI物联感知平台页面结构

要求：不允许新建样式，必须通过Tailwind CSS v4


创建knowledge-base路由
1、公共的Header与Footer
2、使用公共的PageHero

badge="探曜·AI物联感知平台"
:badge-icon="RadioTower"
title-line="连接、感知、智能"
title-gradient="AIoT智能物联底座"
description="连接设备与现场数据，融合边缘计算、物联网与AI能力，实现设备统一接入、实时感知、智能分析与协同控制。"
visual-label="TANYAOIOT_HORE_WEBM"

右侧动画page-hero__visual  
1:1 复刻 https://www.emqx.com/zh/products/emqx-edge 中<div class="hidden w-full max-w-xl lg:block 2xl:max-w-2xl" style="opacity: 1; transform: none;"><div class="pointer-events-none relative mx-auto h-[600px] w-full max-w-[600px]"><div class="pointer-events-none absolute inset-0"><div class="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/8 via-fuchsia-500/6 to-amber-400/8 blur-3xl"></div></div><svg class="absolute inset-0 h-full w-full" viewBox="0 0 560 560" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><linearGradient id="edgeFlowGradientUp" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.6"></stop>……部分
保持原有布局、尺寸、字体大小、样式、卡片定位、渐变、阴影、Hover、Pulse 动画和 SVG 光点流动路径等不变，仅修改文字内容与icon

【顶部卡片｜平台层】

EMQX Cloud → 探曜AIoT  logo为doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/探曜IOT logo-1.svg 使用IconBox
Fully Managed Cloud → AI-Powered IoT Platform
Managed → AI Powered
Multi-cloud → 链接生态
原 AWS Logo → 数曜logo doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/数曜logo.svg 使用IconBox
原 Google Cloud Logo → 智曜logo doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/智曜logo.svg 使用IconBox
原 Azure Logo → 博曜logo doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/博曜logo.svg 使用IconBox


【中间卡片｜边缘层】

EMQX Edge→ 探曜 Edge
Protocol→ 设备接入 图标：Wifi / RadioTower
Broker→ 边缘计算 图标：Cpu
Bridge → 策略执行 图标：ArrowLeftRight

【底部卡片｜设备层】

Robots→ 工业设备 图标：Factory
Gateways→ 传感器 图标：RadioTower
PLCs → 能源设备 图标：BatteryCharging


板块1:
使用HeroStatsStrip组件1*4，具体内容为：
100+
服务企业

30+
工业协议支持

100+
标准物模型

百万TPS
处理能力


板块2:
section-heading__eyebrow：挑战
标题：AI 时代，IoT 平台面临新挑战
副标题：当 AI 从云端走向物理世界，传统 IoT 平台的能力边界正在被重新定义
ProductFeatureGridSection组件BaseCard 1*4

设备种类多、协议复杂
设备、子系统和第三方平台来源广、差异大，协议碎片化严重，接入工作高度依赖定制开发，难复制、难扩展、难沉淀。

数据有了，但价值释放不出来
没有统一模型、统一语义和统一时序治理，数据只能停留在采集层，难以真正进入业务应用与 AI 场景。

AI 想做事，却进不了现场运行
AI 要真正落地，不只是「看懂数据」，还要接入实时状态、边缘响应与执行通道；缺少这些底座能力，AI 很难从分析走向行动。

平台能连，却难以持续演进
传统平台多停留在功能封装层，开放性不足，难与现有系统深度协同，也难以支撑新应用、新智能体和新场景持续扩展。


板块3:
section-heading__eyebrow：解决方案
标题：多源接入 → 边缘感知 → AI 驱动
副标题：统一连接设备、传感器与工业系统，通过边缘实时采集与计算融合 AI 分析能力，让现场数据从实时感知走向智能决策。

组件1:ProductSystemSection
多源接入
统一连接设备、传感器与工业系统，兼容多种工业协议与数据接口，实现异构设备快速接入。

边缘感知
在现场完成数据采集、解析、清洗与实时计算，让设备状态与业务变化实时可感知。

AI 驱动
融合 AI 分析、预测与决策能力，从设备数据中识别异常、洞察趋势并持续优化运行策略。

组件2:使用ProductSystemFlowFrame组件，flow暂时不传入

板块4:
section-heading__eyebrow：核心能力
标题：为智能感知而生，每一层都深度融合
副标题：不止连接设备，更融合边缘计算与 AI，让感知、分析、决策与执行形成闭环。
使用dlp-challenge中的“核心能力”组件

全栈连接
标题：IoT平台全栈设备连接与接入
描述：作为物理世界运行底座的第一层能力，X-Link 探曜提供从设备、子系统到上层业务应用及第三方 IoT 平台的统一接入能力，满足多行业场景的连接与数据接入需求。
右侧视觉内容给图片占位，后续替换

多协议
标题：原生支持多行业主流协议，开放连接器框架快速适配新设备
描述：内置丰富的协议栈和连接器生态，支持跨行业的标准通信协议，并通过开放框架实现私有协议与新设备的快速适配。原生支持Modbus RTU/TCP、OPC UA/DA、BACnet、MQTT、CoAP、HTTP、Profinet、EtherNet/IP、S7 等
左侧视觉内容给图片占位，后续替换

云边协同
标题：云边协同，就地实时计算与智能响应
描述：通过 探曜Edge 边缘计算平台实现云边端协同架构，在设备现场完成数据采集、协议转换、实时计算和 AI 推理，满足各类场景对低延迟和高可靠的严苛要求。
右侧视觉内容给图片占位，后续替换

时序数据引擎
标题：时序数据采集、存储与分析
描述：内置高性能时序数据引擎，支持海量设备数据的实时采集、持久化存储和多维分析，为设备监测、趋势分析和 AI 模型训练提供可靠的数据基础。
左侧视觉内容给图片占位，后续替换

规则引擎
标题：规则引擎与事件驱动自动化
描述：基于设备状态与数据变化，驱动自动化规则和跨系统联动，通过灵活的规则配置和事件驱动机制，实现从设备告警、状态联动到跨系统业务流程的自动化编排。
右侧视觉内容给图片占位，后续替换

深度融合
标题：IoT平台驱动 AI 智能应用在物理世界落地
探曜作为 AI 进入物理世界的运行底座，向上支撑 AI 原生应用、场景智能体和视觉与感知算法在真实物理场景中的落地运行。结合智曜能力，以集成故障预测、能效洞察、异常分析、运维助手、智能调度、设备健康等超20个智能体及50+感知算法。
左侧视觉内容给图片占位，后续替换

板块5:
section-heading__eyebrow：Device Agent
标题：让AI真正服务物理世界的运行与决策
副标题：围绕loT实时数据、业务规则与场景流程，提供可直接落地的AI产品与应用

ProductFeatureGridSection组件BaseCard 3X3

设备知识Agent
把设备资料、操作手册、维保规范和常见问题沉淀为可自然查询的智能能力。

异常分析Agent
围绕设备异常、状态变化和告警信息，提供异常解释、分析和处置建议。

工单处置Agent
面向工单生成、派发、处置与跟踪场景，提供智能辅助。

运行报告Agent
支持自然语言取数、自动生成报告、异常提示与建议输出。

能耗分析Agent
面向能耗统计、异常识别、高耗对象发现和分析建议输出。

AIoT 伴随Agent
在管理台内提供伴随式交互、导航、解释、分析和操作辅助。

设备健康Agent
围绕设备状态、异常记录和维保记录，输出健康判断和风险提示。

预测维护Agent
面向重点设备识别潜在风险、辅助维护时机判断和优先级排序。

能效优化Agent
围绕能效问题识别、优化建议和持续跟踪，支撑节能降耗工作。


模块7:
引入CtaSection.vue
  <CtaSection
    title="让每一次连接都产生智能价值"
    title-id="tanyao-cta-title"
    description="连接设备与现场数据，以边缘计算与 AI 能力驱动实时感知、智能分析与高效决策。"
    :actions="ctaActions"
  />
   按钮：立即咨询、申请试用


实现说明（TASK-008.1）：页面落地于 `pages/products/ai-iot.vue`（导航 `/products/ai-iot`），数据集中在 `data/tanyao.ts`；Hero 右侧视觉为 `components/product/tanyao/TanyaoHeroVisual.vue`（Tailwind-only，1:1 复刻 EMQX Edge hero 的卡片层级/尺寸/渐变/流动 SVG，仅替换文案与图标，SVG 渐变与滤镜 ID 重命名为 tanyaoFlowGradientUp/Down、tanyaoEdgeGlow 以保证唯一）；Hero 数字条通过 `HeroStatsStrip` 新增的 `columns` prop 支持 1×4；核心能力复用 `AlternatingTimelineSection`（新增 `v-if="item.bullets.length"` 守卫以兼容无 bullets 条目）。
