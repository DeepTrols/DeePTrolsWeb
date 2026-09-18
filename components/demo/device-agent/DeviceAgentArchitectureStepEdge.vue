<script setup lang="ts">
import { computed } from 'vue'
import { Position, getSmoothStepPath } from '@vue-flow/core'

const props = withDefaults(
  defineProps<{
    id: string
    sourceX?: number
    sourceY?: number
    targetX?: number
    targetY?: number
    sourcePosition?: Position
    targetPosition?: Position
  }>(),
  {
    sourceX: 0,
    sourceY: 0,
    targetX: 0,
    targetY: 0,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
)

const edgePath = computed(() =>
  getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    borderRadius: 8,
    offset: 20,
  })[0],
)
const gradientId = computed(() => `edge-gradient-${props.id}`)
const glowId = computed(() => `edge-glow-${props.id}`)
</script>

<template>
  <g class="vue-flow__edge vue-flow__edge-step nopan animated inactive" role="group">
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
    <path :d="edgePath" fill="none" :stroke="`url(#${gradientId})`" stroke-width="2.5" stroke-opacity="0.4" :filter="`url(#${glowId})`" stroke-linecap="round" />
    <path :id="id" :d="edgePath" class="vue-flow__edge-path" :stroke="`url(#${gradientId})`" stroke-width="1.5" fill="none" />
    <path :d="edgePath" fill="none" stroke-width="20" stroke-opacity="0" class="vue-flow__edge-interaction" />
  </g>
</template>
