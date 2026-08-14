# TASK-008.2：Device Agent 产品页
---
* TaskName：Device Agent 产品页（/products/device-agent）
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/DEVICEAGENT.md`，创建 Device Agent 产品页：公共 Header/Footer + 公共 `PageHero` 居中版式（新增 `align` prop）+ 中部 1:1 复刻 EMQX Agents 编排器面板（打字动画 + 光标动画 + 6 场景切换按钮，仅替换场景文案）+ Section1 智能体生态（复用探曜页板块5 `tanyaoAgents` 3×3 `ProductFeatureGridSection`）。
* TaskCreator：Claude
* TaskCreationTime：2026-08-13
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.2 |
| Epic | EPIC-008 |
| 状态   | Review   |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. 新建路由 `pages/products/device-agent.vue`（与 `data/navigation.ts` 中「Device Agent」href `/products/device-agent` 一致），使用公共 `SiteHeader` / `SiteFooter`。
2. 扩展公共 `PageHero`：新增 `align?: 'left' | 'center'` prop（默认 `left` 保持兼容），`center` 时文案与视觉均居中（对齐 EMQX Agents hero 的 `flex flex-col items-center text-center` 版式），仅模板条件类，不新增样式。
3. `DeviceAgentHero`：公共 `PageHero` 居中版式（badge=Device Agent / Cpu / title-line=让Agent基于实时数据决策与行动 / title-gradient=串联事件、记忆、执行和决策 / visual-label=DEVICEAGENT_HORE_WEBM），无 CTA 按钮（`:actions="[]"`），`#visual` 插入 `DeviceAgentHeroVisual`。
4. `DeviceAgentHeroVisual`：Tailwind-only（无 `<style>`、无 inline style），1:1 复刻 https://www.emqx.com/zh/cloud/emqx-agents 的编排器面板——保持原 DOM 结构、布局、尺寸、圆角、边框、阴影、背景、字体、间距、响应式、输入动画、光标动画、按钮样式不变，仅将场景内容替换为 6 个场景（事件预警 / 事件处置 / 工单派发 / 预测维护 / 周报汇总 / 智能问数）；打字机 + 光标动画 SSR 安全（`onMounted` 启动计时器）。
5. Section1 智能体生态：`ProductFeatureGridSection`（eyebrow=智能体生态 / 标题/副标题按需求），`items` 直接复用 `data/tanyao.ts` 的 `tanyaoAgents`（探曜页板块5 九项，columns="three"）。
6. `data/device-agent.ts` 集中管理 6 场景文案/图标；harness、测试与文档同步。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/DEVICEAGENT.md`

---
## 实现内容
1. 新建 `pages/products/device-agent.vue`：公共 `SiteHeader` / `SiteFooter` + `DeviceAgentHero` + Section1 智能体生态，SEO meta 独立设置。
2. 扩展 `components/common/PageHero.vue`：新增 `align` prop（`'left' | 'center'`，默认 `'left'`），center 时 inner 去掉 lg 双列网格改纵向居中、content `max-w-4xl text-center`、description 居中、actions 保持居中、visual 居中且不带 visualSize 上限。
3. 新建 `components/product/device-agent/DeviceAgentHero.vue` 与 `components/product/device-agent/DeviceAgentHeroVisual.vue`。
4. 新建 `data/device-agent.ts`：6 场景（label / icon / prompt）。
5. Harness 同步：`scripts/harness-check.mjs` 新增 requiredFiles 与断言（PageHero align prop、hero 视觉结构/文案/无 `<style>`、页面组装、数据导出）。
6. 测试同步：新建 `tests/device-agent-content.spec.ts`（数据内容契约）；`tests/visual.spec.ts` 新增 `device agent page contract` describe。
7. 文档同步：`doc/engineering/COMMON_SECTION_COMPONENTS.md` 记录 PageHero `align` 变体；`DEVICEAGENT.md` 追加实现说明。

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
| `pages/products/device-agent.vue` | 新建：Device Agent 产品页组装（Hero + 智能体生态） |
| `components/product/device-agent/DeviceAgentHero.vue` | 新建：PageHero 居中版式包装 |
| `components/product/device-agent/DeviceAgentHeroVisual.vue` | 新建：EMQX Agents 编排器面板 1:1 复刻（打字/光标/场景切换） |
| `components/common/PageHero.vue` | 新增 `align` prop（`left`/`center`），居中版式供 Device Agent 使用 |
| `data/device-agent.ts` | 新建：6 个 Agent 场景文案/图标 |
| `scripts/harness-check.mjs` | 新增 Device Agent 页 harness 断言 |
| `tests/device-agent-content.spec.ts` | 新建：数据内容契约测试 |
| `tests/visual.spec.ts` | 新增 device agent 结构契约测试；PageHero 断言同步 align 重构 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 PageHero `align` 居中变体说明 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/DEVICEAGENT/DEVICEAGENT.md` | 追加实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.2): add device agent product page |
| Commit Hash    | 3152010 |

## 完成说明
按 DEVICEAGENT.md 完成 Device Agent 产品页 `/products/device-agent`：公共 `PageHero` 新增向后兼容的 `align` prop——`center` 时单列居中（文案 `max-w-4xl text-center`、描述 `lg:flex lg:justify-center`、actions 保持居中、视觉居中且不受 `visualSize` 上限约束、不渲染 `page-hero__visual-glow`），默认 `left` 保持现有页面不变（SSR 对比 `/products/ai-iot` 视觉结构与改版前一致）。Hero 视觉 `DeviceAgentHeroVisual` Tailwind-only 1:1 复刻 EMQX Agents 编排器面板（外层 `bg-primary/8` glow、`rounded-2xl` 面板、ghost 打字层 + `animate-pulse` 光标、`Agent 编排器` textarea、6 场景按钮条 + 发送按钮），打字机 ~45ms/字、完成后 ~3.2s 自动轮播下一场景、点击场景按钮即时切换、textarea 输入会中止轮播并镜像内容；计时器全部在 `onMounted` 启动、`onBeforeUnmount` 清理（SSR 安全，服务端只渲染首场景 `aria-pressed="true"` 与空打字层）。因站点仅暗色且 `bg-muted`/`bg-default` 为 `@utility` 不支持透明度修饰符，面板背景用 `bg-elevated`、工具栏背景用 `bg-dt-bg-soft/30`、未激活按钮用 `bg-dt-bg/70`/`hover:bg-dt-bg-soft/50` 等价实现原 `dark:` 值。Section1 智能体生态直接复用探曜页板块5 `tanyaoAgents`（`ProductFeatureGridSection columns="three" nowrap-subtitle`），仅替换 eyebrow/标题/副标题。六项质量门（lint / typecheck / test 65 tests / test:visual 20 tests / harness / build）全部通过，产物 SSR 访问 `/products/device-agent` 返回 200，编排器结构、6 枚场景按钮（首枚 `aria-pressed="true"`）、光标动画类与新动态色类（`bg-primary/8`、`border-primary/15|20|30`、`bg-dt-bg/70`、`bg-dt-bg-soft/30`、`hover:bg-dt-bg-soft/50` 等）均在 SSR 输出与构建 CSS 中验证存在。
