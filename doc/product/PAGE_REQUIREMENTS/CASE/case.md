# 行业案例页面
要求：不允许新建样式，必须通过Tailwind CSS v4

## Hero要求
- 同智能制造Hero，但是需要将Hero背景修改为 doc/product/PAGE_REQUIREMENTS/CASE/conteq_expo_visual_1 (1080p).mp4 并添加一个黑色70%透明度的遮罩
- Hero的文字内容：
主标题：深度数智 智能化转型实践精选
副标题：从数据、知识与物联感知，到 AI 智能体与算力能源协同，DeepTrols 深入客户真实业务场景，将技术能力与行业需求结合，持续构建可运行、可验证、可演进的智能应用。

- 同智能制造Hero中的CTA

## section1
product-metrics 组件

100+
服务客户

300+
落地项目

50%-70%
AI赋能业务提效

10+
覆盖行业


## section2

使用reports中的<section data-v-56cfef41="" class="flow-root pb-16 lg:pb-32" aria-labelledby="report-featured-title"><div class="container"><h2 id="report-featured-title" class="sr-only">推荐资源</h2>……
但是需要去掉tag与<p class="mb-2 text-sm font-medium text-primary/75">企业 AI</p>

## tab栏，同reports

##  section3

使用reports中的report-resources-panel，同样去要去掉tag与<p class="mb-2 text-sm font-medium text-primary/75">企业 AI</p>

列表不再使用「加载更多」按钮：改为 6 条/页分页（3 列网格两整行），翻页复用新闻动态页的共享组件 `PagerArrows`（49×49 双箭头，桌面右对齐、移动居中；筛选/搜索变化时回到第 1 页；不足一页不渲染翻页）。