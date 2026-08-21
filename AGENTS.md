# AGENTS.md
你是一个优秀的高级前端工程师，你具有高级的审美和优秀的前端编码能力，你可以通过以下规则要求完成企业网站的制作和开发。
> Version: 1.0
> Name：DeepTrols Website
> Type：Enterprise AI Official Website
> Tech Stack：Nuxt 4 + Vue 3 + TypeScript + SCSS + Tailwind CSS v4
> Package Manager：pnpm
> Repository：GitHub

---
# Objective
构建 DeepTrols 企业官网。
官网应具备：
- 企业级视觉设计
- 高质量交互体验
- 响应式布局
- 优秀的 SEO
- 高性能
- 高可维护性

所有实现必须符合企业级生产环境标准。
视觉基准是 EMQX 中文网站：
https://www.emqx.com/zh （Dark模式）
重点提醒：不要发散！！！！

仅将 EMQX 作为以下内容的参考：
- 布局节奏  
- 导航交互  
- 字体层级  
- 间距  
- 卡片比例  
- 背景处理  
- 过渡时长  
- 响应式行为
请勿复制 EMQX 的商标、文字、源代码或专有资产。
---
# Responsibilities
在开始任何任务前：

1. 阅读当前 Task 文件。
2. 阅读相关设计及产品文档。
3. 阅读 `doc/engineering/HOME_PAGE_BASELINE.md` 与 `doc/engineering/HARNESS_ENGINEERING.md`。
4. 分析现有代码结构与可复用组件。
5. 制定实施方案。
6. 再开始编码。

完成任务后必须：

1. 自检代码。
2. 修复错误。
3. 完成测试。
4. 更新任务文档。
5. 提交 Git。
6. Push 到 GitHub。

---
# Development Rules
## Code
- 使用 TypeScript。
- 使用 Composition API。
- 使用 `<script setup>`。
- 保持组件职责单一。
- 优先复用已有组件。
- 禁止重复实现已有能力。
- 禁止修改无关代码。
- 禁止删除已有功能规避问题。
- 禁止提交调试代码。
- 禁止提交无用代码。
## Vue
推荐组件规模：

- Base Component
- Business Component
- Page Component

组件长度建议：

- 小于 300 行。

超过建议拆分。

## 组件规则
组件类别：
- `components/common`：通用UI组件  
- `components/layout`：全局布局  
- `components/navigation`：页眉和菜单  
- `components/home`：首页模块  
- `components/flow`：Vue流程图
章节命名：
- `HomeHero.vue`
- `HomeCustomerLogos.vue`
- `HomeProductSystem.vue`
- `HomeSolutions.vue`
- `HomeCases.vue`
- `HomeInsights.vue`
- `HomeCta.vue`
## 视觉规范
- 不要制作通用的SaaS模板。  
- 避免使用过多的渐变效果。  
- 不要在所有地方都使用玻璃拟态设计。  
- 不要随意添加发光效果。  
- 不要将每个组件都过度圆角化。  
- 保持克制的企业级科技风格。  
- 使用充足的留白和清晰的视觉层级。  
- 动画必须支持阅读和交互。

## Style

统一使用：

- SCSS
- Design Token
- CSS Variables
- Tailwind CSS v4 theme bridge
- `assets/scss/main.scss` 中的 `dt-*` 公共样式层
- `doc/engineering/ASSET_BOUNDARY.md` 中的运行时资产边界

禁止：

- Inline Style
- Magic Number
- 重复样式
- 在 `assets/` 或 `components/` 中提交 `@apply`。当前 Nuxt 构建链路不会处理 Vue scoped SCSS 中的 `@apply`，会导致无效 CSS 进入产物。
- 新增运行时代码直接引用 `doc/product/**/imgs`。产品文档图片必须先迁移到 `assets/images/**` 或 `public/images/**`。

公共视觉入口：

- 按钮：`components/common/BaseButton.vue` 或 `.dt-button`
- 标题：`components/common/SectionHeading.vue`
- Tab：`.dt-tab-list` + `.dt-tab`
- 平台能力卡片：`.dt-product-card`
- 生态卡片：`.dt-ecosystem-card`
- CTA 面板：`.dt-cta-panel`

除非页面需求明确允许偏离，否则后续页面必须遵循 `doc/engineering/HOME_PAGE_BASELINE.md`。



---
# Design Principles

整体风格：
- Professional
- Modern
- Enterprise
- Minimal

参考：
https://www.emqx.com/zh （Dark模式）

参考内容包括：

- 页面布局
- 留白
- 字体层级
- 动画节奏
- 导航交互
- Mega Menu
- 卡片设计

禁止复制：
- Logo
- 文案
- 图片
- SVG
- 商标
- 产品内容
- 源代码

---

# Component Principles

公共组件必须：
- 可复用
- 可配置
- 类型完整
- 文档清晰

禁止：
- 页面直接复制组件代码
- 大量 Props 冗余
- 强耦合

---

# Accessibility

必须支持：
- Keyboard
- Focus Visible
- Semantic HTML
- aria 属性

---

# Performance

优先：
- 懒加载
- Code Split
- Tree Shaking
- 图片优化
- 字体优化

避免：
- 重复渲染
- 无意义 Watch
- 大量计算属性嵌套

---

# Git Workflow

任务开始：

```bash
git pull
```

任务完成：
```bash
git status
git add .
git commit
git push

```

Commit Message：

```text
feat(TASK-003.2): implement desktop navigation
fix(TASK-003.3): resolve menu hover issue
refactor(TASK-002.1): optimize design tokens
docs(TASK-001): update project documentation
```

---

# Quality Gates

任务完成前必须全部通过：

```bash
pnpm dev  
pnpm lint  
pnpm typecheck  
pnpm test  
pnpm test:visual  
pnpm harness:engineering
pnpm build

```

任何失败不得结束任务。

---

# Task Workflow

执行流程：

```text
Read Task

    ↓

Read Documents

    ↓

Read Harness Engineering

    ↓

Analyze

    ↓

Implement

    ↓

Test

    ↓

Fix

    ↓

Git Commit

    ↓

Git Push

    ↓

Update Task
```

---

# Completion Criteria

一个任务满足以下条件方可结束：
- 功能完成
- 验收标准通过
- 所有测试通过
- 无控制台错误
- 文档更新完成
- Git Commit 完成
- Git Push 成功
- Task 文档更新完成

不得在未满足以上条件时标记任务完成。
