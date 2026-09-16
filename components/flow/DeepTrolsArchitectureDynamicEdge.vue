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
const gradientId = computed(() => `edge-gradient-${props.id}`)
const filterId = computed(() => `edge-glow-${props.id}`)
</script>

<template>
  <g class="vue-flow__edge vue-flow__edge-gradient nopan edge-left animated inactive">
    <defs>
      <linearGradient :id="gradientId" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#6583ff" stop-opacity="0.28" />
        <stop offset="50%" stop-color="#1a57eb" stop-opacity="0.46" />
        <stop offset="100%" stop-color="#0d3b8e" stop-opacity="0.62" />
      </linearGradient>
      <filter :id="filterId" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <path :d="edgePath" fill="none" :stroke="`url(#${gradientId})`" stroke-width="2.5" stroke-opacity="0.34" :filter="`url(#${filterId})`" stroke-linecap="round" />
    <path :id="id" :d="edgePath" class="vue-flow__edge-path" :stroke="`url(#${gradientId})`" stroke-width="1.5" fill="none" stroke-linecap="round" />
    <path :d="edgePath" fill="none" stroke="rgba(26,87,235,0.5)" stroke-width="1.2" stroke-dasharray="12 18" stroke-linecap="round">
      <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.8s" repeatCount="indefinite" />
    </path>
  </g>
</template>
