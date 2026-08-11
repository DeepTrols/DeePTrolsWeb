# TASK-005.2：Why DeepTrols Hero 动画视觉（Hero.md）
---
* TaskName：Why DeepTrols Hero 动画视觉
* TaskDescription：根据 `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/Hero.md`，将 `/why-deeptrols` Hero 右侧 `robot.webm` 素材替换为 EMQX FlowMQ Hero（`HeroDiagram`）1:1 内容适配的动画组件。中心 FlowMQ 替换为 DEEPTROLS logo，MQTT/AMQP/Kafka 分别替换为数曜/博曜/探曜 logo，新增智曜 logo，logo 样式与 FlowMQ 节点样式保持一致，`page-hero__inner` 保持与其他页面一致。
* TaskCreator：Codex
* TaskCreationTime：2026-08-10
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-005.2 |
| Epic | EPIC-005 |
| 状态   | Review   |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. 严格复刻 EMQX FlowMQ 产品页（https://www.emqx.com/zh/products/flowmq）Hero 右侧动画组件的样式、动画、尺寸与状态机时序，不允许自行创作。
2. 中心 FlowMQ logo 替换为 `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/icon——logo.svg`（DEEPTROLS logo）。
3. MQTT → 数曜 logo、AMQP → 博曜 logo、Kafka → 探曜 logo，并新增第四个节点智曜 logo。
4. 保持 Why 页面公共 `PageHero`（`visual-size="large"`）结构不变，与其他页面 `page-hero__inner` 一致。
5. 更新测试与 Harness Engineering 契约。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/WhyDeepTrols.md`
- `doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/Hero.md`
- `doc/tasks/review/TASK-005.1-why-deeptrols-page.md`

---
## 原组件提取结论（实现依据）
从原站 SSR HTML、`flowmq.XiDpEZKq.css` 与 `CYoljG4h.js`（`HeroDiagram` 组件）逐行提取：

- 画布 `560×480`，viewBox `0 0 560 480`，中心 `(280,240)`，轨道半径 `150`，外虚线环 `r=180`（dasharray `6 10`、`text-primary/8`），内虚线环 `r=68`（dasharray `4 8`、`text-primary/10`）。
- 3 个协议节点位于轨道上，基础角度 `[-90, 30, 150]` + 全局旋转角 `A`（初始 `270`）；节点为 `size-12` 圆（`bg-{color}-500/12 border-{color}-500/25 backdrop-blur-sm`）+ icon + 底部标签 `text-xs font-semibold text-muted`；节点外有 `box-shadow 0 0 12px 2px` 光晕（CSS module `_nodeGlow`，激活时 `_nodeGlowActive` 播放 `0.9s` 脉冲：`scale .95→1.05→1`、`opacity 0→1→.6`）。
- 相邻节点间 3 条圆弧（`r=150` sweep 1），双层绘制：柔光层 `stroke-width 6 + feGaussianBlur(6)`、清晰层 `stroke-width 2`；渐变 `userSpaceOnUse` 取相邻节点坐标，stop 为节点色 `stop-opacity 0.5`。节点色：MQTT `#8b5cf6`、Kafka `#3b82f6`、AMQP `#06b6d4`。
- 每个节点向中心有一条虚线辐条（节点色 `stroke-opacity 0.2`、`1.5` 宽、dasharray `4 6`，自节点内缩 28px 起、止于内环 `r=68`）。
- 2 个粒子（`r 3→4→3`、`fmq-glow` 滤镜）沿「源节点→中心→双目标」飞行。
- 中心枢纽：`conic-gradient(#8b5cf6, #3b82f6 120deg, #06b6d4 240deg)` `p-[2px]` 渐变环 + `size-[96px] bg-default` 内圆 + EMQX logo + `FlowMQ` 文字；外圈 `border-primary/15` 脉冲环（CSS module `_centerPulse`：`3s ease-in-out infinite`，`opacity .3→.6`、`scale 1→1.06`）。
- 背景光斑：`size-[300px]` 渐变 `blur-[60px]`（dark：`from-primary/12 via-blue-500/6 to-cyan-400/8`）。
- 状态机时序：挂载后 `400ms` 启动 message；message `900ms`（粒子飞行，源节点在进度 `<0.5` 发光、目标节点在 `>0.88` 与 holding 阶段发光）→ holding `400ms` → rotating `800ms`（整体 `+120°`，easeInOutCubic）→ settling `200ms` → 循环。粒子分段：`<0.04` 淡入于源节点；`0.04–0.47` 源→中心侧（中心向源 20% 处）；`0.47–0.49` 停留；`0.49–0.96` 中心侧（中心向目标 20% 处）→目标，颜色切换为目标色；`>0.96` 淡出。
- 响应式：容器宽度 / 560，上限 `1.3` 倍缩放。

---
## 实现内容
1. 新增 `components/why/useWhyHeroAnimation.ts`：1:1 复刻 FlowMQ `HeroDiagram` 状态机（message 900ms → holding 400ms → rotating 800ms easeInOutCubic → settling 200ms 循环，挂载 400ms 后启动；初始旋转 270°；粒子分段 0.04/0.47/0.49/0.96 与中心 20% 换向比例）。四节点适配：基础角度改为 `[-90, 0, 90, 180]`，旋转步长 `90°`，FLOW_STEPS 改为相邻双目标发送。
2. 新增 `components/why/WhyHeroVisual.vue`：纯 SVG（`viewBox 0 0 560 480`，无内联 style）渲染背景光斑、外/内虚线环（r=180/68）、相邻节点渐变弧（双层 6+2 描边）、虚线辐条、双粒子、四品牌节点（r=24 圆 + 24×24 logo + 底部标签 + r=30 脉冲光晕）与中心枢纽（r=62 脉冲环 + 四色 conic 渐变环四象限弧段 + r=48 内圆 + DEEPTROLS logo）。
3. `data/why.ts` 新增 `WhyHeroNodeConfig` / `whyHeroNodes` / `whyHeroCenterLogo`：MQTT→数曜 `#8b5cf6`、Kafka→探曜 `#3b82f6`、AMQP→博曜 `#06b6d4`、新增智曜 `#f97316`；节点圆 `fill-*-500/12 stroke-*-500/25` 对齐原组件 `bg/12 border/25`。
4. `assets/css/tailwind.css` 注册 `--animate-why-node-pulse`（0.9s，opacity 0→1→0.6、scale .95→1.05→1）与 `--animate-why-center-pulse`（3s infinite，opacity .3→.6、scale 1→1.06），与原站 keyframes 一致。
5. `components/why/WhyHero.vue` 移除 `robot.webm` video，改渲染 `WhyHeroVisual`，外层 `max-w-[728px]` 对齐原组件 1.3 倍缩放上限；`PageHero visual-size="large"` / `flush-bottom` / `page-hero__inner` 结构保持不变。
6. 更新 `tests/visual.spec.ts`、`tests/why-content.spec.ts`、`scripts/harness-check.mjs` 契约（动画常量、logo 映射、无 video、无内联 style）。

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
- [x] 浏览器验证无 console error

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/why/WhyHeroVisual.vue` | 新增，FlowMQ 动画 1:1 SVG 实现 |
| `components/why/useWhyHeroAnimation.ts` | 新增，状态机与几何计算 |
| `components/why/WhyHero.vue` | video 替换为 WhyHeroVisual |
| `data/why.ts` | 新增 whyHeroNodes / whyHeroCenterLogo |
| `assets/css/tailwind.css` | 注册两个动画 token |
| `tests/visual.spec.ts` | 契约更新 |
| `tests/why-content.spec.ts` | 契约更新 |
| `scripts/harness-check.mjs` | Harness 契约更新 |

---
## 测试结果
| 命令 | 结果 |
|----|----|
| `pnpm lint` | ✅ 通过 |
| `pnpm typecheck` | ✅ 通过 |
| `pnpm test` | ✅ 7 文件 31 用例通过 |
| `pnpm test:visual` | ✅ 9 用例通过 |
| `pnpm harness:engineering` | ✅ 通过 |
| `pnpm build` | ✅ 构建成功 |

---

## CDP 浏览器验证（1440×900，/why-deeptrols）
| 探针项 | 结果 |
|----|----|
| svg viewBox / 渲染尺寸 | `0 0 560 480` / 608×521（缩放 ≈1.09，≤1.3 上限） |
| 节点标签 / logo 图 | 数曜、探曜、博曜、智曜 / 5 个 image（含中心 DEEPTROLS logo） |
| 旋转状态机 | 间隔 3s 两次探针 `transform` 位移 90°，节点换位正确 |
| 发光阶段 | hold 阶段 `animate-why-node-pulse` 节点数 = 2 |
| 中心脉冲 | `getComputedStyle().animationName === why-center-pulse` |
| 内联 style | svg 内 0 个 `[style]` 属性 |
| console error | 0 |

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-005.2): replace why hero robot video with FlowMQ-style brand orbit animation |
| Commit Hash    | `0c324053eea6da0a9faed9c611d9cecdcc6804da` |

## 完成说明
已按 `Hero.md` 完成 EMQX FlowMQ Hero 动画 1:1 内容适配：中心 FlowMQ 替换为 DEEPTROLS logo，MQTT/AMQP/Kafka 分别替换为数曜/博曜/探曜 logo，新增智曜节点；画布、环结构、节点样式、keyframes 与状态机时序均与原组件一致，质量门全部通过，CDP 验证无 console error。Git 已提交至 main（`0c324053`）。

---
## 修订记录（用户反馈，2026-08-10）
1. 中心枢纽改版：去掉彩色 DEEPTROLS 图标（`icon——logo.svg`），外层圆改为带圆角的矩形徽章（渐变描边圆角环 `rx=16` + 内层 `rx=14` `fill-[var(--dt-color-bg)]` + 外层 `rx=20` 脉冲环），中心改用 `public/logo-while.svg` 白色字标；`data/why.ts` 的 `whyHeroCenterLogo` 指向 `'/logo-while.svg'`，删除 `icon——logo.svg?url` 导入；`WhyHeroVisual.vue` 删除 `hubRingArcs` 四象限弧段，改为 `why-hv-hub-ring` 对角线性渐变（紫→蓝→青→橙，模拟原 conic 环）。
2. 节点背景色：`whyHeroNodes` 每个节点在 `fill-*-500/12` 色层之下新增 `fill-[var(--dt-color-bg-elevated)]` 实底圆，参考 FlowMQ 原组件 `bg-{color}-500/12 backdrop-blur-sm` 的磨砂质感（SVG 无 backdrop-blur，以实底+色层近似）。
3. 契约同步：`scripts/harness-check.mjs`、`tests/visual.spec.ts`、`tests/why-content.spec.ts` 更新中心字标/圆角矩形/节点背景断言，`icon——logo.svg` 存在性检查替换为 `public/logo-while.svg`。
4. 质量门：lint/typecheck/31 tests/harness 全通过；headless Chrome 1440 与 390 视口验证无 console error、无横向溢出。
