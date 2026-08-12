# TASK-007.4：博曜核心能力板块接入公共 AlternatingTimelineSection（并入精准/高效/稳定）
---
* TaskName：博曜核心能力板块接入公共 AlternatingTimelineSection
* TaskDescription：BOYAO.md 板块4（核心能力）此前为占位面板，板块6/7/8（精准/高效/稳定）为页面上三个独立的 ServiceShowcaseSection。本任务按 DLP `DlpCapabilityTimelineSection` 参考模式，用公共 `AlternatingTimelineSection` 完成板块4，将板块6/7/8 全部文案并入其交错叙事行，并删除页面上独立的三个区块。
* TaskCreator：Claude
* TaskCreationTime：2026-08-12
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-007.4 |
| Epic | EPIC-007 |
| 状态   | Review   |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. 完成 `knowledge-base` 页面板块4（eyebrow=核心能力、title=让企业知识真正理解业务），替换占位面板，改用公共 `AlternatingTimelineSection`。
2. 板块6/7/8（精准/高效/稳定）的标题、副标题与描述文案 1:1 并入核心能力时间线，作为 3 行左右交错叙事；图片占位沿用组件内置占位符。
3. 删除页面上独立的板块6/7/8（`ServiceShowcaseSection v-for`）及对应数据 `boyaoShowcases`、占位文案 `boyaoCapabilitiesPlaceholder`。
4. 契约测试与需求文档同步更新，六项质量门全部通过。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/BOYAO.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`（Alternating Narrative Rows 章节）

---
## 实现内容
1. `data/boyao.ts`：
   - 新增 `boyaoTimelineItems: AlternatingTimelineItem[]`（类型直接复用 `AlternatingTimelineSection` 导出的接口），3 项依次为 精准（01）/ 高效（02）/ 稳定（03），`description` 沿用原副标题，`bullets` 以「要点标题 — 要点描述」完整保留原 blocks 文案。
   - 删除 `boyaoShowcases`、`BoyaoShowcase` / `BoyaoShowcaseBlock` 接口、`boyaoCapabilitiesPlaceholder` 与随之失效的 Lucide icon 导入（Files/Table2/Zap/Layers/BadgeCheck/Activity）。
2. `components/product/boyao/BoyaoCapabilitySection.vue`：由 `ProductSystemSection` 占位面板改为 `AlternatingTimelineSection` 薄包装（eyebrow/title/title-id/subtitle 不变，`:items="boyaoTimelineItems"`），与 `DlpCapabilityTimelineSection` 同构。
3. `pages/products/knowledge-base.vue`：删除 `ServiceShowcaseSection v-for="showcase in boyaoShowcases"` 区块及其导入。
4. `tests/boyao-content.spec.ts`：showcase 契约用例替换为 `boyaoTimelineItems` 断言（编号、分类、标题、bullets 数量）。
5. `tests/visual.spec.ts`：新增博曜核心能力契约用例——`BoyaoCapabilitySection` 必须经 `AlternatingTimelineSection` 渲染，负向断言 `ProductSystemSection`、`boyaoCapabilitiesPlaceholder`、`boyaoShowcases`、页面残留 `ServiceShowcaseSection`。
6. `doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/BOYAO.md`：板块4 标注改用 AlternatingTimelineSection 承载；板块6/7/8 标注已并入板块4。
7. `scripts/harness-check.mjs`：修复既有断裂——TASK-002.1 归档至 `completed/` 时 requiredFiles 未同步，仍指向 `in-progress/` 导致 harness 失败，本任务顺带修正路径（与本任务代码同提交）。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常（交错叙事桌面左右切换、移动端单列）
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `data/boyao.ts` | 新增 boyaoTimelineItems，删除 showcases/占位数据 |
| `components/product/boyao/BoyaoCapabilitySection.vue` | 占位面板 → AlternatingTimelineSection 薄包装 |
| `pages/products/knowledge-base.vue` | 删除独立的精准/高效/稳定区块 |
| `tests/boyao-content.spec.ts` | 内容契约断言迁移至时间线数据 |
| `tests/visual.spec.ts` | 新增核心能力结构契约用例 |
| `scripts/harness-check.mjs` | requiredFiles 中 TASK-002.1 路径同步至 completed/ |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/BOYAO.md` | 板块4/6/7/8 状态同步 |
| `doc/tasks/review/TASK-007.4-boyao-capability-timeline.md` | 任务文档（完成后移入 review/） |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | ✅ 通过 |
| `pnpm typecheck` | ✅ 通过 |
| `pnpm test` | ✅ 8 个文件 44/44 通过 |
| `pnpm test:visual` | ✅ 12/12 通过 |
| `pnpm harness:engineering` | ✅ 通过（含 requiredFiles 路径修复） |
| `pnpm build` | ✅ 构建成功 |
| SSR 验证 | ✅ `/products/knowledge-base` 渲染核心能力时间线 01/02/03 三行与图片占位，无「核心能力内容规划中」占位、无 `boyao-showcase-*` 残留，页面共 7 个 section |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-007.4): build boyao core capability section with AlternatingTimelineSection |
| Commit Hash    | `fb55639` |

## 完成说明
板块4（核心能力）占位闭环：按 DLP 参考模式接入公共 `AlternatingTimelineSection`，BOYAO.md 板块6/7/8（精准/高效/稳定）全部文案并入三行左右交错叙事（图片沿用组件内置占位符），页面独立的三个 showcase 区块删除；内容/结构契约测试同步迁移，六项质量门全部通过。顺带修复 TASK-002.1 归档遗留的 harness requiredFiles 失配。
