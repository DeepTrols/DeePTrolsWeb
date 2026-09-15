<script setup lang="ts">
import { BookOpenText, Database, Workflow, Zap } from '@lucide/vue'
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
      viewBox="0 0 400 400"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fdeAIFlowIn" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.7" />
          <stop offset="100%" stop-color="var(--color-violet-500)" stop-opacity="0.2" />
        </linearGradient>
        <linearGradient id="fdeAIFlowOut" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--color-violet-500)" stop-opacity="0.5" />
          <stop offset="100%" stop-color="var(--color-violet-400)" stop-opacity="0.3" />
        </linearGradient>
        <filter id="fdeAIParticle" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="fdeAIInputClip">
          <rect x="190" y="72" width="20" height="80" />
        </clipPath>
      </defs>
      <path d="M 200 72 L 200 148" stroke="url(#fdeAIFlowIn)" stroke-width="2" stroke-dasharray="6 4" opacity="0.5">
        <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d="M 200 155 Q 140 185 100 235" stroke="url(#fdeAIFlowOut)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4">
        <animate attributeName="stroke-dashoffset" values="0;-7" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d="M 200 155 L 200 235" stroke="url(#fdeAIFlowOut)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4">
        <animate attributeName="stroke-dashoffset" values="0;-7" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
      </path>
      <path d="M 200 155 Q 260 185 300 235" stroke="url(#fdeAIFlowOut)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4">
        <animate attributeName="stroke-dashoffset" values="0;-7" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
      </path>
      <g clip-path="url(#fdeAIInputClip)">
        <circle cx="200" cy="72" r="4" fill="var(--color-violet-500)" filter="url(#fdeAIParticle)" opacity="0">
          <animate attributeName="cy" values="72;148" dur="1.8s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.85;0.85;0" dur="1.8s" begin="0s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="72" r="4" fill="var(--color-violet-500)" filter="url(#fdeAIParticle)" opacity="0">
          <animate attributeName="cy" values="72;148" dur="1.8s" begin="0.45s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.85;0.85;0" dur="1.8s" begin="0.45s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="72" r="4" fill="var(--color-violet-500)" filter="url(#fdeAIParticle)" opacity="0">
          <animate attributeName="cy" values="72;148" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.85;0.85;0" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
        </circle>
      </g>
      <circle cx="200" cy="138" r="8" fill="var(--color-violet-500)" opacity="0" filter="url(#fdeAIParticle)">
        <animate attributeName="opacity" values="0;0.3;0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="8;20;8" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle r="4" fill="var(--color-violet-400)" filter="url(#fdeAIParticle)" opacity="0">
        <animateMotion dur="1.5s" begin="0.8s" repeatCount="indefinite" path="M 200,155 Q 140,185 100,235" />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.5s" begin="0.8s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="var(--color-violet-300)" filter="url(#fdeAIParticle)" opacity="0">
        <animateMotion dur="1.5s" begin="1.8s" repeatCount="indefinite" path="M 200,155 Q 140,185 100,235" />
        <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.5s" begin="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="155" r="4" fill="var(--color-violet-400)" filter="url(#fdeAIParticle)" opacity="0">
        <animate attributeName="cy" values="155;235" dur="1.5s" begin="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.5s" begin="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="155" r="3" fill="var(--color-violet-300)" filter="url(#fdeAIParticle)" opacity="0">
        <animate attributeName="cy" values="155;235" dur="1.5s" begin="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.5s" begin="2.2s" repeatCount="indefinite" />
      </circle>
      <circle r="4" fill="var(--color-violet-400)" filter="url(#fdeAIParticle)" opacity="0">
        <animateMotion dur="1.5s" begin="1.6s" repeatCount="indefinite" path="M 200,155 Q 260,185 300,235" />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.5s" begin="1.6s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="var(--color-violet-300)" filter="url(#fdeAIParticle)" opacity="0">
        <animateMotion dur="1.5s" begin="2.6s" repeatCount="indefinite" path="M 200,155 Q 260,185 300,235" />
        <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.5s" begin="2.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="235" r="5" fill="var(--color-violet-400)" opacity="0" filter="url(#fdeAIParticle)">
        <animate attributeName="opacity" values="0;0.3;0" dur="1.5s" begin="2.3s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;12;5" dur="1.5s" begin="2.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="235" r="5" fill="var(--color-violet-400)" opacity="0" filter="url(#fdeAIParticle)">
        <animate attributeName="opacity" values="0;0.3;0" dur="1.5s" begin="2.7s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;12;5" dur="1.5s" begin="2.7s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="235" r="5" fill="var(--color-violet-400)" opacity="0" filter="url(#fdeAIParticle)">
        <animate attributeName="opacity" values="0;0.3;0" dur="1.5s" begin="3.1s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;12;5" dur="1.5s" begin="3.1s" repeatCount="indefinite" />
      </circle>
    </svg>
    <div class="relative flex flex-col items-center">
      <div
        class="mb-4 flex items-center gap-2 rounded-full border border-default bg-default px-3 py-1.5 backdrop-blur-sm"
      >
        <span class="animate-pulse-dot size-1.5 rounded-full bg-primary"></span>
        <span class="text-sm font-medium text-muted">业务上下文</span>
      </div>
      <div class="animate-value-hub">
        <FdeEvolutionCube palette="hub">
          <span class="text-base font-bold text-violet-500">FDE</span>
        </FdeEvolutionCube>
      </div>
      <div class="mt-14 flex items-start gap-10">
        <div class="animate-value-hub">
          <div
            class="flex size-16 items-center justify-center rounded-2xl border border-default bg-default shadow-lg"
          >
            <BookOpenText class="size-7 text-highlighted" aria-hidden="true" />
          </div>
          <div class="mt-2 text-center text-sm font-semibold text-highlighted">知识智能体</div>
        </div>
        <div
          class="[animation:value-hub-float_4s_ease-in-out_-1.3s_infinite,value-hub-glow_3.5s_ease-in-out_-0.8s_infinite]"
        >
          <div
            class="flex size-16 items-center justify-center rounded-2xl border border-default bg-default shadow-lg"
          >
            <Database class="size-7 text-highlighted" aria-hidden="true" />
          </div>
          <div class="mt-2 text-center text-sm font-semibold text-highlighted">数据智能体</div>
        </div>
        <div
          class="[animation:value-hub-float_4s_ease-in-out_-2.6s_infinite,value-hub-glow_3.5s_ease-in-out_-2.1s_infinite]"
        >
          <div
            class="flex size-16 items-center justify-center rounded-2xl border border-default bg-default shadow-lg"
          >
            <Workflow class="size-7 text-highlighted" aria-hidden="true" />
          </div>
          <div class="mt-2 text-center text-sm font-semibold text-highlighted">业务智能体</div>
        </div>
      </div>
      <div
        class="mt-8 flex items-center gap-3 rounded-full border border-primary/40 bg-default px-5 py-2.5 backdrop-blur-sm"
      >
        <Zap class="size-5 text-primary" aria-hidden="true" />
        <div class="text-base font-bold text-primary">{{ metric }}</div>
        <div class="h-4 w-px bg-default"></div>
        <div class="text-sm font-medium text-muted">{{ metricLabel }}</div>
      </div>
    </div>
  </div>
</template>
