<script setup lang="ts">
import { Database, ShieldCheck } from '@lucide/vue'
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
        class="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/8 via-transparent to-violet-500/6 blur-3xl"
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
        <linearGradient id="fdeStorageFlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.6" />
          <stop offset="100%" stop-color="var(--color-blue-500)" stop-opacity="0.6" />
        </linearGradient>
        <linearGradient id="fdeStorageIn" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.7" />
          <stop offset="100%" stop-color="var(--color-violet-500)" stop-opacity="0.2" />
        </linearGradient>
        <filter id="fdeStorageParticle" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M 200 165 L 270 165" stroke="url(#fdeStorageFlow)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4">
        <animate attributeName="stroke-dashoffset" values="0;-7" dur="1.2s" repeatCount="indefinite" />
      </path>
      <path d="M 310 165 L 370 165" stroke="url(#fdeStorageFlow)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4">
        <animate attributeName="stroke-dashoffset" values="0;-7" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
      </path>
      <circle cx="200" cy="165" r="3.5" fill="var(--color-violet-500)" filter="url(#fdeStorageParticle)" opacity="0">
        <animate attributeName="cx" values="200;270" dur="1.4s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.4s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="165" r="2.5" fill="var(--color-violet-400)" filter="url(#fdeStorageParticle)" opacity="0">
        <animate attributeName="cx" values="200;270" dur="1.4s" begin="1.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.4s" begin="1.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="310" cy="165" r="3.5" fill="var(--color-blue-400)" filter="url(#fdeStorageParticle)" opacity="0">
        <animate attributeName="cx" values="310;370" dur="1.4s" begin="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.4s" begin="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="310" cy="165" r="2.5" fill="var(--color-blue-500)" filter="url(#fdeStorageParticle)" opacity="0">
        <animate attributeName="cx" values="310;370" dur="1.4s" begin="2.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.4s" begin="2.3s" repeatCount="indefinite" />
      </circle>
    </svg>
    <div class="relative flex flex-col items-center">
      <div
        class="mb-4 flex items-center gap-2 rounded-full border border-default bg-default px-3 py-1.5 backdrop-blur-sm"
      >
        <span class="animate-pulse-dot size-1.5 rounded-full bg-primary"></span>
        <span class="text-sm font-medium text-muted">生产业务请求</span>
      </div>
      <div class="flex items-end gap-8">
        <div class="animate-value-hub">
          <FdeEvolutionCube size="sm" palette="violet">
            <Database class="size-8 text-muted" aria-hidden="true" />
          </FdeEvolutionCube>
          <div class="mt-8 text-center">
            <div class="text-sm font-semibold text-highlighted">AI 应用</div>
          </div>
        </div>
        <div
          class="[animation:value-hub-float_4s_ease-in-out_-1.3s_infinite,value-hub-glow_3.5s_ease-in-out_-0.8s_infinite]"
        >
          <FdeEvolutionCube size="sm" palette="violet">
            <Database class="size-8 text-muted" aria-hidden="true" />
          </FdeEvolutionCube>
          <div class="mt-8 text-center">
            <div class="text-sm font-semibold text-highlighted">企业系统</div>
          </div>
        </div>
        <div
          class="[animation:value-hub-float_4s_ease-in-out_-2.6s_infinite,value-hub-glow_3.5s_ease-in-out_-2.1s_infinite]"
        >
          <FdeEvolutionCube size="sm" palette="violet">
            <Database class="size-8 text-muted" aria-hidden="true" />
          </FdeEvolutionCube>
          <div class="mt-8 text-center">
            <div class="text-sm font-semibold text-highlighted">运行治理</div>
          </div>
        </div>
      </div>
      <div
        class="mt-10 flex items-center gap-3 rounded-full border border-primary/40 bg-default px-5 py-2.5 backdrop-blur-sm"
      >
        <ShieldCheck class="size-5 text-primary" aria-hidden="true" />
        <div class="text-lg font-bold text-primary">{{ metric }}</div>
        <div class="h-4 w-px bg-default"></div>
        <div class="text-sm font-medium text-muted">{{ metricLabel }}</div>
      </div>
    </div>
  </div>
</template>
