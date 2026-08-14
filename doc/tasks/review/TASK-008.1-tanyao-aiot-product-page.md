# TASK-008.1：探曜·AI物联感知平台产品页
---
* TaskName：探曜·AI物联感知平台产品页（/products/ai-iot）
* TaskDescription：按 `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/TANYAOIOT/TANYAO.md`，创建探曜产品页：公共 Header/Footer + 公共 `PageHero`（右侧 1:1 复刻 EMQX Edge 三层卡片 + SVG 光点流动视觉，icon 外框走 `IconBox`）+ `HeroStatsStrip` 1×4 指标 + 挑战 `ProductFeatureGridSection` 1×4 + 解决方案 `ProductSystemSection`（`SystemCards` + `ProductSystemFlowFrame` 占位）+ 核心能力 `AlternatingTimelineSection`（六项，图片占位）+ Device Agent `ProductFeatureGridSection` 3×3 + `CtaSection`。
* TaskCreator：Claude
* TaskCreationTime：2026-08-13
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-008.1 |
| Epic | EPIC-008 |
| 状态   | Review   |
| 优先级  | P1       |
| 负责人  | Claude    |

---
## 任务目标
1. 新建路由 `pages/products/ai-iot.vue`（与 `data/navigation.ts` 中「探曜·AI物联感知平台」href `/products/ai-iot` 一致），使用公共 `SiteHeader` / `SiteFooter`。
2. `TanyaoHero`：公共 `PageHero`（badge/title-line/title-gradient/description/visual-label 按需求），右侧视觉 `TanyaoHeroVisual` 1:1 复刻 EMQX Edge hero（三层卡片 + 竖向双轨道 SVG 流动光点），保持布局、尺寸、字号、渐变、阴影、Hover、Pulse 动画不变，仅替换文字与 icon；平台层 logo（探曜/数曜/智曜/博曜）统一走 `IconBox`。
3. `HeroStatsStrip` 支持 1×4（新增 `columns` 可选配置，默认 3 保持兼容），承载 4 个指标。
4. 六大板块按需求接入公共组件，核心能力复用 dlp 同款 `AlternatingTimelineSection`（视觉为图片占位）。
5. `data/tanyao.ts` 集中管理全部文案/数据；harness、测试与文档同步。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/TANYAOIOT/TANYAO.md`

---
## 实现内容
1. 新建 `pages/products/ai-iot.vue`：公共 `SiteHeader` / `SiteFooter` + 六大板块按需求顺序组装（Hero → 挑战 → 解决方案 → 核心能力 → Device Agent → CTA），SEO meta 独立设置。
2. 新建 `components/product/tanyao/TanyaoHero.vue`：公共 `PageHero`（badge=探曜·AI物联感知平台 / RadioTower / title-line=连接、感知、智能 / title-gradient=AIoT智能物联底座 / visual-label=TANYAOIOT_HORE_WEBM / visual-size=large），`#visual` 插入 `TanyaoHeroVisual`；启用 `flush-bottom`（数字条为独立 Section）与 `flush-visual-end`（视觉右缘贴齐 container）。
3. 新建 `components/product/tanyao/TanyaoHeroVisual.vue`：Tailwind-only（无 `<style>`、无 inline style），1:1 复刻 EMQX Edge hero——600px 画布 + 中心 glow、viewBox 0 0 560 560 双轨道虚线 SVG（dasharray 6 10、stroke-dashoffset ±32、2.8s）与两枚流动光点（2.4s / 2.9s begin 0.3s）、顶部平台卡（探曜AIoT + AI-Powered IoT Platform + AI Powered chip + 链接生态三个生态 logo，均经 `IconBox tone="soft"`）、中间 探曜 Edge 卡（设备接入/边缘计算/策略执行三节点，pulse dots / pulse-bar / pulse-dot 动画）、底部设备卡（工业设备/传感器/能源设备）。SVG 渐变/滤镜 ID 重命名为 `tanyaoFlowGradientUp/Down`、`tanyaoEdgeGlow` 避免与其他页面冲突。
4. 扩展 `components/common/HeroStatsStrip.vue`：新增 `columns?: 3 | 4` prop（默认 3，向后兼容），`4` 时使用 `grid-cols-2 sm:grid-cols-4`；新增 `placement?: 'hero' | 'section'` prop（默认 `hero` 保持原 `mx-auto mt-8 max-w-2xl lg:mx-0`，`section` 时全宽无 hero 边距）。
5. 扩展 `components/common/AlternatingTimelineSection.vue`：bullets 列表增加 `v-if="item.bullets.length"` 守卫，兼容无 bullets 条目（探曜六项核心能力仅含标题与描述）。
6. 新建 `components/product/tanyao/TanyaoSolutionSection.vue`（ProductSystemSection + ProductSystemFlowFrame 占位 + SystemCards）与 `components/product/tanyao/TanyaoCapabilitySection.vue`（AlternatingTimelineSection 包装）。
7. 新建 `data/tanyao.ts`：hero 指标 4 项、挑战 4 项、解决方案卡 3 项、时间线 6 项、Device Agent 9 项、CTA 动作 2 项；logo（探曜IOT/数曜/智曜/博曜）经 `?url` 导入并导出。
8. Harness 同步：`scripts/harness-check.mjs` 新增 requiredFiles 与 8 组断言（HeroStatsStrip columns、bullets 守卫、hero 视觉结构/文案/无 `<style>`、页面组装顺序、数据类型化导出）。
9. 测试同步：新建 `tests/tanyao-content.spec.ts`（数据内容契约）；`tests/visual.spec.ts` 新增 `tanyao ai-iot page contract` describe（hero 文案/视觉结构/页面组装三组结构断言）。
10. 文档同步：`doc/engineering/COMMON_SECTION_COMPONENTS.md` 新增 Hero Stats Strip 章节并在 Alternating Narrative Rows 记录 bullets 守卫；`TANYAO.md` 追加实现说明。
11. 反馈修正（commit `8c05245`）：
    1. 板块1 数字条移出 Hero：新建 `components/product/tanyao/TanyaoStatsSection.vue`（`.container` 包裹 `HeroStatsStrip placement="section" :columns="4"`，`pt-16 lg:pt-20 / pb-24 lg:pb-32` 承接节奏），页面插入于 Hero 与挑战之间；Hero 改 `flush-bottom`。
    2. `page-hero__visual` 右侧 padding 为 0：`PageHero` 新增 `flushVisualEnd?: boolean`（默认 false），启用时 `lg:-mr-4 + lg:justify-self-end` 抵消 container `padding-inline: 1rem`；探曜 Hero 传入 `flush-visual-end`。
    3. hero 视觉三层卡片圆角对齐博曜基准：顶部卡片/中间节点卡/底部设备卡 `rounded-xl|rounded-lg` → `rounded-[24px]`，中间平台卡（含渐变遮罩层）`rounded-2xl` → `rounded-[32px]`。
    4. 保留人工修订：顶部卡片副标题「AI-Powered IoT Platform」→「智能物联底座」，harness 与 visual.spec 断言同步更新。
12. 视觉微调（第二轮反馈）：
    1. hero 视觉三层卡片宽度等比 ×1.2：顶部 `w-[320px]` → `w-[384px]`、中间 `w-[420px]` → `w-[504px]`、底部 `w-[360px]` → `w-[432px]`。
    2. `HeroStatsStrip` 的 `section` placement 条目样式放大：卡片 `rounded-xl border border-default bg-dt-bg-soft/50 px-4 py-4 text-center backdrop-blur-sm`、数值 `text-2xl font-semibold text-highlighted lg:text-3xl`、标签 `mt-1 text-xs text-muted lg:text-sm`；`hero` placement（博曜）样式不变。需求中的 `bg-muted/50` 因 `bg-muted` 为 `@utility` 不生成透明度修饰符 CSS（已用构建产物验证），等价替换为 `@theme` 颜色 `bg-dt-bg-soft/50`。
13. hero 视觉内容扩充（第三轮反馈）：
    1. 顶部卡片「链接生态」在数曜 logo 前新增 DeepSeek / 千问 / 智谱 / Kimi 四个 AI 生态 logo：新建 `deepseek-logo.svg`（蓝鲸）、`qwen-logo.svg`（紫色六芒星）、`zhipu-logo.svg`（蓝色四角星）、`kimi-logo.svg`（浅色月牙），经 `data/tanyao.ts` `?url` 导入导出，统一 `IconBox :size="40" tone="soft"`；顶部卡片宽度 `w-[384px]` → `w-[460px]` 容纳 7 枚 logo。
    2. 中间卡片边缘节点在策略执行后新增 Node-RED（`Workflow` / red 系）与 Neuron（`BrainCircuit` / emerald 系），网格 `grid-cols-3` → `grid-cols-5`；`EdgeNode` 新增 `pulse` / `pulseLine` 字段，`v-else` 脉冲对由硬编码 blue 改为按节点取色；因 lg 画布仅 520px（PageHero large 网格 `minmax(520px,1fr)` + container 64rem），中间卡片改响应式 `w-[504px] xl:w-[560px]`，节点内边距 `p-3 xl:p-4`、broker 条 `w-3 xl:w-3.5`，保证五节点在 lg 不溢出画布。
    3. 底部设备卡新增 PLC（`CircuitBoard`）与摄像头（`Cctv`），网格 `grid-cols-3` → `grid-cols-5`，宽度 `w-[432px]` → `w-[460px]`。
    4. harness 新增 DeepSeek/千问/智谱/Kimi/Node-RED/Neuron/PLC/摄像头/grid-cols-5 与 4 个新 logo 导出断言；visual.spec 更新三层卡片宽度断言并新增生态顺序（DeepSeek 在数曜前）、五节点网格、响应式类断言；tanyao-content.spec 补充 4 个新 logo 资源存在性检查。
14. 视觉右缘对齐博曜（第四轮反馈）：
    1. `TanyaoHero` 取消 `flush-visual-end`（`PageHero` 的 `flushVisualEnd` prop 保留为公共可选能力，探曜不再使用）。
    2. `TanyaoHeroVisual` 根节点 `hidden w-full max-w-xl lg:block 2xl:max-w-2xl` → `hidden w-full lg:block`（去掉 max 上限），画布 `mx-auto` → `ml-auto`，与博曜 `BoyaoHeroVisual`（`ml-auto max-w-[680px]`）几何一致：lg 下画布填满视觉列，xl/2xl 下画布右缘贴齐 container 内容右缘，右侧空隙为 0。
    3. 此前 xl/2xl 下 `mx-auto` 居中 + 根节点 max 上限导致画布右缘距 container 内容右缘 38~130px 空隙，与博曜不一致，本轮修复。
    4. harness：TanyaoHero 断言改为不含 `flush-visual-end`；visual.spec：画布断言改 `ml-auto` 并新增根节点 `hidden w-full lg:block` 断言；PageHero `flushVisualEnd` 公共能力断言保留。SSR 对比 `/products/ai-iot` 与 `/products/knowledge-base` 视觉结构一致。

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
| `pages/products/ai-iot.vue` | 新建：探曜产品页组装 |
| `components/product/tanyao/TanyaoHero.vue` | 新建：PageHero 包装 |
| `components/product/tanyao/TanyaoHeroVisual.vue` | 新建：EMQX Edge 风格 hero 视觉；第三轮扩充生态 logo / Node-RED / Neuron / PLC / 摄像头 |
| `components/product/tanyao/TanyaoSolutionSection.vue` | 新建：解决方案板块 |
| `components/product/tanyao/TanyaoCapabilitySection.vue` | 新建：核心能力板块 |
| `components/product/tanyao/TanyaoStatsSection.vue` | 新建：1×4 数字条独立 Section（反馈修正） |
| `components/common/HeroStatsStrip.vue` | 新增 `columns` / `placement` prop |
| `components/common/PageHero.vue` | 新增 `flushVisualEnd` prop（反馈修正） |
| `components/common/AlternatingTimelineSection.vue` | bullets 空列表守卫 |
| `data/tanyao.ts` | 新建：页面全部文案/数据；第三轮新增 4 个 AI 生态 logo `?url` 导入导出 |
| `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/deepseek-logo.svg` | 新建：DeepSeek logo（第三轮） |
| `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/qwen-logo.svg` | 新建：千问 logo（第三轮） |
| `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/zhipu-logo.svg` | 新建：智谱 logo（第三轮） |
| `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/kimi-logo.svg` | 新建：Kimi logo（第三轮） |
| `scripts/harness-check.mjs` | 新增探曜页 harness 断言 |
| `tests/tanyao-content.spec.ts` | 新建：数据内容契约测试 |
| `tests/visual.spec.ts` | 新增探曜结构契约测试 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 Hero Stats Strip 与 bullets 守卫说明 |
| `doc/product/PAGE_REQUIREMENTS/PRODUCT/AIIOT/TANYAOIOT/TANYAO.md` | 追加实现说明 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-008.1): add tanyao ai-iot product page<br>fix(TASK-008.1): move tanyao stats into standalone section and align hero visual<br>fix(TASK-008.1): widen tanyao hero cards and enlarge stats section typography<br>fix(TASK-008.1): expand tanyao hero visual with AI ecosystem logos and edge runtimes<br>fix(TASK-008.1): align tanyao hero visual right edge with the boyao baseline |
| Commit Hash    | 5dcde9f<br>8c05245<br>29dd692<br>d37669f<br>3b269e1 |

## 完成说明
按 TANYAO.md 完成探曜·AI物联感知平台产品页 `/products/ai-iot`：Hero 右侧视觉 Tailwind-only 1:1 复刻 EMQX Edge（三层卡片 + 双轨道 SVG 流动光点，仅替换文案与 icon，SVG ID 重命名避免冲突，logo 统一走 `IconBox tone="soft"`）；`HeroStatsStrip` 新增向后兼容的 `columns` prop 支持 1×4；核心能力复用 `AlternatingTimelineSection` 并增加空 bullets 守卫。反馈修正（`8c05245`）：板块1 数字条改为独立 Section（`TanyaoStatsSection` + `HeroStatsStrip placement="section"`，Hero 启用 `flushBottom`）；`PageHero` 新增 `flushVisualEnd`，探曜 hero 视觉右缘贴齐 container（右侧 padding 为 0）；hero 视觉三层卡片圆角对齐博曜基准（外层/节点/设备卡 `rounded-[24px]`，中间平台卡 `rounded-[32px]`）；保留顶部卡片副标题人工修订「智能物联底座」。视觉微调（第二轮）：hero 视觉三层卡片宽度等比放大 ×1.2（384/504/432），数字条 `section` placement 条目样式放大（text-2xl→lg:text-3xl / mt-1 lg:text-sm / px-4 py-4，背景以可编译的 `bg-dt-bg-soft/50` 等价实现 `bg-muted/50`）。内容扩充（第三轮 `d37669f`）：顶部卡片「链接生态」在数曜前新增 DeepSeek / 千问 / 智谱 / Kimi 四个 AI 生态 logo（新建 4 枚 SVG，`data/tanyao.ts` `?url` 导入导出，`IconBox :size="40" tone="soft"`），顶部卡片 384→460；中间卡片在策略执行后新增 Node-RED（Workflow/red）与 Neuron（BrainCircuit/emerald），`grid-cols-5`，`EdgeNode` 新增 `pulse`/`pulseLine` 使 `v-else` 脉冲对按节点取色，卡片改 `w-[504px] xl:w-[560px]` + 节点 `p-3 xl:p-4` + broker 条 `w-3 xl:w-3.5`（lg 画布 520px 约束）；底部设备卡新增 PLC（CircuitBoard）与摄像头（Cctv），`grid-cols-5`，432→460。右缘对齐（第四轮）：取消 `flush-visual-end`，`TanyaoHeroVisual` 根节点去掉 max 上限、画布 `mx-auto` → `ml-auto`，`page-hero__visual` 右侧与博曜完全一致（SSR 对比 `/products/ai-iot` 与 `/products/knowledge-base` 视觉结构相同，右侧空隙为 0）。五轮六项质量门（lint / typecheck / test / test:visual / harness / build）全部通过（58 tests），产物构建后 SSR 访问 `/products/ai-iot` 返回 200，8 枚生态 logo（新 4 枚以 data URI 内联）、Node-RED/Neuron/PLC/摄像头、新卡片宽度与 `xl:` 响应式类、`ml-auto` 右缘画布均在 SSR 输出中确认，新动态色类（bg-red-500 / bg-emerald-500 / *-500/40 等）均在构建 CSS 中验证存在。
