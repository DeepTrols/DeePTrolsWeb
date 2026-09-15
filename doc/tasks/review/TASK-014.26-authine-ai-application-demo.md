# TASK-014.26：Authine AI Application 组件 Demo
---
* TaskName：Authine AI Application 组件 Demo
* TaskDescription：根据用户提供的 `aiApplicationMain` DOM 片段与参考站 `https://code.authine.com/aiplatform/`，先生成独立组件和隐藏 demo 路由，不接入现有页面。
* TaskCreator：Olly
* TaskCreationTime：2026-09-15
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-014.26 |
| Epic | EPIC-014 |
| 状态 | Done |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 实现内容
1. 新增 `components/demo/AuthineAiApplicationDemo.vue`，还原 `aiApplicationMain` 中 CRM / SRM / 合同管理 / 项目管理 / 综合办公 5 个卡片。
2. 组件使用 Vue 控制横向连续滚动，模拟 Swiper duplicate slide、响应式间距、hover 暂停与进入视口启动，不新增 Swiper 依赖。
3. 样式使用 Tailwind CSS v4 类完成，不新增 scoped style，不使用 inline style。
4. 新增隐藏预览路由 `/demo/authine-ai-application`，不接入导航，设置 `noindex,nofollow`。
5. 按参考站公开样式补齐 `aiApplication` 区块背景、标题、卡片尺寸、按钮尺寸与移动端尺寸。

---
## 验收标准
- [x] 形成独立组件
- [x] 形成 demo 路由
- [x] 不接入现有页面和导航
- [x] 使用 Tailwind CSS v4
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] 单元测试通过
- [x] 视觉契约测试通过
- [x] Harness Engineering 通过
- [x] Build 成功
