<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

withDefaults(
  defineProps<{
    previousLabel?: string
    nextLabel?: string
    tone?: 'dark' | 'default'
    size?: 'md' | 'lg'
  }>(),
  {
    previousLabel: '上一项',
    nextLabel: '下一项',
    tone: 'default',
    size: 'lg',
  },
)

defineEmits<{
  previous: []
  next: []
}>()
</script>

<template>
  <div class="carousel-controls" :class="[`carousel-controls--${tone}`, `carousel-controls--${size}`]">
    <button type="button" class="carousel-controls__button" :aria-label="previousLabel" @click="$emit('previous')">
      <ChevronLeft aria-hidden="true" />
    </button>
    <button type="button" class="carousel-controls__button" :aria-label="nextLabel" @click="$emit('next')">
      <ChevronRight aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.carousel-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.carousel-controls__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--dt-color-line-strong);
  border-radius: 9999px;
  background: var(--dt-color-bg);
  color: var(--dt-color-text);
  transition:
    background-color var(--dt-duration-base) ease,
    border-color var(--dt-duration-base) ease,
    color var(--dt-duration-base) ease;

  &:hover,
  &:focus-visible {
    border-color: var(--dt-color-primary-ring);
    background: var(--dt-color-primary);
    color: #ffffff;
  }
}

.carousel-controls--md .carousel-controls__button {
  width: 44px;
  height: 44px;
}

.carousel-controls--lg .carousel-controls__button {
  width: 48px;
  height: 48px;
}

.carousel-controls--dark .carousel-controls__button {
  background: rgba(21, 21, 21, 0.72);
  color: #ffffff;
}

svg {
  width: 24px;
  height: 24px;
}

@media (prefers-reduced-motion: reduce) {
  .carousel-controls__button {
    transition: none;
  }
}
</style>
