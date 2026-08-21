<script setup lang="ts">
import { edgeLines, edgeNodes } from '~/data/ecosystemVisual'
</script>

<template>
  <svg viewBox="70 0 100 100" class="ecosystem-visual__svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="edgeGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="0.6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g v-for="line in edgeLines" :key="line.key">
      <line
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
        filter="url(#edgeGlow)"
      />
    </g>
    <g v-for="node in edgeNodes" :key="node.key">
      <circle class="ecosystem-visual__outer-node" :cx="node.x" :cy="node.y" r="1.5" />
      <circle class="ecosystem-visual__inner-node" :cx="node.x" :cy="node.y" r="0.5" />
    </g>
    <g transform="translate(125, 55)">
      <circle class="ecosystem-visual__hub-disc" r="4.5" />
      <g transform="translate(-4.5, -5.5) scale(0.4)">
        <path
          class="ecosystem-visual__cloud-icon"
          d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        />
      </g>
    </g>
  </svg>
</template>
