# About Us
> 关于我们页面结构

创建about_us路由
1、公共的Header与Footer
2、PageHero需要采用居中展示

不需要badge
不需要badge-icon
title-line="关于深度数智（DEEPTROLS）"
不需要title-gradient=
description="构建企业级AI能力体系，让智能成为业务增长的新引擎"
visual-label="ABOUTUS_HORE_WEBM"

背景 使用doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/imgs/custom-rad-hero-bg-video.mp4


section1:使用bg-dt-bg组件
500+
全球客户

30+
覆盖行业

25+
构建场景


section2:构建新组件
组件描述：
文本组件
内容“
武汉深度数智科技有限公司（DeepTrols）是一家专注于企业
级AI落地与能力构建的技术服务公司，致力于帮助企业将人工
智能从“工具能力”转化为“业务生产力”。围绕数据、知识与
Agent执行能力，深度数智构建了一体化的AI产品与服务体系，
为企业提供从底层数据基础到上层业务应用的全链路支撑。
公司自主研发了数曜数据能力平台、博曜知识管理平台、
智曜AI平台以及探曜AI物联能力平台，
形成覆盖数据治理、知识工程、智能决策与业务执行的完整产
品矩阵。同时，通过“企业FDE”服务体系，深度数
智为企业提供从部署接入、场景落地到持续优化的全生命周期
支持，确保AI能力能够真正融入业务流程并持续产生价值。
”


Section3:
不需要section-heading__eyebrow
标题：我们的核心价值观
副标题：这些原则指引着我们的一言一行，从产品创新到客户关系，贯穿始终。

参考https://www.emqx.com/zh/about 中<section class="pb-32 lg:pb-48 container"><h2 class="md:mb-6 text-highlighted text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] text-center mb-4">我们的核心价值观</h2><p class="md:mb-8 lg:mb-12 text-base sm:text-lg md:text-xl text-default text-center mb-12">这些原则指引着我们的一言一行，从产品创新到客户关系，贯穿始终。</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div tabindex="0" class="group relative overflow-hidden rounded-lg cursor-pointer min-h-[100px] outline-none"><div class="invisible px-6 py-12"><div class="mb-4 text-xl font-semibold">根植开源</div><div class="text-base font-normal leading-normal">保持开放心态与透明沟通。我们欢迎每个人的想法与贡献，相信创新可以来自任何地方。</div></div><div class="absolute inset-0 z-1">……

由4个card修改为3个card

极客
动画内容：
技术驱动
保持对技术的热爱与探索，用技术寻找更优解。我们相信真正的创新源于对技术的持续钻研，并最终用技术解决真实问题、创造实际价值。

执着
动画内容：
不走捷径
尊重专业、尊重规律，对真正重要的事情保持耐心与坚持。面对复杂问题不回避、不取巧，把困难的事情做对，把值得做的事情持续做好。

学习
动画内容：
持续进化
保持好奇、开放与求知，在快速变化的技术世界中主动学习、持续思考。不断更新认知、验证实践，让个人、产品与组织一起进化。


Section4:
不需要section-heading__eyebrow
标题：公司地址

使用地图展示公司地址，同时保留地址文本。

湖北省武汉市江汉区泛海国际SOHO-2栋2307


Section5:
不需要section-heading__eyebrow
标题：联系我们

参考https://www.emqx.com/zh/about 中<section class="pb-32 lg:pb-48 container text-center"><h2 class="mb-4 md:mb-6 text-highlighted text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] !mb-12">联系我们</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-2xl border border-default"><div class="flex flex-col"><a href="mailto:contact@emqx.io" target="_self" class="flex-1 flex flex-col justify-center gap-2 p-8 md:p-10 transition-colors duration-250 hover:bg-muted/50"><div class="text-base font-normal text-muted">综合咨询</div><div class="text-lg text-highlighted font-semibold">contact@emqx.io</div>……

综合咨询
contact@deeptrols.com

产品咨询
product@deeptrols.com

技术支持
support@deeptrols.com

人才招聘
hr@deeptrols.com


实现说明（TASK-009.1）：About Us 页面落地于 `pages/about_us.vue`，Header「关于我们」导航改为 `/about_us`。Hero 复用公共 `PageHero` 的居中模式，公共组件已扩展为可选 badge、badge icon、title gradient、actions 与 visual slot，本页不渲染 badge / badge-icon / title-gradient / actions；需求中的 `custom-rad-hero-bg-video.mp4` 已从产品文档附件迁移到运行时资产 `public/images/about/custom-rad-hero-bg-video.mp4`，页面通过 `backgroundVideoSrc` 使用，不直接引用 `doc/product/**/imgs`。页面内容集中在 `data/about.ts`，业务区块拆分为 `components/about/AboutHero.vue`、`AboutStatsSection.vue`、`AboutIntroSection.vue`、`AboutValuesSection.vue`、`AboutAddressSection.vue`、`AboutContactSection.vue` 与文本组件 `AboutTextBlock.vue`；统计条复用 `HeroStatsStrip`，核心价值观为 3 张 hover/focus 动画卡。

实现说明（TASK-009.2）：About Hero 使用 About 专属类提升首屏高度与 Header 下方留白；公司介绍改为左对齐 card；公司地址改为地址信息 + 地图嵌入；联系我们移除社交媒体，仅保留 4 个邮箱渠道，并按两行两列展示。

实现说明（TASK-009.3）：公司介绍正文使用 `AboutTextBlock` 的 `full` 尺寸，保证正文宽度与“公司介绍”标题所在内容宽度一致。
