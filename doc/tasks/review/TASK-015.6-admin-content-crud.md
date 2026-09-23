# TASK-015.6 后台 Phase 4：内容 CRUD（新闻 / 案例 / 报告）

> 目标：在 vben 后台中完成 news / cases / reports 三类内容的增删改查，替代原「改 data/*.ts + 重新部署」的内容维护方式。草稿/发布双状态，公开 API 只吐 `published`。

## 服务端（Nuxt 主站，复用 015.4 的 requireAdmin 封闭 session）

**协议层（zod）**
- `server/utils/content-admin.ts` — 共享：`contentStatusSchema`（draft/published）、`solutionKeySchema`（7 个方案 key）、`isoDateSchema`（YYYY-MM-DD）
- `server/utils/news-admin.ts` — `newsInputSchema`（blocks 走既有 `articleBlocksSchema` 判别联合）；list（leftJoin newsDetails 得 hasDetail，按 updatedAt 倒序）；create 事务内 `max(id)+1` 分配 id（静态种子占 1..40+）；update 事务 + detail onConflictDoUpdate upsert；delete 靠 FK 级联
- `server/utils/cases-admin.ts` — `caseSlugSchema`（`^[a-z0-9][a-z0-9-]*$`，≤200）；`caseUpdateSchema = caseInputSchema.omit({ slug: true })`（slug 主键不可变）；create slug 冲突返回 `'conflict'`
- `server/utils/reports-admin.ts` — `reportTypeSchema`（6 种中文类型）；create/update href 唯一冲突返回 `'conflict'`（update 排除自身 id）

**路由（15 个，全部 `requireAdmin` 前置）**
- `server/api/admin/{news,cases,reports}/index.get.ts` 列表
- `index.post.ts` 新建（400 校验失败 / 409 冲突 / 503 无库）
- `[id|slug].get.ts` 详情（404）
- `[id|slug].put.ts` 更新（400 / 404 / 409）
- `[id|slug].delete.ts` 删除（404）

## 前端（vben `apps/web-antd`）

- `src/api/content.ts` — 全部类型（AdminNewsRecord/NewsInput/AdminNewsPayload/AdminCaseRecord/CaseInput/AdminReportRecord/ReportInput/AdminReportPayload/ContentStatus/SolutionKey）+ 15 个 API 函数
- `src/router/routes/modules/content.ts` — `/content` 父路由（lucide:file-text）+ 3 列表 + 6 个 `hideInMenu` 编辑页（`:id(\d+)` / `:slug([a-z0-9][a-z0-9-]*)` 参数约束）
- `src/views/content/shared/options.ts` — 状态/分类/方案/报告类型 options + `parseJsonField`/`toJsonText`
- `src/views/content/{news,cases,reports}/list.vue` — antd Table + 状态 Tag + 编辑/Popconfirm 删除 + 新建按钮
- `src/views/content/{news,cases,reports}/edit.vue` — 表单 + blocks/relatedProducts 的 JSON Textarea（保存前 `parseJsonField` 校验非空数组）；「保存」/「保存并发布」（status 强制 published）/「返回」

**vben/antd 适配要点**
- `Select` v-model 不接受 `null`：表单态用 `solutionKey?: SolutionKey`（undefined 即清除），保存时 `?? null` 写回
- antd `maxlength` 必须绑数字：`:maxlength="500"`
- oxlint 禁非空断言：路由参数先 `const id = newsId.value; if (id === null) return;` 守卫
- oxfmt ↔ eslint 冲突两个坑（格式化死循环）：① 长 CJK 文本的 `<span>` 会被 oxfmt 折成 hug 形态而 eslint `vue/html-closing-bracket-newline` 拒收 → 缩短文案让单行放得下；② 含双引号的 placeholder 属性（JSON 示例）oxfmt 用单引号包裹而 eslint `vue/html-quotes` 要双引号 → 改为脚本常量 `:placeholder` 绑定绕开

## 验证

- vben 侧：`vsh lint`（oxlint+oxfmt+eslint）绿、`vue-tsc` typecheck 绿、dev 模块转换 200（6 个新 view + 路由 + api）
- 主站门禁：lint / typecheck / test(167) / test:visual(61) / harness:engineering 全绿
- 单元：`tests/content-admin.spec.ts` zod 协议（默认值、坏 category/date/blocks、slug 规则、update schema 去 slug、未知 type/负 sortOrder）
- 真实 PG E2E（cookie session 走 :3000，测试数据已全部清理）：
  - 新闻：建草稿 → 公开列表不可见 → PUT 发布 → 公开列表/详情可见 → PUT 回草稿 → 详情 404 → DELETE → admin 404；非法 blocks（heading 缺 level）400 ✓
  - 案例：建草稿 → 公开 404 → 重复 slug 409 → 非法 slug 400 → PUT 发布 → 公开 200/列表命中 → DELETE → 404
  - 报告：建草稿 → 公开列表不含 → href 撞别人 409 → PUT 发布 → 公开命中 → PUT href 撞自身 200（排除自身）→ DELETE → 404；未认证 401
- 锁：harness `backend-admin.mjs` 新增两段 assert（utils 协议 + 15 路由 requireAdmin/状态码语义）；`admin-api.contract.ts` 新增一个 it；`sources.mjs` +19 条、`required-files.mjs` +20 条

## 备注

- dev 新增 server 路由 Nitro 可热加载，无需重启；typecheck 会删 `.nuxt/dist` 触发 dev 重启，浏览器需硬刷新
- 未做（后续候选）：图片上传（目前手填路径）、富文本编辑器（目前 JSON Textarea）、报告的 solutionKey 筛选联动
