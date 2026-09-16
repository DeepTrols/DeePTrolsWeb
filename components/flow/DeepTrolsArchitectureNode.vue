<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

interface PlatformItem {
  label: string
  icon?: Component
  tone?: string
}

interface PlatformNodeData {
  kind: 'ring' | 'physical' | 'core' | 'integration'
  label?: string
  icon?: Component
  tone?: string
  sizeClass?: string
  items?: PlatformItem[]
}

defineProps<{
  data: PlatformNodeData
}>()

const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
const getLabelParts = (label = '') => {
  const [title, ...rest] = label.split(/\s*·\s*/)
  return {
    title,
    detail: rest.join(' · '),
  }
}
</script>

<template>
  <div :class="['relative', data.sizeClass]">
    <Handle id="left-target" type="target" :position="Position.Left" :class="handleClass" />
    <Handle id="right-target" type="target" :position="Position.Right" :class="handleClass" />
    <Handle id="left-source" type="source" :position="Position.Left" :class="handleClass" />
    <Handle id="right-source" type="source" :position="Position.Right" :class="handleClass" />

    <div v-if="data.kind === 'ring'" class="size-full rounded-full border border-primary/10 bg-[radial-gradient(circle,rgba(26,87,235,0.12),transparent_64%)]" />

    <div
      v-else-if="data.kind === 'physical'"
      :class="[
        'flex h-full w-full items-center gap-3 rounded-lg border bg-white px-4 py-2.5 shadow-[0_10px_28px_rgba(26,87,235,0.08)]',
        data.tone === 'violet' ? 'border-violet-500/20' : '',
        data.tone === 'blue' ? 'border-blue-500/20' : '',
        data.tone === 'pink' ? 'border-pink-500/20' : '',
        data.tone === 'emerald' ? 'border-emerald-500/20' : '',
        data.tone === 'amber' ? 'border-amber-500/20' : '',
        data.tone === 'cyan' ? 'border-cyan-500/20' : '',
      ]"
    >
      <div
        :class="[
          'flex size-7 items-center justify-center',
          data.tone === 'violet' ? 'text-violet-500' : '',
          data.tone === 'blue' ? 'text-blue-500' : '',
          data.tone === 'pink' ? 'text-pink-500' : '',
          data.tone === 'emerald' ? 'text-emerald-500' : '',
          data.tone === 'amber' ? 'text-amber-500' : '',
          data.tone === 'cyan' ? 'text-cyan-500' : '',
        ]"
      >
        <component :is="data.icon" class="size-5" aria-hidden="true" />
      </div>
      <span class="flex min-w-0 flex-col">
        <span class="whitespace-nowrap text-sm font-semibold leading-5 text-dt-text-highlighted">{{ getLabelParts(data.label).title }}</span>
        <span v-if="getLabelParts(data.label).detail" class="whitespace-nowrap text-[11px] font-medium leading-4 text-dt-text-muted">{{ getLabelParts(data.label).detail }}</span>
      </span>
    </div>

    <div v-else-if="data.kind === 'core'" class="relative flex size-full items-center justify-center">
      <svg class="absolute -inset-1 size-[calc(100%+8px)] animate-spin [animation-duration:8s]" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="emqx-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1a57eb" stop-opacity="0" />
            <stop offset="50%" stop-color="#1a57eb" stop-opacity="0.55" />
            <stop offset="100%" stop-color="#1a57eb" stop-opacity="0" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="none" stroke="url(#emqx-wave-gradient)" stroke-width="2" stroke-linecap="round" />
      </svg>

      <div class="relative z-10 flex size-full items-center justify-center rounded-full border border-primary/10 bg-white shadow-[0_24px_60px_rgba(26,87,235,0.12)]">
        <div class="absolute size-24 rounded-full bg-primary/10"></div>
        <div class="absolute flex size-20 items-center justify-center rounded-full border border-primary/20 bg-white shadow-[0_10px_28px_rgba(26,87,235,0.12)]">
          <img src="/logo.svg" alt="" class="max-h-14 max-w-14 object-contain" loading="lazy" />
        </div>

        <div class="absolute left-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1">
          <component :is="data.items?.[0]?.icon" class="size-6 text-primary" aria-hidden="true" />
          <span class="whitespace-nowrap text-xs font-medium text-dt-text-highlighted">{{ data.items?.[0]?.label }}</span>
        </div>
        <div class="absolute left-1/2 top-4 flex -translate-x-1/2 flex-col items-center gap-1">
          <component :is="data.items?.[1]?.icon" class="size-6 text-primary" aria-hidden="true" />
          <span class="whitespace-nowrap text-xs font-medium text-dt-text-highlighted">{{ data.items?.[1]?.label }}</span>
        </div>
        <div class="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1">
          <component :is="data.items?.[2]?.icon" class="size-6 text-primary" aria-hidden="true" />
          <span class="whitespace-nowrap text-xs font-medium text-dt-text-highlighted">{{ data.items?.[2]?.label }}</span>
        </div>
        <div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
          <component :is="data.items?.[3]?.icon" class="size-6 text-primary" aria-hidden="true" />
          <span class="whitespace-nowrap text-xs font-medium text-dt-text-highlighted">{{ data.items?.[3]?.label }}</span>
        </div>
      </div>
    </div>

    <div v-else class="relative flex h-full w-full flex-col gap-3 rounded-2xl border border-dt-line bg-white p-5 shadow-[0_16px_40px_rgba(26,87,235,0.08)]">
      <div class="flex items-center gap-2">
        <h3 class="whitespace-nowrap text-sm font-bold leading-tight text-dt-text-highlighted">{{ data.label }}</h3>
      </div>
      <div class="grid grid-cols-4 items-start gap-3">
        <div v-for="item in data.items" :key="item.label" class="flex min-w-0 flex-col items-center gap-2">
          <div class="flex size-8 items-center justify-center text-primary">
            <component v-if="item.icon" :is="item.icon" class="size-6" aria-hidden="true" />
            <span v-else class="text-lg font-black leading-none">{{ item.label.slice(0, 1) }}</span>
          </div>
          <span class="whitespace-nowrap text-xs font-medium text-dt-text-muted">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
