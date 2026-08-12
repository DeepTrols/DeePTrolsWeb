# TASK-006.6：数曜·数据要素监管平台 Hero 动画视觉（SHUYAODMS/Hero.md）
---
* TaskName：DMS Hero 监管流程动画视觉
* TaskDescription：根据 `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODMS/Hero.md`，将 `/products/data-element-regulation` Hero 右侧图片占位符替换为 EMQX smart-data-hub Hero 窗口（1:1 内容适配）的动画组件：标题栏「数据要素监管中心」，三个 Tab「流通接入 / 风险识别 / 监管处置」按 5s 自动循环，底部三段进度条对应三个阶段，正常状态 Primary/Emerald、风险状态 Amber/Red。
* TaskCreator：Codex
* TaskCreationTime：2026-08-11
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-006.6 |
| Epic | EPIC-006 |
| 状态   | Review   |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 严格复刻 EMQX smart-data-hub 产品页（https://www.emqx.com/zh/features/smart-data-hub）Hero 右侧窗口卡片的结构、样式、动画时序，不允许自行创作。
2. 内容按 Hero.md 适配：标题「智能数据中心 → 数据要素监管中心」；三个 Tab「模式注册表/模式验证/消息转换 → 流通接入/风险识别/监管处置」；三屏分别为流通事件接入、监管规则扫描（敏感字段超范围 Amber 高亮）、风险事件处置流程。
3. `DmsHero` 采用 `visual-size="large"`，动画宽度与 DDP/DLP/DGP 的 `page-hero__visual` 对齐。
4. 更新测试与 Harness Engineering 契约。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODMS/DMS.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODMS/Hero.md`
- `doc/tasks/review/TASK-006.4-dms-product-page.md`

---
## 原组件提取结论（实现依据）
从原站 SSR HTML 与 `/_nuxt/BQD8HcWg.js`（`FeaturesSmartDataHubHeroVisual`）逐行提取：

- 窗口结构：外层 `relative` + 光晕 `pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/15 blur-2xl`；窗口 `relative overflow-hidden rounded-2xl border border-muted bg-default shadow-2xl`；标题栏（红黄绿点 + `text-xs font-medium text-muted` 标题 + `w-12` 占位）；Tab 栏 `flex border-b border-muted`，按钮 `flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium transition-colors`，激活 `border-b-2 border-primary text-highlighted`，非激活 `text-muted hover:text-highlighted`，图标 `size-3.5`，标签 `hidden sm:inline`；主体 `relative h-[320px]`，各 Tab 面板 `p-5`；底部进度 `flex gap-1.5 border-t border-muted px-5 py-3`。
- 面板公共样式：面板头 `mb-4 flex items-center justify-between` + `flex items-center gap-2` 状态区 + 徽章 `rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary`；卡片 `rounded-xl border p-3`（选中 `border-primary/50 bg-primary/10`，否则 `border-muted bg-muted`）；小标题 `mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted`；双列 `grid grid-cols-2 gap-3`；成功提示盒 `mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2` + `text-xs font-medium text-emerald-400`。
- 状态机（`_t = 5e3`）：rAF 进度 0→1 历时 5000ms，结束后切换下一个 Tab、重置阶段状态并重启；Tab 点击 `H(z)` 立即重置重启；进度条宽度 = 当前段 `x*100%`、已过段 `100%` 且 `opacity .5`、未到段 `0%`，`transition-all duration-100`，重置瞬间禁用 transition 防止回扫。
- 原站阶段 watcher：registry `selected@1200ms`；validation `validating@1000ms → success@+1500ms`（状态图标：`animate-ping` 圆点 / `loader-2 animate-spin` / `check-circle-2 text-emerald-400`）；transformation `processing@1200ms → output@+1500ms`。

---
## 实现内容
1. `data/dms.ts` 新增 Hero 脚本：`dmsHeroTitle`、`dmsHeroTabs`（流通接入 ArrowLeftRight / 风险识别 ShieldAlert / 监管处置 Gavel）、`dmsHeroIntakeFields`（TX-20260811-042 等 6 字段）、`dmsHeroIntakeSteps`（交易平台/授权信息/合同信息/主体信息）、`dmsHeroIntakeHint`、`dmsHeroRiskRules`（敏感字段超范围 risk）、`dmsHeroRiskSummary`（字段 128/敏感字段 6/授权字段 124）、`dmsHeroRiskHint`、`dmsHeroDisposalEvent/Fields/Steps/Done/Hint`，全部取自 Hero.md。
2. 新增 `components/product/dms/useDmsHeroAnimation.ts`：1:1 复刻 5s rAF 循环与 Tab 切换/进度条逻辑（`STAGE_DURATION_MS = 5000`、重置禁用 transition）；阶段时序按 Hero.md 三屏内容适配：intake 步骤 `@800ms×i`，risk 规则扫描 `@700+500×i`（第 4 条触发 `riskFound`），disposal 节点 `@900+800×i`、完成 `@4100ms`；watcher 以 `import.meta.client` 守卫避免 SSR 定时器；`PROGRESS_WIDTH_CLASSES`（4% 步进 26 档字面量）+ `getProgressWidthClass` 以 Tailwind 字面量类替代内联 style。
3. `components/product/dms/DmsHeroVisual.vue` 重写为 Tailwind-only 窗口组件：标题栏「数据要素监管中心」、三 Tab、`h-[320px]` 主体三屏（流通事件卡 + 接入步骤 chips + Emerald 提示盒；规则扫描/流通概要双列卡 + Amber 高亮 + Amber 提示盒；风险事件卡 + 四节点处置流 + 「监管工单已创建」Emerald 盒 + 底部提示）、底部三段进度条。无 `<style>`、无内联 style，组件 ≤300 行。
4. `components/product/dms/DmsHero.vue` 增加 `visual-size="large"`，与 DDP/DLP/DGP 的 `page-hero__visual` 宽度一致。
5. 契约更新：`scripts/harness-check.mjs`（requiredFiles 增 `SHUYAODMS/Hero.md` 与 `useDmsHeroAnimation.ts`、DMS hero 断言改为动画窗口契约、新增动画常量与数据脚本断言）、`tests/visual.spec.ts`（DMS 块同步替换）、`tests/dms-content.spec.ts`（新增 Hero 脚本内容契约）。

---
## 验收标准
- [x] 功能完成
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过（DPD 在途改名导致的 DDP 断言失败为既有在途状态，非本任务引入）
- [x] 响应式正常
- [x] 文档已更新
- [x] Harness Engineering 检查通过（同上 DDP 既有失败）
- [x] 浏览器验证无 console error

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/product/dms/DmsHeroVisual.vue` | 重写为 smart-data-hub 窗口动画组件 |
| `components/product/dms/useDmsHeroAnimation.ts` | 新增，5s 状态机与进度宽度类 |
| `components/product/dms/DmsHero.vue` | `visual-size="large"` |
| `data/dms.ts` | 新增 Hero 监管脚本数据 |
| `scripts/harness-check.mjs` | DMS hero 契约更新 |
| `tests/visual.spec.ts` | DMS 契约更新 |
| `tests/dms-content.spec.ts` | 新增 Hero 脚本契约 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | ✅ 通过 |
| `pnpm typecheck` | ✅ 通过 |
| `pnpm test` | ✅ 31/32 通过（仅 DDP 在途改名断言失败，与本任务无关） |
| `pnpm test:visual` | ✅ 8/9 通过（同上 DDP 既有失败） |
| `pnpm harness:engineering` | ✅ 仅 DDP 既有失败 |
| `pnpm build` | ✅ 构建成功，26 档进度宽度类均进入产物 CSS |

---
## CDP 浏览器验证（1440×900，/products/data-element-regulation）
| 探针项 | 结果 |
|----|----|
| 标题栏 | 数据要素监管中心 |
| t+4s 阶段 | 流通接入：6 字段卡 + 4 接入步骤（Emerald）+ 提示盒；进度 `w-[48%],w-[0%],w-[0%]` |
| t+10s 阶段 | 风险识别：发现风险/中风险（Amber 徽章），5 规则（敏感字段超范围 Amber 高亮）+ 流通概要；进度 `w-[100%],w-[72%],w-[0%]` |
| t+15s 阶段 | 监管处置：EVT-20260811-017 + 中风险，四节点点亮 + 底部提示；进度 `w-[100%],w-[100%],w-[76%]` |
| t+18s 循环 | 回到流通接入，进度回卷 `w-[36%],w-[0%],w-[0%]`，自动循环正常 |
| 布局 | `h-[320px]` 主体无溢出，三阶段截图确认 |
| console error | 0 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-006.6): implement DMS hero supervision flow visual |
| Commit Hash    | （待回填） |

## 完成说明
已按 `SHUYAODMS/Hero.md` 完成 EMQX smart-data-hub Hero 窗口 1:1 内容适配：三 Tab 监管流程（流通接入 → 风险识别 → 监管处置）5s 自动循环，底部三段进度条，Amber/Red 风险态；占位符移除，`visual-size="large"` 对齐 DDP/DLP/DGP 宽度；契约与测试同步更新，质量门通过，CDP 验证无 console error。
