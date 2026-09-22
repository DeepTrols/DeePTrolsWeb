# 后台开发前置梳理（CMS + 表单线索）

> 目标范围（已与需求确认）：**内容管理（CMS）+ 表单/线索收集**；技术路线 **Nuxt Nitro 同仓**（`server/` 目录）；数据库 **关系型数据库**。
> 本文档梳理项目现状与后台开发的衔接点，作为后续任务拆分（TASK-015+）的依据。

## 1. 项目现状盘点

### 1.1 技术底座

- Nuxt 4 + Vue 3 + TS + Tailwind v4 + SCSS，pnpm 10.31
- **无 `server/` 目录**：当前纯前端，Nitro 仅承担 SSR/静态渲染，零个 API 路由
- **无任何网络调用**：全站无 `useFetch` / `$fetch` / 表单 action；联系方式均为 `mailto:`（data/about.ts:90-93）
- 无数据库、无 ORM、无环境变量体系（nuxt.config.ts 无 runtimeConfig、无 nitro preset 配置，默认 `node-server`）
- 依赖极简：运行时仅 nuxt / vue / @vue-flow / @lucide/vue / tailwindcss

### 1.2 数据层（后台要接管的核心资产）

`data/*.ts` 共 20 个文件 ~5000 行，按页面/产品一文件，全部是 `export const` 静态数组。**与后台相关的只有「内容型」数据**，产品/方案页的展示型配置（hero 文案、timeline 项、metrics 等）属于代码资产，不建议入库。

| 内容实体 | 列表文件 | 详情文件 | 关联键 | 规模 | 页面 |
|---|---|---|---|---|---|
| 新闻 | `data/news.ts` `NewsItem[]`（40 条） | `data/news-details.ts` `NewsDetail[]` | `id: number` | 列表 369 行 + 详情 | `pages/news/index.vue` + `[id].vue` |
| 案例 | `data/cases.ts` `CaseResource[]`（7 条） | `data/case-details.ts` `CaseDetail[]` | `slug: string` | — | `pages/cases/index.vue` + `[slug].vue` |
| 报告/白皮书 | `data/reports.ts` `ReportResource[]` | 无详情（href 外链/下载） | — | 95 行 | `pages/resources/reports.vue` |

关键设计（后台直接受益）：

- **列表/详情双文件制**已经就是「列表表 + 详情表」的关系模型雏形
- **正文统一 `ArticleBlock[]`**（types/article.ts）：heading(2/3/4) / paragraph / list / quote / image / divider 六种 block 的判别联合。注释明确写了「后台后续按此结构填充正式内容」——**这是现成的 CMS 正文协议**，后台富文本编辑器只需产出这个 JSON 结构，前端 `ArticleContent` 组件零改动
- 分类体系现成：新闻 `NewsCategory`（company/media/insight）、案例/报告共用 `ReportSolutionFilterKey`（7 个行业 key），入库时直接建枚举/字典表
- 图片目前走 `public/images/**` 静态路径 + 占位图；后台需要补**上传/素材库**能力（见 §5）

### 1.3 表单/线索现状

- `CtaSection`（全站复用的「立即咨询」横幅）目前是**纯跳转**：`ctaHref` prop 渲染成链接（components/common/CtaSection.vue:84），无表单
- 页脚「联系我们」指向 `/contact`（data/footer.ts:92），**该路由当前不存在**（会被 `[...slug].vue` 兜底）
- 结论：线索收集是从零新建，不涉及改造存量表单

### 1.4 质量门禁对后台开发的约束

- 六件套：lint / typecheck / test / test:visual / harness:engineering / build
- **harness 是纯文本 includes 断言**：`data/news.ts` 等文件被 required-files.mjs 硬编码锁定（~285 个文件），内容迁移到数据库后这些文件要么保留为种子/回退数据源，要么同步改锁——**迁移必须同轮更新 harness + 契约**，否则门禁挂
- 测试无渲染库，全是数据断言 + 源码文本契约；数据改从 API 来之后，页面渲染逻辑需要补服务端 mock 或改断言方式

## 2. 目标架构（Nitro 同仓）

```
DeepTrolsWeb/
├── server/
│   ├── api/
│   │   ├── news.get.ts / news/[id].get.ts          # 公开读
│   │   ├── cases.get.ts / cases/[slug].get.ts      # 公开读
│   │   ├── reports.get.ts                          # 公开读
│   │   ├── leads.post.ts                           # 线索提交（公开写，唯一）
│   │   └── admin/**                                # 管理端 CRUD（鉴权）
│   ├── db/
│   │   ├── schema.ts                               # Drizzle 表定义
│   │   ├── client.ts                               # 连接池（runtimeConfig 注入）
│   │   └── seed.ts                                 # data/*.ts → 数据库迁移脚本
│   ├── plugins/                                    # Nitro plugin：连接初始化
│   └── utils/                                      # 鉴权、校验、限流
├── server/api/admin/ 或 pages/admin/**              # 管理界面（见 §4 决策点）
└── data/                                           # 保留：种子数据源 + 回退
```

- **同一 repo、同一部署单元**：Nitro 默认 preset `node-server` 即可跑 API + SSR，无需拆服务
- **runtimeConfig** 承载 `DATABASE_URL` 等私密配置（`NUXT_DATABASE_URL` 环境变量注入），不进代码
- 类型共享：`ArticleBlock` 等类型在 `types/` 下，server 与前端天然共用——这是同仓最大红利

## 3. 数据模型设计（PostgreSQL + Drizzle ORM）

推荐 **PostgreSQL + Drizzle**：TS 优先、schema 即代码、与 Nitro 集成轻（无需 Prisma 的引擎二进制，构建门禁无额外负担）。

```ts
// server/db/schema.ts 草案（与现有 TS interface 一一对应）
news         : id(serial) / title / summary / coverImage / category(enum) / publishedAt(date) / status(draft|published) / createdAt / updatedAt
news_details : newsId(FK 1:1) / blocks(jsonb)             // ArticleBlock[] 直接存 jsonb
cases        : id / slug(unique) / title / summary / image / solutionKey(enum) / status / timestamps
case_details : caseId(FK 1:1) / heroImage / blocks(jsonb) / relatedProducts(jsonb)
reports      : id / type(enum 6种) / category / solutionKey / title / summary / image / href / status / timestamps
leads        : id / name / company / phone / email / message / source(页面路径) / status(new|followed|closed) / createdAt
media_assets : id / filename / path / mime / size / createdAt    // 素材库（可选，见 §5）
```

设计要点：

- `blocks` 用 **jsonb** 存 `ArticleBlock[]`，写入时用 zod/valibot 按判别联合校验，前端渲染协议不变
- 列表与详情 1:1 拆分，沿用现有双文件心智；查询时 join 或分两次取
- 增加 `status` 草稿/发布字段（现有静态数据没有的概念，CMS 必需）
- `leads.source` 记录提交来源页面（产品页/方案页/页脚），便于线索归因
- 枚举值直接复用现有 union type（`NewsCategory` / `ReportSolutionFilterKey` / `ReportResourceType`），种子脚本零转换

## 4. 管理界面：三条路线（决策点）

| 路线 | 说明 | 成本 | 建议 |
|---|---|---|---|
| **A. 同仓轻量 admin** | `pages/admin/**` + Nitro session 鉴权 + 简单 CRUD 表单（block 编辑器按 6 种类型做结构化表单） | 中（~1-2 周） | ✅ 推荐：技术栈统一、无外部依赖、block 编辑器与 ArticleBlock 协议天然契合 |
| B. 无头 CMS（Directus/Strapi） | 独立部署一套，Nitro 只读它的 API | 低-中 | 内容团队重运营时考虑；引入额外运维单元，与「同仓」路线相悖 |
| C. 先无界面 | 只建库 + API，内容用 seed/SQL 维护 | 低 | 仅适合过渡期 |

**建议路线 A**，但分期：Phase 1 先落 C（库 + 公开 API + 种子迁移），Phase 3 再建 admin 界面，避免一次性摊子过大。

## 5. 表单/线索收集设计

- **入口改造**：新建 `/contact` 页（承载表单）+ CtaSection 增加可选表单模式；各产品/方案页 CTA 提交时带 `source` 标识
- **API**：`POST /api/leads`，zod 校验（手机号/邮箱格式、长度上限），**这是全站唯一公开写接口**，必须配：
  - 限流（Nitro 内基于 IP 的滑动窗口，server/utils 实现即可）
  - 蜜罐字段（honeypot）+ 提交间隔校验，防机器人
  - 失败不暴露内部错误，统一 200/400 语义
- **通知**：落库后异步发邮件（SMTP，runtimeConfig 配）或企业微信 webhook 推给销售；邮件地址复用 about 里的 contact@/product@
- **管理侧**：admin 里的线索列表 + 状态流转（new→followed→closed），是最小可用闭环

## 6. 图片/素材处理

现状是 `public/images/**` 静态文件 + 占位图。两条路：

- **起步**：后台只存图片 URL（沿用 public 目录，手动上传），零开发量
- **正式**：`POST /api/admin/media` 上传到 `public/uploads/`（node-server 本地盘）或对接对象存储（OSS/COS），`media_assets` 表登记。企业官网体量小，本地盘足够

## 7. 部署与配置变化

| 项 | 现状 | 后台后 |
|---|---|---|
| 产物 | `.output`（Nitro node-server） | 不变，仍是单进程 Node |
| 环境变量 | 无 | `NUXT_DATABASE_URL`、`NUXT_SESSION_SECRET`（admin 鉴权）、SMTP/webhook 配置 |
| 数据库 | 无 | PostgreSQL 实例（开发期可 docker-compose 本地起） |
| 迁移 | 无 | Drizzle Kit migrate，CI 加一步；seed 脚本从 `data/*.ts` 导入 |
| 缓存 | 无 | 公开读接口配 Nitro routeRules（如 `swr: 60`），内容低频变更，收益明显 |

## 8. 分期路线建议

- **Phase 1（数据底座）**：PostgreSQL + Drizzle schema + 连接插件 + seed 迁移脚本（data/*.ts → 库）+ 公开读 API×3 + 前端新闻/案例/报告页切换 useFetch（保留静态 import 作回退）+ harness/契约同步改造
- **Phase 2（线索闭环）**：/contact 页 + leads API（校验/限流/蜜罐）+ 通知 + CtaSection 表单模式
- **Phase 3（管理界面）**：admin 鉴权（session）+ 内容 CRUD + block 结构化编辑器 + 素材上传 + 线索管理

每 Phase 独立过六件套门禁；Phase 1 风险最高（动数据层与 harness 锁），建议先以**新闻一个实体**做全链路试点（库→API→页面→门禁），跑通后再复制到案例/报告。

## 9. 风险清单

1. **harness 文本锁连锁**：required-files.mjs 与 checks 锁定 data/*.ts 内容形态，Phase 1 切换时大面积断言要改——务必同轮处理，先试点再铺开
2. **SSR/SSG 形态**：若未来要走纯静态导出（nitro prerender），API 化后需在构建期预取或保留静态回退；当前 node-server 无此问题
3. **公开写接口安全**：leads 是唯一攻击面，限流/蜜罐/校验三件套必须在 Phase 2 内闭环，不可后置
4. **ArticleBlock 校验**：jsonb 入口必须严格按判别联合校验，非法 block 会导致前端渲染分支报错（模板禁止裸 v-else 的约定同样适用）
5. **双数据源漂移**：迁移期 data/*.ts 与库并存，seed 脚本要幂等（upsert by id/slug），并以库为准、静态文件冻结
