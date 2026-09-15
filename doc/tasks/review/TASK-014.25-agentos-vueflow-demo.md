# TASK-014.25：AgentOS Vue Flow 架构图 Demo
---
* TaskName：AgentOS Vue Flow 架构图 Demo
* TaskDescription：根据用户提供的参考图，使用 Vue Flow + 动态 Edge 先生成独立 Demo 组件，不挂载到任何页面；样式使用 Tailwind CSS v4。
* TaskCreator：Olly
* TaskCreationTime：2026-09-15
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-014.25 |
| Epic | EPIC-014 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 实现内容
1. 新增独立组件 `components/flow/AgentOsArchitectureDemo.client.vue`。
2. 新增 `AgentOsDemoNode.vue`，以 Vue Flow 自定义节点复刻顶部接入、AI 智能体、AgentOS 平台、侧边资源、模型服务层与企业资源层。
3. 新增 `AgentOsDynamicEdge.vue`，以 Vue Flow 自定义 Edge 实现渐变发光连线、虚线流动与光点动态流转。
4. 所有可控视觉样式使用 Tailwind CSS v4 类完成；Vue Flow 运行时坐标 transform 由库生成。
5. 2026-09-15：按用户要求补充隐藏预览路由 `/demo/agentos-flow`，不接入导航，页面设置 `noindex,nofollow`。
6. 2026-09-15：根据用户反馈继续向参考图 1:1 还原，补齐中间 6 个任务/记忆胶囊、左右知识/数据/工具/MCP 双侧流入、模型层与企业资源层 9 项、动态 Edge 箭头端点、独立 glow/filter 与更接近原图的层级坐标。

---
## 验收标准
- [x] Demo 不接入导航
- [x] 使用 Vue Flow
- [x] 使用动态 Edge
- [x] 使用 Tailwind CSS v4 完成可控视觉样式
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Harness Engineering 检查通过
- [x] 视觉契约检查通过
- [x] Build 成功
