<script setup lang="ts">
import { computed } from 'vue'

export interface HeroStatItem {
  value: string
  label: string
}

const props = withDefaults(
  defineProps<{
    items: HeroStatItem[]
    columns?: 3 | 4
  }>(),
  {
    columns: 3,
  },
)

const columnsClass = computed(() => (props.columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'))
</script>

<template>
  <div class="hero-stats-strip mx-auto mt-8 grid max-w-2xl gap-4 lg:mx-0" :class="columnsClass" role="list">
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
