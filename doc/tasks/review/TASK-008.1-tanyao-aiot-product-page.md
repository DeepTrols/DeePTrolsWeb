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
| `components/product/tanyao/TanyaoHeroVisual.vue` | 新建：EMQX Edge 风格 hero 视觉 |
| `components/product/tanyao/TanyaoSolutionSection.vue` | 新建：解决方案板块 |
| `components/product/tanyao/TanyaoCapabilitySection.vue` | 新建：核心能力板块 |
| `components/product/tanyao/TanyaoStatsSection.vue` | 新建：1×4 数字条独立 Section（反馈修正） |
| `components/common/HeroStatsStrip.vue` | 新增 `columns` / `placement` prop |
| `components/common/PageHero.vue` | 新增 `flushVisualEnd` prop（反馈修正） |
| `components/common/AlternatingTimelineSection.vue` | bullets 空列表守卫 |
| `data/tanyao.ts` | 新建：页面全部文案/数据 |
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
| Commit Message | feat(TASK-008.1): add tanyao ai-iot product page<br>fix(TASK-008.1): move tanyao stats into standalone section and align hero visual |
| Commit Hash    | 5dcde9f<br>8c05245 |

## 完成说明
按 TANYAO.md 完成探曜·AI物联感知平台产品页 `/products/ai-iot`：Hero 右侧视觉 Tailwind-only 1:1 复刻 EMQX Edge（三层卡片 + 双轨道 SVG 流动光点，仅替换文案与 icon，SVG ID 重命名避免冲突，logo 统一走 `IconBox tone="soft"`）；`HeroStatsStrip` 新增向后兼容的 `columns` prop 支持 1×4；核心能力复用 `AlternatingTimelineSection` 并增加空 bullets 守卫。反馈修正（`8c05245`）：板块1 数字条改为独立 Section（`TanyaoStatsSection` + `HeroStatsStrip placement="section"`，Hero 启用 `flushBottom`）；`PageHero` 新增 `flushVisualEnd`，探曜 hero 视觉右缘贴齐 container（右侧 padding 为 0）；hero 视觉三层卡片圆角对齐博曜基准（外层/节点/设备卡 `rounded-[24px]`，中间平台卡 `rounded-[32px]`）；保留顶部卡片副标题人工修订「智能物联底座」。两轮六项质量门（lint / typecheck / test / test:visual / harness / build）全部通过（58 tests），产物构建后 SSR 访问 `/products/ai-iot` 返回 200，`lg:-mr-4`/`lg:justify-self-end`/新圆角/独立数字条均在 SSR 输出中确认。
