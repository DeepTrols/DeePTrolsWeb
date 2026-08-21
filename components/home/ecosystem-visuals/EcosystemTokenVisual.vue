<script setup lang="ts">
import { cloudDots, tokenNodes, tokenPaths } from '~/data/ecosystemVisual'
</script>

<template>
  <svg viewBox="50 0 100 100" class="ecosystem-visual__svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="glow-map" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="0.6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g class="ecosystem-visual__cloud-grid">
      <circle v-for="dot in cloudDots" :key="dot.id" :cx="dot.x" :cy="dot.y" r="0.35" />
    </g>
    <g>
      <path
        v-for="path in tokenPaths"
        :key="`${path.key}-base`"
        class="ecosystem-visual__base-line ecosystem-visual__map-line"
        :d="path.d"
      />
      <path
        v-for="path in tokenPaths"
        :key="path.key"
        class="ecosystem-visual__flow ecosystem-visual__map-flow"
        :class="path.delayClass"
        :d="path.d"
        filter="url(#glow-map)"
      />
    </g>
    <g v-for="node in tokenNodes" :key="node.key" class="ecosystem-visual__map-node" :transform="`translate(${node.x}, ${node.y})`">
      <circle class="ecosystem-visual__outer-node" r="1.5" />
      <circle class="ecosystem-visual__inner-node" r="0.5" />
    </g>
  </svg>
</template>
