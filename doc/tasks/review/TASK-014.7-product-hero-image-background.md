# TASK-014.7：产品页 Hero 背景改为图片背景
---
* TaskName：产品页 Hero 背景改为图片背景
* TaskDescription：所有产品页（7 个）的 PageHero `page-hero__background` 使用统一图片背景 `product-hero-bg.png`（来源：`doc/product/PAGE_REQUIREMENTS/PRODUCT/image2.png`），替代网格 + 光晕装饰。
* TaskCreator：Olly
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.7 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P1       |
| 负责人  | Claude   |

---
## 任务目标
1. 全部产品页 Hero 背景层使用同一张浅蓝波纹图片（2146×732）。
2. PageHero 新增可选 `background-image-src` 属性，未传时保留原网格 + 光晕装饰（about / why / report / solution 等页面不受影响）。
3. 遵循 ASSET_BOUNDARY 迁移规则：图片复制到 `public/images/products/`，代码只引用运行时目录。

---
## 前置文档
- `AGENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/PAGE_REQUIREMENTS/PRODUCT/image2.png`

---
## 实现内容
1. 资产迁移：`doc/product/PAGE_REQUIREMENTS/PRODUCT/image2.png` → `public/images/products/product-hero-bg.png`。
2. `components/common/PageHero.vue`：新增 `backgroundImageSrc?: string` 属性；背景层新增 `<img class="page-hero__background-image">`；`v-if="!backgroundImageSrc"` 时保留 grid / glow 装饰；保留 `::after` 底部渐变过渡。
3. `assets/scss/components/_page-hero.scss`：新增 `.page-hero__background-image`（absolute、z-index 1、object-fit: cover、居中）。
4. 7 个产品 Hero 组件传入 `background-image-src="/images/products/product-hero-bg.png"`：DgpHero、DlpHero、DdpHero、DmsHero、BoyaoHero、TanyaoHero、DeviceAgentHero。
5. 契约同步：6 个产品 harness 检查（`product-data/{dgp,dlp,ddp,dms}.mjs`、`product-aiiot/{tanyao,device-agent-base}.mjs`）、7 个 visual contract（dgp/dlp/ddp/dms/tanyao/device-agent-base/boyao）、`scripts/harness/checks/about-page.mjs`（PageHero 背景图片属性契约）。
6. 文档同步：`doc/engineering/ASSET_BOUNDARY.md`（v1.1，新增 `public/images/products/` bucket）。

---
## 验收标准
- [x] 7 个产品页 Hero 背景为统一图片
- [x] 无图片入参的页面（about/why/report/solution）背景行为不变
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
| `public/images/products/product-hero-bg.png` | 新增，迁移自 `doc/product/PAGE_REQUIREMENTS/PRODUCT/image2.png`。 |
| `components/common/PageHero.vue` | `backgroundImageSrc` 属性与背景图片渲染。 |
| `assets/scss/components/_page-hero.scss` | `.page-hero__background-image` 样式。 |
| `components/product/{dgp,dlp,ddp,dms,boyao,tanyao,device-agent}/*Hero.vue` | 传入背景图片路径。 |
| `scripts/harness/checks/product-data/*.mjs`、`product-aiiot/*.mjs` | Hero 背景图片契约。 |
| `tests/visual/product-data/*.contract.ts`、`product-aiiot/*.contract.ts`、`tests/visual/site/boyao.contract.ts` | Hero 背景图片契约。 |
| `scripts/harness/checks/about-page.mjs` | PageHero 属性契约扩展。 |
| `doc/engineering/ASSET_BOUNDARY.md` | v1.1 bucket 表新增 `public/images/products/`。 |
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
| Commit Message | `feat(TASK-014.7): use image background for product page heroes` |
| Commit Hash    |    |

## 完成说明
已完成产品页 Hero 图片背景改造与契约同步，等待 Review。
