<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    sourceX?: number
    sourceY?: number
    targetX?: number
    targetY?: number
  }>(),
  {
    sourceX: 0,
    sourceY: 0,
    targetX: 0,
    targetY: 0,
  },
)

const edgePath = computed(() => {
  const centerX = (props.sourceX + props.targetX) / 2
  return `M ${props.sourceX} ${props.sourceY} C ${centerX} ${props.sourceY}, ${centerX} ${props.targetY}, ${props.targetX} ${props.targetY}`
})
const gradientId = computed(() => `smart-data-hub-gradient-${props.id}`)
</script>

<template>
  <g class="vue-flow__edge vue-flow__edge-gradient nopan animated inactive" role="group">
    <defs>
      <linearGradient :id="gradientId" gradientUnits="userSpaceOnUse" :x1="sourceX" :y1="sourceY" :x2="targetX" :y2="targetY">
        <stop offset="0%" stop-color="oklch(0.75 0.15 300)" stop-opacity="0.35" />
        <stop offset="50%" stop-color="oklch(0.65 0.2 290)" stop-opacity="0.55" />
        <stop offset="100%" stop-color="oklch(0.55 0.25 285)" stop-opacity="0.75" />
      </linearGradient>
    </defs>
    <path :d="edgePath" fill="none" :stroke="`url(#${gradientId})`" stroke-width="2" stroke-linecap="round" />
    <path :id="id" :d="edgePath" class="vue-flow__edge-path" :stroke="`url(#${gradientId})`" stroke-width="2" fill="none" />
    <path :d="edgePath" fill="none" stroke-width="20" stroke-opacity="0" class="vue-flow__edge-interaction" />
  </g>
</template>
