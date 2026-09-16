# TASK-014.27：DeepTrols Platform Architecture 组件 Demo
---
* TaskName：DeepTrols Platform Architecture 组件 Demo
* TaskDescription：根据用户提供的 EMQX 首页 platform architecture DOM 片段，生成独立 Vue Flow demo，并在浅色模式适配后接入首页产品体系。
* TaskCreator：Olly
* TaskCreationTime：2026-09-16
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-014.27 |
| Epic | EPIC-014 |
| 状态 | Done |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 实现内容
1. 新增 `components/flow/DeepTrolsArchitectureFlow.client.vue`，实现 560px 高桌面 Vue Flow 架构图区块，并由 demo 与首页共用。
2. 新增 `components/flow/DeepTrolsArchitectureNode.vue` 和 `DeepTrolsArchitectureDynamicEdge.vue`，拆分节点与动态边，保留原始节点坐标、节点尺寸、Bezier 路径、浅色背景、圆角、边框、阴影和动态流线。
3. 新增隐藏预览路由 `/demo/emqx-platform-architecture`，不接入导航，设置 `noindex,nofollow`。
4. 样式使用 Tailwind CSS v4 utility，不新增页面 scoped CSS，不使用 `@apply`。
5. Demo 路由为了在窄预览面板中也可查看，保留桌面画布尺寸并提供横向滚动，不接入正式响应式页面逻辑。
6. 根据 DeepTrols 语义更新左侧六个接入节点和中心四个能力节点，并将中心图标替换为站点 Logo。
7. 将右侧三组输出卡片更新为知识智能/智能应用/企业服务语义，四项能力横向排列，并重新校准右侧节点宽度、连线和默认视口以保持整体居中。
8. `components/home/HomeProductSystem.vue` 已将浅色架构图接入 `ProductSystemFlowFrame`，保留框架格子背景，并使用 1600px 居中视觉画布承载流程图。
9. 左侧六个输入节点已扩展为与右侧卡片一致的 400px 宽度，并按“标题 / 说明”两行展示企业数据、知识、设备、系统、实时感知与外部服务来源。
10. 中心圆与左右两侧卡片之间的横向间距统一为 240px，整体流程图宽度扩展到约 1512px。

---
## 验收标准
- [x] 形成独立组件
- [x] 形成 demo 路由
- [x] 接入首页产品体系
- [x] 使用 Vue Flow
- [x] 使用 Tailwind CSS v4
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] 单元测试通过
- [x] 视觉契约测试通过
- [x] Harness Engineering 通过
- [x] Build 成功
