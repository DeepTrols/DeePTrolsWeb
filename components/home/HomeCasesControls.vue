<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

defineEmits<{
  previous: []
  next: []
}>()
</script>

<template>
  <div aria-label="客户故事切换">
    <button type="button" class="cases__control dt-icon-button" aria-label="Previous story" @click="$emit('previous')">
      <ChevronLeft :size="20" aria-hidden="true" />
    </button>
    <button type="button" class="cases__control dt-icon-button" aria-label="Next story" @click="$emit('next')">
      <ChevronRight :size="20" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.cases__control {
  &:hover {
    color: var(--dt-color-text-highlighted);
  }
}
</style>
