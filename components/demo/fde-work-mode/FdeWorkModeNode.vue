<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

type ChipTone = 'violet' | 'blue' | 'cyan' | 'emerald' | 'amber' | 'pink'

interface PhaseNodeData {
  kind: 'phase'
  label: string
  icon: Component
  tone: ChipTone
  rows: string[]
}

defineProps<{
  data: PhaseNodeData
}>()

const toneClasses = {
  violet: 'border-violet-500/25 shadow-violet-500/15 text-violet-500',
  blue: 'border-blue-500/25 shadow-blue-500/15 text-blue-500',
  cyan: 'border-cyan-500/25 shadow-cyan-500/15 text-cyan-500',
  emerald: 'border-emerald-500/25 shadow-emerald-500/15 text-emerald-500',
  amber: 'border-amber-500/25 shadow-amber-500/15 text-amber-500',
  pink: 'border-pink-500/25 shadow-pink-500/15 text-pink-500',
}
const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
</script>

<template>
  <div class="flex h-[240px] w-[220px] flex-col rounded-2xl border border-primary/40 bg-white px-4 py-3.5 text-left shadow-lg">
    <div class="flex items-center gap-2.5">
      <div :class="['flex size-9 shrink-0 items-center justify-center rounded-lg border bg-white shadow-md', toneClasses[data.tone]]">
        <component :is="data.icon" class="size-4 shrink-0" aria-hidden="true" />
      </div>
      <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ data.label }}</span>
    </div>
    <div class="mt-3.5 flex flex-1 flex-col justify-evenly gap-2">
      <div v-for="row in data.rows" :key="row" class="flex items-center rounded-lg border border-primary/25 bg-primary/5 px-2.5 py-2">
        <span class="whitespace-nowrap text-[10px] font-semibold text-dt-text-highlighted">{{ row }}</span>
      </div>
    </div>
    <Handle type="target" :position="Position.Left" :class="handleClass" />
    <Handle type="source" :position="Position.Right" :class="handleClass" />
  </div>
</template>
