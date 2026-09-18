---
name: architecture-flow
description: 按 DeepTrolsWeb 房屋风格创建 VueFlow 产品架构图/流程图（Demo 或接入业务页面）。当用户要求"创建/复刻/新增 架构图、流程图、architecture diagram、flow 图"或提到 smart-data-hub / tag-platform / tanyao-iot / device-agent / knowledge-hub / regulation / flowmq 同类图时使用。涵盖文件组织、1704px 画布基准、节点/连线视觉配方、页面接入与门禁同步。
---

# DeepTrolsWeb 架构图 / 流程图创作规范

本项目已有 8 个同风格 VueFlow 架构图。新建图必须复用下述配方，保持全站视觉统一。

## 0. 现有图目录（先读再写，就近抄最像的）

| 图 | 目录 `components/demo/<dir>/` | 范式 | Demo 容器高 |
|---|---|---|---|
| 数曜·数据开发 | `smart-data-hub/` | 中心辐射（旋转圆环核心） | 560 |
| 数据要素监管 | `regulation/` | 多段横向流（5 源→core→3 应用） | 480 |
| 数据标签平台 | `tag-platform/` | 线性管道（3 阶段 process 卡） | 640 |
| FlowMQ 工作原理 | `flowmq/` | 线性管道（3×3 + 悬浮特性卡） | 460 |
| 博曜·知识中枢 | `knowledge-hub/` | 多段横向流（4 源→加工→中枢→3 应用） | 520 |
| 探曜 AIoT | `tanyao-iot/` | 多段横向流（3 设备组→Edge→平台→3 应用，带协议标签） | 520 |
| Device Agent | `device-agent/` | 多段横向流（5 源→双面板→集群→3 应用） | 580 |
| DeepTrols OPS（首页） | `EmqxPlatformArchitectureDemo.client.vue` 引用 | 中心辐射 | 560 |

页面接入先例：`components/product/tanyao/TanyaoSolutionSection.vue`、`components/product/device-agent/DeviceAgentArchitectureSection.vue`、`components/product/dlp/DlpArchitecture.vue`、`components/product/ddp/DdpArchitecture.vue`。

## 1. 文件组织（三层固定套路）

```
pages/demo/<name>.vue                        # 独立路由：layout:false + noindex
components/demo/<Name>Demo.client.vue        # 画布包装层（.client.vue 后缀必须）
components/demo/<name>/
  <Name>Flow.client.vue                      # VueFlow 编排：nodes/edges/viewport 常量
  <Name>Node.vue                             # 单文件多 kind 节点（v-if 分支）或拆分多 Node 组件
  <Name>Edge.vue / <Name>StepEdge.vue + <Name>CurveEdge.vue
```

Demo 路由模板（抄 `pages/demo/device-agent-architecture.vue`）：
- `definePageMeta({ layout: false })`、`useSeoMeta({ title: 'XX 架构 Demo - DeepTrols', robots: 'noindex, nofollow' })`
- `<main class="min-h-screen bg-dt-bg">`

Demo 包装层模板（抄 `components/demo/DeviceAgentArchitectureDemo.client.vue`）：
```html
<section class="overflow-x-auto bg-dt-bg px-4 py-16" aria-label="XX 架构 Demo">
  <div class="mx-auto min-w-[1704px] max-w-[1704px]">
    <div class="relative h-[NNNpx] w-full overflow-hidden" role="img" aria-label="XX 架构图，展示…连接到…">
      <XXFlow />
    </div>
  </div>
</section>
```
容器高按内容跨度取整（既有档位 460/480/520/560/580/640）。

## 2. 画布与几何

- **统一 1704px 内部画布基准**。复刻外部参考图时：节点尺寸与纵向坐标不动，只按比例加宽段间连接区，使总宽 = 1704。
  （先例：tanyao 1240→1704 连接区 120/120/80→294/294/196；device-agent 1170→1704 连接区 90/150/70→245/408/191）
- 横向典型 x 锚点：源列 `0`，中间面板 `375~602`，集群/核心 `850~953`，右侧应用卡 `1284~1384`。
- 右侧 3 张应用卡纵向间距约 170px（y ≈ 25~35 / 195~205 / 365~375）。
- **垂直居中公式**：`viewport.y = (容器高 − 内容跨度) / 2 − 内容最小y`。内容跨度要把虚线叠层的 `translate-y-2`（+8px）与阴影算进去（最低点通常是 execution/集群卡底 + 8）。
- Flow 可加可选 props `viewportY` / `zoom`（默认值 = Demo 值），供页面接入时覆盖（见 §6）。

## 3. VueFlow 编排样板（全部照抄，不要发明新配置）

```ts
import { VueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'

// 每个节点: { id, type: '<camelName>', position, data: { kind, ... }, selectable: false, draggable: false }
// 每条边:   { id: 'e-<source>-<target>', source, target, targetHandle?, data?, type: '<camelName>Curve|Step|Dynamic', animated: true, selectable: false }
const defaultViewport = { x: 0, y: <按§2公式>, zoom: 1 }
const proOptions = { hideAttribution: true }
```

```html
<VueFlow class="size-full" :nodes :edges :default-viewport
  :nodes-draggable="false" :nodes-connectable="false" :elements-selectable="false"
  :zoom-on-scroll="false" :zoom-on-pinch="false" :pan-on-drag="false" :pan-on-scroll="false"
  :zoom-on-double-click="false" :prevent-scrolling="true" :pro-options="proOptions">
  <template #node-xxx="{ data }"><XxxNode :data="data" /></template>
  <template #edge-xxxStep="edgeProps"><XxxStepEdge v-bind="edgeProps" /></template>
  <template #edge-xxxCurve="edgeProps"><XxxCurveEdge v-bind="edgeProps" /></template>
</VueFlow>
```

Handle 约定：
- 隐形配方常量：`const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'`
- 同一节点多个同类型 handle 必须给 `id` 并在 edge 上指定 `sourceHandle`/`targetHandle`（如集群左侧双入点 `left-top` `!top-[22%]`、`left-bottom` `!top-[88%]`；knowledge-hub 加工面板 `left-1..4` = `!top-[10%/30%/50%/70%]`）。

## 4. 节点视觉配方（Tailwind v4，禁 `<style>` 块）

通用：所有文本 `whitespace-nowrap`；图标 `aria-hidden="true"`；卡片 `bg-white`；主文本 `text-dt-text-highlighted`、次文本 `text-dt-text-muted`。

**a) 源/设备小卡**（左列）
```
flex w-[130px~220px] items-center gap-2 rounded-lg border bg-white px-3 py-1.5 shadow-lg
border-{tone}-500/25 shadow-{tone}-500/15   # tone: violet|blue|pink|emerald|cyan|orange|amber
图标 size-4~5 text-{tone}-500；标签 text-xs~sm font-semibold
```

**b) 虚线三层叠板**（中间面板 / 集群卡）
```html
<div class="relative h-[H] w-[W]">
  <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white"></div>
  <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white"></div>
  <div class="relative flex h-full flex-col rounded-2xl border border-dashed border-primary/50 bg-white px-4~5 py-3~4 text-left shadow-lg">
```
- 品牌 pill：`inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 py-1~1.5 pl-2 pr-3` + logo `size-4~[18px]` + `text-[11px]~xs font-semibold text-primary`
- 面板条目：`rounded-lg border border-primary/25 bg-primary/5 px-2.5 py-2` + 图标 `size-3.5 text-primary/60` + `text-[10px]~[11px] font-semibold`
- 特定产品线可换色：探曜 Edge 面板用 `#189bfe` 任意值（border-[#189bfe]/50 等）替代 primary
- **集群卡**（240×460）：primary 节点 `border-primary/20 bg-primary/5 px-3 py-2.5` 内含三条渐淡色块 `h-2.5 w-5 rounded-sm bg-primary/40、/30、/20`；tags `border-primary/15 bg-primary/5 text-[9px] text-primary/70`；普通节点三色块 `/30、/20、/15`；中部 `......`（`text-xs font-bold tracking-widest text-primary/40`）；末节点加 `opacity-70`
- 品牌 logo 一律用 `~/assets/images/brand/*.svg`（tanyao-iot / shuyao / boyao / zhiyao），不引外链

**c) 应用卡**（右列，320px）
```
relative flex w-[320px] flex-col gap-3 rounded-2xl border border-accented(或 border-dt-line) bg-white p-5 shadow-lg
h3 text-sm font-bold；grid grid-cols-3 gap-4；图标盒 size-8；图标 size-6 + colorClass；标签 text-xs font-medium text-dt-text-muted
```
图标专用色（固定搭配）：`text-[#8B5CF6]` / `text-[#0EA5E9]` / `text-[#10B981]` / `text-[#FDB515]` / `text-[#231F20] dark:text-[#E8E8E8]` / `text-[#6366F1]` / `text-[#F59E0B]`。

**d) 图标来源**
- 首选 lucide：`import { Xxx } from '@lucide/vue'`（先确认图标名存在于 `@lucide/vue` d.ts）
- 无 lucide 对应的品牌图标（Kafka/TimescaleDB 类）：新建内联 SVG 组件，`fill="currentColor"` + 原 viewBox，颜色靠外部 `colorClass`（支持 dark: 变体）——参照 `device-agent/KafkaIcon.vue`、`TimescaleIcon.vue`
- 节点 data 中 icon 类型为 `Component`（组件）或 `string`（logo url，用 `<img>` 渲染）

## 5. 连线配方（紫色 oklch 渐变体系，全站统一）

Edge 组件根节点固定：`<g class="vue-flow__edge vue-flow__edge-gradient nopan animated inactive" role="group">`（step 用 `vue-flow__edge-step`）。
三层 path 固定：辉光层（`filter: url(#glow)`，`stroke-opacity="0.4"`，`feGaussianBlur stdDeviation=2`）+ 主线（`class="vue-flow__edge-path"`，`:id="id"`）+ 交互层（`stroke-width="20" stroke-opacity="0" class="vue-flow__edge-interaction"`）。
渐变必须 `gradientUnits="userSpaceOnUse"` 且 `x1/y1=source、x2/y2=target`；gradientId/glowId 由 `props.id` 派生防重复。

| 方向 | stop 0% | 50% | 100% | 辉光宽 | 主线宽 |
|---|---|---|---|---|---|
| 入站（源→平台） | `oklch(0.75 0.15 300)` @.35 | `oklch(0.65 0.2 290)` @.55 | `oklch(0.55 0.25 285)` @.75 | 2.5 | 1.5 |
| 出站（平台→应用） | `oklch(0.55 0.25 285)` @.7 | `oklch(0.6 0.2 285)` @.75 | `oklch(0.7 0.15 280)` @.85 | 3 | 2 |

路径两种：
- **贝塞尔**：`M${sx},${sy} C${mx},${sy} ${mx},${ty} ${tx},${ty}`，`mx=(sx+tx)/2`
- **圆角折线**：`getSmoothStepPath({ ..., borderRadius: 8, offset: 20 })[0]`

可选 EdgeLabelRenderer 标签（tanyao 协议标签先例）：
```html
<div class="nodrag nopan pointer-events-none absolute whitespace-pre-line rounded-md border border-dt-line bg-white/80 px-2 py-1 text-center text-[10px] font-medium leading-tight text-dt-text-muted backdrop-blur-sm"
     :style="{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }">
```
多条入线交汇标签：data 加 `labelAtJunction: true`，`labelY = props.targetY`。

## 6. 接入业务页面（区别于 Demo）

套路（抄 `TanyaoSolutionSection.vue` / `DeviceAgentArchitectureSection.vue`）：
```html
<ProductArchitectureSection eyebrow title title-id subtitle label="XX 架构图" fallback-text="XX 架构图加载中">
  <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
    <div class="absolute left-1/2 top-1/2 h-[NNNpx] w-[1704px] -translate-x-1/2 -translate-y-1/2">
      <ClientOnly>
        <XXFlow />   <!-- 需要时传 :viewport-y / :zoom 覆盖 -->
        <template #fallback><div class="size-full" aria-hidden="true"></div></template>
      </ClientOnly>
    </div>
  </div>
</ProductArchitectureSection>
```
- **格子背景**：`ProductSystemFlowFrame` grid 默认开启；除非用户明确要求，不传 `:grid="false"`
- 帧高固定 560px（共享组件，多处锁定，**不要改**）。内容跨度 > 560 时：给 Flow 加 `viewportY`/`zoom` props，页面侧传 `zoom = 560/跨度`（≥0.98 视觉不可感知）+ 对应居中 `viewportY`（device-agent 先例：565px 跨度 → `:zoom="0.98" :viewport-y="24.7"`）
- 接入必须同轮同步：对应 `scripts/harness/checks/**` 镜像锁 + `tests/visual/**.contract.ts` 契约 + `doc/tasks/review/TASK-*.md` 文档，否则门禁挂
- **纯 Demo（pages/demo + components/demo）不注册 harness/契约**，但任务文档照写

## 7. 硬性约束

- 纯 Tailwind v4：新建 flow/node/edge/demo 组件内**禁止 `<style>` 块、禁止行内 style**（EdgeLabelRenderer 的 transform 除外，它是动态定位）
- 所有 node `selectable:false, draggable:false`；所有 edge `animated:true, selectable:false`
- Node data 用 TypeScript interface 判别联合（`kind` 字段）；模板分支用 `v-if / v-else-if="data.kind === 'xxx'"`（**不要留裸 `v-else` 访问判别字段，typecheck 会报联合收窄错误**）
- `.client.vue` 后缀：Demo 包装层与 Flow 组件必须（VueFlow 依赖浏览器 API）
- 模拟内容在注释中标注「模拟样例」

## 8. 验证清单（每次必做）

1. 门禁：`pnpm lint && pnpm typecheck && pnpm test && pnpm test:visual && pnpm harness:engineering`（跳过 build，保护 dev 实例）
2. typecheck 会删 `.nuxt/dist` 触发 dev 重启 → 提醒用户硬刷新；新路由需确认 dev 已完成路由扫描
3. SSR curl 验证：新 Demo 路由 200 + `min-w-[1704px]` / 容器高 / aria-label 标记命中；接入页面验证 `product-system-flow-frame--grid`、居中盒类串、旧占位文案零残留
4. 几何自查：最低内容点（含虚线叠层 +8px）+ viewport.y ≤ 容器高；最高点 ≥ 0
5. 不主动 commit；提交信息格式 `feat(TASK-014.NN): add <name> architecture demo`
