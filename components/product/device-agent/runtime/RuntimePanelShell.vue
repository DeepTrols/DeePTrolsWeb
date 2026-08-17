<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  title: string
  badge: string
}>()
</script>

<template>
  <div
    class="animate-panel-in relative flex h-[520px] flex-col overflow-hidden rounded-2xl border border-dt-line-strong/60 bg-dt-bg-soft/30 sm:h-[480px] lg:h-[460px]"
  >
    <div class="relative flex-1 overflow-hidden">
      <div class="flex size-full flex-col p-5">
        <div class="mb-4 flex items-center justify-between gap-3">
          <div class="flex min-w-0 items-center gap-2">
            <component :is="icon" class="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span class="truncate text-sm font-semibold text-highlighted">{{ title }}</span>
          </div>
          <span class="shrink-0 rounded bg-dt-bg-soft/40 px-2 py-0.5 text-[10px] font-medium text-muted">
            {{ badge }}
          </span>
        </div>

        <div class="flex min-h-0 flex-1 flex-col rounded-xl border border-dt-line-strong/60 bg-dt-bg p-4">
          <slot />
        </div>

        <div v-if="$slots.footer" class="relative border-t border-dt-line-strong/40 px-5 py-4">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
