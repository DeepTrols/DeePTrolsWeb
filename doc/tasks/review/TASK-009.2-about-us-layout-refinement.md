# TASK-009.2：About Us 页面细节修正
---
* TaskName：修正 About Us Hero、介绍、地图与联系区块
* TaskDescription：根据验收反馈调整 `/about_us` 页面首屏高度、公司介绍卡片、公司地址地图与联系我们两行两列布局。
* TaskCreator：Codex
* TaskCreationTime：2026-08-24
---

## 基本信息
| 字段 | 内容 |
|----|----|
| 编号 | TASK-009.2 |
| Epic | EPIC-009 |
| 状态 | Review |
| 优先级 | P1 |
| 负责人 | Codex |

---
## 任务目标
1. 增加 About Hero 高度与 Header 下方留白。
2. 将公司介绍改为左对齐 card。
3. 将公司地址改为地图展示。
4. 联系我们移除社交媒体，改为 4 个联系渠道两行两列。
5. 同步测试、Harness 与 About 产品需求文档。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md`

---
## 实现内容
1. AboutHero 使用专属类调整首屏高度和 PageHero 内部上下留白。
2. AboutIntroSection 增加公司介绍 card，并将正文改为左对齐。
3. AboutAddressSection 改为地址信息卡 + 地图 iframe。
4. AboutContactSection 改为四项两列网格。
5. 更新 About 数据、测试、Harness 和产品文档。

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

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/about/AboutHero.vue` | 增加 About 专属 Hero 高度与 Header 下方留白。 |
| `components/about/AboutIntroSection.vue` | 公司介绍改为左对齐 card。 |
| `components/about/AboutAddressSection.vue` | 公司地址改为地址信息卡 + 地图 iframe。 |
| `components/about/AboutContactSection.vue` | 联系我们改为 4 项两列网格，移除社交媒体。 |
| `data/about.ts` | 移除社交媒体联系人，新增地图数据。 |
| `tests/about-content.spec.ts` | 更新 About 内容契约。 |
| `tests/visual/site/about.contract.ts` | 更新 About 视觉契约。 |
| `scripts/harness/checks/about-page.mjs` | 更新 About Harness 约束。 |
| `doc/product/PAGE_REQUIREMENTS/ABOUT/aboutus.md` | 同步本次验收要求。 |

---
## 验证记录
| 命令 / 检查 | 结果 |
|----|----|
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，11 个测试文件 / 88 个测试 |
| `pnpm test:visual` | 通过，35 个视觉契约测试 |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过 |
| `/about_us` HTTP 检查 | 通过，返回 200 |
| 浏览器渲染检查 | 通过，Hero 高度与留白、公司介绍卡片、地图、4 项两列联系区均已渲染，控制台无错误 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | main |
| Commit Message | `fix(TASK-009.2): refine about us layout` |
| Commit Hash | 见 Git 记录 |

## 完成说明
已完成 About Us 页面细节修正，等待 Review。
