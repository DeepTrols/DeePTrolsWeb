<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

interface FlowMqNodeData {
  kind: 'client' | 'stage' | 'target'
  label: string
  subtitle?: string
  icon: Component
  sizeClass: string
}

defineProps<{
  data: FlowMqNodeData
}>()

const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
const cardClass = 'rounded-lg border border-dt-line bg-white shadow-[0_10px_28px_rgba(26,87,235,0.08)]'
</script>

<template>
  <div :class="['relative', data.sizeClass]">
    <Handle id="left-target" type="target" :position="Position.Left" :class="handleClass" />
    <Handle id="right-source" type="source" :position="Position.Right" :class="handleClass" />

    <div v-if="data.kind === 'client'" :class="['flex h-full w-full items-center gap-3 px-4 py-2.5', cardClass]">
      <component :is="data.icon" class="size-6 text-dt-text-muted" aria-hidden="true" />
      <span class="whitespace-nowrap text-base font-semibold text-dt-text-highlighted">{{ data.label }}</span>
    </div>

    <div v-else-if="data.kind === 'stage'" :class="['flex h-full w-full flex-col items-center justify-center gap-2 px-3 py-4', cardClass]">
      <component :is="data.icon" class="size-7 text-dt-text-muted" aria-hidden="true" />
      <div class="text-center">
        <div class="whitespace-nowrap text-base font-semibold text-dt-text-highlighted">{{ data.label }}</div>
        <div class="mt-0.5 whitespace-nowrap text-sm text-dt-text-muted">{{ data.subtitle }}</div>
      </div>
    </div>

    <div v-else :class="['flex h-full w-full items-center gap-3 px-4 py-2.5', cardClass]">
      <component :is="data.icon" class="size-6 text-dt-text-muted" aria-hidden="true" />
      <div class="flex flex-col">
        <span class="whitespace-nowrap text-base font-semibold text-dt-text-highlighted">{{ data.label }}</span>
        <span class="whitespace-nowrap text-sm text-dt-text-muted">{{ data.subtitle }}</span>
      </div>
    </div>
  </div>
</template>
