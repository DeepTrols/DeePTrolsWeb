# TASK-007.1：博曜·企业级知识管理平台产品页
---
* TaskName：博曜·企业级知识管理平台产品页
* TaskDescription：根据 BOYAO 产品需求文档完成 `/products/knowledge-base` 页面，实现 Hero（统计条 + 知识流转动画）、挑战、核心价值、统一知识架构、核心能力占位、六大功能、系统集成、解析能力（精准/高效/稳定）与 CTA。
* TaskCreator：Claude
* TaskCreationTime：2026-08-12
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-007.1 |
| Epic | EPIC-007 |
| 状态   | Review   |
| 优先级  | P0       |
| 负责人  | Claude    |

---
## 任务目标
1. 创建 `/products/knowledge-base` 路由（导航入口已存在于 `data/navigation.ts`）。
2. 严格按照 `doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/BOYAO.md` 实现页面结构与文案。
3. Hero 使用公共 `PageHero`，actions 下方插入三项统计条，右侧视觉 1:1 复刻参考页面的知识流转动画（布局、坐标、配色、动画时长与延迟不变，文字与 icon 替换为知识主题）。
4. 将核心价值板块的卡片结构抽离为公共组件（`ProductValueSection` / `ValueCard` / `IsoCube`）。
5. 架构图与系统集成板块使用 `ProductSystemFlowFrame`，flow 暂不传入。
6. 核心能力板块仅提供占位。
7. 精准/高效/稳定板块使用文字 + 图片占位符的交替布局。
8. CTA 使用公共 `CtaSection`。
9. 样式统一通过 Tailwind CSS v4（keyframes 通过 `assets/css/tailwind.css` @theme 注册），不新增页面级自定义样式文件。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/BOYAO.md`
- `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/博曜logo.svg`

---
## 实现内容
1. `PageHero.vue` 新增 `after-actions` 插槽（向后兼容），新增 `components/common/HeroStatsStrip.vue` 统计条组件（70%+ 运营效率提升 / 50%+ 检索效率提升 / 200+ 服务客户）。
2. `assets/css/tailwind.css` @theme 注册动画 tokens：`iso-float`、`value-item`、`dest-node`、`pulse-bar`、`pulse-dot`。
3. 新增公共组件：`components/common/IsoCube.vue`（CSS 3D 等距立方体，lg/sm 两档）、`components/common/card/ValueCard.vue`（split/stack 双布局 + metrics/quote）、`components/common/ProductValueSection.vue`。
4. 新增 `data/boyao.ts`：博曜 logo 引用（`博曜logo.svg?url`）、Hero 统计、四项挑战、三张核心价值卡、六项功能、精准/高效/稳定展示、核心能力节点与 CTA 数据。
5. 新增 `components/product/boyao/` 组件：
   - `BoyaoHero.vue` + `BoyaoHeroVisual.vue`：neuron 风格知识流转动画（企业知识资产 → 博曜平台三能力卡 → 智能应用/企业场景），保留原布局坐标、蓝紫配色、双 SVG 流光圆点、涟漪与脉冲锚点。
   - `BoyaoCoreValueSection.vue` + `BoyaoEfficiencyVisual.vue` / `BoyaoIntegrationVisual.vue` / `BoyaoApplicationVisual.vue`：三张价值卡动画（知识汇入 IsoCube、解析·抽取·建模分流至知识库/知识图谱/知识应用、3秒获取知识 + ≥50% 检索效率提升）。
   - `BoyaoArchitectureSection.vue` / `BoyaoIntegrationSection.vue`：`ProductSystemFlowFrame` 占位。
   - `BoyaoCapabilitySection.vue`：占位面板。
   - `BoyaoShowcaseSection.vue`：精准/高效/稳定交替图文（图片占位符）。
6. 新增 `pages/products/knowledge-base.vue` 页面与 SEO meta。
7. 新增 `tests/boyao-content.spec.ts` 内容契约测试（导航入口、统计条、挑战、价值卡、能力节点、功能、展示、CTA、logo 资产）。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [ ] 响应式正常（已按 Tailwind 断点实现，待浏览器验收）
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/PageHero.vue` | 新增 after-actions 插槽 |
| `components/common/HeroStatsStrip.vue` | 新增 Hero 统计条组件 |
| `components/common/IsoCube.vue` | 新增等距立方体公共组件 |
| `components/common/card/ValueCard.vue` | 新增核心价值卡片公共组件 |
| `components/common/ProductValueSection.vue` | 新增核心价值板块公共组件 |
| `assets/css/tailwind.css` | 注册动画 keyframes tokens |
| `data/boyao.ts` | 新增博曜页面内容数据 |
| `components/product/boyao/*` | 新增博曜产品页区块组件 |
| `pages/products/knowledge-base.vue` | 新增产品页路由 |
| `tests/boyao-content.spec.ts` | 新增内容契约测试 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/BOYAO.md` | 纳入需求文档 |
| `doc/tasks/review/TASK-007.1-boyao-knowledge-base-page.md` | 任务文档（由 in-progress/ 移入） |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | ✅ 通过 |
| `pnpm typecheck` | ✅ 通过 |
| `pnpm test` | ✅ 8 个文件 41/41 通过 |
| `pnpm test:visual` | ✅ 9/9 通过 |
| `pnpm harness:engineering` | ✅ 通过 |
| `pnpm build` | ✅ 构建成功 |

---
## 既有在途修改处理
任务开始前工作区已存在 `components/product/ddp/DdpHero.vue` 的改名修改（`title-gradient` 由「标签生产平台」→「数据开发平台」，DDP.md 原文为 DLP 复制粘贴笔误）。该改名导致 `tests/visual.spec.ts` 与 `scripts/harness-check.mjs` 中的 DDP 断言失败，阻塞本任务质量门。已单独提交 `fix(TASK-006.3)` 同步更新断言与 DDP.md，使全部质量门通过；DLP 侧「标签生产平台」保持不变。

另有任务前已存在的未跟踪文件与本任务无关，未纳入提交：`components/common/AgentComposer.vue`、`doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/icon——logo.svg`、`doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/imgs/custom-rad-hero-bg-video.mp4`（BOYAO.md 未引用）。

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-007.1): implement boyao knowledge base product page |
| Commit Hash    | （待回填） |

## 完成说明
已按 BOYAO.md 完成 `/products/knowledge-base` 页面：PageHero（BookOpen 徽章 + 统计条 + neuron 风格知识流转动画）、四项挑战、三张核心价值卡（业务效率/知识整合/知识应用，含 IsoCube 价值动画，卡片结构已抽离为公共组件）、架构图与系统集成占位、核心能力占位、六大功能、精准/高效/稳定交替展示、CtaSection。全部新增样式为 Tailwind CSS v4 utility，keyframes 经 @theme 注册；内容契约测试与质量门全部通过。响应式与动画细节待浏览器验收。
