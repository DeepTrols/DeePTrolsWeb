<script setup lang="ts">
import { FileQuestion, Rocket, TrendingUp } from '@lucide/vue'
import FdeEvolutionCube from '~/components/solution/fde/FdeEvolutionCube.vue'

defineProps<{
  metric: string
  metricLabel: string
}>()
</script>

<template>
  <div class="relative flex h-[400px] w-full select-none items-center justify-center">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/8 via-violet-500/5 to-blue-500/8 blur-3xl"
      ></div>
    </div>
    <svg
      class="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 520 400"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fdeUnifiedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.6" />
          <stop offset="50%" stop-color="var(--color-violet-400)" stop-opacity="0.4" />
          <stop offset="100%" stop-color="var(--color-blue-500)" stop-opacity="0.6" />
        </linearGradient>
        <filter id="fdeUnifiedParticle" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 160 155 Q 260 125 360 155"
        stroke="url(#fdeUnifiedGrad)"
        stroke-width="2"
        stroke-dasharray="8 5"
        fill="none"
        opacity="0.5"
      >
        <animate attributeName="stroke-dashoffset" values="0;-26" dur="2s" repeatCount="indefinite" />
      </path>
      <circle r="4.5" fill="var(--color-violet-500)" filter="url(#fdeUnifiedParticle)" opacity="0">
        <animate attributeName="opacity" values="0;0.9;0.9;0" dur="3s" repeatCount="indefinite" />
        <animateMotion dur="3s" repeatCount="indefinite" path="M 160,155 Q 260,125 360,155" />
        <animate
          attributeName="fill"
          values="var(--color-violet-500);var(--color-blue-500)"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle r="3" fill="var(--color-violet-400)" filter="url(#fdeUnifiedParticle)" opacity="0">
        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3s" begin="1s" repeatCount="indefinite" />
        <animateMotion dur="3s" begin="1s" repeatCount="indefinite" path="M 160,155 Q 260,125 360,155" />
        <animate
          attributeName="fill"
          values="var(--color-violet-400);var(--color-blue-400)"
          dur="3s"
          begin="1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle r="3.5" fill="var(--color-blue-400)" filter="url(#fdeUnifiedParticle)" opacity="0">
        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
        <animateMotion dur="3.5s" begin="0.5s" repeatCount="indefinite" path="M 360,155 Q 260,125 160,155" />
        <animate
          attributeName="fill"
          values="var(--color-blue-400);var(--color-violet-400)"
          dur="3.5s"
          begin="0.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="relative flex flex-col items-center">
      <div class="flex items-start gap-36">
        <div>
          <FdeEvolutionCube palette="violet">
            <FileQuestion class="size-10 text-muted" aria-hidden="true" />
          </FdeEvolutionCube>
          <div class="mt-12 text-center">
            <div class="text-sm font-semibold text-highlighted">业务问题</div>
            <div class="text-sm text-muted">场景·数据</div>
          </div>
        </div>
        <div>
          <FdeEvolutionCube palette="blue">
            <Rocket class="size-10 text-muted" aria-hidden="true" />
          </FdeEvolutionCube>
          <div class="mt-12 text-center">
            <div class="text-sm font-semibold text-highlighted">AI原型</div>
            <div class="text-sm text-muted">模型·应用</div>
          </div>
        </div>
      </div>
      <div
        class="mt-10 flex items-center gap-3 rounded-full border border-primary/40 bg-default px-5 py-2.5 backdrop-blur-sm"
      >
        <TrendingUp class="size-5 text-primary" aria-hidden="true" />
        <div class="text-base font-bold text-primary">{{ metric }}</div>
        <div class="h-4 w-px bg-default"></div>
        <div class="text-sm font-medium text-muted">{{ metricLabel }}</div>
      </div>
    </div>
  </div>
</template>
