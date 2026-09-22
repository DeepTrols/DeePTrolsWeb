# TASK-015.4 后台 Phase 3 起步：admin 鉴权 + 线索管理 API

> 依据 doc/engineering/BACKEND_CMS_PLAN.md §6：同仓轻量 admin 第一步——封闭 cookie session 鉴权（h3 useSession，零新依赖）+ 线索列表/状态流转 API。
>
> ⚠️ 范围修订：本任务最初含 Nuxt 端 admin 页面（pages/admin/* + middleware/admin.ts），后在 TASK-015.5 改用 Vben Admin 独立工程承载后台前端，Nuxt 页面/中间件已删除。本任务最终交付为**纯服务端** admin API，前端见 TASK-015.5。

## 文件清单

| 文件 | 作用 |
|---|---|
| `nuxt.config.ts` | runtimeConfig += `adminPassword` / `sessionPassword`（NUXT_* 自动映射；未配置时 admin API 返回 503） |
| `server/utils/admin.ts` | `useAdminSession`（封闭 cookie：name `dt-admin`、httpOnly、sameSite lax）；`requireAdmin`（503 未配置 / 401 未登录）；`verifyAdminPassword`（node:crypto `timingSafeEqual` 常量时间比较，长度不等/非字符串/空期望全拒） |
| `server/utils/leads-admin.ts` | `leadStatusSchema`（new/followed/closed zod 枚举）；`listLeads`（createdAt+id 双 desc、limit 200、无 DB 返回 []）；`updateLeadStatus`（`.returning` 判行数，不存在返回 false） |
| `server/api/admin/login.post.ts` | 限流（`admin-login:${ip}`，复用 015.3 滑动窗口）→ 503 未配置 → 密码错误 401 → `session.update({ admin: true })` |
| `server/api/admin/logout.post.ts` | `session.clear()` |
| `server/api/admin/session.get.ts` | requireAdmin 探针，供外部 admin SPA 鉴权守卫 |
| `server/api/admin/leads/index.get.ts` | requireAdmin → listLeads |
| `server/api/admin/leads/[id].patch.ts` | id 正整数(400) → zod status(400) → 更新失败 404 |
| `.env.example` | +NUXT_ADMIN_PASSWORD / NUXT_SESSION_PASSWORD（openssl rand -hex 32 生成指引） |

## 关键设计

- **零新依赖**：h3 `useSession` 为 Nitro 内置封闭 session（cookie 值即加密 payload），与单进程内存限流同一部署假设
- **时序安全**：密码比较走 `timingSafeEqual`，先比长度再比字节，避免计时侧信道
- **双 503 语义**：sessionPassword 未配置 → requireAdmin 503；login 额外要求 adminPassword 未配置也 503（未配置的实例 admin 整体不可用而非弱口令可进）
- **无 DB 降级**：listLeads 返回空数组（未配置数据库时列表始终为空）
- **前端无关**：API 只认 httpOnly cookie，任何同域前端（Nuxt 页/Vben SPA/ curl）均可消费

## 门禁同步

- 新增 `tests/admin.spec.ts`：verifyAdminPassword（正确/错误/长度不等/非字符串/空期望）+ leadStatusSchema（三态合法/未知值拒绝）
- 新增 `tests/visual/backend/admin-api.contract.ts`（注册进 visual.spec，仅锁服务端）
- 新增 `scripts/harness/checks/backend-admin.mjs`（注册进 harness-check，仅锁服务端）；sources.mjs +7、required-files.mjs +9

## 验证

- lint / typecheck / test(158) / test:visual(60) / harness:engineering 全绿
- 本地 .env 配 NUXT_ADMIN_PASSWORD + NUXT_SESSION_PASSWORD
- E2E（curl + 本地 PG 5433）：无 cookie 访问 leads/session → 401；错误密码 → 401；正确密码登录 → 200 + Set-Cookie；携 cookie 探 session → 200；POST /api/leads 造测试线索 → admin 列表可见 status=new；PATCH followed → 200 且库中行更新；非法 status → 400；未知 id → 404；logout 后 session → 401
- 验证后已清空测试线索并复位自增序列
