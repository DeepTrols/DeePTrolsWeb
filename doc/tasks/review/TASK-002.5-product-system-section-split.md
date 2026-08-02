# TASK-002.5：Product System 公共组件拆分
---
* TaskName：Product System 公共组件拆分
* TaskDescription：将 ProductSystemSection 中的流程图、移动端能力结构和卡片内容拆分，保留公共 section 背景、布局与标题排版能力。
* TaskCreator：Codex
* TaskCreationTime：2026-08-02
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-002.5 |
| Epic | EPIC-002 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. `ProductSystemSection.vue` 只保留公共背景、容器、标题与内容布局，不直接承载 VueFlow、移动端流程数据或产品卡片渲染。
2. 将桌面流程图外框与网格背景拆为独立公共组件，后续页面可传入任意流程图。
3. 将产品体系卡片渲染拆为独立公共组件，继续复用 `.dt-product-card`、`.dt-product-card__accent`、`.dt-icon-box`。
4. 将 HOME 页面当前移动端能力结构拆为 HOME 业务组件。
5. 更新 Harness、测试与公共组件文档，固化拆分边界。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`

---
## 实现内容
1. 精简 `ProductSystemSection.vue`，仅保留 section 背景、`.container`、`SectionHeading`、内容网格与标题排版。
2. 新增 `ProductSystemFlowFrame.vue`，独立承载桌面流程图外框、560px 高度、网格背景、`role="img"` 与 fallback。
3. 新增 `ProductSystemCards.vue`，独立承载产品卡片循环与 `.dt-product-card`、`.dt-product-card__accent`、`.dt-icon-box` 复用。
4. 新增 `HomeProductSystemFlow.vue`，将 HOME 当前 `EnterpriseFlow.client.vue` 与公共 flow frame 组合，并按桌面断点挂载 VueFlow，避免移动端初始化隐藏流程图。
5. 新增 `HomeProductSystemMobileFlow.vue`，将 HOME 当前移动端输入输出能力结构从公共 section 中拆出。
6. 更新 `HomeProductSystem.vue`，改为组合 `ProductSystemSection`、`HomeProductSystemFlow`、`HomeProductSystemMobileFlow` 和 `ProductSystemCards`。
7. 更新 Visual Test、Harness Engineering 和公共组件文档，固化拆分边界。

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
- [x] `ProductSystemSection.vue` 不包含 VueFlow、流程图 fallback、移动端输入输出渲染或产品卡片循环。
- [x] HOME 产品体系仍展示桌面流程图、移动端结构与四张产品卡片。

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/ProductSystemSection.vue` | 精简为产品体系 section 公共骨架。 |
| `components/common/ProductSystemFlowFrame.vue` | 新增桌面流程图外框和网格背景组件。 |
| `components/common/ProductSystemCards.vue` | 新增产品体系卡片列表组件。 |
| `components/home/HomeProductSystem.vue` | 改为组合拆分后的公共与业务组件。 |
| `components/home/HomeProductSystemFlow.vue` | 新增 HOME 产品体系桌面流程图组合组件。 |
| `components/home/HomeProductSystemMobileFlow.vue` | 新增 HOME 产品体系移动端能力结构组件。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 更新 Product System 复用边界。 |
| `scripts/harness-check.mjs` | 更新 Harness 必备文件与拆分边界检查。 |
| `tests/visual.spec.ts` | 更新 Product System visual contract。 |
| `doc/tasks/review/TASK-002.5-product-system-section-split.md` | 记录任务交付与验证结果。 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `git pull --ff-only` | 通过，Already up to date |
| `pnpm lint` | 通过 |
| `pnpm typecheck` | 通过 |
| `pnpm test` | 通过，3 files / 13 tests |
| `pnpm test:visual` | 通过，5 tests |
| `pnpm harness:engineering` | 通过 |
| `pnpm build` | 通过；仅有 Nuxt/Rolldown `PLUGIN_TIMINGS` 性能提示 |
| `git diff --check` | 通过 |
| 组件行数检查 | 通过，所有组件不超过 300 行 |
| Browser 桌面验证 | 通过；Product flow frame 560px，VueFlow 9 个节点挂载，4 张产品卡片显示 |
| Browser 移动端验证 | 通过；桌面 flow frame 隐藏，VueFlow 不挂载，移动端能力结构与 4 张产品卡片显示 |

---
## Git
| 字段 | 内容 |
|----|----|
| Branch | `main` |
| Commit Message | `refactor(TASK-002.5): split product system section content` |
| Commit Hash | `32eb15f` |

## 完成说明
已将 Product System 的公共 section 骨架与 VueFlow、移动端业务结构、产品卡片渲染拆分。后续页面复用 `ProductSystemSection` 时只继承背景、布局与标题排版，可自由传入自己的流程图和内容组件。
