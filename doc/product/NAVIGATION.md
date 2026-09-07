# Navigation
> Version: 1.3
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
├── 数曜 ｜ 数智基建 >
│   构建面向 AI 的企业数据基础设施
│
├── 博曜 ｜ 知识中枢 >
│   让企业知识可沉淀、可理解、可调用
│
├── 数曜·数据治理平台 >
│   构建高质量企业数据体系
│
├── 核心产品 >
│
├── 智曜 ｜ 智能引擎 >
│   汇聚算力与模型能力，驱动企业智能应用
│
└── 探曜 ｜ 智联万物 >
    连接设备与场景，让 AI 感知真实世界
```
- 实际桌面 Mega 采用两列文字入口：第一列展示 `数曜 ｜ 数智基建` 与 `博曜 ｜ 知识中枢`；第二列展示 `数曜·数据治理平台`、`核心产品`、`智曜 ｜ 智能引擎` 与 `探曜 ｜ 智联万物`。
- Mega 结构参考 DeepCtrls：外层白底，`padding: 45px 0 75px`；内部 `.mega-shell` 使用 `padding-left: var(--nav-x)`；左侧 `.mega-title` 宽 `204px`，字号 `24px`、行高 `35px`；右侧 `.mega-cols` 为横向分栏，每列宽 `428px`、左侧 `72px` padding，并使用纵向渐变分隔线。
- Mega 条目使用 `.mega-entry`：高度 `61px`、下间距 `30px`；标题 `24px / 35px / 400`，描述 `14px / 16px / 400`；hover、focus 与 active 只将标题切换为 `#1e44e0`。
- Mega 条目内不渲染 icon，不使用卡片底色、边框、阴影或圆角卡片结构。
- 不再展示 AI SECURITY、旧数据产品全量清单或 Device Agent 相关内容（对应产品页面保留，可经页脚直达）。

## 解决方案（Mega Menu）
```text
解决方案 >
│
├── 智能制造解决方案 >
│   融合设备、数据与智能生产
├── 智慧储能解决方案 >
│   驱动储能安全、高效与智能运营
├── 智慧水利/水务解决方案 >
│   感知水务全域，智能调度运营
├── 智慧教育解决方案 >
│   AI赋能教学、管理与学习
├── FDE解决方案 >
│   深入业务现场，让AI真正落地
├── 算电协同运营方案 >
│   统筹算力、电力、冷却与储能
├── 零碳园区智能化解决方案 >
│   协同能源、设备与园区运营
└── AI+供应链解决方案 >
    AI驱动供应链预测与协同决策
```
- 与核心产品 Mega 结构完全一致（共享同一面板组件）：左侧标题 + 右侧两列文字入口，无 icon、无卡片底色、无阴影。
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
