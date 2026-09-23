# TASK-015.7 后台 Phase 5：媒体库与图片上传（CMS 四件套 Phase A）

> 方案来源：doc/engineering/CMS_PAGE_PLAN.md（用户已确认四决策：增量 CMS 页 / 注册表+逃生门 / 本地+可插拔存储 / 导航+页脚全量）。
> 目标：admin 可上传图片、浏览媒体库、复制路径，内容编辑页的图片字段从「手填路径」升级为「媒体库选择器」。存量 435 处 `/images/` 路径引用不动，纯增量。

## 服务端（Nuxt 主站）

- `server/db/schema.ts` + 迁移 `0003_mean_tyger_tiger.sql`：`media_assets`（serial id / path unique / filename / mime / size / alt / createdAt）
- `server/utils/storage.ts`：`StorageDriver` 接口（save→path / delete）+ `createLocalStorageDriver`（落 `public/uploads/YYYY-MM/<uuid>.<ext>`）；delete 有目录穿越守卫（仅 `/uploads/` 前缀且不含 `..`，删除幂等）；预留 OssDriver 扩展位
- `server/utils/media-admin.ts`：
  - 协议边界：`MAX_UPLOAD_BYTES = 5MB`；**SVG 禁传**（同源直开 XSS 面）
  - `sniffImageMime`：按 magic bytes 嗅探 png/jpeg/gif/webp（不信客户端 content-type）
  - `listMedia` / `createMediaRecord` / `deleteMediaRecord`（删行返回 path，调用方删文件）
- 路由（全部 requireAdmin 前置）：
  - `POST /api/admin/upload`：`consumeRateLimitWith('admin-upload:${ip}', 30, 10min)` + multipart；400 缺文件 / 413 超限 / 415 非白名单（magic bytes 判定）/ 503 无库；**入库失败回滚已落盘文件**（防孤儿资源）
  - `GET /api/admin/media` 列表（最新在前，≤500）
  - `DELETE /api/admin/media/[id]` 400 非法 id / 404 未命中；删库行+删文件
- `server/utils/rate-limit.ts`：新增 `consumeRateLimitWith(key, max, windowMs)`；原 `consumeRateLimit` 签名行逐字保留（harness/contract 锁定），改为委托实现
- `.gitignore`：`public/uploads/`（文件本体不入 git，部署需同步/持久化该目录）

## 前端（vben `apps/web-antd`）

- `src/api/media.ts`：listMediaApi / uploadMediaApi（FormData multipart）/ deleteMediaApi / formatMediaSize
- `src/router/routes/modules/media.ts`：`/media` 单页（lucide:image）
- `src/views/media/components/MediaPanel.vue`：可复用面板（UploadDragger before-upload 拦截 + 网格卡片 + 复制路径 + Popconfirm 删除）；`selectable` 模式 emit select
- `src/views/media/index.vue`：媒体库页 = MediaPanel
- `src/views/content/shared/ImageField.vue`：defineModel('value') 路径 Input + 预览缩略图 + 「媒体库」Modal（内嵌 selectable MediaPanel，选用即回填）
- 替换 4 处手填路径 Input：news/edit coverImage、cases/edit image + heroImage、reports/edit image
- `vite.config.ts` proxy 增加 `/uploads` → 3000（否则 vben dev 下 `<img src="/uploads/...">` 落到 SPA fallback；**改 vite.config 必须重启 vben dev**）

## 验证

- 单测 `tests/media-admin.spec.ts`（6 个）：magic bytes 四类识别 / SVG·文本·空 buffer 拒收 / 扩展名映射 / driver save 内容一致+路径形态 / delete 幂等 / 穿越路径拒删（hostage 文件验证）
- 门禁：lint / typecheck / test(174) / test:visual(62) / harness:engineering 全绿；vben 侧 `vsh lint` + `vue-tsc` 全绿（顺手清了 pnpm-workspace.yaml 16 条裁剪残留的 unused catalog 项——015.5 删 naive/ele/tdesign/docs 后 lint 一直报错）
- 真实 PG E2E（cookie session，测试数据已清理）：未认证 401；上传 1px png 201+记录→ `/uploads/**` 可公开访问（200 image/png）；SVG 415；伪装 png 的文本 415；6MB 413；空表单 400；非法 id 400；删除 200→再删 404；经 vben proxy（:5666）上传+回读全通
- 已知 dev 行为：Nitro dev 会缓存 public 资产，删除文件后 dev 下 URL 仍短暂 200（生产按磁盘服务无此问题）；Nuxt catch-all 对不存在路径返 200 HTML（「建设中」占位），不影响 `<img>` 的真实文件命中
- 锁：harness `backend-admin.mjs` +2 assert（媒体协议+路由语义）、`admin-api.contract.ts` +1 it、`sources.mjs` +5、`required-files.mjs` +8

## 备注

- `pnpm install`（admin/）会重新生成 lefthook.yml 与 .git/hooks/prepare-commit-msg 到主仓根目录，已再次清理——015.5 的坑仍在，装依赖后要检查
- 下一期：Phase B 菜单管理（icon 字符串化 → nav_menus 入库 → /menus 编辑器），见 CMS_PAGE_PLAN.md
