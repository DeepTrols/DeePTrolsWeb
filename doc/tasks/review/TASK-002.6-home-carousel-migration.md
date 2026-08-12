# TASK-002.6：首页轮播迁移至公共 CarouselRoot / CarouselControls
---
* TaskName：首页轮播迁移至公共 CarouselRoot / CarouselControls
* TaskDescription：2026-08-12 全面审计发现 `components/common/carousel/CarouselRoot.vue` / `CarouselControls.vue` 为死代码，而 `HomeCases.vue` / `HomeSolutions.vue` 各自手写同构轮播（data-slot/translate3d 结构一致）。本任务将两处首页轮播迁移至公共组件，删除 `HomeCasesControls.vue`，1:1 保留现有视觉与交互；harness 已强制两个公共组件必须存在，故选择迁移而非删除。
* TaskCreator：Claude
* TaskCreationTime：2026-08-12
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-002.6 |
| Epic | EPIC-002 |
| 状态   | Review   |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. `HomeCases` / `HomeSolutions` 的轮播结构统一改用公共 `CarouselRoot`（HOME_PAGE_BASELINE 轮播契约：role="region"、aria-roledescription="carousel"、data-slot root/viewport/container/item 由公共组件集中承载）。
2. `HomeCases` 的前后切换按钮改用公共 `CarouselControls`，删除 `HomeCasesControls.vue`；按钮视觉沿用全局 `.dt-icon-button` 基线，零差异。
3. `CarouselRoot` 新增 `--dt-carousel-align` / `--dt-carousel-gutter` 两个 CSS 变量钩子，承接 HomeSolutions 的 flex-start 对齐与 -16px 负边距槽宽，不引入 :deep 穿透。
4. 零视觉差异：过渡时长、位移、圆角、控件外观与响应式行为保持不变。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`

---
## 实现内容
1. `components/common/carousel/CarouselRoot.vue`：
   - 轨道新增变量钩子 `align-items: var(--dt-carousel-align, stretch)` 与 `margin-inline-start: var(--dt-carousel-gutter, 0px)`（延续 `--dt-icon-box-*` 的 CSS 变量钩子模式，宿主经自定义属性继承覆盖，无需 :deep）。
   - `label` 改为可选并新增可选 `labelledBy`：两种 aria 命名方式二选一（HomeCases 用动态 `label`，HomeSolutions 用 `labelledBy` 指向区块标题，与原 `aria-labelledby="solutions-title"` 语义一致）。
2. `components/common/carousel/CarouselControls.vue`：按钮改用全局 `.dt-icon-button` 基线（48px 圆形、内描边、hover bg-elevated），ChevronLeft/Right `:size="20"`，保留 `previousLabel` / `nextLabel` 与 `previous` / `next` emit；移除原私有按钮样式与 tone/size 配置（无既有用方，避免偏离首页基线）。
3. `components/home/HomeCases.vue`：手写 root/viewport/track 三层 div → `<CarouselRoot :active-index :item-count :label>`（圆角经宿主类 `.cases__carousel` 保留）；桌面/移动两处 `HomeCasesControls` → `<CarouselControls>`（`aria-label="客户故事切换"`、英文按钮标签经属性透传保留）；删除 `.cases__viewport` / `.cases__track` / translate 规则，reduced-motion 列表同步收敛。
4. `components/home/HomeSolutions.vue`：手写 root/viewport/container → `<CarouselRoot :active-index :item-count labelled-by="solutions-title">`；`.solutions__carousel` 宿主类仅保留圆角与 `--dt-carousel-align: flex-start` / `--dt-carousel-gutter: -16px` 两个钩子值；幻灯 item（role="group"、data-slot="item"、负槽宽配对 padding）保持原样。
5. 删除 `components/home/HomeCasesControls.vue`（由公共 CarouselControls 取代）。
6. `scripts/harness-check.mjs`：requiredFiles 移除 HomeCasesControls；新增断言——CarouselRoot 变量钩子、CarouselControls 使用 dt-icon-button、HomeCases/HomeSolutions 必须经 CarouselRoot/CarouselControls 渲染且不得残留手写轨道（`cases__track` / `solutions__carousel-container` / HomeCasesControls 文件存在性负向断言）。
7. `tests/visual.spec.ts`：首页契约用例改为读取 CarouselRoot/CarouselControls，原「home 组件内含 data-slot root/viewport/container/translate3d」断言迁移至 CarouselRoot 本体，新增宿主钩子与负向断言。
8. `doc/engineering/COMMON_SECTION_COMPONENTS.md`：新增 Carousel 章节（使用要求、变量钩子、参考实现），补齐审计发现的文档覆盖缺口。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常（轮播显隐/控件桌面移动切换逻辑未变）
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/carousel/CarouselRoot.vue` | 新增 align/gutter 变量钩子、label/labelledBy 双命名 |
| `components/common/carousel/CarouselControls.vue` | 对齐 .dt-icon-button 基线，简化 API |
| `components/home/HomeCases.vue` | 轮播与控件迁移至公共组件 |
| `components/home/HomeSolutions.vue` | 轮播迁移至公共组件 |
| `components/home/HomeCasesControls.vue` | 删除（由 CarouselControls 取代） |
| `scripts/harness-check.mjs` | 迁移契约断言升级 |
| `tests/visual.spec.ts` | 首页轮播契约断言迁移 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 新增 Carousel 章节 |
| `doc/tasks/review/TASK-002.6-home-carousel-migration.md` | 任务文档（由 in-progress/ 移入） |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | ✅ 通过 |
| `pnpm typecheck` | ✅ 通过 |
| `pnpm test` | ✅ 8 个文件 43/43 通过 |
| `pnpm test:visual` | ✅ 11/11 通过 |
| `pnpm harness:engineering` | ✅ 通过 |
| `pnpm build` | ✅ 构建成功（产物 CSS 输出 `carousel-root__container` 变量钩子规则与 `.solutions__carousel` 覆盖值） |
| SSR 验证 | ✅ 首页渲染 2 个 carousel-root 实例、4 个 carousel-controls 按钮，无 `cases__track` / `HomeCasesControls` 残留 |

---
## 零差异说明
- 过渡：两处原为 `transform 300ms ease`，对应 CarouselRoot `transition: default`（300ms ease），未传 transition 即默认值。
- 位移：CarouselRoot 内置 0–9 号 slide translate3d 规则，覆盖案例 3 张与解决方案 6 张。
- 对齐/槽宽：HomeSolutions 的 `align-items: flex-start` 与 `-16px` 负边距经变量钩子 1:1 还原。
- 控件：`.dt-icon-button` 全局类与原 HomeCasesControls 完全同源（48px、内描边、hover bg-elevated），hover 图标提亮色保留在 CarouselControls scoped 样式。
- 唯一语义微调：HomeSolutions 轮播区原 `aria-labelledby` 改为经 `labelledBy` prop 传入（渲染结果相同）；HomeCasesControls 包装 div 的 `aria-label="客户故事切换"` 经属性透传保留。

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | refactor(TASK-002.6): migrate home carousels to shared CarouselRoot/CarouselControls |
| Commit Hash    | `fa5973f` |

## 完成说明
审计项「轮播死代码 + 重复实现」已闭环：首页两处手写轮播统一迁移至公共 `CarouselRoot` / `CarouselControls`，`HomeCasesControls.vue` 删除，harness 与契约测试升级为「必须使用公共轮播、禁止手写轨道」的正负向断言；视觉与交互零差异，六项质量门全部通过。
