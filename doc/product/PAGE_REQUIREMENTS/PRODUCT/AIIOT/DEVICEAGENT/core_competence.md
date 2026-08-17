# DEVICEAGENT
> Device Agent-核心能力-多源事件触发右侧动画调整

要求：不允许新建样式，必须通过Tailwind CSS v4


## 修改模块：多源事件触发右侧动画
- 参考 https://www.emqx.com/zh/cloud/emqx-agents 中<div class="rounded-xl border border-primary/20 bg-primary/5 p-4"><div class="mb-3 flex items-center justify-between gap-3"><div class="flex min-w-0 items-center gap-3"><div class="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-5 text-primary" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9m2.9 2.8a6.14 6.14 0 0 0-.8 7.5"></path><circle cx="12" cy="9" r="2"></circle><path d="M16.2 4.8c2 2 2.26 5.11.8 7.47M19.1 1.9a9.96 9.96 0 0 1 0 14.1m-9.6 2h5M8 22l4-11l4 11"></path></g></svg><span class="absolute inset-0 animate-ping rounded-xl bg-primary/10"></span></div><div class="min-w-0"><p class="text-xs font-medium text-primary">topic filter</p><p class="truncate font-mono text-base font-semibold text-highlighted">factory/+/robot/+</p></div></div><span class="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">实时</span></div></div>

topic filter 修改为 DEVICE AGENT
factory/+/robot/+ 默认为 等待事件


- 中间部分 参考 <div class="rounded-xl border border-muted/60 bg-default p-4"><div class="mb-3 flex items-center gap-2"><div class="h-1.5 flex-1 rounded-full transition-colors duration-200 bg-primary"></div><div class="h-1.5 flex-1 rounded-full transition-colors duration-200 bg-primary"></div><div class="h-1.5 flex-1 rounded-full transition-colors duration-200 bg-muted"></div></div><div class="flex items-start gap-3"><div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--lucide size-4" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 3H2l8 9.46V19l4 2v-8.54z"></path></svg></div><div class="min-w-0"><p class="text-sm font-semibold text-highlighted">过滤与去抖</p><p class="mt-1 text-xs leading-5 text-muted">把噪声遥测压缩成可行动的信号。</p></div></div></div>

如参考部分将3个进度条改为4个进度条，分别对应以下内容
设备事件                                 61.8°C
ESS-01 / 电芯温度异常

指标告警                                 当前 61.8°C
最高电芯温度 > 55°C

规则事件                                 已命中
持续高温规则

定时任务                                 10:00
储能柜巡检

4个进度条完成后， 等待事件 变为 事件已触发

- 底部使用现有布局与交互，但是需要将字体 修改为text-sm
- 让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。 应该在<div class="flex min-h-0 flex-1 flex-col rounded-xl border border-dt-line-strong/60 bg-dt-bg p-4"><div class="grid grid-cols-2 gap-2">外，
<div class="relative border-t border-muted/40 px-5 py-4"><div class="flex items-center justify-between gap-4"><p class="max-w-xl text-sm text-muted lg:line-clamp-2" title="让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。">让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。</p><!----></div></div>
实现说明（TASK-008.4）：`RuntimeEventPanel.vue` 按上述要求重构，全部使用 Tailwind CSS v4，无新增样式块。顶部 DEVICE AGENT 状态卡采用 `rounded-xl border border-primary/20 bg-primary/5 p-3` + `animate-ping` 图标覆盖层，状态值由 `triggered ? '事件已触发' : '等待事件'` 切换（4 条进度条全部点亮后触发）；因站点主题未定义 success 色，右侧徽标使用 `bg-primary/10 text-primary`（文案「实时」）。中部卡片 `rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5`（参考页 `border-muted/60 bg-default` 的暗色等价）内置 4 条 `h-1.5 flex-1 rounded-full transition-colors duration-200` 进度条，未激活为 `bg-dt-bg-soft`、激活转 `bg-primary`，下方四行事件内容（标题 · 详情 + 等宽数值）随对应进度条同步渐显。底部流水线保留原布局与交互，字体升级为 `text-sm`（行内边相应调整为 `py-0.5` 以维持 lg 固定高度预算）。说明文案通过 `RuntimePanelShell` 新增的可选 `footer` 插槽移出内层卡片，footer 为 `border-t border-dt-line-strong/40 px-5 py-4` + `max-w-xl text-sm text-muted lg:line-clamp-2`（`border-muted/40` 暗色等价为 `border-dt-line-strong/40`）；其余 5 个面板未传 footer，渲染不受影响。动画时间轴：进度条 600ms 起每 600ms 点亮一条，2900ms 状态切换，流水线 3500ms 起每 700ms 出现一条，总时长 5800ms。

footer 分割线修正补充（TASK-008.5）：footer 由 `p-5` 内衬区域移至 `RuntimePanelShell` 面板根级，`border-t` 分割线左右贴合面板外边框，与内层卡片之间保留 `p-5` 底部 20px 间距；事件面板内容高度预算不变。

流水线卡片化补充（TASK-008.5）：事件校验 / 事件去重 / 上下文构建由竖排列表改为 `grid grid-cols-3` 横向三卡片，初始状态即全部可见；每张卡片带主题 icon（ShieldCheck / Combine / Layers）与状态 SVG 演变（CircleDashed 待处理 → LoaderCircle 进行中 → CircleCheck 完成），并通过背景色 `bg-dt-bg-soft/20` → `bg-primary/10` → `bg-primary/5` 的过渡呈现阶段推进，上下文构建在循环终态保持进行中。
