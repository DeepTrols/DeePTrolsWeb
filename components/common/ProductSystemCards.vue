<script setup lang="ts">
import type { Component } from 'vue'

export interface ProductSystemCard {
  name: string
  description: string
  icon: Component
}

defineProps<{
  cards: ProductSystemCard[]
}>()
</script>

<template>
  <div class="product-system__cards">
    <article v-for="card in cards" :key="card.name" class="product-system__card dt-product-card dt-card--adaptive">
      <div class="product-system__card-accent dt-product-card__accent" aria-hidden="true"></div>
      <div class="product-system__card-header">
        <div class="product-system__card-icon dt-icon-box">
          <component :is="card.icon" :size="20" aria-hidden="true" />
        </div>
        <h3>{{ card.name }}</h3>
      </div>
      <p>{{ card.description }}</p>
    </article>
  </div>
</template>

<style scoped lang="scss">
.product-system__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.product-system__card-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.product-system__card-icon {
  flex: 0 0 auto;
}

.product-system__card h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
}

.product-system__card p {
  flex: 1;
  margin: 16px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 14px;
  line-height: 1.625;
}

@media (prefers-reduced-motion: reduce) {
  .product-system__card:hover {
    transform: none;
  }
}

@media (min-width: 640px) {
  .product-system__cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .product-system__cards {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
