<script setup lang="ts">
import { computed } from 'vue'
import { Position } from '@vue-flow/core'

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
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: () => ({}),
  },
)

const edgePath = computed(() => {
  const centerX = (props.sourceX + props.targetX) / 2
  return `M${props.sourceX},${props.sourceY} C${centerX},${props.sourceY} ${centerX},${props.targetY} ${props.targetX},${props.targetY}`
})
const gradientId = computed(() => `edge-gradient-${props.id}`)
const glowId = computed(() => `edge-glow-${props.id}`)
// 出站边（智能决策 → 四预应用）加粗并采用更亮的渐变色阶，与入站边区分；
// userSpaceOnUse 渐变天然支持双轨汇聚的纵向斜连线，零改动
const isOutbound = computed(() => props.data.outbound === true)
const glowStrokeWidth = computed(() => (isOutbound.value ? '3' : '2.5'))
const mainStrokeWidth = computed(() => (isOutbound.value ? '2' : '1.5'))
</script>

<template>
  <g class="vue-flow__edge vue-flow__edge-gradient nopan animated inactive" role="group">
    <defs>
      <linearGradient v-if="isOutbound" :id="gradientId" gradientUnits="userSpaceOnUse" :x1="sourceX" :y1="sourceY" :x2="targetX" :y2="targetY">
        <stop offset="0%" stop-color="oklch(0.55 0.25 285)" stop-opacity="0.7" />
        <stop offset="50%" stop-color="oklch(0.6 0.2 285)" stop-opacity="0.75" />
        <stop offset="100%" stop-color="oklch(0.7 0.15 280)" stop-opacity="0.85" />
      </linearGradient>
      <linearGradient v-else :id="gradientId" gradientUnits="userSpaceOnUse" :x1="sourceX" :y1="sourceY" :x2="targetX" :y2="targetY">
        <stop offset="0%" stop-color="oklch(0.75 0.15 300)" stop-opacity="0.35" />
        <stop offset="50%" stop-color="oklch(0.65 0.2 290)" stop-opacity="0.55" />
        <stop offset="100%" stop-color="oklch(0.55 0.25 285)" stop-opacity="0.75" />
      </linearGradient>
      <filter :id="glowId" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path :d="edgePath" fill="none" :stroke="`url(#${gradientId})`" :stroke-width="glowStrokeWidth" stroke-opacity="0.4" :filter="`url(#${glowId})`" stroke-linecap="round" />
    <path :id="id" :d="edgePath" class="vue-flow__edge-path" :stroke="`url(#${gradientId})`" :stroke-width="mainStrokeWidth" fill="none" />
    <path :d="edgePath" fill="none" stroke-width="20" stroke-opacity="0" class="vue-flow__edge-interaction" />
  </g>
</template>
