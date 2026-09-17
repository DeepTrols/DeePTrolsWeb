<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'
import boyaoLogo from '~/assets/images/brand/boyao-logo.svg'

defineProps<{
  data: {
    label: string
    steps: Array<{ label: string, icon: Component }>
  }
}>()
</script>

<template>
  <div class="relative flex h-[300px] w-[170px] flex-col rounded-2xl border border-violet-500/30 bg-white p-4 shadow-lg shadow-violet-500/10">
    <div class="flex flex-col items-center gap-2 border-b border-dt-line pb-3">
      <img :src="boyaoLogo" alt="" class="h-7 w-12 object-contain" />
      <span class="whitespace-nowrap text-xs font-semibold text-dt-text-highlighted">{{ data.label }}</span>
    </div>
    <div class="mt-4 flex flex-1 flex-col justify-center gap-3">
      <div v-for="step in data.steps" :key="step.label" class="flex items-center gap-2 rounded-lg border border-violet-500/25 bg-violet-500/5 px-2.5 py-2">
        <component :is="step.icon" class="size-3.5 text-violet-500/70" aria-hidden="true" />
        <span class="whitespace-nowrap text-[10px] font-semibold text-dt-text-highlighted">{{ step.label }}</span>
      </div>
    </div>
    <Handle id="left-1" type="target" :position="Position.Left" class="!top-[10%] !size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none" />
    <Handle id="left-2" type="target" :position="Position.Left" class="!top-[30%] !size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none" />
    <Handle id="left-3" type="target" :position="Position.Left" class="!top-[50%] !size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none" />
    <Handle id="left-4" type="target" :position="Position.Left" class="!top-[70%] !size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none" />
    <Handle id="right" type="source" :position="Position.Right" class="!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none" />
  </div>
</template>
