# TASK-014.46：数曜·数据标签平台 AI 辅助建标动画
---
* TaskName：DLP AI 辅助建标动画
* TaskDescription：将 AI 辅助建标 Section 右侧图片占位符替换为业务需求到标签模型发布的循环动画，并保留指定的三色窗口标题栏。
* TaskCreator：User
* TaskCreationTime：2026-09-21

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.46 |
| Epic | EPIC-014 |
| 状态 | Done |
| 优先级 | P0 |
| 负责人 | Codex |

## 任务目标
在不改变 AI 辅助建标 Section 标题、描述和双栏布局的前提下，实现固定高度、可循环、状态连续的 AI 标签建模动画。

## 实现内容
1. 固定三色窗口标题栏。
2. 展示业务需求、AI 语义理解、智能建模结果和发布状态。
3. 标签定义、对象模型、加工规则依次生成。
4. 四阶段 Stepper 始终挂载，终态停留 1.2 秒后循环。
5. 使用 Tailwind CSS v4、Lucide Icon 和既有时间轴，不新增私有样式。
6. 更新产品需求、视觉契约与 Harness。

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
| `components/product/dlp/DlpAiModelingVisual.vue` | AI 辅助建标动画 |
| `components/product/dlp/DlpAiModelingSection.vue` | 替换图片占位符 |
| `tests/visual/product-data/dlp.contract.ts` | 动画视觉契约 |
| `scripts/harness/checks/product-data/dlp.mjs` | 动画 Harness 约束 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODLP/DLP.md` | 同步产品要求 |

## Git
| 字段 | 内容 |
|---|---|
| Branch | `dev` |
| Commit Message | `feat(TASK-014.46): add DLP AI modeling animation` |
| Commit Hash | 见 Git 历史 |

## 完成说明
AI 辅助建标图片占位符已替换为固定高度循环动画，完整呈现业务需求理解、标签定义 / 对象模型 / 加工规则生成、校验和模型发布。指定三色窗口标题栏已加入视觉契约和 Harness 防回归。Lint、TypeScript、137 项测试、55 项视觉测试、Harness 与生产构建全部通过；页面桌面实测无动画溢出或高度跳动。
