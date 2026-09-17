<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    sourceX?: number
    sourceY?: number
    targetX?: number
    targetY?: number
    data?: { variant?: 'step' | 'curve' }
  }>(),
  {
    sourceX: 0,
    sourceY: 0,
    targetX: 0,
    targetY: 0,
    data: () => ({ variant: 'step' }),
  },
)

const edgePath = computed(() => {
  const centerX = (props.sourceX + props.targetX) / 2
  if (props.data?.variant === 'curve') {
    return `M ${props.sourceX} ${props.sourceY} C ${centerX} ${props.sourceY}, ${centerX} ${props.targetY}, ${props.targetX} ${props.targetY}`
  }
  return `M ${props.sourceX} ${props.sourceY} L ${centerX} ${props.sourceY} L ${centerX} ${props.targetY} L ${props.targetX} ${props.targetY}`
})
const gradientId = computed(() => `knowledge-hub-gradient-${props.id}`)
const glowId = computed(() => `knowledge-hub-glow-${props.id}`)
</script>

<template>
  <g class="vue-flow__edge vue-flow__edge-gradient nopan animated inactive" role="group">
    <defs>
      <linearGradient :id="gradientId" gradientUnits="userSpaceOnUse" :x1="sourceX" :y1="sourceY" :x2="targetX" :y2="targetY">
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
    <path :d="edgePath" fill="none" :stroke="`url(#${gradientId})`" :stroke-width="data?.variant === 'curve' ? 3 : 2.5" stroke-opacity="0.4" :filter="`url(#${glowId})`" stroke-linecap="round" />
    <path :id="id" :d="edgePath" class="vue-flow__edge-path" :stroke="`url(#${gradientId})`" :stroke-width="data?.variant === 'curve' ? 2 : 1.5" fill="none" />
    <path :d="edgePath" fill="none" stroke-width="20" stroke-opacity="0" class="vue-flow__edge-interaction" />
  </g>
</template>
