<script setup lang="ts">
import { whyHeroCenterLogo, whyHeroNodes } from '~/data/why'
import { useWhyHeroAnimation } from '~/components/why/useWhyHeroAnimation'

const nodeColors = whyHeroNodes.map((node) => node.color)
const { particles, nodePositions, arcGradientCoords, arcPaths, spokePaths, isNodeGlowing } =
  useWhyHeroAnimation(nodeColors)
</script>

<template>
  <div class="relative flex w-full items-center justify-center">
    <svg viewBox="0 0 560 480" fill="none" class="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient
          v-for="(coords, index) in arcGradientCoords"
          :id="`why-hv-ag-${index}`"
          :key="`arc-gradient-${index}`"
          gradientUnits="userSpaceOnUse"
          :x1="coords[0]"
          :y1="coords[1]"
          :x2="coords[2]"
          :y2="coords[3]"
        >
          <stop offset="0%" :stop-color="nodeColors[index]" stop-opacity="0.5" />
          <stop offset="100%" :stop-color="nodeColors[(index + 1) % nodeColors.length]" stop-opacity="0.5" />
        </linearGradient>
        <linearGradient id="why-hv-hub-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8b5cf6" />
          <stop offset="33%" stop-color="#3b82f6" />
          <stop offset="66%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#f97316" />
        </linearGradient>
        <linearGradient id="why-hv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.12" />
          <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.06" />
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.08" />
        </linearGradient>
        <filter id="why-hv-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="why-hv-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="why-hv-bg-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>

      <circle cx="280" cy="240" r="150" fill="url(#why-hv-bg)" filter="url(#why-hv-bg-blur)" />
      <circle cx="280" cy="240" r="180" stroke="currentColor" class="text-primary/8" stroke-width="1" stroke-dasharray="6 10" />
      <circle cx="280" cy="240" r="68" stroke="currentColor" class="text-primary/10" stroke-width="1" stroke-dasharray="4 8" />

      <g>
        <path
          v-for="(arc, index) in arcPaths"
          :key="`arc-glow-${index}`"
          :d="arc"
          :stroke="`url(#why-hv-ag-${index})`"
          stroke-width="6"
          stroke-linecap="round"
          filter="url(#why-hv-soft)"
        />
        <path
          v-for="(arc, index) in arcPaths"
          :key="`arc-${index}`"
          :d="arc"
          :stroke="`url(#why-hv-ag-${index})`"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          v-for="(spoke, index) in spokePaths"
          :key="`radial-${index}`"
          :d="spoke"
          :stroke="nodeColors[index]"
          stroke-opacity="0.2"
          stroke-width="1.5"
          stroke-dasharray="4 6"
        />
      </g>

      <circle
        v-for="(particle, index) in particles"
        :key="`particle-${index}`"
        :cx="particle.x"
        :cy="particle.y"
        :r="particle.r"
        :fill="particle.color"
        :opacity="particle.opacity"
        filter="url(#why-hv-glow)"
      />

      <g
        v-for="(node, index) in whyHeroNodes"
        :key="`node-${node.id}`"
        :transform="`translate(${nodePositions[index]?.[0]} ${nodePositions[index]?.[1]})`"
      >
        <circle
          r="30"
          fill="none"
          :stroke="node.glowColor"
          stroke-width="4"
          filter="url(#why-hv-soft)"
          class="origin-center opacity-0 transition-opacity duration-300 [transform-box:fill-box]"
          :class="isNodeGlowing(index) ? 'animate-why-node-pulse opacity-100' : ''"
        />
        <circle r="24" class="fill-[var(--dt-color-bg-elevated)]" />
        <circle r="24" stroke-width="1" :class="[node.fillClass, node.strokeClass]" />
        <image :href="node.logo" x="-12" y="-12" width="24" height="24" preserveAspectRatio="xMidYMid meet" />
        <text
          y="32"
          text-anchor="middle"
          dominant-baseline="hanging"
          class="fill-[var(--dt-color-text-muted)] text-xs font-semibold"
        >{{ node.label }}</text>
      </g>

      <g transform="translate(280 240)">
        <rect
          x="-84"
          y="-36"
          width="168"
          height="72"
          rx="20"
          fill="none"
          stroke-width="1"
          class="origin-center animate-why-center-pulse stroke-primary/15 [transform-box:fill-box]"
        />
        <rect x="-76" y="-28" width="152" height="56" rx="16" fill="url(#why-hv-hub-ring)" />
        <rect x="-74" y="-26" width="148" height="52" rx="14" class="fill-[var(--dt-color-bg)]" />
        <image :href="whyHeroCenterLogo" x="-58" y="-5.4" width="116" height="10.8" preserveAspectRatio="xMidYMid meet" />
      </g>
    </svg>
  </div>
</template>
