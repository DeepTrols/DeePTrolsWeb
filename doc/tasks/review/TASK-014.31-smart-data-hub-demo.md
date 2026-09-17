# TASK-014.31：数曜数据开发平台 Smart Data Hub Demo
---
* TaskName：数曜数据开发平台 Smart Data Hub Demo
* TaskDescription：按 EMQX Smart Data Hub 参考结构还原独立 Vue Flow Demo，并替换为数曜数据开发平台内容。
* TaskCreator：Codex
* TaskCreationTime：2026-09-17

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.31 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
以独立 Demo 形式复现参考架构图的布局、圆环、卡片与动态连线，仅替换需求指定的数据开发平台内容，不接入现有业务页面。

## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- 用户提供的 EMQX Smart Data Hub DOM 参考

## 实现内容
1. 新增数曜数据开发平台 Smart Data Hub Vue Flow 组件。
2. 保留参考图 560px 高度、2×2 数据源、340px 圆形核心和 240×280 输出卡片。
3. 使用统一 1704px 内部画布，等距加宽左右连接区。
4. 替换指定文案、Lucide 图标与数曜 Logo。
5. 不渲染格子背景，不接入任何业务页面。
6. 修正中央圆环为参考图紫色体系，并使用数曜品牌 Logo。
7. 根据页面视觉校准将中央 Logo 设为 `size-16`，并将 Flow 接入数曜·数据开发平台「解决方案」区块，保留公共 Frame 格子背景与 1704px 居中画布。

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
| `components/demo/SmartDataHubDemo.client.vue` | 独立 Demo 画布 |
| `components/demo/smart-data-hub/SmartDataHubFlow.client.vue` | Vue Flow 节点、坐标与业务数据 |
| `components/demo/smart-data-hub/SmartDataHubNode.vue` | 数据源、圆形核心与输出节点 |
| `components/demo/smart-data-hub/SmartDataHubEdge.vue` | 动态渐变 Edge |
| `pages/demo/smart-data-hub.vue` | 独立演示路由 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | dev |
| Commit Message | feat(TASK-014.31): add smart data hub demo |
| Commit Hash | |

## 完成说明
已完成独立 Smart Data Hub Demo。保留参考结构的 560px 高度、2×2 数据源、340px 圆形核心、旋转圆环、轨道图标、底部标签、240×280 输出卡片与动态渐变连线；替换为数曜数据开发平台指定内容。画布使用统一 1704px 基准并等距加宽左右连接区，不渲染格子背景，也未接入任何业务页面。
