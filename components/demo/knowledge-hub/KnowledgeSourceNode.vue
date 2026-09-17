<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

defineProps<{
  data: {
    label: string
    icon: Component
    tone: 'violet' | 'blue' | 'emerald' | 'orange'
  }
}>()

const toneClasses = {
  violet: 'border-violet-500/25 text-violet-500 shadow-violet-500/15',
  blue: 'border-blue-500/25 text-blue-500 shadow-blue-500/15',
  emerald: 'border-emerald-500/25 text-emerald-500 shadow-emerald-500/15',
  orange: 'border-orange-500/25 text-orange-500 shadow-orange-500/15',
}
</script>

<template>
  <div :class="['flex w-[140px] items-center gap-2 rounded-lg border bg-white px-3 py-1.5 shadow-lg', toneClasses[data.tone]]">
    <span class="flex size-5 items-center justify-center">
      <component :is="data.icon" class="size-4" aria-hidden="true" />
    </span>
    <span class="whitespace-nowrap text-xs font-semibold text-dt-text-highlighted">{{ data.label }}</span>
    <Handle type="source" :position="Position.Right" class="!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none" />
  </div>
</template>
