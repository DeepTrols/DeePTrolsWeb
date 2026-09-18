<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

type ChipTone = 'violet' | 'amber' | 'cyan' | 'emerald' | 'pink'

interface InputNodeData {
  kind: 'input'
  label: string
  icon: Component
  tone: ChipTone
  core: boolean
}

interface StageNodeData {
  kind: 'stage'
  label: string
  items: Array<{ label: string, icon: Component }>
}

interface StrategyNodeData {
  kind: 'strategy'
  label: string
  sublabel: string
  icon: Component
  tone: ChipTone
}

interface PillNodeData {
  kind: 'pill'
  label: string
}

defineProps<{
  data: InputNodeData | StageNodeData | StrategyNodeData | PillNodeData
}>()

const toneClasses = {
  violet: 'border-violet-500/25 shadow-violet-500/15 text-violet-500',
  amber: 'border-amber-500/25 shadow-amber-500/15 text-amber-500',
  cyan: 'border-cyan-500/25 shadow-cyan-500/15 text-cyan-500',
  emerald: 'border-emerald-500/25 shadow-emerald-500/15 text-emerald-500',
  pink: 'border-pink-500/25 shadow-pink-500/15 text-pink-500',
}
const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
</script>

<template>
  <div v-if="data.kind === 'input'" :class="['relative flex h-12 w-[220px] items-center gap-3 rounded-lg border bg-white px-4 shadow-lg', toneClasses[data.tone]]">
    <component :is="data.icon" class="size-5 shrink-0" aria-hidden="true" />
    <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ data.label }}</span>
    <span
      v-if="data.core"
      class="absolute -right-2 -top-2.5 rounded-full border border-amber-500/40 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-amber-500 shadow"
    >核心</span>
    <Handle type="source" :position="Position.Right" :class="handleClass" />
  </div>

  <div v-else-if="data.kind === 'stage'" class="relative h-[300px] w-[240px]">
    <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white"></div>
    <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white"></div>
    <div class="relative flex h-full flex-col rounded-2xl border border-dashed border-primary/50 bg-white px-4 py-3.5 text-left shadow-lg">
      <span class="inline-flex self-start whitespace-nowrap rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">{{ data.label }}</span>
      <div class="mt-3.5 flex flex-1 flex-col justify-center gap-2.5">
        <div v-for="item in data.items" :key="item.label" class="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-2.5 py-2">
          <component :is="item.icon" class="size-3.5 shrink-0 text-primary/60" aria-hidden="true" />
          <span class="whitespace-nowrap text-[10px] font-semibold text-dt-text-highlighted">{{ item.label }}</span>
        </div>
      </div>
      <Handle type="target" :position="Position.Left" :class="handleClass" />
      <Handle type="source" :position="Position.Right" :class="handleClass" />
    </div>
  </div>

  <div v-else-if="data.kind === 'strategy'" :class="['flex h-16 w-[240px] items-center gap-3 rounded-lg border bg-white px-4 shadow-lg', toneClasses[data.tone]]">
    <Handle type="target" :position="Position.Left" :class="handleClass" />
    <component :is="data.icon" class="size-5 shrink-0" aria-hidden="true" />
    <div class="flex min-w-0 flex-col">
      <span class="whitespace-nowrap text-xs font-semibold text-dt-text-highlighted">{{ data.label }}</span>
      <span class="whitespace-nowrap text-[10px] font-medium text-dt-text-muted">{{ data.sublabel }}</span>
    </div>
  </div>

  <div v-else-if="data.kind === 'pill'" class="pointer-events-none flex items-center whitespace-nowrap rounded-full border border-primary/30 bg-white px-3.5 py-1.5 shadow-md">
    <span class="text-xs font-semibold text-primary">{{ data.label }}</span>
  </div>
</template>
