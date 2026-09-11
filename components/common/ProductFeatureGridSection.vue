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
  iconLabel?: string
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
    iconBoxSize?: 40 | 48 | 56
    iconSize?: 20 | 24 | 28 | 48
    iconBordered?: boolean
    iconFilled?: boolean
    headerWidth?: 'default' | 'wide' | 'full'
    spacing?: 'default' | 'compact' | 'tight'
    containerSpacing?: 'none' | 'top'
  }>(),
  {
    columns: 'four',
    nowrapSubtitle: false,
    iconBoxSize: 40,
    iconSize: 20,
    iconBordered: true,
    iconFilled: true,
    headerWidth: undefined,
    spacing: 'default',
    containerSpacing: 'none',
  },
)

const cardColumns = computed(() => props.columns)
const sectionHeaderWidth = computed(() => props.headerWidth ?? (props.nowrapSubtitle ? 'wide' : 'default'))
</script>

<template>
  <SectionShell :title-id="titleId" :spacing="spacing" :container-spacing="containerSpacing">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader
        :title-id="titleId"
        :eyebrow="eyebrow"
        :title="title"
        :subtitle="subtitle"
        align="center"
        :nowrap-subtitle="nowrapSubtitle"
        :width="sectionHeaderWidth"
      />
    </div>

    <slot name="before" />

    <CardGrid :columns="cardColumns">
      <FeatureCard
        v-for="item in items"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :icon-label="item.iconLabel"
        :icon-size="iconSize"
        :icon-box-size="iconBoxSize"
        :icon-bordered="iconBordered"
        :icon-filled="iconFilled"
        title-size="sm"
        description-size="sm"
        tone="gradient"
      />
    </CardGrid>

    <slot name="after" />
  </SectionShell>
</template>
