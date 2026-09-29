# TASK-015.18 首页模块级 CMS 接管

## 背景与目标

后台「页面管理」此前只能管理纯 CMS 页，代码页（含首页）只读不可编辑。本任务把首页 8 段（Hero / 智能底座 / 解决方案 / ecosystem / trust / 关于我们 / Resources / CTA）全部组件化注册进 CMS：后台可编排顺序/显隐、可修改文案与图片；首页路由加分发分支——命中已发布 CMS 页渲染编排结果，未配置/未发布/失败回落代码渲染（线上零风险）。

范围：仅首页（产品页/方案页二期复制配方）。

## 拍板决策

1. 范围 = 仅首页
2. 机制 = CMS 覆盖优先 + 代码回退（pages/index.vue 分发器，v-else 保留原 8 段代码渲染，代码段永不删除——回退资产）
3. Hero 视觉 = 注册视觉白名单 + 静态图（split-visual 右侧视觉从白名单选动画组件或上传静态图）

## 015.18a Hero 协议扩展

- `server/utils/page-sections.ts`：`heroVariantSchema` 五版式（simple 默认向后兼容 / fullscreen-image / split-visual / banner-dark / fullscreen-video）+ 扁平字段组（titleLines/backgroundImage/backgroundVideo/mediaType/badge/description/align/cta/secondaryCta/visualType/visualName/visualImage/visualAlt）；per-variant 必填组校验集中在 `pageSectionsSchema.superRefine`（zod v3 discriminatedUnion 成员不能挂 superRefine）
- 视觉白名单：`components/sections/hero-visual-names.ts`（纯字符串常量）+ `hero-visual-registry.ts`（Record 映射，typecheck 强制键同步）；初始登记 DgpHeroVisual/DeviceAgentHeroVisual/TanyaoHeroVisual；`GET /api/admin/components` 下发 heroVisuals
- 渲染：`components/sections/CmsHero.vue` 改 variant 分发器（文件名/props 不变），新增 `components/sections/heroes/` 四变体组件；fullscreen-image 用 img 绝对定位 + object-cover（禁 inline style）
- vben `SectionBody.vue` hero 分支：variant Select 置顶 + 分 variant 子表单（切 variant 不清字段，服务端 superRefine 兜底）
- `components/home/HomeHero.vue` 原样保留作代码回退

## 015.18b 首页 7 段组件化

原则：全部注册 custom 组件（CTA 除外）+ SFC 加可选 props、缺省读 data——代码回退与 CMS 渲染共用同一 SFC，零 props = 现状视觉。架构 flow 图、ecosystem SVG、跑马灯、insights 条目不进 props（代码资产/已有 API 渠道）。

| 段 | 注册名 | props（全部 optional） |
|---|---|---|
| 智能底座 | `HomeProductSystem` | eyebrow/title/subtitle/flowLabel/cards |
| 解决方案 | `HomeSolutions` | eyebrow/title/subtitle/items |
| ecosystem | `HomeEcosystem` | eyebrow/title/subtitle/cards |
| trust | 扩展 `WhyTrustTabs`（零改名） | title/tablistLabel/tabs |
| 关于我们 | `HomeAbout` | eyebrow/title/banner 与客户标签图（partnerRows 走 015.14 showcase） |
| Resources | `HomeInsights` | eyebrow/title/moreLabel/moreHref（条目永远走 /api/home/insights） |
| CTA | 不注册 custom：标准 `cta` 型加 `metrics` 字段透传 CtaSection | — |

配套：custom-names +5 → 20；custom-registry/custom-props 同步；nav-icons 注册表 +13 图标；**数据纯模块提取**——`data/home-sections.ts` + `data/why-trust.ts`（纯字符串，icon 存注册表名），data/home.ts / data/why.ts import 后 resolveNavIcon 解析并 re-export（导出签名不变；server 不可 import 含 ?url 的模块，015.12 先例）。

## 015.18c 接管分发

- `server/utils/pages-admin.ts`：`CMS_TAKEOVER_PATHS = ['/']` 接管白名单 + `isTakeoverPath`；`isReservedPagePath('/')` 保持 true（目录扫描测试不动），`pageSlugSchema` 对 '/' 特判放行（仅 takeover 端点可写入）；`AdminPageRecord.takenOver`；listAdminPages 合并——CMS 行命中接管白名单的代码路径 → 折叠进 code 行（takenOver + status/updatedAt 取 CMS 值），不重复出行
- `server/utils/home-page.ts`：`buildHomePageSeed()` 从 data/home-sections.ts + data/why-trust.ts 组装 8 段全量 props sections（首段必须是可见 hero，防 CmsPageView 默认页头双 h1）；`HOME_PAGE_SLUG='/'` / `HOME_PAGE_TITLE='首页'`
- 新端点 `POST /api/admin/pages/takeover`（requireAdmin）：slug 白名单校验 400 / 已有行 409 / 无库 503；插入 status='draft' 行（title='首页'，sections=seed）。取消接管 = 复用 DELETE 路由，首页立即回落代码
- `pages/index.vue` 分发器：`useFetch('/api/pages/', { key: 'cms-page/...', query 透传 preview, default: null })`；`<CmsPageView v-if="cmsPage">` + `<div v-else class="site-shell">` 原 8 段原缩进原顺序；useSeoMeta 全部 getter 化
- `scripts/db-seed.ts` 追加 pages 段：**onConflictDoNothing**（刻意不同于 news 的 DoUpdate——页面接管后是运营资产，seed 不得覆盖编辑）
- vben list.vue：首页行三态 Tag（代码页 / 接管中·草稿 / 已接管）+ 操作分发（接管 Popconfirm → POST takeover → 跳编辑；已接管 → 编辑 + 取消接管）；api/pages.ts 加 takenOver + takeoverPageApi

## 门禁 / 测试

- 新增 `tests/home-page-seed.spec.ts` parity 测试：seed 与 data 模块逐字段 deep-equal + 过 pageSectionsSchema + 首段可见 hero + 8 段顺序锁 + 所有 icon 名在 nav-icons 注册表内
- `tests/pages-admin.spec.ts`：slug '/' 接管特判放行 + 保留语义不变 + listAdminPages 合并三用例（无 DB / 折叠 '/' / 普通 CMS 行）
- `tests/page-sections.spec.ts`：五 variant 合法/非法矩阵 + visualType/mediaType 联动必填 + 无 variant 向后兼容 + cta metrics
- harness：home-layout.mjs（data 字面值锁改指 data/home-sections.ts + index.vue 分发器断言 + `:label="flowLabel"`）；backend-admin.mjs 新增 015.18 断言块；sources.mjs +homeSectionsData/whyTrustData/backendHomePageUtil/backendAdminPagesTakeoverApi；required-files +新文件；admin-api.contract.ts 镜像
- 视觉契约镜像：home 各 contract 标题字面值锁改 props 绑定 + data 模块断言（015.18b 已同步）

## 验证

- 根六件套（先杀 dev 再 build）+ admin lint + web-antd typecheck
- curl 闭环：seed/takeover → slug='/' draft → 首页仍代码渲染 → PUT published → /api/pages/ 200 → SSR HTML 出现 CMS 渲染 → ?preview=1 预览横幅 → DELETE → 回落代码

## 已知边界

- `/api/pages/` 尾斜杠依赖 Nitro `[...path]` catch-all 匹配空段（slug 推导为 '/'）；已实测匹配，若路由规则变更需改 query 传 slug 或加 pages/index.get.ts
- seed 与 takeover 均 draft 起步：发布前线上永远走代码渲染；管理员 ?preview=1 核对后显式发布
- 接管后 CMS 渲染与代码回退的视觉一致性靠 parity 测试 + contract 双锁维持；代码 8 段永不删（回退资产）
