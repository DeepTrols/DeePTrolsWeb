# TASK-002.7：工程审计整改与公共抽象优化
---
* TaskName：工程审计整改与公共抽象优化
* TaskDescription：根据 `PROJECT_AUDIT_2026-08-21.md` 执行工程优化，拆分巨型测试与 Harness，抽象产品架构区块与 HeroVisual primitives，清理空样式和疑似未使用组件，建立资产边界。
* TaskCreator：Codex
* TaskCreationTime：2026-08-21
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-002.7 |
| Epic | EPIC-002 |
| 状态   | Review |
| 优先级  | P1 |
| 负责人  | Codex |

---
## 任务目标
在不改变 HOME、Why DeepTrols 与产品页视觉输出的前提下，完成一次工程维护性优化，降低重复代码和后续页面开发偏差风险。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/PROJECT_AUDIT_2026-08-21.md`
- `doc/engineering/ASSET_BOUNDARY.md`

---
## 实现内容
1. 拆分 `tests/visual.spec.ts`，保留统一入口，按页面/模块拆出 visual contract。
2. 拆分 `scripts/harness-check.mjs`，建立 Harness 上下文、资源读取、检查模块。
3. 新增可复用产品架构区块，收敛产品页架构区块重复模板。
4. 新增 HeroVisual primitives，为后续产品 Hero 视觉提供统一外壳与面板原子组件。
5. 清理空 `<style>` 与疑似未使用组件。
6. 建立资产边界文档，明确 `public/`、`assets/`、`doc/product/**/imgs` 的使用规则。

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

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `tests/visual.spec.ts` | 保留 visual contract 聚合入口 |
| `tests/visual/**` | 按 core、site、product-data、product-aiiot 拆分 visual contract |
| `scripts/harness-check.mjs` | 保留 Harness 聚合入口 |
| `scripts/harness/**` | 拆分 required files、source loader、Design/Home/Why/Product/Style 检查模块 |
| `components/common/ProductArchitectureSection.vue` | 新增产品架构公共区块 |
| `components/common/hero-visual/HeroVisualShell.vue` | 新增 HeroVisual 外壳 primitive |
| `components/common/hero-visual/HeroVisualPanel.vue` | 新增 HeroVisual 面板 primitive |
| `components/product/**/Architecture*.vue` | 迁移产品架构区块到 `ProductArchitectureSection` |
| `components/product/tanyao/TanyaoSolutionSection.vue` | 迁移解决方案区块到 `ProductArchitectureSection` |
| `components/product/dgp/DgpHeroVisual.vue` | 接入 `HeroVisualShell` |
| `components/common/AgentComposer.vue` | 删除未引用遗留组件 |
| `components/home/**`、`components/why/**` | 清理空 `<style scoped lang="scss"></style>` |
| `assets/images/**` | 建立运行时图片资产目录并迁移品牌/兼容性/Why 图片 |
| `data/why.ts`、`data/tanyao.ts`、`data/boyao.ts` | 运行时图片导入改为 `assets/images/**` |
| `doc/engineering/ASSET_BOUNDARY.md` | 新增资产边界规范 |
| `AGENTS.md`、`doc/engineering/HARNESS_ENGINEERING.md`、`doc/engineering/COMMON_SECTION_COMPONENTS.md`、`doc/engineering/COMPONENT_REFINEMENT_AUDIT.md` | 同步工程规范与公共组件文档 |
| `tests/*content.spec.ts` | 同步资产边界相关断言 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | 未提交：当前工作区存在任务前 Device Agent 相关未提交改动，避免混入本次工程优化 |
| Commit Hash    | 未提交 |

## 完成说明
已完成审计整改优化：

1. `tests/visual.spec.ts` 从巨型文件拆为聚合入口和页面/模块级 contract，visual contract 从 27 条细化为 34 条。
2. `scripts/harness-check.mjs` 拆为聚合入口和 `scripts/harness/**` 检查模块。
3. 新增 `ProductArchitectureSection`，DGP/DLP/DDP/DMS/Tanyao/Boyao/Device Agent 架构或解决方案区块已迁移。
4. 新增 `HeroVisualShell` / `HeroVisualPanel` primitives，并在 DGP Hero Visual 中接入。
5. 删除未引用 `AgentComposer.vue`，清理空 style。
6. 建立 `ASSET_BOUNDARY.md`，运行时代码不再直接导入 `doc/product/**/imgs`。

测试结果：

- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：通过，10 files / 82 tests
- `pnpm test:visual`：通过，34 tests
- `pnpm harness:engineering`：通过
- `pnpm build`：通过；仍存在 Nuxt/Vite CSS 优化 warning 与 plugin timings warning，非本任务新增阻断
