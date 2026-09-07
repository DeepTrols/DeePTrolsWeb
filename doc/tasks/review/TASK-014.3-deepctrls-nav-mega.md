# TASK-014.3：DeepCtrls 导航与 Mega Menu 校准
---
* TaskName：DeepCtrls 导航与 Mega Menu 校准
* TaskDescription：修复 Header nav 排列、将“产品”改为“核心产品”，并按 DeepCtrls 参考站重构核心产品 Mega Menu 的布局、字号、hover 与 active 效果。
* TaskCreator：Olly
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.3 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. Header nav 排列与间距参考 DeepCtrls，修复当前拥挤/错乱问题。
2. 顶部导航「产品」改为「核心产品」。
3. Mega Menu 参考 DeepCtrls 的左标题、右分栏、渐变分隔线、24px 标题与 14px 描述结构。
4. Mega 内容按用户指定：核心技术、数曜、博曜、核心产品、智曜、探曜等内容。

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
1. 将桌面主导航「产品」改为「核心产品」，保持 `div style="position:relative;" > ul > li > button` 结构，button 内不渲染 SVG。
2. 按 DeepCtrls Header 节奏收敛桌面 nav 间距：导航项固定 `121px`，`max-width: 1439px` 下为 `104px`，移除多余 gap，并增加 active/open 底部 `64px` 蓝色细线。
3. 重构 `MegaPanelProduct` 为 DeepCtrls 风格文字型 Mega：左侧标题 `核心技术 >`，右侧两列入口，使用渐变竖线分隔、`24px / 35px` 标题与 `14px / 16px` 描述。
4. 核心产品 Mega 内容按本次要求收敛为：`数曜 ｜ 数智基建`、`博曜 ｜ 知识中枢`、`数曜·数据治理平台`、`核心产品`、`智曜 ｜ 智能引擎`、`探曜 ｜ 智联万物`。
5. 将解决方案 Mega 同步接入同一文字型面板，保留「应用场景 / 行业方案」两列，避免回退到旧卡片 Mega。
6. 同步更新导航、HOME、站点地图与 HOME 基线文档，并调整测试与 Harness 契约。

---
## 验收标准
- [x] nav 标签改为「核心产品」
- [x] Header nav 间距参考 DeepCtrls，不出现错乱
- [x] Mega Menu 使用 DeepCtrls 风格的左标题 + 右侧分栏文本结构
- [x] Mega hover / active 与参考站一致
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
| `data/navigation.ts` | 更新主导航标签、核心产品 Mega 内容与解决方案分栏。 |
| `components/navigation/SiteHeaderDesktopNav.vue` | 修复 nav 排列、hover/active 状态与底部蓝色指示线。 |
| `components/navigation/MegaMenuPanel.vue` | 移除旧 container 限宽，按 DeepCtrls Mega 外层节奏设置。 |
| `components/navigation/MegaPanelProduct.vue` | 重构为 DeepCtrls 文本型 Mega 面板。 |
| `assets/scss/components/_site-header.scss` | 将 Header logo 高度校准为 DeepCtrls 参考的 `35px`。 |
| `doc/product/NAVIGATION.md` | 更新导航与 Mega Menu 约束。 |
| `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md` | 更新 HOME Header 导航说明。 |
| `doc/product/SITE_MAP.md` | 更新站点地图中的一级导航名称。 |
| `doc/engineering/HOME_PAGE_BASELINE.md` | 更新 Header/Mega 基线约束。 |
| `scripts/harness/checks/home-layout.mjs` | 增加导航数据与 DeepCtrls Mega 契约检查。 |
| `tests/*.spec.ts` | 更新内容测试与视觉契约，移除旧产品全量 Mega 断言。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm harness:engineering`
- `pnpm build`
- `pnpm dev --host 127.0.0.1 --port 3002`
- 浏览器烟测：`http://127.0.0.1:3002/` 首页可打开，「核心产品」Mega 可展开；可见 `核心技术`、`数曜 ｜ 数智基建`、`博曜 ｜ 知识中枢`、`数曜·数据治理平台`、`核心产品`、`智曜 ｜ 智能引擎`、`探曜 ｜ 智联万物`。

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | `fix(TASK-014.3): align nav mega with DeepCtrls` |
| Commit Hash    |    |

## 完成说明
已完成 Header nav 间距与核心产品 Mega Menu 的 DeepCtrls 风格校准，等待 Review。
