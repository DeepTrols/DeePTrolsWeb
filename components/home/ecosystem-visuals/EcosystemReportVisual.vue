<script setup lang="ts">
import { bridgeLines } from '~/data/ecosystemVisual'
</script>

<template>
  <svg viewBox="70 0 100 100" class="ecosystem-visual__svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="bridgeGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="0.6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g v-for="line in bridgeLines" :key="line.key">
      <line
        v-if="line.key !== 'bridge-c'"
        class="ecosystem-visual__base-line"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke-dasharray="1 2"
      />
      <line
        class="ecosystem-visual__flow"
        :class="line.delayClass"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke-dasharray="1 15"
        filter="url(#bridgeGlow)"
      />
    </g>
    <g transform="translate(80, 42)">
      <text y="-10" text-anchor="middle" class="ecosystem-visual__device-label">论文</text>
      <g transform="translate(-5, -4) scale(0.4)">
        <rect x="2" y="3" width="20" height="14" rx="2" class="ecosystem-visual__device-shell" />
        <path d="M8 21h8M12 17v4" class="ecosystem-visual__device-line" />
        <path d="M6 8h12M6 12h8" class="ecosystem-visual__device-line ecosystem-visual__device-line--muted" />
      </g>
    </g>
    <g transform="translate(115, 40)">
      <circle class="ecosystem-visual__outer-node" r="1.5" />
      <circle class="ecosystem-visual__inner-node" r="0.5" />
    </g>
    <g transform="translate(150, 38)">
      <text y="-8" text-anchor="middle" class="ecosystem-visual__device-label ecosystem-visual__device-label--cloud">领域</text>
      <circle class="ecosystem-visual__hub-disc" r="4.5" />
      <g transform="translate(-4.5, -4.5) scale(0.4)">
        <path
          class="ecosystem-visual__cloud-icon"
          d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        />
      </g>
    </g>
  </svg>
</template>
