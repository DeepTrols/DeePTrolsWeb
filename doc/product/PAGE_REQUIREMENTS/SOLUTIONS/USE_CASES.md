# 解决方案：应用场景页面
> Version: 1.0
> Last Updated: 2026-09-01

## Scope
本文件约束“解决方案 > 应用场景”下全部页面。页面清单来自 `doc/product/NAVIGATION.md` 与 `doc/product/SITE_MAP.md`。

## Pages
| 页面 | 路由 |
|----|----|
| 智能制造 | `/solutions/manufacturing` |
| 智慧环保 | `/solutions/environment` |
| 智慧水利 | `/solutions/water` |
| 智慧能源 | `/solutions/energy` |
| 数据治理 | `/solutions/data-governance` |
| 企业AI应用 | `/solutions/enterprise-ai` |
| 智慧城市 | `/solutions/city` |
| 智慧医疗 | `/solutions/healthcare` |

## Structure
所有应用场景页面默认使用 `components/solution/SolutionPageTemplate.vue`。

默认区块顺序：

1. Hero
2. Hero Stats
3. 核心价值
4. 落地路径
5. 方案架构
6. 核心能力
7. 服务交付
8. 相关产品与资源
9. CTA

## Implementation Notes
- 页面路由由 `pages/solutions/[slug].vue` 统一承载。
- 页面数据集中在 `data/solutions/use-cases.ts`。
- 首屏右侧视觉统一使用 `components/solution/SolutionScenarioVisual.vue`，并通过 `SolutionPageTemplate` 的 `hero-visual` slot 注入。
- 不为单个应用场景页面新增私有按钮、卡片、标题、CTA、Header 或 Footer 样式。
- 常规 section、card、icon、hover、高度自适应、CTA 均继承 `doc/engineering/SOLUTION_PAGE_TEMPLATE.md` 与 `doc/engineering/COMMON_SECTION_COMPONENTS.md`。
- 运行时代码不得直接引用 `doc/product/**/imgs`。

## Content Rules
文案遵循 `doc/product/CONTENT_GUIDE.md`：

1. 行业/场景挑战
2. 解决思路
3. 核心能力
4. 价值体现
5. 行动引导

CTA 默认使用“咨询合作 / 申请试用”。
