# TASK-014.48：DGP 应用场景卡片
---
* TaskName：DGP 应用场景 2×2 卡片
* TaskDescription：将数据治理页的 Tabs 场景板块替换为可复用的 BaseCard 卡片网格。
* TaskCreator：User
* TaskCreationTime：2026-09-21

## 基本信息
| 字段 | 内容 |
|---|---|
| 编号 | TASK-014.48 |
| Epic | EPIC-014 |
| 状态 | Done |
| 优先级 | P0 |
| 负责人 | Codex |

## 验收标准
- [x] 移除旧 Tabs 和大图文面板
- [x] 使用 BaseCard 与 CardGrid 生成 2×2 场景卡片
- [x] 完成四个应用场景内容
- [x] 质量门禁通过
- [x] 产品文档和测试契约更新

## Git
| 字段 | 内容 |
|---|---|
| Branch | `dev` |
| Commit Message | `feat(TASK-014.48): replace DGP use cases with cards` |

## 完成说明
旧版 Tabs 与图文面板已替换为四张 2×2 应用场景卡片。页面实机检查通过，卡片内容自适应且同行等高；`lint`、`typecheck`、`test`、`test:visual`、`harness:engineering` 和 `build` 全部通过。
