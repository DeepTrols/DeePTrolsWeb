# TASK-015.14 展示位素材管理：关于页图集 + 首页 Logo 墙（VCropper 裁剪上传）

## 背景与范围

两个独立的后台模块（新顶级分组「素材管理」`/showcase/*`，不合并），管理两处主站展示位素材，上传必须经 VCropper 裁剪限定尺寸：

1. **关于我们页 · 公司介绍横向滚动图集**：`components/about/AboutIntroImageCarousel.vue` ← `aboutIntroGallery`（`data/about.ts`，10 项占位）；卡片 `aspect-[10/16]`。
2. **首页 · 关于我们横向滚动 Logo 墙**：`components/home/HomeCustomerLogos.vue` ← `customerLogos`（原 `data/home.ts`，9 项 image|text 混合）；CSS 项高 56px、`img max-height: 48px`；该组件同时是 015.13 注册的零 props custom section（只改数据来源，不动注册元数据）。

已拍板决策：

1. Logo 裁剪 = 自由比例 + 固定输出高度上限 192px（2x retina 对应 48px CSS 高），PNG 保留透明
2. Logo 条目 = 仅图片（纯文本条目只留在静态回退数据，不进 DB 协议）
3. 模块归属 = 新顶级分组「素材管理」

## 方案要点

### A. 服务端：showcase_lists 表 + 协议层 + 路由

- DB：`showcase_lists`（key varchar(50) PK / label varchar(100) default '' / items jsonb / createdAt / updatedAt），迁移 0008
- `server/utils/showcase-admin.ts`（menu-admin 配方）：
  - `SHOWCASE_KEYS = ['about-gallery', 'home-logos'] as const` + `showcaseKeySchema` + `SHOWCASE_LABELS`
  - `galleryItemSchema { image: safeUrlSchema(500), alt: 1..200 }`，`galleryListSchema` max 24
  - `logoItemSchema { name: 1..100, image: safeUrlSchema(500) }`（无 text 分支），`logoListSchema` max 40
  - `showcaseItemsSchema(key)` 分发 / `parseShowcaseItems` / `getShowcase`（三态：无 DB null / 脏数据记录日志按未命中 / 异常记录日志返回 null）/ `putShowcase`（无 DB false，异常 internalServerError 抛出）
- 公开 `GET /api/showcase?key=`：DB 优先回退静态快照，响应 `{ key, items, source }`（图集回退 `data/about.ts` 的 aboutIntroGallery——该文件无 `?url` 可直接 server import；Logo 回退 `data/home-logos.ts`，回退原样含 text 条目）
- **静态数据抽取（015.12 先例）**：`customerLogos` 从 `data/home.ts`（顶层有 `?url` 资源导入，Nitro 服务端构建无法解析）抽到纯字符串模块 `data/home-logos.ts`（`CustomerLogo { name, image?, text? }`），home.ts import + re-export
- admin `GET/PUT /api/admin/showcase/[key]`（全 requireAdmin；404 未知 key / 400 校验 / 503 无库）：
  GET 未入库回退静态并标 `source:'static'`；**Logo 静态含 text 条目 → GET 只返回有 image 的条目，丢弃 text 条目并计数 `skippedTextEntries`**（避免管理员 PUT 时静默丢失而不自知）

### B. 主站接线

- `composables/use-showcase.ts`（use-navigation 配方）：`useShowcaseGallery()` / `useShowcaseLogos()`——useFetch 固定 key（`showcase-about-gallery` / `showcase-home-logos`）+ `transform` 取 items + `default` 静态回退
- `AboutIntroImageCarousel.vue`：`galleryItems` computed 自 useShowcaseGallery；photoCount 改 computed；`:key` 改 `${alt}-${index}`（DB 数据 alt 可重复）
- `HomeCustomerLogos.vue`：`logoList` computed 自 useShowcaseLogos，marquee 双份拼接逻辑不变；保留 text 渲染分支（静态回退含文本条目）；零 props 注册组件语义不动

### C. vben admin（`/showcase/*`）

- 路由 `router/routes/modules/showcase.ts`：顶级分组「素材管理」→ `/showcase/gallery` 公司介绍图集、`/showcase/logos` 首页 Logo 墙
- API `api/showcase.ts`：`getShowcaseApi` / `saveShowcaseApi`，`AdminShowcasePayload { items, key, skippedTextEntries, source, updatedAt }`
- 共享组件 `views/showcase/components/CropperUpload.vue`：
  - props：`aspectRatio?` / `outputWidth?` / `outputHeight?` / `format` / `maxOutputHeight?` / `quality?` / `buttonText?`
  - 流程：隐藏 file input（accept png/jpeg/webp，≤5MB 前端预检）→ objectURL → antd Modal 内 VCropper（自带透明棋盘格背景）→ 确认 `getCropImage(format, quality, 'blob', outputWidth?, outputHeight?)` → 可选 `limitImageHeight`（canvas 等比缩，png 保透明）→ `new File` → `uploadMediaApi` → emit `uploaded(path)`
  - **targetWidth/Height 会强制拉伸输出尺寸**：仅固定比例图集传（480×768 = 240×384 渲染盒 2x）；Logo 不传，靠 maxOutputHeight 192 事后等比缩
- `views/showcase/gallery.vue`：卡片网格（10:16 缩略图 + alt Input + 上移/下移/替换（重裁）/删除）+ 新增 CropperUpload；保存 = PUT 整列（alt 空前置拦截）；`source:'static'` 时橙色 Tag「静态快照（保存后入库）」
- `views/showcase/logos.vue`：同上（字段 name）；`skippedTextEntries > 0` 时 Alert 提示纯文本条目仅静态保留不入库

### D. 门禁 / 测试

- 单测 `tests/showcase-admin.spec.ts`：key 白名单、gallery/logo 条目 schema（合法/空字段/超长/危险协议拒绝）、列表上限 24/40、key 分发、parseShowcaseItems 失败 null、静态快照与协议对齐（图集全过 / Logo 图片条目全过 / 文本条目保留）
- harness：sources +13 键；backend-admin 三断言（协议层 / API+composable+主站接线 / vben 模块）；required-files +13 文件 + 迁移 0008 + 任务文档
- contract 镜像 `tests/visual/backend/admin-api.contract.ts`：逐条镜像 + `data/home-logos.ts` 禁 `?url` 断言

## 验证记录

- 迁移 0008 已 generate + migrate（docker deeptrols-postgres，宿主 5433），`\d showcase_lists` 确认表结构
- `tests/showcase-admin.spec.ts` 13 例通过
- `cd admin && pnpm lint` 通过；`cd admin/apps/web-antd && pnpm typecheck` 通过
- E2E（cookie 注入 + 系统 Chrome）：admin PUT 入库 → 公开 GET 返回 DB 数据；关于页/首页渲染新素材

## 风险与缓解

- VCropper targetWidth/Height 强制拉伸 → 仅固定比例图集传；Logo 不传，裁剪后 canvas 等比缩
- 静态 text 条目丢失不自知 → admin GET 显式 `skippedTextEntries` + UI Alert
- 裁剪 jpeg/png 过 magic-byte sniff：cropper 输出标准编码可过；SVG 不入裁剪流（accept 限定）
- HomeCustomerLogos 是 015.13 注册组件 → 只改数据来源，props/注册元数据不动
