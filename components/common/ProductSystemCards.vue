<script setup lang="ts">
import BaseCard from '~/components/common/card/BaseCard.vue'
import CardGrid from '~/components/common/card/CardGrid.vue'
import IconBox from '~/components/common/card/IconBox.vue'
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
  <CardGrid columns="four" gap="sm" class="product-system__cards">
    <BaseCard v-for="card in cards" :key="card.name" variant="product" padding="md" accent equal-height class="product-system__card">
      <div class="product-system__card-header">
        <IconBox :icon="card.icon" :icon-size="20" />
        <h3>{{ card.name }}</h3>
      </div>
      <p>{{ card.description }}</p>
    </BaseCard>
  </CardGrid>
</template>

<style scoped lang="scss">
.product-system__card-header {
  display: flex;
  align-items: center;
  gap: 16px;
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
</style>
