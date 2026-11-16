<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseCard from '~/components/common/card/BaseCard.vue'
import CardGrid from '~/components/common/card/CardGrid.vue'
import IconBox from '~/components/common/card/IconBox.vue'
import BaseTabs from '~/components/common/tabs/BaseTabs.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import type { Component } from 'vue'

export interface TrustTabsFeature {
  title: string
  subtitle: string
  description: string
  icon: Component
}

export interface TrustTabsItem {
  key: string
  label: string
  features: TrustTabsFeature[]
}

const props = defineProps<{
  tabs: TrustTabsItem[]
  title: string
  titleId: string
  tablistLabel: string
  variant?: 'default' | 'home'
}>()

const activeKey = ref(props.tabs[0]?.key ?? '')
const activeTab = computed(() => props.tabs.find((tab) => tab.key === activeKey.value) ?? props.tabs[0])
</script>

<template>
  <SectionShell
    class="trust-tabs-section"
    :class="{ 'trust-tabs-section--home': variant === 'home' }"
    :title-id="titleId"
    :spacing="variant === 'home' ? 'compact' : 'default'"
  >
    <div class="trust-tabs-section__heading mb-12 text-center lg:mb-16">
      <SectionHeader
        :title="title"
        :title-id="titleId"
        align="center"
        width="full"
        :eyebrow-transform="variant === 'home' ? 'natural' : 'uppercase'"
      />
      <BaseTabs v-model="activeKey" :items="tabs" :id-prefix="titleId" :label="tablistLabel" variant="segmented" class="trust-tabs-section__tabs" />
    </div>

    <CardGrid
      v-if="activeTab"
      :id="`${titleId}-panel-${activeTab.key}`"
      columns="two"
      class="trust-tabs-section__panel"
      role="tabpanel"
      :aria-labelledby="`${titleId}-tab-${activeTab.key}`"
    >
      <BaseCard
        v-for="feature in activeTab.features"
        :key="feature.title"
        variant="product"
        padding="none"
        accent
        equal-height
        class="trust-tabs-section__card !p-7 lg:!p-8"
      >
        <div class="trust-tabs-section__card-head flex items-center gap-4">
          <IconBox class="trust-tabs-section__icon" :icon="feature.icon" :size="40" :icon-size="20" />
          <h3>{{ feature.title }}</h3>
        </div>
        <p class="trust-tabs-section__subtitle">{{ feature.subtitle }}</p>
        <p class="trust-tabs-section__description">{{ feature.description }}</p>
      </BaseCard>
    </CardGrid>
  </SectionShell>
</template>

<style scoped lang="scss">
.trust-tabs-section :deep(h2) {
  margin-bottom: 32px;
}

.trust-tabs-section__tabs {
  justify-content: center;
}

h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
}

.trust-tabs-section__subtitle {
  margin: 20px 0 0;
  color: var(--dt-color-primary);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}

.trust-tabs-section__description {
  flex: 1;
  margin: 12px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 15px;
  line-height: 1.75;
}

.trust-tabs-section--home {
  .trust-tabs-section__heading {
    margin-bottom: 40px !important;
  }

  :deep(h2) {
    margin-bottom: 24px;
  }

  :deep(.dt-segmented-tabs) {
    border-radius: var(--dt-ui-radius);
    padding: 4px;
  }

  :deep(.dt-segmented-tab) {
    min-height: 40px;
    border-radius: 6px;
    font-weight: 500;
  }

  :deep(.dt-segmented-tab[aria-selected="true"]) {
    box-shadow: none;
  }

  :deep(.dt-product-card) {
    padding: 24px !important;
    transition:
      border-color var(--dt-duration-base) ease,
      background-color var(--dt-duration-base) ease;
  }

  :deep(.dt-product-card:hover) {
    border-color: var(--dt-color-line-strong);
    box-shadow: none;
    transform: none;
  }

  :deep(.dt-product-card__accent) {
    display: none;
  }

  h3 {
    font-size: 20px;
    font-weight: 500;
  }

  .trust-tabs-section__subtitle {
    margin-top: 16px;
    font-size: 15px;
    font-weight: 500;
  }

  .trust-tabs-section__description {
    margin-top: 8px;
    line-height: 1.65;
  }
}

@media (min-width: 1024px) {
  .trust-tabs-section__description {
    font-size: 16px;
  }
}
</style>
