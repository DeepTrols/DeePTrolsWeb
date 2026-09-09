# TASK-014.9：PageHero CTA 统一为首页 home-hero__cta
---
* TaskName：PageHero CTA 统一为首页 home-hero__cta
* TaskDescription：所有页面 PageHero 中的 CTA 与首页 `home-hero__cta` 视觉一致，且只保留一个「免费获取专属方案」按钮，去掉其余 CTA（申请试用/了解更多/关于我们等）与 `actions` 入参。
* TaskCreator：Olly
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.9 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P1       |
| 负责人  | Claude   |

---
## 任务目标
1. PageHero 渲染与首页 `home-hero__cta` 完全一致的按钮：277×47、`linear-gradient(90deg, #1e44e0, #6583ff)`、白字 16px、`Source Han Sans CN`、箭头装饰（横线 + 45° 折角）、hover 上浮 + 阴影 + 饱和度提升、`prefers-reduced-motion` 降级。
2. CTA 固定为「免费获取专属方案」→ `/contact`，由 PageHero 内部渲染；页面不再传入 `actions`。
3. 页面底部 `CtaSection` 的 actions（咨询合作/申请试用等）不受影响。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- 首页 CTA 基线：`components/home/HomeHero.vue` `.home-hero__cta`

---
## 实现内容
1. `components/common/PageHero.vue`：删除 `PageHeroAction` 接口、`actions` prop 与 `BaseButton` 依赖；`.page-hero__actions` 内固定渲染 `NuxtLink.page-hero__cta`（文案 span + `page-hero__cta-arrow` span）。
2. `assets/scss/components/_page-hero.scss`：新增 `.page-hero__cta`、`.page-hero__cta-arrow`（::before 横线 / ::after 折角）与 hover、reduced-motion 规则，取值与 `home-hero__cta` 一致。
3. 移除各调用方 actions：WhyHero、DgpHero、TanyaoHero、BoyaoHero、DlpHero、DdpHero、DmsHero、DeviceAgentHero、SolutionPageTemplate；删除 `data/{dlp,ddp,dms}.ts` 的 `*HeroActions`、`data/solutions/use-cases.ts` 的 `heroActions` 与 `types/solution-template.ts` 的 `SolutionTemplateHero.actions`。
4. 契约同步：
   - `tests/visual/site/why.contract.ts`、`tests/visual/site/about.contract.ts`（PageHero CTA 锁 + 禁 BaseButton）
   - `tests/visual/product-aiiot/device-agent-base.contract.ts`（`:actions="[]"` → 不含 `:actions`）
   - `tests/{dlp,ddp,dms}-content.spec.ts`（删除 heroActions 断言）、`tests/solution-use-cases.spec.ts`（删除 hero.actions 断言）
   - `scripts/harness/checks/why-page.mjs`、`about-page.mjs`、`product-aiiot/device-agent-base.mjs`
5. 文档同步：`doc/engineering/COMMON_SECTION_COMPONENTS.md`（Hero CTA 基线）、`doc/product/PAGE_REQUIREMENTS/SOLUTIONS/USE_CASES.md`（Hero CTA 说明）。

---
## 验收标准
- [x] 所有 PageHero 页面只渲染一个「免费获取专属方案」CTA，视觉与首页一致
- [x] 页面底部 CtaSection 不变
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] 测试通过
- [x] Visual contract 通过
- [x] Harness Engineering 检查通过
- [x] Build 成功

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/PageHero.vue` | 统一 CTA 渲染，删除 actions prop。 |
| `assets/scss/components/_page-hero.scss` | `.page-hero__cta` 与箭头样式。 |
| `components/{why,product/*,solution}/**` | 移除 actions 入参与 heroActions 数据。 |
| `data/{dlp,ddp,dms}.ts`、`data/solutions/use-cases.ts`、`types/solution-template.ts` | 删除 hero actions 数据与类型。 |
| `tests/**`、`scripts/harness/checks/**` | 契约同步。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md`、`doc/product/PAGE_REQUIREMENTS/SOLUTIONS/USE_CASES.md` | 文档同步。 |
| `scripts/harness/required-files.mjs` | 登记本任务文档。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm harness:engineering`
- `pnpm build`

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | `feat(TASK-014.9): unify PageHero CTA with HOME hero CTA` |
| Commit Hash    |    |

## 完成说明
已完成 PageHero CTA 统一改造与契约同步，等待 Review。
