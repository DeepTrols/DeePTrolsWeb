# TASK-003.5：产品菜单数据要素监管平台调整
---
* TaskName：产品菜单数据要素监管平台调整
* TaskDescription：在产品菜单中移除“数曜·数据资产管理平台”，新增“数曜·数据要素监管平台”，并同步导航、Footer、产品文档与测试契约。
* TaskCreator：Codex
* TaskCreationTime：2026-08-04
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-003.5 |
| Epic | EPIC-003 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 替换 Header 产品 Mega Menu 中 DATA 分类下的数据产品项。
2. 同步 Footer 产品列，避免产品入口不一致。
3. 同步 `NAVIGATION.md`、`SITE_MAP.md` 与 HOME Footer 文档中的产品清单。
4. 补充测试契约，防止旧产品项回流。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/NAVIGATION.md`
- `doc/product/SITE_MAP.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`

---
## 实现内容
1. `data/navigation.ts`：产品 Mega Menu 中将“数曜·数据资产管理平台”替换为“数曜·数据要素监管平台”。
2. `data/footer.ts`：Footer 产品列同步替换同一产品入口。
3. 产品文档：同步导航、站点地图与 HOME Footer 产品清单。
4. 测试：新增产品菜单契约断言，并更新 Footer 视觉契约。

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
- [x] 浏览器验证无 console error

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `data/navigation.ts` | 替换 Header 产品 Mega Menu 产品项 |
| `data/footer.ts` | 同步 Footer 产品列 |
| `doc/product/NAVIGATION.md` | 同步产品菜单文档 |
| `doc/product/SITE_MAP.md` | 同步产品站点地图 |
| `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md` | 同步 Footer 产品清单 |
| `tests/home-content.spec.ts` | 新增产品菜单契约断言 |
| `tests/visual.spec.ts` | 更新 Footer 产品项视觉契约 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `git pull --ff-only` | 通过，Already up to date |
| `pnpm test` | 通过，6 个文件、26 个测试 |
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test:visual` | 通过，8 个视觉契约测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| 浏览器桌面验证 | 通过，产品 Mega Menu 显示“数曜·数据要素监管平台”，不显示“数曜·数据资产管理平台”，无 console warn/error |
| 浏览器移动端验证 | 通过，390px 移动菜单显示“数曜·数据要素监管平台”，不显示“数曜·数据资产管理平台”，无横向溢出，无 console warn/error |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `fix(TASK-003.5): update product menu data regulation entry` |
| Commit Hash | `27a74d4` |

## 完成说明
已完成产品菜单与 Footer 产品列中的产品项替换。当前工作区存在任务开始前已有的 `components/product/dgp/DgpHero.vue` 本地修改，本任务未修改该文件。
