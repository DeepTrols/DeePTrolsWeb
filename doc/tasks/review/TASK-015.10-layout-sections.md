# TASK-015.10 后台 Phase 7：布局管理（CMS 四件套 Phase D）

> 方案来源：doc/engineering/CMS_PAGE_PLAN.md Phase D。目标：区块（section）注册表协议层 + 主站渲染器分发 + vben 结构化区块编辑器，Phase C 的「仅 richText」扩展为 7 标准型 + custom 逃生门。

## Phase D1：section 注册表协议层（zod discriminatedUnion）

- `server/utils/page-sections.ts`（新）：8 个区块 schema 组装 `pageSectionSchema = z.discriminatedUnion('type', ...)`，`pageSectionsSchema = z.array(...).max(50)`
  - 每个区块带 `visible: z.boolean().default(true)`（显隐开关，渲染器过滤）
  - hero（eyebrow?/title/subtitle?）、metrics（items 1-8 {value,label}）、featureGrid（columns two|three|four 默认 three；items 1-24，icon refine 必须在 navIconComponents 注册表内）、cta（ctaLabel/ctaHref 带默认值）、richText（blocks: articleBlocksSchema）、logoStrip（logos 1-24，refine image||text 至少其一）、imageBanner（src/alt/caption?）
  - **custom 逃生门**：`name: z.enum(CUSTOM_SECTION_NAMES)`——名字必须登记，拒绝任意组件名注入
- `components/sections/custom-names.ts`（新）：纯字符串常量模块（零 import），`CUSTOM_SECTION_NAMES = ['DdpArchitecture','DlpArchitecture','DmsArchitecture']` + 类型；**服务端 zod 与客户端注册表共享同一来源**（server utils 不能 import .vue SFC，Nitro 打包风险）
- `pages-admin.ts`：删掉 Phase C 的本地 richText-only schema，改 import pageSectionsSchema（不做 re-export，否则 unimport 重复导入告警）；公开读 `getPublishedPage` 出库再过一次 pageSectionsSchema 的防线不变
- 单测 `tests/page-sections.spec.ts`（13 个）：每型 accept/reject、visible 默认 true、cta 默认值、logo image||text refine、custom 名字白名单、联合拒未知 type、混合数组

## Phase D2：CmsPageRenderer + 主站 section 组件映射

- `components/sections/custom-registry.ts`（新）：`customSectionComponents: Record<CustomSectionName, Component>` 映射 3 个架构图 SFC——**Record 键类型让 typecheck 强制与 CUSTOM_SECTION_NAMES 同步**，漏映射即编译错
- `components/sections/CmsPageRenderer.vue`（新）：`visibleSections = sections.filter(s => s.visible)` + v-for 按 type 分发：
  - hero → CmsHero（新，h1 横幅，titleId 供 aria-labelledby）
  - metrics → ProductMetricsSection（spacing compact）
  - featureGrid → ProductFeatureGridSection（items 先过 `resolveNavIcon` 把 icon 字符串解析为组件）
  - cta → CtaSection；richText → ArticleContent；logoStrip → CmsLogoStrip（新，无图回退文字）；imageBanner → CmsImageBanner（新，figure+figcaption）
  - custom → `<component :is="customSectionComponents[section.name]">`
- `components/common/CmsPageView.vue` 改造：`hasHero = sections.some(s => s.type==='hero' && s.visible)` —— **有可见 hero 时跳过默认页头**（hero 自带 h1，避免双 h1），正文委托 CmsPageRenderer
- 门禁锁迁移：pages 协议 assert 的 `z.literal('richText')` 等从 pages-admin 移到 page-sections；CmsPageView 锁从 'ArticleContent' 改为 'CmsPageRenderer'

## Phase D3：vben 结构化区块编辑器

- `src/api/pages.ts`：PageSection 升级为与服务端对齐的判别联合（8 型）+ FeatureGridItem/LogoItem
- `src/views/pages/sections.ts`（新）：sectionTypeLabels/Options（8 型中文标签）、featureGridColumnOptions、customSectionOptions（与服务端注册表一致）、`createSection(type)` 各型默认值工厂、`sectionSummary()` 列表行摘要
- `src/views/pages/components/SectionsEditor.vue`（新）：`defineModel<PageSection[]>('sections')`；每区块卡片 = Tag 类型 + 摘要 + `v-model:checked="s.visible"` 显隐 Switch + 上移/下移（moveItem，菜单编辑器先例）+ Popconfirm 删除；底部类型 Select + 新增区块
- `src/views/pages/components/SectionBody.vue`（新）：`defineModel<PageSection>('section')` 按 type 分支渲染字段表单；richText 用 blocksDraft 草稿（合法 JSON 实时落回，非法保留草稿继续编辑）；图标走 NAV_ICON_OPTIONS 下拉
- `edit.vue`：结构化 / JSON 高级双模式 RadioGroup；切结构化时先解析 JSON 草稿，失败 message.error 并留在 JSON 模式；新建页默认一个 richText 区块

## 验证

- 门禁：lint / typecheck / test(207) / test:visual(64) / harness:engineering 全绿；vben 侧 `pnpm lint`（admin 根）+ vue-tsc 全绿
- 真实 PG E2E（cookie session，测试数据已清理）：
  - 混合区块发布页 `/e2e-d10`：hero/metrics/cta/custom:DmsArchitecture 全部 SSR 命中标记；**visible:false 的 richText 不渲染**（仅出现在 `__NUXT_DATA__` 序列化负载，DOM 零命中）；有 hero 时 `<h1>` 唯一（默认页头被跳过）
  - 第二轮 PUT featureGrid（icon=Factory 注册表名）/logoStrip/imageBanner 全部 SSR 命中；无 hero 时默认页头 h1 正常渲染
  - 未知 type → 400；未登记 custom 名字（EvilComponent）→ 400；草稿化后公开 API 404、前台回落占位页（与存量未知路径行为一致，noindex）
  - featureGrid icon 小写 'cpu' 被 refine 拒（400）——icon 必须用注册表 PascalCase 名
- 锁：harness `sources.mjs` +3（vben 编辑器三件套）、`required-files.mjs` +3、`backend-admin.mjs` +1 assert（createSection 工厂/defineModel/moveItem/visible 开关/onBlocksInput）、`admin-api.contract.ts` 同项镜像

## 备注 / 坑

- **vue/no-mutating-props ×20 的解法**：对象 prop 字段直接 v-model 被拒（NavColumnEditor 先例只覆盖「数组 prop 的循环别名字段」）。SectionBody 改 `defineModel('section')`——model 可写，lint 放行；父组件 SectionsEditor 传 `:section="s"`（循环别名）单向即可，因为子组件只改字段、从不整体替换 model（`v-model:section="s"` 被 vue/valid-v-model 拒：不能更新迭代变量本身；`sections[i]` 又撞 noUncheckedIndexedAccess 且 oxlint 禁 `!`）
- **perfectionist/sort-union-types**：判别联合成员必须按字面量排序（featureGrid < cta 等），eslint --fix 可自动修
- `__NUXT_DATA__` 会序列化整页 sections（含 visible:false 内容）——visible 是展示开关不是保密机制，敏感内容不要入库
- custom-names.ts 必须保持零 import 纯常量：server(zod refine) 与 client(registry Record) 双侧共享，一旦 import .vue 就会污染 Nitro 服务端包
- CMS 四件套（媒体库 015.7 / 菜单 015.8 / 动态路由 015.9 / 布局管理 015.10）全部落地；后续可选：更多 section 类型、区块级预览、版本历史
