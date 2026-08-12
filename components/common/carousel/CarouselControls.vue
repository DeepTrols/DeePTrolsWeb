<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

withDefaults(
  defineProps<{
    previousLabel?: string
    nextLabel?: string
  }>(),
  {
    previousLabel: '上一项',
    nextLabel: '下一项',
  },
)

defineEmits<{
  previous: []
  next: []
}>()
</script>

<template>
  <div class="carousel-controls">
    <button type="button" class="carousel-controls__button dt-icon-button" :aria-label="previousLabel" @click="$emit('previous')">
      <ChevronLeft :size="20" aria-hidden="true" />
    </button>
    <button type="button" class="carousel-controls__button dt-icon-button" :aria-label="nextLabel" @click="$emit('next')">
      <ChevronRight :size="20" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.carousel-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.carousel-controls__button:hover {
  color: var(--dt-color-text-highlighted);
}
</style>
