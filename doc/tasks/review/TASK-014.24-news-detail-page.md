# TASK-014.24：新闻详情页
---
* TaskName：新闻详情页
* TaskDescription：1:1 复刻 DeepCtrls 参考站新闻详情页（`https://www.deepctrls.com/deepctrls_com/news/29`，ma-* 体系），路由 `/news/[id]`；复用 ArticleBreadcrumb / ArticleContent（新增 news variant）/ CtaSection / PagerArrows，右侧「相关动态」3 张/组翻页；未知 id 404。
* TaskCreator：Olly
* TaskCreationTime：2026-09-14
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.24 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Claude    |

---
## 任务目标
严格复刻参考站新闻详情页（ma-* 体系）：白底 + `linear-gradient(180deg,#eff5fe,transparent)`（100%×1134px）页面背景、面包屑、pill 分类标签、48/57 w400 标题、不补零发布时间、`#d9dde4` 分隔线、正文双栏 grid（`minmax(0,1fr) 376px`，gap 124），右侧「相关动态」aside；纯 Tailwind CSS v4，无 `<style>` 块、无行内 style；能复用的一律复用（ArticleBreadcrumb 零改动、ArticleContent 增加 variant、CtaSection、PagerArrows）；案例详情（case variant）既有锁定字面量零改动。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/tasks/review/TASK-014.22-case-detail-page.md`（文章模板复用先例）
- `doc/tasks/review/TASK-014.23-news-list-page.md`（列表数据 / PagerArrows）
- 参考页：`https://www.deepctrls.com/deepctrls_com/news/29`（ma-* 排版规范，CSS 已抓取提取）

---
## 实现内容
1. 新建 `data/news-details.ts`：`NewsDetail {id, blocks: ArticleBlock[]}`、`getNewsDetailById()`；**id 29 = 参考页真实正文 1:1 转 blocks**（h2「算电协同进入新基建阶段」+ 12 段落 + 2 个 image block，图用 `/images/common/content-placeholder.svg` 占位）；其余 39 条按真实标题/摘要生成 12-block 模拟正文（按分类区分语境），注释标注「模拟样例」。
2. 新建 `pages/news/[id].vue`：渐变背景根节点 > SiteHeader > ArticleBreadcrumb（复用，新闻动态 `/news` > 分类 `/news?category=<key>` > 文章正文）> container 双栏 grid（`xl:grid-cols-[minmax(0,1fr)_376px] xl:gap-[124px] pt-12 pb-24`，移动端单列 gap-18、两栏 max-w-[900px] 居中）> article（pill 104×30 圆角 44 `bg-primary/8`、h1 48/57 w400 `#1d2234`（移动端 30/44）、`发布时间: {{ formatNewsDateShort(...) }}` 不补零、`mt-[34px]` 1px `#d9dde4` 分隔线、`mt-10 md:mt-[66px]` 正文）> `<ArticleContent :blocks="detail.blocks" variant="news" />` > NewsRelatedAside（`xl:pt-[261px]`）> CtaSection > SiteFooter；未知 id `createError({ statusCode: 404, fatal: true })`（沿用 cases/[slug] 先例）。
3. 改造 `components/common/article/ArticleContent.vue`：新增 `variant?: 'case' | 'news'` prop（默认 'case'）。script 内按 variant 取类串映射：**case 分支保留全部既有字面量原样**（case-detail 契约/harness 锁零改动仍通过）；news 分支差异 4 处——正文色 `#555`、p/list 下间距 `mb-[30px]`、hr `bg-[#d9dde4]`、移动端 `max-md:text-left max-md:leading-7`。
4. 新建 `components/news/NewsRelatedAside.vue`：「相关动态」标题 38/42 `#1d2234` w400（移动端 28/34）；同分类排除当前文章，3 张/组（GROUP_SIZE=3，首张 `mt-[43px]` 其后 `mt-[42px]`）+ PagerArrows 组翻页（`mt-10 flex justify-start xl:mt-20 xl:justify-end`）；空态文案。
5. 新建 `components/news/NewsRelatedCard.vue`：复刻 ma-relcard——213px 媒体（`bg-[#8a8a8a]` cover，hover scale 1.04/0.45s）、标题 `mt-[22px]` 16/25 w300 2 行截断 h-50 justify（hover 主色）、日期 `mt-3` 15/26 `#555` w300（formatNewsDateShort 不补零）。
6. 改造 `components/navigation/SiteHeader.vue`：新增 `isNewsDetailRoute`（`route.path.startsWith('/news/')`）并入 `isDarkHeaderRoute`（详情页顶部为浅色渐变+灰面包屑需黑色前景；`/news` 列表页顶部为深色 hero，保持白色前景不动）。
7. 补充 `tests/news-detail-content.spec.ts`（40 条详情与列表 id 一一对应、blocks 结构合法、29 号真实标题/首段/双图/关键词、未知 id undefined）、`tests/visual/site/news-detail.contract.ts` 与 `scripts/harness/checks/news-detail.mjs` 并完成四处注册；同步 `tests/visual/site/home/header.contract.ts` 与 `scripts/harness/checks/home-layout.mjs` 的 isNewsDetailRoute 锁。
8. 文档同步：`doc/engineering/COMMON_SECTION_COMPONENTS.md` 补充 ArticleContent variant 说明与新闻详情组件。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [ ] Build 成功（本轮跳过，保护运行中的 dev 实例；改动为纯新增 + ArticleContent/SiteHeader 受契约锁保护的小改，风险低）
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `data/news-details.ts` | 新建：40 条详情正文（id 29 真实内容，其余模拟样例） |
| `pages/news/[id].vue` | 新建：新闻详情页（404 / 面包屑 / 双栏 grid / CTA） |
| `components/news/NewsRelatedAside.vue` | 新建：相关动态 aside（3 张/组翻页） |
| `components/news/NewsRelatedCard.vue` | 新建：相关动态卡片（复刻 ma-relcard） |
| `components/common/article/ArticleContent.vue` | 改造：新增 `variant?: 'case' \| 'news'`（case 字面量零改动） |
| `components/navigation/SiteHeader.vue` | 改造：isNewsDetailRoute 并入 isDarkHeaderRoute |
| `pages/news/[id].vue` | 面包屑第一项文案调整为「新闻动态」 |
| `tests/news-detail-content.spec.ts` | 新建：详情数据契约 |
| `tests/visual/site/news-detail.contract.ts` | 新建：详情页视觉契约 |
| `tests/visual/site/home/header.contract.ts` | 同步 header 锁（isNewsDetailRoute + 多行 isDarkHeaderRoute） |
| `tests/visual.spec.ts` | 注册视觉契约 |
| `scripts/harness/checks/news-detail.mjs` | 新建：Harness 镜像锁 |
| `scripts/harness/checks/home-layout.mjs` | 同步 header 锁 |
| `scripts/harness-check.mjs` | 注册 Harness 检查 |
| `scripts/harness/sources.mjs` | 登记 Harness 源文件 |
| `scripts/harness/required-files.mjs` | 登记必需文件 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | ArticleContent variant 说明 + 新闻详情组件 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | dev |
| Commit Message | feat(TASK-014.24): add news detail page reusing article template |
| Commit Hash    | 待提交后生成 |

## 完成说明
- 复用清单落地：ArticleBreadcrumb（零改动）、ArticleContent（+variant，case 分支既有锁定字面量原样保留）、CtaSection、SiteHeader/SiteFooter、PagerArrows（TASK-014.23 共享组件）、createError 404 先例。
- 仅 id 29 为参考站真实正文；其余 39 条为真实标题/摘要/日期 + 生成正文，全部标注「模拟样例」；正文配图统一 content-placeholder.svg 占位。
- 全部组件无 `<style>` 块、无行内 style；门禁 lint/typecheck/test/test:visual/harness 全绿。
