<script setup lang="ts">
import { computed } from 'vue'
import CardGrid from '~/components/common/card/CardGrid.vue'
import FeatureCard from '~/components/common/card/FeatureCard.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import type { Component } from 'vue'

export interface ProductFeatureGridItem {
  title: string
  description: string
  icon?: Component
}

const props = withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    titleId: string
    subtitle: string
    items: ProductFeatureGridItem[]
    columns?: 'two' | 'three' | 'four'
    nowrapSubtitle?: boolean
  }>(),
  {
    columns: 'four',
    nowrapSubtitle: false,
  },
)

const cardColumns = computed(() => props.columns)
</script>

<template>
  <SectionShell :title-id="titleId">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader
        :title-id="titleId"
        :eyebrow="eyebrow"
        :title="title"
        :subtitle="subtitle"
        align="center"
        :nowrap-subtitle="nowrapSubtitle"
        :width="nowrapSubtitle ? 'wide' : 'default'"
      />
    </div>

    <CardGrid :columns="cardColumns">
      <FeatureCard
        v-for="item in items"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        title-size="sm"
        description-size="sm"
        tone="gradient"
      />
    </CardGrid>
  </SectionShell>
</template>
