# TASK-006.7：数曜·数据治理平台企业级治理能力动画
---
* TaskName：DGP 企业级数据治理三组核心能力动画
* TaskDescription：将企业级数据治理交替图文区的三个图片占位符替换为多源接入、质量治理、资产服务动画。
* TaskCreator：User
* TaskCreationTime：2026-09-21

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-006.7 |
| Epic | EPIC-006 |
| 状态 | Done |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
在不改变现有 Section 标题、间距、文案和左右交替布局的前提下，以统一状态机和固定高度面板呈现三项数据治理能力。

## 前置文档
- `AGENTS.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/DGP.md`
- `$product-capability-animation`

## 实现内容
1. 多源数据统一接入：四数据源、动态连接提示、冲突状态、接入 Stepper 和目录输出。
2. 数据标准与质量治理：三类数据表、三类异常、质量分数变化和治理 Stepper。
3. 数据资产沉淀与服务：资产目录、血缘关系、审批 Stepper 和 API 发布结果。
4. 复用 `useRuntimeTimeline` 的循环时间轴与 1.2 秒终态停留。
5. 使用 Tailwind CSS v4、Lucide Icon 和既有 Design Token，不新增私有样式。
6. 更新视觉契约、Harness 和 DGP 产品需求文档。

## 验收标准
- [x] 三组动画完成并接入原有交替布局
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过

## 修改文件
| 文件 | 说明 |
|---|---|
| `components/product/dgp/DgpEvolutionSection.vue` | 用核心能力动画替换占位符 |
| `components/product/dgp/evolution/*` | 三组动画及视觉分发组件 |
| `tests/visual/product-data/dgp.contract.ts` | 更新视觉契约 |
| `scripts/harness/checks/product-data/dgp.mjs` | 更新 Harness 约束 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/DGP.md` | 同步动画要求 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | `dev` |
| Commit Message | `feat(TASK-006.7): add DGP governance capability animations` |
| Commit Hash | 见 Git 历史 |

## 完成说明
三组动画已接入既有左右交替布局，均保持固定高度和完整挂载状态；桌面页面实测无溢出或布局跳动。`pnpm lint`、`pnpm typecheck`、137 项测试、55 项视觉契约、Harness Engineering 与生产构建均通过。构建仍报告仓库既有的 Tailwind 任意值解析警告，本任务未新增相关表达式。
