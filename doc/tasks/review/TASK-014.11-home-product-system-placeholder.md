# TASK-014.11：首页产品体系架构占位修正
---
* TaskName：首页产品体系架构占位修正
* TaskDescription：用户澄清“去掉流程图”不是移除整个产品体系架构展示区域，而是参考数据治理平台的产品架构保留占位符；首页产品体系需要渲染架构占位框，但不得恢复旧 VueFlow 流程图。
* TaskCreator：Olly
* TaskCreationTime：2026-09-08
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.11 |
| Epic | EPIC-HOME |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
首页 `product-system__content` 中恢复产品架构展示位置，使用公共 `ProductSystemFlowFrame` 显示占位符；不挂载旧 `HomeProductSystemFlow`、`HomeProductSystemMobileFlow` 或 `EnterpriseFlow`。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`
- `components/product/dgp/DgpArchitecture.vue`

---
## 实现内容
1. 在 `HomeProductSystem` 中引入 `ProductSystemFlowFrame`。
2. 在四个产品卡片前新增产品架构图占位框，复用数据治理平台同源公共占位外壳。
3. 更新首页视觉契约、核心契约和 Harness 首页检查，要求保留占位框但禁止恢复旧流程图组件。
4. 更新 HOME 页面需求与 HOME 基准文档，澄清“占位保留、旧图移除”的当前约束。

---
## 验收标准
- [x] 首页产品体系区域展示产品架构占位符
- [x] 首页不挂载旧 `HomeProductSystemFlow`
- [x] 首页不挂载旧 `HomeProductSystemMobileFlow`
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/home/HomeProductSystem.vue` | 新增公共产品架构占位框。 |
| `tests/**` | 更新首页产品体系占位契约。 |
| `scripts/harness/checks/home-layout.mjs` | 更新 Harness 首页检查。 |
| `doc/engineering/HOME_PAGE_BASELINE.md` | 更新 HOME 基准。 |
| `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md` | 更新 HOME 页面需求。 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | fix(TASK-014.11): restore home product architecture placeholder |
| Commit Hash    | 见最终 Git 提交记录 |

## 完成说明
已在首页产品体系区块中恢复产品架构展示位置，复用 `ProductSystemFlowFrame` 渲染“产品架构图占位符”。旧 `HomeProductSystemFlow`、`HomeProductSystemMobileFlow` 与 `EnterpriseFlow` 仍保持未挂载，流程图后续可基于占位区域重新设计。

验证记录：
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm harness:engineering`
- `pnpm build`（通过，保留既有 Tailwind 生成 CSS warning）
- 本地 Nuxt dev：`http://127.0.0.1:3104` SSR 请求确认首页输出 `product-system-flow-frame` 与“产品架构图占位符”，未输出旧 Flow 或 `CUSTOMER STORIES`。
