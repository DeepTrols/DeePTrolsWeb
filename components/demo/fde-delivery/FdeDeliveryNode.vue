<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

type ChipTone = 'violet' | 'blue' | 'emerald' | 'pink'

interface PanelNodeData {
  kind: 'panel'
  label: string
  caption: string
  icon: Component
  tone: ChipTone
  rows: Array<{ label: string, caption: string, icon: Component }>
}

// 里程碑 pill：amber 强调色区别于 primary 阶段 pill，压在主链连接器上标记验收节点
interface MilestoneNodeData {
  kind: 'milestone'
  label: string
  icon: Component
}

interface DeliverableNodeData {
  kind: 'deliverable'
  label: string
  icon: Component
  tone: ChipTone
}

defineProps<{
  data: PanelNodeData | MilestoneNodeData | DeliverableNodeData
}>()

const toneClasses = {
  violet: 'border-violet-500/25 shadow-violet-500/15 text-violet-500',
  blue: 'border-blue-500/25 shadow-blue-500/15 text-blue-500',
  emerald: 'border-emerald-500/25 shadow-emerald-500/15 text-emerald-500',
  pink: 'border-pink-500/25 shadow-pink-500/15 text-pink-500',
}
const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
</script>

<template>
  <div v-if="data.kind === 'panel'" class="flex h-[280px] w-[320px] flex-col rounded-2xl border border-primary/40 bg-white px-5 py-4 text-left shadow-lg">
    <div class="flex items-center gap-2.5">
      <div :class="['flex size-9 shrink-0 items-center justify-center rounded-lg border bg-white shadow-md', toneClasses[data.tone]]">
        <component :is="data.icon" class="size-4 shrink-0" aria-hidden="true" />
      </div>
      <div class="flex min-w-0 flex-col">
        <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ data.label }}</span>
        <span class="whitespace-nowrap text-[10px] font-medium text-dt-text-muted">{{ data.caption }}</span>
      </div>
    </div>
    <div class="mt-4 flex flex-1 flex-col justify-evenly gap-2">
      <div v-for="row in data.rows" :key="row.label" class="flex items-center gap-2.5 rounded-lg border border-primary/25 bg-primary/5 px-3 py-2.5">
        <component :is="row.icon" class="size-4 shrink-0 text-primary/60" aria-hidden="true" />
        <div class="flex min-w-0 flex-col">
          <span class="whitespace-nowrap text-[11px] font-semibold text-dt-text-highlighted">{{ row.label }}</span>
          <span class="whitespace-nowrap text-[9px] font-medium text-dt-text-muted">{{ row.caption }}</span>
        </div>
      </div>
    </div>
    <Handle type="target" :position="Position.Left" :class="handleClass" />
    <Handle type="source" :position="Position.Right" :class="handleClass" />
    <Handle type="source" :position="Position.Bottom" :class="handleClass" />
  </div>

  <div v-else-if="data.kind === 'milestone'" class="pointer-events-none flex items-center gap-1.5 whitespace-nowrap rounded-full border border-amber-500/40 bg-white px-3.5 py-1.5 shadow-md">
    <component :is="data.icon" class="size-3.5 shrink-0 text-amber-500" aria-hidden="true" />
    <span class="text-xs font-semibold text-dt-text-highlighted">{{ data.label }}</span>
  </div>

  <div v-else-if="data.kind === 'deliverable'" :class="['flex h-12 w-[320px] items-center justify-center gap-2.5 rounded-lg border bg-white px-4 shadow-lg', toneClasses[data.tone]]">
    <Handle type="target" :position="Position.Top" :class="handleClass" />
    <component :is="data.icon" class="size-4 shrink-0" aria-hidden="true" />
    <span class="whitespace-nowrap text-xs font-semibold text-dt-text-highlighted">{{ data.label }}</span>
  </div>
</template>
