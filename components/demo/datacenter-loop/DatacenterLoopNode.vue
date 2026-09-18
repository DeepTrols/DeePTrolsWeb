<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

type ChipTone = 'violet' | 'blue' | 'emerald' | 'amber'

interface LoopPanelNodeData {
  kind: 'loopPanel'
  label: string
  caption: string
  icon: Component
  tone: ChipTone
  sourcePosition: Position
  targetPosition: Position
  items: Array<{ label: string, icon: Component }>
}

interface PillNodeData {
  kind: 'pill'
  label: string
}

defineProps<{
  data: LoopPanelNodeData | PillNodeData
}>()

const toneClasses = {
  violet: 'border-violet-500/25 shadow-violet-500/15 text-violet-500',
  blue: 'border-blue-500/25 shadow-blue-500/15 text-blue-500',
  emerald: 'border-emerald-500/25 shadow-emerald-500/15 text-emerald-500',
  amber: 'border-amber-500/25 shadow-amber-500/15 text-amber-500',
}
const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
</script>

<template>
  <div v-if="data.kind === 'loopPanel'" class="flex h-[200px] w-[420px] flex-col rounded-2xl border border-primary/40 bg-white px-4 py-3.5 text-left shadow-lg">
    <div class="flex items-center gap-3">
      <div :class="['flex size-9 shrink-0 items-center justify-center rounded-lg border bg-white shadow-md', toneClasses[data.tone]]">
        <component :is="data.icon" class="size-4" aria-hidden="true" />
      </div>
      <div class="flex min-w-0 flex-col">
        <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ data.label }}</span>
        <span class="whitespace-nowrap text-[10px] font-medium text-dt-text-muted">{{ data.caption }}</span>
      </div>
    </div>
    <div class="mt-3 flex flex-1 flex-col justify-center gap-2">
      <div v-for="item in data.items" :key="item.label" class="flex items-center gap-2.5 rounded-lg border border-primary/25 bg-primary/5 px-3 py-2">
        <component :is="item.icon" class="size-3.5 shrink-0 text-primary/60" aria-hidden="true" />
        <span class="whitespace-nowrap text-[11px] font-semibold text-dt-text-highlighted">{{ item.label }}</span>
      </div>
    </div>
    <Handle type="target" :position="data.targetPosition" :class="handleClass" />
    <Handle type="source" :position="data.sourcePosition" :class="handleClass" />
  </div>

  <div v-else-if="data.kind === 'pill'" class="pointer-events-none flex items-center whitespace-nowrap rounded-full border border-primary/30 bg-white px-3.5 py-1.5 shadow-md">
    <span class="text-xs font-semibold text-primary">{{ data.label }}</span>
  </div>
</template>
