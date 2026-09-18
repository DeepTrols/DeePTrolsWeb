<script setup lang="ts">
import { computed } from 'vue'
import { Position } from '@vue-flow/core'

// 回流闭环边：从右列智能应用底部下行至回流 lane，横向穿过画布底部，再上行回到左列制造现场底部，
// 以圆角 U 形路径表达「执行 → 反馈 → 生产现场」的智能闭环。采用出站色阶（更亮、2px）。
const props = withDefaults(
  defineProps<{
    id: string
    sourceX?: number
    sourceY?: number
    targetX?: number
    targetY?: number
    sourcePosition?: Position
    targetPosition?: Position
    data?: { outbound?: boolean }
  }>(),
  {
    sourceX: 0,
    sourceY: 0,
    targetX: 0,
    targetY: 0,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Bottom,
    data: () => ({}),
  },
)

const laneY = computed(() => Math.max(props.sourceY, props.targetY) + 44)
const corner = 8
const edgePath = computed(() => {
  const { sourceX: sx, targetX: tx } = props
  const y = laneY.value
  const dir = sx > tx ? -1 : 1
  return `M${sx},${props.sourceY} L${sx},${y - corner} Q${sx},${y} ${sx + dir * corner},${y} L${tx - dir * corner},${y} Q${tx},${y} ${tx},${y - corner} L${tx},${props.targetY}`
})
const gradientId = computed(() => `edge-gradient-${props.id}`)
const glowId = computed(() => `edge-glow-${props.id}`)
</script>

<template>
  <g class="vue-flow__edge vue-flow__edge-gradient nopan animated inactive" role="group">
    <defs>
      <linearGradient :id="gradientId" gradientUnits="userSpaceOnUse" :x1="sourceX" :y1="sourceY" :x2="targetX" :y2="targetY">
        <stop offset="0%" stop-color="oklch(0.55 0.25 285)" stop-opacity="0.7" />
        <stop offset="50%" stop-color="oklch(0.6 0.2 285)" stop-opacity="0.75" />
        <stop offset="100%" stop-color="oklch(0.7 0.15 280)" stop-opacity="0.85" />
      </linearGradient>
      <filter :id="glowId" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path :d="edgePath" fill="none" :stroke="`url(#${gradientId})`" stroke-width="3" stroke-opacity="0.4" :filter="`url(#${glowId})`" stroke-linecap="round" />
    <path :id="id" :d="edgePath" class="vue-flow__edge-path" :stroke="`url(#${gradientId})`" stroke-width="2" fill="none" />
    <path :d="edgePath" fill="none" stroke-width="20" stroke-opacity="0" class="vue-flow__edge-interaction" />
  </g>
</template>
