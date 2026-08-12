# BOYAO Knowledge Base Management Platform
> 博曜·企业级知识管理平台页面结构

要求：不允许新建样式，必须通过Tailwind CSS v4


创建knowledge-base路由
1、公共的Header与Footer
2、使用公共的PageHero

badge="博曜·企业级知识管理平台"
:badge-icon="BookOpen"
title-line="汇聚、理解、激活"
title-gradient="企业知识管理平台"
description="连接企业分散知识，统一完成知识采集、解析、组织与管理，为智能检索、知识问答与企业 AI 应用提供高质量知识底座。"
visual-label="BOYAOKNOWLEDGE_HORE_WEBM"

需要在page-hero__actions的下方插入
参考https://www.emqx.com/zh/products/emqx 中<div class="mt-8 grid max-w-2xl grid-cols-3 gap-4" style="opacity: 1; transform: none;"><div class="rounded-xl border border-default bg-muted/50 px-3 py-3 text-center backdrop-blur-sm"><div class="text-xl font-semibold text-highlighted lg:text-2xl">500M+</div><div class="mt-0.5 text-xs text-muted">连接设备</div></div><div class="rounded-xl border border-default bg-muted/50 px-3 py-3 text-center backdrop-blur-sm"><div class="text-xl font-semibold text-highlighted lg:text-2xl">500K+</div><div class="mt-0.5 text-xs text-muted">集群数量</div></div>……部分
内容如下：
70%+
运营效率提升

50%+
检索效率提升

200+
服务客户

右侧动画page-hero__visual  
1:1 复刻 https://www.emqx.com/zh/products/emqx-neuron 中<div class="hidden w-full max-w-2xl lg:block" style="opacity: 1; transform: none;"><div class="pointer-events-none relative mx-auto h-[520px] w-full max-w-[680px]"><div class="pointer-events-none absolute inset-0"><div class="absolute left-1/3 top-1/3 h-[280px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-500/12 via-violet-400/10 to-blue-400/10 blur-3xl"></div></div><div class="absolute left-[8px] top-[20px] w-[200px]"><div class="group relative overflow-hidden rounded-xl border border-blue-400/25 bg-default px-5 py-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"><div class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-400/70 to-blue-400/40"></div><div class="mb-4 flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg border border-default bg-muted/50"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-5 text-blue-400" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16h.01M16 16h.01M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zm5-3h.01"></path></svg>……部分
保持原有布局、尺寸、字体大小、样式、卡片定位、渐变、阴影、Hover、Pulse 动画和 SVG 光点流动路径等不变，仅修改文字内容与icon
- 左上卡片修改为：
企业知识资产
知识采集

原始素材
PDF、Word、PPT……

业务系统
OA、ERP、CRM……

经验知识
案例、问答、标准……

- 中央主卡片修改为
icon：doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/博曜logo.svg 博曜·企业级知识管理平台

三个能力卡修改为：

知识加工
多模态文档解析

知识表示
语义建模·知识图谱

知识应用
智能检索·智能体

分别使用适合知识解析、知识图谱/语义关联、AI 智能体的 Lucide 图标。

- 右下卡片修改为：
智能应用
企业场景

内部四个模块：

智能检索
知识问答
智能助手
智能体

底部大模块：

业务系统

不要使用 AWS、Azure、GCP、EMQX 等品牌 Logo，统一替换为 Lucide 图标。

保持原版 blue / violet 配色、两组 SVG 流动光点、Glow、Pulse、路径坐标、动画时长和延迟不变。


板块1:
section-heading__eyebrow：挑战
标题：传统管理模式很难对知识进行挖掘
副标题：知识文档来源分散、安全合格要求严格,传统的管理模式很难对知识价值进行挖掘，进而有效支撑业务。
ProductFeatureGridSection组件BaseCard

来源收集难
组织知识文档包含用户本地的创作、业务系统运行过程生成、外部的文献/专利/情报等，很难进行统一的收集管理

知识查找难
在组织运行当中，组织知识文档量级巨大，格式繁杂，其中包含文档、图片、音视频、图纸等等，员工很难在需要时快速找到

业务利用难
组织过往更加重视业务过程中的结构化数据管理，知识文档与业务脱节，导致业务知识沉淀困难，并且在业务上也很难得到知识支撑。

知识挖掘难
组织中非结构化数据包含大量的知识，隐性的知识难于挖掘，并且碎片化的知识点缺少关联，很难有效的支撑组织业务


板块2:
section-heading__eyebrow：核心价值
标题：企业选择博曜的理由
1:1复刻https://www.emqx.com/zh/products/emqx 中 <div class="flex flex-col gap-6"><div class="group relative overflow-hidden rounded-2xl border border-default bg-default shadow-sm transition-shadow duration-500 hover:shadow-md"><div class="grid lg:grid-cols-2"><div class="flex flex-col justify-center p-8 lg:p-12"><span class="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary">平台与基础设施团队</span><h3 class="text-2xl font-bold leading-tight text-highlighted lg:text-[28px]">告别复杂的消息中间件组合</h3><p class="mt-4 text-[15px] leading-relaxed text-muted">用一个平台替代分散的 MQTT Broker、Kafka 集群和胶水代码，统一完成部署、监控和扩展。</p><blockquote class="mt-8 border-l-2 border-primary pl-4"><p class="text-[15px] italic leading-relaxed text-highlighted/80">"我们淘汰了 3 个中间件组件，运维负担减轻了 60%。"</p><cite class="mt-2 block text-xs font-medium not-italic text-dimmed">—— 某世界 500 强制造企业高级 IoT 架构师</cite></blockquote></div><div class="relative hidden items-center justify-center p-4 lg:flex lg:p-6"><div class="relative flex h-[320px] w-full select-none items-center justify-center"><div class="pointer-events-none absolute inset-0"><div class="absolute left-1/2 top-1/2 size-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/8 via-violet-500/5 to-blue-500/8 blur-3xl"></div></div><div class="relative flex items-center gap-10"><div class="flex flex-col items-end gap-3"><div class="_legacyItem_jm3tz_58 _legacyDelay0_jm3tz_62 relative flex w-40 items-center gap-2.5 rounded-xl border border-default bg-default px-4 py-2.5 shadow-sm"><div class="flex size-8 items-center justify-center rounded-lg bg-muted/50"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-4 text-dimmed" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16.247 7.761a6 6 0 0 1 0 8.478m2.828-11.306a10 10 0 0 1 0 14.134m-14.15 0a10 10 0 0 1 0-14.134m2.828 11.306a6 6 0 0 1 0-8.478"></path><circle cx="12" cy="12" r="2"></circle></g></svg> …… 部分，并将其抽离成公共组件


heading__eyebrow：业务效率
标题：提升内外部业务效率
描述：通过统一知识沉淀、智能检索与 AI 应用，减少重复查找与人工处理，让企业知识更快进入业务流程。

构建与运营成本降低 10倍+
运营效率提升 70%+
助力销售业绩增长 20%+
右侧动画：
左侧替换为：
企业文档
业务系统
经验知识

原来的核心节点改成：博曜·企业级知识管理平台 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--c-brand size-10 text-primary" width="1em" height="1em" viewBox="0 0 32 32"><g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.7132 7H9.05807V7.00359C9.03508 7.00239 9.01233 7 8.98899 7C8.12434 7 7.42358 7.69925 7.42358 8.56179C7.42358 9.42399 8.12434 10.1232 8.98899 10.1232C9.01233 10.1232 9.03508 10.1208 9.05807 10.12V10.1232H25.7132C26.5779 10.1232 27.2786 9.42399 27.2786 8.56179C27.2786 7.69925 26.5779 7 25.7132 7Z" fill="#5E4EFF"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.7132 21.8767H9.05807V21.88C9.03508 21.8791 9.01233 21.8767 8.98899 21.8767C8.12434 21.8767 7.42358 22.576 7.42358 23.4385C7.42358 24.3007 8.12434 24.9999 8.98899 24.9999C9.01233 24.9999 9.03508 24.9976 9.05807 24.9967V24.9999H25.7132C26.5779 24.9999 27.2786 24.3007 27.2786 23.4385C27.2786 22.576 26.5779 21.8767 25.7132 21.8767Z" fill="#5E4EFF"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3383 15.9996C21.3383 15.1852 20.7129 14.5174 19.9155 14.445V14.4379H5.6348V14.4414C5.61177 14.4405 5.58904 14.4379 5.56571 14.4379C4.70106 14.4379 4 15.1371 4 15.9996C4 16.8621 4.70106 17.5614 5.56571 17.5614C5.58904 17.5614 5.61177 17.5587 5.6348 17.5578V17.5614H19.9155V17.5542C20.7129 17.4821 21.3383 16.814 21.3383 15.9996Z" fill="#5E4EFF"></path></g></svg>
修改为doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/博曜logo.svg


heading__eyebrow：知识整合
标题：海量碎片化知识整合
描述：统一整合文档、系统与经验知识，通过解析、抽取与语义建模，将分散信息转化为可持续运营的企业知识，实现可用知识源规模扩大 10 倍+、数据利用率提升 ≥50%、要素抽取准确度 ≥90%。

下方动画：
右侧原动画节点按原数量和原位置替换为：
知识库
知识图谱
知识应用

中间节点修改为博曜·企业级知识管理平台，logo同样替换成doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/博曜logo.svg 底部为解析·抽取·建模
最左侧Devices替换为 非结构化数据
底部修改为 10倍+ 可用知识源规模



heading__eyebrow：知识应用
标题：更顺畅的知识共享应用
描述：通过智能检索、知识问答与 AI 智能体，让企业知识更易查找、理解与应用，实现检索效率提升 ≥50%、知识获取仅需 3 秒、长尾知识覆盖率提升 10 倍+。
下方动画：
顶部胶囊：由99.99% Uptime SLA 修改为 3秒 获取知识，前面的绿色 Pulse Dot 保留。
中央立方体：原来中央是 Shield 图标。需要修改为Sparkles 
中央立方体本身仍然不要增加文字，保持原版的极简结构。下面三个标签：
SOC 2
ISO 27001
TISAX
严格替换为：
智能检索
知识问答
智能体

底部价值胶囊：将
$500K+ Annual TCO Savings
修改为：
≥50% 检索效率提升 完整视觉 [ Search Icon ]  ≥50%    检索效率提升


板块3:
section-heading__eyebrow：架构图
标题：统一知识架构：连接、理解与应用
副标题：以统一知识架构贯通知识采集、加工、组织与应用，让企业知识从分散沉淀走向智能理解与持续应用。

使用ProductSystemFlowFrame组件，flow暂时不传入


板块4:
section-heading__eyebrow：核心能力
标题：让企业知识真正理解业务
副标题：从知识加工、知识表示到知识应用，融合知识库、知识图谱与 AI 能力，让分散知识实现统一沉淀、深度关联与智能应用。
使用 AlternatingTimelineSection 组件（参考 DLP 核心能力），内容为原板块6/7/8（精准/高效/稳定）三行左右交错叙事，右侧/左侧图片沿用组件内置图片占位符（TASK-007.4 已并入，页面不再单独渲染板块6/7/8）

模块6:
section-heading__eyebrow：功能
标题：安全·合规·高效·智能
副标题：六大核心功能-助力组织构建安全、合规、高效、智能的知识文档管理平台。
ProductFeatureGridSection组件BaseCard 3x2

知识文档采集存储
全面采集来自用户本地、异构系统、外部情报的知识文档，归集与一个统一平台
知识文档在线协作
无需本地编制传阅，通过系统在线编辑，在线协同、支持对内以及对外的文档共享
知识文档合规管理
对知识文档分类、标签、编号、模版、版本、权限等自动控制，满足合规要求
知识文档搜索利用
知识文档提供了智能搜索通道，且通过门户、地图、专题等多种场景进行知识推荐
知识文档业务融合
自动采集业务文档，面向业务系统提供知识推送、搜索、管理、存储等服务支撑
知识文档智慧创新
结合AI技术实现知识文档智能推荐、知识 图谱，利用大模型辅助知识创作、创新


板块5:
section-heading__eyebrow：系统集成
标题：集成 -> 采集 -> 调用
副标题：博曜提供强大的集成引擎，从异构系统中自动采集知识文档，形成整个组织的统一知识文档库，同时为异构系统提供知识文档的调用服务。
使用ProductSystemFlowFrame组件，flow暂时不传入

板块6（TASK-007.4 起并入板块4 AlternatingTimelineSection，页面不再单独渲染）:
左侧：
section-heading__eyebrow：精准
标题：多模态文档解析，表格识别更精准
副标题：复杂版面也能准确理解，多模态内容一次解析、完整提取。
下方描述：
兼容多种文件格式
一个接口，支持 PDF、Word（doc/docx）、常见图片（jpg/png/webp/tiff）、HTML 等10+种文件格式，实现多模态文档解析

支持复杂版面解析，提取多种信息要素
一次请求，即可获取文字、表格、标题层级、公式、手写字符、图片信息，并且支持按Markdown和Json格式输出给大模型

表格识别更精准
有线表、无线表、密集表，跨页表、单元格合并表都能精准识别
右侧：
图片，先使用图片占位符，后续再更换


板块7（TASK-007.4 起并入板块4 AlternatingTimelineSection，页面不再单独渲染）:
右侧：
section-heading__eyebrow：高效
标题：解析速度极快，100页快至1.5秒
副标题：长文档极速处理，大批量文件也能持续高效解析。
下方描述：
更快、更准
深度调优自研算法，不仅解析准，而且快，100页长文档PDF在线解析快至1.5秒。

支持大批量离线解析
支持离线自动批量解析处理，只需一次性上传大量文档，3天便可在后台高效精准解析500万页PDF。

左侧：
图片，先使用图片占位符，后续再更换


板块8（TASK-007.4 起并入板块4 AlternatingTimelineSection，页面不再单独渲染）:
左侧：
section-heading__eyebrow：稳定
标题：稳定性极高，成功率可达99.999%
副标题：高可用、高成功率，保障企业知识服务持续稳定运行。
高成功率
保障知识检索与智能应用可靠执行，服务成功率达 99.999%
高稳定性
支持高并发业务持续稳定运行，保障知识服务全天候可靠可用
左侧：
图片，先使用图片占位符，后续再更换


板块9:
<CtaSection
    title="开启企业知识智能化之旅"
    description="让分散知识统一沉淀，让企业知识真正服务每一个业务场景。"
    :actions="ctaActions"
  />

  按钮：立即咨询、申请试用

