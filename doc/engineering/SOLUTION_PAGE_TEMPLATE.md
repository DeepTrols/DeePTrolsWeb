# Solution Page Template
> Version: 1.0
> Last Updated: 2026-09-01

## Purpose
解决方案页面模板用于后续 `应用场景 / 行业 / 技术方向 / FDE` 页面。模板只组合现有公共组件和 HOME 基准样式，不新增解决方案页专属按钮、Tab、卡片、标题或 CTA 样式。

本模板的目标不是固定所有页面内容，而是固定页面骨架与视觉来源：常规区块使用公共组件，页面差异通过数据与少量 slot 承载。

## Component
模板组件：

```text
components/solution/SolutionPageTemplate.vue
```

类型定义：

```text
types/solution-template.ts
```

页面使用方式：

```vue
<script setup lang="ts">
import SolutionPageTemplate from '~/components/solution/SolutionPageTemplate.vue'
import { solutionContent } from '~/data/solutions/example'
</script>

<template>
  <SolutionPageTemplate :content="solutionContent">
    <template #hero-visual>
      <!-- 页面专属 hero 视觉，必须使用 assets/public 运行时资产 -->
    </template>

    <template #architecture-visual>
      <!-- 页面专属流程图或架构图 -->
    </template>
  </SolutionPageTemplate>
</template>
```

## Default Structure
模板默认顺序必须保持：

1. `SiteHeader`
2. `PageHero`
3. `HeroStatsStrip`（可选）
4. `ProductFeatureGridSection` 作为业务价值 / 核心收益（可选）
5. `AlternatingTimelineSection` 作为挑战到方案 / 落地路径（可选）
6. `ProductArchitectureSection` 作为方案架构（可选）
7. `ProductFeatureGridSection` 作为核心能力（可选）
8. `ServiceShowcaseSection` 作为服务交付 / 场景展开（可选）
9. `EngineLinksSection` 作为相关方案 / 资源推荐（可选）
10. `CtaSection`（可选）
11. `SiteFooter`

## Existing Component Mapping
| 页面区域 | 必须优先使用 |
|----|----|
| Header / Footer | `SiteHeader` / `SiteFooter` |
| Hero | `PageHero` |
| Hero 下方数字条 | `HeroStatsStrip` |
| 业务价值、核心收益、核心能力 | `ProductFeatureGridSection` |
| 挑战、落地路径、方案步骤 | `AlternatingTimelineSection` |
| 方案架构 / 流程占位 | `ProductArchitectureSection` |
| 交付服务或图文说明 | `ServiceShowcaseSection` |
| 相关方案 / 资源入口 | `EngineLinksSection` |
| 底部行动引导 | `CtaSection` |

## Data Contract
数据结构统一由 `SolutionPageTemplateContent` 定义，页面数据建议放在 `data/solutions/*.ts`。

| 字段 | 说明 |
|----|----|
| `seo` | 页面 title、description 与 Open Graph 文案 |
| `hero` | 首屏 badge、标题、描述、CTA、背景视频与视觉布局 |
| `heroStats` | Hero 下方数字条，可选 |
| `heroStatsColumns` | 数字条列数，仅允许 `3` 或 `4` |
| `value` | 业务价值 / 核心收益卡片网格，可选 |
| `approach` | 业务挑战、解决思路或落地步骤，可选 |
| `architecture` | 方案架构区，可选；真实流程图通过 `architecture-visual` slot 注入 |
| `capabilities` | 核心能力卡片网格，可选 |
| `showcase` | 服务交付、场景展开或图文说明，可选 |
| `related` | 相关方案 / 资源入口，可选 |
| `cta` | 底部行动引导，可选 |

Hero 允许透传 `align`、`visualSize`、`flushBottom`、`flushVisualEnd`，但默认保持 `PageHero` 的产品页基准。Feature Grid 允许透传 `columns`、`nowrapSubtitle`、`iconBoxSize`、`iconSize`、`iconBordered`、`iconFilled`，不得在页面里重写 card / icon 外框样式。

## Slots
模板仅开放以下扩展点：

| Slot | 用途 |
|----|----|
| `hero-visual` | Hero 右侧视觉、动画或图片 |
| `hero-after-actions` | Hero CTA 下方补充内容 |
| `after-hero` | Hero 后、主内容前的自定义区块 |
| `after-value` | 业务价值后补充内容 |
| `after-approach` | 路径/步骤后补充内容 |
| `architecture-visual` | 架构区真实流程图或方案图 |
| `architecture-after` | 架构区下方补充卡片或说明 |
| `after-architecture` | 架构区后补充内容 |
| `after-capabilities` | 核心能力后补充内容 |
| `after-showcase` | 服务展示后补充内容 |
| `before-cta` | CTA 前补充内容 |

## Style Rules
- 不在具体解决方案页面重新定义 Header、Footer、按钮、卡片、Tab、Section Heading、CTA 样式。
- 常规区块间距遵循 `pb-32 lg:pb-44`。
- Section 标题由 `SectionHeader` 或上表公共组件内部承载。
- 卡片圆角、hover、icon 外框必须走 `dt-card`、`dt-product-card`、`dt-icon-box` 等公共层。
- 页面专属视觉可以使用 slot，但运行时资产只能来自 `assets/**` 或 `public/**`。
- 不得在运行时代码中引用 `doc/product/**/imgs`。
- 不得在 Vue scoped SCSS 或 assets 中使用 `@apply`。
- 不得新增 inline style。
- `SolutionPageTemplate.vue` 本体不得新增 `<style>`；确需新增视觉能力时优先扩展对应公共组件。
- 页面专属组件可以承载流程图、地图、动画等视觉内容，但外层容器、标题、CTA、普通卡片必须继续由模板和公共组件负责。

## Content Rules
解决方案页面文案遵循 `doc/product/CONTENT_GUIDE.md`：

1. 业务挑战
2. 解决思路
3. 能力介绍
4. 价值体现
5. 行动引导

除非页面需求明确允许偏离，CTA 默认使用“咨询合作 / 申请试用”。

## Current Implementations
| 分类 | 页面说明 | 数据源 | 路由 |
|----|----|----|----|
| 应用场景 | 8 个应用场景页面 | `data/solutions/use-cases.ts` | `pages/solutions/[slug].vue` |
