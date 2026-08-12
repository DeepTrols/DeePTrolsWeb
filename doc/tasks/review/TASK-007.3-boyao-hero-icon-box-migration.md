# TASK-007.3：博曜 Hero 视觉 icon 外框迁移至 IconBox
---
* TaskName：博曜 Hero 视觉 icon 外框迁移至 IconBox
* TaskDescription：将 `/products/knowledge-base` 页 `page-hero__visual`（BoyaoHeroVisual）中手写的 6 处「icon + 外框」（左上/右下卡片头部 40px 图标盒、右下 4 个应用模块 56px 图标盒）迁移至公共 `IconBox` 组件；为 1:1 还原现有样式，`IconBox` 新增通用 `soft` 色调（soft/50 背景 + line 内描边）。中央能力 3 节点为插画内三色动画件，按确认保持原样。
* TaskCreator：Claude
* TaskCreationTime：2026-08-12
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-007.3 |
| Epic | EPIC-007 |
| 状态   | Review   |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. `page-hero__visual` 中的 icon 外框统一使用公共 `IconBox`（遵守 `COMMON_SECTION_COMPONENTS.md`：IconBox 统一 icon 外框，业务组件不得重新定义）。
2. 迁移范围（已与需求方确认）：左上卡片头部 Inbox、右下卡片头部 Cloud（40px）与右下 4 个应用模块图标（56px），共 6 处；素材行小图标与 Radio 分隔符无外框不涉及；中央能力 3 节点（36px 紫/紫/蓝三色动画件）保持原样。
3. `IconBox` 新增 `soft` 色调：`bg-soft/50` 背景（color-mix）+ `--dt-color-line` 1px 内描边，精确还原被替换的手写样式；`bordered` / `filled` 配置对新色调同样生效。
4. 卡片头部外框圆角由 16px 统一为 IconBox 的 12px 基线（`--dt-icon-box-radius`），其余样式零差异；右下模块原为 12px 圆角，零差异。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/tasks/review/TASK-007.2-icon-box-border-fill-config.md`

---
## 实现内容
1. `components/common/card/IconBox.vue`：tone 联合类型扩展为 `primary | muted | white | gradient | soft`，新增 scoped `.icon-box--tone-soft`（`--dt-icon-box-bg: color-mix(in oklab, var(--dt-color-bg-soft) 50%, transparent)`、`--dt-icon-box-color: var(--dt-color-text-highlighted)`、`--dt-icon-box-shadow: inset 0 0 0 1px var(--dt-color-line)`），与 TASK-007.2 的 `bordered` / `filled` 修饰类可叠加。
2. `components/common/card/FeatureCard.vue`：tone 联合类型同步扩展 `soft`，保持透传链一致。
3. `components/product/boyao/BoyaoHeroVisual.vue`：
   - 左上卡片头部（Inbox）、右下卡片头部（Cloud）手写 40px 外框 → `<IconBox :size="40" tone="soft">` + 默认插槽（保留 `size-5` 与图标色调类）。
   - 右下 4 个应用模块手写 56px 外框 → `<IconBox :size="56" tone="soft">`，`col-span-2` 与 `aria-label` 经属性透传保留网格语义。
   - 中央能力 3 节点、素材行小图标、Radio 分隔符保持原样。
4. `tests/visual.spec.ts`：新增 boyao hero IconBox soft 迁移契约断言（含旧手写外框类不存在的负向断言）。
5. `scripts/harness-check.mjs`：新增 IconBox 五色调与 soft 实现断言。
6. `doc/engineering/COMMON_SECTION_COMPONENTS.md`：补充五色调与 soft 用途说明。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] 响应式正常（hero 视觉仅 lg 显示，布局不变）
- [x] 文档已更新
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/card/IconBox.vue` | 新增 soft 色调 |
| `components/common/card/FeatureCard.vue` | tone 联合类型同步扩展 soft |
| `components/product/boyao/BoyaoHeroVisual.vue` | 6 处 icon 外框改用 IconBox（部分暂存提交，见下） |
| `tests/visual.spec.ts` | 新增迁移契约断言 |
| `scripts/harness-check.mjs` | 补充 soft 色调断言 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 更新 IconBox 色调说明 |
| `doc/tasks/review/TASK-007.3-boyao-hero-icon-box-migration.md` | 任务文档（由 in-progress/ 移入） |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | ✅ 通过 |
| `pnpm typecheck` | ✅ 通过 |
| `pnpm test` | ✅ 8 个文件 43/43 通过 |
| `pnpm test:visual` | ✅ 11/11 通过 |
| `pnpm harness:engineering` | ✅ 通过 |
| `pnpm build` | ✅ 构建成功（产物 CSS 输出 `icon-box--tone-soft` color-mix 规则；SSR 页面渲染 6 处 IconBox 实例） |

---
## Review 修复记录
### 2026-08-12：Hero 视觉宽度修正（右侧留白归零）
- 问题：`BoyaoHeroVisual` 根节点使用 `max-w-2xl`（672px）且在视觉列内左对齐；≥1536px 视口下视觉列约 798px，视觉右侧出现约 126px 留白，与 EMQX 参考（hero flex `lg:justify-between` 将视觉钉在容器右缘）不一致。
- 修正：根节点 `hidden w-full max-w-2xl lg:block` → `hidden w-full lg:block`；内层 `pointer-events-none relative mx-auto h-[520px] w-full max-w-[680px]` 的 `mx-auto` → `ml-auto`，680px 内容右对齐贴齐视觉列右缘；视觉列 ≤680px 时渲染与原先完全一致。仅修改 BoyaoHeroVisual，不改动公共 `PageHero`（DGP/DLP/DDP/DMS 共用）。
- 契约测试：`tests/visual.spec.ts` boyao hero 用例新增根/内层类断言与 `max-w-2xl` 负向断言。
- 质量门：`pnpm lint` / `pnpm typecheck` / `pnpm test`（43/43）/ `pnpm test:visual`（11/11）/ `pnpm harness:engineering` / `pnpm build` 全部通过；SSR 页面渲染新类名。
- Commit：`fix(TASK-007.3): align boyao hero visual with the right edge of the visual column`，hash 见 Git 表。

---
## 既有在途修改处理
`components/product/boyao/BoyaoHeroVisual.vue` 中存在任务前已有的未提交文案修改（Hero 中央胶囊「博曜·企业级知识管理平台」→「博曜」），与本任务无关：通过补丁部分暂存（仅迁移相关 hunk 进入提交），该文案修改保留在工作区。另有未跟踪文件与本任务无关，未纳入提交：`components/common/AgentComposer.vue`、`doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/icon——logo.svg`、`doc/product/PAGE_REQUIREMENTS/PRODUCT/KNOWLEDGE/imgs/`。

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | refactor(TASK-007.3): migrate boyao hero icon boxes to IconBox |
| Commit Hash    | `1a638dd` |

## 完成说明
`page-hero__visual` 中 6 处「icon + 外框」（左上/右下卡片头部 40px 图标盒、右下 4 个应用模块 56px 图标盒）已统一改用公共 `IconBox`：新增通用 `soft` 色调（bg-soft/50 color-mix 背景 + line 内描边）精确还原原样式，图标色调经默认插槽保留；右下模块 12px 圆角零差异，卡片头部圆角按基线统一为 12px。中央能力 3 节点等插画动画件按确认保持原样。契约测试、harness 与全部质量门通过。
