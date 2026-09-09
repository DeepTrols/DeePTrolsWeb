# TASK-014.8：PageHero 标题排版对齐首页 home-hero-title
---
* TaskName：PageHero 标题排版对齐首页 home-hero-title
* TaskDescription：所有页面 PageHero 的 `title-line` 与 `title-gradient` 双行标题，其行间距与字体改为与首页 `home-hero-title` 完全一致。
* TaskCreator：Olly
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.8 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P1       |
| 负责人  | Claude   |

---
## 任务目标
1. `.page-hero h1`（含 title-line / title-gradient 两行）使用与 `HomeHero` h1 相同的字族、字号、字重与行高。
2. 移除 PageHero 原有的 36/44/56px 静态字号阶梯，改用 clamp 流体排版。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- HomeHero 标题基线：`tests/visual/site/home/hero-product.contract.ts`

---
## 实现内容
1. `assets/scss/components/_page-hero.scss`：`.page-hero h1` 改为
   - `font-family: "Source Han Sans CN", "Noto Sans SC", sans-serif`
   - `font-size: clamp(28px, 2.5vw, 48px)`
   - `font-weight: 500`
   - `line-height: clamp(38px, 3.75vw, 72px)`
   - `letter-spacing: 0`
   并删除 640px / 1024px 媒体查询中的 h1 字号覆盖（44px / 56px），保留 description 规则。
2. 契约同步：
   - `tests/visual/site/why.contract.ts`：36/44/56px、`line-height: 1.1` 锁替换为 clamp + 字族 + 字重锁。
   - `scripts/harness/checks/why-page.mjs`：同上替换，消息改为 PageHero 标题必须匹配 HOME hero 标题节奏。

---
## 验收标准
- [x] 所有使用 PageHero 的页面标题字体/行距与首页一致
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] 测试通过
- [x] Visual contract 通过
- [x] Harness Engineering 检查通过
- [x] Build 成功

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `assets/scss/components/_page-hero.scss` | h1 clamp 排版，删除媒体查询字号覆盖。 |
| `tests/visual/site/why.contract.ts` | 标题排版契约更新。 |
| `scripts/harness/checks/why-page.mjs` | 标题排版检查更新。 |
| `doc/engineering/COMMON_SECTION_COMPONENTS.md` | Hero 标题排版基线说明。 |
| `scripts/harness/required-files.mjs` | 登记本任务文档。 |

---
## 验证记录
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm harness:engineering`
- `pnpm build`

---

## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | `fix(TASK-014.8): align PageHero title typography with HOME hero` |
| Commit Hash    |    |

## 完成说明
已完成 PageHero 标题排版与首页 home-hero-title 的对齐，等待 Review。
