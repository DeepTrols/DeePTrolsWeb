<script setup lang="ts">
import { Position } from '@vue-flow/core'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    sourceX?: number
    sourceY?: number
    targetX?: number
    targetY?: number
    sourcePosition?: Position
    targetPosition?: Position
    data?: { path?: string }
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

const edgePath = computed(() => props.data?.path ?? `M${props.sourceX},${props.sourceY} C${(props.sourceX + props.targetX) / 2},${props.sourceY} ${(props.sourceX + props.targetX) / 2},${props.targetY} ${props.targetX},${props.targetY}`)
const gradientId = computed(() => `flowmq-edge-gradient-${props.id}`)
const filterId = computed(() => `flowmq-edge-glow-${props.id}`)
</script>

<template>
  <g class="vue-flow__edge vue-flow__edge-labBorder nopan animated inactive" role="group">
    <defs>
      <linearGradient :id="gradientId" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="oklch(0.75 0.15 300)" stop-opacity="0.35" />
        <stop offset="50%" stop-color="oklch(0.65 0.2 290)" stop-opacity="0.55" />
        <stop offset="100%" stop-color="oklch(0.55 0.25 285)" stop-opacity="0.75" />
      </linearGradient>
      <filter :id="filterId" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <path :d="edgePath" fill="none" :stroke="`url(#${gradientId})`" stroke-width="2.5" stroke-opacity="0.4" :filter="`url(#${filterId})`" stroke-linecap="round" />
    <path :id="id" :d="edgePath" class="vue-flow__edge-path" :stroke="`url(#${gradientId})`" stroke-width="1.5" fill="none" stroke-linecap="round" />
    <path :d="edgePath" fill="none" stroke-width="20" stroke-opacity="0" class="vue-flow__edge-interaction" />
  </g>
</template>
