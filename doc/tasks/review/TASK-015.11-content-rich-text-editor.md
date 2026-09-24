# TASK-015.11 内容管理正文编辑器改造：JSON 文本框 → vben tiptap 富文本

> 背景：015.6 内容 CRUD 落地时正文 blocks 是手填 `ArticleBlock[]` JSON 的 Textarea，运营不可用。本任务把新闻/案例编辑页正文换成 vben 自带 tiptap3 富文本（`@vben/plugins/tiptap` 的 `VbenTiptap`，零新依赖），**存储协议不变**——富文本只做编辑面，blocks ↔ HTML 双向转换，服务端 zod 判别联合兜底不动。

## 决策（用户拍板）

- tiptap 全部工具栏按钮保留，保存时剥离行内格式（加粗/斜体/链接/颜色），编辑器下方静态提示文案说明
- 不保留 JSON 高级模式，纯富文本
- 报告（reports）无 blocks 字段，不在本次范围；仅新闻 + 案例两个编辑页

## 改动

### 1. `src/views/content/shared/blocks-html.ts`（新，纯函数零依赖）

- `blocksToHtml(blocks)`：heading→`<h2-4>`（level 夹紧）、paragraph→`<p>`、list→`<ul>/<ol><li>`、quote→`<blockquote>`、image→`<p><img></p>`、divider→`<hr>`；`escapeHtml` 防注入
- `htmlToBlocks(html)`：DOMParser 遍历 body 顶层节点——h1-h6→heading（level 夹紧 2-4，h1→2）、p→paragraph（空跳过；只含 img/br 的 p→image 块）、ul/ol→list、blockquote→quote、hr→divider、裸 img→image（alt 空回退 `'正文配图'` 满足 zod min(1)）；`pre/table/figure` 等不支持节点进 `problems` 并跳过；行内格式靠 textContent 自然剥离

### 2. `src/views/content/shared/BlocksEditor.vue`（新）

- `defineModel<null | unknown[]>('blocks')`——null = HTML 无法转换或正文为空，父级据此阻止保存
- 内部 `html` ref + `lastEmitted` 哨兵：外部 model 变化才 `blocksToHtml` 回灌，本组件转换产出的直接跳过，防打字回环。**哨兵比较必须 `toRaw(value) === lastEmitted`**——父级 `ref()` 会把数组包成 reactive Proxy，回传的 model 是 Proxy 而非原引用，直接 `===` 会让每次击键都误判为外部变更，触发 setContent 重置光标并吞掉刚输入的字符（E2E 实测复现：点击文档中部输入，光标跳到文末）
- `<VbenTiptap v-model="html" :image-upload :min-height="320" @change="onChange">`；`imageUpload.upload` 复用 015.7 媒体库 `uploadMediaApi(file)` 返回 `asset.path`
- `onChange`：htmlToBlocks → 有 problems 或空正文 → `blocks.value = null` + 红色 warning 列表；否则落回转换结果
- 底部提示：「支持 标题(H2-H4)/段落/列表/引用/图片/分割线；加粗、斜体、链接、颜色等行内格式保存时会被去除」

### 3. 编辑页改造（news/edit.vue、cases/edit.vue）

- 删 `blocksText`/`blocksPlaceholder`/blocks 的 `parseJsonField` 分支与 Textarea（cases 保留 relatedProducts 的 JSON Textarea）
- `const blocksValue = ref<null | unknown[]>(null)`；编辑加载时 `blocksValue.value = payload.blocks`；新建页不再预填占位段落（空态，保存被拦截）
- 模板换 `<BlocksEditor v-model:blocks="blocksValue" />`
- `save()` 首查 `blocksValue.value === null` → `message.error('正文为空或包含不支持的元素，请检查编辑器内容')` 中止

### 4. 门禁锁（015.10 D3 同一先例）

- `required-files.mjs` +2、`sources.mjs` +2（contentBlocksHtml/contentBlocksEditor）
- `backend-admin.mjs` +1 assert（blocksToHtml/htmlToBlocks/escapeHtml/clampHeadingLevel/VbenTiptap/defineModel blocks/uploadMediaApi/lastEmitted）
- `admin-api.contract.ts` 镜像同项断言 + 两个编辑页 BlocksEditor 接入与 blocksText 移除

## 验证

- vben 侧：`cd admin && pnpm lint` + `cd apps/web-antd && pnpm typecheck` 全绿
- 根仓：lint / typecheck / test(208) / test:visual(65) / harness:engineering / build 全绿
- 真实浏览器 E2E（playwright `chromium.launch({ channel: 'chrome' })` 驱系统 Chrome，脚本临时文件用完即删）全部通过：
  - 登录 → `/content/news/26` → 编辑器渲染出已有正文（标题/段落/图片均命中）
  - 追加段落 → 保存 → `GET /api/admin/news/26` 断言尾部是新 paragraph
  - 选中该段加粗（Cmd+B）→ 保存 → API 断言落库为纯文本（剥离生效）
  - 还原原始 blocks → 断言与快照 deep-equal，零残留
  - 新建页打开 → 编辑器空态、保存被「正文为空或包含不支持的元素」拦截且不跳转
  - 官网 `/news/26` SSR 200，h1 与首段落正常渲染

## 备注 / 坑

- **defineModel 数组哨兵必须 toRaw 比较**（本任务最大坑）：父组件 `ref<unknown[]>(null)` 持有 model 时，回传给子组件 defineModel 的数组是 Vue reactive Proxy，与子组件保存的原引用 `===` 为 false。表象是每次击键后 watcher 误判外部变更 → `blocksToHtml` 重新生成 HTML → tiptap `setContent` → 光标跳到文末 + 首字符被吞。排查手段：给 emit 的数组挂 `__dbg` 随机数，watcher 里对比发现「不同实例但 __dbg 相同」实锤 Proxy 克隆
- **E2E 合成修饰键导航在 contenteditable 不可靠**（Meta+End/Home/Shift+End 落点飘忽）；可靠做法：click 聚焦后 `page.evaluate` 用 DOM Selection API（`range.selectNodeContents(root); range.collapse(false)` 钉文末 / 选中目标段落）再 `keyboard.type` / `ControlOrMeta+b`
- **admin 登录限流 5 次/10 分钟（内存滑动窗口）**，E2E 反复登录会 429。绕过：curl 登录拿 `dt-admin` cookie 注入 playwright context（cookie 不按端口隔离，5666 代理同源可用）+ localStorage 预置 `dt-admin-5.7.0-dev-core-access`（`{accessToken:'cookie-session',accessCodes:['super']}`，DEV 下 pinia persist 是明文 localStorage）
- 登录表单只有 password 单字段（无 username）
- `VbenTiptap` 的 `defineModel<string>` 是 HTML；`imageUpload` 选项仅在使用默认 extensions 时生效（自定义 extensions 会隐藏上传按钮）
- DOMParser 仅浏览器侧可用——blocks-html.ts 是 vben 前端模块，不进服务端/测试（测试只锁源码文本）
- 行内格式剥离依赖 textContent：`<p>a<strong>b</strong>c</p>` → paragraph `abc`，链接/颜色同理；用户已确认可接受
- 不支持元素（pre/table 等）不丢内容提示：problems 列出标签名并阻止保存，内容仍留在编辑器里可手动删改
- E2E 失败会留脏数据：脚本务必自带「先快照原 blocks、最后还原并 deep-equal 断言」闭环（本任务首次跑挂在中途，靠快照手工 PUT 还原）
