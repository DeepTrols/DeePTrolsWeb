# Navigation
> Version: 1.5
---

## Primary Navigation
```text
Logo 点击显示首页（doc/product/PAGE_REQUIREMENTS/HOME.md）
Why DeepTrols
核心产品
解决方案
Token Hub
资源
关于我们
```

Header 约束：
- Header logo 使用运行时品牌图片：HOME 暗色 Hero 顶部默认 `/images/brand/deeptrols-logo-white.png`，Mega 展开、滚动、移动菜单或普通内页切换为 `/images/brand/deeptrols-logo-black.png`，高度为 `35px`。
- 主导航 DOM 必须保持 `div style="position:relative;" > ul > li > button`。
- 主导航 button 内不渲染 SVG。
- Header 按 DeepCtrls 参考站使用 `fixed` 全视口宽度，桌面内边距为左 `43px`、右 `61px`；正文内容区使用 `--dt-page-gutter` 推导出的 `.container` 宽度。
- Header 高度为 `62px`，HOME 首屏顶部默认透明，hover 时为深色半透明；滚动、Mega 展开或普通内页为白色半透明，导航文字 `16px / 400`，hover 切换为主色 `#1a57eb`。
- Header 滚动自适应（参考 DeepCtrls `is-in-hero`）：HOME 下滚后只要 Header 仍完整处于 Hero 区域内，保持白色文字/白色 logo 与 `rgba(0, 0, 0, 0.4)` 深色半透明背景；滚出 Hero 区域后切换为白色半透明背景与黑色 logo。Hero 区域按 `.home-hero` 实际渲染高度在 scroll/resize/路由切换时测量。
- Header 右侧固定为「免费获取专属方案」与「CN ｜ EN」，不展示 GitHub SVG、语言切换 SVG、`登录OPS` 或 Header 级 `免费咨询`。
- Mega Menu 仅 `核心产品 / 解决方案` 展示；鼠标离开按钮和面板后必须收回。
- `Token Hub`（`/services/token-hub`）与 `资源`（`/resources/reports`）为顶级直链，不展示 Mega Menu。
---
# Mega Menu

## Why DeepTrols
```text
直接跳转 `/why-deeptrols`，不展示 Mega Menu。
```

## 核心产品（Mega Menu）
```text
核心技术 >
│
├── 左栏（品类，悬停/聚焦切换右栏）        ├── 右栏（当前品类产品）
│   数曜 ｜ 数智基建 >                      │   数曜·数据治理平台 >
│   构建面向 AI 的企业数据基础设施          │   构建高质量企业数据体系
│   博曜 ｜ 知识中枢 >                      │   数曜·数据标签平台 >
│   让企业知识可沉淀、可理解、可调用        │   为AI提供高质量训练数据
│   智曜 ｜ 智能引擎 >                      │   数曜·数据开发平台 >
│   汇聚算力与模型能力，驱动企业智能应用    │   支持数据集成、开发与调度
│   探曜 ｜ 智联万物 >                      │   数曜·数据要素监管平台 >
│   连接设备与场景，让 AI 感知真实世界      │   支撑数据要素合规监管
```
- 桌面 Mega 采用 DeepCtrls 式双栏联动：左栏为 4 个品类入口（`数曜 ｜ 数智基建`、`博曜 ｜ 知识中枢`、`智曜 ｜ 智能引擎`、`探曜 ｜ 智联万物`），不展示 `核心产品` 品类入口（顶部导航 `核心产品` 按钮与 `.mega-title` `核心技术` 直达 `/products`）；鼠标悬停或键盘聚焦某个品类时，右栏切换为该品类下的产品列表。
- 面板打开时按当前路由激活对应品类：位于某个产品页（如 `/products/ai-iot`、`/products/device-agent`）时，左栏高亮该品类且右栏展示该品类产品；无匹配路由时默认激活第一个品类 `数曜 ｜ 数智基建`（右栏展示数曜 4 个产品）。
- 右栏产品清单：数曜→`数曜·数据治理平台`(/products/data-governance)、`数曜·数据标签平台`(/products/data-labeling)、`数曜·数据开发平台`(/products/data-development)、`数曜·数据要素监管平台`(/products/data-element-regulation)；博曜→`博曜·企业级知识管理平台`(/products/knowledge-base)；智曜→`智曜·AgentOS`(/products/agentos)；探曜→`探曜·AI物联感知平台`(/products/ai-iot)、`Device Agent`(/products/device-agent)。
- Mega 结构参考 DeepCtrls：外层白底，`padding: 45px 0 75px`；内部 `.mega-shell` 使用 `padding-left: var(--nav-x)`；左侧 `.mega-title` 宽 `204px`，字号 `24px`、行高 `35px`；右侧 `.mega-cols` 为横向分栏（`.mega-col--categories` 与 `.mega-col--links`），每列宽 `428px`、左侧 `72px` padding，并使用纵向渐变分隔线。
- Mega 条目使用 `.mega-entry`：高度 `61px`、下间距 `30px`；标题 `24px / 35px / 400`，描述 `14px / 16px / 400`；hover、focus 与 active 只将标题切换为 `#1e44e0`；左栏当前激活品类保持 `is-active` 高亮。
- Mega 条目内不渲染 icon，不使用卡片底色、边框、阴影或圆角卡片结构。
- 不再展示 AI SECURITY 或旧数据产品全量清单（对应产品页面保留，可经页脚直达）。

## 解决方案（Mega Menu）
```text
解决方案 >
│
├── 第一行
│   ├── 智能制造解决方案
│   │   融合设备、数据与智能生产
│   ├── 智慧储能解决方案
│   │   驱动储能安全、高效与智能运营
│   ├── 智慧水利/水务解决方案
│   │   感知水务全域，智能调度运营
│   └── 智慧教育解决方案
│       AI赋能教学、管理与学习
│
└── 第二行
    ├── FDE解决方案 [hot]
    │   深入业务现场，让AI真正落地
    ├── 算电协同运营方案 [hot]
    │   统筹算力、电力、冷却与储能
    ├── 零碳园区智能化解决方案
    │   协同能源、设备与园区运营
    └── AI+供应链解决方案
        AI驱动供应链预测与协同决策
```
- 解决方案 Mega 保持与核心产品一致的左侧 `.mega-title`、标题字号 `24px / 35px / 400`、描述字号 `14px / 16px / 400`、hover/focus/active 标题变蓝。
- 右侧内容使用横向 `4 × 2` 网格；不渲染「应用场景 / 行业方案」作为面板内标题，不使用 icon、卡片底色、边框、阴影或圆角卡片结构。
- `FDE解决方案` 与 `算电协同运营方案` 展示 `hot` 标签：标签随标题文字排版（inline-flex），紧贴对应标题文字右上角，轻微上浮（`top: -4px`），不锚定到网格单元右侧。
- 入口落链：智能制造→`/solutions/manufacturing`、智慧储能→`/solutions/energy`、智慧水利/水务→`/solutions/water`、算电协同→`/solutions/compute`；智慧教育→`/services/smart-education`、FDE→`/services/enterprise-ai-delivery`、零碳园区→`/services/zero-carbon-park`、AI+供应链→`/services/ai-supply-chain`（后四者为 noindex 占位页，待后续任务补充完整内容）。

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
