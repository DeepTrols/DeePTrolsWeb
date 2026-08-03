<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    columns?: 'two' | 'three' | 'four'
    gap?: 'sm' | 'md'
    equalRows?: boolean
  }>(),
  {
    columns: 'four',
    gap: 'md',
    equalRows: true,
  },
)

const gridClasses = computed(() => [
  'card-grid grid',
  props.equalRows && 'auto-rows-fr items-stretch',
  props.gap === 'sm' ? 'gap-4' : 'gap-5 lg:gap-6',
  props.columns === 'two' && 'md:grid-cols-2',
  props.columns === 'three' && 'md:grid-cols-3',
  props.columns === 'four' && 'md:grid-cols-2 lg:grid-cols-4',
])
</script>

<template>
  <div :class="gridClasses">
    <slot />
  </div>
</template>
