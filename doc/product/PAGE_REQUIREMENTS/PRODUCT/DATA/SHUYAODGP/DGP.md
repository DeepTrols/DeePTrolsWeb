# product/data/dgp
> 数曜·数据治理平台页面结构


要求：不允许新建样式，必须通过Tailwind CSS v4


创建dgp路由
1、公共的Header与Footer
2、使用公共的PageHero

badge="数曜·数据治理平台"
:badge-icon="Database"
title-line="可用、可管、可信"
title-gradient="企业数据底座"
description="打通多源数据，建立标准化、资产化的数据体系，持续支撑AI应用落地"
visual-label="SHUYAODGP_HORE_WEBM"

右侧动画说明：
```text
参考页面：
https://www.esenruizhi.com/products/ruizhi.html

参考区域：
页面中的 .ban-img 动画区域。
需要还原以下视觉元素：

1. 三层透明背景图叠加
2. 多组分布在不同位置的发光节点
3. 节点呼吸、闪烁、缩放动画
4. 局部元素轻微漂浮动画
5. SVG 路径上的流光运动
6. 整体呈现蓝紫色科技感、数据连接感
7. 动画连续循环，不能出现明显停顿或跳帧

先检查以下参考图片能否正常下载：
https://www.esenruizhi.com/static/2021/images/product_ruizhi/ban-shape1.png
https://www.esenruizhi.com/static/2021/images/product_ruizhi/ban-shape2.png
https://www.esenruizhi.com/static/2021/images/product_ruizhi/ban-shape3.png
https://www.esenruizhi.com/static/2021/images/product_ruizhi/ruizhi1.png

将图片保存到doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs

不要继续引用远程地址


3、板块：
section-heading__eyebrow：核心价值
标题：为什么选择数曜·治理数据平台
副标题：让治理好的数据，安全、高效、稳定地供给业务

参考https://www.emqx.com/zh/products/flowmq中的
<section class="pt-24 pb-32 lg:pb-44"><div class="container"><div class="mb-12 flex flex-col items-center gap-2 text-center lg:mb-16"><span class="text-sm font-semibold uppercase tracking-wide text-primary">核心价值</span><h2 class="mb-4 md:mb-6 text-highlighted text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] !mb-0">为什么选择 FlowMQ</h2>……（我需要1:1还原这个部分）
写一个新组件，也沉淀为通用组件

让数据快速可用
把数仓与各类数据源中的数据三分钟封装为标准 API，无需逐个开发接口，加快数据对外开放。

统一数据服务出口
生成与已有 API 统一纳管到 API 市场，接口格式、调用方式与权限统一，告别接口散乱。

保障调用安全可控
申请-授权流程配合多种签名鉴权与限流，控制谁能调、调多少，保障数据输出安全。

支撑高并发稳定服务
API 网关、横向扩展与缓存加速，支撑大调用量下的稳定、低延迟数据服务。


4、板块：
section-heading__eyebrow：产品架构
标题：数据接入 → 智能治理 → 数据赋能
副标题：统一连接企业多源数据，构建标准化治理体系，持续输出高质量数据资产，为 AI 应用与业务创新提供可靠的数据底座

使用ProductSystemSection.vue完成，暂时不引入流程图
新建SystemCards组件，参考https://www.emqx.com/zh/products/flowmq中的
<div class="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12"><div class="group relative flex flex-col overflow-hidden rounded-2xl border border-default bg-muted/30 p-5 transition-all duration-300 hover:border-primary/40 hover:bg-muted/50"><div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div><div class="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-sm font-bold text-primary ring-1 ring-primary/20">01</div><h3 class="relative mt-4 text-[15px] font-semibold text-highlighted">协议接入</h3>……（我需要1:1还原这个部分）

数据接入
统一连接数据库、API、文件、消息队列、IoT 等多源异构数据，构建标准化的数据接入体系，实现企业数据的高效汇聚与统一管理。


智能治理
围绕数据标准、数据质量、元数据、标签体系及资产管理，建立全生命周期治理机制，持续提升数据的准确性、一致性与可信度。


数据赋能
将治理后的高质量数据以数据服务、共享交换、分析应用等方式持续输出，为企业决策分析、业务创新及 AI 应用提供可靠的数据支撑。


5、板块：
section-heading__eyebrow：产品能力
标题：专为企业数据治理打造
副标题：统一连接企业多源数据，构建覆盖接入、治理、资产与服务的全生命周期数据治理体系，让数据真正成为企业数字化与 AI 创新的核心生产力。

引用板块3中的组件

数据集成
对数据进行建模、清洗、转换、抽取等工作，既可对多源异构数据进行整合，也可为数据应用提供数据模型。

数据交换
用于实现异构系统间的数据传输交换，可提供文件、接口、数据库等多种交换方式。

实时计算存储
海量数据分布式高效存储和统一管理，为企业业务决策提供实时的数据支撑。

元数据
描述数据特征的数据，是数据治理的基础，可分析数据来龙去脉，提供血缘关系、影响分析及数据地图等。

数据标准
对数据进行统一约束和规范，评估标准落地情况，提供系统建设依据。

数据质量
发现质量问题，提供绩效评分，出具质量分析报告，发起数据整改。让数据清澈如水。

主数据
对需要共享的数据建立统一视图和集中管理，为各业务系统数据调用提供黄金数据。

数据资产
将数据作为资产，对外提供数据服务，进行不同角色的目录化管理，获知资产访问方式、利用情况等。


6、板块
section-heading__eyebrow：企业级数据治理
标题：企业数据治理体系的演进
副标题：数曜·治理数据平台提供统一的数据治理底座，贯通数据接入、治理、资产与服务，持续沉淀高质量、可信赖的数据资产。

参考https://www.emqx.com/zh/products/emqx 中
<section class="container pb-32 lg:pb-44"><div class="mb-12 flex flex-col items-center gap-2 text-center lg:mb-16"><span class="text-sm font-semibold uppercase tracking-wide text-primary">企业级消息</span><h2 class="mb-4 md:mb-6 text-highlighted text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] !mb-0">企业级消息架构的演进</h2><p class="mb-6 md:mb-8 lg:mb-12 text-base sm:text-lg md:text-xl text-default !mb-0">EMQX 企业版提供统一的 MQTT 平台，兼顾实时通信与可靠的异步消息传递。</p></div><div><div class="grid gap-10"><div class="group relative grid gap-6 lg:grid-cols-2 lg:gap-12"><div class="lg:flex lg:items-center lg:col-start-1 lg:pr-12"><div class="rounded-2xl border border-default bg-default p-6 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/40">……（我需要1:1还原排版和样式）

卡片1:
heading__eyebrow：统一治理
标题：一个平台，治理全域数据
描述：统一连接数据库、API、文件、消息队列及 IoT 等多源异构数据，将分散的数据治理工具整合至同一平台，构建覆盖数据全生命周期的一体化治理体系。
* 多源异构数据统一接入
* 数据标准与元数据统一管理
* 数据治理流程统一编排

右侧的配图先用占位符代替，等我后续替换


卡片2:
heading__eyebrow：质量可信
标题：让每一份数据准确、完整、可信
描述：围绕数据完整性、准确性、一致性和及时性建立自动化质量管控机制，持续发现、定位和修复数据问题，保障关键业务数据稳定可靠。
* 自动化数据质量检测
* 数据血缘与影响分析
* 问题发现、告警与闭环整改

左侧的配图先用占位符代替，等我后续替换


卡片3:
heading__eyebrow：资产赋能
标题：让数据从资源转化为资产
描述：通过数据目录、标签体系、资产盘点和服务发布，将治理后的数据统一沉淀为可查找、可理解、可使用的数据资产，为业务分析与 AI 应用持续供给高质量数据。
* 企业数据资产统一目录
* 数据标签与资产画像
* 数据服务与共享应用

右侧的配图先用占位符代替，等我后续替换


7、板块：
section-heading__eyebrow：应用场景
标题：推动企业数据基础设施建设
副标题：构建统一的数据治理体系，帮助企业实现数据标准化、资产化与智能化，持续释放数据价值。

Tabs：
tab1:政务数据
标题：政务数据治理
描述：打通跨部门、跨层级数据资源，建立统一的数据标准、数据目录与共享交换体系，支撑公共数据资源高效流通与应用。
button“了解更多<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide shrink-0 size-4" width="1em" height="1em" viewBox="0 0 24 24" data-slot="trailingIcon"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"></path></svg>”
左侧图片：图片占位符（后续替换）

tab2:智能制造
标题：物联数据汇聚与治理
描述：统一采集设备、MES、ERP、SCADA 等多源数据，构建制造数据底座，为质量分析、设备预测及 AI 应用提供可信数据。
button“了解更多<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide shrink-0 size-4" width="1em" height="1em" viewBox="0 0 24 24" data-slot="trailingIcon"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"></path></svg>”
左侧图片：图片占位符（后续替换）

tab3:预测性维护
标题：预测性维护
描述：从关键资产采集实时振动、温度和使用数据，为 AI/ML 模型提供输入，在故障发生前精准预测。
button“了解更多<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide shrink-0 size-4" width="1em" height="1em" viewBox="0 0 24 24" data-slot="trailingIcon"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"></path></svg>”
左侧图片：图片占位符（后续替换）

tab4:能源电力
标题：数据引擎
描述：汇聚设备、监测、调度及业务数据，形成统一能源数据底座，为设备运维、负荷预测及能源优化提供数据支撑。
button“了解更多<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide shrink-0 size-4" width="1em" height="1em" viewBox="0 0 24 24" data-slot="trailingIcon"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"></path></svg>”
左侧图片：图片占位符（后续替换）


8、板块：
引入CtaSection.vue
  <CtaSection
    title="开启企业数据治理新征程"
    title-id="dgp-cta-title"
    description="统一接入、智能治理、资产运营，让数据成为企业数字化转型与 AI 发展的核心生产力。"
    :actions="ctaActions"
  />