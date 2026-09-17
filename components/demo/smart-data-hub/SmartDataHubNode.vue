<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { Check } from '@lucide/vue'
import type { Component } from 'vue'
import shuyaoLogo from '~/assets/images/brand/shuyao-logo.svg'

interface SourceItem {
  label: string
  icon: Component
  tone: 'cyan' | 'blue' | 'orange' | 'pink'
}

interface OutputItem {
  label: string
  icon: Component
  colorClass: string
}

interface SourceData {
  kind: 'sources'
  label: string
  items: SourceItem[]
}

interface CoreData {
  kind: 'core'
  label: string
  subtitle: string
  orbitIcons: Array<{ icon: Component, colorClass: string }>
  tags: string[]
}

interface OutputData {
  kind: 'output'
  label: string
  items: OutputItem[]
}

defineProps<{
  data: SourceData | CoreData | OutputData
}>()

const sourceToneClasses = {
  cyan: 'border-cyan-500/30 text-cyan-500 shadow-cyan-500/10',
  blue: 'border-blue-500/30 text-blue-500 shadow-blue-500/10',
  orange: 'border-orange-500/30 text-orange-500 shadow-orange-500/10',
  pink: 'border-pink-500/30 text-pink-500 shadow-pink-500/10',
}
const orbitPositions = [
  'left-[16%] top-[16%] -translate-x-1/2 -translate-y-1/2',
  'right-[16%] top-[16%] translate-x-1/2 -translate-y-1/2',
  'bottom-[16%] left-[16%] -translate-x-1/2 translate-y-1/2',
  'bottom-[16%] right-[16%] translate-x-1/2 translate-y-1/2',
]
const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
</script>

<template>
  <div v-if="data.kind === 'sources'" class="flex flex-col items-center gap-5">
    <div class="text-base font-semibold uppercase tracking-wider text-dt-text-muted">{{ data.label }}</div>
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="item in data.items"
        :key="item.label"
        :class="['flex size-[105px] flex-col items-center justify-center rounded-2xl border bg-white shadow-lg transition-transform duration-300 hover:scale-105', sourceToneClasses[item.tone]]"
      >
        <component :is="item.icon" class="size-8" aria-hidden="true" />
        <span class="mt-2.5 whitespace-nowrap text-sm font-medium text-dt-text-muted">{{ item.label }}</span>
      </div>
    </div>
    <Handle type="source" :position="Position.Right" :class="handleClass" />
  </div>

  <div v-else-if="data.kind === 'core'" class="relative flex size-[340px] items-center justify-center">
    <svg class="absolute -inset-1 size-[calc(100%+8px)] animate-spin [animation-duration:10s]" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="smartDataHubWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="oklch(0.55 0.25 285)" stop-opacity="0" />
          <stop offset="50%" stop-color="oklch(0.55 0.25 285)" stop-opacity="0.7" />
          <stop offset="100%" stop-color="oklch(0.55 0.25 285)" stop-opacity="0" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="49" fill="none" stroke="url(#smartDataHubWaveGradient)" stroke-width="2" stroke-linecap="round" />
    </svg>
    <div class="absolute inset-0 animate-pulse rounded-full border border-violet-500/20 [animation-duration:3s]"></div>
    <div class="relative z-10 flex size-full flex-col items-center justify-center rounded-full bg-white">
      <div class="absolute inset-4 rounded-full bg-violet-500/5"></div>
      <div class="absolute flex size-24 items-center justify-center rounded-full border border-violet-500/30 bg-white shadow-lg">
        <img :src="shuyaoLogo" alt="数曜" class="size-24 object-contain" />
      </div>
      <div class="absolute inset-0">
        <div
          v-for="(item, index) in data.orbitIcons"
          :key="index"
          :class="['absolute flex size-11 items-center justify-center rounded-full border border-dt-line bg-white shadow-md transition-transform duration-300 hover:scale-110', orbitPositions[index]]"
        >
          <component :is="item.icon" :class="['size-5', item.colorClass]" aria-hidden="true" />
        </div>
      </div>
      <div class="absolute left-1/2 top-[56px] flex -translate-x-1/2 flex-col items-center whitespace-nowrap">
        <span class="text-base font-bold text-dt-text-highlighted">{{ data.label }}</span>
        <span class="text-xs text-dt-text-muted">{{ data.subtitle }}</span>
      </div>
      <div class="absolute bottom-[42px] left-1/2 flex -translate-x-1/2 items-center justify-center gap-1.5">
        <span v-for="tag in data.tags" :key="tag" class="flex items-center gap-1 whitespace-nowrap rounded-full bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-600">
          <Check class="size-3" aria-hidden="true" />
          {{ tag }}
        </span>
      </div>
    </div>
    <Handle id="left" type="target" :position="Position.Left" :class="handleClass" />
    <Handle id="right" type="source" :position="Position.Right" :class="handleClass" />
  </div>

  <div v-else class="relative flex h-full w-full flex-col rounded-2xl border border-dt-line bg-white p-5 shadow-lg">
    <div class="mb-4">
      <h3 class="text-center text-sm font-bold text-dt-text-highlighted">{{ data.label }}</h3>
    </div>
    <div class="flex flex-1 flex-col justify-center gap-2">
      <div v-for="item in data.items" :key="item.label" class="flex items-center gap-3 rounded-lg bg-dt-muted/30 px-3 py-2 transition-colors hover:bg-dt-muted/50">
        <component :is="item.icon" :class="['size-4 shrink-0', item.colorClass]" aria-hidden="true" />
        <span class="whitespace-nowrap text-sm font-medium text-dt-text-highlighted">{{ item.label }}</span>
      </div>
    </div>
    <Handle type="target" :position="Position.Left" :class="handleClass" />
  </div>
</template>
