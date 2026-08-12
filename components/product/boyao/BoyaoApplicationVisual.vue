<script setup lang="ts">
import { Search, Sparkles } from '@lucide/vue'
import IsoCube from '~/components/common/IsoCube.vue'

const applicationTags = ['智能检索', '知识问答', '智能体']
</script>

<template>
  <div class="relative flex h-[280px] w-full select-none items-center justify-center">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute left-1/2 top-1/2 size-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary/6 via-green-500/4 to-blue-500/6 blur-3xl"
      ></div>
    </div>

    <svg
      class="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 420 280"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="boyaoApplicationShield" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="var(--dt-color-primary)" stop-opacity="0.06" />
          <stop offset="100%" stop-color="var(--dt-color-primary)" stop-opacity="0.01" />
        </linearGradient>
      </defs>
      <path
        d="M 210 20 L 300 50 L 300 155 Q 300 220 210 250 Q 120 220 120 155 L 120 50 Z"
        fill="url(#boyaoApplicationShield)"
        stroke="var(--dt-color-primary)"
        stroke-width="1"
        stroke-opacity="0.08"
      />
    </svg>

    <div class="relative -mt-4 flex flex-col items-center gap-5">
      <div
        class="flex items-center gap-2 rounded-full border border-primary/30 bg-default px-3 py-1.5 backdrop-blur-sm"
      >
        <span class="size-1.5 animate-pulse rounded-full bg-green-500" aria-hidden="true"></span>
        <span class="text-[11px] font-medium text-muted">3秒 获取知识</span>
      </div>

      <IsoCube size="sm">
        <Sparkles class="size-8 text-primary" aria-hidden="true" />
      </IsoCube>

      <div class="flex gap-2">
        <span
          v-for="tag in applicationTags"
          :key="tag"
          class="rounded-md border border-default bg-default px-2.5 py-1 text-[10px] font-semibold text-muted shadow-sm"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div
      class="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-primary/40 bg-default px-4 py-2 backdrop-blur-sm"
    >
      <Search class="size-4 text-primary" aria-hidden="true" />
      <div class="text-sm font-bold text-primary">≥50%</div>
      <div class="h-3.5 w-px bg-default"></div>
      <div class="text-[11px] font-medium text-muted">检索效率提升</div>
    </div>
  </div>
</template>
