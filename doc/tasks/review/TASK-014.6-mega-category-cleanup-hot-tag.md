# TASK-014.6：产品 Mega 品类清理与 hot 标签定位优化
---
* TaskName：产品 Mega 品类清理与 hot 标签定位优化
* TaskDescription：去掉核心产品 Mega 左栏中多余的「核心产品」品类入口；面板打开时按当前路由激活对应品类（产品页高亮所属品类）；解决方案 Mega 的 hot 标签改为紧贴标题文字右上角。
* TaskCreator：Olly
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.6 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P1       |
| 负责人  | Claude   |

---
## 任务目标
1. 核心产品 Mega 左栏不再出现「核心产品」品类（顶部导航按钮与 `.mega-title` 已直达 `/products`）。
2. 位于三级产品页（如 `/products/ai-iot`、`/products/device-agent`、`/products/knowledge-base`）时打开 Mega，左栏高亮对应品类，右栏展示该品类产品。
3. 解决方案 Mega 的 `hot` 标签从网格单元右侧绝对定位改为紧贴对应标题文字右上角，消除过大间距。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/product/NAVIGATION.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- DeepCtrls 参考站：https://www.deepctrls.com/deepctrls_com/

---
## 实现内容
1. `data/navigation.ts`：删除核心产品 columns 中的 `核心产品` 品类列，保留 4 个品类。
2. `components/navigation/MegaPanelProduct.vue`：
   - `activeColumn` 初始值改为 `initialActiveColumn()`：按当前路由匹配品类 `href` 或其 `links`（`matchesColumn`/`isActiveHref`），无匹配时回退 0（数曜）；Mega 每次打开重挂载即按路由复位。
   - hot 标签改为随 `.mega-solution-title` inline-flex 排版（`gap: 6px`、`top: -4px` 轻微上浮），移除 `.mega-solution-entry` 的 `padding-right: 44px` 与标签的绝对定位。
3. 契约同步：`tests/home-content.spec.ts`（4 品类 + 禁止 `核心产品` 品类列）、`tests/visual/site/home/header.contract.ts`（`initialActiveColumn`、hot 标签定位）、`scripts/harness/checks/home-layout.mjs`（`!title: '核心产品'`）。
4. 文档同步：`doc/product/NAVIGATION.md`（v1.5）、`doc/engineering/HOME_PAGE_BASELINE.md`。

---
## 验收标准
- [x] 产品 Mega 左栏仅 4 个品类，无「核心产品」
- [x] 产品页打开 Mega 时对应品类为选中状态
- [x] hot 标签紧贴 FDE / 算电协同标题文字右上角
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
| `data/navigation.ts` | 删除「核心产品」品类列。 |
| `components/navigation/MegaPanelProduct.vue` | 路由匹配的默认激活品类；hot 标签 inline-flex 定位。 |
| `tests/home-content.spec.ts` | 4 品类结构契约。 |
| `tests/visual/site/home/header.contract.ts` | initialActiveColumn 与 hot 标签契约。 |
| `scripts/harness/checks/home-layout.mjs` | 禁止「核心产品」品类列回退。 |
| `doc/product/NAVIGATION.md` | v1.5 品类与 hot 标签说明。 |
| `doc/engineering/HOME_PAGE_BASELINE.md` | Interaction 基线同步。 |
| `scripts/harness/required-files.mjs` | 登记本任务文档。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm harness:engineering`
- `pnpm build`

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | `fix(TASK-014.6): drop redundant product category and tighten mega hot tag` |
| Commit Hash    |    |

## 完成说明
已完成产品 Mega 品类清理、路由选中态与 hot 标签定位优化，等待 Review。
