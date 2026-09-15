<script setup lang="ts">
import { computed } from 'vue'
import { Position, getBezierPath } from '@vue-flow/core'

const props = withDefaults(
  defineProps<{
    id: string
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    sourcePosition?: Position
    targetPosition?: Position
    data?: { tone?: 'cyan' | 'violet' | 'blue' }
  }>(),
  {
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: () => ({ tone: 'cyan' }),
  },
)

const edgePath = computed(
  () =>
    getBezierPath({
      sourceX: props.sourceX,
      sourceY: props.sourceY,
      sourcePosition: props.sourcePosition,
      targetX: props.targetX,
      targetY: props.targetY,
      targetPosition: props.targetPosition,
      curvature: 0.36,
    })[0],
)

const tone = computed(() => props.data?.tone ?? 'cyan')
const gradientId = computed(() => `${props.id}-gradient`)
const markerId = computed(() => `${props.id}-arrow`)
const filterId = computed(() => `${props.id}-glow`)
const strokeClasses = computed(() => {
  if (tone.value === 'violet') {
    return 'stroke-fuchsia-400'
  }
  if (tone.value === 'blue') {
    return 'stroke-blue-400'
  }
  return 'stroke-cyan-300'
})
</script>

<template>
  <g class="pointer-events-none">
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :class="tone === 'violet' ? '[stop-color:#a855f7]' : '[stop-color:#06b6d4]'" />
        <stop offset="52%" stop-color="#ffffff" />
        <stop offset="100%" :class="tone === 'blue' ? '[stop-color:#3b82f6]' : '[stop-color:#22d3ee]'" />
      </linearGradient>
      <marker :id="markerId" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
        <path d="M2 2 L10 6 L2 10 Z" class="fill-white" />
      </marker>
      <filter :id="filterId" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <path :d="edgePath" class="fill-none stroke-current opacity-25" :class="strokeClasses" stroke-width="12" :filter="`url(#${filterId})`" />
    <path :d="edgePath" class="fill-none stroke-sky-950/70" stroke-width="7" />
    <path :d="edgePath" class="fill-none" :stroke="`url(#${gradientId})`" stroke-width="3.5" stroke-linecap="round" :marker-end="`url(#${markerId})`" />
    <path :d="edgePath" class="fill-none stroke-white/80" stroke-width="1.25" stroke-dasharray="18 24" stroke-linecap="round">
      <animate attributeName="stroke-dashoffset" from="42" to="0" dur="1.4s" repeatCount="indefinite" />
    </path>
    <circle r="4.5" class="fill-white">
      <animateMotion :path="edgePath" dur="2.4s" repeatCount="indefinite" />
    </circle>
  </g>
</template>
