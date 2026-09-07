# TASK-014.1：切换 DeepCtrls 视觉基准
---
* TaskName：切换 DeepCtrls 视觉基准
* TaskDescription：将官网全局布局、颜色、字体与公共组件视觉基准调整为 https://www.deepctrls.com/deepctrls_com/ 风格。
* TaskCreator：Olly
* TaskCreationTime：2026-09-07
---

## 基本信息
| 字段   | 内容       |
|------|----------|
| 编号   | TASK-014.1 |
| Epic | EPIC-014 |
| 状态   | Completed |
| 优先级  | P0       |
| 负责人  | Codex    |

---
## 任务目标
以当前本地代码为基准，将全站公共视觉入口切换为 DeepCtrls 官网风格：浅色页面、Noto Sans SC 字体、蓝色主色、1200px 内容容器、62px Header、圆角胶囊按钮与轻量卡片。

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
- 参考站点：https://www.deepctrls.com/deepctrls_com/

---
## 实现内容
1. 提取 DeepCtrls 参考站点颜色、字体、容器宽度、Header、Footer、按钮、卡片等关键视觉基线。
2. 更新 `assets/scss/main.scss` 与 Tailwind v4 theme bridge，固定浅色页面、蓝色主色、1200px/1400px 容器与 62px Header。
3. 调整 Header、Mega Menu、Footer、PageHero、SectionShell、SectionHeader、CTA、Button、Card、IconBox 等公共入口以承接新基准。
4. 同步首页、Why DeepTrols、数据产品页、白皮书&报告、关于我们等现有页面中依赖公共 token 的颜色、间距与组件样式。
5. 更新工程与产品基准文档，避免后续页面被旧 EMQX 深色基准影响。
6. 修复旧文档中的 Tailwind 任意变量背景类扫描问题，避免构建产物出现 `bg-[var(...)]` 警告。

---
## 验收标准
- [x] 全局背景、字体、颜色与 DeepCtrls 参考站点方向一致
- [x] Header 高度、背景、导航 hover 与 DeepCtrls 基准一致
- [x] 公共 Section/Header/Button/Card/CTA/Footer 承接新视觉 token
- [x] Tailwind CSS v4 token 映射同步更新
- [x] TypeScript 检查通过
- [x] ESLint 检查通过
- [x] Dev 服务启动验证通过
- [x] Build 成功
- [x] 测试通过
- [x] Harness Engineering 检查通过

---
## 修改文件
| 文件 | 说明 |
|----|----|
| `assets/scss/main.scss` | 更新全局 DeepCtrls 浅色视觉 token、容器、字体、按钮、卡片与 CTA 公共样式 |
| `assets/css/tailwind.css` | 同步 Tailwind CSS v4 theme bridge |
| `components/navigation/*` | 调整 Header、桌面导航、Mega Menu 与右侧动作区为 DeepCtrls 风格 |
| `components/layout/*` | 调整 Footer 主体、底部版权、社交与订阅区域为 DeepCtrls 风格 |
| `components/common/*` | 更新 PageHero、CtaSection、SectionShell、SectionHeader、CardText、IconBox、服务展示与时间线公共组件 |
| `components/home/*` | 同步首页 Hero、客户 Logo、三大业务方向、产品体系、解决方案、生态、客户故事等区域基线 |
| `components/product/*` | 同步数据产品、博曜、探曜等页面中依赖公共 token 的视觉元素 |
| `components/service/report/*` | 同步白皮书&报告页面资源卡片与区块间距 |
| `doc/engineering/*` | 更新首页基线、公共组件约束、解决方案页面模板与历史审计反例 |
| `doc/product/*` | 更新品牌、导航、产品愿景与 HOME 页面需求中的当前视觉基线 |
| `scripts/harness/checks/*` | 更新 Harness Engineering 中的 DeepCtrls 视觉基线校验 |
| `tests/visual/*` | 更新视觉契约测试，锁定 DeepCtrls 新基线 |

---
## Git
| 字段             | 内容 |
|----------------|----|
| Branch         | main |
| Commit Message | `refactor(TASK-014.1): align visual baseline with DeepCtrls` |
| Commit Hash    | 见本次 Git 提交记录 |

## 完成说明
已完成 DeepCtrls 视觉基线切换，并将公共组件、工程文档、Harness 与视觉契约同步到新基线。

验证结果：
- `pnpm lint`：通过
- `pnpm typecheck`：通过
- `pnpm test`：通过，13 个测试文件、100 个测试
- `pnpm test:visual`：通过，38 个视觉契约测试
- `pnpm harness:engineering`：通过
- `pnpm build`：通过，已清理 Tailwind 任意变量背景类构建警告
- `pnpm dev --port 3199`：通过，本地开发服务已验证启动并停止
