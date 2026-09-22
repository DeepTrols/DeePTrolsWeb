# TASK-015.3 后台 Phase 2：线索闭环（/contact 页 + leads API）

> 依据 doc/engineering/BACKEND_CMS_PLAN.md §5：新建 /contact 页承载线索表单，POST /api/leads 为全站唯一公开写接口，限流/蜜罐/校验三件套同步闭环。全站 CtaSection/PageHero 的「免费获取专属方案」此前指向不存在的 /contact（被 [...slug].vue 兜底），本任务补齐该路由。

## 文件清单

| 文件 | 作用 |
|---|---|
| `server/db/schema.ts` | +lead_status(new/followed/closed) 枚举；leads 表（serial id、name/company/phone/email/message/source、status default new） |
| `server/db/migrations/0002_*.sql` | drizzle-kit generate 产物 |
| `server/utils/leads.ts` | `leadInputSchema`（zod：姓名/咨询内容必填，手机号或邮箱至少其一，CN 手机号/邮箱格式，长度上限，source 必须 `/` 开头，website 蜜罐必须为空）+ `insertLead`（无 DB 时 console.info 记录并返回成功，开发机可走完表单流程；插入失败返回 false） |
| `server/utils/rate-limit.ts` | 内存滑动窗口限流 `consumeRateLimit(key, now)`：10 分钟窗口 5 次（单进程 Nitro 与部署形态一致） |
| `server/api/leads.post.ts` | 限流(429) → zod(400) → 落库(500 不暴露内部错误) → `{ ok: true }` |
| `pages/contact.vue` | SiteHeader + ContactHero + ContactFormSection + SiteFooter |
| `components/contact/ContactHero.vue` | PageHero 居中、hideCta（页面本身即转化目标） |
| `components/contact/ContactFormSection.vue` | 左栏联系渠道（复用 data/about.ts aboutContacts/aboutAddress）+ 右栏表单卡：姓名*/公司/手机号/邮箱/咨询内容*、隐藏蜜罐（hidden + tabindex -1）、客户端校验、提交中/成功（可重置再提交）/错误三态、`role="alert"` 错误提示 |

## 关键设计

- **唯一公开写接口**：leads 是全站唯一 attack surface，三件套（限流/蜜罐/zod）在接口内闭环，不依赖前端
- **蜜罐静默在协议层**：`website: z.string().max(0)`，机器人填了直接 400，前端字段对用户不可见
- **无 DB 降级**：未配 NUXT_DATABASE_URL 时线索仅输出日志仍返回成功（与读侧双层回退同哲学，开发机零依赖）
- **通知（邮件/webhook）未做**：需 SMTP/企业微信配置，留待后续任务；admin 线索管理属 Phase 3

## 门禁同步

- 新增 `tests/leads.spec.ts`：zod 协议（合法/缺联系方式/格式错/超长/蜜罐/source 白名单）+ 滑动窗口限流（窗口内第 6 次拒绝、窗口滑过后恢复）
- 新增 `tests/visual/backend/leads-api.contract.ts`、`tests/visual/site/contact.contract.ts`（注册进 visual.spec）
- 新增 `scripts/harness/checks/backend-leads.mjs`、`contact-page.mjs`（注册进 harness-check）；sources.mjs +6、required-files.mjs +13
- **SiteHeader 深色头路由修复**：/contact 是浅色 PageHero，未列入 `isDarkHeaderRoute` 导致白 logo/白导航文字叠在浅底上不可见；新增 `isContactRoute`（`route.path === '/contact'`）并同步 header.contract.ts 与 news-detail.mjs 的路由成员锁

## 验证

- lint / typecheck / test(152) / test:visual(59) / harness:engineering 全绿
- 本地 PG（5433）`pnpm db:migrate` 应用 leads 表；重启 dev（新 server 路由不热加载）
- SSR 冒烟：`/contact` 200 且含表单/邮箱标记；合法 POST 200 且库中出现 status=new 行；缺联系方式/蜜罐/手机号格式错误均 400；窗口内第 6 次 POST 429
- 验证后已清空测试线索并复位自增序列
