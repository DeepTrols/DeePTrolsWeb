# TASK-014.47：博曜核心能力三组动画
---
* TaskName：博曜核心能力动画
* TaskDescription：为博曜·企业级知识管理平台核心能力区的精准、高效、稳定三项能力生成固定高度循环动画。
* TaskCreator：User
* TaskCreationTime：2026-09-21

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.47 |
| Epic | EPIC-014 |
| 状态 | Done |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
保留核心能力区既有交替时间线、文字、间距和顺序，将三个图片占位符替换为与内容对应的产品能力动画。

## 实现内容
1. 精准：多模态文件接入、复杂版面解析、表格还原和 Markdown / JSON 输出。
2. 高效：批量文档任务、并行解析进度、集群扩展与自动入库。
3. 稳定：知识服务集群、节点健康、故障切换与 99.999% 服务成功率。
4. 三组动画复用运行时间轴，终态停留 1.2 秒，所有 Stepper 节点始终挂载。
5. 使用 Tailwind CSS v4、Lucide Icon 和既有语义状态，不新增私有样式。
6. 更新产品需求与视觉契约。

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
| `components/product/boyao/BoyaoCapabilitySection.vue` | 将动画接入交替时间线 |
| `components/product/boyao/capability/*` | 三组能力动画与分发组件 |
| `components/common/AlternatingTimelineSection.vue` | 复用视觉插槽与透明视觉容器能力 |
| `tests/visual/site/boyao.contract.ts` | 三组动画视觉契约 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/BOYAO.md` | 同步核心能力动画要求 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | `dev` |
| Commit Message | `feat(TASK-014.47): add Boyao capability animations` |
| Commit Hash | 见 Git 历史 |

## 完成说明
三组核心能力动画已接入现有左右交替布局，终态停留、语义状态和固定视觉尺寸均符合产品能力动画规范。`lint`、`typecheck`、`test`、`test:visual`、`harness:engineering` 与 `build` 全部通过，桌面端实机检查无溢出或布局跳动。
