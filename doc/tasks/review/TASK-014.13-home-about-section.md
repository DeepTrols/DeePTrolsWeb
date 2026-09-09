# TASK-014.13：首页 About Section
---
* TaskName：首页 About Section
* TaskDescription：在 HOME 的 Resources section 上方新增 DeepCtrls 风格“关于我们 + 合作客户”区块，使用指定 Banner 与客户标签资产，并实现三行合作客户走马灯。
* TaskCreator：Olly
* TaskCreationTime：2026-09-09
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.13 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0 |
| 负责人  | Codex |

---
## 任务目标
在首页 `Resources` section 上方新增 About section：
- Eyebrow：关于我们
- 标题：深度数智，企业AI基础设施赛道的构建者与引领者
- 板块 1：`/O1CN0.png` 宽幅 Banner
- 板块 2：`/clients-label.webp` 客户标签
- 板块 3：三行合作客户 Logo 走马灯

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

---
## 实现内容
1. 新增 `components/home/HomeAbout.vue`，按 DeepCtrls 首页公司与合作客户区域结构实现标题、Banner、客户标签和三行 logo 走马灯。
2. 在 `data/home.ts` 新增 `homeAbout` 数据，集中维护标题、图片路径和三行合作方列表。
3. 在 `pages/index.vue` 将 `HomeAbout` 挂载到 `HomeEcosystem` 与 `HomeInsights` 之间。
4. 在 `assets/css/tailwind.css` 新增 Tailwind v4 animation token：`animate-home-about-marquee-left/right`。
5. 更新 HOME 产品需求、HOME 基线、公共组件文档和资产边界文档。
6. 更新单元测试、视觉契约与 Harness Engineering，锁定挂载顺序、文案、资产路径、动画 token 和组件 Tailwind-only 约束。
7. 按 Review 反馈恢复标题不主动换行，`home-about` 底部留白调整为 `pb-5`，并由 Resources section 自身顶部间距承接统一页面节奏。

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
| `components/home/HomeAbout.vue` | 新增首页 About 区块 |
| `components/home/HomeInsights.vue` | 为 Resources section 增加顶部间距，承接 About 下方视觉节奏 |
| `data/home.ts` | 新增 `homeAbout` 内容与合作方数据 |
| `pages/index.vue` | 新增 `HomeAbout` 挂载 |
| `assets/css/tailwind.css` | 新增全局走马灯 animation token |
| `public/O1CN0.png` | About Banner 图片 |
| `public/clients-label.webp` | 客户标签图片 |
| `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md` | 补充 About section 需求 |
| `doc/engineering/HOME_PAGE_BASELINE.md` | 补充 HOME About 基线 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | 补充 Home About 约束 |
| `doc/engineering/ASSET_BOUNDARY.md` | 登记新增运行时资产 |
| `tests/home-content.spec.ts` | 新增内容契约 |
| `tests/visual/site/home/about.contract.ts` | 新增视觉契约 |
| `tests/visual/site/home/context.ts` | 新增 HOME About 源读取 |
| `tests/visual/site/home.contract.ts` | 注册 HOME About 视觉契约 |
| `scripts/harness/**` | 新增 Harness 源与断言 |

---
## 资产边界
`O1CN0.png` 与 `clients-label.webp` 已按需求放入 `public/`，运行时分别通过 `/O1CN0.png` 与 `/clients-label.webp` 引用，不直接依赖产品文档附件目录。

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | fix(TASK-014.13): restore home about title and padding |
| Commit Hash    | 本轮提交见 Git 历史 |

## 完成说明
已完成首页 About section 新增与 HOME 基线同步；Review 反馈中标题不主动换行、About/Resources 间距和 partner-rows 底部留白已优化。

验证结果：
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:visual`
- `pnpm harness:engineering`
- `pnpm build`
