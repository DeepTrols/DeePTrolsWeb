# TASK-014.12：DeepCtrls 风格 Contact CTA
---
* TaskName：DeepCtrls 风格 Contact CTA
* TaskDescription：复刻参考站 `home-contact-cta` 的布局、尺寸、字号、指标与按钮 hover 节奏，并封装为公共 `CtaSection`，应用到首页、Why DeepTrols 与产品页。
* TaskCreator：Olly
* TaskCreationTime：2026-09-08
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.12 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0 |
| 负责人  | Codex |

---
## 任务目标
将页面底部 CTA 从旧的通用面板与双按钮形式，替换为 DeepCtrls 首页风格横幅 CTA：
- 标题：以 AI 重塑数字世界与物理世界
- 指标：新一代智能基础设施、四大智能技术底座、覆盖关键产业场景
- CTA：免费获取专属方案

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`
- `doc/product/NAVIGATION.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`

---
## 实现内容
1. 将 `components/common/CtaSection.vue` 改为 Tailwind-only 的 `home-contact-cta` 横幅组件。
2. 保留旧 props 类型兼容，页面默认只传 `title-id`。
3. 首页、Why DeepTrols、数据产品页、知识产品页、探曜产品页与 Device Agent 产品页统一使用新 CTA。
4. 按指定运行时资源使用 `public/contact-cta-banner.webp` 作为 CTA 背景图。
5. 将勾选图标落入 `public/images/icons/check-circle-white.svg` 运行时资产。
6. HOME 的 Use Cases section 保持默认页面背景 `var(--dt-color-bg)`。
7. `.home-contact-cta__inner` 使用 `var(--dt-container)`，确保 CTA 内容与页面内容左边缘对齐。
8. 移除独立 CTA SCSS，尺寸、背景、定位、hover、响应式与指标间距统一由 Tailwind CSS v4 工具类承载。
9. 将三项指标改为紧凑 flex 排列，避免绝对定位导致间隔过大。
10. 更新 HOME 基线、内容规范、公共组件规范与 Harness/视觉契约。

---
## 验收标准
- [x] 首页底部 CTA 使用 `home-contact-cta` 结构
- [x] Why DeepTrols 底部 CTA 使用新公共组件
- [x] 产品页底部 CTA 使用新公共组件
- [x] 旧 `dt-cta-panel` 与双按钮 CTA 不再作为页面底部 CTA 基准
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] Harness Engineering 检查通过
- [x] 文档已更新

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/common/CtaSection.vue` | 新 CTA 横幅公共组件 |
| `components/home/HomeCta.vue` | 首页改为默认复用 |
| `pages/why-deeptrols.vue` | Why 页面改为默认复用 |
| `pages/products/**` | 产品页改为默认复用，Device Agent 新增 CTA |
| `components/solution/SolutionPageTemplate.vue` | 解决方案模板改为默认复用 CTA 标题与按钮 |
| `public/contact-cta-banner.webp` | CTA 横幅背景图 |
| `public/images/icons/check-circle-white.svg` | CTA 指标勾选图标 |
| `doc/engineering/**` | 更新 CTA 基线与公共组件约束 |
| `doc/product/**` | 更新 HOME 与内容 CTA 约束 |
| `scripts/harness/**`、`tests/visual/**` | 更新 CTA 契约 |

---
## 资产边界
`contact-cta-banner.webp` 已按需求放入 `public/`，运行时通过 `/contact-cta-banner.webp` 作为公共 CTA 背景图引用。

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         |    |
| Commit Message | 待提交 |
| Commit Hash    | 待提交 |

## 完成说明
已完成 DeepCtrls 风格 `home-contact-cta` 公共组件替换，并应用到首页、Why DeepTrols 与全部产品页。

验证结果：
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm harness:engineering`
- `pnpm build`

已知情况：`public/contact-cta-banner.webp` 由公共 CTA 组件直接引用；其他页面无需重复配置背景图。
