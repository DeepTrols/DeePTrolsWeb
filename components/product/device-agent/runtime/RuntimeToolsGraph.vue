<script setup lang="ts">
import { ChartNoAxesCombined, Cpu, Database, FileText, Send, UserCheck } from '@lucide/vue'
import { computed } from 'vue'
import IconBox from '~/components/common/card/IconBox.vue'
import RuntimeToolsHex from '~/components/product/device-agent/runtime/RuntimeToolsHex.vue'

const props = defineProps<{
  call: number | null
  dot: { seg: 'a' | 'b', p: number, row: number } | null
}>()

const sources = [
  { title: '数据平台', sub: '查询 / 写入', icon: Database },
  { title: '设备管理', sub: '接入 / 监测', icon: Cpu },
  { title: '企业系统', sub: 'ERP / OA / CRM', icon: FileText },
]

const mcpTools = [
  { title: '数据查询', name: 'tables.query', icon: ChartNoAxesCombined },
  { title: '指令下发', name: 'device.command', icon: Send },
  { title: '人工审批', name: 'humans.approve', icon: UserCheck },
]

// 连接线坐标系按断点取整像素：base viewBox 0 0 128 198（中列 96px + 两侧 gap 16px），
// xl viewBox 0 0 198 241（中列 150px + 两侧 gap 24px）。行中心恒为总高 1/6、1/2、5/6。
type Geo = {
  w: number
  rows: readonly number[]
  ports: readonly number[]
  cx: number
  tuckL: number
  tuckR: number
  nodeL: number
  nodeR: number
}

const BASE_GEO: Geo = { w: 128, rows: [33, 99, 165], ports: [86.75, 99, 111.25], cx: 14, tuckL: 32, tuckR: 96, nodeL: 28, nodeR: 100 }
const XL_GEO: Geo = { w: 198, rows: [40.2, 120.5, 200.8], ports: [101.5, 120.5, 139.5], cx: 21, tuckL: 46, tuckR: 152, nodeL: 42, nodeR: 156 }

// 柔和贝塞尔：水平离开卡片侧边，S 形弯曲后水平接入六边形平边，无 90° 折线。
function leftPath(geo: Geo, rowY: number, portY: number): string {
  return `M 0 ${rowY} C ${geo.cx} ${rowY}, ${geo.cx} ${portY}, ${geo.tuckL} ${portY}`
}

function rightPath(geo: Geo, rowY: number, portY: number): string {
  const cxr = geo.w - geo.cx
  return `M ${geo.w} ${rowY} C ${cxr} ${rowY}, ${cxr} ${portY}, ${geo.tuckR} ${portY}`
}

const baseLeftPaths = BASE_GEO.rows.map((rowY, index) => leftPath(BASE_GEO, rowY, BASE_GEO.ports[index] ?? rowY))
const baseRightPaths = BASE_GEO.rows.map((rowY, index) => rightPath(BASE_GEO, rowY, BASE_GEO.ports[index] ?? rowY))
const xlLeftPaths = XL_GEO.rows.map((rowY, index) => leftPath(XL_GEO, rowY, XL_GEO.ports[index] ?? rowY))
const xlRightPaths = XL_GEO.rows.map((rowY, index) => rightPath(XL_GEO, rowY, XL_GEO.ports[index] ?? rowY))

type Curve = { p0: [number, number], p1: [number, number], p2: [number, number], p3: [number, number] }

function bezierPoint(curve: Curve, t: number): { x: number, y: number } {
  const u = 1 - t
  const w0 = u * u * u
  const w1 = 3 * u * u * t
  const w2 = 3 * u * t * t
  const w3 = t * t * t
  return {
    x: w0 * curve.p0[0] + w1 * curve.p1[0] + w2 * curve.p2[0] + w3 * curve.p3[0],
    y: w0 * curve.p0[1] + w1 * curve.p1[1] + w2 * curve.p2[1] + w3 * curve.p3[1],
  }
}

function dotCurve(geo: Geo, dot: NonNullable<typeof props.dot>): Curve {
  const rowY = geo.rows[dot.row] ?? 0
  const portY = geo.ports[dot.row] ?? rowY
  const cxr = geo.w - geo.cx
  if (dot.seg === 'a') {
    return { p0: [0, rowY], p1: [geo.cx, rowY], p2: [geo.cx, portY], p3: [geo.tuckL, portY] }
  }
  return { p0: [geo.tuckR, portY], p1: [cxr, portY], p2: [cxr, rowY], p3: [geo.w, rowY] }
}

const baseDot = computed(() => (props.dot ? bezierPoint(dotCurve(BASE_GEO, props.dot), props.dot.p) : null))
const xlDot = computed(() => (props.dot ? bezierPoint(dotCurve(XL_GEO, props.dot), props.dot.p) : null))

function strokeClass(index: number): string {
  return props.call === index ? 'stroke-primary/70' : 'stroke-primary/30'
}
</script>

<template>
  <div class="grid h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 xl:gap-6">
    <div class="grid h-full grid-rows-3 grid-cols-[minmax(0,1fr)]">
      <div
        v-for="(source, index) in sources"
        :key="source.title"
        class="flex h-14 w-full items-center gap-2 self-center rounded-lg border p-1.5 transition-colors duration-300 xl:h-16 xl:p-2"
        :class="call === index ? 'border-primary/40 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20'"
      >
        <IconBox :icon="source.icon" :tone="call === index ? 'primary' : 'soft'" class="shrink-0" />
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold text-highlighted">{{ source.title }}</p>
          <p class="truncate text-xs leading-4 text-muted">{{ source.sub }}</p>
        </div>
      </div>
    </div>

    <div class="relative w-24 xl:w-[150px]">
      <svg class="absolute inset-y-0 -left-4 -right-4 overflow-visible xl:hidden" viewBox="0 0 128 198" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path
          v-for="(d, index) in baseLeftPaths"
          :key="`bl-${index}`"
          :d="d"
          class="transition-colors duration-300"
          :class="strokeClass(index)"
          stroke-width="1"
          stroke-dasharray="4 5"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          v-for="(d, index) in baseRightPaths"
          :key="`br-${index}`"
          :d="d"
          class="transition-colors duration-300"
          :class="strokeClass(index)"
          stroke-width="1"
          stroke-dasharray="4 5"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
        <g class="fill-primary drop-shadow-[0_0_3px_rgba(139,92,246,0.5)]">
          <template v-for="(rowY, index) in BASE_GEO.rows" :key="`bn-${index}`">
            <circle :cx="0" :cy="rowY" r="3" />
            <circle :cx="BASE_GEO.w" :cy="rowY" r="3" />
            <circle :cx="BASE_GEO.nodeL" :cy="BASE_GEO.ports[index] ?? 0" r="3" />
            <circle :cx="BASE_GEO.nodeR" :cy="BASE_GEO.ports[index] ?? 0" r="3" />
          </template>
        </g>
        <circle v-if="baseDot" :cx="baseDot.x" :cy="baseDot.y" r="3" class="fill-primary" />
      </svg>
      <svg class="absolute inset-y-0 -left-6 -right-6 hidden overflow-visible xl:block" viewBox="0 0 198 241" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path
          v-for="(d, index) in xlLeftPaths"
          :key="`xl-${index}`"
          :d="d"
          class="transition-colors duration-300"
          :class="strokeClass(index)"
          stroke-width="1"
          stroke-dasharray="4 5"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          v-for="(d, index) in xlRightPaths"
          :key="`xr-${index}`"
          :d="d"
          class="transition-colors duration-300"
          :class="strokeClass(index)"
          stroke-width="1"
          stroke-dasharray="4 5"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
        <g class="fill-primary drop-shadow-[0_0_3px_rgba(139,92,246,0.5)]">
          <template v-for="(rowY, index) in XL_GEO.rows" :key="`xn-${index}`">
            <circle :cx="0" :cy="rowY" r="3" />
            <circle :cx="XL_GEO.w" :cy="rowY" r="3" />
            <circle :cx="XL_GEO.nodeL" :cy="XL_GEO.ports[index] ?? 0" r="3" />
            <circle :cx="XL_GEO.nodeR" :cy="XL_GEO.ports[index] ?? 0" r="3" />
          </template>
        </g>
        <circle v-if="xlDot" :cx="xlDot.x" :cy="xlDot.y" r="3" class="fill-primary" />
      </svg>

      <RuntimeToolsHex :active="call !== null" />
    </div>

    <div class="grid h-full grid-rows-3 grid-cols-[minmax(0,1fr)]">
      <div
        v-for="(tool, index) in mcpTools"
        :key="tool.name"
        class="flex h-14 w-full items-center gap-2 self-center rounded-lg border p-1.5 transition-colors duration-300 xl:h-16 xl:p-2"
        :class="call === index ? 'border-primary/40 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20'"
      >
        <IconBox :icon="tool.icon" :tone="call === index ? 'primary' : 'soft'" class="shrink-0" />
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold text-highlighted">{{ tool.title }}</p>
          <p class="truncate font-mono text-xs leading-4 text-muted">{{ tool.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
