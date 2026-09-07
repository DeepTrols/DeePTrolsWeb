# TASK-014.2：DeepCtrls Header、Hero 与内容宽度校准
---
* TaskName：DeepCtrls Header、Hero 与内容宽度校准
* TaskDescription：按 https://www.deepctrls.com/deepctrls_com/ 调整 Header、全局内容宽度与首页 Hero；仅处理用户指定区域，其他模块内容暂不改动。
* TaskCreator：Olly
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.2 |
| Epic | EPIC-014 |
| 状态   | Review |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
1. Header 参考 DeepCtrls 首页顶部样式：暗色 Hero 顶部透明、Mega 展开时白底黑 Logo、右侧保留“免费获取专属方案”和“CN ｜ EN”。
2. 内容宽度参考 DeepCtrls 的 `home-shell` 横向 gutter 节奏，修正当前内容区宽度偏差。
3. 首页 Hero 改为 DeepCtrls 同款背景图布局，使用用户提供的 AI 云图作为首屏 Banner，保留后续 Deliverables 模块但不继续与 Hero 共用视频背景。

---
## 前置文档
- `AGENTS.md`
- `doc/tasks/README.md`
- `doc/tasks/TASK_TEMPLATE.md`
- `doc/engineering/HOME_PAGE_BASELINE.md`
- `doc/engineering/HARNESS_ENGINEERING.md`
- `doc/engineering/COMMON_SECTION_COMPONENTS.md`
- `doc/engineering/ASSET_BOUNDARY.md`
- `doc/product/NAVIGATION.md`
- `doc/product/BRAND_GUIDE.md`
- `doc/product/CONTENT_GUIDE.md`
- `doc/product/PAGE_REQUIREMENTS/HOME/HOME.md`
- 参考站点：https://www.deepctrls.com/deepctrls_com/
- 用户提供素材：`image.png`、`black_logo.png`、`white_logo.png`

---
## 实现内容
1. Header 改为 DeepCtrls 参考站的 `fixed` 全宽结构：62px 高、桌面左右 padding 分别为 `43px / 61px`、HOME 顶部透明白字、hover 深色半透明、Mega/滚动/内页白色半透明。
2. Header logo 按状态切换：默认暗色 Hero 顶部使用 `/images/brand/deeptrols-logo-white.png`，Mega 展开、滚动、移动菜单或内页使用 `/images/brand/deeptrols-logo-black.png`。
3. Header 右侧去掉 GitHub 图标、语言图标与 `登录OPS`，改为「免费获取专属方案」与「CN ｜ EN」。
4. 首页 Hero 改为 DeepCtrls 首屏比例与文字定位：`aspect-ratio: 1920 / 655`，使用 `/images/home/deepctrls-hero-ai.png` 作为背景图，叠加左侧黑色线性遮罩。
5. 移除 HOME Hero 与区域一共用视频背景的结构，保持 `HomeHero` 与 `HomeDeliverables` 独立相邻。
6. 全局 `.container` 与 `.home-shell` 改为 DeepCtrls 横向 gutter 逻辑：默认 `--dt-container` 由 `--dt-page-gutter` 计算，Hero 使用 `--dt-hero-gutter`。
7. 将 Header 外层样式抽离到 `assets/scss/components/_site-header.scss`，保持 `SiteHeader.vue` 低于 300 行。
8. 同步更新 HOME 基线、导航、品牌、资产边界与公共组件文档，避免后续页面继续沿用旧 Header/旧视频 Hero/固定 1200 容器。

---
## 验收标准
- [x] Header 顶部默认白 Logo，Mega 展开时黑 Logo
- [x] Header 右侧仅包含“免费获取专属方案”和“CN ｜ EN”
- [x] 首页 Hero 采用用户提供 Banner 图片，布局接近 DeepCtrls 首屏
- [x] 全局内容宽度采用 DeepCtrls 横向 gutter 节奏
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Build 成功
- [x] 测试通过
- [x] Harness Engineering 检查通过
- [x] 浏览器验证完成

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `components/navigation/SiteHeader.vue` | 增加 Header 顶部、滚动、Mega、移动菜单状态与 logo 状态切换。 |
| `assets/scss/components/_site-header.scss` | 新增 Header 全局 SCSS，承载 DeepCtrls Header 背景、尺寸、层级与 Mega 外壳样式。 |
| `components/navigation/SiteHeaderActions.vue` | Header 右侧改为「免费获取专属方案」与「CN ｜ EN」。 |
| `components/navigation/SiteHeaderDesktopNav.vue` | 调整桌面导航宽度、hover 与断点节奏。 |
| `components/navigation/SiteHeaderMenuButton.vue` | 移动端菜单按钮继承 Header 当前色值。 |
| `components/home/HomeHero.vue` | 改为 DeepCtrls 首屏图片 Hero、文字定位与 CTA。 |
| `pages/index.vue` | 移除 Hero + Deliverables 共用视频背景包裹。 |
| `assets/scss/main.scss` / `assets/css/tailwind.css` | 更新 DeepCtrls 内容宽度 token 与字体优先级。 |
| `components/common/section/SectionShell.vue` | 宽区块跟随 `--dt-container-wide`。 |
| `public/images/home/deepctrls-hero-ai.png` | 新增 HOME 首屏 Banner 图。 |
| `public/images/brand/deeptrols-logo-black.png` | 新增 Header Mega/滚动态黑色 Logo。 |
| `public/images/brand/deeptrols-logo-white.png` | 新增 Header 默认白色 Logo。 |
| `tests/visual/**` / `scripts/harness/**` | 更新视觉合约与 Harness，保护新 Header、Hero、宽度与资产基线。 |
| `doc/engineering/**` / `doc/product/**` | 同步更新 HOME、导航、品牌、资产边界与公共组件规范。 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | feat(TASK-014.2): align header and hero with DeepCtrls |
| Commit Hash    | 见最终 Git 提交 |

## 完成说明
已完成指定范围：Header、全局内容宽度与 HOME Hero。其他 HOME 页面区块未做视觉重构，仅因容器 token 变化会跟随整体宽度基线调整。

验证记录：
- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：100 tests 通过
- `pnpm test:visual`：38 tests 通过
- `pnpm harness:engineering`：通过
- `pnpm build`：通过（保留现有 CSS 优化警告，不影响构建）
- 本地浏览器验证：`http://[::1]:3001/` 首页可打开；顶部 Header 为透明白 Logo，Mega 展开时白底黑 Logo；Hero 背景图加载正常。
