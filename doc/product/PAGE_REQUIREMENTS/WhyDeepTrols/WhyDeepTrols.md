# Why DeepTrols
> 首页页面结构

创建whydeeptrols路由

1、引用公共Header、Footer
2、Banner说明
```text
参考https://www.emqx.com/zh/why-emqx
<section class="relative overflow-hidden bg-default"><div class="pointer-events-none absolute inset-0" style="mask-image: linear-gradient(black 55%, transparent 92%);"><div class="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]" style="background-image: linear-gradient(var(--color-primary-500) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-500) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(80% 60% at 50% 40%, black 30%, transparent 80%);"></div><div class="absolute -left-1/4 -top-1/4 size-[600px] rounded-full bg-primary/10 blur-[140px] lg:size-[900px]"></div><div class="absolute -right-1/4 -top-1/4 size-[500px] rounded-full bg-primary/5 blur-[140px] lg:size-[700px]"></div>……

为什么选择 EMQX -> 为什么选择 DeepTrols
云、边、端统一 -> 数据、知识、智能统一
MQTT平台 -> 企业级AI应用服务商

从初创团队到全球 500 强，众多客户选择 EMQX 连接物理世界与人工智能。 -> 从数据工程、知识工程到智能体应用，DeepTrols 为企业提供可落地、可交付、可持续演进的 AI 服务。

免费开始修改为“立即咨询”   了解平台修改为“关于我们”

<div class="relative w-full max-w-lg" style="opacity: 1; transform: none;"><div class="pointer-events-none absolute inset-0 rotate-3 rounded-3xl bg-gradient-to-tr from-primary/15 to-primary/5 blur-2xl"></div><div class="relative grid grid-cols-2 gap-4 sm:gap-5"><div class=""><div class="group h-full rounded-2xl border border-default bg-default/70 p-6 shadow-xl shadow-primary/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-primary/10 sm:p-8 dark:bg-muted/40"><div class="mb-2 text-4xl font-black tracking-tight sm:text-5xl"><span class="gradient">
这部分修改为
doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/robot.webm
请调整到适合的宽高


<div class="mt-24 border-t border-default pt-12 lg:mt-28" style="opacity: 1;"><section class="pt-0"><div class=""><div class="text-center mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-muted">深受全球领军企业信赖</div><div data-orientation="horizontal" data-slot="root" class="group relative flex items-center overflow-hidden gap-(--gap) flex-row [--gap:4rem]……

使用HOME页的customer-logos

```

3、为什么DeepTrols值得信赖
参考https://www.emqx.com/zh/why-emqx 中的
<section class="relative pb-32 lg:pb-44"><div class="container"><div class="mb-12 text-center lg:mb-16"><h2 class="mb-4 md:mb-6 text-highlighted text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] !mb-8">为什么团队都选择 EMQX</h2>……

实现约束：
- section 必须使用 `dt-section relative pb-32 lg:pb-44`
- 标题区必须使用 `mb-12 text-center lg:mb-16`
- Tab 必须使用全局 `.dt-segmented-tabs` + `.dt-segmented-tab`
- 卡片网格必须使用 `grid gap-5 md:grid-cols-2 lg:gap-6`
- 卡片必须复用 `.dt-product-card`、`.dt-product-card__accent`、`.dt-icon-box`，并使用 Tailwind v4 utility 表达 `min-h-[280px] !p-7 lg:!p-8`、`!size-12`

使用4个Tab
Tab1:面向技术层

ICON 生产级架构
副标题：面向企业生产环境
描述：采用高可用、可扩展、可观测的企业级架构设计，支持复杂业务持续稳定运行，为 AI 应用提供长期可靠的技术基础。

ICON 开放兼容
副标题：不绑定任何技术路线
描述：兼容主流大模型、云平台、MCP 协议及企业业务系统，保护现有技术投资，帮助企业灵活构建开放 AI 能力。

ICON 持续演进
副标题：紧跟AI技术发展
描述：持续融合智能体、推理模型及 AI 基础设施等前沿技术，快速响应技术迭代，保持企业 AI 能力持续领先。

ICON 安全可控
副标题：企业级治理能力
描述：建立覆盖权限管理、模型治理、审计追踪及数据安全的治理体系，保障企业 AI 应用安全、稳定、可信运行。

Tab2:面向业务层

ICON 行业理解
副标题：100+数字化交付经验
描述：积累丰富的数字化建设与项目交付经验，覆盖平台建设、数据治理、物联网等领域，为企业 AI 建设提供坚实基础。

ICON 场景驱动
副标题：20+行业场景
描述：深入制造、能源、环保、政务等行业核心业务场景，以真实业务需求驱动 AI 应用落地，持续创造业务价值。

ICON 集成能力
副标题：连接企业现有业务系统
描述：具备丰富的企业系统集成经验，打通 ERP、MES、OA、CRM、IoT 等业务系统，实现 AI 与业务流程深度协同。

ICON 持续交付
副标题：覆盖AI全生命周期
描述：从咨询规划、方案设计到建设实施、运营优化，提供覆盖 AI 全生命周期的一体化服务，持续推动业务升级。

Tab3:面向服务层

ICON 全程陪伴
副标题：咨询到运营
描述：围绕企业 AI 建设全过程，提供咨询规划、方案设计、项目实施及持续运营服务，全程陪伴客户能力成长。

ICON 快速交付
副标题：成熟交付体系
描述：依托成熟的方法论、标准化实施流程及丰富项目经验，有效降低项目风险，保障 AI 项目高质量、高效率交付。

ICON 长期服务
副标题：持续创造价值
描述：坚持长期服务理念，持续优化模型、应用与业务流程，推动 AI 能力不断演进，帮助企业持续释放业务价值。

ICON 效果量化
副标题：交付可量化的业务价值
描述：建立覆盖模型效果、业务效率、运营价值等多维评估体系，让 AI 建设成果可衡量、可验证、可持续优化。



4、重塑服务
主标题：业务价值可衡量，AI成果可持续

交付可量化，区别传统软件交付
相比传统软件厂商的交付模式，避免交付即终止，以可量化的指标评估交付成果

没有隐形的业务负担
告别复杂培训、专人维护和繁琐操作，让 AI 像企业员工一样自然融入业务流程，真正做到开箱可用、持续可用。

摆脱业务系统锁定
摆脱对ERP、MES、OA等系统形成的数据孤岛与平台依赖，让企业掌握数据、流程及 AI 能力的长期主导权，避免业务能力被单一软件供应商限制。

右侧  doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/fangangaishu@2x.png

5、重塑引擎
（右侧）
标题：重塑引擎
重塑引擎是DeepTrols持续实现自我重塑的核心能力体系。它推动我们不断打造更专业、更深厚的行业与技术能力，以 AI 赋能服务交付，持续引领技术创新，并沉淀最先进的工具、方法论与实践体系。

左侧：

参考https://www.emqx.com/zh/why-emqx 中的
<div class="grid gap-6 lg:order-1"><a href="/zh/switch-from-aws" class="group relative flex items-center gap-5 overflow-hidden rounded-3xl border border-default bg-muted/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-default hover:shadow-2xl hover:shadow-primary/5 sm:p-8 dark:bg-muted/50 dark:hover:bg-muted/70"><div class="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10 dark:bg-primary/10 dark:group-hover:bg-primary/20"></div><div class="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-default bg-white p-2.5"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--c-logo-full size-full text-gray-900" width="1.67em" height="1em" viewBox="0 0 70 42"><defs><clipPath id="iconifyVue188">
<rect width="70" height="42" fill="white"></rect>……

ICON DeepTrolsOPS企业AI引擎
统一智能体、知识与模型能力，加速企业 AI 落地

ICON FDE企业AI服务指南
面向企业 AI 落地的实践方法与最佳指南
