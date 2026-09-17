# TASK-014.29：数据标签平台架构 Demo
---
* TaskName：数据标签平台架构 Demo
* TaskDescription：按 EMQX Edge 参考结构还原独立 Vue Flow Demo，并替换为数据标签平台业务内容。
* TaskCreator：Codex
* TaskCreationTime：2026-09-17
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.29 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0 |
| 负责人  | Codex |

---
## 任务目标
以独立 Demo 形式 1:1 复现参考架构图的布局、节点、动态连线与视觉样式，仅按需求替换业务文案和图标，不接入现有页面。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- 用户提供的 EMQX Edge DOM 参考

---
## 实现内容
1. 新增数据标签平台架构 Vue Flow 组件。
2. 保留参考图的网格背景、顶部命名空间、节点坐标、卡片尺寸与动态 Edge。
3. 替换五个数据源、标签加工、标签治理及标签资产中心内容和图标。
4. 新增独立 Demo 路由，不接入业务页面。

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
| `components/demo/TagPlatformArchitectureDemo.client.vue` | Demo 画布、顶部命名空间与背景 |
| `components/demo/tag-platform/TagPlatformArchitectureFlow.client.vue` | Vue Flow 节点、坐标与连线配置 |
| `components/demo/tag-platform/TagPlatformArchitectureNode.vue` | 数据源、加工治理和资产中心节点 |
| `components/demo/tag-platform/TagPlatformArchitectureEdge.vue` | 渐变动态 Edge |
| `pages/demo/tag-platform-architecture.vue` | 独立演示路由 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | dev |
| Commit Message | feat(TASK-014.29): add tag platform architecture demo |
| Commit Hash    | `b89b4b7` |

## 完成说明
已完成独立数据标签平台架构 Demo，未接入任何业务页面。保留参考结构的 640px 画布、径向背景、节点坐标、卡片尺寸、圆角、阴影和动态连线，仅替换需求指定的内容及图标。后续按验收意见移除方格背景与顶部命名空间浮层，并将画布宽度统一为 `emqx-platform-architecture` 使用的 1600px，同时重新校准 Flow 横向居中位置。

验证结果：
- `pnpm typecheck`：通过
- `pnpm lint`：通过
- `pnpm test`：19 个测试文件、130 项测试通过
- `pnpm test:visual`：48 项测试通过
- `pnpm harness:engineering`：通过
- `pnpm build`：通过（保留项目既有 Tailwind CSS 优化警告）
- 浏览器验证：`/demo/tag-platform-architecture` 可正常访问
