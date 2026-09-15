# TASK-014.22：行业案例详情页与文章内容模版
---
* TaskName：行业案例详情页与文章内容模版
* TaskDescription：根据 `doc/product/PAGE_REQUIREMENTS/CASE/Case_Details/CaseDetails.md` 完成行业案例详情页（动态路由 `/cases/<slug>`），面包屑与正文排版复刻 DeepCtrls 案例详情参考页；内容以结构化 block 模版固定排版，供后续后台填充内容并复用于新闻等详情页。
* TaskCreator：Olly
* TaskCreationTime：2026-09-14
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.22 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Claude    |

---
## 任务目标
严格按照 `CaseDetails.md` 完成案例详情页：不新建样式、不写行内 style，纯 Tailwind CSS v4；正文排版固定为可复用的内容模版（结构化 block 数组 + 固定排版组件），后续新闻等详情页与后台内容填充直接复用。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/NAVIGATION.md`
- `doc/product/PAGE_REQUIREMENTS/CASE/case.md`
- `doc/product/PAGE_REQUIREMENTS/CASE/Case_Details/CaseDetails.md`
- 参考页：`https://www.deepctrls.com/deepctrls_com/cases/60`（cd-crumb / cd-hero / cd-grid / cd-content / cd-aside / cd-rows 排版规范）

---
## 实现内容
1. 新建共享类型 `types/article.ts`：`ArticleBlock` 联合类型（heading[2|3|4]/paragraph/list[ordered]/quote/image[caption]/divider）+ `ArticleBreadcrumbItem` + `ArticleLinkRowItem`。内容模版以结构化 block 描述，排版固定在组件内，后台按同一 schema 填充即可（满足需求「生成内容模版，供后续后台添加内容使用」）。
2. 新建 `components/common/article/ArticleBreadcrumb.vue`：复刻参考页 cd-crumb——灰底 `bg-[#eff0f3]`、`h-[58px]`（参考页 120px 含 62px 固定头部补偿，本站头部为文档流内故取内容高度）、14px/21px，首项链接 `text-primary`，后续 `text-[#7e7e7e]`，分隔符为旋转 45° 的 1.4px 双边方块（`rotate-45 border-r-[1.4px] border-t-[1.4px] border-[#a6a6a6]` + `scale-[0.62]`）。
3. 新建 `components/common/article/ArticleContent.vue`：固定复刻 cd-content 排版规范——正文 `text-base leading-[30px] text-justify text-[#1d2234]`；h2 26/38 `mt-14 mb-5`、h3 20/32 `mt-10 mb-3.5`、h4 17/28 `mt-8 mb-2.5`（均 `font-medium text-left`）；段落 `mb-12`；列表 `pl-[26px] marker:text-primary`、`li mb-2`；引用 `border-l-[3px] border-l-primary pl-6 text-[#3f4d64] my-9`；分隔线 `my-12 h-px bg-[#e2e2e2]`；图片 `figure my-10` + `mx-auto block max-w-full` + 可选 figcaption。
4. 新建 `components/common/article/ArticleLinkRows.vue`：复刻 cd-rows 相关列表——标题 22/30 `font-medium text-black`（移动端 `text-xl`），行高 `h-[55px]`、底部 `border-[#e2e2e2]` 分隔、4px 主色圆点、`truncate text-[#555]` 悬停变主色、右侧 18px 箭头（lucide ArrowRight）；根节点遵循全站 section 间距规则 `flow-root pb-32 lg:pb-44`。
5. 新建 `pages/cases/[slug].vue`：SiteHeader → 面包屑（行业案例 > 分类 > 标题）→ 1920/363 通栏封面（占位图）→ container 双栏网格（`xl:grid-cols-[minmax(0,1025fr)_309fr] xl:gap-[66px]`，≤xl 单列 `gap-14`；pt/pb 近似参考页 113px 节奏）→ article 渲染 ArticleContent → aside「相关产品」（名称 16px `#171717` hover 主色 + 描述 14px `#415169` `max-w-[219px]`）→「相关客户案例」ArticleLinkRows（当前案例除外）→ 复用 `CtaSection` 默认横幅 → SiteFooter；未知 slug 按 `solutions/[slug].vue` 先例 `createError` 404。参考页 hero 上的悬浮 CTA 与相关列表翻页器为 DeepCtrls 专属交互，不在本页复刻（底部由 CtaSection 承接转化）。
6. 列表页支持 `?category=<solutionKey>` 初始过滤（校验合法后初始化 `activeCaseFilter`），面包屑分类项链接 `/cases?category=xxx` 可直达对应 tab。因新增 `/cases/[slug]` 子路由，列表页由 `pages/cases.vue` 迁移为 `pages/cases/index.vue`（否则 Nuxt 将 `[slug]` 视为嵌套子页并要求父页渲染 `<NuxtPage />`，警告 E4016）。
7. 新建 `data/case-details.ts`：`CaseDetail` 接口（slug/title/categoryKey/heroImage/blocks/relatedProducts）+ `getCaseDetailBySlug`；生成 7 条模拟详情（与 `caseResources` slug 一一对应，每条约 12-16 个 block：项目背景/建设内容/应用成效/实践价值，含列表、引用、占位图）；相关产品取自 `data/navigation.ts` 真实产品名与描述（数曜 DGP/DLP/DDP/DMS、探曜 AI 物联、Device Agent）；代码注释标明「模拟样例，待产品提供后整体替换」。
8. 新增占位图资产：`public/images/common/detail-hero-placeholder.svg`（1920×363 封面占位）、`public/images/common/content-placeholder.svg`（复用 FDE 通用图表占位图拷贝），页面不直接引用需求目录。
9. 补充 `tests/case-detail-content.spec.ts`、`tests/visual/site/case-detail.contract.ts` 与 `scripts/harness/checks/case-detail.mjs` 并完成四处注册。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [ ] Build 成功（本轮跳过，保护运行中的 dev 实例；改动为纯新增数据/组件，风险低）
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `doc/product/PAGE_REQUIREMENTS/CASE/Case_Details/CaseDetails.md` | 详情页需求文档（已存在，登记入 Harness） |
| `types/article.ts` | 文章内容模版共享类型（block schema，供案例/新闻复用） |
| `components/common/article/ArticleBreadcrumb.vue` | 面包屑（复刻 cd-crumb） |
| `components/common/article/ArticleContent.vue` | 正文排版模版（复刻 cd-content） |
| `components/common/article/ArticleLinkRows.vue` | 相关链接行列表（复刻 cd-rows） |
| `pages/cases/[slug].vue` | 案例详情动态路由页 |
| `pages/cases/index.vue` | 列表页迁移路径（原 `pages/cases.vue`）+ 新增 `?category=` 初始过滤 |
| `data/case-details.ts` | 7 条模拟案例详情内容 + slug 查询 |
| `public/images/common/detail-hero-placeholder.svg` | 封面占位图（1920×363） |
| `public/images/common/content-placeholder.svg` | 正文配图占位图 |
| `tests/case-detail-content.spec.ts` | 详情内容契约 |
| `tests/visual/site/case-detail.contract.ts` | 详情视觉契约 |
| `tests/visual.spec.ts` | 注册视觉契约 |
| `scripts/harness/checks/case-detail.mjs` | 详情 Harness Engineering 检查 |
| `scripts/harness-check.mjs` | 注册 Harness 检查 |
| `scripts/harness/sources.mjs` | 登记 Harness 源文件 |
| `scripts/harness/required-files.mjs` | 登记必需文件 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 新增文章内容模版组件章节 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | dev |
| Commit Message | feat(TASK-014.22): add case detail page with reusable article template |
| Commit Hash    | 待提交后生成 |

## 完成说明
- 面包屑：行业案例（`/cases`）> 分类（`/cases?category=<key>`，分类标签由 `reportFilterTabs` 派生）> 案例标题，样式 1:1 对齐参考页 cd-crumb。
- 正文模版：`ArticleBlock` 结构化 schema + `ArticleContent` 固定排版，后台/新闻页复用同一模版，仅换数据源。
- 布局：1920/363 封面 + 1025fr/309fr 双栏（≤xl 单列）+ 相关产品侧栏 + 相关客户案例行列表 + 公共 CtaSection 横幅。
- 内容：7 条模拟详情全部可从 `/cases` 卡片点击进入，未知 slug 返回 404。
- 全部组件无 `<style>` 块、无行内 style；门禁 lint/typecheck/test/test:visual/harness 全绿。

## Review 修改记录
### 2026-09-14 修复面包屑被固定 Header 遮挡
- 现象：`.site-header` 为 `position: fixed`（62px），详情页首个文档流元素 `ArticleBreadcrumb` 渲染在 Header 底下（「面包屑跑到 header 里面」）。
- 修复：`ArticleBreadcrumb.vue` 根节点追加 `pt-[var(--dt-header-height)]`——灰底 `bg-[#eff0f3]` 延伸至 Header 后方，复刻参考页 cd-crumb 120px（62px 固定头部补偿 + 58px 内容行）的既有做法；`SiteHeader.vue` 新增 `isCaseDetailRoute`（`route.path.startsWith('/cases/')`）并入 `isDarkHeaderRoute`，使 Header 在浅灰面包屑上渲染黑色 logo/导航文字（`/cases` 列表页为深色视频 Hero，不受影响仍用白色前景）。
- 同步锁：`tests/visual/site/case-detail.contract.ts` / `scripts/harness/checks/case-detail.mjs` 增加 `pt-[var(--dt-header-height)]` 断言；`tests/visual/site/home/header.contract.ts` / `scripts/harness/checks/home-layout.mjs` 增加 `isCaseDetailRoute` 断言。门禁 lint/typecheck/test/test:visual/harness 全绿，SSR 验证 `site-header is-dark-header is-at-top` 与面包屑偏移类均已渲染。

### 2026-09-14 正文首个标题与 aside「相关产品」顶对齐
- 现象：article 首块「项目背景」h2 携带 `mt-14`（56px），比无顶部外边距的 aside「相关产品」标题低 56px。
- 修复：`ArticleContent.vue` 三个 heading 变体类串前置 `first:mt-0`——正文首个块为 heading 时去除顶部外边距（标准 first-child 排版规则），后续 heading 间距节奏不变。
- 同步锁：`case-detail.contract.ts` / `case-detail.mjs` heading 类串断言更新；`COMMON_SECTION_COMPONENTS.md` cd-content 规范补充 `first:mt-0` 与面包屑 Header 补偿说明。
