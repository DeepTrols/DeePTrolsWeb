# TASK-014.4：解决方案 Mega Menu 两行网格
---
* TaskName：解决方案 Mega Menu 两行网格
* TaskDescription：将 Header 解决方案 Mega Menu 调整为 DeepCtrls 风格的横向 4×2 文字入口，保持与核心产品 Mega 一致的字体大小，并为 FDE 与算电协同增加 hot 标签。
* TaskCreator：Olly
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.4 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 解决方案 Mega 右侧内容按横向两行排列，每行 4 个入口。
2. 入口标题与描述字号保持与核心产品 Mega 一致。
3. `FDE解决方案` 与 `算电协同运营方案` 右上角展示 `hot` 标签。
4. 不影响核心产品 Mega 与其它首页模块。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/NAVIGATION.md`
- DeepCtrls 参考站：https://www.deepctrls.com/deepctrls_com/

---
## 实现内容
1. 在 `MegaPanelProduct.vue` 中为 `layout === 'solutions'` 增加独立 `.mega-solutions` 分支。
2. 解决方案 Mega 右侧入口改为 4 列 2 行横向网格，按数据顺序展示第一行与第二行内容。
3. 入口标题保持 `24px / 35px / 400`，描述保持 `14px / 16px / 400`，与核心产品 Mega 字号一致。
4. `FDE解决方案` 与 `算电协同运营方案` 使用 `hot` 标识，并在条目右上角显示 `hot` 标签。
5. 更新 `NAVIGATION.md`、`HOME_PAGE_BASELINE.md`、视觉契约与 Harness Engineering，防止后续回退。

---
## 验收标准
- [x] 解决方案 Mega 为 4×2 横向两行布局
- [x] 标题字号与核心产品 Mega 一致
- [x] 描述字号与核心产品 Mega 一致
- [x] FDE 与算电协同显示 hot 标签
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] 测试通过
- [x] Visual contract 通过
- [x] Harness Engineering 检查通过
- [x] Build 成功

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/navigation/MegaPanelProduct.vue` | 新增解决方案 4×2 网格 Mega 分支与 hot 标签样式。 |
| `doc/product/NAVIGATION.md` | 更新解决方案 Mega Menu 结构要求。 |
| `doc/engineering/HOME_PAGE_BASELINE.md` | 更新 Mega Menu 基线约束。 |
| `scripts/harness/checks/home-layout.mjs` | 增加解决方案网格与 hot 标签 Harness 检查。 |
| `tests/solution-use-cases.spec.ts` | 增加 hot 标签数据契约。 |
| `tests/visual/site/home/context.ts` | 暴露 Mega 面板源码供视觉契约检查。 |
| `tests/visual/site/home/header.contract.ts` | 增加解决方案 Mega 网格契约。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm harness:engineering`
- `pnpm build`
- `pnpm dev --host 127.0.0.1 --port 3002`：检测到已有 Nuxt dev 服务运行。
- 现有本地服务 `http://127.0.0.1:3104/` 返回 `200 OK`。

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | `fix(TASK-014.4): align solutions mega grid` |
| Commit Hash    |    |

## 完成说明
已完成解决方案 Mega Menu 两行四列布局与 hot 标签，等待 Review。
