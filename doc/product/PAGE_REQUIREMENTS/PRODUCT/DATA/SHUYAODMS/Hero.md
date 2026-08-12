# product/data/dlp
> 数曜·数据监管平台page-hero__visual     

使用

参考页面：https://www.emqx.com/zh/features/smart-data-hub 中的 <div class="hidden w-full max-w-lg lg:block xl:max-w-xl 2xl:max-w-2xl" style="opacity: 1; transform: none;"><div class="relative"><div class="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/15 blur-2xl" aria-hidden="true"></div><div class="relative overflow-hidden rounded-2xl border border-muted bg-default shadow-2xl"><div class="flex items-center justify-between border-b border-muted px-4 py-3"><div class="flex gap-1.5"><div class="size-3 rounded-full bg-red-500/70"></div><div class="size-3 rounded-full bg-yellow-500/70"></div><div class="size-3 rounded-full bg-green-500/70"></div></div><span class="text-xs font-medium text-muted">智能数据中心</span><div class="w-12"></div></div><div class="flex border-b border-muted"><button type="button" class="flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium transition-colors text-muted hover:text-highlighted"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-3.5" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><path d="M3 12a9 3 0 0 0 18 0"></path></g></svg><span class="hidden sm:inline">模式注册表</span></button><button type="button" class="flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium transition-colors border-b-2 border-primary text-highlighted"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-3.5" width="1em" height="1em" viewBox="0 0 24 24"> 进行 1:1 还原，不要发散，不要自行创作。

顶部：

智能数据中心 → 数据要素监管中心

三个 Tab：

模式注册表 → 流通接入

模式验证 → 风险识别

消息转换 → 监管处置

第一屏「流通接入」：

展示一条实时数据流通事件：

交易编号 TX-20260811-042

数据产品 企业经营分析数据集

提供方 数源科技

使用方 智联科技

使用目的 风险评估

授权期限 2026-12-31

并展示交易平台、授权信息、合同信息、主体信息依次完成接入。

底部提示「检测到新的数据流通活动，正在进入监管流程」。

第二屏「风险识别」：

左侧展示监管规则逐条扫描：

主体资质有效 ✓

数据产品已备案 ✓

使用目的已授权 ✓

敏感字段超范围 !

授权期限有效 ✓

右侧展示：

TX-20260811-042

数据产品 企业经营分析数据集

用途 风险评估

字段 128

敏感字段 6

授权字段 124

扫描到「敏感字段超范围」时使用 Amber 动态高亮。

顶部状态显示「发现风险」，Badge 显示「中风险」。

底部提示「检测到 4 个字段超出授权范围，触发监管规则」。

第三屏「监管处置」：

展示监管事件：

风险事件 EVT-20260811-017

风险等级 中风险

触发规则 数据使用范围校验

涉及主体 智联科技

处置状态 处理中

下方依次执行：

发现风险 → 生成预警 → 创建工单 → 通知责任方

节点随动画依次点亮，完成后显示「监管工单已创建」。

底部提示「风险事件已进入处置流程，全程留痕可追溯」。

整个动画按「流通接入 → 风险识别 → 监管处置」自动循环，底部三段进度条分别对应三个阶段。

正常状态使用 Primary/Emerald，风险状态使用 Amber/Red。

注意：
交互、动画、字体、样式等不要调整，不要发散，要1:1复制
注意动画宽度，参考DDP、DLP、DGP的page-hero__visual