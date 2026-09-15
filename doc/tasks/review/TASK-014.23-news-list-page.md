# TASK-014.23：新闻动态列表页
---
* TaskName：新闻动态列表页
* TaskDescription：1:1 复刻 DeepCtrls 参考站新闻动态列表页（`https://www.deepctrls.com/deepctrls_com/news?category=company` 的 main-content，mc-* 体系），路由 `/news` 承接 footer「新闻动态」入口；头条轮播 + 分类 tab（?category= 同步）+ 5 条/页行列表分页。
* TaskCreator：Olly
* TaskCreationTime：2026-09-14
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.23 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Claude    |

---
## 任务目标
严格复刻参考站新闻列表页三段结构（mc-hero / mc-tabs / mc-list）：不新建样式、不写行内 style，纯 Tailwind CSS v4；参考站 1920px 固定画布（fp-canvas 缩放）按既有先例（案例页）转换为 container 响应式布局，1920 下像素 1:1；列表页底部无 CTA（与参考 main 结构一致）。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- 参考页：`https://www.deepctrls.com/deepctrls_com/news?category=company`（mc-hero / mc-tabs / mc-list 排版规范，CSS 已抓取提取）

---
## 实现内容
1. 新建 `data/news.ts`：`NewsCategory`（company/media/insight）、`NewsItem`（id/title/summary/coverImage/category/publishedAt）、`newsCategoryTabs`（公司动态/新闻报道/技术洞见）、**40 条真实列表数据**（标题/摘要/日期/分类取自参考站 `__NUXT_DATA__` payload，日期换算为东八区；封面统一 `/images/common/content-placeholder.svg` 占位，注释标注「模拟样例」）、`formatNewsDate`（YYYY/MM/DD）/`formatNewsDateShort`（YYYY-M-D 不补零）、`getNewsByCategory`（日期降序）、`getNewsCategoryLabel`。
2. 新建 `components/news/NewsHero.vue`：复刻 mc-hero——650px 深色横幅（`bg-[#111318]` + 自制 `public/images/news/news-hero-bg.svg` 深色渐变网格背景，不下载外部素材）；轮播当前分类最新 3 条头条（6s 自动 + 分段点击，切分类重置）；内容区使用项目统一 `.container`，与 HOME、产品页、解决方案页的当前全站宽度保持一致；左侧日期 16/31 `#ffffffb8`、标题移动端 26/38、桌面 30/50 白色 ls-1px 2 行截断（`!text-white` 避免全局链接色覆盖，hover `#9db2ff`，链接详情）、摘要 18/31 `#ffffffc7` 2 行截断；右侧媒体图保持 `712/361` 比例（`bg-[#d9d9d9]` cover，hover scale 1.03/0.45s）；底部分段条 647.5×1px `#ffffff38` + 等宽分段按钮（flex-1 实现等分，不用参考站 inline left/width），激活分段白色 2px 线；空态 `#68758c`；移动端堆叠。
3. 新建 `components/news/NewsCategoryTabs.vue`：复刻 mc-tabs——74px 白底条 + shadow `0 12px 20px #f1f5fa`，三等分 tab 18px 默认 `#969696`、hover/激活 `text-primary`，激活下划条 263×4 底部居中；切换 emit 由页面同步 `?category=` query。
4. 新建 `components/news/NewsListSection.vue`：复刻 mc-list——列表宽度同样使用项目统一 `.container`；行 pitch 310（文本列 855fr + 缩略图 484fr，gap 61px，文本列比缩略图低 11px）；标题 22/40 `#2d2d2d` ls-1px 2 行截断并使用 `!text-[#2d2d2d]` 避免全局链接色覆盖，hover 主色；摘要 16/26 `#555` 2 行截断；日期 16/31 `mt-6px`；缩略图保持 `484/246` 比例、rounded 6px、shadow `0 4px 16px #1d22341a`，hover shadow 加深 + img scale 1.04；行间分隔线 `#e7eaef` 1px（64px 空隙正中，末行无，pb-8/mb-8 实现）；首行 top 138、区块底余 91px；5 条/页 + PagerArrows 右对齐（距末行缩略图底 80px）；空态 `#68758c` 16px 居中；移动端单列堆叠。
5. 新建共享组件 `components/common/PagerArrows.vue`：49×49 双箭头按钮组（lucide ArrowRight，prev rotate-180，gap 17px，disabled opacity .45，hover 变主色替代参考站 hover 换图）；props `prevDisabled/nextDisabled/prevLabel/nextLabel`，emits `prev/next`；供列表分页与详情页相关动态组翻页（TASK-014.24）复用。
6. 新建 `pages/news/index.vue`：site-shell > SiteHeader > main.news-page > NewsHero > NewsCategoryTabs > NewsListSection > SiteFooter（列表页无 CTA，同参考）；`?category=` 初始化校验沿用 `pages/cases/index.vue` 先例（非法值回落 company），并 watch query 变化、tab 切换 `router.replace` 同步。
7. 新增运行时资产 `public/images/news/news-hero-bg.svg`（1920×650 自制深色渐变+网格 hero 背景）。
8. 补充 `tests/news-content.spec.ts`（40 条数据契约：分类枚举、日期降序 helper、tab 三项、封面占位、日期格式化）、`tests/visual/site/news.contract.ts` 与 `scripts/harness/checks/news.mjs` 并完成四处注册。
9. 文档同步：`doc/product/SITE_MAP.md` 登记 `/news`；`doc/engineering/COMMON_SECTION_COMPONENTS.md` 新增 PagerArrows 共享组件章节；`doc/engineering/ASSET_BOUNDARY.md` 登记 `public/images/news/` bucket。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `data/news.ts` | 新建：40 条真实列表数据 + 分类 tab + 日期格式化/分类查询 helper |
| `pages/news/index.vue` | 新建：新闻列表页（?category= 同步） |
| `components/news/NewsHero.vue` | 新建：头条轮播 hero（复刻 mc-hero） |
| `components/news/NewsCategoryTabs.vue` | 新建：分类 tab 条（复刻 mc-tabs） |
| `components/news/NewsListSection.vue` | 新建：行列表 + 分页（复刻 mc-list） |
| `components/common/PagerArrows.vue` | 新建：共享 49×49 翻页按钮组 |
| `public/images/news/news-hero-bg.svg` | 新建：自制 hero 深色背景 |
| `tests/news-content.spec.ts` | 新建：列表数据契约 |
| `tests/visual/site/news.contract.ts` | 新建：列表页视觉契约 |
| `tests/visual.spec.ts` | 注册视觉契约 |
| `scripts/harness/checks/news.mjs` | 新建：Harness 镜像锁 |
| `scripts/harness-check.mjs` | 注册 Harness 检查 |
| `scripts/harness/sources.mjs` | 登记 Harness 源文件 |
| `scripts/harness/required-files.mjs` | 登记必需文件 |
| `doc/product/SITE_MAP.md` | 登记 /news 路由 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 新增 PagerArrows 章节 |
| `doc/engineering/ASSET_BOUNDARY.md` | 登记 public/images/news/ bucket |
| `doc/tasks/review/TASK-014.23-news-list-page.md` | 同步新闻页统一 container、链接颜色覆盖与构建验证结果 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | dev |
| Commit Message | feat(TASK-014.23): add news list page |
| Commit Hash    | 待提交后生成 |

## 完成说明
- `data/footer.ts` 已指向 `/news`（新闻动态入口），本任务未改动，仅验证。
- 参考站 1920 固定画布的 inline left/width 绝对定位全部转换为 container + grid/flex + Tailwind 任意值类；分段条等宽用 `flex-1` 实现。
- 2026-09-15 修复新闻页可视差异：Hero、Tabs 与列表统一改回项目 `.container`，确保与当前其他页面的全站宽度一致；Hero 标题和列表标题使用 important Tailwind utility 保持白色/深色标题不被全局 `a { color: inherit }` 覆盖；右侧头图与列表缩略图保留参考比例。
- 40 条数据全部为参考站真实标题/摘要/日期/分类；封面为占位图（模拟样例，正式素材待产品提供后整体替换）。
- 全部组件无 `<style>` 块、无行内 style；门禁 lint/typecheck/test/test:visual/harness 全绿。
