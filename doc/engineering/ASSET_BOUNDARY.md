# Asset Boundary
> Version: 1.0  
> Last Updated: 2026-08-21

## Purpose
本文件定义 DeepTrols 官网运行时资产与产品需求附件的边界，避免页面构建直接依赖 `doc/product/**/imgs`，也避免同一素材在多个目录中无规则复制。

## Directory Roles
| 目录 | 用途 | 是否可被运行时代码直接引用 |
|----|----|----|
| `public/` | 需要以稳定 URL 暴露的公开静态资源，例如 Logo、视频背景、SEO 或无需指纹化的文件 | 可以 |
| `assets/` | 参与 Nuxt/Vite 构建、需要指纹化和 tree-shaking 的图片、SVG、样式资源 | 可以 |
| `doc/product/**/imgs` | 产品需求、参考图、原始附件、验收说明素材 | 默认不可以 |
| `doc/engineering/**` | 工程规范、审计报告、流程文档 | 不可以 |

## Runtime Asset Rules
1. 页面、组件、`data/*.ts` 若需要导入图片或 SVG，优先放入 `assets/images/**` 并使用 `?url`。
2. 需要通过绝对路径访问的资源放入 `public/**`，例如首页视频背景与站点 Logo。
3. `doc/product/**/imgs` 只作为需求来源和验收资料；运行时代码不得新增对该目录的直接导入。
4. 若确需临时引用产品文档附件，必须在当前任务文档记录原因、计划迁移位置和清理时间。
5. 资产命名使用小写英文、短横线分隔，避免中文、空格和平台相关符号进入运行时路径。

## Current Runtime Asset Buckets
| Bucket | 内容 |
|----|----|
| `assets/images/brand/` | DeepTrols 子品牌与模型生态 Logo |
| `assets/images/compatibility/` | 博曜国产化适配 Logo |
| `assets/images/why/` | Why DeepTrols 页面服务示意图 |
| `public/images/about/` | About Us 页面 Hero 背景视频 |
| `public/images/home/solutions/` | HOME 解决方案卡片图片 |

## Migration Rule
当产品文档新增图片后：

1. 先保留原始文件在 `doc/product/**/imgs`。
2. 若页面需要使用，复制一份到 `assets/images/<domain>/` 或 `public/images/<domain>/`。
3. 在代码中只引用运行时目录。
4. 在任务文档的“修改文件”中记录迁移关系。
