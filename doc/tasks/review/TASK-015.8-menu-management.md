# TASK-015.8 后台 Phase 6：菜单管理（CMS 四件套 Phase B）

> 方案来源：doc/engineering/CMS_PAGE_PLAN.md。目标：主导航 + 页脚全量入库可编辑，主站 DB 优先渲染、静态数据作回退快照，存量页面与门禁零破坏。

## Phase B1：icon 字符串化（入库前提）

- `data/navigation.ts`：`NavLink.icon` / `NavFeature.icon` 从 `Component` 改为 lucide 名字字符串（9 处），文件定位为「菜单管理的静态回退快照」
- `components/navigation/nav-icons.ts`（新）：`navIconComponents` 注册表 + `resolveNavIcon(name?)`，未登记名字返回 undefined（模板 v-if 兜住）
- 消费点两处改为注册表解析：`MegaPanelNavLink.vue`（computed linkIcon）、`MegaMenuPanel.vue`（features 区）

## Phase B2：nav_menus 表 + API

- `server/db/schema.ts` + 迁移 `0004_numerous_gertrude_yorkes.sql`：`nav_menus`（key varchar(50) PK / items jsonb 整树 / updatedAt）
- `server/utils/menu-admin.ts`：
  - `menuKeySchema = z.enum(['header', 'footer'])`；`headerMenuSchema`（NavItem[]，columns 经 `z.lazy` 自嵌套 groups）/ `footerMenuSchema`（{ columns, socials }）
  - icon 字段 refine 必须在 nav-icons 注册表内（提前拦截未登记名字）
  - `parseMenuItems(key, items)` / `getMenuItems(key)`（无库/未命中/校验失败 → null）/ `upsertMenuItems(key, items)`（整树覆盖，upsert 幂等）
- 路由：
  - `GET /api/navigation?key=`（公开）：DB 优先，回退静态快照（header → primaryNavigation；footer → { columns: footerColumns, socials: footerSocials }）；非法 key 400
  - `GET /api/admin/menus/[key]`（requireAdmin）：DB 优先，未入库回退静态快照并标 `source: 'static'`（编辑器从当前内容开始改）
  - `PUT /api/admin/menus/[key]`（requireAdmin）：zod 整树校验 400 / 无库 503
- `scripts/db-seed.ts`：追加 nav_menus 种子（静态数据先过 parseMenuItems 自检再 upsert）

## Phase B3：主站 DB 优先渲染

- `composables/use-navigation.ts`（新）：`useHeaderNavigation()` / `useFooterNavigation()`，useFetch 固定 key（`nav-header`/`nav-footer`，跨组件共享 payload）+ `default` 静态回退——API 层 + 页面层双层回退，与 news 先例一致
- `SiteHeader.vue`：primaryNavigation → `navigation` computed（desktop nav / mobile nav / mega 面板同源）
- `FooterMain.vue` / `FooterSocials.vue`：footer columns/socials 分别走 useFooterNavigation（同一 payload），静态 import 保留为 fallback（harness 锁 `footerColumns` 字符串不动）

## Phase B4：vben /menus 编辑器

- `src/api/menus.ts`：NavItem/FooterMenu 等类型 + getMenuApi/saveMenuApi + `NAV_ICON_OPTIONS`（与注册表保持一致）
- `src/router/routes/modules/menus.ts`：`/menus` 单页（lucide:menu）
- `src/views/menus/index.vue`：header/footer 两 tab，source Tag（数据库/静态快照）+ updatedAt + 保存当前菜单
- 组件（结构化表单，不拖拽，上下移排序）：
  - `HeaderMenuEditor.vue`：一级菜单 Collapse + layout 下拉 + columns（`NavColumnEditor`，groups 递归一层 `allow-groups=false`）+ features（`NavFeatureList`）
  - `NavLinkList.vue`：链接行（label/href/icon 下拉可清/hot 开关/描述/activePaths）
  - `FooterMenuEditor.vue`：栏目 → 组 → 链接三级 + socials（SVG path Textarea）
  - `PathsInput.vue`：逗号分隔文本 ↔ activePaths 数组（空文本落 undefined）
  - `shared.ts`：`moveItem`（上下移）/ `del` / 文本↔数组互转

## 验证

- 单测 `tests/menu-admin.spec.ts`（8 个）：key 枚举 / 静态导航+页脚快照过 zod（含 icon 字符串与嵌套 groups）/ 空数组+非法 layout 拒 / 未登记 icon 拒 / 缺 label·href 拒 / footer 缺 socials 拒 / parseMenuItems 形状错配交叉拒
- 门禁：lint / typecheck / test(183) / test:visual(63) / harness:engineering 全绿；vben 侧 `pnpm lint`（admin 根）+ vue-tsc 全绿
- 真实 PG E2E（cookie session，测试数据已清理）：
  - 未认证 admin GET 401；非法 key 400（公开+admin 同语义）
  - admin GET header/footer 200（source: db）；PUT footer 加测试链接 200 → 公开 API 即时可见 → reseed 恢复
  - PUT 坏 items 400 / 未登记 icon 400
  - **SSR 证据**：PUT header 末项加 E2EMARK → curl 首页命中标记 → reseed 后消失（DB 优先渲染生效）
  - 经 vben proxy（:5666）登录 + GET menus 全通
- 锁：harness `backend-admin.mjs` +2 assert（菜单协议+路由与回退语义）、`admin-api.contract.ts` +1 it（含「icon 必须字符串」反向断言 `not.toContain('Component')`）、`sources.mjs` +7、`required-files.mjs` +17

## 备注 / 坑

- **vben lint 必须在 admin 根目录跑 `pnpm lint`**：`eslint .` 的 tsconfigRootDir 随 cwd；在 apps/web-antd 下直接跑会把所有 src .ts 解析到 tsconfig.node.json 报 parsing error（vendor 基线靠 .eslintcache 掩盖——本次删缓存后暴露，根目录跑则正常）
- **stylelint 会扫 apps/web-antd/dist**：015.5 构建残留的 dist 让 vsh lint 挂 3557 错，删 dist 即恢复（构建产物，可再生成）
- oxfmt↔eslint hug 冲突新配方：除 015.6 两招外，深缩进按钮行靠「短循环变量名（ci/gi/li/si）+ 块级新增按钮去掉 size="small" + 共享 del() helper」压回单行
- 改菜单即时生效无需重启：useFetch key 固定，SSR 每请求读库（无缓存层）
- 下一期：Phase C 动态路由 + CMS 页（015.9），见 CMS_PAGE_PLAN.md
