# TASK-015.5 后台 Phase 3：Vben Admin 独立工程接入

> 用户决策：后台前端改用成熟的 Vben Admin（vue-vben-admin v5.7.0），替代 TASK-015.4 的手写 Nuxt admin 页面。决策三件套（AskUserQuestion 确认）：**子目录独立工程**、**复用 cookie session**、**删 Nuxt 页面留 API**。

## 工程形态

- `admin/` = vben v5.7.0 monorepo 裁剪版（仅保留 `apps/web-antd` + `packages/*` + `internal/*`；删掉 docs/playground/web-ele/web-naive/web-tdesign/web-antdv-next/backend-mock），去掉 .git 作为仓库内 vendor 代码提交（自带嵌套 .gitignore 处理 node_modules/dist）
- 与主站完全解耦：独立 pnpm workspace、独立 lockfile、独立 lint/typecheck 体系（vben 自带 vsh/oxlint/oxfmt/vue-tsc）
- 主站侧隔离（否则连锁爆炸）：
  - `nuxt.config.ts` `ignore: ['admin/**']` — **关键修复**：nitro dev watcher 走 `createIsIgnored`(nuxt.options.ignore)，不配则 watcher 爬 admin/**/node_modules 直接 EMFILE 崩溃；vite watcher 另配 `vite.server.watch.ignored` + `watchers.chokidar.ignored`
  - `eslint.config.mjs` ignores + `admin/**`
  - `tsconfig.json` exclude + `admin`（否则 nuxt typecheck 拿主站 tsconfig 爬 vben 源码报几百个错）

## web-antd 改造点（对接 TASK-015.4 服务端）

| 文件 | 改造 |
|---|---|
| `vite.config.ts` | dev proxy `/api`、`/uploads` → 主站（`VITE_PROXY_TARGET` 可配，缺省 `http://localhost:3000`）；`port: 5666` + `strictPort: true` 钉死端口，被占用直接报错不漂移 |
| `.env` | 标题 DeepTrols 管理后台、命名空间 dt-admin |
| `.env.development` | `VITE_NITRO_MOCK=false`（接真实 API） |
| `.env.production` | `VITE_BASE=/admin/`、`VITE_GLOB_API_URL=/api`、`VITE_ROUTER_HISTORY=hash`（单端口部署见文末「部署备忘」） |
| `src/preferences.ts` | `accessMode: 'frontend'`（静态路由，不请求后端菜单）、`defaultHomePath: '/leads'`、`enableRefreshToken: false` |
| `src/api/request.ts` | 去掉 `{code,data}` 包装拦截器（主站 API 直返业务数据）；`withCredentials: true`；401 → 登出回登录页（无 refresh token 流程） |
| `src/api/core/auth.ts` | login → POST /admin/login（传 username + password）；logout → POST /admin/logout；删 refreshToken/getAccessCodes |
| `src/api/core/user.ts` | GET /admin/session 探活，通过后返回固定单管理员 UserInfo（roles: ['super']，homePath /leads） |
| `src/store/auth.ts` | 登录成功置占位 token `cookie-session`（前端守卫标记，真实凭据是 httpOnly cookie）；accessCodes 固定 ['super'] |
| `src/router/routes/modules/leads.ts` | 唯一业务路由 /leads（删掉 dashboard/demos/vben 三个 module 及对应 views） |
| `src/views/leads/index.vue` | antd Table：时间/姓名/公司/联系方式/咨询内容/来源/状态 Tag（新线索蓝/已跟进橙/已关闭灰）+ 标记跟进/标记关闭按钮（按状态显隐），PATCH 后刷新 |
| `src/views/_core/authentication/login.vue` | 删 mock 账号选择/滑块验证码，保留账号 + 密码两个字段 |

## 验证

- vben 侧：`pnpm -F @vben/web-antd run typecheck` 绿；`pnpm build:antd` 绿（17.7s，dist 资源全部 /admin/ 前缀）；dev 模块转换 200（leads/login/auth store/request）
- 主站门禁：lint / typecheck / test(158) / test:visual(60) / harness:engineering 全绿
- 联调 E2E（vben:5666 → proxy → Nuxt:3000 → PG 5433）：无 cookie session 探针 401；登录 200 + Set-Cookie；POST /api/leads 造数 → 列表可见；PATCH followed 200 且库行更新；logout 后 401；测试数据已清理复位
- 访问方式（两种，凭据见 `.env` 的 `NUXT_ADMIN_USERNAME` / `NUXT_ADMIN_PASSWORD`）：
  - **单端口（默认）**：`pnpm admin:build` 一次后 `pnpm dev`，浏览器 `http://localhost:3000/admin/`（后台以构建产物形式由主站同源服务，无代理）
  - **HMR 联调**：主站 dev（3000）+ `pnpm dev:admin`（固定 5666，strictPort），浏览器 `http://localhost:5666`

## 部署备忘（单端口，已实施脚本）

- **拓扑**：单一 origin 按路径分流 —— `/` 主站 SSR、`/admin/` 后台 SPA、`/api/**` 与 `/uploads/**` 主站服务端。**不需要 nginx**
- **产物落位**：`pnpm admin:build` = `pnpm -C admin build:antd` + `scripts/copy-admin-dist.mjs`（dist → `public/admin/`，该目录已入 `.gitignore`）
- **顺序约束**：Nitro 生产静态清单是**构建期快照**，`public/admin/` 必须先于 `nuxt build` 就位 → 出部署产物用 `pnpm build:deploy`（= admin:build && build）
- **无需 history fallback**：`.env.production` 为 `VITE_ROUTER_HISTORY=hash`，深链走 `#/`，服务端只需 `/admin` 与 `/admin/` 能出 `index.html`（Nitro 静态层两者都会尝试 `/admin/index.html`，无需 routeRules）。旧版「nginx fallback 到 /admin/index.html」的说法按 history 模式写成，已作废
- **dev 与 prod 的细微差异**：dev 下 `/admin`（无尾斜杠）由 serve-static 301 到 `/admin/`；prod 直接 200。两者均可用
- **同源收益**：cookie session（`dt-admin`，httpOnly + SameSite=Lax）与 `/uploads/**` 图片全部同 origin，零代理零跨域配置
- vben 目录及父目录含中文/空格会导致其工具链报错（官方已知限制），本项目路径含「项目」实测 install/build/dev 均正常（pnpm store 全局硬链接规避了大部分问题），CI/部署机若踩坑需换 ASCII 路径或符号链接
