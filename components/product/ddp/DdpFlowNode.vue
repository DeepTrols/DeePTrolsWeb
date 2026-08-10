<script setup lang="ts">
import { X } from '@lucide/vue'
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

export type DdpFlowTone = 'source' | 'process' | 'filter' | 'sink'

export interface DdpFlowNodeData {
  title: string
  subtitle: string
  tone: DdpFlowTone
  icon: Component
}

defineProps<{
  data: DdpFlowNodeData
  selected?: boolean
}>()

// 原组件 tone 色条映射逐字保留
const toneColors: Record<DdpFlowTone, string> = {
  source: 'bg-emerald-500',
  process: 'bg-blue-500',
  filter: 'bg-indigo-500',
  sink: 'bg-purple-500',
}
</script>

<template>
  <div
    :class="[
      'flow-node relative flex min-w-[190px] flex-col gap-1 rounded-lg border bg-default px-4 py-3 shadow-sm transition-all duration-200',
      selected ? 'border-red-500/60 ring-2 ring-red-500/20' : 'border-dt-line-strong/60 hover:border-dt-line-strong',
    ]"
  >
    <div
      v-if="selected"
      class="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
    >
      <X class="size-3" aria-hidden="true" />
    </div>
    <span class="absolute inset-y-0 left-0 w-2 rounded-l-xl" :class="toneColors[data.tone]" aria-hidden="true"></span>
    <div class="flex items-center gap-2.5">
      <component :is="data.icon" class="size-5 text-highlighted" aria-hidden="true" />
      <div>
        <p class="text-sm font-semibold text-highlighted">{{ data.title }}</p>
        <p class="text-xs text-muted">{{ data.subtitle }}</p>
      </div>
    </div>
    <Handle
      v-if="data.tone !== 'source'"
      type="target"
      :position="Position.Left"
      class="h-3! w-3! rounded-full! border-2! border-dt-bg! bg-dt-text-muted! transition! duration-200! hover:bg-primary!"
    />
    <Handle
      v-if="data.tone !== 'sink'"
      type="source"
      :position="Position.Right"
      class="h-3! w-3! rounded-full! border-2! border-dt-bg! bg-dt-text-muted! transition! duration-200! hover:bg-primary!"
    />
  </div>
</template>
