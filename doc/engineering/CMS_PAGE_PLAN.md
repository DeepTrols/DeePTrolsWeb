# CMS 四件套方案：媒体库 → 菜单 → 动态路由 → 布局管理

> 2026-09-22 与用户确认的决策（AskUserQuestion）：动态路由=**增量 CMS 页**；布局管理=**注册表+逃生门**；图片存储=**本地+可插拔**；菜单=**导航+页脚全量入库**。
> 前置：BACKEND_CMS_PLAN.md（Phase 1-3 已落地：数据底座 / 线索闭环 / admin session + vben）；015.6 内容 CRUD 已上线。

## 现状约束（摸底结论）

- **路由**：pages/ 文件系统路由，`pages/[...slug].vue` catch-all 已存在（渲染"建设中"占位）——天然是动态路由分发器落点
- **菜单**：`data/navigation.ts` 的 `icon` 是 lucide 组件引用，**不可序列化**，入库前必须字符串化；导航+页脚被 ~10 个 tests/harness 文件直接断言
- **图片**：DB 图片字段已是 `varchar(1000)` 路径字符串，schema 零改动；存量 435 处路径引用不可动，只能增量
- **布局**：页面 = section 乐高但顺序写死；带插槽的 section（嵌 VueFlow 架构图）无法纯数据化
- **可复用资产**：repo 双层回退模式（DB 优先→静态兜底）、requireAdmin/zod/事务范式、ArticleBlock 判别联合校验、vben content CRUD 模板

## 分期与依赖

```
A 媒体库（独立，一切前置） → B 菜单管理（独立） → C 动态路由+CMS页 → D 布局管理（依赖 C）
```

---

## Phase A · 图片上传与媒体库（TASK-015.7）

**DB**：`media_assets`（serial id / path / filename / mime / size / alt / createdAt）

**服务端**
- `server/utils/storage.ts`：`StorageDriver` 接口 `{ save(buf, name) → path, delete(path) }`；`LocalDriver` 落 `public/uploads/YYYY-MM/`（uuid 文件名防碰撞）；接口预留 OssDriver
- `POST /api/admin/upload`：requireAdmin + 滑动窗口限流 + multipart；白名单 png/jpg/jpeg/webp/gif，≤5MB；**SVG 首期禁传**（同源直开 XSS 面，要做需 sanitize）；mime 验 magic bytes 不信 content-type
- `GET /api/admin/media`（列表）+ `DELETE /api/admin/media/[id]`（删库行+文件）
- 部署备忘：uploads 目录需持久化/随部署同步

**vben**：`/media` 媒体库页（网格卡片 + 上传 + 复制路径 + 删除）；`ImageField` 组件（路径 Input + 媒体库选择弹窗 + 上传），替换 news/cases/reports 编辑页 5 处手填路径 Input

**风险**：低。

---

## Phase B · 菜单管理（TASK-015.8）

**前置改造（主站）**：`data/navigation.ts` 的 `icon: Component` → 字符串名；新建 `components/navigation/nav-icons.ts` 注册表（字符串→组件）。渲染输出不变，harness/tests 只改 import 面不改文案面。

**DB**：`nav_menus`（key：`header`/`footer` 主键，items jsonb，updatedAt）——整树单 jsonb + zod 全量校验（ArticleBlock 先例），不上关系表

**服务端**
- 公开 `GET /api/navigation?key=header|footer`：DB 优先 → 静态 data 回退（契约保险丝）
- admin `GET/PUT /api/admin/menus/[key]`：PUT 整树替换，zod 校验 NavItem[]/FooterColumn[] 形状

**主站**：SiteHeader/FooterMain 改 `useFetch` + 静态 import 回退（照搬 news 双层回退）

**vben**：`/menus` 页：header/footer 两 tab；结构化编辑器（items → columns → links 三级展开表单，icon 下拉选注册表名字），上下移按钮排序，不做拖拽

**风险**：中。icon 字符串化触碰 ~10 个断言文件，需一轮同步改锁。

---

## Phase C · 动态路由 + CMS 页面（TASK-015.9）

**DB**：`pages`（slug 主键存完整路径如 `/solutions/smart-retail` / title / seoDescription / status draft|published / sortOrder / sections jsonb 默认 `[]` / timestamps）

**服务端**
- 公开 `GET /api/pages/[...path]`：仅 published
- admin 五件套 CRUD（015.6 范式：400/404/409 slug 冲突）；slug 黑名单校验（不可与现有代码页路径冲突，否则永不可达）

**主站路由**：改造 `pages/[...slug].vue` 为分发器：
1. `useFetch('/api/pages' + route.path)` 命中 published → 渲染器（首期支持 `richText` = ArticleBlock[] 正文页）
2. 未命中 → 保持现有"建设中"占位（/products/agentos 等占位链接行为不变）
3. `useSeoMeta` 从页面记录注入

**vben**：`/pages` 列表 + 编辑页（元数据表单 + 首期正文 blocks JSON，news 编辑页同模）

**风险**：中低。静态代码页优先于 catch-all（Nuxt 路由优先级天然保证）。

---

## Phase D · 页面布局管理（TASK-015.10）

**Section 注册表**（主站 `components/sections/`）：
- 标准 section（纯数据驱动）：`hero` / `metrics` / `featureGrid` / `cta` / `richText` / `logoStrip` / `imageBanner`
- 逃生门：`custom:DgpArchitecture` 等——type 按名映射现有定制组件，props 不入库
- 每 type 一个 zod schema，`sectionsSchema = z.discriminatedUnion('type', [...])`

**渲染器** `CmsPageRenderer.vue`：遍历 sections（visible 过滤 + order 排序）→ 注册表解析 → 分发 props；CMS 页走统一壳（存量 24 页不动）

**vben**：sections 结构化编辑器：列表（上下移/显隐/删除）+ 按 type 动态表单，保留「高级模式 JSON」切换；server zod 兜底

**风险**：大。主要是 vben 侧每种 section 一个表单的工作量。

---

## 实施顺序

| Phase | 内容 | 体量 | 交付物 |
|---|---|---|---|
| 015.7 | 媒体库 + ImageField 替换手填路径 | 小 | 上传 API + /media 页 |
| 015.8 | icon 字符串化 + 菜单入库 + /menus 编辑器 | 中 | 导航/页脚后台可配 |
| 015.9 | pages 表 + catch-all 分发器 + /pages CRUD | 中 | 后台可建正文落地页 |
| 015.10 | section 注册表 + 渲染器 + 布局编辑器 | 大 | 可视化拼页面 |

每期照旧：zod 协议测试 + harness/contract 锁 + 真实 PG E2E + 任务文档，门禁六件套绿了再进下一期。
