# TASK-001.1：首页首版工程化实现
---
* TaskName：首页首版工程化实现
* TaskDescription：基于产品文档与首页需求，搭建 Nuxt 4 官网工程并实现 DeepTrols 首页首版。
* TaskCreator：Codex
* TaskCreationTime：2026-07-29
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-001.1 |
| Epic | EPIC-001 |
| 状态   | In Progress |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
完成 DeepTrols 官网首页首版，包括工程基础、首页模块、导航、Footer、响应式布局、SEO 基础与质量检查脚本。

---
## 前置文档
- `AGENTS.md`
- `doc/product/PRODUCT_VISION.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/NAVIGATION.md`
- `doc/product/SITE_MAP.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`

---
## 实现内容
1. 搭建 Nuxt 4 + Vue 3 + TypeScript + SCSS + Tailwind CSS v4 项目骨架。
2. 实现桌面与移动端导航、Mega Menu 与基础可访问交互。
3. 实现首页 Hero、业务方向、产品体系、解决方案、生态服务、客户故事、资讯、CTA 与 Footer。
4. 使用结构化内容数据驱动页面展示，便于后续维护。
5. 增加 lint、typecheck、unit test、visual contract test 与 build 脚本。
6. 按 `HOME.md` 与 `NAVIGATION.md` 重新校准 Header、主导航顺序、Mega Menu 结构、全局容器宽度与字体层级。
7. 产品 Mega Menu 调整为 `DATA / KNOWLEDGE BASE + AI IOT / AI SECURITY` 三列；解决方案调整为三列列表 + 右侧 `FDE` 卡片；服务调整为五个紧凑服务入口。
8. 参考 EMQX 中文站的暗色企业官网节奏，收敛 Header 高度、菜单停留交互、卡片圆角、过渡时长与页面宽度，不复制其品牌、文案、源码或资产。
9. 导航 DOM 按 EMQX 结构校准为 `div style="position:relative;" > ul > li > button`，主导航按钮内部不渲染 SVG；修复 hover 后 click 误关闭 Mega Menu 的问题。
10. 全局主色调切换为 EMQX 中文站深色紫蓝体系，移除首页核心区域旧绿色与白底 `section--light` 表现。
11. 初版 Hero 曾使用 TresJS + Three.js 将 `public/花瓣素材_+暖蓝光泄漏背景可循环_465316undefined (1) 2.mp4` 渲染到 950×600 masked canvas 背景；后续按验收意见移除 Hero canvas，改为外层原生 video 背景。
12. 首页客户 Logo 改为横向 marquee 滚动；三大业务方向改为 HOME.md 要求的左图右文走马灯大卡；产品体系、解决方案、生态、客户故事、洞察、CTA 与 Footer 按 HOME.md 标题层级和深色节奏重新校准。
13. 将 HOME.md 指定的解决方案 PNG 素材复制到 `public/images/home/solutions/` 并更新首页数据引用。
14. 按 EMQX case-study spotlight 结构再次收紧区域一：去掉额外标题块，桌面左侧图片区固定 40%、右侧内容区 60%，使用 EMQX 的 `#181524 -> #271e35` spotlight 渐变、`rounded-lg` 圆角、300px 最小高度、ICON、完整标题/描述与 `阅读详情` 按钮；移动端隐藏图片区。
15. 字体与字号按 EMQX Tailwind 节奏调整：全局容器回到 80rem，Hero 标题为 36px -> 60px / 1.1，通用 section 标题为 36px -> 48px / 1.2，eyebrow 为 16px semibold。
16. 减弱 banner 暗影遮挡：Hero wash 曾从重遮罩改为 0.04 -> 0.16 -> 0.58 的轻覆盖；后续按验收意见移除 Hero 内部 wash，由外层视频背景遮罩统一负责顶部与底部渐变。
17. 按 EMQX 中文站暗色体系再次统一全局色彩：以当前源码最终 `.dark { --ui-bg:#151515 }` 作为页面背景，`#181524 / #271e35` 作为 spotlight 与卡片层级，移除全局 shell 与核心 section 的杂色径向光斑和浅色 surface token。
18. 区域一走马灯改为完整 spotlight 卡片轮播，保持左图 40% + 右内容 60% 的复刻结构。
19. 按 EMQX 中文站源码节奏重新校准全局容器：Header 固定使用 `80rem` 上限，普通 `.container` 按 Tailwind 默认断点在 1440px 视口为 `1280px`、1920px 视口为 `1536px`。
20. 按 EMQX 中文站 Header 与 Hero 结构校准：Header 高度为 `72px` 并用负 margin 覆盖 Hero；Hero 内容使用 `pt-32`，标题 `36px -> 48px -> 60px`，按钮 `128px × 48px / 6px` 圆角，客户 Logo 区域使用 `pt-22`、`4rem` 间隔、`40s` 横向滚动。
21. 重新读取当前 EMQX 原始 HTML 与 CSS chunk：确认 `entry.B21SMESq.css` 最终覆盖 `:root { --ui-radius:.5rem; --ui-header-height:72px }`、`.dark { --ui-bg:#151515 }`，并据此更新本地 token、Hero fallback、section 背景与按钮圆角。
22. 按 EMQX 原始 spotlight markup 校正区域一：section 为 `container pb-32 lg:pb-44`，内容为 `gap-4 p-6 lg:p-12 min-h-[280px]`，标题为 `text-xl lg:text-2xl font-bold leading-tight`，正文为 `text-sm lg:text-base leading-relaxed text-white/90`，按钮为 `px-3 py-2 text-base bg-default hover:bg-elevated`。
23. 区域一按当前验收意见从自动慢速 marquee 改为手动整张轮播：保留 3 个业务卡片，左右各一个 SVG `<` / `>` 控制按钮，通过 `data-active-slide` 驱动整张 `translate3d` 切换，不再使用自动横向滚动或闪现动画。
24. Header 按 EMQX 非透明态源码样式校准：补齐 `data-slot="root/container/left/center/right"`，背景为 `bg-default/95` 等效 `color-mix(in oklab, var(--dt-color-bg) 95%, transparent)`，边框为 `border-default` 等效色，阴影为 Tailwind `shadow-lg` 等效值；Header container 移除局部 `max-width` 覆盖，改为与页面内容区域共用全局 `.container` 断点宽度。
25. Banner 按当前验收意见移除 Hero 内的 TresJS/canvas：在 `HomeHero` 与 `HomeDeliverables` 外层新增 `home-hero-deliverables` 包裹，使用 `public/花瓣素材_+暖蓝光泄漏背景可循环_465316undefined (1) 2.mp4` 作为原生 video 背景；视频上方新增遮罩，基础颜色为当前页面背景色 40%，顶部渐变接近 Header 色，底部渐变回到 `#151515` 页面背景；`HomeProductSystem` 移出该视频背景包裹。
26. 增加 Home Hero 与区域一之间的间距：区域一顶部 padding 调整为 `clamp(3.5rem, 7vw, 6rem)`，桌面端为 `clamp(4.5rem, 7vw, 7rem)`。
27. 主导航首项文案按当前验收意见从 `为什么选择DeepTrols` 修改为 `Why DeepTrols`，并同步 `NAVIGATION.md`、`HOME.md` 与 `SITE_MAP.md`。
28. 区域一右侧 SVG 切换按钮避免遮盖内容：`deliverables__content` 基础 `padding-right` 调整为 80px，桌面端调整为 112px，移动端调整为 64px。
29. Header logo 按当前验收意见从 `/logo.svg` 切换为 `/logo-while.svg`，宽度调整为 200px，并移除旧反白 filter，避免白色 logo 被再次反相。
30. Header 主导航 hover 按 EMQX 当前源码状态补齐：`ul > li > button` 内部继续不渲染 SVG；默认文本使用 dark 模式 `text` 层级，hover/open 切到 highlighted 白色；直接链接增加 `direct-link` hover 主色，Mega Menu 按钮 hover/open 时使用 `bg-elevated/50` 等效背景，focus-visible 使用 inset primary ring。
31. Header 右侧按当前验收意见调整为 GitHub SVG、语言切换 SVG 与 `登录OPS` 文本入口；GitHub SVG 与中英文切换 SVG 使用 Tailwind `size-5`，`登录OPS` 使用 text-sm 等效 14px 尺寸，`登录OPS` hover 与 SVG hover 一致使用主色；移除 Header 中的 `免费咨询`。
32. Header Mega Menu hover 边界收紧：进入有 Mega 的主导航按钮才打开，进入无 Mega 的主导航按钮立即关闭；离开 `产品`、`解决方案`、`服务` 按钮时启动收回计时，避免鼠标离开按钮后 Mega Menu 残留。
33. 区域二 Product System 按当前验收意见校准：新增 eyebrow `DeepTrols OPS`；标题改为 `连接真实业务与人工智能`；描述改为 `以数据与知识底座桥接企业业务与人工智能。赋能 AI Agent，实现对真实业务的支撑。`；描述字体为 `text-xl` 等效 20px，桌面端不换行；桌面 Flow 外层使用 EMQX Platform 同款 560px 网格背景且无边框；底部 4 张卡片采用 EMQX Platform 卡片结构、圆角、字体、hover 上移、顶部渐变线与主色阴影，去掉长标题层。
34. 区域三 Solutions 按当前验收意见校准：eyebrow 改为 `Use Cases`；标题改为 `驱动各行业智能提升`；描述字体为 `text-xl` 等效 20px，桌面端不换行；tabs 改为 EMQX 应用场景同款 `gap-4` 横向滚动胶囊描边按钮；内容区改为 `role="region" aria-roledescription="carousel"` 的 root/viewport/container/item 结构，slide 整张切换，卡片使用 `min-h-[420px] lg:min-h-[520px]`、`rounded-lg`、绝对铺满背景图与底部黑色渐变内容层；底部增加 `查看所有应用场景` 按钮。
35. 区域四 Ecosystem 按当前验收意见校准：eyebrow 改为 `ecosystem`；标题改为 `连接企业 AI 全链路的开放生态`；描述字体为 `text-xl` 等效 20px，桌面端不换行；`ecosystem__grid` 改为 EMQX 产品组合同款 `mt-12 grid gap-6 sm:grid-cols-2`；卡片改为可点击 `group`，`min-h-[280px]`、`rounded-2xl`、`border-muted`、`bg-default`、`p-6 sm:p-8`、`shadow-sm`，hover 切换 `border-primary/40` 与 `shadow-primary/10`；右侧动画拆分为 `HomeEcosystemVisual`，按 Token Hub、智能体社区、算力与基础设施、行业白皮书分别提供云服务、边缘、平台、工业网关风格的 hover 流动动画。
36. 区域四右侧动画按 EMQX 产品组合源码结构二次校准：Token Hub 改为密集云点阵、节点与流线；智能体社区改为四边缘节点汇聚中心云图标；算力与基础设施改为三服务器三角拓扑与 LED pulse，并单独将 stage 顶部偏移覆盖为 `top: -5px`；行业白皮书改为 `论文 -> Hub -> 领域` 桥接链路。四类动画均保持右侧 `right-[-5%] h-[110%] w-[80%] sm:w-[65%]` 舞台、左侧渐隐遮罩、默认静止、hover 后线条流动与节点高亮，不复制 EMQX 品牌、文案或专有资产。
37. 区域五 Cases 按当前验收意见校准：eyebrow 改为 `CUSTOMER STORIES`；标题改为 `携手 DeepTrols 加速创新`；描述改为 `助力客户加速创新、实现业务突破，同时显著降低成本。`，描述按 EMQX 源码节奏使用 `text-base sm:text-lg md:text-xl`，桌面端不换行；section 外层改为 EMQX 客户故事同款 `max-w-[96rem] px-4 pb-32 lg:pb-44 mx-auto`，不再套全局 `.container`；容器改为 `overflow-hidden rounded-3xl border bg-muted/40 shadow-sm`，顶部使用 `gap-4 px-6 pb-6 pt-10 lg:px-10` 标题区 + 48px 圆形上一条/下一条按钮；中部增加横向 Logo tablist；内容区改为 `role="region" aria-roledescription="carousel"` 的整张 story 轮播，缺失客户图片与 logo 使用占位符。
38. 区域五 Cases 按当前验收意见继续收紧：移除 `cases__visual-overlay` 下的占位 `span`；`role="region"` 的 carousel 区域左右与底部贴齐容器，padding 归零；`cases__content h3` 改为 `text-xl font-semibold leading-tight text-highlighted sm:text-2xl` 等效尺寸，描述改为 `text-lg leading-relaxed text-muted sm:text-xl` 等效尺寸。
39. 区域五 Cases 阅读按钮按当前验收意见从旧 `NuxtLink.cases__link` 改为 `button type="button" data-slot="base"` 结构，保留 EMQX 同款 `rounded-md font-medium inline-flex items-center px-3 py-2 text-base gap-2 ring ring-inset` 等按钮样式，文案改为 `阅读案例`，右侧使用 `data-slot="trailingIcon"` 的 `size-4` 箭头 SVG，点击时通过 `navigateTo(story.href)` 跳转。
40. 区域六 Insights 按当前验收意见校准：eyebrow 改为 `Resources`，标题保持 `创新、洞察与新闻`；顶部改为 EMQX Resources 同款 `mb-12 flex flex-col gap-2 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left` 等效结构；内容区改为 `grid grid-cols-1 gap-6 lg:grid-cols-2` 的 1+3 布局；左侧重点内容使用 `group flex flex-col overflow-hidden rounded-lg border border-default lg:relative lg:flex-row lg:border-0` 等效结构，图片 `aspect-[2/1]`，桌面绝对铺满并 hover `scale-105`；右侧三篇内容使用纵向 `gap-6`，每项 `rounded-lg border border-default transition hover:border-muted sm:flex-row` 等效结构，缩略图 `aspect-[2/1] sm:aspect-[400/180] sm:w-2/5`，标题与摘要使用 line-clamp、字号、行高按 EMQX Resources 校准；顶部/移动端操作按钮改为 `data-slot="base"` 与 `data-slot="trailingIcon"` 的同款按钮结构。
41. 区域三 Solutions 按当前验收意见继续收紧：应用场景面板内 CTA 从旧 `了解更多` 改为 `阅读案例`；面板链接补齐 EMQX 同款 `group` hover 上下文，CTA 使用 `mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white` 等效结构，箭头补齐 `size-4 transition group-hover:translate-x-1`，hover 位移按 4px 节奏；底部 `查看所有应用场景` 按钮补齐 `span data-slot="label" class="truncate"` 与 `data-slot="trailingIcon"`。
42. 区域七 CTA 按当前验收意见校准：按 EMQX CTA 同款 `container text-center pb-32 lg:pb-44` 节奏重建；内层使用 `py-16 px-6 lg:px-12 rounded-2xl before:rounded-2xl` 等效渐变背景与渐变边框；标题改为 `构建企业自身的AI能力`，描述改为 `让数据成为资产，让知识驱动决策，让AI创造价值`；按钮改为 `咨询合作` 与 `申请试用` 两枚 `data-slot="base"` 链接按钮，分别使用 primary 与 ring/default 等效样式，右侧统一 `data-slot="trailingIcon"` 的 `size-4` 箭头 SVG。
43. 区域五 Cases 按当前验收意见继续校准：卡片内 `阅读案例` 改为 EMQX 客户故事同款 `NuxtLink` 包 `button type="button" data-slot="base"` 结构，去掉旧 `navigateTo/readStory` 点击逻辑，按钮容器改为 `mt-auto` 等效位置；底部在客户故事卡片容器外新增 `查看所有案例` 链接按钮，使用 `mt-8 flex justify-center` 等效布局、`py-3 text-base gap-2 min-w-32 ... px-12` 样式，并补齐 `data-slot="label" class="truncate"` 与 `data-slot="trailingIcon"`。
44. 区域五 Cases 按当前验收意见统一按钮样式：卡片内 `阅读案例` 与底部 `查看所有案例` 移除长 Tailwind/EMQX class 与嵌套 button，统一改为 `NuxtLink data-slot="base" class="cases__button"`；按钮 CSS 使用与 Insights/CTA 次级按钮一致的本地 token，包括 `min-width: 128px`、`padding: 12px 16px`、`border-radius: 6px`、`box-shadow: inset 0 0 0 1px var(--dt-color-line-strong)`、hover/active `background: var(--dt-color-bg-elevated)` 与统一 focus ring。
45. Footer 按当前验收意见改为 EMQX 中文站 Footer 同款结构节奏：外层使用 `pt-12 bg-muted` 等效深色背景，顶部保留订阅区，主体为 Logo + 五列导航；五列内容按 `产品 / 使用场景 / 行业 / 服务 / 公司` 静态维护，产品列补齐两处分隔线，`Token Hub` 与 `智能体社区` 补齐指定外跳箭头 SVG；链接字号、行高、间距、hover、底部分隔线与版权区按 EMQX Footer 校准。
46. Footer identity 与底部版权按当前验收意见继续校准：`site-footer__identity` 中 logo 宽度调整为 240px；参考 EMQX Footer 新增社交媒体入口行，使用 `mt-10 flex gap-6` 等效布局和 simple-icons SVG；底部版权区改为 EMQX 同款 `flex flex-col md:flex-row md:justify-between` 等效结构，左侧显示 `京公网安备100861001010000号 | 京ICP备20018888号-4`，右侧显示 `@ 武汉深度数智科技有限公司 2026 版权所有`。
47. Footer 按当前验收意见移除 `site-footer__locale` 语言切换按钮，并删除对应 `site-footer__locale-leading/trailing` 样式，保留 Logo 与社交媒体入口。
48. Footer 社交媒体入口按当前验收意见调整 DOM 层级：`site-footer__socials` 从 `site-footer__identity` 中移出，改为与 `site-footer__main` 平级，并放置在 `site-footer__main` 与 `site-footer__rule site-footer__rule--bottom` 之间；同步移除 logo 下旧的空白 margin。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `package.json` | 项目依赖与质量检查脚本；Tres/Three 依赖自动移除因 pnpm store 与网络限制未完成 |
| `nuxt.config.ts` | Nuxt、Tailwind 与 SEO 基础配置 |
| `assets/css/tailwind.css` | Tailwind CSS v4 入口 |
| `assets/scss/main.scss` | 全局样式与设计 token |
| `plugins/tres.client.ts` | 已删除，Hero 不再注册 TresJS/canvas 背景 |
| `pages/index.vue` | 首页入口 |
| `pages/[...slug].vue` | 后续栏目占位路由，避免导航目标不可达 |
| `components/**` | 页面组件、导航、布局与流程图 |
| `data/**` | 导航与首页内容数据 |
| `doc/product/**` | 本次导航文案变更对应产品文档同步 |
| `tests/**` | 内容与视觉契约测试 |
| `public/images/home/solutions/**` | HOME.md 指定解决方案 PNG 素材 public 副本 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | `main` |
| Commit Message | `chore(TASK-002.1): initialize project repository` |
| Commit Hash    | `4c34240` |
| Git Pull       | 未合并：按当前本地代码为准覆盖远端旧历史 |
| Git Status     | 通过：本地 Git 仓库已恢复 |
| Git Push       | 通过：已推送至 `origin/main` |

## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm dev --host 127.0.0.1 --port 3100` | 已有旧进程运行：PID 8157 |
| `NUXT_IGNORE_LOCK=1 pnpm dev --host 127.0.0.1 --port 3200` | 通过，本地预览已启动 |
| `NUXT_IGNORE_LOCK=1 pnpm dev --host 127.0.0.1 --port 3400` | 通过；3400 被占用后 Nuxt 自动切换到 `http://127.0.0.1:3000/`，用于最新样式浏览器验证 |
| `NUXT_IGNORE_LOCK=1 pnpm dev --host 127.0.0.1 --port 3500` | 通过；本次 Solutions 校准使用 `http://127.0.0.1:3500/` 验证 |
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，8 tests |
| `pnpm test:visual` | 通过，4 tests |
| `pnpm build` | 通过；仅有 plugin timing 性能提示 |

## 浏览器验证
- 桌面视口 1440×900：Header 高度约 72px、`margin-bottom: -72px`，Header inner、Hero container、区域一 container 均为 1280px，left/right 区均为 `flex: 1 1 0px`，页面无横向溢出。
- 桌面视口 1440×900：Header `data-slot` 为 `root/container/left/center/right`；背景计算为 `oklab(... / 0.95)`，边框为 `rgb(38, 38, 38)`，阴影为 `0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)`，backdrop blur 为 8px。
- 桌面视口 1440×900：Header 右侧顺序为 GitHub SVG、语言切换 SVG、`登录OPS`；三者均为 text-sm 等效尺寸，`登录OPS` hover 与 SVG hover 一致，不再显示 `联系我们` 或 Header `免费咨询`。
- 桌面视口 1200×900：Header inner、Hero container、区域一 container 均为 1024px，共用 Tailwind `.container` 断点宽度。
- 桌面视口 1920×1080：Header inner、Hero container、区域一 container 均为 1536px，不再固定为 1280px 上限。
- 桌面视口 1440×900：主导航顺序为 `Why DeepTrols / 产品 / 解决方案 / 服务 / 关于我们`。
- 桌面视口 1440×900：主导航 DOM 命中 `div style="position:relative;" > ul > li > button`，5 个主导航 button 内 SVG 数量为 0。
- 桌面视口 1440×900：主导航默认色为 `rgb(229, 229, 229)`；CSSOM 命中 `.site-header__nav-button:hover` highlighted、`.site-header__nav-button.direct-link:hover` primary，以及 `[data-state="open"]::before` elevated/50；点击 `产品` 后进入 `data-state="open"`，文字为白色，Mega Menu 可见。
- 桌面视口 1440×900：主导航按钮绑定 `handleNavMouseEnter` 与 `handleNavMouseLeave`；离开 `产品`、`解决方案`、`服务` 按钮会触发 Mega Menu 收回计时，移入 `Why DeepTrols` 或 `关于我们` 会立即关闭当前 Mega Menu。
- 桌面视口 1440×900：产品 Mega Menu 可 hover/click 展开，展开后 `data-state="open"`，面板包含 `DATA / KNOWLEDGE BASE / AI SECURITY` 三列，并包含 `AI IOT` 分组。
- 桌面视口 1440×900：解决方案 Mega Menu 展开为 `应用场景 / 行业 / 技术方向` 三列，右侧包含 `FDE`、`OPC公共服务平台`、`企业AI落地服务`，并包含 3 个 `View All`。
- 桌面视口 1440×900：服务 Mega Menu 展示 `Token Hub / 白皮书 & 报告 / 产品文档 / 算力与基础设施 / 智能体社区` 五个入口。
- 桌面视口 1440×900：页面 `canvasCount` 与 `heroCanvasCount` 均为 0；`HomeHero` 与 `HomeDeliverables` 外层存在 `home-hero-deliverables`，内部原生 video 数量为 1，src 为 `花瓣素材_+暖蓝光泄漏背景可循环_465316undefined (1) 2.mp4`，`autoplay/muted/loop` 均为 true，`object-fit: cover`。
- 桌面视口 1440×900：`home-hero-deliverables__mask` 以 `rgba(21,21,21,.4)` 作为基础遮罩，并叠加顶部接近 Header 色、底部回到 `#151515` 的纵向渐变；`HomeHero` 与 `HomeDeliverables` 均在 wrapper 内，`HomeProductSystem` 位于视频背景包裹之外。
- 桌面视口 1440×900：Hero bottom 到区域一卡片 top 的实际间距为 101px。
- 桌面视口 1440×900：Hero 内容容器 `padding-top` 为 128px，Hero 实测高度为 628px；标题计算字号 60px、行高 66px，副标题 24px、行高 32px，主按钮 128px × 48px。
- 桌面视口 1440×900：客户 Logo 区域 `padding-top` 为 88px，marquee viewport padding 为 24px，track 高度 56px，Logo 最大高度 48px，间距为 4rem。
- 桌面视口 1440×900：三大业务方向渲染 3 个手动轮播 slide，左右 SVG 控制按钮存在且可见；产品体系标题为 `连接真实业务与人工智能`；解决方案 eyebrow 为 `Use Cases`，标题为 `驱动各行业智能提升`，carousel panel 桌面最小高度为 520px，底部按钮为 `查看所有应用场景`；Solutions 与 Insights 均不是 `section--light` 白底。
- 本地预览 `http://127.0.0.1:3500/` 返回 200 OK；SSR HTML 命中 `Use Cases`、`role="tablist"`、`role="region" aria-roledescription="carousel"`、`solution-panel-manufacturing` 与 `查看所有应用场景`。
- 本地预览 `http://127.0.0.1:3500/` 返回 200 OK；SSR HTML 命中 ecosystem eyebrow、`连接企业 AI 全链路的开放生态`、`/services/token-hub`、`支持DeepSeek、Qwen、OpenAI等模型接入`、`AI Infrastructure` 与 `ecosystem-visual--token/infra`。
- 本地预览 `http://127.0.0.1:3500/` 返回 200 OK；SSR HTML 命中 `ecosystem-visual__cloud-grid`、`edgeGlow`、`serverGlow`、`bridgeGlow`、`论文`、`领域`、`stroke-dasharray="1 15"` 与三台服务器节点，确认区域四右侧动画已渲染为二次校准后的参考拓扑结构。
- 本地预览 `http://127.0.0.1:3500/` 返回 200 OK；SSR HTML 命中 `CUSTOMER STORIES`、`携手 DeepTrols 加速创新`、`助力客户加速创新、实现业务突破，同时显著降低成本。`、`aria-roledescription="carousel"`、`Previous story`、`Next story` 与客户故事 Logo tablist。
- 本地预览 `http://127.0.0.1:3500/` 返回 200 OK；SSR HTML 命中 Footer `订阅 DeepTrols 最新资讯`、`数曜·数据治理平台`、`探曜·AI物联感知平台`、`API安全审计系统`、`Token Hub`、`智能体社区`、`投资计划`，并命中指定外跳箭头 SVG 的 `translate-inline-px translate-y-[-2px] scale-inline-100 transform` 与 `stroke-width="1.3"`。
- 本地预览 `http://127.0.0.1:3500/` 返回 200 OK；SSR HTML 命中 Footer 社交媒体入口 `site-footer__socials`、`微信公众号`、`LinkedIn`，且顺序满足 `site-footer__main` -> `site-footer__socials` -> `site-footer__rule site-footer__rule--bottom`，同时 `site-footer__socials` 位于 `site-footer__identity` 闭合之后；底部命中 `京公网安备100861001010000号`、`京ICP备20018888号-4` 与 `@ 武汉深度数智科技有限公司 2026 版权所有`；生产构建 CSS 命中 logo `width:240px`、社交行 `margin-top:40px` 与底部 `justify-content:space-between`。
- 本地预览 `http://127.0.0.1:3500/` 返回 200 OK；SSR HTML 与生产构建 CSS 均未命中 Footer 语言切换相关的 `site-footer__locale`、`site-footer__locale-leading`、`site-footer__locale-trailing` 或 `aria-label="切换语言"`。
- 桌面视口 1440×900：产品体系 eyebrow 为 `DeepTrols OPS`，标题为 `连接真实业务与人工智能`；桌面 Flow 外层高度 560px、背景网格为 `rgba(148,163,184,.12)` / `48px`，Flow 本身透明无边框；底部为 4 张 EMQX Platform 风格卡片，hover 上移 4px 并显示顶部主色渐变线。
- 桌面视口 1440×900：区域一卡片实际 inner 宽 1248px，左图约 499px，占比 40%；右内容约 749px，占比 60%；slide 最小高度 300px，`阅读详情` 按钮存在，无额外 `What We Deliver` 标题块。
- 桌面视口 1440×900：区域一使用 `data-active-slide` 控制整张切换；点击右侧 SVG 按钮后 active slide 从 `0` 变为 `1`，计算 transform 为 `matrix(1, 0, 0, 1, -1248, 0)`，不再使用 `deliverablesMarquee` 或自动横向慢滚。
- 桌面视口 1440×900：区域一右内容 padding 48px、gap 16px、min-height 280px，计算背景为 `linear-gradient(to right, rgb(24, 21, 36), rgb(39, 30, 53))`。
- 桌面视口 1440×900：区域一右内容 `padding-right` 为 112px，右侧 SVG 切换按钮不再遮盖内容。
- 桌面视口 1440×900：全局 `body` 与 `.site-shell` 背景为 `rgb(21, 21, 21)`，全局 token `--dt-color-bg` 为 `#151515`；本地核心样式未再检出 `#101125`。
- 桌面视口 1440×900：区域一标题计算字号 24px、行高 30px；正文计算字号 16px、行高 26px；按钮 40px 高、`padding: 0 12px`、字号 16px、圆角 12px。
- 桌面视口 1440×900：全局容器 token 为 `80rem`，宽屏容器 token 为 `96rem`；圆角 token 为 `--dt-radius-md: 12px`、`--dt-radius-lg: 16px`。
- 桌面视口 1440×900：Hero wash 计算背景为轻遮罩，stage opacity 为 0.96，未再出现大面积阴影遮挡。
- 桌面视口 1440×900：首屏截图中心区域像素抽样非空，1px BMP 平均像素 bytes 为 `[38, 23, 21, 0]`。
- 移动视口 390×844：桌面导航隐藏，菜单按钮显示并可展开；移动菜单可见，三大业务方向改为单列，无横向溢出。
- Console：`http://127.0.0.1:3200/` 按 URL 过滤后 warn/error 为空。
- Console：`http://127.0.0.1:3000/` 按 URL 过滤后 warn/error 为空。

## 验证截图
- `/private/tmp/deeptrols-home-dev-desktop.png`
- `/private/tmp/deeptrols-home-preview-mobile.png`
- `/private/tmp/deeptrols-home-preview-desktop.png`
- `/private/tmp/deeptrols-home-deliverables-fixed.png`
- `/private/tmp/deeptrols-deliverables-section-fixed.png`
- `/private/tmp/deeptrols-emqx-deliverables-final-aligned.png`
- `/private/tmp/deeptrols-emqx-width-hero-1920.png`

## 已知问题
- 旧 dev server 仍有 `3000/3100/3200/3400` 残留监听；沙盒内 HTTP 不可达。当前最新预览使用非沙盒启动的 `http://127.0.0.1:3500/`。
- Hero 运行代码已移除 TresJS/canvas 入口；后续 `TASK-002.1` 已移除 `@tresjs/core`、`three`、`@types/three` 残留依赖。

## 完成说明
首页首版功能、EMQX 对齐修正、质量检查、浏览器验证、本地 Git 恢复与 GitHub 推送已完成；远端 `main` 已按当前本地提交覆盖，不合并远端旧历史。
