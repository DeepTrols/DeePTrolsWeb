<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    fallbackText?: string
    grid?: boolean
  }>(),
  {
    fallbackText: '能力图加载中',
    grid: true,
  },
)
</script>

<template>
  <div class="product-system-flow-frame" :class="{ 'product-system-flow-frame--grid': grid }" role="img" :aria-label="label">
    <slot>
      <div class="product-system-flow-frame__fallback">{{ fallbackText }}</div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.product-system-flow-frame {
  position: relative;
  display: none;
  width: 100%;
  height: 560px;
  overflow: hidden;

  &--grid::before {
    content: "";
    position: absolute;
    inset: -1px;
    background:
      linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
    background-position: center center;
    background-size: 48px 48px;
    pointer-events: none;
  }
}

.product-system-flow-frame__fallback {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  height: 100%;
  color: var(--dt-color-text-muted);
}

@media (min-width: 1024px) {
  .product-system-flow-frame {
    display: block;
  }
}
</style>
