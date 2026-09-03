# TASK-012.1：P0 审计修复（视频优化 + 死链修复 + 路由统一）
---
* TaskName：P0 审计修复（视频优化 + 死链修复 + 路由统一）
* TaskDescription：2026-09-03 全项目审计发现三类 P0 产品/性能问题：首页自动加载 26MB 未压缩视频；首页"算力中心"卡片链接 `/solutions/compute` 为 404；页脚与导航路由大面积不一致。本任务仅修复 P0 项。
* TaskCreator：Codex
* TaskCreationTime：2026-09-03
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-012.1 |
| Epic | EPIC-012 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

---
## 任务目标
1. 压缩并重命名首页背景视频（26MB → ≤2MB），改为 `preload="metadata"` 按需播放，消除首屏自动全量加载。
2. 新增 `/solutions/compute` 解决方案页，修复首页"算力中心"卡片 404，并修复导航 FDE 两个硬 404。
3. 统一页脚路由至导航/实际页面路由，修复至少 3 个确定死链及多处错误链接，统一文案（智慧环保/智慧水利）。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/USE_CASES.md`

---
## 实现内容
1. 使用 ffmpeg 将 `花瓣素材_+暖蓝光泄漏背景可循环_465316undefined (1) 2.mp4`（26MB）压缩为 `public/videos/home-hero-bg.mp4`（≤2MB，1080p、libx264、去音轨、faststart），并 `git rm` 旧文件（不重写 Git 历史）。
2. `pages/index.vue` 视频改为 `preload="metadata"`，移除 `autoplay` 属性，通过模板引用在 `onMounted` 中按需播放；保留 `home-hero-deliverables__video` 类名与 mask 结构，不使用内联样式。
3. 同步契约：`tests/visual/core.contract.ts` 更新资产名并断言新视频文件存在；`scripts/harness/required-files.mjs` 登记新视频文件。
4. `data/solutions/use-cases.ts` 新增 `compute` slug 与 seed（energy 之后、data-governance 之前），数据驱动生成 `/solutions/compute` 页面，无需新增组件/页面；内容围绕海外 AI 服务器供应、算力中心建设与交付。
5. 路由四处登记同步：`data/navigation.ts`、`data/footer.ts`、`scripts/harness/checks/solution-use-cases.mjs`、`tests/solution-use-cases.spec.ts`、`doc/product/PAGE_REQUIREMENTS/SOLUTIONS/USE_CASES.md`。
6. 修复导航 FDE 两个硬 404：`/solutions/opc-platform`、`/solutions/enterprise-ai-delivery` 改为 `/services/opc-platform`、`/services/enterprise-ai-delivery`，落入 `[...slug].vue` noindex 占位页。
7. 页脚路由统一（页脚 → 导航/实际页面）：
   - `/products/knowledge-management` → `/products/knowledge-base`
   - `/products/ai-iot-perception` → `/products/ai-iot`
   - `/products/api-security-control` → `/products/api-security`
   - `/products/api-security-audit` → `/products/api-audit`
   - `/products/business-threat-sensing` → `/products/threat-sensing`
   - `/industries/transportation-logistics` → `/industries/logistics`
   - `/industries/government-public-sector` → `/industries/public-sector`
   - `/industries/financial-services` → `/industries/finance`
   - `/community/agents` → `/community`
   - `/about` → `/about_us`
   - 文案统一：页脚 `智能环保`→`智慧环保`、`智能水利`→`智慧水利`。
8. 同步页脚视觉契约：`tests/visual/site/home/footer.contract.ts` 锁定了旧文案 `智能环保`/`智能水利`（审计时漏判），随文案统一更新断言并补充 `算力中心`；`HOME.md`、`HOME_PAGE_BASELINE.md` 同步资产路径与文案。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过

验收细节：
- 首页视频正常循环播放，`preload="metadata"`，文件 ≤2MB。
- 首页"算力中心"卡片 → `/solutions/compute` 页面完整渲染（Hero/Stats/八大区块）。
- 导航"解决方案"菜单出现"算力中心"项；页脚"使用场景"同步。
- 页脚链接均指向真实页面或 noindex 占位页，无 404。
- `pnpm lint && pnpm typecheck && pnpm test && pnpm harness:engineering && pnpm build` 全绿。

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `public/videos/home-hero-bg.mp4` | 新增：压缩后的首页背景视频（替换 26MB 原始素材）。 |
| `pages/index.vue` | 视频改为 `preload="metadata"` + 按需播放，替换资产路径。 |
| `tests/visual/core.contract.ts` | 更新视频资产契约并断言新文件存在。 |
| `scripts/harness/required-files.mjs` | 登记新视频与任务文档为必需文件。 |
| `data/solutions/use-cases.ts` | 新增 `compute` slug、路由与 seed。 |
| `data/navigation.ts` | 应用场景列新增"算力中心"；修复 FDE 两个 404 链接。 |
| `data/footer.ts` | 使用场景组新增"算力中心"；修复 10 处死链；统一文案。 |
| `scripts/harness/checks/solution-use-cases.mjs` | `useCaseRoutes` 登记 `/solutions/compute`。 |
| `tests/solution-use-cases.spec.ts` | `expectedUseCases` 登记 compute。 |
| `doc/product/PAGE_REQUIREMENTS/SOLUTIONS/USE_CASES.md` | Pages 表新增算力中心行。 |
| `tests/visual/site/home/footer.contract.ts` | 同步页脚契约：智慧环保/智慧水利 文案与算力中心断言。 |
| `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md` | 同步页脚文案、算力中心条目与视频资产路径。 |
| `doc/engineering/HOME_PAGE_BASELINE.md` | 首页基线视频资产路径更新为 `public/videos/home-hero-bg.mp4`。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm harness:engineering`
- `pnpm build`
- `du -h public/videos/home-hero-bg.mp4`（≤2MB）

## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `perf(TASK-012.1): compress and rename home hero background video` / `feat(TASK-012.1): add compute solution use case page` / `fix(TASK-012.1): align footer links with navigation routes` |
| Commit Hash |  |

## 完成说明
已完成三项 P0 修复，分 3 个 commit 提交，等待用户确认后 push（远程为共享仓库）。
