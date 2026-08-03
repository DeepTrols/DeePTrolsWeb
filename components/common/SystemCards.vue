<script setup lang="ts">
import CardGrid from '~/components/common/card/CardGrid.vue'
import FeatureCard from '~/components/common/card/FeatureCard.vue'

export interface SystemCard {
  title: string
  description: string
}

defineProps<{
  cards: SystemCard[]
}>()
</script>

<template>
  <CardGrid columns="three" gap="sm" class="mt-10 lg:mt-12">
    <FeatureCard
      v-for="(card, index) in cards"
      :key="card.title"
      :title="card.title"
      :description="card.description"
      title-size="sm"
      description-size="sm"
      tone="gradient"
    >
      <template #icon>
        <div class="relative dt-icon-box dt-icon-box--gradient text-sm font-bold">
          {{ String(index + 1).padStart(2, '0') }}
        </div>
      </template>
    </FeatureCard>
  </CardGrid>
</template>
