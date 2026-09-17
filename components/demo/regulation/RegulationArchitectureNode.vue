<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

interface SourceNodeData {
  kind: 'source'
  label: string
  icon: Component
  tone: 'violet' | 'blue' | 'pink' | 'orange' | 'cyan'
}

interface CoreNodeData {
  kind: 'core'
  label: string
  icon: Component
  primaryTitle: string
  primarySubtitle: string
  primaryIcon: Component
  modules: Array<{ label: string; icon: Component }>
}

interface IntegrationNodeData {
  kind: 'integration'
  label: string
  items: Array<{ label: string; icon: Component; colorClass: string }>
}

defineProps<{
  data: SourceNodeData | CoreNodeData | IntegrationNodeData
}>()

const sourceToneClasses = {
  violet: 'border-violet-500/25 shadow-violet-500/15 text-violet-500',
  blue: 'border-blue-500/25 shadow-blue-500/15 text-blue-500',
  pink: 'border-pink-500/25 shadow-pink-500/15 text-pink-500',
  orange: 'border-orange-500/25 shadow-orange-500/15 text-orange-500',
  cyan: 'border-cyan-500/25 shadow-cyan-500/15 text-cyan-500',
}
const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
</script>

<template>
  <div v-if="data.kind === 'source'" :class="['flex h-12 w-[220px] items-center gap-3 rounded-lg border bg-white px-4 py-2.5 shadow-lg', sourceToneClasses[data.tone]]">
    <div class="flex size-7 shrink-0 items-center justify-center">
      <component :is="data.icon" class="size-5" aria-hidden="true" />
    </div>
    <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ data.label }}</span>
    <Handle type="source" :position="Position.Right" :class="handleClass" />
  </div>

  <div v-else-if="data.kind === 'core'" class="relative w-[480px]">
    <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white"></div>
    <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white"></div>
    <div class="relative rounded-2xl border border-dashed border-primary/50 bg-white px-5 py-4 text-left shadow-lg">
      <div class="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 py-1.5 pl-2 pr-3">
        <component :is="data.icon" class="size-[18px] text-primary" aria-hidden="true" />
        <span class="whitespace-nowrap text-xs font-semibold text-primary">{{ data.label }}</span>
      </div>
      <div class="mt-4 flex gap-3">
        <div class="flex flex-1 items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <component :is="data.primaryIcon" class="size-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p class="text-[13px] font-semibold leading-tight text-dt-text-highlighted">{{ data.primaryTitle }}</p>
            <p class="mt-0.5 whitespace-nowrap text-[11px] text-dt-text-muted">{{ data.primarySubtitle }}</p>
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-3">
          <div v-for="module in data.modules" :key="module.label" class="flex flex-1 items-center gap-2.5 rounded-lg border border-dt-line bg-dt-muted/30 px-3 py-2.5">
            <component :is="module.icon" class="size-4 text-primary/60" aria-hidden="true" />
            <span class="whitespace-nowrap text-[11px] font-semibold text-dt-text-highlighted">{{ module.label }}</span>
          </div>
        </div>
      </div>
      <Handle type="target" :position="Position.Left" :class="handleClass" />
      <Handle type="source" :position="Position.Right" :class="handleClass" />
    </div>
  </div>

  <div v-else class="relative flex w-[320px] flex-col gap-3 rounded-2xl border border-dt-line-strong bg-white p-5 shadow-lg">
    <div class="flex items-center gap-2">
      <h3 class="text-sm font-bold leading-tight text-dt-text-highlighted">{{ data.label }}</h3>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="item in data.items" :key="item.label" class="flex flex-col items-center gap-2">
        <div class="flex size-8 items-center justify-center text-dt-text-highlighted">
          <component :is="item.icon" :class="['size-6', item.colorClass]" aria-hidden="true" />
        </div>
        <span class="whitespace-nowrap text-center text-xs font-medium text-dt-text-muted">{{ item.label }}</span>
      </div>
    </div>
    <Handle type="target" :position="Position.Left" :class="handleClass" />
  </div>
</template>
