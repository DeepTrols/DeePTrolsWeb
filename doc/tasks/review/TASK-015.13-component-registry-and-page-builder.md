# TASK-015.13 全站组件化一期：组件注册表 + 拖拽页面编辑器 + 模板库 + 草稿预览

## 背景与范围

页面全部组件化一期：先有组件库，再用拖拽组装页面。三项决策：

1. 创建组件 = 代码注册（SFC + zod props schema + 元数据）+ 运营可复用模板库（presets）
2. 编辑器 = 左侧组件面板拖入 + 区块卡片拖拽排序 + 表单填 props + 主站 iframe 草稿预览
3. 分期推进：本任务 = 一期；**代码页接管 URL = 二期，本方案不涉及**

## 方案要点

### A. 注册组件系统（custom 扩展 props）

- `components/sections/custom-props.ts`（新，纯 TS + zod，禁 .vue/资源 import，server/client 共享）：
  - `ComponentFieldMeta`：admin 表单描述符（vben 无法 import 主站 zod，经 API 获取）
  - `RegisteredComponentMeta { label, description, category, schema(.strict()), fields }`
  - `CUSTOM_COMPONENT_META: Record<CustomSectionName, RegisteredComponentMeta>` 全名覆盖
- `custom-names.ts` 扩名 3 → 15：零 props 自包含组件（ContactFormSection/About*/Why*/Home*）+
  props 驱动（AboutTextBlock paragraphs/align/size、AboutHeroStats items）
- 协议 `page-sections.ts`：`customSectionSchema` 加 `props: z.record(z.string(), z.unknown()).optional()`
  （向后兼容零 props 既有数据）；zod v3 discriminatedUnion 成员不能挂 superRefine →
  per-name props 校验集中在 `pageSectionsSchema.superRefine`（按 CUSTOM_COMPONENT_META[name].schema strict 校验）
- 默认值策略：zod 不设 default、DB 存稀疏 props、渲染靠 SFC withDefaults、admin 初值取描述符 default
- 渲染 `CmsPageRenderer.vue`：custom 分支 `v-bind="customProps(section)"`（过滤 `/^on/i` 键纵深防御）

### B. 发现 API（registry + usage）

- `component-admin.ts`：`listComponentRegistry()`（schema 不出门的 JSON 子集）+
  `scanSectionUsage(rows)` 纯函数（同页同组件计一次，visible:false 也算使用，解析失败行跳过）+
  `getComponentUsage()`（无 DB 返回 {}）
- `GET /api/admin/components` 响应扩展 `{ registry, usage }`（disabled/source 语义不变；
  PAGE_COMPONENT_IDS 随 CUSTOM_SECTION_NAMES 扩容自动覆盖）

### C. 模板库 section_presets

- DB：`section_presets`（id serial PK / name varchar(200) / description varchar(500) default '' /
  section jsonb / createdAt/updatedAt），迁移 0007
- `server/utils/preset-admin.ts`：`presetInputSchema { name, description, section: pageSectionSchema }`
  + list/get/create/update/delete（无 DB 返回 null/false，出库 zod 复验）
- 4 路由 `server/api/admin/presets/{index.get,index.post,[id].put,[id].delete}.ts`
  （全 requireAdmin；400 校验 / 404 未知 / 503 无库）
- vben：`api/presets.ts`；路由 `/pages/presets`（区块模板）；`views/pages/presets.vue`
  列表（名称/类型 Tag/摘要/描述/改名 Modal/删除 Popconfirm；一期不在此编辑模板内容）
- SectionsEditor 每卡片「存为模板」→ Modal(name+description) → createPresetApi(快照) → 刷新列表

### D. 拖拽编辑器（SectionsEditor 重构）

- 依赖：`@vueuse/integrations` + `sortablejs`（catalog 已有）；不引入 vuedraggable
- `SectionPalette.vue`（新）：标准区块 8 / 定制组件（按启停过滤）/ 区块模板三组，
  `useSortable(el, [], { group: { name:'sections', pull:'clone', put:false }, sort:false })`
- 卡片列表 `useSortable(listEl, sections, { handle:'.drag-handle', group:{name:'sections'}, onAdd })`；
  onAdd 读 `evt.item.dataset`（kind: standard/custom/preset + id）→ `evt.item.remove()` →
  在 newIndex 插入 `createSection(type)` / `createCustomSection(name, fields)`（新工厂，初值取描述符 default）/
  `structuredClone(toRaw(preset.section))`
- 稳定 key：WeakMap `keyOf`（替代 `:key="i"`，拖拽重排防 DOM 错位）
- 卡片操作：拖柄 + 上移/下移（键盘可达 fallback）+ 复制 + 折叠（本地 Set + v-show）+ 存为模板 + 删除
- 底部保留 Select + 新增区块按钮（无拖拽环境 fallback）
- SectionBody richText → BlocksEditor（tiptap）：null（不可转换/空）不回写 section.blocks，
  红字提示；JSON Textarea 收进 `<details>` 高级编辑（逃生门）
- SectionBody custom 分支：按 fields 描述符动态表单（string→Input、text→Textarea、number→InputNumber、
  boolean→Switch、select→Select、image→ImageField、icon→NAV_ICON_OPTIONS Select、json→Textarea 失焦 parse）；
  切换 name watch 重置 props；数组类 props 一期用 json 字段
- 模板内 `as string | undefined` 断言会撞 vue/no-deprecated-filter（| 误判过滤器）→ 值读取走脚本 helper

### E. 草稿预览（iframe）

- `server/utils/admin.ts` 加软守卫 `isAdminRequest(event): Promise<boolean>`（未配置/未登录/异常一律 false）
- 公开 `GET /api/pages/<path...>` 加 preview 分支（`?preview=1` 显式触发 + isAdminRequest）：
  优先 getAdminPage（最新保存行，无论状态）并标 `preview: true`；落空回退 published；否则 404
- 分发器 `pages/[...slug].vue` 透传 query，useFetch key 拼 `:preview` 后缀防缓存互污
- `CmsPageView.vue`：`page.preview` 时顶部黄色横幅「草稿预览 · 仅管理员可见」
- edit.vue 「预览草稿」按钮 → Drawer(80%) iframe（dev 指 localhost:3000，`_t` 时间戳破缓存）；
  未保存新页禁用；postMessage 实时预览推迟二期

### F. 组件管理页升级

- 数据源改 API `registry` + `usage`（静态 maps 留 fallback）
- 新列：分类 Tag（架构/营销/表单/内容）、使用次数（数字 + Popover 列 slugs）
- 禁用告警：off 且 usage.count > 0 → Modal.confirm（列使用页面，说明仅影响新增下拉），取消还原 Switch

## 门禁

- 单测：`tests/page-sections.spec.ts` 扩展（custom+props 合法/非法/零 props 兼容/strict 拒多余键）；
  新 `tests/component-registry.spec.ts`（META 全名覆盖、fields key ∈ zod shape、registry JSON 安全、
  scanSectionUsage fixture）；新 `tests/preset-admin.spec.ts`（presetInputSchema）
- harness：required-files + sources + backend-admin 纯新增断言；`tests/visual/backend/admin-api.contract.ts` 逐条镜像

## 验证

1. 根六件套（lint / typecheck / test / test:visual / harness:engineering / build）
2. `cd admin && pnpm lint` + `cd apps/web-antd && pnpm typecheck`（先杀 dev 再 build）
3. curl（dt-admin cookie）：GET /api/admin/components 见 registry+usage；presets CRUD；
   `/api/pages/<slug>?preview=1` 无 cookie 404 / 有 cookie 200 且 `preview:true`
4. 浏览器 E2E（playwright 系统 Chrome，cookie + localStorage 注入，快照-还原闭环）

## 分期边界

- 一期（本任务）：注册表/组件库/拖拽编辑器/模板库/草稿预览
- 二期（不在本任务）：代码页接管 URL（现有静态页迁入 CMS）、结构化数组 props 编辑器、postMessage 实时预览
