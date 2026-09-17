# TASK-014.30：数据要素监管架构 Demo
---
* TaskName：数据要素监管架构 Demo
* TaskDescription：按 EMQX 车联网解决方案参考结构还原独立 Vue Flow Demo，并替换为数据要素监管业务内容。
* TaskCreator：Codex
* TaskCreationTime：2026-09-17
---

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.30 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
以独立 Demo 形式 1:1 复现参考架构图的布局、卡片与动态连线，仅替换需求指定的数据要素监管内容，不接入现有业务页面。

## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- 用户提供的 EMQX 车联网架构 DOM 参考

## 实现内容
1. 新增数据要素监管架构 Vue Flow 组件。
2. 保留参考图 480px 高度、节点尺寸、核心卡片与右侧分组样式。
3. 使用统一 1704px 内部画布，增加连接区宽度并保持整体居中。
4. 不渲染参考图格子背景。
5. 新增独立 Demo 路由，不接入业务页面。

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
| `components/demo/RegulationArchitectureDemo.client.vue` | 1704px 独立 Demo 画布 |
| `components/demo/regulation/RegulationArchitectureFlow.client.vue` | Vue Flow 节点、坐标与业务数据 |
| `components/demo/regulation/RegulationArchitectureNode.vue` | 监管对象、平台核心与输出分组节点 |
| `components/demo/regulation/RegulationArchitectureEdge.vue` | 输入与输出动态渐变 Edge |
| `pages/demo/data-regulation-architecture.vue` | 独立演示路由 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.30): add data regulation architecture demo |
| Commit Hash | |

## 完成说明
已完成独立数据要素监管架构 Demo，未接入任何业务页面。保留参考结构的 480px 高度、220px 输入节点、480px 核心卡片、320px 输出分组卡片、内部字号、圆角、虚线叠层、阴影和动态连线；按需求替换全部监管业务内容及图标。画布使用统一 1704px 基准，流程主体居中且连接区较参考结构加宽，不渲染格子背景。

验证结果：
- `pnpm typecheck`：通过
- `pnpm lint`：通过
- `pnpm test`：19 个测试文件、130 项测试通过
- `pnpm test:visual`：48 项测试通过
- `pnpm harness:engineering`：通过
- `pnpm build`：通过（保留项目既有 Tailwind CSS 优化警告）
- 浏览器验证：`/demo/data-regulation-architecture` 可正常访问
