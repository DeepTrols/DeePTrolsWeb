<script setup lang="ts">
import { rackRows, serverLines, serverNodes } from '~/data/ecosystemVisual'
</script>

<template>
  <svg viewBox="70 0 100 100" class="ecosystem-visual__svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="serverGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="0.6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g v-for="line in serverLines" :key="line.key">
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
        filter="url(#serverGlow)"
      />
    </g>
    <g v-for="server in serverNodes" :key="server.key" class="ecosystem-visual__server" :class="server.delaySet" :transform="server.transform">
      <rect x="0" y="0" width="10" height="14" rx="1" class="ecosystem-visual__server-shell" />
      <g v-for="row in rackRows" :key="row.key">
        <rect x="1.5" :y="row.y" width="7" height="2.5" rx="0.4" class="ecosystem-visual__server-row" />
        <circle cx="7.2" :cy="row.cy" r="0.5" class="ecosystem-visual__led" :class="row.delayClass" />
      </g>
    </g>
  </svg>
</template>

<style scoped lang="scss"></style>
