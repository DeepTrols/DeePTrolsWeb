<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

withDefaults(
  defineProps<{
    previousLabel?: string
    nextLabel?: string
    previousDisabled?: boolean
    nextDisabled?: boolean
    layout?: 'inline' | 'split'
  }>(),
  {
    previousLabel: '上一项',
    nextLabel: '下一项',
    previousDisabled: false,
    nextDisabled: false,
    layout: 'inline',
  },
)

defineEmits<{
  previous: []
  next: []
}>()
</script>

<template>
  <div
    class="flex items-center gap-2"
    :class="layout === 'split' ? 'w-full justify-between' : 'justify-center'"
  >
    <button
      type="button"
      class="dt-icon-button disabled:cursor-not-allowed disabled:opacity-40"
      :aria-label="previousLabel"
      :disabled="previousDisabled"
      :aria-disabled="previousDisabled"
      @click="$emit('previous')"
    >
      <ChevronLeft :size="20" aria-hidden="true" />
    </button>
    <button
      type="button"
      class="dt-icon-button disabled:cursor-not-allowed disabled:opacity-40"
      :aria-label="nextLabel"
      :disabled="nextDisabled"
      :aria-disabled="nextDisabled"
      @click="$emit('next')"
    >
      <ChevronRight :size="20" aria-hidden="true" />
    </button>
  </div>
</template>
