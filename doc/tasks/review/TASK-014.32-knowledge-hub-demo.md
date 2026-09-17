# TASK-014.32：博曜知识中枢架构 Demo
---
* TaskName：博曜知识中枢架构 Demo
* TaskDescription：按 EMQX 数据中心参考结构还原独立 Vue Flow Demo，仅替换为博曜知识中枢指定内容。
* TaskCreator：User
* TaskCreationTime：2026-09-17
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.32 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
建立不接入业务页的博曜知识中枢架构 Demo，保留参考图的四段式流程、节点层级、动态连线、卡片比例与 1704px 统一内部画布。

## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- 用户提供的 EMQX 参考 DOM 与文案替换要求

## 实现内容
1. 新增博曜知识中枢 Vue Flow 及动态 Edge。
2. 左侧展示业务系统、文档资料、数据资产、外部知识及对应知识来源。
3. 中间展示「博曜 · 知识加工」与「博曜 · 知识中枢」的分层节点。
4. 右侧展示智能知识应用、知识智能与知识运营。
5. Demo 不渲染格子背景，不接入任何业务页面。

## 验收标准
- [x] 功能完成
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
| `components/demo/KnowledgeHubDemo.client.vue` | Demo 画布容器 |
| `components/demo/knowledge-hub/*` | 节点、连线与 Flow 实现 |
| `pages/demo/knowledge-hub.vue` | 独立 Demo 路由 |
| `tests/visual/demo-knowledge-hub.contract.ts` | 视觉契约 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | `dev` |
| Commit Message | `feat(TASK-014.32): add knowledge hub architecture demo` |
| Commit Hash | 待提交 |

## 完成说明
已完成独立博曜知识中枢架构 Demo，左侧知识来源、中间知识加工与知识中枢、右侧三类知识应用保持四段式布局，动态 Edge 与 1704px 画布已通过契约和浏览器验收。Demo 未接入业务页面。
