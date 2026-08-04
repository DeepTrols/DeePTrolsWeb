# product/data/dlp
> 数曜·数据标签平台页面结构


要求：不允许新建样式，必须通过Tailwind CSS v4


创建dlp路由
1、公共的Header与Footer
2、使用公共的PageHero

badge="数曜·数据标签平台"
:badge-icon="Boxes"
title-line="协同、智能、高效"
title-gradient="标签生产平台"
description="覆盖标签生产全流程，实现标签标准化、数据高质量和高效率生产，为精准运营与智能决策提供支撑"
visual-label="SHUYAODGP_HORE_WEBM"

右侧动画说明：使用图片占位符（后续替换）

按钮为申请试用和了解更多，了解更多点击后定位到第二屏



板块1:
section-heading__eyebrow：挑战
标题：厌倦了低效的标签建设？
副标题：传统的数据标签建设方式依赖人工开发与分散管理，难以支撑企业数据治理和 AI 应用的持续发展。
ProductFeatureGridSection组件BaseCard

标准混乱
缺乏统一的标签标准和管理规范，不同部门各自定义标签，命名、口径与计算规则不一致，导致重复建设、数据难以共享，业务协同效率持续下降。

开发繁琐
标签创建高度依赖 SQL 开发和人工维护，从需求提出到上线周期长。面对频繁变化的业务需求，开发资源持续投入，标签生产效率难以提升。

治理缺失
随着标签数量不断增长，缺乏质量、血缘、版本及生命周期管理能力，标签可信度和可维护性逐渐降低，治理成本不断增加。

价值孤岛
标签分散在不同业务系统和数据平台，缺少统一的服务能力，难以支撑分析、营销、运营及 AI 等多场景应用，数据价值无法持续释放。


板块2:
section-heading__eyebrow：解决方案
标题：轻松构建企业标签体系
副标题：统一标签标准、生产、治理与服务能力，让标签从创建到应用形成一体化闭环。

使用ProductSystemFlowFrame组件，flow暂时不传入


板块3:
section-heading__eyebrow：核心优势
标题：构建统一的企业标签体系
副标题：专为企业数据治理、精准运营与 AI 应用打造的一体化标签平台。

ProductFeatureGridSection组件

统一标签标准
建立统一的标签规范、命名规则和业务口径，避免重复建设，提升标签一致性与共享能力。

⸻

可视化建模
通过可视化方式快速完成标签设计与配置，降低开发门槛，提升标签生产效率。

⸻

自动化生产
支持定时、实时等多种标签计算模式，实现标签自动生成、更新与持续维护。

⸻

全程治理
提供标签血缘、质量、版本、生命周期等治理能力，保障标签可信、可管、可追溯。

⸻

标签服务
统一提供标签查询、开放接口和服务能力，实现 BI、营销、运营及 AI 应用共享调用。

⸻

AI 深度融合
面向大模型和智能体提供高质量标签数据支撑，为画像分析、智能推荐、精准运营等 AI 场景持续赋能。


板块4:
section-heading__eyebrow：核心能力
标题：让每一个标签创造价值
副标题：数曜·数据标签平台覆盖标签建模、生产、治理、服务与应用全流程，让企业标签更易构建、更易管理、更易复用。


下面的排版1:1还原https://www.emqx.com/zh/products/emqx-edge 中的<section class="pb-32 lg:pb-44"><div class="container"><div class="text-center"><p class="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">边缘计算</p><h2 class="mb-4 md:mb-6 text-highlighted text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] !mb-0">您的轻量级边缘 MQTT 服务器</h2><p class="mb-6 md:mb-8 lg:mb-12 text-base sm:text-lg md:text-xl text-default mx-auto mt-4 !mb-0 max-w-2xl">EMQX Edge 是功能齐全的 MQTT 服务器，部署于本地，处理设备通信并将关键数据桥接至云端。</p></div><div class="relative mt-14 lg:mt-18"><div class="pointer-events-none absolute left-4 top-0 z-0 h-full w-px rounded-full bg-zinc-400/35 dark:bg-zinc-500/30 lg:left-1/2 lg:-translate-x-1/2"></div><div class="relative z-10 space-y-12 lg:space-y-18"><div class="relative"><span class="absolute left-4 top-4 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-primary/25 bg-default text-[13px] font-semibold text-primary …… 部分

01 分类：标签建模
标题：统一定义标签标准
描述：通过统一的标签目录、命名规范和业务口径，建立标准化标签模型，减少跨部门理解偏差与重复建设。
要点：

* 统一标签分类与命名规范
* 支持基础、规则与组合标签
* 沉淀可复用的标签模型
右侧视觉内容给图片占位，后续替换

02 分类：标签生产
标题：快速完成标签生产
描述：通过可视化配置与自动化计算能力，降低标签开发门槛，快速响应持续变化的业务需求。
要点：

* 可视化配置标签规则
* 支持离线与实时计算
* 自动调度标签更新任务
左侧视觉内容给图片占位，后续替换

03 分类：标签治理
标题：让标签持续可信可用
描述：围绕质量、血缘、版本和生命周期进行统一治理，确保每个标签来源清晰、口径一致、状态可控。
要点：
* 追踪标签来源与加工血缘
* 管理标签版本与变更记录
* 监测质量、热度与使用状态
右侧视觉内容给图片占位，后续替换

04 分类：标签服务
标题：统一开放标签能力
描述：将分散的标签转化为标准化服务，通过接口、查询与人群圈选能力，为不同业务系统提供统一调用入口。
要点：

* 提供统一标签查询服务
* 支持 API 与批量数据输出
* 支持人群筛选与标签组合
左侧视觉内容给图片占位，后续替换

05  分类：场景应用
标题：驱动数据与 AI 应用
描述：将高质量标签快速应用于用户洞察、精准运营、风险识别和 AI 场景，让标签真正进入业务流程。
要点：
* 支撑用户画像与精细化运营
* 服务推荐、营销与风险分析
* 为模型与智能体提供标签数据
右侧视觉内容给图片占位，后续替换


板块5:
section-heading__eyebrow：标签沉淀
标题：从数据对象到标签服务
副标题：围绕企业数据标签全生命周期，覆盖对象建模、标签定义、自动加工与服务发布，让标签快速转化为可共享、可复用的数据资产。

ProductFeatureGridSection组件BaseCard
但是需要2x2

主体对象自由定义
万物皆对象，万物皆可建模。支持用户自定义实体对象(Object) 对现实世界建模，并通过可视化配置将主体对象与数据湖中的原料数据表进行映射，以备标签加工时使用。

标签定义模式丰富
提供拖拽模式、圈选模式、轻量脚本等多种可视化标签定义模式，最大化满足业务专家灵活便捷自定义标签需求。

动态打标自动落库
标签加工引擎读取标签加工规则自动加工标签数据，加工结果自动落表，标签数据物理分散存储、逻辑统一，用户无感。

标签即服务
提供基于标签体系在线发布API服务、基于标签进行查询与分析的自助式服务，实现价值数据萃取和便捷服务化。


板块6:
左侧：
section-heading__eyebrow：AI 辅助建标
标题：通过 AI 快速完成标签设计与建模
副标题：基于大语言模型理解业务需求，自动生成标签定义、对象模型和加工规则，帮助业务人员快速完成标签设计。

右侧：
图片，先使用图片占位符，后续再更换


板块7:
section-heading__eyebrow：应用场景
标题：为企业 AI 场景赋能
副标题：构建统一的企业标签体系，支撑用户洞察、精准运营和 AI 应用，让标签持续释放数据价值。

ProductFeatureGridSection组件BaseCard

精准用户运营
基于统一标签体系构建用户画像，支持人群圈选、精准营销和个性化运营，提升用户触达效率与转化效果。

企业数据分析
通过标签沉淀业务特征，支撑经营分析、指标监测和多维洞察，帮助企业快速发现业务机会。

AI 智能应用
为大模型、智能体和推荐系统提供高质量标签数据，提升 AI 对业务的理解能力和决策效果。

板块7:
<CtaSection
    title="构建企业自身的AI能力"
    description="让数据成为资产，让知识驱动决策，让AI创造价值"
    :actions="ctaActions"
  />

  按钮：立即咨询、申请试用