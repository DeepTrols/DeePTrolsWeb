# report
> 白皮书&报告 页面结构

创建about_us路由
1、公共的Header与Footer
2、PageHero需要采用居中展示

标题：白皮书&报告
副标题：全球最新的AI相关白皮书&报告，深入了解人工智能的世界。

参考https://www.emqx.com/zh/resources 中 <div><section class=""><div class="container text-center pt-34 pb-16 md:pt-38 md:pb-20"><div class="max-w-5xl mx-auto"><div><!----><h1 class="mb-4 md:mb-6 text-highlighted text-4xl sm:text-5xl font-bold tracking-tight leading-[1.2] !mb-6">资源</h1><p class="text-default text-lg sm:text-xl md:text-2xl font-normal mb-0 lg:mb-0">各类 EMQ 资源一网打尽，深入了解物联网与人工智能的世界。</p><!----></div></div></div></section><div class="container pb-32"><section class="mb-24"><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><a href="/zh/resources/harnessing-llm-with-mqtt" class="group block"><article><div class="relative overflow-hidden rounded-lg mb-4"><span class="inline-flex items-center justify-center px-2.5 py-0.5 text-sm text-white rounded-full select-none bg-violet-500 absolute top-3 left-3 z-10">白皮书</span><img width="400" height="180" alt="MQTT + 大模型：实时智能融合架构与实践" loading="eager" data-nuxt-img="" srcset="https://assets.emqx.com/images/ea657fcc3737de49a88a735fe7675668.jpg?x-image-process=image%2Fresize,w_400,h_180%2Fformat,webp 1x, https://assets.emqx.com/images/ea657fcc3737de49a88a735fe7675668.jpg?x-image-process=image%2Fresize,w_800,h_360%2Fformat,webp 2x" class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" src="https://assets.emqx.com/images/ea657fcc3737de49a88a735fe7675668.jpg?x-image-process=image%2Fresize,w_400,h_180%2Fformat,webp" style="aspect-ratio: 400 / 180;">……
页面的布局及样式

## 实现说明

- 页面路由采用服务导航与站点地图中的 `/resources/reports`。
- `创建about_us路由` 为页面模板残留描述，不作为本页面路由依据。
- 页面复用公共 Header、Footer 与居中 `PageHero`。
- `PageHero` 下方必须先渲染推荐资源 Section，展示 3 个推荐资源。
- 推荐资源 Section 下方必须渲染 tab 与搜索控制条，控制条结构为 `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8`。
- tab 文案依次为：全部、产品规格书、电子书、白皮书、视频、幻灯片、基准测试报告。
- tab 与搜索控制条之后再进入普通资源列表 `container pb-32`。
- 普通资源列表采用 `section mb-24`、`grid grid-cols-1 gap-8 md:grid-cols-3`。
- 普通资源列表最后必须渲染“加载更多”按钮，外层为 `flex justify-center mt-10`，按钮为 `data-slot="base"` primary 链接，链接使用 `/zh/resources/pages/2`。
- 资源卡片采用 400:180 图片比例、左上角类型徽标、`rounded-lg` 图片圆角与 `group-hover:scale-105` hover 节奏。
- 运行时封面图统一使用 `public/images/**`，不得直接引用 `doc/product/**/imgs`。
