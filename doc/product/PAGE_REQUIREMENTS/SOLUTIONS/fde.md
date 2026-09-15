# FDE解决方案页面
要求：不允许新建样式，必须通过Tailwind CSS v4

## Hero要求：

- Hero需要占满全屏，以视频为背景 doc/product/PAGE_REQUIREMENTS/SOLUTIONS/hero-bg.mp4
- Hero需要居中展示：（横向居中与垂直居中）
H1:DeepTrols FDE解决方案
副标题（使用 h2，字体大小与全站 H2 标准一致 35px）：深入业务现场，让AI从概念验证走向生产价值


## section1:
section-heading__eyebrow：行业痛点
标题：企业不缺 AI 技术，真正缺的是把 AI 带进业务现场
副标题：大模型、Agent 与 AI 开发工具快速成熟，但企业真实业务往往涉及复杂数据、专业知识、既有系统与组织流程。标准化 AI 产品难以直接适配，传统项目交付又难以跟上 AI 快速迭代的节奏，导致大量项目停留在 Demo 和 PoC 阶段。
ProductFeatureGridSection组件BaseCard 2X2  

场景难定义，AI 与业务脱节

・需求停留在功能描述
・业务价值难以量化
・技术与业务语言不一致

企业知道需要 AI，却很难将业务问题转化为可执行的 AI 场景。缺少同时理解业务与技术的工程团队，容易出现“技术可以实现，但业务并不需要”。

数据难就绪，模型缺少业务上下文

・数据分散在多个系统
・专业知识难以调用
・数据质量参差不齐

AI 落地不仅需要模型，更依赖企业内部数据、知识与业务上下文。ERP、MES、CRM、文档和数据库相互独立，使模型难以真正理解企业。

Demo 容易，生产上线困难

・PoC 与生产环境存在断层
・准确率与稳定性难保障
・权限安全要求复杂

一个可演示的 AI 应用可以快速完成，但进入真实生产环境后，还需要解决系统集成、权限、安全、性能、成本、可靠性和可观测性等大量工程问题。

业务持续变化，固定交付难以适应

・需求持续演进
・模型能力快速变化
・一次性交付难以持续优化

AI 项目天然具有探索性，需要在真实业务反馈中不断验证和调整。传统“需求—开发—验收”的固定项目模式，很难适应 AI 应用持续迭代的特点。


## section2:
section-heading__eyebrow：FDE 的价值演进
标题：从 AI 原型，到真正进入生产
副标题：贯穿场景定义、系统集成与生产交付，让 AI 从验证走向应用，并持续优化。
（居左显示）

参考https://www.emqx.com/zh/products/emqx 中的 <div><div class="grid gap-0"><div class="group relative grid gap-0 border border-default lg:grid-cols-2"><div class="p-8 lg:flex lg:items-center lg:p-12"><div class="w-full bg-default"><div><span class="text-sm font-semibold uppercase tracking-wide text-muted">基础架构</span></div><h3 class="mt-3 text-2xl font-semibold leading-tight text-highlighted">一个平台，两种消息范式</h3><p class="mt-3 text-base leading-relaxed text-default">EMQX 将实时 MQTT 发布订阅与持久化消息队列融于一体，无需再部署 RabbitMQ 或 Kafka 等独立系统。</p><ul class="mt-5 space-y-2 text-base text-default"><li class="flex items-start gap-2"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"></span><span>原生 MQTT 5.0 + 消息队列</span></li><li class="flex items-start gap-2"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"></span><span>基础设施成本降低 50%</span></li><li class="flex items-start gap-2"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"></span><span>单一操作界面</span></li></ul></div></div><div class="hidden px-4 lg:flex lg:items-center lg:justify-center [&amp;_.rounded-lg]:rounded-none [&amp;_.rounded-2xl]:rounded-none [&amp;_.rounded-md]:rounded-none"><div class="relative flex h-[400px] w-full select-none items-center justify-center"><div class="pointer-events-none absolute inset-0"><div class="absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/8 via-violet-500/5 to-blue-500/8 blur-3xl"></div></div><svg class="pointer-events-none absolute inset-0 size-full" viewBox="0 0 520 400" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><linearGradient id="evoUnifiedGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.6"></stop><stop offset="50%" stop-color="var(--color-violet-400)" stop-opacity="0.4"></stop><stop offset="100%" stop-color="var(--color-blue-500)" stop-opacity="0.6"></stop></linearGradient><filter id="evoUnifiedParticle" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur><feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><path d="M 160 155 Q 260 125 360 155" stroke="url(#evoUnifiedGrad)" stroke-width="2" stroke-dasharray="8 5" fill="none" opacity="0.5"><animate attributeName="stroke-dashoffset" values="0;-26" dur="2s" repeatCount="indefinite"></animate></path><circle r="4.5" fill="var(--color-violet-500)" filter="url(#evoUnifiedParticle)" opacity="0"><animate attributeName="opacity" values="0;0.9;0.9;0" dur="3s" repeatCount="indefinite"></animate><animateMotion dur="3s" repeatCount="indefinite" path="M 160,155 Q 260,125 360,155"></animateMotion><animate attributeName="fill" values="var(--color-violet-500);var(--color-blue-500)" dur="3s" repeatCount="indefinite"></animate></circle><circle r="3" fill="var(--color-violet-400)" filter="url(#evoUnifiedParticle)" opacity="0"><animate attributeName="opacity" values="0;0.7;0.7;0" dur="3s" begin="1s" repeatCount="indefinite"></animate><animateMotion dur="3s" begin="1s" repeatCount="indefinite" path="M 160,155 Q 260,125 360,155"></animateMotion><animate attributeName="fill" values="var(--color-violet-400);var(--color-blue-400)" dur="3s" begin="1s" repeatCount="indefinite"></animate></circle><circle r="3.5" fill="var(--color-blue-400)" filter="url(#evoUnifiedParticle)" opacity="0"><animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" begin="0.5s" repeatCount="indefinite"></animate><animateMotion dur="3.5s" begin="0.5s" repeatCount="indefinite" path="M 360,155 Q 260,125 160,155"></animateMotion><animate attributeName="fill" values="var(--color-blue-400);var(--color-violet-400)" dur="3.5s" begin="0.5s" repeatCount="indefinite"></animate></circle></svg><div class="relative flex flex-col items-center"><div class="flex items-start gap-36"><div class="_mergeLeft_j82rs_62"><div class="_isoCube_j82rs_2"><div class="_isoInner_j82rs_6"><div class="_cubeLayer_j82rs_12 _cubeShadow2_j82rs_20 border-violet-500/20 bg-muted"></div><div class="_cubeLayer_j82rs_12 _cubeShadow1_j82rs_24 border-violet-500/25 bg-muted"></div><div class="_cubeLayer_j82rs_12 _cubeTop_j82rs_28 border-default bg-elevated"><div class="absolute inset-0 flex items-center justify-center bg-elevated"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-10 text-muted" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16.247 7.761a6 6 0 0 1 0 8.478m2.828-11.306a10 10 0 0 1 0 14.134m-14.15 0a10 10 0 0 1 0-14.134m2.828 11.306a6 6 0 0 1 0-8.478"></path><circle cx="12" cy="12" r="2"></circle></g></svg></div></div><div class="_cubeSideLeft_j82rs_37 border-violet-500/30 bg-muted"></div><div class="_cubeSideFront_j82rs_48 border-x-violet-500/30 bg-elevated/50"></div></div></div><div class="mt-12 text-center"><div class="text-sm font-semibold text-highlighted"> Real-time MQTT </div><div class="text-sm text-muted"> Pub/Sub </div></div></div><div class="_mergeRight_j82rs_66"><div class="_isoCube_j82rs_2"><div class="_isoInner_j82rs_6"><div class="_cubeLayer_j82rs_12 _cubeShadow2_j82rs_20 border-blue-500/20 bg-muted"></div><div class="_cubeLayer_j82rs_12 _cubeShadow1_j82rs_24 border-blue-500/25 bg-muted"></div><div class="_cubeLayer_j82rs_12 _cubeTop_j82rs_28 border-default bg-elevated"><div class="absolute inset-0 flex items-center justify-center bg-elevated"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-10 text-muted" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><path d="M3 12a9 3 0 0 0 18 0"></path></g></svg></div></div><div class="_cubeSideLeft_j82rs_37 border-blue-500/30 bg-muted"></div><div class="_cubeSideFront_j82rs_48 border-x-blue-500/30 bg-elevated/50"></div></div></div><div class="mt-12 text-center"><div class="text-sm font-semibold text-highlighted"> Durable Queue </div><div class="text-sm text-muted"> Persistent </div></div></div></div><div class="mt-10 flex items-center gap-3 rounded-full border border-primary/40 bg-default px-5 py-2.5 backdrop-blur-sm"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-5 text-primary" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 17h6v-6"></path><path d="m22 17l-8.5-8.5l-5 5L2 7"></path></g></svg><div class="text-base font-bold text-primary"> 50% </div><div class="h-4 w-px bg-default"></div><div class="text-sm font-medium text-muted"> Cost Reduction </div></div></div></div></div></div><div class="group relative grid gap-0 border border-default lg:grid-cols-2 -mt-px"><div class="p-8 lg:flex lg:items-center lg:p-12 lg:col-start-2"><div class="w-full bg-default"><div><span class="text-sm font-semibold uppercase tracking-wide text-muted">高可靠性</span></div><h3 class="mt-3 text-2xl font-semibold leading-tight text-highlighted">零数据丢失，极致可靠</h3><p class="mt-3 text-base leading-relaxed text-default">为关键业务场景而生。持久化存储确保消息在订阅者离线时不丢失，支持可配置的 TTL、调度策略和最新值语义。</p><ul class="mt-5 space-y-2 text-base text-default"><li class="flex items-start gap-2"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"></span><span>保证送达</span></li><li class="flex items-start gap-2"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"></span><span>持久化消息存储</span></li><li class="flex items-start gap-2"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"></span><span>99.99% 正常运行时间 SLA</span></li></ul></div></div><div class="hidden px-4 lg:flex lg:items-center lg:justify-center [&amp;_.rounded-lg]:rounded-none [&amp;_.rounded-2xl]:rounded-none [&amp;_.rounded-md]:rounded-none lg:col-start-1 lg:row-start-1"><div class="relative flex h-[400px] w-full select-none items-center justify-center"><div class="pointer-events-none absolute inset-0"><div class="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/8 via-transparent to-violet-500/6 blur-3xl"></div></div><svg class="pointer-events-none absolute inset-0 size-full" viewBox="0 0 520 400" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><linearGradient id="evoStorageFlow" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.6"></stop><stop offset="100%" stop-color="var(--color-blue-500)" stop-opacity="0.6"></stop></linearGradient><linearGradient id="evoStorageIn" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.7"></stop><stop offset="100%" stop-color="var(--color-violet-500)" stop-opacity="0.2"></stop></linearGradient><filter id="evoStorageParticle" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2.5" result="blur"></feGaussianBlur><feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><path d="M 200 165 L 270 165" stroke="url(#evoStorageFlow)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4"><animate attributeName="stroke-dashoffset" values="0;-7" dur="1.2s" repeatCount="indefinite"></animate></path><path d="M 310 165 L 370 165" stroke="url(#evoStorageFlow)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4"><animate attributeName="stroke-dashoffset" values="0;-7" dur="1.2s" begin="0.6s" repeatCount="indefinite"></animate></path><circle cx="200" cy="165" r="3.5" fill="var(--color-violet-500)" filter="url(#evoStorageParticle)" opacity="0"><animate attributeName="cx" values="200;270" dur="1.4s" begin="0.6s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.4s" begin="0.6s" repeatCount="indefinite"></animate></circle><circle cx="200" cy="165" r="2.5" fill="var(--color-violet-400)" filter="url(#evoStorageParticle)" opacity="0"><animate attributeName="cx" values="200;270" dur="1.4s" begin="1.3s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.4s" begin="1.3s" repeatCount="indefinite"></animate></circle><circle cx="310" cy="165" r="3.5" fill="var(--color-blue-400)" filter="url(#evoStorageParticle)" opacity="0"><animate attributeName="cx" values="310;370" dur="1.4s" begin="1.6s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.4s" begin="1.6s" repeatCount="indefinite"></animate></circle><circle cx="310" cy="165" r="2.5" fill="var(--color-blue-500)" filter="url(#evoStorageParticle)" opacity="0"><animate attributeName="cx" values="310;370" dur="1.4s" begin="2.3s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.4s" begin="2.3s" repeatCount="indefinite"></animate></circle></svg><div class="relative flex flex-col items-center"><div class="mb-4 flex items-center gap-2 rounded-full border border-default bg-default px-3 py-1.5 backdrop-blur-sm"><span class="_pulseDot_16dv6_58 size-1.5 rounded-full bg-primary"></span><span class="text-sm font-medium text-muted">Incoming Messages</span></div><div class="flex items-end gap-8"><div class="_glowCube0_16dv6_63"><div class="_isoCube_16dv6_2"><div class="_isoInner_16dv6_6"><div class="_cubeLayerSm_16dv6_12 _cubeShadow2_16dv6_20 border-violet-500/20 bg-muted"></div><div class="_cubeLayerSm_16dv6_12 _cubeShadow1_16dv6_24 border-violet-500/25 bg-muted"></div><div class="_cubeLayerSm_16dv6_12 _cubeTop_16dv6_28 border-default bg-elevated"><div class="absolute inset-0 flex items-center justify-center bg-elevated"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-8 text-muted" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><path d="M3 12a9 3 0 0 0 18 0"></path></g></svg></div></div><div class="_cubeSideLeftSm_16dv6_37 border-violet-500/30 bg-muted"></div><div class="_cubeSideFrontSm_16dv6_48 border-x-violet-500/30 bg-elevated/50"></div></div></div><div class="mt-8 text-center"><div class="text-sm font-semibold text-highlighted">Primary</div></div></div><div class="_glowCube1_16dv6_69"><div class="_isoCube_16dv6_2"><div class="_isoInner_16dv6_6"><div class="_cubeLayerSm_16dv6_12 _cubeShadow2_16dv6_20 border-violet-500/20 bg-muted"></div><div class="_cubeLayerSm_16dv6_12 _cubeShadow1_16dv6_24 border-violet-500/25 bg-muted"></div><div class="_cubeLayerSm_16dv6_12 _cubeTop_16dv6_28 border-default bg-elevated"><div class="absolute inset-0 flex items-center justify-center bg-elevated"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-8 text-muted" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><path d="M3 12a9 3 0 0 0 18 0"></path></g></svg></div></div><div class="_cubeSideLeftSm_16dv6_37 border-violet-500/30 bg-muted"></div><div class="_cubeSideFrontSm_16dv6_48 border-x-violet-500/30 bg-elevated/50"></div></div></div><div class="mt-8 text-center"><div class="text-sm font-semibold text-highlighted">Replica 1</div></div></div><div class="_glowCube2_16dv6_75"><div class="_isoCube_16dv6_2"><div class="_isoInner_16dv6_6"><div class="_cubeLayerSm_16dv6_12 _cubeShadow2_16dv6_20 border-violet-500/20 bg-muted"></div><div class="_cubeLayerSm_16dv6_12 _cubeShadow1_16dv6_24 border-violet-500/25 bg-muted"></div><div class="_cubeLayerSm_16dv6_12 _cubeTop_16dv6_28 border-default bg-elevated"><div class="absolute inset-0 flex items-center justify-center bg-elevated"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-8 text-muted" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><path d="M3 12a9 3 0 0 0 18 0"></path></g></svg></div></div><div class="_cubeSideLeftSm_16dv6_37 border-violet-500/30 bg-muted"></div><div class="_cubeSideFrontSm_16dv6_48 border-x-violet-500/30 bg-elevated/50"></div></div></div><div class="mt-8 text-center"><div class="text-sm font-semibold text-highlighted">Replica 2</div></div></div></div><div class="mt-10 flex items-center gap-3 rounded-full border border-primary/40 bg-default px-5 py-2.5 backdrop-blur-sm"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-5 text-primary" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12l2 2l4-4"></path></g></svg><div class="text-lg font-bold text-primary"> 99.99% </div><div class="h-4 w-px bg-default"></div><div class="text-sm font-medium text-muted"> Uptime SLA </div></div></div></div></div></div><div class="group relative grid gap-0 border border-default lg:grid-cols-2 -mt-px"><div class="p-8 lg:flex lg:items-center lg:p-12"><div class="w-full bg-default"><div><span class="text-sm font-semibold uppercase tracking-wide text-muted">智能化</span></div><h3 class="mt-3 text-2xl font-semibold leading-tight text-highlighted">为 AI Agent 和 LLM 驱动的自动化而生</h3><p class="mt-3 text-base leading-relaxed text-default">将物联网数据流式传输到由 OpenAI、Claude 和 Gemini 驱动的 AI Agent，实时生成洞察并触发自动化操作。</p><ul class="mt-5 space-y-2 text-base text-default"><li class="flex items-start gap-2"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"></span><span>通过 MQTT 编排 AI Agent</span></li><li class="flex items-start gap-2"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"></span><span>实时异常检测</span></li><li class="flex items-start gap-2"><span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"></span><span>智能自动化工作流</span></li></ul></div></div><div class="hidden px-4 lg:flex lg:items-center lg:justify-center [&amp;_.rounded-lg]:rounded-none [&amp;_.rounded-2xl]:rounded-none [&amp;_.rounded-md]:rounded-none"><div class="relative flex h-[400px] w-full select-none items-center justify-center"><div class="pointer-events-none absolute inset-0"><div class="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/8 via-transparent to-violet-500/6 blur-3xl"></div></div><svg class="pointer-events-none absolute inset-0 size-full" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><linearGradient id="evoAIFlowIn" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.7"></stop><stop offset="100%" stop-color="var(--color-violet-500)" stop-opacity="0.2"></stop></linearGradient><linearGradient id="evoAIFlowOut" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.5"></stop><stop offset="100%" stop-color="var(--color-violet-400)" stop-opacity="0.3"></stop></linearGradient><filter id="evoAIParticle" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2.5" result="blur"></feGaussianBlur><feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><clipPath id="evoAIInputClip"><rect x="190" y="72" width="20" height="80"></rect></clipPath></defs><path d="M 200 72 L 200 148" stroke="url(#evoAIFlowIn)" stroke-width="2" stroke-dasharray="6 4" opacity="0.5"><animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite"></animate></path><path d="M 200 155 Q 140 185 100 235" stroke="url(#evoAIFlowOut)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4"><animate attributeName="stroke-dashoffset" values="0;-7" dur="1.5s" repeatCount="indefinite"></animate></path><path d="M 200 155 L 200 235" stroke="url(#evoAIFlowOut)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4"><animate attributeName="stroke-dashoffset" values="0;-7" dur="1.5s" begin="0.2s" repeatCount="indefinite"></animate></path><path d="M 200 155 Q 260 185 300 235" stroke="url(#evoAIFlowOut)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4"><animate attributeName="stroke-dashoffset" values="0;-7" dur="1.5s" begin="0.4s" repeatCount="indefinite"></animate></path><g clip-path="url(#evoAIInputClip)"><circle cx="200" cy="72" r="4" fill="var(--color-violet-500)" filter="url(#evoAIParticle)" opacity="0"><animate attributeName="cy" values="72;148" dur="1.8s" begin="0s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;0.85;0.85;0" dur="1.8s" begin="0s" repeatCount="indefinite"></animate></circle><circle cx="200" cy="72" r="4" fill="var(--color-violet-500)" filter="url(#evoAIParticle)" opacity="0"><animate attributeName="cy" values="72;148" dur="1.8s" begin="0.45s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;0.85;0.85;0" dur="1.8s" begin="0.45s" repeatCount="indefinite"></animate></circle><circle cx="200" cy="72" r="4" fill="var(--color-violet-500)" filter="url(#evoAIParticle)" opacity="0"><animate attributeName="cy" values="72;148" dur="1.8s" begin="0.9s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;0.85;0.85;0" dur="1.8s" begin="0.9s" repeatCount="indefinite"></animate></circle></g><circle cx="200" cy="138" r="8" fill="var(--color-violet-500)" opacity="0" filter="url(#evoAIParticle)"><animate attributeName="opacity" values="0;0.3;0" dur="2.5s" begin="0.5s" repeatCount="indefinite"></animate><animate attributeName="r" values="8;20;8" dur="2.5s" begin="0.5s" repeatCount="indefinite"></animate></circle><circle r="4" fill="var(--color-violet-400)" filter="url(#evoAIParticle)" opacity="0"><animateMotion dur="1.5s" begin="0.8s" repeatCount="indefinite" path="M 200,155 Q 140,185 100,235"></animateMotion><animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.5s" begin="0.8s" repeatCount="indefinite"></animate></circle><circle r="3" fill="var(--color-violet-300)" filter="url(#evoAIParticle)" opacity="0"><animateMotion dur="1.5s" begin="1.8s" repeatCount="indefinite" path="M 200,155 Q 140,185 100,235"></animateMotion><animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.5s" begin="1.8s" repeatCount="indefinite"></animate></circle><circle cx="200" cy="155" r="4" fill="var(--color-violet-400)" filter="url(#evoAIParticle)" opacity="0"><animate attributeName="cy" values="155;235" dur="1.5s" begin="1.2s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.5s" begin="1.2s" repeatCount="indefinite"></animate></circle><circle cx="200" cy="155" r="3" fill="var(--color-violet-300)" filter="url(#evoAIParticle)" opacity="0"><animate attributeName="cy" values="155;235" dur="1.5s" begin="2.2s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.5s" begin="2.2s" repeatCount="indefinite"></animate></circle><circle r="4" fill="var(--color-violet-400)" filter="url(#evoAIParticle)" opacity="0"><animateMotion dur="1.5s" begin="1.6s" repeatCount="indefinite" path="M 200,155 Q 260,185 300,235"></animateMotion><animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.5s" begin="1.6s" repeatCount="indefinite"></animate></circle><circle r="3" fill="var(--color-violet-300)" filter="url(#evoAIParticle)" opacity="0"><animateMotion dur="1.5s" begin="2.6s" repeatCount="indefinite" path="M 200,155 Q 260,185 300,235"></animateMotion><animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.5s" begin="2.6s" repeatCount="indefinite"></animate></circle><circle cx="100" cy="235" r="5" fill="var(--color-violet-400)" opacity="0" filter="url(#evoAIParticle)"><animate attributeName="opacity" values="0;0.3;0" dur="1.5s" begin="2.3s" repeatCount="indefinite"></animate><animate attributeName="r" values="5;12;5" dur="1.5s" begin="2.3s" repeatCount="indefinite"></animate></circle><circle cx="200" cy="235" r="5" fill="var(--color-violet-400)" opacity="0" filter="url(#evoAIParticle)"><animate attributeName="opacity" values="0;0.3;0" dur="1.5s" begin="2.7s" repeatCount="indefinite"></animate><animate attributeName="r" values="5;12;5" dur="1.5s" begin="2.7s" repeatCount="indefinite"></animate></circle><circle cx="300" cy="235" r="5" fill="var(--color-violet-400)" opacity="0" filter="url(#evoAIParticle)"><animate attributeName="opacity" values="0;0.3;0" dur="1.5s" begin="3.1s" repeatCount="indefinite"></animate><animate attributeName="r" values="5;12;5" dur="1.5s" begin="3.1s" repeatCount="indefinite"></animate></circle></svg><div class="relative flex flex-col items-center"><div class="mb-4 flex items-center gap-2 rounded-full border border-default bg-default px-3 py-1.5 backdrop-blur-sm"><span class="_pulseDot_chufn_58 size-1.5 rounded-full bg-primary"></span><span class="text-sm font-medium text-muted">IoT Data Stream</span></div><div class="_floatHub_chufn_62"><div class="_isoCube_chufn_2"><div class="_isoInner_chufn_6"><div class="_cubeLayer_chufn_12 _cubeShadow2_chufn_20 border-violet-500/15 bg-muted"></div><div class="_cubeLayer_chufn_12 _cubeShadow1_chufn_24 border-violet-500/20 bg-muted"></div><div class="_cubeLayer_chufn_12 _cubeTop_chufn_28 border-violet-500/40 bg-elevated"><div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500/15 to-blue-500/15"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-10 text-violet-500" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 20v2m0-20v2m5 16v2m0-20v2M2 12h2m-2 5h2M2 7h2m16 5h2m-2 5h2M20 7h2M7 20v2M7 2v2"></path><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="8" height="8" x="8" y="8" rx="1"></rect></g></svg></div></div><div class="_cubeSideLeft_chufn_37 border-violet-500/30 bg-muted"></div><div class="_cubeSideFront_chufn_48 border-x-violet-500/30 bg-elevated/50"></div></div></div></div><div class="mt-14 flex items-start gap-10"><div class="_aiNode_chufn_68 _nodeDelay0_chufn_72"><div class="_nodeGlow0_chufn_83 flex size-16 items-center justify-center rounded-2xl border border-default bg-default shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--simple-icons size-7 text-highlighted" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M22.282 9.821a6 6 0 0 0-.516-4.91a6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a6 6 0 0 0-3.998 2.9a6.05 6.05 0 0 0 .743 7.097a5.98 5.98 0 0 0 .51 4.911a6.05 6.05 0 0 0 6.515 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206a6 6 0 0 0 3.997-2.9a6.06 6.06 0 0 0-.747-7.073M13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081l4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085l4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354l-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667m2.01-3.023l-.141-.085l-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.8.8 0 0 0-.393.681zm1.097-2.365l2.602-1.5l2.607 1.5v2.999l-2.597 1.5l-2.607-1.5Z"></path></svg></div><div class="mt-2 text-center text-sm font-semibold text-highlighted">OpenAI</div></div><div class="_aiNode_chufn_68 _nodeDelay1_chufn_75"><div class="_nodeGlow1_chufn_86 flex size-16 items-center justify-center rounded-2xl border border-default bg-default shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--c-logo-full size-7 text-highlighted" width="1em" height="1em" viewBox="0 0 32 32"><defs><clipPath id="iconifyVue46">
      <rect width="32" height="32" fill="white"></rect>
    </clipPath></defs><g fill="none"><g clip-path="url(#iconifyVue46)">
    <path d="M23.9999 31.9998H8.00003C7.37287 32.0023 6.74632 31.9605 6.12505 31.8748C5.83475 31.8333 5.55086 31.7807 5.28131 31.7186C5.01175 31.6564 4.74889 31.5826 4.50007 31.4998C4.25576 31.4186 4.01586 31.3248 3.78133 31.2186C3.55627 31.1165 3.33717 31.0017 3.12509 30.8749C2.91922 30.7514 2.72096 30.6158 2.53136 30.4686C2.1577 30.1783 1.8218 29.8424 1.53145 29.4687C1.38427 29.2792 1.24862 29.0809 1.12522 28.875C0.998335 28.6629 0.883573 28.4438 0.781482 28.2188C0.675302 27.9842 0.581429 27.7443 0.500248 27.5C0.41732 27.2512 0.3437 26.9884 0.281513 26.7188C0.219327 26.4492 0.166726 26.1654 0.12528 25.8751C0.0395229 25.2537 -0.00230594 24.6271 0.000104309 23.9999V8.00003C-0.00237643 7.37287 0.0393943 6.74632 0.125105 6.12505C0.166586 5.83475 0.219222 5.55086 0.281339 5.28131C0.343456 5.01175 0.417285 4.74889 0.500073 4.50007C0.581255 4.25576 0.675128 4.01586 0.781308 3.78133C0.883398 3.55627 0.998161 3.33717 1.12504 3.12509C1.2485 2.91925 1.38422 2.721 1.53145 2.53143C1.82182 2.15775 2.15775 1.82182 2.53143 1.53145C2.72102 1.38425 2.91929 1.24858 3.12516 1.12518C3.33724 0.9983 3.55634 0.883538 3.7814 0.781447C4.01597 0.675263 4.25592 0.58139 4.50028 0.500213C4.74909 0.417285 5.01196 0.343665 5.28152 0.281478C5.55107 0.219292 5.83496 0.166691 6.12526 0.125245C6.74646 0.0394987 7.37294 -0.00231853 8.00003 0.000104309H23.9999C24.627 -0.00237643 25.2536 0.0393943 25.8748 0.125105C26.1651 0.166586 26.449 0.219222 26.7186 0.281339C26.9881 0.343456 27.251 0.417285 27.4998 0.500073C27.7441 0.581255 27.984 0.675128 28.2186 0.781308C28.4436 0.883398 28.6627 0.998161 28.8748 1.12504C29.0807 1.24844 29.2789 1.3841 29.4685 1.53128C29.8422 1.82164 30.1782 2.15758 30.4685 2.53129C30.6158 2.72092 30.7515 2.91922 30.8749 3.12513C31.0018 3.33721 31.1165 3.5563 31.2186 3.78137C31.3248 4.01589 31.4187 4.2558 31.4999 4.5001C31.5828 4.74892 31.6564 5.01178 31.7186 5.28134C31.7808 5.5509 31.8334 5.83478 31.8748 6.12508C31.9605 6.74635 32.0023 7.37288 31.9998 8.00003V23.9999C32.0023 24.627 31.9605 25.2536 31.8748 25.8748C31.8333 26.1651 31.7807 26.449 31.7186 26.7186C31.6564 26.9881 31.5826 27.251 31.4998 27.4998C31.4186 27.7441 31.3248 27.984 31.2186 28.2186C31.1165 28.4436 31.0017 28.6627 30.8749 28.8748C30.7514 29.0807 30.6158 29.2789 30.4686 29.4685C30.1783 29.8422 29.8423 30.1782 29.4686 30.4685C29.279 30.6157 29.0808 30.7514 28.8749 30.8748C28.6628 31.0017 28.4437 31.1164 28.2187 31.2185C27.9841 31.3247 27.7442 31.4186 27.4999 31.4998C27.2511 31.5827 26.9882 31.6563 26.7187 31.7185C26.4491 31.7807 26.1653 31.8333 25.875 31.8747C25.2536 31.9604 24.6271 32.0022 23.9999 31.9998Z" fill="#CA9F7B"></path>
    <path d="M17.293 8.58008L23.1665 23.4199H26.3878L20.5132 8.58008H17.293Z" fill="#171717"></path>
    <path d="M20.4489 23.42H17.1635L15.9636 20.304H9.81833L8.61698 23.42H5.33301L11.2063 8.58008H14.5756L20.4489 23.42V23.42ZM12.8917 12.3321L10.8809 17.548H14.9009L12.8917 12.3321Z" fill="#171717"></path>
  </g></g></svg></div><div class="mt-2 text-center text-sm font-semibold text-highlighted">Claude</div></div><div class="_aiNode_chufn_68 _nodeDelay2_chufn_78"><div class="_nodeGlow2_chufn_89 flex size-16 items-center justify-center rounded-2xl border border-default bg-default shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--c-logo-full size-7 text-highlighted" width="1em" height="1em" viewBox="0 0 24 24"><defs><linearGradient gradientUnits="userSpaceOnUse" id="iconifyVue47" x1="7" x2="11" y1="15.5" y2="12"><stop stop-color="#08B962"></stop><stop offset="1" stop-color="#08B962" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="iconifyVue48" x1="8" x2="11.5" y1="5.5" y2="11"><stop stop-color="#F94543"></stop><stop offset="1" stop-color="#F94543" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="iconifyVue49" x1="3.5" x2="17.5" y1="13.5" y2="12"><stop stop-color="#FABC12"></stop><stop offset=".46" stop-color="#FABC12" stop-opacity="0"></stop></linearGradient></defs><g style="flex:none;line-height:1"><title>Gemini</title><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#iconifyVue47)"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#iconifyVue48)"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#iconifyVue49)"></path></g></svg></div><div class="mt-2 text-center text-sm font-semibold text-highlighted">Gemini</div></div></div><div class="mt-8 flex items-center gap-3 rounded-full border border-primary/40 bg-default px-5 py-2.5 backdrop-blur-sm"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-5 text-primary" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg><div class="text-base font-bold text-primary"> Real-time </div><div class="h-4 w-px bg-default"></div><div class="text-sm font-medium text-muted"> AI Processing </div></div></div></div></div></div></div></div>
  要求1:1复刻，包括动画、排版等，不要创造

第一个卡片内容：
从需求到验证

更快确认 AI 是否真正值得做

FDE 从真实业务问题出发，快速完成场景梳理、数据接入与原型验证，在大规模投入之前先验证技术可行性与业务价值。

* 聚焦高价值业务问题
* 快速构建可运行原型
* 用真实数据完成验证

右侧动画1:1复刻：

左立方体：
业务问题
场景·数据

右立方体：
AI原型
模型·应用

底部胶囊：

50% 验证周期缩短

第二个卡片内容：
从 PoC 到生产
让验证有效的 AI 真正进入业务系统
FDE 不以 Demo 验收为终点，而是继续完成企业系统连接、权限安全、部署运维与生产工程，让 AI 从“能演示”变成“能使用、能运行”。

* 企业系统与数据集成
* 权限、安全与生产部署
* 运行监控与异常治理

左侧动画1:1复刻：
顶部胶囊：

生产业务请求

三个立方体：

Primary → AI 应用

Replica 1 → 企业系统

Replica 2 → 运行治理

底部胶囊：
70% 生产转化提升

第三个卡片内容：

规模演进
让 AI 随业务持续优化和扩展
FDE 不以单个应用上线为终点，而是将已验证的数据、知识、模型、工具与工程能力持续沉淀和复用，逐步扩展到更多业务流程与智能体，让 AI 从单点项目走向企业级规模化应用。

* 运行数据持续反馈
* Agent 与流程持续优化
* 新场景快速复制扩展

右侧动画：

顶部原来的：

IoT Data Stream

改为：

业务上下文

中间立方体的icon换成FDE

下面三个原本的：

OpenAI / Claude / Gemini

换成

知识智能体 / 数据智能体 / 业务智能体

底部胶囊：

5% AI实现规模化价值


以上内容必须1:1复刻，不要发挥和创造！！！！

## section3:

section-heading__eyebrow：解决方案
标题：让工程团队与业务团队共同完成 AI 落地
副标题：DeepTrols FDE 以客户真实业务问题为起点，将产品、AI、数据与工程能力带入业务现场，与客户团队共同完成场景识别、数据连接、原型验证、系统集成和生产上线，并基于真实使用反馈持续迭代，让 AI 能力真正融入业务流程。

组件1:ProductSystemFlowFrame组件，flow暂时不传入
组件2:ProductFeatureGridSection组件BaseCard 1行4个

不是卖一套标准软件
根据真实业务问题构建 AI 能力。

不是交付一个 Demo
从 PoC 一直负责到生产环境。

不是替客户定义业务
与业务专家共同设计解决方案。

不是一次性交付
基于真实业务反馈持续迭代。


## section4:
section-heading__eyebrow：FDE工作模式
标题：从业务问题到生产系统，建立 AI 落地闭环
副标题：无

ProductSystemFlowFrame组件，flow暂时不传入


## section5:

section-heading__eyebrow：核心能力
标题：不止构建 AI，更完成从业务到生产的工程闭环
副标题：FDE 团队同时连接业务、数据、AI 与软件工程，将客户业务经验与 DeepTrols AI 能力结合，在真实环境中快速构建、验证和迭代生产级智能应用。

同智能制造解决方案页的核心功能体系

AI 场景工程

・业务问题识别
・AI 场景设计
・价值目标定义

深入真实业务流程，与业务人员共同拆解问题，识别适合 AI 介入的关键环节，将模糊的 AI 需求转化为明确、可验证、可交付的应用场景。

数据与知识工程

・多源数据连接
・企业知识构建
・业务上下文治理

连接数据库、文档、API 与既有业务系统，对企业数据和专业知识进行治理、组织与上下文化，为模型、RAG 和智能体提供可信业务基础。

Agent 应用工程

・智能体构建
・Workflow 编排
・Tools / MCP 集成

围绕真实业务任务构建 AI Agent，将模型、知识、工具与业务系统连接起来，实现任务理解、规划、执行与结果反馈，让 AI 从辅助问答走向业务执行。

生产级 AI 工程

・系统集成与部署
・安全权限治理
・运行监控与优化

将验证有效的 AI 应用部署至生产环境，完善身份权限、安全、性能、成本、日志与可观测能力，并根据真实运行数据持续优化。

# section6:

section-heading__eyebrow：核心价值
标题：缩短 AI 从想法到价值的距离
副标题：FDE 将业务理解、AI 能力与工程交付整合到同一团队，通过深入现场、快速验证和持续迭代，减少业务与技术之间的反复传递，让真正有效的 AI 场景更快进入生产环境。

样式与智慧教育解决方案页的核心价值保持一致（BaseCard 2列卡片，不要重复造轮子）

周级验证
更快找到真正值得做的 AI 场景
通过业务现场调研与快速原型，在投入大规模建设前验证场景可行性和业务价值，减少无效需求与重复开发。
快速原型　场景验证　价值验证

端到端
从业务问题一直做到生产上线
同一团队贯穿场景定义、数据准备、AI 开发、系统集成和生产部署，减少多团队之间的沟通与交付断层。
需求到生产　统一团队　工程闭环

深度融合
AI 真正进入企业核心流程
通过 API、MCP、Tools 与企业系统连接，将 AI 嵌入已有业务流程，让模型不仅能够回答问题，更能够获取数据、调用工具和执行任务。
系统连接　业务嵌入　智能执行

持续进化
AI 随业务一起持续优化
基于真实用户反馈、运行数据和业务变化持续调整模型、知识、Agent 与 Workflow，让 AI 应用从“项目交付”转变为持续演进的生产能力。
持续迭代　运行反馈　能力进化

## section7:

section-heading__eyebrow：应用场景
标题：从一个高价值问题开始，让 AI 深入核心业务
副标题：无

参考https://www.emqx.com/zh/solutions/automotive 中的 <div class="embla mb-6 overflow-hidden select-none"><div class="embla__container flex gap-6" style="transform: translate3d(-0.92px, 0px, 0px);"><div class="embla__slide min-w-0 shrink-0 grow-0 basis-[calc(100%-0px)] md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"><a href="/zh/solutions/software-defined-vehicles" class="grid gap-4 content-start group p-8 rounded-lg bg-muted border border-default cursor-pointer relative transition-all hover:border-primary duration-500 ease-out before:absolute before:inset-0 before:bg-gradient-bg-card-active before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-100 h-full grid-rows-[auto_auto_1fr]"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" class="iconify iconify--lucide absolute top-4 right-4 text-dimmed opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" style="font-size: 20px;"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"></path></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide text-icon" width="1em" height="1em" viewBox="0 0 24 24" style="font-size: 32px;"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></g></svg><div class="text-highlighted text-lg font-semibold">互联汽车与软件定义汽车</div><div class="text-default text-base font-normal">交付下一代软件定义汽车（SDV）功能。在全球庞大车队中实现实时远程车辆诊断、安全的双向指令控制和空中升级（OTA）软件更新。</div></a></div><div class="embla__slide min-w-0 shrink-0 grow-0 basis-[calc(100%-0px)] md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"><a href="/zh/solutions/fleet-telematics" class="grid gap-4 content-start group p-8 rounded-lg bg-muted border border-default cursor-pointer relative transition-all hover:border-primary duration-500 ease-out before:absolute before:inset-0 before:bg-gradient-bg-card-active before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-100 h-full grid-rows-[auto_auto_1fr]"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" class="iconify iconify--lucide absolute top-4 right-4 text-dimmed opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" style="font-size: 20px;"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"></path></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" class="iconify iconify--lucide text-icon" style="font-size: 32px;"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></g></svg><div class="text-highlighted text-lg font-semibold">车云智能数采</div><div class="text-default text-base font-normal">为商用车队提供实时定位追踪与聚合数据分析，以超低延迟数据流支持 UBI 车险、智能调度和关键预测性维护告警。</div></a></div><div class="embla__slide min-w-0 shrink-0 grow-0 basis-[calc(100%-0px)] md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"><a href="/zh/solutions/industrial-iot" class="grid gap-4 content-start group p-8 rounded-lg bg-muted border border-default cursor-pointer relative transition-all hover:border-primary duration-500 ease-out before:absolute before:inset-0 before:bg-gradient-bg-card-active before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-100 h-full grid-rows-[auto_auto_1fr]"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" class="iconify iconify--lucide absolute top-4 right-4 text-dimmed opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" style="font-size: 20px;"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"></path></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide text-icon" width="1em" height="1em" viewBox="0 0 24 24" style="font-size: 32px;"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16h.01M16 16h.01M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zm5-3h.01"></path></svg><div class="text-highlighted text-lg font-semibold">汽车制造工业物联网</div><div class="text-default text-base font-normal">连接机器人、PLC 和传感器等设备，统一工厂车间数据。实时流式传输工业物联网（IIoT）数据至系统，用于持续监控、质量保证和运营效率提升。</div></a></div><div class="embla__slide min-w-0 shrink-0 grow-0 basis-[calc(100%-0px)] md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"><div class="grid gap-4 content-start group p-8 rounded-lg bg-muted border border-default h-full grid-rows-[auto_auto_1fr]"><!----><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide text-icon" width="1em" height="1em" viewBox="0 0 24 24" style="font-size: 32px;"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path></g></svg><div class="text-highlighted text-lg font-semibold">汽车行业中央数据主干</div><div class="text-default text-base font-normal">EMQX 技术栈实现的数据融合覆盖汽车业务全阶段，在监管压力、电动化和自动驾驶趋势下，增强从制造到生产的可追溯性、优化供应链并实现敏捷市场响应。</div></div></div></div></div>

6个card，可横向点击滑动
企业知识智能化
将制度、产品、项目和专业资料转化为企业知识能力，构建可信问答、知识检索和专业知识助手。

业务流程智能体
围绕销售、采购、运营、客服等业务流程构建 Agent，通过工具调用完成查询、分析、生成和业务执行。

数据分析智能体
让 AI 连接数据库和业务指标，通过自然语言完成数据查询、指标分析、异常发现和经营报告生成。

智能制造应用
深入生产现场连接 MES、ERP、设备和工艺数据，构建设备诊断、质量分析、生产辅助及工业智能体。

AI 内容生产
围绕营销、电商、出版等场景构建文本、图片、视频及多模态内容生成工作流，实现规模化内容生产。

行业 AI 应用
结合行业数据、专业知识与业务规则，为能源、水利、教育、环保等专业场景构建垂直 AI 应用。


## section8:
section-heading__eyebrow：交付流程
标题：与业务一起构建，在真实使用中持续迭代
副标题：无
（居左）

ProductSystemFlowFrame组件，flow暂时不传入


## section9:

样式与智慧教育解决方案页的案例保持一致（不要重复造轮子）

案例

某大型制造企业

围绕生产现场数据与核心业务流程，由 FDE 团队深入业务部门，与工艺、设备及信息化团队共同梳理 AI 应用场景，连接 MES、ERP、设备数据与企业知识，快速构建设备分析与生产辅助智能体，并在真实生产环境持续迭代。

20+
核心业务场景梳理

10+
业务系统与数据源连接

周级
AI 场景快速验证

查看案例详情 →

⸻

某能源企业

围绕能源运营与设备管理场景，将运行数据、设备资料、历史工单和专业知识统一接入 AI 应用，通过 FDE 模式快速完成场景定义、知识构建、Agent 开发与业务系统集成。

百万级
运行数据处理

多系统
业务数据统一连接

持续迭代
生产级 AI 应用

查看案例详情 →

⸻

某大型集团企业

面向集团内部知识获取与业务协同需求，FDE 团队与客户业务人员联合构建企业 AI 助手，连接内部知识、业务数据和办公系统，实现从智能问答逐步扩展至数据分析、材料生成与业务任务执行。

10+
核心业务部门覆盖

100,000+
企业知识资产接入

多场景
AI Agent 持续扩展

查看案例详情 →