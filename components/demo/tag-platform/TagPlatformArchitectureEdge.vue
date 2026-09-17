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
  return `M${props.sourceX},${props.sourceY} C${centerX},${props.sourceY} ${centerX},${props.targetY} ${props.targetX},${props.targetY}`
})
const gradientId = computed(() => `tag-platform-gradient-${props.id}`)
const glowId = computed(() => `tag-platform-glow-${props.id}`)
</script>

<template>
  <g class="vue-flow__edge vue-flow__edge-gradient nopan animated inactive" role="group">
    <defs>
      <linearGradient :id="gradientId" gradientUnits="userSpaceOnUse" :x1="sourceX" :y1="sourceY" :x2="targetX" :y2="targetY">
        <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.55" />
        <stop offset="58%" stop-color="#6366f1" stop-opacity="0.7" />
        <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.85" />
      </linearGradient>
      <filter :id="glowId" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="1.6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path :d="edgePath" fill="none" :stroke="`url(#${gradientId})`" stroke-width="2.1" stroke-opacity="0.24" :filter="`url(#${glowId})`" stroke-linecap="round" />
    <path :id="id" :d="edgePath" class="vue-flow__edge-path" :stroke="`url(#${gradientId})`" stroke-width="1.6" fill="none" />
    <path :d="edgePath" fill="none" stroke-width="20" stroke-opacity="0" class="vue-flow__edge-interaction" />
  </g>
</template>
