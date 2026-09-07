# Navigation
> Version: 1.3
---

## Primary Navigation
```text
Logo 点击显示首页（doc/product/PAGE_REQUIREMENTS/HOME.md）
Why DeepTrols
产品
解决方案
Token Hub
资源
关于我们
```

Header 约束：
- Header logo 使用运行时品牌图片：HOME 暗色 Hero 顶部默认 `/images/brand/deeptrols-logo-white.png`，Mega 展开、滚动、移动菜单或普通内页切换为 `/images/brand/deeptrols-logo-black.png`。
- 主导航 DOM 必须保持 `div style="position:relative;" > ul > li > button`。
- 主导航 button 内不渲染 SVG。
- Header 按 DeepCtrls 参考站使用 `fixed` 全视口宽度，桌面内边距为左 `43px`、右 `61px`；正文内容区使用 `--dt-page-gutter` 推导出的 `.container` 宽度。
- Header 高度为 `62px`，HOME 首屏顶部默认透明，hover 时为深色半透明；滚动、Mega 展开或普通内页为白色半透明，导航文字 `16px / 400`，hover 切换为主色 `#1a57eb`。
- Header 右侧固定为「免费获取专属方案」与「CN ｜ EN」，不展示 GitHub SVG、语言切换 SVG、`登录OPS` 或 Header 级 `免费咨询`。
- Mega Menu 仅 `产品 / 解决方案` 展示；鼠标离开按钮和面板后必须收回。
- `Token Hub`（`/services/token-hub`）与 `资源`（`/resources/reports`）为顶级直链，不展示 Mega Menu。
---
# Mega Menu

## Why DeepTrols
```text
直接跳转 `/why-deeptrols`，不展示 Mega Menu。
```

## 产品（Mega Menu）
```text
第一行：数曜 ｜ 数智基建 >（4 个 card 横向排列）
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ICON 数曜·数据治理平台          │ ICON 数曜·数据标签平台          │ ICON 数曜·数据开发平台          │ ICON 数曜·数据要素监管平台      │
│      构建高质量企业数据体系      │      为AI提供高质量训练数据      │      支持数据集成、开发与调度    │      支撑数据要素合规监管        │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

第二行：三个品类，与第一行 4 个卡位对齐（探曜占 2 个卡位）
┌─────────────────────────────┬─────────────────────────────┬───────────────────────────────────────────────────────────────┐
│ 博曜 ｜ 知识中枢 >            │ 智曜 ｜ 智能引擎 >            │ 探曜 ｜ 智联万物 >                                            │
│                             │                             │                                                             │
│ ICON 博曜·企业级知识管理平台   │ ICON 智曜·AgentOS            │ ICON 探曜·AI物联感知平台     │ ICON Device Agent              │
│      构建AI可理解的知识体系    │      Agent基础设施平台       │      实现设备、数据与智能应用互联 │      具备自主执行能力的设备智能体   │
└─────────────────────────────┴─────────────────────────────┴───────────────────────────────────────────────────────────────┘
```
- 品类标题为「品类 ｜ 定位」+ 右箭头，可点击（数曜→`/products`、博曜→`/products/knowledge-base`、智曜→`/products/agentos`、探曜→`/products/ai-iot`）。
- 卡片字体大小与样式保持不变，icon 适当放大；第一行与第二行卡位对齐，卡片间距 16px、行间距 26px。
- 不再展示 AI SECURITY 相关内容（对应产品页面保留，可经页脚直达）。

## 解决方案（Mega Menu）
```text
应用场景
┌─────────────────────────────┬─────────────────────────────┬───────────────────────────┬─────────────────────────┐
│ ICON 智能制造解决方案        │ ICON 智慧储能解决方案        │ ICON 智慧水利/水务解决方案 │ ICON 智慧教育解决方案     │
│      融合设备、数据与智能生产 │      驱动储能安全、高效与    │      感知水务全域，        │      AI赋能教学、        │
│                             │      智能运营               │      智能调度运营          │      管理与学习          │
├─────────────────────────────┼─────────────────────────────┼───────────────────────────┼─────────────────────────┤
│ ICON FDE解决方案 [hot]       │ ICON 算电协同运营方案 [hot]  │ ICON 零碳园区智能化解决方案 │ ICON AI+供应链解决方案     │
│      深入业务现场，          │      统筹算力、电力、        │      协同能源、设备        │      AI驱动供应链预测      │
│      让AI真正落地            │      冷却与储能              │      与园区运营            │      与协同决策            │
└─────────────────────────────┴─────────────────────────────┴───────────────────────────┴─────────────────────────┘
```
- 与产品 Mega 结构完全一致（共享同一面板组件）：品类标题 `应用场景` + 卡片网格（4×2，卡片间距 16px、行间距 26px），无左侧介绍面板。
- `FDE解决方案`、`算电协同运营方案` 卡片右上角带 `hot` 标签。
- 卡片落链：智能制造→`/solutions/manufacturing`、智慧储能→`/solutions/energy`、智慧水利/水务→`/solutions/water`、算电协同→`/solutions/compute`；智慧教育→`/services/smart-education`、FDE→`/services/enterprise-ai-delivery`、零碳园区→`/services/zero-carbon-park`、AI+供应链→`/services/ai-supply-chain`（后四者为 noindex 占位页，待后续任务补充完整内容）。

## Token Hub
```text
直接跳转 `/services/token-hub`，不展示 Mega Menu。
```

## 资源
```text
直接跳转 `/resources/reports`（原「白皮书 & 报告」），不展示 Mega Menu。
```

## 关于我们
```text
直接跳转 `/about_us`，不展示 Mega Menu。
```
