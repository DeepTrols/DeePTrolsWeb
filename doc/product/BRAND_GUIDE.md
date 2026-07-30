# BRAND GUIDE
> Version: 1.0
---

## Purpose
本文件定义 DeepTrols 品牌的统一表达方式，包括品牌定位、品牌语言、视觉原则及内容规范。

目标：

- 保持官网整体品牌一致性

- 为设计师提供统一设计方向

- 为 Codex、Cursor 等 AI 开发工具提供全局设计约束

- 保证后续新增页面仍保持一致的品牌风格

本文件**不负责**：

- 页面布局（见 PAGE_REQUIREMENTS）
- 导航结构（见 NAVIGATION）
- 网站信息架构（见 SITE_MAP）
- 组件实现（见 `doc/engineering/HOME_PAGE_BASELINE.md`）
- Logo 制作规范
- 印刷物料规范

---


## Brand Positioning

### 品牌定位

DeepTrols 是一家专注于企业 AI 能力建设的技术服务公司，围绕企业级 AI 应用构建、AI 平台工程、数据与知识底座、Token 与算力基础设施，为企业提供从规划咨询、平台建设到场景落地与持续运营的全生命周期服务。

### 品牌使命

构建企业级AI能力体系，让智能成为业务增长的新引擎

### 品牌愿景

致力于成为新一代企业AI应用与智能化转型引领者


---

## Brand Keywords

DeepTrols 应呈现以下品牌气质：

- 专业（Professional）
- 工程化（Engineering）
- 稳健（Reliable）
- 克制（Minimal）
- 开放（Open）
- 长期主义（Long-term）

避免：

- 炫技
- 浮夸营销
- 互联网消费级风格
- 娱乐化表达

---

## Brand Voice
官网文案应保持以下原则：

### 推荐

- 强调业务价值
- 强调工程能力
- 使用客观描述
- 使用完整句子
- 使用行业通用术语
- 用事实说明能力

例如：
> 覆盖数据、认知与执行的企业级AI基础设施体系

### 避免

避免使用：
- 全球领先
- 行业第一
- 革命性
- 颠覆
- 最强
- 唯一
- 无限可能

避免空洞口号。

---

## Design Principles

官网整体设计遵循以下原则：

### Simple

保持页面简洁。

### Professional

体现企业级产品气质。

### Engineering

突出工程能力，而非营销包装。

### Readable

优先保证信息可读性。

### Consistent

保持统一设计语言。

---

## Visual Baseline

除非页面需求明确说明允许偏离，所有页面默认遵循 HOME 当前实现：

- 深色背景以 `#151515` 为页面基准。
- Header、Mega Menu、Footer、按钮、Tab、卡片、CTA、标题层级必须参考 `doc/engineering/HOME_PAGE_BASELINE.md`。
- 视觉节奏参考 EMQX 中文站 Dark 模式的布局、间距、字体层级、hover 与响应式行为，但不得复制其品牌、文案、源代码或专有资产。
- 公共按钮使用 `BaseButton` 或 `.dt-button` 系列；Section 标题使用 `SectionHeading`；Tab 使用 `.dt-tab-list` + `.dt-tab`；平台能力卡使用 `.dt-product-card`；生态卡使用 `.dt-ecosystem-card`。
- 新页面不得重新发明主色、圆角、按钮 hover、tab hover、卡片 hover、Footer 结构。

---

## Icon Principles

图标原则：

- 风格统一
- 简洁线性
- 易于识别
- 不承担主要信息表达

避免混用多种图标风格。

---

## AI Design Principles

AI 工具生成页面时，应遵循以下原则：

- 保持统一品牌风格
- 保持组件一致性
- 保持页面留白
- 使用统一间距
- 不增加无意义装饰
- 不随意修改品牌颜色
- 不改变品牌语言风格

---

## References

设计参考：
- https://www.emqx.com/zh Dark 模式

仅参考布局节奏、导航交互、字体层级、间距、卡片比例、背景处理、过渡时长和响应式行为。禁止复制具体内容、源代码、品牌元素或专有资产。

---

## Scope

BRAND_GUIDE 仅负责品牌统一规范。
以下内容不属于本文件：

- 页面结构
- 页面模块
- 页面文案
- 页面 CTA
- 页面交互
- 组件实现
- CSS / SCSS / Tailwind 规范
- Vue 组件规范
- Logo 使用规范
- 印刷规范

上述内容分别由：

- PAGE_REQUIREMENTS
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `AGENTS.md`

负责定义。
