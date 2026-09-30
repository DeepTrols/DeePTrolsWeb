# TASK-015.20 后台区块内容结构化编辑（文字 + 图片）

> 状态：已完成
> 范围：list 行编辑器替代裸 JSON、零 props 组件补稀疏 props、/about_us 接管进 CMS、实时预览桥提取为 composable 三页共用

## 背景

用户反馈「后台区块和页面还是不能编辑，希望能直接在后台修改区块中的文字内容、图片」。排查确认三个缺口：
1. 定制组件的数组 props（HomeSolutions.items、HomeProductSystem.cards、HomeEcosystem.cards、WhyTrustTabs.tabs→features、AboutTextBlock.paragraphs、AboutHeroStats.items）在后台只有裸 JSON 输入框（失焦才解析），运营无法逐行改文字/选图。
2. About*×4、WhyEngine、WhyServiceReset、HomeDeliverables 是零 props 组件（`z.object({}).strict()` + `fields: []`），SFC 直接读 `data/*.ts`，后台一个字段都没有。
3. `CMS_TAKEOVER_PATHS` 仅 `['/']`，pages/about_us.vue 是纯代码页，后台列表只能「查看」。

已拍板：范围 = 首页 + 关于我们；生效方式保持草稿/发布两态（编辑时右侧实时预览可看未保存效果）。

## 改动

### a. list 行编辑器（PropListField）
- `components/sections/custom-props.ts`：`ComponentFieldMeta.type` 加 `'list'`；新增 `itemFields`（对象行子字段，可嵌套一层）、`itemType`（标量行）、`minItems/maxItems`（仅按钮态，zod 仍是服务端权威）、`fallback`（prop 缺失时编辑器预览行，不自动落库保持稀疏存储）。
- `admin/.../api/components.ts` 镜像 union 与新键。
- 新 `admin/.../views/pages/components/PropListField.vue`：行卡片 + 上移/下移/删除/新增（`del`/`moveItem`/WeakMap keyOf 复用 menus/shared 与 SectionBody 先例）；子字段 string→Input、text→Textarea、number→InputNumber、select→Select、boolean→Switch、**image→ImageField（媒体库选图）**、icon→Select(NAV_ICON_OPTIONS)、list→自递归；写回经 SectionBody `setProp` 不可变替换。
- `SectionBody.vue` custom 分支在 json `v-else` 前接 `v-else-if="field.type === 'list'"`；json Textarea 保留为逃生舱。
- 6 个 json 字段转 list（zod schema 不动）：HomeSolutions.items / HomeProductSystem.cards / HomeEcosystem.cards（含 points 标量嵌套）/ WhyTrustTabs.tabs（含 features 嵌套）/ AboutTextBlock.paragraphs / AboutHeroStats.items。

### b. 零 props 组件补稀疏 props
- 模式：`withDefaults(defineProps<{...optional}>())` + **同名遮蔽** computed（`const aboutContacts = computed(() => props.items ?? staticContacts)`）→ about/why 的 contract 与 harness 字面量锁零改动。
- AboutIntroSection（title/paragraphs）、AboutValuesSection（title/subtitle/items）、AboutAddressSection（title/company/address，地图 iframe 保持代码内置）、AboutContactSection（title/items）、WhyEngine（eyebrow/title/description/links）、WhyServiceReset（eyebrow/title/items）、HomeDeliverables（items，zod `.min(3).max(3)` 硬限——轮播 CSS 只支持 3 屏）。icon 一律字符串 + `resolveNavIcon`。
- 纯字符串模块抽取（server/描述符 default 需避开 ?url 导入，why-trust 先例）：新 `data/why-sections.ts`（whyServiceItemsData/whyEngineLinksData/两个 heading）、`data/home-deliverables.ts`（deliverablesData）；`data/why.ts`、`data/home.ts` 改为 import 后解析图标 re-export，导出签名不变。
- 新注册 `AboutHero`（custom-names/custom-registry/custom-props emptyMeta + contentEntry），仅为 about 种子能复现页首视觉。
- HomeCustomerLogos 保持零 props（DB showcase 源，避免双源竞争）。

### c. /about_us 接管进 CMS
- `server/utils/pages-admin.ts`：`CMS_TAKEOVER_PATHS = ['/', '/about_us']`；`pageSlugSchema` 首条 refine 改 `isTakeoverPath(slug) || 正则`（下划线过不了原正则）。
- 新 `server/utils/about-page.ts`：`buildAboutPageSeed()` 七段（AboutHero / AboutIntroSection / WhyServiceReset / WhyEngine / AboutValuesSection / AboutAddressSection / AboutContactSection），props 全量拷贝自 data 纯模块。
- `server/api/admin/pages/takeover.post.ts`：`TAKEOVER_SEEDS` slug→{title,builder} 映射替换硬编码首页常量。
- `scripts/db-seed.ts`：about 行 `onConflictDoNothing` + draft（不覆盖运营编辑）。
- `pages/about_us.vue`：照 pages/index.vue 加 `/api/pages/about_us` 分发 + `<CmsPageView v-if="renderedPage">` + 代码 7 段回退；useSeoMeta 走 renderedPage。
- `admin/.../views/pages/list.vue`：`TAKEOVER_PATHS` 加 '/about_us'（接管/取消接管/编辑按钮自动生效）。
- `components/common/CmsPageView.vue`：`hasHero` 计入定制 hero（`CUSTOM_HERO_NAMES = ['AboutHero']`），防发布后双 h1。

### d. 实时预览桥提取为 composable
- 新 `composables/use-cms-live-preview.ts`：原 pages/[...slug].vue 的三重门 + origin 白名单 + 消毒 + ready 握手整体迁入；`pages/[...slug].vue`、`pages/index.vue`、`pages/about_us.vue` 三页共用（首页/关于页此前没有实时预览）。
- 顺带修复：`PREVIEW_SLUG_RE` 不匹配 '/' 与 '/about_us'（下划线）导致预览 Drawer 无 iframe → 放宽为 `/^\/[a-z0-9_/-]*$/`（仍拒协议注入）。

## 验证
- 质量门全绿：lint / 主站 typecheck / admin check:type / 531 tests / 73 visual contracts / harness / build（build 后重启双 dev）。
- 新增 `tests/about-page-seed.spec.ts` parity（七段顺序、props 与 data 逐字段 deep-equal、icon 白名单、schema 过检）；`tests/component-registry.spec.ts` 增 list 不变量（fallback JSON-safe 且过自身 schema；maxItems+1 行必被 zod 拒、minItems-1 行必被拒）与零 props 名单加 AboutHero。
- 浏览器：首页编辑器「解决方案」区块出现逐行输入（tab 文案/配图 ImageField）；改 tab 文案与图片路径 → 预览 iframe 横幅「实时预览 · 未保存内容」且文案/图片同步；关于页同理（联系方式行）。
- 发布链路：PUT /about_us status=published（改一条邮箱）→ `curl /about_us` 含新值且仅 1 个 h1；改回 draft 后回落代码渲染。
- 负例：POST 4 项 HomeDeliverables props → 400 Invalid page input；白名单外 /why-deeptrols 接管 → isTakeoverPath false。

## 锁同步
- 更新：about.contract.ts / why.contract.ts（heading 字面量改指 data/why-sections.ts 与 seed）、about-page.mjs（:title/:subtitle/{{ company }} + seed 字面量）、home-layout.mjs 与 backend-admin.mjs 与 admin-api.contract.ts（CmsPageView renderedPage、live-preview 改指 composable、takeover 改指 TAKEOVER_SEEDS、PropListField 新锁）、pages-admin.spec.ts（白名单双路径）、page-sections.spec.ts（零 props 拒绝样例改 HomeCustomerLogos）。
- 零改动（同名遮蔽生效）：about.contract.ts 的 `v-for="item in aboutContacts"`、why.contract.ts 的 `whyEngineLinks`、about-page.mjs/why-page.mjs 其余断言。

## 范围外残留
- /why-deeptrols 未接管（可编辑内容仅 CTA，收益低）；产品/方案/服务页仍代码-only。
- HomeCustomerLogos 图片走素材管理（/showcase/logos），不在区块编辑器内。
