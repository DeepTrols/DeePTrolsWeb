# HOME
> 首页页面结构

## 当前视觉基线

自 `TASK-014.2` 起，HOME 与后续页面默认遵循 `https://www.deepctrls.com/deepctrls_com/` 的浅色官网基线：
- 页面背景：`#ffffff`
- 浅色区块：`#f0f5ff`
- 主色：`#1a57eb`
- 字体：`Source Han Sans CN` / `Noto Sans SC`
- 内容容器：参考 DeepCtrls 横向 gutter，默认 `calc(100% - (clamp(48px, 13.23vw, 254px) * 2))`，Hero 文案区为 `calc(100% - (clamp(48px, 10.42vw, 200px) * 2))`
- Header：`62px` 高，HOME 顶部透明白 Logo，hover 深色半透明；Mega、滚动与普通内页为白底黑 Logo，导航 `16px / 400`
- 常规区块：`pb-20 lg:pb-[132px]`

文档中保留的 EMQX 历史片段仅用于理解既有内容结构与交互来源；除非单独验收明确要求，否则不得继续按 EMQX Dark 的背景、字号、容器宽度和间距实现新页面。

## 页面示例

### 导航示例
```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│            logo    Why DeepTrols  核心产品  解决方案  Token Hub  资源  关于我们                          [免费获取专属方案] [CN ｜ EN]                                │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```
Header logo 地址：默认暗色 Hero 顶部使用 `/images/brand/deeptrols-logo-white.png`，Mega 展开、滚动、移动菜单或普通内页使用 `/images/brand/deeptrols-logo-black.png`，Header logo 高度为 `35px`。Footer logo 当前宽度为 `240px`。

Header 结构与交互必须与 `doc/product/NAVIGATION.md` 保持一致：主导航 DOM 为 `div style="position:relative;" > ul > li > button`，button 内不渲染 SVG；右侧为「免费获取专属方案」与「CN ｜ EN」。
### banner示例
```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                                                                 │ 
│                                                                                                                                                                 │ 
│                                                                                                                                                                 │ 
│                                                                                                                                                                 │ 
│                                                              构建企业级AI能力体系                                                                                     │ 
│                                                              让智能成为业务增长的新引擎                                                                                │ 
│                                                             在AI时代，企业不再需要更多工具，而是需要可落地的结果                                                        │ 
│                                                                                                                                                                 │ 
│                                                                        [button 免费获取专属方案]                                                                    │ 
│                                                                                                                                                                 │  
│─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────│ 
│                                                                 深受数据和人工智能基础设施领域领导者的信赖                                                             │ 
│    [武汉大数据logo]   [一汽丰田logo]   [同仁堂健康logo]    [广药白云山logo]   [岚图汽车logo]    [赛睿logo]    [伟创力logo]     [北京航空航天大学logo]     [中国地质大学logo]  │ 
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```
客户 logo strip 为独立模块，不属于 Hero 背景层；首页首屏 Hero 只负责背景图、标题、描述与 CTA。

banner 背景要求：参考 DeepCtrls 首页 `<section class="home-hero">` 的首屏比例、文字位置和 CTA 节奏，使用 `/images/home/deepctrls-hero-ai.png` 作为背景图，叠加左侧黑色线性遮罩；Hero 与区域一不再共用视频背景，不使用 canvas / TresJS。

### 区域一：三大业务方向
参考https://www.emqx.com/zh 中` <section class="container pb-32 lg:pb-44"><div class="flex flex-col lg:flex-row items-stretch overflow-hidden rounded-lg _bg_yva34_2"><div class="hidden lg:block lg:w-[40%] relative overflow-hidden min-h-[300px]"><img src="https://www.emqx.com/_nuxt/customer-spotlight-geely-bg.a22UmRF0.png" alt="吉利 case study" class="absolute inset-0 w-full h-full object-cover" loading="lazy">`部分。
需要调整为走马灯动画，一共有3个，内容分别是：
```text
主标题：企业级 AI 应用构建与业务智能化服务
描述：通过连接企业数据、知识、模型与业务系统，围绕企业真实业务场景，提供从需求梳理、场景规划、智能体设计到应用开发、系统集成和持续运营的全流程服务。

主标题：企业级 AI 平台工程与数字化系统建设服务
描述：面向企业 AI 应用规模化建设需求，提供统一技术架构、平台研发、系统集成、数据工程、知识工程、模型服务和智能体工程等平台工程服务。

主标题：AI 算力、模型与基础资源一体化服务
描述：围绕企业 AI 应用所需的算力、模型、数据和开发资源，提供 AI 服务器、算力中心规划建设、异构算力调度、模型接入管理、Token 管理及资源运营服务。
```
区域内容展示示例（走马灯动画）：
```text
┌─────────────────────────────────────────────────────────────────────────────┐ 
│                                │
│                                │     ICON
│      图片（给占位符）             │     企业级 AI 应用构建与业务智能化服务
│                                │     围绕企业真实业务场景，提供从需求梳理、场景规划、智能体设计
│                                │     到应用开发、系统集成和持续运营的全流程服务。
│                                │     button（阅读详情）
└──────────────────────────────────────────────────────────────────────────────┘
```

### 区域二：产品体系
- Eyebrow：DeepTrols OPS
- 标题：连接真实业务与人工智能
- 副标题：以数据与知识底座桥接企业业务与人工智能。赋能 AI Agent，实现对真实业务的支撑。
- 副标题样式：`text-xl`，桌面端不换行。
参考https://www.emqx.com/zh 中`<section id="platform" class="container pb-32 lg:pb-44"><div class="mb-12 flex flex-col items-center gap-2 text-center"><span class="text-base font-semibold uppercase text-primary/75">EMQX Platform</span>……`部分。
#### 产品架构占位（保留展示区域，后续重新设计流程图）
当前首页 `product-system__content` 渲染公共 `ProductSystemFlowFrame` 占位框，文案为“产品架构图占位符”，并在下方保留 `ProductSystemCards`。不得恢复旧 `HomeProductSystemFlow`、`HomeProductSystemMobileFlow` 或 `EnterpriseFlow` 挂载；以下节点与布局只作为历史设计参考，后续流程图重新设计前不得恢复旧图。

- 节点及布局
```text
中间使用：
 ◎ DeepTrolsOS
连接 · 理解 · 执行 · 治理
左侧：
数据、知识、Token、算力、安全
右侧：
- 智能制造
Manufacturing Brain
规划 ｜ 预测 ｜ 排产
Manufacturing Intelligence
质量 ｜ 设备 ｜ 供应链
Manufacturing Copilot
能源 ｜ 安全 ｜ 经营


- 企业AI应用
Enterprise Brain
知识 ｜ 分析 ｜ 决策
Enterprise Intelligence
营销 ｜ 销售 ｜ 服务
Enterprise Copilot
办公 ｜ 协同 ｜ 执行

- AI基础设施
AI Infrastructure Brain
调度 ｜ 编排 ｜ 治理
AI Infrastructure Intelligence
算力 ｜ 模型 ｜ 平台
AI Infrastructure Copilot
开发 ｜ 运维 ｜ 服务
```
- 中间展示示例
```text
┌────────────────────────────────────────────────────────┐ 
│                                                        │
│                      DeepTrolsOS                       │
│    [icon连接] · [icon理解] · [icon执行] · [icon治理]      │
│                                                        │
└────────────────────────────────────────────────────────┘
```
- 右侧展示示例
```text
┌───────────────────────────────────────────────────────────┐ 
│   智能制造                                                 │
│   [icon Manufacturing Brain]          知识 · 分析 · 决策    │
│   [icon Manufacturing Intelligence]   质量 · 设备 · 供应链   │
│   [icon Manufacturing Copilot]        能源 · 安全 · 经营    │
└───────────────────────────────────────────────────────────┘
```
- 动画
仅主链路使用轻量数据流动画
- 响应式
Web 使用完整 Vue Flow。

移动端改为纵向卡片，不保留复杂连线。

#### 底部四个卡片
参考 EMQX Platform 能力卡片样式：`bg-default`、`border-default`、`rounded-2xl`、`p-6`、顶部 hover 渐变线、hover 上移 4px、`border-primary/40` 与 `shadow-primary/5`。本地展示 4 张卡片，卡片正文去掉长标题层，仅保留产品名与描述。

底部四个卡片：
- 数曜
构建企业可信数据资产，打造AI时代的数据基础
描述：围绕数据采集、治理、开发、资产管理与共享流通，帮助企业建立统一、高质量的数据资产体系，为AI应用持续提供可信数据支撑。
- 博曜
构建企业知识资产，释放组织知识价值
描述：围绕知识采集、加工、组织与应用，帮助企业沉淀业务经验和行业知识，打造可检索、可推理、持续演进的知识体系
- 探曜
连接工业现场，驱动制造智能升级
描述：聚焦工业物联网与 Manufacturing AI，提供设备互联、实时感知、生产优化和智能决策能力，推动制造过程持续智能化
- 智曜
构建企业AI基础设施，夯实智能应用底座
描述：提供模型、算力、推理、Token 与 AI 开发平台等基础设施产品，为企业构建统一、安全、高效的 AI 运行环境

### 区域三：解决方案
- Eyebrow：Use Cases
- Section 背景：默认页面背景 `var(--dt-color-bg)`，不得单独使用 `#f0f5ff`。
- 标题：驱动各行业智能提升
- 描述：覆盖智能制造、企业运营、AI基础设施等核心领域，帮助企业快速构建可持续演进的智能化能力
- 描述样式：`text-xl`，桌面端不换行。
参考https://www.emqx.com/zh 中`<section class="container pb-32 lg:pb-44"><div class="mb-12 flex flex-col gap-2"><span class="text-base font-semibold uppercase text-primary/75">应用场景</span><h2 class="mb-4 md:mb-6 text-highlighted text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] !mb-0">驱动各行业实时智能</h2>……`部分。
tabs 样式参考 EMQX 中文站 `role="tablist"`：横向 flex、`gap-4`、`overflow-x-auto`、`whitespace-nowrap`、`mb-8`，每个 tab 为 `text-sm font-medium`、`min-h-10`、`px-4`、`rounded-full`、描边按钮，hover 与 active 状态切换文字和描边主色。
内容面板参考 EMQX 中文站 `role="region" aria-roledescription="carousel"`：`data-slot="root/viewport/container/item"` 结构，整体 `overflow-hidden rounded-lg`，slide 为整张切换，卡片 `min-h-[420px] lg:min-h-[520px]`、背景图绝对铺满、底部黑色渐变内容层、标签胶囊、`text-xl sm:text-2xl` 标题、`text-sm sm:text-base` 描述与 `了解更多` 链接。
内容区域采用tabs：
- tab1:智能制造
```
卡片背景图` imgs/industrial.K00G2HaS.png` 
标题：智能制造智能中枢
英文标题：Manufacturing Intelligence Hub
描述：融合 AI、数据与工业物联，打造覆盖制造全流程的智能化能力体系

aria-roledescription="滑动"
了解更多 ->
```

- tab2:智慧环保
```
卡片背景图` imgs/smart-env.CWc2pooP.png`
标题：生态环境智能感知
英文标题：Environmental Intelligence Sensing
描述：基于多源数据融合与 AI 推理，实现环境风险的智能识别、评估与预警

aria-roledescription="滑动"
了解更多 ->
```

- tab3:智慧能源
```
卡片背景图` imgs/smart-energy.DHKY-NE1.png`
标题：电网运维、储能管理和智能计量
英文标题：Energy Intelligence
描述：构建覆盖能源监测、分析、调度与优化的一体化智能能源体系

aria-roledescription="滑动"
了解更多 ->
```

- tab4:智慧水利
```
卡片背景图` imgs/smart-Water.DHKY-NE1.png`
标题：空间推理智能体
英文标题：Spatial Reasoning Agent
描述：让 AI 理解空间数据，并驱动 GIS 智能分析与交互决策

aria-roledescription="滑动"
了解更多 ->
```

- tab5:算力中心
```
卡片背景图` imgs/data-center-ai.CDu93Miw.png`
标题：AI算力基础设施
英文标题：AI Computing Infrastructure
描述：提供海外 AI 服务器供应、算力中心建设及交付服务

aria-roledescription="滑动"
了解更多 ->
```

- tab6:数据治理
```
卡片背景图` imgs/data.DHKY-NE1.png`
标题：数据工程
英文标题：Data Engineering
描述：覆盖数据采集、治理、开发与管理，构建统一数据底座

aria-roledescription="滑动"
了解更多 ->
```

按钮：查看所有应用场景 ->

### 区域四：服务
- Eyebrow：ecosystem
- 标题：连接企业 AI 全链路的开放生态
- 副标题：连接算力、模型、社区与行业知识，构建开放 AI 生态
- 副标题样式：`text-xl`，桌面端不换行。
参考https://www.emqx.com/zh 中`<section class="container pb-32 lg:pb-44"><div class="flex flex-col gap-2 text-center"><span class="text-base font-semibold uppercase text-primary/75">产品组合</span><h2 class="mb-4 md:mb-6 text-highlighted text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] !mb-0">覆盖边缘到云的统一 MQTT 平台</h2>……`部分。
采用 2×2 卡片网格布局，展示平台提供的四类生态能力。
每张卡片宽高一致，整体保持统一的留白、圆角及边框风格，卡片之间间距一致，保证页面视觉平衡。

* 区域由 标题、副标题 和 四张能力卡片组成，每张卡片包含图标（左上）、能力名称、一句话简介、分类标签（左下）、右侧场景插画、Hover 操作按钮（右下，仅悬停显示）
* 卡片样式严格参考 EMQX 产品组合卡片：`mt-12 grid gap-6 sm:grid-cols-2`，卡片为可点击 `group`，`min-h-[280px]`、`rounded-2xl`、`border-muted`、`bg-default`、`p-6 sm:p-8`、`shadow-sm`，Hover 时描边切换 `primary/40`、阴影切换 `shadow-xl shadow-primary/10`，内容保持左对齐，右侧动画层绝对定位于卡片右侧。
* 鼠标移入卡片时卡片边框切换为品牌主色、右侧插画播放线条流动动画、右下角圆形箭头按钮淡入显示、阴影增强，突出当前焦点，鼠标移出后恢复默认状态
* Hover 过渡时间：200–300ms、边框、阴影、按钮同步过渡、插画动画循环播放，离开立即停止、动画保持轻量，不影响内容阅读

- Card1:Token Hub
```
标题：Token Hub
描述：统一管理企业 AI Token，实现模型调用、配额控制与成本管理
能力点：
✓ 支持DeepSeek、Qwen、OpenAI等模型接入
✓ Token 配额、成本及调用统计
✓ 企业级统一 API 接入
标签：AI Token Service
右侧动画： 参考https://www.emqx.com/zh 中`<a href="/zh/cloud" ……` 中的动画（1:1还原）
```

- Card2:智能体社区
```
标题：智能体社区
描述：汇聚行业智能体、实践案例与开发资源，加速 AI 应用落地
能力点：
✓ 行业智能体持续更新
✓ 开源项目与实践案例
✓ 社区交流与技术分享
标签：Agent Community
右侧动画： 参考https://www.emqx.com/zh 中`<a href="/zh/products/emqx-edge" ……` 中的动画（1:1还原）
```

-Card3:算力与基础设施（不需要能力点）
```
标题：算力与基础设施
描述：提供海外 AI 服务器供应、算力中心建设及基础设施交付。
标签：AI Infrastructure
右侧动画： 参考https://www.emqx.com/zh 中`<a href="/zh/products/emqx"  ……` 中的动画（1:1还原）
```

- Card4:行业白皮书（不需要能力点）
```
标题：行业白皮书
描述： AI 行业前沿研究、技术实践与数字化建设参考。
标签：Industry Insights
右侧动画： 参考https://www.emqx.com/zh 中`<a href="/zh/products/emqx-neuron"  ……` 中的动画（1:1还原）
```

### 区域五：关于我们
- Eyebrow：关于我们
- 标题：深度数智，企业AI基础设施赛道的构建者与引领者
- 标题必须显式换行为两行展示：`深度数智，企业AI基础设施赛道的` / `构建者与引领者`。
- 位置：位于 `Ecosystem` 与 `Resources` section 之间。
- 整体参考 `https://www.deepctrls.com/deepctrls_com/` 首页公司与合作客户区域：白色到浅蓝渐变背景，顶部标题居中，后接宽幅 banner、客户标签与三行 logo 走马灯。
- 间距：该 section 内部按 DeepCtrls 参考收紧底部留白，`partner-rows` 后不再额外保留全局 section 大底边距；下方 `Resources` section 通过自身顶部留白承接统一页面节奏，避免两个 section 视觉贴边。

#### 板块 1：公司能力 Banner
- 图片：`public/O1CN0.png`（运行时 URL：`/O1CN0.png`）。
- 结构参考 DeepCtrls `company-stats__banner`。
- 比例：`aspect-[1402/357]`。
- 圆角：`rounded-dt-md`。
- 宽度：放在 `.container` 内，宽度为 `calc(100% - 10px)`。
- 不允许新增组件私有 `<style>`，尺寸、间距和对象填充必须使用 Tailwind CSS v4 工具类表达。

#### 板块 2：客户标签
- 图片：`public/clients-label.webp`（运行时 URL：`/clients-label.webp`）。
- 结构参考 DeepCtrls `clients-label`。
- 间距：上方 `62px`，下方 `42px`。
- 高度：`max-height: 26px`，按原图比例展示。

#### 板块 3：合作客户 Logo 走马灯
- 结构参考附件中的 `partner-rows`：三行 `.partner-row`，每行 `.partner-row__track` 横向排列。
- 行方向：第 1 行向右，第 2 行向左，第 3 行向右。
- 行间距：`18px`。
- Logo 单项尺寸：`144px × 55px`。
- Logo 间距：`22px`。
- 动画时长：`42s linear infinite`。
- 动画 token 必须定义在 `assets/css/tailwind.css` 的 Tailwind v4 `@theme` 中，并通过 `animate-home-about-marquee-left/right` 使用；组件不写局部 keyframes 或 scoped CSS。
- 合作方数据统一维护在 `data/home.ts` 的 `homeAbout.partnerRows`，模板不得硬编码具体 logo 列表。

### 区域六：创新、洞察与新闻
- 标题：创新、洞察与新闻
- 副标题：无
- 与上方 About section 的间距：使用 Tailwind CSS v4 顶部间距 `pt-16 lg:pt-24`，不得通过 About section 底部大 padding 撑开。

* 采用 “1+3” 双栏资讯布局，左侧展示一篇重点内容，右侧纵向展示三篇精选内容，形成主次分明的信息层级。
* 整体使用 左右双栏布局，左侧约占 50% 宽度，右侧约占 50% 宽度，栏间保持统一间距。
* 顶部由 分类标题、主标题 与 操作按钮组成。左侧：分类（Eyebrow）+ 主标题，右侧：查看更多按钮，标题与内容区域保持较大留白，突出信息层级。
* 左侧主卡片布局采用 大图卡片，图片占据卡片主体区域，可直接作为视觉封面。点击进入详情。
* 右侧列表采用 纵向列表布局，展示三篇精选内容。每个列表项由：左侧缩略图、右侧标题、简短摘要 组成。列表项之间保持固定间距，整体高度与左侧主卡片保持一致。

采用”1+3”资讯布局，以一篇重点内容配合三篇精选内容，突出核心内容的同时兼顾资讯浏览效率，整体风格简洁、层级清晰，符合企业官网内容展示规范。
参考 https://www.emqx.com/zh 中的
`<section class="container pb-32 lg:pb-44"><div class="mb-12 flex flex-col gap-2 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left"><div class="flex flex-col gap-2"><span class="text-base font-semibold uppercase text-primary/75">资源</span>……`

### 区域七：CTA
- 参考 `https://www.deepctrls.com/deepctrls_com/` 首页 `home-contact-cta` 横幅的布局、尺寸、字号、定位与 hover 发光边框节奏。
- 背景图片：`public/contact-cta-banner.webp`（运行时 URL：`/contact-cta-banner.webp`）。
- `.home-contact-cta__inner` 必须使用 `var(--dt-container)`，确保 CTA 内容左边缘与页面内容左边缘对齐。
- `CtaSection` 必须使用 Tailwind CSS v4 工具类实现，不允许新增独立 CTA SCSS、组件私有 `<style>` 或页面级复制样式；三项指标使用紧凑横向 flex 间距，不使用绝对定位拉开间隔。
- 主标题：以 AI 重塑数字世界与物理世界
- 指标：
  - 新一代智能基础设施
  - 四大智能技术底座
  - 覆盖关键产业场景
- 按钮：免费获取专属方案
- 该区块必须由 `components/common/CtaSection.vue` 承载，首页、Why DeepTrols 与产品页默认复用同一组件；页面层只传 `title-id`，不得复制旧 CTA panel 或双按钮实现。
### Footer
参考 EMQX 官网 Footer 的布局与交互风格，整体保持 `pt-12 bg-muted` 的深色背景、弱分隔线、Logo + 社交媒体入口、五列导航与底部版权结构，要求 1:1 还原布局节奏、字号、行高、间距与 hover。Footer 左侧 logo 宽度为 240px，不展示语言切换入口。`site-footer__socials` 与 `site-footer__main` 平级，位于 `site-footer__main` 和底部分隔线之间。

- 产品：
  - 数曜·数据治理平台
  - 数曜·数据标签平台
  - 数曜·数据开发平台
  - 数曜·数据要素监管平台
  - 博曜·企业级知识管理平台
  - 分隔线
  - 探曜·AI物联感知平台
  - Device Agent
  - 分隔线
  - API安全管控平台
  - API安全审计系统
  - 业务威胁感知系统
- 使用场景：
  - 智能制造
  - 智慧环保
  - 智慧水利
  - 智慧能源
  - 算力中心
  - 数据治理
  - 企业AI应用
  - 智慧城市
  - 智慧医疗
- 行业：
  - 制造业
  - 能源
  - 交通运输与物流
  - 政府/公共事业
  - 教育
  - 水利/水务
  - 金融服务
  - 城市治理
  - 零售
- 服务：
  - Token Hub，带 EMQX 同款外跳箭头 SVG
  - 白皮书&报告
  - 产品文档
  - 算力与基础设施
  - 智能体社区，带 EMQX 同款外跳箭头 SVG
- 公司：
  - 关于我们
  - 新闻动态
  - 合作伙伴
  - 加入我们
  - 联系我们
  - 品牌资源
  - 服务案例
  - 投资计划
- 底部：
  - 左侧：京公网安备100861001010000号 | 京ICP备20018888号-4
  - 右侧：@ 武汉深度数智科技有限公司 2026 版权所有

---

## Engineering Baseline

HOME 是后续页面的默认实现基准。除非其他页面需求明确说明允许偏离，否则必须遵循：

- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`

公共复用要求：
- 按钮使用 `BaseButton` 或 `.dt-button` 系列。
- Section 标题使用 `SectionHeading`。
- Tab 使用 `.dt-tab-list` + `.dt-tab`。
- 产品体系卡片使用 `.dt-product-card` + `.dt-product-card__accent` + `.dt-icon-box`。
- 生态卡片使用 `.dt-ecosystem-card` + `.dt-card-tag`。
- 页面底部 CTA 使用 `components/common/CtaSection.vue` 的 `home-contact-cta` 横幅结构。
- 禁止在新组件中重复复制 HOME 内已公共化的按钮、tab、卡片、标题和 CTA 样式。
