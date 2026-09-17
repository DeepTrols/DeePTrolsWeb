<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

defineProps<{
  data: {
    label: string
    items: Array<{ label: string, icon: Component, colorClass: string }>
  }
}>()
</script>

<template>
  <div class="relative flex w-[320px] flex-col gap-3 rounded-2xl border border-dt-line bg-white p-5 shadow-lg">
    <h3 class="text-sm font-bold leading-tight text-dt-text-highlighted">{{ data.label }}</h3>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="item in data.items" :key="item.label" class="flex flex-col items-center gap-2">
        <div class="flex size-8 items-center justify-center text-dt-text-highlighted">
          <component :is="item.icon" :class="['size-6', item.colorClass]" aria-hidden="true" />
        </div>
        <span class="whitespace-nowrap text-center text-xs font-medium text-dt-text-muted">{{ item.label }}</span>
      </div>
    </div>
    <Handle type="target" :position="Position.Left" class="!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none" />
  </div>
</template>
