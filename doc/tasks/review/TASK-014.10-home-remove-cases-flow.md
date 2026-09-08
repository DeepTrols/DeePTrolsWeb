# TASK-014.10：首页移除客户故事与产品体系流程图
---
* TaskName：首页移除客户故事与产品体系流程图
* TaskDescription：删除首页 `CUSTOMER STORIES` section，并从 `product-system__content` 中移除当前流程图，流程图后续重新设计。
* TaskCreator：Olly
* TaskCreationTime：2026-09-08
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.10 |
| Epic | EPIC-HOME |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
首页不再展示客户故事区块；产品体系区块保留标题、布局和四个产品卡片，暂不渲染桌面或移动端流程图。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`

---
## 实现内容
1. 从首页页面组合中移除 `HomeCases`。
2. 从 `HomeProductSystem` 中移除 `HomeProductSystemFlow` 与 `HomeProductSystemMobileFlow` 挂载。
3. 同步首页视觉契约、Harness 首页检查与内容契约，避免继续要求旧流程图和客户故事区块。
4. 更新 HOME 页面需求与 HOME 基准文档，记录当前首页结构。

---
## 验收标准
- [x] 首页不再渲染 `CUSTOMER STORIES` section
- [x] `product-system__content` 中不再渲染流程图
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
| `pages/index.vue` | 移除首页 `HomeCases` 区块。 |
| `components/home/HomeProductSystem.vue` | 移除产品体系流程图挂载，只保留产品卡片。 |
| `tests/**` | 更新首页结构契约。 |
| `scripts/harness/checks/home-layout.mjs` | 更新 Harness 首页检查。 |
| `doc/engineering/HOME_PAGE_BASELINE.md` | 更新 HOME 基准。 |
| `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md` | 更新 HOME 页面需求。 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | fix(TASK-014.10): remove home cases and product flow |
| Commit Hash    | 见最终 Git 提交记录 |

## 完成说明
已从首页组合中移除 `HomeCases`，并从 `HomeProductSystem` 中移除桌面与移动端流程图挂载。首页产品体系当前只渲染公共 section 与四个产品卡片；流程图保留为后续重新设计事项。

验证记录：
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm harness:engineering`
- `pnpm build`（通过，保留既有 Tailwind 生成 CSS warning）
- 本地 Nuxt dev：已有同项目服务 `http://127.0.0.1:3104`，SSR 请求确认首页不再包含 `CUSTOMER STORIES`、`product-system__mobile-flow`、`vue-flow`，并仍包含产品体系、Insights、CTA 标题。
