# 智慧教育解决方案页面
要求：不允许新建样式，必须通过Tailwind CSS v4

Header、section间距等均需要与智能制造解决方案页保持一致，注意间距
## Hero要求：同智能制造Hero
标题：智慧教育解决方案
描述：基于智曜·智能引擎，统一接入大模型、知识、工具与校园业务系统，构建面向教育场景的 AI 智能体与智能工作流，为教学、学习、教务和校园服务提供可持续扩展的智能能力，推动教育从数字化应用走向 AI 原生。

背景图doc/product/PAGE_REQUIREMENTS/SOLUTIONS/education.png


section1:
section-heading__eyebrow：行业痛点
标题：教育 AI 加速落地，仍面临模型、应用与业务流程的多重断点
副标题：大模型正在快速进入教育场景，但通用模型难以直接理解教学业务，AI 应用与教务、教学及校园系统相互割裂，模型、知识与工具缺乏统一连接，难以从简单问答真正走向可执行的教育智能体。
ProductFeatureGridSection组件BaseCard 2X2  

AI 应用分散，模型能力难以统一管理
不同教学与管理应用分别接入不同大模型，模型调用、权限、Token 和服务接口缺乏统一管理，随着 AI 应用增加，技术复杂度与运营成本持续上升。

AI 停留在问答，难以完成实际任务
大量教育 AI 仍停留在问答、摘要和内容生成阶段，无法进一步调用教务、课程、办公等系统执行任务，AI 与真实业务流程之间存在明显断点。

系统相互独立，AI 缺乏业务上下文
教务、教学、学工、科研和校园服务系统长期独立建设，AI 难以统一调用系统能力、获取业务上下文并完成跨系统任务。

智能体快速增长，缺乏统一治理体系
不同部门和应用独立建设智能体，缺乏统一的开发、发布、权限、安全和运行管理机制，难以形成学校级可持续扩展的 AI 能力体系。


section2:
section-heading__eyebrow：解决方案
标题：构建面向教育业务的 AI 智能体运行底座
副标题：基于智曜统一连接大模型、知识、MCP、Tools 与校园业务系统，为教育智能体提供模型调用、任务编排、工具执行和运行治理能力，快速构建覆盖“教、学、管、服”的教育智能体体系，让 AI 从回答问题进一步走向理解任务、调用工具和完成业务。

ProductSystemFlowFrame组件，flow暂时不传入


section3:

section-heading__eyebrow：核心功能体系
标题：从模型调用到任务执行，构建教育 AI 原生能力体系
副标题：统一管理模型、智能体、工具和业务连接，为教育 AI 应用提供标准化运行环境，让不同智能体能够理解任务、调用工具、协同执行并持续扩展。

同智能制造解决方案页的核心功能体系

教育大模型网关

・多模型统一接入
・智能模型路由
・Token 用量精细管理

统一接入商业大模型、开源模型及学校私有化模型，为不同教育应用提供标准模型服务接口，根据任务、性能与成本动态选择模型，实现调用、权限和 Token 的统一管理。

教育智能体开发

・Agent 快速构建
・Skills / Tools 灵活装配
・智能体统一发布

通过标准化 Agent Runtime 快速构建教师、学生、教务、科研及校园服务智能体，将模型、知识、工具和业务能力按需组合，大幅降低教育智能体开发门槛。

教育智能工作流

・复杂任务自动拆解
・多智能体协同执行
・业务流程自动编排

将自然语言任务转化为可执行工作流，通过智能体自主规划、工具调用和多 Agent 协作，完成从信息获取、分析判断到业务执行的复杂教育任务。

校园 MCP 服务

・校园系统能力封装
・业务工具统一调用
・AI 与系统实时连接

将教务、教学、学工、科研、OA 等校园系统能力封装为标准 MCP 与 Tools，让智能体能够安全获取业务数据并调用系统能力，实现 AI 与校园业务流程真正连接。


section4:

section-heading__eyebrow：核心价值
标题：让 AI 从辅助工具，走向教育业务智能执行者
副标题：面向教学、学习、教务与校园服务，通过智曜统一连接模型、智能体、工具和业务系统，让 AI 不仅能够理解和生成内容，更能够规划任务、调用工具、协同执行，将智能能力真正嵌入教育业务全过程。

按照首页中的“为什么DeepTrols值得信赖”中的card排版

统一模型

一套入口连接多种 AI 能力

统一管理不同厂商、不同类型的大模型与多模态模型，为全校 AI 应用提供标准化模型服务，减少重复接入与基础能力建设。

多模型接入　智能路由　Token Hub

⸻

Agent 原生

每个教育场景都可以拥有智能体

面向教师、学生、教务、科研及校园服务快速构建专属智能体，让不同角色获得真正理解其任务和业务环境的 AI 助手。

Agent Runtime　Skills　Memory

⸻

自动执行

从回答问题到完成任务

智能体根据用户目标自主拆解任务、调用工具并执行工作流，让 AI 从传统 Copilot 进一步走向能够处理实际教育业务的 Agent。

任务规划　工具调用　Workflow

⸻

开放连接

让校园系统成为 AI 的能力工具

通过 MCP 和标准工具接口连接学校已有业务系统，无需推翻原有信息化体系，即可逐步将教务、教学和校园服务能力开放给智能体调用。

MCP　Tools　API




section5:
section-heading__eyebrow：AI 原生教育
标题：从 Copilot 到 Agent，让 AI 真正完成教育任务
副标题：传统 Copilot 主要辅助回答问题和生成内容，智曜通过 Agent Runtime 将大模型、知识、工具与校园业务系统连接起来，让 AI 能够理解目标、自主规划并调用工具执行任务，从“给出答案”进一步走向“完成任务”。

严格参考https://www.emqx.com/zh/products/emqx-edge 中
<div class="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start"><div class="rounded-3xl border border-default bg-muted/30 p-8 shadow-sm backdrop-blur-xl lg:p-10"><div class="space-y-10"><div class="relative flex flex-col items-start gap-6 text-left lg:flex-row lg:items-start"><div class="relative shrink-0"><div class="relative h-[120px] w-[120px]"><div style="perspective: 800px;"><div class="relative" style="transform: rotateX(55deg) rotateZ(-45deg); transform-style: preserve-3d;"><div class="absolute h-[104px] w-[104px] border bg-default border-violet-500" style="transform: translateZ(-12px);"></div><div class="relative h-[104px] w-[104px] overflow-hidden border bg-default border-violet-500/45" style="transform: translateZ(12px);"><div class="absolute inset-0 bg-violet-500/12"></div><div class="absolute inset-0 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 32 32" class="iconify iconify--c-icon size-9 text-violet-500"><g fill="none"><path d="M19.4286 9.57143V6C19.4286 4.89543 18.5331 4 17.4286 4H6C4.89543 4 4 4.89543 4 6V17.4286C4 18.5331 4.89543 19.4286 6 19.4286H17.4286C18.5331 19.4286 19.4286 18.5331 19.4286 17.4286V15.1429" stroke="currentColor" stroke-width="2.66667" stroke-linejoin="round"></path>
<path d="M12.5714 22.4286L12.5714 26C12.5714 27.1046 13.4669 28 14.5714 28L26 28C27.1046 28 28 27.1046 28 26L28 14.5714C28 13.4669 27.1046 12.5714 26 12.5714L14.5714 12.5714C13.4669 12.5714 12.5714 13.4669 12.5714 14.5714L12.5714 16.8571" stroke="currentColor" stroke-width="2.66667" stroke-linejoin="round"></path></g></svg></div></div><div class="absolute left-0 top-0 h-[104px] w-[24px] origin-left border bg-muted border-violet-500/65" style="transform: rotateY(-90deg) translateX(-12px);"></div><div class="absolute bottom-0 left-0 h-[24px] w-[104px] origin-bottom border-x bg-default border-violet-500" style="transform: rotateX(90deg) translateY(12px);"></div></div></div></div><div class="absolute -right-2 -top-2 rounded-full border border-default bg-default px-2.5 py-1 text-[10px] font-semibold text-muted shadow-sm">01</div></div><div class="pt-2"><div class="flex items-center gap-2"><h3 class="text-lg font-semibold text-highlighted">连接</h3>……要求1:1还原

左侧 3 个步骤
完全对应 EMQX 那种 01 / 02 / 03 的纵向排版。

01

理解

理解用户目标与业务上下文

结合用户身份、对话上下文、课程知识与校园业务数据，准确理解教师、学生和管理人员的真实任务，而不仅仅是识别一条 Prompt。

可以配 Tags：

Context Memory Knowledge

⸻

02

规划

将复杂目标拆解为可执行任务

通过 Agent Runtime 对任务进行自主规划，根据目标动态选择模型、知识、Skills 与 Tools，并组织单 Agent 或多 Agent 协同完成复杂流程。

可以配 Tags：

Planning Workflow Multi-Agent

⸻

03

执行

调用工具与业务系统完成任务

通过 MCP、Tools 与 API 连接教务、教学、学工、科研及校园服务系统，执行查询、分析、生成、提交等操作，并将结果持续反馈至业务流程。

可以配 Tags：

MCP Tools Action


右侧图

顶部：用户与应用入口

三个横向卡片：

Teacher

教师工作台

Student

学生学习空间

Campus Apps

校园应用

中央核心

 EMQX 中央的立体方块。

 图标使用智曜的图标doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/智曜logo.svg
 智曜·AgentOS
下面小字：
理解 · 规划 · 执行


布局如下：

            Web / App     API      AI 工作台
                 \         |         /
                  \        |        /

             ┌─────────────────┐
             │      图标       │
             │   智曜·AgentOS   │
             │ 理解 · 规划 · 执行 │
             └─────────────────┘

多模型统一接入                       校园系统连接
大模型 / 多模态 / 私有模型          教务 / 教学 / 学工 / 科研


知识与上下文                         智能工具调用
知识库 / 记忆 / 业务上下文          查询 / 分析 / 生成 / 执行


       模型与算力      知识与数据      校园业务系统



section5:
section-heading__eyebrow：教育智能体
标题：为“教、学、管、研、服”配置专属 AI 智能体
副标题：基于智曜·智能引擎，将大模型、教育知识、业务数据与校园系统能力按场景组合，为教师、学生、管理人员和科研人员构建专属 AI 智能体，让智能能力深入备课、学习、教务、科研与校园服务全过程，从辅助问答进一步走向任务协同与业务执行。

ProductFeatureGridSection组件BaseCard 3x3

AI 教师助手

让 AI 成为教师的智能教学伙伴

提供智能备课、教案生成、课件辅助、试题生成、作业分析、教学总结与课程资料查询，减少重复性教学工作，辅助教师完成教学全过程。

智能备课　试题生成　作业分析

⸻

AI 学习助手

为学生提供个性化学习支持

围绕课程学习提供知识讲解、课程答疑、学习计划、错题分析和内容推荐，根据学习过程持续提供针对性的学习辅助。

课程答疑　错题分析　学习推荐

⸻

AI 教务助手

让复杂教务工作更高效

连接教务与教学系统，辅助完成排课、课程查询、教学通知、数据统计、材料审核和信息汇总等任务，降低日常教务处理成本。

智能排课　材料审核　教务查询

⸻

AI 科研助手

贯穿科研全过程的智能辅助

面向科研人员提供文献检索、资料整理、研究综述、论文辅助、科研数据分析及项目材料编制，加速科研信息获取与知识整理。

文献检索　研究分析　材料编制

⸻

AI 校园助手

构建统一校园智能服务入口

连接学校制度、办事流程及校园服务系统，为师生提供政策咨询、事项查询、办事指引和服务办理，实现校园服务统一智能入口。

政策咨询　办事指引　校园服务

⸻

AI 辅导员助手

辅助学生管理与日常服务

面向辅导员日常工作，辅助完成通知发布、信息收集、学生事务查询、材料整理、工作总结及常见问题答复，提高学生事务处理效率。

学生事务　信息汇总　通知管理

⸻

AI 数据分析助手

让教育数据直接服务管理决策

通过自然语言调用教学、教务和管理数据，完成指标查询、数据分析、趋势研判与报告生成，让管理人员无需复杂操作即可获取业务洞察。

数据问答　智能分析　报告生成

⸻

AI 招生助手

覆盖招生咨询与服务全过程

围绕招生政策、专业设置、培养方案、录取规则和校园信息，为考生及家长提供智能咨询，并辅助学校完成高频问题响应与招生信息服务。

招生咨询　专业问答　政策解读

⸻

AI 行政办公助手

让校园行政工作智能协同

连接学校 OA、制度知识与办公工具，辅助完成公文起草、会议纪要、材料汇总、制度查询、任务跟踪及日常办公事务处理。

公文辅助　会议纪要　行政协同




section6:
案例：

某高校教育智能体平台

围绕学校 AI 能力统一建设需求，基于智曜构建校级智能体运行平台，统一接入大模型、校园知识与业务工具，为不同院系快速构建教师、学生和管理类智能体，避免各部门重复建设 AI 基础能力。

20+
教育智能体上线

10+
校园系统连接

50%
智能应用开发效率提升

查看案例详情 →

⸻

某职业院校 AI 教学助手

围绕教师备课、课程建设与学生答疑场景，将课程资源、专业知识与大模型能力接入智曜，通过 Agent Runtime 构建专业课程智能体，为教师提供教案、试题和教学内容辅助，为学生提供课程问答与学习支持。

200+
专业课程接入

10,000+
师生用户覆盖

40%
教学辅助效率提升

查看案例详情 →

⸻

某教育集团 AI 校园服务平台

面向集团多校区统一 AI 服务需求，通过智曜连接校园知识、业务系统和第三方服务，构建统一 AI 校园入口。智能体能够根据师生需求调用不同系统和工具，提供咨询、查询、材料处理及校园事项服务。

10+
校区统一覆盖

30+
业务工具接入

60%
重复咨询量降低

查看案例详情 →