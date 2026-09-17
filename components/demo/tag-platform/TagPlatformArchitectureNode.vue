<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

interface SourceNodeData {
  kind: 'source'
  label: string
  icon: Component
  tone: 'violet' | 'blue' | 'amber' | 'emerald' | 'pink'
}

interface ProcessNodeData {
  kind: 'process'
  label: string
  layer: string
  description: string
  features: string[]
  icon: Component
  tone: 'blue' | 'primary'
}

interface AssetNodeData {
  kind: 'asset'
  label: string
  layer: string
  description: string
  features: string[]
  icon: Component
}

defineProps<{
  data: SourceNodeData | ProcessNodeData | AssetNodeData
}>()

const sourceToneClasses = {
  violet: { card: 'border-violet-500/35', icon: 'bg-violet-500/12 text-violet-500' },
  blue: { card: 'border-blue-500/35', icon: 'bg-blue-500/12 text-blue-500' },
  amber: { card: 'border-amber-500/35', icon: 'bg-amber-500/12 text-amber-500' },
  emerald: { card: 'border-emerald-500/35', icon: 'bg-emerald-500/12 text-emerald-500' },
  pink: { card: 'border-pink-500/35', icon: 'bg-pink-500/12 text-pink-500' },
}

const processToneClasses = {
  blue: { card: 'border-blue-500/30', badge: 'border-blue-500/30 bg-blue-500/10 text-blue-500' },
  primary: { card: 'border-primary/35', badge: 'border-primary/35 bg-primary/10 text-primary' },
}

const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
</script>

<template>
  <div v-if="data.kind === 'source'" :class="['flex w-[195px] items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm', sourceToneClasses[data.tone].card]">
    <span :class="['flex size-8 shrink-0 items-center justify-center rounded-lg border border-dt-line', sourceToneClasses[data.tone].icon]">
      <component :is="data.icon" class="size-4" aria-hidden="true" />
    </span>
    <span class="whitespace-nowrap text-[13px] font-semibold text-dt-text-highlighted">{{ data.label }}</span>
    <Handle type="source" :position="Position.Right" :class="handleClass" />
  </div>

  <div v-else-if="data.kind === 'process'" :class="['w-full rounded-2xl border bg-white p-4 shadow-sm', processToneClasses[data.tone].card]">
    <div class="flex items-center justify-between gap-3">
      <div :class="['inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[13px] font-semibold', processToneClasses[data.tone].badge]">
        <component :is="data.icon" class="size-3.5" aria-hidden="true" />
        {{ data.label }}
      </div>
      <span class="text-[13px] font-semibold uppercase tracking-wide text-dt-text-muted">{{ data.layer }}</span>
    </div>
    <p class="mt-3 text-[13px] leading-relaxed text-dt-text-muted">{{ data.description }}</p>
    <div class="mt-3 flex flex-wrap gap-2">
      <span v-for="feature in data.features" :key="feature" class="rounded-full border border-dt-line bg-dt-muted/30 px-2.5 py-1 text-[13px] font-medium text-dt-text-highlighted">
        {{ feature }}
      </span>
    </div>
    <Handle type="target" :position="Position.Left" :class="handleClass" />
    <Handle type="source" :position="Position.Right" :class="handleClass" />
  </div>

  <div v-else class="relative w-[300px]">
    <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white/70"></div>
    <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white/80"></div>
    <div class="relative rounded-2xl border border-dashed border-primary/45 bg-white px-4 py-4 shadow-sm">
      <div class="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[13px] font-semibold text-primary">
        <component :is="data.icon" class="size-3.5" aria-hidden="true" />
        {{ data.label }}
      </div>
      <p class="mt-3 text-[13px] font-semibold text-dt-text-highlighted">{{ data.layer }}</p>
      <p class="mt-2 text-[13px] leading-relaxed text-dt-text-muted">{{ data.description }}</p>
      <ul class="mt-3 space-y-2">
        <li v-for="feature in data.features" :key="feature" class="flex items-center gap-2 text-[13px] text-dt-text-muted">
          <span class="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>
          {{ feature }}
        </li>
      </ul>
      <Handle type="target" :position="Position.Left" :class="handleClass" />
    </div>
  </div>
</template>
