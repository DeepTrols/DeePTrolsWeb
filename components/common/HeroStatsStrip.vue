<script setup lang="ts">
export interface HeroStatItem {
  value: string
  label: string
}

defineProps<{
  items: HeroStatItem[]
}>()
</script>

<template>
  <div class="hero-stats-strip mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-4 lg:mx-0" role="list">
    <div
      v-for="item in items"
      :key="item.label"
      class="rounded-xl border border-default bg-[var(--dt-color-bg-soft)]/50 px-3 py-3 text-center backdrop-blur-sm"
      role="listitem"
    >
      <div class="text-xl font-semibold text-highlighted lg:text-2xl">{{ item.value }}</div>
      <div class="mt-0.5 text-xs text-muted">{{ item.label }}</div>
    </div>
  </div>
</template>
